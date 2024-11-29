var mr = Object.defineProperty;
var i = (r, e) => mr(r, "name", { value: e, configurable: !0 });
var o = class {
    static {
      i(this, "Either");
    }
    constructor(e) {
      this.$value = e;
    }
    static right(e) {
      return new A(e);
    }
    static left(e) {
      return new w(e);
    }
    static map(e) {
      return (t) => (t?.isRight ? new A(e(t.join())) : t);
    }
    static chain(e) {
      return (t) => (t?.isRight ? e(t.join()) : t);
    }
    static mapLeft(e) {
      return (t) => (t?.isLeft ? new w(e(t.join())) : t);
    }
    static chainLeft(e) {
      return (t) => (t?.isLeft ? e(t.join()) : t);
    }
    static isLeft(e) {
      return !!e?.isLeft;
    }
    static isRight(e) {
      return !!e?.isRight;
    }
    static join(e) {
      if (e?.isLeft || e?.isRight) return e.join();
      throw new Error("Not an Either type");
    }
  },
  w = class extends o {
    static {
      i(this, "Left");
    }
    get isLeft() {
      return !0;
    }
    get isRight() {
      return !1;
    }
    static of() {
      throw new Error(
        "`of` called on class Left (value) instead of Either (type)",
      );
    }
    map() {
      return this;
    }
    join() {
      return this.$value;
    }
  },
  A = class extends o {
    static {
      i(this, "Right");
    }
    get isLeft() {
      return !1;
    }
    get isRight() {
      return !0;
    }
    static of() {
      throw new Error(
        "`of` called on class Right (value) instead of Either (type)",
      );
    }
    map(e) {
      return o.right(e(this.$value));
    }
    join() {
      return this.$value;
    }
  };
var v = i((r) => r, "identity"),
  f = i((r, ...e) => e.reduce((t, a) => a(t), r), "pipe");
var R = i(
  (r, ...e) =>
    (t) =>
      e.find((a) => a[0](t))?.[1]?.(t) || r(t),
  "cond",
);
function x(r) {
  return typeof r == "string"
    ? o.right(r)
    : o.left("Expected a string");
}
i(x, "string");
function y(r) {
  return typeof r == "number"
    ? o.right(r)
    : o.left("Expected a number");
}
i(y, "number");
function M(r) {
  return Array.isArray(r) ? o.right(r) : o.left("Expected an array");
}
i(M, "array");
function $(r) {
  return r != null;
}
i($, "isNotNullish");
var N = i(
  (r) => (e) => {
    for (let t of e)
      if (!r.includes(typeof t))
        return o.left("Expected an array of " + r.join(", "));
    return o.right(e);
  },
  "arrayOf",
);
function V(r) {
  return r >= 0 ? o.right(r) : o.left("Expected a positive number");
}
i(V, "positive");
function Q(r) {
  return typeof r == "object" && r !== null && !Array.isArray(r)
    ? o.right(r)
    : o.left("Expected an object");
}
i(Q, "object");
function T(r) {
  return typeof r == "function"
    ? o.right(r)
    : o.left("Expected a function");
}
i(T, "fn");
function j(r) {
  return typeof r == "number" || r === void 0
    ? o.right(r)
    : o.left("Expected a number or undefined");
}
i(j, "numberOrUndefined");
var B = i(
    (r) => (e, t, a) =>
      f(
        e,
        a,
        o.chain(v),
        o.chainLeft(() => r[t]),
      ),
    "validate",
  ),
  Y = i((r, e) => {
    var t = i((s) => s.some(o.isLeft), "withErrors"),
      a = i((s) => {
        throw new Error(s.filter(o.isLeft).map(o.join).join("; "));
      }, "terminate"),
      n = i((s) => (u) => new s(...u.map(o.join)), "init");
    return f(e, R(n(r), [t, a]));
  }, "instantiate"),
  C = (() => {
    function r(e, t, a, n) {
      (this.staleTime = e),
        (this.extractError = t),
        (this.retry = a),
        (this.retryDelay = n);
    }
    return (
      i(r, "Options"),
      (r.from = function ({
        staleTime: e,
        extractError: t,
        retry: a,
        retryDelay: n,
      }) {
        return Y(r, [y(e), T(t), y(a), j(n)]);
      }),
      (r.prototype.merge = function (e) {
        var t = B(this);
        return r.from({
          staleTime: t(e.staleTime, "staleTime", y),
          extractError: t(e.extractError, "extractError", T),
          retry: t(e.retry, "retry", y),
          retryDelay: t(e.retryDelay, "retryDelay", y),
        });
      }),
      r
    );
  })(),
  G = (() => {
    function r(e, t, a) {
      (this.extractError = e),
        (this.retry = t),
        (this.retryDelay = a);
    }
    return (
      i(r, "Options"),
      (r.from = function ({
        extractError: e,
        retry: t,
        retryDelay: a,
      }) {
        return Y(r, [T(e), y(t), j(a)]);
      }),
      (r.prototype.merge = function (e) {
        var t = B(this);
        return r.from({
          extractError: t(e.extractError, "extractError", T),
          retry: t(e.retry, "retry", y),
          retryDelay: t(e.retryDelay, "retryDelay", y),
        });
      }),
      r
    );
  })();
var W = {
  from: i(function (r) {
    var e = i((t) => {
      throw new Error(t);
    }, "terminate");
    return f(r(), x, o.chain(v), o.chainLeft(e));
  }, "from"),
};
var z = {
  from: i(function (r) {
    var e = i((t) => {
      throw new Error(t);
    }, "terminate");
    return f(r(), y, o.chain(V), o.chain(v), o.chainLeft(e));
  }, "from"),
};
import { delay as pr, call as F } from "redux-saga/effects";
var H = i(
    (r) => (e) => {
      var t = r(),
        a = i((u) => (l) => `${u}_${l}@${e}#${t}`, "pattern"),
        n = a("query"),
        s = a("mutation");
      return {
        query: {
          request: n("request"),
          success: n("success"),
          failure: n("failure"),
          invalidate: n("invalidate"),
          reset: n("reset"),
        },
        mutation: {
          request: s("request"),
          success: s("success"),
          failure: s("failure"),
        },
      };
    },
    "createActionTypePatterns",
  ),
  h = i((r) => (e) => `${r}@${e}`, "createActionType"),
  g = i(
    (r) =>
      ({ type: e, data: t, timestamp: a, error: n }) => ({
        type: e,
        payload: { key: r, data: t, timestamp: a, error: n },
      }),
    "createAction",
  ),
  k = i(
    (r, e) =>
      (t = {}) =>
        t?.[r]?.[e]?.data || null,
    "selectData",
  ),
  S = i(
    (r, e) =>
      (t = {}) => {
        var a = t?.[r]?.[e] || {};
        return !!(a.isLoading || a.isFetching);
      },
    "selectIsInProgress",
  ),
  q = i(
    (r, e) =>
      (t = {}) =>
        t?.[r]?.[e] || {},
    "selectKeyState",
  ),
  b = i(
    (r, e) =>
      (t = {}) =>
        f(
          t?.[e] || {},
          Q,
          o.chain((a) =>
            Object.keys(a).filter((n) => n.startsWith(r)),
          ),
          o.chainLeft(() => []),
        ),
    "selectMatchedKeys",
  );
function* I(r, e, t) {
  function* a(n = 0) {
    try {
      return yield F(r);
    } catch (s) {
      if (n === e) throw s;
      return yield pr(t ?? 1e3 * (1 << n)), yield F(a, n + 1);
    }
  }
  return i(a, "runner"), yield F(a);
}
i(I, "withRetry");
var d = {
  from: i((r) => {
    var e = ["string", "number", "bigint", "boolean"],
      t = i((u) => {
        throw new Error(u);
      }, "terminate"),
      a = i((u) => u.filter($), "removeNullish"),
      n = N(e),
      s = i((u) => u.join("_"), "compose");
    return f(M(r), o.map(a), o.chain(n), o.chain(s), o.chainLeft(t));
  }, "from"),
};
var J = i(function (r) {
  return (e) => (t) => {
    var a = d.from(e);
    return t?.[r]?.[a];
  };
}, "getSelector");
var dr = i(
    (r) =>
      o.isRight(x(r.type)) && o.isRight(x(r.payload?.key))
        ? o.right(r)
        : o.left(r),
    "validateAction",
  ),
  vr = i((r) => (e) => e.type.includes(r), "actionTypeMatch"),
  L = i((r) => r || null, "dataFallback"),
  hr = i((r) => (e) => ({ ...r, ...e }), "mergeStates"),
  gr = i((r) => (e) => ({ [r]: e }), "assignKey"),
  D = {
    request: i(
      (r) => (e) => {
        var { payload: t } = e,
          a = !r?.[t.key]?.data;
        return {
          isLoading: a,
          isFetching: !0,
          isLoaded: !1,
          isError: !1,
          isValid: !1,
          isReset: !1,
          timestamp: void 0,
          data: L(r?.[t.key]?.data),
          error: null,
        };
      },
      "request",
    ),
    success: i(
      () =>
        ({ payload: r }) => ({
          isLoading: !1,
          isFetching: !1,
          isLoaded: !0,
          isError: !1,
          isValid: !0,
          isReset: !1,
          timestamp: r.timestamp,
          data: L(r?.data),
          error: null,
        }),
      "success",
    ),
    failure: i(
      (r) =>
        ({ payload: e }) => ({
          isLoading: !1,
          isFetching: !1,
          isLoaded: !1,
          isError: !0,
          isValid: !1,
          isReset: !1,
          timestamp: void 0,
          data: L(r?.[e?.key]?.data),
          error: e.error || null,
        }),
      "failure",
    ),
    invalidate: i(
      (r) =>
        ({ payload: e }) => ({
          isLoading: !!r?.[e.key]?.isLoading,
          isFetching: !!r?.[e.key]?.isFetching,
          isLoaded: !!r?.[e.key]?.isLoaded,
          isError: !!r?.[e.key]?.isError,
          isValid: !1,
          isReset: !1,
          timestamp: void 0,
          data: L(r?.[e.key]?.data),
          error: r?.[e.key]?.error || null,
        }),
      "invalidate",
    ),
    reset: i(
      () => () => ({
        isLoading: !1,
        isFetching: !1,
        isLoaded: !1,
        isError: !1,
        isValid: !1,
        isReset: !0,
        timestamp: void 0,
        data: null,
        error: null,
      }),
      "reset",
    ),
  },
  K = {
    request: i(
      (r) =>
        ({ payload: e }) => ({
          isLoading: !0,
          isLoaded: !1,
          isError: !1,
          data: L(r?.[e.key]?.data),
          error: null,
        }),
      "request",
    ),
    success: i(
      () =>
        ({ payload: r }) => ({
          isLoading: !1,
          isLoaded: !0,
          isError: !1,
          data: L(r?.data),
          error: null,
        }),
      "success",
    ),
    failure: i(
      (r) =>
        ({ payload: e }) => ({
          isLoading: !1,
          isLoaded: !1,
          isError: !0,
          data: L(r?.[e?.key]?.data),
          error: e.error || null,
        }),
      "failure",
    ),
  },
  Er = i(
    (r, e) => (t) => f(e(r)(t), gr(t.payload.key), hr(r)),
    "toNextState",
  ),
  X = i(function (r) {
    var { query: e, mutation: t } = r,
      a = [
        [e.request, D.request],
        [e.success, D.success],
        [e.failure, D.failure],
        [e.invalidate, D.invalidate],
        [e.reset, D.reset],
        [t.request, K.request],
        [t.success, K.success],
        [t.failure, K.failure],
      ];
    return function (n, s = {}) {
      var u = i(() => n || {}, "stateIdentity"),
        l = R(u, ...a.map(([c, p]) => [vr(c), Er(n, p)]));
      return f(s, dr, o.chain(l), o.chainLeft(u));
    };
  }, "getReducer");
import { call as Z, put as P, select as O } from "redux-saga/effects";
var xr = i(
  (r, e, t, a) =>
    (n = {}) => {
      var s = n?.[r]?.[e] || {},
        u = s?.timestamp;
      return !u || o.isLeft(y(u)) ? !1 : t() - u < a;
    },
  "selectIsValid",
);
function* Lr({
  fn: r,
  action: e,
  actionType: t,
  patterns: a,
  createTimestamp: n,
  extractError: s,
  retry: u,
  retryDelay: l,
}) {
  try {
    yield P(e({ type: t(a.query.request) }));
    var c = yield Z(I, r, u, l),
      p = n();
    return (
      yield P(e({ type: t(a.query.success), data: c, timestamp: p })),
      c
    );
  } catch (E) {
    var m = s(E);
    throw (yield P(e({ type: t(a.query.failure), error: m })), m);
  }
}
i(Lr, "executor");
var rr = i(
  ({
    domain: r,
    actionTypePatterns: e,
    initOptions: t,
    createTimestamp: a,
  }) =>
    function* ({ key: n, fn: s, options: u }) {
      var l = t.merge({
          staleTime: u?.staleTime,
          extractError: u?.extractError,
          retry: u?.retry,
          retryDelay: u?.retryDelay,
        }),
        c = d.from(n),
        p = h(c),
        m = g(c),
        E = i(() => k(r, c), "stateSelector"),
        fr = yield O(S(r, c)),
        yr = yield O(xr(r, c, a, l.staleTime));
      return fr || yr
        ? yield O(E())
        : yield Z(Lr, {
            fn: s,
            action: m,
            actionType: p,
            patterns: e,
            createTimestamp: a,
            extractError: l.extractError,
            retry: l.retry,
            retryDelay: l.retryDelay,
          });
    },
  "getQuery",
);
import {
  call as tr,
  put as U,
  select as er,
} from "redux-saga/effects";
function* Tr({
  fn: r,
  action: e,
  actionType: t,
  patterns: a,
  extractError: n,
  retry: s,
  retryDelay: u,
}) {
  try {
    yield U(e({ type: t(a.mutation.request) }));
    var l = yield tr(I, r, s, u);
    return yield U(e({ type: t(a.mutation.success), data: l })), l;
  } catch (p) {
    var c = n(p);
    throw (yield U(e({ type: t(a.mutation.failure), error: c })), c);
  }
}
i(Tr, "executor");
var ir = i(
  ({ domain: r, actionTypePatterns: e, initOptions: t }) =>
    function* ({ key: a, fn: n, options: s }) {
      var u = t.merge({
          extractError: s?.extractError,
          retry: s?.retry,
          retryDelay: s?.retryDelay,
        }),
        l = d.from(a),
        c = h(l),
        p = g(l),
        m = i(() => k(r, l), "stateSelector"),
        E = yield er(S(r, l));
      return E
        ? yield er(m())
        : yield tr(Tr, {
            fn: n,
            action: p,
            actionType: c,
            patterns: e,
            extractError: u.extractError,
            retry: u.retry,
            retryDelay: u.retryDelay,
          });
    },
  "getMutation",
);
import { put as Dr, select as ar } from "redux-saga/effects";
var or = i(
  ({ actionTypePatterns: r, domain: e }) =>
    function* ({ key: t }) {
      var a = d.from(t),
        n = yield ar(b(a, e));
      for (let s of n) {
        let u = yield ar(q(e, s)),
          l = h(s),
          c = g(s);
        u.isValid &&
          !u.isLoading &&
          !u.isFetching &&
          (yield Dr(c({ type: l(r.query.invalidate) })));
      }
    },
  "getInvalidate",
);
import { put as wr, select as nr } from "redux-saga/effects";
var sr = i(
  ({ actionTypePatterns: r, domain: e }) =>
    function* ({ key: t }) {
      var a = d.from(t),
        n = yield nr(b(a, e));
      for (let s of n) {
        let u = yield nr(q(e, s)),
          l = h(s),
          c = g(s);
        u.isReset || (yield wr(c({ type: l(r.query.reset) })));
      }
    },
  "getReset",
);
var ur = {
  from: i(function (r) {
    var e = i((t) => {
      throw new Error(t);
    }, "terminate");
    return f(r, x, o.chain(v), o.chainLeft(e));
  }, "from"),
};
var _ = {
    extractError: i(
      (r) => r?.message || r?.name || "An error occurred",
      "extractError",
    ),
  },
  lr = { retry: 3 },
  cr = { retry: 0 };
var Ar = 1;
function ze({
  domain: r,
  extractError: e,
  retry: t,
  retryDelay: a,
  query: n,
  mutation: s,
  createInstanceId: u,
}) {
  var l = ur.from(r),
    c = C.from({
      staleTime: n.staleTime,
      extractError: e || n.extractError || _.extractError,
      retry: t ?? n.retry ?? lr.retry,
      retryDelay: a ?? n.retryDelay,
    }),
    p = G.from({
      extractError: e || s?.extractError || _.extractError,
      retry: s?.retry || cr.retry,
      retryDelay: s?.retryDelay,
    }),
    m = H(() => W.from(u || (() => String(Ar++))))(l),
    E = i(() => z.from(Date.now), "createTimestamp");
  return {
    reducer: X(m),
    selector: J(l),
    query: rr({
      domain: l,
      actionTypePatterns: m,
      initOptions: c,
      createTimestamp: E,
    }),
    mutation: ir({
      domain: l,
      actionTypePatterns: m,
      initOptions: p,
    }),
    invalidate: or({ domain: l, actionTypePatterns: m }),
    reset: sr({ domain: l, actionTypePatterns: m }),
  };
}
i(ze, "initSagaQuery");
export { ze as initSagaQuery };
