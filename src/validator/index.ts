import { RequestHandler } from "express";
import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import reporter from "io-ts-reporters";

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
function entries<T extends Object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

type ValidatorWithBody<T> = { body: t.Decoder<unknown, T> };
type ValidatorWithQuery<T> = { query: t.Decoder<unknown, T> };
type ValidatorWithParams<T> = { params: t.Decoder<unknown, T> };

type ValidatorWithQueryAndBody<Q, B> = ValidatorWithQuery<Q> &
  ValidatorWithBody<B>;
type ValidatorWithParamsAndBody<P, B> = ValidatorWithParams<P> &
  ValidatorWithBody<B>;
type ValidatorWithParamsAndQuery<P, Q> = ValidatorWithParams<P> &
  ValidatorWithQuery<Q>;
type ValidatorWithParamsQueryAndBody<P, Q, B> = ValidatorWithParams<P> &
  ValidatorWithQuery<Q> &
  ValidatorWithBody<B>;

export function validator<B>(
  validator: ValidatorWithBody<B>
): RequestHandler<unknown, unknown, B>;
export function validator<Q>(
  validator: ValidatorWithQuery<Q>
): RequestHandler<unknown, unknown, unknown, Q>;
export function validator<P>(
  validator: ValidatorWithParams<P>
): RequestHandler<P, unknown, unknown>;
export function validator<Q, B>(
  validator: ValidatorWithQueryAndBody<Q, B>
): RequestHandler<unknown, unknown, B, Q>;
export function validator<P, B>(
  validator: ValidatorWithParamsAndBody<P, B>
): RequestHandler<P, unknown, B>;
export function validator<P, Q>(
  validator: ValidatorWithParamsAndQuery<P, Q>
): RequestHandler<P, unknown, unknown, Q>;
export function validator<P, Q, B>(
  validator: ValidatorWithParamsQueryAndBody<P, Q, B>
): RequestHandler<P, unknown, B, Q>;
export function validator<P, Q, B>(
  validator: Partial<ValidatorWithParamsQueryAndBody<P, Q, B>>
): RequestHandler<P, unknown, B, Q> {
  return (
    req: { body: unknown; params: unknown; query: unknown },
    res: any,
    next: () => void
  ) => {
    const errors: Partial<{
      params: string[];
      query: string[];
      body: string[];
    }> = {};
    const request: {
      params: P | undefined;
      query: Q | undefined;
      body: B | undefined;
    } = {
      params: undefined,
      query: undefined,
      body: undefined,
    };
    if (validator.body) {
      const validation = validator.body.decode(req.body);
      if (E.isLeft(validation)) {
        errors.body = reporter.report(validation);
      } else {
        request.body = validation.right;
      }
    }
    if (validator.params) {
      const validation = validator.params.decode(req.params);
      if (E.isLeft(validation)) {
        errors.params = reporter.report(validation);
      } else {
        request.params = validation.right;
      }
    }
    if (validator.query) {
      const validation = validator.query.decode(req.query);
      if (E.isLeft(validation)) {
        errors.query = reporter.report(validation);
      } else {
        request.query = validation.right;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Bad request",
        ...errors,
      });
    }

    entries(request).forEach(([key, value]) => {
      if (value) {
        req[key] = value;
      }
    });
    return next();
  };
}
