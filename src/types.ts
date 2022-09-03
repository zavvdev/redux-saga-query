export type Domain = string;
export type State = Record<string, unknown>;
export type Key = Array<string>;
export type CreatedKey = string;

export enum Effect {
  Query = "query",
  Mutation = "mutation",
};

export enum ActionTypeKind {
  Request = "request",
  Success = "success",
  Failure = "failure",
  Invalidate = "invalidate",
  Reset = "reset",
};

export type EffectActionType<
  E extends Effect = Effect,
  A extends ActionTypeKind = ActionTypeKind
> = `${E}/${A}`;

export type EffectActionTypePattern<
  E extends EffectActionType = EffectActionType
> = `${Domain}@${E}`;

export type ActionType = `${CreatedKey}_${EffectActionTypePattern}`;

export enum DataStatus {
  Loading = "loading",
  Fetching = "fetching",
  Loaded = "loaded",
  Error = "error",
  Reset = "reset",
};
