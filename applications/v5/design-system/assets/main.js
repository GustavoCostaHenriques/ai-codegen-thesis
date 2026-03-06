var Xa = (p, E) => () => (E || p((E = {
    exports: {}
}).exports, E),
E.exports);
var Oo = Xa( (Po, rr) => {
    function Ka(p, E) {
        for (var O = 0; O < E.length; O++) {
            const L = E[O];
            if (typeof L != "string" && !Array.isArray(L)) {
                for (const D in L)
                    if (D !== "default" && !(D in p)) {
                        const n = Object.getOwnPropertyDescriptor(L, D);
                        n && Object.defineProperty(p, D, n.get ? n : {
                            enumerable: !0,
                            get: () => L[D]
                        })
                    }
            }
        }
        return Object.freeze(Object.defineProperty(p, Symbol.toStringTag, {
            value: "Module"
        }))
    }
    (function() {
        const E = document.createElement("link").relList;
        if (E && E.supports && E.supports("modulepreload"))
            return;
        for (const D of document.querySelectorAll('link[rel="modulepreload"]'))
            L(D);
        new MutationObserver(D => {
            for (const n of D)
                if (n.type === "childList")
                    for (const o of n.addedNodes)
                        o.tagName === "LINK" && o.rel === "modulepreload" && L(o)
        }
        ).observe(document, {
            childList: !0,
            subtree: !0
        });
        function O(D) {
            const n = {};
            return D.integrity && (n.integrity = D.integrity),
            D.referrerPolicy && (n.referrerPolicy = D.referrerPolicy),
            D.crossOrigin === "use-credentials" ? n.credentials = "include" : D.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin",
            n
        }
        function L(D) {
            if (D.ep)
                return;
            D.ep = !0;
            const n = O(D);
            fetch(D.href, n)
        }
    }
    )();
    var Pr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
    function Nr(p) {
        return p && p.__esModule && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p
    }
    var eo = {
        exports: {}
    }
      , Mr = {
        exports: {}
    };
    /*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
    var Jr;
    function sr() {
        return Jr || (Jr = 1,
        function(p) {
            (function(E, O) {
                p.exports = E.document ? O(E, !0) : function(L) {
                    if (!L.document)
                        throw new Error("jQuery requires a window with a document");
                    return O(L)
                }
            }
            )(typeof window < "u" ? window : Pr, function(E, O) {
                var L = []
                  , D = Object.getPrototypeOf
                  , n = L.slice
                  , o = L.flat ? function(e) {
                    return L.flat.call(e)
                }
                : function(e) {
                    return L.concat.apply([], e)
                }
                  , l = L.push
                  , c = L.indexOf
                  , d = {}
                  , a = d.toString
                  , m = d.hasOwnProperty
                  , _ = m.toString
                  , M = _.call(Object)
                  , N = {}
                  , W = function(i) {
                    return typeof i == "function" && typeof i.nodeType != "number" && typeof i.item != "function"
                }
                  , U = function(i) {
                    return i != null && i === i.window
                }
                  , z = E.document
                  , pe = {
                    type: !0,
                    src: !0,
                    nonce: !0,
                    noModule: !0
                };
                function fe(e, i, u) {
                    u = u || z;
                    var h, b, w = u.createElement("script");
                    if (w.text = e,
                    i)
                        for (h in pe)
                            b = i[h] || i.getAttribute && i.getAttribute(h),
                            b && w.setAttribute(h, b);
                    u.head.appendChild(w).parentNode.removeChild(w)
                }
                function we(e) {
                    return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? d[a.call(e)] || "object" : typeof e
                }
                var be = "3.7.1"
                  , ne = /HTML$/i
                  , s = function(e, i) {
                    return new s.fn.init(e,i)
                };
                s.fn = s.prototype = {
                    jquery: be,
                    constructor: s,
                    length: 0,
                    toArray: function() {
                        return n.call(this)
                    },
                    get: function(e) {
                        return e == null ? n.call(this) : e < 0 ? this[e + this.length] : this[e]
                    },
                    pushStack: function(e) {
                        var i = s.merge(this.constructor(), e);
                        return i.prevObject = this,
                        i
                    },
                    each: function(e) {
                        return s.each(this, e)
                    },
                    map: function(e) {
                        return this.pushStack(s.map(this, function(i, u) {
                            return e.call(i, u, i)
                        }))
                    },
                    slice: function() {
                        return this.pushStack(n.apply(this, arguments))
                    },
                    first: function() {
                        return this.eq(0)
                    },
                    last: function() {
                        return this.eq(-1)
                    },
                    even: function() {
                        return this.pushStack(s.grep(this, function(e, i) {
                            return (i + 1) % 2
                        }))
                    },
                    odd: function() {
                        return this.pushStack(s.grep(this, function(e, i) {
                            return i % 2
                        }))
                    },
                    eq: function(e) {
                        var i = this.length
                          , u = +e + (e < 0 ? i : 0);
                        return this.pushStack(u >= 0 && u < i ? [this[u]] : [])
                    },
                    end: function() {
                        return this.prevObject || this.constructor()
                    },
                    push: l,
                    sort: L.sort,
                    splice: L.splice
                },
                s.extend = s.fn.extend = function() {
                    var e, i, u, h, b, w, k = arguments[0] || {}, R = 1, I = arguments.length, B = !1;
                    for (typeof k == "boolean" && (B = k,
                    k = arguments[R] || {},
                    R++),
                    typeof k != "object" && !W(k) && (k = {}),
                    R === I && (k = this,
                    R--); R < I; R++)
                        if ((e = arguments[R]) != null)
                            for (i in e)
                                h = e[i],
                                !(i === "__proto__" || k === h) && (B && h && (s.isPlainObject(h) || (b = Array.isArray(h))) ? (u = k[i],
                                b && !Array.isArray(u) ? w = [] : !b && !s.isPlainObject(u) ? w = {} : w = u,
                                b = !1,
                                k[i] = s.extend(B, w, h)) : h !== void 0 && (k[i] = h));
                    return k
                }
                ,
                s.extend({
                    expando: "jQuery" + (be + Math.random()).replace(/\D/g, ""),
                    isReady: !0,
                    error: function(e) {
                        throw new Error(e)
                    },
                    noop: function() {},
                    isPlainObject: function(e) {
                        var i, u;
                        return !e || a.call(e) !== "[object Object]" ? !1 : (i = D(e),
                        i ? (u = m.call(i, "constructor") && i.constructor,
                        typeof u == "function" && _.call(u) === M) : !0)
                    },
                    isEmptyObject: function(e) {
                        var i;
                        for (i in e)
                            return !1;
                        return !0
                    },
                    globalEval: function(e, i, u) {
                        fe(e, {
                            nonce: i && i.nonce
                        }, u)
                    },
                    each: function(e, i) {
                        var u, h = 0;
                        if (F(e))
                            for (u = e.length; h < u && i.call(e[h], h, e[h]) !== !1; h++)
                                ;
                        else
                            for (h in e)
                                if (i.call(e[h], h, e[h]) === !1)
                                    break;
                        return e
                    },
                    text: function(e) {
                        var i, u = "", h = 0, b = e.nodeType;
                        if (!b)
                            for (; i = e[h++]; )
                                u += s.text(i);
                        return b === 1 || b === 11 ? e.textContent : b === 9 ? e.documentElement.textContent : b === 3 || b === 4 ? e.nodeValue : u
                    },
                    makeArray: function(e, i) {
                        var u = i || [];
                        return e != null && (F(Object(e)) ? s.merge(u, typeof e == "string" ? [e] : e) : l.call(u, e)),
                        u
                    },
                    inArray: function(e, i, u) {
                        return i == null ? -1 : c.call(i, e, u)
                    },
                    isXMLDoc: function(e) {
                        var i = e && e.namespaceURI
                          , u = e && (e.ownerDocument || e).documentElement;
                        return !ne.test(i || u && u.nodeName || "HTML")
                    },
                    merge: function(e, i) {
                        for (var u = +i.length, h = 0, b = e.length; h < u; h++)
                            e[b++] = i[h];
                        return e.length = b,
                        e
                    },
                    grep: function(e, i, u) {
                        for (var h, b = [], w = 0, k = e.length, R = !u; w < k; w++)
                            h = !i(e[w], w),
                            h !== R && b.push(e[w]);
                        return b
                    },
                    map: function(e, i, u) {
                        var h, b, w = 0, k = [];
                        if (F(e))
                            for (h = e.length; w < h; w++)
                                b = i(e[w], w, u),
                                b != null && k.push(b);
                        else
                            for (w in e)
                                b = i(e[w], w, u),
                                b != null && k.push(b);
                        return o(k)
                    },
                    guid: 1,
                    support: N
                }),
                typeof Symbol == "function" && (s.fn[Symbol.iterator] = L[Symbol.iterator]),
                s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, i) {
                    d["[object " + i + "]"] = i.toLowerCase()
                });
                function F(e) {
                    var i = !!e && "length"in e && e.length
                      , u = we(e);
                    return W(e) || U(e) ? !1 : u === "array" || i === 0 || typeof i == "number" && i > 0 && i - 1 in e
                }
                function A(e, i) {
                    return e.nodeName && e.nodeName.toLowerCase() === i.toLowerCase()
                }
                var C = L.pop
                  , x = L.sort
                  , g = L.splice
                  , y = "[\\x20\\t\\r\\n\\f]"
                  , S = new RegExp("^" + y + "+|((?:^|[^\\\\])(?:\\\\.)*)" + y + "+$","g");
                s.contains = function(e, i) {
                    var u = i && i.parentNode;
                    return e === u || !!(u && u.nodeType === 1 && (e.contains ? e.contains(u) : e.compareDocumentPosition && e.compareDocumentPosition(u) & 16))
                }
                ;
                var Y = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
                function q(e, i) {
                    return i ? e === "\0" ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                }
                s.escapeSelector = function(e) {
                    return (e + "").replace(Y, q)
                }
                ;
                var G = z
                  , se = l;
                (function() {
                    var e, i, u, h, b, w = se, k, R, I, B, J, te = s.expando, Z = 0, oe = 0, ke = Vi(), Ie = Vi(), $e = Vi(), rt = Vi(), it = function(P, H) {
                        return P === H && (b = !0),
                        0
                    }, Et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", Mt = "(?:\\\\[\\da-fA-F]{1,6}" + y + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", Fe = "\\[" + y + "*(" + Mt + ")(?:" + y + "*([*^$|!~]?=)" + y + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + Mt + "))|)" + y + "*\\]", Xt = ":(" + Mt + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + Fe + ")*)|.*)\\)|)", je = new RegExp(y + "+","g"), et = new RegExp("^" + y + "*," + y + "*"), pi = new RegExp("^" + y + "*([>+~]|" + y + ")" + y + "*"), pn = new RegExp(y + "|>"), lt = new RegExp(Xt), $i = new RegExp("^" + Mt + "$"), bt = {
                        ID: new RegExp("^#(" + Mt + ")"),
                        CLASS: new RegExp("^\\.(" + Mt + ")"),
                        TAG: new RegExp("^(" + Mt + "|[*])"),
                        ATTR: new RegExp("^" + Fe),
                        PSEUDO: new RegExp("^" + Xt),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + y + "*(even|odd|(([+-]|)(\\d*)n|)" + y + "*(?:([+-]|)" + y + "*(\\d+)|))" + y + "*\\)|)","i"),
                        bool: new RegExp("^(?:" + Et + ")$","i"),
                        needsContext: new RegExp("^" + y + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + y + "*((?:-\\d)?\\d*)" + y + "*\\)|)(?=[^-]|$)","i")
                    }, Ht = /^(?:input|select|textarea|button)$/i, Ot = /^h\d$/i, wt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, gn = /[+~]/, Yt = new RegExp("\\\\[\\da-fA-F]{1,6}" + y + "?|\\\\([^\\r\\n\\f])","g"), Rt = function(P, H) {
                        var V = "0x" + P.slice(1) - 65536;
                        return H || (V < 0 ? String.fromCharCode(V + 65536) : String.fromCharCode(V >> 10 | 55296, V & 1023 | 56320))
                    }, Bn = function() {
                        Bt()
                    }, Dr = gi(function(P) {
                        return P.disabled === !0 && A(P, "fieldset")
                    }, {
                        dir: "parentNode",
                        next: "legend"
                    });
                    function Wn() {
                        try {
                            return k.activeElement
                        } catch {}
                    }
                    try {
                        w.apply(L = n.call(G.childNodes), G.childNodes),
                        L[G.childNodes.length].nodeType
                    } catch {
                        w = {
                            apply: function(H, V) {
                                se.apply(H, n.call(V))
                            },
                            call: function(H) {
                                se.apply(H, n.call(arguments, 1))
                            }
                        }
                    }
                    function De(P, H, V, Q) {
                        var ee, ue, he, _e, de, Ne, Se, xe = H && H.ownerDocument, Le = H ? H.nodeType : 9;
                        if (V = V || [],
                        typeof P != "string" || !P || Le !== 1 && Le !== 9 && Le !== 11)
                            return V;
                        if (!Q && (Bt(H),
                        H = H || k,
                        I)) {
                            if (Le !== 11 && (de = wt.exec(P)))
                                if (ee = de[1]) {
                                    if (Le === 9)
                                        if (he = H.getElementById(ee)) {
                                            if (he.id === ee)
                                                return w.call(V, he),
                                                V
                                        } else
                                            return V;
                                    else if (xe && (he = xe.getElementById(ee)) && De.contains(H, he) && he.id === ee)
                                        return w.call(V, he),
                                        V
                                } else {
                                    if (de[2])
                                        return w.apply(V, H.getElementsByTagName(P)),
                                        V;
                                    if ((ee = de[3]) && H.getElementsByClassName)
                                        return w.apply(V, H.getElementsByClassName(ee)),
                                        V
                                }
                            if (!rt[P + " "] && (!B || !B.test(P))) {
                                if (Se = P,
                                xe = H,
                                Le === 1 && (pn.test(P) || pi.test(P))) {
                                    for (xe = gn.test(P) && mn(H.parentNode) || H,
                                    (xe != H || !N.scope) && ((_e = H.getAttribute("id")) ? _e = s.escapeSelector(_e) : H.setAttribute("id", _e = te)),
                                    Ne = Wt(P),
                                    ue = Ne.length; ue--; )
                                        Ne[ue] = (_e ? "#" + _e : ":scope") + " " + ei(Ne[ue]);
                                    Se = Ne.join(",")
                                }
                                try {
                                    return w.apply(V, xe.querySelectorAll(Se)),
                                    V
                                } catch {
                                    rt(P, !0)
                                } finally {
                                    _e === te && H.removeAttribute("id")
                                }
                            }
                        }
                        return Vn(P.replace(S, "$1"), H, V, Q)
                    }
                    function Vi() {
                        var P = [];
                        function H(V, Q) {
                            return P.push(V + " ") > i.cacheLength && delete H[P.shift()],
                            H[V + " "] = Q
                        }
                        return H
                    }
                    function kt(P) {
                        return P[te] = !0,
                        P
                    }
                    function Kt(P) {
                        var H = k.createElement("fieldset");
                        try {
                            return !!P(H)
                        } catch {
                            return !1
                        } finally {
                            H.parentNode && H.parentNode.removeChild(H),
                            H = null
                        }
                    }
                    function Cr(P) {
                        return function(H) {
                            return A(H, "input") && H.type === P
                        }
                    }
                    function Er(P) {
                        return function(H) {
                            return (A(H, "input") || A(H, "button")) && H.type === P
                        }
                    }
                    function zn(P) {
                        return function(H) {
                            return "form"in H ? H.parentNode && H.disabled === !1 ? "label"in H ? "label"in H.parentNode ? H.parentNode.disabled === P : H.disabled === P : H.isDisabled === P || H.isDisabled !== !P && Dr(H) === P : H.disabled === P : "label"in H ? H.disabled === P : !1
                        }
                    }
                    function St(P) {
                        return kt(function(H) {
                            return H = +H,
                            kt(function(V, Q) {
                                for (var ee, ue = P([], V.length, H), he = ue.length; he--; )
                                    V[ee = ue[he]] && (V[ee] = !(Q[ee] = V[ee]))
                            })
                        })
                    }
                    function mn(P) {
                        return P && typeof P.getElementsByTagName < "u" && P
                    }
                    function Bt(P) {
                        var H, V = P ? P.ownerDocument || P : G;
                        return V == k || V.nodeType !== 9 || !V.documentElement || (k = V,
                        R = k.documentElement,
                        I = !s.isXMLDoc(k),
                        J = R.matches || R.webkitMatchesSelector || R.msMatchesSelector,
                        R.msMatchesSelector && G != k && (H = k.defaultView) && H.top !== H && H.addEventListener("unload", Bn),
                        N.getById = Kt(function(Q) {
                            return R.appendChild(Q).id = s.expando,
                            !k.getElementsByName || !k.getElementsByName(s.expando).length
                        }),
                        N.disconnectedMatch = Kt(function(Q) {
                            return J.call(Q, "*")
                        }),
                        N.scope = Kt(function() {
                            return k.querySelectorAll(":scope")
                        }),
                        N.cssHas = Kt(function() {
                            try {
                                return k.querySelector(":has(*,:jqfake)"),
                                !1
                            } catch {
                                return !0
                            }
                        }),
                        N.getById ? (i.filter.ID = function(Q) {
                            var ee = Q.replace(Yt, Rt);
                            return function(ue) {
                                return ue.getAttribute("id") === ee
                            }
                        }
                        ,
                        i.find.ID = function(Q, ee) {
                            if (typeof ee.getElementById < "u" && I) {
                                var ue = ee.getElementById(Q);
                                return ue ? [ue] : []
                            }
                        }
                        ) : (i.filter.ID = function(Q) {
                            var ee = Q.replace(Yt, Rt);
                            return function(ue) {
                                var he = typeof ue.getAttributeNode < "u" && ue.getAttributeNode("id");
                                return he && he.value === ee
                            }
                        }
                        ,
                        i.find.ID = function(Q, ee) {
                            if (typeof ee.getElementById < "u" && I) {
                                var ue, he, _e, de = ee.getElementById(Q);
                                if (de) {
                                    if (ue = de.getAttributeNode("id"),
                                    ue && ue.value === Q)
                                        return [de];
                                    for (_e = ee.getElementsByName(Q),
                                    he = 0; de = _e[he++]; )
                                        if (ue = de.getAttributeNode("id"),
                                        ue && ue.value === Q)
                                            return [de]
                                }
                                return []
                            }
                        }
                        ),
                        i.find.TAG = function(Q, ee) {
                            return typeof ee.getElementsByTagName < "u" ? ee.getElementsByTagName(Q) : ee.querySelectorAll(Q)
                        }
                        ,
                        i.find.CLASS = function(Q, ee) {
                            if (typeof ee.getElementsByClassName < "u" && I)
                                return ee.getElementsByClassName(Q)
                        }
                        ,
                        B = [],
                        Kt(function(Q) {
                            var ee;
                            R.appendChild(Q).innerHTML = "<a id='" + te + "' href='' disabled='disabled'></a><select id='" + te + "-\r\\' disabled='disabled'><option selected=''></option></select>",
                            Q.querySelectorAll("[selected]").length || B.push("\\[" + y + "*(?:value|" + Et + ")"),
                            Q.querySelectorAll("[id~=" + te + "-]").length || B.push("~="),
                            Q.querySelectorAll("a#" + te + "+*").length || B.push(".#.+[+~]"),
                            Q.querySelectorAll(":checked").length || B.push(":checked"),
                            ee = k.createElement("input"),
                            ee.setAttribute("type", "hidden"),
                            Q.appendChild(ee).setAttribute("name", "D"),
                            R.appendChild(Q).disabled = !0,
                            Q.querySelectorAll(":disabled").length !== 2 && B.push(":enabled", ":disabled"),
                            ee = k.createElement("input"),
                            ee.setAttribute("name", ""),
                            Q.appendChild(ee),
                            Q.querySelectorAll("[name='']").length || B.push("\\[" + y + "*name" + y + "*=" + y + `*(?:''|"")`)
                        }),
                        N.cssHas || B.push(":has"),
                        B = B.length && new RegExp(B.join("|")),
                        it = function(Q, ee) {
                            if (Q === ee)
                                return b = !0,
                                0;
                            var ue = !Q.compareDocumentPosition - !ee.compareDocumentPosition;
                            return ue || (ue = (Q.ownerDocument || Q) == (ee.ownerDocument || ee) ? Q.compareDocumentPosition(ee) : 1,
                            ue & 1 || !N.sortDetached && ee.compareDocumentPosition(Q) === ue ? Q === k || Q.ownerDocument == G && De.contains(G, Q) ? -1 : ee === k || ee.ownerDocument == G && De.contains(G, ee) ? 1 : h ? c.call(h, Q) - c.call(h, ee) : 0 : ue & 4 ? -1 : 1)
                        }
                        ),
                        k
                    }
                    De.matches = function(P, H) {
                        return De(P, null, null, H)
                    }
                    ,
                    De.matchesSelector = function(P, H) {
                        if (Bt(P),
                        I && !rt[H + " "] && (!B || !B.test(H)))
                            try {
                                var V = J.call(P, H);
                                if (V || N.disconnectedMatch || P.document && P.document.nodeType !== 11)
                                    return V
                            } catch {
                                rt(H, !0)
                            }
                        return De(H, k, null, [P]).length > 0
                    }
                    ,
                    De.contains = function(P, H) {
                        return (P.ownerDocument || P) != k && Bt(P),
                        s.contains(P, H)
                    }
                    ,
                    De.attr = function(P, H) {
                        (P.ownerDocument || P) != k && Bt(P);
                        var V = i.attrHandle[H.toLowerCase()]
                          , Q = V && m.call(i.attrHandle, H.toLowerCase()) ? V(P, H, !I) : void 0;
                        return Q !== void 0 ? Q : P.getAttribute(H)
                    }
                    ,
                    De.error = function(P) {
                        throw new Error("Syntax error, unrecognized expression: " + P)
                    }
                    ,
                    s.uniqueSort = function(P) {
                        var H, V = [], Q = 0, ee = 0;
                        if (b = !N.sortStable,
                        h = !N.sortStable && n.call(P, 0),
                        x.call(P, it),
                        b) {
                            for (; H = P[ee++]; )
                                H === P[ee] && (Q = V.push(ee));
                            for (; Q--; )
                                g.call(P, V[Q], 1)
                        }
                        return h = null,
                        P
                    }
                    ,
                    s.fn.uniqueSort = function() {
                        return this.pushStack(s.uniqueSort(n.apply(this)))
                    }
                    ,
                    i = s.expr = {
                        cacheLength: 50,
                        createPseudo: kt,
                        match: bt,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(P) {
                                return P[1] = P[1].replace(Yt, Rt),
                                P[3] = (P[3] || P[4] || P[5] || "").replace(Yt, Rt),
                                P[2] === "~=" && (P[3] = " " + P[3] + " "),
                                P.slice(0, 4)
                            },
                            CHILD: function(P) {
                                return P[1] = P[1].toLowerCase(),
                                P[1].slice(0, 3) === "nth" ? (P[3] || De.error(P[0]),
                                P[4] = +(P[4] ? P[5] + (P[6] || 1) : 2 * (P[3] === "even" || P[3] === "odd")),
                                P[5] = +(P[7] + P[8] || P[3] === "odd")) : P[3] && De.error(P[0]),
                                P
                            },
                            PSEUDO: function(P) {
                                var H, V = !P[6] && P[2];
                                return bt.CHILD.test(P[0]) ? null : (P[3] ? P[2] = P[4] || P[5] || "" : V && lt.test(V) && (H = Wt(V, !0)) && (H = V.indexOf(")", V.length - H) - V.length) && (P[0] = P[0].slice(0, H),
                                P[2] = V.slice(0, H)),
                                P.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function(P) {
                                var H = P.replace(Yt, Rt).toLowerCase();
                                return P === "*" ? function() {
                                    return !0
                                }
                                : function(V) {
                                    return A(V, H)
                                }
                            },
                            CLASS: function(P) {
                                var H = ke[P + " "];
                                return H || (H = new RegExp("(^|" + y + ")" + P + "(" + y + "|$)")) && ke(P, function(V) {
                                    return H.test(typeof V.className == "string" && V.className || typeof V.getAttribute < "u" && V.getAttribute("class") || "")
                                })
                            },
                            ATTR: function(P, H, V) {
                                return function(Q) {
                                    var ee = De.attr(Q, P);
                                    return ee == null ? H === "!=" : H ? (ee += "",
                                    H === "=" ? ee === V : H === "!=" ? ee !== V : H === "^=" ? V && ee.indexOf(V) === 0 : H === "*=" ? V && ee.indexOf(V) > -1 : H === "$=" ? V && ee.slice(-V.length) === V : H === "~=" ? (" " + ee.replace(je, " ") + " ").indexOf(V) > -1 : H === "|=" ? ee === V || ee.slice(0, V.length + 1) === V + "-" : !1) : !0
                                }
                            },
                            CHILD: function(P, H, V, Q, ee) {
                                var ue = P.slice(0, 3) !== "nth"
                                  , he = P.slice(-4) !== "last"
                                  , _e = H === "of-type";
                                return Q === 1 && ee === 0 ? function(de) {
                                    return !!de.parentNode
                                }
                                : function(de, Ne, Se) {
                                    var xe, Le, Ce, Qe, ut, st = ue !== he ? "nextSibling" : "previousSibling", xt = de.parentNode, $t = _e && de.nodeName.toLowerCase(), ti = !Se && !_e, ct = !1;
                                    if (xt) {
                                        if (ue) {
                                            for (; st; ) {
                                                for (Ce = de; Ce = Ce[st]; )
                                                    if (_e ? A(Ce, $t) : Ce.nodeType === 1)
                                                        return !1;
                                                ut = st = P === "only" && !ut && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (ut = [he ? xt.firstChild : xt.lastChild],
                                        he && ti) {
                                            for (Le = xt[te] || (xt[te] = {}),
                                            xe = Le[P] || [],
                                            Qe = xe[0] === Z && xe[1],
                                            ct = Qe && xe[2],
                                            Ce = Qe && xt.childNodes[Qe]; Ce = ++Qe && Ce && Ce[st] || (ct = Qe = 0) || ut.pop(); )
                                                if (Ce.nodeType === 1 && ++ct && Ce === de) {
                                                    Le[P] = [Z, Qe, ct];
                                                    break
                                                }
                                        } else if (ti && (Le = de[te] || (de[te] = {}),
                                        xe = Le[P] || [],
                                        Qe = xe[0] === Z && xe[1],
                                        ct = Qe),
                                        ct === !1)
                                            for (; (Ce = ++Qe && Ce && Ce[st] || (ct = Qe = 0) || ut.pop()) && !((_e ? A(Ce, $t) : Ce.nodeType === 1) && ++ct && (ti && (Le = Ce[te] || (Ce[te] = {}),
                                            Le[P] = [Z, ct]),
                                            Ce === de)); )
                                                ;
                                        return ct -= ee,
                                        ct === Q || ct % Q === 0 && ct / Q >= 0
                                    }
                                }
                            },
                            PSEUDO: function(P, H) {
                                var V, Q = i.pseudos[P] || i.setFilters[P.toLowerCase()] || De.error("unsupported pseudo: " + P);
                                return Q[te] ? Q(H) : Q.length > 1 ? (V = [P, P, "", H],
                                i.setFilters.hasOwnProperty(P.toLowerCase()) ? kt(function(ee, ue) {
                                    for (var he, _e = Q(ee, H), de = _e.length; de--; )
                                        he = c.call(ee, _e[de]),
                                        ee[he] = !(ue[he] = _e[de])
                                }) : function(ee) {
                                    return Q(ee, 0, V)
                                }
                                ) : Q
                            }
                        },
                        pseudos: {
                            not: kt(function(P) {
                                var H = []
                                  , V = []
                                  , Q = _n(P.replace(S, "$1"));
                                return Q[te] ? kt(function(ee, ue, he, _e) {
                                    for (var de, Ne = Q(ee, null, _e, []), Se = ee.length; Se--; )
                                        (de = Ne[Se]) && (ee[Se] = !(ue[Se] = de))
                                }) : function(ee, ue, he) {
                                    return H[0] = ee,
                                    Q(H, null, he, V),
                                    H[0] = null,
                                    !V.pop()
                                }
                            }),
                            has: kt(function(P) {
                                return function(H) {
                                    return De(P, H).length > 0
                                }
                            }),
                            contains: kt(function(P) {
                                return P = P.replace(Yt, Rt),
                                function(H) {
                                    return (H.textContent || s.text(H)).indexOf(P) > -1
                                }
                            }),
                            lang: kt(function(P) {
                                return $i.test(P || "") || De.error("unsupported lang: " + P),
                                P = P.replace(Yt, Rt).toLowerCase(),
                                function(H) {
                                    var V;
                                    do
                                        if (V = I ? H.lang : H.getAttribute("xml:lang") || H.getAttribute("lang"))
                                            return V = V.toLowerCase(),
                                            V === P || V.indexOf(P + "-") === 0;
                                    while ((H = H.parentNode) && H.nodeType === 1);
                                    return !1
                                }
                            }),
                            target: function(P) {
                                var H = E.location && E.location.hash;
                                return H && H.slice(1) === P.id
                            },
                            root: function(P) {
                                return P === R
                            },
                            focus: function(P) {
                                return P === Wn() && k.hasFocus() && !!(P.type || P.href || ~P.tabIndex)
                            },
                            enabled: zn(!1),
                            disabled: zn(!0),
                            checked: function(P) {
                                return A(P, "input") && !!P.checked || A(P, "option") && !!P.selected
                            },
                            selected: function(P) {
                                return P.parentNode && P.parentNode.selectedIndex,
                                P.selected === !0
                            },
                            empty: function(P) {
                                for (P = P.firstChild; P; P = P.nextSibling)
                                    if (P.nodeType < 6)
                                        return !1;
                                return !0
                            },
                            parent: function(P) {
                                return !i.pseudos.empty(P)
                            },
                            header: function(P) {
                                return Ot.test(P.nodeName)
                            },
                            input: function(P) {
                                return Ht.test(P.nodeName)
                            },
                            button: function(P) {
                                return A(P, "input") && P.type === "button" || A(P, "button")
                            },
                            text: function(P) {
                                var H;
                                return A(P, "input") && P.type === "text" && ((H = P.getAttribute("type")) == null || H.toLowerCase() === "text")
                            },
                            first: St(function() {
                                return [0]
                            }),
                            last: St(function(P, H) {
                                return [H - 1]
                            }),
                            eq: St(function(P, H, V) {
                                return [V < 0 ? V + H : V]
                            }),
                            even: St(function(P, H) {
                                for (var V = 0; V < H; V += 2)
                                    P.push(V);
                                return P
                            }),
                            odd: St(function(P, H) {
                                for (var V = 1; V < H; V += 2)
                                    P.push(V);
                                return P
                            }),
                            lt: St(function(P, H, V) {
                                var Q;
                                for (V < 0 ? Q = V + H : V > H ? Q = H : Q = V; --Q >= 0; )
                                    P.push(Q);
                                return P
                            }),
                            gt: St(function(P, H, V) {
                                for (var Q = V < 0 ? V + H : V; ++Q < H; )
                                    P.push(Q);
                                return P
                            })
                        }
                    },
                    i.pseudos.nth = i.pseudos.eq;
                    for (e in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    })
                        i.pseudos[e] = Cr(e);
                    for (e in {
                        submit: !0,
                        reset: !0
                    })
                        i.pseudos[e] = Er(e);
                    function Un() {}
                    Un.prototype = i.filters = i.pseudos,
                    i.setFilters = new Un;
                    function Wt(P, H) {
                        var V, Q, ee, ue, he, _e, de, Ne = Ie[P + " "];
                        if (Ne)
                            return H ? 0 : Ne.slice(0);
                        for (he = P,
                        _e = [],
                        de = i.preFilter; he; ) {
                            (!V || (Q = et.exec(he))) && (Q && (he = he.slice(Q[0].length) || he),
                            _e.push(ee = [])),
                            V = !1,
                            (Q = pi.exec(he)) && (V = Q.shift(),
                            ee.push({
                                value: V,
                                type: Q[0].replace(S, " ")
                            }),
                            he = he.slice(V.length));
                            for (ue in i.filter)
                                (Q = bt[ue].exec(he)) && (!de[ue] || (Q = de[ue](Q))) && (V = Q.shift(),
                                ee.push({
                                    value: V,
                                    type: ue,
                                    matches: Q
                                }),
                                he = he.slice(V.length));
                            if (!V)
                                break
                        }
                        return H ? he.length : he ? De.error(P) : Ie(P, _e).slice(0)
                    }
                    function ei(P) {
                        for (var H = 0, V = P.length, Q = ""; H < V; H++)
                            Q += P[H].value;
                        return Q
                    }
                    function gi(P, H, V) {
                        var Q = H.dir
                          , ee = H.next
                          , ue = ee || Q
                          , he = V && ue === "parentNode"
                          , _e = oe++;
                        return H.first ? function(de, Ne, Se) {
                            for (; de = de[Q]; )
                                if (de.nodeType === 1 || he)
                                    return P(de, Ne, Se);
                            return !1
                        }
                        : function(de, Ne, Se) {
                            var xe, Le, Ce = [Z, _e];
                            if (Se) {
                                for (; de = de[Q]; )
                                    if ((de.nodeType === 1 || he) && P(de, Ne, Se))
                                        return !0
                            } else
                                for (; de = de[Q]; )
                                    if (de.nodeType === 1 || he)
                                        if (Le = de[te] || (de[te] = {}),
                                        ee && A(de, ee))
                                            de = de[Q] || de;
                                        else {
                                            if ((xe = Le[ue]) && xe[0] === Z && xe[1] === _e)
                                                return Ce[2] = xe[2];
                                            if (Le[ue] = Ce,
                                            Ce[2] = P(de, Ne, Se))
                                                return !0
                                        }
                            return !1
                        }
                    }
                    function vn(P) {
                        return P.length > 1 ? function(H, V, Q) {
                            for (var ee = P.length; ee--; )
                                if (!P[ee](H, V, Q))
                                    return !1;
                            return !0
                        }
                        : P[0]
                    }
                    function Gn(P, H, V) {
                        for (var Q = 0, ee = H.length; Q < ee; Q++)
                            De(P, H[Q], V);
                        return V
                    }
                    function Zi(P, H, V, Q, ee) {
                        for (var ue, he = [], _e = 0, de = P.length, Ne = H != null; _e < de; _e++)
                            (ue = P[_e]) && (!V || V(ue, Q, ee)) && (he.push(ue),
                            Ne && H.push(_e));
                        return he
                    }
                    function Pi(P, H, V, Q, ee, ue) {
                        return Q && !Q[te] && (Q = Pi(Q)),
                        ee && !ee[te] && (ee = Pi(ee, ue)),
                        kt(function(he, _e, de, Ne) {
                            var Se, xe, Le, Ce, Qe = [], ut = [], st = _e.length, xt = he || Gn(H || "*", de.nodeType ? [de] : de, []), $t = P && (he || !H) ? Zi(xt, Qe, P, de, Ne) : xt;
                            if (V ? (Ce = ee || (he ? P : st || Q) ? [] : _e,
                            V($t, Ce, de, Ne)) : Ce = $t,
                            Q)
                                for (Se = Zi(Ce, ut),
                                Q(Se, [], de, Ne),
                                xe = Se.length; xe--; )
                                    (Le = Se[xe]) && (Ce[ut[xe]] = !($t[ut[xe]] = Le));
                            if (he) {
                                if (ee || P) {
                                    if (ee) {
                                        for (Se = [],
                                        xe = Ce.length; xe--; )
                                            (Le = Ce[xe]) && Se.push($t[xe] = Le);
                                        ee(null, Ce = [], Se, Ne)
                                    }
                                    for (xe = Ce.length; xe--; )
                                        (Le = Ce[xe]) && (Se = ee ? c.call(he, Le) : Qe[xe]) > -1 && (he[Se] = !(_e[Se] = Le))
                                }
                            } else
                                Ce = Zi(Ce === _e ? Ce.splice(st, Ce.length) : Ce),
                                ee ? ee(null, _e, Ce, Ne) : w.apply(_e, Ce)
                        })
                    }
                    function Ni(P) {
                        for (var H, V, Q, ee = P.length, ue = i.relative[P[0].type], he = ue || i.relative[" "], _e = ue ? 1 : 0, de = gi(function(xe) {
                            return xe === H
                        }, he, !0), Ne = gi(function(xe) {
                            return c.call(H, xe) > -1
                        }, he, !0), Se = [function(xe, Le, Ce) {
                            var Qe = !ue && (Ce || Le != u) || ((H = Le).nodeType ? de(xe, Le, Ce) : Ne(xe, Le, Ce));
                            return H = null,
                            Qe
                        }
                        ]; _e < ee; _e++)
                            if (V = i.relative[P[_e].type])
                                Se = [gi(vn(Se), V)];
                            else {
                                if (V = i.filter[P[_e].type].apply(null, P[_e].matches),
                                V[te]) {
                                    for (Q = ++_e; Q < ee && !i.relative[P[Q].type]; Q++)
                                        ;
                                    return Pi(_e > 1 && vn(Se), _e > 1 && ei(P.slice(0, _e - 1).concat({
                                        value: P[_e - 2].type === " " ? "*" : ""
                                    })).replace(S, "$1"), V, _e < Q && Ni(P.slice(_e, Q)), Q < ee && Ni(P = P.slice(Q)), Q < ee && ei(P))
                                }
                                Se.push(V)
                            }
                        return vn(Se)
                    }
                    function yn(P, H) {
                        var V = H.length > 0
                          , Q = P.length > 0
                          , ee = function(ue, he, _e, de, Ne) {
                            var Se, xe, Le, Ce = 0, Qe = "0", ut = ue && [], st = [], xt = u, $t = ue || Q && i.find.TAG("*", Ne), ti = Z += xt == null ? 1 : Math.random() || .1, ct = $t.length;
                            for (Ne && (u = he == k || he || Ne); Qe !== ct && (Se = $t[Qe]) != null; Qe++) {
                                if (Q && Se) {
                                    for (xe = 0,
                                    !he && Se.ownerDocument != k && (Bt(Se),
                                    _e = !I); Le = P[xe++]; )
                                        if (Le(Se, he || k, _e)) {
                                            w.call(de, Se);
                                            break
                                        }
                                    Ne && (Z = ti)
                                }
                                V && ((Se = !Le && Se) && Ce--,
                                ue && ut.push(Se))
                            }
                            if (Ce += Qe,
                            V && Qe !== Ce) {
                                for (xe = 0; Le = H[xe++]; )
                                    Le(ut, st, he, _e);
                                if (ue) {
                                    if (Ce > 0)
                                        for (; Qe--; )
                                            ut[Qe] || st[Qe] || (st[Qe] = C.call(de));
                                    st = Zi(st)
                                }
                                w.apply(de, st),
                                Ne && !ue && st.length > 0 && Ce + H.length > 1 && s.uniqueSort(de)
                            }
                            return Ne && (Z = ti,
                            u = xt),
                            ut
                        };
                        return V ? kt(ee) : ee
                    }
                    function _n(P, H) {
                        var V, Q = [], ee = [], ue = $e[P + " "];
                        if (!ue) {
                            for (H || (H = Wt(P)),
                            V = H.length; V--; )
                                ue = Ni(H[V]),
                                ue[te] ? Q.push(ue) : ee.push(ue);
                            ue = $e(P, yn(ee, Q)),
                            ue.selector = P
                        }
                        return ue
                    }
                    function Vn(P, H, V, Q) {
                        var ee, ue, he, _e, de, Ne = typeof P == "function" && P, Se = !Q && Wt(P = Ne.selector || P);
                        if (V = V || [],
                        Se.length === 1) {
                            if (ue = Se[0] = Se[0].slice(0),
                            ue.length > 2 && (he = ue[0]).type === "ID" && H.nodeType === 9 && I && i.relative[ue[1].type]) {
                                if (H = (i.find.ID(he.matches[0].replace(Yt, Rt), H) || [])[0],
                                H)
                                    Ne && (H = H.parentNode);
                                else
                                    return V;
                                P = P.slice(ue.shift().value.length)
                            }
                            for (ee = bt.needsContext.test(P) ? 0 : ue.length; ee-- && (he = ue[ee],
                            !i.relative[_e = he.type]); )
                                if ((de = i.find[_e]) && (Q = de(he.matches[0].replace(Yt, Rt), gn.test(ue[0].type) && mn(H.parentNode) || H))) {
                                    if (ue.splice(ee, 1),
                                    P = Q.length && ei(ue),
                                    !P)
                                        return w.apply(V, Q),
                                        V;
                                    break
                                }
                        }
                        return (Ne || _n(P, Se))(Q, H, !I, V, !H || gn.test(P) && mn(H.parentNode) || H),
                        V
                    }
                    N.sortStable = te.split("").sort(it).join("") === te,
                    Bt(),
                    N.sortDetached = Kt(function(P) {
                        return P.compareDocumentPosition(k.createElement("fieldset")) & 1
                    }),
                    s.find = De,
                    s.expr[":"] = s.expr.pseudos,
                    s.unique = s.uniqueSort,
                    De.compile = _n,
                    De.select = Vn,
                    De.setDocument = Bt,
                    De.tokenize = Wt,
                    De.escape = s.escapeSelector,
                    De.getText = s.text,
                    De.isXML = s.isXMLDoc,
                    De.selectors = s.expr,
                    De.support = s.support,
                    De.uniqueSort = s.uniqueSort
                }
                )();
                var ae = function(e, i, u) {
                    for (var h = [], b = u !== void 0; (e = e[i]) && e.nodeType !== 9; )
                        if (e.nodeType === 1) {
                            if (b && s(e).is(u))
                                break;
                            h.push(e)
                        }
                    return h
                }
                  , ge = function(e, i) {
                    for (var u = []; e; e = e.nextSibling)
                        e.nodeType === 1 && e !== i && u.push(e);
                    return u
                }
                  , Te = s.expr.match.needsContext
                  , X = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
                function ve(e, i, u) {
                    return W(i) ? s.grep(e, function(h, b) {
                        return !!i.call(h, b, h) !== u
                    }) : i.nodeType ? s.grep(e, function(h) {
                        return h === i !== u
                    }) : typeof i != "string" ? s.grep(e, function(h) {
                        return c.call(i, h) > -1 !== u
                    }) : s.filter(i, e, u)
                }
                s.filter = function(e, i, u) {
                    var h = i[0];
                    return u && (e = ":not(" + e + ")"),
                    i.length === 1 && h.nodeType === 1 ? s.find.matchesSelector(h, e) ? [h] : [] : s.find.matches(e, s.grep(i, function(b) {
                        return b.nodeType === 1
                    }))
                }
                ,
                s.fn.extend({
                    find: function(e) {
                        var i, u, h = this.length, b = this;
                        if (typeof e != "string")
                            return this.pushStack(s(e).filter(function() {
                                for (i = 0; i < h; i++)
                                    if (s.contains(b[i], this))
                                        return !0
                            }));
                        for (u = this.pushStack([]),
                        i = 0; i < h; i++)
                            s.find(e, b[i], u);
                        return h > 1 ? s.uniqueSort(u) : u
                    },
                    filter: function(e) {
                        return this.pushStack(ve(this, e || [], !1))
                    },
                    not: function(e) {
                        return this.pushStack(ve(this, e || [], !0))
                    },
                    is: function(e) {
                        return !!ve(this, typeof e == "string" && Te.test(e) ? s(e) : e || [], !1).length
                    }
                });
                var Ee, re = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, We = s.fn.init = function(e, i, u) {
                    var h, b;
                    if (!e)
                        return this;
                    if (u = u || Ee,
                    typeof e == "string")
                        if (e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? h = [null, e, null] : h = re.exec(e),
                        h && (h[1] || !i))
                            if (h[1]) {
                                if (i = i instanceof s ? i[0] : i,
                                s.merge(this, s.parseHTML(h[1], i && i.nodeType ? i.ownerDocument || i : z, !0)),
                                X.test(h[1]) && s.isPlainObject(i))
                                    for (h in i)
                                        W(this[h]) ? this[h](i[h]) : this.attr(h, i[h]);
                                return this
                            } else
                                return b = z.getElementById(h[2]),
                                b && (this[0] = b,
                                this.length = 1),
                                this;
                        else
                            return !i || i.jquery ? (i || u).find(e) : this.constructor(i).find(e);
                    else {
                        if (e.nodeType)
                            return this[0] = e,
                            this.length = 1,
                            this;
                        if (W(e))
                            return u.ready !== void 0 ? u.ready(e) : e(s)
                    }
                    return s.makeArray(e, this)
                }
                ;
                We.prototype = s.fn,
                Ee = s(z);
                var Re = /^(?:parents|prev(?:Until|All))/
                  , at = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
                s.fn.extend({
                    has: function(e) {
                        var i = s(e, this)
                          , u = i.length;
                        return this.filter(function() {
                            for (var h = 0; h < u; h++)
                                if (s.contains(this, i[h]))
                                    return !0
                        })
                    },
                    closest: function(e, i) {
                        var u, h = 0, b = this.length, w = [], k = typeof e != "string" && s(e);
                        if (!Te.test(e)) {
                            for (; h < b; h++)
                                for (u = this[h]; u && u !== i; u = u.parentNode)
                                    if (u.nodeType < 11 && (k ? k.index(u) > -1 : u.nodeType === 1 && s.find.matchesSelector(u, e))) {
                                        w.push(u);
                                        break
                                    }
                        }
                        return this.pushStack(w.length > 1 ? s.uniqueSort(w) : w)
                    },
                    index: function(e) {
                        return e ? typeof e == "string" ? c.call(s(e), this[0]) : c.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function(e, i) {
                        return this.pushStack(s.uniqueSort(s.merge(this.get(), s(e, i))))
                    },
                    addBack: function(e) {
                        return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
                    }
                });
                function pt(e, i) {
                    for (; (e = e[i]) && e.nodeType !== 1; )
                        ;
                    return e
                }
                s.each({
                    parent: function(e) {
                        var i = e.parentNode;
                        return i && i.nodeType !== 11 ? i : null
                    },
                    parents: function(e) {
                        return ae(e, "parentNode")
                    },
                    parentsUntil: function(e, i, u) {
                        return ae(e, "parentNode", u)
                    },
                    next: function(e) {
                        return pt(e, "nextSibling")
                    },
                    prev: function(e) {
                        return pt(e, "previousSibling")
                    },
                    nextAll: function(e) {
                        return ae(e, "nextSibling")
                    },
                    prevAll: function(e) {
                        return ae(e, "previousSibling")
                    },
                    nextUntil: function(e, i, u) {
                        return ae(e, "nextSibling", u)
                    },
                    prevUntil: function(e, i, u) {
                        return ae(e, "previousSibling", u)
                    },
                    siblings: function(e) {
                        return ge((e.parentNode || {}).firstChild, e)
                    },
                    children: function(e) {
                        return ge(e.firstChild)
                    },
                    contents: function(e) {
                        return e.contentDocument != null && D(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e),
                        s.merge([], e.childNodes))
                    }
                }, function(e, i) {
                    s.fn[e] = function(u, h) {
                        var b = s.map(this, i, u);
                        return e.slice(-5) !== "Until" && (h = u),
                        h && typeof h == "string" && (b = s.filter(h, b)),
                        this.length > 1 && (at[e] || s.uniqueSort(b),
                        Re.test(e) && b.reverse()),
                        this.pushStack(b)
                    }
                });
                var dt = /[^\x20\t\r\n\f]+/g;
                function yi(e) {
                    var i = {};
                    return s.each(e.match(dt) || [], function(u, h) {
                        i[h] = !0
                    }),
                    i
                }
                s.Callbacks = function(e) {
                    e = typeof e == "string" ? yi(e) : s.extend({}, e);
                    var i, u, h, b, w = [], k = [], R = -1, I = function() {
                        for (b = b || e.once,
                        h = i = !0; k.length; R = -1)
                            for (u = k.shift(); ++R < w.length; )
                                w[R].apply(u[0], u[1]) === !1 && e.stopOnFalse && (R = w.length,
                                u = !1);
                        e.memory || (u = !1),
                        i = !1,
                        b && (u ? w = [] : w = "")
                    }, B = {
                        add: function() {
                            return w && (u && !i && (R = w.length - 1,
                            k.push(u)),
                            function J(te) {
                                s.each(te, function(Z, oe) {
                                    W(oe) ? (!e.unique || !B.has(oe)) && w.push(oe) : oe && oe.length && we(oe) !== "string" && J(oe)
                                })
                            }(arguments),
                            u && !i && I()),
                            this
                        },
                        remove: function() {
                            return s.each(arguments, function(J, te) {
                                for (var Z; (Z = s.inArray(te, w, Z)) > -1; )
                                    w.splice(Z, 1),
                                    Z <= R && R--
                            }),
                            this
                        },
                        has: function(J) {
                            return J ? s.inArray(J, w) > -1 : w.length > 0
                        },
                        empty: function() {
                            return w && (w = []),
                            this
                        },
                        disable: function() {
                            return b = k = [],
                            w = u = "",
                            this
                        },
                        disabled: function() {
                            return !w
                        },
                        lock: function() {
                            return b = k = [],
                            !u && !i && (w = u = ""),
                            this
                        },
                        locked: function() {
                            return !!b
                        },
                        fireWith: function(J, te) {
                            return b || (te = te || [],
                            te = [J, te.slice ? te.slice() : te],
                            k.push(te),
                            i || I()),
                            this
                        },
                        fire: function() {
                            return B.fireWith(this, arguments),
                            this
                        },
                        fired: function() {
                            return !!h
                        }
                    };
                    return B
                }
                ;
                function qt(e) {
                    return e
                }
                function oi(e) {
                    throw e
                }
                function Fi(e, i, u, h) {
                    var b;
                    try {
                        e && W(b = e.promise) ? b.call(e).done(i).fail(u) : e && W(b = e.then) ? b.call(e, i, u) : i.apply(void 0, [e].slice(h))
                    } catch (w) {
                        u.apply(void 0, [w])
                    }
                }
                s.extend({
                    Deferred: function(e) {
                        var i = [["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory"), 2], ["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), 1, "rejected"]]
                          , u = "pending"
                          , h = {
                            state: function() {
                                return u
                            },
                            always: function() {
                                return b.done(arguments).fail(arguments),
                                this
                            },
                            catch: function(w) {
                                return h.then(null, w)
                            },
                            pipe: function() {
                                var w = arguments;
                                return s.Deferred(function(k) {
                                    s.each(i, function(R, I) {
                                        var B = W(w[I[4]]) && w[I[4]];
                                        b[I[1]](function() {
                                            var J = B && B.apply(this, arguments);
                                            J && W(J.promise) ? J.promise().progress(k.notify).done(k.resolve).fail(k.reject) : k[I[0] + "With"](this, B ? [J] : arguments)
                                        })
                                    }),
                                    w = null
                                }).promise()
                            },
                            then: function(w, k, R) {
                                var I = 0;
                                function B(J, te, Z, oe) {
                                    return function() {
                                        var ke = this
                                          , Ie = arguments
                                          , $e = function() {
                                            var it, Et;
                                            if (!(J < I)) {
                                                if (it = Z.apply(ke, Ie),
                                                it === te.promise())
                                                    throw new TypeError("Thenable self-resolution");
                                                Et = it && (typeof it == "object" || typeof it == "function") && it.then,
                                                W(Et) ? oe ? Et.call(it, B(I, te, qt, oe), B(I, te, oi, oe)) : (I++,
                                                Et.call(it, B(I, te, qt, oe), B(I, te, oi, oe), B(I, te, qt, te.notifyWith))) : (Z !== qt && (ke = void 0,
                                                Ie = [it]),
                                                (oe || te.resolveWith)(ke, Ie))
                                            }
                                        }
                                          , rt = oe ? $e : function() {
                                            try {
                                                $e()
                                            } catch (it) {
                                                s.Deferred.exceptionHook && s.Deferred.exceptionHook(it, rt.error),
                                                J + 1 >= I && (Z !== oi && (ke = void 0,
                                                Ie = [it]),
                                                te.rejectWith(ke, Ie))
                                            }
                                        }
                                        ;
                                        J ? rt() : (s.Deferred.getErrorHook ? rt.error = s.Deferred.getErrorHook() : s.Deferred.getStackHook && (rt.error = s.Deferred.getStackHook()),
                                        E.setTimeout(rt))
                                    }
                                }
                                return s.Deferred(function(J) {
                                    i[0][3].add(B(0, J, W(R) ? R : qt, J.notifyWith)),
                                    i[1][3].add(B(0, J, W(w) ? w : qt)),
                                    i[2][3].add(B(0, J, W(k) ? k : oi))
                                }).promise()
                            },
                            promise: function(w) {
                                return w != null ? s.extend(w, h) : h
                            }
                        }
                          , b = {};
                        return s.each(i, function(w, k) {
                            var R = k[2]
                              , I = k[5];
                            h[k[1]] = R.add,
                            I && R.add(function() {
                                u = I
                            }, i[3 - w][2].disable, i[3 - w][3].disable, i[0][2].lock, i[0][3].lock),
                            R.add(k[3].fire),
                            b[k[0]] = function() {
                                return b[k[0] + "With"](this === b ? void 0 : this, arguments),
                                this
                            }
                            ,
                            b[k[0] + "With"] = R.fireWith
                        }),
                        h.promise(b),
                        e && e.call(b, b),
                        b
                    },
                    when: function(e) {
                        var i = arguments.length
                          , u = i
                          , h = Array(u)
                          , b = n.call(arguments)
                          , w = s.Deferred()
                          , k = function(R) {
                            return function(I) {
                                h[R] = this,
                                b[R] = arguments.length > 1 ? n.call(arguments) : I,
                                --i || w.resolveWith(h, b)
                            }
                        };
                        if (i <= 1 && (Fi(e, w.done(k(u)).resolve, w.reject, !i),
                        w.state() === "pending" || W(b[u] && b[u].then)))
                            return w.then();
                        for (; u--; )
                            Fi(b[u], k(u), w.reject);
                        return w.promise()
                    }
                });
                var tn = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                s.Deferred.exceptionHook = function(e, i) {
                    E.console && E.console.warn && e && tn.test(e.name) && E.console.warn("jQuery.Deferred exception: " + e.message, e.stack, i)
                }
                ,
                s.readyException = function(e) {
                    E.setTimeout(function() {
                        throw e
                    })
                }
                ;
                var _i = s.Deferred();
                s.fn.ready = function(e) {
                    return _i.then(e).catch(function(i) {
                        s.readyException(i)
                    }),
                    this
                }
                ,
                s.extend({
                    isReady: !1,
                    readyWait: 1,
                    ready: function(e) {
                        (e === !0 ? --s.readyWait : s.isReady) || (s.isReady = !0,
                        !(e !== !0 && --s.readyWait > 0) && _i.resolveWith(z, [s]))
                    }
                }),
                s.ready.then = _i.then;
                function bi() {
                    z.removeEventListener("DOMContentLoaded", bi),
                    E.removeEventListener("load", bi),
                    s.ready()
                }
                z.readyState === "complete" || z.readyState !== "loading" && !z.documentElement.doScroll ? E.setTimeout(s.ready) : (z.addEventListener("DOMContentLoaded", bi),
                E.addEventListener("load", bi));
                var nt = function(e, i, u, h, b, w, k) {
                    var R = 0
                      , I = e.length
                      , B = u == null;
                    if (we(u) === "object") {
                        b = !0;
                        for (R in u)
                            nt(e, i, R, u[R], !0, w, k)
                    } else if (h !== void 0 && (b = !0,
                    W(h) || (k = !0),
                    B && (k ? (i.call(e, h),
                    i = null) : (B = i,
                    i = function(J, te, Z) {
                        return B.call(s(J), Z)
                    }
                    )),
                    i))
                        for (; R < I; R++)
                            i(e[R], u, k ? h : h.call(e[R], R, i(e[R], u)));
                    return b ? e : B ? i.call(e) : I ? i(e[0], u) : w
                }
                  , ie = /^-ms-/
                  , Xe = /-([a-z])/g;
                function Oe(e, i) {
                    return i.toUpperCase()
                }
                function Ye(e) {
                    return e.replace(ie, "ms-").replace(Xe, Oe)
                }
                var Ge = function(e) {
                    return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
                };
                function Ve() {
                    this.expando = s.expando + Ve.uid++
                }
                Ve.uid = 1,
                Ve.prototype = {
                    cache: function(e) {
                        var i = e[this.expando];
                        return i || (i = {},
                        Ge(e) && (e.nodeType ? e[this.expando] = i : Object.defineProperty(e, this.expando, {
                            value: i,
                            configurable: !0
                        }))),
                        i
                    },
                    set: function(e, i, u) {
                        var h, b = this.cache(e);
                        if (typeof i == "string")
                            b[Ye(i)] = u;
                        else
                            for (h in i)
                                b[Ye(h)] = i[h];
                        return b
                    },
                    get: function(e, i) {
                        return i === void 0 ? this.cache(e) : e[this.expando] && e[this.expando][Ye(i)]
                    },
                    access: function(e, i, u) {
                        return i === void 0 || i && typeof i == "string" && u === void 0 ? this.get(e, i) : (this.set(e, i, u),
                        u !== void 0 ? u : i)
                    },
                    remove: function(e, i) {
                        var u, h = e[this.expando];
                        if (h !== void 0) {
                            if (i !== void 0)
                                for (Array.isArray(i) ? i = i.map(Ye) : (i = Ye(i),
                                i = i in h ? [i] : i.match(dt) || []),
                                u = i.length; u--; )
                                    delete h[i[u]];
                            (i === void 0 || s.isEmptyObject(h)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                        }
                    },
                    hasData: function(e) {
                        var i = e[this.expando];
                        return i !== void 0 && !s.isEmptyObject(i)
                    }
                };
                var ye = new Ve
                  , Ue = new Ve
                  , wn = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
                  , nn = /[A-Z]/g;
                function Yi(e) {
                    return e === "true" ? !0 : e === "false" ? !1 : e === "null" ? null : e === +e + "" ? +e : wn.test(e) ? JSON.parse(e) : e
                }
                function Ze(e, i, u) {
                    var h;
                    if (u === void 0 && e.nodeType === 1)
                        if (h = "data-" + i.replace(nn, "-$&").toLowerCase(),
                        u = e.getAttribute(h),
                        typeof u == "string") {
                            try {
                                u = Yi(u)
                            } catch {}
                            Ue.set(e, i, u)
                        } else
                            u = void 0;
                    return u
                }
                s.extend({
                    hasData: function(e) {
                        return Ue.hasData(e) || ye.hasData(e)
                    },
                    data: function(e, i, u) {
                        return Ue.access(e, i, u)
                    },
                    removeData: function(e, i) {
                        Ue.remove(e, i)
                    },
                    _data: function(e, i, u) {
                        return ye.access(e, i, u)
                    },
                    _removeData: function(e, i) {
                        ye.remove(e, i)
                    }
                }),
                s.fn.extend({
                    data: function(e, i) {
                        var u, h, b, w = this[0], k = w && w.attributes;
                        if (e === void 0) {
                            if (this.length && (b = Ue.get(w),
                            w.nodeType === 1 && !ye.get(w, "hasDataAttrs"))) {
                                for (u = k.length; u--; )
                                    k[u] && (h = k[u].name,
                                    h.indexOf("data-") === 0 && (h = Ye(h.slice(5)),
                                    Ze(w, h, b[h])));
                                ye.set(w, "hasDataAttrs", !0)
                            }
                            return b
                        }
                        return typeof e == "object" ? this.each(function() {
                            Ue.set(this, e)
                        }) : nt(this, function(R) {
                            var I;
                            if (w && R === void 0)
                                return I = Ue.get(w, e),
                                I !== void 0 || (I = Ze(w, e),
                                I !== void 0) ? I : void 0;
                            this.each(function() {
                                Ue.set(this, e, R)
                            })
                        }, null, i, arguments.length > 1, null, !0)
                    },
                    removeData: function(e) {
                        return this.each(function() {
                            Ue.remove(this, e)
                        })
                    }
                }),
                s.extend({
                    queue: function(e, i, u) {
                        var h;
                        if (e)
                            return i = (i || "fx") + "queue",
                            h = ye.get(e, i),
                            u && (!h || Array.isArray(u) ? h = ye.access(e, i, s.makeArray(u)) : h.push(u)),
                            h || []
                    },
                    dequeue: function(e, i) {
                        i = i || "fx";
                        var u = s.queue(e, i)
                          , h = u.length
                          , b = u.shift()
                          , w = s._queueHooks(e, i)
                          , k = function() {
                            s.dequeue(e, i)
                        };
                        b === "inprogress" && (b = u.shift(),
                        h--),
                        b && (i === "fx" && u.unshift("inprogress"),
                        delete w.stop,
                        b.call(e, k, w)),
                        !h && w && w.empty.fire()
                    },
                    _queueHooks: function(e, i) {
                        var u = i + "queueHooks";
                        return ye.get(e, u) || ye.access(e, u, {
                            empty: s.Callbacks("once memory").add(function() {
                                ye.remove(e, [i + "queue", u])
                            })
                        })
                    }
                }),
                s.fn.extend({
                    queue: function(e, i) {
                        var u = 2;
                        return typeof e != "string" && (i = e,
                        e = "fx",
                        u--),
                        arguments.length < u ? s.queue(this[0], e) : i === void 0 ? this : this.each(function() {
                            var h = s.queue(this, e, i);
                            s._queueHooks(this, e),
                            e === "fx" && h[0] !== "inprogress" && s.dequeue(this, e)
                        })
                    },
                    dequeue: function(e) {
                        return this.each(function() {
                            s.dequeue(this, e)
                        })
                    },
                    clearQueue: function(e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function(e, i) {
                        var u, h = 1, b = s.Deferred(), w = this, k = this.length, R = function() {
                            --h || b.resolveWith(w, [w])
                        };
                        for (typeof e != "string" && (i = e,
                        e = void 0),
                        e = e || "fx"; k--; )
                            u = ye.get(w[k], e + "queueHooks"),
                            u && u.empty && (h++,
                            u.empty.add(R));
                        return R(),
                        b.promise(i)
                    }
                });
                var rn = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
                  , li = new RegExp("^(?:([+-])=|)(" + rn + ")([a-z%]*)$","i")
                  , yt = ["Top", "Right", "Bottom", "Left"]
                  , Pt = z.documentElement
                  , Nt = function(e) {
                    return s.contains(e.ownerDocument, e)
                }
                  , ui = {
                    composed: !0
                };
                Pt.getRootNode && (Nt = function(e) {
                    return s.contains(e.ownerDocument, e) || e.getRootNode(ui) === e.ownerDocument
                }
                );
                var zt = function(e, i) {
                    return e = i || e,
                    e.style.display === "none" || e.style.display === "" && Nt(e) && s.css(e, "display") === "none"
                };
                function xn(e, i, u, h) {
                    var b, w, k = 20, R = h ? function() {
                        return h.cur()
                    }
                    : function() {
                        return s.css(e, i, "")
                    }
                    , I = R(), B = u && u[3] || (s.cssNumber[i] ? "" : "px"), J = e.nodeType && (s.cssNumber[i] || B !== "px" && +I) && li.exec(s.css(e, i));
                    if (J && J[3] !== B) {
                        for (I = I / 2,
                        B = B || J[3],
                        J = +I || 1; k--; )
                            s.style(e, i, J + B),
                            (1 - w) * (1 - (w = R() / I || .5)) <= 0 && (k = 0),
                            J = J / w;
                        J = J * 2,
                        s.style(e, i, J + B),
                        u = u || []
                    }
                    return u && (J = +J || +I || 0,
                    b = u[1] ? J + (u[1] + 1) * u[2] : +u[2],
                    h && (h.unit = B,
                    h.start = J,
                    h.end = b)),
                    b
                }
                var wi = {};
                function ar(e) {
                    var i, u = e.ownerDocument, h = e.nodeName, b = wi[h];
                    return b || (i = u.body.appendChild(u.createElement(h)),
                    b = s.css(i, "display"),
                    i.parentNode.removeChild(i),
                    b === "none" && (b = "block"),
                    wi[h] = b,
                    b)
                }
                function At(e, i) {
                    for (var u, h, b = [], w = 0, k = e.length; w < k; w++)
                        h = e[w],
                        h.style && (u = h.style.display,
                        i ? (u === "none" && (b[w] = ye.get(h, "display") || null,
                        b[w] || (h.style.display = "")),
                        h.style.display === "" && zt(h) && (b[w] = ar(h))) : u !== "none" && (b[w] = "none",
                        ye.set(h, "display", u)));
                    for (w = 0; w < k; w++)
                        b[w] != null && (e[w].style.display = b[w]);
                    return e
                }
                s.fn.extend({
                    show: function() {
                        return At(this, !0)
                    },
                    hide: function() {
                        return At(this)
                    },
                    toggle: function(e) {
                        return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
                            zt(this) ? s(this).show() : s(this).hide()
                        })
                    }
                });
                var Tt = /^(?:checkbox|radio)$/i
                  , Ri = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
                  , xi = /^$|^module$|\/(?:java|ecma)script/i;
                (function() {
                    var e = z.createDocumentFragment()
                      , i = e.appendChild(z.createElement("div"))
                      , u = z.createElement("input");
                    u.setAttribute("type", "radio"),
                    u.setAttribute("checked", "checked"),
                    u.setAttribute("name", "t"),
                    i.appendChild(u),
                    N.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked,
                    i.innerHTML = "<textarea>x</textarea>",
                    N.noCloneChecked = !!i.cloneNode(!0).lastChild.defaultValue,
                    i.innerHTML = "<option></option>",
                    N.option = !!i.lastChild
                }
                )();
                var ce = {
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
                ce.tbody = ce.tfoot = ce.colgroup = ce.caption = ce.thead,
                ce.th = ce.td,
                N.option || (ce.optgroup = ce.option = [1, "<select multiple='multiple'>", "</select>"]);
                function ht(e, i) {
                    var u;
                    return typeof e.getElementsByTagName < "u" ? u = e.getElementsByTagName(i || "*") : typeof e.querySelectorAll < "u" ? u = e.querySelectorAll(i || "*") : u = [],
                    i === void 0 || i && A(e, i) ? s.merge([e], u) : u
                }
                function sn(e, i) {
                    for (var u = 0, h = e.length; u < h; u++)
                        ye.set(e[u], "globalEval", !i || ye.get(i[u], "globalEval"))
                }
                var It = /<|&#?\w+;/;
                function gt(e, i, u, h, b) {
                    for (var w, k, R, I, B, J, te = i.createDocumentFragment(), Z = [], oe = 0, ke = e.length; oe < ke; oe++)
                        if (w = e[oe],
                        w || w === 0)
                            if (we(w) === "object")
                                s.merge(Z, w.nodeType ? [w] : w);
                            else if (!It.test(w))
                                Z.push(i.createTextNode(w));
                            else {
                                for (k = k || te.appendChild(i.createElement("div")),
                                R = (Ri.exec(w) || ["", ""])[1].toLowerCase(),
                                I = ce[R] || ce._default,
                                k.innerHTML = I[1] + s.htmlPrefilter(w) + I[2],
                                J = I[0]; J--; )
                                    k = k.lastChild;
                                s.merge(Z, k.childNodes),
                                k = te.firstChild,
                                k.textContent = ""
                            }
                    for (te.textContent = "",
                    oe = 0; w = Z[oe++]; ) {
                        if (h && s.inArray(w, h) > -1) {
                            b && b.push(w);
                            continue
                        }
                        if (B = Nt(w),
                        k = ht(te.appendChild(w), "script"),
                        B && sn(k),
                        u)
                            for (J = 0; w = k[J++]; )
                                xi.test(w.type || "") && u.push(w)
                    }
                    return te
                }
                var Pe = /^([^.]*)(?:\.(.+)|)/;
                function jt() {
                    return !0
                }
                function qe() {
                    return !1
                }
                function Ut(e, i, u, h, b, w) {
                    var k, R;
                    if (typeof i == "object") {
                        typeof u != "string" && (h = h || u,
                        u = void 0);
                        for (R in i)
                            Ut(e, R, u, h, i[R], w);
                        return e
                    }
                    if (h == null && b == null ? (b = u,
                    h = u = void 0) : b == null && (typeof u == "string" ? (b = h,
                    h = void 0) : (b = h,
                    h = u,
                    u = void 0)),
                    b === !1)
                        b = qe;
                    else if (!b)
                        return e;
                    return w === 1 && (k = b,
                    b = function(I) {
                        return s().off(I),
                        k.apply(this, arguments)
                    }
                    ,
                    b.guid = k.guid || (k.guid = s.guid++)),
                    e.each(function() {
                        s.event.add(this, i, b, h, u)
                    })
                }
                s.event = {
                    global: {},
                    add: function(e, i, u, h, b) {
                        var w, k, R, I, B, J, te, Z, oe, ke, Ie, $e = ye.get(e);
                        if (Ge(e))
                            for (u.handler && (w = u,
                            u = w.handler,
                            b = w.selector),
                            b && s.find.matchesSelector(Pt, b),
                            u.guid || (u.guid = s.guid++),
                            (I = $e.events) || (I = $e.events = Object.create(null)),
                            (k = $e.handle) || (k = $e.handle = function(rt) {
                                return typeof s < "u" && s.event.triggered !== rt.type ? s.event.dispatch.apply(e, arguments) : void 0
                            }
                            ),
                            i = (i || "").match(dt) || [""],
                            B = i.length; B--; )
                                R = Pe.exec(i[B]) || [],
                                oe = Ie = R[1],
                                ke = (R[2] || "").split(".").sort(),
                                oe && (te = s.event.special[oe] || {},
                                oe = (b ? te.delegateType : te.bindType) || oe,
                                te = s.event.special[oe] || {},
                                J = s.extend({
                                    type: oe,
                                    origType: Ie,
                                    data: h,
                                    handler: u,
                                    guid: u.guid,
                                    selector: b,
                                    needsContext: b && s.expr.match.needsContext.test(b),
                                    namespace: ke.join(".")
                                }, w),
                                (Z = I[oe]) || (Z = I[oe] = [],
                                Z.delegateCount = 0,
                                (!te.setup || te.setup.call(e, h, ke, k) === !1) && e.addEventListener && e.addEventListener(oe, k)),
                                te.add && (te.add.call(e, J),
                                J.handler.guid || (J.handler.guid = u.guid)),
                                b ? Z.splice(Z.delegateCount++, 0, J) : Z.push(J),
                                s.event.global[oe] = !0)
                    },
                    remove: function(e, i, u, h, b) {
                        var w, k, R, I, B, J, te, Z, oe, ke, Ie, $e = ye.hasData(e) && ye.get(e);
                        if (!(!$e || !(I = $e.events))) {
                            for (i = (i || "").match(dt) || [""],
                            B = i.length; B--; ) {
                                if (R = Pe.exec(i[B]) || [],
                                oe = Ie = R[1],
                                ke = (R[2] || "").split(".").sort(),
                                !oe) {
                                    for (oe in I)
                                        s.event.remove(e, oe + i[B], u, h, !0);
                                    continue
                                }
                                for (te = s.event.special[oe] || {},
                                oe = (h ? te.delegateType : te.bindType) || oe,
                                Z = I[oe] || [],
                                R = R[2] && new RegExp("(^|\\.)" + ke.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                k = w = Z.length; w--; )
                                    J = Z[w],
                                    (b || Ie === J.origType) && (!u || u.guid === J.guid) && (!R || R.test(J.namespace)) && (!h || h === J.selector || h === "**" && J.selector) && (Z.splice(w, 1),
                                    J.selector && Z.delegateCount--,
                                    te.remove && te.remove.call(e, J));
                                k && !Z.length && ((!te.teardown || te.teardown.call(e, ke, $e.handle) === !1) && s.removeEvent(e, oe, $e.handle),
                                delete I[oe])
                            }
                            s.isEmptyObject(I) && ye.remove(e, "handle events")
                        }
                    },
                    dispatch: function(e) {
                        var i, u, h, b, w, k, R = new Array(arguments.length), I = s.event.fix(e), B = (ye.get(this, "events") || Object.create(null))[I.type] || [], J = s.event.special[I.type] || {};
                        for (R[0] = I,
                        i = 1; i < arguments.length; i++)
                            R[i] = arguments[i];
                        if (I.delegateTarget = this,
                        !(J.preDispatch && J.preDispatch.call(this, I) === !1)) {
                            for (k = s.event.handlers.call(this, I, B),
                            i = 0; (b = k[i++]) && !I.isPropagationStopped(); )
                                for (I.currentTarget = b.elem,
                                u = 0; (w = b.handlers[u++]) && !I.isImmediatePropagationStopped(); )
                                    (!I.rnamespace || w.namespace === !1 || I.rnamespace.test(w.namespace)) && (I.handleObj = w,
                                    I.data = w.data,
                                    h = ((s.event.special[w.origType] || {}).handle || w.handler).apply(b.elem, R),
                                    h !== void 0 && (I.result = h) === !1 && (I.preventDefault(),
                                    I.stopPropagation()));
                            return J.postDispatch && J.postDispatch.call(this, I),
                            I.result
                        }
                    },
                    handlers: function(e, i) {
                        var u, h, b, w, k, R = [], I = i.delegateCount, B = e.target;
                        if (I && B.nodeType && !(e.type === "click" && e.button >= 1)) {
                            for (; B !== this; B = B.parentNode || this)
                                if (B.nodeType === 1 && !(e.type === "click" && B.disabled === !0)) {
                                    for (w = [],
                                    k = {},
                                    u = 0; u < I; u++)
                                        h = i[u],
                                        b = h.selector + " ",
                                        k[b] === void 0 && (k[b] = h.needsContext ? s(b, this).index(B) > -1 : s.find(b, this, null, [B]).length),
                                        k[b] && w.push(h);
                                    w.length && R.push({
                                        elem: B,
                                        handlers: w
                                    })
                                }
                        }
                        return B = this,
                        I < i.length && R.push({
                            elem: B,
                            handlers: i.slice(I)
                        }),
                        R
                    },
                    addProp: function(e, i) {
                        Object.defineProperty(s.Event.prototype, e, {
                            enumerable: !0,
                            configurable: !0,
                            get: W(i) ? function() {
                                if (this.originalEvent)
                                    return i(this.originalEvent)
                            }
                            : function() {
                                if (this.originalEvent)
                                    return this.originalEvent[e]
                            }
                            ,
                            set: function(u) {
                                Object.defineProperty(this, e, {
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0,
                                    value: u
                                })
                            }
                        })
                    },
                    fix: function(e) {
                        return e[s.expando] ? e : new s.Event(e)
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        click: {
                            setup: function(e) {
                                var i = this || e;
                                return Tt.test(i.type) && i.click && A(i, "input") && qi(i, "click", !0),
                                !1
                            },
                            trigger: function(e) {
                                var i = this || e;
                                return Tt.test(i.type) && i.click && A(i, "input") && qi(i, "click"),
                                !0
                            },
                            _default: function(e) {
                                var i = e.target;
                                return Tt.test(i.type) && i.click && A(i, "input") && ye.get(i, "click") || A(i, "a")
                            }
                        },
                        beforeunload: {
                            postDispatch: function(e) {
                                e.result !== void 0 && e.originalEvent && (e.originalEvent.returnValue = e.result)
                            }
                        }
                    }
                };
                function qi(e, i, u) {
                    if (!u) {
                        ye.get(e, i) === void 0 && s.event.add(e, i, jt);
                        return
                    }
                    ye.set(e, i, !1),
                    s.event.add(e, i, {
                        namespace: !1,
                        handler: function(h) {
                            var b, w = ye.get(this, i);
                            if (h.isTrigger & 1 && this[i]) {
                                if (w)
                                    (s.event.special[i] || {}).delegateType && h.stopPropagation();
                                else if (w = n.call(arguments),
                                ye.set(this, i, w),
                                this[i](),
                                b = ye.get(this, i),
                                ye.set(this, i, !1),
                                w !== b)
                                    return h.stopImmediatePropagation(),
                                    h.preventDefault(),
                                    b
                            } else
                                w && (ye.set(this, i, s.event.trigger(w[0], w.slice(1), this)),
                                h.stopPropagation(),
                                h.isImmediatePropagationStopped = jt)
                        }
                    })
                }
                s.removeEvent = function(e, i, u) {
                    e.removeEventListener && e.removeEventListener(i, u)
                }
                ,
                s.Event = function(e, i) {
                    if (!(this instanceof s.Event))
                        return new s.Event(e,i);
                    e && e.type ? (this.originalEvent = e,
                    this.type = e.type,
                    this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === void 0 && e.returnValue === !1 ? jt : qe,
                    this.target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target,
                    this.currentTarget = e.currentTarget,
                    this.relatedTarget = e.relatedTarget) : this.type = e,
                    i && s.extend(this, i),
                    this.timeStamp = e && e.timeStamp || Date.now(),
                    this[s.expando] = !0
                }
                ,
                s.Event.prototype = {
                    constructor: s.Event,
                    isDefaultPrevented: qe,
                    isPropagationStopped: qe,
                    isImmediatePropagationStopped: qe,
                    isSimulated: !1,
                    preventDefault: function() {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = jt,
                        e && !this.isSimulated && e.preventDefault()
                    },
                    stopPropagation: function() {
                        var e = this.originalEvent;
                        this.isPropagationStopped = jt,
                        e && !this.isSimulated && e.stopPropagation()
                    },
                    stopImmediatePropagation: function() {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = jt,
                        e && !this.isSimulated && e.stopImmediatePropagation(),
                        this.stopPropagation()
                    }
                },
                s.each({
                    altKey: !0,
                    bubbles: !0,
                    cancelable: !0,
                    changedTouches: !0,
                    ctrlKey: !0,
                    detail: !0,
                    eventPhase: !0,
                    metaKey: !0,
                    pageX: !0,
                    pageY: !0,
                    shiftKey: !0,
                    view: !0,
                    char: !0,
                    code: !0,
                    charCode: !0,
                    key: !0,
                    keyCode: !0,
                    button: !0,
                    buttons: !0,
                    clientX: !0,
                    clientY: !0,
                    offsetX: !0,
                    offsetY: !0,
                    pointerId: !0,
                    pointerType: !0,
                    screenX: !0,
                    screenY: !0,
                    targetTouches: !0,
                    toElement: !0,
                    touches: !0,
                    which: !0
                }, s.event.addProp),
                s.each({
                    focus: "focusin",
                    blur: "focusout"
                }, function(e, i) {
                    function u(h) {
                        if (z.documentMode) {
                            var b = ye.get(this, "handle")
                              , w = s.event.fix(h);
                            w.type = h.type === "focusin" ? "focus" : "blur",
                            w.isSimulated = !0,
                            b(h),
                            w.target === w.currentTarget && b(w)
                        } else
                            s.event.simulate(i, h.target, s.event.fix(h))
                    }
                    s.event.special[e] = {
                        setup: function() {
                            var h;
                            if (qi(this, e, !0),
                            z.documentMode)
                                h = ye.get(this, i),
                                h || this.addEventListener(i, u),
                                ye.set(this, i, (h || 0) + 1);
                            else
                                return !1
                        },
                        trigger: function() {
                            return qi(this, e),
                            !0
                        },
                        teardown: function() {
                            var h;
                            if (z.documentMode)
                                h = ye.get(this, i) - 1,
                                h ? ye.set(this, i, h) : (this.removeEventListener(i, u),
                                ye.remove(this, i));
                            else
                                return !1
                        },
                        _default: function(h) {
                            return ye.get(h.target, e)
                        },
                        delegateType: i
                    },
                    s.event.special[i] = {
                        setup: function() {
                            var h = this.ownerDocument || this.document || this
                              , b = z.documentMode ? this : h
                              , w = ye.get(b, i);
                            w || (z.documentMode ? this.addEventListener(i, u) : h.addEventListener(e, u, !0)),
                            ye.set(b, i, (w || 0) + 1)
                        },
                        teardown: function() {
                            var h = this.ownerDocument || this.document || this
                              , b = z.documentMode ? this : h
                              , w = ye.get(b, i) - 1;
                            w ? ye.set(b, i, w) : (z.documentMode ? this.removeEventListener(i, u) : h.removeEventListener(e, u, !0),
                            ye.remove(b, i))
                        }
                    }
                }),
                s.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, function(e, i) {
                    s.event.special[e] = {
                        delegateType: i,
                        bindType: i,
                        handle: function(u) {
                            var h, b = this, w = u.relatedTarget, k = u.handleObj;
                            return (!w || w !== b && !s.contains(b, w)) && (u.type = k.origType,
                            h = k.handler.apply(this, arguments),
                            u.type = i),
                            h
                        }
                    }
                }),
                s.fn.extend({
                    on: function(e, i, u, h) {
                        return Ut(this, e, i, u, h)
                    },
                    one: function(e, i, u, h) {
                        return Ut(this, e, i, u, h, 1)
                    },
                    off: function(e, i, u) {
                        var h, b;
                        if (e && e.preventDefault && e.handleObj)
                            return h = e.handleObj,
                            s(e.delegateTarget).off(h.namespace ? h.origType + "." + h.namespace : h.origType, h.selector, h.handler),
                            this;
                        if (typeof e == "object") {
                            for (b in e)
                                this.off(b, i, e[b]);
                            return this
                        }
                        return (i === !1 || typeof i == "function") && (u = i,
                        i = void 0),
                        u === !1 && (u = qe),
                        this.each(function() {
                            s.event.remove(this, e, u, i)
                        })
                    }
                });
                var ji = /<script|<style|<link/i
                  , ot = /checked\s*(?:[^=]|=\s*.checked.)/i
                  , Ft = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
                function Dt(e, i) {
                    return A(e, "table") && A(i.nodeType !== 11 ? i : i.firstChild, "tr") && s(e).children("tbody")[0] || e
                }
                function tt(e) {
                    return e.type = (e.getAttribute("type") !== null) + "/" + e.type,
                    e
                }
                function Ct(e) {
                    return (e.type || "").slice(0, 5) === "true/" ? e.type = e.type.slice(5) : e.removeAttribute("type"),
                    e
                }
                function Lt(e, i) {
                    var u, h, b, w, k, R, I;
                    if (i.nodeType === 1) {
                        if (ye.hasData(e) && (w = ye.get(e),
                        I = w.events,
                        I)) {
                            ye.remove(i, "handle events");
                            for (b in I)
                                for (u = 0,
                                h = I[b].length; u < h; u++)
                                    s.event.add(i, b, I[b][u])
                        }
                        Ue.hasData(e) && (k = Ue.access(e),
                        R = s.extend({}, k),
                        Ue.set(i, R))
                    }
                }
                function Gt(e, i) {
                    var u = i.nodeName.toLowerCase();
                    u === "input" && Tt.test(e.type) ? i.checked = e.checked : (u === "input" || u === "textarea") && (i.defaultValue = e.defaultValue)
                }
                function ci(e, i, u, h) {
                    i = o(i);
                    var b, w, k, R, I, B, J = 0, te = e.length, Z = te - 1, oe = i[0], ke = W(oe);
                    if (ke || te > 1 && typeof oe == "string" && !N.checkClone && ot.test(oe))
                        return e.each(function(Ie) {
                            var $e = e.eq(Ie);
                            ke && (i[0] = oe.call(this, Ie, $e.html())),
                            ci($e, i, u, h)
                        });
                    if (te && (b = gt(i, e[0].ownerDocument, !1, e, h),
                    w = b.firstChild,
                    b.childNodes.length === 1 && (b = w),
                    w || h)) {
                        for (k = s.map(ht(b, "script"), tt),
                        R = k.length; J < te; J++)
                            I = b,
                            J !== Z && (I = s.clone(I, !0, !0),
                            R && s.merge(k, ht(I, "script"))),
                            u.call(e[J], I, J);
                        if (R)
                            for (B = k[k.length - 1].ownerDocument,
                            s.map(k, Ct),
                            J = 0; J < R; J++)
                                I = k[J],
                                xi.test(I.type || "") && !ye.access(I, "globalEval") && s.contains(B, I) && (I.src && (I.type || "").toLowerCase() !== "module" ? s._evalUrl && !I.noModule && s._evalUrl(I.src, {
                                    nonce: I.nonce || I.getAttribute("nonce")
                                }, B) : fe(I.textContent.replace(Ft, ""), I, B))
                    }
                    return e
                }
                function Dn(e, i, u) {
                    for (var h, b = i ? s.filter(i, e) : e, w = 0; (h = b[w]) != null; w++)
                        !u && h.nodeType === 1 && s.cleanData(ht(h)),
                        h.parentNode && (u && Nt(h) && sn(ht(h, "script")),
                        h.parentNode.removeChild(h));
                    return e
                }
                s.extend({
                    htmlPrefilter: function(e) {
                        return e
                    },
                    clone: function(e, i, u) {
                        var h, b, w, k, R = e.cloneNode(!0), I = Nt(e);
                        if (!N.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !s.isXMLDoc(e))
                            for (k = ht(R),
                            w = ht(e),
                            h = 0,
                            b = w.length; h < b; h++)
                                Gt(w[h], k[h]);
                        if (i)
                            if (u)
                                for (w = w || ht(e),
                                k = k || ht(R),
                                h = 0,
                                b = w.length; h < b; h++)
                                    Lt(w[h], k[h]);
                            else
                                Lt(e, R);
                        return k = ht(R, "script"),
                        k.length > 0 && sn(k, !I && ht(e, "script")),
                        R
                    },
                    cleanData: function(e) {
                        for (var i, u, h, b = s.event.special, w = 0; (u = e[w]) !== void 0; w++)
                            if (Ge(u)) {
                                if (i = u[ye.expando]) {
                                    if (i.events)
                                        for (h in i.events)
                                            b[h] ? s.event.remove(u, h) : s.removeEvent(u, h, i.handle);
                                    u[ye.expando] = void 0
                                }
                                u[Ue.expando] && (u[Ue.expando] = void 0)
                            }
                    }
                }),
                s.fn.extend({
                    detach: function(e) {
                        return Dn(this, e, !0)
                    },
                    remove: function(e) {
                        return Dn(this, e)
                    },
                    text: function(e) {
                        return nt(this, function(i) {
                            return i === void 0 ? s.text(this) : this.empty().each(function() {
                                (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = i)
                            })
                        }, null, e, arguments.length)
                    },
                    append: function() {
                        return ci(this, arguments, function(e) {
                            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                var i = Dt(this, e);
                                i.appendChild(e)
                            }
                        })
                    },
                    prepend: function() {
                        return ci(this, arguments, function(e) {
                            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                var i = Dt(this, e);
                                i.insertBefore(e, i.firstChild)
                            }
                        })
                    },
                    before: function() {
                        return ci(this, arguments, function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this)
                        })
                    },
                    after: function() {
                        return ci(this, arguments, function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                        })
                    },
                    empty: function() {
                        for (var e, i = 0; (e = this[i]) != null; i++)
                            e.nodeType === 1 && (s.cleanData(ht(e, !1)),
                            e.textContent = "");
                        return this
                    },
                    clone: function(e, i) {
                        return e = e ?? !1,
                        i = i ?? e,
                        this.map(function() {
                            return s.clone(this, e, i)
                        })
                    },
                    html: function(e) {
                        return nt(this, function(i) {
                            var u = this[0] || {}
                              , h = 0
                              , b = this.length;
                            if (i === void 0 && u.nodeType === 1)
                                return u.innerHTML;
                            if (typeof i == "string" && !ji.test(i) && !ce[(Ri.exec(i) || ["", ""])[1].toLowerCase()]) {
                                i = s.htmlPrefilter(i);
                                try {
                                    for (; h < b; h++)
                                        u = this[h] || {},
                                        u.nodeType === 1 && (s.cleanData(ht(u, !1)),
                                        u.innerHTML = i);
                                    u = 0
                                } catch {}
                            }
                            u && this.empty().append(i)
                        }, null, e, arguments.length)
                    },
                    replaceWith: function() {
                        var e = [];
                        return ci(this, arguments, function(i) {
                            var u = this.parentNode;
                            s.inArray(this, e) < 0 && (s.cleanData(ht(this)),
                            u && u.replaceChild(i, this))
                        }, e)
                    }
                }),
                s.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function(e, i) {
                    s.fn[e] = function(u) {
                        for (var h, b = [], w = s(u), k = w.length - 1, R = 0; R <= k; R++)
                            h = R === k ? this : this.clone(!0),
                            s(w[R])[i](h),
                            l.apply(b, h.get());
                        return this.pushStack(b)
                    }
                });
                var Vt = new RegExp("^(" + rn + ")(?!px)[a-z%]+$","i")
                  , Hi = /^--/
                  , Bi = function(e) {
                    var i = e.ownerDocument.defaultView;
                    return (!i || !i.opener) && (i = E),
                    i.getComputedStyle(e)
                }
                  , Zt = function(e, i, u) {
                    var h, b, w = {};
                    for (b in i)
                        w[b] = e.style[b],
                        e.style[b] = i[b];
                    h = u.call(e);
                    for (b in i)
                        e.style[b] = w[b];
                    return h
                }
                  , Di = new RegExp(yt.join("|"),"i");
                (function() {
                    function e() {
                        if (B) {
                            I.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                            B.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                            Pt.appendChild(I).appendChild(B);
                            var J = E.getComputedStyle(B);
                            u = J.top !== "1%",
                            R = i(J.marginLeft) === 12,
                            B.style.right = "60%",
                            w = i(J.right) === 36,
                            h = i(J.width) === 36,
                            B.style.position = "absolute",
                            b = i(B.offsetWidth / 3) === 12,
                            Pt.removeChild(I),
                            B = null
                        }
                    }
                    function i(J) {
                        return Math.round(parseFloat(J))
                    }
                    var u, h, b, w, k, R, I = z.createElement("div"), B = z.createElement("div");
                    B.style && (B.style.backgroundClip = "content-box",
                    B.cloneNode(!0).style.backgroundClip = "",
                    N.clearCloneStyle = B.style.backgroundClip === "content-box",
                    s.extend(N, {
                        boxSizingReliable: function() {
                            return e(),
                            h
                        },
                        pixelBoxStyles: function() {
                            return e(),
                            w
                        },
                        pixelPosition: function() {
                            return e(),
                            u
                        },
                        reliableMarginLeft: function() {
                            return e(),
                            R
                        },
                        scrollboxSize: function() {
                            return e(),
                            b
                        },
                        reliableTrDimensions: function() {
                            var J, te, Z, oe;
                            return k == null && (J = z.createElement("table"),
                            te = z.createElement("tr"),
                            Z = z.createElement("div"),
                            J.style.cssText = "position:absolute;left:-11111px;border-collapse:separate",
                            te.style.cssText = "box-sizing:content-box;border:1px solid",
                            te.style.height = "1px",
                            Z.style.height = "9px",
                            Z.style.display = "block",
                            Pt.appendChild(J).appendChild(te).appendChild(Z),
                            oe = E.getComputedStyle(te),
                            k = parseInt(oe.height, 10) + parseInt(oe.borderTopWidth, 10) + parseInt(oe.borderBottomWidth, 10) === te.offsetHeight,
                            Pt.removeChild(J)),
                            k
                        }
                    }))
                }
                )();
                function di(e, i, u) {
                    var h, b, w, k, R = Hi.test(i), I = e.style;
                    return u = u || Bi(e),
                    u && (k = u.getPropertyValue(i) || u[i],
                    R && k && (k = k.replace(S, "$1") || void 0),
                    k === "" && !Nt(e) && (k = s.style(e, i)),
                    !N.pixelBoxStyles() && Vt.test(k) && Di.test(i) && (h = I.width,
                    b = I.minWidth,
                    w = I.maxWidth,
                    I.minWidth = I.maxWidth = I.width = k,
                    k = u.width,
                    I.width = h,
                    I.minWidth = b,
                    I.maxWidth = w)),
                    k !== void 0 ? k + "" : k
                }
                function Cn(e, i) {
                    return {
                        get: function() {
                            if (e()) {
                                delete this.get;
                                return
                            }
                            return (this.get = i).apply(this, arguments)
                        }
                    }
                }
                var En = ["Webkit", "Moz", "ms"]
                  , kn = z.createElement("div").style
                  , Ke = {};
                function an(e) {
                    for (var i = e[0].toUpperCase() + e.slice(1), u = En.length; u--; )
                        if (e = En[u] + i,
                        e in kn)
                            return e
                }
                function on(e) {
                    var i = s.cssProps[e] || Ke[e];
                    return i || (e in kn ? e : Ke[e] = an(e) || e)
                }
                var Sn = /^(none|table(?!-c[ea]).+)/
                  , An = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                }
                  , Tn = {
                    letterSpacing: "0",
                    fontWeight: "400"
                };
                function Ln(e, i, u) {
                    var h = li.exec(i);
                    return h ? Math.max(0, h[2] - (u || 0)) + (h[3] || "px") : i
                }
                function ln(e, i, u, h, b, w) {
                    var k = i === "width" ? 1 : 0
                      , R = 0
                      , I = 0
                      , B = 0;
                    if (u === (h ? "border" : "content"))
                        return 0;
                    for (; k < 4; k += 2)
                        u === "margin" && (B += s.css(e, u + yt[k], !0, b)),
                        h ? (u === "content" && (I -= s.css(e, "padding" + yt[k], !0, b)),
                        u !== "margin" && (I -= s.css(e, "border" + yt[k] + "Width", !0, b))) : (I += s.css(e, "padding" + yt[k], !0, b),
                        u !== "padding" ? I += s.css(e, "border" + yt[k] + "Width", !0, b) : R += s.css(e, "border" + yt[k] + "Width", !0, b));
                    return !h && w >= 0 && (I += Math.max(0, Math.ceil(e["offset" + i[0].toUpperCase() + i.slice(1)] - w - I - R - .5)) || 0),
                    I + B
                }
                function Mn(e, i, u) {
                    var h = Bi(e)
                      , b = !N.boxSizingReliable() || u
                      , w = b && s.css(e, "boxSizing", !1, h) === "border-box"
                      , k = w
                      , R = di(e, i, h)
                      , I = "offset" + i[0].toUpperCase() + i.slice(1);
                    if (Vt.test(R)) {
                        if (!u)
                            return R;
                        R = "auto"
                    }
                    return (!N.boxSizingReliable() && w || !N.reliableTrDimensions() && A(e, "tr") || R === "auto" || !parseFloat(R) && s.css(e, "display", !1, h) === "inline") && e.getClientRects().length && (w = s.css(e, "boxSizing", !1, h) === "border-box",
                    k = I in e,
                    k && (R = e[I])),
                    R = parseFloat(R) || 0,
                    R + ln(e, i, u || (w ? "border" : "content"), k, h, R) + "px"
                }
                s.extend({
                    cssHooks: {
                        opacity: {
                            get: function(e, i) {
                                if (i) {
                                    var u = di(e, "opacity");
                                    return u === "" ? "1" : u
                                }
                            }
                        }
                    },
                    cssNumber: {
                        animationIterationCount: !0,
                        aspectRatio: !0,
                        borderImageSlice: !0,
                        columnCount: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        gridArea: !0,
                        gridColumn: !0,
                        gridColumnEnd: !0,
                        gridColumnStart: !0,
                        gridRow: !0,
                        gridRowEnd: !0,
                        gridRowStart: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        scale: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0,
                        fillOpacity: !0,
                        floodOpacity: !0,
                        stopOpacity: !0,
                        strokeMiterlimit: !0,
                        strokeOpacity: !0
                    },
                    cssProps: {},
                    style: function(e, i, u, h) {
                        if (!(!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)) {
                            var b, w, k, R = Ye(i), I = Hi.test(i), B = e.style;
                            if (I || (i = on(R)),
                            k = s.cssHooks[i] || s.cssHooks[R],
                            u !== void 0) {
                                if (w = typeof u,
                                w === "string" && (b = li.exec(u)) && b[1] && (u = xn(e, i, b),
                                w = "number"),
                                u == null || u !== u)
                                    return;
                                w === "number" && !I && (u += b && b[3] || (s.cssNumber[R] ? "" : "px")),
                                !N.clearCloneStyle && u === "" && i.indexOf("background") === 0 && (B[i] = "inherit"),
                                (!k || !("set"in k) || (u = k.set(e, u, h)) !== void 0) && (I ? B.setProperty(i, u) : B[i] = u)
                            } else
                                return k && "get"in k && (b = k.get(e, !1, h)) !== void 0 ? b : B[i]
                        }
                    },
                    css: function(e, i, u, h) {
                        var b, w, k, R = Ye(i), I = Hi.test(i);
                        return I || (i = on(R)),
                        k = s.cssHooks[i] || s.cssHooks[R],
                        k && "get"in k && (b = k.get(e, !0, u)),
                        b === void 0 && (b = di(e, i, h)),
                        b === "normal" && i in Tn && (b = Tn[i]),
                        u === "" || u ? (w = parseFloat(b),
                        u === !0 || isFinite(w) ? w || 0 : b) : b
                    }
                }),
                s.each(["height", "width"], function(e, i) {
                    s.cssHooks[i] = {
                        get: function(u, h, b) {
                            if (h)
                                return Sn.test(s.css(u, "display")) && (!u.getClientRects().length || !u.getBoundingClientRect().width) ? Zt(u, An, function() {
                                    return Mn(u, i, b)
                                }) : Mn(u, i, b)
                        },
                        set: function(u, h, b) {
                            var w, k = Bi(u), R = !N.scrollboxSize() && k.position === "absolute", I = R || b, B = I && s.css(u, "boxSizing", !1, k) === "border-box", J = b ? ln(u, i, b, B, k) : 0;
                            return B && R && (J -= Math.ceil(u["offset" + i[0].toUpperCase() + i.slice(1)] - parseFloat(k[i]) - ln(u, i, "border", !1, k) - .5)),
                            J && (w = li.exec(h)) && (w[3] || "px") !== "px" && (u.style[i] = h,
                            h = s.css(u, i)),
                            Ln(u, h, J)
                        }
                    }
                }),
                s.cssHooks.marginLeft = Cn(N.reliableMarginLeft, function(e, i) {
                    if (i)
                        return (parseFloat(di(e, "marginLeft")) || e.getBoundingClientRect().left - Zt(e, {
                            marginLeft: 0
                        }, function() {
                            return e.getBoundingClientRect().left
                        })) + "px"
                }),
                s.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, function(e, i) {
                    s.cssHooks[e + i] = {
                        expand: function(u) {
                            for (var h = 0, b = {}, w = typeof u == "string" ? u.split(" ") : [u]; h < 4; h++)
                                b[e + yt[h] + i] = w[h] || w[h - 2] || w[0];
                            return b
                        }
                    },
                    e !== "margin" && (s.cssHooks[e + i].set = Ln)
                }),
                s.fn.extend({
                    css: function(e, i) {
                        return nt(this, function(u, h, b) {
                            var w, k, R = {}, I = 0;
                            if (Array.isArray(h)) {
                                for (w = Bi(u),
                                k = h.length; I < k; I++)
                                    R[h[I]] = s.css(u, h[I], !1, w);
                                return R
                            }
                            return b !== void 0 ? s.style(u, h, b) : s.css(u, h)
                        }, e, i, arguments.length > 1)
                    }
                });
                function ft(e, i, u, h, b) {
                    return new ft.prototype.init(e,i,u,h,b)
                }
                s.Tween = ft,
                ft.prototype = {
                    constructor: ft,
                    init: function(e, i, u, h, b, w) {
                        this.elem = e,
                        this.prop = u,
                        this.easing = b || s.easing._default,
                        this.options = i,
                        this.start = this.now = this.cur(),
                        this.end = h,
                        this.unit = w || (s.cssNumber[u] ? "" : "px")
                    },
                    cur: function() {
                        var e = ft.propHooks[this.prop];
                        return e && e.get ? e.get(this) : ft.propHooks._default.get(this)
                    },
                    run: function(e) {
                        var i, u = ft.propHooks[this.prop];
                        return this.options.duration ? this.pos = i = s.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = i = e,
                        this.now = (this.end - this.start) * i + this.start,
                        this.options.step && this.options.step.call(this.elem, this.now, this),
                        u && u.set ? u.set(this) : ft.propHooks._default.set(this),
                        this
                    }
                },
                ft.prototype.init.prototype = ft.prototype,
                ft.propHooks = {
                    _default: {
                        get: function(e) {
                            var i;
                            return e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null ? e.elem[e.prop] : (i = s.css(e.elem, e.prop, ""),
                            !i || i === "auto" ? 0 : i)
                        },
                        set: function(e) {
                            s.fx.step[e.prop] ? s.fx.step[e.prop](e) : e.elem.nodeType === 1 && (s.cssHooks[e.prop] || e.elem.style[on(e.prop)] != null) ? s.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                        }
                    }
                },
                ft.propHooks.scrollTop = ft.propHooks.scrollLeft = {
                    set: function(e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                    }
                },
                s.easing = {
                    linear: function(e) {
                        return e
                    },
                    swing: function(e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    },
                    _default: "swing"
                },
                s.fx = ft.prototype.init,
                s.fx.step = {};
                var hi, Ci, On = /^(?:toggle|show|hide)$/, or = /queueHooks$/;
                function un() {
                    Ci && (z.hidden === !1 && E.requestAnimationFrame ? E.requestAnimationFrame(un) : E.setTimeout(un, s.fx.interval),
                    s.fx.tick())
                }
                function $n() {
                    return E.setTimeout(function() {
                        hi = void 0
                    }),
                    hi = Date.now()
                }
                function Ei(e, i) {
                    var u, h = 0, b = {
                        height: e
                    };
                    for (i = i ? 1 : 0; h < 4; h += 2 - i)
                        u = yt[h],
                        b["margin" + u] = b["padding" + u] = e;
                    return i && (b.opacity = b.width = e),
                    b
                }
                function Pn(e, i, u) {
                    for (var h, b = (_t.tweeners[i] || []).concat(_t.tweeners["*"]), w = 0, k = b.length; w < k; w++)
                        if (h = b[w].call(u, i, e))
                            return h
                }
                function ki(e, i, u) {
                    var h, b, w, k, R, I, B, J, te = "width"in i || "height"in i, Z = this, oe = {}, ke = e.style, Ie = e.nodeType && zt(e), $e = ye.get(e, "fxshow");
                    u.queue || (k = s._queueHooks(e, "fx"),
                    k.unqueued == null && (k.unqueued = 0,
                    R = k.empty.fire,
                    k.empty.fire = function() {
                        k.unqueued || R()
                    }
                    ),
                    k.unqueued++,
                    Z.always(function() {
                        Z.always(function() {
                            k.unqueued--,
                            s.queue(e, "fx").length || k.empty.fire()
                        })
                    }));
                    for (h in i)
                        if (b = i[h],
                        On.test(b)) {
                            if (delete i[h],
                            w = w || b === "toggle",
                            b === (Ie ? "hide" : "show"))
                                if (b === "show" && $e && $e[h] !== void 0)
                                    Ie = !0;
                                else
                                    continue;
                            oe[h] = $e && $e[h] || s.style(e, h)
                        }
                    if (I = !s.isEmptyObject(i),
                    !(!I && s.isEmptyObject(oe))) {
                        te && e.nodeType === 1 && (u.overflow = [ke.overflow, ke.overflowX, ke.overflowY],
                        B = $e && $e.display,
                        B == null && (B = ye.get(e, "display")),
                        J = s.css(e, "display"),
                        J === "none" && (B ? J = B : (At([e], !0),
                        B = e.style.display || B,
                        J = s.css(e, "display"),
                        At([e]))),
                        (J === "inline" || J === "inline-block" && B != null) && s.css(e, "float") === "none" && (I || (Z.done(function() {
                            ke.display = B
                        }),
                        B == null && (J = ke.display,
                        B = J === "none" ? "" : J)),
                        ke.display = "inline-block")),
                        u.overflow && (ke.overflow = "hidden",
                        Z.always(function() {
                            ke.overflow = u.overflow[0],
                            ke.overflowX = u.overflow[1],
                            ke.overflowY = u.overflow[2]
                        })),
                        I = !1;
                        for (h in oe)
                            I || ($e ? "hidden"in $e && (Ie = $e.hidden) : $e = ye.access(e, "fxshow", {
                                display: B
                            }),
                            w && ($e.hidden = !Ie),
                            Ie && At([e], !0),
                            Z.done(function() {
                                Ie || At([e]),
                                ye.remove(e, "fxshow");
                                for (h in oe)
                                    s.style(e, h, oe[h])
                            })),
                            I = Pn(Ie ? $e[h] : 0, h, Z),
                            h in $e || ($e[h] = I.start,
                            Ie && (I.end = I.start,
                            I.start = 0))
                    }
                }
                function Wi(e, i) {
                    var u, h, b, w, k;
                    for (u in e)
                        if (h = Ye(u),
                        b = i[h],
                        w = e[u],
                        Array.isArray(w) && (b = w[1],
                        w = e[u] = w[0]),
                        u !== h && (e[h] = w,
                        delete e[u]),
                        k = s.cssHooks[h],
                        k && "expand"in k) {
                            w = k.expand(w),
                            delete e[h];
                            for (u in w)
                                u in e || (e[u] = w[u],
                                i[u] = b)
                        } else
                            i[h] = b
                }
                function _t(e, i, u) {
                    var h, b, w = 0, k = _t.prefilters.length, R = s.Deferred().always(function() {
                        delete I.elem
                    }), I = function() {
                        if (b)
                            return !1;
                        for (var te = hi || $n(), Z = Math.max(0, B.startTime + B.duration - te), oe = Z / B.duration || 0, ke = 1 - oe, Ie = 0, $e = B.tweens.length; Ie < $e; Ie++)
                            B.tweens[Ie].run(ke);
                        return R.notifyWith(e, [B, ke, Z]),
                        ke < 1 && $e ? Z : ($e || R.notifyWith(e, [B, 1, 0]),
                        R.resolveWith(e, [B]),
                        !1)
                    }, B = R.promise({
                        elem: e,
                        props: s.extend({}, i),
                        opts: s.extend(!0, {
                            specialEasing: {},
                            easing: s.easing._default
                        }, u),
                        originalProperties: i,
                        originalOptions: u,
                        startTime: hi || $n(),
                        duration: u.duration,
                        tweens: [],
                        createTween: function(te, Z) {
                            var oe = s.Tween(e, B.opts, te, Z, B.opts.specialEasing[te] || B.opts.easing);
                            return B.tweens.push(oe),
                            oe
                        },
                        stop: function(te) {
                            var Z = 0
                              , oe = te ? B.tweens.length : 0;
                            if (b)
                                return this;
                            for (b = !0; Z < oe; Z++)
                                B.tweens[Z].run(1);
                            return te ? (R.notifyWith(e, [B, 1, 0]),
                            R.resolveWith(e, [B, te])) : R.rejectWith(e, [B, te]),
                            this
                        }
                    }), J = B.props;
                    for (Wi(J, B.opts.specialEasing); w < k; w++)
                        if (h = _t.prefilters[w].call(B, e, J, B.opts),
                        h)
                            return W(h.stop) && (s._queueHooks(B.elem, B.opts.queue).stop = h.stop.bind(h)),
                            h;
                    return s.map(J, Pn, B),
                    W(B.opts.start) && B.opts.start.call(e, B),
                    B.progress(B.opts.progress).done(B.opts.done, B.opts.complete).fail(B.opts.fail).always(B.opts.always),
                    s.fx.timer(s.extend(I, {
                        elem: e,
                        anim: B,
                        queue: B.opts.queue
                    })),
                    B
                }
                s.Animation = s.extend(_t, {
                    tweeners: {
                        "*": [function(e, i) {
                            var u = this.createTween(e, i);
                            return xn(u.elem, e, li.exec(i), u),
                            u
                        }
                        ]
                    },
                    tweener: function(e, i) {
                        W(e) ? (i = e,
                        e = ["*"]) : e = e.match(dt);
                        for (var u, h = 0, b = e.length; h < b; h++)
                            u = e[h],
                            _t.tweeners[u] = _t.tweeners[u] || [],
                            _t.tweeners[u].unshift(i)
                    },
                    prefilters: [ki],
                    prefilter: function(e, i) {
                        i ? _t.prefilters.unshift(e) : _t.prefilters.push(e)
                    }
                }),
                s.speed = function(e, i, u) {
                    var h = e && typeof e == "object" ? s.extend({}, e) : {
                        complete: u || !u && i || W(e) && e,
                        duration: e,
                        easing: u && i || i && !W(i) && i
                    };
                    return s.fx.off ? h.duration = 0 : typeof h.duration != "number" && (h.duration in s.fx.speeds ? h.duration = s.fx.speeds[h.duration] : h.duration = s.fx.speeds._default),
                    (h.queue == null || h.queue === !0) && (h.queue = "fx"),
                    h.old = h.complete,
                    h.complete = function() {
                        W(h.old) && h.old.call(this),
                        h.queue && s.dequeue(this, h.queue)
                    }
                    ,
                    h
                }
                ,
                s.fn.extend({
                    fadeTo: function(e, i, u, h) {
                        return this.filter(zt).css("opacity", 0).show().end().animate({
                            opacity: i
                        }, e, u, h)
                    },
                    animate: function(e, i, u, h) {
                        var b = s.isEmptyObject(e)
                          , w = s.speed(i, u, h)
                          , k = function() {
                            var R = _t(this, s.extend({}, e), w);
                            (b || ye.get(this, "finish")) && R.stop(!0)
                        };
                        return k.finish = k,
                        b || w.queue === !1 ? this.each(k) : this.queue(w.queue, k)
                    },
                    stop: function(e, i, u) {
                        var h = function(b) {
                            var w = b.stop;
                            delete b.stop,
                            w(u)
                        };
                        return typeof e != "string" && (u = i,
                        i = e,
                        e = void 0),
                        i && this.queue(e || "fx", []),
                        this.each(function() {
                            var b = !0
                              , w = e != null && e + "queueHooks"
                              , k = s.timers
                              , R = ye.get(this);
                            if (w)
                                R[w] && R[w].stop && h(R[w]);
                            else
                                for (w in R)
                                    R[w] && R[w].stop && or.test(w) && h(R[w]);
                            for (w = k.length; w--; )
                                k[w].elem === this && (e == null || k[w].queue === e) && (k[w].anim.stop(u),
                                b = !1,
                                k.splice(w, 1));
                            (b || !u) && s.dequeue(this, e)
                        })
                    },
                    finish: function(e) {
                        return e !== !1 && (e = e || "fx"),
                        this.each(function() {
                            var i, u = ye.get(this), h = u[e + "queue"], b = u[e + "queueHooks"], w = s.timers, k = h ? h.length : 0;
                            for (u.finish = !0,
                            s.queue(this, e, []),
                            b && b.stop && b.stop.call(this, !0),
                            i = w.length; i--; )
                                w[i].elem === this && w[i].queue === e && (w[i].anim.stop(!0),
                                w.splice(i, 1));
                            for (i = 0; i < k; i++)
                                h[i] && h[i].finish && h[i].finish.call(this);
                            delete u.finish
                        })
                    }
                }),
                s.each(["toggle", "show", "hide"], function(e, i) {
                    var u = s.fn[i];
                    s.fn[i] = function(h, b, w) {
                        return h == null || typeof h == "boolean" ? u.apply(this, arguments) : this.animate(Ei(i, !0), h, b, w)
                    }
                }),
                s.each({
                    slideDown: Ei("show"),
                    slideUp: Ei("hide"),
                    slideToggle: Ei("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(e, i) {
                    s.fn[e] = function(u, h, b) {
                        return this.animate(i, u, h, b)
                    }
                }),
                s.timers = [],
                s.fx.tick = function() {
                    var e, i = 0, u = s.timers;
                    for (hi = Date.now(); i < u.length; i++)
                        e = u[i],
                        !e() && u[i] === e && u.splice(i--, 1);
                    u.length || s.fx.stop(),
                    hi = void 0
                }
                ,
                s.fx.timer = function(e) {
                    s.timers.push(e),
                    s.fx.start()
                }
                ,
                s.fx.interval = 13,
                s.fx.start = function() {
                    Ci || (Ci = !0,
                    un())
                }
                ,
                s.fx.stop = function() {
                    Ci = null
                }
                ,
                s.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                },
                s.fn.delay = function(e, i) {
                    return e = s.fx && s.fx.speeds[e] || e,
                    i = i || "fx",
                    this.queue(i, function(u, h) {
                        var b = E.setTimeout(u, e);
                        h.stop = function() {
                            E.clearTimeout(b)
                        }
                    })
                }
                ,
                function() {
                    var e = z.createElement("input")
                      , i = z.createElement("select")
                      , u = i.appendChild(z.createElement("option"));
                    e.type = "checkbox",
                    N.checkOn = e.value !== "",
                    N.optSelected = u.selected,
                    e = z.createElement("input"),
                    e.value = "t",
                    e.type = "radio",
                    N.radioValue = e.value === "t"
                }();
                var fi, mt = s.expr.attrHandle;
                s.fn.extend({
                    attr: function(e, i) {
                        return nt(this, s.attr, e, i, arguments.length > 1)
                    },
                    removeAttr: function(e) {
                        return this.each(function() {
                            s.removeAttr(this, e)
                        })
                    }
                }),
                s.extend({
                    attr: function(e, i, u) {
                        var h, b, w = e.nodeType;
                        if (!(w === 3 || w === 8 || w === 2)) {
                            if (typeof e.getAttribute > "u")
                                return s.prop(e, i, u);
                            if ((w !== 1 || !s.isXMLDoc(e)) && (b = s.attrHooks[i.toLowerCase()] || (s.expr.match.bool.test(i) ? fi : void 0)),
                            u !== void 0) {
                                if (u === null) {
                                    s.removeAttr(e, i);
                                    return
                                }
                                return b && "set"in b && (h = b.set(e, u, i)) !== void 0 ? h : (e.setAttribute(i, u + ""),
                                u)
                            }
                            return b && "get"in b && (h = b.get(e, i)) !== null ? h : (h = s.find.attr(e, i),
                            h ?? void 0)
                        }
                    },
                    attrHooks: {
                        type: {
                            set: function(e, i) {
                                if (!N.radioValue && i === "radio" && A(e, "input")) {
                                    var u = e.value;
                                    return e.setAttribute("type", i),
                                    u && (e.value = u),
                                    i
                                }
                            }
                        }
                    },
                    removeAttr: function(e, i) {
                        var u, h = 0, b = i && i.match(dt);
                        if (b && e.nodeType === 1)
                            for (; u = b[h++]; )
                                e.removeAttribute(u)
                    }
                }),
                fi = {
                    set: function(e, i, u) {
                        return i === !1 ? s.removeAttr(e, u) : e.setAttribute(u, u),
                        u
                    }
                },
                s.each(s.expr.match.bool.source.match(/\w+/g), function(e, i) {
                    var u = mt[i] || s.find.attr;
                    mt[i] = function(h, b, w) {
                        var k, R, I = b.toLowerCase();
                        return w || (R = mt[I],
                        mt[I] = k,
                        k = u(h, b, w) != null ? I : null,
                        mt[I] = R),
                        k
                    }
                });
                var lr = /^(?:input|select|textarea|button)$/i
                  , ur = /^(?:a|area)$/i;
                s.fn.extend({
                    prop: function(e, i) {
                        return nt(this, s.prop, e, i, arguments.length > 1)
                    },
                    removeProp: function(e) {
                        return this.each(function() {
                            delete this[s.propFix[e] || e]
                        })
                    }
                }),
                s.extend({
                    prop: function(e, i, u) {
                        var h, b, w = e.nodeType;
                        if (!(w === 3 || w === 8 || w === 2))
                            return (w !== 1 || !s.isXMLDoc(e)) && (i = s.propFix[i] || i,
                            b = s.propHooks[i]),
                            u !== void 0 ? b && "set"in b && (h = b.set(e, u, i)) !== void 0 ? h : e[i] = u : b && "get"in b && (h = b.get(e, i)) !== null ? h : e[i]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(e) {
                                var i = s.find.attr(e, "tabindex");
                                return i ? parseInt(i, 10) : lr.test(e.nodeName) || ur.test(e.nodeName) && e.href ? 0 : -1
                            }
                        }
                    },
                    propFix: {
                        for: "htmlFor",
                        class: "className"
                    }
                }),
                N.optSelected || (s.propHooks.selected = {
                    get: function(e) {
                        var i = e.parentNode;
                        return i && i.parentNode && i.parentNode.selectedIndex,
                        null
                    },
                    set: function(e) {
                        var i = e.parentNode;
                        i && (i.selectedIndex,
                        i.parentNode && i.parentNode.selectedIndex)
                    }
                }),
                s.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                    s.propFix[this.toLowerCase()] = this
                });
                function Qt(e) {
                    var i = e.match(dt) || [];
                    return i.join(" ")
                }
                function Jt(e) {
                    return e.getAttribute && e.getAttribute("class") || ""
                }
                function cn(e) {
                    return Array.isArray(e) ? e : typeof e == "string" ? e.match(dt) || [] : []
                }
                s.fn.extend({
                    addClass: function(e) {
                        var i, u, h, b, w, k;
                        return W(e) ? this.each(function(R) {
                            s(this).addClass(e.call(this, R, Jt(this)))
                        }) : (i = cn(e),
                        i.length ? this.each(function() {
                            if (h = Jt(this),
                            u = this.nodeType === 1 && " " + Qt(h) + " ",
                            u) {
                                for (w = 0; w < i.length; w++)
                                    b = i[w],
                                    u.indexOf(" " + b + " ") < 0 && (u += b + " ");
                                k = Qt(u),
                                h !== k && this.setAttribute("class", k)
                            }
                        }) : this)
                    },
                    removeClass: function(e) {
                        var i, u, h, b, w, k;
                        return W(e) ? this.each(function(R) {
                            s(this).removeClass(e.call(this, R, Jt(this)))
                        }) : arguments.length ? (i = cn(e),
                        i.length ? this.each(function() {
                            if (h = Jt(this),
                            u = this.nodeType === 1 && " " + Qt(h) + " ",
                            u) {
                                for (w = 0; w < i.length; w++)
                                    for (b = i[w]; u.indexOf(" " + b + " ") > -1; )
                                        u = u.replace(" " + b + " ", " ");
                                k = Qt(u),
                                h !== k && this.setAttribute("class", k)
                            }
                        }) : this) : this.attr("class", "")
                    },
                    toggleClass: function(e, i) {
                        var u, h, b, w, k = typeof e, R = k === "string" || Array.isArray(e);
                        return W(e) ? this.each(function(I) {
                            s(this).toggleClass(e.call(this, I, Jt(this), i), i)
                        }) : typeof i == "boolean" && R ? i ? this.addClass(e) : this.removeClass(e) : (u = cn(e),
                        this.each(function() {
                            if (R)
                                for (w = s(this),
                                b = 0; b < u.length; b++)
                                    h = u[b],
                                    w.hasClass(h) ? w.removeClass(h) : w.addClass(h);
                            else
                                (e === void 0 || k === "boolean") && (h = Jt(this),
                                h && ye.set(this, "__className__", h),
                                this.setAttribute && this.setAttribute("class", h || e === !1 ? "" : ye.get(this, "__className__") || ""))
                        }))
                    },
                    hasClass: function(e) {
                        var i, u, h = 0;
                        for (i = " " + e + " "; u = this[h++]; )
                            if (u.nodeType === 1 && (" " + Qt(Jt(u)) + " ").indexOf(i) > -1)
                                return !0;
                        return !1
                    }
                });
                var cr = /\r/g;
                s.fn.extend({
                    val: function(e) {
                        var i, u, h, b = this[0];
                        return arguments.length ? (h = W(e),
                        this.each(function(w) {
                            var k;
                            this.nodeType === 1 && (h ? k = e.call(this, w, s(this).val()) : k = e,
                            k == null ? k = "" : typeof k == "number" ? k += "" : Array.isArray(k) && (k = s.map(k, function(R) {
                                return R == null ? "" : R + ""
                            })),
                            i = s.valHooks[this.type] || s.valHooks[this.nodeName.toLowerCase()],
                            (!i || !("set"in i) || i.set(this, k, "value") === void 0) && (this.value = k))
                        })) : b ? (i = s.valHooks[b.type] || s.valHooks[b.nodeName.toLowerCase()],
                        i && "get"in i && (u = i.get(b, "value")) !== void 0 ? u : (u = b.value,
                        typeof u == "string" ? u.replace(cr, "") : u ?? "")) : void 0
                    }
                }),
                s.extend({
                    valHooks: {
                        option: {
                            get: function(e) {
                                var i = s.find.attr(e, "value");
                                return i ?? Qt(s.text(e))
                            }
                        },
                        select: {
                            get: function(e) {
                                var i, u, h, b = e.options, w = e.selectedIndex, k = e.type === "select-one", R = k ? null : [], I = k ? w + 1 : b.length;
                                for (w < 0 ? h = I : h = k ? w : 0; h < I; h++)
                                    if (u = b[h],
                                    (u.selected || h === w) && !u.disabled && (!u.parentNode.disabled || !A(u.parentNode, "optgroup"))) {
                                        if (i = s(u).val(),
                                        k)
                                            return i;
                                        R.push(i)
                                    }
                                return R
                            },
                            set: function(e, i) {
                                for (var u, h, b = e.options, w = s.makeArray(i), k = b.length; k--; )
                                    h = b[k],
                                    (h.selected = s.inArray(s.valHooks.option.get(h), w) > -1) && (u = !0);
                                return u || (e.selectedIndex = -1),
                                w
                            }
                        }
                    }
                }),
                s.each(["radio", "checkbox"], function() {
                    s.valHooks[this] = {
                        set: function(e, i) {
                            if (Array.isArray(i))
                                return e.checked = s.inArray(s(e).val(), i) > -1
                        }
                    },
                    N.checkOn || (s.valHooks[this].get = function(e) {
                        return e.getAttribute("value") === null ? "on" : e.value
                    }
                    )
                });
                var Si = E.location
                  , Nn = {
                    guid: Date.now()
                }
                  , Ai = /\?/;
                s.parseXML = function(e) {
                    var i, u;
                    if (!e || typeof e != "string")
                        return null;
                    try {
                        i = new E.DOMParser().parseFromString(e, "text/xml")
                    } catch {}
                    return u = i && i.getElementsByTagName("parsererror")[0],
                    (!i || u) && s.error("Invalid XML: " + (u ? s.map(u.childNodes, function(h) {
                        return h.textContent
                    }).join(`
`) : e)),
                    i
                }
                ;
                var In = /^(?:focusinfocus|focusoutblur)$/
                  , dn = function(e) {
                    e.stopPropagation()
                };
                s.extend(s.event, {
                    trigger: function(e, i, u, h) {
                        var b, w, k, R, I, B, J, te, Z = [u || z], oe = m.call(e, "type") ? e.type : e, ke = m.call(e, "namespace") ? e.namespace.split(".") : [];
                        if (w = te = k = u = u || z,
                        !(u.nodeType === 3 || u.nodeType === 8) && !In.test(oe + s.event.triggered) && (oe.indexOf(".") > -1 && (ke = oe.split("."),
                        oe = ke.shift(),
                        ke.sort()),
                        I = oe.indexOf(":") < 0 && "on" + oe,
                        e = e[s.expando] ? e : new s.Event(oe,typeof e == "object" && e),
                        e.isTrigger = h ? 2 : 3,
                        e.namespace = ke.join("."),
                        e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + ke.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                        e.result = void 0,
                        e.target || (e.target = u),
                        i = i == null ? [e] : s.makeArray(i, [e]),
                        J = s.event.special[oe] || {},
                        !(!h && J.trigger && J.trigger.apply(u, i) === !1))) {
                            if (!h && !J.noBubble && !U(u)) {
                                for (R = J.delegateType || oe,
                                In.test(R + oe) || (w = w.parentNode); w; w = w.parentNode)
                                    Z.push(w),
                                    k = w;
                                k === (u.ownerDocument || z) && Z.push(k.defaultView || k.parentWindow || E)
                            }
                            for (b = 0; (w = Z[b++]) && !e.isPropagationStopped(); )
                                te = w,
                                e.type = b > 1 ? R : J.bindType || oe,
                                B = (ye.get(w, "events") || Object.create(null))[e.type] && ye.get(w, "handle"),
                                B && B.apply(w, i),
                                B = I && w[I],
                                B && B.apply && Ge(w) && (e.result = B.apply(w, i),
                                e.result === !1 && e.preventDefault());
                            return e.type = oe,
                            !h && !e.isDefaultPrevented() && (!J._default || J._default.apply(Z.pop(), i) === !1) && Ge(u) && I && W(u[oe]) && !U(u) && (k = u[I],
                            k && (u[I] = null),
                            s.event.triggered = oe,
                            e.isPropagationStopped() && te.addEventListener(oe, dn),
                            u[oe](),
                            e.isPropagationStopped() && te.removeEventListener(oe, dn),
                            s.event.triggered = void 0,
                            k && (u[I] = k)),
                            e.result
                        }
                    },
                    simulate: function(e, i, u) {
                        var h = s.extend(new s.Event, u, {
                            type: e,
                            isSimulated: !0
                        });
                        s.event.trigger(h, null, i)
                    }
                }),
                s.fn.extend({
                    trigger: function(e, i) {
                        return this.each(function() {
                            s.event.trigger(e, i, this)
                        })
                    },
                    triggerHandler: function(e, i) {
                        var u = this[0];
                        if (u)
                            return s.event.trigger(e, i, u, !0)
                    }
                });
                var dr = /\[\]$/
                  , Fn = /\r?\n/g
                  , hr = /^(?:submit|button|image|reset|file)$/i
                  , fr = /^(?:input|select|textarea|keygen)/i;
                function hn(e, i, u, h) {
                    var b;
                    if (Array.isArray(i))
                        s.each(i, function(w, k) {
                            u || dr.test(e) ? h(e, k) : hn(e + "[" + (typeof k == "object" && k != null ? w : "") + "]", k, u, h)
                        });
                    else if (!u && we(i) === "object")
                        for (b in i)
                            hn(e + "[" + b + "]", i[b], u, h);
                    else
                        h(e, i)
                }
                s.param = function(e, i) {
                    var u, h = [], b = function(w, k) {
                        var R = W(k) ? k() : k;
                        h[h.length] = encodeURIComponent(w) + "=" + encodeURIComponent(R ?? "")
                    };
                    if (e == null)
                        return "";
                    if (Array.isArray(e) || e.jquery && !s.isPlainObject(e))
                        s.each(e, function() {
                            b(this.name, this.value)
                        });
                    else
                        for (u in e)
                            hn(u, e[u], i, b);
                    return h.join("&")
                }
                ,
                s.fn.extend({
                    serialize: function() {
                        return s.param(this.serializeArray())
                    },
                    serializeArray: function() {
                        return this.map(function() {
                            var e = s.prop(this, "elements");
                            return e ? s.makeArray(e) : this
                        }).filter(function() {
                            var e = this.type;
                            return this.name && !s(this).is(":disabled") && fr.test(this.nodeName) && !hr.test(e) && (this.checked || !Tt.test(e))
                        }).map(function(e, i) {
                            var u = s(this).val();
                            return u == null ? null : Array.isArray(u) ? s.map(u, function(h) {
                                return {
                                    name: i.name,
                                    value: h.replace(Fn, `\r
`)
                                }
                            }) : {
                                name: i.name,
                                value: u.replace(Fn, `\r
`)
                            }
                        }).get()
                    }
                });
                var pr = /%20/g
                  , gr = /#.*$/
                  , mr = /([?&])_=[^&]*/
                  , vr = /^(.*?):[ \t]*([^\r\n]*)$/mg
                  , yr = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
                  , _r = /^(?:GET|HEAD)$/
                  , br = /^\/\//
                  , Yn = {}
                  , fn = {}
                  , Rn = "*/".concat("*")
                  , Ti = z.createElement("a");
                Ti.href = Si.href;
                function zi(e) {
                    return function(i, u) {
                        typeof i != "string" && (u = i,
                        i = "*");
                        var h, b = 0, w = i.toLowerCase().match(dt) || [];
                        if (W(u))
                            for (; h = w[b++]; )
                                h[0] === "+" ? (h = h.slice(1) || "*",
                                (e[h] = e[h] || []).unshift(u)) : (e[h] = e[h] || []).push(u)
                    }
                }
                function qn(e, i, u, h) {
                    var b = {}
                      , w = e === fn;
                    function k(R) {
                        var I;
                        return b[R] = !0,
                        s.each(e[R] || [], function(B, J) {
                            var te = J(i, u, h);
                            if (typeof te == "string" && !w && !b[te])
                                return i.dataTypes.unshift(te),
                                k(te),
                                !1;
                            if (w)
                                return !(I = te)
                        }),
                        I
                    }
                    return k(i.dataTypes[0]) || !b["*"] && k("*")
                }
                function Ui(e, i) {
                    var u, h, b = s.ajaxSettings.flatOptions || {};
                    for (u in i)
                        i[u] !== void 0 && ((b[u] ? e : h || (h = {}))[u] = i[u]);
                    return h && s.extend(!0, e, h),
                    e
                }
                function jn(e, i, u) {
                    for (var h, b, w, k, R = e.contents, I = e.dataTypes; I[0] === "*"; )
                        I.shift(),
                        h === void 0 && (h = e.mimeType || i.getResponseHeader("Content-Type"));
                    if (h) {
                        for (b in R)
                            if (R[b] && R[b].test(h)) {
                                I.unshift(b);
                                break
                            }
                    }
                    if (I[0]in u)
                        w = I[0];
                    else {
                        for (b in u) {
                            if (!I[0] || e.converters[b + " " + I[0]]) {
                                w = b;
                                break
                            }
                            k || (k = b)
                        }
                        w = w || k
                    }
                    if (w)
                        return w !== I[0] && I.unshift(w),
                        u[w]
                }
                function wr(e, i, u, h) {
                    var b, w, k, R, I, B = {}, J = e.dataTypes.slice();
                    if (J[1])
                        for (k in e.converters)
                            B[k.toLowerCase()] = e.converters[k];
                    for (w = J.shift(); w; )
                        if (e.responseFields[w] && (u[e.responseFields[w]] = i),
                        !I && h && e.dataFilter && (i = e.dataFilter(i, e.dataType)),
                        I = w,
                        w = J.shift(),
                        w) {
                            if (w === "*")
                                w = I;
                            else if (I !== "*" && I !== w) {
                                if (k = B[I + " " + w] || B["* " + w],
                                !k) {
                                    for (b in B)
                                        if (R = b.split(" "),
                                        R[1] === w && (k = B[I + " " + R[0]] || B["* " + R[0]],
                                        k)) {
                                            k === !0 ? k = B[b] : B[b] !== !0 && (w = R[0],
                                            J.unshift(R[1]));
                                            break
                                        }
                                }
                                if (k !== !0)
                                    if (k && e.throws)
                                        i = k(i);
                                    else
                                        try {
                                            i = k(i)
                                        } catch (te) {
                                            return {
                                                state: "parsererror",
                                                error: k ? te : "No conversion from " + I + " to " + w
                                            }
                                        }
                            }
                        }
                    return {
                        state: "success",
                        data: i
                    }
                }
                s.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: Si.href,
                        type: "GET",
                        isLocal: yr.test(Si.protocol),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": Rn,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /\bxml\b/,
                            html: /\bhtml/,
                            json: /\bjson\b/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": JSON.parse,
                            "text xml": s.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(e, i) {
                        return i ? Ui(Ui(e, s.ajaxSettings), i) : Ui(s.ajaxSettings, e)
                    },
                    ajaxPrefilter: zi(Yn),
                    ajaxTransport: zi(fn),
                    ajax: function(e, i) {
                        typeof e == "object" && (i = e,
                        e = void 0),
                        i = i || {};
                        var u, h, b, w, k, R, I, B, J, te, Z = s.ajaxSetup({}, i), oe = Z.context || Z, ke = Z.context && (oe.nodeType || oe.jquery) ? s(oe) : s.event, Ie = s.Deferred(), $e = s.Callbacks("once memory"), rt = Z.statusCode || {}, it = {}, Et = {}, Mt = "canceled", Fe = {
                            readyState: 0,
                            getResponseHeader: function(je) {
                                var et;
                                if (I) {
                                    if (!w)
                                        for (w = {}; et = vr.exec(b); )
                                            w[et[1].toLowerCase() + " "] = (w[et[1].toLowerCase() + " "] || []).concat(et[2]);
                                    et = w[je.toLowerCase() + " "]
                                }
                                return et == null ? null : et.join(", ")
                            },
                            getAllResponseHeaders: function() {
                                return I ? b : null
                            },
                            setRequestHeader: function(je, et) {
                                return I == null && (je = Et[je.toLowerCase()] = Et[je.toLowerCase()] || je,
                                it[je] = et),
                                this
                            },
                            overrideMimeType: function(je) {
                                return I == null && (Z.mimeType = je),
                                this
                            },
                            statusCode: function(je) {
                                var et;
                                if (je)
                                    if (I)
                                        Fe.always(je[Fe.status]);
                                    else
                                        for (et in je)
                                            rt[et] = [rt[et], je[et]];
                                return this
                            },
                            abort: function(je) {
                                var et = je || Mt;
                                return u && u.abort(et),
                                Xt(0, et),
                                this
                            }
                        };
                        if (Ie.promise(Fe),
                        Z.url = ((e || Z.url || Si.href) + "").replace(br, Si.protocol + "//"),
                        Z.type = i.method || i.type || Z.method || Z.type,
                        Z.dataTypes = (Z.dataType || "*").toLowerCase().match(dt) || [""],
                        Z.crossDomain == null) {
                            R = z.createElement("a");
                            try {
                                R.href = Z.url,
                                R.href = R.href,
                                Z.crossDomain = Ti.protocol + "//" + Ti.host != R.protocol + "//" + R.host
                            } catch {
                                Z.crossDomain = !0
                            }
                        }
                        if (Z.data && Z.processData && typeof Z.data != "string" && (Z.data = s.param(Z.data, Z.traditional)),
                        qn(Yn, Z, i, Fe),
                        I)
                            return Fe;
                        B = s.event && Z.global,
                        B && s.active++ === 0 && s.event.trigger("ajaxStart"),
                        Z.type = Z.type.toUpperCase(),
                        Z.hasContent = !_r.test(Z.type),
                        h = Z.url.replace(gr, ""),
                        Z.hasContent ? Z.data && Z.processData && (Z.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (Z.data = Z.data.replace(pr, "+")) : (te = Z.url.slice(h.length),
                        Z.data && (Z.processData || typeof Z.data == "string") && (h += (Ai.test(h) ? "&" : "?") + Z.data,
                        delete Z.data),
                        Z.cache === !1 && (h = h.replace(mr, "$1"),
                        te = (Ai.test(h) ? "&" : "?") + "_=" + Nn.guid++ + te),
                        Z.url = h + te),
                        Z.ifModified && (s.lastModified[h] && Fe.setRequestHeader("If-Modified-Since", s.lastModified[h]),
                        s.etag[h] && Fe.setRequestHeader("If-None-Match", s.etag[h])),
                        (Z.data && Z.hasContent && Z.contentType !== !1 || i.contentType) && Fe.setRequestHeader("Content-Type", Z.contentType),
                        Fe.setRequestHeader("Accept", Z.dataTypes[0] && Z.accepts[Z.dataTypes[0]] ? Z.accepts[Z.dataTypes[0]] + (Z.dataTypes[0] !== "*" ? ", " + Rn + "; q=0.01" : "") : Z.accepts["*"]);
                        for (J in Z.headers)
                            Fe.setRequestHeader(J, Z.headers[J]);
                        if (Z.beforeSend && (Z.beforeSend.call(oe, Fe, Z) === !1 || I))
                            return Fe.abort();
                        if (Mt = "abort",
                        $e.add(Z.complete),
                        Fe.done(Z.success),
                        Fe.fail(Z.error),
                        u = qn(fn, Z, i, Fe),
                        !u)
                            Xt(-1, "No Transport");
                        else {
                            if (Fe.readyState = 1,
                            B && ke.trigger("ajaxSend", [Fe, Z]),
                            I)
                                return Fe;
                            Z.async && Z.timeout > 0 && (k = E.setTimeout(function() {
                                Fe.abort("timeout")
                            }, Z.timeout));
                            try {
                                I = !1,
                                u.send(it, Xt)
                            } catch (je) {
                                if (I)
                                    throw je;
                                Xt(-1, je)
                            }
                        }
                        function Xt(je, et, pi, pn) {
                            var lt, $i, bt, Ht, Ot, wt = et;
                            I || (I = !0,
                            k && E.clearTimeout(k),
                            u = void 0,
                            b = pn || "",
                            Fe.readyState = je > 0 ? 4 : 0,
                            lt = je >= 200 && je < 300 || je === 304,
                            pi && (Ht = jn(Z, Fe, pi)),
                            !lt && s.inArray("script", Z.dataTypes) > -1 && s.inArray("json", Z.dataTypes) < 0 && (Z.converters["text script"] = function() {}
                            ),
                            Ht = wr(Z, Ht, Fe, lt),
                            lt ? (Z.ifModified && (Ot = Fe.getResponseHeader("Last-Modified"),
                            Ot && (s.lastModified[h] = Ot),
                            Ot = Fe.getResponseHeader("etag"),
                            Ot && (s.etag[h] = Ot)),
                            je === 204 || Z.type === "HEAD" ? wt = "nocontent" : je === 304 ? wt = "notmodified" : (wt = Ht.state,
                            $i = Ht.data,
                            bt = Ht.error,
                            lt = !bt)) : (bt = wt,
                            (je || !wt) && (wt = "error",
                            je < 0 && (je = 0))),
                            Fe.status = je,
                            Fe.statusText = (et || wt) + "",
                            lt ? Ie.resolveWith(oe, [$i, wt, Fe]) : Ie.rejectWith(oe, [Fe, wt, bt]),
                            Fe.statusCode(rt),
                            rt = void 0,
                            B && ke.trigger(lt ? "ajaxSuccess" : "ajaxError", [Fe, Z, lt ? $i : bt]),
                            $e.fireWith(oe, [Fe, wt]),
                            B && (ke.trigger("ajaxComplete", [Fe, Z]),
                            --s.active || s.event.trigger("ajaxStop")))
                        }
                        return Fe
                    },
                    getJSON: function(e, i, u) {
                        return s.get(e, i, u, "json")
                    },
                    getScript: function(e, i) {
                        return s.get(e, void 0, i, "script")
                    }
                }),
                s.each(["get", "post"], function(e, i) {
                    s[i] = function(u, h, b, w) {
                        return W(h) && (w = w || b,
                        b = h,
                        h = void 0),
                        s.ajax(s.extend({
                            url: u,
                            type: i,
                            dataType: w,
                            data: h,
                            success: b
                        }, s.isPlainObject(u) && u))
                    }
                }),
                s.ajaxPrefilter(function(e) {
                    var i;
                    for (i in e.headers)
                        i.toLowerCase() === "content-type" && (e.contentType = e.headers[i] || "")
                }),
                s._evalUrl = function(e, i, u) {
                    return s.ajax({
                        url: e,
                        type: "GET",
                        dataType: "script",
                        cache: !0,
                        async: !1,
                        global: !1,
                        converters: {
                            "text script": function() {}
                        },
                        dataFilter: function(h) {
                            s.globalEval(h, i, u)
                        }
                    })
                }
                ,
                s.fn.extend({
                    wrapAll: function(e) {
                        var i;
                        return this[0] && (W(e) && (e = e.call(this[0])),
                        i = s(e, this[0].ownerDocument).eq(0).clone(!0),
                        this[0].parentNode && i.insertBefore(this[0]),
                        i.map(function() {
                            for (var u = this; u.firstElementChild; )
                                u = u.firstElementChild;
                            return u
                        }).append(this)),
                        this
                    },
                    wrapInner: function(e) {
                        return W(e) ? this.each(function(i) {
                            s(this).wrapInner(e.call(this, i))
                        }) : this.each(function() {
                            var i = s(this)
                              , u = i.contents();
                            u.length ? u.wrapAll(e) : i.append(e)
                        })
                    },
                    wrap: function(e) {
                        var i = W(e);
                        return this.each(function(u) {
                            s(this).wrapAll(i ? e.call(this, u) : e)
                        })
                    },
                    unwrap: function(e) {
                        return this.parent(e).not("body").each(function() {
                            s(this).replaceWith(this.childNodes)
                        }),
                        this
                    }
                }),
                s.expr.pseudos.hidden = function(e) {
                    return !s.expr.pseudos.visible(e)
                }
                ,
                s.expr.pseudos.visible = function(e) {
                    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
                }
                ,
                s.ajaxSettings.xhr = function() {
                    try {
                        return new E.XMLHttpRequest
                    } catch {}
                }
                ;
                var xr = {
                    0: 200,
                    1223: 204
                }
                  , Li = s.ajaxSettings.xhr();
                N.cors = !!Li && "withCredentials"in Li,
                N.ajax = Li = !!Li,
                s.ajaxTransport(function(e) {
                    var i, u;
                    if (N.cors || Li && !e.crossDomain)
                        return {
                            send: function(h, b) {
                                var w, k = e.xhr();
                                if (k.open(e.type, e.url, e.async, e.username, e.password),
                                e.xhrFields)
                                    for (w in e.xhrFields)
                                        k[w] = e.xhrFields[w];
                                e.mimeType && k.overrideMimeType && k.overrideMimeType(e.mimeType),
                                !e.crossDomain && !h["X-Requested-With"] && (h["X-Requested-With"] = "XMLHttpRequest");
                                for (w in h)
                                    k.setRequestHeader(w, h[w]);
                                i = function(R) {
                                    return function() {
                                        i && (i = u = k.onload = k.onerror = k.onabort = k.ontimeout = k.onreadystatechange = null,
                                        R === "abort" ? k.abort() : R === "error" ? typeof k.status != "number" ? b(0, "error") : b(k.status, k.statusText) : b(xr[k.status] || k.status, k.statusText, (k.responseType || "text") !== "text" || typeof k.responseText != "string" ? {
                                            binary: k.response
                                        } : {
                                            text: k.responseText
                                        }, k.getAllResponseHeaders()))
                                    }
                                }
                                ,
                                k.onload = i(),
                                u = k.onerror = k.ontimeout = i("error"),
                                k.onabort !== void 0 ? k.onabort = u : k.onreadystatechange = function() {
                                    k.readyState === 4 && E.setTimeout(function() {
                                        i && u()
                                    })
                                }
                                ,
                                i = i("abort");
                                try {
                                    k.send(e.hasContent && e.data || null)
                                } catch (R) {
                                    if (i)
                                        throw R
                                }
                            },
                            abort: function() {
                                i && i()
                            }
                        }
                }),
                s.ajaxPrefilter(function(e) {
                    e.crossDomain && (e.contents.script = !1)
                }),
                s.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /\b(?:java|ecma)script\b/
                    },
                    converters: {
                        "text script": function(e) {
                            return s.globalEval(e),
                            e
                        }
                    }
                }),
                s.ajaxPrefilter("script", function(e) {
                    e.cache === void 0 && (e.cache = !1),
                    e.crossDomain && (e.type = "GET")
                }),
                s.ajaxTransport("script", function(e) {
                    if (e.crossDomain || e.scriptAttrs) {
                        var i, u;
                        return {
                            send: function(h, b) {
                                i = s("<script>").attr(e.scriptAttrs || {}).prop({
                                    charset: e.scriptCharset,
                                    src: e.url
                                }).on("load error", u = function(w) {
                                    i.remove(),
                                    u = null,
                                    w && b(w.type === "error" ? 404 : 200, w.type)
                                }
                                ),
                                z.head.appendChild(i[0])
                            },
                            abort: function() {
                                u && u()
                            }
                        }
                    }
                });
                var Hn = []
                  , Gi = /(=)\?(?=&|$)|\?\?/;
                s.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var e = Hn.pop() || s.expando + "_" + Nn.guid++;
                        return this[e] = !0,
                        e
                    }
                }),
                s.ajaxPrefilter("json jsonp", function(e, i, u) {
                    var h, b, w, k = e.jsonp !== !1 && (Gi.test(e.url) ? "url" : typeof e.data == "string" && (e.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Gi.test(e.data) && "data");
                    if (k || e.dataTypes[0] === "jsonp")
                        return h = e.jsonpCallback = W(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                        k ? e[k] = e[k].replace(Gi, "$1" + h) : e.jsonp !== !1 && (e.url += (Ai.test(e.url) ? "&" : "?") + e.jsonp + "=" + h),
                        e.converters["script json"] = function() {
                            return w || s.error(h + " was not called"),
                            w[0]
                        }
                        ,
                        e.dataTypes[0] = "json",
                        b = E[h],
                        E[h] = function() {
                            w = arguments
                        }
                        ,
                        u.always(function() {
                            b === void 0 ? s(E).removeProp(h) : E[h] = b,
                            e[h] && (e.jsonpCallback = i.jsonpCallback,
                            Hn.push(h)),
                            w && W(b) && b(w[0]),
                            w = b = void 0
                        }),
                        "script"
                }),
                N.createHTMLDocument = function() {
                    var e = z.implementation.createHTMLDocument("").body;
                    return e.innerHTML = "<form></form><form></form>",
                    e.childNodes.length === 2
                }(),
                s.parseHTML = function(e, i, u) {
                    if (typeof e != "string")
                        return [];
                    typeof i == "boolean" && (u = i,
                    i = !1);
                    var h, b, w;
                    return i || (N.createHTMLDocument ? (i = z.implementation.createHTMLDocument(""),
                    h = i.createElement("base"),
                    h.href = z.location.href,
                    i.head.appendChild(h)) : i = z),
                    b = X.exec(e),
                    w = !u && [],
                    b ? [i.createElement(b[1])] : (b = gt([e], i, w),
                    w && w.length && s(w).remove(),
                    s.merge([], b.childNodes))
                }
                ,
                s.fn.load = function(e, i, u) {
                    var h, b, w, k = this, R = e.indexOf(" ");
                    return R > -1 && (h = Qt(e.slice(R)),
                    e = e.slice(0, R)),
                    W(i) ? (u = i,
                    i = void 0) : i && typeof i == "object" && (b = "POST"),
                    k.length > 0 && s.ajax({
                        url: e,
                        type: b || "GET",
                        dataType: "html",
                        data: i
                    }).done(function(I) {
                        w = arguments,
                        k.html(h ? s("<div>").append(s.parseHTML(I)).find(h) : I)
                    }).always(u && function(I, B) {
                        k.each(function() {
                            u.apply(this, w || [I.responseText, B, I])
                        })
                    }
                    ),
                    this
                }
                ,
                s.expr.pseudos.animated = function(e) {
                    return s.grep(s.timers, function(i) {
                        return e === i.elem
                    }).length
                }
                ,
                s.offset = {
                    setOffset: function(e, i, u) {
                        var h, b, w, k, R, I, B, J = s.css(e, "position"), te = s(e), Z = {};
                        J === "static" && (e.style.position = "relative"),
                        R = te.offset(),
                        w = s.css(e, "top"),
                        I = s.css(e, "left"),
                        B = (J === "absolute" || J === "fixed") && (w + I).indexOf("auto") > -1,
                        B ? (h = te.position(),
                        k = h.top,
                        b = h.left) : (k = parseFloat(w) || 0,
                        b = parseFloat(I) || 0),
                        W(i) && (i = i.call(e, u, s.extend({}, R))),
                        i.top != null && (Z.top = i.top - R.top + k),
                        i.left != null && (Z.left = i.left - R.left + b),
                        "using"in i ? i.using.call(e, Z) : te.css(Z)
                    }
                },
                s.fn.extend({
                    offset: function(e) {
                        if (arguments.length)
                            return e === void 0 ? this : this.each(function(b) {
                                s.offset.setOffset(this, e, b)
                            });
                        var i, u, h = this[0];
                        if (h)
                            return h.getClientRects().length ? (i = h.getBoundingClientRect(),
                            u = h.ownerDocument.defaultView,
                            {
                                top: i.top + u.pageYOffset,
                                left: i.left + u.pageXOffset
                            }) : {
                                top: 0,
                                left: 0
                            }
                    },
                    position: function() {
                        if (this[0]) {
                            var e, i, u, h = this[0], b = {
                                top: 0,
                                left: 0
                            };
                            if (s.css(h, "position") === "fixed")
                                i = h.getBoundingClientRect();
                            else {
                                for (i = this.offset(),
                                u = h.ownerDocument,
                                e = h.offsetParent || u.documentElement; e && (e === u.body || e === u.documentElement) && s.css(e, "position") === "static"; )
                                    e = e.parentNode;
                                e && e !== h && e.nodeType === 1 && (b = s(e).offset(),
                                b.top += s.css(e, "borderTopWidth", !0),
                                b.left += s.css(e, "borderLeftWidth", !0))
                            }
                            return {
                                top: i.top - b.top - s.css(h, "marginTop", !0),
                                left: i.left - b.left - s.css(h, "marginLeft", !0)
                            }
                        }
                    },
                    offsetParent: function() {
                        return this.map(function() {
                            for (var e = this.offsetParent; e && s.css(e, "position") === "static"; )
                                e = e.offsetParent;
                            return e || Pt
                        })
                    }
                }),
                s.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, function(e, i) {
                    var u = i === "pageYOffset";
                    s.fn[e] = function(h) {
                        return nt(this, function(b, w, k) {
                            var R;
                            if (U(b) ? R = b : b.nodeType === 9 && (R = b.defaultView),
                            k === void 0)
                                return R ? R[i] : b[w];
                            R ? R.scrollTo(u ? R.pageXOffset : k, u ? k : R.pageYOffset) : b[w] = k
                        }, e, h, arguments.length)
                    }
                }),
                s.each(["top", "left"], function(e, i) {
                    s.cssHooks[i] = Cn(N.pixelPosition, function(u, h) {
                        if (h)
                            return h = di(u, i),
                            Vt.test(h) ? s(u).position()[i] + "px" : h
                    })
                }),
                s.each({
                    Height: "height",
                    Width: "width"
                }, function(e, i) {
                    s.each({
                        padding: "inner" + e,
                        content: i,
                        "": "outer" + e
                    }, function(u, h) {
                        s.fn[h] = function(b, w) {
                            var k = arguments.length && (u || typeof b != "boolean")
                              , R = u || (b === !0 || w === !0 ? "margin" : "border");
                            return nt(this, function(I, B, J) {
                                var te;
                                return U(I) ? h.indexOf("outer") === 0 ? I["inner" + e] : I.document.documentElement["client" + e] : I.nodeType === 9 ? (te = I.documentElement,
                                Math.max(I.body["scroll" + e], te["scroll" + e], I.body["offset" + e], te["offset" + e], te["client" + e])) : J === void 0 ? s.css(I, B, R) : s.style(I, B, J, R)
                            }, i, k ? b : void 0, k)
                        }
                    })
                }),
                s.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, i) {
                    s.fn[i] = function(u) {
                        return this.on(i, u)
                    }
                }),
                s.fn.extend({
                    bind: function(e, i, u) {
                        return this.on(e, null, i, u)
                    },
                    unbind: function(e, i) {
                        return this.off(e, null, i)
                    },
                    delegate: function(e, i, u, h) {
                        return this.on(i, e, u, h)
                    },
                    undelegate: function(e, i, u) {
                        return arguments.length === 1 ? this.off(e, "**") : this.off(i, e || "**", u)
                    },
                    hover: function(e, i) {
                        return this.on("mouseenter", e).on("mouseleave", i || e)
                    }
                }),
                s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, i) {
                    s.fn[i] = function(u, h) {
                        return arguments.length > 0 ? this.on(i, null, u, h) : this.trigger(i)
                    }
                });
                var Je = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
                s.proxy = function(e, i) {
                    var u, h, b;
                    if (typeof i == "string" && (u = e[i],
                    i = e,
                    e = u),
                    !!W(e))
                        return h = n.call(arguments, 2),
                        b = function() {
                            return e.apply(i || this, h.concat(n.call(arguments)))
                        }
                        ,
                        b.guid = e.guid = e.guid || s.guid++,
                        b
                }
                ,
                s.holdReady = function(e) {
                    e ? s.readyWait++ : s.ready(!0)
                }
                ,
                s.isArray = Array.isArray,
                s.parseJSON = JSON.parse,
                s.nodeName = A,
                s.isFunction = W,
                s.isWindow = U,
                s.camelCase = Ye,
                s.type = we,
                s.now = Date.now,
                s.isNumeric = function(e) {
                    var i = s.type(e);
                    return (i === "number" || i === "string") && !isNaN(e - parseFloat(e))
                }
                ,
                s.trim = function(e) {
                    return e == null ? "" : (e + "").replace(Je, "$1")
                }
                ;
                var Mi = E.jQuery
                  , Oi = E.$;
                return s.noConflict = function(e) {
                    return E.$ === s && (E.$ = Oi),
                    e && E.jQuery === s && (E.jQuery = Mi),
                    s
                }
                ,
                typeof O > "u" && (E.jQuery = E.$ = s),
                s
            })
        }(Mr)),
        Mr.exports
    }
    function to(p) {
        throw new Error('Could not dynamically require "' + p + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
    }
    var Or = {
        exports: {}
    }, Xr;
    function rs() {
        return Xr || (Xr = 1,
        function(p, E) {
            (function(O, L) {
                p.exports = L()
            }
            )(Pr, function() {
                var O;
                function L() {
                    return O.apply(null, arguments)
                }
                function D(t) {
                    O = t
                }
                function n(t) {
                    return t instanceof Array || Object.prototype.toString.call(t) === "[object Array]"
                }
                function o(t) {
                    return t != null && Object.prototype.toString.call(t) === "[object Object]"
                }
                function l(t, r) {
                    return Object.prototype.hasOwnProperty.call(t, r)
                }
                function c(t) {
                    if (Object.getOwnPropertyNames)
                        return Object.getOwnPropertyNames(t).length === 0;
                    var r;
                    for (r in t)
                        if (l(t, r))
                            return !1;
                    return !0
                }
                function d(t) {
                    return t === void 0
                }
                function a(t) {
                    return typeof t == "number" || Object.prototype.toString.call(t) === "[object Number]"
                }
                function m(t) {
                    return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]"
                }
                function _(t, r) {
                    var f = [], v, T = t.length;
                    for (v = 0; v < T; ++v)
                        f.push(r(t[v], v));
                    return f
                }
                function M(t, r) {
                    for (var f in r)
                        l(r, f) && (t[f] = r[f]);
                    return l(r, "toString") && (t.toString = r.toString),
                    l(r, "valueOf") && (t.valueOf = r.valueOf),
                    t
                }
                function N(t, r, f, v) {
                    return Wn(t, r, f, v, !0).utc()
                }
                function W() {
                    return {
                        empty: !1,
                        unusedTokens: [],
                        unusedInput: [],
                        overflow: -2,
                        charsLeftOver: 0,
                        nullInput: !1,
                        invalidEra: null,
                        invalidMonth: null,
                        invalidFormat: !1,
                        userInvalidated: !1,
                        iso: !1,
                        parsedDateParts: [],
                        era: null,
                        meridiem: null,
                        rfc2822: !1,
                        weekdayMismatch: !1
                    }
                }
                function U(t) {
                    return t._pf == null && (t._pf = W()),
                    t._pf
                }
                var z;
                Array.prototype.some ? z = Array.prototype.some : z = function(t) {
                    var r = Object(this), f = r.length >>> 0, v;
                    for (v = 0; v < f; v++)
                        if (v in r && t.call(this, r[v], v, r))
                            return !0;
                    return !1
                }
                ;
                function pe(t) {
                    var r = null
                      , f = !1
                      , v = t._d && !isNaN(t._d.getTime());
                    if (v && (r = U(t),
                    f = z.call(r.parsedDateParts, function(T) {
                        return T != null
                    }),
                    v = r.overflow < 0 && !r.empty && !r.invalidEra && !r.invalidMonth && !r.invalidWeekday && !r.weekdayMismatch && !r.nullInput && !r.invalidFormat && !r.userInvalidated && (!r.meridiem || r.meridiem && f),
                    t._strict && (v = v && r.charsLeftOver === 0 && r.unusedTokens.length === 0 && r.bigHour === void 0)),
                    Object.isFrozen == null || !Object.isFrozen(t))
                        t._isValid = v;
                    else
                        return v;
                    return t._isValid
                }
                function fe(t) {
                    var r = N(NaN);
                    return t != null ? M(U(r), t) : U(r).userInvalidated = !0,
                    r
                }
                var we = L.momentProperties = []
                  , be = !1;
                function ne(t, r) {
                    var f, v, T, j = we.length;
                    if (d(r._isAMomentObject) || (t._isAMomentObject = r._isAMomentObject),
                    d(r._i) || (t._i = r._i),
                    d(r._f) || (t._f = r._f),
                    d(r._l) || (t._l = r._l),
                    d(r._strict) || (t._strict = r._strict),
                    d(r._tzm) || (t._tzm = r._tzm),
                    d(r._isUTC) || (t._isUTC = r._isUTC),
                    d(r._offset) || (t._offset = r._offset),
                    d(r._pf) || (t._pf = U(r)),
                    d(r._locale) || (t._locale = r._locale),
                    j > 0)
                        for (f = 0; f < j; f++)
                            v = we[f],
                            T = r[v],
                            d(T) || (t[v] = T);
                    return t
                }
                function s(t) {
                    ne(this, t),
                    this._d = new Date(t._d != null ? t._d.getTime() : NaN),
                    this.isValid() || (this._d = new Date(NaN)),
                    be === !1 && (be = !0,
                    L.updateOffset(this),
                    be = !1)
                }
                function F(t) {
                    return t instanceof s || t != null && t._isAMomentObject != null
                }
                function A(t) {
                    L.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + t)
                }
                function C(t, r) {
                    var f = !0;
                    return M(function() {
                        if (L.deprecationHandler != null && L.deprecationHandler(null, t),
                        f) {
                            var v = [], T, j, K, me = arguments.length;
                            for (j = 0; j < me; j++) {
                                if (T = "",
                                typeof arguments[j] == "object") {
                                    T += `
[` + j + "] ";
                                    for (K in arguments[0])
                                        l(arguments[0], K) && (T += K + ": " + arguments[0][K] + ", ");
                                    T = T.slice(0, -2)
                                } else
                                    T = arguments[j];
                                v.push(T)
                            }
                            A(t + `
Arguments: ` + Array.prototype.slice.call(v).join("") + `
` + new Error().stack),
                            f = !1
                        }
                        return r.apply(this, arguments)
                    }, r)
                }
                var x = {};
                function g(t, r) {
                    L.deprecationHandler != null && L.deprecationHandler(t, r),
                    x[t] || (A(r),
                    x[t] = !0)
                }
                L.suppressDeprecationWarnings = !1,
                L.deprecationHandler = null;
                function y(t) {
                    return typeof Function < "u" && t instanceof Function || Object.prototype.toString.call(t) === "[object Function]"
                }
                function S(t) {
                    var r, f;
                    for (f in t)
                        l(t, f) && (r = t[f],
                        y(r) ? this[f] = r : this["_" + f] = r);
                    this._config = t,
                    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
                }
                function Y(t, r) {
                    var f = M({}, t), v;
                    for (v in r)
                        l(r, v) && (o(t[v]) && o(r[v]) ? (f[v] = {},
                        M(f[v], t[v]),
                        M(f[v], r[v])) : r[v] != null ? f[v] = r[v] : delete f[v]);
                    for (v in t)
                        l(t, v) && !l(r, v) && o(t[v]) && (f[v] = M({}, f[v]));
                    return f
                }
                function q(t) {
                    t != null && this.set(t)
                }
                var G;
                Object.keys ? G = Object.keys : G = function(t) {
                    var r, f = [];
                    for (r in t)
                        l(t, r) && f.push(r);
                    return f
                }
                ;
                var se = {
                    sameDay: "[Today at] LT",
                    nextDay: "[Tomorrow at] LT",
                    nextWeek: "dddd [at] LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[Last] dddd [at] LT",
                    sameElse: "L"
                };
                function ae(t, r, f) {
                    var v = this._calendar[t] || this._calendar.sameElse;
                    return y(v) ? v.call(r, f) : v
                }
                function ge(t, r, f) {
                    var v = "" + Math.abs(t)
                      , T = r - v.length
                      , j = t >= 0;
                    return (j ? f ? "+" : "" : "-") + Math.pow(10, Math.max(0, T)).toString().substr(1) + v
                }
                var Te = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g
                  , X = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g
                  , ve = {}
                  , Ee = {};
                function re(t, r, f, v) {
                    var T = v;
                    typeof v == "string" && (T = function() {
                        return this[v]()
                    }
                    ),
                    t && (Ee[t] = T),
                    r && (Ee[r[0]] = function() {
                        return ge(T.apply(this, arguments), r[1], r[2])
                    }
                    ),
                    f && (Ee[f] = function() {
                        return this.localeData().ordinal(T.apply(this, arguments), t)
                    }
                    )
                }
                function We(t) {
                    return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
                }
                function Re(t) {
                    var r = t.match(Te), f, v;
                    for (f = 0,
                    v = r.length; f < v; f++)
                        Ee[r[f]] ? r[f] = Ee[r[f]] : r[f] = We(r[f]);
                    return function(T) {
                        var j = "", K;
                        for (K = 0; K < v; K++)
                            j += y(r[K]) ? r[K].call(T, t) : r[K];
                        return j
                    }
                }
                function at(t, r) {
                    return t.isValid() ? (r = pt(r, t.localeData()),
                    ve[r] = ve[r] || Re(r),
                    ve[r](t)) : t.localeData().invalidDate()
                }
                function pt(t, r) {
                    var f = 5;
                    function v(T) {
                        return r.longDateFormat(T) || T
                    }
                    for (X.lastIndex = 0; f >= 0 && X.test(t); )
                        t = t.replace(X, v),
                        X.lastIndex = 0,
                        f -= 1;
                    return t
                }
                var dt = {
                    LTS: "h:mm:ss A",
                    LT: "h:mm A",
                    L: "MM/DD/YYYY",
                    LL: "MMMM D, YYYY",
                    LLL: "MMMM D, YYYY h:mm A",
                    LLLL: "dddd, MMMM D, YYYY h:mm A"
                };
                function yi(t) {
                    var r = this._longDateFormat[t]
                      , f = this._longDateFormat[t.toUpperCase()];
                    return r || !f ? r : (this._longDateFormat[t] = f.match(Te).map(function(v) {
                        return v === "MMMM" || v === "MM" || v === "DD" || v === "dddd" ? v.slice(1) : v
                    }).join(""),
                    this._longDateFormat[t])
                }
                var qt = "Invalid date";
                function oi() {
                    return this._invalidDate
                }
                var Fi = "%d"
                  , tn = /\d{1,2}/;
                function _i(t) {
                    return this._ordinal.replace("%d", t)
                }
                var bi = {
                    future: "in %s",
                    past: "%s ago",
                    s: "a few seconds",
                    ss: "%d seconds",
                    m: "a minute",
                    mm: "%d minutes",
                    h: "an hour",
                    hh: "%d hours",
                    d: "a day",
                    dd: "%d days",
                    w: "a week",
                    ww: "%d weeks",
                    M: "a month",
                    MM: "%d months",
                    y: "a year",
                    yy: "%d years"
                };
                function nt(t, r, f, v) {
                    var T = this._relativeTime[f];
                    return y(T) ? T(t, r, f, v) : T.replace(/%d/i, t)
                }
                function ie(t, r) {
                    var f = this._relativeTime[t > 0 ? "future" : "past"];
                    return y(f) ? f(r) : f.replace(/%s/i, r)
                }
                var Xe = {
                    D: "date",
                    dates: "date",
                    date: "date",
                    d: "day",
                    days: "day",
                    day: "day",
                    e: "weekday",
                    weekdays: "weekday",
                    weekday: "weekday",
                    E: "isoWeekday",
                    isoweekdays: "isoWeekday",
                    isoweekday: "isoWeekday",
                    DDD: "dayOfYear",
                    dayofyears: "dayOfYear",
                    dayofyear: "dayOfYear",
                    h: "hour",
                    hours: "hour",
                    hour: "hour",
                    ms: "millisecond",
                    milliseconds: "millisecond",
                    millisecond: "millisecond",
                    m: "minute",
                    minutes: "minute",
                    minute: "minute",
                    M: "month",
                    months: "month",
                    month: "month",
                    Q: "quarter",
                    quarters: "quarter",
                    quarter: "quarter",
                    s: "second",
                    seconds: "second",
                    second: "second",
                    gg: "weekYear",
                    weekyears: "weekYear",
                    weekyear: "weekYear",
                    GG: "isoWeekYear",
                    isoweekyears: "isoWeekYear",
                    isoweekyear: "isoWeekYear",
                    w: "week",
                    weeks: "week",
                    week: "week",
                    W: "isoWeek",
                    isoweeks: "isoWeek",
                    isoweek: "isoWeek",
                    y: "year",
                    years: "year",
                    year: "year"
                };
                function Oe(t) {
                    return typeof t == "string" ? Xe[t] || Xe[t.toLowerCase()] : void 0
                }
                function Ye(t) {
                    var r = {}, f, v;
                    for (v in t)
                        l(t, v) && (f = Oe(v),
                        f && (r[f] = t[v]));
                    return r
                }
                var Ge = {
                    date: 9,
                    day: 11,
                    weekday: 11,
                    isoWeekday: 11,
                    dayOfYear: 4,
                    hour: 13,
                    millisecond: 16,
                    minute: 14,
                    month: 8,
                    quarter: 7,
                    second: 15,
                    weekYear: 1,
                    isoWeekYear: 1,
                    week: 5,
                    isoWeek: 5,
                    year: 1
                };
                function Ve(t) {
                    var r = [], f;
                    for (f in t)
                        l(t, f) && r.push({
                            unit: f,
                            priority: Ge[f]
                        });
                    return r.sort(function(v, T) {
                        return v.priority - T.priority
                    }),
                    r
                }
                var ye = /\d/, Ue = /\d\d/, wn = /\d{3}/, nn = /\d{4}/, Yi = /[+-]?\d{6}/, Ze = /\d\d?/, rn = /\d\d\d\d?/, li = /\d\d\d\d\d\d?/, yt = /\d{1,3}/, Pt = /\d{1,4}/, Nt = /[+-]?\d{1,6}/, ui = /\d+/, zt = /[+-]?\d+/, xn = /Z|[+-]\d\d:?\d\d/gi, wi = /Z|[+-]\d\d(?::?\d\d)?/gi, ar = /[+-]?\d+(\.\d{1,3})?/, At = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Tt = /^[1-9]\d?/, Ri = /^([1-9]\d|\d)/, xi;
                xi = {};
                function ce(t, r, f) {
                    xi[t] = y(r) ? r : function(v, T) {
                        return v && f ? f : r
                    }
                }
                function ht(t, r) {
                    return l(xi, t) ? xi[t](r._strict, r._locale) : new RegExp(sn(t))
                }
                function sn(t) {
                    return It(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(r, f, v, T, j) {
                        return f || v || T || j
                    }))
                }
                function It(t) {
                    return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                }
                function gt(t) {
                    return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
                }
                function Pe(t) {
                    var r = +t
                      , f = 0;
                    return r !== 0 && isFinite(r) && (f = gt(r)),
                    f
                }
                var jt = {};
                function qe(t, r) {
                    var f, v = r, T;
                    for (typeof t == "string" && (t = [t]),
                    a(r) && (v = function(j, K) {
                        K[r] = Pe(j)
                    }
                    ),
                    T = t.length,
                    f = 0; f < T; f++)
                        jt[t[f]] = v
                }
                function Ut(t, r) {
                    qe(t, function(f, v, T, j) {
                        T._w = T._w || {},
                        r(f, T._w, T, j)
                    })
                }
                function qi(t, r, f) {
                    r != null && l(jt, t) && jt[t](r, f._a, f, t)
                }
                function ji(t) {
                    return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
                }
                var ot = 0
                  , Ft = 1
                  , Dt = 2
                  , tt = 3
                  , Ct = 4
                  , Lt = 5
                  , Gt = 6
                  , ci = 7
                  , Dn = 8;
                re("Y", 0, 0, function() {
                    var t = this.year();
                    return t <= 9999 ? ge(t, 4) : "+" + t
                }),
                re(0, ["YY", 2], 0, function() {
                    return this.year() % 100
                }),
                re(0, ["YYYY", 4], 0, "year"),
                re(0, ["YYYYY", 5], 0, "year"),
                re(0, ["YYYYYY", 6, !0], 0, "year"),
                ce("Y", zt),
                ce("YY", Ze, Ue),
                ce("YYYY", Pt, nn),
                ce("YYYYY", Nt, Yi),
                ce("YYYYYY", Nt, Yi),
                qe(["YYYYY", "YYYYYY"], ot),
                qe("YYYY", function(t, r) {
                    r[ot] = t.length === 2 ? L.parseTwoDigitYear(t) : Pe(t)
                }),
                qe("YY", function(t, r) {
                    r[ot] = L.parseTwoDigitYear(t)
                }),
                qe("Y", function(t, r) {
                    r[ot] = parseInt(t, 10)
                });
                function Vt(t) {
                    return ji(t) ? 366 : 365
                }
                L.parseTwoDigitYear = function(t) {
                    return Pe(t) + (Pe(t) > 68 ? 1900 : 2e3)
                }
                ;
                var Hi = Zt("FullYear", !0);
                function Bi() {
                    return ji(this.year())
                }
                function Zt(t, r) {
                    return function(f) {
                        return f != null ? (di(this, t, f),
                        L.updateOffset(this, r),
                        this) : Di(this, t)
                    }
                }
                function Di(t, r) {
                    if (!t.isValid())
                        return NaN;
                    var f = t._d
                      , v = t._isUTC;
                    switch (r) {
                    case "Milliseconds":
                        return v ? f.getUTCMilliseconds() : f.getMilliseconds();
                    case "Seconds":
                        return v ? f.getUTCSeconds() : f.getSeconds();
                    case "Minutes":
                        return v ? f.getUTCMinutes() : f.getMinutes();
                    case "Hours":
                        return v ? f.getUTCHours() : f.getHours();
                    case "Date":
                        return v ? f.getUTCDate() : f.getDate();
                    case "Day":
                        return v ? f.getUTCDay() : f.getDay();
                    case "Month":
                        return v ? f.getUTCMonth() : f.getMonth();
                    case "FullYear":
                        return v ? f.getUTCFullYear() : f.getFullYear();
                    default:
                        return NaN
                    }
                }
                function di(t, r, f) {
                    var v, T, j, K, me;
                    if (!(!t.isValid() || isNaN(f))) {
                        switch (v = t._d,
                        T = t._isUTC,
                        r) {
                        case "Milliseconds":
                            return void (T ? v.setUTCMilliseconds(f) : v.setMilliseconds(f));
                        case "Seconds":
                            return void (T ? v.setUTCSeconds(f) : v.setSeconds(f));
                        case "Minutes":
                            return void (T ? v.setUTCMinutes(f) : v.setMinutes(f));
                        case "Hours":
                            return void (T ? v.setUTCHours(f) : v.setHours(f));
                        case "Date":
                            return void (T ? v.setUTCDate(f) : v.setDate(f));
                        case "FullYear":
                            break;
                        default:
                            return
                        }
                        j = f,
                        K = t.month(),
                        me = t.date(),
                        me = me === 29 && K === 1 && !ji(j) ? 28 : me,
                        T ? v.setUTCFullYear(j, K, me) : v.setFullYear(j, K, me)
                    }
                }
                function Cn(t) {
                    return t = Oe(t),
                    y(this[t]) ? this[t]() : this
                }
                function En(t, r) {
                    if (typeof t == "object") {
                        t = Ye(t);
                        var f = Ve(t), v, T = f.length;
                        for (v = 0; v < T; v++)
                            this[f[v].unit](t[f[v].unit])
                    } else if (t = Oe(t),
                    y(this[t]))
                        return this[t](r);
                    return this
                }
                function kn(t, r) {
                    return (t % r + r) % r
                }
                var Ke;
                Array.prototype.indexOf ? Ke = Array.prototype.indexOf : Ke = function(t) {
                    var r;
                    for (r = 0; r < this.length; ++r)
                        if (this[r] === t)
                            return r;
                    return -1
                }
                ;
                function an(t, r) {
                    if (isNaN(t) || isNaN(r))
                        return NaN;
                    var f = kn(r, 12);
                    return t += (r - f) / 12,
                    f === 1 ? ji(t) ? 29 : 28 : 31 - f % 7 % 2
                }
                re("M", ["MM", 2], "Mo", function() {
                    return this.month() + 1
                }),
                re("MMM", 0, 0, function(t) {
                    return this.localeData().monthsShort(this, t)
                }),
                re("MMMM", 0, 0, function(t) {
                    return this.localeData().months(this, t)
                }),
                ce("M", Ze, Tt),
                ce("MM", Ze, Ue),
                ce("MMM", function(t, r) {
                    return r.monthsShortRegex(t)
                }),
                ce("MMMM", function(t, r) {
                    return r.monthsRegex(t)
                }),
                qe(["M", "MM"], function(t, r) {
                    r[Ft] = Pe(t) - 1
                }),
                qe(["MMM", "MMMM"], function(t, r, f, v) {
                    var T = f._locale.monthsParse(t, v, f._strict);
                    T != null ? r[Ft] = T : U(f).invalidMonth = t
                });
                var on = "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
                  , Sn = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
                  , An = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/
                  , Tn = At
                  , Ln = At;
                function ln(t, r) {
                    return t ? n(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || An).test(r) ? "format" : "standalone"][t.month()] : n(this._months) ? this._months : this._months.standalone
                }
                function Mn(t, r) {
                    return t ? n(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[An.test(r) ? "format" : "standalone"][t.month()] : n(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
                }
                function ft(t, r, f) {
                    var v, T, j, K = t.toLocaleLowerCase();
                    if (!this._monthsParse)
                        for (this._monthsParse = [],
                        this._longMonthsParse = [],
                        this._shortMonthsParse = [],
                        v = 0; v < 12; ++v)
                            j = N([2e3, v]),
                            this._shortMonthsParse[v] = this.monthsShort(j, "").toLocaleLowerCase(),
                            this._longMonthsParse[v] = this.months(j, "").toLocaleLowerCase();
                    return f ? r === "MMM" ? (T = Ke.call(this._shortMonthsParse, K),
                    T !== -1 ? T : null) : (T = Ke.call(this._longMonthsParse, K),
                    T !== -1 ? T : null) : r === "MMM" ? (T = Ke.call(this._shortMonthsParse, K),
                    T !== -1 ? T : (T = Ke.call(this._longMonthsParse, K),
                    T !== -1 ? T : null)) : (T = Ke.call(this._longMonthsParse, K),
                    T !== -1 ? T : (T = Ke.call(this._shortMonthsParse, K),
                    T !== -1 ? T : null))
                }
                function hi(t, r, f) {
                    var v, T, j;
                    if (this._monthsParseExact)
                        return ft.call(this, t, r, f);
                    for (this._monthsParse || (this._monthsParse = [],
                    this._longMonthsParse = [],
                    this._shortMonthsParse = []),
                    v = 0; v < 12; v++) {
                        if (T = N([2e3, v]),
                        f && !this._longMonthsParse[v] && (this._longMonthsParse[v] = new RegExp("^" + this.months(T, "").replace(".", "") + "$","i"),
                        this._shortMonthsParse[v] = new RegExp("^" + this.monthsShort(T, "").replace(".", "") + "$","i")),
                        !f && !this._monthsParse[v] && (j = "^" + this.months(T, "") + "|^" + this.monthsShort(T, ""),
                        this._monthsParse[v] = new RegExp(j.replace(".", ""),"i")),
                        f && r === "MMMM" && this._longMonthsParse[v].test(t))
                            return v;
                        if (f && r === "MMM" && this._shortMonthsParse[v].test(t))
                            return v;
                        if (!f && this._monthsParse[v].test(t))
                            return v
                    }
                }
                function Ci(t, r) {
                    if (!t.isValid())
                        return t;
                    if (typeof r == "string") {
                        if (/^\d+$/.test(r))
                            r = Pe(r);
                        else if (r = t.localeData().monthsParse(r),
                        !a(r))
                            return t
                    }
                    var f = r
                      , v = t.date();
                    return v = v < 29 ? v : Math.min(v, an(t.year(), f)),
                    t._isUTC ? t._d.setUTCMonth(f, v) : t._d.setMonth(f, v),
                    t
                }
                function On(t) {
                    return t != null ? (Ci(this, t),
                    L.updateOffset(this, !0),
                    this) : Di(this, "Month")
                }
                function or() {
                    return an(this.year(), this.month())
                }
                function un(t) {
                    return this._monthsParseExact ? (l(this, "_monthsRegex") || Ei.call(this),
                    t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (l(this, "_monthsShortRegex") || (this._monthsShortRegex = Tn),
                    this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
                }
                function $n(t) {
                    return this._monthsParseExact ? (l(this, "_monthsRegex") || Ei.call(this),
                    t ? this._monthsStrictRegex : this._monthsRegex) : (l(this, "_monthsRegex") || (this._monthsRegex = Ln),
                    this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
                }
                function Ei() {
                    function t(Ae, He) {
                        return He.length - Ae.length
                    }
                    var r = [], f = [], v = [], T, j, K, me;
                    for (T = 0; T < 12; T++)
                        j = N([2e3, T]),
                        K = It(this.monthsShort(j, "")),
                        me = It(this.months(j, "")),
                        r.push(K),
                        f.push(me),
                        v.push(me),
                        v.push(K);
                    r.sort(t),
                    f.sort(t),
                    v.sort(t),
                    this._monthsRegex = new RegExp("^(" + v.join("|") + ")","i"),
                    this._monthsShortRegex = this._monthsRegex,
                    this._monthsStrictRegex = new RegExp("^(" + f.join("|") + ")","i"),
                    this._monthsShortStrictRegex = new RegExp("^(" + r.join("|") + ")","i")
                }
                function Pn(t, r, f, v, T, j, K) {
                    var me;
                    return t < 100 && t >= 0 ? (me = new Date(t + 400,r,f,v,T,j,K),
                    isFinite(me.getFullYear()) && me.setFullYear(t)) : me = new Date(t,r,f,v,T,j,K),
                    me
                }
                function ki(t) {
                    var r, f;
                    return t < 100 && t >= 0 ? (f = Array.prototype.slice.call(arguments),
                    f[0] = t + 400,
                    r = new Date(Date.UTC.apply(null, f)),
                    isFinite(r.getUTCFullYear()) && r.setUTCFullYear(t)) : r = new Date(Date.UTC.apply(null, arguments)),
                    r
                }
                function Wi(t, r, f) {
                    var v = 7 + r - f
                      , T = (7 + ki(t, 0, v).getUTCDay() - r) % 7;
                    return -T + v - 1
                }
                function _t(t, r, f, v, T) {
                    var j = (7 + f - v) % 7, K = Wi(t, v, T), me = 1 + 7 * (r - 1) + j + K, Ae, He;
                    return me <= 0 ? (Ae = t - 1,
                    He = Vt(Ae) + me) : me > Vt(t) ? (Ae = t + 1,
                    He = me - Vt(t)) : (Ae = t,
                    He = me),
                    {
                        year: Ae,
                        dayOfYear: He
                    }
                }
                function fi(t, r, f) {
                    var v = Wi(t.year(), r, f), T = Math.floor((t.dayOfYear() - v - 1) / 7) + 1, j, K;
                    return T < 1 ? (K = t.year() - 1,
                    j = T + mt(K, r, f)) : T > mt(t.year(), r, f) ? (j = T - mt(t.year(), r, f),
                    K = t.year() + 1) : (K = t.year(),
                    j = T),
                    {
                        week: j,
                        year: K
                    }
                }
                function mt(t, r, f) {
                    var v = Wi(t, r, f)
                      , T = Wi(t + 1, r, f);
                    return (Vt(t) - v + T) / 7
                }
                re("w", ["ww", 2], "wo", "week"),
                re("W", ["WW", 2], "Wo", "isoWeek"),
                ce("w", Ze, Tt),
                ce("ww", Ze, Ue),
                ce("W", Ze, Tt),
                ce("WW", Ze, Ue),
                Ut(["w", "ww", "W", "WW"], function(t, r, f, v) {
                    r[v.substr(0, 1)] = Pe(t)
                });
                function lr(t) {
                    return fi(t, this._week.dow, this._week.doy).week
                }
                var ur = {
                    dow: 0,
                    doy: 6
                };
                function Qt() {
                    return this._week.dow
                }
                function Jt() {
                    return this._week.doy
                }
                function cn(t) {
                    var r = this.localeData().week(this);
                    return t == null ? r : this.add((t - r) * 7, "d")
                }
                function cr(t) {
                    var r = fi(this, 1, 4).week;
                    return t == null ? r : this.add((t - r) * 7, "d")
                }
                re("d", 0, "do", "day"),
                re("dd", 0, 0, function(t) {
                    return this.localeData().weekdaysMin(this, t)
                }),
                re("ddd", 0, 0, function(t) {
                    return this.localeData().weekdaysShort(this, t)
                }),
                re("dddd", 0, 0, function(t) {
                    return this.localeData().weekdays(this, t)
                }),
                re("e", 0, 0, "weekday"),
                re("E", 0, 0, "isoWeekday"),
                ce("d", Ze),
                ce("e", Ze),
                ce("E", Ze),
                ce("dd", function(t, r) {
                    return r.weekdaysMinRegex(t)
                }),
                ce("ddd", function(t, r) {
                    return r.weekdaysShortRegex(t)
                }),
                ce("dddd", function(t, r) {
                    return r.weekdaysRegex(t)
                }),
                Ut(["dd", "ddd", "dddd"], function(t, r, f, v) {
                    var T = f._locale.weekdaysParse(t, v, f._strict);
                    T != null ? r.d = T : U(f).invalidWeekday = t
                }),
                Ut(["d", "e", "E"], function(t, r, f, v) {
                    r[v] = Pe(t)
                });
                function Si(t, r) {
                    return typeof t != "string" ? t : isNaN(t) ? (t = r.weekdaysParse(t),
                    typeof t == "number" ? t : null) : parseInt(t, 10)
                }
                function Nn(t, r) {
                    return typeof t == "string" ? r.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t
                }
                function Ai(t, r) {
                    return t.slice(r, 7).concat(t.slice(0, r))
                }
                var In = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
                  , dn = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
                  , dr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_")
                  , Fn = At
                  , hr = At
                  , fr = At;
                function hn(t, r) {
                    var f = n(this._weekdays) ? this._weekdays : this._weekdays[t && t !== !0 && this._weekdays.isFormat.test(r) ? "format" : "standalone"];
                    return t === !0 ? Ai(f, this._week.dow) : t ? f[t.day()] : f
                }
                function pr(t) {
                    return t === !0 ? Ai(this._weekdaysShort, this._week.dow) : t ? this._weekdaysShort[t.day()] : this._weekdaysShort
                }
                function gr(t) {
                    return t === !0 ? Ai(this._weekdaysMin, this._week.dow) : t ? this._weekdaysMin[t.day()] : this._weekdaysMin
                }
                function mr(t, r, f) {
                    var v, T, j, K = t.toLocaleLowerCase();
                    if (!this._weekdaysParse)
                        for (this._weekdaysParse = [],
                        this._shortWeekdaysParse = [],
                        this._minWeekdaysParse = [],
                        v = 0; v < 7; ++v)
                            j = N([2e3, 1]).day(v),
                            this._minWeekdaysParse[v] = this.weekdaysMin(j, "").toLocaleLowerCase(),
                            this._shortWeekdaysParse[v] = this.weekdaysShort(j, "").toLocaleLowerCase(),
                            this._weekdaysParse[v] = this.weekdays(j, "").toLocaleLowerCase();
                    return f ? r === "dddd" ? (T = Ke.call(this._weekdaysParse, K),
                    T !== -1 ? T : null) : r === "ddd" ? (T = Ke.call(this._shortWeekdaysParse, K),
                    T !== -1 ? T : null) : (T = Ke.call(this._minWeekdaysParse, K),
                    T !== -1 ? T : null) : r === "dddd" ? (T = Ke.call(this._weekdaysParse, K),
                    T !== -1 || (T = Ke.call(this._shortWeekdaysParse, K),
                    T !== -1) ? T : (T = Ke.call(this._minWeekdaysParse, K),
                    T !== -1 ? T : null)) : r === "ddd" ? (T = Ke.call(this._shortWeekdaysParse, K),
                    T !== -1 || (T = Ke.call(this._weekdaysParse, K),
                    T !== -1) ? T : (T = Ke.call(this._minWeekdaysParse, K),
                    T !== -1 ? T : null)) : (T = Ke.call(this._minWeekdaysParse, K),
                    T !== -1 || (T = Ke.call(this._weekdaysParse, K),
                    T !== -1) ? T : (T = Ke.call(this._shortWeekdaysParse, K),
                    T !== -1 ? T : null))
                }
                function vr(t, r, f) {
                    var v, T, j;
                    if (this._weekdaysParseExact)
                        return mr.call(this, t, r, f);
                    for (this._weekdaysParse || (this._weekdaysParse = [],
                    this._minWeekdaysParse = [],
                    this._shortWeekdaysParse = [],
                    this._fullWeekdaysParse = []),
                    v = 0; v < 7; v++) {
                        if (T = N([2e3, 1]).day(v),
                        f && !this._fullWeekdaysParse[v] && (this._fullWeekdaysParse[v] = new RegExp("^" + this.weekdays(T, "").replace(".", "\\.?") + "$","i"),
                        this._shortWeekdaysParse[v] = new RegExp("^" + this.weekdaysShort(T, "").replace(".", "\\.?") + "$","i"),
                        this._minWeekdaysParse[v] = new RegExp("^" + this.weekdaysMin(T, "").replace(".", "\\.?") + "$","i")),
                        this._weekdaysParse[v] || (j = "^" + this.weekdays(T, "") + "|^" + this.weekdaysShort(T, "") + "|^" + this.weekdaysMin(T, ""),
                        this._weekdaysParse[v] = new RegExp(j.replace(".", ""),"i")),
                        f && r === "dddd" && this._fullWeekdaysParse[v].test(t))
                            return v;
                        if (f && r === "ddd" && this._shortWeekdaysParse[v].test(t))
                            return v;
                        if (f && r === "dd" && this._minWeekdaysParse[v].test(t))
                            return v;
                        if (!f && this._weekdaysParse[v].test(t))
                            return v
                    }
                }
                function yr(t) {
                    if (!this.isValid())
                        return t != null ? this : NaN;
                    var r = Di(this, "Day");
                    return t != null ? (t = Si(t, this.localeData()),
                    this.add(t - r, "d")) : r
                }
                function _r(t) {
                    if (!this.isValid())
                        return t != null ? this : NaN;
                    var r = (this.day() + 7 - this.localeData()._week.dow) % 7;
                    return t == null ? r : this.add(t - r, "d")
                }
                function br(t) {
                    if (!this.isValid())
                        return t != null ? this : NaN;
                    if (t != null) {
                        var r = Nn(t, this.localeData());
                        return this.day(this.day() % 7 ? r : r - 7)
                    } else
                        return this.day() || 7
                }
                function Yn(t) {
                    return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ti.call(this),
                    t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (l(this, "_weekdaysRegex") || (this._weekdaysRegex = Fn),
                    this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
                }
                function fn(t) {
                    return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ti.call(this),
                    t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (l(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = hr),
                    this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
                }
                function Rn(t) {
                    return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Ti.call(this),
                    t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (l(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = fr),
                    this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
                }
                function Ti() {
                    function t(vt, si) {
                        return si.length - vt.length
                    }
                    var r = [], f = [], v = [], T = [], j, K, me, Ae, He;
                    for (j = 0; j < 7; j++)
                        K = N([2e3, 1]).day(j),
                        me = It(this.weekdaysMin(K, "")),
                        Ae = It(this.weekdaysShort(K, "")),
                        He = It(this.weekdays(K, "")),
                        r.push(me),
                        f.push(Ae),
                        v.push(He),
                        T.push(me),
                        T.push(Ae),
                        T.push(He);
                    r.sort(t),
                    f.sort(t),
                    v.sort(t),
                    T.sort(t),
                    this._weekdaysRegex = new RegExp("^(" + T.join("|") + ")","i"),
                    this._weekdaysShortRegex = this._weekdaysRegex,
                    this._weekdaysMinRegex = this._weekdaysRegex,
                    this._weekdaysStrictRegex = new RegExp("^(" + v.join("|") + ")","i"),
                    this._weekdaysShortStrictRegex = new RegExp("^(" + f.join("|") + ")","i"),
                    this._weekdaysMinStrictRegex = new RegExp("^(" + r.join("|") + ")","i")
                }
                function zi() {
                    return this.hours() % 12 || 12
                }
                function qn() {
                    return this.hours() || 24
                }
                re("H", ["HH", 2], 0, "hour"),
                re("h", ["hh", 2], 0, zi),
                re("k", ["kk", 2], 0, qn),
                re("hmm", 0, 0, function() {
                    return "" + zi.apply(this) + ge(this.minutes(), 2)
                }),
                re("hmmss", 0, 0, function() {
                    return "" + zi.apply(this) + ge(this.minutes(), 2) + ge(this.seconds(), 2)
                }),
                re("Hmm", 0, 0, function() {
                    return "" + this.hours() + ge(this.minutes(), 2)
                }),
                re("Hmmss", 0, 0, function() {
                    return "" + this.hours() + ge(this.minutes(), 2) + ge(this.seconds(), 2)
                });
                function Ui(t, r) {
                    re(t, 0, 0, function() {
                        return this.localeData().meridiem(this.hours(), this.minutes(), r)
                    })
                }
                Ui("a", !0),
                Ui("A", !1);
                function jn(t, r) {
                    return r._meridiemParse
                }
                ce("a", jn),
                ce("A", jn),
                ce("H", Ze, Ri),
                ce("h", Ze, Tt),
                ce("k", Ze, Tt),
                ce("HH", Ze, Ue),
                ce("hh", Ze, Ue),
                ce("kk", Ze, Ue),
                ce("hmm", rn),
                ce("hmmss", li),
                ce("Hmm", rn),
                ce("Hmmss", li),
                qe(["H", "HH"], tt),
                qe(["k", "kk"], function(t, r, f) {
                    var v = Pe(t);
                    r[tt] = v === 24 ? 0 : v
                }),
                qe(["a", "A"], function(t, r, f) {
                    f._isPm = f._locale.isPM(t),
                    f._meridiem = t
                }),
                qe(["h", "hh"], function(t, r, f) {
                    r[tt] = Pe(t),
                    U(f).bigHour = !0
                }),
                qe("hmm", function(t, r, f) {
                    var v = t.length - 2;
                    r[tt] = Pe(t.substr(0, v)),
                    r[Ct] = Pe(t.substr(v)),
                    U(f).bigHour = !0
                }),
                qe("hmmss", function(t, r, f) {
                    var v = t.length - 4
                      , T = t.length - 2;
                    r[tt] = Pe(t.substr(0, v)),
                    r[Ct] = Pe(t.substr(v, 2)),
                    r[Lt] = Pe(t.substr(T)),
                    U(f).bigHour = !0
                }),
                qe("Hmm", function(t, r, f) {
                    var v = t.length - 2;
                    r[tt] = Pe(t.substr(0, v)),
                    r[Ct] = Pe(t.substr(v))
                }),
                qe("Hmmss", function(t, r, f) {
                    var v = t.length - 4
                      , T = t.length - 2;
                    r[tt] = Pe(t.substr(0, v)),
                    r[Ct] = Pe(t.substr(v, 2)),
                    r[Lt] = Pe(t.substr(T))
                });
                function wr(t) {
                    return (t + "").toLowerCase().charAt(0) === "p"
                }
                var xr = /[ap]\.?m?\.?/i
                  , Li = Zt("Hours", !0);
                function Hn(t, r, f) {
                    return t > 11 ? f ? "pm" : "PM" : f ? "am" : "AM"
                }
                var Gi = {
                    calendar: se,
                    longDateFormat: dt,
                    invalidDate: qt,
                    ordinal: Fi,
                    dayOfMonthOrdinalParse: tn,
                    relativeTime: bi,
                    months: on,
                    monthsShort: Sn,
                    week: ur,
                    weekdays: In,
                    weekdaysMin: dr,
                    weekdaysShort: dn,
                    meridiemParse: xr
                }, Je = {}, Mi = {}, Oi;
                function e(t, r) {
                    var f, v = Math.min(t.length, r.length);
                    for (f = 0; f < v; f += 1)
                        if (t[f] !== r[f])
                            return f;
                    return v
                }
                function i(t) {
                    return t && t.toLowerCase().replace("_", "-")
                }
                function u(t) {
                    for (var r = 0, f, v, T, j; r < t.length; ) {
                        for (j = i(t[r]).split("-"),
                        f = j.length,
                        v = i(t[r + 1]),
                        v = v ? v.split("-") : null; f > 0; ) {
                            if (T = b(j.slice(0, f).join("-")),
                            T)
                                return T;
                            if (v && v.length >= f && e(j, v) >= f - 1)
                                break;
                            f--
                        }
                        r++
                    }
                    return Oi
                }
                function h(t) {
                    return !!(t && t.match("^[^/\\\\]*$"))
                }
                function b(t) {
                    var r = null, f;
                    if (Je[t] === void 0 && p && p.exports && h(t))
                        try {
                            r = Oi._abbr,
                            f = to,
                            f("./locale/" + t),
                            w(r)
                        } catch {
                            Je[t] = null
                        }
                    return Je[t]
                }
                function w(t, r) {
                    var f;
                    return t && (d(r) ? f = I(t) : f = k(t, r),
                    f ? Oi = f : typeof console < "u" && console.warn && console.warn("Locale " + t + " not found. Did you forget to load it?")),
                    Oi._abbr
                }
                function k(t, r) {
                    if (r !== null) {
                        var f, v = Gi;
                        if (r.abbr = t,
                        Je[t] != null)
                            g("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),
                            v = Je[t]._config;
                        else if (r.parentLocale != null)
                            if (Je[r.parentLocale] != null)
                                v = Je[r.parentLocale]._config;
                            else if (f = b(r.parentLocale),
                            f != null)
                                v = f._config;
                            else
                                return Mi[r.parentLocale] || (Mi[r.parentLocale] = []),
                                Mi[r.parentLocale].push({
                                    name: t,
                                    config: r
                                }),
                                null;
                        return Je[t] = new q(Y(v, r)),
                        Mi[t] && Mi[t].forEach(function(T) {
                            k(T.name, T.config)
                        }),
                        w(t),
                        Je[t]
                    } else
                        return delete Je[t],
                        null
                }
                function R(t, r) {
                    if (r != null) {
                        var f, v, T = Gi;
                        Je[t] != null && Je[t].parentLocale != null ? Je[t].set(Y(Je[t]._config, r)) : (v = b(t),
                        v != null && (T = v._config),
                        r = Y(T, r),
                        v == null && (r.abbr = t),
                        f = new q(r),
                        f.parentLocale = Je[t],
                        Je[t] = f),
                        w(t)
                    } else
                        Je[t] != null && (Je[t].parentLocale != null ? (Je[t] = Je[t].parentLocale,
                        t === w() && w(t)) : Je[t] != null && delete Je[t]);
                    return Je[t]
                }
                function I(t) {
                    var r;
                    if (t && t._locale && t._locale._abbr && (t = t._locale._abbr),
                    !t)
                        return Oi;
                    if (!n(t)) {
                        if (r = b(t),
                        r)
                            return r;
                        t = [t]
                    }
                    return u(t)
                }
                function B() {
                    return G(Je)
                }
                function J(t) {
                    var r, f = t._a;
                    return f && U(t).overflow === -2 && (r = f[Ft] < 0 || f[Ft] > 11 ? Ft : f[Dt] < 1 || f[Dt] > an(f[ot], f[Ft]) ? Dt : f[tt] < 0 || f[tt] > 24 || f[tt] === 24 && (f[Ct] !== 0 || f[Lt] !== 0 || f[Gt] !== 0) ? tt : f[Ct] < 0 || f[Ct] > 59 ? Ct : f[Lt] < 0 || f[Lt] > 59 ? Lt : f[Gt] < 0 || f[Gt] > 999 ? Gt : -1,
                    U(t)._overflowDayOfYear && (r < ot || r > Dt) && (r = Dt),
                    U(t)._overflowWeeks && r === -1 && (r = ci),
                    U(t)._overflowWeekday && r === -1 && (r = Dn),
                    U(t).overflow = r),
                    t
                }
                var te = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/
                  , Z = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/
                  , oe = /Z|[+-]\d\d(?::?\d\d)?/
                  , ke = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/], ["YYYYMM", /\d{6}/, !1], ["YYYY", /\d{4}/, !1]]
                  , Ie = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]]
                  , $e = /^\/?Date\((-?\d+)/i
                  , rt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/
                  , it = {
                    UT: 0,
                    GMT: 0,
                    EDT: -4 * 60,
                    EST: -5 * 60,
                    CDT: -5 * 60,
                    CST: -6 * 60,
                    MDT: -6 * 60,
                    MST: -7 * 60,
                    PDT: -7 * 60,
                    PST: -8 * 60
                };
                function Et(t) {
                    var r, f, v = t._i, T = te.exec(v) || Z.exec(v), j, K, me, Ae, He = ke.length, vt = Ie.length;
                    if (T) {
                        for (U(t).iso = !0,
                        r = 0,
                        f = He; r < f; r++)
                            if (ke[r][1].exec(T[1])) {
                                K = ke[r][0],
                                j = ke[r][2] !== !1;
                                break
                            }
                        if (K == null) {
                            t._isValid = !1;
                            return
                        }
                        if (T[3]) {
                            for (r = 0,
                            f = vt; r < f; r++)
                                if (Ie[r][1].exec(T[3])) {
                                    me = (T[2] || " ") + Ie[r][0];
                                    break
                                }
                            if (me == null) {
                                t._isValid = !1;
                                return
                            }
                        }
                        if (!j && me != null) {
                            t._isValid = !1;
                            return
                        }
                        if (T[4])
                            if (oe.exec(T[4]))
                                Ae = "Z";
                            else {
                                t._isValid = !1;
                                return
                            }
                        t._f = K + (me || "") + (Ae || ""),
                        Ot(t)
                    } else
                        t._isValid = !1
                }
                function Mt(t, r, f, v, T, j) {
                    var K = [Fe(t), Sn.indexOf(r), parseInt(f, 10), parseInt(v, 10), parseInt(T, 10)];
                    return j && K.push(parseInt(j, 10)),
                    K
                }
                function Fe(t) {
                    var r = parseInt(t, 10);
                    return r <= 49 ? 2e3 + r : r <= 999 ? 1900 + r : r
                }
                function Xt(t) {
                    return t.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                }
                function je(t, r, f) {
                    if (t) {
                        var v = dn.indexOf(t)
                          , T = new Date(r[0],r[1],r[2]).getDay();
                        if (v !== T)
                            return U(f).weekdayMismatch = !0,
                            f._isValid = !1,
                            !1
                    }
                    return !0
                }
                function et(t, r, f) {
                    if (t)
                        return it[t];
                    if (r)
                        return 0;
                    var v = parseInt(f, 10)
                      , T = v % 100
                      , j = (v - T) / 100;
                    return j * 60 + T
                }
                function pi(t) {
                    var r = rt.exec(Xt(t._i)), f;
                    if (r) {
                        if (f = Mt(r[4], r[3], r[2], r[5], r[6], r[7]),
                        !je(r[1], f, t))
                            return;
                        t._a = f,
                        t._tzm = et(r[8], r[9], r[10]),
                        t._d = ki.apply(null, t._a),
                        t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
                        U(t).rfc2822 = !0
                    } else
                        t._isValid = !1
                }
                function pn(t) {
                    var r = $e.exec(t._i);
                    if (r !== null) {
                        t._d = new Date(+r[1]);
                        return
                    }
                    if (Et(t),
                    t._isValid === !1)
                        delete t._isValid;
                    else
                        return;
                    if (pi(t),
                    t._isValid === !1)
                        delete t._isValid;
                    else
                        return;
                    t._strict ? t._isValid = !1 : L.createFromInputFallback(t)
                }
                L.createFromInputFallback = C("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(t) {
                    t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
                });
                function lt(t, r, f) {
                    return t ?? r ?? f
                }
                function $i(t) {
                    var r = new Date(L.now());
                    return t._useUTC ? [r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()] : [r.getFullYear(), r.getMonth(), r.getDate()]
                }
                function bt(t) {
                    var r, f, v = [], T, j, K;
                    if (!t._d) {
                        for (T = $i(t),
                        t._w && t._a[Dt] == null && t._a[Ft] == null && Ht(t),
                        t._dayOfYear != null && (K = lt(t._a[ot], T[ot]),
                        (t._dayOfYear > Vt(K) || t._dayOfYear === 0) && (U(t)._overflowDayOfYear = !0),
                        f = ki(K, 0, t._dayOfYear),
                        t._a[Ft] = f.getUTCMonth(),
                        t._a[Dt] = f.getUTCDate()),
                        r = 0; r < 3 && t._a[r] == null; ++r)
                            t._a[r] = v[r] = T[r];
                        for (; r < 7; r++)
                            t._a[r] = v[r] = t._a[r] == null ? r === 2 ? 1 : 0 : t._a[r];
                        t._a[tt] === 24 && t._a[Ct] === 0 && t._a[Lt] === 0 && t._a[Gt] === 0 && (t._nextDay = !0,
                        t._a[tt] = 0),
                        t._d = (t._useUTC ? ki : Pn).apply(null, v),
                        j = t._useUTC ? t._d.getUTCDay() : t._d.getDay(),
                        t._tzm != null && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
                        t._nextDay && (t._a[tt] = 24),
                        t._w && typeof t._w.d < "u" && t._w.d !== j && (U(t).weekdayMismatch = !0)
                    }
                }
                function Ht(t) {
                    var r, f, v, T, j, K, me, Ae, He;
                    r = t._w,
                    r.GG != null || r.W != null || r.E != null ? (j = 1,
                    K = 4,
                    f = lt(r.GG, t._a[ot], fi(De(), 1, 4).year),
                    v = lt(r.W, 1),
                    T = lt(r.E, 1),
                    (T < 1 || T > 7) && (Ae = !0)) : (j = t._locale._week.dow,
                    K = t._locale._week.doy,
                    He = fi(De(), j, K),
                    f = lt(r.gg, t._a[ot], He.year),
                    v = lt(r.w, He.week),
                    r.d != null ? (T = r.d,
                    (T < 0 || T > 6) && (Ae = !0)) : r.e != null ? (T = r.e + j,
                    (r.e < 0 || r.e > 6) && (Ae = !0)) : T = j),
                    v < 1 || v > mt(f, j, K) ? U(t)._overflowWeeks = !0 : Ae != null ? U(t)._overflowWeekday = !0 : (me = _t(f, v, T, j, K),
                    t._a[ot] = me.year,
                    t._dayOfYear = me.dayOfYear)
                }
                L.ISO_8601 = function() {}
                ,
                L.RFC_2822 = function() {}
                ;
                function Ot(t) {
                    if (t._f === L.ISO_8601) {
                        Et(t);
                        return
                    }
                    if (t._f === L.RFC_2822) {
                        pi(t);
                        return
                    }
                    t._a = [],
                    U(t).empty = !0;
                    var r = "" + t._i, f, v, T, j, K, me = r.length, Ae = 0, He, vt;
                    for (T = pt(t._f, t._locale).match(Te) || [],
                    vt = T.length,
                    f = 0; f < vt; f++)
                        j = T[f],
                        v = (r.match(ht(j, t)) || [])[0],
                        v && (K = r.substr(0, r.indexOf(v)),
                        K.length > 0 && U(t).unusedInput.push(K),
                        r = r.slice(r.indexOf(v) + v.length),
                        Ae += v.length),
                        Ee[j] ? (v ? U(t).empty = !1 : U(t).unusedTokens.push(j),
                        qi(j, v, t)) : t._strict && !v && U(t).unusedTokens.push(j);
                    U(t).charsLeftOver = me - Ae,
                    r.length > 0 && U(t).unusedInput.push(r),
                    t._a[tt] <= 12 && U(t).bigHour === !0 && t._a[tt] > 0 && (U(t).bigHour = void 0),
                    U(t).parsedDateParts = t._a.slice(0),
                    U(t).meridiem = t._meridiem,
                    t._a[tt] = wt(t._locale, t._a[tt], t._meridiem),
                    He = U(t).era,
                    He !== null && (t._a[ot] = t._locale.erasConvertYear(He, t._a[ot])),
                    bt(t),
                    J(t)
                }
                function wt(t, r, f) {
                    var v;
                    return f == null ? r : t.meridiemHour != null ? t.meridiemHour(r, f) : (t.isPM != null && (v = t.isPM(f),
                    v && r < 12 && (r += 12),
                    !v && r === 12 && (r = 0)),
                    r)
                }
                function gn(t) {
                    var r, f, v, T, j, K, me = !1, Ae = t._f.length;
                    if (Ae === 0) {
                        U(t).invalidFormat = !0,
                        t._d = new Date(NaN);
                        return
                    }
                    for (T = 0; T < Ae; T++)
                        j = 0,
                        K = !1,
                        r = ne({}, t),
                        t._useUTC != null && (r._useUTC = t._useUTC),
                        r._f = t._f[T],
                        Ot(r),
                        pe(r) && (K = !0),
                        j += U(r).charsLeftOver,
                        j += U(r).unusedTokens.length * 10,
                        U(r).score = j,
                        me ? j < v && (v = j,
                        f = r) : (v == null || j < v || K) && (v = j,
                        f = r,
                        K && (me = !0));
                    M(t, f || r)
                }
                function Yt(t) {
                    if (!t._d) {
                        var r = Ye(t._i)
                          , f = r.day === void 0 ? r.date : r.day;
                        t._a = _([r.year, r.month, f, r.hour, r.minute, r.second, r.millisecond], function(v) {
                            return v && parseInt(v, 10)
                        }),
                        bt(t)
                    }
                }
                function Rt(t) {
                    var r = new s(J(Bn(t)));
                    return r._nextDay && (r.add(1, "d"),
                    r._nextDay = void 0),
                    r
                }
                function Bn(t) {
                    var r = t._i
                      , f = t._f;
                    return t._locale = t._locale || I(t._l),
                    r === null || f === void 0 && r === "" ? fe({
                        nullInput: !0
                    }) : (typeof r == "string" && (t._i = r = t._locale.preparse(r)),
                    F(r) ? new s(J(r)) : (m(r) ? t._d = r : n(f) ? gn(t) : f ? Ot(t) : Dr(t),
                    pe(t) || (t._d = null),
                    t))
                }
                function Dr(t) {
                    var r = t._i;
                    d(r) ? t._d = new Date(L.now()) : m(r) ? t._d = new Date(r.valueOf()) : typeof r == "string" ? pn(t) : n(r) ? (t._a = _(r.slice(0), function(f) {
                        return parseInt(f, 10)
                    }),
                    bt(t)) : o(r) ? Yt(t) : a(r) ? t._d = new Date(r) : L.createFromInputFallback(t)
                }
                function Wn(t, r, f, v, T) {
                    var j = {};
                    return (r === !0 || r === !1) && (v = r,
                    r = void 0),
                    (f === !0 || f === !1) && (v = f,
                    f = void 0),
                    (o(t) && c(t) || n(t) && t.length === 0) && (t = void 0),
                    j._isAMomentObject = !0,
                    j._useUTC = j._isUTC = T,
                    j._l = f,
                    j._i = t,
                    j._f = r,
                    j._strict = v,
                    Rt(j)
                }
                function De(t, r, f, v) {
                    return Wn(t, r, f, v, !1)
                }
                var Vi = C("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                    var t = De.apply(null, arguments);
                    return this.isValid() && t.isValid() ? t < this ? this : t : fe()
                })
                  , kt = C("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                    var t = De.apply(null, arguments);
                    return this.isValid() && t.isValid() ? t > this ? this : t : fe()
                });
                function Kt(t, r) {
                    var f, v;
                    if (r.length === 1 && n(r[0]) && (r = r[0]),
                    !r.length)
                        return De();
                    for (f = r[0],
                    v = 1; v < r.length; ++v)
                        (!r[v].isValid() || r[v][t](f)) && (f = r[v]);
                    return f
                }
                function Cr() {
                    var t = [].slice.call(arguments, 0);
                    return Kt("isBefore", t)
                }
                function Er() {
                    var t = [].slice.call(arguments, 0);
                    return Kt("isAfter", t)
                }
                var zn = function() {
                    return Date.now ? Date.now() : +new Date
                }
                  , St = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
                function mn(t) {
                    var r, f = !1, v, T = St.length;
                    for (r in t)
                        if (l(t, r) && !(Ke.call(St, r) !== -1 && (t[r] == null || !isNaN(t[r]))))
                            return !1;
                    for (v = 0; v < T; ++v)
                        if (t[St[v]]) {
                            if (f)
                                return !1;
                            parseFloat(t[St[v]]) !== Pe(t[St[v]]) && (f = !0)
                        }
                    return !0
                }
                function Bt() {
                    return this._isValid
                }
                function Un() {
                    return xe(NaN)
                }
                function Wt(t) {
                    var r = Ye(t)
                      , f = r.year || 0
                      , v = r.quarter || 0
                      , T = r.month || 0
                      , j = r.week || r.isoWeek || 0
                      , K = r.day || 0
                      , me = r.hour || 0
                      , Ae = r.minute || 0
                      , He = r.second || 0
                      , vt = r.millisecond || 0;
                    this._isValid = mn(r),
                    this._milliseconds = +vt + He * 1e3 + Ae * 6e4 + me * 1e3 * 60 * 60,
                    this._days = +K + j * 7,
                    this._months = +T + v * 3 + f * 12,
                    this._data = {},
                    this._locale = I(),
                    this._bubble()
                }
                function ei(t) {
                    return t instanceof Wt
                }
                function gi(t) {
                    return t < 0 ? Math.round(-1 * t) * -1 : Math.round(t)
                }
                function vn(t, r, f) {
                    var v = Math.min(t.length, r.length), T = Math.abs(t.length - r.length), j = 0, K;
                    for (K = 0; K < v; K++)
                        Pe(t[K]) !== Pe(r[K]) && j++;
                    return j + T
                }
                function Gn(t, r) {
                    re(t, 0, 0, function() {
                        var f = this.utcOffset()
                          , v = "+";
                        return f < 0 && (f = -f,
                        v = "-"),
                        v + ge(~~(f / 60), 2) + r + ge(~~f % 60, 2)
                    })
                }
                Gn("Z", ":"),
                Gn("ZZ", ""),
                ce("Z", wi),
                ce("ZZ", wi),
                qe(["Z", "ZZ"], function(t, r, f) {
                    f._useUTC = !0,
                    f._tzm = Pi(wi, t)
                });
                var Zi = /([\+\-]|\d\d)/gi;
                function Pi(t, r) {
                    var f = (r || "").match(t), v, T, j;
                    return f === null ? null : (v = f[f.length - 1] || [],
                    T = (v + "").match(Zi) || ["-", 0, 0],
                    j = +(T[1] * 60) + Pe(T[2]),
                    j === 0 ? 0 : T[0] === "+" ? j : -j)
                }
                function Ni(t, r) {
                    var f, v;
                    return r._isUTC ? (f = r.clone(),
                    v = (F(t) || m(t) ? t.valueOf() : De(t).valueOf()) - f.valueOf(),
                    f._d.setTime(f._d.valueOf() + v),
                    L.updateOffset(f, !1),
                    f) : De(t).local()
                }
                function yn(t) {
                    return -Math.round(t._d.getTimezoneOffset())
                }
                L.updateOffset = function() {}
                ;
                function _n(t, r, f) {
                    var v = this._offset || 0, T;
                    if (!this.isValid())
                        return t != null ? this : NaN;
                    if (t != null) {
                        if (typeof t == "string") {
                            if (t = Pi(wi, t),
                            t === null)
                                return this
                        } else
                            Math.abs(t) < 16 && !f && (t = t * 60);
                        return !this._isUTC && r && (T = yn(this)),
                        this._offset = t,
                        this._isUTC = !0,
                        T != null && this.add(T, "m"),
                        v !== t && (!r || this._changeInProgress ? st(this, xe(t - v, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
                        L.updateOffset(this, !0),
                        this._changeInProgress = null)),
                        this
                    } else
                        return this._isUTC ? v : yn(this)
                }
                function Vn(t, r) {
                    return t != null ? (typeof t != "string" && (t = -t),
                    this.utcOffset(t, r),
                    this) : -this.utcOffset()
                }
                function P(t) {
                    return this.utcOffset(0, t)
                }
                function H(t) {
                    return this._isUTC && (this.utcOffset(0, t),
                    this._isUTC = !1,
                    t && this.subtract(yn(this), "m")),
                    this
                }
                function V() {
                    if (this._tzm != null)
                        this.utcOffset(this._tzm, !1, !0);
                    else if (typeof this._i == "string") {
                        var t = Pi(xn, this._i);
                        t != null ? this.utcOffset(t) : this.utcOffset(0, !0)
                    }
                    return this
                }
                function Q(t) {
                    return this.isValid() ? (t = t ? De(t).utcOffset() : 0,
                    (this.utcOffset() - t) % 60 === 0) : !1
                }
                function ee() {
                    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                }
                function ue() {
                    if (!d(this._isDSTShifted))
                        return this._isDSTShifted;
                    var t = {}, r;
                    return ne(t, this),
                    t = Bn(t),
                    t._a ? (r = t._isUTC ? N(t._a) : De(t._a),
                    this._isDSTShifted = this.isValid() && vn(t._a, r.toArray()) > 0) : this._isDSTShifted = !1,
                    this._isDSTShifted
                }
                function he() {
                    return this.isValid() ? !this._isUTC : !1
                }
                function _e() {
                    return this.isValid() ? this._isUTC : !1
                }
                function de() {
                    return this.isValid() ? this._isUTC && this._offset === 0 : !1
                }
                var Ne = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/
                  , Se = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
                function xe(t, r) {
                    var f = t, v = null, T, j, K;
                    return ei(t) ? f = {
                        ms: t._milliseconds,
                        d: t._days,
                        M: t._months
                    } : a(t) || !isNaN(+t) ? (f = {},
                    r ? f[r] = +t : f.milliseconds = +t) : (v = Ne.exec(t)) ? (T = v[1] === "-" ? -1 : 1,
                    f = {
                        y: 0,
                        d: Pe(v[Dt]) * T,
                        h: Pe(v[tt]) * T,
                        m: Pe(v[Ct]) * T,
                        s: Pe(v[Lt]) * T,
                        ms: Pe(gi(v[Gt] * 1e3)) * T
                    }) : (v = Se.exec(t)) ? (T = v[1] === "-" ? -1 : 1,
                    f = {
                        y: Le(v[2], T),
                        M: Le(v[3], T),
                        w: Le(v[4], T),
                        d: Le(v[5], T),
                        h: Le(v[6], T),
                        m: Le(v[7], T),
                        s: Le(v[8], T)
                    }) : f == null ? f = {} : typeof f == "object" && ("from"in f || "to"in f) && (K = Qe(De(f.from), De(f.to)),
                    f = {},
                    f.ms = K.milliseconds,
                    f.M = K.months),
                    j = new Wt(f),
                    ei(t) && l(t, "_locale") && (j._locale = t._locale),
                    ei(t) && l(t, "_isValid") && (j._isValid = t._isValid),
                    j
                }
                xe.fn = Wt.prototype,
                xe.invalid = Un;
                function Le(t, r) {
                    var f = t && parseFloat(t.replace(",", "."));
                    return (isNaN(f) ? 0 : f) * r
                }
                function Ce(t, r) {
                    var f = {};
                    return f.months = r.month() - t.month() + (r.year() - t.year()) * 12,
                    t.clone().add(f.months, "M").isAfter(r) && --f.months,
                    f.milliseconds = +r - +t.clone().add(f.months, "M"),
                    f
                }
                function Qe(t, r) {
                    var f;
                    return t.isValid() && r.isValid() ? (r = Ni(r, t),
                    t.isBefore(r) ? f = Ce(t, r) : (f = Ce(r, t),
                    f.milliseconds = -f.milliseconds,
                    f.months = -f.months),
                    f) : {
                        milliseconds: 0,
                        months: 0
                    }
                }
                function ut(t, r) {
                    return function(f, v) {
                        var T, j;
                        return v !== null && !isNaN(+v) && (g(r, "moment()." + r + "(period, number) is deprecated. Please use moment()." + r + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),
                        j = f,
                        f = v,
                        v = j),
                        T = xe(f, v),
                        st(this, T, t),
                        this
                    }
                }
                function st(t, r, f, v) {
                    var T = r._milliseconds
                      , j = gi(r._days)
                      , K = gi(r._months);
                    t.isValid() && (v = v ?? !0,
                    K && Ci(t, Di(t, "Month") + K * f),
                    j && di(t, "Date", Di(t, "Date") + j * f),
                    T && t._d.setTime(t._d.valueOf() + T * f),
                    v && L.updateOffset(t, j || K))
                }
                var xt = ut(1, "add")
                  , $t = ut(-1, "subtract");
                function ti(t) {
                    return typeof t == "string" || t instanceof String
                }
                function ct(t) {
                    return F(t) || m(t) || ti(t) || a(t) || ds(t) || cs(t) || t === null || t === void 0
                }
                function cs(t) {
                    var r = o(t) && !c(t), f = !1, v = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"], T, j, K = v.length;
                    for (T = 0; T < K; T += 1)
                        j = v[T],
                        f = f || l(t, j);
                    return r && f
                }
                function ds(t) {
                    var r = n(t)
                      , f = !1;
                    return r && (f = t.filter(function(v) {
                        return !a(v) && ti(t)
                    }).length === 0),
                    r && f
                }
                function hs(t) {
                    var r = o(t) && !c(t), f = !1, v = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"], T, j;
                    for (T = 0; T < v.length; T += 1)
                        j = v[T],
                        f = f || l(t, j);
                    return r && f
                }
                function fs(t, r) {
                    var f = t.diff(r, "days", !0);
                    return f < -6 ? "sameElse" : f < -1 ? "lastWeek" : f < 0 ? "lastDay" : f < 1 ? "sameDay" : f < 2 ? "nextDay" : f < 7 ? "nextWeek" : "sameElse"
                }
                function ps(t, r) {
                    arguments.length === 1 && (arguments[0] ? ct(arguments[0]) ? (t = arguments[0],
                    r = void 0) : hs(arguments[0]) && (r = arguments[0],
                    t = void 0) : (t = void 0,
                    r = void 0));
                    var f = t || De()
                      , v = Ni(f, this).startOf("day")
                      , T = L.calendarFormat(this, v) || "sameElse"
                      , j = r && (y(r[T]) ? r[T].call(this, f) : r[T]);
                    return this.format(j || this.localeData().calendar(T, this, De(f)))
                }
                function gs() {
                    return new s(this)
                }
                function ms(t, r) {
                    var f = F(t) ? t : De(t);
                    return this.isValid() && f.isValid() ? (r = Oe(r) || "millisecond",
                    r === "millisecond" ? this.valueOf() > f.valueOf() : f.valueOf() < this.clone().startOf(r).valueOf()) : !1
                }
                function vs(t, r) {
                    var f = F(t) ? t : De(t);
                    return this.isValid() && f.isValid() ? (r = Oe(r) || "millisecond",
                    r === "millisecond" ? this.valueOf() < f.valueOf() : this.clone().endOf(r).valueOf() < f.valueOf()) : !1
                }
                function ys(t, r, f, v) {
                    var T = F(t) ? t : De(t)
                      , j = F(r) ? r : De(r);
                    return this.isValid() && T.isValid() && j.isValid() ? (v = v || "()",
                    (v[0] === "(" ? this.isAfter(T, f) : !this.isBefore(T, f)) && (v[1] === ")" ? this.isBefore(j, f) : !this.isAfter(j, f))) : !1
                }
                function _s(t, r) {
                    var f = F(t) ? t : De(t), v;
                    return this.isValid() && f.isValid() ? (r = Oe(r) || "millisecond",
                    r === "millisecond" ? this.valueOf() === f.valueOf() : (v = f.valueOf(),
                    this.clone().startOf(r).valueOf() <= v && v <= this.clone().endOf(r).valueOf())) : !1
                }
                function bs(t, r) {
                    return this.isSame(t, r) || this.isAfter(t, r)
                }
                function ws(t, r) {
                    return this.isSame(t, r) || this.isBefore(t, r)
                }
                function xs(t, r, f) {
                    var v, T, j;
                    if (!this.isValid())
                        return NaN;
                    if (v = Ni(t, this),
                    !v.isValid())
                        return NaN;
                    switch (T = (v.utcOffset() - this.utcOffset()) * 6e4,
                    r = Oe(r),
                    r) {
                    case "year":
                        j = Zn(this, v) / 12;
                        break;
                    case "month":
                        j = Zn(this, v);
                        break;
                    case "quarter":
                        j = Zn(this, v) / 3;
                        break;
                    case "second":
                        j = (this - v) / 1e3;
                        break;
                    case "minute":
                        j = (this - v) / 6e4;
                        break;
                    case "hour":
                        j = (this - v) / 36e5;
                        break;
                    case "day":
                        j = (this - v - T) / 864e5;
                        break;
                    case "week":
                        j = (this - v - T) / 6048e5;
                        break;
                    default:
                        j = this - v
                    }
                    return f ? j : gt(j)
                }
                function Zn(t, r) {
                    if (t.date() < r.date())
                        return -Zn(r, t);
                    var f = (r.year() - t.year()) * 12 + (r.month() - t.month()), v = t.clone().add(f, "months"), T, j;
                    return r - v < 0 ? (T = t.clone().add(f - 1, "months"),
                    j = (r - v) / (v - T)) : (T = t.clone().add(f + 1, "months"),
                    j = (r - v) / (T - v)),
                    -(f + j) || 0
                }
                L.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
                L.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
                function Ds() {
                    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                }
                function Cs(t) {
                    if (!this.isValid())
                        return null;
                    var r = t !== !0
                      , f = r ? this.clone().utc() : this;
                    return f.year() < 0 || f.year() > 9999 ? at(f, r ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : y(Date.prototype.toISOString) ? r ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", at(f, "Z")) : at(f, r ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                }
                function Es() {
                    if (!this.isValid())
                        return "moment.invalid(/* " + this._i + " */)";
                    var t = "moment", r = "", f, v, T, j;
                    return this.isLocal() || (t = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone",
                    r = "Z"),
                    f = "[" + t + '("]',
                    v = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                    T = "-MM-DD[T]HH:mm:ss.SSS",
                    j = r + '[")]',
                    this.format(f + v + T + j)
                }
                function ks(t) {
                    t || (t = this.isUtc() ? L.defaultFormatUtc : L.defaultFormat);
                    var r = at(this, t);
                    return this.localeData().postformat(r)
                }
                function Ss(t, r) {
                    return this.isValid() && (F(t) && t.isValid() || De(t).isValid()) ? xe({
                        to: this,
                        from: t
                    }).locale(this.locale()).humanize(!r) : this.localeData().invalidDate()
                }
                function As(t) {
                    return this.from(De(), t)
                }
                function Ts(t, r) {
                    return this.isValid() && (F(t) && t.isValid() || De(t).isValid()) ? xe({
                        from: this,
                        to: t
                    }).locale(this.locale()).humanize(!r) : this.localeData().invalidDate()
                }
                function Ls(t) {
                    return this.to(De(), t)
                }
                function Ir(t) {
                    var r;
                    return t === void 0 ? this._locale._abbr : (r = I(t),
                    r != null && (this._locale = r),
                    this)
                }
                var Fr = C("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
                    return t === void 0 ? this.localeData() : this.locale(t)
                });
                function Yr() {
                    return this._locale
                }
                var Qn = 1e3
                  , Qi = 60 * Qn
                  , Jn = 60 * Qi
                  , Rr = (365 * 400 + 97) * 24 * Jn;
                function Ji(t, r) {
                    return (t % r + r) % r
                }
                function qr(t, r, f) {
                    return t < 100 && t >= 0 ? new Date(t + 400,r,f) - Rr : new Date(t,r,f).valueOf()
                }
                function jr(t, r, f) {
                    return t < 100 && t >= 0 ? Date.UTC(t + 400, r, f) - Rr : Date.UTC(t, r, f)
                }
                function Ms(t) {
                    var r, f;
                    if (t = Oe(t),
                    t === void 0 || t === "millisecond" || !this.isValid())
                        return this;
                    switch (f = this._isUTC ? jr : qr,
                    t) {
                    case "year":
                        r = f(this.year(), 0, 1);
                        break;
                    case "quarter":
                        r = f(this.year(), this.month() - this.month() % 3, 1);
                        break;
                    case "month":
                        r = f(this.year(), this.month(), 1);
                        break;
                    case "week":
                        r = f(this.year(), this.month(), this.date() - this.weekday());
                        break;
                    case "isoWeek":
                        r = f(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                        break;
                    case "day":
                    case "date":
                        r = f(this.year(), this.month(), this.date());
                        break;
                    case "hour":
                        r = this._d.valueOf(),
                        r -= Ji(r + (this._isUTC ? 0 : this.utcOffset() * Qi), Jn);
                        break;
                    case "minute":
                        r = this._d.valueOf(),
                        r -= Ji(r, Qi);
                        break;
                    case "second":
                        r = this._d.valueOf(),
                        r -= Ji(r, Qn);
                        break
                    }
                    return this._d.setTime(r),
                    L.updateOffset(this, !0),
                    this
                }
                function Os(t) {
                    var r, f;
                    if (t = Oe(t),
                    t === void 0 || t === "millisecond" || !this.isValid())
                        return this;
                    switch (f = this._isUTC ? jr : qr,
                    t) {
                    case "year":
                        r = f(this.year() + 1, 0, 1) - 1;
                        break;
                    case "quarter":
                        r = f(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                        break;
                    case "month":
                        r = f(this.year(), this.month() + 1, 1) - 1;
                        break;
                    case "week":
                        r = f(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                        break;
                    case "isoWeek":
                        r = f(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                        break;
                    case "day":
                    case "date":
                        r = f(this.year(), this.month(), this.date() + 1) - 1;
                        break;
                    case "hour":
                        r = this._d.valueOf(),
                        r += Jn - Ji(r + (this._isUTC ? 0 : this.utcOffset() * Qi), Jn) - 1;
                        break;
                    case "minute":
                        r = this._d.valueOf(),
                        r += Qi - Ji(r, Qi) - 1;
                        break;
                    case "second":
                        r = this._d.valueOf(),
                        r += Qn - Ji(r, Qn) - 1;
                        break
                    }
                    return this._d.setTime(r),
                    L.updateOffset(this, !0),
                    this
                }
                function $s() {
                    return this._d.valueOf() - (this._offset || 0) * 6e4
                }
                function Ps() {
                    return Math.floor(this.valueOf() / 1e3)
                }
                function Ns() {
                    return new Date(this.valueOf())
                }
                function Is() {
                    var t = this;
                    return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
                }
                function Fs() {
                    var t = this;
                    return {
                        years: t.year(),
                        months: t.month(),
                        date: t.date(),
                        hours: t.hours(),
                        minutes: t.minutes(),
                        seconds: t.seconds(),
                        milliseconds: t.milliseconds()
                    }
                }
                function Ys() {
                    return this.isValid() ? this.toISOString() : null
                }
                function Rs() {
                    return pe(this)
                }
                function qs() {
                    return M({}, U(this))
                }
                function js() {
                    return U(this).overflow
                }
                function Hs() {
                    return {
                        input: this._i,
                        format: this._f,
                        locale: this._locale,
                        isUTC: this._isUTC,
                        strict: this._strict
                    }
                }
                re("N", 0, 0, "eraAbbr"),
                re("NN", 0, 0, "eraAbbr"),
                re("NNN", 0, 0, "eraAbbr"),
                re("NNNN", 0, 0, "eraName"),
                re("NNNNN", 0, 0, "eraNarrow"),
                re("y", ["y", 1], "yo", "eraYear"),
                re("y", ["yy", 2], 0, "eraYear"),
                re("y", ["yyy", 3], 0, "eraYear"),
                re("y", ["yyyy", 4], 0, "eraYear"),
                ce("N", kr),
                ce("NN", kr),
                ce("NNN", kr),
                ce("NNNN", Ks),
                ce("NNNNN", ea),
                qe(["N", "NN", "NNN", "NNNN", "NNNNN"], function(t, r, f, v) {
                    var T = f._locale.erasParse(t, v, f._strict);
                    T ? U(f).era = T : U(f).invalidEra = t
                }),
                ce("y", ui),
                ce("yy", ui),
                ce("yyy", ui),
                ce("yyyy", ui),
                ce("yo", ta),
                qe(["y", "yy", "yyy", "yyyy"], ot),
                qe(["yo"], function(t, r, f, v) {
                    var T;
                    f._locale._eraYearOrdinalRegex && (T = t.match(f._locale._eraYearOrdinalRegex)),
                    f._locale.eraYearOrdinalParse ? r[ot] = f._locale.eraYearOrdinalParse(t, T) : r[ot] = parseInt(t, 10)
                });
                function Bs(t, r) {
                    var f, v, T, j = this._eras || I("en")._eras;
                    for (f = 0,
                    v = j.length; f < v; ++f) {
                        switch (typeof j[f].since) {
                        case "string":
                            T = L(j[f].since).startOf("day"),
                            j[f].since = T.valueOf();
                            break
                        }
                        switch (typeof j[f].until) {
                        case "undefined":
                            j[f].until = 1 / 0;
                            break;
                        case "string":
                            T = L(j[f].until).startOf("day").valueOf(),
                            j[f].until = T.valueOf();
                            break
                        }
                    }
                    return j
                }
                function Ws(t, r, f) {
                    var v, T, j = this.eras(), K, me, Ae;
                    for (t = t.toUpperCase(),
                    v = 0,
                    T = j.length; v < T; ++v)
                        if (K = j[v].name.toUpperCase(),
                        me = j[v].abbr.toUpperCase(),
                        Ae = j[v].narrow.toUpperCase(),
                        f)
                            switch (r) {
                            case "N":
                            case "NN":
                            case "NNN":
                                if (me === t)
                                    return j[v];
                                break;
                            case "NNNN":
                                if (K === t)
                                    return j[v];
                                break;
                            case "NNNNN":
                                if (Ae === t)
                                    return j[v];
                                break
                            }
                        else if ([K, me, Ae].indexOf(t) >= 0)
                            return j[v]
                }
                function zs(t, r) {
                    var f = t.since <= t.until ? 1 : -1;
                    return r === void 0 ? L(t.since).year() : L(t.since).year() + (r - t.offset) * f
                }
                function Us() {
                    var t, r, f, v = this.localeData().eras();
                    for (t = 0,
                    r = v.length; t < r; ++t)
                        if (f = this.clone().startOf("day").valueOf(),
                        v[t].since <= f && f <= v[t].until || v[t].until <= f && f <= v[t].since)
                            return v[t].name;
                    return ""
                }
                function Gs() {
                    var t, r, f, v = this.localeData().eras();
                    for (t = 0,
                    r = v.length; t < r; ++t)
                        if (f = this.clone().startOf("day").valueOf(),
                        v[t].since <= f && f <= v[t].until || v[t].until <= f && f <= v[t].since)
                            return v[t].narrow;
                    return ""
                }
                function Vs() {
                    var t, r, f, v = this.localeData().eras();
                    for (t = 0,
                    r = v.length; t < r; ++t)
                        if (f = this.clone().startOf("day").valueOf(),
                        v[t].since <= f && f <= v[t].until || v[t].until <= f && f <= v[t].since)
                            return v[t].abbr;
                    return ""
                }
                function Zs() {
                    var t, r, f, v, T = this.localeData().eras();
                    for (t = 0,
                    r = T.length; t < r; ++t)
                        if (f = T[t].since <= T[t].until ? 1 : -1,
                        v = this.clone().startOf("day").valueOf(),
                        T[t].since <= v && v <= T[t].until || T[t].until <= v && v <= T[t].since)
                            return (this.year() - L(T[t].since).year()) * f + T[t].offset;
                    return this.year()
                }
                function Qs(t) {
                    return l(this, "_erasNameRegex") || Sr.call(this),
                    t ? this._erasNameRegex : this._erasRegex
                }
                function Js(t) {
                    return l(this, "_erasAbbrRegex") || Sr.call(this),
                    t ? this._erasAbbrRegex : this._erasRegex
                }
                function Xs(t) {
                    return l(this, "_erasNarrowRegex") || Sr.call(this),
                    t ? this._erasNarrowRegex : this._erasRegex
                }
                function kr(t, r) {
                    return r.erasAbbrRegex(t)
                }
                function Ks(t, r) {
                    return r.erasNameRegex(t)
                }
                function ea(t, r) {
                    return r.erasNarrowRegex(t)
                }
                function ta(t, r) {
                    return r._eraYearOrdinalRegex || ui
                }
                function Sr() {
                    var t = [], r = [], f = [], v = [], T, j, K, me, Ae, He = this.eras();
                    for (T = 0,
                    j = He.length; T < j; ++T)
                        K = It(He[T].name),
                        me = It(He[T].abbr),
                        Ae = It(He[T].narrow),
                        r.push(K),
                        t.push(me),
                        f.push(Ae),
                        v.push(K),
                        v.push(me),
                        v.push(Ae);
                    this._erasRegex = new RegExp("^(" + v.join("|") + ")","i"),
                    this._erasNameRegex = new RegExp("^(" + r.join("|") + ")","i"),
                    this._erasAbbrRegex = new RegExp("^(" + t.join("|") + ")","i"),
                    this._erasNarrowRegex = new RegExp("^(" + f.join("|") + ")","i")
                }
                re(0, ["gg", 2], 0, function() {
                    return this.weekYear() % 100
                }),
                re(0, ["GG", 2], 0, function() {
                    return this.isoWeekYear() % 100
                });
                function Xn(t, r) {
                    re(0, [t, t.length], 0, r)
                }
                Xn("gggg", "weekYear"),
                Xn("ggggg", "weekYear"),
                Xn("GGGG", "isoWeekYear"),
                Xn("GGGGG", "isoWeekYear"),
                ce("G", zt),
                ce("g", zt),
                ce("GG", Ze, Ue),
                ce("gg", Ze, Ue),
                ce("GGGG", Pt, nn),
                ce("gggg", Pt, nn),
                ce("GGGGG", Nt, Yi),
                ce("ggggg", Nt, Yi),
                Ut(["gggg", "ggggg", "GGGG", "GGGGG"], function(t, r, f, v) {
                    r[v.substr(0, 2)] = Pe(t)
                }),
                Ut(["gg", "GG"], function(t, r, f, v) {
                    r[v] = L.parseTwoDigitYear(t)
                });
                function ia(t) {
                    return Hr.call(this, t, this.week(), this.weekday() + this.localeData()._week.dow, this.localeData()._week.dow, this.localeData()._week.doy)
                }
                function na(t) {
                    return Hr.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
                }
                function ra() {
                    return mt(this.year(), 1, 4)
                }
                function sa() {
                    return mt(this.isoWeekYear(), 1, 4)
                }
                function aa() {
                    var t = this.localeData()._week;
                    return mt(this.year(), t.dow, t.doy)
                }
                function oa() {
                    var t = this.localeData()._week;
                    return mt(this.weekYear(), t.dow, t.doy)
                }
                function Hr(t, r, f, v, T) {
                    var j;
                    return t == null ? fi(this, v, T).year : (j = mt(t, v, T),
                    r > j && (r = j),
                    la.call(this, t, r, f, v, T))
                }
                function la(t, r, f, v, T) {
                    var j = _t(t, r, f, v, T)
                      , K = ki(j.year, 0, j.dayOfYear);
                    return this.year(K.getUTCFullYear()),
                    this.month(K.getUTCMonth()),
                    this.date(K.getUTCDate()),
                    this
                }
                re("Q", 0, "Qo", "quarter"),
                ce("Q", ye),
                qe("Q", function(t, r) {
                    r[Ft] = (Pe(t) - 1) * 3
                });
                function ua(t) {
                    return t == null ? Math.ceil((this.month() + 1) / 3) : this.month((t - 1) * 3 + this.month() % 3)
                }
                re("D", ["DD", 2], "Do", "date"),
                ce("D", Ze, Tt),
                ce("DD", Ze, Ue),
                ce("Do", function(t, r) {
                    return t ? r._dayOfMonthOrdinalParse || r._ordinalParse : r._dayOfMonthOrdinalParseLenient
                }),
                qe(["D", "DD"], Dt),
                qe("Do", function(t, r) {
                    r[Dt] = Pe(t.match(Ze)[0])
                });
                var Br = Zt("Date", !0);
                re("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
                ce("DDD", yt),
                ce("DDDD", wn),
                qe(["DDD", "DDDD"], function(t, r, f) {
                    f._dayOfYear = Pe(t)
                });
                function ca(t) {
                    var r = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                    return t == null ? r : this.add(t - r, "d")
                }
                re("m", ["mm", 2], 0, "minute"),
                ce("m", Ze, Ri),
                ce("mm", Ze, Ue),
                qe(["m", "mm"], Ct);
                var da = Zt("Minutes", !1);
                re("s", ["ss", 2], 0, "second"),
                ce("s", Ze, Ri),
                ce("ss", Ze, Ue),
                qe(["s", "ss"], Lt);
                var ha = Zt("Seconds", !1);
                re("S", 0, 0, function() {
                    return ~~(this.millisecond() / 100)
                }),
                re(0, ["SS", 2], 0, function() {
                    return ~~(this.millisecond() / 10)
                }),
                re(0, ["SSS", 3], 0, "millisecond"),
                re(0, ["SSSS", 4], 0, function() {
                    return this.millisecond() * 10
                }),
                re(0, ["SSSSS", 5], 0, function() {
                    return this.millisecond() * 100
                }),
                re(0, ["SSSSSS", 6], 0, function() {
                    return this.millisecond() * 1e3
                }),
                re(0, ["SSSSSSS", 7], 0, function() {
                    return this.millisecond() * 1e4
                }),
                re(0, ["SSSSSSSS", 8], 0, function() {
                    return this.millisecond() * 1e5
                }),
                re(0, ["SSSSSSSSS", 9], 0, function() {
                    return this.millisecond() * 1e6
                }),
                ce("S", yt, ye),
                ce("SS", yt, Ue),
                ce("SSS", yt, wn);
                var mi, Wr;
                for (mi = "SSSS"; mi.length <= 9; mi += "S")
                    ce(mi, ui);
                function fa(t, r) {
                    r[Gt] = Pe(("0." + t) * 1e3)
                }
                for (mi = "S"; mi.length <= 9; mi += "S")
                    qe(mi, fa);
                Wr = Zt("Milliseconds", !1),
                re("z", 0, 0, "zoneAbbr"),
                re("zz", 0, 0, "zoneName");
                function pa() {
                    return this._isUTC ? "UTC" : ""
                }
                function ga() {
                    return this._isUTC ? "Coordinated Universal Time" : ""
                }
                var le = s.prototype;
                le.add = xt,
                le.calendar = ps,
                le.clone = gs,
                le.diff = xs,
                le.endOf = Os,
                le.format = ks,
                le.from = Ss,
                le.fromNow = As,
                le.to = Ts,
                le.toNow = Ls,
                le.get = Cn,
                le.invalidAt = js,
                le.isAfter = ms,
                le.isBefore = vs,
                le.isBetween = ys,
                le.isSame = _s,
                le.isSameOrAfter = bs,
                le.isSameOrBefore = ws,
                le.isValid = Rs,
                le.lang = Fr,
                le.locale = Ir,
                le.localeData = Yr,
                le.max = kt,
                le.min = Vi,
                le.parsingFlags = qs,
                le.set = En,
                le.startOf = Ms,
                le.subtract = $t,
                le.toArray = Is,
                le.toObject = Fs,
                le.toDate = Ns,
                le.toISOString = Cs,
                le.inspect = Es,
                typeof Symbol < "u" && Symbol.for != null && (le[Symbol.for("nodejs.util.inspect.custom")] = function() {
                    return "Moment<" + this.format() + ">"
                }
                ),
                le.toJSON = Ys,
                le.toString = Ds,
                le.unix = Ps,
                le.valueOf = $s,
                le.creationData = Hs,
                le.eraName = Us,
                le.eraNarrow = Gs,
                le.eraAbbr = Vs,
                le.eraYear = Zs,
                le.year = Hi,
                le.isLeapYear = Bi,
                le.weekYear = ia,
                le.isoWeekYear = na,
                le.quarter = le.quarters = ua,
                le.month = On,
                le.daysInMonth = or,
                le.week = le.weeks = cn,
                le.isoWeek = le.isoWeeks = cr,
                le.weeksInYear = aa,
                le.weeksInWeekYear = oa,
                le.isoWeeksInYear = ra,
                le.isoWeeksInISOWeekYear = sa,
                le.date = Br,
                le.day = le.days = yr,
                le.weekday = _r,
                le.isoWeekday = br,
                le.dayOfYear = ca,
                le.hour = le.hours = Li,
                le.minute = le.minutes = da,
                le.second = le.seconds = ha,
                le.millisecond = le.milliseconds = Wr,
                le.utcOffset = _n,
                le.utc = P,
                le.local = H,
                le.parseZone = V,
                le.hasAlignedHourOffset = Q,
                le.isDST = ee,
                le.isLocal = he,
                le.isUtcOffset = _e,
                le.isUtc = de,
                le.isUTC = de,
                le.zoneAbbr = pa,
                le.zoneName = ga,
                le.dates = C("dates accessor is deprecated. Use date instead.", Br),
                le.months = C("months accessor is deprecated. Use month instead", On),
                le.years = C("years accessor is deprecated. Use year instead", Hi),
                le.zone = C("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Vn),
                le.isDSTShifted = C("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", ue);
                function ma(t) {
                    return De(t * 1e3)
                }
                function va() {
                    return De.apply(null, arguments).parseZone()
                }
                function zr(t) {
                    return t
                }
                var ze = q.prototype;
                ze.calendar = ae,
                ze.longDateFormat = yi,
                ze.invalidDate = oi,
                ze.ordinal = _i,
                ze.preparse = zr,
                ze.postformat = zr,
                ze.relativeTime = nt,
                ze.pastFuture = ie,
                ze.set = S,
                ze.eras = Bs,
                ze.erasParse = Ws,
                ze.erasConvertYear = zs,
                ze.erasAbbrRegex = Js,
                ze.erasNameRegex = Qs,
                ze.erasNarrowRegex = Xs,
                ze.months = ln,
                ze.monthsShort = Mn,
                ze.monthsParse = hi,
                ze.monthsRegex = $n,
                ze.monthsShortRegex = un,
                ze.week = lr,
                ze.firstDayOfYear = Jt,
                ze.firstDayOfWeek = Qt,
                ze.weekdays = hn,
                ze.weekdaysMin = gr,
                ze.weekdaysShort = pr,
                ze.weekdaysParse = vr,
                ze.weekdaysRegex = Yn,
                ze.weekdaysShortRegex = fn,
                ze.weekdaysMinRegex = Rn,
                ze.isPM = wr,
                ze.meridiem = Hn;
                function Kn(t, r, f, v) {
                    var T = I()
                      , j = N().set(v, r);
                    return T[f](j, t)
                }
                function Ur(t, r, f) {
                    if (a(t) && (r = t,
                    t = void 0),
                    t = t || "",
                    r != null)
                        return Kn(t, r, f, "month");
                    var v, T = [];
                    for (v = 0; v < 12; v++)
                        T[v] = Kn(t, v, f, "month");
                    return T
                }
                function Ar(t, r, f, v) {
                    typeof t == "boolean" ? (a(r) && (f = r,
                    r = void 0),
                    r = r || "") : (r = t,
                    f = r,
                    t = !1,
                    a(r) && (f = r,
                    r = void 0),
                    r = r || "");
                    var T = I(), j = t ? T._week.dow : 0, K, me = [];
                    if (f != null)
                        return Kn(r, (f + j) % 7, v, "day");
                    for (K = 0; K < 7; K++)
                        me[K] = Kn(r, (K + j) % 7, v, "day");
                    return me
                }
                function ya(t, r) {
                    return Ur(t, r, "months")
                }
                function _a(t, r) {
                    return Ur(t, r, "monthsShort")
                }
                function ba(t, r, f) {
                    return Ar(t, r, f, "weekdays")
                }
                function wa(t, r, f) {
                    return Ar(t, r, f, "weekdaysShort")
                }
                function xa(t, r, f) {
                    return Ar(t, r, f, "weekdaysMin")
                }
                w("en", {
                    eras: [{
                        since: "0001-01-01",
                        until: 1 / 0,
                        offset: 1,
                        name: "Anno Domini",
                        narrow: "AD",
                        abbr: "AD"
                    }, {
                        since: "0000-12-31",
                        until: -1 / 0,
                        offset: 1,
                        name: "Before Christ",
                        narrow: "BC",
                        abbr: "BC"
                    }],
                    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                    ordinal: function(t) {
                        var r = t % 10
                          , f = Pe(t % 100 / 10) === 1 ? "th" : r === 1 ? "st" : r === 2 ? "nd" : r === 3 ? "rd" : "th";
                        return t + f
                    }
                }),
                L.lang = C("moment.lang is deprecated. Use moment.locale instead.", w),
                L.langData = C("moment.langData is deprecated. Use moment.localeData instead.", I);
                var ii = Math.abs;
                function Da() {
                    var t = this._data;
                    return this._milliseconds = ii(this._milliseconds),
                    this._days = ii(this._days),
                    this._months = ii(this._months),
                    t.milliseconds = ii(t.milliseconds),
                    t.seconds = ii(t.seconds),
                    t.minutes = ii(t.minutes),
                    t.hours = ii(t.hours),
                    t.months = ii(t.months),
                    t.years = ii(t.years),
                    this
                }
                function Gr(t, r, f, v) {
                    var T = xe(r, f);
                    return t._milliseconds += v * T._milliseconds,
                    t._days += v * T._days,
                    t._months += v * T._months,
                    t._bubble()
                }
                function Ca(t, r) {
                    return Gr(this, t, r, 1)
                }
                function Ea(t, r) {
                    return Gr(this, t, r, -1)
                }
                function Vr(t) {
                    return t < 0 ? Math.floor(t) : Math.ceil(t)
                }
                function ka() {
                    var t = this._milliseconds, r = this._days, f = this._months, v = this._data, T, j, K, me, Ae;
                    return t >= 0 && r >= 0 && f >= 0 || t <= 0 && r <= 0 && f <= 0 || (t += Vr(Tr(f) + r) * 864e5,
                    r = 0,
                    f = 0),
                    v.milliseconds = t % 1e3,
                    T = gt(t / 1e3),
                    v.seconds = T % 60,
                    j = gt(T / 60),
                    v.minutes = j % 60,
                    K = gt(j / 60),
                    v.hours = K % 24,
                    r += gt(K / 24),
                    Ae = gt(Zr(r)),
                    f += Ae,
                    r -= Vr(Tr(Ae)),
                    me = gt(f / 12),
                    f %= 12,
                    v.days = r,
                    v.months = f,
                    v.years = me,
                    this
                }
                function Zr(t) {
                    return t * 4800 / 146097
                }
                function Tr(t) {
                    return t * 146097 / 4800
                }
                function Sa(t) {
                    if (!this.isValid())
                        return NaN;
                    var r, f, v = this._milliseconds;
                    if (t = Oe(t),
                    t === "month" || t === "quarter" || t === "year")
                        switch (r = this._days + v / 864e5,
                        f = this._months + Zr(r),
                        t) {
                        case "month":
                            return f;
                        case "quarter":
                            return f / 3;
                        case "year":
                            return f / 12
                        }
                    else
                        switch (r = this._days + Math.round(Tr(this._months)),
                        t) {
                        case "week":
                            return r / 7 + v / 6048e5;
                        case "day":
                            return r + v / 864e5;
                        case "hour":
                            return r * 24 + v / 36e5;
                        case "minute":
                            return r * 1440 + v / 6e4;
                        case "second":
                            return r * 86400 + v / 1e3;
                        case "millisecond":
                            return Math.floor(r * 864e5) + v;
                        default:
                            throw new Error("Unknown unit " + t)
                        }
                }
                function ni(t) {
                    return function() {
                        return this.as(t)
                    }
                }
                var Qr = ni("ms")
                  , Aa = ni("s")
                  , Ta = ni("m")
                  , La = ni("h")
                  , Ma = ni("d")
                  , Oa = ni("w")
                  , $a = ni("M")
                  , Pa = ni("Q")
                  , Na = ni("y")
                  , Ia = Qr;
                function Fa() {
                    return xe(this)
                }
                function Ya(t) {
                    return t = Oe(t),
                    this.isValid() ? this[t + "s"]() : NaN
                }
                function Ii(t) {
                    return function() {
                        return this.isValid() ? this._data[t] : NaN
                    }
                }
                var Ra = Ii("milliseconds")
                  , qa = Ii("seconds")
                  , ja = Ii("minutes")
                  , Ha = Ii("hours")
                  , Ba = Ii("days")
                  , Wa = Ii("months")
                  , za = Ii("years");
                function Ua() {
                    return gt(this.days() / 7)
                }
                var ri = Math.round
                  , Xi = {
                    ss: 44,
                    s: 45,
                    m: 45,
                    h: 22,
                    d: 26,
                    w: null,
                    M: 11
                };
                function Ga(t, r, f, v, T) {
                    return T.relativeTime(r || 1, !!f, t, v)
                }
                function Va(t, r, f, v) {
                    var T = xe(t).abs()
                      , j = ri(T.as("s"))
                      , K = ri(T.as("m"))
                      , me = ri(T.as("h"))
                      , Ae = ri(T.as("d"))
                      , He = ri(T.as("M"))
                      , vt = ri(T.as("w"))
                      , si = ri(T.as("y"))
                      , vi = j <= f.ss && ["s", j] || j < f.s && ["ss", j] || K <= 1 && ["m"] || K < f.m && ["mm", K] || me <= 1 && ["h"] || me < f.h && ["hh", me] || Ae <= 1 && ["d"] || Ae < f.d && ["dd", Ae];
                    return f.w != null && (vi = vi || vt <= 1 && ["w"] || vt < f.w && ["ww", vt]),
                    vi = vi || He <= 1 && ["M"] || He < f.M && ["MM", He] || si <= 1 && ["y"] || ["yy", si],
                    vi[2] = r,
                    vi[3] = +t > 0,
                    vi[4] = v,
                    Ga.apply(null, vi)
                }
                function Za(t) {
                    return t === void 0 ? ri : typeof t == "function" ? (ri = t,
                    !0) : !1
                }
                function Qa(t, r) {
                    return Xi[t] === void 0 ? !1 : r === void 0 ? Xi[t] : (Xi[t] = r,
                    t === "s" && (Xi.ss = r - 1),
                    !0)
                }
                function Ja(t, r) {
                    if (!this.isValid())
                        return this.localeData().invalidDate();
                    var f = !1, v = Xi, T, j;
                    return typeof t == "object" && (r = t,
                    t = !1),
                    typeof t == "boolean" && (f = t),
                    typeof r == "object" && (v = Object.assign({}, Xi, r),
                    r.s != null && r.ss == null && (v.ss = r.s - 1)),
                    T = this.localeData(),
                    j = Va(this, !f, v, T),
                    f && (j = T.pastFuture(+this, j)),
                    T.postformat(j)
                }
                var Lr = Math.abs;
                function Ki(t) {
                    return (t > 0) - (t < 0) || +t
                }
                function er() {
                    if (!this.isValid())
                        return this.localeData().invalidDate();
                    var t = Lr(this._milliseconds) / 1e3, r = Lr(this._days), f = Lr(this._months), v, T, j, K, me = this.asSeconds(), Ae, He, vt, si;
                    return me ? (v = gt(t / 60),
                    T = gt(v / 60),
                    t %= 60,
                    v %= 60,
                    j = gt(f / 12),
                    f %= 12,
                    K = t ? t.toFixed(3).replace(/\.?0+$/, "") : "",
                    Ae = me < 0 ? "-" : "",
                    He = Ki(this._months) !== Ki(me) ? "-" : "",
                    vt = Ki(this._days) !== Ki(me) ? "-" : "",
                    si = Ki(this._milliseconds) !== Ki(me) ? "-" : "",
                    Ae + "P" + (j ? He + j + "Y" : "") + (f ? He + f + "M" : "") + (r ? vt + r + "D" : "") + (T || v || t ? "T" : "") + (T ? si + T + "H" : "") + (v ? si + v + "M" : "") + (t ? si + K + "S" : "")) : "P0D"
                }
                var Be = Wt.prototype;
                Be.isValid = Bt,
                Be.abs = Da,
                Be.add = Ca,
                Be.subtract = Ea,
                Be.as = Sa,
                Be.asMilliseconds = Qr,
                Be.asSeconds = Aa,
                Be.asMinutes = Ta,
                Be.asHours = La,
                Be.asDays = Ma,
                Be.asWeeks = Oa,
                Be.asMonths = $a,
                Be.asQuarters = Pa,
                Be.asYears = Na,
                Be.valueOf = Ia,
                Be._bubble = ka,
                Be.clone = Fa,
                Be.get = Ya,
                Be.milliseconds = Ra,
                Be.seconds = qa,
                Be.minutes = ja,
                Be.hours = Ha,
                Be.days = Ba,
                Be.weeks = Ua,
                Be.months = Wa,
                Be.years = za,
                Be.humanize = Ja,
                Be.toISOString = er,
                Be.toString = er,
                Be.toJSON = er,
                Be.locale = Ir,
                Be.localeData = Yr,
                Be.toIsoString = C("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", er),
                Be.lang = Fr,
                re("X", 0, 0, "unix"),
                re("x", 0, 0, "valueOf"),
                ce("x", zt),
                ce("X", ar),
                qe("X", function(t, r, f) {
                    f._d = new Date(parseFloat(t) * 1e3)
                }),
                qe("x", function(t, r, f) {
                    f._d = new Date(Pe(t))
                });
                //! moment.js
                return L.version = "2.30.1",
                D(De),
                L.fn = le,
                L.min = Cr,
                L.max = Er,
                L.now = zn,
                L.utc = N,
                L.unix = ma,
                L.months = ya,
                L.isDate = m,
                L.locale = w,
                L.invalid = fe,
                L.duration = xe,
                L.isMoment = F,
                L.weekdays = ba,
                L.parseZone = va,
                L.localeData = I,
                L.isDuration = ei,
                L.monthsShort = _a,
                L.weekdaysMin = xa,
                L.defineLocale = k,
                L.updateLocale = R,
                L.locales = B,
                L.weekdaysShort = wa,
                L.normalizeUnits = Oe,
                L.relativeTimeRounding = Za,
                L.relativeTimeThreshold = Qa,
                L.calendarFormat = fs,
                L.prototype = le,
                L.HTML5_FMT = {
                    DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
                    DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
                    DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
                    DATE: "YYYY-MM-DD",
                    TIME: "HH:mm",
                    TIME_SECONDS: "HH:mm:ss",
                    TIME_MS: "HH:mm:ss.SSS",
                    WEEK: "GGGG-[W]WW",
                    MONTH: "YYYY-MM"
                },
                L
            })
        }(Or)),
        Or.exports
    }
    /**
* @version: 3.1
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2019 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: http://www.daterangepicker.com/
*/
    (function(p) {
        (function(E, O) {
            if (p.exports) {
                var L = typeof window < "u" ? window.jQuery : void 0;
                L || (L = sr(),
                L.fn || (L.fn = {}));
                var D = typeof window < "u" && typeof window.moment < "u" ? window.moment : rs();
                p.exports = O(D, L)
            } else
                E.daterangepicker = O(E.moment, E.jQuery)
        }
        )(Pr, function(E, O) {
            var L = function(D, n, o) {
                if (this.parentEl = "body",
                this.element = O(D),
                this.startDate = E().startOf("day"),
                this.endDate = E().endOf("day"),
                this.minDate = !1,
                this.maxDate = !1,
                this.maxSpan = !1,
                this.autoApply = !1,
                this.singleDatePicker = !1,
                this.showDropdowns = !1,
                this.minYear = E().subtract(100, "year").format("YYYY"),
                this.maxYear = E().add(100, "year").format("YYYY"),
                this.showWeekNumbers = !1,
                this.showISOWeekNumbers = !1,
                this.showCustomRangeLabel = !0,
                this.timePicker = !1,
                this.timePicker24Hour = !1,
                this.timePickerIncrement = 1,
                this.timePickerSeconds = !1,
                this.linkedCalendars = !0,
                this.autoUpdateInput = !0,
                this.alwaysShowCalendars = !1,
                this.ranges = {},
                this.opens = "right",
                this.element.hasClass("pull-right") && (this.opens = "left"),
                this.drops = "down",
                this.element.hasClass("dropup") && (this.drops = "up"),
                this.buttonClasses = "btn btn-sm",
                this.applyButtonClasses = "btn-primary",
                this.cancelButtonClasses = "btn-default",
                this.locale = {
                    direction: "ltr",
                    format: E.localeData().longDateFormat("L"),
                    separator: " - ",
                    applyLabel: "Apply",
                    cancelLabel: "Cancel",
                    weekLabel: "W",
                    customRangeLabel: "Custom Range",
                    daysOfWeek: E.weekdaysMin(),
                    monthNames: E.monthsShort(),
                    firstDay: E.localeData().firstDayOfWeek()
                },
                this.callback = function() {}
                ,
                this.isShowing = !1,
                this.leftCalendar = {},
                this.rightCalendar = {},
                (typeof n != "object" || n === null) && (n = {}),
                n = O.extend(this.element.data(), n),
                typeof n.template != "string" && !(n.template instanceof O) && (n.template = '<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>'),
                this.parentEl = n.parentEl && O(n.parentEl).length ? O(n.parentEl) : O(this.parentEl),
                this.container = O(n.template).appendTo(this.parentEl),
                typeof n.locale == "object" && (typeof n.locale.direction == "string" && (this.locale.direction = n.locale.direction),
                typeof n.locale.format == "string" && (this.locale.format = n.locale.format),
                typeof n.locale.separator == "string" && (this.locale.separator = n.locale.separator),
                typeof n.locale.daysOfWeek == "object" && (this.locale.daysOfWeek = n.locale.daysOfWeek.slice()),
                typeof n.locale.monthNames == "object" && (this.locale.monthNames = n.locale.monthNames.slice()),
                typeof n.locale.firstDay == "number" && (this.locale.firstDay = n.locale.firstDay),
                typeof n.locale.applyLabel == "string" && (this.locale.applyLabel = n.locale.applyLabel),
                typeof n.locale.cancelLabel == "string" && (this.locale.cancelLabel = n.locale.cancelLabel),
                typeof n.locale.weekLabel == "string" && (this.locale.weekLabel = n.locale.weekLabel),
                typeof n.locale.customRangeLabel == "string")) {
                    var l = document.createElement("textarea");
                    l.innerHTML = n.locale.customRangeLabel;
                    var c = l.value;
                    this.locale.customRangeLabel = c
                }
                if (this.container.addClass(this.locale.direction),
                typeof n.startDate == "string" && (this.startDate = E(n.startDate, this.locale.format)),
                typeof n.endDate == "string" && (this.endDate = E(n.endDate, this.locale.format)),
                typeof n.minDate == "string" && (this.minDate = E(n.minDate, this.locale.format)),
                typeof n.maxDate == "string" && (this.maxDate = E(n.maxDate, this.locale.format)),
                typeof n.startDate == "object" && (this.startDate = E(n.startDate)),
                typeof n.endDate == "object" && (this.endDate = E(n.endDate)),
                typeof n.minDate == "object" && (this.minDate = E(n.minDate)),
                typeof n.maxDate == "object" && (this.maxDate = E(n.maxDate)),
                this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone()),
                this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone()),
                typeof n.applyButtonClasses == "string" && (this.applyButtonClasses = n.applyButtonClasses),
                typeof n.applyClass == "string" && (this.applyButtonClasses = n.applyClass),
                typeof n.cancelButtonClasses == "string" && (this.cancelButtonClasses = n.cancelButtonClasses),
                typeof n.cancelClass == "string" && (this.cancelButtonClasses = n.cancelClass),
                typeof n.maxSpan == "object" && (this.maxSpan = n.maxSpan),
                typeof n.dateLimit == "object" && (this.maxSpan = n.dateLimit),
                typeof n.opens == "string" && (this.opens = n.opens),
                typeof n.drops == "string" && (this.drops = n.drops),
                typeof n.showWeekNumbers == "boolean" && (this.showWeekNumbers = n.showWeekNumbers),
                typeof n.showISOWeekNumbers == "boolean" && (this.showISOWeekNumbers = n.showISOWeekNumbers),
                typeof n.buttonClasses == "string" && (this.buttonClasses = n.buttonClasses),
                typeof n.buttonClasses == "object" && (this.buttonClasses = n.buttonClasses.join(" ")),
                typeof n.showDropdowns == "boolean" && (this.showDropdowns = n.showDropdowns),
                typeof n.minYear == "number" && (this.minYear = n.minYear),
                typeof n.maxYear == "number" && (this.maxYear = n.maxYear),
                typeof n.showCustomRangeLabel == "boolean" && (this.showCustomRangeLabel = n.showCustomRangeLabel),
                typeof n.singleDatePicker == "boolean" && (this.singleDatePicker = n.singleDatePicker,
                this.singleDatePicker && (this.endDate = this.startDate.clone())),
                typeof n.timePicker == "boolean" && (this.timePicker = n.timePicker),
                typeof n.timePickerSeconds == "boolean" && (this.timePickerSeconds = n.timePickerSeconds),
                typeof n.timePickerIncrement == "number" && (this.timePickerIncrement = n.timePickerIncrement),
                typeof n.timePicker24Hour == "boolean" && (this.timePicker24Hour = n.timePicker24Hour),
                typeof n.autoApply == "boolean" && (this.autoApply = n.autoApply),
                typeof n.autoUpdateInput == "boolean" && (this.autoUpdateInput = n.autoUpdateInput),
                typeof n.linkedCalendars == "boolean" && (this.linkedCalendars = n.linkedCalendars),
                typeof n.isInvalidDate == "function" && (this.isInvalidDate = n.isInvalidDate),
                typeof n.isCustomDate == "function" && (this.isCustomDate = n.isCustomDate),
                typeof n.alwaysShowCalendars == "boolean" && (this.alwaysShowCalendars = n.alwaysShowCalendars),
                this.locale.firstDay != 0)
                    for (var d = this.locale.firstDay; d > 0; )
                        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),
                        d--;
                var a, m, _;
                if (typeof n.startDate > "u" && typeof n.endDate > "u" && O(this.element).is(":text")) {
                    var M = O(this.element).val()
                      , N = M.split(this.locale.separator);
                    a = m = null,
                    N.length == 2 ? (a = E(N[0], this.locale.format),
                    m = E(N[1], this.locale.format)) : this.singleDatePicker && M !== "" && (a = E(M, this.locale.format),
                    m = E(M, this.locale.format)),
                    a !== null && m !== null && (this.setStartDate(a),
                    this.setEndDate(m))
                }
                if (typeof n.ranges == "object") {
                    for (_ in n.ranges) {
                        typeof n.ranges[_][0] == "string" ? a = E(n.ranges[_][0], this.locale.format) : a = E(n.ranges[_][0]),
                        typeof n.ranges[_][1] == "string" ? m = E(n.ranges[_][1], this.locale.format) : m = E(n.ranges[_][1]),
                        this.minDate && a.isBefore(this.minDate) && (a = this.minDate.clone());
                        var W = this.maxDate;
                        if (this.maxSpan && W && a.clone().add(this.maxSpan).isAfter(W) && (W = a.clone().add(this.maxSpan)),
                        W && m.isAfter(W) && (m = W.clone()),
                        !(this.minDate && m.isBefore(this.minDate, this.timepicker ? "minute" : "day") || W && a.isAfter(W, this.timepicker ? "minute" : "day"))) {
                            var l = document.createElement("textarea");
                            l.innerHTML = _;
                            var c = l.value;
                            this.ranges[c] = [a, m]
                        }
                    }
                    var U = "<ul>";
                    for (_ in this.ranges)
                        U += '<li data-range-key="' + _ + '">' + _ + "</li>";
                    this.showCustomRangeLabel && (U += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + "</li>"),
                    U += "</ul>",
                    this.container.find(".ranges").prepend(U)
                }
                typeof o == "function" && (this.callback = o),
                this.timePicker || (this.startDate = this.startDate.startOf("day"),
                this.endDate = this.endDate.endOf("day"),
                this.container.find(".calendar-time").hide()),
                this.timePicker && this.autoApply && (this.autoApply = !1),
                this.autoApply && this.container.addClass("auto-apply"),
                typeof n.ranges == "object" && this.container.addClass("show-ranges"),
                this.singleDatePicker && (this.container.addClass("single"),
                this.container.find(".drp-calendar.left").addClass("single"),
                this.container.find(".drp-calendar.left").show(),
                this.container.find(".drp-calendar.right").hide(),
                !this.timePicker && this.autoApply && this.container.addClass("auto-apply")),
                (typeof n.ranges > "u" && !this.singleDatePicker || this.alwaysShowCalendars) && this.container.addClass("show-calendar"),
                this.container.addClass("opens" + this.opens),
                this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses),
                this.applyButtonClasses.length && this.container.find(".applyBtn").addClass(this.applyButtonClasses),
                this.cancelButtonClasses.length && this.container.find(".cancelBtn").addClass(this.cancelButtonClasses),
                this.container.find(".applyBtn").html(this.locale.applyLabel),
                this.container.find(".cancelBtn").html(this.locale.cancelLabel),
                this.container.find(".drp-calendar").on("click.daterangepicker", ".prev", O.proxy(this.clickPrev, this)).on("click.daterangepicker", ".next", O.proxy(this.clickNext, this)).on("mousedown.daterangepicker", "td.available", O.proxy(this.clickDate, this)).on("mouseenter.daterangepicker", "td.available", O.proxy(this.hoverDate, this)).on("change.daterangepicker", "select.yearselect", O.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.monthselect", O.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", O.proxy(this.timeChanged, this)),
                this.container.find(".ranges").on("click.daterangepicker", "li", O.proxy(this.clickRange, this)),
                this.container.find(".drp-buttons").on("click.daterangepicker", "button.applyBtn", O.proxy(this.clickApply, this)).on("click.daterangepicker", "button.cancelBtn", O.proxy(this.clickCancel, this)),
                this.element.is("input") || this.element.is("button") ? this.element.on({
                    "click.daterangepicker": O.proxy(this.show, this),
                    "focus.daterangepicker": O.proxy(this.show, this),
                    "keyup.daterangepicker": O.proxy(this.elementChanged, this),
                    "keydown.daterangepicker": O.proxy(this.keydown, this)
                }) : (this.element.on("click.daterangepicker", O.proxy(this.toggle, this)),
                this.element.on("keydown.daterangepicker", O.proxy(this.toggle, this))),
                this.updateElement()
            };
            return L.prototype = {
                constructor: L,
                setStartDate: function(D) {
                    typeof D == "string" && (this.startDate = E(D, this.locale.format)),
                    typeof D == "object" && (this.startDate = E(D)),
                    this.timePicker || (this.startDate = this.startDate.startOf("day")),
                    this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement),
                    this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone(),
                    this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement)),
                    this.maxDate && this.startDate.isAfter(this.maxDate) && (this.startDate = this.maxDate.clone(),
                    this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement)),
                    this.isShowing || this.updateElement(),
                    this.updateMonthsInView()
                },
                setEndDate: function(D) {
                    typeof D == "string" && (this.endDate = E(D, this.locale.format)),
                    typeof D == "object" && (this.endDate = E(D)),
                    this.timePicker || (this.endDate = this.endDate.endOf("day")),
                    this.timePicker && this.timePickerIncrement && this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement),
                    this.endDate.isBefore(this.startDate) && (this.endDate = this.startDate.clone()),
                    this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone()),
                    this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate) && (this.endDate = this.startDate.clone().add(this.maxSpan)),
                    this.previousRightTime = this.endDate.clone(),
                    this.container.find(".drp-selected").html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format)),
                    this.isShowing || this.updateElement(),
                    this.updateMonthsInView()
                },
                isInvalidDate: function() {
                    return !1
                },
                isCustomDate: function() {
                    return !1
                },
                updateView: function() {
                    this.timePicker && (this.renderTimePicker("left"),
                    this.renderTimePicker("right"),
                    this.endDate ? this.container.find(".right .calendar-time select").prop("disabled", !1).removeClass("disabled") : this.container.find(".right .calendar-time select").prop("disabled", !0).addClass("disabled")),
                    this.endDate && this.container.find(".drp-selected").html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format)),
                    this.updateMonthsInView(),
                    this.updateCalendars(),
                    this.updateFormInputs()
                },
                updateMonthsInView: function() {
                    if (this.endDate) {
                        if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month && (this.startDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.startDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM")) && (this.endDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.endDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM")))
                            return;
                        this.leftCalendar.month = this.startDate.clone().date(2),
                        !this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year()) ? this.rightCalendar.month = this.endDate.clone().date(2) : this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month")
                    } else
                        this.leftCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && this.rightCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && (this.leftCalendar.month = this.startDate.clone().date(2),
                        this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month"));
                    this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate && (this.rightCalendar.month = this.maxDate.clone().date(2),
                    this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, "month"))
                },
                updateCalendars: function() {
                    if (this.timePicker) {
                        var D, n, o;
                        if (this.endDate) {
                            if (D = parseInt(this.container.find(".left .hourselect").val(), 10),
                            n = parseInt(this.container.find(".left .minuteselect").val(), 10),
                            isNaN(n) && (n = parseInt(this.container.find(".left .minuteselect option:last").val(), 10)),
                            o = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) : 0,
                            !this.timePicker24Hour) {
                                var l = this.container.find(".left .ampmselect").val();
                                l === "PM" && D < 12 && (D += 12),
                                l === "AM" && D === 12 && (D = 0)
                            }
                        } else if (D = parseInt(this.container.find(".right .hourselect").val(), 10),
                        n = parseInt(this.container.find(".right .minuteselect").val(), 10),
                        isNaN(n) && (n = parseInt(this.container.find(".right .minuteselect option:last").val(), 10)),
                        o = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0,
                        !this.timePicker24Hour) {
                            var l = this.container.find(".right .ampmselect").val();
                            l === "PM" && D < 12 && (D += 12),
                            l === "AM" && D === 12 && (D = 0)
                        }
                        this.leftCalendar.month.hour(D).minute(n).second(o),
                        this.rightCalendar.month.hour(D).minute(n).second(o)
                    }
                    this.renderCalendar("left"),
                    this.renderCalendar("right"),
                    this.container.find(".ranges li").removeClass("active"),
                    this.endDate != null && this.calculateChosenLabel()
                },
                renderCalendar: function(D) {
                    var z = D == "left" ? this.leftCalendar : this.rightCalendar
                      , n = z.month.month()
                      , o = z.month.year()
                      , l = z.month.hour()
                      , c = z.month.minute()
                      , d = z.month.second()
                      , a = E([o, n]).daysInMonth()
                      , m = E([o, n, 1])
                      , _ = E([o, n, a])
                      , M = E(m).subtract(1, "month").month()
                      , N = E(m).subtract(1, "month").year()
                      , W = E([N, M]).daysInMonth()
                      , U = m.day()
                      , z = [];
                    z.firstDay = m,
                    z.lastDay = _;
                    for (var pe = 0; pe < 6; pe++)
                        z[pe] = [];
                    var fe = W - U + this.locale.firstDay + 1;
                    fe > W && (fe -= 7),
                    U == this.locale.firstDay && (fe = W - 6);
                    for (var we = E([N, M, fe, 12, c, d]), be, ne, pe = 0, be = 0, ne = 0; pe < 42; pe++,
                    be++,
                    we = E(we).add(24, "hour"))
                        pe > 0 && be % 7 === 0 && (be = 0,
                        ne++),
                        z[ne][be] = we.clone().hour(l).minute(c).second(d),
                        we.hour(12),
                        this.minDate && z[ne][be].format("YYYY-MM-DD") == this.minDate.format("YYYY-MM-DD") && z[ne][be].isBefore(this.minDate) && D == "left" && (z[ne][be] = this.minDate.clone()),
                        this.maxDate && z[ne][be].format("YYYY-MM-DD") == this.maxDate.format("YYYY-MM-DD") && z[ne][be].isAfter(this.maxDate) && D == "right" && (z[ne][be] = this.maxDate.clone());
                    D == "left" ? this.leftCalendar.calendar = z : this.rightCalendar.calendar = z;
                    var s = D == "left" ? this.minDate : this.startDate
                      , F = this.maxDate;
                    D == "left" ? this.startDate : this.endDate,
                    this.locale.direction == "ltr";
                    var A = '<table class="table-condensed">';
                    A += "<thead>",
                    A += "<tr>",
                    (this.showWeekNumbers || this.showISOWeekNumbers) && (A += "<th></th>"),
                    (!s || s.isBefore(z.firstDay)) && (!this.linkedCalendars || D == "left") ? A += '<th class="prev available"><span></span></th>' : A += "<th></th>";
                    var C = this.locale.monthNames[z[1][1].month()] + z[1][1].format(" YYYY");
                    if (this.showDropdowns) {
                        for (var x = z[1][1].month(), g = z[1][1].year(), y = F && F.year() || this.maxYear, S = s && s.year() || this.minYear, Y = g == S, q = g == y, G = '<select class="monthselect">', se = 0; se < 12; se++)
                            (!Y || s && se >= s.month()) && (!q || F && se <= F.month()) ? G += "<option value='" + se + "'" + (se === x ? " selected='selected'" : "") + ">" + this.locale.monthNames[se] + "</option>" : G += "<option value='" + se + "'" + (se === x ? " selected='selected'" : "") + " disabled='disabled'>" + this.locale.monthNames[se] + "</option>";
                        G += "</select>";
                        for (var ae = '<select class="yearselect">', ge = S; ge <= y; ge++)
                            ae += '<option value="' + ge + '"' + (ge === g ? ' selected="selected"' : "") + ">" + ge + "</option>";
                        ae += "</select>",
                        C = G + ae
                    }
                    if (A += '<th colspan="5" class="month">' + C + "</th>",
                    (!F || F.isAfter(z.lastDay)) && (!this.linkedCalendars || D == "right" || this.singleDatePicker) ? A += '<th class="next available"><span></span></th>' : A += "<th></th>",
                    A += "</tr>",
                    A += "<tr>",
                    (this.showWeekNumbers || this.showISOWeekNumbers) && (A += '<th class="week">' + this.locale.weekLabel + "</th>"),
                    O.each(this.locale.daysOfWeek, function(We, Re) {
                        A += "<th>" + Re + "</th>"
                    }),
                    A += "</tr>",
                    A += "</thead>",
                    A += "<tbody>",
                    this.endDate == null && this.maxSpan) {
                        var Te = this.startDate.clone().add(this.maxSpan).endOf("day");
                        (!F || Te.isBefore(F)) && (F = Te)
                    }
                    for (var ne = 0; ne < 6; ne++) {
                        A += "<tr>",
                        this.showWeekNumbers ? A += '<td class="week">' + z[ne][0].week() + "</td>" : this.showISOWeekNumbers && (A += '<td class="week">' + z[ne][0].isoWeek() + "</td>");
                        for (var be = 0; be < 7; be++) {
                            var X = [];
                            z[ne][be].isSame(new Date, "day") && X.push("today"),
                            z[ne][be].isoWeekday() > 5 && X.push("weekend"),
                            z[ne][be].month() != z[1][1].month() && X.push("off", "ends"),
                            this.minDate && z[ne][be].isBefore(this.minDate, "day") && X.push("off", "disabled"),
                            F && z[ne][be].isAfter(F, "day") && X.push("off", "disabled"),
                            this.isInvalidDate(z[ne][be]) && X.push("off", "disabled"),
                            z[ne][be].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && X.push("active", "start-date"),
                            this.endDate != null && z[ne][be].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && X.push("active", "end-date"),
                            this.endDate != null && z[ne][be] > this.startDate && z[ne][be] < this.endDate && X.push("in-range");
                            var ve = this.isCustomDate(z[ne][be]);
                            ve !== !1 && (typeof ve == "string" ? X.push(ve) : Array.prototype.push.apply(X, ve));
                            for (var Ee = "", re = !1, pe = 0; pe < X.length; pe++)
                                Ee += X[pe] + " ",
                                X[pe] == "disabled" && (re = !0);
                            re || (Ee += "available"),
                            A += '<td class="' + Ee.replace(/^\s+|\s+$/g, "") + '" data-title="r' + ne + "c" + be + '">' + z[ne][be].date() + "</td>"
                        }
                        A += "</tr>"
                    }
                    A += "</tbody>",
                    A += "</table>",
                    this.container.find(".drp-calendar." + D + " .calendar-table").html(A)
                },
                renderTimePicker: function(D) {
                    if (!(D == "right" && !this.endDate)) {
                        var n, o, l, c = this.maxDate;
                        if (this.maxSpan && (!this.maxDate || this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate)) && (c = this.startDate.clone().add(this.maxSpan)),
                        D == "left")
                            o = this.startDate.clone(),
                            l = this.minDate;
                        else if (D == "right") {
                            o = this.endDate.clone(),
                            l = this.startDate;
                            var d = this.container.find(".drp-calendar.right .calendar-time");
                            if (d.html() != "" && (o.hour(isNaN(o.hour()) ? d.find(".hourselect option:selected").val() : o.hour()),
                            o.minute(isNaN(o.minute()) ? d.find(".minuteselect option:selected").val() : o.minute()),
                            o.second(isNaN(o.second()) ? d.find(".secondselect option:selected").val() : o.second()),
                            !this.timePicker24Hour)) {
                                var a = d.find(".ampmselect option:selected").val();
                                a === "PM" && o.hour() < 12 && o.hour(o.hour() + 12),
                                a === "AM" && o.hour() === 12 && o.hour(0)
                            }
                            o.isBefore(this.startDate) && (o = this.startDate.clone()),
                            c && o.isAfter(c) && (o = c.clone())
                        }
                        n = '<select class="hourselect">';
                        for (var m = this.timePicker24Hour ? 0 : 1, _ = this.timePicker24Hour ? 23 : 12, M = m; M <= _; M++) {
                            var N = M;
                            this.timePicker24Hour || (N = o.hour() >= 12 ? M == 12 ? 12 : M + 12 : M == 12 ? 0 : M);
                            var W = o.clone().hour(N)
                              , U = !1;
                            l && W.minute(59).isBefore(l) && (U = !0),
                            c && W.minute(0).isAfter(c) && (U = !0),
                            N == o.hour() && !U ? n += '<option value="' + M + '" selected="selected">' + M + "</option>" : U ? n += '<option value="' + M + '" disabled="disabled" class="disabled">' + M + "</option>" : n += '<option value="' + M + '">' + M + "</option>"
                        }
                        n += "</select> ",
                        n += ': <select class="minuteselect">';
                        for (var M = 0; M < 60; M += this.timePickerIncrement) {
                            var z = M < 10 ? "0" + M : M
                              , W = o.clone().minute(M)
                              , U = !1;
                            l && W.second(59).isBefore(l) && (U = !0),
                            c && W.second(0).isAfter(c) && (U = !0),
                            o.minute() == M && !U ? n += '<option value="' + M + '" selected="selected">' + z + "</option>" : U ? n += '<option value="' + M + '" disabled="disabled" class="disabled">' + z + "</option>" : n += '<option value="' + M + '">' + z + "</option>"
                        }
                        if (n += "</select> ",
                        this.timePickerSeconds) {
                            n += ': <select class="secondselect">';
                            for (var M = 0; M < 60; M++) {
                                var z = M < 10 ? "0" + M : M
                                  , W = o.clone().second(M)
                                  , U = !1;
                                l && W.isBefore(l) && (U = !0),
                                c && W.isAfter(c) && (U = !0),
                                o.second() == M && !U ? n += '<option value="' + M + '" selected="selected">' + z + "</option>" : U ? n += '<option value="' + M + '" disabled="disabled" class="disabled">' + z + "</option>" : n += '<option value="' + M + '">' + z + "</option>"
                            }
                            n += "</select> "
                        }
                        if (!this.timePicker24Hour) {
                            n += '<select class="ampmselect">';
                            var pe = ""
                              , fe = "";
                            l && o.clone().hour(12).minute(0).second(0).isBefore(l) && (pe = ' disabled="disabled" class="disabled"'),
                            c && o.clone().hour(0).minute(0).second(0).isAfter(c) && (fe = ' disabled="disabled" class="disabled"'),
                            o.hour() >= 12 ? n += '<option value="AM"' + pe + '>AM</option><option value="PM" selected="selected"' + fe + ">PM</option>" : n += '<option value="AM" selected="selected"' + pe + '>AM</option><option value="PM"' + fe + ">PM</option>",
                            n += "</select>"
                        }
                        this.container.find(".drp-calendar." + D + " .calendar-time").html(n)
                    }
                },
                updateFormInputs: function() {
                    this.singleDatePicker || this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)) ? this.container.find("button.applyBtn").prop("disabled", !1) : this.container.find("button.applyBtn").prop("disabled", !0)
                },
                move: function() {
                    var D = {
                        top: 0,
                        left: 0
                    }, n, o = this.drops, l = O(window).width();
                    switch (this.parentEl.is("body") || (D = {
                        top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                        left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                    },
                    l = this.parentEl[0].clientWidth + this.parentEl.offset().left),
                    o) {
                    case "auto":
                        n = this.element.offset().top + this.element.outerHeight() - D.top,
                        n + this.container.outerHeight() >= this.parentEl[0].scrollHeight && (n = this.element.offset().top - this.container.outerHeight() - D.top,
                        o = "up");
                        break;
                    case "up":
                        n = this.element.offset().top - this.container.outerHeight() - D.top;
                        break;
                    default:
                        n = this.element.offset().top + this.element.outerHeight() - D.top;
                        break
                    }
                    this.container.css({
                        top: 0,
                        left: 0,
                        right: "auto"
                    });
                    var c = this.container.outerWidth();
                    if (this.container.toggleClass("drop-up", o == "up"),
                    this.opens == "left") {
                        var d = l - this.element.offset().left - this.element.outerWidth();
                        c + d > O(window).width() ? this.container.css({
                            top: n,
                            right: "auto",
                            left: 9
                        }) : this.container.css({
                            top: n,
                            right: d,
                            left: "auto"
                        })
                    } else if (this.opens == "center") {
                        var a = this.element.offset().left - D.left + this.element.outerWidth() / 2 - c / 2;
                        a < 0 ? this.container.css({
                            top: n,
                            right: "auto",
                            left: 9
                        }) : a + c > O(window).width() ? this.container.css({
                            top: n,
                            left: "auto",
                            right: 0
                        }) : this.container.css({
                            top: n,
                            left: a,
                            right: "auto"
                        })
                    } else {
                        var a = this.element.offset().left - D.left;
                        a + c > O(window).width() ? this.container.css({
                            top: n,
                            left: "auto",
                            right: 0
                        }) : this.container.css({
                            top: n,
                            left: a,
                            right: "auto"
                        })
                    }
                },
                show: function(D) {
                    this.isShowing || (this._outsideClickProxy = O.proxy(function(n) {
                        this.outsideClick(n)
                    }, this),
                    O(document).on("mousedown.daterangepicker", this._outsideClickProxy).on("touchend.daterangepicker", this._outsideClickProxy).on("click.daterangepicker", "[data-toggle=dropdown]", this._outsideClickProxy).on("focusin.daterangepicker", this._outsideClickProxy),
                    O(window).on("resize.daterangepicker", O.proxy(function(n) {
                        this.move(n)
                    }, this)),
                    this.oldStartDate = this.startDate.clone(),
                    this.oldEndDate = this.endDate.clone(),
                    this.previousRightTime = this.endDate.clone(),
                    this.updateView(),
                    this.container.show(),
                    this.move(),
                    this.element.trigger("show.daterangepicker", this),
                    this.isShowing = !0)
                },
                hide: function(D) {
                    this.isShowing && (this.endDate || (this.startDate = this.oldStartDate.clone(),
                    this.endDate = this.oldEndDate.clone()),
                    (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate)) && this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel),
                    this.updateElement(),
                    O(document).off(".daterangepicker"),
                    O(window).off(".daterangepicker"),
                    this.container.hide(),
                    this.element.trigger("hide.daterangepicker", this),
                    this.isShowing = !1)
                },
                toggle: function(D) {
                    this.isShowing ? this.hide() : this.show()
                },
                outsideClick: function(D) {
                    var n = O(D.target);
                    D.type == "focusin" || n.closest(this.element).length || n.closest(this.container).length || n.closest(".calendar-table").length || (this.hide(),
                    this.element.trigger("outsideClick.daterangepicker", this))
                },
                showCalendars: function() {
                    this.container.addClass("show-calendar"),
                    this.move(),
                    this.element.trigger("showCalendar.daterangepicker", this)
                },
                hideCalendars: function() {
                    this.container.removeClass("show-calendar"),
                    this.element.trigger("hideCalendar.daterangepicker", this)
                },
                clickRange: function(D) {
                    var n = D.target.getAttribute("data-range-key");
                    if (this.chosenLabel = n,
                    n == this.locale.customRangeLabel)
                        this.showCalendars();
                    else {
                        var o = this.ranges[n];
                        this.startDate = o[0],
                        this.endDate = o[1],
                        this.timePicker || (this.startDate.startOf("day"),
                        this.endDate.endOf("day")),
                        this.alwaysShowCalendars || this.hideCalendars(),
                        this.clickApply()
                    }
                },
                clickPrev: function(D) {
                    var n = O(D.target).parents(".drp-calendar");
                    n.hasClass("left") ? (this.leftCalendar.month.subtract(1, "month"),
                    this.linkedCalendars && this.rightCalendar.month.subtract(1, "month")) : this.rightCalendar.month.subtract(1, "month"),
                    this.updateCalendars()
                },
                clickNext: function(D) {
                    var n = O(D.target).parents(".drp-calendar");
                    n.hasClass("left") ? this.leftCalendar.month.add(1, "month") : (this.rightCalendar.month.add(1, "month"),
                    this.linkedCalendars && this.leftCalendar.month.add(1, "month")),
                    this.updateCalendars()
                },
                hoverDate: function(D) {
                    if (O(D.target).hasClass("available")) {
                        var n = O(D.target).attr("data-title")
                          , o = n.substr(1, 1)
                          , l = n.substr(3, 1)
                          , c = O(D.target).parents(".drp-calendar")
                          , d = c.hasClass("left") ? this.leftCalendar.calendar[o][l] : this.rightCalendar.calendar[o][l]
                          , a = this.leftCalendar
                          , m = this.rightCalendar
                          , _ = this.startDate;
                        this.endDate || this.container.find(".drp-calendar tbody td").each(function(M, N) {
                            if (!O(N).hasClass("week")) {
                                var W = O(N).attr("data-title")
                                  , U = W.substr(1, 1)
                                  , z = W.substr(3, 1)
                                  , pe = O(N).parents(".drp-calendar")
                                  , fe = pe.hasClass("left") ? a.calendar[U][z] : m.calendar[U][z];
                                fe.isAfter(_) && fe.isBefore(d) || fe.isSame(d, "day") ? O(N).addClass("in-range") : O(N).removeClass("in-range")
                            }
                        })
                    }
                },
                clickDate: function(D) {
                    if (O(D.target).hasClass("available")) {
                        var n = O(D.target).attr("data-title")
                          , o = n.substr(1, 1)
                          , l = n.substr(3, 1)
                          , c = O(D.target).parents(".drp-calendar")
                          , d = c.hasClass("left") ? this.leftCalendar.calendar[o][l] : this.rightCalendar.calendar[o][l];
                        if (this.endDate || d.isBefore(this.startDate, "day")) {
                            if (this.timePicker) {
                                var a = parseInt(this.container.find(".left .hourselect").val(), 10);
                                if (!this.timePicker24Hour) {
                                    var m = this.container.find(".left .ampmselect").val();
                                    m === "PM" && a < 12 && (a += 12),
                                    m === "AM" && a === 12 && (a = 0)
                                }
                                var _ = parseInt(this.container.find(".left .minuteselect").val(), 10);
                                isNaN(_) && (_ = parseInt(this.container.find(".left .minuteselect option:last").val(), 10));
                                var M = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) : 0;
                                d = d.clone().hour(a).minute(_).second(M)
                            }
                            this.endDate = null,
                            this.setStartDate(d.clone())
                        } else if (!this.endDate && d.isBefore(this.startDate))
                            this.setEndDate(this.startDate.clone());
                        else {
                            if (this.timePicker) {
                                var a = parseInt(this.container.find(".right .hourselect").val(), 10);
                                if (!this.timePicker24Hour) {
                                    var m = this.container.find(".right .ampmselect").val();
                                    m === "PM" && a < 12 && (a += 12),
                                    m === "AM" && a === 12 && (a = 0)
                                }
                                var _ = parseInt(this.container.find(".right .minuteselect").val(), 10);
                                isNaN(_) && (_ = parseInt(this.container.find(".right .minuteselect option:last").val(), 10));
                                var M = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0;
                                d = d.clone().hour(a).minute(_).second(M)
                            }
                            this.setEndDate(d.clone()),
                            this.autoApply && (this.calculateChosenLabel(),
                            this.clickApply())
                        }
                        this.singleDatePicker && (this.setEndDate(this.startDate),
                        !this.timePicker && this.autoApply && this.clickApply()),
                        this.updateView(),
                        D.stopPropagation()
                    }
                },
                calculateChosenLabel: function() {
                    var D = !0
                      , n = 0;
                    for (var o in this.ranges) {
                        if (this.timePicker) {
                            var l = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                            if (this.startDate.format(l) == this.ranges[o][0].format(l) && this.endDate.format(l) == this.ranges[o][1].format(l)) {
                                D = !1,
                                this.chosenLabel = this.container.find(".ranges li:eq(" + n + ")").addClass("active").attr("data-range-key");
                                break
                            }
                        } else if (this.startDate.format("YYYY-MM-DD") == this.ranges[o][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[o][1].format("YYYY-MM-DD")) {
                            D = !1,
                            this.chosenLabel = this.container.find(".ranges li:eq(" + n + ")").addClass("active").attr("data-range-key");
                            break
                        }
                        n++
                    }
                    D && (this.showCustomRangeLabel ? this.chosenLabel = this.container.find(".ranges li:last").addClass("active").attr("data-range-key") : this.chosenLabel = null,
                    this.showCalendars())
                },
                clickApply: function(D) {
                    this.hide(),
                    this.element.trigger("apply.daterangepicker", this)
                },
                clickCancel: function(D) {
                    this.startDate = this.oldStartDate,
                    this.endDate = this.oldEndDate,
                    this.hide(),
                    this.element.trigger("cancel.daterangepicker", this)
                },
                monthOrYearChanged: function(D) {
                    var n = O(D.target).closest(".drp-calendar").hasClass("left")
                      , o = n ? "left" : "right"
                      , l = this.container.find(".drp-calendar." + o)
                      , c = parseInt(l.find(".monthselect").val(), 10)
                      , d = l.find(".yearselect").val();
                    n || (d < this.startDate.year() || d == this.startDate.year() && c < this.startDate.month()) && (c = this.startDate.month(),
                    d = this.startDate.year()),
                    this.minDate && (d < this.minDate.year() || d == this.minDate.year() && c < this.minDate.month()) && (c = this.minDate.month(),
                    d = this.minDate.year()),
                    this.maxDate && (d > this.maxDate.year() || d == this.maxDate.year() && c > this.maxDate.month()) && (c = this.maxDate.month(),
                    d = this.maxDate.year()),
                    n ? (this.leftCalendar.month.month(c).year(d),
                    this.linkedCalendars && (this.rightCalendar.month = this.leftCalendar.month.clone().add(1, "month"))) : (this.rightCalendar.month.month(c).year(d),
                    this.linkedCalendars && (this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, "month"))),
                    this.updateCalendars()
                },
                timeChanged: function(D) {
                    var n = O(D.target).closest(".drp-calendar")
                      , o = n.hasClass("left")
                      , l = parseInt(n.find(".hourselect").val(), 10)
                      , c = parseInt(n.find(".minuteselect").val(), 10);
                    isNaN(c) && (c = parseInt(n.find(".minuteselect option:last").val(), 10));
                    var d = this.timePickerSeconds ? parseInt(n.find(".secondselect").val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var a = n.find(".ampmselect").val();
                        a === "PM" && l < 12 && (l += 12),
                        a === "AM" && l === 12 && (l = 0)
                    }
                    if (o) {
                        var m = this.startDate.clone();
                        m.hour(l),
                        m.minute(c),
                        m.second(d),
                        this.setStartDate(m),
                        this.singleDatePicker ? this.endDate = this.startDate.clone() : this.endDate && this.endDate.format("YYYY-MM-DD") == m.format("YYYY-MM-DD") && this.endDate.isBefore(m) && this.setEndDate(m.clone())
                    } else if (this.endDate) {
                        var _ = this.endDate.clone();
                        _.hour(l),
                        _.minute(c),
                        _.second(d),
                        this.setEndDate(_)
                    }
                    this.updateCalendars(),
                    this.updateFormInputs(),
                    this.renderTimePicker("left"),
                    this.renderTimePicker("right")
                },
                elementChanged: function() {
                    if (this.element.is("input") && this.element.val().length) {
                        var D = this.element.val().split(this.locale.separator)
                          , n = null
                          , o = null;
                        D.length === 2 && (n = E(D[0], this.locale.format),
                        o = E(D[1], this.locale.format)),
                        (this.singleDatePicker || n === null || o === null) && (n = E(this.element.val(), this.locale.format),
                        o = n),
                        !(!n.isValid() || !o.isValid()) && (this.setStartDate(n),
                        this.setEndDate(o),
                        this.updateView())
                    }
                },
                keydown: function(D) {
                    (D.keyCode === 9 || D.keyCode === 13) && this.hide(),
                    D.keyCode === 27 && (D.preventDefault(),
                    D.stopPropagation(),
                    this.hide())
                },
                updateElement: function() {
                    if (this.element.is("input") && this.autoUpdateInput) {
                        var D = this.startDate.format(this.locale.format);
                        this.singleDatePicker || (D += this.locale.separator + this.endDate.format(this.locale.format)),
                        D !== this.element.val() && this.element.val(D).trigger("change")
                    }
                },
                remove: function() {
                    this.container.remove(),
                    this.element.off(".daterangepicker"),
                    this.element.removeData()
                }
            },
            O.fn.daterangepicker = function(D, n) {
                var o = O.extend(!0, {}, O.fn.daterangepicker.defaultOptions, D);
                return this.each(function() {
                    var l = O(this);
                    l.data("daterangepicker") && l.data("daterangepicker").remove(),
                    l.data("daterangepicker", new L(l,o,n))
                }),
                this
            }
            ,
            L
        })
    }
    )(eo);
    /*! Select2 4.1.0-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
    (function(p) {
        typeof define == "function" && define.amd ? define(["jquery"], p) : typeof rr == "object" && rr.exports ? rr.exports = function(E, O) {
            return O === void 0 && (O = typeof window < "u" ? require("jquery") : require("jquery")(E)),
            p(O),
            O
        }
        : p(jQuery)
    }
    )(function(p) {
        var E, O, W, L, D, n, o, l, c, d, a, m, _, M, N, W = ((ne = p && p.fn && p.fn.select2 && p.fn.select2.amd ? p.fn.select2.amd : ne) && ne.requirejs || (ne ? O = ne : ne = {},
        c = {},
        d = {},
        a = {},
        m = {},
        _ = Object.prototype.hasOwnProperty,
        M = [].slice,
        N = /\.js$/,
        o = function(s, y) {
            var A, C, x = we(s), g = x[0], y = y[1];
            return s = x[1],
            g && (A = fe(g = z(g, y))),
            g ? s = A && A.normalize ? A.normalize(s, (C = y,
            function(S) {
                return z(S, C)
            }
            )) : z(s, y) : (g = (x = we(s = z(s, y)))[0],
            s = x[1],
            g && (A = fe(g))),
            {
                f: g ? g + "!" + s : s,
                n: s,
                pr: g,
                p: A
            }
        }
        ,
        l = {
            require: function(s) {
                return pe(s)
            },
            exports: function(s) {
                var F = c[s];
                return F !== void 0 ? F : c[s] = {}
            },
            module: function(s) {
                return {
                    id: s,
                    uri: "",
                    exports: c[s],
                    config: (F = s,
                    function() {
                        return a && a.config && a.config[F] || {}
                    }
                    )
                };
                var F
            }
        },
        D = function(s, F, A, C) {
            var x, g, y, S, Y, q = [], G = typeof A, se = be(C = C || s);
            if (G == "undefined" || G == "function") {
                for (F = !F.length && A.length ? ["require", "exports", "module"] : F,
                S = 0; S < F.length; S += 1)
                    if ((g = (y = o(F[S], se)).f) === "require")
                        q[S] = l.require(s);
                    else if (g === "exports")
                        q[S] = l.exports(s),
                        Y = !0;
                    else if (g === "module")
                        x = q[S] = l.module(s);
                    else if (U(c, g) || U(d, g) || U(m, g))
                        q[S] = fe(g);
                    else {
                        if (!y.p)
                            throw new Error(s + " missing " + g);
                        y.p.load(y.n, pe(C, !0), function(ae) {
                            return function(ge) {
                                c[ae] = ge
                            }
                        }(g), {}),
                        q[S] = c[g]
                    }
                G = A ? A.apply(c[s], q) : void 0,
                s && (x && x.exports !== L && x.exports !== c[s] ? c[s] = x.exports : G === L && Y || (c[s] = G))
            } else
                s && (c[s] = A)
        }
        ,
        E = O = n = function(s, F, A, C, x) {
            if (typeof s == "string")
                return l[s] ? l[s](F) : fe(o(s, be(F)).f);
            if (!s.splice) {
                if ((a = s).deps && n(a.deps, a.callback),
                !F)
                    return;
                F.splice ? (s = F,
                F = A,
                A = null) : s = L
            }
            return F = F || function() {}
            ,
            typeof A == "function" && (A = C,
            C = x),
            C ? D(L, s, F, A) : setTimeout(function() {
                D(L, s, F, A)
            }, 4),
            n
        }
        ,
        n.config = function(s) {
            return n(s)
        }
        ,
        E._defined = c,
        (W = function(s, F, A) {
            if (typeof s != "string")
                throw new Error("See almond README: incorrect module build, no module name");
            F.splice || (A = F,
            F = []),
            U(c, s) || U(d, s) || (d[s] = [s, F, A])
        }
        ).amd = {
            jQuery: !0
        },
        ne.requirejs = E,
        ne.require = O,
        ne.define = W),
        ne.define("almond", function() {}),
        ne.define("jquery", [], function() {
            var s = p || $;
            return s == null && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),
            s
        }),
        ne.define("select2/utils", ["jquery"], function(s) {
            var F = {};
            function A(g) {
                var y, S = g.prototype, Y = [];
                for (y in S)
                    typeof S[y] == "function" && y !== "constructor" && Y.push(y);
                return Y
            }
            F.Extend = function(g, y) {
                var S, Y = {}.hasOwnProperty;
                function q() {
                    this.constructor = g
                }
                for (S in y)
                    Y.call(y, S) && (g[S] = y[S]);
                return q.prototype = y.prototype,
                g.prototype = new q,
                g.__super__ = y.prototype,
                g
            }
            ,
            F.Decorate = function(g, y) {
                var S = A(y)
                  , Y = A(g);
                function q() {
                    var Te = Array.prototype.unshift
                      , X = y.prototype.constructor.length
                      , ve = g.prototype.constructor;
                    0 < X && (Te.call(arguments, g.prototype.constructor),
                    ve = y.prototype.constructor),
                    ve.apply(this, arguments)
                }
                y.displayName = g.displayName,
                q.prototype = new function() {
                    this.constructor = q
                }
                ;
                for (var G = 0; G < Y.length; G++) {
                    var se = Y[G];
                    q.prototype[se] = g.prototype[se]
                }
                for (var ae = 0; ae < S.length; ae++) {
                    var ge = S[ae];
                    q.prototype[ge] = function(Te) {
                        var X = function() {};
                        Te in q.prototype && (X = q.prototype[Te]);
                        var ve = y.prototype[Te];
                        return function() {
                            return Array.prototype.unshift.call(arguments, X),
                            ve.apply(this, arguments)
                        }
                    }(ge)
                }
                return q
            }
            ;
            function C() {
                this.listeners = {}
            }
            C.prototype.on = function(g, y) {
                this.listeners = this.listeners || {},
                g in this.listeners ? this.listeners[g].push(y) : this.listeners[g] = [y]
            }
            ,
            C.prototype.trigger = function(g) {
                var y = Array.prototype.slice
                  , S = y.call(arguments, 1);
                this.listeners = this.listeners || {},
                (S = S ?? []).length === 0 && S.push({}),
                (S[0]._type = g)in this.listeners && this.invoke(this.listeners[g], y.call(arguments, 1)),
                "*"in this.listeners && this.invoke(this.listeners["*"], arguments)
            }
            ,
            C.prototype.invoke = function(g, y) {
                for (var S = 0, Y = g.length; S < Y; S++)
                    g[S].apply(this, y)
            }
            ,
            F.Observable = C,
            F.generateChars = function(g) {
                for (var y = "", S = 0; S < g; S++)
                    y += Math.floor(36 * Math.random()).toString(36);
                return y
            }
            ,
            F.bind = function(g, y) {
                return function() {
                    g.apply(y, arguments)
                }
            }
            ,
            F._convertData = function(g) {
                for (var y in g) {
                    var S = y.split("-")
                      , Y = g;
                    if (S.length !== 1) {
                        for (var q = 0; q < S.length; q++) {
                            var G = S[q];
                            (G = G.substring(0, 1).toLowerCase() + G.substring(1))in Y || (Y[G] = {}),
                            q == S.length - 1 && (Y[G] = g[y]),
                            Y = Y[G]
                        }
                        delete g[y]
                    }
                }
                return g
            }
            ,
            F.hasScroll = function(g, y) {
                var S = s(y)
                  , Y = y.style.overflowX
                  , q = y.style.overflowY;
                return (Y !== q || q !== "hidden" && q !== "visible") && (Y === "scroll" || q === "scroll" || S.innerHeight() < y.scrollHeight || S.innerWidth() < y.scrollWidth)
            }
            ,
            F.escapeMarkup = function(g) {
                var y = {
                    "\\": "&#92;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#47;"
                };
                return typeof g != "string" ? g : String(g).replace(/[&<>"'\/\\]/g, function(S) {
                    return y[S]
                })
            }
            ,
            F.__cache = {};
            var x = 0;
            return F.GetUniqueElementId = function(g) {
                var y = g.getAttribute("data-select2-id");
                return y != null || (y = g.id ? "select2-data-" + g.id : "select2-data-" + (++x).toString() + "-" + F.generateChars(4),
                g.setAttribute("data-select2-id", y)),
                y
            }
            ,
            F.StoreData = function(g, y, S) {
                g = F.GetUniqueElementId(g),
                F.__cache[g] || (F.__cache[g] = {}),
                F.__cache[g][y] = S
            }
            ,
            F.GetData = function(g, y) {
                var S = F.GetUniqueElementId(g);
                return y ? F.__cache[S] && F.__cache[S][y] != null ? F.__cache[S][y] : s(g).data(y) : F.__cache[S]
            }
            ,
            F.RemoveData = function(g) {
                var y = F.GetUniqueElementId(g);
                F.__cache[y] != null && delete F.__cache[y],
                g.removeAttribute("data-select2-id")
            }
            ,
            F.copyNonInternalCssClasses = function(g, Y) {
                var S = (S = g.getAttribute("class").trim().split(/\s+/)).filter(function(q) {
                    return q.indexOf("select2-") === 0
                })
                  , Y = (Y = Y.getAttribute("class").trim().split(/\s+/)).filter(function(q) {
                    return q.indexOf("select2-") !== 0
                })
                  , Y = S.concat(Y);
                g.setAttribute("class", Y.join(" "))
            }
            ,
            F
        }),
        ne.define("select2/results", ["jquery", "./utils"], function(s, F) {
            function A(C, x, g) {
                this.$element = C,
                this.data = g,
                this.options = x,
                A.__super__.constructor.call(this)
            }
            return F.Extend(A, F.Observable),
            A.prototype.render = function() {
                var C = s('<ul class="select2-results__options" role="listbox"></ul>');
                return this.options.get("multiple") && C.attr("aria-multiselectable", "true"),
                this.$results = C
            }
            ,
            A.prototype.clear = function() {
                this.$results.empty()
            }
            ,
            A.prototype.displayMessage = function(C) {
                var x = this.options.get("escapeMarkup");
                this.clear(),
                this.hideLoading();
                var g = s('<li role="alert" aria-live="assertive" class="select2-results__option"></li>')
                  , y = this.options.get("translations").get(C.message);
                g.append(x(y(C.args))),
                g[0].className += " select2-results__message",
                this.$results.append(g)
            }
            ,
            A.prototype.hideMessages = function() {
                this.$results.find(".select2-results__message").remove()
            }
            ,
            A.prototype.append = function(C) {
                this.hideLoading();
                var x = [];
                if (C.results != null && C.results.length !== 0) {
                    C.results = this.sort(C.results);
                    for (var g = 0; g < C.results.length; g++) {
                        var y = C.results[g]
                          , y = this.option(y);
                        x.push(y)
                    }
                    this.$results.append(x)
                } else
                    this.$results.children().length === 0 && this.trigger("results:message", {
                        message: "noResults"
                    })
            }
            ,
            A.prototype.position = function(C, x) {
                x.find(".select2-results").append(C)
            }
            ,
            A.prototype.sort = function(C) {
                return this.options.get("sorter")(C)
            }
            ,
            A.prototype.highlightFirstItem = function() {
                var C = this.$results.find(".select2-results__option--selectable")
                  , x = C.filter(".select2-results__option--selected");
                (0 < x.length ? x : C).first().trigger("mouseenter"),
                this.ensureHighlightVisible()
            }
            ,
            A.prototype.setClasses = function() {
                var C = this;
                this.data.current(function(x) {
                    var g = x.map(function(y) {
                        return y.id.toString()
                    });
                    C.$results.find(".select2-results__option--selectable").each(function() {
                        var y = s(this)
                          , S = F.GetData(this, "data")
                          , Y = "" + S.id;
                        S.element != null && S.element.selected || S.element == null && -1 < g.indexOf(Y) ? (this.classList.add("select2-results__option--selected"),
                        y.attr("aria-selected", "true")) : (this.classList.remove("select2-results__option--selected"),
                        y.attr("aria-selected", "false"))
                    })
                })
            }
            ,
            A.prototype.showLoading = function(C) {
                this.hideLoading(),
                C = {
                    disabled: !0,
                    loading: !0,
                    text: this.options.get("translations").get("searching")(C)
                },
                C = this.option(C),
                C.className += " loading-results",
                this.$results.prepend(C)
            }
            ,
            A.prototype.hideLoading = function() {
                this.$results.find(".loading-results").remove()
            }
            ,
            A.prototype.option = function(C) {
                var x = document.createElement("li");
                x.classList.add("select2-results__option"),
                x.classList.add("select2-results__option--selectable");
                var g, y = {
                    role: "option"
                }, S = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
                for (g in (C.element != null && S.call(C.element, ":disabled") || C.element == null && C.disabled) && (y["aria-disabled"] = "true",
                x.classList.remove("select2-results__option--selectable"),
                x.classList.add("select2-results__option--disabled")),
                C.id == null && x.classList.remove("select2-results__option--selectable"),
                C._resultId != null && (x.id = C._resultId),
                C.title && (x.title = C.title),
                C.children && (y.role = "group",
                y["aria-label"] = C.text,
                x.classList.remove("select2-results__option--selectable"),
                x.classList.add("select2-results__option--group")),
                y) {
                    var Y = y[g];
                    x.setAttribute(g, Y)
                }
                if (C.children) {
                    var q = s(x)
                      , G = document.createElement("strong");
                    G.className = "select2-results__group",
                    this.template(C, G);
                    for (var se = [], ae = 0; ae < C.children.length; ae++) {
                        var ge = C.children[ae]
                          , ge = this.option(ge);
                        se.push(ge)
                    }
                    S = s("<ul></ul>", {
                        class: "select2-results__options select2-results__options--nested",
                        role: "none"
                    }),
                    S.append(se),
                    q.append(G),
                    q.append(S)
                } else
                    this.template(C, x);
                return F.StoreData(x, "data", C),
                x
            }
            ,
            A.prototype.bind = function(C, x) {
                var g = this
                  , y = C.id + "-results";
                this.$results.attr("id", y),
                C.on("results:all", function(S) {
                    g.clear(),
                    g.append(S.data),
                    C.isOpen() && (g.setClasses(),
                    g.highlightFirstItem())
                }),
                C.on("results:append", function(S) {
                    g.append(S.data),
                    C.isOpen() && g.setClasses()
                }),
                C.on("query", function(S) {
                    g.hideMessages(),
                    g.showLoading(S)
                }),
                C.on("select", function() {
                    C.isOpen() && (g.setClasses(),
                    g.options.get("scrollAfterSelect") && g.highlightFirstItem())
                }),
                C.on("unselect", function() {
                    C.isOpen() && (g.setClasses(),
                    g.options.get("scrollAfterSelect") && g.highlightFirstItem())
                }),
                C.on("open", function() {
                    g.$results.attr("aria-expanded", "true"),
                    g.$results.attr("aria-hidden", "false"),
                    g.setClasses(),
                    g.ensureHighlightVisible()
                }),
                C.on("close", function() {
                    g.$results.attr("aria-expanded", "false"),
                    g.$results.attr("aria-hidden", "true"),
                    g.$results.removeAttr("aria-activedescendant")
                }),
                C.on("results:toggle", function() {
                    var S = g.getHighlightedResults();
                    S.length !== 0 && S.trigger("mouseup")
                }),
                C.on("results:select", function() {
                    var S, Y = g.getHighlightedResults();
                    Y.length !== 0 && (S = F.GetData(Y[0], "data"),
                    Y.hasClass("select2-results__option--selected") ? g.trigger("close", {}) : g.trigger("select", {
                        data: S
                    }))
                }),
                C.on("results:previous", function() {
                    var S, Y = g.getHighlightedResults(), q = g.$results.find(".select2-results__option--selectable"), G = q.index(Y);
                    G <= 0 || (S = G - 1,
                    Y.length === 0 && (S = 0),
                    (G = q.eq(S)).trigger("mouseenter"),
                    Y = g.$results.offset().top,
                    q = G.offset().top,
                    G = g.$results.scrollTop() + (q - Y),
                    S === 0 ? g.$results.scrollTop(0) : q - Y < 0 && g.$results.scrollTop(G))
                }),
                C.on("results:next", function() {
                    var S, Y = g.getHighlightedResults(), q = g.$results.find(".select2-results__option--selectable"), G = q.index(Y) + 1;
                    G >= q.length || ((S = q.eq(G)).trigger("mouseenter"),
                    Y = g.$results.offset().top + g.$results.outerHeight(!1),
                    q = S.offset().top + S.outerHeight(!1),
                    S = g.$results.scrollTop() + q - Y,
                    G === 0 ? g.$results.scrollTop(0) : Y < q && g.$results.scrollTop(S))
                }),
                C.on("results:focus", function(S) {
                    S.element[0].classList.add("select2-results__option--highlighted"),
                    S.element[0].setAttribute("aria-selected", "true")
                }),
                C.on("results:message", function(S) {
                    g.displayMessage(S)
                }),
                s.fn.mousewheel && this.$results.on("mousewheel", function(S) {
                    var Y = g.$results.scrollTop()
                      , q = g.$results.get(0).scrollHeight - Y + S.deltaY
                      , Y = 0 < S.deltaY && Y - S.deltaY <= 0
                      , q = S.deltaY < 0 && q <= g.$results.height();
                    Y ? (g.$results.scrollTop(0),
                    S.preventDefault(),
                    S.stopPropagation()) : q && (g.$results.scrollTop(g.$results.get(0).scrollHeight - g.$results.height()),
                    S.preventDefault(),
                    S.stopPropagation())
                }),
                this.$results.on("mouseup", ".select2-results__option--selectable", function(S) {
                    var Y = s(this)
                      , q = F.GetData(this, "data");
                    Y.hasClass("select2-results__option--selected") ? g.options.get("multiple") ? g.trigger("unselect", {
                        originalEvent: S,
                        data: q
                    }) : g.trigger("close", {}) : g.trigger("select", {
                        originalEvent: S,
                        data: q
                    })
                }),
                this.$results.on("mouseenter", ".select2-results__option--selectable", function(S) {
                    var Y = F.GetData(this, "data");
                    g.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected", "false"),
                    g.trigger("results:focus", {
                        data: Y,
                        element: s(this)
                    })
                })
            }
            ,
            A.prototype.getHighlightedResults = function() {
                return this.$results.find(".select2-results__option--highlighted")
            }
            ,
            A.prototype.destroy = function() {
                this.$results.remove()
            }
            ,
            A.prototype.ensureHighlightVisible = function() {
                var C, x, g, y, S = this.getHighlightedResults();
                S.length !== 0 && (C = this.$results.find(".select2-results__option--selectable").index(S),
                y = this.$results.offset().top,
                x = S.offset().top,
                g = this.$results.scrollTop() + (x - y),
                y = x - y,
                g -= 2 * S.outerHeight(!1),
                C <= 2 ? this.$results.scrollTop(0) : (y > this.$results.outerHeight() || y < 0) && this.$results.scrollTop(g))
            }
            ,
            A.prototype.template = function(S, x) {
                var g = this.options.get("templateResult")
                  , y = this.options.get("escapeMarkup")
                  , S = g(S, x);
                S == null ? x.style.display = "none" : typeof S == "string" ? x.innerHTML = y(S) : s(x).append(S)
            }
            ,
            A
        }),
        ne.define("select2/keys", [], function() {
            return {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            }
        }),
        ne.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(s, F, A) {
            function C(x, g) {
                this.$element = x,
                this.options = g,
                C.__super__.constructor.call(this)
            }
            return F.Extend(C, F.Observable),
            C.prototype.render = function() {
                var x = s('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                return this._tabindex = 0,
                F.GetData(this.$element[0], "old-tabindex") != null ? this._tabindex = F.GetData(this.$element[0], "old-tabindex") : this.$element.attr("tabindex") != null && (this._tabindex = this.$element.attr("tabindex")),
                x.attr("title", this.$element.attr("title")),
                x.attr("tabindex", this._tabindex),
                x.attr("aria-disabled", "false"),
                this.$selection = x
            }
            ,
            C.prototype.bind = function(x, g) {
                var y = this
                  , S = x.id + "-results";
                this.container = x,
                this.$selection.on("focus", function(Y) {
                    y.trigger("focus", Y)
                }),
                this.$selection.on("blur", function(Y) {
                    y._handleBlur(Y)
                }),
                this.$selection.on("keydown", function(Y) {
                    y.trigger("keypress", Y),
                    Y.which === A.SPACE && Y.preventDefault()
                }),
                x.on("results:focus", function(Y) {
                    y.$selection.attr("aria-activedescendant", Y.data._resultId)
                }),
                x.on("selection:update", function(Y) {
                    y.update(Y.data)
                }),
                x.on("open", function() {
                    y.$selection.attr("aria-expanded", "true"),
                    y.$selection.attr("aria-owns", S),
                    y._attachCloseHandler(x)
                }),
                x.on("close", function() {
                    y.$selection.attr("aria-expanded", "false"),
                    y.$selection.removeAttr("aria-activedescendant"),
                    y.$selection.removeAttr("aria-owns"),
                    y.$selection.trigger("focus"),
                    y._detachCloseHandler(x)
                }),
                x.on("enable", function() {
                    y.$selection.attr("tabindex", y._tabindex),
                    y.$selection.attr("aria-disabled", "false")
                }),
                x.on("disable", function() {
                    y.$selection.attr("tabindex", "-1"),
                    y.$selection.attr("aria-disabled", "true")
                })
            }
            ,
            C.prototype._handleBlur = function(x) {
                var g = this;
                window.setTimeout(function() {
                    document.activeElement == g.$selection[0] || s.contains(g.$selection[0], document.activeElement) || g.trigger("blur", x)
                }, 1)
            }
            ,
            C.prototype._attachCloseHandler = function(x) {
                s(document.body).on("mousedown.select2." + x.id, function(g) {
                    var y = s(g.target).closest(".select2");
                    s(".select2.select2-container--open").each(function() {
                        this != y[0] && F.GetData(this, "element").select2("close")
                    })
                })
            }
            ,
            C.prototype._detachCloseHandler = function(x) {
                s(document.body).off("mousedown.select2." + x.id)
            }
            ,
            C.prototype.position = function(x, g) {
                g.find(".selection").append(x)
            }
            ,
            C.prototype.destroy = function() {
                this._detachCloseHandler(this.container)
            }
            ,
            C.prototype.update = function(x) {
                throw new Error("The `update` method must be defined in child classes.")
            }
            ,
            C.prototype.isEnabled = function() {
                return !this.isDisabled()
            }
            ,
            C.prototype.isDisabled = function() {
                return this.options.get("disabled")
            }
            ,
            C
        }),
        ne.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(s, F, A, C) {
            function x() {
                x.__super__.constructor.apply(this, arguments)
            }
            return A.Extend(x, F),
            x.prototype.render = function() {
                var g = x.__super__.render.call(this);
                return g[0].classList.add("select2-selection--single"),
                g.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),
                g
            }
            ,
            x.prototype.bind = function(g, y) {
                var S = this;
                x.__super__.bind.apply(this, arguments);
                var Y = g.id + "-container";
                this.$selection.find(".select2-selection__rendered").attr("id", Y).attr("role", "textbox").attr("aria-readonly", "true"),
                this.$selection.attr("aria-labelledby", Y),
                this.$selection.attr("aria-controls", Y),
                this.$selection.on("mousedown", function(q) {
                    q.which === 1 && S.trigger("toggle", {
                        originalEvent: q
                    })
                }),
                this.$selection.on("focus", function(q) {}),
                this.$selection.on("blur", function(q) {}),
                g.on("focus", function(q) {
                    g.isOpen() || S.$selection.trigger("focus")
                })
            }
            ,
            x.prototype.clear = function() {
                var g = this.$selection.find(".select2-selection__rendered");
                g.empty(),
                g.removeAttr("title")
            }
            ,
            x.prototype.display = function(g, y) {
                var S = this.options.get("templateSelection");
                return this.options.get("escapeMarkup")(S(g, y))
            }
            ,
            x.prototype.selectionContainer = function() {
                return s("<span></span>")
            }
            ,
            x.prototype.update = function(g) {
                var y, S;
                g.length !== 0 ? (S = g[0],
                y = this.$selection.find(".select2-selection__rendered"),
                g = this.display(S, y),
                y.empty().append(g),
                (S = S.title || S.text) ? y.attr("title", S) : y.removeAttr("title")) : this.clear()
            }
            ,
            x
        }),
        ne.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(s, F, A) {
            function C(x, g) {
                C.__super__.constructor.apply(this, arguments)
            }
            return A.Extend(C, F),
            C.prototype.render = function() {
                var x = C.__super__.render.call(this);
                return x[0].classList.add("select2-selection--multiple"),
                x.html('<ul class="select2-selection__rendered"></ul>'),
                x
            }
            ,
            C.prototype.bind = function(x, g) {
                var y = this;
                C.__super__.bind.apply(this, arguments);
                var S = x.id + "-container";
                this.$selection.find(".select2-selection__rendered").attr("id", S),
                this.$selection.on("click", function(Y) {
                    y.trigger("toggle", {
                        originalEvent: Y
                    })
                }),
                this.$selection.on("click", ".select2-selection__choice__remove", function(Y) {
                    var q;
                    y.isDisabled() || (q = s(this).parent(),
                    q = A.GetData(q[0], "data"),
                    y.trigger("unselect", {
                        originalEvent: Y,
                        data: q
                    }))
                }),
                this.$selection.on("keydown", ".select2-selection__choice__remove", function(Y) {
                    y.isDisabled() || Y.stopPropagation()
                })
            }
            ,
            C.prototype.clear = function() {
                var x = this.$selection.find(".select2-selection__rendered");
                x.empty(),
                x.removeAttr("title")
            }
            ,
            C.prototype.display = function(x, g) {
                var y = this.options.get("templateSelection");
                return this.options.get("escapeMarkup")(y(x, g))
            }
            ,
            C.prototype.selectionContainer = function() {
                return s('<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>')
            }
            ,
            C.prototype.update = function(x) {
                if (this.clear(),
                x.length !== 0) {
                    for (var g = [], y = this.$selection.find(".select2-selection__rendered").attr("id") + "-choice-", S = 0; S < x.length; S++) {
                        var Y = x[S]
                          , q = this.selectionContainer()
                          , G = this.display(Y, q)
                          , se = y + A.generateChars(4) + "-";
                        Y.id ? se += Y.id : se += A.generateChars(4),
                        q.find(".select2-selection__choice__display").append(G).attr("id", se);
                        var ae = Y.title || Y.text;
                        ae && q.attr("title", ae),
                        G = this.options.get("translations").get("removeItem"),
                        ae = q.find(".select2-selection__choice__remove"),
                        ae.attr("title", G()),
                        ae.attr("aria-label", G()),
                        ae.attr("aria-describedby", se),
                        A.StoreData(q[0], "data", Y),
                        g.push(q)
                    }
                    this.$selection.find(".select2-selection__rendered").append(g)
                }
            }
            ,
            C
        }),
        ne.define("select2/selection/placeholder", [], function() {
            function s(F, A, C) {
                this.placeholder = this.normalizePlaceholder(C.get("placeholder")),
                F.call(this, A, C)
            }
            return s.prototype.normalizePlaceholder = function(F, A) {
                return A = typeof A == "string" ? {
                    id: "",
                    text: A
                } : A
            }
            ,
            s.prototype.createPlaceholder = function(F, A) {
                var C = this.selectionContainer();
                return C.html(this.display(A)),
                C[0].classList.add("select2-selection__placeholder"),
                C[0].classList.remove("select2-selection__choice"),
                A = A.title || A.text || C.text(),
                this.$selection.find(".select2-selection__rendered").attr("title", A),
                C
            }
            ,
            s.prototype.update = function(F, A) {
                var C = A.length == 1 && A[0].id != this.placeholder.id;
                if (1 < A.length || C)
                    return F.call(this, A);
                this.clear(),
                A = this.createPlaceholder(this.placeholder),
                this.$selection.find(".select2-selection__rendered").append(A)
            }
            ,
            s
        }),
        ne.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function(s, F, A) {
            function C() {}
            return C.prototype.bind = function(x, g, y) {
                var S = this;
                x.call(this, g, y),
                this.placeholder == null && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),
                this.$selection.on("mousedown", ".select2-selection__clear", function(Y) {
                    S._handleClear(Y)
                }),
                g.on("keypress", function(Y) {
                    S._handleKeyboardClear(Y, g)
                })
            }
            ,
            C.prototype._handleClear = function(x, g) {
                if (!this.isDisabled()) {
                    var y = this.$selection.find(".select2-selection__clear");
                    if (y.length !== 0) {
                        g.stopPropagation();
                        var S = A.GetData(y[0], "data")
                          , Y = this.$element.val();
                        this.$element.val(this.placeholder.id);
                        var q = {
                            data: S
                        };
                        if (this.trigger("clear", q),
                        q.prevented)
                            this.$element.val(Y);
                        else {
                            for (var G = 0; G < S.length; G++)
                                if (q = {
                                    data: S[G]
                                },
                                this.trigger("unselect", q),
                                q.prevented)
                                    return void this.$element.val(Y);
                            this.$element.trigger("input").trigger("change"),
                            this.trigger("toggle", {})
                        }
                    }
                }
            }
            ,
            C.prototype._handleKeyboardClear = function(x, g, y) {
                y.isOpen() || g.which != F.DELETE && g.which != F.BACKSPACE || this._handleClear(g)
            }
            ,
            C.prototype.update = function(x, g) {
                var y, S;
                x.call(this, g),
                this.$selection.find(".select2-selection__clear").remove(),
                this.$selection[0].classList.remove("select2-selection--clearable"),
                0 < this.$selection.find(".select2-selection__placeholder").length || g.length === 0 || (y = this.$selection.find(".select2-selection__rendered").attr("id"),
                S = this.options.get("translations").get("removeAllItems"),
                (x = s('<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>')).attr("title", S()),
                x.attr("aria-label", S()),
                x.attr("aria-describedby", y),
                A.StoreData(x[0], "data", g),
                this.$selection.prepend(x),
                this.$selection[0].classList.add("select2-selection--clearable"))
            }
            ,
            C
        }),
        ne.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(s, F, A) {
            function C(x, g, y) {
                x.call(this, g, y)
            }
            return C.prototype.render = function(x) {
                var g = this.options.get("translations").get("search")
                  , y = s('<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>');
                return this.$searchContainer = y,
                this.$search = y.find("textarea"),
                this.$search.prop("autocomplete", this.options.get("autocomplete")),
                this.$search.attr("aria-label", g()),
                x = x.call(this),
                this._transferTabIndex(),
                x.append(this.$searchContainer),
                x
            }
            ,
            C.prototype.bind = function(x, G, y) {
                var S = this
                  , Y = G.id + "-results"
                  , q = G.id + "-container";
                x.call(this, G, y),
                S.$search.attr("aria-describedby", q),
                G.on("open", function() {
                    S.$search.attr("aria-controls", Y),
                    S.$search.trigger("focus")
                }),
                G.on("close", function() {
                    S.$search.val(""),
                    S.resizeSearch(),
                    S.$search.removeAttr("aria-controls"),
                    S.$search.removeAttr("aria-activedescendant"),
                    S.$search.trigger("focus")
                }),
                G.on("enable", function() {
                    S.$search.prop("disabled", !1),
                    S._transferTabIndex()
                }),
                G.on("disable", function() {
                    S.$search.prop("disabled", !0)
                }),
                G.on("focus", function(ae) {
                    S.$search.trigger("focus")
                }),
                G.on("results:focus", function(ae) {
                    ae.data._resultId ? S.$search.attr("aria-activedescendant", ae.data._resultId) : S.$search.removeAttr("aria-activedescendant")
                }),
                this.$selection.on("focusin", ".select2-search--inline", function(ae) {
                    S.trigger("focus", ae)
                }),
                this.$selection.on("focusout", ".select2-search--inline", function(ae) {
                    S._handleBlur(ae)
                }),
                this.$selection.on("keydown", ".select2-search--inline", function(ae) {
                    var ge;
                    ae.stopPropagation(),
                    S.trigger("keypress", ae),
                    S._keyUpPrevented = ae.isDefaultPrevented(),
                    ae.which !== A.BACKSPACE || S.$search.val() !== "" || 0 < (ge = S.$selection.find(".select2-selection__choice").last()).length && (ge = F.GetData(ge[0], "data"),
                    S.searchRemoveChoice(ge),
                    ae.preventDefault())
                }),
                this.$selection.on("click", ".select2-search--inline", function(ae) {
                    S.$search.val() && ae.stopPropagation()
                });
                var G = document.documentMode
                  , se = G && G <= 11;
                this.$selection.on("input.searchcheck", ".select2-search--inline", function(ae) {
                    se ? S.$selection.off("input.search input.searchcheck") : S.$selection.off("keyup.search")
                }),
                this.$selection.on("keyup.search input.search", ".select2-search--inline", function(ae) {
                    var ge;
                    se && ae.type === "input" ? S.$selection.off("input.search input.searchcheck") : (ge = ae.which) != A.SHIFT && ge != A.CTRL && ge != A.ALT && ge != A.TAB && S.handleSearch(ae)
                })
            }
            ,
            C.prototype._transferTabIndex = function(x) {
                this.$search.attr("tabindex", this.$selection.attr("tabindex")),
                this.$selection.attr("tabindex", "-1")
            }
            ,
            C.prototype.createPlaceholder = function(x, g) {
                this.$search.attr("placeholder", g.text)
            }
            ,
            C.prototype.update = function(x, g) {
                var y = this.$search[0] == document.activeElement;
                this.$search.attr("placeholder", ""),
                x.call(this, g),
                this.resizeSearch(),
                y && this.$search.trigger("focus")
            }
            ,
            C.prototype.handleSearch = function() {
                var x;
                this.resizeSearch(),
                this._keyUpPrevented || (x = this.$search.val(),
                this.trigger("query", {
                    term: x
                })),
                this._keyUpPrevented = !1
            }
            ,
            C.prototype.searchRemoveChoice = function(x, g) {
                this.trigger("unselect", {
                    data: g
                }),
                this.$search.val(g.text),
                this.handleSearch()
            }
            ,
            C.prototype.resizeSearch = function() {
                this.$search.css("width", "25px");
                var x = "100%";
                this.$search.attr("placeholder") === "" && (x = .75 * (this.$search.val().length + 1) + "em"),
                this.$search.css("width", x)
            }
            ,
            C
        }),
        ne.define("select2/selection/selectionCss", ["../utils"], function(s) {
            function F() {}
            return F.prototype.render = function(x) {
                var C = x.call(this)
                  , x = this.options.get("selectionCssClass") || "";
                return x.indexOf(":all:") !== -1 && (x = x.replace(":all:", ""),
                s.copyNonInternalCssClasses(C[0], this.$element[0])),
                C.addClass(x),
                C
            }
            ,
            F
        }),
        ne.define("select2/selection/eventRelay", ["jquery"], function(s) {
            function F() {}
            return F.prototype.bind = function(A, C, x) {
                var g = this
                  , y = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"]
                  , S = ["opening", "closing", "selecting", "unselecting", "clearing"];
                A.call(this, C, x),
                C.on("*", function(Y, q) {
                    var G;
                    y.indexOf(Y) !== -1 && (q = q || {},
                    G = s.Event("select2:" + Y, {
                        params: q
                    }),
                    g.$element.trigger(G),
                    S.indexOf(Y) !== -1 && (q.prevented = G.isDefaultPrevented()))
                })
            }
            ,
            F
        }),
        ne.define("select2/translation", ["jquery", "require"], function(s, F) {
            function A(C) {
                this.dict = C || {}
            }
            return A.prototype.all = function() {
                return this.dict
            }
            ,
            A.prototype.get = function(C) {
                return this.dict[C]
            }
            ,
            A.prototype.extend = function(C) {
                this.dict = s.extend({}, C.all(), this.dict)
            }
            ,
            A._cache = {},
            A.loadPath = function(C) {
                var x;
                return C in A._cache || (x = F(C),
                A._cache[C] = x),
                new A(A._cache[C])
            }
            ,
            A
        }),
        ne.define("select2/diacritics", [], function() {
            return {
                "Ⓐ": "A",
                Ａ: "A",
                À: "A",
                Á: "A",
                Â: "A",
                Ầ: "A",
                Ấ: "A",
                Ẫ: "A",
                Ẩ: "A",
                Ã: "A",
                Ā: "A",
                Ă: "A",
                Ằ: "A",
                Ắ: "A",
                Ẵ: "A",
                Ẳ: "A",
                Ȧ: "A",
                Ǡ: "A",
                Ä: "A",
                Ǟ: "A",
                Ả: "A",
                Å: "A",
                Ǻ: "A",
                Ǎ: "A",
                Ȁ: "A",
                Ȃ: "A",
                Ạ: "A",
                Ậ: "A",
                Ặ: "A",
                Ḁ: "A",
                Ą: "A",
                "Ⱥ": "A",
                "Ɐ": "A",
                "Ꜳ": "AA",
                Æ: "AE",
                Ǽ: "AE",
                Ǣ: "AE",
                "Ꜵ": "AO",
                "Ꜷ": "AU",
                "Ꜹ": "AV",
                "Ꜻ": "AV",
                "Ꜽ": "AY",
                "Ⓑ": "B",
                Ｂ: "B",
                Ḃ: "B",
                Ḅ: "B",
                Ḇ: "B",
                "Ƀ": "B",
                Ƃ: "B",
                Ɓ: "B",
                "Ⓒ": "C",
                Ｃ: "C",
                Ć: "C",
                Ĉ: "C",
                Ċ: "C",
                Č: "C",
                Ç: "C",
                Ḉ: "C",
                Ƈ: "C",
                "Ȼ": "C",
                "Ꜿ": "C",
                "Ⓓ": "D",
                Ｄ: "D",
                Ḋ: "D",
                Ď: "D",
                Ḍ: "D",
                Ḑ: "D",
                Ḓ: "D",
                Ḏ: "D",
                Đ: "D",
                Ƌ: "D",
                Ɗ: "D",
                Ɖ: "D",
                "Ꝺ": "D",
                Ǳ: "DZ",
                Ǆ: "DZ",
                ǲ: "Dz",
                ǅ: "Dz",
                "Ⓔ": "E",
                Ｅ: "E",
                È: "E",
                É: "E",
                Ê: "E",
                Ề: "E",
                Ế: "E",
                Ễ: "E",
                Ể: "E",
                Ẽ: "E",
                Ē: "E",
                Ḕ: "E",
                Ḗ: "E",
                Ĕ: "E",
                Ė: "E",
                Ë: "E",
                Ẻ: "E",
                Ě: "E",
                Ȅ: "E",
                Ȇ: "E",
                Ẹ: "E",
                Ệ: "E",
                Ȩ: "E",
                Ḝ: "E",
                Ę: "E",
                Ḙ: "E",
                Ḛ: "E",
                Ɛ: "E",
                Ǝ: "E",
                "Ⓕ": "F",
                Ｆ: "F",
                Ḟ: "F",
                Ƒ: "F",
                "Ꝼ": "F",
                "Ⓖ": "G",
                Ｇ: "G",
                Ǵ: "G",
                Ĝ: "G",
                Ḡ: "G",
                Ğ: "G",
                Ġ: "G",
                Ǧ: "G",
                Ģ: "G",
                Ǥ: "G",
                Ɠ: "G",
                "Ꞡ": "G",
                "Ᵹ": "G",
                "Ꝿ": "G",
                "Ⓗ": "H",
                Ｈ: "H",
                Ĥ: "H",
                Ḣ: "H",
                Ḧ: "H",
                Ȟ: "H",
                Ḥ: "H",
                Ḩ: "H",
                Ḫ: "H",
                Ħ: "H",
                "Ⱨ": "H",
                "Ⱶ": "H",
                "Ɥ": "H",
                "Ⓘ": "I",
                Ｉ: "I",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ĩ: "I",
                Ī: "I",
                Ĭ: "I",
                İ: "I",
                Ï: "I",
                Ḯ: "I",
                Ỉ: "I",
                Ǐ: "I",
                Ȉ: "I",
                Ȋ: "I",
                Ị: "I",
                Į: "I",
                Ḭ: "I",
                Ɨ: "I",
                "Ⓙ": "J",
                Ｊ: "J",
                Ĵ: "J",
                "Ɉ": "J",
                "Ⓚ": "K",
                Ｋ: "K",
                Ḱ: "K",
                Ǩ: "K",
                Ḳ: "K",
                Ķ: "K",
                Ḵ: "K",
                Ƙ: "K",
                "Ⱪ": "K",
                "Ꝁ": "K",
                "Ꝃ": "K",
                "Ꝅ": "K",
                "Ꞣ": "K",
                "Ⓛ": "L",
                Ｌ: "L",
                Ŀ: "L",
                Ĺ: "L",
                Ľ: "L",
                Ḷ: "L",
                Ḹ: "L",
                Ļ: "L",
                Ḽ: "L",
                Ḻ: "L",
                Ł: "L",
                "Ƚ": "L",
                "Ɫ": "L",
                "Ⱡ": "L",
                "Ꝉ": "L",
                "Ꝇ": "L",
                "Ꞁ": "L",
                Ǉ: "LJ",
                ǈ: "Lj",
                "Ⓜ": "M",
                Ｍ: "M",
                Ḿ: "M",
                Ṁ: "M",
                Ṃ: "M",
                "Ɱ": "M",
                Ɯ: "M",
                "Ⓝ": "N",
                Ｎ: "N",
                Ǹ: "N",
                Ń: "N",
                Ñ: "N",
                Ṅ: "N",
                Ň: "N",
                Ṇ: "N",
                Ņ: "N",
                Ṋ: "N",
                Ṉ: "N",
                "Ƞ": "N",
                Ɲ: "N",
                "Ꞑ": "N",
                "Ꞥ": "N",
                Ǌ: "NJ",
                ǋ: "Nj",
                "Ⓞ": "O",
                Ｏ: "O",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Ồ: "O",
                Ố: "O",
                Ỗ: "O",
                Ổ: "O",
                Õ: "O",
                Ṍ: "O",
                Ȭ: "O",
                Ṏ: "O",
                Ō: "O",
                Ṑ: "O",
                Ṓ: "O",
                Ŏ: "O",
                Ȯ: "O",
                Ȱ: "O",
                Ö: "O",
                Ȫ: "O",
                Ỏ: "O",
                Ő: "O",
                Ǒ: "O",
                Ȍ: "O",
                Ȏ: "O",
                Ơ: "O",
                Ờ: "O",
                Ớ: "O",
                Ỡ: "O",
                Ở: "O",
                Ợ: "O",
                Ọ: "O",
                Ộ: "O",
                Ǫ: "O",
                Ǭ: "O",
                Ø: "O",
                Ǿ: "O",
                Ɔ: "O",
                Ɵ: "O",
                "Ꝋ": "O",
                "Ꝍ": "O",
                Œ: "OE",
                Ƣ: "OI",
                "Ꝏ": "OO",
                Ȣ: "OU",
                "Ⓟ": "P",
                Ｐ: "P",
                Ṕ: "P",
                Ṗ: "P",
                Ƥ: "P",
                "Ᵽ": "P",
                "Ꝑ": "P",
                "Ꝓ": "P",
                "Ꝕ": "P",
                "Ⓠ": "Q",
                Ｑ: "Q",
                "Ꝗ": "Q",
                "Ꝙ": "Q",
                "Ɋ": "Q",
                "Ⓡ": "R",
                Ｒ: "R",
                Ŕ: "R",
                Ṙ: "R",
                Ř: "R",
                Ȑ: "R",
                Ȓ: "R",
                Ṛ: "R",
                Ṝ: "R",
                Ŗ: "R",
                Ṟ: "R",
                "Ɍ": "R",
                "Ɽ": "R",
                "Ꝛ": "R",
                "Ꞧ": "R",
                "Ꞃ": "R",
                "Ⓢ": "S",
                Ｓ: "S",
                "ẞ": "S",
                Ś: "S",
                Ṥ: "S",
                Ŝ: "S",
                Ṡ: "S",
                Š: "S",
                Ṧ: "S",
                Ṣ: "S",
                Ṩ: "S",
                Ș: "S",
                Ş: "S",
                "Ȿ": "S",
                "Ꞩ": "S",
                "Ꞅ": "S",
                "Ⓣ": "T",
                Ｔ: "T",
                Ṫ: "T",
                Ť: "T",
                Ṭ: "T",
                Ț: "T",
                Ţ: "T",
                Ṱ: "T",
                Ṯ: "T",
                Ŧ: "T",
                Ƭ: "T",
                Ʈ: "T",
                "Ⱦ": "T",
                "Ꞇ": "T",
                "Ꜩ": "TZ",
                "Ⓤ": "U",
                Ｕ: "U",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ũ: "U",
                Ṹ: "U",
                Ū: "U",
                Ṻ: "U",
                Ŭ: "U",
                Ü: "U",
                Ǜ: "U",
                Ǘ: "U",
                Ǖ: "U",
                Ǚ: "U",
                Ủ: "U",
                Ů: "U",
                Ű: "U",
                Ǔ: "U",
                Ȕ: "U",
                Ȗ: "U",
                Ư: "U",
                Ừ: "U",
                Ứ: "U",
                Ữ: "U",
                Ử: "U",
                Ự: "U",
                Ụ: "U",
                Ṳ: "U",
                Ų: "U",
                Ṷ: "U",
                Ṵ: "U",
                "Ʉ": "U",
                "Ⓥ": "V",
                Ｖ: "V",
                Ṽ: "V",
                Ṿ: "V",
                Ʋ: "V",
                "Ꝟ": "V",
                "Ʌ": "V",
                "Ꝡ": "VY",
                "Ⓦ": "W",
                Ｗ: "W",
                Ẁ: "W",
                Ẃ: "W",
                Ŵ: "W",
                Ẇ: "W",
                Ẅ: "W",
                Ẉ: "W",
                "Ⱳ": "W",
                "Ⓧ": "X",
                Ｘ: "X",
                Ẋ: "X",
                Ẍ: "X",
                "Ⓨ": "Y",
                Ｙ: "Y",
                Ỳ: "Y",
                Ý: "Y",
                Ŷ: "Y",
                Ỹ: "Y",
                Ȳ: "Y",
                Ẏ: "Y",
                Ÿ: "Y",
                Ỷ: "Y",
                Ỵ: "Y",
                Ƴ: "Y",
                "Ɏ": "Y",
                "Ỿ": "Y",
                "Ⓩ": "Z",
                Ｚ: "Z",
                Ź: "Z",
                Ẑ: "Z",
                Ż: "Z",
                Ž: "Z",
                Ẓ: "Z",
                Ẕ: "Z",
                Ƶ: "Z",
                Ȥ: "Z",
                "Ɀ": "Z",
                "Ⱬ": "Z",
                "Ꝣ": "Z",
                "ⓐ": "a",
                ａ: "a",
                ẚ: "a",
                à: "a",
                á: "a",
                â: "a",
                ầ: "a",
                ấ: "a",
                ẫ: "a",
                ẩ: "a",
                ã: "a",
                ā: "a",
                ă: "a",
                ằ: "a",
                ắ: "a",
                ẵ: "a",
                ẳ: "a",
                ȧ: "a",
                ǡ: "a",
                ä: "a",
                ǟ: "a",
                ả: "a",
                å: "a",
                ǻ: "a",
                ǎ: "a",
                ȁ: "a",
                ȃ: "a",
                ạ: "a",
                ậ: "a",
                ặ: "a",
                ḁ: "a",
                ą: "a",
                "ⱥ": "a",
                ɐ: "a",
                "ꜳ": "aa",
                æ: "ae",
                ǽ: "ae",
                ǣ: "ae",
                "ꜵ": "ao",
                "ꜷ": "au",
                "ꜹ": "av",
                "ꜻ": "av",
                "ꜽ": "ay",
                "ⓑ": "b",
                ｂ: "b",
                ḃ: "b",
                ḅ: "b",
                ḇ: "b",
                ƀ: "b",
                ƃ: "b",
                ɓ: "b",
                "ⓒ": "c",
                ｃ: "c",
                ć: "c",
                ĉ: "c",
                ċ: "c",
                č: "c",
                ç: "c",
                ḉ: "c",
                ƈ: "c",
                "ȼ": "c",
                "ꜿ": "c",
                "ↄ": "c",
                "ⓓ": "d",
                ｄ: "d",
                ḋ: "d",
                ď: "d",
                ḍ: "d",
                ḑ: "d",
                ḓ: "d",
                ḏ: "d",
                đ: "d",
                ƌ: "d",
                ɖ: "d",
                ɗ: "d",
                "ꝺ": "d",
                ǳ: "dz",
                ǆ: "dz",
                "ⓔ": "e",
                ｅ: "e",
                è: "e",
                é: "e",
                ê: "e",
                ề: "e",
                ế: "e",
                ễ: "e",
                ể: "e",
                ẽ: "e",
                ē: "e",
                ḕ: "e",
                ḗ: "e",
                ĕ: "e",
                ė: "e",
                ë: "e",
                ẻ: "e",
                ě: "e",
                ȅ: "e",
                ȇ: "e",
                ẹ: "e",
                ệ: "e",
                ȩ: "e",
                ḝ: "e",
                ę: "e",
                ḙ: "e",
                ḛ: "e",
                "ɇ": "e",
                ɛ: "e",
                ǝ: "e",
                "ⓕ": "f",
                ｆ: "f",
                ḟ: "f",
                ƒ: "f",
                "ꝼ": "f",
                "ⓖ": "g",
                ｇ: "g",
                ǵ: "g",
                ĝ: "g",
                ḡ: "g",
                ğ: "g",
                ġ: "g",
                ǧ: "g",
                ģ: "g",
                ǥ: "g",
                ɠ: "g",
                "ꞡ": "g",
                "ᵹ": "g",
                "ꝿ": "g",
                "ⓗ": "h",
                ｈ: "h",
                ĥ: "h",
                ḣ: "h",
                ḧ: "h",
                ȟ: "h",
                ḥ: "h",
                ḩ: "h",
                ḫ: "h",
                ẖ: "h",
                ħ: "h",
                "ⱨ": "h",
                "ⱶ": "h",
                ɥ: "h",
                ƕ: "hv",
                "ⓘ": "i",
                ｉ: "i",
                ì: "i",
                í: "i",
                î: "i",
                ĩ: "i",
                ī: "i",
                ĭ: "i",
                ï: "i",
                ḯ: "i",
                ỉ: "i",
                ǐ: "i",
                ȉ: "i",
                ȋ: "i",
                ị: "i",
                į: "i",
                ḭ: "i",
                ɨ: "i",
                ı: "i",
                "ⓙ": "j",
                ｊ: "j",
                ĵ: "j",
                ǰ: "j",
                "ɉ": "j",
                "ⓚ": "k",
                ｋ: "k",
                ḱ: "k",
                ǩ: "k",
                ḳ: "k",
                ķ: "k",
                ḵ: "k",
                ƙ: "k",
                "ⱪ": "k",
                "ꝁ": "k",
                "ꝃ": "k",
                "ꝅ": "k",
                "ꞣ": "k",
                "ⓛ": "l",
                ｌ: "l",
                ŀ: "l",
                ĺ: "l",
                ľ: "l",
                ḷ: "l",
                ḹ: "l",
                ļ: "l",
                ḽ: "l",
                ḻ: "l",
                ſ: "l",
                ł: "l",
                ƚ: "l",
                ɫ: "l",
                "ⱡ": "l",
                "ꝉ": "l",
                "ꞁ": "l",
                "ꝇ": "l",
                ǉ: "lj",
                "ⓜ": "m",
                ｍ: "m",
                ḿ: "m",
                ṁ: "m",
                ṃ: "m",
                ɱ: "m",
                ɯ: "m",
                "ⓝ": "n",
                ｎ: "n",
                ǹ: "n",
                ń: "n",
                ñ: "n",
                ṅ: "n",
                ň: "n",
                ṇ: "n",
                ņ: "n",
                ṋ: "n",
                ṉ: "n",
                ƞ: "n",
                ɲ: "n",
                ŉ: "n",
                "ꞑ": "n",
                "ꞥ": "n",
                ǌ: "nj",
                "ⓞ": "o",
                ｏ: "o",
                ò: "o",
                ó: "o",
                ô: "o",
                ồ: "o",
                ố: "o",
                ỗ: "o",
                ổ: "o",
                õ: "o",
                ṍ: "o",
                ȭ: "o",
                ṏ: "o",
                ō: "o",
                ṑ: "o",
                ṓ: "o",
                ŏ: "o",
                ȯ: "o",
                ȱ: "o",
                ö: "o",
                ȫ: "o",
                ỏ: "o",
                ő: "o",
                ǒ: "o",
                ȍ: "o",
                ȏ: "o",
                ơ: "o",
                ờ: "o",
                ớ: "o",
                ỡ: "o",
                ở: "o",
                ợ: "o",
                ọ: "o",
                ộ: "o",
                ǫ: "o",
                ǭ: "o",
                ø: "o",
                ǿ: "o",
                ɔ: "o",
                "ꝋ": "o",
                "ꝍ": "o",
                ɵ: "o",
                œ: "oe",
                ƣ: "oi",
                ȣ: "ou",
                "ꝏ": "oo",
                "ⓟ": "p",
                ｐ: "p",
                ṕ: "p",
                ṗ: "p",
                ƥ: "p",
                "ᵽ": "p",
                "ꝑ": "p",
                "ꝓ": "p",
                "ꝕ": "p",
                "ⓠ": "q",
                ｑ: "q",
                "ɋ": "q",
                "ꝗ": "q",
                "ꝙ": "q",
                "ⓡ": "r",
                ｒ: "r",
                ŕ: "r",
                ṙ: "r",
                ř: "r",
                ȑ: "r",
                ȓ: "r",
                ṛ: "r",
                ṝ: "r",
                ŗ: "r",
                ṟ: "r",
                "ɍ": "r",
                ɽ: "r",
                "ꝛ": "r",
                "ꞧ": "r",
                "ꞃ": "r",
                "ⓢ": "s",
                ｓ: "s",
                ß: "s",
                ś: "s",
                ṥ: "s",
                ŝ: "s",
                ṡ: "s",
                š: "s",
                ṧ: "s",
                ṣ: "s",
                ṩ: "s",
                ș: "s",
                ş: "s",
                "ȿ": "s",
                "ꞩ": "s",
                "ꞅ": "s",
                ẛ: "s",
                "ⓣ": "t",
                ｔ: "t",
                ṫ: "t",
                ẗ: "t",
                ť: "t",
                ṭ: "t",
                ț: "t",
                ţ: "t",
                ṱ: "t",
                ṯ: "t",
                ŧ: "t",
                ƭ: "t",
                ʈ: "t",
                "ⱦ": "t",
                "ꞇ": "t",
                "ꜩ": "tz",
                "ⓤ": "u",
                ｕ: "u",
                ù: "u",
                ú: "u",
                û: "u",
                ũ: "u",
                ṹ: "u",
                ū: "u",
                ṻ: "u",
                ŭ: "u",
                ü: "u",
                ǜ: "u",
                ǘ: "u",
                ǖ: "u",
                ǚ: "u",
                ủ: "u",
                ů: "u",
                ű: "u",
                ǔ: "u",
                ȕ: "u",
                ȗ: "u",
                ư: "u",
                ừ: "u",
                ứ: "u",
                ữ: "u",
                ử: "u",
                ự: "u",
                ụ: "u",
                ṳ: "u",
                ų: "u",
                ṷ: "u",
                ṵ: "u",
                ʉ: "u",
                "ⓥ": "v",
                ｖ: "v",
                ṽ: "v",
                ṿ: "v",
                ʋ: "v",
                "ꝟ": "v",
                ʌ: "v",
                "ꝡ": "vy",
                "ⓦ": "w",
                ｗ: "w",
                ẁ: "w",
                ẃ: "w",
                ŵ: "w",
                ẇ: "w",
                ẅ: "w",
                ẘ: "w",
                ẉ: "w",
                "ⱳ": "w",
                "ⓧ": "x",
                ｘ: "x",
                ẋ: "x",
                ẍ: "x",
                "ⓨ": "y",
                ｙ: "y",
                ỳ: "y",
                ý: "y",
                ŷ: "y",
                ỹ: "y",
                ȳ: "y",
                ẏ: "y",
                ÿ: "y",
                ỷ: "y",
                ẙ: "y",
                ỵ: "y",
                ƴ: "y",
                "ɏ": "y",
                "ỿ": "y",
                "ⓩ": "z",
                ｚ: "z",
                ź: "z",
                ẑ: "z",
                ż: "z",
                ž: "z",
                ẓ: "z",
                ẕ: "z",
                ƶ: "z",
                ȥ: "z",
                "ɀ": "z",
                "ⱬ": "z",
                "ꝣ": "z",
                Ά: "Α",
                Έ: "Ε",
                Ή: "Η",
                Ί: "Ι",
                Ϊ: "Ι",
                Ό: "Ο",
                Ύ: "Υ",
                Ϋ: "Υ",
                Ώ: "Ω",
                ά: "α",
                έ: "ε",
                ή: "η",
                ί: "ι",
                ϊ: "ι",
                ΐ: "ι",
                ό: "ο",
                ύ: "υ",
                ϋ: "υ",
                ΰ: "υ",
                ώ: "ω",
                ς: "σ",
                "’": "'"
            }
        }),
        ne.define("select2/data/base", ["../utils"], function(s) {
            function F(A, C) {
                F.__super__.constructor.call(this)
            }
            return s.Extend(F, s.Observable),
            F.prototype.current = function(A) {
                throw new Error("The `current` method must be defined in child classes.")
            }
            ,
            F.prototype.query = function(A, C) {
                throw new Error("The `query` method must be defined in child classes.")
            }
            ,
            F.prototype.bind = function(A, C) {}
            ,
            F.prototype.destroy = function() {}
            ,
            F.prototype.generateResultId = function(A, C) {
                return A = A.id + "-result-",
                A += s.generateChars(4),
                C.id != null ? A += "-" + C.id.toString() : A += "-" + s.generateChars(4),
                A
            }
            ,
            F
        }),
        ne.define("select2/data/select", ["./base", "../utils", "jquery"], function(s, F, A) {
            function C(x, g) {
                this.$element = x,
                this.options = g,
                C.__super__.constructor.call(this)
            }
            return F.Extend(C, s),
            C.prototype.current = function(x) {
                var g = this;
                x(Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"), function(y) {
                    return g.item(A(y))
                }))
            }
            ,
            C.prototype.select = function(x) {
                var g, y = this;
                if (x.selected = !0,
                x.element != null && x.element.tagName.toLowerCase() === "option")
                    return x.element.selected = !0,
                    void this.$element.trigger("input").trigger("change");
                this.$element.prop("multiple") ? this.current(function(S) {
                    var Y = [];
                    (x = [x]).push.apply(x, S);
                    for (var q = 0; q < x.length; q++) {
                        var G = x[q].id;
                        Y.indexOf(G) === -1 && Y.push(G)
                    }
                    y.$element.val(Y),
                    y.$element.trigger("input").trigger("change")
                }) : (g = x.id,
                this.$element.val(g),
                this.$element.trigger("input").trigger("change"))
            }
            ,
            C.prototype.unselect = function(x) {
                var g = this;
                if (this.$element.prop("multiple")) {
                    if (x.selected = !1,
                    x.element != null && x.element.tagName.toLowerCase() === "option")
                        return x.element.selected = !1,
                        void this.$element.trigger("input").trigger("change");
                    this.current(function(y) {
                        for (var S = [], Y = 0; Y < y.length; Y++) {
                            var q = y[Y].id;
                            q !== x.id && S.indexOf(q) === -1 && S.push(q)
                        }
                        g.$element.val(S),
                        g.$element.trigger("input").trigger("change")
                    })
                }
            }
            ,
            C.prototype.bind = function(x, g) {
                var y = this;
                (this.container = x).on("select", function(S) {
                    y.select(S.data)
                }),
                x.on("unselect", function(S) {
                    y.unselect(S.data)
                })
            }
            ,
            C.prototype.destroy = function() {
                this.$element.find("*").each(function() {
                    F.RemoveData(this)
                })
            }
            ,
            C.prototype.query = function(x, g) {
                var y = []
                  , S = this;
                this.$element.children().each(function() {
                    var Y;
                    this.tagName.toLowerCase() !== "option" && this.tagName.toLowerCase() !== "optgroup" || (Y = A(this),
                    Y = S.item(Y),
                    (Y = S.matches(x, Y)) !== null && y.push(Y))
                }),
                g({
                    results: y
                })
            }
            ,
            C.prototype.addOptions = function(x) {
                this.$element.append(x)
            }
            ,
            C.prototype.option = function(x) {
                var g;
                return x.children ? (g = document.createElement("optgroup")).label = x.text : (g = document.createElement("option")).textContent !== void 0 ? g.textContent = x.text : g.innerText = x.text,
                x.id !== void 0 && (g.value = x.id),
                x.disabled && (g.disabled = !0),
                x.selected && (g.selected = !0),
                x.title && (g.title = x.title),
                x = this._normalizeItem(x),
                x.element = g,
                F.StoreData(g, "data", x),
                A(g)
            }
            ,
            C.prototype.item = function(x) {
                var g = {};
                if ((g = F.GetData(x[0], "data")) != null)
                    return g;
                var y = x[0];
                if (y.tagName.toLowerCase() === "option")
                    g = {
                        id: x.val(),
                        text: x.text(),
                        disabled: x.prop("disabled"),
                        selected: x.prop("selected"),
                        title: x.prop("title")
                    };
                else if (y.tagName.toLowerCase() === "optgroup") {
                    g = {
                        text: x.prop("label"),
                        children: [],
                        title: x.prop("title")
                    };
                    for (var S = x.children("option"), Y = [], q = 0; q < S.length; q++) {
                        var G = A(S[q])
                          , G = this.item(G);
                        Y.push(G)
                    }
                    g.children = Y
                }
                return (g = this._normalizeItem(g)).element = x[0],
                F.StoreData(x[0], "data", g),
                g
            }
            ,
            C.prototype._normalizeItem = function(x) {
                return x !== Object(x) && (x = {
                    id: x,
                    text: x
                }),
                (x = A.extend({}, {
                    text: ""
                }, x)).id != null && (x.id = x.id.toString()),
                x.text != null && (x.text = x.text.toString()),
                x._resultId == null && x.id && this.container != null && (x._resultId = this.generateResultId(this.container, x)),
                A.extend({}, {
                    selected: !1,
                    disabled: !1
                }, x)
            }
            ,
            C.prototype.matches = function(x, g) {
                return this.options.get("matcher")(x, g)
            }
            ,
            C
        }),
        ne.define("select2/data/array", ["./select", "../utils", "jquery"], function(s, F, A) {
            function C(x, g) {
                this._dataToConvert = g.get("data") || [],
                C.__super__.constructor.call(this, x, g)
            }
            return F.Extend(C, s),
            C.prototype.bind = function(x, g) {
                C.__super__.bind.call(this, x, g),
                this.addOptions(this.convertToOptions(this._dataToConvert))
            }
            ,
            C.prototype.select = function(x) {
                var g = this.$element.find("option").filter(function(y, S) {
                    return S.value == x.id.toString()
                });
                g.length === 0 && (g = this.option(x),
                this.addOptions(g)),
                C.__super__.select.call(this, x)
            }
            ,
            C.prototype.convertToOptions = function(x) {
                for (var g = this, y = this.$element.find("option"), S = y.map(function() {
                    return g.item(A(this)).id
                }).get(), Y = [], q = 0; q < x.length; q++) {
                    var G, se, ae = this._normalizeItem(x[q]);
                    0 <= S.indexOf(ae.id) ? (G = y.filter(function(ge) {
                        return function() {
                            return A(this).val() == ge.id
                        }
                    }(ae)),
                    se = this.item(G),
                    se = A.extend(!0, {}, ae, se),
                    se = this.option(se),
                    G.replaceWith(se)) : (se = this.option(ae),
                    ae.children && (ae = this.convertToOptions(ae.children),
                    se.append(ae)),
                    Y.push(se))
                }
                return Y
            }
            ,
            C
        }),
        ne.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(s, F, A) {
            function C(x, g) {
                this.ajaxOptions = this._applyDefaults(g.get("ajax")),
                this.ajaxOptions.processResults != null && (this.processResults = this.ajaxOptions.processResults),
                C.__super__.constructor.call(this, x, g)
            }
            return F.Extend(C, s),
            C.prototype._applyDefaults = function(x) {
                var g = {
                    data: function(y) {
                        return A.extend({}, y, {
                            q: y.term
                        })
                    },
                    transport: function(y, S, Y) {
                        return y = A.ajax(y),
                        y.then(S),
                        y.fail(Y),
                        y
                    }
                };
                return A.extend({}, g, x, !0)
            }
            ,
            C.prototype.processResults = function(x) {
                return x
            }
            ,
            C.prototype.query = function(x, g) {
                var y = this;
                this._request != null && (typeof this._request.abort == "function" && this._request.abort(),
                this._request = null);
                var S = A.extend({
                    type: "GET"
                }, this.ajaxOptions);
                function Y() {
                    var q = S.transport(S, function(G) {
                        G = y.processResults(G, x),
                        y.options.get("debug") && window.console && console.error && (G && G.results && Array.isArray(G.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),
                        g(G)
                    }, function() {
                        "status"in q && (q.status === 0 || q.status === "0") || y.trigger("results:message", {
                            message: "errorLoading"
                        })
                    });
                    y._request = q
                }
                typeof S.url == "function" && (S.url = S.url.call(this.$element, x)),
                typeof S.data == "function" && (S.data = S.data.call(this.$element, x)),
                this.ajaxOptions.delay && x.term != null ? (this._queryTimeout && window.clearTimeout(this._queryTimeout),
                this._queryTimeout = window.setTimeout(Y, this.ajaxOptions.delay)) : Y()
            }
            ,
            C
        }),
        ne.define("select2/data/tags", ["jquery"], function(s) {
            function F(A, C, x) {
                var g = x.get("tags")
                  , y = x.get("createTag");
                if (y !== void 0 && (this.createTag = y),
                y = x.get("insertTag"),
                y !== void 0 && (this.insertTag = y),
                A.call(this, C, x),
                Array.isArray(g))
                    for (var S = 0; S < g.length; S++) {
                        var Y = g[S]
                          , Y = this._normalizeItem(Y)
                          , Y = this.option(Y);
                        this.$element.append(Y)
                    }
            }
            return F.prototype.query = function(A, C, x) {
                var g = this;
                this._removeOldTags(),
                C.term != null && C.page == null ? A.call(this, C, function y(S, Y) {
                    for (var q = S.results, G = 0; G < q.length; G++) {
                        var se = q[G]
                          , ae = se.children != null && !y({
                            results: se.children
                        }, !0);
                        if ((se.text || "").toUpperCase() === (C.term || "").toUpperCase() || ae)
                            return !Y && (S.data = q,
                            void x(S))
                    }
                    if (Y)
                        return !0;
                    var ge, Te = g.createTag(C);
                    Te != null && ((ge = g.option(Te)).attr("data-select2-tag", "true"),
                    g.addOptions([ge]),
                    g.insertTag(q, Te)),
                    S.results = q,
                    x(S)
                }) : A.call(this, C, x)
            }
            ,
            F.prototype.createTag = function(A, C) {
                return C.term == null ? null : (C = C.term.trim(),
                C === "" ? null : {
                    id: C,
                    text: C
                })
            }
            ,
            F.prototype.insertTag = function(A, C, x) {
                C.unshift(x)
            }
            ,
            F.prototype._removeOldTags = function(A) {
                this.$element.find("option[data-select2-tag]").each(function() {
                    this.selected || s(this).remove()
                })
            }
            ,
            F
        }),
        ne.define("select2/data/tokenizer", ["jquery"], function(s) {
            function F(A, C, x) {
                var g = x.get("tokenizer");
                g !== void 0 && (this.tokenizer = g),
                A.call(this, C, x)
            }
            return F.prototype.bind = function(A, C, x) {
                A.call(this, C, x),
                this.$search = C.dropdown.$search || C.selection.$search || x.find(".select2-search__field")
            }
            ,
            F.prototype.query = function(A, C, x) {
                var g = this;
                C.term = C.term || "";
                var y = this.tokenizer(C, this.options, function(S) {
                    var Y, q = g._normalizeItem(S);
                    g.$element.find("option").filter(function() {
                        return s(this).val() === q.id
                    }).length || ((Y = g.option(q)).attr("data-select2-tag", !0),
                    g._removeOldTags(),
                    g.addOptions([Y])),
                    Y = q,
                    g.trigger("select", {
                        data: Y
                    })
                });
                y.term !== C.term && (this.$search.length && (this.$search.val(y.term),
                this.$search.trigger("focus")),
                C.term = y.term),
                A.call(this, C, x)
            }
            ,
            F.prototype.tokenizer = function(A, C, x, g) {
                for (var y = x.get("tokenSeparators") || [], S = C.term, Y = 0, q = this.createTag || function(se) {
                    return {
                        id: se.term,
                        text: se.term
                    }
                }
                ; Y < S.length; ) {
                    var G = S[Y];
                    y.indexOf(G) !== -1 ? (G = S.substr(0, Y),
                    (G = q(s.extend({}, C, {
                        term: G
                    }))) != null ? (g(G),
                    S = S.substr(Y + 1) || "",
                    Y = 0) : Y++) : Y++
                }
                return {
                    term: S
                }
            }
            ,
            F
        }),
        ne.define("select2/data/minimumInputLength", [], function() {
            function s(F, A, C) {
                this.minimumInputLength = C.get("minimumInputLength"),
                F.call(this, A, C)
            }
            return s.prototype.query = function(F, A, C) {
                A.term = A.term || "",
                A.term.length < this.minimumInputLength ? this.trigger("results:message", {
                    message: "inputTooShort",
                    args: {
                        minimum: this.minimumInputLength,
                        input: A.term,
                        params: A
                    }
                }) : F.call(this, A, C)
            }
            ,
            s
        }),
        ne.define("select2/data/maximumInputLength", [], function() {
            function s(F, A, C) {
                this.maximumInputLength = C.get("maximumInputLength"),
                F.call(this, A, C)
            }
            return s.prototype.query = function(F, A, C) {
                A.term = A.term || "",
                0 < this.maximumInputLength && A.term.length > this.maximumInputLength ? this.trigger("results:message", {
                    message: "inputTooLong",
                    args: {
                        maximum: this.maximumInputLength,
                        input: A.term,
                        params: A
                    }
                }) : F.call(this, A, C)
            }
            ,
            s
        }),
        ne.define("select2/data/maximumSelectionLength", [], function() {
            function s(F, A, C) {
                this.maximumSelectionLength = C.get("maximumSelectionLength"),
                F.call(this, A, C)
            }
            return s.prototype.bind = function(F, A, C) {
                var x = this;
                F.call(this, A, C),
                A.on("select", function() {
                    x._checkIfMaximumSelected()
                })
            }
            ,
            s.prototype.query = function(F, A, C) {
                var x = this;
                this._checkIfMaximumSelected(function() {
                    F.call(x, A, C)
                })
            }
            ,
            s.prototype._checkIfMaximumSelected = function(F, A) {
                var C = this;
                this.current(function(x) {
                    x = x != null ? x.length : 0,
                    0 < C.maximumSelectionLength && x >= C.maximumSelectionLength ? C.trigger("results:message", {
                        message: "maximumSelected",
                        args: {
                            maximum: C.maximumSelectionLength
                        }
                    }) : A && A()
                })
            }
            ,
            s
        }),
        ne.define("select2/dropdown", ["jquery", "./utils"], function(s, F) {
            function A(C, x) {
                this.$element = C,
                this.options = x,
                A.__super__.constructor.call(this)
            }
            return F.Extend(A, F.Observable),
            A.prototype.render = function() {
                var C = s('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                return C.attr("dir", this.options.get("dir")),
                this.$dropdown = C
            }
            ,
            A.prototype.bind = function() {}
            ,
            A.prototype.position = function(C, x) {}
            ,
            A.prototype.destroy = function() {
                this.$dropdown.remove()
            }
            ,
            A
        }),
        ne.define("select2/dropdown/search", ["jquery"], function(s) {
            function F() {}
            return F.prototype.render = function(g) {
                var C = g.call(this)
                  , x = this.options.get("translations").get("search")
                  , g = s('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');
                return this.$searchContainer = g,
                this.$search = g.find("input"),
                this.$search.prop("autocomplete", this.options.get("autocomplete")),
                this.$search.attr("aria-label", x()),
                C.prepend(g),
                C
            }
            ,
            F.prototype.bind = function(A, C, x) {
                var g = this
                  , y = C.id + "-results";
                A.call(this, C, x),
                this.$search.on("keydown", function(S) {
                    g.trigger("keypress", S),
                    g._keyUpPrevented = S.isDefaultPrevented()
                }),
                this.$search.on("input", function(S) {
                    s(this).off("keyup")
                }),
                this.$search.on("keyup input", function(S) {
                    g.handleSearch(S)
                }),
                C.on("open", function() {
                    g.$search.attr("tabindex", 0),
                    g.$search.attr("aria-controls", y),
                    g.$search.trigger("focus"),
                    window.setTimeout(function() {
                        g.$search.trigger("focus")
                    }, 0)
                }),
                C.on("close", function() {
                    g.$search.attr("tabindex", -1),
                    g.$search.removeAttr("aria-controls"),
                    g.$search.removeAttr("aria-activedescendant"),
                    g.$search.val(""),
                    g.$search.trigger("blur")
                }),
                C.on("focus", function() {
                    C.isOpen() || g.$search.trigger("focus")
                }),
                C.on("results:all", function(S) {
                    S.query.term != null && S.query.term !== "" || (g.showSearch(S) ? g.$searchContainer[0].classList.remove("select2-search--hide") : g.$searchContainer[0].classList.add("select2-search--hide"))
                }),
                C.on("results:focus", function(S) {
                    S.data._resultId ? g.$search.attr("aria-activedescendant", S.data._resultId) : g.$search.removeAttr("aria-activedescendant")
                })
            }
            ,
            F.prototype.handleSearch = function(A) {
                var C;
                this._keyUpPrevented || (C = this.$search.val(),
                this.trigger("query", {
                    term: C
                })),
                this._keyUpPrevented = !1
            }
            ,
            F.prototype.showSearch = function(A, C) {
                return !0
            }
            ,
            F
        }),
        ne.define("select2/dropdown/hidePlaceholder", [], function() {
            function s(F, A, C, x) {
                this.placeholder = this.normalizePlaceholder(C.get("placeholder")),
                F.call(this, A, C, x)
            }
            return s.prototype.append = function(F, A) {
                A.results = this.removePlaceholder(A.results),
                F.call(this, A)
            }
            ,
            s.prototype.normalizePlaceholder = function(F, A) {
                return A = typeof A == "string" ? {
                    id: "",
                    text: A
                } : A
            }
            ,
            s.prototype.removePlaceholder = function(F, A) {
                for (var C = A.slice(0), x = A.length - 1; 0 <= x; x--) {
                    var g = A[x];
                    this.placeholder.id === g.id && C.splice(x, 1)
                }
                return C
            }
            ,
            s
        }),
        ne.define("select2/dropdown/infiniteScroll", ["jquery"], function(s) {
            function F(A, C, x, g) {
                this.lastParams = {},
                A.call(this, C, x, g),
                this.$loadingMore = this.createLoadingMore(),
                this.loading = !1
            }
            return F.prototype.append = function(A, C) {
                this.$loadingMore.remove(),
                this.loading = !1,
                A.call(this, C),
                this.showLoadingMore(C) && (this.$results.append(this.$loadingMore),
                this.loadMoreIfNeeded())
            }
            ,
            F.prototype.bind = function(A, C, x) {
                var g = this;
                A.call(this, C, x),
                C.on("query", function(y) {
                    g.lastParams = y,
                    g.loading = !0
                }),
                C.on("query:append", function(y) {
                    g.lastParams = y,
                    g.loading = !0
                }),
                this.$results.on("scroll", this.loadMoreIfNeeded.bind(this))
            }
            ,
            F.prototype.loadMoreIfNeeded = function() {
                var A = s.contains(document.documentElement, this.$loadingMore[0]);
                !this.loading && A && (A = this.$results.offset().top + this.$results.outerHeight(!1),
                this.$loadingMore.offset().top + this.$loadingMore.outerHeight(!1) <= A + 50 && this.loadMore())
            }
            ,
            F.prototype.loadMore = function() {
                this.loading = !0;
                var A = s.extend({}, {
                    page: 1
                }, this.lastParams);
                A.page++,
                this.trigger("query:append", A)
            }
            ,
            F.prototype.showLoadingMore = function(A, C) {
                return C.pagination && C.pagination.more
            }
            ,
            F.prototype.createLoadingMore = function() {
                var A = s('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>')
                  , C = this.options.get("translations").get("loadingMore");
                return A.html(C(this.lastParams)),
                A
            }
            ,
            F
        }),
        ne.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(s, F) {
            function A(C, x, g) {
                this.$dropdownParent = s(g.get("dropdownParent") || document.body),
                C.call(this, x, g)
            }
            return A.prototype.bind = function(C, x, g) {
                var y = this;
                C.call(this, x, g),
                x.on("open", function() {
                    y._showDropdown(),
                    y._attachPositioningHandler(x),
                    y._bindContainerResultHandlers(x)
                }),
                x.on("close", function() {
                    y._hideDropdown(),
                    y._detachPositioningHandler(x)
                }),
                this.$dropdownContainer.on("mousedown", function(S) {
                    S.stopPropagation()
                })
            }
            ,
            A.prototype.destroy = function(C) {
                C.call(this),
                this.$dropdownContainer.remove()
            }
            ,
            A.prototype.position = function(C, x, g) {
                x.attr("class", g.attr("class")),
                x[0].classList.remove("select2"),
                x[0].classList.add("select2-container--open"),
                x.css({
                    position: "absolute",
                    top: -999999
                }),
                this.$container = g
            }
            ,
            A.prototype.render = function(g) {
                var x = s("<span></span>")
                  , g = g.call(this);
                return x.append(g),
                this.$dropdownContainer = x
            }
            ,
            A.prototype._hideDropdown = function(C) {
                this.$dropdownContainer.detach()
            }
            ,
            A.prototype._bindContainerResultHandlers = function(C, x) {
                var g;
                this._containerResultsHandlersBound || (g = this,
                x.on("results:all", function() {
                    g._positionDropdown(),
                    g._resizeDropdown()
                }),
                x.on("results:append", function() {
                    g._positionDropdown(),
                    g._resizeDropdown()
                }),
                x.on("results:message", function() {
                    g._positionDropdown(),
                    g._resizeDropdown()
                }),
                x.on("select", function() {
                    g._positionDropdown(),
                    g._resizeDropdown()
                }),
                x.on("unselect", function() {
                    g._positionDropdown(),
                    g._resizeDropdown()
                }),
                this._containerResultsHandlersBound = !0)
            }
            ,
            A.prototype._attachPositioningHandler = function(C, q) {
                var g = this
                  , y = "scroll.select2." + q.id
                  , S = "resize.select2." + q.id
                  , Y = "orientationchange.select2." + q.id
                  , q = this.$container.parents().filter(F.hasScroll);
                q.each(function() {
                    F.StoreData(this, "select2-scroll-position", {
                        x: s(this).scrollLeft(),
                        y: s(this).scrollTop()
                    })
                }),
                q.on(y, function(G) {
                    var se = F.GetData(this, "select2-scroll-position");
                    s(this).scrollTop(se.y)
                }),
                s(window).on(y + " " + S + " " + Y, function(G) {
                    g._positionDropdown(),
                    g._resizeDropdown()
                })
            }
            ,
            A.prototype._detachPositioningHandler = function(C, S) {
                var g = "scroll.select2." + S.id
                  , y = "resize.select2." + S.id
                  , S = "orientationchange.select2." + S.id;
                this.$container.parents().filter(F.hasScroll).off(g),
                s(window).off(g + " " + y + " " + S)
            }
            ,
            A.prototype._positionDropdown = function() {
                var G = s(window)
                  , C = this.$dropdown[0].classList.contains("select2-dropdown--above")
                  , x = this.$dropdown[0].classList.contains("select2-dropdown--below")
                  , g = null
                  , y = this.$container.offset();
                y.bottom = y.top + this.$container.outerHeight(!1);
                var S = {
                    height: this.$container.outerHeight(!1)
                };
                S.top = y.top,
                S.bottom = y.top + S.height;
                var Y = this.$dropdown.outerHeight(!1)
                  , se = G.scrollTop()
                  , ae = G.scrollTop() + G.height()
                  , q = se < y.top - Y
                  , G = ae > y.bottom + Y
                  , se = {
                    left: y.left,
                    top: S.bottom
                }
                  , ae = this.$dropdownParent;
                ae.css("position") === "static" && (ae = ae.offsetParent()),
                y = {
                    top: 0,
                    left: 0
                },
                (s.contains(document.body, ae[0]) || ae[0].isConnected) && (y = ae.offset()),
                se.top -= y.top,
                se.left -= y.left,
                C || x || (g = "below"),
                G || !q || C ? !q && G && C && (g = "below") : g = "above",
                (g == "above" || C && g !== "below") && (se.top = S.top - y.top - Y),
                g != null && (this.$dropdown[0].classList.remove("select2-dropdown--below"),
                this.$dropdown[0].classList.remove("select2-dropdown--above"),
                this.$dropdown[0].classList.add("select2-dropdown--" + g),
                this.$container[0].classList.remove("select2-container--below"),
                this.$container[0].classList.remove("select2-container--above"),
                this.$container[0].classList.add("select2-container--" + g)),
                this.$dropdownContainer.css(se)
            }
            ,
            A.prototype._resizeDropdown = function() {
                var C = {
                    width: this.$container.outerWidth(!1) + "px"
                };
                this.options.get("dropdownAutoWidth") && (C.minWidth = C.width,
                C.position = "relative",
                C.width = "auto"),
                this.$dropdown.css(C)
            }
            ,
            A.prototype._showDropdown = function(C) {
                this.$dropdownContainer.appendTo(this.$dropdownParent),
                this._positionDropdown(),
                this._resizeDropdown()
            }
            ,
            A
        }),
        ne.define("select2/dropdown/minimumResultsForSearch", [], function() {
            function s(F, A, C, x) {
                this.minimumResultsForSearch = C.get("minimumResultsForSearch"),
                this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0),
                F.call(this, A, C, x)
            }
            return s.prototype.showSearch = function(F, A) {
                return !(function C(x) {
                    for (var g = 0, y = 0; y < x.length; y++) {
                        var S = x[y];
                        S.children ? g += C(S.children) : g++
                    }
                    return g
                }(A.data.results) < this.minimumResultsForSearch) && F.call(this, A)
            }
            ,
            s
        }),
        ne.define("select2/dropdown/selectOnClose", ["../utils"], function(s) {
            function F() {}
            return F.prototype.bind = function(A, C, x) {
                var g = this;
                A.call(this, C, x),
                C.on("close", function(y) {
                    g._handleSelectOnClose(y)
                })
            }
            ,
            F.prototype._handleSelectOnClose = function(A, C) {
                if (C && C.originalSelect2Event != null) {
                    var x = C.originalSelect2Event;
                    if (x._type === "select" || x._type === "unselect")
                        return
                }
                x = this.getHighlightedResults(),
                x.length < 1 || (x = s.GetData(x[0], "data")).element != null && x.element.selected || x.element == null && x.selected || this.trigger("select", {
                    data: x
                })
            }
            ,
            F
        }),
        ne.define("select2/dropdown/closeOnSelect", [], function() {
            function s() {}
            return s.prototype.bind = function(F, A, C) {
                var x = this;
                F.call(this, A, C),
                A.on("select", function(g) {
                    x._selectTriggered(g)
                }),
                A.on("unselect", function(g) {
                    x._selectTriggered(g)
                })
            }
            ,
            s.prototype._selectTriggered = function(F, A) {
                var C = A.originalEvent;
                C && (C.ctrlKey || C.metaKey) || this.trigger("close", {
                    originalEvent: C,
                    originalSelect2Event: A
                })
            }
            ,
            s
        }),
        ne.define("select2/dropdown/dropdownCss", ["../utils"], function(s) {
            function F() {}
            return F.prototype.render = function(x) {
                var C = x.call(this)
                  , x = this.options.get("dropdownCssClass") || "";
                return x.indexOf(":all:") !== -1 && (x = x.replace(":all:", ""),
                s.copyNonInternalCssClasses(C[0], this.$element[0])),
                C.addClass(x),
                C
            }
            ,
            F
        }),
        ne.define("select2/dropdown/tagsSearchHighlight", ["../utils"], function(s) {
            function F() {}
            return F.prototype.highlightFirstItem = function(A) {
                var C = this.$results.find(".select2-results__option--selectable:not(.select2-results__option--selected)");
                if (0 < C.length) {
                    var x = C.first()
                      , C = s.GetData(x[0], "data").element;
                    if (C && C.getAttribute && C.getAttribute("data-select2-tag") === "true")
                        return void x.trigger("mouseenter")
                }
                A.call(this)
            }
            ,
            F
        }),
        ne.define("select2/i18n/en", [], function() {
            return {
                errorLoading: function() {
                    return "The results could not be loaded."
                },
                inputTooLong: function(A) {
                    var F = A.input.length - A.maximum
                      , A = "Please delete " + F + " character";
                    return F != 1 && (A += "s"),
                    A
                },
                inputTooShort: function(s) {
                    return "Please enter " + (s.minimum - s.input.length) + " or more characters"
                },
                loadingMore: function() {
                    return "Loading more results…"
                },
                maximumSelected: function(s) {
                    var F = "You can only select " + s.maximum + " item";
                    return s.maximum != 1 && (F += "s"),
                    F
                },
                noResults: function() {
                    return "No results found"
                },
                searching: function() {
                    return "Searching…"
                },
                removeAllItems: function() {
                    return "Remove all items"
                },
                removeItem: function() {
                    return "Remove item"
                },
                search: function() {
                    return "Search"
                }
            }
        }),
        ne.define("select2/defaults", ["jquery", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/selectionCss", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./dropdown/dropdownCss", "./dropdown/tagsSearchHighlight", "./i18n/en"], function(s, F, A, C, x, g, y, S, Y, q, G, se, ae, ge, Te, X, ve, Ee, re, We, Re, at, pt, dt, yi, qt, oi, Fi, tn, _i, bi) {
            function nt() {
                this.reset()
            }
            return nt.prototype.apply = function(ie) {
                var Xe;
                (ie = s.extend(!0, {}, this.defaults, ie)).dataAdapter == null && (ie.ajax != null ? ie.dataAdapter = Te : ie.data != null ? ie.dataAdapter = ge : ie.dataAdapter = ae,
                0 < ie.minimumInputLength && (ie.dataAdapter = q.Decorate(ie.dataAdapter, Ee)),
                0 < ie.maximumInputLength && (ie.dataAdapter = q.Decorate(ie.dataAdapter, re)),
                0 < ie.maximumSelectionLength && (ie.dataAdapter = q.Decorate(ie.dataAdapter, We)),
                ie.tags && (ie.dataAdapter = q.Decorate(ie.dataAdapter, X)),
                ie.tokenSeparators == null && ie.tokenizer == null || (ie.dataAdapter = q.Decorate(ie.dataAdapter, ve))),
                ie.resultsAdapter == null && (ie.resultsAdapter = F,
                ie.ajax != null && (ie.resultsAdapter = q.Decorate(ie.resultsAdapter, dt)),
                ie.placeholder != null && (ie.resultsAdapter = q.Decorate(ie.resultsAdapter, pt)),
                ie.selectOnClose && (ie.resultsAdapter = q.Decorate(ie.resultsAdapter, oi)),
                ie.tags && (ie.resultsAdapter = q.Decorate(ie.resultsAdapter, _i))),
                ie.dropdownAdapter == null && (ie.multiple ? ie.dropdownAdapter = Re : (Xe = q.Decorate(Re, at),
                ie.dropdownAdapter = Xe),
                ie.minimumResultsForSearch !== 0 && (ie.dropdownAdapter = q.Decorate(ie.dropdownAdapter, qt)),
                ie.closeOnSelect && (ie.dropdownAdapter = q.Decorate(ie.dropdownAdapter, Fi)),
                ie.dropdownCssClass != null && (ie.dropdownAdapter = q.Decorate(ie.dropdownAdapter, tn)),
                ie.dropdownAdapter = q.Decorate(ie.dropdownAdapter, yi)),
                ie.selectionAdapter == null && (ie.multiple ? ie.selectionAdapter = C : ie.selectionAdapter = A,
                ie.placeholder != null && (ie.selectionAdapter = q.Decorate(ie.selectionAdapter, x)),
                ie.allowClear && (ie.selectionAdapter = q.Decorate(ie.selectionAdapter, g)),
                ie.multiple && (ie.selectionAdapter = q.Decorate(ie.selectionAdapter, y)),
                ie.selectionCssClass != null && (ie.selectionAdapter = q.Decorate(ie.selectionAdapter, S)),
                ie.selectionAdapter = q.Decorate(ie.selectionAdapter, Y)),
                ie.language = this._resolveLanguage(ie.language),
                ie.language.push("en");
                for (var Oe = [], Ye = 0; Ye < ie.language.length; Ye++) {
                    var Ge = ie.language[Ye];
                    Oe.indexOf(Ge) === -1 && Oe.push(Ge)
                }
                return ie.language = Oe,
                ie.translations = this._processTranslations(ie.language, ie.debug),
                ie
            }
            ,
            nt.prototype.reset = function() {
                function ie(Xe) {
                    return Xe.replace(/[^\u0000-\u007E]/g, function(Oe) {
                        return se[Oe] || Oe
                    })
                }
                this.defaults = {
                    amdLanguageBase: "./i18n/",
                    autocomplete: "off",
                    closeOnSelect: !0,
                    debug: !1,
                    dropdownAutoWidth: !1,
                    escapeMarkup: q.escapeMarkup,
                    language: {},
                    matcher: function Xe(Oe, Ye) {
                        if (Oe.term == null || Oe.term.trim() === "")
                            return Ye;
                        if (Ye.children && 0 < Ye.children.length) {
                            for (var Ge = s.extend(!0, {}, Ye), Ve = Ye.children.length - 1; 0 <= Ve; Ve--)
                                Xe(Oe, Ye.children[Ve]) == null && Ge.children.splice(Ve, 1);
                            return 0 < Ge.children.length ? Ge : Xe(Oe, Ge)
                        }
                        var ye = ie(Ye.text).toUpperCase()
                          , Ue = ie(Oe.term).toUpperCase();
                        return -1 < ye.indexOf(Ue) ? Ye : null
                    },
                    minimumInputLength: 0,
                    maximumInputLength: 0,
                    maximumSelectionLength: 0,
                    minimumResultsForSearch: 0,
                    selectOnClose: !1,
                    scrollAfterSelect: !1,
                    sorter: function(Xe) {
                        return Xe
                    },
                    templateResult: function(Xe) {
                        return Xe.text
                    },
                    templateSelection: function(Xe) {
                        return Xe.text
                    },
                    theme: "default",
                    width: "resolve"
                }
            }
            ,
            nt.prototype.applyFromElement = function(ie, Ve) {
                var Oe = ie.language
                  , Ye = this.defaults.language
                  , Ge = Ve.prop("lang")
                  , Ve = Ve.closest("[lang]").prop("lang")
                  , Ve = Array.prototype.concat.call(this._resolveLanguage(Ge), this._resolveLanguage(Oe), this._resolveLanguage(Ye), this._resolveLanguage(Ve));
                return ie.language = Ve,
                ie
            }
            ,
            nt.prototype._resolveLanguage = function(ie) {
                if (!ie)
                    return [];
                if (s.isEmptyObject(ie))
                    return [];
                if (s.isPlainObject(ie))
                    return [ie];
                for (var Xe, Oe = Array.isArray(ie) ? ie : [ie], Ye = [], Ge = 0; Ge < Oe.length; Ge++)
                    Ye.push(Oe[Ge]),
                    typeof Oe[Ge] == "string" && 0 < Oe[Ge].indexOf("-") && (Xe = Oe[Ge].split("-")[0],
                    Ye.push(Xe));
                return Ye
            }
            ,
            nt.prototype._processTranslations = function(ie, Xe) {
                for (var Oe = new G, Ye = 0; Ye < ie.length; Ye++) {
                    var Ge = new G
                      , Ve = ie[Ye];
                    if (typeof Ve == "string")
                        try {
                            Ge = G.loadPath(Ve)
                        } catch {
                            try {
                                Ve = this.defaults.amdLanguageBase + Ve,
                                Ge = G.loadPath(Ve)
                            } catch {
                                Xe && window.console && console.warn && console.warn('Select2: The language file for "' + Ve + '" could not be automatically loaded. A fallback will be used instead.')
                            }
                        }
                    else
                        Ge = s.isPlainObject(Ve) ? new G(Ve) : Ve;
                    Oe.extend(Ge)
                }
                return Oe
            }
            ,
            nt.prototype.set = function(ie, Xe) {
                var Oe = {};
                Oe[s.camelCase(ie)] = Xe,
                Oe = q._convertData(Oe),
                s.extend(!0, this.defaults, Oe)
            }
            ,
            new nt
        }),
        ne.define("select2/options", ["jquery", "./defaults", "./utils"], function(s, F, A) {
            function C(x, g) {
                this.options = x,
                g != null && this.fromElement(g),
                g != null && (this.options = F.applyFromElement(this.options, g)),
                this.options = F.apply(this.options)
            }
            return C.prototype.fromElement = function(x) {
                var g = ["select2"];
                this.options.multiple == null && (this.options.multiple = x.prop("multiple")),
                this.options.disabled == null && (this.options.disabled = x.prop("disabled")),
                this.options.autocomplete == null && x.prop("autocomplete") && (this.options.autocomplete = x.prop("autocomplete")),
                this.options.dir == null && (x.prop("dir") ? this.options.dir = x.prop("dir") : x.closest("[dir]").prop("dir") ? this.options.dir = x.closest("[dir]").prop("dir") : this.options.dir = "ltr"),
                x.prop("disabled", this.options.disabled),
                x.prop("multiple", this.options.multiple),
                A.GetData(x[0], "select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),
                A.StoreData(x[0], "data", A.GetData(x[0], "select2Tags")),
                A.StoreData(x[0], "tags", !0)),
                A.GetData(x[0], "ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),
                x.attr("ajax--url", A.GetData(x[0], "ajaxUrl")),
                A.StoreData(x[0], "ajax-Url", A.GetData(x[0], "ajaxUrl")));
                var y = {};
                function S(ge, Te) {
                    return Te.toUpperCase()
                }
                for (var Y = 0; Y < x[0].attributes.length; Y++) {
                    var q = x[0].attributes[Y].name
                      , G = "data-";
                    q.substr(0, G.length) == G && (q = q.substring(G.length),
                    G = A.GetData(x[0], q),
                    y[q.replace(/-([a-z])/g, S)] = G)
                }
                s.fn.jquery && s.fn.jquery.substr(0, 2) == "1." && x[0].dataset && (y = s.extend(!0, {}, x[0].dataset, y));
                var se, ae = s.extend(!0, {}, A.GetData(x[0]), y);
                for (se in ae = A._convertData(ae))
                    -1 < g.indexOf(se) || (s.isPlainObject(this.options[se]) ? s.extend(this.options[se], ae[se]) : this.options[se] = ae[se]);
                return this
            }
            ,
            C.prototype.get = function(x) {
                return this.options[x]
            }
            ,
            C.prototype.set = function(x, g) {
                this.options[x] = g
            }
            ,
            C
        }),
        ne.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(s, F, A, C) {
            var x = function(g, y) {
                A.GetData(g[0], "select2") != null && A.GetData(g[0], "select2").destroy(),
                this.$element = g,
                this.id = this._generateId(g),
                y = y || {},
                this.options = new F(y,g),
                x.__super__.constructor.call(this);
                var S = g.attr("tabindex") || 0;
                A.StoreData(g[0], "old-tabindex", S),
                g.attr("tabindex", "-1"),
                y = this.options.get("dataAdapter"),
                this.dataAdapter = new y(g,this.options),
                S = this.render(),
                this._placeContainer(S),
                y = this.options.get("selectionAdapter"),
                this.selection = new y(g,this.options),
                this.$selection = this.selection.render(),
                this.selection.position(this.$selection, S),
                y = this.options.get("dropdownAdapter"),
                this.dropdown = new y(g,this.options),
                this.$dropdown = this.dropdown.render(),
                this.dropdown.position(this.$dropdown, S),
                S = this.options.get("resultsAdapter"),
                this.results = new S(g,this.options,this.dataAdapter),
                this.$results = this.results.render(),
                this.results.position(this.$results, this.$dropdown);
                var Y = this;
                this._bindAdapters(),
                this._registerDomEvents(),
                this._registerDataEvents(),
                this._registerSelectionEvents(),
                this._registerDropdownEvents(),
                this._registerResultsEvents(),
                this._registerEvents(),
                this.dataAdapter.current(function(q) {
                    Y.trigger("selection:update", {
                        data: q
                    })
                }),
                g[0].classList.add("select2-hidden-accessible"),
                g.attr("aria-hidden", "true"),
                this._syncAttributes(),
                A.StoreData(g[0], "select2", this),
                g.data("select2", this)
            };
            return A.Extend(x, A.Observable),
            x.prototype._generateId = function(g) {
                return "select2-" + (g.attr("id") != null ? g.attr("id") : g.attr("name") != null ? g.attr("name") + "-" + A.generateChars(2) : A.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "")
            }
            ,
            x.prototype._placeContainer = function(g) {
                g.insertAfter(this.$element);
                var y = this._resolveWidth(this.$element, this.options.get("width"));
                y != null && g.css("width", y)
            }
            ,
            x.prototype._resolveWidth = function(g, y) {
                var S = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                if (y == "resolve") {
                    var Y = this._resolveWidth(g, "style");
                    return Y ?? this._resolveWidth(g, "element")
                }
                if (y == "element")
                    return Y = g.outerWidth(!1),
                    Y <= 0 ? "auto" : Y + "px";
                if (y != "style")
                    return y != "computedstyle" ? y : window.getComputedStyle(g[0]).width;
                if (g = g.attr("style"),
                typeof g != "string")
                    return null;
                for (var q = g.split(";"), G = 0, se = q.length; G < se; G += 1) {
                    var ae = q[G].replace(/\s/g, "").match(S);
                    if (ae !== null && 1 <= ae.length)
                        return ae[1]
                }
                return null
            }
            ,
            x.prototype._bindAdapters = function() {
                this.dataAdapter.bind(this, this.$container),
                this.selection.bind(this, this.$container),
                this.dropdown.bind(this, this.$container),
                this.results.bind(this, this.$container)
            }
            ,
            x.prototype._registerDomEvents = function() {
                var g = this;
                this.$element.on("change.select2", function() {
                    g.dataAdapter.current(function(y) {
                        g.trigger("selection:update", {
                            data: y
                        })
                    })
                }),
                this.$element.on("focus.select2", function(y) {
                    g.trigger("focus", y)
                }),
                this._syncA = A.bind(this._syncAttributes, this),
                this._syncS = A.bind(this._syncSubtree, this),
                this._observer = new window.MutationObserver(function(y) {
                    g._syncA(),
                    g._syncS(y)
                }
                ),
                this._observer.observe(this.$element[0], {
                    attributes: !0,
                    childList: !0,
                    subtree: !1
                })
            }
            ,
            x.prototype._registerDataEvents = function() {
                var g = this;
                this.dataAdapter.on("*", function(y, S) {
                    g.trigger(y, S)
                })
            }
            ,
            x.prototype._registerSelectionEvents = function() {
                var g = this
                  , y = ["toggle", "focus"];
                this.selection.on("toggle", function() {
                    g.toggleDropdown()
                }),
                this.selection.on("focus", function(S) {
                    g.focus(S)
                }),
                this.selection.on("*", function(S, Y) {
                    y.indexOf(S) === -1 && g.trigger(S, Y)
                })
            }
            ,
            x.prototype._registerDropdownEvents = function() {
                var g = this;
                this.dropdown.on("*", function(y, S) {
                    g.trigger(y, S)
                })
            }
            ,
            x.prototype._registerResultsEvents = function() {
                var g = this;
                this.results.on("*", function(y, S) {
                    g.trigger(y, S)
                })
            }
            ,
            x.prototype._registerEvents = function() {
                var g = this;
                this.on("open", function() {
                    g.$container[0].classList.add("select2-container--open")
                }),
                this.on("close", function() {
                    g.$container[0].classList.remove("select2-container--open")
                }),
                this.on("enable", function() {
                    g.$container[0].classList.remove("select2-container--disabled")
                }),
                this.on("disable", function() {
                    g.$container[0].classList.add("select2-container--disabled")
                }),
                this.on("blur", function() {
                    g.$container[0].classList.remove("select2-container--focus")
                }),
                this.on("query", function(y) {
                    g.isOpen() || g.trigger("open", {}),
                    this.dataAdapter.query(y, function(S) {
                        g.trigger("results:all", {
                            data: S,
                            query: y
                        })
                    })
                }),
                this.on("query:append", function(y) {
                    this.dataAdapter.query(y, function(S) {
                        g.trigger("results:append", {
                            data: S,
                            query: y
                        })
                    })
                }),
                this.on("keypress", function(y) {
                    var S = y.which;
                    g.isOpen() ? S === C.ESC || S === C.UP && y.altKey ? (g.close(y),
                    y.preventDefault()) : S === C.ENTER || S === C.TAB ? (g.trigger("results:select", {}),
                    y.preventDefault()) : S === C.SPACE && y.ctrlKey ? (g.trigger("results:toggle", {}),
                    y.preventDefault()) : S === C.UP ? (g.trigger("results:previous", {}),
                    y.preventDefault()) : S === C.DOWN && (g.trigger("results:next", {}),
                    y.preventDefault()) : (S === C.ENTER || S === C.SPACE || S === C.DOWN && y.altKey) && (g.open(),
                    y.preventDefault())
                })
            }
            ,
            x.prototype._syncAttributes = function() {
                this.options.set("disabled", this.$element.prop("disabled")),
                this.isDisabled() ? (this.isOpen() && this.close(),
                this.trigger("disable", {})) : this.trigger("enable", {})
            }
            ,
            x.prototype._isChangeMutation = function(g) {
                var y = this;
                if (g.addedNodes && 0 < g.addedNodes.length) {
                    for (var S = 0; S < g.addedNodes.length; S++)
                        if (g.addedNodes[S].selected)
                            return !0
                } else {
                    if (g.removedNodes && 0 < g.removedNodes.length)
                        return !0;
                    if (Array.isArray(g))
                        return g.some(function(Y) {
                            return y._isChangeMutation(Y)
                        })
                }
                return !1
            }
            ,
            x.prototype._syncSubtree = function(y) {
                var y = this._isChangeMutation(y)
                  , S = this;
                y && this.dataAdapter.current(function(Y) {
                    S.trigger("selection:update", {
                        data: Y
                    })
                })
            }
            ,
            x.prototype.trigger = function(g, y) {
                var S = x.__super__.trigger
                  , Y = {
                    open: "opening",
                    close: "closing",
                    select: "selecting",
                    unselect: "unselecting",
                    clear: "clearing"
                };
                if (y === void 0 && (y = {}),
                g in Y) {
                    var q = Y[g]
                      , Y = {
                        prevented: !1,
                        name: g,
                        args: y
                    };
                    if (S.call(this, q, Y),
                    Y.prevented)
                        return void (y.prevented = !0)
                }
                S.call(this, g, y)
            }
            ,
            x.prototype.toggleDropdown = function() {
                this.isDisabled() || (this.isOpen() ? this.close() : this.open())
            }
            ,
            x.prototype.open = function() {
                this.isOpen() || this.isDisabled() || this.trigger("query", {})
            }
            ,
            x.prototype.close = function(g) {
                this.isOpen() && this.trigger("close", {
                    originalEvent: g
                })
            }
            ,
            x.prototype.isEnabled = function() {
                return !this.isDisabled()
            }
            ,
            x.prototype.isDisabled = function() {
                return this.options.get("disabled")
            }
            ,
            x.prototype.isOpen = function() {
                return this.$container[0].classList.contains("select2-container--open")
            }
            ,
            x.prototype.hasFocus = function() {
                return this.$container[0].classList.contains("select2-container--focus")
            }
            ,
            x.prototype.focus = function(g) {
                this.hasFocus() || (this.$container[0].classList.add("select2-container--focus"),
                this.trigger("focus", {}))
            }
            ,
            x.prototype.enable = function(g) {
                this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),
                g = !(g = g == null || g.length === 0 ? [!0] : g)[0],
                this.$element.prop("disabled", g)
            }
            ,
            x.prototype.data = function() {
                this.options.get("debug") && 0 < arguments.length && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                var g = [];
                return this.dataAdapter.current(function(y) {
                    g = y
                }),
                g
            }
            ,
            x.prototype.val = function(g) {
                if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),
                g == null || g.length === 0)
                    return this.$element.val();
                g = g[0],
                Array.isArray(g) && (g = g.map(function(y) {
                    return y.toString()
                })),
                this.$element.val(g).trigger("input").trigger("change")
            }
            ,
            x.prototype.destroy = function() {
                A.RemoveData(this.$container[0]),
                this.$container.remove(),
                this._observer.disconnect(),
                this._observer = null,
                this._syncA = null,
                this._syncS = null,
                this.$element.off(".select2"),
                this.$element.attr("tabindex", A.GetData(this.$element[0], "old-tabindex")),
                this.$element[0].classList.remove("select2-hidden-accessible"),
                this.$element.attr("aria-hidden", "false"),
                A.RemoveData(this.$element[0]),
                this.$element.removeData("select2"),
                this.dataAdapter.destroy(),
                this.selection.destroy(),
                this.dropdown.destroy(),
                this.results.destroy(),
                this.dataAdapter = null,
                this.selection = null,
                this.dropdown = null,
                this.results = null
            }
            ,
            x.prototype.render = function() {
                var g = s('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                return g.attr("dir", this.options.get("dir")),
                this.$container = g,
                this.$container[0].classList.add("select2-container--" + this.options.get("theme")),
                A.StoreData(g[0], "element", this.$element),
                g
            }
            ,
            x
        }),
        ne.define("jquery-mousewheel", ["jquery"], function(s) {
            return s
        }),
        ne.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function(s, F, A, C, x) {
            var g;
            return s.fn.select2 == null && (g = ["open", "close", "destroy"],
            s.fn.select2 = function(y) {
                if (typeof (y = y || {}) == "object")
                    return this.each(function() {
                        var q = s.extend(!0, {}, y);
                        new A(s(this),q)
                    }),
                    this;
                if (typeof y != "string")
                    throw new Error("Invalid arguments for Select2: " + y);
                var S, Y = Array.prototype.slice.call(arguments, 1);
                return this.each(function() {
                    var q = x.GetData(this, "select2");
                    q == null && window.console && console.error && console.error("The select2('" + y + "') method was called on an element that is not using Select2."),
                    S = q[y].apply(q, Y)
                }),
                -1 < g.indexOf(y) ? this : S
            }
            ),
            s.fn.select2.defaults == null && (s.fn.select2.defaults = C),
            A
        }),
        {
            define: ne.define,
            require: ne.require
        });
        function U(s, F) {
            return _.call(s, F)
        }
        function z(s, F) {
            var A, C, x, g, y, S, Y, q, G, se, ae = F && F.split("/"), ge = a.map, Te = ge && ge["*"] || {};
            if (s) {
                for (F = (s = s.split("/")).length - 1,
                a.nodeIdCompat && N.test(s[F]) && (s[F] = s[F].replace(N, "")),
                s[0].charAt(0) === "." && ae && (s = ae.slice(0, ae.length - 1).concat(s)),
                q = 0; q < s.length; q++)
                    (se = s[q]) === "." ? (s.splice(q, 1),
                    --q) : se === ".." && (q === 0 || q === 1 && s[2] === ".." || s[q - 1] === ".." || 0 < q && (s.splice(q - 1, 2),
                    q -= 2));
                s = s.join("/")
            }
            if ((ae || Te) && ge) {
                for (q = (A = s.split("/")).length; 0 < q; --q) {
                    if (C = A.slice(0, q).join("/"),
                    ae) {
                        for (G = ae.length; 0 < G; --G)
                            if (x = ge[ae.slice(0, G).join("/")],
                            x = x && x[C]) {
                                g = x,
                                y = q;
                                break
                            }
                    }
                    if (g)
                        break;
                    !S && Te && Te[C] && (S = Te[C],
                    Y = q)
                }
                !g && S && (g = S,
                y = Y),
                g && (A.splice(0, y, g),
                s = A.join("/"))
            }
            return s
        }
        function pe(s, F) {
            return function() {
                var A = M.call(arguments, 0);
                return typeof A[0] != "string" && A.length === 1 && A.push(null),
                n.apply(L, A.concat([s, F]))
            }
        }
        function fe(s) {
            var F;
            if (U(d, s) && (F = d[s],
            delete d[s],
            m[s] = !0,
            D.apply(L, F)),
            !U(c, s) && !U(m, s))
                throw new Error("No " + s);
            return c[s]
        }
        function we(s) {
            var F, A = s ? s.indexOf("!") : -1;
            return -1 < A && (F = s.substring(0, A),
            s = s.substring(A + 1, s.length)),
            [F, s]
        }
        function be(s) {
            return s ? we(s) : []
        }
        var ne = W.require("jquery.select2");
        return p.fn.select2.amd = W,
        ne
    });
    const io = document.querySelectorAll(".gra-accordion.alwaysOpen .accordion-header");
    io.forEach(p => {
        p.addEventListener("click", function() {
            if (p.getAttribute("aria-expanded") === "true") {
                p.setAttribute("aria-expanded", "false");
                const O = p.nextElementSibling;
                O.style.maxHeight = "0",
                O.style.padding = "0 32px"
            } else {
                p.setAttribute("aria-expanded", "true");
                const O = p.nextElementSibling;
                O.style.maxHeight = "344px",
                O.style.padding = "16px 32px"
            }
        })
    }
    );
    const Kr = document.querySelectorAll(".gra-accordion.alwaysClose .accordion-header");
    Kr.forEach(p => {
        p.addEventListener("click", function() {
            const E = p.getAttribute("aria-expanded") === "true";
            if (Kr.forEach(L => {
                L.setAttribute("aria-expanded", "false")
            }
            ),
            document.querySelectorAll(".accordion-body").forEach(L => {
                L.style.maxHeight = "0",
                L.style.padding = "0 32px"
            }
            ),
            !E) {
                p.setAttribute("aria-expanded", "true");
                const L = p.nextElementSibling;
                L.style.maxHeight = "344px",
                L.style.padding = "16px 32px"
            }
        })
    }
    );
    $(function() {
        function p() {
            const L = localStorage.getItem("theme") == "dark"
              , D = document.querySelectorAll(".gra-logo-gov")
              , n = document.querySelectorAll(".gra-logo-gov-blue")
              , o = document.querySelectorAll(".gra-logo-prr")
              , l = document.querySelectorAll(".gra-logo-c19")
              , c = document.querySelectorAll(".gra-logo-rp")
              , d = document.querySelectorAll(".gra-logo-ue")
              , a = document.querySelectorAll(".gra-logo-incuba");
            L && !document.body.classList.contains("theme-marca-servicos") ? (D.forEach(m => {
                m.src = "/img/logos/darkmode/logo_gra_black.svg"
            }
            ),
            n.forEach(m => {
                m.src = "/img/logos/darkmode/logo_gra_white_dark.png"
            }
            ),
            o.forEach(m => {
                m.src = "/img/logos/darkmode/logo_prr_black.svg"
            }
            ),
            l.forEach(m => {
                m.src = "/img/logos/darkmode/logo_c19_black.svg"
            }
            ),
            c.forEach(m => {
                m.src = "/img/logos/darkmode/logo_rp_black.svg"
            }
            ),
            d.forEach(m => {
                m.src = "/img/logos/darkmode/logo_ue_black.svg"
            }
            ),
            a.forEach(m => {
                m.src = "/img/logos/darkmode/logo_incuba_black.svg"
            }
            )) : document.body.classList.contains("dark-mode") && document.body.classList.contains("theme-marca-servicos") ? (icon.classList.remove("icon-moon"),
            icon.classList.add("icon-sun"),
            tooltipText.textContent = "Modo claro",
            localStorage.setItem("theme", "dark"),
            D.forEach(m => {
                m.src = "/img/logos/logo_gra_white.svg"
            }
            ),
            n.forEach(m => {
                m.src = "/img/logos/darkmode/logo_gra_white_dark.png"
            }
            ),
            o.forEach(m => {
                m.src = "/img/logos/darkmode_secundario/logo_prr_black_secundario.svg"
            }
            ),
            l.forEach(m => {
                m.src = "/img/logos/darkmode_secundario/logo_c19_black_secundario.svg"
            }
            ),
            c.forEach(m => {
                m.src = "/img/logos/logo_rp.svg"
            }
            ),
            d.forEach(m => {
                m.src = "/img/logos/darkmode_secundario/logo_ue_black_secundario.svg"
            }
            ),
            a.forEach(m => {
                m.src = "/img/logos/darkmode_secundario/logo_incuba_black_secundario.svg"
            }
            )) : (D.forEach(m => {
                m.src = "/img/logos/logo_gra_white.svg"
            }
            ),
            n.forEach(m => {
                m.src = "/img/logos/logo_gra_blue.png"
            }
            ),
            o.forEach(m => {
                m.src = "/img/logos/logo_prr.svg"
            }
            ),
            l.forEach(m => {
                m.src = "/img/logos/logo_c19.svg"
            }
            ),
            c.forEach(m => {
                m.src = "/img/logos/logo_rp.svg"
            }
            ),
            d.forEach(m => {
                m.src = "/img/logos/logo_ue.svg"
            }
            ),
            a.forEach(m => {
                m.src = "/img/logos/logo_incuba.svg"
            }
            ))
        }
        const E = document.querySelectorAll(".changeTheme")
          , O = localStorage.getItem("theme") == "dark";
        E && E.forEach(L => {
            const D = L.querySelector(".tooltiptext")
              , n = L.querySelector(".toggleTheme");
            O ? (n.classList.remove("icon-moon"),
            n.classList.add("icon-sun"),
            D.textContent = "Modo claro") : (n.classList.remove("icon-sun"),
            n.classList.add("icon-moon"),
            D.textContent = "Modo escuro")
        }
        ),
        p(),
        $(".columnFooter .label").on("click", function() {
            $(this).next(".links").toggleClass("active"),
            $(this).toggleClass("open")
        }),
        $(".backToTop").on("click", function() {
            $("html, body").animate({
                scrollTop: 0
            }, 500)
        })
    });
    document.querySelectorAll(".dropdown-submenu a.dropdown-toggle").forEach(function(p) {
        p.addEventListener("click", function(E) {
            E.preventDefault();
            const O = this.nextElementSibling
              , L = O.classList.contains("show");
            document.querySelectorAll(".dropdown-submenu .dropdown-menu.show").forEach(function(D) {
                D.classList.remove("show")
            }),
            O.classList.toggle("show", !L)
        })
    });
    document.querySelectorAll(".dropdown-submenu a.dropdown-item").forEach(function(p) {
        p.addEventListener("click", function(E) {
            E.stopPropagation()
        })
    });
    document.addEventListener("click", function(p) {
        p.target.closest(".dropdown") || document.querySelectorAll(".dropdown-menu.show").forEach(function(E) {
            E.classList.remove("show")
        })
    });
    $(document).on("click", ".back-option", function() {
        var p = $(this).closest("ul");
        p.css("display", "none")
    });
    $(".menu-first-level-mobile.withChilds").click(function() {
        $(this).find(".submenu_1").first().css("display", "block")
    });
    $("li.withSubmenu").click(function() {
        $(this).find(".submenu_2").first().css("display", "block")
    });
    function no() {
        $("li.menu-first-level").children("ul").hide(),
        $("li.menu-first-level").find("i.arrow-down").css({
            transform: "rotate(0deg)",
            transition: "transform 0.3s ease"
        })
    }
    function $r() {
        $("li.menu-first-level > ul > li").closest("li").find("ul").hide(),
        $("li.menu-first-level > ul > li").closest("li").removeClass("active"),
        $("li.menu-first-level > ul").css({
            "border-top-right-radius": "8px",
            "border-bottom-right-radius": "8px"
        })
    }
    $(".menus_mobile .moreOptions").click(function(p) {
        $(".moreOptionsBox").toggle()
    });
    $(".gra-desktop-header").each(function() {
        $(this).find("li.menu-first-level").on("click", function(p) {
            p.stopPropagation(),
            $r();
            var E = $(this);
            E.children("ul").toggle(),
            E.find("i.arrow-down").css({
                transform: E.children("ul").is(":visible") ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease"
            })
        }),
        $(this).find("li.menu-first-level > ul > li ").on("click", function(p) {
            p.stopPropagation(),
            $r(),
            $(this).parent().css({
                "border-top-right-radius": 0,
                "border-bottom-right-radius": 0
            });
            var E = $(this)
              , O = E.closest("li").find("ul");
            E.toggleClass("active"),
            O.toggle()
        }),
        $(this).hasClass("small") ? $(".stickyColumn").css("top", "93px") : $(this).hasClass("medium") ? $(".stickyColumn").css("top", "116px") : $(".stickyColumn").css("top", "127px")
    });
    $(document).on("click", function() {
        no(),
        $r()
    });
    $(".gra-mobile-header").each(function() {
        var p = $(this);
        p.find(".mobile-header .hamburgerPic").on("click", function() {
            $(this).css("display", "none"),
            p.find(".mobile-header .menuClosePic").css("display", "inline-block"),
            p.find(".menu_mobile").css("display", "inline-block"),
            p.hasClass("notFixed") || $("body").css("overflow-y", "hidden")
        }),
        p.find(".mobile-header .menuClosePic").on("click", function() {
            p.find(".mobile-header .hamburgerPic").css("display", "inline-block"),
            $(this).css("display", "none"),
            p.find(".menu_mobile").css("display", "none"),
            $("body").css("overflow-y", "auto")
        })
    });
    $(".gra-menuBackoffice .withSub").on("click", function(p) {
        p.stopPropagation(),
        $(".gra-menuBackoffice").hasClass("open") || $(".gra-menuBackoffice").addClass("open"),
        $(this).toggleClass("active");
        var E = $(this)
          , O = E.find("ul:first")
          , L = E.find(".image-down:first");
        $(this).hasClass("active") ? O.css("display", "none") : O.css("display", "block"),
        O.css("display") == "block" ? (O.css("display", "none"),
        L.css("display", "inline-flex")) : O.css("display", "block")
    });
    $(".gra-menuBackoffice #hamburgerMenuOpen").click(function() {
        $(".gra-menuBackoffice").addClass("open")
    });
    $(".gra-menuBackoffice #hamburgerMenuClose").click(function() {
        $(".gra-menuBackoffice").removeClass("open"),
        $(".gra-menuBackoffice").find(".withSub.active").removeClass("active"),
        $(".gra-menuBackoffice").find(".withSub .subUl").css("display", "none")
    });
    var ss = sr();
    const Me = Nr(ss)
      , ro = Ka({
        __proto__: null,
        default: Me
    }, [ss]);
    var as = {
        exports: {}
    };
    /*!
 * Select2 4.1.0-rc.0
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
    (function(p) {
        (function(E) {
            p.exports ? p.exports = function(O, L) {
                return L === void 0 && (typeof window < "u" ? L = sr() : L = sr()(O)),
                E(L),
                L
            }
            : E(jQuery)
        }
        )(function(E) {
            var O = function() {
                if (E && E.fn && E.fn.select2 && E.fn.select2.amd)
                    var D = E.fn.select2.amd;
                var D;
                return function() {
                    if (!D || !D.requirejs) {
                        D ? o = D : D = {};
                        /**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
                        var n, o, l;
                        (function(c) {
                            var d, a, m, _, M = {}, N = {}, W = {}, U = {}, z = Object.prototype.hasOwnProperty, pe = [].slice, fe = /\.js$/;
                            function we(y, S) {
                                return z.call(y, S)
                            }
                            function be(y, S) {
                                var Y, q, G, se, ae, ge, Te, X, ve, Ee, re, We, Re = S && S.split("/"), at = W.map, pt = at && at["*"] || {};
                                if (y) {
                                    for (y = y.split("/"),
                                    ae = y.length - 1,
                                    W.nodeIdCompat && fe.test(y[ae]) && (y[ae] = y[ae].replace(fe, "")),
                                    y[0].charAt(0) === "." && Re && (We = Re.slice(0, Re.length - 1),
                                    y = We.concat(y)),
                                    ve = 0; ve < y.length; ve++)
                                        if (re = y[ve],
                                        re === ".")
                                            y.splice(ve, 1),
                                            ve -= 1;
                                        else if (re === "..") {
                                            if (ve === 0 || ve === 1 && y[2] === ".." || y[ve - 1] === "..")
                                                continue;
                                            ve > 0 && (y.splice(ve - 1, 2),
                                            ve -= 2)
                                        }
                                    y = y.join("/")
                                }
                                if ((Re || pt) && at) {
                                    for (Y = y.split("/"),
                                    ve = Y.length; ve > 0; ve -= 1) {
                                        if (q = Y.slice(0, ve).join("/"),
                                        Re) {
                                            for (Ee = Re.length; Ee > 0; Ee -= 1)
                                                if (G = at[Re.slice(0, Ee).join("/")],
                                                G && (G = G[q],
                                                G)) {
                                                    se = G,
                                                    ge = ve;
                                                    break
                                                }
                                        }
                                        if (se)
                                            break;
                                        !Te && pt && pt[q] && (Te = pt[q],
                                        X = ve)
                                    }
                                    !se && Te && (se = Te,
                                    ge = X),
                                    se && (Y.splice(0, ge, se),
                                    y = Y.join("/"))
                                }
                                return y
                            }
                            function ne(y, S) {
                                return function() {
                                    var Y = pe.call(arguments, 0);
                                    return typeof Y[0] != "string" && Y.length === 1 && Y.push(null),
                                    a.apply(c, Y.concat([y, S]))
                                }
                            }
                            function s(y) {
                                return function(S) {
                                    return be(S, y)
                                }
                            }
                            function F(y) {
                                return function(S) {
                                    M[y] = S
                                }
                            }
                            function A(y) {
                                if (we(N, y)) {
                                    var S = N[y];
                                    delete N[y],
                                    U[y] = !0,
                                    d.apply(c, S)
                                }
                                if (!we(M, y) && !we(U, y))
                                    throw new Error("No " + y);
                                return M[y]
                            }
                            function C(y) {
                                var S, Y = y ? y.indexOf("!") : -1;
                                return Y > -1 && (S = y.substring(0, Y),
                                y = y.substring(Y + 1, y.length)),
                                [S, y]
                            }
                            function x(y) {
                                return y ? C(y) : []
                            }
                            m = function(y, S) {
                                var Y, q = C(y), G = q[0], se = S[1];
                                return y = q[1],
                                G && (G = be(G, se),
                                Y = A(G)),
                                G ? Y && Y.normalize ? y = Y.normalize(y, s(se)) : y = be(y, se) : (y = be(y, se),
                                q = C(y),
                                G = q[0],
                                y = q[1],
                                G && (Y = A(G))),
                                {
                                    f: G ? G + "!" + y : y,
                                    n: y,
                                    pr: G,
                                    p: Y
                                }
                            }
                            ;
                            function g(y) {
                                return function() {
                                    return W && W.config && W.config[y] || {}
                                }
                            }
                            _ = {
                                require: function(y) {
                                    return ne(y)
                                },
                                exports: function(y) {
                                    var S = M[y];
                                    return typeof S < "u" ? S : M[y] = {}
                                },
                                module: function(y) {
                                    return {
                                        id: y,
                                        uri: "",
                                        exports: M[y],
                                        config: g(y)
                                    }
                                }
                            },
                            d = function(y, S, Y, q) {
                                var G, se, ae, ge, Te, X, ve = [], Ee = typeof Y, re;
                                if (q = q || y,
                                X = x(q),
                                Ee === "undefined" || Ee === "function") {
                                    for (S = !S.length && Y.length ? ["require", "exports", "module"] : S,
                                    Te = 0; Te < S.length; Te += 1)
                                        if (ge = m(S[Te], X),
                                        se = ge.f,
                                        se === "require")
                                            ve[Te] = _.require(y);
                                        else if (se === "exports")
                                            ve[Te] = _.exports(y),
                                            re = !0;
                                        else if (se === "module")
                                            G = ve[Te] = _.module(y);
                                        else if (we(M, se) || we(N, se) || we(U, se))
                                            ve[Te] = A(se);
                                        else if (ge.p)
                                            ge.p.load(ge.n, ne(q, !0), F(se), {}),
                                            ve[Te] = M[se];
                                        else
                                            throw new Error(y + " missing " + se);
                                    ae = Y ? Y.apply(M[y], ve) : void 0,
                                    y && (G && G.exports !== c && G.exports !== M[y] ? M[y] = G.exports : (ae !== c || !re) && (M[y] = ae))
                                } else
                                    y && (M[y] = Y)
                            }
                            ,
                            n = o = a = function(y, S, Y, q, G) {
                                if (typeof y == "string")
                                    return _[y] ? _[y](S) : A(m(y, x(S)).f);
                                if (!y.splice) {
                                    if (W = y,
                                    W.deps && a(W.deps, W.callback),
                                    !S)
                                        return;
                                    S.splice ? (y = S,
                                    S = Y,
                                    Y = null) : y = c
                                }
                                return S = S || function() {}
                                ,
                                typeof Y == "function" && (Y = q,
                                q = G),
                                q ? d(c, y, S, Y) : setTimeout(function() {
                                    d(c, y, S, Y)
                                }, 4),
                                a
                            }
                            ,
                            a.config = function(y) {
                                return a(y)
                            }
                            ,
                            n._defined = M,
                            l = function(y, S, Y) {
                                if (typeof y != "string")
                                    throw new Error("See almond README: incorrect module build, no module name");
                                S.splice || (Y = S,
                                S = []),
                                !we(M, y) && !we(N, y) && (N[y] = [y, S, Y])
                            }
                            ,
                            l.amd = {
                                jQuery: !0
                            }
                        }
                        )(),
                        D.requirejs = n,
                        D.require = o,
                        D.define = l
                    }
                }(),
                D.define("almond", function() {}),
                D.define("jquery", [], function() {
                    var n = E || $;
                    return n == null && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),
                    n
                }),
                D.define("select2/utils", ["jquery"], function(n) {
                    var o = {};
                    o.Extend = function(a, m) {
                        var _ = {}.hasOwnProperty;
                        function M() {
                            this.constructor = a
                        }
                        for (var N in m)
                            _.call(m, N) && (a[N] = m[N]);
                        return M.prototype = m.prototype,
                        a.prototype = new M,
                        a.__super__ = m.prototype,
                        a
                    }
                    ;
                    function l(a) {
                        var m = a.prototype
                          , _ = [];
                        for (var M in m) {
                            var N = m[M];
                            typeof N == "function" && M !== "constructor" && _.push(M)
                        }
                        return _
                    }
                    o.Decorate = function(a, m) {
                        var _ = l(m)
                          , M = l(a);
                        function N() {
                            var be = Array.prototype.unshift
                              , ne = m.prototype.constructor.length
                              , s = a.prototype.constructor;
                            ne > 0 && (be.call(arguments, a.prototype.constructor),
                            s = m.prototype.constructor),
                            s.apply(this, arguments)
                        }
                        m.displayName = a.displayName;
                        function W() {
                            this.constructor = N
                        }
                        N.prototype = new W;
                        for (var U = 0; U < M.length; U++) {
                            var z = M[U];
                            N.prototype[z] = a.prototype[z]
                        }
                        for (var pe = function(be) {
                            var ne = function() {};
                            be in N.prototype && (ne = N.prototype[be]);
                            var s = m.prototype[be];
                            return function() {
                                var F = Array.prototype.unshift;
                                return F.call(arguments, ne),
                                s.apply(this, arguments)
                            }
                        }, fe = 0; fe < _.length; fe++) {
                            var we = _[fe];
                            N.prototype[we] = pe(we)
                        }
                        return N
                    }
                    ;
                    var c = function() {
                        this.listeners = {}
                    };
                    c.prototype.on = function(a, m) {
                        this.listeners = this.listeners || {},
                        a in this.listeners ? this.listeners[a].push(m) : this.listeners[a] = [m]
                    }
                    ,
                    c.prototype.trigger = function(a) {
                        var m = Array.prototype.slice
                          , _ = m.call(arguments, 1);
                        this.listeners = this.listeners || {},
                        _ == null && (_ = []),
                        _.length === 0 && _.push({}),
                        _[0]._type = a,
                        a in this.listeners && this.invoke(this.listeners[a], m.call(arguments, 1)),
                        "*"in this.listeners && this.invoke(this.listeners["*"], arguments)
                    }
                    ,
                    c.prototype.invoke = function(a, m) {
                        for (var _ = 0, M = a.length; _ < M; _++)
                            a[_].apply(this, m)
                    }
                    ,
                    o.Observable = c,
                    o.generateChars = function(a) {
                        for (var m = "", _ = 0; _ < a; _++) {
                            var M = Math.floor(Math.random() * 36);
                            m += M.toString(36)
                        }
                        return m
                    }
                    ,
                    o.bind = function(a, m) {
                        return function() {
                            a.apply(m, arguments)
                        }
                    }
                    ,
                    o._convertData = function(a) {
                        for (var m in a) {
                            var _ = m.split("-")
                              , M = a;
                            if (_.length !== 1) {
                                for (var N = 0; N < _.length; N++) {
                                    var W = _[N];
                                    W = W.substring(0, 1).toLowerCase() + W.substring(1),
                                    W in M || (M[W] = {}),
                                    N == _.length - 1 && (M[W] = a[m]),
                                    M = M[W]
                                }
                                delete a[m]
                            }
                        }
                        return a
                    }
                    ,
                    o.hasScroll = function(a, m) {
                        var _ = n(m)
                          , M = m.style.overflowX
                          , N = m.style.overflowY;
                        return M === N && (N === "hidden" || N === "visible") ? !1 : M === "scroll" || N === "scroll" ? !0 : _.innerHeight() < m.scrollHeight || _.innerWidth() < m.scrollWidth
                    }
                    ,
                    o.escapeMarkup = function(a) {
                        var m = {
                            "\\": "&#92;",
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#39;",
                            "/": "&#47;"
                        };
                        return typeof a != "string" ? a : String(a).replace(/[&<>"'\/\\]/g, function(_) {
                            return m[_]
                        })
                    }
                    ,
                    o.__cache = {};
                    var d = 0;
                    return o.GetUniqueElementId = function(a) {
                        var m = a.getAttribute("data-select2-id");
                        return m != null || (a.id ? m = "select2-data-" + a.id : m = "select2-data-" + (++d).toString() + "-" + o.generateChars(4),
                        a.setAttribute("data-select2-id", m)),
                        m
                    }
                    ,
                    o.StoreData = function(a, m, _) {
                        var M = o.GetUniqueElementId(a);
                        o.__cache[M] || (o.__cache[M] = {}),
                        o.__cache[M][m] = _
                    }
                    ,
                    o.GetData = function(a, m) {
                        var _ = o.GetUniqueElementId(a);
                        return m ? o.__cache[_] && o.__cache[_][m] != null ? o.__cache[_][m] : n(a).data(m) : o.__cache[_]
                    }
                    ,
                    o.RemoveData = function(a) {
                        var m = o.GetUniqueElementId(a);
                        o.__cache[m] != null && delete o.__cache[m],
                        a.removeAttribute("data-select2-id")
                    }
                    ,
                    o.copyNonInternalCssClasses = function(a, m) {
                        var _ = a.getAttribute("class").trim().split(/\s+/);
                        _ = _.filter(function(W) {
                            return W.indexOf("select2-") === 0
                        });
                        var M = m.getAttribute("class").trim().split(/\s+/);
                        M = M.filter(function(W) {
                            return W.indexOf("select2-") !== 0
                        });
                        var N = _.concat(M);
                        a.setAttribute("class", N.join(" "))
                    }
                    ,
                    o
                }),
                D.define("select2/results", ["jquery", "./utils"], function(n, o) {
                    function l(c, d, a) {
                        this.$element = c,
                        this.data = a,
                        this.options = d,
                        l.__super__.constructor.call(this)
                    }
                    return o.Extend(l, o.Observable),
                    l.prototype.render = function() {
                        var c = n('<ul class="select2-results__options" role="listbox"></ul>');
                        return this.options.get("multiple") && c.attr("aria-multiselectable", "true"),
                        this.$results = c,
                        c
                    }
                    ,
                    l.prototype.clear = function() {
                        this.$results.empty()
                    }
                    ,
                    l.prototype.displayMessage = function(c) {
                        var d = this.options.get("escapeMarkup");
                        this.clear(),
                        this.hideLoading();
                        var a = n('<li role="alert" aria-live="assertive" class="select2-results__option"></li>')
                          , m = this.options.get("translations").get(c.message);
                        a.append(d(m(c.args))),
                        a[0].className += " select2-results__message",
                        this.$results.append(a)
                    }
                    ,
                    l.prototype.hideMessages = function() {
                        this.$results.find(".select2-results__message").remove()
                    }
                    ,
                    l.prototype.append = function(c) {
                        this.hideLoading();
                        var d = [];
                        if (c.results == null || c.results.length === 0) {
                            this.$results.children().length === 0 && this.trigger("results:message", {
                                message: "noResults"
                            });
                            return
                        }
                        c.results = this.sort(c.results);
                        for (var a = 0; a < c.results.length; a++) {
                            var m = c.results[a]
                              , _ = this.option(m);
                            d.push(_)
                        }
                        this.$results.append(d)
                    }
                    ,
                    l.prototype.position = function(c, d) {
                        var a = d.find(".select2-results");
                        a.append(c)
                    }
                    ,
                    l.prototype.sort = function(c) {
                        var d = this.options.get("sorter");
                        return d(c)
                    }
                    ,
                    l.prototype.highlightFirstItem = function() {
                        var c = this.$results.find(".select2-results__option--selectable")
                          , d = c.filter(".select2-results__option--selected");
                        d.length > 0 ? d.first().trigger("mouseenter") : c.first().trigger("mouseenter"),
                        this.ensureHighlightVisible()
                    }
                    ,
                    l.prototype.setClasses = function() {
                        var c = this;
                        this.data.current(function(d) {
                            var a = d.map(function(_) {
                                return _.id.toString()
                            })
                              , m = c.$results.find(".select2-results__option--selectable");
                            m.each(function() {
                                var _ = n(this)
                                  , M = o.GetData(this, "data")
                                  , N = "" + M.id;
                                M.element != null && M.element.selected || M.element == null && a.indexOf(N) > -1 ? (this.classList.add("select2-results__option--selected"),
                                _.attr("aria-selected", "true")) : (this.classList.remove("select2-results__option--selected"),
                                _.attr("aria-selected", "false"))
                            })
                        })
                    }
                    ,
                    l.prototype.showLoading = function(c) {
                        this.hideLoading();
                        var d = this.options.get("translations").get("searching")
                          , a = {
                            disabled: !0,
                            loading: !0,
                            text: d(c)
                        }
                          , m = this.option(a);
                        m.className += " loading-results",
                        this.$results.prepend(m)
                    }
                    ,
                    l.prototype.hideLoading = function() {
                        this.$results.find(".loading-results").remove()
                    }
                    ,
                    l.prototype.option = function(c) {
                        var d = document.createElement("li");
                        d.classList.add("select2-results__option"),
                        d.classList.add("select2-results__option--selectable");
                        var a = {
                            role: "option"
                        }
                          , m = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
                        (c.element != null && m.call(c.element, ":disabled") || c.element == null && c.disabled) && (a["aria-disabled"] = "true",
                        d.classList.remove("select2-results__option--selectable"),
                        d.classList.add("select2-results__option--disabled")),
                        c.id == null && d.classList.remove("select2-results__option--selectable"),
                        c._resultId != null && (d.id = c._resultId),
                        c.title && (d.title = c.title),
                        c.children && (a.role = "group",
                        a["aria-label"] = c.text,
                        d.classList.remove("select2-results__option--selectable"),
                        d.classList.add("select2-results__option--group"));
                        for (var _ in a) {
                            var M = a[_];
                            d.setAttribute(_, M)
                        }
                        if (c.children) {
                            var N = n(d)
                              , W = document.createElement("strong");
                            W.className = "select2-results__group",
                            this.template(c, W);
                            for (var U = [], z = 0; z < c.children.length; z++) {
                                var pe = c.children[z]
                                  , fe = this.option(pe);
                                U.push(fe)
                            }
                            var we = n("<ul></ul>", {
                                class: "select2-results__options select2-results__options--nested",
                                role: "none"
                            });
                            we.append(U),
                            N.append(W),
                            N.append(we)
                        } else
                            this.template(c, d);
                        return o.StoreData(d, "data", c),
                        d
                    }
                    ,
                    l.prototype.bind = function(c, d) {
                        var a = this
                          , m = c.id + "-results";
                        this.$results.attr("id", m),
                        c.on("results:all", function(_) {
                            a.clear(),
                            a.append(_.data),
                            c.isOpen() && (a.setClasses(),
                            a.highlightFirstItem())
                        }),
                        c.on("results:append", function(_) {
                            a.append(_.data),
                            c.isOpen() && a.setClasses()
                        }),
                        c.on("query", function(_) {
                            a.hideMessages(),
                            a.showLoading(_)
                        }),
                        c.on("select", function() {
                            c.isOpen() && (a.setClasses(),
                            a.options.get("scrollAfterSelect") && a.highlightFirstItem())
                        }),
                        c.on("unselect", function() {
                            c.isOpen() && (a.setClasses(),
                            a.options.get("scrollAfterSelect") && a.highlightFirstItem())
                        }),
                        c.on("open", function() {
                            a.$results.attr("aria-expanded", "true"),
                            a.$results.attr("aria-hidden", "false"),
                            a.setClasses(),
                            a.ensureHighlightVisible()
                        }),
                        c.on("close", function() {
                            a.$results.attr("aria-expanded", "false"),
                            a.$results.attr("aria-hidden", "true"),
                            a.$results.removeAttr("aria-activedescendant")
                        }),
                        c.on("results:toggle", function() {
                            var _ = a.getHighlightedResults();
                            _.length !== 0 && _.trigger("mouseup")
                        }),
                        c.on("results:select", function() {
                            var _ = a.getHighlightedResults();
                            if (_.length !== 0) {
                                var M = o.GetData(_[0], "data");
                                _.hasClass("select2-results__option--selected") ? a.trigger("close", {}) : a.trigger("select", {
                                    data: M
                                })
                            }
                        }),
                        c.on("results:previous", function() {
                            var _ = a.getHighlightedResults()
                              , M = a.$results.find(".select2-results__option--selectable")
                              , N = M.index(_);
                            if (!(N <= 0)) {
                                var W = N - 1;
                                _.length === 0 && (W = 0);
                                var U = M.eq(W);
                                U.trigger("mouseenter");
                                var z = a.$results.offset().top
                                  , pe = U.offset().top
                                  , fe = a.$results.scrollTop() + (pe - z);
                                W === 0 ? a.$results.scrollTop(0) : pe - z < 0 && a.$results.scrollTop(fe)
                            }
                        }),
                        c.on("results:next", function() {
                            var _ = a.getHighlightedResults()
                              , M = a.$results.find(".select2-results__option--selectable")
                              , N = M.index(_)
                              , W = N + 1;
                            if (!(W >= M.length)) {
                                var U = M.eq(W);
                                U.trigger("mouseenter");
                                var z = a.$results.offset().top + a.$results.outerHeight(!1)
                                  , pe = U.offset().top + U.outerHeight(!1)
                                  , fe = a.$results.scrollTop() + pe - z;
                                W === 0 ? a.$results.scrollTop(0) : pe > z && a.$results.scrollTop(fe)
                            }
                        }),
                        c.on("results:focus", function(_) {
                            _.element[0].classList.add("select2-results__option--highlighted"),
                            _.element[0].setAttribute("aria-selected", "true")
                        }),
                        c.on("results:message", function(_) {
                            a.displayMessage(_)
                        }),
                        n.fn.mousewheel && this.$results.on("mousewheel", function(_) {
                            var M = a.$results.scrollTop()
                              , N = a.$results.get(0).scrollHeight - M + _.deltaY
                              , W = _.deltaY > 0 && M - _.deltaY <= 0
                              , U = _.deltaY < 0 && N <= a.$results.height();
                            W ? (a.$results.scrollTop(0),
                            _.preventDefault(),
                            _.stopPropagation()) : U && (a.$results.scrollTop(a.$results.get(0).scrollHeight - a.$results.height()),
                            _.preventDefault(),
                            _.stopPropagation())
                        }),
                        this.$results.on("mouseup", ".select2-results__option--selectable", function(_) {
                            var M = n(this)
                              , N = o.GetData(this, "data");
                            if (M.hasClass("select2-results__option--selected")) {
                                a.options.get("multiple") ? a.trigger("unselect", {
                                    originalEvent: _,
                                    data: N
                                }) : a.trigger("close", {});
                                return
                            }
                            a.trigger("select", {
                                originalEvent: _,
                                data: N
                            })
                        }),
                        this.$results.on("mouseenter", ".select2-results__option--selectable", function(_) {
                            var M = o.GetData(this, "data");
                            a.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected", "false"),
                            a.trigger("results:focus", {
                                data: M,
                                element: n(this)
                            })
                        })
                    }
                    ,
                    l.prototype.getHighlightedResults = function() {
                        var c = this.$results.find(".select2-results__option--highlighted");
                        return c
                    }
                    ,
                    l.prototype.destroy = function() {
                        this.$results.remove()
                    }
                    ,
                    l.prototype.ensureHighlightVisible = function() {
                        var c = this.getHighlightedResults();
                        if (c.length !== 0) {
                            var d = this.$results.find(".select2-results__option--selectable")
                              , a = d.index(c)
                              , m = this.$results.offset().top
                              , _ = c.offset().top
                              , M = this.$results.scrollTop() + (_ - m)
                              , N = _ - m;
                            M -= c.outerHeight(!1) * 2,
                            a <= 2 ? this.$results.scrollTop(0) : (N > this.$results.outerHeight() || N < 0) && this.$results.scrollTop(M)
                        }
                    }
                    ,
                    l.prototype.template = function(c, d) {
                        var a = this.options.get("templateResult")
                          , m = this.options.get("escapeMarkup")
                          , _ = a(c, d);
                        _ == null ? d.style.display = "none" : typeof _ == "string" ? d.innerHTML = m(_) : n(d).append(_)
                    }
                    ,
                    l
                }),
                D.define("select2/keys", [], function() {
                    var n = {
                        BACKSPACE: 8,
                        TAB: 9,
                        ENTER: 13,
                        SHIFT: 16,
                        CTRL: 17,
                        ALT: 18,
                        ESC: 27,
                        SPACE: 32,
                        PAGE_UP: 33,
                        PAGE_DOWN: 34,
                        END: 35,
                        HOME: 36,
                        LEFT: 37,
                        UP: 38,
                        RIGHT: 39,
                        DOWN: 40,
                        DELETE: 46
                    };
                    return n
                }),
                D.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(n, o, l) {
                    function c(d, a) {
                        this.$element = d,
                        this.options = a,
                        c.__super__.constructor.call(this)
                    }
                    return o.Extend(c, o.Observable),
                    c.prototype.render = function() {
                        var d = n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                        return this._tabindex = 0,
                        o.GetData(this.$element[0], "old-tabindex") != null ? this._tabindex = o.GetData(this.$element[0], "old-tabindex") : this.$element.attr("tabindex") != null && (this._tabindex = this.$element.attr("tabindex")),
                        d.attr("title", this.$element.attr("title")),
                        d.attr("tabindex", this._tabindex),
                        d.attr("aria-disabled", "false"),
                        this.$selection = d,
                        d
                    }
                    ,
                    c.prototype.bind = function(d, a) {
                        var m = this
                          , _ = d.id + "-results";
                        this.container = d,
                        this.$selection.on("focus", function(M) {
                            m.trigger("focus", M)
                        }),
                        this.$selection.on("blur", function(M) {
                            m._handleBlur(M)
                        }),
                        this.$selection.on("keydown", function(M) {
                            m.trigger("keypress", M),
                            M.which === l.SPACE && M.preventDefault()
                        }),
                        d.on("results:focus", function(M) {
                            m.$selection.attr("aria-activedescendant", M.data._resultId)
                        }),
                        d.on("selection:update", function(M) {
                            m.update(M.data)
                        }),
                        d.on("open", function() {
                            m.$selection.attr("aria-expanded", "true"),
                            m.$selection.attr("aria-owns", _),
                            m._attachCloseHandler(d)
                        }),
                        d.on("close", function() {
                            m.$selection.attr("aria-expanded", "false"),
                            m.$selection.removeAttr("aria-activedescendant"),
                            m.$selection.removeAttr("aria-owns"),
                            m.$selection.trigger("focus"),
                            m._detachCloseHandler(d)
                        }),
                        d.on("enable", function() {
                            m.$selection.attr("tabindex", m._tabindex),
                            m.$selection.attr("aria-disabled", "false")
                        }),
                        d.on("disable", function() {
                            m.$selection.attr("tabindex", "-1"),
                            m.$selection.attr("aria-disabled", "true")
                        })
                    }
                    ,
                    c.prototype._handleBlur = function(d) {
                        var a = this;
                        window.setTimeout(function() {
                            document.activeElement == a.$selection[0] || n.contains(a.$selection[0], document.activeElement) || a.trigger("blur", d)
                        }, 1)
                    }
                    ,
                    c.prototype._attachCloseHandler = function(d) {
                        n(document.body).on("mousedown.select2." + d.id, function(a) {
                            var m = n(a.target)
                              , _ = m.closest(".select2")
                              , M = n(".select2.select2-container--open");
                            M.each(function() {
                                if (this != _[0]) {
                                    var N = o.GetData(this, "element");
                                    N.select2("close")
                                }
                            })
                        })
                    }
                    ,
                    c.prototype._detachCloseHandler = function(d) {
                        n(document.body).off("mousedown.select2." + d.id)
                    }
                    ,
                    c.prototype.position = function(d, a) {
                        var m = a.find(".selection");
                        m.append(d)
                    }
                    ,
                    c.prototype.destroy = function() {
                        this._detachCloseHandler(this.container)
                    }
                    ,
                    c.prototype.update = function(d) {
                        throw new Error("The `update` method must be defined in child classes.")
                    }
                    ,
                    c.prototype.isEnabled = function() {
                        return !this.isDisabled()
                    }
                    ,
                    c.prototype.isDisabled = function() {
                        return this.options.get("disabled")
                    }
                    ,
                    c
                }),
                D.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(n, o, l, c) {
                    function d() {
                        d.__super__.constructor.apply(this, arguments)
                    }
                    return l.Extend(d, o),
                    d.prototype.render = function() {
                        var a = d.__super__.render.call(this);
                        return a[0].classList.add("select2-selection--single"),
                        a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),
                        a
                    }
                    ,
                    d.prototype.bind = function(a, m) {
                        var _ = this;
                        d.__super__.bind.apply(this, arguments);
                        var M = a.id + "-container";
                        this.$selection.find(".select2-selection__rendered").attr("id", M).attr("role", "textbox").attr("aria-readonly", "true"),
                        this.$selection.attr("aria-labelledby", M),
                        this.$selection.attr("aria-controls", M),
                        this.$selection.on("mousedown", function(N) {
                            N.which === 1 && _.trigger("toggle", {
                                originalEvent: N
                            })
                        }),
                        this.$selection.on("focus", function(N) {}),
                        this.$selection.on("blur", function(N) {}),
                        a.on("focus", function(N) {
                            a.isOpen() || _.$selection.trigger("focus")
                        })
                    }
                    ,
                    d.prototype.clear = function() {
                        var a = this.$selection.find(".select2-selection__rendered");
                        a.empty(),
                        a.removeAttr("title")
                    }
                    ,
                    d.prototype.display = function(a, m) {
                        var _ = this.options.get("templateSelection")
                          , M = this.options.get("escapeMarkup");
                        return M(_(a, m))
                    }
                    ,
                    d.prototype.selectionContainer = function() {
                        return n("<span></span>")
                    }
                    ,
                    d.prototype.update = function(a) {
                        if (a.length === 0) {
                            this.clear();
                            return
                        }
                        var m = a[0]
                          , _ = this.$selection.find(".select2-selection__rendered")
                          , M = this.display(m, _);
                        _.empty().append(M);
                        var N = m.title || m.text;
                        N ? _.attr("title", N) : _.removeAttr("title")
                    }
                    ,
                    d
                }),
                D.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(n, o, l) {
                    function c(d, a) {
                        c.__super__.constructor.apply(this, arguments)
                    }
                    return l.Extend(c, o),
                    c.prototype.render = function() {
                        var d = c.__super__.render.call(this);
                        return d[0].classList.add("select2-selection--multiple"),
                        d.html('<ul class="select2-selection__rendered"></ul>'),
                        d
                    }
                    ,
                    c.prototype.bind = function(d, a) {
                        var m = this;
                        c.__super__.bind.apply(this, arguments);
                        var _ = d.id + "-container";
                        this.$selection.find(".select2-selection__rendered").attr("id", _),
                        this.$selection.on("click", function(M) {
                            m.trigger("toggle", {
                                originalEvent: M
                            })
                        }),
                        this.$selection.on("click", ".select2-selection__choice__remove", function(M) {
                            if (!m.isDisabled()) {
                                var N = n(this)
                                  , W = N.parent()
                                  , U = l.GetData(W[0], "data");
                                m.trigger("unselect", {
                                    originalEvent: M,
                                    data: U
                                })
                            }
                        }),
                        this.$selection.on("keydown", ".select2-selection__choice__remove", function(M) {
                            m.isDisabled() || M.stopPropagation()
                        })
                    }
                    ,
                    c.prototype.clear = function() {
                        var d = this.$selection.find(".select2-selection__rendered");
                        d.empty(),
                        d.removeAttr("title")
                    }
                    ,
                    c.prototype.display = function(d, a) {
                        var m = this.options.get("templateSelection")
                          , _ = this.options.get("escapeMarkup");
                        return _(m(d, a))
                    }
                    ,
                    c.prototype.selectionContainer = function() {
                        var d = n('<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>');
                        return d
                    }
                    ,
                    c.prototype.update = function(d) {
                        if (this.clear(),
                        d.length !== 0) {
                            for (var a = [], m = this.$selection.find(".select2-selection__rendered").attr("id") + "-choice-", _ = 0; _ < d.length; _++) {
                                var M = d[_]
                                  , N = this.selectionContainer()
                                  , W = this.display(M, N)
                                  , U = m + l.generateChars(4) + "-";
                                M.id ? U += M.id : U += l.generateChars(4),
                                N.find(".select2-selection__choice__display").append(W).attr("id", U);
                                var z = M.title || M.text;
                                z && N.attr("title", z);
                                var pe = this.options.get("translations").get("removeItem")
                                  , fe = N.find(".select2-selection__choice__remove");
                                fe.attr("title", pe()),
                                fe.attr("aria-label", pe()),
                                fe.attr("aria-describedby", U),
                                l.StoreData(N[0], "data", M),
                                a.push(N)
                            }
                            var we = this.$selection.find(".select2-selection__rendered");
                            we.append(a)
                        }
                    }
                    ,
                    c
                }),
                D.define("select2/selection/placeholder", [], function() {
                    function n(o, l, c) {
                        this.placeholder = this.normalizePlaceholder(c.get("placeholder")),
                        o.call(this, l, c)
                    }
                    return n.prototype.normalizePlaceholder = function(o, l) {
                        return typeof l == "string" && (l = {
                            id: "",
                            text: l
                        }),
                        l
                    }
                    ,
                    n.prototype.createPlaceholder = function(o, l) {
                        var c = this.selectionContainer();
                        c.html(this.display(l)),
                        c[0].classList.add("select2-selection__placeholder"),
                        c[0].classList.remove("select2-selection__choice");
                        var d = l.title || l.text || c.text();
                        return this.$selection.find(".select2-selection__rendered").attr("title", d),
                        c
                    }
                    ,
                    n.prototype.update = function(o, l) {
                        var c = l.length == 1 && l[0].id != this.placeholder.id
                          , d = l.length > 1;
                        if (d || c)
                            return o.call(this, l);
                        this.clear();
                        var a = this.createPlaceholder(this.placeholder);
                        this.$selection.find(".select2-selection__rendered").append(a)
                    }
                    ,
                    n
                }),
                D.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function(n, o, l) {
                    function c() {}
                    return c.prototype.bind = function(d, a, m) {
                        var _ = this;
                        d.call(this, a, m),
                        this.placeholder == null && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),
                        this.$selection.on("mousedown", ".select2-selection__clear", function(M) {
                            _._handleClear(M)
                        }),
                        a.on("keypress", function(M) {
                            _._handleKeyboardClear(M, a)
                        })
                    }
                    ,
                    c.prototype._handleClear = function(d, a) {
                        if (!this.isDisabled()) {
                            var m = this.$selection.find(".select2-selection__clear");
                            if (m.length !== 0) {
                                a.stopPropagation();
                                var _ = l.GetData(m[0], "data")
                                  , M = this.$element.val();
                                this.$element.val(this.placeholder.id);
                                var N = {
                                    data: _
                                };
                                if (this.trigger("clear", N),
                                N.prevented) {
                                    this.$element.val(M);
                                    return
                                }
                                for (var W = 0; W < _.length; W++)
                                    if (N = {
                                        data: _[W]
                                    },
                                    this.trigger("unselect", N),
                                    N.prevented) {
                                        this.$element.val(M);
                                        return
                                    }
                                this.$element.trigger("input").trigger("change"),
                                this.trigger("toggle", {})
                            }
                        }
                    }
                    ,
                    c.prototype._handleKeyboardClear = function(d, a, m) {
                        m.isOpen() || (a.which == o.DELETE || a.which == o.BACKSPACE) && this._handleClear(a)
                    }
                    ,
                    c.prototype.update = function(d, a) {
                        if (d.call(this, a),
                        this.$selection.find(".select2-selection__clear").remove(),
                        this.$selection[0].classList.remove("select2-selection--clearable"),
                        !(this.$selection.find(".select2-selection__placeholder").length > 0 || a.length === 0)) {
                            var m = this.$selection.find(".select2-selection__rendered").attr("id")
                              , _ = this.options.get("translations").get("removeAllItems")
                              , M = n('<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>');
                            M.attr("title", _()),
                            M.attr("aria-label", _()),
                            M.attr("aria-describedby", m),
                            l.StoreData(M[0], "data", a),
                            this.$selection.prepend(M),
                            this.$selection[0].classList.add("select2-selection--clearable")
                        }
                    }
                    ,
                    c
                }),
                D.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(n, o, l) {
                    function c(d, a, m) {
                        d.call(this, a, m)
                    }
                    return c.prototype.render = function(d) {
                        var a = this.options.get("translations").get("search")
                          , m = n('<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>');
                        this.$searchContainer = m,
                        this.$search = m.find("textarea"),
                        this.$search.prop("autocomplete", this.options.get("autocomplete")),
                        this.$search.attr("aria-label", a());
                        var _ = d.call(this);
                        return this._transferTabIndex(),
                        _.append(this.$searchContainer),
                        _
                    }
                    ,
                    c.prototype.bind = function(d, a, m) {
                        var _ = this
                          , M = a.id + "-results"
                          , N = a.id + "-container";
                        d.call(this, a, m),
                        _.$search.attr("aria-describedby", N),
                        a.on("open", function() {
                            _.$search.attr("aria-controls", M),
                            _.$search.trigger("focus")
                        }),
                        a.on("close", function() {
                            _.$search.val(""),
                            _.resizeSearch(),
                            _.$search.removeAttr("aria-controls"),
                            _.$search.removeAttr("aria-activedescendant"),
                            _.$search.trigger("focus")
                        }),
                        a.on("enable", function() {
                            _.$search.prop("disabled", !1),
                            _._transferTabIndex()
                        }),
                        a.on("disable", function() {
                            _.$search.prop("disabled", !0)
                        }),
                        a.on("focus", function(z) {
                            _.$search.trigger("focus")
                        }),
                        a.on("results:focus", function(z) {
                            z.data._resultId ? _.$search.attr("aria-activedescendant", z.data._resultId) : _.$search.removeAttr("aria-activedescendant")
                        }),
                        this.$selection.on("focusin", ".select2-search--inline", function(z) {
                            _.trigger("focus", z)
                        }),
                        this.$selection.on("focusout", ".select2-search--inline", function(z) {
                            _._handleBlur(z)
                        }),
                        this.$selection.on("keydown", ".select2-search--inline", function(z) {
                            z.stopPropagation(),
                            _.trigger("keypress", z),
                            _._keyUpPrevented = z.isDefaultPrevented();
                            var pe = z.which;
                            if (pe === l.BACKSPACE && _.$search.val() === "") {
                                var fe = _.$selection.find(".select2-selection__choice").last();
                                if (fe.length > 0) {
                                    var we = o.GetData(fe[0], "data");
                                    _.searchRemoveChoice(we),
                                    z.preventDefault()
                                }
                            }
                        }),
                        this.$selection.on("click", ".select2-search--inline", function(z) {
                            _.$search.val() && z.stopPropagation()
                        });
                        var W = document.documentMode
                          , U = W && W <= 11;
                        this.$selection.on("input.searchcheck", ".select2-search--inline", function(z) {
                            if (U) {
                                _.$selection.off("input.search input.searchcheck");
                                return
                            }
                            _.$selection.off("keyup.search")
                        }),
                        this.$selection.on("keyup.search input.search", ".select2-search--inline", function(z) {
                            if (U && z.type === "input") {
                                _.$selection.off("input.search input.searchcheck");
                                return
                            }
                            var pe = z.which;
                            pe == l.SHIFT || pe == l.CTRL || pe == l.ALT || pe != l.TAB && _.handleSearch(z)
                        })
                    }
                    ,
                    c.prototype._transferTabIndex = function(d) {
                        this.$search.attr("tabindex", this.$selection.attr("tabindex")),
                        this.$selection.attr("tabindex", "-1")
                    }
                    ,
                    c.prototype.createPlaceholder = function(d, a) {
                        this.$search.attr("placeholder", a.text)
                    }
                    ,
                    c.prototype.update = function(d, a) {
                        var m = this.$search[0] == document.activeElement;
                        this.$search.attr("placeholder", ""),
                        d.call(this, a),
                        this.resizeSearch(),
                        m && this.$search.trigger("focus")
                    }
                    ,
                    c.prototype.handleSearch = function() {
                        if (this.resizeSearch(),
                        !this._keyUpPrevented) {
                            var d = this.$search.val();
                            this.trigger("query", {
                                term: d
                            })
                        }
                        this._keyUpPrevented = !1
                    }
                    ,
                    c.prototype.searchRemoveChoice = function(d, a) {
                        this.trigger("unselect", {
                            data: a
                        }),
                        this.$search.val(a.text),
                        this.handleSearch()
                    }
                    ,
                    c.prototype.resizeSearch = function() {
                        this.$search.css("width", "25px");
                        var d = "100%";
                        if (this.$search.attr("placeholder") === "") {
                            var a = this.$search.val().length + 1;
                            d = a * .75 + "em"
                        }
                        this.$search.css("width", d)
                    }
                    ,
                    c
                }),
                D.define("select2/selection/selectionCss", ["../utils"], function(n) {
                    function o() {}
                    return o.prototype.render = function(l) {
                        var c = l.call(this)
                          , d = this.options.get("selectionCssClass") || "";
                        return d.indexOf(":all:") !== -1 && (d = d.replace(":all:", ""),
                        n.copyNonInternalCssClasses(c[0], this.$element[0])),
                        c.addClass(d),
                        c
                    }
                    ,
                    o
                }),
                D.define("select2/selection/eventRelay", ["jquery"], function(n) {
                    function o() {}
                    return o.prototype.bind = function(l, c, d) {
                        var a = this
                          , m = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"]
                          , _ = ["opening", "closing", "selecting", "unselecting", "clearing"];
                        l.call(this, c, d),
                        c.on("*", function(M, N) {
                            if (m.indexOf(M) !== -1) {
                                N = N || {};
                                var W = n.Event("select2:" + M, {
                                    params: N
                                });
                                a.$element.trigger(W),
                                _.indexOf(M) !== -1 && (N.prevented = W.isDefaultPrevented())
                            }
                        })
                    }
                    ,
                    o
                }),
                D.define("select2/translation", ["jquery", "require"], function(n, o) {
                    function l(c) {
                        this.dict = c || {}
                    }
                    return l.prototype.all = function() {
                        return this.dict
                    }
                    ,
                    l.prototype.get = function(c) {
                        return this.dict[c]
                    }
                    ,
                    l.prototype.extend = function(c) {
                        this.dict = n.extend({}, c.all(), this.dict)
                    }
                    ,
                    l._cache = {},
                    l.loadPath = function(c) {
                        if (!(c in l._cache)) {
                            var d = o(c);
                            l._cache[c] = d
                        }
                        return new l(l._cache[c])
                    }
                    ,
                    l
                }),
                D.define("select2/diacritics", [], function() {
                    var n = {
                        "Ⓐ": "A",
                        Ａ: "A",
                        À: "A",
                        Á: "A",
                        Â: "A",
                        Ầ: "A",
                        Ấ: "A",
                        Ẫ: "A",
                        Ẩ: "A",
                        Ã: "A",
                        Ā: "A",
                        Ă: "A",
                        Ằ: "A",
                        Ắ: "A",
                        Ẵ: "A",
                        Ẳ: "A",
                        Ȧ: "A",
                        Ǡ: "A",
                        Ä: "A",
                        Ǟ: "A",
                        Ả: "A",
                        Å: "A",
                        Ǻ: "A",
                        Ǎ: "A",
                        Ȁ: "A",
                        Ȃ: "A",
                        Ạ: "A",
                        Ậ: "A",
                        Ặ: "A",
                        Ḁ: "A",
                        Ą: "A",
                        "Ⱥ": "A",
                        "Ɐ": "A",
                        "Ꜳ": "AA",
                        Æ: "AE",
                        Ǽ: "AE",
                        Ǣ: "AE",
                        "Ꜵ": "AO",
                        "Ꜷ": "AU",
                        "Ꜹ": "AV",
                        "Ꜻ": "AV",
                        "Ꜽ": "AY",
                        "Ⓑ": "B",
                        Ｂ: "B",
                        Ḃ: "B",
                        Ḅ: "B",
                        Ḇ: "B",
                        "Ƀ": "B",
                        Ƃ: "B",
                        Ɓ: "B",
                        "Ⓒ": "C",
                        Ｃ: "C",
                        Ć: "C",
                        Ĉ: "C",
                        Ċ: "C",
                        Č: "C",
                        Ç: "C",
                        Ḉ: "C",
                        Ƈ: "C",
                        "Ȼ": "C",
                        "Ꜿ": "C",
                        "Ⓓ": "D",
                        Ｄ: "D",
                        Ḋ: "D",
                        Ď: "D",
                        Ḍ: "D",
                        Ḑ: "D",
                        Ḓ: "D",
                        Ḏ: "D",
                        Đ: "D",
                        Ƌ: "D",
                        Ɗ: "D",
                        Ɖ: "D",
                        "Ꝺ": "D",
                        Ǳ: "DZ",
                        Ǆ: "DZ",
                        ǲ: "Dz",
                        ǅ: "Dz",
                        "Ⓔ": "E",
                        Ｅ: "E",
                        È: "E",
                        É: "E",
                        Ê: "E",
                        Ề: "E",
                        Ế: "E",
                        Ễ: "E",
                        Ể: "E",
                        Ẽ: "E",
                        Ē: "E",
                        Ḕ: "E",
                        Ḗ: "E",
                        Ĕ: "E",
                        Ė: "E",
                        Ë: "E",
                        Ẻ: "E",
                        Ě: "E",
                        Ȅ: "E",
                        Ȇ: "E",
                        Ẹ: "E",
                        Ệ: "E",
                        Ȩ: "E",
                        Ḝ: "E",
                        Ę: "E",
                        Ḙ: "E",
                        Ḛ: "E",
                        Ɛ: "E",
                        Ǝ: "E",
                        "Ⓕ": "F",
                        Ｆ: "F",
                        Ḟ: "F",
                        Ƒ: "F",
                        "Ꝼ": "F",
                        "Ⓖ": "G",
                        Ｇ: "G",
                        Ǵ: "G",
                        Ĝ: "G",
                        Ḡ: "G",
                        Ğ: "G",
                        Ġ: "G",
                        Ǧ: "G",
                        Ģ: "G",
                        Ǥ: "G",
                        Ɠ: "G",
                        "Ꞡ": "G",
                        "Ᵹ": "G",
                        "Ꝿ": "G",
                        "Ⓗ": "H",
                        Ｈ: "H",
                        Ĥ: "H",
                        Ḣ: "H",
                        Ḧ: "H",
                        Ȟ: "H",
                        Ḥ: "H",
                        Ḩ: "H",
                        Ḫ: "H",
                        Ħ: "H",
                        "Ⱨ": "H",
                        "Ⱶ": "H",
                        "Ɥ": "H",
                        "Ⓘ": "I",
                        Ｉ: "I",
                        Ì: "I",
                        Í: "I",
                        Î: "I",
                        Ĩ: "I",
                        Ī: "I",
                        Ĭ: "I",
                        İ: "I",
                        Ï: "I",
                        Ḯ: "I",
                        Ỉ: "I",
                        Ǐ: "I",
                        Ȉ: "I",
                        Ȋ: "I",
                        Ị: "I",
                        Į: "I",
                        Ḭ: "I",
                        Ɨ: "I",
                        "Ⓙ": "J",
                        Ｊ: "J",
                        Ĵ: "J",
                        "Ɉ": "J",
                        "Ⓚ": "K",
                        Ｋ: "K",
                        Ḱ: "K",
                        Ǩ: "K",
                        Ḳ: "K",
                        Ķ: "K",
                        Ḵ: "K",
                        Ƙ: "K",
                        "Ⱪ": "K",
                        "Ꝁ": "K",
                        "Ꝃ": "K",
                        "Ꝅ": "K",
                        "Ꞣ": "K",
                        "Ⓛ": "L",
                        Ｌ: "L",
                        Ŀ: "L",
                        Ĺ: "L",
                        Ľ: "L",
                        Ḷ: "L",
                        Ḹ: "L",
                        Ļ: "L",
                        Ḽ: "L",
                        Ḻ: "L",
                        Ł: "L",
                        "Ƚ": "L",
                        "Ɫ": "L",
                        "Ⱡ": "L",
                        "Ꝉ": "L",
                        "Ꝇ": "L",
                        "Ꞁ": "L",
                        Ǉ: "LJ",
                        ǈ: "Lj",
                        "Ⓜ": "M",
                        Ｍ: "M",
                        Ḿ: "M",
                        Ṁ: "M",
                        Ṃ: "M",
                        "Ɱ": "M",
                        Ɯ: "M",
                        "Ⓝ": "N",
                        Ｎ: "N",
                        Ǹ: "N",
                        Ń: "N",
                        Ñ: "N",
                        Ṅ: "N",
                        Ň: "N",
                        Ṇ: "N",
                        Ņ: "N",
                        Ṋ: "N",
                        Ṉ: "N",
                        "Ƞ": "N",
                        Ɲ: "N",
                        "Ꞑ": "N",
                        "Ꞥ": "N",
                        Ǌ: "NJ",
                        ǋ: "Nj",
                        "Ⓞ": "O",
                        Ｏ: "O",
                        Ò: "O",
                        Ó: "O",
                        Ô: "O",
                        Ồ: "O",
                        Ố: "O",
                        Ỗ: "O",
                        Ổ: "O",
                        Õ: "O",
                        Ṍ: "O",
                        Ȭ: "O",
                        Ṏ: "O",
                        Ō: "O",
                        Ṑ: "O",
                        Ṓ: "O",
                        Ŏ: "O",
                        Ȯ: "O",
                        Ȱ: "O",
                        Ö: "O",
                        Ȫ: "O",
                        Ỏ: "O",
                        Ő: "O",
                        Ǒ: "O",
                        Ȍ: "O",
                        Ȏ: "O",
                        Ơ: "O",
                        Ờ: "O",
                        Ớ: "O",
                        Ỡ: "O",
                        Ở: "O",
                        Ợ: "O",
                        Ọ: "O",
                        Ộ: "O",
                        Ǫ: "O",
                        Ǭ: "O",
                        Ø: "O",
                        Ǿ: "O",
                        Ɔ: "O",
                        Ɵ: "O",
                        "Ꝋ": "O",
                        "Ꝍ": "O",
                        Œ: "OE",
                        Ƣ: "OI",
                        "Ꝏ": "OO",
                        Ȣ: "OU",
                        "Ⓟ": "P",
                        Ｐ: "P",
                        Ṕ: "P",
                        Ṗ: "P",
                        Ƥ: "P",
                        "Ᵽ": "P",
                        "Ꝑ": "P",
                        "Ꝓ": "P",
                        "Ꝕ": "P",
                        "Ⓠ": "Q",
                        Ｑ: "Q",
                        "Ꝗ": "Q",
                        "Ꝙ": "Q",
                        "Ɋ": "Q",
                        "Ⓡ": "R",
                        Ｒ: "R",
                        Ŕ: "R",
                        Ṙ: "R",
                        Ř: "R",
                        Ȑ: "R",
                        Ȓ: "R",
                        Ṛ: "R",
                        Ṝ: "R",
                        Ŗ: "R",
                        Ṟ: "R",
                        "Ɍ": "R",
                        "Ɽ": "R",
                        "Ꝛ": "R",
                        "Ꞧ": "R",
                        "Ꞃ": "R",
                        "Ⓢ": "S",
                        Ｓ: "S",
                        "ẞ": "S",
                        Ś: "S",
                        Ṥ: "S",
                        Ŝ: "S",
                        Ṡ: "S",
                        Š: "S",
                        Ṧ: "S",
                        Ṣ: "S",
                        Ṩ: "S",
                        Ș: "S",
                        Ş: "S",
                        "Ȿ": "S",
                        "Ꞩ": "S",
                        "Ꞅ": "S",
                        "Ⓣ": "T",
                        Ｔ: "T",
                        Ṫ: "T",
                        Ť: "T",
                        Ṭ: "T",
                        Ț: "T",
                        Ţ: "T",
                        Ṱ: "T",
                        Ṯ: "T",
                        Ŧ: "T",
                        Ƭ: "T",
                        Ʈ: "T",
                        "Ⱦ": "T",
                        "Ꞇ": "T",
                        "Ꜩ": "TZ",
                        "Ⓤ": "U",
                        Ｕ: "U",
                        Ù: "U",
                        Ú: "U",
                        Û: "U",
                        Ũ: "U",
                        Ṹ: "U",
                        Ū: "U",
                        Ṻ: "U",
                        Ŭ: "U",
                        Ü: "U",
                        Ǜ: "U",
                        Ǘ: "U",
                        Ǖ: "U",
                        Ǚ: "U",
                        Ủ: "U",
                        Ů: "U",
                        Ű: "U",
                        Ǔ: "U",
                        Ȕ: "U",
                        Ȗ: "U",
                        Ư: "U",
                        Ừ: "U",
                        Ứ: "U",
                        Ữ: "U",
                        Ử: "U",
                        Ự: "U",
                        Ụ: "U",
                        Ṳ: "U",
                        Ų: "U",
                        Ṷ: "U",
                        Ṵ: "U",
                        "Ʉ": "U",
                        "Ⓥ": "V",
                        Ｖ: "V",
                        Ṽ: "V",
                        Ṿ: "V",
                        Ʋ: "V",
                        "Ꝟ": "V",
                        "Ʌ": "V",
                        "Ꝡ": "VY",
                        "Ⓦ": "W",
                        Ｗ: "W",
                        Ẁ: "W",
                        Ẃ: "W",
                        Ŵ: "W",
                        Ẇ: "W",
                        Ẅ: "W",
                        Ẉ: "W",
                        "Ⱳ": "W",
                        "Ⓧ": "X",
                        Ｘ: "X",
                        Ẋ: "X",
                        Ẍ: "X",
                        "Ⓨ": "Y",
                        Ｙ: "Y",
                        Ỳ: "Y",
                        Ý: "Y",
                        Ŷ: "Y",
                        Ỹ: "Y",
                        Ȳ: "Y",
                        Ẏ: "Y",
                        Ÿ: "Y",
                        Ỷ: "Y",
                        Ỵ: "Y",
                        Ƴ: "Y",
                        "Ɏ": "Y",
                        "Ỿ": "Y",
                        "Ⓩ": "Z",
                        Ｚ: "Z",
                        Ź: "Z",
                        Ẑ: "Z",
                        Ż: "Z",
                        Ž: "Z",
                        Ẓ: "Z",
                        Ẕ: "Z",
                        Ƶ: "Z",
                        Ȥ: "Z",
                        "Ɀ": "Z",
                        "Ⱬ": "Z",
                        "Ꝣ": "Z",
                        "ⓐ": "a",
                        ａ: "a",
                        ẚ: "a",
                        à: "a",
                        á: "a",
                        â: "a",
                        ầ: "a",
                        ấ: "a",
                        ẫ: "a",
                        ẩ: "a",
                        ã: "a",
                        ā: "a",
                        ă: "a",
                        ằ: "a",
                        ắ: "a",
                        ẵ: "a",
                        ẳ: "a",
                        ȧ: "a",
                        ǡ: "a",
                        ä: "a",
                        ǟ: "a",
                        ả: "a",
                        å: "a",
                        ǻ: "a",
                        ǎ: "a",
                        ȁ: "a",
                        ȃ: "a",
                        ạ: "a",
                        ậ: "a",
                        ặ: "a",
                        ḁ: "a",
                        ą: "a",
                        "ⱥ": "a",
                        ɐ: "a",
                        "ꜳ": "aa",
                        æ: "ae",
                        ǽ: "ae",
                        ǣ: "ae",
                        "ꜵ": "ao",
                        "ꜷ": "au",
                        "ꜹ": "av",
                        "ꜻ": "av",
                        "ꜽ": "ay",
                        "ⓑ": "b",
                        ｂ: "b",
                        ḃ: "b",
                        ḅ: "b",
                        ḇ: "b",
                        ƀ: "b",
                        ƃ: "b",
                        ɓ: "b",
                        "ⓒ": "c",
                        ｃ: "c",
                        ć: "c",
                        ĉ: "c",
                        ċ: "c",
                        č: "c",
                        ç: "c",
                        ḉ: "c",
                        ƈ: "c",
                        "ȼ": "c",
                        "ꜿ": "c",
                        "ↄ": "c",
                        "ⓓ": "d",
                        ｄ: "d",
                        ḋ: "d",
                        ď: "d",
                        ḍ: "d",
                        ḑ: "d",
                        ḓ: "d",
                        ḏ: "d",
                        đ: "d",
                        ƌ: "d",
                        ɖ: "d",
                        ɗ: "d",
                        "ꝺ": "d",
                        ǳ: "dz",
                        ǆ: "dz",
                        "ⓔ": "e",
                        ｅ: "e",
                        è: "e",
                        é: "e",
                        ê: "e",
                        ề: "e",
                        ế: "e",
                        ễ: "e",
                        ể: "e",
                        ẽ: "e",
                        ē: "e",
                        ḕ: "e",
                        ḗ: "e",
                        ĕ: "e",
                        ė: "e",
                        ë: "e",
                        ẻ: "e",
                        ě: "e",
                        ȅ: "e",
                        ȇ: "e",
                        ẹ: "e",
                        ệ: "e",
                        ȩ: "e",
                        ḝ: "e",
                        ę: "e",
                        ḙ: "e",
                        ḛ: "e",
                        "ɇ": "e",
                        ɛ: "e",
                        ǝ: "e",
                        "ⓕ": "f",
                        ｆ: "f",
                        ḟ: "f",
                        ƒ: "f",
                        "ꝼ": "f",
                        "ⓖ": "g",
                        ｇ: "g",
                        ǵ: "g",
                        ĝ: "g",
                        ḡ: "g",
                        ğ: "g",
                        ġ: "g",
                        ǧ: "g",
                        ģ: "g",
                        ǥ: "g",
                        ɠ: "g",
                        "ꞡ": "g",
                        "ᵹ": "g",
                        "ꝿ": "g",
                        "ⓗ": "h",
                        ｈ: "h",
                        ĥ: "h",
                        ḣ: "h",
                        ḧ: "h",
                        ȟ: "h",
                        ḥ: "h",
                        ḩ: "h",
                        ḫ: "h",
                        ẖ: "h",
                        ħ: "h",
                        "ⱨ": "h",
                        "ⱶ": "h",
                        ɥ: "h",
                        ƕ: "hv",
                        "ⓘ": "i",
                        ｉ: "i",
                        ì: "i",
                        í: "i",
                        î: "i",
                        ĩ: "i",
                        ī: "i",
                        ĭ: "i",
                        ï: "i",
                        ḯ: "i",
                        ỉ: "i",
                        ǐ: "i",
                        ȉ: "i",
                        ȋ: "i",
                        ị: "i",
                        į: "i",
                        ḭ: "i",
                        ɨ: "i",
                        ı: "i",
                        "ⓙ": "j",
                        ｊ: "j",
                        ĵ: "j",
                        ǰ: "j",
                        "ɉ": "j",
                        "ⓚ": "k",
                        ｋ: "k",
                        ḱ: "k",
                        ǩ: "k",
                        ḳ: "k",
                        ķ: "k",
                        ḵ: "k",
                        ƙ: "k",
                        "ⱪ": "k",
                        "ꝁ": "k",
                        "ꝃ": "k",
                        "ꝅ": "k",
                        "ꞣ": "k",
                        "ⓛ": "l",
                        ｌ: "l",
                        ŀ: "l",
                        ĺ: "l",
                        ľ: "l",
                        ḷ: "l",
                        ḹ: "l",
                        ļ: "l",
                        ḽ: "l",
                        ḻ: "l",
                        ſ: "l",
                        ł: "l",
                        ƚ: "l",
                        ɫ: "l",
                        "ⱡ": "l",
                        "ꝉ": "l",
                        "ꞁ": "l",
                        "ꝇ": "l",
                        ǉ: "lj",
                        "ⓜ": "m",
                        ｍ: "m",
                        ḿ: "m",
                        ṁ: "m",
                        ṃ: "m",
                        ɱ: "m",
                        ɯ: "m",
                        "ⓝ": "n",
                        ｎ: "n",
                        ǹ: "n",
                        ń: "n",
                        ñ: "n",
                        ṅ: "n",
                        ň: "n",
                        ṇ: "n",
                        ņ: "n",
                        ṋ: "n",
                        ṉ: "n",
                        ƞ: "n",
                        ɲ: "n",
                        ŉ: "n",
                        "ꞑ": "n",
                        "ꞥ": "n",
                        ǌ: "nj",
                        "ⓞ": "o",
                        ｏ: "o",
                        ò: "o",
                        ó: "o",
                        ô: "o",
                        ồ: "o",
                        ố: "o",
                        ỗ: "o",
                        ổ: "o",
                        õ: "o",
                        ṍ: "o",
                        ȭ: "o",
                        ṏ: "o",
                        ō: "o",
                        ṑ: "o",
                        ṓ: "o",
                        ŏ: "o",
                        ȯ: "o",
                        ȱ: "o",
                        ö: "o",
                        ȫ: "o",
                        ỏ: "o",
                        ő: "o",
                        ǒ: "o",
                        ȍ: "o",
                        ȏ: "o",
                        ơ: "o",
                        ờ: "o",
                        ớ: "o",
                        ỡ: "o",
                        ở: "o",
                        ợ: "o",
                        ọ: "o",
                        ộ: "o",
                        ǫ: "o",
                        ǭ: "o",
                        ø: "o",
                        ǿ: "o",
                        ɔ: "o",
                        "ꝋ": "o",
                        "ꝍ": "o",
                        ɵ: "o",
                        œ: "oe",
                        ƣ: "oi",
                        ȣ: "ou",
                        "ꝏ": "oo",
                        "ⓟ": "p",
                        ｐ: "p",
                        ṕ: "p",
                        ṗ: "p",
                        ƥ: "p",
                        "ᵽ": "p",
                        "ꝑ": "p",
                        "ꝓ": "p",
                        "ꝕ": "p",
                        "ⓠ": "q",
                        ｑ: "q",
                        "ɋ": "q",
                        "ꝗ": "q",
                        "ꝙ": "q",
                        "ⓡ": "r",
                        ｒ: "r",
                        ŕ: "r",
                        ṙ: "r",
                        ř: "r",
                        ȑ: "r",
                        ȓ: "r",
                        ṛ: "r",
                        ṝ: "r",
                        ŗ: "r",
                        ṟ: "r",
                        "ɍ": "r",
                        ɽ: "r",
                        "ꝛ": "r",
                        "ꞧ": "r",
                        "ꞃ": "r",
                        "ⓢ": "s",
                        ｓ: "s",
                        ß: "s",
                        ś: "s",
                        ṥ: "s",
                        ŝ: "s",
                        ṡ: "s",
                        š: "s",
                        ṧ: "s",
                        ṣ: "s",
                        ṩ: "s",
                        ș: "s",
                        ş: "s",
                        "ȿ": "s",
                        "ꞩ": "s",
                        "ꞅ": "s",
                        ẛ: "s",
                        "ⓣ": "t",
                        ｔ: "t",
                        ṫ: "t",
                        ẗ: "t",
                        ť: "t",
                        ṭ: "t",
                        ț: "t",
                        ţ: "t",
                        ṱ: "t",
                        ṯ: "t",
                        ŧ: "t",
                        ƭ: "t",
                        ʈ: "t",
                        "ⱦ": "t",
                        "ꞇ": "t",
                        "ꜩ": "tz",
                        "ⓤ": "u",
                        ｕ: "u",
                        ù: "u",
                        ú: "u",
                        û: "u",
                        ũ: "u",
                        ṹ: "u",
                        ū: "u",
                        ṻ: "u",
                        ŭ: "u",
                        ü: "u",
                        ǜ: "u",
                        ǘ: "u",
                        ǖ: "u",
                        ǚ: "u",
                        ủ: "u",
                        ů: "u",
                        ű: "u",
                        ǔ: "u",
                        ȕ: "u",
                        ȗ: "u",
                        ư: "u",
                        ừ: "u",
                        ứ: "u",
                        ữ: "u",
                        ử: "u",
                        ự: "u",
                        ụ: "u",
                        ṳ: "u",
                        ų: "u",
                        ṷ: "u",
                        ṵ: "u",
                        ʉ: "u",
                        "ⓥ": "v",
                        ｖ: "v",
                        ṽ: "v",
                        ṿ: "v",
                        ʋ: "v",
                        "ꝟ": "v",
                        ʌ: "v",
                        "ꝡ": "vy",
                        "ⓦ": "w",
                        ｗ: "w",
                        ẁ: "w",
                        ẃ: "w",
                        ŵ: "w",
                        ẇ: "w",
                        ẅ: "w",
                        ẘ: "w",
                        ẉ: "w",
                        "ⱳ": "w",
                        "ⓧ": "x",
                        ｘ: "x",
                        ẋ: "x",
                        ẍ: "x",
                        "ⓨ": "y",
                        ｙ: "y",
                        ỳ: "y",
                        ý: "y",
                        ŷ: "y",
                        ỹ: "y",
                        ȳ: "y",
                        ẏ: "y",
                        ÿ: "y",
                        ỷ: "y",
                        ẙ: "y",
                        ỵ: "y",
                        ƴ: "y",
                        "ɏ": "y",
                        "ỿ": "y",
                        "ⓩ": "z",
                        ｚ: "z",
                        ź: "z",
                        ẑ: "z",
                        ż: "z",
                        ž: "z",
                        ẓ: "z",
                        ẕ: "z",
                        ƶ: "z",
                        ȥ: "z",
                        "ɀ": "z",
                        "ⱬ": "z",
                        "ꝣ": "z",
                        Ά: "Α",
                        Έ: "Ε",
                        Ή: "Η",
                        Ί: "Ι",
                        Ϊ: "Ι",
                        Ό: "Ο",
                        Ύ: "Υ",
                        Ϋ: "Υ",
                        Ώ: "Ω",
                        ά: "α",
                        έ: "ε",
                        ή: "η",
                        ί: "ι",
                        ϊ: "ι",
                        ΐ: "ι",
                        ό: "ο",
                        ύ: "υ",
                        ϋ: "υ",
                        ΰ: "υ",
                        ώ: "ω",
                        ς: "σ",
                        "’": "'"
                    };
                    return n
                }),
                D.define("select2/data/base", ["../utils"], function(n) {
                    function o(l, c) {
                        o.__super__.constructor.call(this)
                    }
                    return n.Extend(o, n.Observable),
                    o.prototype.current = function(l) {
                        throw new Error("The `current` method must be defined in child classes.")
                    }
                    ,
                    o.prototype.query = function(l, c) {
                        throw new Error("The `query` method must be defined in child classes.")
                    }
                    ,
                    o.prototype.bind = function(l, c) {}
                    ,
                    o.prototype.destroy = function() {}
                    ,
                    o.prototype.generateResultId = function(l, c) {
                        var d = l.id + "-result-";
                        return d += n.generateChars(4),
                        c.id != null ? d += "-" + c.id.toString() : d += "-" + n.generateChars(4),
                        d
                    }
                    ,
                    o
                }),
                D.define("select2/data/select", ["./base", "../utils", "jquery"], function(n, o, l) {
                    function c(d, a) {
                        this.$element = d,
                        this.options = a,
                        c.__super__.constructor.call(this)
                    }
                    return o.Extend(c, n),
                    c.prototype.current = function(d) {
                        var a = this
                          , m = Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"), function(_) {
                            return a.item(l(_))
                        });
                        d(m)
                    }
                    ,
                    c.prototype.select = function(d) {
                        var a = this;
                        if (d.selected = !0,
                        d.element != null && d.element.tagName.toLowerCase() === "option") {
                            d.element.selected = !0,
                            this.$element.trigger("input").trigger("change");
                            return
                        }
                        if (this.$element.prop("multiple"))
                            this.current(function(_) {
                                var M = [];
                                d = [d],
                                d.push.apply(d, _);
                                for (var N = 0; N < d.length; N++) {
                                    var W = d[N].id;
                                    M.indexOf(W) === -1 && M.push(W)
                                }
                                a.$element.val(M),
                                a.$element.trigger("input").trigger("change")
                            });
                        else {
                            var m = d.id;
                            this.$element.val(m),
                            this.$element.trigger("input").trigger("change")
                        }
                    }
                    ,
                    c.prototype.unselect = function(d) {
                        var a = this;
                        if (this.$element.prop("multiple")) {
                            if (d.selected = !1,
                            d.element != null && d.element.tagName.toLowerCase() === "option") {
                                d.element.selected = !1,
                                this.$element.trigger("input").trigger("change");
                                return
                            }
                            this.current(function(m) {
                                for (var _ = [], M = 0; M < m.length; M++) {
                                    var N = m[M].id;
                                    N !== d.id && _.indexOf(N) === -1 && _.push(N)
                                }
                                a.$element.val(_),
                                a.$element.trigger("input").trigger("change")
                            })
                        }
                    }
                    ,
                    c.prototype.bind = function(d, a) {
                        var m = this;
                        this.container = d,
                        d.on("select", function(_) {
                            m.select(_.data)
                        }),
                        d.on("unselect", function(_) {
                            m.unselect(_.data)
                        })
                    }
                    ,
                    c.prototype.destroy = function() {
                        this.$element.find("*").each(function() {
                            o.RemoveData(this)
                        })
                    }
                    ,
                    c.prototype.query = function(d, a) {
                        var m = []
                          , _ = this
                          , M = this.$element.children();
                        M.each(function() {
                            if (!(this.tagName.toLowerCase() !== "option" && this.tagName.toLowerCase() !== "optgroup")) {
                                var N = l(this)
                                  , W = _.item(N)
                                  , U = _.matches(d, W);
                                U !== null && m.push(U)
                            }
                        }),
                        a({
                            results: m
                        })
                    }
                    ,
                    c.prototype.addOptions = function(d) {
                        this.$element.append(d)
                    }
                    ,
                    c.prototype.option = function(d) {
                        var a;
                        d.children ? (a = document.createElement("optgroup"),
                        a.label = d.text) : (a = document.createElement("option"),
                        a.textContent !== void 0 ? a.textContent = d.text : a.innerText = d.text),
                        d.id !== void 0 && (a.value = d.id),
                        d.disabled && (a.disabled = !0),
                        d.selected && (a.selected = !0),
                        d.title && (a.title = d.title);
                        var m = this._normalizeItem(d);
                        return m.element = a,
                        o.StoreData(a, "data", m),
                        l(a)
                    }
                    ,
                    c.prototype.item = function(d) {
                        var a = {};
                        if (a = o.GetData(d[0], "data"),
                        a != null)
                            return a;
                        var m = d[0];
                        if (m.tagName.toLowerCase() === "option")
                            a = {
                                id: d.val(),
                                text: d.text(),
                                disabled: d.prop("disabled"),
                                selected: d.prop("selected"),
                                title: d.prop("title")
                            };
                        else if (m.tagName.toLowerCase() === "optgroup") {
                            a = {
                                text: d.prop("label"),
                                children: [],
                                title: d.prop("title")
                            };
                            for (var _ = d.children("option"), M = [], N = 0; N < _.length; N++) {
                                var W = l(_[N])
                                  , U = this.item(W);
                                M.push(U)
                            }
                            a.children = M
                        }
                        return a = this._normalizeItem(a),
                        a.element = d[0],
                        o.StoreData(d[0], "data", a),
                        a
                    }
                    ,
                    c.prototype._normalizeItem = function(d) {
                        d !== Object(d) && (d = {
                            id: d,
                            text: d
                        }),
                        d = l.extend({}, {
                            text: ""
                        }, d);
                        var a = {
                            selected: !1,
                            disabled: !1
                        };
                        return d.id != null && (d.id = d.id.toString()),
                        d.text != null && (d.text = d.text.toString()),
                        d._resultId == null && d.id && this.container != null && (d._resultId = this.generateResultId(this.container, d)),
                        l.extend({}, a, d)
                    }
                    ,
                    c.prototype.matches = function(d, a) {
                        var m = this.options.get("matcher");
                        return m(d, a)
                    }
                    ,
                    c
                }),
                D.define("select2/data/array", ["./select", "../utils", "jquery"], function(n, o, l) {
                    function c(d, a) {
                        this._dataToConvert = a.get("data") || [],
                        c.__super__.constructor.call(this, d, a)
                    }
                    return o.Extend(c, n),
                    c.prototype.bind = function(d, a) {
                        c.__super__.bind.call(this, d, a),
                        this.addOptions(this.convertToOptions(this._dataToConvert))
                    }
                    ,
                    c.prototype.select = function(d) {
                        var a = this.$element.find("option").filter(function(m, _) {
                            return _.value == d.id.toString()
                        });
                        a.length === 0 && (a = this.option(d),
                        this.addOptions(a)),
                        c.__super__.select.call(this, d)
                    }
                    ,
                    c.prototype.convertToOptions = function(d) {
                        var a = this
                          , m = this.$element.find("option")
                          , _ = m.map(function() {
                            return a.item(l(this)).id
                        }).get()
                          , M = [];
                        function N(s) {
                            return function() {
                                return l(this).val() == s.id
                            }
                        }
                        for (var W = 0; W < d.length; W++) {
                            var U = this._normalizeItem(d[W]);
                            if (_.indexOf(U.id) >= 0) {
                                var z = m.filter(N(U))
                                  , pe = this.item(z)
                                  , fe = l.extend(!0, {}, U, pe)
                                  , we = this.option(fe);
                                z.replaceWith(we);
                                continue
                            }
                            var be = this.option(U);
                            if (U.children) {
                                var ne = this.convertToOptions(U.children);
                                be.append(ne)
                            }
                            M.push(be)
                        }
                        return M
                    }
                    ,
                    c
                }),
                D.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(n, o, l) {
                    function c(d, a) {
                        this.ajaxOptions = this._applyDefaults(a.get("ajax")),
                        this.ajaxOptions.processResults != null && (this.processResults = this.ajaxOptions.processResults),
                        c.__super__.constructor.call(this, d, a)
                    }
                    return o.Extend(c, n),
                    c.prototype._applyDefaults = function(d) {
                        var a = {
                            data: function(m) {
                                return l.extend({}, m, {
                                    q: m.term
                                })
                            },
                            transport: function(m, _, M) {
                                var N = l.ajax(m);
                                return N.then(_),
                                N.fail(M),
                                N
                            }
                        };
                        return l.extend({}, a, d, !0)
                    }
                    ,
                    c.prototype.processResults = function(d) {
                        return d
                    }
                    ,
                    c.prototype.query = function(d, a) {
                        var m = this;
                        this._request != null && (typeof this._request.abort == "function" && this._request.abort(),
                        this._request = null);
                        var _ = l.extend({
                            type: "GET"
                        }, this.ajaxOptions);
                        typeof _.url == "function" && (_.url = _.url.call(this.$element, d)),
                        typeof _.data == "function" && (_.data = _.data.call(this.$element, d));
                        function M() {
                            var N = _.transport(_, function(W) {
                                var U = m.processResults(W, d);
                                m.options.get("debug") && window.console && console.error && (!U || !U.results || !Array.isArray(U.results)) && console.error("Select2: The AJAX results did not return an array in the `results` key of the response."),
                                a(U)
                            }, function() {
                                "status"in N && (N.status === 0 || N.status === "0") || m.trigger("results:message", {
                                    message: "errorLoading"
                                })
                            });
                            m._request = N
                        }
                        this.ajaxOptions.delay && d.term != null ? (this._queryTimeout && window.clearTimeout(this._queryTimeout),
                        this._queryTimeout = window.setTimeout(M, this.ajaxOptions.delay)) : M()
                    }
                    ,
                    c
                }),
                D.define("select2/data/tags", ["jquery"], function(n) {
                    function o(l, c, d) {
                        var a = d.get("tags")
                          , m = d.get("createTag");
                        m !== void 0 && (this.createTag = m);
                        var _ = d.get("insertTag");
                        if (_ !== void 0 && (this.insertTag = _),
                        l.call(this, c, d),
                        Array.isArray(a))
                            for (var M = 0; M < a.length; M++) {
                                var N = a[M]
                                  , W = this._normalizeItem(N)
                                  , U = this.option(W);
                                this.$element.append(U)
                            }
                    }
                    return o.prototype.query = function(l, c, d) {
                        var a = this;
                        if (this._removeOldTags(),
                        c.term == null || c.page != null) {
                            l.call(this, c, d);
                            return
                        }
                        function m(_, M) {
                            for (var N = _.results, W = 0; W < N.length; W++) {
                                var U = N[W]
                                  , z = U.children != null && !m({
                                    results: U.children
                                }, !0)
                                  , pe = (U.text || "").toUpperCase()
                                  , fe = (c.term || "").toUpperCase()
                                  , we = pe === fe;
                                if (we || z) {
                                    if (M)
                                        return !1;
                                    _.data = N,
                                    d(_);
                                    return
                                }
                            }
                            if (M)
                                return !0;
                            var be = a.createTag(c);
                            if (be != null) {
                                var ne = a.option(be);
                                ne.attr("data-select2-tag", "true"),
                                a.addOptions([ne]),
                                a.insertTag(N, be)
                            }
                            _.results = N,
                            d(_)
                        }
                        l.call(this, c, m)
                    }
                    ,
                    o.prototype.createTag = function(l, c) {
                        if (c.term == null)
                            return null;
                        var d = c.term.trim();
                        return d === "" ? null : {
                            id: d,
                            text: d
                        }
                    }
                    ,
                    o.prototype.insertTag = function(l, c, d) {
                        c.unshift(d)
                    }
                    ,
                    o.prototype._removeOldTags = function(l) {
                        var c = this.$element.find("option[data-select2-tag]");
                        c.each(function() {
                            this.selected || n(this).remove()
                        })
                    }
                    ,
                    o
                }),
                D.define("select2/data/tokenizer", ["jquery"], function(n) {
                    function o(l, c, d) {
                        var a = d.get("tokenizer");
                        a !== void 0 && (this.tokenizer = a),
                        l.call(this, c, d)
                    }
                    return o.prototype.bind = function(l, c, d) {
                        l.call(this, c, d),
                        this.$search = c.dropdown.$search || c.selection.$search || d.find(".select2-search__field")
                    }
                    ,
                    o.prototype.query = function(l, c, d) {
                        var a = this;
                        function m(N) {
                            var W = a._normalizeItem(N)
                              , U = a.$element.find("option").filter(function() {
                                return n(this).val() === W.id
                            });
                            if (!U.length) {
                                var z = a.option(W);
                                z.attr("data-select2-tag", !0),
                                a._removeOldTags(),
                                a.addOptions([z])
                            }
                            _(W)
                        }
                        function _(N) {
                            a.trigger("select", {
                                data: N
                            })
                        }
                        c.term = c.term || "";
                        var M = this.tokenizer(c, this.options, m);
                        M.term !== c.term && (this.$search.length && (this.$search.val(M.term),
                        this.$search.trigger("focus")),
                        c.term = M.term),
                        l.call(this, c, d)
                    }
                    ,
                    o.prototype.tokenizer = function(l, c, d, a) {
                        for (var m = d.get("tokenSeparators") || [], _ = c.term, M = 0, N = this.createTag || function(fe) {
                            return {
                                id: fe.term,
                                text: fe.term
                            }
                        }
                        ; M < _.length; ) {
                            var W = _[M];
                            if (m.indexOf(W) === -1) {
                                M++;
                                continue
                            }
                            var U = _.substr(0, M)
                              , z = n.extend({}, c, {
                                term: U
                            })
                              , pe = N(z);
                            if (pe == null) {
                                M++;
                                continue
                            }
                            a(pe),
                            _ = _.substr(M + 1) || "",
                            M = 0
                        }
                        return {
                            term: _
                        }
                    }
                    ,
                    o
                }),
                D.define("select2/data/minimumInputLength", [], function() {
                    function n(o, l, c) {
                        this.minimumInputLength = c.get("minimumInputLength"),
                        o.call(this, l, c)
                    }
                    return n.prototype.query = function(o, l, c) {
                        if (l.term = l.term || "",
                        l.term.length < this.minimumInputLength) {
                            this.trigger("results:message", {
                                message: "inputTooShort",
                                args: {
                                    minimum: this.minimumInputLength,
                                    input: l.term,
                                    params: l
                                }
                            });
                            return
                        }
                        o.call(this, l, c)
                    }
                    ,
                    n
                }),
                D.define("select2/data/maximumInputLength", [], function() {
                    function n(o, l, c) {
                        this.maximumInputLength = c.get("maximumInputLength"),
                        o.call(this, l, c)
                    }
                    return n.prototype.query = function(o, l, c) {
                        if (l.term = l.term || "",
                        this.maximumInputLength > 0 && l.term.length > this.maximumInputLength) {
                            this.trigger("results:message", {
                                message: "inputTooLong",
                                args: {
                                    maximum: this.maximumInputLength,
                                    input: l.term,
                                    params: l
                                }
                            });
                            return
                        }
                        o.call(this, l, c)
                    }
                    ,
                    n
                }),
                D.define("select2/data/maximumSelectionLength", [], function() {
                    function n(o, l, c) {
                        this.maximumSelectionLength = c.get("maximumSelectionLength"),
                        o.call(this, l, c)
                    }
                    return n.prototype.bind = function(o, l, c) {
                        var d = this;
                        o.call(this, l, c),
                        l.on("select", function() {
                            d._checkIfMaximumSelected()
                        })
                    }
                    ,
                    n.prototype.query = function(o, l, c) {
                        var d = this;
                        this._checkIfMaximumSelected(function() {
                            o.call(d, l, c)
                        })
                    }
                    ,
                    n.prototype._checkIfMaximumSelected = function(o, l) {
                        var c = this;
                        this.current(function(d) {
                            var a = d != null ? d.length : 0;
                            if (c.maximumSelectionLength > 0 && a >= c.maximumSelectionLength) {
                                c.trigger("results:message", {
                                    message: "maximumSelected",
                                    args: {
                                        maximum: c.maximumSelectionLength
                                    }
                                });
                                return
                            }
                            l && l()
                        })
                    }
                    ,
                    n
                }),
                D.define("select2/dropdown", ["jquery", "./utils"], function(n, o) {
                    function l(c, d) {
                        this.$element = c,
                        this.options = d,
                        l.__super__.constructor.call(this)
                    }
                    return o.Extend(l, o.Observable),
                    l.prototype.render = function() {
                        var c = n('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                        return c.attr("dir", this.options.get("dir")),
                        this.$dropdown = c,
                        c
                    }
                    ,
                    l.prototype.bind = function() {}
                    ,
                    l.prototype.position = function(c, d) {}
                    ,
                    l.prototype.destroy = function() {
                        this.$dropdown.remove()
                    }
                    ,
                    l
                }),
                D.define("select2/dropdown/search", ["jquery"], function(n) {
                    function o() {}
                    return o.prototype.render = function(l) {
                        var c = l.call(this)
                          , d = this.options.get("translations").get("search")
                          , a = n('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');
                        return this.$searchContainer = a,
                        this.$search = a.find("input"),
                        this.$search.prop("autocomplete", this.options.get("autocomplete")),
                        this.$search.attr("aria-label", d()),
                        c.prepend(a),
                        c
                    }
                    ,
                    o.prototype.bind = function(l, c, d) {
                        var a = this
                          , m = c.id + "-results";
                        l.call(this, c, d),
                        this.$search.on("keydown", function(_) {
                            a.trigger("keypress", _),
                            a._keyUpPrevented = _.isDefaultPrevented()
                        }),
                        this.$search.on("input", function(_) {
                            n(this).off("keyup")
                        }),
                        this.$search.on("keyup input", function(_) {
                            a.handleSearch(_)
                        }),
                        c.on("open", function() {
                            a.$search.attr("tabindex", 0),
                            a.$search.attr("aria-controls", m),
                            a.$search.trigger("focus"),
                            window.setTimeout(function() {
                                a.$search.trigger("focus")
                            }, 0)
                        }),
                        c.on("close", function() {
                            a.$search.attr("tabindex", -1),
                            a.$search.removeAttr("aria-controls"),
                            a.$search.removeAttr("aria-activedescendant"),
                            a.$search.val(""),
                            a.$search.trigger("blur")
                        }),
                        c.on("focus", function() {
                            c.isOpen() || a.$search.trigger("focus")
                        }),
                        c.on("results:all", function(_) {
                            if (_.query.term == null || _.query.term === "") {
                                var M = a.showSearch(_);
                                M ? a.$searchContainer[0].classList.remove("select2-search--hide") : a.$searchContainer[0].classList.add("select2-search--hide")
                            }
                        }),
                        c.on("results:focus", function(_) {
                            _.data._resultId ? a.$search.attr("aria-activedescendant", _.data._resultId) : a.$search.removeAttr("aria-activedescendant")
                        })
                    }
                    ,
                    o.prototype.handleSearch = function(l) {
                        if (!this._keyUpPrevented) {
                            var c = this.$search.val();
                            this.trigger("query", {
                                term: c
                            })
                        }
                        this._keyUpPrevented = !1
                    }
                    ,
                    o.prototype.showSearch = function(l, c) {
                        return !0
                    }
                    ,
                    o
                }),
                D.define("select2/dropdown/hidePlaceholder", [], function() {
                    function n(o, l, c, d) {
                        this.placeholder = this.normalizePlaceholder(c.get("placeholder")),
                        o.call(this, l, c, d)
                    }
                    return n.prototype.append = function(o, l) {
                        l.results = this.removePlaceholder(l.results),
                        o.call(this, l)
                    }
                    ,
                    n.prototype.normalizePlaceholder = function(o, l) {
                        return typeof l == "string" && (l = {
                            id: "",
                            text: l
                        }),
                        l
                    }
                    ,
                    n.prototype.removePlaceholder = function(o, l) {
                        for (var c = l.slice(0), d = l.length - 1; d >= 0; d--) {
                            var a = l[d];
                            this.placeholder.id === a.id && c.splice(d, 1)
                        }
                        return c
                    }
                    ,
                    n
                }),
                D.define("select2/dropdown/infiniteScroll", ["jquery"], function(n) {
                    function o(l, c, d, a) {
                        this.lastParams = {},
                        l.call(this, c, d, a),
                        this.$loadingMore = this.createLoadingMore(),
                        this.loading = !1
                    }
                    return o.prototype.append = function(l, c) {
                        this.$loadingMore.remove(),
                        this.loading = !1,
                        l.call(this, c),
                        this.showLoadingMore(c) && (this.$results.append(this.$loadingMore),
                        this.loadMoreIfNeeded())
                    }
                    ,
                    o.prototype.bind = function(l, c, d) {
                        var a = this;
                        l.call(this, c, d),
                        c.on("query", function(m) {
                            a.lastParams = m,
                            a.loading = !0
                        }),
                        c.on("query:append", function(m) {
                            a.lastParams = m,
                            a.loading = !0
                        }),
                        this.$results.on("scroll", this.loadMoreIfNeeded.bind(this))
                    }
                    ,
                    o.prototype.loadMoreIfNeeded = function() {
                        var l = n.contains(document.documentElement, this.$loadingMore[0]);
                        if (!(this.loading || !l)) {
                            var c = this.$results.offset().top + this.$results.outerHeight(!1)
                              , d = this.$loadingMore.offset().top + this.$loadingMore.outerHeight(!1);
                            c + 50 >= d && this.loadMore()
                        }
                    }
                    ,
                    o.prototype.loadMore = function() {
                        this.loading = !0;
                        var l = n.extend({}, {
                            page: 1
                        }, this.lastParams);
                        l.page++,
                        this.trigger("query:append", l)
                    }
                    ,
                    o.prototype.showLoadingMore = function(l, c) {
                        return c.pagination && c.pagination.more
                    }
                    ,
                    o.prototype.createLoadingMore = function() {
                        var l = n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>')
                          , c = this.options.get("translations").get("loadingMore");
                        return l.html(c(this.lastParams)),
                        l
                    }
                    ,
                    o
                }),
                D.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(n, o) {
                    function l(c, d, a) {
                        this.$dropdownParent = n(a.get("dropdownParent") || document.body),
                        c.call(this, d, a)
                    }
                    return l.prototype.bind = function(c, d, a) {
                        var m = this;
                        c.call(this, d, a),
                        d.on("open", function() {
                            m._showDropdown(),
                            m._attachPositioningHandler(d),
                            m._bindContainerResultHandlers(d)
                        }),
                        d.on("close", function() {
                            m._hideDropdown(),
                            m._detachPositioningHandler(d)
                        }),
                        this.$dropdownContainer.on("mousedown", function(_) {
                            _.stopPropagation()
                        })
                    }
                    ,
                    l.prototype.destroy = function(c) {
                        c.call(this),
                        this.$dropdownContainer.remove()
                    }
                    ,
                    l.prototype.position = function(c, d, a) {
                        d.attr("class", a.attr("class")),
                        d[0].classList.remove("select2"),
                        d[0].classList.add("select2-container--open"),
                        d.css({
                            position: "absolute",
                            top: -999999
                        }),
                        this.$container = a
                    }
                    ,
                    l.prototype.render = function(c) {
                        var d = n("<span></span>")
                          , a = c.call(this);
                        return d.append(a),
                        this.$dropdownContainer = d,
                        d
                    }
                    ,
                    l.prototype._hideDropdown = function(c) {
                        this.$dropdownContainer.detach()
                    }
                    ,
                    l.prototype._bindContainerResultHandlers = function(c, d) {
                        if (!this._containerResultsHandlersBound) {
                            var a = this;
                            d.on("results:all", function() {
                                a._positionDropdown(),
                                a._resizeDropdown()
                            }),
                            d.on("results:append", function() {
                                a._positionDropdown(),
                                a._resizeDropdown()
                            }),
                            d.on("results:message", function() {
                                a._positionDropdown(),
                                a._resizeDropdown()
                            }),
                            d.on("select", function() {
                                a._positionDropdown(),
                                a._resizeDropdown()
                            }),
                            d.on("unselect", function() {
                                a._positionDropdown(),
                                a._resizeDropdown()
                            }),
                            this._containerResultsHandlersBound = !0
                        }
                    }
                    ,
                    l.prototype._attachPositioningHandler = function(c, d) {
                        var a = this
                          , m = "scroll.select2." + d.id
                          , _ = "resize.select2." + d.id
                          , M = "orientationchange.select2." + d.id
                          , N = this.$container.parents().filter(o.hasScroll);
                        N.each(function() {
                            o.StoreData(this, "select2-scroll-position", {
                                x: n(this).scrollLeft(),
                                y: n(this).scrollTop()
                            })
                        }),
                        N.on(m, function(W) {
                            var U = o.GetData(this, "select2-scroll-position");
                            n(this).scrollTop(U.y)
                        }),
                        n(window).on(m + " " + _ + " " + M, function(W) {
                            a._positionDropdown(),
                            a._resizeDropdown()
                        })
                    }
                    ,
                    l.prototype._detachPositioningHandler = function(c, d) {
                        var a = "scroll.select2." + d.id
                          , m = "resize.select2." + d.id
                          , _ = "orientationchange.select2." + d.id
                          , M = this.$container.parents().filter(o.hasScroll);
                        M.off(a),
                        n(window).off(a + " " + m + " " + _)
                    }
                    ,
                    l.prototype._positionDropdown = function() {
                        var c = n(window)
                          , d = this.$dropdown[0].classList.contains("select2-dropdown--above")
                          , a = this.$dropdown[0].classList.contains("select2-dropdown--below")
                          , m = null
                          , _ = this.$container.offset();
                        _.bottom = _.top + this.$container.outerHeight(!1);
                        var M = {
                            height: this.$container.outerHeight(!1)
                        };
                        M.top = _.top,
                        M.bottom = _.top + M.height;
                        var N = {
                            height: this.$dropdown.outerHeight(!1)
                        }
                          , W = {
                            top: c.scrollTop(),
                            bottom: c.scrollTop() + c.height()
                        }
                          , U = W.top < _.top - N.height
                          , z = W.bottom > _.bottom + N.height
                          , pe = {
                            left: _.left,
                            top: M.bottom
                        }
                          , fe = this.$dropdownParent;
                        fe.css("position") === "static" && (fe = fe.offsetParent());
                        var we = {
                            top: 0,
                            left: 0
                        };
                        (n.contains(document.body, fe[0]) || fe[0].isConnected) && (we = fe.offset()),
                        pe.top -= we.top,
                        pe.left -= we.left,
                        !d && !a && (m = "below"),
                        !z && U && !d ? m = "above" : !U && z && d && (m = "below"),
                        (m == "above" || d && m !== "below") && (pe.top = M.top - we.top - N.height),
                        m != null && (this.$dropdown[0].classList.remove("select2-dropdown--below"),
                        this.$dropdown[0].classList.remove("select2-dropdown--above"),
                        this.$dropdown[0].classList.add("select2-dropdown--" + m),
                        this.$container[0].classList.remove("select2-container--below"),
                        this.$container[0].classList.remove("select2-container--above"),
                        this.$container[0].classList.add("select2-container--" + m)),
                        this.$dropdownContainer.css(pe)
                    }
                    ,
                    l.prototype._resizeDropdown = function() {
                        var c = {
                            width: this.$container.outerWidth(!1) + "px"
                        };
                        this.options.get("dropdownAutoWidth") && (c.minWidth = c.width,
                        c.position = "relative",
                        c.width = "auto"),
                        this.$dropdown.css(c)
                    }
                    ,
                    l.prototype._showDropdown = function(c) {
                        this.$dropdownContainer.appendTo(this.$dropdownParent),
                        this._positionDropdown(),
                        this._resizeDropdown()
                    }
                    ,
                    l
                }),
                D.define("select2/dropdown/minimumResultsForSearch", [], function() {
                    function n(l) {
                        for (var c = 0, d = 0; d < l.length; d++) {
                            var a = l[d];
                            a.children ? c += n(a.children) : c++
                        }
                        return c
                    }
                    function o(l, c, d, a) {
                        this.minimumResultsForSearch = d.get("minimumResultsForSearch"),
                        this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0),
                        l.call(this, c, d, a)
                    }
                    return o.prototype.showSearch = function(l, c) {
                        return n(c.data.results) < this.minimumResultsForSearch ? !1 : l.call(this, c)
                    }
                    ,
                    o
                }),
                D.define("select2/dropdown/selectOnClose", ["../utils"], function(n) {
                    function o() {}
                    return o.prototype.bind = function(l, c, d) {
                        var a = this;
                        l.call(this, c, d),
                        c.on("close", function(m) {
                            a._handleSelectOnClose(m)
                        })
                    }
                    ,
                    o.prototype._handleSelectOnClose = function(l, c) {
                        if (c && c.originalSelect2Event != null) {
                            var d = c.originalSelect2Event;
                            if (d._type === "select" || d._type === "unselect")
                                return
                        }
                        var a = this.getHighlightedResults();
                        if (!(a.length < 1)) {
                            var m = n.GetData(a[0], "data");
                            m.element != null && m.element.selected || m.element == null && m.selected || this.trigger("select", {
                                data: m
                            })
                        }
                    }
                    ,
                    o
                }),
                D.define("select2/dropdown/closeOnSelect", [], function() {
                    function n() {}
                    return n.prototype.bind = function(o, l, c) {
                        var d = this;
                        o.call(this, l, c),
                        l.on("select", function(a) {
                            d._selectTriggered(a)
                        }),
                        l.on("unselect", function(a) {
                            d._selectTriggered(a)
                        })
                    }
                    ,
                    n.prototype._selectTriggered = function(o, l) {
                        var c = l.originalEvent;
                        c && (c.ctrlKey || c.metaKey) || this.trigger("close", {
                            originalEvent: c,
                            originalSelect2Event: l
                        })
                    }
                    ,
                    n
                }),
                D.define("select2/dropdown/dropdownCss", ["../utils"], function(n) {
                    function o() {}
                    return o.prototype.render = function(l) {
                        var c = l.call(this)
                          , d = this.options.get("dropdownCssClass") || "";
                        return d.indexOf(":all:") !== -1 && (d = d.replace(":all:", ""),
                        n.copyNonInternalCssClasses(c[0], this.$element[0])),
                        c.addClass(d),
                        c
                    }
                    ,
                    o
                }),
                D.define("select2/dropdown/tagsSearchHighlight", ["../utils"], function(n) {
                    function o() {}
                    return o.prototype.highlightFirstItem = function(l) {
                        var c = this.$results.find(".select2-results__option--selectable:not(.select2-results__option--selected)");
                        if (c.length > 0) {
                            var d = c.first()
                              , a = n.GetData(d[0], "data")
                              , m = a.element;
                            if (m && m.getAttribute && m.getAttribute("data-select2-tag") === "true") {
                                d.trigger("mouseenter");
                                return
                            }
                        }
                        l.call(this)
                    }
                    ,
                    o
                }),
                D.define("select2/i18n/en", [], function() {
                    return {
                        errorLoading: function() {
                            return "The results could not be loaded."
                        },
                        inputTooLong: function(n) {
                            var o = n.input.length - n.maximum
                              , l = "Please delete " + o + " character";
                            return o != 1 && (l += "s"),
                            l
                        },
                        inputTooShort: function(n) {
                            var o = n.minimum - n.input.length
                              , l = "Please enter " + o + " or more characters";
                            return l
                        },
                        loadingMore: function() {
                            return "Loading more results…"
                        },
                        maximumSelected: function(n) {
                            var o = "You can only select " + n.maximum + " item";
                            return n.maximum != 1 && (o += "s"),
                            o
                        },
                        noResults: function() {
                            return "No results found"
                        },
                        searching: function() {
                            return "Searching…"
                        },
                        removeAllItems: function() {
                            return "Remove all items"
                        },
                        removeItem: function() {
                            return "Remove item"
                        },
                        search: function() {
                            return "Search"
                        }
                    }
                }),
                D.define("select2/defaults", ["jquery", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/selectionCss", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./dropdown/dropdownCss", "./dropdown/tagsSearchHighlight", "./i18n/en"], function(n, o, l, c, d, a, m, _, M, N, W, U, z, pe, fe, we, be, ne, s, F, A, C, x, g, y, S, Y, q, G, se, ae) {
                    function ge() {
                        this.reset()
                    }
                    ge.prototype.apply = function(X) {
                        if (X = n.extend(!0, {}, this.defaults, X),
                        X.dataAdapter == null && (X.ajax != null ? X.dataAdapter = fe : X.data != null ? X.dataAdapter = pe : X.dataAdapter = z,
                        X.minimumInputLength > 0 && (X.dataAdapter = N.Decorate(X.dataAdapter, ne)),
                        X.maximumInputLength > 0 && (X.dataAdapter = N.Decorate(X.dataAdapter, s)),
                        X.maximumSelectionLength > 0 && (X.dataAdapter = N.Decorate(X.dataAdapter, F)),
                        X.tags && (X.dataAdapter = N.Decorate(X.dataAdapter, we)),
                        (X.tokenSeparators != null || X.tokenizer != null) && (X.dataAdapter = N.Decorate(X.dataAdapter, be))),
                        X.resultsAdapter == null && (X.resultsAdapter = o,
                        X.ajax != null && (X.resultsAdapter = N.Decorate(X.resultsAdapter, g)),
                        X.placeholder != null && (X.resultsAdapter = N.Decorate(X.resultsAdapter, x)),
                        X.selectOnClose && (X.resultsAdapter = N.Decorate(X.resultsAdapter, Y)),
                        X.tags && (X.resultsAdapter = N.Decorate(X.resultsAdapter, se))),
                        X.dropdownAdapter == null) {
                            if (X.multiple)
                                X.dropdownAdapter = A;
                            else {
                                var ve = N.Decorate(A, C);
                                X.dropdownAdapter = ve
                            }
                            X.minimumResultsForSearch !== 0 && (X.dropdownAdapter = N.Decorate(X.dropdownAdapter, S)),
                            X.closeOnSelect && (X.dropdownAdapter = N.Decorate(X.dropdownAdapter, q)),
                            X.dropdownCssClass != null && (X.dropdownAdapter = N.Decorate(X.dropdownAdapter, G)),
                            X.dropdownAdapter = N.Decorate(X.dropdownAdapter, y)
                        }
                        X.selectionAdapter == null && (X.multiple ? X.selectionAdapter = c : X.selectionAdapter = l,
                        X.placeholder != null && (X.selectionAdapter = N.Decorate(X.selectionAdapter, d)),
                        X.allowClear && (X.selectionAdapter = N.Decorate(X.selectionAdapter, a)),
                        X.multiple && (X.selectionAdapter = N.Decorate(X.selectionAdapter, m)),
                        X.selectionCssClass != null && (X.selectionAdapter = N.Decorate(X.selectionAdapter, _)),
                        X.selectionAdapter = N.Decorate(X.selectionAdapter, M)),
                        X.language = this._resolveLanguage(X.language),
                        X.language.push("en");
                        for (var Ee = [], re = 0; re < X.language.length; re++) {
                            var We = X.language[re];
                            Ee.indexOf(We) === -1 && Ee.push(We)
                        }
                        return X.language = Ee,
                        X.translations = this._processTranslations(X.language, X.debug),
                        X
                    }
                    ,
                    ge.prototype.reset = function() {
                        function X(Ee) {
                            function re(We) {
                                return U[We] || We
                            }
                            return Ee.replace(/[^\u0000-\u007E]/g, re)
                        }
                        function ve(Ee, re) {
                            if (Ee.term == null || Ee.term.trim() === "")
                                return re;
                            if (re.children && re.children.length > 0) {
                                for (var We = n.extend(!0, {}, re), Re = re.children.length - 1; Re >= 0; Re--) {
                                    var at = re.children[Re]
                                      , pt = ve(Ee, at);
                                    pt == null && We.children.splice(Re, 1)
                                }
                                return We.children.length > 0 ? We : ve(Ee, We)
                            }
                            var dt = X(re.text).toUpperCase()
                              , yi = X(Ee.term).toUpperCase();
                            return dt.indexOf(yi) > -1 ? re : null
                        }
                        this.defaults = {
                            amdLanguageBase: "./i18n/",
                            autocomplete: "off",
                            closeOnSelect: !0,
                            debug: !1,
                            dropdownAutoWidth: !1,
                            escapeMarkup: N.escapeMarkup,
                            language: {},
                            matcher: ve,
                            minimumInputLength: 0,
                            maximumInputLength: 0,
                            maximumSelectionLength: 0,
                            minimumResultsForSearch: 0,
                            selectOnClose: !1,
                            scrollAfterSelect: !1,
                            sorter: function(Ee) {
                                return Ee
                            },
                            templateResult: function(Ee) {
                                return Ee.text
                            },
                            templateSelection: function(Ee) {
                                return Ee.text
                            },
                            theme: "default",
                            width: "resolve"
                        }
                    }
                    ,
                    ge.prototype.applyFromElement = function(X, ve) {
                        var Ee = X.language
                          , re = this.defaults.language
                          , We = ve.prop("lang")
                          , Re = ve.closest("[lang]").prop("lang")
                          , at = Array.prototype.concat.call(this._resolveLanguage(We), this._resolveLanguage(Ee), this._resolveLanguage(re), this._resolveLanguage(Re));
                        return X.language = at,
                        X
                    }
                    ,
                    ge.prototype._resolveLanguage = function(X) {
                        if (!X)
                            return [];
                        if (n.isEmptyObject(X))
                            return [];
                        if (n.isPlainObject(X))
                            return [X];
                        var ve;
                        Array.isArray(X) ? ve = X : ve = [X];
                        for (var Ee = [], re = 0; re < ve.length; re++)
                            if (Ee.push(ve[re]),
                            typeof ve[re] == "string" && ve[re].indexOf("-") > 0) {
                                var We = ve[re].split("-")
                                  , Re = We[0];
                                Ee.push(Re)
                            }
                        return Ee
                    }
                    ,
                    ge.prototype._processTranslations = function(X, ve) {
                        for (var Ee = new W, re = 0; re < X.length; re++) {
                            var We = new W
                              , Re = X[re];
                            if (typeof Re == "string")
                                try {
                                    We = W.loadPath(Re)
                                } catch {
                                    try {
                                        Re = this.defaults.amdLanguageBase + Re,
                                        We = W.loadPath(Re)
                                    } catch {
                                        ve && window.console && console.warn && console.warn('Select2: The language file for "' + Re + '" could not be automatically loaded. A fallback will be used instead.')
                                    }
                                }
                            else
                                n.isPlainObject(Re) ? We = new W(Re) : We = Re;
                            Ee.extend(We)
                        }
                        return Ee
                    }
                    ,
                    ge.prototype.set = function(X, ve) {
                        var Ee = n.camelCase(X)
                          , re = {};
                        re[Ee] = ve;
                        var We = N._convertData(re);
                        n.extend(!0, this.defaults, We)
                    }
                    ;
                    var Te = new ge;
                    return Te
                }),
                D.define("select2/options", ["jquery", "./defaults", "./utils"], function(n, o, l) {
                    function c(d, a) {
                        this.options = d,
                        a != null && this.fromElement(a),
                        a != null && (this.options = o.applyFromElement(this.options, a)),
                        this.options = o.apply(this.options)
                    }
                    return c.prototype.fromElement = function(d) {
                        var a = ["select2"];
                        this.options.multiple == null && (this.options.multiple = d.prop("multiple")),
                        this.options.disabled == null && (this.options.disabled = d.prop("disabled")),
                        this.options.autocomplete == null && d.prop("autocomplete") && (this.options.autocomplete = d.prop("autocomplete")),
                        this.options.dir == null && (d.prop("dir") ? this.options.dir = d.prop("dir") : d.closest("[dir]").prop("dir") ? this.options.dir = d.closest("[dir]").prop("dir") : this.options.dir = "ltr"),
                        d.prop("disabled", this.options.disabled),
                        d.prop("multiple", this.options.multiple),
                        l.GetData(d[0], "select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),
                        l.StoreData(d[0], "data", l.GetData(d[0], "select2Tags")),
                        l.StoreData(d[0], "tags", !0)),
                        l.GetData(d[0], "ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),
                        d.attr("ajax--url", l.GetData(d[0], "ajaxUrl")),
                        l.StoreData(d[0], "ajax-Url", l.GetData(d[0], "ajaxUrl")));
                        var m = {};
                        function _(be, ne) {
                            return ne.toUpperCase()
                        }
                        for (var M = 0; M < d[0].attributes.length; M++) {
                            var N = d[0].attributes[M].name
                              , W = "data-";
                            if (N.substr(0, W.length) == W) {
                                var U = N.substring(W.length)
                                  , z = l.GetData(d[0], U)
                                  , pe = U.replace(/-([a-z])/g, _);
                                m[pe] = z
                            }
                        }
                        n.fn.jquery && n.fn.jquery.substr(0, 2) == "1." && d[0].dataset && (m = n.extend(!0, {}, d[0].dataset, m));
                        var fe = n.extend(!0, {}, l.GetData(d[0]), m);
                        fe = l._convertData(fe);
                        for (var we in fe)
                            a.indexOf(we) > -1 || (n.isPlainObject(this.options[we]) ? n.extend(this.options[we], fe[we]) : this.options[we] = fe[we]);
                        return this
                    }
                    ,
                    c.prototype.get = function(d) {
                        return this.options[d]
                    }
                    ,
                    c.prototype.set = function(d, a) {
                        this.options[d] = a
                    }
                    ,
                    c
                }),
                D.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(n, o, l, c) {
                    var d = function(a, m) {
                        l.GetData(a[0], "select2") != null && l.GetData(a[0], "select2").destroy(),
                        this.$element = a,
                        this.id = this._generateId(a),
                        m = m || {},
                        this.options = new o(m,a),
                        d.__super__.constructor.call(this);
                        var _ = a.attr("tabindex") || 0;
                        l.StoreData(a[0], "old-tabindex", _),
                        a.attr("tabindex", "-1");
                        var M = this.options.get("dataAdapter");
                        this.dataAdapter = new M(a,this.options);
                        var N = this.render();
                        this._placeContainer(N);
                        var W = this.options.get("selectionAdapter");
                        this.selection = new W(a,this.options),
                        this.$selection = this.selection.render(),
                        this.selection.position(this.$selection, N);
                        var U = this.options.get("dropdownAdapter");
                        this.dropdown = new U(a,this.options),
                        this.$dropdown = this.dropdown.render(),
                        this.dropdown.position(this.$dropdown, N);
                        var z = this.options.get("resultsAdapter");
                        this.results = new z(a,this.options,this.dataAdapter),
                        this.$results = this.results.render(),
                        this.results.position(this.$results, this.$dropdown);
                        var pe = this;
                        this._bindAdapters(),
                        this._registerDomEvents(),
                        this._registerDataEvents(),
                        this._registerSelectionEvents(),
                        this._registerDropdownEvents(),
                        this._registerResultsEvents(),
                        this._registerEvents(),
                        this.dataAdapter.current(function(fe) {
                            pe.trigger("selection:update", {
                                data: fe
                            })
                        }),
                        a[0].classList.add("select2-hidden-accessible"),
                        a.attr("aria-hidden", "true"),
                        this._syncAttributes(),
                        l.StoreData(a[0], "select2", this),
                        a.data("select2", this)
                    };
                    return l.Extend(d, l.Observable),
                    d.prototype._generateId = function(a) {
                        var m = "";
                        return a.attr("id") != null ? m = a.attr("id") : a.attr("name") != null ? m = a.attr("name") + "-" + l.generateChars(2) : m = l.generateChars(4),
                        m = m.replace(/(:|\.|\[|\]|,)/g, ""),
                        m = "select2-" + m,
                        m
                    }
                    ,
                    d.prototype._placeContainer = function(a) {
                        a.insertAfter(this.$element);
                        var m = this._resolveWidth(this.$element, this.options.get("width"));
                        m != null && a.css("width", m)
                    }
                    ,
                    d.prototype._resolveWidth = function(a, m) {
                        var _ = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                        if (m == "resolve") {
                            var M = this._resolveWidth(a, "style");
                            return M ?? this._resolveWidth(a, "element")
                        }
                        if (m == "element") {
                            var N = a.outerWidth(!1);
                            return N <= 0 ? "auto" : N + "px"
                        }
                        if (m == "style") {
                            var W = a.attr("style");
                            if (typeof W != "string")
                                return null;
                            for (var U = W.split(";"), z = 0, pe = U.length; z < pe; z = z + 1) {
                                var fe = U[z].replace(/\s/g, "")
                                  , we = fe.match(_);
                                if (we !== null && we.length >= 1)
                                    return we[1]
                            }
                            return null
                        }
                        if (m == "computedstyle") {
                            var be = window.getComputedStyle(a[0]);
                            return be.width
                        }
                        return m
                    }
                    ,
                    d.prototype._bindAdapters = function() {
                        this.dataAdapter.bind(this, this.$container),
                        this.selection.bind(this, this.$container),
                        this.dropdown.bind(this, this.$container),
                        this.results.bind(this, this.$container)
                    }
                    ,
                    d.prototype._registerDomEvents = function() {
                        var a = this;
                        this.$element.on("change.select2", function() {
                            a.dataAdapter.current(function(m) {
                                a.trigger("selection:update", {
                                    data: m
                                })
                            })
                        }),
                        this.$element.on("focus.select2", function(m) {
                            a.trigger("focus", m)
                        }),
                        this._syncA = l.bind(this._syncAttributes, this),
                        this._syncS = l.bind(this._syncSubtree, this),
                        this._observer = new window.MutationObserver(function(m) {
                            a._syncA(),
                            a._syncS(m)
                        }
                        ),
                        this._observer.observe(this.$element[0], {
                            attributes: !0,
                            childList: !0,
                            subtree: !1
                        })
                    }
                    ,
                    d.prototype._registerDataEvents = function() {
                        var a = this;
                        this.dataAdapter.on("*", function(m, _) {
                            a.trigger(m, _)
                        })
                    }
                    ,
                    d.prototype._registerSelectionEvents = function() {
                        var a = this
                          , m = ["toggle", "focus"];
                        this.selection.on("toggle", function() {
                            a.toggleDropdown()
                        }),
                        this.selection.on("focus", function(_) {
                            a.focus(_)
                        }),
                        this.selection.on("*", function(_, M) {
                            m.indexOf(_) === -1 && a.trigger(_, M)
                        })
                    }
                    ,
                    d.prototype._registerDropdownEvents = function() {
                        var a = this;
                        this.dropdown.on("*", function(m, _) {
                            a.trigger(m, _)
                        })
                    }
                    ,
                    d.prototype._registerResultsEvents = function() {
                        var a = this;
                        this.results.on("*", function(m, _) {
                            a.trigger(m, _)
                        })
                    }
                    ,
                    d.prototype._registerEvents = function() {
                        var a = this;
                        this.on("open", function() {
                            a.$container[0].classList.add("select2-container--open")
                        }),
                        this.on("close", function() {
                            a.$container[0].classList.remove("select2-container--open")
                        }),
                        this.on("enable", function() {
                            a.$container[0].classList.remove("select2-container--disabled")
                        }),
                        this.on("disable", function() {
                            a.$container[0].classList.add("select2-container--disabled")
                        }),
                        this.on("blur", function() {
                            a.$container[0].classList.remove("select2-container--focus")
                        }),
                        this.on("query", function(m) {
                            a.isOpen() || a.trigger("open", {}),
                            this.dataAdapter.query(m, function(_) {
                                a.trigger("results:all", {
                                    data: _,
                                    query: m
                                })
                            })
                        }),
                        this.on("query:append", function(m) {
                            this.dataAdapter.query(m, function(_) {
                                a.trigger("results:append", {
                                    data: _,
                                    query: m
                                })
                            })
                        }),
                        this.on("keypress", function(m) {
                            var _ = m.which;
                            a.isOpen() ? _ === c.ESC || _ === c.UP && m.altKey ? (a.close(m),
                            m.preventDefault()) : _ === c.ENTER || _ === c.TAB ? (a.trigger("results:select", {}),
                            m.preventDefault()) : _ === c.SPACE && m.ctrlKey ? (a.trigger("results:toggle", {}),
                            m.preventDefault()) : _ === c.UP ? (a.trigger("results:previous", {}),
                            m.preventDefault()) : _ === c.DOWN && (a.trigger("results:next", {}),
                            m.preventDefault()) : (_ === c.ENTER || _ === c.SPACE || _ === c.DOWN && m.altKey) && (a.open(),
                            m.preventDefault())
                        })
                    }
                    ,
                    d.prototype._syncAttributes = function() {
                        this.options.set("disabled", this.$element.prop("disabled")),
                        this.isDisabled() ? (this.isOpen() && this.close(),
                        this.trigger("disable", {})) : this.trigger("enable", {})
                    }
                    ,
                    d.prototype._isChangeMutation = function(a) {
                        var m = this;
                        if (a.addedNodes && a.addedNodes.length > 0)
                            for (var _ = 0; _ < a.addedNodes.length; _++) {
                                var M = a.addedNodes[_];
                                if (M.selected)
                                    return !0
                            }
                        else {
                            if (a.removedNodes && a.removedNodes.length > 0)
                                return !0;
                            if (Array.isArray(a))
                                return a.some(function(N) {
                                    return m._isChangeMutation(N)
                                })
                        }
                        return !1
                    }
                    ,
                    d.prototype._syncSubtree = function(a) {
                        var m = this._isChangeMutation(a)
                          , _ = this;
                        m && this.dataAdapter.current(function(M) {
                            _.trigger("selection:update", {
                                data: M
                            })
                        })
                    }
                    ,
                    d.prototype.trigger = function(a, m) {
                        var _ = d.__super__.trigger
                          , M = {
                            open: "opening",
                            close: "closing",
                            select: "selecting",
                            unselect: "unselecting",
                            clear: "clearing"
                        };
                        if (m === void 0 && (m = {}),
                        a in M) {
                            var N = M[a]
                              , W = {
                                prevented: !1,
                                name: a,
                                args: m
                            };
                            if (_.call(this, N, W),
                            W.prevented) {
                                m.prevented = !0;
                                return
                            }
                        }
                        _.call(this, a, m)
                    }
                    ,
                    d.prototype.toggleDropdown = function() {
                        this.isDisabled() || (this.isOpen() ? this.close() : this.open())
                    }
                    ,
                    d.prototype.open = function() {
                        this.isOpen() || this.isDisabled() || this.trigger("query", {})
                    }
                    ,
                    d.prototype.close = function(a) {
                        this.isOpen() && this.trigger("close", {
                            originalEvent: a
                        })
                    }
                    ,
                    d.prototype.isEnabled = function() {
                        return !this.isDisabled()
                    }
                    ,
                    d.prototype.isDisabled = function() {
                        return this.options.get("disabled")
                    }
                    ,
                    d.prototype.isOpen = function() {
                        return this.$container[0].classList.contains("select2-container--open")
                    }
                    ,
                    d.prototype.hasFocus = function() {
                        return this.$container[0].classList.contains("select2-container--focus")
                    }
                    ,
                    d.prototype.focus = function(a) {
                        this.hasFocus() || (this.$container[0].classList.add("select2-container--focus"),
                        this.trigger("focus", {}))
                    }
                    ,
                    d.prototype.enable = function(a) {
                        this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),
                        (a == null || a.length === 0) && (a = [!0]);
                        var m = !a[0];
                        this.$element.prop("disabled", m)
                    }
                    ,
                    d.prototype.data = function() {
                        this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                        var a = [];
                        return this.dataAdapter.current(function(m) {
                            a = m
                        }),
                        a
                    }
                    ,
                    d.prototype.val = function(a) {
                        if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),
                        a == null || a.length === 0)
                            return this.$element.val();
                        var m = a[0];
                        Array.isArray(m) && (m = m.map(function(_) {
                            return _.toString()
                        })),
                        this.$element.val(m).trigger("input").trigger("change")
                    }
                    ,
                    d.prototype.destroy = function() {
                        l.RemoveData(this.$container[0]),
                        this.$container.remove(),
                        this._observer.disconnect(),
                        this._observer = null,
                        this._syncA = null,
                        this._syncS = null,
                        this.$element.off(".select2"),
                        this.$element.attr("tabindex", l.GetData(this.$element[0], "old-tabindex")),
                        this.$element[0].classList.remove("select2-hidden-accessible"),
                        this.$element.attr("aria-hidden", "false"),
                        l.RemoveData(this.$element[0]),
                        this.$element.removeData("select2"),
                        this.dataAdapter.destroy(),
                        this.selection.destroy(),
                        this.dropdown.destroy(),
                        this.results.destroy(),
                        this.dataAdapter = null,
                        this.selection = null,
                        this.dropdown = null,
                        this.results = null
                    }
                    ,
                    d.prototype.render = function() {
                        var a = n('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                        return a.attr("dir", this.options.get("dir")),
                        this.$container = a,
                        this.$container[0].classList.add("select2-container--" + this.options.get("theme")),
                        l.StoreData(a[0], "element", this.$element),
                        a
                    }
                    ,
                    d
                }),
                D.define("jquery-mousewheel", ["jquery"], function(n) {
                    return n
                }),
                D.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function(n, o, l, c, d) {
                    if (n.fn.select2 == null) {
                        var a = ["open", "close", "destroy"];
                        n.fn.select2 = function(m) {
                            if (m = m || {},
                            typeof m == "object")
                                return this.each(function() {
                                    var N = n.extend(!0, {}, m);
                                    new l(n(this),N)
                                }),
                                this;
                            if (typeof m == "string") {
                                var _, M = Array.prototype.slice.call(arguments, 1);
                                return this.each(function() {
                                    var N = d.GetData(this, "select2");
                                    N == null && window.console && console.error && console.error("The select2('" + m + "') method was called on an element that is not using Select2."),
                                    _ = N[m].apply(N, M)
                                }),
                                a.indexOf(m) > -1 ? this : _
                            } else
                                throw new Error("Invalid arguments for Select2: " + m)
                        }
                    }
                    return n.fn.select2.defaults == null && (n.fn.select2.defaults = c),
                    l
                }),
                {
                    define: D.define,
                    require: D.require
                }
            }()
              , L = O.require("jquery.select2");
            return E.fn.select2.amd = O,
            L
        })
    }
    )(as);
    var so = as.exports;
    const ao = Nr(so);
    ao(Me);
    const oo = ["Política", "Parlamento", "Executivo", "Legislativo", "Judiciário", "Eleições", "Governo", "Constituição", "Senado", "Câmara", "Deputados", "Ministros", "Presidente", "Ministro", "Mandato", "Partido", "Democracia", "Regulação", "Reforma", "Orçamento", "Impostos", "Administração", "Diplomacia", "Embaixador", "Secretaria", "Governador", "Prefeito", "Municípios", "Lei", "Direitos", "Cidadania", "Proposta", "Congresso", "Aprovação", "Constituição", "Aliança", "Coalizão", "Lobby", "Crise", "Segurança", "Transparência", "Impeachment", "Referendo", "Autonomia", "Descentralização", "Reforma", "Autoridade", "Justiça", "Representação", "Protesto"]
      , en = Me(".suggestions");
    Me(document).on("click", function() {
        Me(".suggestions").hide(),
        Me(".gra-filter-input").css({
            "border-radius": "32px"
        })
    });
    Me(".gra-filter").each(function() {
        Me(this).find(".gra-filter-box").hasClass("open") && (Me(this).find(".closeFilter").css("display", "inline-flex"),
        Me(this).find(".openFilter").hide())
    });
    Me(".openFilter").click(function(p) {
        p.preventDefault(),
        Me(this).closest(".gra-filter").find(".gra-filter-box").toggleClass("open"),
        Me(this).hide(),
        Me(this).closest(".gra-filter").find(".closeFilter").css("display", "inline-flex")
    });
    Me(".closeFilter").click(function(p) {
        p.preventDefault(),
        Me(this).closest(".gra-filter").find(".gra-filter-box").toggleClass("open"),
        Me(this).hide(),
        Me(this).closest(".gra-filter").find(".openFilter").show()
    });
    Me(".clearFilter").click(function(p) {
        p.preventDefault(),
        Me(this).closest(".gra-filter").find('.gra-form-filter input[type="text"], .gra-form-filter textarea').val(""),
        Me(this).closest(".gra-filter").find(".gra-form-filter select").val("").trigger("change"),
        Me(this).closest(".gra-filter").find('.gra-form-filter input[type="checkbox"], .gra-form-filter input[type="radio"]').prop("checked", !1)
    });
    Me(".gra-input-filter").on("input", function() {
        Me(this).val().trim() !== "" ? (Me(this).closest(".gra-filter").find(".searchBtn").prop("disabled", !1),
        Me(this).closest(".gra-filter").find(".searchBtn").removeClass("btn-primary-deactivated"),
        Me(this).closest(".gra-filter").find(".searchBtn.mobile").removeClass("icon-primary-deactivated")) : (Me(this).closest(".gra-filter").find(".searchBtn").prop("disabled", !0),
        Me(this).closest(".gra-filter").find(".searchBtn").addClass("btn-primary-deactivated"),
        Me(this).closest(".gra-filter").find(".searchBtn.mobile").addClass("icon-primary-deactivated"));
        const p = Me(this).val().toLowerCase();
        if (p.length === 0) {
            Me(this).closest(".gra-filter-input").css({
                "border-radius": "32px"
            }),
            en.hide();
            return
        }
        const E = oo.filter(L => L.toLowerCase().includes(p));
        var O = Me(this);
        en.empty(),
        E.length > 0 ? (O.closest(".gra-filter-input").css({
            "border-bottom-left-radius": "0",
            "border-bottom-right-radius": "0",
            "border-top-left-radius": "12px",
            "border-top-right-radius": "12px"
        }),
        en.show(),
        E.forEach(function(L) {
            const D = Me('<div class="suggestion-item"></div>')
              , n = lo(L, O.val());
            D.html(n),
            D.on("click", function() {
                O.closest(".gra-filter-input").css({
                    "border-radius": "32px"
                }),
                O.val(L),
                en.hide()
            }),
            en.append(D)
        })) : (O.closest(".gra-filter-input").css({
            "border-radius": "32px"
        }),
        en.hide())
    });
    function lo(p, E) {
        const O = new RegExp(`(${E})`,"gi");
        return p.replace(O, '<span class="bold-match">$1</span>')
    }
    Me(".gra-form-filter").each(function() {
        Me(this).find("input, select").on("input change", function() {
            bn(Me(this))
        }),
        Me(this).find(".gra-filter-box .daterangepickerInput").on("apply.daterangepicker", function(p, E) {
            Me(this).val(E.startDate.format("DD/MM/YYYY")),
            bn(Me(this))
        }),
        Me(this).find(".daterangepickerInput").on("cancel.daterangepicker", function(p, E) {
            bn(Me(this))
        }),
        bn(Me(this))
    });
    function bn(p) {
        let E = 0;
        p.closest(".gra-filter").find(".gra-form-filter input, .gra-form-filter select, .daterangepickerInput input").each(function() {
            const O = Me(this).val().trim();
            O !== "" && O !== null && E++,
            E > 0 ? (p.closest(".gra-filter").find(".gra-badge").css("display", "block"),
            p.closest(".gra-filter").find(".countFilters").css("display", "flex")) : (p.closest(".gra-filter").find(".gra-badge").css("display", "none"),
            p.closest(".gra-filter").find(".countFilters").css("display", "none"),
            p.closest(".gra-filter").find(".countFiltersMobile").css("display", "none"))
        }),
        p.closest(".gra-filter").find(".gra-badge").text(E),
        p.closest(".gra-filter").find(".countFilters").text(" (" + E + ")"),
        p.closest(".gra-filter").find(".countFiltersMobile").text(E)
    }
    const uo = document.getElementsByClassName("required-field");
    Array.from(uo).forEach(p => {
        p.addEventListener("input", function() {
            if (this.value === "")
                this.classList.add("error"),
                (!this.nextElementSibling || !this.nextElementSibling.classList.contains("graRequiredField")) && this.insertAdjacentHTML("afterend", '<span class="graRequiredField">Campo obrigatório</span>');
            else {
                this.classList.remove("error");
                const E = this.nextElementSibling;
                E && E.classList.contains("graRequiredField") && E.remove()
            }
        })
    }
    );
    const co = document.getElementsByClassName("gra-input-group");
    Array.from(co).forEach(p => {
        const E = p.getElementsByClassName("required-field-group");
        Array.from(E).forEach(O => {
            O.addEventListener("input", function() {
                if (this.value === "") {
                    this.classList.add("error");
                    const D = this.previousElementSibling;
                    if (D && D.tagName === "SELECT") {
                        var L = this.previousElementSibling.childNodes[0].childNodes[0];
                        L.classList.add("error"),
                        D.classList.add("error")
                    }
                    p.querySelector(".graRequiredFieldGroup") || p.insertAdjacentHTML("afterend", '<span class="graRequiredFieldGroup">Campo obrigatório</span>')
                } else {
                    const D = this.previousElementSibling;
                    if (D && D.tagName === "SELECT") {
                        var L = this.previousElementSibling.childNodes[0].childNodes[0];
                        L.classList.remove("error"),
                        D.classList.remove("error")
                    }
                    this.classList.remove("error");
                    const n = p.nextElementSibling;
                    n && n.classList.contains("graRequiredFieldGroup") && n.remove()
                }
            })
        }
        )
    }
    );
    document.querySelectorAll(".gra-counter-field").forEach(p => {
        const E = p.nextElementSibling
          , O = parseInt(E.getAttribute("data-max-words"), 10);
        p.addEventListener("input", () => {
            const L = p.value
              , D = L.trim().split(/\s+/).filter(n => n.length > 0).length;
            if (D > O) {
                const n = L.trim().split(/\s+/).slice(0, O).join(" ");
                p.value = n,
                E.innerText = `${O} de ${O}`
            } else
                E.innerText = `${D} de ${O}`
        }
        )
    }
    );
    document.querySelectorAll(".gra-phone-number").forEach(p => {
        p.addEventListener("keydown", function(E) {
            !/[0-9]/.test(E.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(E.key) && E.preventDefault()
        }),
        p.addEventListener("input", function() {
            let E = this.value.replace(/\D/g, "");
            E.length > 0 && (this.value = E.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3").trim())
        })
    }
    );
    const tr = document.querySelectorAll(".gra-input-group-code .input-code");
    tr.forEach( (p, E) => {
        p.addEventListener("input", () => {
            p.value = p.value.replace(/[^0-9]/g, ""),
            p.value.length === 1 && E < tr.length - 1 && tr[E + 1].focus(),
            p.value.length === 0 && E > 0 && tr[E - 1].focus()
        }
        )
    }
    );
    const ho = document.querySelectorAll(".gra-password-container");
    ho.forEach(p => {
        const E = p.querySelector(".gra-password");
        p.addEventListener("click", O => {
            if (O.target === p) {
                const D = E.getAttribute("type") === "password" ? "text" : "password";
                E.setAttribute("type", D),
                p.classList.toggle("show-password")
            }
        }
        )
    }
    );
    const fo = "modulepreload"
      , po = function(p) {
        return "/" + p
    }
      , es = {}
      , go = function(E, O, L) {
        let D = Promise.resolve();
        if (O && O.length > 0) {
            document.getElementsByTagName("link");
            const o = document.querySelector("meta[property=csp-nonce]")
              , l = (o == null ? void 0 : o.nonce) || (o == null ? void 0 : o.getAttribute("nonce"));
            D = Promise.allSettled(O.map(c => {
                if (c = po(c),
                c in es)
                    return;
                es[c] = !0;
                const d = c.endsWith(".css")
                  , a = d ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${c}"]${a}`))
                    return;
                const m = document.createElement("link");
                if (m.rel = d ? "stylesheet" : fo,
                d || (m.as = "script"),
                m.crossOrigin = "",
                m.href = c,
                l && m.setAttribute("nonce", l),
                document.head.appendChild(m),
                d)
                    return new Promise( (_, M) => {
                        m.addEventListener("load", _),
                        m.addEventListener("error", () => M(new Error(`Unable to preload CSS for ${c}`)))
                    }
                    )
            }
            ))
        }
        function n(o) {
            const l = new Event("vite:preloadError",{
                cancelable: !0
            });
            if (l.payload = o,
            window.dispatchEvent(l),
            !l.defaultPrevented)
                throw o
        }
        return D.then(o => {
            for (const l of o || [])
                l.status === "rejected" && n(l.reason);
            return E().catch(n)
        }
        )
    };
    function ir(p, E) {
        var O = E.length;
        if (O > 2) {
            var L = E.slice(0, 2).map(function(o) {
                return p.find('option[value="' + o + '"]').text()
            }).join("; ")
              , D = O - 2
              , n = L + "; ...+" + D;
            p.siblings(".select2-container").find(".select2-selection__rendered").text(n)
        } else {
            var L = E.map(function(l) {
                return p.find('option[value="' + l + '"]').text()
            }).join("; ");
            p.siblings(".select2-container").find(".select2-selection__rendered").text(L)
        }
    }
    if (typeof window.jQuery > "u")
        go( () => Promise.resolve().then( () => ro), void 0).then(p => {
            if (typeof p.fn.select2 > "u") {
                const E = document.createElement("script");
                E.src = "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js",
                E.onload = () => {
                    nr()
                }
                ,
                E.onerror = () => {
                    console.error("Error loading Select2 from CDN")
                }
                ,
                document.head.appendChild(E)
            } else
                nr()
        }
        ).catch(p => {
            console.error("Error loading jQuery:", p)
        }
        );
    else if (typeof $.fn.select2 > "u") {
        const p = document.createElement("script");
        p.src = "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js",
        p.onload = () => {
            nr()
        }
        ,
        p.onerror = () => {
            console.error("Error loading Select2 from CDN")
        }
        ,
        document.head.appendChild(p)
    } else
        nr();
    function nr() {
        $(".gra-select.gra-simple-select").each(function() {
            $(this).hasClass("with-search") ? $(this).select2({
                placeholder: "Selecione",
                width: "100%",
                allowClear: !0,
                language: {
                    noResults: function() {
                        return "Lamentamos, nenhuma opção correspondente foi encontrada"
                    }
                }
            }) : $(this).select2({
                placeholder: "Selecione",
                width: "100%",
                allowClear: !0,
                minimumResultsForSearch: 1 / 0,
                language: {
                    noResults: function() {
                        return "Lamentamos, nenhuma opção correspondente foi encontrada"
                    }
                }
            }),
            $(this).hasClass("form-accessibility") && $(this).next(".select2-container").find(".select2-selection").addClass("form-accessibility"),
            $(this).on("select2:open", function() {
                var p = $(".select2-container").find(".select2-search__field");
                p.length && p.attr("placeholder", "Pesquisar")
            }),
            $(this).on("select2:close", function() {
                $(this).hasClass("required-field") && $(this).val().length === 0 && ($(this).next(".select2-container").find(".select2-selection").addClass("error"),
                !$(this).next(".select2-container").find(".graRequiredField").length > 0 && $(this).next(".select2-container").append('<span class="graRequiredField">Campo obrigatório</span>')),
                $(".select2-dropdown").css("margin-top", "12px")
            }),
            $(this).on("select2:unselect", function(p) {
                $(this).hasClass("required-field") && $(this).val().length === 0 && ($(this).next(".select2-container").find(".select2-selection").addClass("error"),
                !$(this).next(".select2-container").find(".graRequiredField").length > 0 && $(this).next(".select2-container").append('<span class="graRequiredField">Campo obrigatório</span>'))
            }),
            $(this).on("select2:select", function(p) {
                $(this).hasClass("required-field") && ($(this).next(".select2-container").find(".select2-selection").removeClass("error"),
                $(this).next(".select2-container").find(".graRequiredField").length > 0 && $(this).next(".select2-container").find(".graRequiredField").remove())
            })
        }),
        $(".gra-select.gra-multiple-select.with-checkbox").each(function() {
            var p = $(this);
            $(this).select2({
                placeholder: "Selecione",
                width: "100%",
                allowClear: !0,
                multiple: !0,
                language: {
                    noResults: function() {
                        return "Lamentamos, nenhuma opção correspondente foi encontrada"
                    }
                },
                templateResult: function(E) {
                    var O = $('<span class="form-check"><input type="checkbox" class="form-check-input checkbox" value="' + E.id + '" /> <label class="form-check-label">' + E.text + "</label></span>")
                      , L = p.val();
                    return L && L.indexOf(E.id) !== -1 ? O.find(".form-check-input.checkbox").prop("checked", !0) : O.find(".form-check-input.checkbox").prop("checked", !1),
                    O
                },
                templateSelection: function(E) {
                    ir(p, p.val())
                }
            }),
            $(this).on("select2:select select2:unselect", function(E) {
                var O = $(this).val();
                ir($(this), O),
                E.preventDefault(),
                $(this).select2("open")
            }),
            $(this).on("select2:open", function() {
                $(".form-check-input.checkbox").on("change", function() {
                    var O = $(this).val()
                      , L = $(this).val();
                    $(this).prop("checked") ? O.push(L) : O = O.filter(function(D) {
                        return D !== L
                    }),
                    $(this).val(O).trigger("change")
                });
                var E = $(".select2-selection--multiple").find(".select2-search--inline").show();
                E.length && E.attr("placeholder", "Pesquisar"),
                $(".select2-container .select2-dropdown.select2-dropdown--above").length ? $(".select2-container .select2-dropdown.select2-dropdown--above").attr("style", "margin-top:-12px!important;border-top-left-radius:0px!important;border-top-right-radius:0px!important;") : $(".select2-container .select2-dropdown").attr("style", "margin-top:60px!important;border-top-left-radius:0px!important;border-top-right-radius:0px!important;")
            }),
            $(this).on("select2:close", function() {
                $(".form-check-input.checkbox").each(function() {
                    var E = $(this).val()
                      , O = $(this).val().indexOf(E) !== -1;
                    $(this).prop("checked", O)
                })
            })
        }),
        $(".gra-select.gra-multiple-select.with-radiobox").each(function() {
            var p = $(this);
            $(this).select2({
                placeholder: "Selecione",
                width: "100%",
                allowClear: !0,
                multiple: !0,
                language: {
                    noResults: function() {
                        return "Lamentamos, nenhuma opção correspondente foi encontrada"
                    }
                },
                templateResult: function(E) {
                    var O = $('<span class="form-check"><input type="checkbox" class="form-check-input custom-checkbox checkbox" value="' + E.id + '" /> <label class="form-check-label">' + E.text + "</label></span>")
                      , L = p.val();
                    return L && L.indexOf(E.id) !== -1 ? O.find(".form-check-input.checkbox").prop("checked", !0) : O.find(".form-check-input.checkbox").prop("checked", !1),
                    O
                },
                templateSelection: function(E) {
                    ir(p, p.val())
                }
            }),
            $(this).on("select2:select select2:unselect", function(E) {
                var O = $(this).val();
                ir($(this), O),
                E.preventDefault(),
                $(this).select2("open")
            }),
            $(this).on("select2:open", function() {
                $(".form-check-input.radio").on("change", function() {
                    var O = $(this).val()
                      , L = $(this).val();
                    $(this).prop("checked") ? O.push(L) : O = O.filter(function(D) {
                        return D !== L
                    }),
                    $(this).val(O).trigger("change")
                });
                var E = $(".select2-selection--multiple").find(".select2-search--inline").show();
                E.length && E.attr("placeholder", "Pesquisar"),
                $(".select2-container .select2-dropdown").attr("style", "margin-top:60px!important;border-top-left-radius:0px!important;border-top-right-radius:0px!important;")
            }),
            $(this).on("select2:close", function() {
                $(".form-check-input.checkbox").each(function() {
                    var E = $(this).val()
                      , O = $(this).val().indexOf(E) !== -1;
                    $(this).prop("checked", O)
                })
            })
        })
    }
    $(".form-check-input").each(function() {
        $(this).find(".custom-checkbox").length > 0 && $(this).css("padding-left", "0")
    });
    var mo = rs();
    const ai = Nr(mo);
    ($(".rangeDatePicker").length || $(".simpleDatePicker").length) && (ai.locale("pt"),
    $(".rangeDatePicker").each(function() {
        var p = $(this).data("format-date") ? $(this).data("format-date") : "DD/MM/YYYY"
          , E = /([Hh]{1,2}|[m]{1,2})/
          , O = E.test(p);
        $(this).daterangepicker({
            autoApply: !0,
            showDropdowns: !0,
            timePicker: O,
            timePicker24Hour: !0,
            linkedCalendars: !1,
            autoUpdateInput: !1,
            locale: {
                format: p,
                daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                cancelLabel: "Cancelar",
                applyLabel: "Aplicar"
            },
            startDate: ai(),
            endDate: ai(),
            opens: "right"
        })
    }),
    $(".simpleDatePicker").each(function() {
        var p = $(this).data("format-date") ? $(this).data("format-date") : "DD/MM/YYYY"
          , E = /([Hh]{1,2}|[m]{1,2})/
          , O = E.test(p);
        $(this).daterangepicker({
            autoApply: !0,
            showDropdowns: !0,
            timePicker: O,
            timePicker24Hour: !0,
            singleDatePicker: !0,
            autoUpdateInput: !1,
            locale: {
                format: p,
                daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                cancelLabel: "Cancelar",
                applyLabel: "Aplicar"
            },
            opens: "right"
        })
    }));
    $(".daterangepickerInput").on("show.daterangepicker", function(p, E) {
        $(this).addClass("focus");
        var O = $(this).data("format-date") ? $(this).data("format-date") : "DD/MM/YYYY"
          , L = $(this);
        if (!E.container.data("linkAdded")) {
            const D = $('<div class="go-to-today-link text-center">').append('<a href="#" class="gra-link gra-margin-bottom-s">Hoje</a>');
            E.container.data("linkAdded", !0),
            E.container.find(".drp-buttons").after(D),
            E.container.find(".drp-buttons").addClass("text-center"),
            E.container.find(".drp-buttons .applyBtn").addClass("gra-btn"),
            E.container.find(".drp-buttons .cancelBtn").addClass("gra-btn gtn-secondary"),
            D.on("click", function(n) {
                n.preventDefault(),
                E.setStartDate(ai()),
                E.setEndDate(ai());
                var o = ai();
                E.container.find(".calendar-table").find(".monthSelect").val(o.month() + 1),
                E.container.find(".calendar-table").find(".yearSelect").val(o.year()),
                E.container.find(".calendar-table").find(".monthSelect").trigger("change"),
                E.container.find(".calendar-table").find(".yearSelect").trigger("change"),
                L.hasClass("rangeDatePicker") ? L.val(ai().format(O) + " - " + ai().add(1, "days").format(O)) : L.val(ai().format(O)),
                E.updateView()
            })
        }
    });
    $(".daterangepickerInput.rangeDatePicker").on("apply.daterangepicker", function(p, E) {
        var O = $(this).data("format-date") ? $(this).data("format-date") : "DD/MM/YYYY";
        $(this).val(E.startDate.format(O) + " - " + E.endDate.format(O)),
        $(this).removeClass("error");
        const L = $(this).next("span");
        L && L.hasClass("graRequiredField") && L.remove()
    });
    $(".daterangepickerInput.simpleDatePicker").on("apply.daterangepicker", function(p, E) {
        var O = $(this).data("format-date") ? $(this).data("format-date") : "DD/MM/YYYY";
        $(this).val(E.startDate.format(O)),
        $(this).removeClass("error");
        const L = $(this).next("span");
        L && L.hasClass("graRequiredField") && L.remove(),
        $(".gra-filter-box").length && bn($(this))
    });
    document.querySelectorAll(".card-feedback-close").forEach(p => {
        p.addEventListener("click", function() {
            this.closest(".gra-card-feedback").style.display = "none"
        })
    }
    );
    /**
 * Owl carousel
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
    (function(p, E, O, L) {
        function D(n, o) {
            this.settings = null,
            this.options = p.extend({}, D.Defaults, o),
            this.$element = p(n),
            this._handlers = {},
            this._plugins = {},
            this._supress = {},
            this._current = null,
            this._speed = null,
            this._coordinates = [],
            this._breakpoint = null,
            this._width = null,
            this._items = [],
            this._clones = [],
            this._mergers = [],
            this._widths = [],
            this._invalidated = {},
            this._pipe = [],
            this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {
                    start: null,
                    current: null
                },
                direction: null
            },
            this._states = {
                current: {},
                tags: {
                    initializing: ["busy"],
                    animating: ["busy"],
                    dragging: ["interacting"]
                }
            },
            p.each(["onResize", "onThrottledResize"], p.proxy(function(l, c) {
                this._handlers[c] = p.proxy(this[c], this)
            }, this)),
            p.each(D.Plugins, p.proxy(function(l, c) {
                this._plugins[l.charAt(0).toLowerCase() + l.slice(1)] = new c(this)
            }, this)),
            p.each(D.Workers, p.proxy(function(l, c) {
                this._pipe.push({
                    filter: c.filter,
                    run: p.proxy(c.run, this)
                })
            }, this)),
            this.setup(),
            this.initialize()
        }
        D.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            checkVisibility: !0,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: E,
            fallbackEasing: "swing",
            slideTransition: "",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab"
        },
        D.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        },
        D.Type = {
            Event: "event",
            State: "state"
        },
        D.Plugins = {},
        D.Workers = [{
            filter: ["width", "settings"],
            run: function() {
                this._width = this.$element.width()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(n) {
                n.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                this.$stage.children(".cloned").remove()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(n) {
                var o = this.settings.margin || ""
                  , l = !this.settings.autoWidth
                  , c = this.settings.rtl
                  , d = {
                    width: "auto",
                    "margin-left": c ? o : "",
                    "margin-right": c ? "" : o
                };
                !l && this.$stage.children().css(d),
                n.css = d
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(n) {
                var o = (this.width() / this.settings.items).toFixed(3) - this.settings.margin
                  , l = null
                  , c = this._items.length
                  , d = !this.settings.autoWidth
                  , a = [];
                for (n.items = {
                    merge: !1,
                    width: o
                }; c--; )
                    l = this._mergers[c],
                    l = this.settings.mergeFit && Math.min(l, this.settings.items) || l,
                    n.items.merge = l > 1 || n.items.merge,
                    a[c] = d ? o * l : this._items[c].width();
                this._widths = a
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                var n = []
                  , o = this._items
                  , l = this.settings
                  , c = Math.max(l.items * 2, 4)
                  , d = Math.ceil(o.length / 2) * 2
                  , a = l.loop && o.length ? l.rewind ? c : Math.max(c, d) : 0
                  , m = ""
                  , _ = "";
                for (a /= 2; a > 0; )
                    n.push(this.normalize(n.length / 2, !0)),
                    m = m + o[n[n.length - 1]][0].outerHTML,
                    n.push(this.normalize(o.length - 1 - (n.length - 1) / 2, !0)),
                    _ = o[n[n.length - 1]][0].outerHTML + _,
                    a -= 1;
                this._clones = n,
                p(m).addClass("cloned").appendTo(this.$stage),
                p(_).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                for (var n = this.settings.rtl ? 1 : -1, o = this._clones.length + this._items.length, l = -1, c = 0, d = 0, a = []; ++l < o; )
                    c = a[l - 1] || 0,
                    d = this._widths[this.relative(l)] + this.settings.margin,
                    a.push(c + d * n);
                this._coordinates = a
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                var n = this.settings.stagePadding
                  , o = this._coordinates
                  , l = {
                    width: Math.ceil(Math.abs(o[o.length - 1])) + n * 2,
                    "padding-left": n || "",
                    "padding-right": n || ""
                };
                this.$stage.css(l)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(n) {
                var o = this._coordinates.length
                  , l = !this.settings.autoWidth
                  , c = this.$stage.children();
                if (l && n.items.merge)
                    for (; o--; )
                        n.css.width = this._widths[this.relative(o)],
                        c.eq(o).css(n.css);
                else
                    l && (n.css.width = n.items.width,
                    c.css(n.css))
            }
        }, {
            filter: ["items"],
            run: function() {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(n) {
                n.current = n.current ? this.$stage.children().index(n.current) : 0,
                n.current = Math.max(this.minimum(), Math.min(this.maximum(), n.current)),
                this.reset(n.current)
            }
        }, {
            filter: ["position"],
            run: function() {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function() {
                var n = this.settings.rtl ? 1 : -1, o = this.settings.stagePadding * 2, l = this.coordinates(this.current()) + o, c = l + this.width() * n, d, a, m = [], _, M;
                for (_ = 0,
                M = this._coordinates.length; _ < M; _++)
                    d = this._coordinates[_ - 1] || 0,
                    a = Math.abs(this._coordinates[_]) + o * n,
                    (this.op(d, "<=", l) && this.op(d, ">", c) || this.op(a, "<", l) && this.op(a, ">", c)) && m.push(_);
                this.$stage.children(".active").removeClass("active"),
                this.$stage.children(":eq(" + m.join("), :eq(") + ")").addClass("active"),
                this.$stage.children(".center").removeClass("center"),
                this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
            }
        }],
        D.prototype.initializeStage = function() {
            this.$stage = this.$element.find("." + this.settings.stageClass),
            !this.$stage.length && (this.$element.addClass(this.options.loadingClass),
            this.$stage = p("<" + this.settings.stageElement + ">", {
                class: this.settings.stageClass
            }).wrap(p("<div/>", {
                class: this.settings.stageOuterClass
            })),
            this.$element.append(this.$stage.parent()))
        }
        ,
        D.prototype.initializeItems = function() {
            var n = this.$element.find(".owl-item");
            if (n.length) {
                this._items = n.get().map(function(o) {
                    return p(o)
                }),
                this._mergers = this._items.map(function() {
                    return 1
                }),
                this.refresh();
                return
            }
            this.replace(this.$element.children().not(this.$stage.parent())),
            this.isVisible() ? this.refresh() : this.invalidate("width"),
            this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
        }
        ,
        D.prototype.initialize = function() {
            if (this.enter("initializing"),
            this.trigger("initialize"),
            this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
            this.settings.autoWidth && !this.is("pre-loading")) {
                var n, o, l;
                n = this.$element.find("img"),
                o = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : L,
                l = this.$element.children(o).width(),
                n.length && l <= 0 && this.preloadAutoWidthImages(n)
            }
            this.initializeStage(),
            this.initializeItems(),
            this.registerEventHandlers(),
            this.leave("initializing"),
            this.trigger("initialized")
        }
        ,
        D.prototype.isVisible = function() {
            return this.settings.checkVisibility ? this.$element.is(":visible") : !0
        }
        ,
        D.prototype.setup = function() {
            var n = this.viewport()
              , o = this.options.responsive
              , l = -1
              , c = null;
            o ? (p.each(o, function(d) {
                d <= n && d > l && (l = Number(d))
            }),
            c = p.extend({}, this.options, o[l]),
            typeof c.stagePadding == "function" && (c.stagePadding = c.stagePadding()),
            delete c.responsive,
            c.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s","g"), "$1" + l))) : c = p.extend({}, this.options),
            this.trigger("change", {
                property: {
                    name: "settings",
                    value: c
                }
            }),
            this._breakpoint = l,
            this.settings = c,
            this.invalidate("settings"),
            this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            })
        }
        ,
        D.prototype.optionsLogic = function() {
            this.settings.autoWidth && (this.settings.stagePadding = !1,
            this.settings.merge = !1)
        }
        ,
        D.prototype.prepare = function(n) {
            var o = this.trigger("prepare", {
                content: n
            });
            return o.data || (o.data = p("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(n)),
            this.trigger("prepared", {
                content: o.data
            }),
            o.data
        }
        ,
        D.prototype.update = function() {
            for (var n = 0, o = this._pipe.length, l = p.proxy(function(d) {
                return this[d]
            }, this._invalidated), c = {}; n < o; )
                (this._invalidated.all || p.grep(this._pipe[n].filter, l).length > 0) && this._pipe[n].run(c),
                n++;
            this._invalidated = {},
            !this.is("valid") && this.enter("valid")
        }
        ,
        D.prototype.width = function(n) {
            switch (n = n || D.Width.Default,
            n) {
            case D.Width.Inner:
            case D.Width.Outer:
                return this._width;
            default:
                return this._width - this.settings.stagePadding * 2 + this.settings.margin
            }
        }
        ,
        D.prototype.refresh = function() {
            this.enter("refreshing"),
            this.trigger("refresh"),
            this.setup(),
            this.optionsLogic(),
            this.$element.addClass(this.options.refreshClass),
            this.update(),
            this.$element.removeClass(this.options.refreshClass),
            this.leave("refreshing"),
            this.trigger("refreshed")
        }
        ,
        D.prototype.onThrottledResize = function() {
            E.clearTimeout(this.resizeTimer),
            this.resizeTimer = E.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
        }
        ,
        D.prototype.onResize = function() {
            if (!this._items.length || this._width === this.$element.width() || !this.isVisible())
                return !1;
            if (this.enter("resizing"),
            this.trigger("resize").isDefaultPrevented())
                return this.leave("resizing"),
                !1;
            this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            this.trigger("resized")
        }
        ,
        D.prototype.registerEventHandlers = function() {
            p.support.transition && this.$stage.on(p.support.transition.end + ".owl.core", p.proxy(this.onTransitionEnd, this)),
            this.settings.responsive !== !1 && this.on(E, "resize", this._handlers.onThrottledResize),
            this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass),
            this.$stage.on("mousedown.owl.core", p.proxy(this.onDragStart, this)),
            this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
                return !1
            })),
            this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", p.proxy(this.onDragStart, this)),
            this.$stage.on("touchcancel.owl.core", p.proxy(this.onDragEnd, this)))
        }
        ,
        D.prototype.onDragStart = function(n) {
            var o = null;
            n.which !== 3 && (p.support.transform ? (o = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","),
            o = {
                x: o[o.length === 16 ? 12 : 4],
                y: o[o.length === 16 ? 13 : 5]
            }) : (o = this.$stage.position(),
            o = {
                x: this.settings.rtl ? o.left + this.$stage.width() - this.width() + this.settings.margin : o.left,
                y: o.top
            }),
            this.is("animating") && (p.support.transform ? this.animate(o.x) : this.$stage.stop(),
            this.invalidate("position")),
            this.$element.toggleClass(this.options.grabClass, n.type === "mousedown"),
            this.speed(0),
            this._drag.time = new Date().getTime(),
            this._drag.target = p(n.target),
            this._drag.stage.start = o,
            this._drag.stage.current = o,
            this._drag.pointer = this.pointer(n),
            p(O).on("mouseup.owl.core touchend.owl.core", p.proxy(this.onDragEnd, this)),
            p(O).one("mousemove.owl.core touchmove.owl.core", p.proxy(function(l) {
                var c = this.difference(this._drag.pointer, this.pointer(l));
                p(O).on("mousemove.owl.core touchmove.owl.core", p.proxy(this.onDragMove, this)),
                !(Math.abs(c.x) < Math.abs(c.y) && this.is("valid")) && (l.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"))
            }, this)))
        }
        ,
        D.prototype.onDragMove = function(n) {
            var o = null
              , l = null
              , c = null
              , d = this.difference(this._drag.pointer, this.pointer(n))
              , a = this.difference(this._drag.stage.start, d);
            this.is("dragging") && (n.preventDefault(),
            this.settings.loop ? (o = this.coordinates(this.minimum()),
            l = this.coordinates(this.maximum() + 1) - o,
            a.x = ((a.x - o) % l + l) % l + o) : (o = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
            l = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
            c = this.settings.pullDrag ? -1 * d.x / 5 : 0,
            a.x = Math.max(Math.min(a.x, o + c), l + c)),
            this._drag.stage.current = a,
            this.animate(a.x))
        }
        ,
        D.prototype.onDragEnd = function(n) {
            var o = this.difference(this._drag.pointer, this.pointer(n))
              , l = this._drag.stage.current
              , c = o.x > 0 ^ this.settings.rtl ? "left" : "right";
            p(O).off(".owl.core"),
            this.$element.removeClass(this.options.grabClass),
            (o.x !== 0 && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(this.closest(l.x, o.x !== 0 ? c : this._drag.direction)),
            this.invalidate("position"),
            this.update(),
            this._drag.direction = c,
            (Math.abs(o.x) > 3 || new Date().getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
                return !1
            })),
            this.is("dragging") && (this.leave("dragging"),
            this.trigger("dragged"))
        }
        ,
        D.prototype.closest = function(n, o) {
            var l = -1
              , c = 30
              , d = this.width()
              , a = this.coordinates();
            return this.settings.freeDrag || p.each(a, p.proxy(function(m, _) {
                return o === "left" && n > _ - c && n < _ + c ? l = m : o === "right" && n > _ - d - c && n < _ - d + c ? l = m + 1 : this.op(n, "<", _) && this.op(n, ">", a[m + 1] !== L ? a[m + 1] : _ - d) && (l = o === "left" ? m + 1 : m),
                l === -1
            }, this)),
            this.settings.loop || (this.op(n, ">", a[this.minimum()]) ? l = n = this.minimum() : this.op(n, "<", a[this.maximum()]) && (l = n = this.maximum())),
            l
        }
        ,
        D.prototype.animate = function(n) {
            var o = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(),
            o && (this.enter("animating"),
            this.trigger("translate")),
            p.support.transform3d && p.support.transition ? this.$stage.css({
                transform: "translate3d(" + n + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
            }) : o ? this.$stage.animate({
                left: n + "px"
            }, this.speed(), this.settings.fallbackEasing, p.proxy(this.onTransitionEnd, this)) : this.$stage.css({
                left: n + "px"
            })
        }
        ,
        D.prototype.is = function(n) {
            return this._states.current[n] && this._states.current[n] > 0
        }
        ,
        D.prototype.current = function(n) {
            if (n === L)
                return this._current;
            if (this._items.length === 0)
                return L;
            if (n = this.normalize(n),
            this._current !== n) {
                var o = this.trigger("change", {
                    property: {
                        name: "position",
                        value: n
                    }
                });
                o.data !== L && (n = this.normalize(o.data)),
                this._current = n,
                this.invalidate("position"),
                this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }
        ,
        D.prototype.invalidate = function(n) {
            return p.type(n) === "string" && (this._invalidated[n] = !0,
            this.is("valid") && this.leave("valid")),
            p.map(this._invalidated, function(o, l) {
                return l
            })
        }
        ,
        D.prototype.reset = function(n) {
            n = this.normalize(n),
            n !== L && (this._speed = 0,
            this._current = n,
            this.suppress(["translate", "translated"]),
            this.animate(this.coordinates(n)),
            this.release(["translate", "translated"]))
        }
        ,
        D.prototype.normalize = function(n, o) {
            var l = this._items.length
              , c = o ? 0 : this._clones.length;
            return !this.isNumeric(n) || l < 1 ? n = L : (n < 0 || n >= l + c) && (n = ((n - c / 2) % l + l) % l + c / 2),
            n
        }
        ,
        D.prototype.relative = function(n) {
            return n -= this._clones.length / 2,
            this.normalize(n, !0)
        }
        ,
        D.prototype.maximum = function(n) {
            var o = this.settings, l = this._coordinates.length, c, d, a;
            if (o.loop)
                l = this._clones.length / 2 + this._items.length - 1;
            else if (o.autoWidth || o.merge) {
                if (c = this._items.length,
                c)
                    for (d = this._items[--c].width(),
                    a = this.$element.width(); c-- && (d += this._items[c].width() + this.settings.margin,
                    !(d > a)); )
                        ;
                l = c + 1
            } else
                o.center ? l = this._items.length - 1 : l = this._items.length - o.items;
            return n && (l -= this._clones.length / 2),
            Math.max(l, 0)
        }
        ,
        D.prototype.minimum = function(n) {
            return n ? 0 : this._clones.length / 2
        }
        ,
        D.prototype.items = function(n) {
            return n === L ? this._items.slice() : (n = this.normalize(n, !0),
            this._items[n])
        }
        ,
        D.prototype.mergers = function(n) {
            return n === L ? this._mergers.slice() : (n = this.normalize(n, !0),
            this._mergers[n])
        }
        ,
        D.prototype.clones = function(n) {
            var o = this._clones.length / 2
              , l = o + this._items.length
              , c = function(d) {
                return d % 2 === 0 ? l + d / 2 : o - (d + 1) / 2
            };
            return n === L ? p.map(this._clones, function(d, a) {
                return c(a)
            }) : p.map(this._clones, function(d, a) {
                return d === n ? c(a) : null
            })
        }
        ,
        D.prototype.speed = function(n) {
            return n !== L && (this._speed = n),
            this._speed
        }
        ,
        D.prototype.coordinates = function(n) {
            var o = 1, l = n - 1, c;
            return n === L ? p.map(this._coordinates, p.proxy(function(d, a) {
                return this.coordinates(a)
            }, this)) : (this.settings.center ? (this.settings.rtl && (o = -1,
            l = n + 1),
            c = this._coordinates[n],
            c += (this.width() - c + (this._coordinates[l] || 0)) / 2 * o) : c = this._coordinates[l] || 0,
            c = Math.ceil(c),
            c)
        }
        ,
        D.prototype.duration = function(n, o, l) {
            return l === 0 ? 0 : Math.min(Math.max(Math.abs(o - n), 1), 6) * Math.abs(l || this.settings.smartSpeed)
        }
        ,
        D.prototype.to = function(n, o) {
            var l = this.current()
              , c = null
              , d = n - this.relative(l)
              , a = (d > 0) - (d < 0)
              , m = this._items.length
              , _ = this.minimum()
              , M = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(d) > m / 2 && (d += a * -1 * m),
            n = l + d,
            c = ((n - _) % m + m) % m + _,
            c !== n && c - d <= M && c - d > 0 && (l = c - d,
            n = c,
            this.reset(l))) : this.settings.rewind ? (M += 1,
            n = (n % M + M) % M) : n = Math.max(_, Math.min(M, n)),
            this.speed(this.duration(l, n, o)),
            this.current(n),
            this.isVisible() && this.update()
        }
        ,
        D.prototype.next = function(n) {
            n = n || !1,
            this.to(this.relative(this.current()) + 1, n)
        }
        ,
        D.prototype.prev = function(n) {
            n = n || !1,
            this.to(this.relative(this.current()) - 1, n)
        }
        ,
        D.prototype.onTransitionEnd = function(n) {
            if (n !== L && (n.stopPropagation(),
            (n.target || n.srcElement || n.originalTarget) !== this.$stage.get(0)))
                return !1;
            this.leave("animating"),
            this.trigger("translated")
        }
        ,
        D.prototype.viewport = function() {
            var n;
            return this.options.responsiveBaseElement !== E ? n = p(this.options.responsiveBaseElement).width() : E.innerWidth ? n = E.innerWidth : O.documentElement && O.documentElement.clientWidth ? n = O.documentElement.clientWidth : console.warn("Can not detect viewport width."),
            n
        }
        ,
        D.prototype.replace = function(n) {
            this.$stage.empty(),
            this._items = [],
            n && (n = n instanceof jQuery ? n : p(n)),
            this.settings.nestedItemSelector && (n = n.find("." + this.settings.nestedItemSelector)),
            n.filter(function() {
                return this.nodeType === 1
            }).each(p.proxy(function(o, l) {
                l = this.prepare(l),
                this.$stage.append(l),
                this._items.push(l),
                this._mergers.push(l.find("[data-merge]").addBack("[data-merge]").attr("data-merge") * 1 || 1)
            }, this)),
            this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
            this.invalidate("items")
        }
        ,
        D.prototype.add = function(n, o) {
            var l = this.relative(this._current);
            o = o === L ? this._items.length : this.normalize(o, !0),
            n = n instanceof jQuery ? n : p(n),
            this.trigger("add", {
                content: n,
                position: o
            }),
            n = this.prepare(n),
            this._items.length === 0 || o === this._items.length ? (this._items.length === 0 && this.$stage.append(n),
            this._items.length !== 0 && this._items[o - 1].after(n),
            this._items.push(n),
            this._mergers.push(n.find("[data-merge]").addBack("[data-merge]").attr("data-merge") * 1 || 1)) : (this._items[o].before(n),
            this._items.splice(o, 0, n),
            this._mergers.splice(o, 0, n.find("[data-merge]").addBack("[data-merge]").attr("data-merge") * 1 || 1)),
            this._items[l] && this.reset(this._items[l].index()),
            this.invalidate("items"),
            this.trigger("added", {
                content: n,
                position: o
            })
        }
        ,
        D.prototype.remove = function(n) {
            n = this.normalize(n, !0),
            n !== L && (this.trigger("remove", {
                content: this._items[n],
                position: n
            }),
            this._items[n].remove(),
            this._items.splice(n, 1),
            this._mergers.splice(n, 1),
            this.invalidate("items"),
            this.trigger("removed", {
                content: null,
                position: n
            }))
        }
        ,
        D.prototype.preloadAutoWidthImages = function(n) {
            n.each(p.proxy(function(o, l) {
                this.enter("pre-loading"),
                l = p(l),
                p(new Image).one("load", p.proxy(function(c) {
                    l.attr("src", c.target.src),
                    l.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") && !this.is("initializing") && this.refresh()
                }, this)).attr("src", l.attr("src") || l.attr("data-src") || l.attr("data-src-retina"))
            }, this))
        }
        ,
        D.prototype.destroy = function() {
            this.$element.off(".owl.core"),
            this.$stage.off(".owl.core"),
            p(O).off(".owl.core"),
            this.settings.responsive !== !1 && (E.clearTimeout(this.resizeTimer),
            this.off(E, "resize", this._handlers.onThrottledResize));
            for (var n in this._plugins)
                this._plugins[n].destroy();
            this.$stage.children(".cloned").remove(),
            this.$stage.unwrap(),
            this.$stage.children().contents().unwrap(),
            this.$stage.children().unwrap(),
            this.$stage.remove(),
            this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s","g"), "")).removeData("owl.carousel")
        }
        ,
        D.prototype.op = function(n, o, l) {
            var c = this.settings.rtl;
            switch (o) {
            case "<":
                return c ? n > l : n < l;
            case ">":
                return c ? n < l : n > l;
            case ">=":
                return c ? n <= l : n >= l;
            case "<=":
                return c ? n >= l : n <= l
            }
        }
        ,
        D.prototype.on = function(n, o, l, c) {
            n.addEventListener ? n.addEventListener(o, l, c) : n.attachEvent && n.attachEvent("on" + o, l)
        }
        ,
        D.prototype.off = function(n, o, l, c) {
            n.removeEventListener ? n.removeEventListener(o, l, c) : n.detachEvent && n.detachEvent("on" + o, l)
        }
        ,
        D.prototype.trigger = function(n, o, l, c, d) {
            var a = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            }
              , m = p.camelCase(p.grep(["on", n, l], function(M) {
                return M
            }).join("-").toLowerCase())
              , _ = p.Event([n, "owl", l || "carousel"].join(".").toLowerCase(), p.extend({
                relatedTarget: this
            }, a, o));
            return this._supress[n] || (p.each(this._plugins, function(M, N) {
                N.onTrigger && N.onTrigger(_)
            }),
            this.register({
                type: D.Type.Event,
                name: n
            }),
            this.$element.trigger(_),
            this.settings && typeof this.settings[m] == "function" && this.settings[m].call(this, _)),
            _
        }
        ,
        D.prototype.enter = function(n) {
            p.each([n].concat(this._states.tags[n] || []), p.proxy(function(o, l) {
                this._states.current[l] === L && (this._states.current[l] = 0),
                this._states.current[l]++
            }, this))
        }
        ,
        D.prototype.leave = function(n) {
            p.each([n].concat(this._states.tags[n] || []), p.proxy(function(o, l) {
                this._states.current[l]--
            }, this))
        }
        ,
        D.prototype.register = function(n) {
            if (n.type === D.Type.Event) {
                if (p.event.special[n.name] || (p.event.special[n.name] = {}),
                !p.event.special[n.name].owl) {
                    var o = p.event.special[n.name]._default;
                    p.event.special[n.name]._default = function(l) {
                        return o && o.apply && (!l.namespace || l.namespace.indexOf("owl") === -1) ? o.apply(this, arguments) : l.namespace && l.namespace.indexOf("owl") > -1
                    }
                    ,
                    p.event.special[n.name].owl = !0
                }
            } else
                n.type === D.Type.State && (this._states.tags[n.name] ? this._states.tags[n.name] = this._states.tags[n.name].concat(n.tags) : this._states.tags[n.name] = n.tags,
                this._states.tags[n.name] = p.grep(this._states.tags[n.name], p.proxy(function(l, c) {
                    return p.inArray(l, this._states.tags[n.name]) === c
                }, this)))
        }
        ,
        D.prototype.suppress = function(n) {
            p.each(n, p.proxy(function(o, l) {
                this._supress[l] = !0
            }, this))
        }
        ,
        D.prototype.release = function(n) {
            p.each(n, p.proxy(function(o, l) {
                delete this._supress[l]
            }, this))
        }
        ,
        D.prototype.pointer = function(n) {
            var o = {
                x: null,
                y: null
            };
            return n = n.originalEvent || n || E.event,
            n = n.touches && n.touches.length ? n.touches[0] : n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n,
            n.pageX ? (o.x = n.pageX,
            o.y = n.pageY) : (o.x = n.clientX,
            o.y = n.clientY),
            o
        }
        ,
        D.prototype.isNumeric = function(n) {
            return !isNaN(parseFloat(n))
        }
        ,
        D.prototype.difference = function(n, o) {
            return {
                x: n.x - o.x,
                y: n.y - o.y
            }
        }
        ,
        p.fn.owlCarousel = function(n) {
            var o = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var l = p(this)
                  , c = l.data("owl.carousel");
                c || (c = new D(this,typeof n == "object" && n),
                l.data("owl.carousel", c),
                p.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(d, a) {
                    c.register({
                        type: D.Type.Event,
                        name: a
                    }),
                    c.$element.on(a + ".owl.carousel.core", p.proxy(function(m) {
                        m.namespace && m.relatedTarget !== this && (this.suppress([a]),
                        c[a].apply(this, [].slice.call(arguments, 1)),
                        this.release([a]))
                    }, c))
                })),
                typeof n == "string" && n.charAt(0) !== "_" && c[n].apply(c, o)
            })
        }
        ,
        p.fn.owlCarousel.Constructor = D
    }
    )(window.Zepto || window.jQuery, window, document);
    (function(p, E, O, L) {
        var D = function(n) {
            this._core = n,
            this._interval = null,
            this._visible = null,
            this._handlers = {
                "initialized.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.settings.autoRefresh && this.watch()
                }, this)
            },
            this._core.options = p.extend({}, D.Defaults, this._core.options),
            this._core.$element.on(this._handlers)
        };
        D.Defaults = {
            autoRefresh: !0,
            autoRefreshInterval: 500
        },
        D.prototype.watch = function() {
            this._interval || (this._visible = this._core.isVisible(),
            this._interval = E.setInterval(p.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
        }
        ,
        D.prototype.refresh = function() {
            this._core.isVisible() !== this._visible && (this._visible = !this._visible,
            this._core.$element.toggleClass("owl-hidden", !this._visible),
            this._visible && this._core.invalidate("width") && this._core.refresh())
        }
        ,
        D.prototype.destroy = function() {
            var n, o;
            E.clearInterval(this._interval);
            for (n in this._handlers)
                this._core.$element.off(n, this._handlers[n]);
            for (o in Object.getOwnPropertyNames(this))
                typeof this[o] != "function" && (this[o] = null)
        }
        ,
        p.fn.owlCarousel.Constructor.Plugins.AutoRefresh = D
    }
    )(window.Zepto || window.jQuery, window);
    (function(p, E, O, L) {
        var D = function(n) {
            this._core = n,
            this._loaded = [],
            this._handlers = {
                "initialized.owl.carousel change.owl.carousel resized.owl.carousel": p.proxy(function(o) {
                    if (o.namespace && !(!this._core.settings || !this._core.settings.lazyLoad) && (o.property && o.property.name == "position" || o.type == "initialized")) {
                        var l = this._core.settings
                          , c = l.center && Math.ceil(l.items / 2) || l.items
                          , d = l.center && c * -1 || 0
                          , a = (o.property && o.property.value !== L ? o.property.value : this._core.current()) + d
                          , m = this._core.clones().length
                          , _ = p.proxy(function(M, N) {
                            this.load(N)
                        }, this);
                        for (l.lazyLoadEager > 0 && (c += l.lazyLoadEager,
                        l.loop && (a -= l.lazyLoadEager,
                        c++)); d++ < c; )
                            this.load(m / 2 + this._core.relative(a)),
                            m && p.each(this._core.clones(this._core.relative(a)), _),
                            a++
                    }
                }, this)
            },
            this._core.options = p.extend({}, D.Defaults, this._core.options),
            this._core.$element.on(this._handlers)
        };
        D.Defaults = {
            lazyLoad: !1,
            lazyLoadEager: 0
        },
        D.prototype.load = function(n) {
            var o = this._core.$stage.children().eq(n)
              , l = o && o.find(".owl-lazy");
            !l || p.inArray(o.get(0), this._loaded) > -1 || (l.each(p.proxy(function(c, d) {
                var a = p(d), m, _ = E.devicePixelRatio > 1 && a.attr("data-src-retina") || a.attr("data-src") || a.attr("data-srcset");
                this._core.trigger("load", {
                    element: a,
                    url: _
                }, "lazy"),
                a.is("img") ? a.one("load.owl.lazy", p.proxy(function() {
                    a.css("opacity", 1),
                    this._core.trigger("loaded", {
                        element: a,
                        url: _
                    }, "lazy")
                }, this)).attr("src", _) : a.is("source") ? a.one("load.owl.lazy", p.proxy(function() {
                    this._core.trigger("loaded", {
                        element: a,
                        url: _
                    }, "lazy")
                }, this)).attr("srcset", _) : (m = new Image,
                m.onload = p.proxy(function() {
                    a.css({
                        "background-image": 'url("' + _ + '")',
                        opacity: "1"
                    }),
                    this._core.trigger("loaded", {
                        element: a,
                        url: _
                    }, "lazy")
                }, this),
                m.src = _)
            }, this)),
            this._loaded.push(o.get(0)))
        }
        ,
        D.prototype.destroy = function() {
            var n, o;
            for (n in this.handlers)
                this._core.$element.off(n, this.handlers[n]);
            for (o in Object.getOwnPropertyNames(this))
                typeof this[o] != "function" && (this[o] = null)
        }
        ,
        p.fn.owlCarousel.Constructor.Plugins.Lazy = D
    }
    )(window.Zepto || window.jQuery, window);
    (function(p, E, O, L) {
        var D = function(n) {
            this._core = n,
            this._previousHeight = null,
            this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": p.proxy(function(l) {
                    l.namespace && this._core.settings.autoHeight && this.update()
                }, this),
                "changed.owl.carousel": p.proxy(function(l) {
                    l.namespace && this._core.settings.autoHeight && l.property.name === "position" && this.update()
                }, this),
                "loaded.owl.lazy": p.proxy(function(l) {
                    l.namespace && this._core.settings.autoHeight && l.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                }, this)
            },
            this._core.options = p.extend({}, D.Defaults, this._core.options),
            this._core.$element.on(this._handlers),
            this._intervalId = null;
            var o = this;
            p(E).on("load", function() {
                o._core.settings.autoHeight && o.update()
            }),
            p(E).resize(function() {
                o._core.settings.autoHeight && (o._intervalId != null && clearTimeout(o._intervalId),
                o._intervalId = setTimeout(function() {
                    o.update()
                }, 250))
            })
        };
        D.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        },
        D.prototype.update = function() {
            var n = this._core._current
              , o = n + this._core.settings.items
              , l = this._core.settings.lazyLoad
              , c = this._core.$stage.children().toArray().slice(n, o)
              , d = []
              , a = 0;
            p.each(c, function(m, _) {
                d.push(p(_).height())
            }),
            a = Math.max.apply(null, d),
            a <= 1 && l && this._previousHeight && (a = this._previousHeight),
            this._previousHeight = a,
            this._core.$stage.parent().height(a).addClass(this._core.settings.autoHeightClass)
        }
        ,
        D.prototype.destroy = function() {
            var n, o;
            for (n in this._handlers)
                this._core.$element.off(n, this._handlers[n]);
            for (o in Object.getOwnPropertyNames(this))
                typeof this[o] != "function" && (this[o] = null)
        }
        ,
        p.fn.owlCarousel.Constructor.Plugins.AutoHeight = D
    }
    )(window.Zepto || window.jQuery, window);
    (function(p, E, O, L) {
        var D = function(n) {
            this._core = n,
            this._videos = {},
            this._playing = null,
            this._handlers = {
                "initialized.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.register({
                        type: "state",
                        name: "playing",
                        tags: ["interacting"]
                    })
                }, this),
                "resize.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.settings.video && this.isInFullScreen() && o.preventDefault()
                }, this),
                "refreshed.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                }, this),
                "changed.owl.carousel": p.proxy(function(o) {
                    o.namespace && o.property.name === "position" && this._playing && this.stop()
                }, this),
                "prepared.owl.carousel": p.proxy(function(o) {
                    if (o.namespace) {
                        var l = p(o.content).find(".owl-video");
                        l.length && (l.css("display", "none"),
                        this.fetch(l, p(o.content)))
                    }
                }, this)
            },
            this._core.options = p.extend({}, D.Defaults, this._core.options),
            this._core.$element.on(this._handlers),
            this._core.$element.on("click.owl.video", ".owl-video-play-icon", p.proxy(function(o) {
                this.play(o)
            }, this))
        };
        D.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        },
        D.prototype.fetch = function(n, o) {
            var l = function() {
                return n.attr("data-vimeo-id") ? "vimeo" : n.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }()
              , c = n.attr("data-vimeo-id") || n.attr("data-youtube-id") || n.attr("data-vzaar-id")
              , d = n.attr("data-width") || this._core.settings.videoWidth
              , a = n.attr("data-height") || this._core.settings.videoHeight
              , m = n.attr("href");
            if (m) {
                if (c = m.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
                c[3].indexOf("youtu") > -1)
                    l = "youtube";
                else if (c[3].indexOf("vimeo") > -1)
                    l = "vimeo";
                else if (c[3].indexOf("vzaar") > -1)
                    l = "vzaar";
                else
                    throw new Error("Video URL not supported.");
                c = c[6]
            } else
                throw new Error("Missing video URL.");
            this._videos[m] = {
                type: l,
                id: c,
                width: d,
                height: a
            },
            o.attr("data-video", m),
            this.thumbnail(n, this._videos[m])
        }
        ,
        D.prototype.thumbnail = function(n, o) {
            var l, c, d, a = o.width && o.height ? "width:" + o.width + "px;height:" + o.height + "px;" : "", m = n.find("img"), _ = "src", M = "", N = this._core.settings, W = function(U) {
                c = '<div class="owl-video-play-icon"></div>',
                N.lazyLoad ? l = p("<div/>", {
                    class: "owl-video-tn " + M,
                    srcType: U
                }) : l = p("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + U + ")"
                }),
                n.after(l),
                n.after(c)
            };
            if (n.wrap(p("<div/>", {
                class: "owl-video-wrapper",
                style: a
            })),
            this._core.settings.lazyLoad && (_ = "data-src",
            M = "owl-lazy"),
            m.length)
                return W(m.attr(_)),
                m.remove(),
                !1;
            o.type === "youtube" ? (d = "//img.youtube.com/vi/" + o.id + "/hqdefault.jpg",
            W(d)) : o.type === "vimeo" ? p.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + o.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(U) {
                    d = U[0].thumbnail_large,
                    W(d)
                }
            }) : o.type === "vzaar" && p.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + o.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(U) {
                    d = U.framegrab_url,
                    W(d)
                }
            })
        }
        ,
        D.prototype.stop = function() {
            this._core.trigger("stop", null, "video"),
            this._playing.find(".owl-video-frame").remove(),
            this._playing.removeClass("owl-video-playing"),
            this._playing = null,
            this._core.leave("playing"),
            this._core.trigger("stopped", null, "video")
        }
        ,
        D.prototype.play = function(n) {
            var o = p(n.target), l = o.closest("." + this._core.settings.itemClass), c = this._videos[l.attr("data-video")], d = c.width || "100%", a = c.height || this._core.$stage.height(), m;
            this._playing || (this._core.enter("playing"),
            this._core.trigger("play", null, "video"),
            l = this._core.items(this._core.relative(l.index())),
            this._core.reset(l.index()),
            m = p('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),
            m.attr("height", a),
            m.attr("width", d),
            c.type === "youtube" ? m.attr("src", "//www.youtube.com/embed/" + c.id + "?autoplay=1&rel=0&v=" + c.id) : c.type === "vimeo" ? m.attr("src", "//player.vimeo.com/video/" + c.id + "?autoplay=1") : c.type === "vzaar" && m.attr("src", "//view.vzaar.com/" + c.id + "/player?autoplay=true"),
            p(m).wrap('<div class="owl-video-frame" />').insertAfter(l.find(".owl-video")),
            this._playing = l.addClass("owl-video-playing"))
        }
        ,
        D.prototype.isInFullScreen = function() {
            var n = O.fullscreenElement || O.mozFullScreenElement || O.webkitFullscreenElement;
            return n && p(n).parent().hasClass("owl-video-frame")
        }
        ,
        D.prototype.destroy = function() {
            var n, o;
            this._core.$element.off("click.owl.video");
            for (n in this._handlers)
                this._core.$element.off(n, this._handlers[n]);
            for (o in Object.getOwnPropertyNames(this))
                typeof this[o] != "function" && (this[o] = null)
        }
        ,
        p.fn.owlCarousel.Constructor.Plugins.Video = D
    }
    )(window.Zepto || window.jQuery, window, document);
    (function(p, E, O, L) {
        var D = function(n) {
            this.core = n,
            this.core.options = p.extend({}, D.Defaults, this.core.options),
            this.swapping = !0,
            this.previous = L,
            this.next = L,
            this.handlers = {
                "change.owl.carousel": p.proxy(function(o) {
                    o.namespace && o.property.name == "position" && (this.previous = this.core.current(),
                    this.next = o.property.value)
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": p.proxy(function(o) {
                    o.namespace && (this.swapping = o.type == "translated")
                }, this),
                "translate.owl.carousel": p.proxy(function(o) {
                    o.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            },
            this.core.$element.on(this.handlers)
        };
        D.Defaults = {
            animateOut: !1,
            animateIn: !1
        },
        D.prototype.swap = function() {
            if (this.core.settings.items === 1 && !(!p.support.animation || !p.support.transition)) {
                this.core.speed(0);
                var n, o = p.proxy(this.clear, this), l = this.core.$stage.children().eq(this.previous), c = this.core.$stage.children().eq(this.next), d = this.core.settings.animateIn, a = this.core.settings.animateOut;
                this.core.current() !== this.previous && (a && (n = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
                l.one(p.support.animation.end, o).css({
                    left: n + "px"
                }).addClass("animated owl-animated-out").addClass(a)),
                d && c.one(p.support.animation.end, o).addClass("animated owl-animated-in").addClass(d))
            }
        }
        ,
        D.prototype.clear = function(n) {
            p(n.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
            this.core.onTransitionEnd()
        }
        ,
        D.prototype.destroy = function() {
            var n, o;
            for (n in this.handlers)
                this.core.$element.off(n, this.handlers[n]);
            for (o in Object.getOwnPropertyNames(this))
                typeof this[o] != "function" && (this[o] = null)
        }
        ,
        p.fn.owlCarousel.Constructor.Plugins.Animate = D
    }
    )(window.Zepto || window.jQuery);
    (function(p, E, O, L) {
        var D = function(n) {
            this._core = n,
            this._call = null,
            this._time = 0,
            this._timeout = 0,
            this._paused = !0,
            this._handlers = {
                "changed.owl.carousel": p.proxy(function(o) {
                    o.namespace && o.property.name === "settings" ? this._core.settings.autoplay ? this.play() : this.stop() : o.namespace && o.property.name === "position" && this._paused && (this._time = 0)
                }, this),
                "initialized.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.settings.autoplay && this.play()
                }, this),
                "play.owl.autoplay": p.proxy(function(o, l, c) {
                    o.namespace && this.play(l, c)
                }, this),
                "stop.owl.autoplay": p.proxy(function(o) {
                    o.namespace && this.stop()
                }, this),
                "mouseover.owl.autoplay": p.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "mouseleave.owl.autoplay": p.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                }, this),
                "touchstart.owl.core": p.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "touchend.owl.core": p.proxy(function() {
                    this._core.settings.autoplayHoverPause && this.play()
                }, this)
            },
            this._core.$element.on(this._handlers),
            this._core.options = p.extend({}, D.Defaults, this._core.options)
        };
        D.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        },
        D.prototype._next = function(n) {
            this._call = E.setTimeout(p.proxy(this._next, this, n), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()),
            !(this._core.is("interacting") || O.hidden) && this._core.next(n || this._core.settings.autoplaySpeed)
        }
        ,
        D.prototype.read = function() {
            return new Date().getTime() - this._time
        }
        ,
        D.prototype.play = function(n, o) {
            var l;
            this._core.is("rotating") || this._core.enter("rotating"),
            n = n || this._core.settings.autoplayTimeout,
            l = Math.min(this._time % (this._timeout || n), n),
            this._paused ? (this._time = this.read(),
            this._paused = !1) : E.clearTimeout(this._call),
            this._time += this.read() % n - l,
            this._timeout = n,
            this._call = E.setTimeout(p.proxy(this._next, this, o), n - l)
        }
        ,
        D.prototype.stop = function() {
            this._core.is("rotating") && (this._time = 0,
            this._paused = !0,
            E.clearTimeout(this._call),
            this._core.leave("rotating"))
        }
        ,
        D.prototype.pause = function() {
            this._core.is("rotating") && !this._paused && (this._time = this.read(),
            this._paused = !0,
            E.clearTimeout(this._call))
        }
        ,
        D.prototype.destroy = function() {
            var n, o;
            this.stop();
            for (n in this._handlers)
                this._core.$element.off(n, this._handlers[n]);
            for (o in Object.getOwnPropertyNames(this))
                typeof this[o] != "function" && (this[o] = null)
        }
        ,
        p.fn.owlCarousel.Constructor.Plugins.autoplay = D
    }
    )(window.Zepto || window.jQuery, window, document);
    (function(p, E, O, L) {
        var D = function(n) {
            this._core = n,
            this._initialized = !1,
            this._pages = [],
            this._controls = {},
            this._templates = [],
            this.$element = this._core.$element,
            this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            },
            this._handlers = {
                "prepared.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + p(o.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
                }, this),
                "added.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.settings.dotsData && this._templates.splice(o.position, 0, this._templates.pop())
                }, this),
                "remove.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.settings.dotsData && this._templates.splice(o.position, 1)
                }, this),
                "changed.owl.carousel": p.proxy(function(o) {
                    o.namespace && o.property.name == "position" && this.draw()
                }, this),
                "initialized.owl.carousel": p.proxy(function(o) {
                    o.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"),
                    this.initialize(),
                    this.update(),
                    this.draw(),
                    this._initialized = !0,
                    this._core.trigger("initialized", null, "navigation"))
                }, this),
                "refreshed.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"),
                    this.update(),
                    this.draw(),
                    this._core.trigger("refreshed", null, "navigation"))
                }, this)
            },
            this._core.options = p.extend({}, D.Defaults, this._core.options),
            this.$element.on(this._handlers)
        };
        D.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        },
        D.prototype.initialize = function() {
            var n, o = this._core.settings;
            this._controls.$relative = (o.navContainer ? p(o.navContainer) : p("<div>").addClass(o.navContainerClass).appendTo(this.$element)).addClass("disabled"),
            this._controls.$previous = p("<" + o.navElement + ">").addClass(o.navClass[0]).html(o.navText[0]).prependTo(this._controls.$relative).on("click", p.proxy(function(l) {
                this.prev(o.navSpeed)
            }, this)),
            this._controls.$next = p("<" + o.navElement + ">").addClass(o.navClass[1]).html(o.navText[1]).appendTo(this._controls.$relative).on("click", p.proxy(function(l) {
                this.next(o.navSpeed)
            }, this)),
            o.dotsData || (this._templates = [p('<button role="button">').addClass(o.dotClass).append(p("<span>")).prop("outerHTML")]),
            this._controls.$absolute = (o.dotsContainer ? p(o.dotsContainer) : p("<div>").addClass(o.dotsClass).appendTo(this.$element)).addClass("disabled"),
            this._controls.$absolute.on("click", "button", p.proxy(function(l) {
                var c = p(l.target).parent().is(this._controls.$absolute) ? p(l.target).index() : p(l.target).parent().index();
                l.preventDefault(),
                this.to(c, o.dotsSpeed)
            }, this));
            for (n in this._overrides)
                this._core[n] = p.proxy(this[n], this)
        }
        ,
        D.prototype.destroy = function() {
            var n, o, l, c, d;
            d = this._core.settings;
            for (n in this._handlers)
                this.$element.off(n, this._handlers[n]);
            for (o in this._controls)
                o === "$relative" && d.navContainer ? this._controls[o].html("") : this._controls[o].remove();
            for (c in this.overides)
                this._core[c] = this._overrides[c];
            for (l in Object.getOwnPropertyNames(this))
                typeof this[l] != "function" && (this[l] = null)
        }
        ,
        D.prototype.update = function() {
            var n, o, l = this._core.clones().length / 2, c = l + this._core.items().length, d = this._core.maximum(!0), a = this._core.settings, m = a.center || a.autoWidth || a.dotsData ? 1 : a.dotsEach || a.items;
            if (a.slideBy !== "page" && (a.slideBy = Math.min(a.slideBy, a.items)),
            a.dots || a.slideBy == "page")
                for (this._pages = [],
                n = l,
                o = 0,
                0; n < c; n++) {
                    if (o >= m || o === 0) {
                        if (this._pages.push({
                            start: Math.min(d, n - l),
                            end: n - l + m - 1
                        }),
                        Math.min(d, n - l) === d)
                            break;
                        o = 0
                    }
                    o += this._core.mergers(this._core.relative(n))
                }
        }
        ,
        D.prototype.draw = function() {
            var n, o = this._core.settings, l = this._core.items().length <= o.items, c = this._core.relative(this._core.current()), d = o.loop || o.rewind;
            this._controls.$relative.toggleClass("disabled", !o.nav || l),
            o.nav && (this._controls.$previous.toggleClass("disabled", !d && c <= this._core.minimum(!0)),
            this._controls.$next.toggleClass("disabled", !d && c >= this._core.maximum(!0))),
            this._controls.$absolute.toggleClass("disabled", !o.dots || l),
            o.dots && (n = this._pages.length - this._controls.$absolute.children().length,
            o.dotsData && n !== 0 ? this._controls.$absolute.html(this._templates.join("")) : n > 0 ? this._controls.$absolute.append(new Array(n + 1).join(this._templates[0])) : n < 0 && this._controls.$absolute.children().slice(n).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute.children().eq(p.inArray(this.current(), this._pages)).addClass("active"))
        }
        ,
        D.prototype.onTrigger = function(n) {
            var o = this._core.settings;
            n.page = {
                index: p.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: o && (o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items)
            }
        }
        ,
        D.prototype.current = function() {
            var n = this._core.relative(this._core.current());
            return p.grep(this._pages, p.proxy(function(o, l) {
                return o.start <= n && o.end >= n
            }, this)).pop()
        }
        ,
        D.prototype.getPosition = function(n) {
            var o, l, c = this._core.settings;
            return c.slideBy == "page" ? (o = p.inArray(this.current(), this._pages),
            l = this._pages.length,
            n ? ++o : --o,
            o = this._pages[(o % l + l) % l].start) : (o = this._core.relative(this._core.current()),
            l = this._core.items().length,
            n ? o += c.slideBy : o -= c.slideBy),
            o
        }
        ,
        D.prototype.next = function(n) {
            p.proxy(this._overrides.to, this._core)(this.getPosition(!0), n)
        }
        ,
        D.prototype.prev = function(n) {
            p.proxy(this._overrides.to, this._core)(this.getPosition(!1), n)
        }
        ,
        D.prototype.to = function(n, o, l) {
            var c;
            !l && this._pages.length ? (c = this._pages.length,
            p.proxy(this._overrides.to, this._core)(this._pages[(n % c + c) % c].start, o)) : p.proxy(this._overrides.to, this._core)(n, o)
        }
        ,
        p.fn.owlCarousel.Constructor.Plugins.Navigation = D
    }
    )(window.Zepto || window.jQuery);
    (function(p, E, O, L) {
        var D = function(n) {
            this._core = n,
            this._hashes = {},
            this.$element = this._core.$element,
            this._handlers = {
                "initialized.owl.carousel": p.proxy(function(o) {
                    o.namespace && this._core.settings.startPosition === "URLHash" && p(E).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": p.proxy(function(o) {
                    if (o.namespace) {
                        var l = p(o.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                        if (!l)
                            return;
                        this._hashes[l] = o.content
                    }
                }, this),
                "changed.owl.carousel": p.proxy(function(o) {
                    if (o.namespace && o.property.name === "position") {
                        var l = this._core.items(this._core.relative(this._core.current()))
                          , c = p.map(this._hashes, function(d, a) {
                            return d === l ? a : null
                        }).join();
                        if (!c || E.location.hash.slice(1) === c)
                            return;
                        E.location.hash = c
                    }
                }, this)
            },
            this._core.options = p.extend({}, D.Defaults, this._core.options),
            this.$element.on(this._handlers),
            p(E).on("hashchange.owl.navigation", p.proxy(function(o) {
                var l = E.location.hash.substring(1)
                  , c = this._core.$stage.children()
                  , d = this._hashes[l] && c.index(this._hashes[l]);
                d === L || d === this._core.current() || this._core.to(this._core.relative(d), !1, !0)
            }, this))
        };
        D.Defaults = {
            URLhashListener: !1
        },
        D.prototype.destroy = function() {
            var n, o;
            p(E).off("hashchange.owl.navigation");
            for (n in this._handlers)
                this._core.$element.off(n, this._handlers[n]);
            for (o in Object.getOwnPropertyNames(this))
                typeof this[o] != "function" && (this[o] = null)
        }
        ,
        p.fn.owlCarousel.Constructor.Plugins.Hash = D
    }
    )(window.Zepto || window.jQuery, window);
    (function(p, E, O, L) {
        var D = p("<support>").get(0).style
          , n = "Webkit Moz O ms".split(" ")
          , o = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        }
          , l = {
            csstransforms: function() {
                return !!c("transform")
            },
            csstransforms3d: function() {
                return !!c("perspective")
            },
            csstransitions: function() {
                return !!c("transition")
            },
            cssanimations: function() {
                return !!c("animation")
            }
        };
        function c(a, m) {
            var _ = !1
              , M = a.charAt(0).toUpperCase() + a.slice(1);
            return p.each((a + " " + n.join(M + " ") + M).split(" "), function(N, W) {
                if (D[W] !== L)
                    return _ = m ? W : !0,
                    !1
            }),
            _
        }
        function d(a) {
            return c(a, !0)
        }
        l.csstransitions() && (p.support.transition = new String(d("transition")),
        p.support.transition.end = o.transition.end[p.support.transition]),
        l.cssanimations() && (p.support.animation = new String(d("animation")),
        p.support.animation.end = o.animation.end[p.support.animation]),
        l.csstransforms() && (p.support.transform = new String(d("transform")),
        p.support.transform3d = l.csstransforms3d())
    }
    )(window.Zepto || window.jQuery);
    $(".gra-carousel-cards").length > 0 && $(".gra-carousel-cards").each(function() {
        var p = $(this).find("#card-carousel")
          , E = $(this).data("items-per-page")
          , O = $(this).data("with-loop")
          , L = $(this);
        p.owlCarousel({
            items: E || 4,
            loop: O,
            margin: 24,
            nav: !1,
            dots: !1,
            autoplay: !0,
            autoplayHoverPause: !0,
            navText: ['<div class="icon icon-secondary"><i class="icon-chevron-left iconLeft"></i></div>', '<div class="icon icon-secondary"><i class="icon-chevron-right iconRight"></i></div>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1e3: {
                    items: 3
                },
                1360: {
                    items: E || 4
                }
            }
        }),
        L.find("#prev-button").click(function() {
            p.trigger("prev.owl.carousel")
        }),
        L.find("#next-button").click(function() {
            p.trigger("next.owl.carousel")
        })
    });
    const vo = document.querySelectorAll(".indeterminate-checkbox");
    vo.forEach(p => {
        p.indeterminate = !0,
        p.addEventListener("click", () => {
            p.checked && (p.indeterminate = !1)
        }
        )
    }
    );
    $(".closeIcon").click(function() {
        $(this).closest(".gra-feedback-msg").fadeOut(300)
    });
    const yo = document.querySelectorAll(".dropContainer");
    yo.forEach(function(p) {
        p.addEventListener("dragover", function(E) {
            E.preventDefault(),
            ts(this, E)
        }),
        p.addEventListener("dragenter", function(E) {
            E.preventDefault(),
            ts(this, E)
        }),
        p.addEventListener("dragleave", function(E) {
            E.preventDefault(),
            _o(this, E)
        }),
        p.addEventListener("drop", function(E) {
            E.preventDefault(),
            bo(this, E, this.getAttribute("data-id-upload"))
        })
    });
    function ts(p, E) {
        E.preventDefault(),
        p.style.transition = "height 0.5s",
        p.style.height = "100px"
    }
    function _o(p, E) {
        E.preventDefault,
        E.stopPropagation,
        p.style.transition = "height 0.5s",
        p.style.height = "auto"
    }
    function bo(p, E, O) {
        E.preventDefault(),
        E.stopPropagation(),
        p.style.transition = "height 0.5s",
        p.style.height = "auto";
        var L = document.getElementById(O)
          , D = L.getElementsByClassName("fileInput")[0];
        if (D.hasAttribute("data-max-files") && D.hasAttribute("multiple")) {
            for (var n = new DataTransfer, o = new Set, l = 0; l < D.files.length; l++)
                o.add(D.files[l].name);
            for (var l = 0; l < D.files.length; l++)
                n.items.add(D.files[l]);
            for (var l = 0; l < E.dataTransfer.files.length; l++)
                o.has(E.dataTransfer.files[l].name) || (n.items.add(E.dataTransfer.files[l]),
                o.add(E.dataTransfer.files[l].name));
            D.files = n.files
        } else {
            for (var n = new DataTransfer, o = new Set, l = 0; l < D.files.length; l++)
                o.add(D.files[l].name);
            for (var l = 0; l < D.files.length; l++)
                n.items.add(D.files[l]);
            for (var l = 0; l < E.dataTransfer.files.length; l++)
                n.items.length == 0 && (o.has(E.dataTransfer.files[l].name) || (n.items.add(E.dataTransfer.files[l]),
                o.add(E.dataTransfer.files[l].name)));
            D.files = n.files
        }
        os(O)
    }
    function wo(p, E, L) {
        E.preventDefault(),
        E.stopPropagation();
        var L = document.getElementById(L);
        L.getElementsByClassName("fileInput")[0].click()
    }
    function xo(p, E, O) {
        E.preventDefault(),
        O = document.getElementById(O);
        for (var L = document.getElementById("popupListUplFiles"), D = "", n = O.getElementsByClassName("dropContainer")[0], o = 0; o < O.getElementsByClassName("fileInput")[0].files.length; o++) {
            var l = '<div class="filewrapper">';
            n.classList.contains("errorLoadFiles") && !n.classList.contains("maxLimitFiles") && (l = '<div class="filewrapper error">'),
            D += l + '<div class="fileImage"><div class="gra-spinner small modalSpinner"></div><i class="icon-file docImage"></i><i class="icon-circle-minus forbiddenImage"></i></div><div class="fileTitle">' + O.getElementsByClassName("fileInput")[0].files[o].name + (n.classList.contains("incorrectFormat") ? " - Tipo de ficheiro inválido" : "") + '</div><div class="fileAction"><a class="removeFicheiro" href="#" onclick="fileUpload.removeficheiro(this,event,' + o + ",'" + O.getAttribute("id") + `')"><i class="icon-trash"></i></a><a class="showImage" href="#" onclick="window.location=fileUpload.leFicheiro(` + o + ",'" + O.getAttribute("id") + `');"><i class="icon-eye showImage"></i></a></div></div>`
        }
        L.getElementsByClassName("popupContent")[0].innerHTML = D,
        $(L).hasClass("show") ? ($(L).fadeOut(),
        $(L).find(".popupMask").removeClass("visible")) : ($(L).fadeIn(),
        $(L).find(".popupMask").addClass("visible"),
        $("body").css("overflow-y", "hidden"))
    }
    function os(p) {
        const E = p;
        document.getElementById(p).getElementsByClassName("fuBottom")[0].style.display = "flex",
        document.getElementById(p).getElementsByClassName("fuTop")[0].style.display = "flex",
        document.getElementById(p).getElementsByClassName("status_right")[0].style.display = "block",
        p = document.getElementById(p);
        const O = p.getElementsByClassName("fileInput")[0];
        let L = 5 * 1024 * 1024;
        O.hasAttribute("data-max-size") && O.getAttribute("data-max-size") != "" && (L = parseInt(O.getAttribute("data-max-size"), 10) * 1024 * 1024);
        var D = 0;
        if (O.hasAttribute("data-max-files") && O.hasAttribute("multiple")) {
            const n = parseInt(O.getAttribute("data-max-files"), 10);
            if (O.files.length > n) {
                const o = Array.from(O.files).slice(0, n)
                  , l = new DataTransfer;
                o.forEach(function(c) {
                    c.size <= L && l.items.add(c)
                }),
                O.files = l.files,
                document.getElementById(E).getElementsByClassName("dropContainer")[0].classList.add("errorLoadFiles", "maxLimitFiles"),
                document.getElementById(E).getElementsByClassName("status_right")[0].innerHTML = "<span>O número máximo de ficheiros permitido é: " + n + "</span>"
            } else {
                const o = new DataTransfer;
                Array.from(O.files).forEach(function(l) {
                    if (l.size <= L) {
                        o.items.add(l);
                        const c = O.getAttribute("accept");
                        c && (is(c).includes(l.type) || (D++,
                        document.getElementById(E).getElementsByClassName("dropContainer")[0].classList.add("errorLoadFiles", "incorrectFormat"),
                        document.getElementById(E).getElementsByClassName("status_right")[0].innerHTML = "<span>Tipo de ficheiro inválido!</span>"))
                    } else
                        D++,
                        document.getElementById(E).getElementsByClassName("dropContainer")[0].classList.add("errorLoadFiles", "maxLimitFiles"),
                        document.getElementById(E).getElementsByClassName("status_right")[0].innerHTML = '<span>Ficheiro "' + l.name + '" excedeu o tamanho de ' + parseInt(O.getAttribute("data-max-size") != "" ? O.getAttribute("data-max-size") : 5, 10) + "MB!</span>"
                }),
                o.files.length > 0 ? (O.files = o.files,
                p.getElementsByClassName("fuBottom")[0].innerHTML = `<div class="listFilesUplLink"><a href="#" class="gra-link" onclick="fileUpload.openModalFileUploaded(this,event,'` + p.getAttribute("id") + `')">Lista de ficheiros carregados</a></div>`) : O.value = "",
                D == 0 && (document.getElementById(E).getElementsByClassName("dropContainer")[0].classList.remove("errorLoadFiles"),
                p.getElementsByClassName("status_right")[0].innerHTML = p.getElementsByClassName("fileInput")[0].files.length + " ficheiro(s) carregado(s)")
            }
        } else {
            const n = new DataTransfer;
            Array.from(O.files).forEach(function(o) {
                if (o.size <= L) {
                    n.items.add(o);
                    const l = O.getAttribute("accept");
                    l && (is(l).includes(o.type) || (D++,
                    document.getElementById(E).getElementsByClassName("dropContainer")[0].classList.add("errorLoadFiles", "incorrectFormat"),
                    document.getElementById(E).getElementsByClassName("status_right")[0].innerHTML = "<span>Tipo de ficheiro inválido!</span>"))
                } else
                    D++,
                    document.getElementById(E).getElementsByClassName("dropContainer")[0].classList.add("errorLoadFiles", "maxLimitFiles"),
                    document.getElementById(E).getElementsByClassName("status_right")[0].innerHTML = '<span>Ficheiro "' + o.name + '" excedeu o tamanho de MB!</span>'
            }),
            n.files.length > 0 ? (O.files = n.files,
            p.getElementsByClassName("fuBottom")[0].innerHTML = `<div class="listFilesUplLink"><a href="#" class="gra-link" onclick="fileUpload.openModalFileUploaded(this,event,'` + p.getAttribute("id") + `')">Lista de ficheiros carregados</a></div>`) : O.value = "",
            D == 0 && (document.getElementById(E).getElementsByClassName("dropContainer")[0].classList.remove("errorLoadFiles"),
            p.getElementsByClassName("status_right")[0].innerHTML = p.getElementsByClassName("fileInput")[0].files.length + " ficheiro(s) carregado(s)")
        }
    }
    function is(p) {
        const E = [];
        return p && p.split(",").forEach(L => {
            L = L.trim(),
            E.push(L)
        }
        ),
        E
    }
    function Do(p) {
        for (var E = 0, O = 0; O < p.length; O++)
            E += p[O].size;
        return E
    }
    function Co(p, E, O, L) {
        E.preventDefault();
        var D = 0
          , n = new DataTransfer;
        for (D = 0; D < document.getElementById(L).getElementsByClassName("fileInput")[0].files.length; D++)
            D != O && n.items.add(document.getElementById(L).getElementsByClassName("fileInput")[0].files[D]);
        document.getElementById(L).getElementsByClassName("fileInput")[0].files = n.files,
        p.parentElement.parentElement.style.display = "none",
        document.getElementById(L).getElementsByClassName("fileInput")[0].files.length == 0 ? (document.getElementById(L).getElementsByClassName("fuBottom")[0].style.display = "none",
        document.getElementById(L).getElementsByClassName("status_right")[0].style.display = "none",
        document.getElementById(L).getElementsByClassName("status_right")[0].style.display = "none",
        document.getElementById(L).getElementsByClassName("dropContainer")[0].classList.remove("errorLoadFiles", "incorrectFormat")) : document.getElementById(L).getElementsByClassName("status_right")[0].innerHTML = document.getElementById(L).getElementsByClassName("fileInput")[0].files.length + " ficheiro(s) carregado(s)"
    }
    function Eo(p, E) {
        if (new FileReader,
        document.getElementById(E).getElementsByClassName("fileInput")[0].files[p])
            return URL.createObjectURL(document.getElementById(E).getElementsByClassName("fileInput")[0].files[p])
    }
    $(".closePopup").click(function(p) {
        p.preventDefault(),
        $(this).closest(".gra-popup").hide(),
        $(this).closest(".gra-popup").find(".popupMask").removeClass("visible"),
        $("body").css("overflow-y", "inherit")
    });
    const ko = Object.freeze(Object.defineProperty({
        __proto__: null,
        calculaTamanhoTotal: Do,
        leFicheiro: Eo,
        mostraBeginUpload: os,
        openModalFileUploaded: xo,
        removeficheiro: Co,
        selectFiles: wo
    }, Symbol.toStringTag, {
        value: "Module"
    }));
    function So(p, E) {
        var O = p.find(".owl-carousel").owlCarousel({
            items: 1,
            loop: !1,
            nav: E || !1,
            margin: 0,
            dots: !1,
            navText: E ? ['<div class="icon icon-secondary"><i class="icon-chevron-left iconLeft"></i></div>', '<div class="icon icon-secondary"><i class="icon-chevron-right iconRight"></i></div>'] : []
        });
        $(document).keyup(function(L) {
            L.keyCode == 37 ? O.trigger("prev.owl.carousel", [700]) : L.keyCode == 39 && O.trigger("next.owl.carousel", [700])
        }),
        p.find(".nav-card").on("click", function() {
            var L = $(this).data("slide");
            p.find(".nav-card").removeClass("active"),
            $(this).addClass("active"),
            O.trigger("to.owl.carousel", [L, 300])
        }),
        O.on("changed.owl.carousel", function(L) {
            var D = L.item.index
              , n = p.find(".nav-card").length;
            D = D % n,
            p.find(".nav-card").removeClass("active"),
            p.find(".nav-card").eq(D).addClass("active")
        }),
        p.find(".nav-card").removeClass("active"),
        p.find(".nav-card").eq(0).addClass("active")
    }
    $(".gra-carousel-homepage").each(function() {
        var p = $(this).data("nav");
        So($(this), p)
    });
    $(".gra-carousel-container").length > 0 && $(".gra-carousel-container").each(function() {
        var p = $(this).find("#image-carousel")
          , E = $(this);
        p.owlCarousel({
            loop: !0,
            margin: 16,
            nav: !1,
            dots: !1,
            autoWidth: !0,
            navText: ['<div class="icon icon-secondary"><i class="icon-chevron-left iconLeft"></i></div>', '<div class="icon icon-secondary"><i class="icon-chevron-right iconRight"></i></div>']
        }),
        p.on("changed.owl.carousel", function(O) {
            var L = O.item.index
              , D = $(p.find(".owl-item").eq(L).find("img")).attr("src");
            E.find(".active-image img").attr("src", D)
        }),
        E.find("#prev-button").click(function() {
            p.trigger("prev.owl.carousel")
        }),
        E.find("#next-button").click(function() {
            p.trigger("next.owl.carousel")
        }),
        E.find("#image-carousel .item img").click(function(O) {
            var L = $(this).attr("src");
            E.find(".active-image img").attr("src", L)
        })
    });
    $(".openNotifBox").click(function(p) {
        p.preventDefault(),
        $(".gra-notifications-box").hasClass("show") ? ($(".gra-notifications-box").removeClass("show").addClass("hide"),
        $(".maskNotif").removeClass("visible")) : ($(".gra-notifications-box").removeClass("hide").addClass("show"),
        $(".maskNotif").addClass("visible"),
        $("body").css("overflow-y", "hidden"))
    });
    $(".gra-notifications-box .optionsClose .close").click(function(p) {
        $(".gra-notifications-box").removeClass("show").addClass("hide"),
        $(".maskNotif").removeClass("visible"),
        $("body").css("overflow-y", "inherit"),
        $(".moreOptionsBox").hide()
    });
    $(".gra-notifications-box .optionsClose .moreOptions").click(function(p) {
        $(".moreOptionsBox").toggle()
    });
    $(".gra-notifications-box .optionsClose .option.markRead").click(function(p) {
        var E = confirm("Tem a certeza que deseja colocar todas as notificações como lidas?");
        E && $(".gra-notifications-box").find(".gra-notification.new").removeClass("new")
    });
    $(".gra-notifications-box .optionsClose .option.deleteAll").click(function(p) {
        var E = confirm("Tem a certeza que deseja eliminar todas as notificações da listagem?");
        E && $(".gra-notifications-box").find(".gra-notification").remove()
    });
    $(".gra-notification").click(function(p) {
        $(this).removeClass("new"),
        $(".gra-notifications-box.readOne").show()
    });
    $(".gra-notifications-box.readOne .optionsClose .close").click(function(p) {
        $(".gra-notifications-box.readOne").hide()
    });
    $(".gra-notifications-box.readOne .goBack").click(function(p) {
        $(".gra-notifications-box.readOne").hide()
    });
    $('.gra-pagination[data-is-external-content="false"]').each(function() {
        var p = $(this)
          , E = p.data("element-id")
          , O = $("#" + E)
          , L = p.data("items-per-page") != 0 ? p.data("items-per-page") : 10
          , D = 1
          , n = p.data("total-items") != 0 ? p.data("total-items") : O.find(".content-item").length
          , o = Math.ceil(n / L);
        p.find(".showRows").html(L),
        p.find(".totalRows").html(n);
        function l(d) {
            var a = (d - 1) * L
              , m = a + L;
            O.find("tbody tr").hide(),
            O.find("tbody tr").slice(a, m).show(),
            p.find(".fromIndex").html(a + 1),
            p.find(".showRows").html(m),
            c(d)
        }
        function c(d) {
            d == 1 ? p.find(".prev").prop("disabled", !0).addClass("icon-secondary-deactivated disabled") : p.find(".prev").prop("disabled", !1).removeClass("icon-secondary-deactivated disabled"),
            d == o ? p.find(".next").prop("disabled", !0).addClass("icon-secondary-deactivated disabled") : p.find(".next").prop("disabled", !1).removeClass("icon-secondary-deactivated disabled");
            var a = ""
              , m = 3;
            if ($(window).width() < 768)
                a = '<button type="button" class="icon icon-secondary itemNumber">' + d + "</button>",
                p.find(".results").hide(),
                p.find(".resultsMobile").show();
            else if (p.find(".results").show(),
            p.find(".resultsMobile").hide(),
            o <= m)
                for (var _ = 1; _ <= o; _++)
                    a += '<button type="button" class="icon icon-secondary itemNumber">' + _ + "</button>";
            else {
                a += '<button type="button" class="icon icon-secondary itemNumber">1</button>',
                d > 3 && (a += '<button type="button" class="icon icon-secondary itemNumber ellipsis">...</button>');
                for (var M = Math.max(2, d - 1), N = Math.min(o - 1, d + 1), _ = M; _ <= N; _++)
                    a += '<button type="button" class="icon icon-secondary itemNumber">' + _ + "</button>";
                d < o - 2 && (a += '<button type="button" class="icon icon-secondary itemNumber ellipsis">...</button>'),
                o > 1 && (a += '<button type="button" class="icon icon-secondary itemNumber">' + o + "</button>")
            }
            p.find(".page-numbers").html(a),
            p.find(".icon.icon-secondary.itemNumber").removeClass("active"),
            p.find(".icon.icon-secondary.itemNumber").each(function() {
                $(this).text() == d && $(this).addClass("active")
            })
        }
        l(D),
        p.find(".prev").click(function() {
            D > 1 && (D--,
            l(D))
        }),
        p.find(".next").click(function() {
            D < o && (D++,
            l(D))
        }),
        p.on("click", ".icon.icon-secondary.itemNumber:not(.ellipsis):not(.next):not(.prev)", function() {
            D = parseInt($(this).text()),
            l(D)
        }),
        $(window).resize(function() {
            c(D)
        })
    });
    $(".openPopup").click(function(p) {
        p.preventDefault();
        var E = $(this).data("id-popup");
        $("#" + E).hasClass("show") ? ($("#" + E).fadeOut(),
        $("#" + E).find(".popupMask").removeClass("visible")) : ($("#" + E).fadeIn(),
        $("#" + E).find(".popupMask").addClass("visible"),
        $("body").css("overflow-y", "hidden"))
    });
    $(".closePopup").click(function(p) {
        p.preventDefault(),
        $(this).closest(".gra-popup").hide(),
        $(this).closest(".gra-popup").find(".popupMask").removeClass("visible"),
        $("body").css("overflow-y", "inherit")
    });
    $(".gra-progress-bar").each(function() {
        var p = $(this)
          , E = p.data("progress-default") != 0 && p.data("progress-default") <= 100 ? p.data("progress-default") : 0;
        O(E, p),
        p.find(".progressInput").on("input", function() {
            var L = $(this).val() != 0 && $(this).val() <= 100 ? $(this).val() : 0;
            O(L, p)
        });
        function O(L, D) {
            L == 100 ? (D.find(".progress-bar").css("width", L + "%"),
            D.find(".progressPercentage").text(L + "%"),
            D.find(".progress-bar").addClass("complete")) : (D.find(".progress-bar").css("width", L + "%"),
            D.find(".progressPercentage").text(L + "%"),
            D.find(".progress-bar").removeClass("complete"))
        }
    });
    const Ao = document.querySelectorAll(".indeterminate-checkbox");
    Ao.forEach(p => {
        p.indeterminate = !0,
        p.addEventListener("click", () => {
            p.checked && (p.indeterminate = !1)
        }
        )
    }
    );
    function ns(p, E) {
        $(`#${p} .tab-content`).removeClass("active-content"),
        $(`#${p} .gra-tab`).removeClass("active"),
        $(`#${p}-${E}`).addClass("active-content"),
        $(`#${p} .gra-tab[data-gra-tab="${E}"]`).addClass("active")
    }
    $(".gra-tab-container").each(function() {
        var p = $(this);
        p.find(".gra-tab").on("click", function(E) {
            E.preventDefault();
            var O = $(this).data("gra-tab");
            ns(p.attr("id"), O)
        }),
        ns(p.attr("id"), "tab1")
    });
    function ls(p, E, O) {
        const L = document.getElementById(O)
          , D = Array.from(L.rows).slice(1)
          , n = L.rows[0].cells[p];
        let o = n.classList.contains("desc");
        L.querySelectorAll("th.sortable").forEach(d => {
            o ? d.classList.remove("desc") : d.classList.remove("asc")
        }
        ),
        o ? (n.classList.remove("desc"),
        n.classList.add("asc")) : (n.classList.remove("asc"),
        n.classList.add("desc")),
        D.sort( (d, a) => {
            const m = d.cells[p].textContent.trim()
              , _ = a.cells[p].textContent.trim();
            return E ? (parseFloat(m) - parseFloat(_)) * (o ? 1 : -1) : m.localeCompare(_) * (o ? 1 : -1)
        }
        ),
        D.forEach(d => {
            L.tBodies[0].appendChild(d)
        }
        );
        const c = $('.gra-pagination[data-element-id="' + O + '"]');
        us(c)
    }
    const To = document.querySelectorAll(".gra-table th.sortable");
    To.forEach( (p, E) => {
        const O = p.classList.contains("numeric");
        p.addEventListener("click", () => {
            const D = p.closest(".gra-table").id;
            ls(p.cellIndex, O, D)
        }
        )
    }
    );
    const Lo = document.querySelectorAll(".gra-table th.sortable");
    Lo.forEach( (p, E) => {
        const O = p.classList.contains("numeric")
          , D = p.closest(".gra-table").id;
        ls(p.cellIndex, O, D)
    }
    );
    function us(p) {
        var E = p.data("element-id")
          , O = $("#" + E)
          , L = p.data("items-per-page") != 0 ? p.data("items-per-page") : 10
          , D = 1
          , n = p.data("total-items") != 0 ? p.data("total-items") : O.find("tbody tr").length
          , o = Math.ceil(n / L);
        p.find(".showRows").html(L),
        p.find(".totalRows").html(n);
        function l(d) {
            var a = (d - 1) * L
              , m = a + L > n ? n : a + L;
            O.find("tbody tr").hide(),
            O.find("tbody tr").slice(a, m).show(),
            p.find(".fromIndex").html(a + 1),
            p.find(".showRows").html(m),
            c(d)
        }
        function c(d) {
            d == 1 ? p.find(".prev").prop("disabled", !0).addClass("icon-secondary-deactivated disabled") : p.find(".prev").prop("disabled", !1).removeClass("icon-secondary-deactivated disabled"),
            d == o ? p.find(".next").prop("disabled", !0).addClass("icon-secondary-deactivated disabled") : p.find(".next").prop("disabled", !1).removeClass("icon-secondary-deactivated disabled");
            var a = ""
              , m = 3;
            if ($(window).width() < 768)
                a = '<button type="button" class="icon icon-secondary itemNumber">' + d + "</button>",
                p.find(".results").hide(),
                p.find(".resultsMobile").show();
            else if (p.find(".results").show(),
            p.find(".resultsMobile").hide(),
            o <= m)
                for (var _ = 1; _ <= o; _++)
                    a += '<button type="button" class="icon icon-secondary itemNumber">' + _ + "</button>";
            else {
                a += '<button type="button" class="icon icon-secondary itemNumber">1</button>',
                d > 3 && (a += '<button type="button" class="icon icon-secondary itemNumber ellipsis">...</button>');
                for (var M = Math.max(2, d - 1), N = Math.min(o - 1, d + 1), _ = M; _ <= N; _++)
                    a += '<button type="button" class="icon icon-secondary itemNumber">' + _ + "</button>";
                d < o - 2 && (a += '<button type="button" class="icon icon-secondary itemNumber ellipsis">...</button>'),
                o > 1 && (a += '<button type="button" class="icon icon-secondary itemNumber">' + o + "</button>")
            }
            p.find(".page-numbers").html(a),
            p.find(".icon.icon-secondary.itemNumber").removeClass("active"),
            p.find(".icon.icon-secondary.itemNumber").each(function() {
                $(this).text() == d && $(this).addClass("active")
            })
        }
        l(D),
        p.find(".prev").click(function() {
            D > 1 && (D--,
            l(D))
        }),
        p.find(".next").click(function() {
            D < o && (D++,
            l(D))
        }),
        p.on("click", ".icon.icon-secondary.itemNumber:not(.ellipsis):not(.next):not(.prev)", function() {
            D = parseInt($(this).text()),
            l(D)
        }),
        $(window).resize(function() {
            c(D)
        })
    }
    $(document).ready(function() {
        $('.gra-pagination[data-is-external-content="false"]').each(function() {
            var p = $(this);
            us(p)
        })
    });
    document.querySelectorAll(".gra-wizard-container").forEach( (p, E) => {
        let O = 0;
        function L(l) {
            const c = p.querySelectorAll(".wizard-step")
              , d = p.querySelectorAll(".step")
              , a = p.querySelectorAll(".line");
            d.forEach(m => m.classList.remove("error")),
            a.forEach(m => {
                m.classList.remove("active-green", "active-line", "error")
            }
            ),
            c.forEach( (m, _) => {
                m.classList.remove("active"),
                d[_].classList.remove("active", "completed")
            }
            ),
            c[l].classList.add("active"),
            d[l].classList.add("active"),
            a.forEach( (m, _) => {
                _ < l && (m.classList.add("active-green"),
                d[_].classList.add("completed")),
                _ === l && m.classList.add("active-line")
            }
            )
        }
        function D() {
            const l = p.querySelectorAll(".wizard-step.active input.required-field");
            let c = !0;
            return l.forEach(d => {
                if (!d.value.trim()) {
                    d.classList.add("error");
                    const a = d.closest(".wizard-step").dataset.step
                      , m = p.querySelectorAll(".step")[a];
                    Array.from(p.querySelectorAll(".step")).slice(parseInt(a) + 1).forEach(M => {
                        M.classList.add("disabled")
                    }
                    ),
                    (!d.nextElementSibling || !d.nextElementSibling.classList.contains("graRequiredField")) && d.insertAdjacentHTML("afterend", '<span class="graRequiredField">Campo obrigatório</span>'),
                    m.classList.add("error"),
                    m.nextElementSibling.parentElement.classList.contains("withLabelBottom") ? m.parentElement.nextElementSibling.classList.add("error") : m.nextElementSibling.classList.add("error"),
                    c = !1
                }
            }
            ),
            c
        }
        function n() {
            if (D()) {
                const l = p.querySelectorAll(".wizard-step");
                if (O < l.length) {
                    O++;
                    const c = p.querySelectorAll(".step")[O];
                    c.classList.contains("disabled") && c.classList.remove("disabled"),
                    L(O)
                }
            }
        }
        function o() {
            O > 0 && (O--,
            L(O))
        }
        p.querySelector(".wizard-form") && p.querySelector(".wizard-form").addEventListener("submit", function(l) {
            l.preventDefault(),
            alert("Form submitted!")
        }),
        p.querySelectorAll(".step").forEach(l => {
            l.addEventListener("click", function() {
                if (D(),
                l.classList.contains("disabled"))
                    return;
                O = parseInt(l.getAttribute("data-step")),
                L(O)
            })
        }
        ),
        p.querySelectorAll(".nextStep").forEach(l => {
            l.addEventListener("click", n)
        }
        ),
        p.querySelectorAll(".prevStep").forEach(l => {
            l.addEventListener("click", o)
        }
        ),
        L(O)
    }
    );
    const Mo = document.querySelectorAll("form");
    Mo.forEach(function(p) {
        p.classList.contains("no-validate-form") || p.addEventListener("submit", function(E) {
            E.preventDefault();
            let O = !0;
            new FormData(p).forEach( (o, l) => {}
            );
            const D = p.getElementsByClassName("gra-input-group");
            Array.from(D).forEach(o => {
                const l = o.getElementsByClassName("required-field-group");
                Array.from(l).forEach(c => {
                    var a, m, _, M, N;
                    if (c.value.trim() === "") {
                        O = !1;
                        var d = (m = (a = c.previousElementSibling) == null ? void 0 : a.childNodes[0]) == null ? void 0 : m.childNodes[0];
                        d && d.classList.add("error"),
                        c.classList.add("error");
                        const W = c.previousElementSibling;
                        W && W.tagName === "SELECT" && W.classList.add("error"),
                        ((_ = o.nextElementSibling) == null ? void 0 : _.querySelector(".graRequiredFieldGroup")) === void 0 && o.insertAdjacentHTML("afterend", '<span class="graRequiredFieldGroup">Campo obrigatório</span>')
                    } else {
                        var d = (N = (M = c.previousElementSibling) == null ? void 0 : M.childNodes[0]) == null ? void 0 : N.childNodes[0];
                        d && d.classList.remove("error");
                        const U = c.previousElementSibling;
                        U && U.tagName === "SELECT" && U.classList.remove("error"),
                        c.classList.remove("error");
                        const z = o.nextElementSibling;
                        z && z.classList.contains("graRequiredFieldGroup") && z.remove()
                    }
                }
                )
            }
            );
            const n = document.getElementsByClassName("required-field");
            Array.from(n).forEach(o => {
                var l, c, d, a, m;
                if (o.value.trim() === "")
                    O = !1,
                    o && o.tagName === "SELECT" ? ((c = (l = o.nextElementSibling) == null ? void 0 : l.childNodes[0]) == null || c.childNodes[0].classList.add("error"),
                    (d = o.nextElementSibling) != null && d.querySelector(".graRequiredField") || (m = (a = o.nextElementSibling) == null ? void 0 : a.childNodes[0]) == null || m.insertAdjacentHTML("afterend", '<span class="graRequiredField">Campo obrigatório</span>')) : (o.classList.add("error"),
                    (!o.nextElementSibling || !o.nextElementSibling.classList.contains("graRequiredField")) && o.insertAdjacentHTML("afterend", '<span class="graRequiredField">Campo obrigatório</span>'));
                else {
                    o.classList.remove("error");
                    const _ = o.nextElementSibling;
                    _ && _.classList.contains("graRequiredField") && _.remove()
                }
            }
            ),
            O ? (console.log("Form is valid, proceed to submit!"),
            p.submit()) : (p.nextElementSibling.classList.contains("gra-feedback-msg") || p.insertAdjacentHTML("afterend", '<div class="gra-feedback-msg error gra-margin-top-s"><span class="text">Preencha os campos obrigatórios do formulário!</span><span class="closeIcon"></span></div>'),
            document.querySelector(".closeIcon").addEventListener("click", function() {
                document.querySelector(".gra-feedback-msg").remove()
            }))
        })
    });
    $(function() {
        const p = document.querySelectorAll(".gra-logo-gov")
          , E = document.querySelectorAll(".gra-logo-gov-blue")
          , O = document.querySelectorAll(".gra-logo-prr")
          , L = document.querySelectorAll(".gra-logo-c19")
          , D = document.querySelectorAll(".gra-logo-rp")
          , n = document.querySelectorAll(".gra-logo-ue")
          , o = document.querySelectorAll(".gra-logo-incuba")
          , l = document.querySelectorAll(".gra-logo-ser")
          , c = document.querySelectorAll(".changeTheme");
        localStorage.getItem("theme") === "dark" && document.body.classList.add("dark-mode"),
        c && c.forEach(d => {
            d.addEventListener("click", () => {
                document.body.classList.toggle("dark-mode");
                const a = d.querySelector(".tooltiptext")
                  , m = d.querySelector(".toggleTheme");
                document.body.classList.contains("dark-mode") && !document.body.classList.contains("theme-marca-servicos") ? (m.classList.remove("icon-moon"),
                m.classList.add("icon-sun"),
                a.textContent = "Modo claro",
                localStorage.setItem("theme", "dark"),
                p.forEach(_ => {
                    _.src = "/img/logos/darkmode/logo_gra_black.svg"
                }
                ),
                E.forEach(_ => {
                    _.src = "/img/logos/darkmode/logo_gra_white_dark.png"
                }
                ),
                O.forEach(_ => {
                    _.src = "/img/logos/darkmode/logo_prr_black.svg"
                }
                ),
                L.forEach(_ => {
                    _.src = "/img/logos/darkmode/logo_c19_black.svg"
                }
                ),
                D.forEach(_ => {
                    _.src = "/img/logos/darkmode/logo_rp_black.svg"
                }
                ),
                n.forEach(_ => {
                    _.src = "/img/logos/darkmode/logo_ue_black.svg"
                }
                ),
                o.forEach(_ => {
                    _.src = "/img/logos/darkmode/logo_incuba_black.svg"
                }
                )) : document.body.classList.contains("dark-mode") && document.body.classList.contains("theme-marca-servicos") ? (m.classList.remove("icon-moon"),
                m.classList.add("icon-sun"),
                a.textContent = "Modo claro",
                localStorage.setItem("theme", "dark"),
                p.forEach(_ => {
                    _.src = "/img/logos/logo_gra_white.svg"
                }
                ),
                E.forEach(_ => {
                    _.src = "/img/logos/darkmode/logo_gra_white_dark.png"
                }
                ),
                O.forEach(_ => {
                    _.src = "/img/logos/darkmode_secundario/logo_prr_black_secundario.svg"
                }
                ),
                L.forEach(_ => {
                    _.src = "/img/logos/darkmode_secundario/logo_c19_black_secundario.svg"
                }
                ),
                D.forEach(_ => {
                    _.src = "/img/logos/logo_rp.svg"
                }
                ),
                n.forEach(_ => {
                    _.src = "/img/logos/darkmode_secundario/logo_ue_black_secundario.svg"
                }
                ),
                o.forEach(_ => {
                    _.src = "/img/logos/darkmode_secundario/logo_incuba_black_secundario.svg"
                }
                ),
                l.forEach(_ => {
                    _.src = "/img/logos/temas/marcaServicos/logo_SER.svg"
                }
                )) : (m.classList.remove("icon-sun"),
                m.classList.add("icon-moon"),
                a.textContent = "Modo escuro",
                localStorage.setItem("theme", "light"),
                p.forEach(_ => {
                    _.src = "/img/logos/logo_gra_white.svg"
                }
                ),
                E.forEach(_ => {
                    _.src = "/img/logos/logo_gra_blue.png"
                }
                ),
                O.forEach(_ => {
                    _.src = "/img/logos/logo_prr.svg"
                }
                ),
                L.forEach(_ => {
                    _.src = "/img/logos/logo_c19.svg"
                }
                ),
                D.forEach(_ => {
                    _.src = "/img/logos/logo_rp.svg"
                }
                ),
                n.forEach(_ => {
                    _.src = "/img/logos/logo_ue.svg"
                }
                ),
                o.forEach(_ => {
                    _.src = "/img/logos/logo_incuba.svg"
                }
                ),
                l.forEach(_ => {
                    _.src = "/img/logos/temas/marcaServicos/logo_SER_black.svg"
                }
                ))
            }
            )
        }
        ),
        $("code").on("click", function() {
            var d = $("<textarea>");
            $("body").append(d),
            d.val($(this).text()).select(),
            document.execCommand("copy"),
            d.remove(),
            $("#copyMessage").fadeIn()
        })
    });
    window.fileUpload = ko
}
);
export default Oo();
