import {
  BoundDocumentPath,
  BoundDocumentPathOfDepth1,
  BoundDocumentPathOfDepth2,
  BoundDocumentPathOfDepth3,
  BoundDocumentPathOfDepth4,
  BoundDocumentPathOfDepth5,
  BoundDocumentPathOfDepth6,
  BoundDocumentPathOfDepth7,
  BoundDocumentPathOfDepth8,
  DeepRequired,
  NestedValue,
} from "../common/bound-document-path";
import {
  GeneralUpdateOperation,
  NonBreakingOperator,
  NonBreakingUpdateOperation,
  RegularPushUpdateValue,
  RegularUpdateValue,
  UpdateOperation,
  UpdateOperator,
} from "./update-operation";

import { createUpdateOperation } from "./create-update-operation";

export const updateOpearationCreator = {
  $set: (...params: any[]): UpdateOperation<"$set"> =>
    createUpdateOperation("$set", ...params),

  $inc: (...params: any[]): UpdateOperation<"$inc"> =>
    createUpdateOperation("$inc", ...params),

  $min: (...params: any[]): UpdateOperation<"$min"> =>
    createUpdateOperation("$min", ...params),

  $max: (...params: any[]): UpdateOperation<"$max"> =>
    createUpdateOperation("$max", ...params),

  $mul: (...params: any[]): UpdateOperation<"$mul"> =>
    createUpdateOperation("$mul", ...params),

  $addToSet: (...params: any[]): UpdateOperation<"$addToSet"> =>
    createUpdateOperation("$addToSet", ...params),

  $pop: (...params: any[]): UpdateOperation<"$pop"> =>
    createUpdateOperation("$pop", ...params),

  $pull: (...params: any[]): UpdateOperation<"$pull"> =>
    createUpdateOperation("$pull", ...params),

  $pullAll: (...params: any[]): UpdateOperation<"$pullAll"> =>
    createUpdateOperation("$pullAll", ...params),

  $push: (...params: any[]): UpdateOperation<"$push"> =>
    createUpdateOperation("$push", ...params),

  $currentDate: (...params: any[]): UpdateOperation<"$currentDate"> =>
    createUpdateOperation("$currentDate", ...params),

  $bit: (...params: any[]): UpdateOperation<"$bit"> =>
    createUpdateOperation("$bit", ...params),

  $unset: (...params: any[]): UpdateOperation<"$unset"> =>
    createUpdateOperation("$unset", ...params),

  $restore: (...params: any[]): UpdateOperation<"$restore"> =>
    createUpdateOperation("$restore", ...params),

  $rename: (...params: any[]): UpdateOperation<"$rename"> =>
    createUpdateOperation("$rename", ...params),

  $append: (...params: any[]): UpdateOperation<"$append"> =>
    createUpdateOperation("$append", ...params),
};

Object.freeze(updateOpearationCreator);

export function $op<T>(): {
  [OP in UpdateOperator]: UpdateOperationCreator<OP, T>
} {
  // @ts-ignore surpress for typing.
  return updateOpearationCreator;
}

type BoundUpdateOperation<T, OP> = (OP extends NonBreakingOperator
  ? NonBreakingUpdateOperation
  : GeneralUpdateOperation) & {
  $__META__: { target: T };
};

export type BoundGeneralUpdateOperation<T> = GeneralUpdateOperation & {
  $__META__: { target: T };
};

export type BoundNonBreakingUpdateOperation<T> = NonBreakingUpdateOperation & {
  $__META__: { target: T };
};

type BoundUpdateOperandItemValue<V, ItemVal> = {
  $set: V; // V extends ItemVal()=any) ? V : never;
  $inc: V extends ItemVal ? V : never;
  $max: V extends ItemVal ? V : never;
  $min: V extends ItemVal ? V : never;
  $mul: V extends ItemVal ? V : never;
  $addToSet: V extends (infer U)[] ? U | { $each: U[] } : never;
  $pop: V extends any[] ? ItemVal : never;
  $pull: V extends any[] ? ItemVal : never;
  $pullAll: V extends (infer U)[] ? U[] : never;
  $push: V extends (infer U)[] ? (U | RegularPushUpdateValue<U>) : never;
  $currentDate: V extends (string | Date | number) ? ItemVal : never;
  $bit: V extends number ? ItemVal : never;
  $unset: ItemVal;
  $restore: V extends Object ? ItemVal : never;
  $rename: ItemVal;
  $append: V extends Array<any> ? never : V extends Object ? Partial<V> : never;
};

type ValueOf<OP extends UpdateOperator, V> = BoundUpdateOperandItemValue<
  V,
  RegularUpdateValue<OP>
>[OP];

export type UpdateOperationCreator<
  OP extends UpdateOperator,
  T
> = RawUpdateOperationCreator<OP, DeepRequired<T> | T>;

export interface RawUpdateOperationCreator<OP extends UpdateOperator, T> {
  <K1 extends keyof T>(
    docPath: BoundDocumentPathOfDepth1<T, K1>,
    value: ValueOf<OP, T[K1]>
  ): BoundUpdateOperation<T, OP>;

  <K1 extends keyof T, K2 extends keyof T[K1]>(
    docPath: BoundDocumentPathOfDepth2<T, K1, K2>,
    value: ValueOf<OP, T[K1][K2]>
  ): BoundUpdateOperation<T, OP>;

  <K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    docPath: BoundDocumentPathOfDepth3<T, K1, K2, K3>,
    value: ValueOf<OP, T[K1][K2][K3]>
  ): BoundUpdateOperation<T, OP>;

  <
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3]
  >(
    docPath: BoundDocumentPathOfDepth4<T, K1, K2, K3, K4>,
    value: ValueOf<OP, T[K1][K2][K3][K4]>
  ): BoundUpdateOperation<T, OP>;

  <
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4]
  >(
    docPath: BoundDocumentPathOfDepth5<T, K1, K2, K3, K4, K5>,
    value: ValueOf<OP, T[K1][K2][K3][K4][K5]>
  ): BoundUpdateOperation<T, OP>;

  <
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5]
  >(
    docPath: BoundDocumentPathOfDepth6<T, K1, K2, K3, K4, K5, K6>,
    value: ValueOf<OP, T[K1][K2][K3][K4][K5][K6]>
  ): BoundUpdateOperation<T, OP>;

  <
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5],
    K7 extends keyof T[K1][K2][K3][K4][K5][K6]
  >(
    docPath: BoundDocumentPathOfDepth7<T, K1, K2, K3, K4, K5, K6, K7>,
    value: ValueOf<OP, T[K1][K2][K3][K4][K5][K6][K7]>
  ): BoundUpdateOperation<T, OP>;

  <
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5],
    K7 extends keyof T[K1][K2][K3][K4][K5][K6],
    K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7]
  >(
    docPath: BoundDocumentPathOfDepth8<T, K1, K2, K3, K4, K5, K6, K7, K8>,
    value: ValueOf<OP, T[K1][K2][K3][K4][K5][K6][K7][K8]>
  ): BoundUpdateOperation<T, OP>;

  <K1, K2, K3, K4, K5, K6, K7, K8>(
    docPath: BoundDocumentPath<T, K1, K2, K3, K4, K5, K6, K7, K8>,
    value: ValueOf<OP, NestedValue<T, K1, K2, K3, K4, K5, K6, K7, K8>>
  ): BoundUpdateOperation<T, OP>;
}
