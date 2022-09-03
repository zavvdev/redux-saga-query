import { ActionTypeKind, Effect, EffectActionType, EffectActionTypePattern } from "../../types";
import { Key } from "../../types";

export interface MutationOptions {
  invalidateKeysOnSuccess?: Array<Key>;
};

export interface MutationState<T> {
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  status: string;
  data: T | null;
};

export type MutationEffectActionTypesShape<R, S, F, RS> = {
  [ActionTypeKind.Request]: R;
  [ActionTypeKind.Success]: S;
  [ActionTypeKind.Failure]: F;
  [ActionTypeKind.Reset]: RS;
};

export type MutationEffectActionType<
  A extends Exclude<ActionTypeKind, ActionTypeKind.Invalidate>
> = EffectActionType<Effect.Mutation, A>;

export type MutationEffectActionTypes = MutationEffectActionTypesShape<
  MutationEffectActionType<ActionTypeKind.Request>,
  MutationEffectActionType<ActionTypeKind.Success>,
  MutationEffectActionType<ActionTypeKind.Failure>,
  MutationEffectActionType<ActionTypeKind.Reset>
>;

export type MutationEffectActionTypePatterns = MutationEffectActionTypesShape<
  EffectActionTypePattern<MutationEffectActionType<ActionTypeKind.Request>>,
  EffectActionTypePattern<MutationEffectActionType<ActionTypeKind.Success>>,
  EffectActionTypePattern<MutationEffectActionType<ActionTypeKind.Failure>>,
  EffectActionTypePattern<MutationEffectActionType<ActionTypeKind.Reset>>
>;