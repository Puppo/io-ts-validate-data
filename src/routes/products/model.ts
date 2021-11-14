import * as t from "io-ts";
import * as types from "io-ts-types";

export const ProductId = t.union([t.number, types.NumberFromString]);
export type ProductId = t.TypeOf<typeof ProductId>;

export const GetByIdProductParams = t.type({
  id: ProductId,
});
export type GetByIdProductParams = t.TypeOf<typeof GetByIdProductParams>;

export const ProductFilterQuery = t.partial({
  search: t.string,
  color: t.string,
});
export type ProductFilterQuery = t.TypeOf<typeof ProductFilterQuery>;

export const InsertProductDto = t.type({
  name: t.string,
  color: t.string,
});

export type InsertProductDto = t.TypeOf<typeof InsertProductDto>;

export const UpdateProductParams = t.type({
  id: ProductId,
});
export type UpdateProductParams = t.TypeOf<typeof UpdateProductParams>;
export const UpdateProductDto = InsertProductDto;
export type UpdateProductDto = t.TypeOf<typeof UpdateProductDto>;

export const ProductDto = t.intersection([
  t.type({
    id: ProductId,
  }),
  InsertProductDto,
]);
export type ProductDto = t.TypeOf<typeof ProductDto>;
