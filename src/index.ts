import * as E from "fp-ts/Either";
import * as t from "io-ts";
import reporter from "io-ts-reporters";

const Id = t.number;

const invalidIdResult = Id.decode("10");

if (E.isLeft(invalidIdResult)) {
  console.log("invalidId", invalidIdResult);
  console.log("invalidId message", reporter.report(invalidIdResult));
} else {
  console.log("invalidId else not called");
}

const validIdResult = Id.decode(10);
if (E.isRight(validIdResult)) {
  console.log("validId", validIdResult);
  validIdResult.right;
} else {
  console.log("validId else not called");
}

type Id = t.TypeOf<typeof Id>; // type Id = number
const invalidId: Id = "10"; // Type 'string' is not assignable to type 'number'
const validId: Id = 10;
