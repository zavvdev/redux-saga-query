export type Domain = string;
export type InstanceId = string;
export type CreatedKey = string;
export type QueryTimestamp = number;

export type QueryOptions = {
  staleTime: number;
};

export type InitOptions = {
  domain: Domain;
  query?: Partial<QueryOptions>;
};

export enum Effect {
  Query = "query",
  Mutation = "mutation",
}

export enum ActionKind {
  Request = "request",
  Success = "success",
  Failure = "failure",
  Invalidate = "invalidate",
  Reset = "reset",
}

export type ActionTypePattern<
  E extends Effect,
  A extends ActionKind,
> = `${E}_${A}#${Domain}${InstanceId}`;

export type ActionType = `${CreatedKey}_${ActionTypePattern<
  Effect,
  ActionKind
>}`;

export type ActionPayload<T = unknown> = {
  createdKey: CreatedKey;
  data: T;
};

export type Action<T = unknown> = {
  type: ActionType;
  payload: ActionPayload<T>;
};

export type ActionWithoutData = {
  type: ActionType;
  payload: Omit<ActionPayload, "data">;
};

export type QueryEffectState<D = unknown> = {
  type: Effect.Query;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  timestamp: QueryTimestamp | null;
  data: D | null;
};

export type MutationEffectState<D = unknown> = {
  type: Effect.Mutation;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: D | null;
};

export type State<E = QueryEffectState | MutationEffectState> = Record<
  CreatedKey,
  E
>;

export type ParentState = Record<string, unknown> & {
  [key: Domain]: State;
};
