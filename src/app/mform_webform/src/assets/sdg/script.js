if (function(e, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, (function(e, t) {
        "use strict";
        var i = [],
            s = e.document,
            o = Object.getPrototypeOf,
            a = i.slice,
            n = i.concat,
            r = i.push,
            l = i.indexOf,
            c = {},
            d = c.toString,
            u = c.hasOwnProperty,
            f = u.toString,
            p = f.call(Object),
            h = {},
            m = function(e) {
                return "function" == typeof e && "number" != typeof e.nodeType
            },
            g = function(e) {
                return null != e && e === e.window
            },
            v = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };

        function _(e, t, i) {
            var o, a, n = (i = i || s).createElement("script");
            if (n.text = e, t)
                for (o in v)(a = t[o] || t.getAttribute && t.getAttribute(o)) && n.setAttribute(o, a);
            i.head.appendChild(n).parentNode.removeChild(n)
        }

        function y(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[d.call(e)] || "object" : typeof e
        }
        var C = "3.4.1",
            $ = function(e, t) {
                return new $.fn.init(e, t)
            },
            b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

        function x(e) {
            var t = !!e && "length" in e && e.length,
                i = y(e);
            return !m(e) && !g(e) && ("array" === i || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
        }
        $.fn = $.prototype = {
            jquery: C,
            constructor: $,
            length: 0,
            toArray: function() {
                return a.call(this)
            },
            get: function(e) {
                return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = $.merge(this.constructor(), e);
                return t.prevObject = this, t
            },
            each: function(e) {
                return $.each(this, e)
            },
            map: function(e) {
                return this.pushStack($.map(this, (function(t, i) {
                    return e.call(t, i, t)
                })))
            },
            slice: function() {
                return this.pushStack(a.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    i = +e + (e < 0 ? t : 0);
                return this.pushStack(0 <= i && i < t ? [this[i]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: r,
            sort: i.sort,
            splice: i.splice
        }, $.extend = $.fn.extend = function() {
            var e, t, i, s, o, a, n = arguments[0] || {},
                r = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof n && (c = n, n = arguments[r] || {}, r++), "object" == typeof n || m(n) || (n = {}), r === l && (n = this, r--); r < l; r++)
                if (null != (e = arguments[r]))
                    for (t in e) s = e[t], "__proto__" !== t && n !== s && (c && s && ($.isPlainObject(s) || (o = Array.isArray(s))) ? (i = n[t], a = o && !Array.isArray(i) ? [] : o || $.isPlainObject(i) ? i : {}, o = !1, n[t] = $.extend(c, a, s)) : void 0 !== s && (n[t] = s));
            return n
        }, $.extend({
            expando: "jQuery" + (C + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isPlainObject: function(e) {
                var t, i;
                return !(!e || "[object Object]" !== d.call(e) || (t = o(e)) && ("function" != typeof(i = u.call(t, "constructor") && t.constructor) || f.call(i) !== p))
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            globalEval: function(e, t) {
                _(e, {
                    nonce: t && t.nonce
                })
            },
            each: function(e, t) {
                var i, s = 0;
                if (x(e))
                    for (i = e.length; s < i && !1 !== t.call(e[s], s, e[s]); s++);
                else
                    for (s in e)
                        if (!1 === t.call(e[s], s, e[s])) break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(b, "")
            },
            makeArray: function(e, t) {
                var i = t || [];
                return null != e && (x(Object(e)) ? $.merge(i, "string" == typeof e ? [e] : e) : r.call(i, e)), i
            },
            inArray: function(e, t, i) {
                return null == t ? -1 : l.call(t, e, i)
            },
            merge: function(e, t) {
                for (var i = +t.length, s = 0, o = e.length; s < i; s++) e[o++] = t[s];
                return e.length = o, e
            },
            grep: function(e, t, i) {
                for (var s = [], o = 0, a = e.length, n = !i; o < a; o++) !t(e[o], o) !== n && s.push(e[o]);
                return s
            },
            map: function(e, t, i) {
                var s, o, a = 0,
                    r = [];
                if (x(e))
                    for (s = e.length; a < s; a++) null != (o = t(e[a], a, i)) && r.push(o);
                else
                    for (a in e) null != (o = t(e[a], a, i)) && r.push(o);
                return n.apply([], r)
            },
            guid: 1,
            support: h
        }), "function" == typeof Symbol && ($.fn[Symbol.iterator] = i[Symbol.iterator]), $.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
            c["[object " + t + "]"] = t.toLowerCase()
        }));
        var w = function(e) {
            var t, i, s, o, a, n, r, l, c, d, u, f, p, h, m, g, v, _, y, C = "sizzle" + 1 * new Date,
                $ = e.document,
                b = 0,
                x = 0,
                w = le(),
                O = le(),
                S = le(),
                k = le(),
                T = function(e, t) {
                    return e === t && (u = !0), 0
                },
                A = {}.hasOwnProperty,
                I = [],
                E = I.pop,
                P = I.push,
                D = I.push,
                G = I.slice,
                j = function(e, t) {
                    for (var i = 0, s = e.length; i < s; i++)
                        if (e[i] === t) return i;
                    return -1
                },
                q = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                H = "[\\x20\\t\\r\\n\\f]",
                N = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                R = "\\[" + H + "*(" + N + ")(?:" + H + "*([*^$|!~]?=)" + H + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + H + "*\\]",
                F = ":(" + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|.*)\\)|)",
                L = new RegExp(H + "+", "g"),
                M = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
                z = new RegExp("^" + H + "*," + H + "*"),
                W = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
                U = new RegExp(H + "|>"),
                B = new RegExp(F),
                X = new RegExp("^" + N + "$"),
                V = {
                    ID: new RegExp("^#(" + N + ")"),
                    CLASS: new RegExp("^\\.(" + N + ")"),
                    TAG: new RegExp("^(" + N + "|[*])"),
                    ATTR: new RegExp("^" + R),
                    PSEUDO: new RegExp("^" + F),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + q + ")$", "i"),
                    needsContext: new RegExp("^" + H + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)", "i")
                },
                Q = /HTML$/i,
                J = /^(?:input|select|textarea|button)$/i,
                Y = /^h\d$/i,
                Z = /^[^{]+\{\s*\[native \w/,
                K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ee = /[+~]/,
                te = new RegExp("\\\\([\\da-f]{1,6}" + H + "?|(" + H + ")|.)", "ig"),
                ie = function(e, t, i) {
                    var s = "0x" + t - 65536;
                    return s != s || i ? t : s < 0 ? String.fromCharCode(s + 65536) : String.fromCharCode(s >> 10 | 55296, 1023 & s | 56320)
                },
                se = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                oe = function(e, t) {
                    return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                },
                ae = function() {
                    f()
                },
                ne = Ce((function(e) {
                    return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                }), {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                D.apply(I = G.call($.childNodes), $.childNodes)
            } catch (t) {
                D = {
                    apply: I.length ? function(e, t) {
                        P.apply(e, G.call(t))
                    } : function(e, t) {
                        for (var i = e.length, s = 0; e[i++] = t[s++];);
                        e.length = i - 1
                    }
                }
            }

            function re(e, t, s, o) {
                var a, r, c, d, u, h, v, _ = t && t.ownerDocument,
                    b = t ? t.nodeType : 9;
                if (s = s || [], "string" != typeof e || !e || 1 !== b && 9 !== b && 11 !== b) return s;
                if (!o && ((t ? t.ownerDocument || t : $) !== p && f(t), t = t || p, m)) {
                    if (11 !== b && (u = K.exec(e)))
                        if (a = u[1]) {
                            if (9 === b) {
                                if (!(c = t.getElementById(a))) return s;
                                if (c.id === a) return s.push(c), s
                            } else if (_ && (c = _.getElementById(a)) && y(t, c) && c.id === a) return s.push(c), s
                        } else {
                            if (u[2]) return D.apply(s, t.getElementsByTagName(e)), s;
                            if ((a = u[3]) && i.getElementsByClassName && t.getElementsByClassName) return D.apply(s, t.getElementsByClassName(a)), s
                        } if (i.qsa && !k[e + " "] && (!g || !g.test(e)) && (1 !== b || "object" !== t.nodeName.toLowerCase())) {
                        if (v = e, _ = t, 1 === b && U.test(e)) {
                            for ((d = t.getAttribute("id")) ? d = d.replace(se, oe) : t.setAttribute("id", d = C), r = (h = n(e)).length; r--;) h[r] = "#" + d + " " + ye(h[r]);
                            v = h.join(","), _ = ee.test(e) && ve(t.parentNode) || t
                        }
                        try {
                            return D.apply(s, _.querySelectorAll(v)), s
                        } catch (t) {
                            k(e, !0)
                        } finally {
                            d === C && t.removeAttribute("id")
                        }
                    }
                }
                return l(e.replace(M, "$1"), t, s, o)
            }

            function le() {
                var e = [];
                return function t(i, o) {
                    return e.push(i + " ") > s.cacheLength && delete t[e.shift()], t[i + " "] = o
                }
            }

            function ce(e) {
                return e[C] = !0, e
            }

            function de(e) {
                var t = p.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function ue(e, t) {
                for (var i = e.split("|"), o = i.length; o--;) s.attrHandle[i[o]] = t
            }

            function fe(e, t) {
                var i = t && e,
                    s = i && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (s) return s;
                if (i)
                    for (; i = i.nextSibling;)
                        if (i === t) return -1;
                return e ? 1 : -1
            }

            function pe(e) {
                return function(t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e
                }
            }

            function he(e) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && t.type === e
                }
            }

            function me(e) {
                return function(t) {
                    return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ne(t) === e : t.disabled === e : "label" in t && t.disabled === e
                }
            }

            function ge(e) {
                return ce((function(t) {
                    return t = +t, ce((function(i, s) {
                        for (var o, a = e([], i.length, t), n = a.length; n--;) i[o = a[n]] && (i[o] = !(s[o] = i[o]))
                    }))
                }))
            }

            function ve(e) {
                return e && void 0 !== e.getElementsByTagName && e
            }
            for (t in i = re.support = {}, a = re.isXML = function(e) {
                    var t = (e.ownerDocument || e).documentElement;
                    return !Q.test(e.namespaceURI || t && t.nodeName || "HTML")
                }, f = re.setDocument = function(e) {
                    var t, o, n = e ? e.ownerDocument || e : $;
                    return n !== p && 9 === n.nodeType && n.documentElement && (h = (p = n).documentElement, m = !a(p), $ !== p && (o = p.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", ae, !1) : o.attachEvent && o.attachEvent("onunload", ae)), i.attributes = de((function(e) {
                        return e.className = "i", !e.getAttribute("className")
                    })), i.getElementsByTagName = de((function(e) {
                        return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
                    })), i.getElementsByClassName = Z.test(p.getElementsByClassName), i.getById = de((function(e) {
                        return h.appendChild(e).id = C, !p.getElementsByName || !p.getElementsByName(C).length
                    })), i.getById ? (s.filter.ID = function(e) {
                        var t = e.replace(te, ie);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }, s.find.ID = function(e, t) {
                        if (void 0 !== t.getElementById && m) {
                            var i = t.getElementById(e);
                            return i ? [i] : []
                        }
                    }) : (s.filter.ID = function(e) {
                        var t = e.replace(te, ie);
                        return function(e) {
                            var i = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                            return i && i.value === t
                        }
                    }, s.find.ID = function(e, t) {
                        if (void 0 !== t.getElementById && m) {
                            var i, s, o, a = t.getElementById(e);
                            if (a) {
                                if ((i = a.getAttributeNode("id")) && i.value === e) return [a];
                                for (o = t.getElementsByName(e), s = 0; a = o[s++];)
                                    if ((i = a.getAttributeNode("id")) && i.value === e) return [a]
                            }
                            return []
                        }
                    }), s.find.TAG = i.getElementsByTagName ? function(e, t) {
                        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : i.qsa ? t.querySelectorAll(e) : void 0
                    } : function(e, t) {
                        var i, s = [],
                            o = 0,
                            a = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; i = a[o++];) 1 === i.nodeType && s.push(i);
                            return s
                        }
                        return a
                    }, s.find.CLASS = i.getElementsByClassName && function(e, t) {
                        if (void 0 !== t.getElementsByClassName && m) return t.getElementsByClassName(e)
                    }, v = [], g = [], (i.qsa = Z.test(p.querySelectorAll)) && (de((function(e) {
                        h.appendChild(e).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + H + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || g.push("\\[" + H + "*(?:value|" + q + ")"), e.querySelectorAll("[id~=" + C + "-]").length || g.push("~="), e.querySelectorAll(":checked").length || g.push(":checked"), e.querySelectorAll("a#" + C + "+*").length || g.push(".#.+[+~]")
                    })), de((function(e) {
                        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var t = p.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && g.push("name" + H + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:")
                    }))), (i.matchesSelector = Z.test(_ = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && de((function(e) {
                        i.disconnectedMatch = _.call(e, "*"), _.call(e, "[s!='']:x"), v.push("!=", F)
                    })), g = g.length && new RegExp(g.join("|")), v = v.length && new RegExp(v.join("|")), t = Z.test(h.compareDocumentPosition), y = t || Z.test(h.contains) ? function(e, t) {
                        var i = 9 === e.nodeType ? e.documentElement : e,
                            s = t && t.parentNode;
                        return e === s || !(!s || 1 !== s.nodeType || !(i.contains ? i.contains(s) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(s)))
                    } : function(e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, T = t ? function(e, t) {
                        if (e === t) return u = !0, 0;
                        var s = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return s || (1 & (s = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !i.sortDetached && t.compareDocumentPosition(e) === s ? e === p || e.ownerDocument === $ && y($, e) ? -1 : t === p || t.ownerDocument === $ && y($, t) ? 1 : d ? j(d, e) - j(d, t) : 0 : 4 & s ? -1 : 1)
                    } : function(e, t) {
                        if (e === t) return u = !0, 0;
                        var i, s = 0,
                            o = e.parentNode,
                            a = t.parentNode,
                            n = [e],
                            r = [t];
                        if (!o || !a) return e === p ? -1 : t === p ? 1 : o ? -1 : a ? 1 : d ? j(d, e) - j(d, t) : 0;
                        if (o === a) return fe(e, t);
                        for (i = e; i = i.parentNode;) n.unshift(i);
                        for (i = t; i = i.parentNode;) r.unshift(i);
                        for (; n[s] === r[s];) s++;
                        return s ? fe(n[s], r[s]) : n[s] === $ ? -1 : r[s] === $ ? 1 : 0
                    }), p
                }, re.matches = function(e, t) {
                    return re(e, null, null, t)
                }, re.matchesSelector = function(e, t) {
                    if ((e.ownerDocument || e) !== p && f(e), i.matchesSelector && m && !k[t + " "] && (!v || !v.test(t)) && (!g || !g.test(t))) try {
                        var s = _.call(e, t);
                        if (s || i.disconnectedMatch || e.document && 11 !== e.document.nodeType) return s
                    } catch (e) {
                        k(t, !0)
                    }
                    return 0 < re(t, p, null, [e]).length
                }, re.contains = function(e, t) {
                    return (e.ownerDocument || e) !== p && f(e), y(e, t)
                }, re.attr = function(e, t) {
                    (e.ownerDocument || e) !== p && f(e);
                    var o = s.attrHandle[t.toLowerCase()],
                        a = o && A.call(s.attrHandle, t.toLowerCase()) ? o(e, t, !m) : void 0;
                    return void 0 !== a ? a : i.attributes || !m ? e.getAttribute(t) : (a = e.getAttributeNode(t)) && a.specified ? a.value : null
                }, re.escape = function(e) {
                    return (e + "").replace(se, oe)
                }, re.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, re.uniqueSort = function(e) {
                    var t, s = [],
                        o = 0,
                        a = 0;
                    if (u = !i.detectDuplicates, d = !i.sortStable && e.slice(0), e.sort(T), u) {
                        for (; t = e[a++];) t === e[a] && (o = s.push(a));
                        for (; o--;) e.splice(s[o], 1)
                    }
                    return d = null, e
                }, o = re.getText = function(e) {
                    var t, i = "",
                        s = 0,
                        a = e.nodeType;
                    if (a) {
                        if (1 === a || 9 === a || 11 === a) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) i += o(e)
                        } else if (3 === a || 4 === a) return e.nodeValue
                    } else
                        for (; t = e[s++];) i += o(t);
                    return i
                }, (s = re.selectors = {
                    cacheLength: 50,
                    createPseudo: ce,
                    match: V,
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
                        ATTR: function(e) {
                            return e[1] = e[1].replace(te, ie), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ie), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || re.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && re.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, i = !e[6] && e[2];
                            return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && B.test(i) && (t = n(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(te, ie).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = w[e + " "];
                            return t || (t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) && w(e, (function(e) {
                                return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                            }))
                        },
                        ATTR: function(e, t, i) {
                            return function(s) {
                                var o = re.attr(s, e);
                                return null == o ? "!=" === t : !t || (o += "", "=" === t ? o === i : "!=" === t ? o !== i : "^=" === t ? i && 0 === o.indexOf(i) : "*=" === t ? i && -1 < o.indexOf(i) : "$=" === t ? i && o.slice(-i.length) === i : "~=" === t ? -1 < (" " + o.replace(L, " ") + " ").indexOf(i) : "|=" === t && (o === i || o.slice(0, i.length + 1) === i + "-"))
                            }
                        },
                        CHILD: function(e, t, i, s, o) {
                            var a = "nth" !== e.slice(0, 3),
                                n = "last" !== e.slice(-4),
                                r = "of-type" === t;
                            return 1 === s && 0 === o ? function(e) {
                                return !!e.parentNode
                            } : function(t, i, l) {
                                var c, d, u, f, p, h, m = a !== n ? "nextSibling" : "previousSibling",
                                    g = t.parentNode,
                                    v = r && t.nodeName.toLowerCase(),
                                    _ = !l && !r,
                                    y = !1;
                                if (g) {
                                    if (a) {
                                        for (; m;) {
                                            for (f = t; f = f[m];)
                                                if (r ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                            h = m = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [n ? g.firstChild : g.lastChild], n && _) {
                                        for (y = (p = (c = (d = (u = (f = g)[C] || (f[C] = {}))[f.uniqueID] || (u[f.uniqueID] = {}))[e] || [])[0] === b && c[1]) && c[2], f = p && g.childNodes[p]; f = ++p && f && f[m] || (y = p = 0) || h.pop();)
                                            if (1 === f.nodeType && ++y && f === t) {
                                                d[e] = [b, p, y];
                                                break
                                            }
                                    } else if (_ && (y = p = (c = (d = (u = (f = t)[C] || (f[C] = {}))[f.uniqueID] || (u[f.uniqueID] = {}))[e] || [])[0] === b && c[1]), !1 === y)
                                        for (;
                                            (f = ++p && f && f[m] || (y = p = 0) || h.pop()) && ((r ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++y || (_ && ((d = (u = f[C] || (f[C] = {}))[f.uniqueID] || (u[f.uniqueID] = {}))[e] = [b, y]), f !== t)););
                                    return (y -= o) === s || y % s == 0 && 0 <= y / s
                                }
                            }
                        },
                        PSEUDO: function(e, t) {
                            var i, o = s.pseudos[e] || s.setFilters[e.toLowerCase()] || re.error("unsupported pseudo: " + e);
                            return o[C] ? o(t) : 1 < o.length ? (i = [e, e, "", t], s.setFilters.hasOwnProperty(e.toLowerCase()) ? ce((function(e, i) {
                                for (var s, a = o(e, t), n = a.length; n--;) e[s = j(e, a[n])] = !(i[s] = a[n])
                            })) : function(e) {
                                return o(e, 0, i)
                            }) : o
                        }
                    },
                    pseudos: {
                        not: ce((function(e) {
                            var t = [],
                                i = [],
                                s = r(e.replace(M, "$1"));
                            return s[C] ? ce((function(e, t, i, o) {
                                for (var a, n = s(e, null, o, []), r = e.length; r--;)(a = n[r]) && (e[r] = !(t[r] = a))
                            })) : function(e, o, a) {
                                return t[0] = e, s(t, null, a, i), t[0] = null, !i.pop()
                            }
                        })),
                        has: ce((function(e) {
                            return function(t) {
                                return 0 < re(e, t).length
                            }
                        })),
                        contains: ce((function(e) {
                            return e = e.replace(te, ie),
                                function(t) {
                                    return -1 < (t.textContent || o(t)).indexOf(e)
                                }
                        })),
                        lang: ce((function(e) {
                            return X.test(e || "") || re.error("unsupported lang: " + e), e = e.replace(te, ie).toLowerCase(),
                                function(t) {
                                    var i;
                                    do {
                                        if (i = m ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (i = i.toLowerCase()) === e || 0 === i.indexOf(e + "-")
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        })),
                        target: function(t) {
                            var i = e.location && e.location.hash;
                            return i && i.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === h
                        },
                        focus: function(e) {
                            return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: me(!1),
                        disabled: me(!0),
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return !0 === e.selected
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !s.pseudos.empty(e)
                        },
                        header: function(e) {
                            return Y.test(e.nodeName)
                        },
                        input: function(e) {
                            return J.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: ge((function() {
                            return [0]
                        })),
                        last: ge((function(e, t) {
                            return [t - 1]
                        })),
                        eq: ge((function(e, t, i) {
                            return [i < 0 ? i + t : i]
                        })),
                        even: ge((function(e, t) {
                            for (var i = 0; i < t; i += 2) e.push(i);
                            return e
                        })),
                        odd: ge((function(e, t) {
                            for (var i = 1; i < t; i += 2) e.push(i);
                            return e
                        })),
                        lt: ge((function(e, t, i) {
                            for (var s = i < 0 ? i + t : t < i ? t : i; 0 <= --s;) e.push(s);
                            return e
                        })),
                        gt: ge((function(e, t, i) {
                            for (var s = i < 0 ? i + t : i; ++s < t;) e.push(s);
                            return e
                        }))
                    }
                }).pseudos.nth = s.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) s.pseudos[t] = pe(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) s.pseudos[t] = he(t);

            function _e() {}

            function ye(e) {
                for (var t = 0, i = e.length, s = ""; t < i; t++) s += e[t].value;
                return s
            }

            function Ce(e, t, i) {
                var s = t.dir,
                    o = t.next,
                    a = o || s,
                    n = i && "parentNode" === a,
                    r = x++;
                return t.first ? function(t, i, o) {
                    for (; t = t[s];)
                        if (1 === t.nodeType || n) return e(t, i, o);
                    return !1
                } : function(t, i, l) {
                    var c, d, u, f = [b, r];
                    if (l) {
                        for (; t = t[s];)
                            if ((1 === t.nodeType || n) && e(t, i, l)) return !0
                    } else
                        for (; t = t[s];)
                            if (1 === t.nodeType || n)
                                if (d = (u = t[C] || (t[C] = {}))[t.uniqueID] || (u[t.uniqueID] = {}), o && o === t.nodeName.toLowerCase()) t = t[s] || t;
                                else {
                                    if ((c = d[a]) && c[0] === b && c[1] === r) return f[2] = c[2];
                                    if ((d[a] = f)[2] = e(t, i, l)) return !0
                                } return !1
                }
            }

            function $e(e) {
                return 1 < e.length ? function(t, i, s) {
                    for (var o = e.length; o--;)
                        if (!e[o](t, i, s)) return !1;
                    return !0
                } : e[0]
            }

            function be(e, t, i, s, o) {
                for (var a, n = [], r = 0, l = e.length, c = null != t; r < l; r++)(a = e[r]) && (i && !i(a, s, o) || (n.push(a), c && t.push(r)));
                return n
            }

            function xe(e, t, i, s, o, a) {
                return s && !s[C] && (s = xe(s)), o && !o[C] && (o = xe(o, a)), ce((function(a, n, r, l) {
                    var c, d, u, f = [],
                        p = [],
                        h = n.length,
                        m = a || function(e, t, i) {
                            for (var s = 0, o = t.length; s < o; s++) re(e, t[s], i);
                            return i
                        }(t || "*", r.nodeType ? [r] : r, []),
                        g = !e || !a && t ? m : be(m, f, e, r, l),
                        v = i ? o || (a ? e : h || s) ? [] : n : g;
                    if (i && i(g, v, r, l), s)
                        for (c = be(v, p), s(c, [], r, l), d = c.length; d--;)(u = c[d]) && (v[p[d]] = !(g[p[d]] = u));
                    if (a) {
                        if (o || e) {
                            if (o) {
                                for (c = [], d = v.length; d--;)(u = v[d]) && c.push(g[d] = u);
                                o(null, v = [], c, l)
                            }
                            for (d = v.length; d--;)(u = v[d]) && -1 < (c = o ? j(a, u) : f[d]) && (a[c] = !(n[c] = u))
                        }
                    } else v = be(v === n ? v.splice(h, v.length) : v), o ? o(null, n, v, l) : D.apply(n, v)
                }))
            }

            function we(e) {
                for (var t, i, o, a = e.length, n = s.relative[e[0].type], r = n || s.relative[" "], l = n ? 1 : 0, d = Ce((function(e) {
                        return e === t
                    }), r, !0), u = Ce((function(e) {
                        return -1 < j(t, e)
                    }), r, !0), f = [function(e, i, s) {
                        var o = !n && (s || i !== c) || ((t = i).nodeType ? d(e, i, s) : u(e, i, s));
                        return t = null, o
                    }]; l < a; l++)
                    if (i = s.relative[e[l].type]) f = [Ce($e(f), i)];
                    else {
                        if ((i = s.filter[e[l].type].apply(null, e[l].matches))[C]) {
                            for (o = ++l; o < a && !s.relative[e[o].type]; o++);
                            return xe(1 < l && $e(f), 1 < l && ye(e.slice(0, l - 1).concat({
                                value: " " === e[l - 2].type ? "*" : ""
                            })).replace(M, "$1"), i, l < o && we(e.slice(l, o)), o < a && we(e = e.slice(o)), o < a && ye(e))
                        }
                        f.push(i)
                    } return $e(f)
            }
            return _e.prototype = s.filters = s.pseudos, s.setFilters = new _e, n = re.tokenize = function(e, t) {
                var i, o, a, n, r, l, c, d = O[e + " "];
                if (d) return t ? 0 : d.slice(0);
                for (r = e, l = [], c = s.preFilter; r;) {
                    for (n in i && !(o = z.exec(r)) || (o && (r = r.slice(o[0].length) || r), l.push(a = [])), i = !1, (o = W.exec(r)) && (i = o.shift(), a.push({
                            value: i,
                            type: o[0].replace(M, " ")
                        }), r = r.slice(i.length)), s.filter) !(o = V[n].exec(r)) || c[n] && !(o = c[n](o)) || (i = o.shift(), a.push({
                        value: i,
                        type: n,
                        matches: o
                    }), r = r.slice(i.length));
                    if (!i) break
                }
                return t ? r.length : r ? re.error(e) : O(e, l).slice(0)
            }, r = re.compile = function(e, t) {
                var i, o, a, r, l, d, u = [],
                    h = [],
                    g = S[e + " "];
                if (!g) {
                    for (t || (t = n(e)), i = t.length; i--;)(g = we(t[i]))[C] ? u.push(g) : h.push(g);
                    (g = S(e, (o = h, r = 0 < (a = u).length, l = 0 < o.length, d = function(e, t, i, n, d) {
                        var u, h, g, v = 0,
                            _ = "0",
                            y = e && [],
                            C = [],
                            $ = c,
                            x = e || l && s.find.TAG("*", d),
                            w = b += null == $ ? 1 : Math.random() || .1,
                            O = x.length;
                        for (d && (c = t === p || t || d); _ !== O && null != (u = x[_]); _++) {
                            if (l && u) {
                                for (h = 0, t || u.ownerDocument === p || (f(u), i = !m); g = o[h++];)
                                    if (g(u, t || p, i)) {
                                        n.push(u);
                                        break
                                    } d && (b = w)
                            }
                            r && ((u = !g && u) && v--, e && y.push(u))
                        }
                        if (v += _, r && _ !== v) {
                            for (h = 0; g = a[h++];) g(y, C, t, i);
                            if (e) {
                                if (0 < v)
                                    for (; _--;) y[_] || C[_] || (C[_] = E.call(n));
                                C = be(C)
                            }
                            D.apply(n, C), d && !e && 0 < C.length && 1 < v + a.length && re.uniqueSort(n)
                        }
                        return d && (b = w, c = $), y
                    }, r ? ce(d) : d))).selector = e
                }
                return g
            }, l = re.select = function(e, t, i, o) {
                var a, l, c, d, u, f = "function" == typeof e && e,
                    p = !o && n(e = f.selector || e);
                if (i = i || [], 1 === p.length) {
                    if (2 < (l = p[0] = p[0].slice(0)).length && "ID" === (c = l[0]).type && 9 === t.nodeType && m && s.relative[l[1].type]) {
                        if (!(t = (s.find.ID(c.matches[0].replace(te, ie), t) || [])[0])) return i;
                        f && (t = t.parentNode), e = e.slice(l.shift().value.length)
                    }
                    for (a = V.needsContext.test(e) ? 0 : l.length; a-- && !s.relative[d = (c = l[a]).type];)
                        if ((u = s.find[d]) && (o = u(c.matches[0].replace(te, ie), ee.test(l[0].type) && ve(t.parentNode) || t))) {
                            if (l.splice(a, 1), !(e = o.length && ye(l))) return D.apply(i, o), i;
                            break
                        }
                }
                return (f || r(e, p))(o, t, !m, i, !t || ee.test(e) && ve(t.parentNode) || t), i
            }, i.sortStable = C.split("").sort(T).join("") === C, i.detectDuplicates = !!u, f(), i.sortDetached = de((function(e) {
                return 1 & e.compareDocumentPosition(p.createElement("fieldset"))
            })), de((function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            })) || ue("type|href|height|width", (function(e, t, i) {
                if (!i) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            })), i.attributes && de((function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            })) || ue("value", (function(e, t, i) {
                if (!i && "input" === e.nodeName.toLowerCase()) return e.defaultValue
            })), de((function(e) {
                return null == e.getAttribute("disabled")
            })) || ue(q, (function(e, t, i) {
                var s;
                if (!i) return !0 === e[t] ? t.toLowerCase() : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
            })), re
        }(e);
        $.find = w, $.expr = w.selectors, $.expr[":"] = $.expr.pseudos, $.uniqueSort = $.unique = w.uniqueSort, $.text = w.getText, $.isXMLDoc = w.isXML, $.contains = w.contains, $.escapeSelector = w.escape;
        var O = function(e, t, i) {
                for (var s = [], o = void 0 !== i;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (o && $(e).is(i)) break;
                        s.push(e)
                    } return s
            },
            S = function(e, t) {
                for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
                return i
            },
            k = $.expr.match.needsContext;

        function T(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }
        var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

        function I(e, t, i) {
            return m(t) ? $.grep(e, (function(e, s) {
                return !!t.call(e, s, e) !== i
            })) : t.nodeType ? $.grep(e, (function(e) {
                return e === t !== i
            })) : "string" != typeof t ? $.grep(e, (function(e) {
                return -1 < l.call(t, e) !== i
            })) : $.filter(t, e, i)
        }
        $.filter = function(e, t, i) {
            var s = t[0];
            return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === s.nodeType ? $.find.matchesSelector(s, e) ? [s] : [] : $.find.matches(e, $.grep(t, (function(e) {
                return 1 === e.nodeType
            })))
        }, $.fn.extend({
            find: function(e) {
                var t, i, s = this.length,
                    o = this;
                if ("string" != typeof e) return this.pushStack($(e).filter((function() {
                    for (t = 0; t < s; t++)
                        if ($.contains(o[t], this)) return !0
                })));
                for (i = this.pushStack([]), t = 0; t < s; t++) $.find(e, o[t], i);
                return 1 < s ? $.uniqueSort(i) : i
            },
            filter: function(e) {
                return this.pushStack(I(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(I(this, e || [], !0))
            },
            is: function(e) {
                return !!I(this, "string" == typeof e && k.test(e) ? $(e) : e || [], !1).length
            }
        });
        var E, P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        ($.fn.init = function(e, t, i) {
            var o, a;
            if (!e) return this;
            if (i = i || E, "string" == typeof e) {
                if (!(o = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : P.exec(e)) || !o[1] && t) return !t || t.jquery ? (t || i).find(e) : this.constructor(t).find(e);
                if (o[1]) {
                    if ($.merge(this, $.parseHTML(o[1], (t = t instanceof $ ? t[0] : t) && t.nodeType ? t.ownerDocument || t : s, !0)), A.test(o[1]) && $.isPlainObject(t))
                        for (o in t) m(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
                    return this
                }
                return (a = s.getElementById(o[2])) && (this[0] = a, this.length = 1), this
            }
            return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== i.ready ? i.ready(e) : e($) : $.makeArray(e, this)
        }).prototype = $.fn, E = $(s);
        var D = /^(?:parents|prev(?:Until|All))/,
            G = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };

        function j(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }
        $.fn.extend({
            has: function(e) {
                var t = $(e, this),
                    i = t.length;
                return this.filter((function() {
                    for (var e = 0; e < i; e++)
                        if ($.contains(this, t[e])) return !0
                }))
            },
            closest: function(e, t) {
                var i, s = 0,
                    o = this.length,
                    a = [],
                    n = "string" != typeof e && $(e);
                if (!k.test(e))
                    for (; s < o; s++)
                        for (i = this[s]; i && i !== t; i = i.parentNode)
                            if (i.nodeType < 11 && (n ? -1 < n.index(i) : 1 === i.nodeType && $.find.matchesSelector(i, e))) {
                                a.push(i);
                                break
                            } return this.pushStack(1 < a.length ? $.uniqueSort(a) : a)
            },
            index: function(e) {
                return e ? "string" == typeof e ? l.call($(e), this[0]) : l.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack($.uniqueSort($.merge(this.get(), $(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), $.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return O(e, "parentNode")
            },
            parentsUntil: function(e, t, i) {
                return O(e, "parentNode", i)
            },
            next: function(e) {
                return j(e, "nextSibling")
            },
            prev: function(e) {
                return j(e, "previousSibling")
            },
            nextAll: function(e) {
                return O(e, "nextSibling")
            },
            prevAll: function(e) {
                return O(e, "previousSibling")
            },
            nextUntil: function(e, t, i) {
                return O(e, "nextSibling", i)
            },
            prevUntil: function(e, t, i) {
                return O(e, "previousSibling", i)
            },
            siblings: function(e) {
                return S((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return S(e.firstChild)
            },
            contents: function(e) {
                return void 0 !== e.contentDocument ? e.contentDocument : (T(e, "template") && (e = e.content || e), $.merge([], e.childNodes))
            }
        }, (function(e, t) {
            $.fn[e] = function(i, s) {
                var o = $.map(this, t, i);
                return "Until" !== e.slice(-5) && (s = i), s && "string" == typeof s && (o = $.filter(s, o)), 1 < this.length && (G[e] || $.uniqueSort(o), D.test(e) && o.reverse()), this.pushStack(o)
            }
        }));
        var q = /[^\x20\t\r\n\f]+/g;

        function H(e) {
            return e
        }

        function N(e) {
            throw e
        }

        function R(e, t, i, s) {
            var o;
            try {
                e && m(o = e.promise) ? o.call(e).done(t).fail(i) : e && m(o = e.then) ? o.call(e, t, i) : t.apply(void 0, [e].slice(s))
            } catch (e) {
                i.apply(void 0, [e])
            }
        }
        $.Callbacks = function(e) {
            var t;
            e = "string" == typeof e ? (t = {}, $.each(e.match(q) || [], (function(e, i) {
                t[i] = !0
            })), t) : $.extend({}, e);
            var i, s, o, a, n = [],
                r = [],
                l = -1,
                c = function() {
                    for (a = a || e.once, o = i = !0; r.length; l = -1)
                        for (s = r.shift(); ++l < n.length;) !1 === n[l].apply(s[0], s[1]) && e.stopOnFalse && (l = n.length, s = !1);
                    e.memory || (s = !1), i = !1, a && (n = s ? [] : "")
                },
                d = {
                    add: function() {
                        return n && (s && !i && (l = n.length - 1, r.push(s)), function t(i) {
                            $.each(i, (function(i, s) {
                                m(s) ? e.unique && d.has(s) || n.push(s) : s && s.length && "string" !== y(s) && t(s)
                            }))
                        }(arguments), s && !i && c()), this
                    },
                    remove: function() {
                        return $.each(arguments, (function(e, t) {
                            for (var i; - 1 < (i = $.inArray(t, n, i));) n.splice(i, 1), i <= l && l--
                        })), this
                    },
                    has: function(e) {
                        return e ? -1 < $.inArray(e, n) : 0 < n.length
                    },
                    empty: function() {
                        return n && (n = []), this
                    },
                    disable: function() {
                        return a = r = [], n = s = "", this
                    },
                    disabled: function() {
                        return !n
                    },
                    lock: function() {
                        return a = r = [], s || i || (n = s = ""), this
                    },
                    locked: function() {
                        return !!a
                    },
                    fireWith: function(e, t) {
                        return a || (t = [e, (t = t || []).slice ? t.slice() : t], r.push(t), i || c()), this
                    },
                    fire: function() {
                        return d.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!o
                    }
                };
            return d
        }, $.extend({
            Deferred: function(t) {
                var i = [
                        ["notify", "progress", $.Callbacks("memory"), $.Callbacks("memory"), 2],
                        ["resolve", "done", $.Callbacks("once memory"), $.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", $.Callbacks("once memory"), $.Callbacks("once memory"), 1, "rejected"]
                    ],
                    s = "pending",
                    o = {
                        state: function() {
                            return s
                        },
                        always: function() {
                            return a.done(arguments).fail(arguments), this
                        },
                        catch: function(e) {
                            return o.then(null, e)
                        },
                        pipe: function() {
                            var e = arguments;
                            return $.Deferred((function(t) {
                                $.each(i, (function(i, s) {
                                    var o = m(e[s[4]]) && e[s[4]];
                                    a[s[1]]((function() {
                                        var e = o && o.apply(this, arguments);
                                        e && m(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[s[0] + "With"](this, o ? [e] : arguments)
                                    }))
                                })), e = null
                            })).promise()
                        },
                        then: function(t, s, o) {
                            var a = 0;

                            function n(t, i, s, o) {
                                return function() {
                                    var r = this,
                                        l = arguments,
                                        c = function() {
                                            var e, c;
                                            if (!(t < a)) {
                                                if ((e = s.apply(r, l)) === i.promise()) throw new TypeError("Thenable self-resolution");
                                                m(c = e && ("object" == typeof e || "function" == typeof e) && e.then) ? o ? c.call(e, n(a, i, H, o), n(a, i, N, o)) : c.call(e, n(++a, i, H, o), n(a, i, N, o), n(a, i, H, i.notifyWith)) : (s !== H && (r = void 0, l = [e]), (o || i.resolveWith)(r, l))
                                            }
                                        },
                                        d = o ? c : function() {
                                            try {
                                                c()
                                            } catch (c) {
                                                $.Deferred.exceptionHook && $.Deferred.exceptionHook(c, d.stackTrace), a <= t + 1 && (s !== N && (r = void 0, l = [c]), i.rejectWith(r, l))
                                            }
                                        };
                                    t ? d() : ($.Deferred.getStackHook && (d.stackTrace = $.Deferred.getStackHook()), e.setTimeout(d))
                                }
                            }
                            return $.Deferred((function(e) {
                                i[0][3].add(n(0, e, m(o) ? o : H, e.notifyWith)), i[1][3].add(n(0, e, m(t) ? t : H)), i[2][3].add(n(0, e, m(s) ? s : N))
                            })).promise()
                        },
                        promise: function(e) {
                            return null != e ? $.extend(e, o) : o
                        }
                    },
                    a = {};
                return $.each(i, (function(e, t) {
                    var n = t[2],
                        r = t[5];
                    o[t[1]] = n.add, r && n.add((function() {
                        s = r
                    }), i[3 - e][2].disable, i[3 - e][3].disable, i[0][2].lock, i[0][3].lock), n.add(t[3].fire), a[t[0]] = function() {
                        return a[t[0] + "With"](this === a ? void 0 : this, arguments), this
                    }, a[t[0] + "With"] = n.fireWith
                })), o.promise(a), t && t.call(a, a), a
            },
            when: function(e) {
                var t = arguments.length,
                    i = t,
                    s = Array(i),
                    o = a.call(arguments),
                    n = $.Deferred(),
                    r = function(e) {
                        return function(i) {
                            s[e] = this, o[e] = 1 < arguments.length ? a.call(arguments) : i, --t || n.resolveWith(s, o)
                        }
                    };
                if (t <= 1 && (R(e, n.done(r(i)).resolve, n.reject, !t), "pending" === n.state() || m(o[i] && o[i].then))) return n.then();
                for (; i--;) R(o[i], r(i), n.reject);
                return n.promise()
            }
        });
        var F = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        $.Deferred.exceptionHook = function(t, i) {
            e.console && e.console.warn && t && F.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i)
        }, $.readyException = function(t) {
            e.setTimeout((function() {
                throw t
            }))
        };
        var L = $.Deferred();

        function M() {
            s.removeEventListener("DOMContentLoaded", M), e.removeEventListener("load", M), $.ready()
        }
        $.fn.ready = function(e) {
            return L.then(e).catch((function(e) {
                $.readyException(e)
            })), this
        }, $.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(e) {
                (!0 === e ? --$.readyWait : $.isReady) || ($.isReady = !0) !== e && 0 < --$.readyWait || L.resolveWith(s, [$])
            }
        }), $.ready.then = L.then, "complete" === s.readyState || "loading" !== s.readyState && !s.documentElement.doScroll ? e.setTimeout($.ready) : (s.addEventListener("DOMContentLoaded", M), e.addEventListener("load", M));
        var z = function(e, t, i, s, o, a, n) {
                var r = 0,
                    l = e.length,
                    c = null == i;
                if ("object" === y(i))
                    for (r in o = !0, i) z(e, t, r, i[r], !0, a, n);
                else if (void 0 !== s && (o = !0, m(s) || (n = !0), c && (n ? (t.call(e, s), t = null) : (c = t, t = function(e, t, i) {
                        return c.call($(e), i)
                    })), t))
                    for (; r < l; r++) t(e[r], i, n ? s : s.call(e[r], r, t(e[r], i)));
                return o ? e : c ? t.call(e) : l ? t(e[0], i) : a
            },
            W = /^-ms-/,
            U = /-([a-z])/g;

        function B(e, t) {
            return t.toUpperCase()
        }

        function X(e) {
            return e.replace(W, "ms-").replace(U, B)
        }
        var V = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };

        function Q() {
            this.expando = $.expando + Q.uid++
        }
        Q.uid = 1, Q.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, i) {
                var s, o = this.cache(e);
                if ("string" == typeof t) o[X(t)] = i;
                else
                    for (s in t) o[X(s)] = t[s];
                return o
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
            },
            access: function(e, t, i) {
                return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i), void 0 !== i ? i : t)
            },
            remove: function(e, t) {
                var i, s = e[this.expando];
                if (void 0 !== s) {
                    if (void 0 !== t) {
                        i = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in s ? [t] : t.match(q) || []).length;
                        for (; i--;) delete s[t[i]]
                    }(void 0 === t || $.isEmptyObject(s)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return void 0 !== t && !$.isEmptyObject(t)
            }
        };
        var J = new Q,
            Y = new Q,
            Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            K = /[A-Z]/g;

        function ee(e, t, i) {
            var s, o;
            if (void 0 === i && 1 === e.nodeType)
                if (s = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof(i = e.getAttribute(s))) {
                    try {
                        i = "true" === (o = i) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : Z.test(o) ? JSON.parse(o) : o)
                    } catch (e) {}
                    Y.set(e, t, i)
                } else i = void 0;
            return i
        }
        $.extend({
            hasData: function(e) {
                return Y.hasData(e) || J.hasData(e)
            },
            data: function(e, t, i) {
                return Y.access(e, t, i)
            },
            removeData: function(e, t) {
                Y.remove(e, t)
            },
            _data: function(e, t, i) {
                return J.access(e, t, i)
            },
            _removeData: function(e, t) {
                J.remove(e, t)
            }
        }), $.fn.extend({
            data: function(e, t) {
                var i, s, o, a = this[0],
                    n = a && a.attributes;
                if (void 0 === e) {
                    if (this.length && (o = Y.get(a), 1 === a.nodeType && !J.get(a, "hasDataAttrs"))) {
                        for (i = n.length; i--;) n[i] && 0 === (s = n[i].name).indexOf("data-") && (s = X(s.slice(5)), ee(a, s, o[s]));
                        J.set(a, "hasDataAttrs", !0)
                    }
                    return o
                }
                return "object" == typeof e ? this.each((function() {
                    Y.set(this, e)
                })) : z(this, (function(t) {
                    var i;
                    if (a && void 0 === t) return void 0 !== (i = Y.get(a, e)) ? i : void 0 !== (i = ee(a, e)) ? i : void 0;
                    this.each((function() {
                        Y.set(this, e, t)
                    }))
                }), null, t, 1 < arguments.length, null, !0)
            },
            removeData: function(e) {
                return this.each((function() {
                    Y.remove(this, e)
                }))
            }
        }), $.extend({
            queue: function(e, t, i) {
                var s;
                if (e) return s = J.get(e, t = (t || "fx") + "queue"), i && (!s || Array.isArray(i) ? s = J.access(e, t, $.makeArray(i)) : s.push(i)), s || []
            },
            dequeue: function(e, t) {
                var i = $.queue(e, t = t || "fx"),
                    s = i.length,
                    o = i.shift(),
                    a = $._queueHooks(e, t);
                "inprogress" === o && (o = i.shift(), s--), o && ("fx" === t && i.unshift("inprogress"), delete a.stop, o.call(e, (function() {
                    $.dequeue(e, t)
                }), a)), !s && a && a.empty.fire()
            },
            _queueHooks: function(e, t) {
                var i = t + "queueHooks";
                return J.get(e, i) || J.access(e, i, {
                    empty: $.Callbacks("once memory").add((function() {
                        J.remove(e, [t + "queue", i])
                    }))
                })
            }
        }), $.fn.extend({
            queue: function(e, t) {
                var i = 2;
                return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? $.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                    var i = $.queue(this, e, t);
                    $._queueHooks(this, e), "fx" === e && "inprogress" !== i[0] && $.dequeue(this, e)
                }))
            },
            dequeue: function(e) {
                return this.each((function() {
                    $.dequeue(this, e)
                }))
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var i, s = 1,
                    o = $.Deferred(),
                    a = this,
                    n = this.length,
                    r = function() {
                        --s || o.resolveWith(a, [a])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; n--;)(i = J.get(a[n], e + "queueHooks")) && i.empty && (s++, i.empty.add(r));
                return r(), o.promise(t)
            }
        });
        var te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ie = new RegExp("^(?:([+-])=|)(" + te + ")([a-z%]*)$", "i"),
            se = ["Top", "Right", "Bottom", "Left"],
            oe = s.documentElement,
            ae = function(e) {
                return $.contains(e.ownerDocument, e)
            },
            ne = {
                composed: !0
            };
        oe.getRootNode && (ae = function(e) {
            return $.contains(e.ownerDocument, e) || e.getRootNode(ne) === e.ownerDocument
        });
        var re = function(e, t) {
                return "none" === (e = t || e).style.display || "" === e.style.display && ae(e) && "none" === $.css(e, "display")
            },
            le = function(e, t, i, s) {
                var o, a, n = {};
                for (a in t) n[a] = e.style[a], e.style[a] = t[a];
                for (a in o = i.apply(e, s || []), t) e.style[a] = n[a];
                return o
            };

        function ce(e, t, i, s) {
            var o, a, n = 20,
                r = s ? function() {
                    return s.cur()
                } : function() {
                    return $.css(e, t, "")
                },
                l = r(),
                c = i && i[3] || ($.cssNumber[t] ? "" : "px"),
                d = e.nodeType && ($.cssNumber[t] || "px" !== c && +l) && ie.exec($.css(e, t));
            if (d && d[3] !== c) {
                for (c = c || d[3], d = +(l /= 2) || 1; n--;) $.style(e, t, d + c), (1 - a) * (1 - (a = r() / l || .5)) <= 0 && (n = 0), d /= a;
                $.style(e, t, (d *= 2) + c), i = i || []
            }
            return i && (d = +d || +l || 0, o = i[1] ? d + (i[1] + 1) * i[2] : +i[2], s && (s.unit = c, s.start = d, s.end = o)), o
        }
        var de = {};

        function ue(e, t) {
            for (var i, s, o, a, n, r, l, c = [], d = 0, u = e.length; d < u; d++)(s = e[d]).style && (i = s.style.display, t ? ("none" === i && (c[d] = J.get(s, "display") || null, c[d] || (s.style.display = "")), "" === s.style.display && re(s) && (c[d] = (l = n = a = void 0, n = (o = s).ownerDocument, (l = de[r = o.nodeName]) || (a = n.body.appendChild(n.createElement(r)), l = $.css(a, "display"), a.parentNode.removeChild(a), "none" === l && (l = "block"), de[r] = l)))) : "none" !== i && (c[d] = "none", J.set(s, "display", i)));
            for (d = 0; d < u; d++) null != c[d] && (e[d].style.display = c[d]);
            return e
        }
        $.fn.extend({
            show: function() {
                return ue(this, !0)
            },
            hide: function() {
                return ue(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                    re(this) ? $(this).show() : $(this).hide()
                }))
            }
        });
        var fe = /^(?:checkbox|radio)$/i,
            pe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            he = /^$|^module$|\/(?:java|ecma)script/i,
            me = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };

        function ge(e, t) {
            var i;
            return i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && T(e, t) ? $.merge([e], i) : i
        }

        function ve(e, t) {
            for (var i = 0, s = e.length; i < s; i++) J.set(e[i], "globalEval", !t || J.get(t[i], "globalEval"))
        }
        me.optgroup = me.option, me.tbody = me.tfoot = me.colgroup = me.caption = me.thead, me.th = me.td;
        var _e, ye, Ce = /<|&#?\w+;/;

        function $e(e, t, i, s, o) {
            for (var a, n, r, l, c, d, u = t.createDocumentFragment(), f = [], p = 0, h = e.length; p < h; p++)
                if ((a = e[p]) || 0 === a)
                    if ("object" === y(a)) $.merge(f, a.nodeType ? [a] : a);
                    else if (Ce.test(a)) {
                for (n = n || u.appendChild(t.createElement("div")), r = (pe.exec(a) || ["", ""])[1].toLowerCase(), n.innerHTML = (l = me[r] || me._default)[1] + $.htmlPrefilter(a) + l[2], d = l[0]; d--;) n = n.lastChild;
                $.merge(f, n.childNodes), (n = u.firstChild).textContent = ""
            } else f.push(t.createTextNode(a));
            for (u.textContent = "", p = 0; a = f[p++];)
                if (s && -1 < $.inArray(a, s)) o && o.push(a);
                else if (c = ae(a), n = ge(u.appendChild(a), "script"), c && ve(n), i)
                for (d = 0; a = n[d++];) he.test(a.type || "") && i.push(a);
            return u
        }
        _e = s.createDocumentFragment().appendChild(s.createElement("div")), (ye = s.createElement("input")).setAttribute("type", "radio"), ye.setAttribute("checked", "checked"), ye.setAttribute("name", "t"), _e.appendChild(ye), h.checkClone = _e.cloneNode(!0).cloneNode(!0).lastChild.checked, _e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!_e.cloneNode(!0).lastChild.defaultValue;
        var be = /^key/,
            xe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            we = /^([^.]*)(?:\.(.+)|)/;

        function Oe() {
            return !0
        }

        function Se() {
            return !1
        }

        function ke(e, t) {
            return e === function() {
                try {
                    return s.activeElement
                } catch (e) {}
            }() == ("focus" === t)
        }

        function Te(e, t, i, s, o, a) {
            var n, r;
            if ("object" == typeof t) {
                for (r in "string" != typeof i && (s = s || i, i = void 0), t) Te(e, r, i, s, t[r], a);
                return e
            }
            if (null == s && null == o ? (o = i, s = i = void 0) : null == o && ("string" == typeof i ? (o = s, s = void 0) : (o = s, s = i, i = void 0)), !1 === o) o = Se;
            else if (!o) return e;
            return 1 === a && (n = o, (o = function(e) {
                return $().off(e), n.apply(this, arguments)
            }).guid = n.guid || (n.guid = $.guid++)), e.each((function() {
                $.event.add(this, t, o, s, i)
            }))
        }

        function Ae(e, t, i) {
            i ? (J.set(e, t, !1), $.event.add(e, t, {
                namespace: !1,
                handler: function(e) {
                    var s, o, n = J.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                        if (n.length)($.event.special[t] || {}).delegateType && e.stopPropagation();
                        else if (n = a.call(arguments), J.set(this, t, n), s = i(this, t), this[t](), n !== (o = J.get(this, t)) || s ? J.set(this, t, !1) : o = {}, n !== o) return e.stopImmediatePropagation(), e.preventDefault(), o.value
                    } else n.length && (J.set(this, t, {
                        value: $.event.trigger($.extend(n[0], $.Event.prototype), n.slice(1), this)
                    }), e.stopImmediatePropagation())
                }
            })) : void 0 === J.get(e, t) && $.event.add(e, t, Oe)
        }
        $.event = {
            global: {},
            add: function(e, t, i, s, o) {
                var a, n, r, l, c, d, u, f, p, h, m, g = J.get(e);
                if (g)
                    for (i.handler && (i = (a = i).handler, o = a.selector), o && $.find.matchesSelector(oe, o), i.guid || (i.guid = $.guid++), (l = g.events) || (l = g.events = {}), (n = g.handle) || (n = g.handle = function(t) {
                            return void 0 !== $ && $.event.triggered !== t.type ? $.event.dispatch.apply(e, arguments) : void 0
                        }), c = (t = (t || "").match(q) || [""]).length; c--;) p = m = (r = we.exec(t[c]) || [])[1], h = (r[2] || "").split(".").sort(), p && (u = $.event.special[p] || {}, u = $.event.special[p = (o ? u.delegateType : u.bindType) || p] || {}, d = $.extend({
                        type: p,
                        origType: m,
                        data: s,
                        handler: i,
                        guid: i.guid,
                        selector: o,
                        needsContext: o && $.expr.match.needsContext.test(o),
                        namespace: h.join(".")
                    }, a), (f = l[p]) || ((f = l[p] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, s, h, n) || e.addEventListener && e.addEventListener(p, n)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = i.guid)), o ? f.splice(f.delegateCount++, 0, d) : f.push(d), $.event.global[p] = !0)
            },
            remove: function(e, t, i, s, o) {
                var a, n, r, l, c, d, u, f, p, h, m, g = J.hasData(e) && J.get(e);
                if (g && (l = g.events)) {
                    for (c = (t = (t || "").match(q) || [""]).length; c--;)
                        if (p = m = (r = we.exec(t[c]) || [])[1], h = (r[2] || "").split(".").sort(), p) {
                            for (u = $.event.special[p] || {}, f = l[p = (s ? u.delegateType : u.bindType) || p] || [], r = r[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), n = a = f.length; a--;) d = f[a], !o && m !== d.origType || i && i.guid !== d.guid || r && !r.test(d.namespace) || s && s !== d.selector && ("**" !== s || !d.selector) || (f.splice(a, 1), d.selector && f.delegateCount--, u.remove && u.remove.call(e, d));
                            n && !f.length && (u.teardown && !1 !== u.teardown.call(e, h, g.handle) || $.removeEvent(e, p, g.handle), delete l[p])
                        } else
                            for (p in l) $.event.remove(e, p + t[c], i, s, !0);
                    $.isEmptyObject(l) && J.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, i, s, o, a, n, r = $.event.fix(e),
                    l = new Array(arguments.length),
                    c = (J.get(this, "events") || {})[r.type] || [],
                    d = $.event.special[r.type] || {};
                for (l[0] = r, t = 1; t < arguments.length; t++) l[t] = arguments[t];
                if (r.delegateTarget = this, !d.preDispatch || !1 !== d.preDispatch.call(this, r)) {
                    for (n = $.event.handlers.call(this, r, c), t = 0;
                        (o = n[t++]) && !r.isPropagationStopped();)
                        for (r.currentTarget = o.elem, i = 0;
                            (a = o.handlers[i++]) && !r.isImmediatePropagationStopped();) r.rnamespace && !1 !== a.namespace && !r.rnamespace.test(a.namespace) || (r.handleObj = a, r.data = a.data, void 0 !== (s = (($.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, l)) && !1 === (r.result = s) && (r.preventDefault(), r.stopPropagation()));
                    return d.postDispatch && d.postDispatch.call(this, r), r.result
                }
            },
            handlers: function(e, t) {
                var i, s, o, a, n, r = [],
                    l = t.delegateCount,
                    c = e.target;
                if (l && c.nodeType && !("click" === e.type && 1 <= e.button))
                    for (; c !== this; c = c.parentNode || this)
                        if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                            for (a = [], n = {}, i = 0; i < l; i++) void 0 === n[o = (s = t[i]).selector + " "] && (n[o] = s.needsContext ? -1 < $(o, this).index(c) : $.find(o, this, null, [c]).length), n[o] && a.push(s);
                            a.length && r.push({
                                elem: c,
                                handlers: a
                            })
                        } return c = this, l < t.length && r.push({
                    elem: c,
                    handlers: t.slice(l)
                }), r
            },
            addProp: function(e, t) {
                Object.defineProperty($.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: m(t) ? function() {
                        if (this.originalEvent) return t(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[e]
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                })
            },
            fix: function(e) {
                return e[$.expando] ? e : new $.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(e) {
                        var t = this || e;
                        return fe.test(t.type) && t.click && T(t, "input") && Ae(t, "click", Oe), !1
                    },
                    trigger: function(e) {
                        var t = this || e;
                        return fe.test(t.type) && t.click && T(t, "input") && Ae(t, "click"), !0
                    },
                    _default: function(e) {
                        var t = e.target;
                        return fe.test(t.type) && t.click && T(t, "input") && J.get(t, "click") || T(t, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        }, $.removeEvent = function(e, t, i) {
            e.removeEventListener && e.removeEventListener(t, i)
        }, $.Event = function(e, t) {
            if (!(this instanceof $.Event)) return new $.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Oe : Se, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && $.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[$.expando] = !0
        }, $.Event.prototype = {
            constructor: $.Event,
            isDefaultPrevented: Se,
            isPropagationStopped: Se,
            isImmediatePropagationStopped: Se,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = Oe, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = Oe, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = Oe, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, $.each({
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
            which: function(e) {
                var t = e.button;
                return null == e.which && be.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && xe.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, $.event.addProp), $.each({
            focus: "focusin",
            blur: "focusout"
        }, (function(e, t) {
            $.event.special[e] = {
                setup: function() {
                    return Ae(this, e, ke), !1
                },
                trigger: function() {
                    return Ae(this, e), !0
                },
                delegateType: t
            }
        })), $.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, (function(e, t) {
            $.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var i, s = e.relatedTarget,
                        o = e.handleObj;
                    return s && (s === this || $.contains(this, s)) || (e.type = o.origType, i = o.handler.apply(this, arguments), e.type = t), i
                }
            }
        })), $.fn.extend({
            on: function(e, t, i, s) {
                return Te(this, e, t, i, s)
            },
            one: function(e, t, i, s) {
                return Te(this, e, t, i, s, 1)
            },
            off: function(e, t, i) {
                var s, o;
                if (e && e.preventDefault && e.handleObj) return s = e.handleObj, $(e.delegateTarget).off(s.namespace ? s.origType + "." + s.namespace : s.origType, s.selector, s.handler), this;
                if ("object" == typeof e) {
                    for (o in e) this.off(o, t, e[o]);
                    return this
                }
                return !1 !== t && "function" != typeof t || (i = t, t = void 0), !1 === i && (i = Se), this.each((function() {
                    $.event.remove(this, e, i, t)
                }))
            }
        });
        var Ie = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            Ee = /<script|<style|<link/i,
            Pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
            De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

        function Ge(e, t) {
            return T(e, "table") && T(11 !== t.nodeType ? t : t.firstChild, "tr") && $(e).children("tbody")[0] || e
        }

        function je(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function qe(e) {
            return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
        }

        function He(e, t) {
            var i, s, o, a, n, r, l, c;
            if (1 === t.nodeType) {
                if (J.hasData(e) && (a = J.access(e), n = J.set(t, a), c = a.events))
                    for (o in delete n.handle, n.events = {}, c)
                        for (i = 0, s = c[o].length; i < s; i++) $.event.add(t, o, c[o][i]);
                Y.hasData(e) && (r = Y.access(e), l = $.extend({}, r), Y.set(t, l))
            }
        }

        function Ne(e, t, i, s) {
            t = n.apply([], t);
            var o, a, r, l, c, d, u = 0,
                f = e.length,
                p = f - 1,
                g = t[0],
                v = m(g);
            if (v || 1 < f && "string" == typeof g && !h.checkClone && Pe.test(g)) return e.each((function(o) {
                var a = e.eq(o);
                v && (t[0] = g.call(this, o, a.html())), Ne(a, t, i, s)
            }));
            if (f && (a = (o = $e(t, e[0].ownerDocument, !1, e, s)).firstChild, 1 === o.childNodes.length && (o = a), a || s)) {
                for (l = (r = $.map(ge(o, "script"), je)).length; u < f; u++) c = o, u !== p && (c = $.clone(c, !0, !0), l && $.merge(r, ge(c, "script"))), i.call(e[u], c, u);
                if (l)
                    for (d = r[r.length - 1].ownerDocument, $.map(r, qe), u = 0; u < l; u++) he.test((c = r[u]).type || "") && !J.access(c, "globalEval") && $.contains(d, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? $._evalUrl && !c.noModule && $._evalUrl(c.src, {
                        nonce: c.nonce || c.getAttribute("nonce")
                    }) : _(c.textContent.replace(De, ""), c, d))
            }
            return e
        }

        function Re(e, t, i) {
            for (var s, o = t ? $.filter(t, e) : e, a = 0; null != (s = o[a]); a++) i || 1 !== s.nodeType || $.cleanData(ge(s)), s.parentNode && (i && ae(s) && ve(ge(s, "script")), s.parentNode.removeChild(s));
            return e
        }
        $.extend({
            htmlPrefilter: function(e) {
                return e.replace(Ie, "<$1></$2>")
            },
            clone: function(e, t, i) {
                var s, o, a, n, r, l, c, d = e.cloneNode(!0),
                    u = ae(e);
                if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || $.isXMLDoc(e)))
                    for (n = ge(d), s = 0, o = (a = ge(e)).length; s < o; s++) r = a[s], "input" === (c = (l = n[s]).nodeName.toLowerCase()) && fe.test(r.type) ? l.checked = r.checked : "input" !== c && "textarea" !== c || (l.defaultValue = r.defaultValue);
                if (t)
                    if (i)
                        for (a = a || ge(e), n = n || ge(d), s = 0, o = a.length; s < o; s++) He(a[s], n[s]);
                    else He(e, d);
                return 0 < (n = ge(d, "script")).length && ve(n, !u && ge(e, "script")), d
            },
            cleanData: function(e) {
                for (var t, i, s, o = $.event.special, a = 0; void 0 !== (i = e[a]); a++)
                    if (V(i)) {
                        if (t = i[J.expando]) {
                            if (t.events)
                                for (s in t.events) o[s] ? $.event.remove(i, s) : $.removeEvent(i, s, t.handle);
                            i[J.expando] = void 0
                        }
                        i[Y.expando] && (i[Y.expando] = void 0)
                    }
            }
        }), $.fn.extend({
            detach: function(e) {
                return Re(this, e, !0)
            },
            remove: function(e) {
                return Re(this, e)
            },
            text: function(e) {
                return z(this, (function(e) {
                    return void 0 === e ? $.text(this) : this.empty().each((function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    }))
                }), null, e, arguments.length)
            },
            append: function() {
                return Ne(this, arguments, (function(e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ge(this, e).appendChild(e)
                }))
            },
            prepend: function() {
                return Ne(this, arguments, (function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = Ge(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                }))
            },
            before: function() {
                return Ne(this, arguments, (function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                }))
            },
            after: function() {
                return Ne(this, arguments, (function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                }))
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && ($.cleanData(ge(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map((function() {
                    return $.clone(this, e, t)
                }))
            },
            html: function(e) {
                return z(this, (function(e) {
                    var t = this[0] || {},
                        i = 0,
                        s = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !Ee.test(e) && !me[(pe.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = $.htmlPrefilter(e);
                        try {
                            for (; i < s; i++) 1 === (t = this[i] || {}).nodeType && ($.cleanData(ge(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }), null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return Ne(this, arguments, (function(t) {
                    var i = this.parentNode;
                    $.inArray(this, e) < 0 && ($.cleanData(ge(this)), i && i.replaceChild(t, this))
                }), e)
            }
        }), $.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, (function(e, t) {
            $.fn[e] = function(e) {
                for (var i, s = [], o = $(e), a = o.length - 1, n = 0; n <= a; n++) i = n === a ? this : this.clone(!0), $(o[n])[t](i), r.apply(s, i.get());
                return this.pushStack(s)
            }
        }));
        var Fe = new RegExp("^(" + te + ")(?!px)[a-z%]+$", "i"),
            Le = function(t) {
                var i = t.ownerDocument.defaultView;
                return i && i.opener || (i = e), i.getComputedStyle(t)
            },
            Me = new RegExp(se.join("|"), "i");

        function ze(e, t, i) {
            var s, o, a, n, r = e.style;
            return (i = i || Le(e)) && ("" !== (n = i.getPropertyValue(t) || i[t]) || ae(e) || (n = $.style(e, t)), !h.pixelBoxStyles() && Fe.test(n) && Me.test(t) && (s = r.width, o = r.minWidth, a = r.maxWidth, r.minWidth = r.maxWidth = r.width = n, n = i.width, r.width = s, r.minWidth = o, r.maxWidth = a)), void 0 !== n ? n + "" : n
        }

        function We(e, t) {
            return {
                get: function() {
                    if (!e()) return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }! function() {
            function t() {
                if (d) {
                    c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", d.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", oe.appendChild(c).appendChild(d);
                    var t = e.getComputedStyle(d);
                    o = "1%" !== t.top, l = 12 === i(t.marginLeft), d.style.right = "60%", r = 36 === i(t.right), a = 36 === i(t.width), d.style.position = "absolute", n = 12 === i(d.offsetWidth / 3), oe.removeChild(c), d = null
                }
            }

            function i(e) {
                return Math.round(parseFloat(e))
            }
            var o, a, n, r, l, c = s.createElement("div"),
                d = s.createElement("div");
            d.style && (d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === d.style.backgroundClip, $.extend(h, {
                boxSizingReliable: function() {
                    return t(), a
                },
                pixelBoxStyles: function() {
                    return t(), r
                },
                pixelPosition: function() {
                    return t(), o
                },
                reliableMarginLeft: function() {
                    return t(), l
                },
                scrollboxSize: function() {
                    return t(), n
                }
            }))
        }();
        var Ue = ["Webkit", "Moz", "ms"],
            Be = s.createElement("div").style,
            Xe = {};

        function Ve(e) {
            return $.cssProps[e] || Xe[e] || (e in Be ? e : Xe[e] = function(e) {
                for (var t = e[0].toUpperCase() + e.slice(1), i = Ue.length; i--;)
                    if ((e = Ue[i] + t) in Be) return e
            }(e) || e)
        }
        var Qe = /^(none|table(?!-c[ea]).+)/,
            Je = /^--/,
            Ye = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Ze = {
                letterSpacing: "0",
                fontWeight: "400"
            };

        function Ke(e, t, i) {
            var s = ie.exec(t);
            return s ? Math.max(0, s[2] - (i || 0)) + (s[3] || "px") : t
        }

        function et(e, t, i, s, o, a) {
            var n = "width" === t ? 1 : 0,
                r = 0,
                l = 0;
            if (i === (s ? "border" : "content")) return 0;
            for (; n < 4; n += 2) "margin" === i && (l += $.css(e, i + se[n], !0, o)), s ? ("content" === i && (l -= $.css(e, "padding" + se[n], !0, o)), "margin" !== i && (l -= $.css(e, "border" + se[n] + "Width", !0, o))) : (l += $.css(e, "padding" + se[n], !0, o), "padding" !== i ? l += $.css(e, "border" + se[n] + "Width", !0, o) : r += $.css(e, "border" + se[n] + "Width", !0, o));
            return !s && 0 <= a && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - a - l - r - .5)) || 0), l
        }

        function tt(e, t, i) {
            var s = Le(e),
                o = (!h.boxSizingReliable() || i) && "border-box" === $.css(e, "boxSizing", !1, s),
                a = o,
                n = ze(e, t, s),
                r = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Fe.test(n)) {
                if (!i) return n;
                n = "auto"
            }
            return (!h.boxSizingReliable() && o || "auto" === n || !parseFloat(n) && "inline" === $.css(e, "display", !1, s)) && e.getClientRects().length && (o = "border-box" === $.css(e, "boxSizing", !1, s), (a = r in e) && (n = e[r])), (n = parseFloat(n) || 0) + et(e, t, i || (o ? "border" : "content"), a, s, n) + "px"
        }

        function it(e, t, i, s, o) {
            return new it.prototype.init(e, t, i, s, o)
        }
        $.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var i = ze(e, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
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
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(e, t, i, s) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var o, a, n, r = X(t),
                        l = Je.test(t),
                        c = e.style;
                    if (l || (t = Ve(r)), n = $.cssHooks[t] || $.cssHooks[r], void 0 === i) return n && "get" in n && void 0 !== (o = n.get(e, !1, s)) ? o : c[t];
                    "string" == (a = typeof i) && (o = ie.exec(i)) && o[1] && (i = ce(e, t, o), a = "number"), null != i && i == i && ("number" !== a || l || (i += o && o[3] || ($.cssNumber[r] ? "" : "px")), h.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (c[t] = "inherit"), n && "set" in n && void 0 === (i = n.set(e, i, s)) || (l ? c.setProperty(t, i) : c[t] = i))
                }
            },
            css: function(e, t, i, s) {
                var o, a, n, r = X(t);
                return Je.test(t) || (t = Ve(r)), (n = $.cssHooks[t] || $.cssHooks[r]) && "get" in n && (o = n.get(e, !0, i)), void 0 === o && (o = ze(e, t, s)), "normal" === o && t in Ze && (o = Ze[t]), "" === i || i ? (a = parseFloat(o), !0 === i || isFinite(a) ? a || 0 : o) : o
            }
        }), $.each(["height", "width"], (function(e, t) {
            $.cssHooks[t] = {
                get: function(e, i, s) {
                    if (i) return !Qe.test($.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? tt(e, t, s) : le(e, Ye, (function() {
                        return tt(e, t, s)
                    }))
                },
                set: function(e, i, s) {
                    var o, a = Le(e),
                        n = !h.scrollboxSize() && "absolute" === a.position,
                        r = (n || s) && "border-box" === $.css(e, "boxSizing", !1, a),
                        l = s ? et(e, t, s, r, a) : 0;
                    return r && n && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(a[t]) - et(e, t, "border", !1, a) - .5)), l && (o = ie.exec(i)) && "px" !== (o[3] || "px") && (e.style[t] = i, i = $.css(e, t)), Ke(0, i, l)
                }
            }
        })), $.cssHooks.marginLeft = We(h.reliableMarginLeft, (function(e, t) {
            if (t) return (parseFloat(ze(e, "marginLeft")) || e.getBoundingClientRect().left - le(e, {
                marginLeft: 0
            }, (function() {
                return e.getBoundingClientRect().left
            }))) + "px"
        })), $.each({
            margin: "",
            padding: "",
            border: "Width"
        }, (function(e, t) {
            $.cssHooks[e + t] = {
                expand: function(i) {
                    for (var s = 0, o = {}, a = "string" == typeof i ? i.split(" ") : [i]; s < 4; s++) o[e + se[s] + t] = a[s] || a[s - 2] || a[0];
                    return o
                }
            }, "margin" !== e && ($.cssHooks[e + t].set = Ke)
        })), $.fn.extend({
            css: function(e, t) {
                return z(this, (function(e, t, i) {
                    var s, o, a = {},
                        n = 0;
                    if (Array.isArray(t)) {
                        for (s = Le(e), o = t.length; n < o; n++) a[t[n]] = $.css(e, t[n], !1, s);
                        return a
                    }
                    return void 0 !== i ? $.style(e, t, i) : $.css(e, t)
                }), e, t, 1 < arguments.length)
            }
        }), (($.Tween = it).prototype = {
            constructor: it,
            init: function(e, t, i, s, o, a) {
                this.elem = e, this.prop = i, this.easing = o || $.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = s, this.unit = a || ($.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var e = it.propHooks[this.prop];
                return e && e.get ? e.get(this) : it.propHooks._default.get(this)
            },
            run: function(e) {
                var t, i = it.propHooks[this.prop];
                return this.pos = t = this.options.duration ? $.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : it.propHooks._default.set(this), this
            }
        }).init.prototype = it.prototype, (it.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = $.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                },
                set: function(e) {
                    $.fx.step[e.prop] ? $.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !$.cssHooks[e.prop] && null == e.elem.style[Ve(e.prop)] ? e.elem[e.prop] = e.now : $.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }).scrollTop = it.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, $.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, $.fx = it.prototype.init, $.fx.step = {};
        var st, ot, at, nt, rt = /^(?:toggle|show|hide)$/,
            lt = /queueHooks$/;

        function ct() {
            ot && (!1 === s.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(ct) : e.setTimeout(ct, $.fx.interval), $.fx.tick())
        }

        function dt() {
            return e.setTimeout((function() {
                st = void 0
            })), st = Date.now()
        }

        function ut(e, t) {
            var i, s = 0,
                o = {
                    height: e
                };
            for (t = t ? 1 : 0; s < 4; s += 2 - t) o["margin" + (i = se[s])] = o["padding" + i] = e;
            return t && (o.opacity = o.width = e), o
        }

        function ft(e, t, i) {
            for (var s, o = (pt.tweeners[t] || []).concat(pt.tweeners["*"]), a = 0, n = o.length; a < n; a++)
                if (s = o[a].call(i, t, e)) return s
        }

        function pt(e, t, i) {
            var s, o, a = 0,
                n = pt.prefilters.length,
                r = $.Deferred().always((function() {
                    delete l.elem
                })),
                l = function() {
                    if (o) return !1;
                    for (var t = st || dt(), i = Math.max(0, c.startTime + c.duration - t), s = 1 - (i / c.duration || 0), a = 0, n = c.tweens.length; a < n; a++) c.tweens[a].run(s);
                    return r.notifyWith(e, [c, s, i]), s < 1 && n ? i : (n || r.notifyWith(e, [c, 1, 0]), r.resolveWith(e, [c]), !1)
                },
                c = r.promise({
                    elem: e,
                    props: $.extend({}, t),
                    opts: $.extend(!0, {
                        specialEasing: {},
                        easing: $.easing._default
                    }, i),
                    originalProperties: t,
                    originalOptions: i,
                    startTime: st || dt(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(t, i) {
                        var s = $.Tween(e, c.opts, t, i, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(s), s
                    },
                    stop: function(t) {
                        var i = 0,
                            s = t ? c.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; i < s; i++) c.tweens[i].run(1);
                        return t ? (r.notifyWith(e, [c, 1, 0]), r.resolveWith(e, [c, t])) : r.rejectWith(e, [c, t]), this
                    }
                }),
                d = c.props;
            for (function(e, t) {
                    var i, s, o, a, n;
                    for (i in e)
                        if (o = t[s = X(i)], a = e[i], Array.isArray(a) && (o = a[1], a = e[i] = a[0]), i !== s && (e[s] = a, delete e[i]), (n = $.cssHooks[s]) && "expand" in n)
                            for (i in a = n.expand(a), delete e[s], a) i in e || (e[i] = a[i], t[i] = o);
                        else t[s] = o
                }(d, c.opts.specialEasing); a < n; a++)
                if (s = pt.prefilters[a].call(c, e, d, c.opts)) return m(s.stop) && ($._queueHooks(c.elem, c.opts.queue).stop = s.stop.bind(s)), s;
            return $.map(d, ft, c), m(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), $.fx.timer($.extend(l, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })), c
        }
        $.Animation = $.extend(pt, {
            tweeners: {
                "*": [function(e, t) {
                    var i = this.createTween(e, t);
                    return ce(i.elem, e, ie.exec(t), i), i
                }]
            },
            tweener: function(e, t) {
                m(e) ? (t = e, e = ["*"]) : e = e.match(q);
                for (var i, s = 0, o = e.length; s < o; s++)(pt.tweeners[i = e[s]] = pt.tweeners[i] || []).unshift(t)
            },
            prefilters: [function(e, t, i) {
                var s, o, a, n, r, l, c, d, u = "width" in t || "height" in t,
                    f = this,
                    p = {},
                    h = e.style,
                    m = e.nodeType && re(e),
                    g = J.get(e, "fxshow");
                for (s in i.queue || (null == (n = $._queueHooks(e, "fx")).unqueued && (n.unqueued = 0, r = n.empty.fire, n.empty.fire = function() {
                        n.unqueued || r()
                    }), n.unqueued++, f.always((function() {
                        f.always((function() {
                            n.unqueued--, $.queue(e, "fx").length || n.empty.fire()
                        }))
                    }))), t)
                    if (rt.test(o = t[s])) {
                        if (delete t[s], a = a || "toggle" === o, o === (m ? "hide" : "show")) {
                            if ("show" !== o || !g || void 0 === g[s]) continue;
                            m = !0
                        }
                        p[s] = g && g[s] || $.style(e, s)
                    } if ((l = !$.isEmptyObject(t)) || !$.isEmptyObject(p))
                    for (s in u && 1 === e.nodeType && (i.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = g && g.display) && (c = J.get(e, "display")), "none" === (d = $.css(e, "display")) && (c ? d = c : (ue([e], !0), c = e.style.display || c, d = $.css(e, "display"), ue([e]))), ("inline" === d || "inline-block" === d && null != c) && "none" === $.css(e, "float") && (l || (f.done((function() {
                            h.display = c
                        })), null == c && (c = "none" === (d = h.display) ? "" : d)), h.display = "inline-block")), i.overflow && (h.overflow = "hidden", f.always((function() {
                            h.overflow = i.overflow[0], h.overflowX = i.overflow[1], h.overflowY = i.overflow[2]
                        }))), l = !1, p) l || (g ? "hidden" in g && (m = g.hidden) : g = J.access(e, "fxshow", {
                        display: c
                    }), a && (g.hidden = !m), m && ue([e], !0), f.done((function() {
                        for (s in m || ue([e]), J.remove(e, "fxshow"), p) $.style(e, s, p[s])
                    }))), l = ft(m ? g[s] : 0, s, f), s in g || (g[s] = l.start, m && (l.end = l.start, l.start = 0))
            }],
            prefilter: function(e, t) {
                t ? pt.prefilters.unshift(e) : pt.prefilters.push(e)
            }
        }), $.speed = function(e, t, i) {
            var s = e && "object" == typeof e ? $.extend({}, e) : {
                complete: i || !i && t || m(e) && e,
                duration: e,
                easing: i && t || t && !m(t) && t
            };
            return $.fx.off ? s.duration = 0 : "number" != typeof s.duration && (s.duration = s.duration in $.fx.speeds ? $.fx.speeds[s.duration] : $.fx.speeds._default), null != s.queue && !0 !== s.queue || (s.queue = "fx"), s.old = s.complete, s.complete = function() {
                m(s.old) && s.old.call(this), s.queue && $.dequeue(this, s.queue)
            }, s
        }, $.fn.extend({
            fadeTo: function(e, t, i, s) {
                return this.filter(re).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, i, s)
            },
            animate: function(e, t, i, s) {
                var o = $.isEmptyObject(e),
                    a = $.speed(t, i, s),
                    n = function() {
                        var t = pt(this, $.extend({}, e), a);
                        (o || J.get(this, "finish")) && t.stop(!0)
                    };
                return n.finish = n, o || !1 === a.queue ? this.each(n) : this.queue(a.queue, n)
            },
            stop: function(e, t, i) {
                var s = function(e) {
                    var t = e.stop;
                    delete e.stop, t(i)
                };
                return "string" != typeof e && (i = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each((function() {
                    var t = !0,
                        o = null != e && e + "queueHooks",
                        a = $.timers,
                        n = J.get(this);
                    if (o) n[o] && n[o].stop && s(n[o]);
                    else
                        for (o in n) n[o] && n[o].stop && lt.test(o) && s(n[o]);
                    for (o = a.length; o--;) a[o].elem !== this || null != e && a[o].queue !== e || (a[o].anim.stop(i), t = !1, a.splice(o, 1));
                    !t && i || $.dequeue(this, e)
                }))
            },
            finish: function(e) {
                return !1 !== e && (e = e || "fx"), this.each((function() {
                    var t, i = J.get(this),
                        s = i[e + "queue"],
                        o = i[e + "queueHooks"],
                        a = $.timers,
                        n = s ? s.length : 0;
                    for (i.finish = !0, $.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = a.length; t--;) a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                    for (t = 0; t < n; t++) s[t] && s[t].finish && s[t].finish.call(this);
                    delete i.finish
                }))
            }
        }), $.each(["toggle", "show", "hide"], (function(e, t) {
            var i = $.fn[t];
            $.fn[t] = function(e, s, o) {
                return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(ut(t, !0), e, s, o)
            }
        })), $.each({
            slideDown: ut("show"),
            slideUp: ut("hide"),
            slideToggle: ut("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, (function(e, t) {
            $.fn[e] = function(e, i, s) {
                return this.animate(t, e, i, s)
            }
        })), $.timers = [], $.fx.tick = function() {
            var e, t = 0,
                i = $.timers;
            for (st = Date.now(); t < i.length; t++)(e = i[t])() || i[t] !== e || i.splice(t--, 1);
            i.length || $.fx.stop(), st = void 0
        }, $.fx.timer = function(e) {
            $.timers.push(e), $.fx.start()
        }, $.fx.interval = 13, $.fx.start = function() {
            ot || (ot = !0, ct())
        }, $.fx.stop = function() {
            ot = null
        }, $.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, $.fn.delay = function(t, i) {
            return t = $.fx && $.fx.speeds[t] || t, this.queue(i = i || "fx", (function(i, s) {
                var o = e.setTimeout(i, t);
                s.stop = function() {
                    e.clearTimeout(o)
                }
            }))
        }, at = s.createElement("input"), nt = s.createElement("select").appendChild(s.createElement("option")), at.type = "checkbox", h.checkOn = "" !== at.value, h.optSelected = nt.selected, (at = s.createElement("input")).value = "t", at.type = "radio", h.radioValue = "t" === at.value;
        var ht, mt = $.expr.attrHandle;
        $.fn.extend({
            attr: function(e, t) {
                return z(this, $.attr, e, t, 1 < arguments.length)
            },
            removeAttr: function(e) {
                return this.each((function() {
                    $.removeAttr(this, e)
                }))
            }
        }), $.extend({
            attr: function(e, t, i) {
                var s, o, a = e.nodeType;
                if (3 !== a && 8 !== a && 2 !== a) return void 0 === e.getAttribute ? $.prop(e, t, i) : (1 === a && $.isXMLDoc(e) || (o = $.attrHooks[t.toLowerCase()] || ($.expr.match.bool.test(t) ? ht : void 0)), void 0 !== i ? null === i ? void $.removeAttr(e, t) : o && "set" in o && void 0 !== (s = o.set(e, i, t)) ? s : (e.setAttribute(t, i + ""), i) : o && "get" in o && null !== (s = o.get(e, t)) ? s : null == (s = $.find.attr(e, t)) ? void 0 : s)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!h.radioValue && "radio" === t && T(e, "input")) {
                            var i = e.value;
                            return e.setAttribute("type", t), i && (e.value = i), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var i, s = 0,
                    o = t && t.match(q);
                if (o && 1 === e.nodeType)
                    for (; i = o[s++];) e.removeAttribute(i)
            }
        }), ht = {
            set: function(e, t, i) {
                return !1 === t ? $.removeAttr(e, i) : e.setAttribute(i, i), i
            }
        }, $.each($.expr.match.bool.source.match(/\w+/g), (function(e, t) {
            var i = mt[t] || $.find.attr;
            mt[t] = function(e, t, s) {
                var o, a, n = t.toLowerCase();
                return s || (a = mt[n], mt[n] = o, o = null != i(e, t, s) ? n : null, mt[n] = a), o
            }
        }));
        var gt = /^(?:input|select|textarea|button)$/i,
            vt = /^(?:a|area)$/i;

        function _t(e) {
            return (e.match(q) || []).join(" ")
        }

        function yt(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function Ct(e) {
            return Array.isArray(e) ? e : "string" == typeof e && e.match(q) || []
        }
        $.fn.extend({
            prop: function(e, t) {
                return z(this, $.prop, e, t, 1 < arguments.length)
            },
            removeProp: function(e) {
                return this.each((function() {
                    delete this[$.propFix[e] || e]
                }))
            }
        }), $.extend({
            prop: function(e, t, i) {
                var s, o, a = e.nodeType;
                if (3 !== a && 8 !== a && 2 !== a) return 1 === a && $.isXMLDoc(e) || (o = $.propHooks[t = $.propFix[t] || t]), void 0 !== i ? o && "set" in o && void 0 !== (s = o.set(e, i, t)) ? s : e[t] = i : o && "get" in o && null !== (s = o.get(e, t)) ? s : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = $.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : gt.test(e.nodeName) || vt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), h.optSelected || ($.propHooks.selected = {
            get: function(e) {
                return null
            },
            set: function(e) {}
        }), $.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
            $.propFix[this.toLowerCase()] = this
        })), $.fn.extend({
            addClass: function(e) {
                var t, i, s, o, a, n, r, l = 0;
                if (m(e)) return this.each((function(t) {
                    $(this).addClass(e.call(this, t, yt(this)))
                }));
                if ((t = Ct(e)).length)
                    for (; i = this[l++];)
                        if (o = yt(i), s = 1 === i.nodeType && " " + _t(o) + " ") {
                            for (n = 0; a = t[n++];) s.indexOf(" " + a + " ") < 0 && (s += a + " ");
                            o !== (r = _t(s)) && i.setAttribute("class", r)
                        } return this
            },
            removeClass: function(e) {
                var t, i, s, o, a, n, r, l = 0;
                if (m(e)) return this.each((function(t) {
                    $(this).removeClass(e.call(this, t, yt(this)))
                }));
                if (!arguments.length) return this.attr("class", "");
                if ((t = Ct(e)).length)
                    for (; i = this[l++];)
                        if (o = yt(i), s = 1 === i.nodeType && " " + _t(o) + " ") {
                            for (n = 0; a = t[n++];)
                                for (; - 1 < s.indexOf(" " + a + " ");) s = s.replace(" " + a + " ", " ");
                            o !== (r = _t(s)) && i.setAttribute("class", r)
                        } return this
            },
            toggleClass: function(e, t) {
                var i = typeof e,
                    s = "string" === i || Array.isArray(e);
                return "boolean" == typeof t && s ? t ? this.addClass(e) : this.removeClass(e) : m(e) ? this.each((function(i) {
                    $(this).toggleClass(e.call(this, i, yt(this), t), t)
                })) : this.each((function() {
                    var t, o, a, n;
                    if (s)
                        for (o = 0, a = $(this), n = Ct(e); t = n[o++];) a.hasClass(t) ? a.removeClass(t) : a.addClass(t);
                    else void 0 !== e && "boolean" !== i || ((t = yt(this)) && J.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : J.get(this, "__className__") || ""))
                }))
            },
            hasClass: function(e) {
                var t, i, s = 0;
                for (t = " " + e + " "; i = this[s++];)
                    if (1 === i.nodeType && -1 < (" " + _t(yt(i)) + " ").indexOf(t)) return !0;
                return !1
            }
        });
        var $t = /\r/g;
        $.fn.extend({
            val: function(e) {
                var t, i, s, o = this[0];
                return arguments.length ? (s = m(e), this.each((function(i) {
                    var o;
                    1 === this.nodeType && (null == (o = s ? e.call(this, i, $(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = $.map(o, (function(e) {
                        return null == e ? "" : e + ""
                    }))), (t = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                }))) : o ? (t = $.valHooks[o.type] || $.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (i = t.get(o, "value")) ? i : "string" == typeof(i = o.value) ? i.replace($t, "") : null == i ? "" : i : void 0
            }
        }), $.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = $.find.attr(e, "value");
                        return null != t ? t : _t($.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, i, s, o = e.options,
                            a = e.selectedIndex,
                            n = "select-one" === e.type,
                            r = n ? null : [],
                            l = n ? a + 1 : o.length;
                        for (s = a < 0 ? l : n ? a : 0; s < l; s++)
                            if (((i = o[s]).selected || s === a) && !i.disabled && (!i.parentNode.disabled || !T(i.parentNode, "optgroup"))) {
                                if (t = $(i).val(), n) return t;
                                r.push(t)
                            } return r
                    },
                    set: function(e, t) {
                        for (var i, s, o = e.options, a = $.makeArray(t), n = o.length; n--;)((s = o[n]).selected = -1 < $.inArray($.valHooks.option.get(s), a)) && (i = !0);
                        return i || (e.selectedIndex = -1), a
                    }
                }
            }
        }), $.each(["radio", "checkbox"], (function() {
            $.valHooks[this] = {
                set: function(e, t) {
                    if (Array.isArray(t)) return e.checked = -1 < $.inArray($(e).val(), t)
                }
            }, h.checkOn || ($.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        })), h.focusin = "onfocusin" in e;
        var bt = /^(?:focusinfocus|focusoutblur)$/,
            xt = function(e) {
                e.stopPropagation()
            };
        $.extend($.event, {
            trigger: function(t, i, o, a) {
                var n, r, l, c, d, f, p, h, v = [o || s],
                    _ = u.call(t, "type") ? t.type : t,
                    y = u.call(t, "namespace") ? t.namespace.split(".") : [];
                if (r = h = l = o = o || s, 3 !== o.nodeType && 8 !== o.nodeType && !bt.test(_ + $.event.triggered) && (-1 < _.indexOf(".") && (_ = (y = _.split(".")).shift(), y.sort()), d = _.indexOf(":") < 0 && "on" + _, (t = t[$.expando] ? t : new $.Event(_, "object" == typeof t && t)).isTrigger = a ? 2 : 3, t.namespace = y.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = o), i = null == i ? [t] : $.makeArray(i, [t]), p = $.event.special[_] || {}, a || !p.trigger || !1 !== p.trigger.apply(o, i))) {
                    if (!a && !p.noBubble && !g(o)) {
                        for (bt.test((c = p.delegateType || _) + _) || (r = r.parentNode); r; r = r.parentNode) v.push(r), l = r;
                        l === (o.ownerDocument || s) && v.push(l.defaultView || l.parentWindow || e)
                    }
                    for (n = 0;
                        (r = v[n++]) && !t.isPropagationStopped();) h = r, t.type = 1 < n ? c : p.bindType || _, (f = (J.get(r, "events") || {})[t.type] && J.get(r, "handle")) && f.apply(r, i), (f = d && r[d]) && f.apply && V(r) && (t.result = f.apply(r, i), !1 === t.result && t.preventDefault());
                    return t.type = _, a || t.isDefaultPrevented() || p._default && !1 !== p._default.apply(v.pop(), i) || !V(o) || d && m(o[_]) && !g(o) && ((l = o[d]) && (o[d] = null), $.event.triggered = _, t.isPropagationStopped() && h.addEventListener(_, xt), o[_](), t.isPropagationStopped() && h.removeEventListener(_, xt), $.event.triggered = void 0, l && (o[d] = l)), t.result
                }
            },
            simulate: function(e, t, i) {
                var s = $.extend(new $.Event, i, {
                    type: e,
                    isSimulated: !0
                });
                $.event.trigger(s, null, t)
            }
        }), $.fn.extend({
            trigger: function(e, t) {
                return this.each((function() {
                    $.event.trigger(e, t, this)
                }))
            },
            triggerHandler: function(e, t) {
                var i = this[0];
                if (i) return $.event.trigger(e, t, i, !0)
            }
        }), h.focusin || $.each({
            focus: "focusin",
            blur: "focusout"
        }, (function(e, t) {
            var i = function(e) {
                $.event.simulate(t, e.target, $.event.fix(e))
            };
            $.event.special[t] = {
                setup: function() {
                    var s = this.ownerDocument || this,
                        o = J.access(s, t);
                    o || s.addEventListener(e, i, !0), J.access(s, t, (o || 0) + 1)
                },
                teardown: function() {
                    var s = this.ownerDocument || this,
                        o = J.access(s, t) - 1;
                    o ? J.access(s, t, o) : (s.removeEventListener(e, i, !0), J.remove(s, t))
                }
            }
        }));
        var wt = e.location,
            Ot = Date.now(),
            St = /\?/;
        $.parseXML = function(t) {
            var i;
            if (!t || "string" != typeof t) return null;
            try {
                i = (new e.DOMParser).parseFromString(t, "text/xml")
            } catch (t) {
                i = void 0
            }
            return i && !i.getElementsByTagName("parsererror").length || $.error("Invalid XML: " + t), i
        };
        var kt = /\[\]$/,
            Tt = /\r?\n/g,
            At = /^(?:submit|button|image|reset|file)$/i,
            It = /^(?:input|select|textarea|keygen)/i;

        function Et(e, t, i, s) {
            var o;
            if (Array.isArray(t)) $.each(t, (function(t, o) {
                i || kt.test(e) ? s(e, o) : Et(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, i, s)
            }));
            else if (i || "object" !== y(t)) s(e, t);
            else
                for (o in t) Et(e + "[" + o + "]", t[o], i, s)
        }
        $.param = function(e, t) {
            var i, s = [],
                o = function(e, t) {
                    var i = m(t) ? t() : t;
                    s[s.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == i ? "" : i)
                };
            if (null == e) return "";
            if (Array.isArray(e) || e.jquery && !$.isPlainObject(e)) $.each(e, (function() {
                o(this.name, this.value)
            }));
            else
                for (i in e) Et(i, e[i], t, o);
            return s.join("&")
        }, $.fn.extend({
            serialize: function() {
                return $.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map((function() {
                    var e = $.prop(this, "elements");
                    return e ? $.makeArray(e) : this
                })).filter((function() {
                    var e = this.type;
                    return this.name && !$(this).is(":disabled") && It.test(this.nodeName) && !At.test(e) && (this.checked || !fe.test(e))
                })).map((function(e, t) {
                    var i = $(this).val();
                    return null == i ? null : Array.isArray(i) ? $.map(i, (function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Tt, "\r\n")
                        }
                    })) : {
                        name: t.name,
                        value: i.replace(Tt, "\r\n")
                    }
                })).get()
            }
        });
        var Pt = /%20/g,
            Dt = /#.*$/,
            Gt = /([?&])_=[^&]*/,
            jt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            qt = /^(?:GET|HEAD)$/,
            Ht = /^\/\//,
            Nt = {},
            Rt = {},
            Ft = "*/".concat("*"),
            Lt = s.createElement("a");

        function Mt(e) {
            return function(t, i) {
                "string" != typeof t && (i = t, t = "*");
                var s, o = 0,
                    a = t.toLowerCase().match(q) || [];
                if (m(i))
                    for (; s = a[o++];) "+" === s[0] ? (s = s.slice(1) || "*", (e[s] = e[s] || []).unshift(i)) : (e[s] = e[s] || []).push(i)
            }
        }

        function zt(e, t, i, s) {
            var o = {},
                a = e === Rt;

            function n(r) {
                var l;
                return o[r] = !0, $.each(e[r] || [], (function(e, r) {
                    var c = r(t, i, s);
                    return "string" != typeof c || a || o[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), n(c), !1)
                })), l
            }
            return n(t.dataTypes[0]) || !o["*"] && n("*")
        }

        function Wt(e, t) {
            var i, s, o = $.ajaxSettings.flatOptions || {};
            for (i in t) void 0 !== t[i] && ((o[i] ? e : s || (s = {}))[i] = t[i]);
            return s && $.extend(!0, e, s), e
        }
        Lt.href = wt.href, $.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: wt.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(wt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ft,
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
                    "text xml": $.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? Wt(Wt(e, $.ajaxSettings), t) : Wt($.ajaxSettings, e)
            },
            ajaxPrefilter: Mt(Nt),
            ajaxTransport: Mt(Rt),
            ajax: function(t, i) {
                "object" == typeof t && (i = t, t = void 0);
                var o, a, n, r, l, c, d, u, f, p, h = $.ajaxSetup({}, i = i || {}),
                    m = h.context || h,
                    g = h.context && (m.nodeType || m.jquery) ? $(m) : $.event,
                    v = $.Deferred(),
                    _ = $.Callbacks("once memory"),
                    y = h.statusCode || {},
                    C = {},
                    b = {},
                    x = "canceled",
                    w = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (d) {
                                if (!r)
                                    for (r = {}; t = jt.exec(n);) r[t[1].toLowerCase() + " "] = (r[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                t = r[e.toLowerCase() + " "]
                            }
                            return null == t ? null : t.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return d ? n : null
                        },
                        setRequestHeader: function(e, t) {
                            return null == d && (e = b[e.toLowerCase()] = b[e.toLowerCase()] || e, C[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return null == d && (h.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (d) w.always(e[w.status]);
                                else
                                    for (t in e) y[t] = [y[t], e[t]];
                            return this
                        },
                        abort: function(e) {
                            var t = e || x;
                            return o && o.abort(t), O(0, t), this
                        }
                    };
                if (v.promise(w), h.url = ((t || h.url || wt.href) + "").replace(Ht, wt.protocol + "//"), h.type = i.method || i.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(q) || [""], null == h.crossDomain) {
                    c = s.createElement("a");
                    try {
                        c.href = h.url, c.href = c.href, h.crossDomain = Lt.protocol + "//" + Lt.host != c.protocol + "//" + c.host
                    } catch (t) {
                        h.crossDomain = !0
                    }
                }
                if (h.data && h.processData && "string" != typeof h.data && (h.data = $.param(h.data, h.traditional)), zt(Nt, h, i, w), d) return w;
                for (f in (u = $.event && h.global) && 0 == $.active++ && $.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !qt.test(h.type), a = h.url.replace(Dt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Pt, "+")) : (p = h.url.slice(a.length), h.data && (h.processData || "string" == typeof h.data) && (a += (St.test(a) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (a = a.replace(Gt, "$1"), p = (St.test(a) ? "&" : "?") + "_=" + Ot++ + p), h.url = a + p), h.ifModified && ($.lastModified[a] && w.setRequestHeader("If-Modified-Since", $.lastModified[a]), $.etag[a] && w.setRequestHeader("If-None-Match", $.etag[a])), (h.data && h.hasContent && !1 !== h.contentType || i.contentType) && w.setRequestHeader("Content-Type", h.contentType), w.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Ft + "; q=0.01" : "") : h.accepts["*"]), h.headers) w.setRequestHeader(f, h.headers[f]);
                if (h.beforeSend && (!1 === h.beforeSend.call(m, w, h) || d)) return w.abort();
                if (x = "abort", _.add(h.complete), w.done(h.success), w.fail(h.error), o = zt(Rt, h, i, w)) {
                    if (w.readyState = 1, u && g.trigger("ajaxSend", [w, h]), d) return w;
                    h.async && 0 < h.timeout && (l = e.setTimeout((function() {
                        w.abort("timeout")
                    }), h.timeout));
                    try {
                        d = !1, o.send(C, O)
                    } catch (t) {
                        if (d) throw t;
                        O(-1, t)
                    }
                } else O(-1, "No Transport");

                function O(t, i, s, r) {
                    var c, f, p, C, b, x = i;
                    d || (d = !0, l && e.clearTimeout(l), o = void 0, n = r || "", w.readyState = 0 < t ? 4 : 0, c = 200 <= t && t < 300 || 304 === t, s && (C = function(e, t, i) {
                        for (var s, o, a, n, r = e.contents, l = e.dataTypes;
                            "*" === l[0];) l.shift(), void 0 === s && (s = e.mimeType || t.getResponseHeader("Content-Type"));
                        if (s)
                            for (o in r)
                                if (r[o] && r[o].test(s)) {
                                    l.unshift(o);
                                    break
                                } if (l[0] in i) a = l[0];
                        else {
                            for (o in i) {
                                if (!l[0] || e.converters[o + " " + l[0]]) {
                                    a = o;
                                    break
                                }
                                n || (n = o)
                            }
                            a = a || n
                        }
                        if (a) return a !== l[0] && l.unshift(a), i[a]
                    }(h, w, s)), C = function(e, t, i, s) {
                        var o, a, n, r, l, c = {},
                            d = e.dataTypes.slice();
                        if (d[1])
                            for (n in e.converters) c[n.toLowerCase()] = e.converters[n];
                        for (a = d.shift(); a;)
                            if (e.responseFields[a] && (i[e.responseFields[a]] = t), !l && s && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = a, a = d.shift())
                                if ("*" === a) a = l;
                                else if ("*" !== l && l !== a) {
                            if (!(n = c[l + " " + a] || c["* " + a]))
                                for (o in c)
                                    if ((r = o.split(" "))[1] === a && (n = c[l + " " + r[0]] || c["* " + r[0]])) {
                                        !0 === n ? n = c[o] : !0 !== c[o] && (a = r[0], d.unshift(r[1]));
                                        break
                                    } if (!0 !== n)
                                if (n && e.throws) t = n(t);
                                else try {
                                    t = n(t)
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: n ? e : "No conversion from " + l + " to " + a
                                    }
                                }
                        }
                        return {
                            state: "success",
                            data: t
                        }
                    }(h, C, w, c), c ? (h.ifModified && ((b = w.getResponseHeader("Last-Modified")) && ($.lastModified[a] = b), (b = w.getResponseHeader("etag")) && ($.etag[a] = b)), 204 === t || "HEAD" === h.type ? x = "nocontent" : 304 === t ? x = "notmodified" : (x = C.state, f = C.data, c = !(p = C.error))) : (p = x, !t && x || (x = "error", t < 0 && (t = 0))), w.status = t, w.statusText = (i || x) + "", c ? v.resolveWith(m, [f, x, w]) : v.rejectWith(m, [w, x, p]), w.statusCode(y), y = void 0, u && g.trigger(c ? "ajaxSuccess" : "ajaxError", [w, h, c ? f : p]), _.fireWith(m, [w, x]), u && (g.trigger("ajaxComplete", [w, h]), --$.active || $.event.trigger("ajaxStop")))
                }
                return w
            },
            getJSON: function(e, t, i) {
                return $.get(e, t, i, "json")
            },
            getScript: function(e, t) {
                return $.get(e, void 0, t, "script")
            }
        }), $.each(["get", "post"], (function(e, t) {
            $[t] = function(e, i, s, o) {
                return m(i) && (o = o || s, s = i, i = void 0), $.ajax($.extend({
                    url: e,
                    type: t,
                    dataType: o,
                    data: i,
                    success: s
                }, $.isPlainObject(e) && e))
            }
        })), $._evalUrl = function(e, t) {
            return $.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(e) {
                    $.globalEval(e, t)
                }
            })
        }, $.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (m(e) && (e = e.call(this[0])), t = $(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                })).append(this)), this
            },
            wrapInner: function(e) {
                return m(e) ? this.each((function(t) {
                    $(this).wrapInner(e.call(this, t))
                })) : this.each((function() {
                    var t = $(this),
                        i = t.contents();
                    i.length ? i.wrapAll(e) : t.append(e)
                }))
            },
            wrap: function(e) {
                var t = m(e);
                return this.each((function(i) {
                    $(this).wrapAll(t ? e.call(this, i) : e)
                }))
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each((function() {
                    $(this).replaceWith(this.childNodes)
                })), this
            }
        }), $.expr.pseudos.hidden = function(e) {
            return !$.expr.pseudos.visible(e)
        }, $.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, $.ajaxSettings.xhr = function() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {}
        };
        var Ut = {
                0: 200,
                1223: 204
            },
            Bt = $.ajaxSettings.xhr();
        h.cors = !!Bt && "withCredentials" in Bt, h.ajax = Bt = !!Bt, $.ajaxTransport((function(t) {
            var i, s;
            if (h.cors || Bt && !t.crossDomain) return {
                send: function(o, a) {
                    var n, r = t.xhr();
                    if (r.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (n in t.xhrFields) r[n] = t.xhrFields[n];
                    for (n in t.mimeType && r.overrideMimeType && r.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) r.setRequestHeader(n, o[n]);
                    i = function(e) {
                        return function() {
                            i && (i = s = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? a(0, "error") : a(r.status, r.statusText) : a(Ut[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                binary: r.response
                            } : {
                                text: r.responseText
                            }, r.getAllResponseHeaders()))
                        }
                    }, r.onload = i(), s = r.onerror = r.ontimeout = i("error"), void 0 !== r.onabort ? r.onabort = s : r.onreadystatechange = function() {
                        4 === r.readyState && e.setTimeout((function() {
                            i && s()
                        }))
                    }, i = i("abort");
                    try {
                        r.send(t.hasContent && t.data || null)
                    } catch (o) {
                        if (i) throw o
                    }
                },
                abort: function() {
                    i && i()
                }
            }
        })), $.ajaxPrefilter((function(e) {
            e.crossDomain && (e.contents.script = !1)
        })), $.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return $.globalEval(e), e
                }
            }
        }), $.ajaxPrefilter("script", (function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        })), $.ajaxTransport("script", (function(e) {
            var t, i;
            if (e.crossDomain || e.scriptAttrs) return {
                send: function(o, a) {
                    t = $("<script>").attr(e.scriptAttrs || {}).prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", i = function(e) {
                        t.remove(), i = null, e && a("error" === e.type ? 404 : 200, e.type)
                    }), s.head.appendChild(t[0])
                },
                abort: function() {
                    i && i()
                }
            }
        }));
        var Xt, Vt = [],
            Qt = /(=)\?(?=&|$)|\?\?/;
        $.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Vt.pop() || $.expando + "_" + Ot++;
                return this[e] = !0, e
            }
        }), $.ajaxPrefilter("json jsonp", (function(t, i, s) {
            var o, a, n, r = !1 !== t.jsonp && (Qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Qt.test(t.data) && "data");
            if (r || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = m(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, r ? t[r] = t[r].replace(Qt, "$1" + o) : !1 !== t.jsonp && (t.url += (St.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
                return n || $.error(o + " was not called"), n[0]
            }, t.dataTypes[0] = "json", a = e[o], e[o] = function() {
                n = arguments
            }, s.always((function() {
                void 0 === a ? $(e).removeProp(o) : e[o] = a, t[o] && (t.jsonpCallback = i.jsonpCallback, Vt.push(o)), n && m(a) && a(n[0]), n = a = void 0
            })), "script"
        })), h.createHTMLDocument = ((Xt = s.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Xt.childNodes.length), $.parseHTML = function(e, t, i) {
            return "string" != typeof e ? [] : ("boolean" == typeof t && (i = t, t = !1), t || (h.createHTMLDocument ? ((o = (t = s.implementation.createHTMLDocument("")).createElement("base")).href = s.location.href, t.head.appendChild(o)) : t = s), n = !i && [], (a = A.exec(e)) ? [t.createElement(a[1])] : (a = $e([e], t, n), n && n.length && $(n).remove(), $.merge([], a.childNodes)));
            var o, a, n
        }, $.fn.load = function(e, t, i) {
            var s, o, a, n = this,
                r = e.indexOf(" ");
            return -1 < r && (s = _t(e.slice(r)), e = e.slice(0, r)), m(t) ? (i = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < n.length && $.ajax({
                url: e,
                type: o || "GET",
                dataType: "html",
                data: t
            }).done((function(e) {
                a = arguments, n.html(s ? $("<div>").append($.parseHTML(e)).find(s) : e)
            })).always(i && function(e, t) {
                n.each((function() {
                    i.apply(this, a || [e.responseText, t, e])
                }))
            }), this
        }, $.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
            $.fn[t] = function(e) {
                return this.on(t, e)
            }
        })), $.expr.pseudos.animated = function(e) {
            return $.grep($.timers, (function(t) {
                return e === t.elem
            })).length
        }, $.offset = {
            setOffset: function(e, t, i) {
                var s, o, a, n, r, l, c = $.css(e, "position"),
                    d = $(e),
                    u = {};
                "static" === c && (e.style.position = "relative"), r = d.offset(), a = $.css(e, "top"), l = $.css(e, "left"), ("absolute" === c || "fixed" === c) && -1 < (a + l).indexOf("auto") ? (n = (s = d.position()).top, o = s.left) : (n = parseFloat(a) || 0, o = parseFloat(l) || 0), m(t) && (t = t.call(e, i, $.extend({}, r))), null != t.top && (u.top = t.top - r.top + n), null != t.left && (u.left = t.left - r.left + o), "using" in t ? t.using.call(e, u) : d.css(u)
            }
        }, $.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                    $.offset.setOffset(this, e, t)
                }));
                var t, i, s = this[0];
                return s ? s.getClientRects().length ? {
                    top: (t = s.getBoundingClientRect()).top + (i = s.ownerDocument.defaultView).pageYOffset,
                    left: t.left + i.pageXOffset
                } : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, i, s = this[0],
                        o = {
                            top: 0,
                            left: 0
                        };
                    if ("fixed" === $.css(s, "position")) t = s.getBoundingClientRect();
                    else {
                        for (t = this.offset(), i = s.ownerDocument, e = s.offsetParent || i.documentElement; e && (e === i.body || e === i.documentElement) && "static" === $.css(e, "position");) e = e.parentNode;
                        e && e !== s && 1 === e.nodeType && ((o = $(e).offset()).top += $.css(e, "borderTopWidth", !0), o.left += $.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - o.top - $.css(s, "marginTop", !0),
                        left: t.left - o.left - $.css(s, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map((function() {
                    for (var e = this.offsetParent; e && "static" === $.css(e, "position");) e = e.offsetParent;
                    return e || oe
                }))
            }
        }), $.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, (function(e, t) {
            var i = "pageYOffset" === t;
            $.fn[e] = function(s) {
                return z(this, (function(e, s, o) {
                    var a;
                    if (g(e) ? a = e : 9 === e.nodeType && (a = e.defaultView), void 0 === o) return a ? a[t] : e[s];
                    a ? a.scrollTo(i ? a.pageXOffset : o, i ? o : a.pageYOffset) : e[s] = o
                }), e, s, arguments.length)
            }
        })), $.each(["top", "left"], (function(e, t) {
            $.cssHooks[t] = We(h.pixelPosition, (function(e, i) {
                if (i) return i = ze(e, t), Fe.test(i) ? $(e).position()[t] + "px" : i
            }))
        })), $.each({
            Height: "height",
            Width: "width"
        }, (function(e, t) {
            $.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, (function(i, s) {
                $.fn[s] = function(o, a) {
                    var n = arguments.length && (i || "boolean" != typeof o),
                        r = i || (!0 === o || !0 === a ? "margin" : "border");
                    return z(this, (function(t, i, o) {
                        var a;
                        return g(t) ? 0 === s.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (a = t.documentElement, Math.max(t.body["scroll" + e], a["scroll" + e], t.body["offset" + e], a["offset" + e], a["client" + e])) : void 0 === o ? $.css(t, i, r) : $.style(t, i, o, r)
                    }), t, n ? o : void 0, n)
                }
            }))
        })), $.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
            $.fn[t] = function(e, i) {
                return 0 < arguments.length ? this.on(t, null, e, i) : this.trigger(t)
            }
        })), $.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), $.fn.extend({
            bind: function(e, t, i) {
                return this.on(e, null, t, i)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, i, s) {
                return this.on(t, e, i, s)
            },
            undelegate: function(e, t, i) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
            }
        }), $.proxy = function(e, t) {
            var i, s, o;
            if ("string" == typeof t && (i = e[t], t = e, e = i), m(e)) return s = a.call(arguments, 2), (o = function() {
                return e.apply(t || this, s.concat(a.call(arguments)))
            }).guid = e.guid = e.guid || $.guid++, o
        }, $.holdReady = function(e) {
            e ? $.readyWait++ : $.ready(!0)
        }, $.isArray = Array.isArray, $.parseJSON = JSON.parse, $.nodeName = T, $.isFunction = m, $.isWindow = g, $.camelCase = X, $.type = y, $.now = Date.now, $.isNumeric = function(e) {
            var t = $.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        }, "function" == typeof define && define.amd && define("jquery", [], (function() {
            return $
        }));
        var Jt = e.jQuery,
            Yt = e.$;
        return $.noConflict = function(t) {
            return e.$ === $ && (e.$ = Yt), t && e.jQuery === $ && (e.jQuery = Jt), $
        }, t || (e.jQuery = e.$ = $), $
    })), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
! function(e) {
    "use strict";
    var t = jQuery.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || 3 < t[0]) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(),
function(e) {
    "use strict";
    e.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            s = this;
        return e(this).one("bsTransitionEnd", (function() {
            i = !0
        })), setTimeout((function() {
            i || e(s).trigger(e.support.transition.end)
        }), t), this
    }, e((function() {
        e.support.transition = function() {
            var e = document.createElement("bootstrap"),
                t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var i in t)
                if (void 0 !== e.style[i]) return {
                    end: t[i]
                };
            return !1
        }(), e.support.transition && (e.event.special.bsTransitionEnd = {
            bindType: e.support.transition.end,
            delegateType: e.support.transition.end,
            handle: function(t) {
                if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    }))
}(jQuery),
function(e) {
    "use strict";
    var t = '[data-dismiss="alert"]',
        i = function(i) {
            e(i).on("click", t, this.close)
        };
    i.VERSION = "3.4.1", i.TRANSITION_DURATION = 150, i.prototype.close = function(t) {
        var s = e(this),
            o = s.attr("data-target");
        o || (o = (o = s.attr("href")) && o.replace(/.*(?=#[^\s]*$)/, "")), o = "#" === o ? [] : o;
        var a = e(document).find(o);

        function n() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        t && t.preventDefault(), a.length || (a = s.closest(".alert")), a.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (a.removeClass("in"), e.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    };
    var s = e.fn.alert;
    e.fn.alert = function(t) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.alert");
            o || s.data("bs.alert", o = new i(this)), "string" == typeof t && o[t].call(s)
        }))
    }, e.fn.alert.Constructor = i, e.fn.alert.noConflict = function() {
        return e.fn.alert = s, this
    }, e(document).on("click.bs.alert.data-api", t, i.prototype.close)
}(jQuery),
function(e) {
    "use strict";
    var t = function(i, s) {
        this.$element = e(i), this.options = e.extend({}, t.DEFAULTS, s), this.isLoading = !1
    };

    function i(i) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.button");
            o || s.data("bs.button", o = new t(this, "object" == typeof i && i)), "toggle" == i ? o.toggle() : i && o.setState(i)
        }))
    }
    t.VERSION = "3.4.1", t.DEFAULTS = {
        loadingText: "loading..."
    }, t.prototype.setState = function(t) {
        var i = "disabled",
            s = this.$element,
            o = s.is("input") ? "val" : "html",
            a = s.data();
        t += "Text", null == a.resetText && s.data("resetText", s[o]()), setTimeout(e.proxy((function() {
            s[o](null == a[t] ? this.options[t] : a[t]), "loadingText" == t ? (this.isLoading = !0, s.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, s.removeClass(i).removeAttr(i).prop(i, !1))
        }), this), 0)
    }, t.prototype.toggle = function() {
        var e = !0,
            t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (e = !1), t.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (e = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), e && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var s = e.fn.button;
    e.fn.button = i, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
        return e.fn.button = s, this
    }, e(document).on("click.bs.button.data-api", '[data-toggle^="button"]', (function(t) {
        var s = e(t.target).closest(".btn");
        i.call(s, "toggle"), e(t.target).is('input[type="radio"], input[type="checkbox"]') || (t.preventDefault(), s.is("input,button") ? s.trigger("focus") : s.find("input:visible,button:visible").first().trigger("focus"))
    })).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', (function(t) {
        e(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    }))
}(jQuery),
function(e) {
    "use strict";
    var t = function(t, i) {
        this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", e.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", e.proxy(this.pause, this)).on("mouseleave.bs.carousel", e.proxy(this.cycle, this))
    };

    function i(i) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.carousel"),
                a = e.extend({}, t.DEFAULTS, s.data(), "object" == typeof i && i),
                n = "string" == typeof i ? i : a.slide;
            o || s.data("bs.carousel", o = new t(this, a)), "number" == typeof i ? o.to(i) : n ? o[n]() : a.interval && o.pause().cycle()
        }))
    }
    t.VERSION = "3.4.1", t.TRANSITION_DURATION = 600, t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, t.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            e.preventDefault()
        }
    }, t.prototype.cycle = function(t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
    }, t.prototype.getItemIndex = function(e) {
        return this.$items = e.parent().children(".item"), this.$items.index(e || this.$active)
    }, t.prototype.getItemForDirection = function(e, t) {
        var i = this.getItemIndex(t);
        return ("prev" == e && 0 === i || "next" == e && i == this.$items.length - 1) && !this.options.wrap ? t : this.$items.eq((i + ("prev" == e ? -1 : 1)) % this.$items.length)
    }, t.prototype.to = function(e) {
        var t = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(e > this.$items.length - 1 || e < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", (function() {
            t.to(e)
        })) : i == e ? this.pause().cycle() : this.slide(i < e ? "next" : "prev", this.$items.eq(e))
    }, t.prototype.pause = function(t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, t.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, t.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, t.prototype.slide = function(i, s) {
        var o = this.$element.find(".item.active"),
            a = s || this.getItemForDirection(i, o),
            n = this.interval,
            r = "next" == i ? "left" : "right",
            l = this;
        if (a.hasClass("active")) return this.sliding = !1;
        var c = a[0],
            d = e.Event("slide.bs.carousel", {
                relatedTarget: c,
                direction: r
            });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, n && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var u = e(this.$indicators.children()[this.getItemIndex(a)]);
                u && u.addClass("active")
            }
            var f = e.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: r
            });
            return e.support.transition && this.$element.hasClass("slide") ? (a.addClass(i), o.addClass(r), a.addClass(r), o.one("bsTransitionEnd", (function() {
                a.removeClass([i, r].join(" ")).addClass("active"), o.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout((function() {
                    l.$element.trigger(f)
                }), 0)
            })).emulateTransitionEnd(t.TRANSITION_DURATION)) : (o.removeClass("active"), a.addClass("active"), this.sliding = !1, this.$element.trigger(f)), n && this.cycle(), this
        }
    };
    var s = e.fn.carousel;
    e.fn.carousel = i, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
        return e.fn.carousel = s, this
    };
    var o = function(t) {
        var s = e(this),
            o = s.attr("href");
        o && (o = o.replace(/.*(?=#[^\s]+$)/, ""));
        var a = s.attr("data-target") || o,
            n = e(document).find(a);
        if (n.hasClass("carousel")) {
            var r = e.extend({}, n.data(), s.data()),
                l = s.attr("data-slide-to");
            l && (r.interval = !1), i.call(n, r), l && n.data("bs.carousel").to(l), t.preventDefault()
        }
    };
    e(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), e(window).on("load", (function() {
        e('[data-ride="carousel"]').each((function() {
            var t = e(this);
            i.call(t, t.data())
        }))
    }))
}(jQuery),
function(e) {
    "use strict";
    var t = function(i, s) {
        this.$element = e(i), this.options = e.extend({}, t.DEFAULTS, s), this.$trigger = e('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };

    function i(t) {
        var i, s = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return e(document).find(s)
    }

    function s(i) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.collapse"),
                a = e.extend({}, t.DEFAULTS, s.data(), "object" == typeof i && i);
            !o && a.toggle && /show|hide/.test(i) && (a.toggle = !1), o || s.data("bs.collapse", o = new t(this, a)), "string" == typeof i && o[i]()
        }))
    }
    t.VERSION = "3.4.1", t.TRANSITION_DURATION = 350, t.DEFAULTS = {
        toggle: !0
    }, t.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }, t.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var i, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(o && o.length && (i = o.data("bs.collapse")) && i.transitioning)) {
                var a = e.Event("show.bs.collapse");
                if (this.$element.trigger(a), !a.isDefaultPrevented()) {
                    o && o.length && (s.call(o, "hide"), i || o.data("bs.collapse", null));
                    var n = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[n](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[n](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!e.support.transition) return r.call(this);
                    var l = e.camelCase(["scroll", n].join("-"));
                    this.$element.one("bsTransitionEnd", e.proxy(r, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[n](this.$element[0][l])
                }
            }
        }
    }, t.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var i = e.Event("hide.bs.collapse");
            if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                var s = this.dimension();
                this.$element[s](this.$element[s]()), this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var o = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                if (!e.support.transition) return o.call(this);
                this.$element[s](0).one("bsTransitionEnd", e.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)
            }
        }
    }, t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, t.prototype.getParent = function() {
        return e(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(e.proxy((function(t, s) {
            var o = e(s);
            this.addAriaAndCollapsedClass(i(o), o)
        }), this)).end()
    }, t.prototype.addAriaAndCollapsedClass = function(e, t) {
        var i = e.hasClass("in");
        e.attr("aria-expanded", i), t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var o = e.fn.collapse;
    e.fn.collapse = s, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
        return e.fn.collapse = o, this
    }, e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', (function(t) {
        var o = e(this);
        o.attr("data-target") || t.preventDefault();
        var a = i(o),
            n = a.data("bs.collapse") ? "toggle" : o.data();
        s.call(a, n)
    }))
}(jQuery),
function(e) {
    "use strict";
    var t = '[data-toggle="dropdown"]',
        i = function(t) {
            e(t).on("click.bs.dropdown", this.toggle)
        };

    function s(t) {
        var i = t.attr("data-target");
        i || (i = (i = t.attr("href")) && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var s = "#" !== i ? e(document).find(i) : null;
        return s && s.length ? s : t.parent()
    }

    function o(i) {
        i && 3 === i.which || (e(".dropdown-backdrop").remove(), e(t).each((function() {
            var t = e(this),
                o = s(t),
                a = {
                    relatedTarget: this
                };
            o.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && e.contains(o[0], i.target) || (o.trigger(i = e.Event("hide.bs.dropdown", a)), i.isDefaultPrevented() || (t.attr("aria-expanded", "false"), o.removeClass("open").trigger(e.Event("hidden.bs.dropdown", a)))))
        })))
    }
    i.VERSION = "3.4.1", i.prototype.toggle = function(t) {
        var i = e(this);
        if (!i.is(".disabled, :disabled")) {
            var a = s(i),
                n = a.hasClass("open");
            if (o(), !n) {
                "ontouchstart" in document.documentElement && !a.closest(".navbar-nav").length && e(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click", o);
                var r = {
                    relatedTarget: this
                };
                if (a.trigger(t = e.Event("show.bs.dropdown", r)), t.isDefaultPrevented()) return;
                i.trigger("focus").attr("aria-expanded", "true"), a.toggleClass("open").trigger(e.Event("shown.bs.dropdown", r))
            }
            return !1
        }
    }, i.prototype.keydown = function(i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = e(this);
            if (i.preventDefault(), i.stopPropagation(), !o.is(".disabled, :disabled")) {
                var a = s(o),
                    n = a.hasClass("open");
                if (!n && 27 != i.which || n && 27 == i.which) return 27 == i.which && a.find(t).trigger("focus"), o.trigger("click");
                var r = a.find(".dropdown-menu li:not(.disabled):visible a");
                if (r.length) {
                    var l = r.index(i.target);
                    38 == i.which && 0 < l && l--, 40 == i.which && l < r.length - 1 && l++, ~l || (l = 0), r.eq(l).trigger("focus")
                }
            }
        }
    };
    var a = e.fn.dropdown;
    e.fn.dropdown = function(t) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.dropdown");
            o || s.data("bs.dropdown", o = new i(this)), "string" == typeof t && o[t].call(s)
        }))
    }, e.fn.dropdown.Constructor = i, e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = a, this
    }, e(document).on("click.bs.dropdown.data-api", o).on("click.bs.dropdown.data-api", ".dropdown form", (function(e) {
        e.stopPropagation()
    })).on("click.bs.dropdown.data-api", t, i.prototype.toggle).on("keydown.bs.dropdown.data-api", t, i.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", i.prototype.keydown)
}(jQuery),
function(e) {
    "use strict";
    var t = function(t, i) {
        this.options = i, this.$body = e(document.body), this.$element = e(t), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.fixedContent = ".navbar-fixed-top, .navbar-fixed-bottom", this.options.remote && this.$element.find(".modal-content").load(this.options.remote, e.proxy((function() {
            this.$element.trigger("loaded.bs.modal")
        }), this))
    };

    function i(i, s) {
        return this.each((function() {
            var o = e(this),
                a = o.data("bs.modal"),
                n = e.extend({}, t.DEFAULTS, o.data(), "object" == typeof i && i);
            a || o.data("bs.modal", a = new t(this, n)), "string" == typeof i ? a[i](s) : n.show && a.show(s)
        }))
    }
    t.VERSION = "3.4.1", t.TRANSITION_DURATION = 300, t.BACKDROP_TRANSITION_DURATION = 150, t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, t.prototype.toggle = function(e) {
        return this.isShown ? this.hide() : this.show(e)
    }, t.prototype.show = function(i) {
        var s = this,
            o = e.Event("show.bs.modal", {
                relatedTarget: i
            });
        this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", (function() {
            s.$element.one("mouseup.dismiss.bs.modal", (function(t) {
                e(t.target).is(s.$element) && (s.ignoreBackdropClick = !0)
            }))
        })), this.backdrop((function() {
            var o = e.support.transition && s.$element.hasClass("fade");
            s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), s.$element.addClass("in"), s.enforceFocus();
            var a = e.Event("shown.bs.modal", {
                relatedTarget: i
            });
            o ? s.$dialog.one("bsTransitionEnd", (function() {
                s.$element.trigger("focus").trigger(a)
            })).emulateTransitionEnd(t.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(a)
        })))
    }, t.prototype.hide = function(i) {
        i && i.preventDefault(), i = e.Event("hide.bs.modal"), this.$element.trigger(i), this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", e.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal())
    }, t.prototype.enforceFocus = function() {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy((function(e) {
            document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
        }), this))
    }, t.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", e.proxy((function(e) {
            27 == e.which && this.hide()
        }), this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, t.prototype.resize = function() {
        this.isShown ? e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this)) : e(window).off("resize.bs.modal")
    }, t.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(), this.backdrop((function() {
            e.$body.removeClass("modal-open"), e.resetAdjustments(), e.resetScrollbar(), e.$element.trigger("hidden.bs.modal")
        }))
    }, t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, t.prototype.backdrop = function(i) {
        var s = this,
            o = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var a = e.support.transition && o;
            if (this.$backdrop = e(document.createElement("div")).addClass("modal-backdrop " + o).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", e.proxy((function(e) {
                    this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
                }), this)), this.$backdrop.addClass("in"), !i) return;
            a ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var n = function() {
                s.removeBackdrop(), i && i()
            };
            e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", n).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : n()
        } else i && i()
    }, t.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, t.prototype.adjustDialog = function() {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
        })
    }, t.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, t.prototype.checkScrollbar = function() {
        var e = window.innerWidth;
        if (!e) {
            var t = document.documentElement.getBoundingClientRect();
            e = t.right - Math.abs(t.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < e, this.scrollbarWidth = this.measureScrollbar()
    }, t.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        var i = this.scrollbarWidth;
        this.bodyIsOverflowing && (this.$body.css("padding-right", t + i), e(this.fixedContent).each((function(t, s) {
            var o = s.style.paddingRight,
                a = e(s).css("padding-right");
            e(s).data("padding-right", o).css("padding-right", parseFloat(a) + i + "px")
        })))
    }, t.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad), e(this.fixedContent).each((function(t, i) {
            var s = e(i).data("padding-right");
            e(i).removeData("padding-right"), i.style.paddingRight = s || ""
        }))
    }, t.prototype.measureScrollbar = function() {
        var e = document.createElement("div");
        e.className = "modal-scrollbar-measure", this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        return this.$body[0].removeChild(e), t
    };
    var s = e.fn.modal;
    e.fn.modal = i, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
        return e.fn.modal = s, this
    }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', (function(t) {
        var s = e(this),
            o = s.attr("href"),
            a = s.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, ""),
            n = e(document).find(a),
            r = n.data("bs.modal") ? "toggle" : e.extend({
                remote: !/#/.test(o) && o
            }, n.data(), s.data());
        s.is("a") && t.preventDefault(), n.one("show.bs.modal", (function(e) {
            e.isDefaultPrevented() || n.one("hidden.bs.modal", (function() {
                s.is(":visible") && s.trigger("focus")
            }))
        })), i.call(n, r, this)
    }))
}(jQuery),
function(e) {
    "use strict";
    var t = ["sanitize", "whiteList", "sanitizeFn"],
        i = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        s = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        o = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

    function a(t, a) {
        var n = t.nodeName.toLowerCase();
        if (-1 !== e.inArray(n, a)) return -1 === e.inArray(n, i) || Boolean(t.nodeValue.match(s) || t.nodeValue.match(o));
        for (var r = e(a).filter((function(e, t) {
                return t instanceof RegExp
            })), l = 0, c = r.length; l < c; l++)
            if (n.match(r[l])) return !0;
        return !1
    }

    function n(t, i, s) {
        if (0 === t.length) return t;
        if (s && "function" == typeof s) return s(t);
        if (!document.implementation || !document.implementation.createHTMLDocument) return t;
        var o = document.implementation.createHTMLDocument("sanitization");
        o.body.innerHTML = t;
        for (var n = e.map(i, (function(e, t) {
                return t
            })), r = e(o.body).find("*"), l = 0, c = r.length; l < c; l++) {
            var d = r[l],
                u = d.nodeName.toLowerCase();
            if (-1 !== e.inArray(u, n))
                for (var f = e.map(d.attributes, (function(e) {
                        return e
                    })), p = [].concat(i["*"] || [], i[u] || []), h = 0, m = f.length; h < m; h++) a(f[h], p) || d.removeAttribute(f[h].nodeName);
            else d.parentNode.removeChild(d)
        }
        return o.body.innerHTML
    }
    var r = function(e, t) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", e, t)
    };
    r.VERSION = "3.4.1", r.TRANSITION_DURATION = 150, r.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        },
        sanitize: !0,
        sanitizeFn: null,
        whiteList: {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }
    }, r.prototype.init = function(t, i, s) {
        if (this.enabled = !0, this.type = t, this.$element = e(i), this.options = this.getOptions(s), this.$viewport = this.options.viewport && e(document).find(e.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var o = this.options.trigger.split(" "), a = o.length; a--;) {
            var n = o[a];
            if ("click" == n) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
            else if ("manual" != n) {
                var r = "hover" == n ? "mouseleave" : "focusout";
                this.$element.on(("hover" == n ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(r + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, r.prototype.getDefaults = function() {
        return r.DEFAULTS
    }, r.prototype.getOptions = function(i) {
        var s = this.$element.data();
        for (var o in s) s.hasOwnProperty(o) && -1 !== e.inArray(o, t) && delete s[o];
        return (i = e.extend({}, this.getDefaults(), s, i)).delay && "number" == typeof i.delay && (i.delay = {
            show: i.delay,
            hide: i.delay
        }), i.sanitize && (i.template = n(i.template, i.whiteList, i.sanitizeFn)), i
    }, r.prototype.getDelegateOptions = function() {
        var t = {},
            i = this.getDefaults();
        return this._options && e.each(this._options, (function(e, s) {
            i[e] != s && (t[e] = s)
        })), t
    }, r.prototype.enter = function(t) {
        var i = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i)), t instanceof e.Event && (i.inState["focusin" == t.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState) i.hoverState = "in";
        else {
            if (clearTimeout(i.timeout), i.hoverState = "in", !i.options.delay || !i.options.delay.show) return i.show();
            i.timeout = setTimeout((function() {
                "in" == i.hoverState && i.show()
            }), i.options.delay.show)
        }
    }, r.prototype.isInStateTrue = function() {
        for (var e in this.inState)
            if (this.inState[e]) return !0;
        return !1
    }, r.prototype.leave = function(t) {
        var i = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i)), t instanceof e.Event && (i.inState["focusout" == t.type ? "focus" : "hover"] = !1), !i.isInStateTrue()) {
            if (clearTimeout(i.timeout), i.hoverState = "out", !i.options.delay || !i.options.delay.hide) return i.hide();
            i.timeout = setTimeout((function() {
                "out" == i.hoverState && i.hide()
            }), i.options.delay.hide)
        }
    }, r.prototype.show = function() {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var i = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !i) return;
            var s = this,
                o = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
            var n = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                c = l.test(n);
            c && (n = n.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(n).data("bs." + this.type, this), this.options.container ? o.appendTo(e(document).find(this.options.container)) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition(),
                u = o[0].offsetWidth,
                f = o[0].offsetHeight;
            if (c) {
                var p = n,
                    h = this.getPosition(this.$viewport);
                n = "bottom" == n && d.bottom + f > h.bottom ? "top" : "top" == n && d.top - f < h.top ? "bottom" : "right" == n && d.right + u > h.width ? "left" : "left" == n && d.left - u < h.left ? "right" : n, o.removeClass(p).addClass(n)
            }
            var m = this.getCalculatedOffset(n, d, u, f);
            this.applyPlacement(m, n);
            var g = function() {
                var e = s.hoverState;
                s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == e && s.leave(s)
            };
            e.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", g).emulateTransitionEnd(r.TRANSITION_DURATION) : g()
        }
    }, r.prototype.applyPlacement = function(t, i) {
        var s = this.tip(),
            o = s[0].offsetWidth,
            a = s[0].offsetHeight,
            n = parseInt(s.css("margin-top"), 10),
            r = parseInt(s.css("margin-left"), 10);
        isNaN(n) && (n = 0), isNaN(r) && (r = 0), t.top += n, t.left += r, e.offset.setOffset(s[0], e.extend({
            using: function(e) {
                s.css({
                    top: Math.round(e.top),
                    left: Math.round(e.left)
                })
            }
        }, t), 0), s.addClass("in");
        var l = s[0].offsetWidth,
            c = s[0].offsetHeight;
        "top" == i && c != a && (t.top = t.top + a - c);
        var d = this.getViewportAdjustedDelta(i, t, l, c);
        d.left ? t.left += d.left : t.top += d.top;
        var u = /top|bottom/.test(i),
            f = u ? 2 * d.left - o + l : 2 * d.top - a + c,
            p = u ? "offsetWidth" : "offsetHeight";
        s.offset(t), this.replaceArrow(f, s[0][p], u)
    }, r.prototype.replaceArrow = function(e, t, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - e / t) + "%").css(i ? "top" : "left", "")
    }, r.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle();
        this.options.html ? (this.options.sanitize && (t = n(t, this.options.whiteList, this.options.sanitizeFn)), e.find(".tooltip-inner").html(t)) : e.find(".tooltip-inner").text(t), e.removeClass("fade in top bottom left right")
    }, r.prototype.hide = function(t) {
        var i = this,
            s = e(this.$tip),
            o = e.Event("hide.bs." + this.type);

        function a() {
            "in" != i.hoverState && s.detach(), i.$element && i.$element.removeAttr("aria-describedby").trigger("hidden.bs." + i.type), t && t()
        }
        if (this.$element.trigger(o), !o.isDefaultPrevented()) return s.removeClass("in"), e.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", a).emulateTransitionEnd(r.TRANSITION_DURATION) : a(), this.hoverState = null, this
    }, r.prototype.fixTitle = function() {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, r.prototype.hasContent = function() {
        return this.getTitle()
    }, r.prototype.getPosition = function(t) {
        var i = (t = t || this.$element)[0],
            s = "BODY" == i.tagName,
            o = i.getBoundingClientRect();
        null == o.width && (o = e.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top
        }));
        var a = window.SVGElement && i instanceof window.SVGElement,
            n = s ? {
                top: 0,
                left: 0
            } : a ? null : t.offset(),
            r = {
                scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            l = s ? {
                width: e(window).width(),
                height: e(window).height()
            } : null;
        return e.extend({}, o, r, l, n)
    }, r.prototype.getCalculatedOffset = function(e, t, i, s) {
        return "bottom" == e ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - i / 2
        } : "top" == e ? {
            top: t.top - s,
            left: t.left + t.width / 2 - i / 2
        } : "left" == e ? {
            top: t.top + t.height / 2 - s / 2,
            left: t.left - i
        } : {
            top: t.top + t.height / 2 - s / 2,
            left: t.left + t.width
        }
    }, r.prototype.getViewportAdjustedDelta = function(e, t, i, s) {
        var o = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return o;
        var a = this.options.viewport && this.options.viewport.padding || 0,
            n = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
            var r = t.top - a - n.scroll,
                l = t.top + a - n.scroll + s;
            r < n.top ? o.top = n.top - r : l > n.top + n.height && (o.top = n.top + n.height - l)
        } else {
            var c = t.left - a,
                d = t.left + a + i;
            c < n.left ? o.left = n.left - c : d > n.right && (o.left = n.left + n.width - d)
        }
        return o
    }, r.prototype.getTitle = function() {
        var e = this.$element,
            t = this.options;
        return e.attr("data-original-title") || ("function" == typeof t.title ? t.title.call(e[0]) : t.title)
    }, r.prototype.getUID = function(e) {
        for (; e += ~~(1e6 * Math.random()), document.getElementById(e););
        return e
    }, r.prototype.tip = function() {
        if (!this.$tip && (this.$tip = e(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, r.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, r.prototype.enable = function() {
        this.enabled = !0
    }, r.prototype.disable = function() {
        this.enabled = !1
    }, r.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, r.prototype.toggle = function(t) {
        var i = this;
        t && ((i = e(t.currentTarget).data("bs." + this.type)) || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i))), t ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, r.prototype.destroy = function() {
        var e = this;
        clearTimeout(this.timeout), this.hide((function() {
            e.$element.off("." + e.type).removeData("bs." + e.type), e.$tip && e.$tip.detach(), e.$tip = null, e.$arrow = null, e.$viewport = null, e.$element = null
        }))
    }, r.prototype.sanitizeHtml = function(e) {
        return n(e, this.options.whiteList, this.options.sanitizeFn)
    };
    var l = e.fn.tooltip;
    e.fn.tooltip = function(t) {
        return this.each((function() {
            var i = e(this),
                s = i.data("bs.tooltip"),
                o = "object" == typeof t && t;
            !s && /destroy|hide/.test(t) || (s || i.data("bs.tooltip", s = new r(this, o)), "string" == typeof t && s[t]())
        }))
    }, e.fn.tooltip.Constructor = r, e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = l, this
    }
}(jQuery),
function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.4.1", t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), ((t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype)).constructor = t).prototype.getDefaults = function() {
        return t.DEFAULTS
    }, t.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle(),
            i = this.getContent();
        if (this.options.html) {
            var s = typeof i;
            this.options.sanitize && (t = this.sanitizeHtml(t), "string" === s && (i = this.sanitizeHtml(i))), e.find(".popover-title").html(t), e.find(".popover-content").children().detach().end()["string" === s ? "html" : "append"](i)
        } else e.find(".popover-title").text(t), e.find(".popover-content").children().detach().end().text(i);
        e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
    }, t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, t.prototype.getContent = function() {
        var e = this.$element,
            t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
    }, t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = e.fn.popover;
    e.fn.popover = function(i) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.popover"),
                a = "object" == typeof i && i;
            !o && /destroy|hide/.test(i) || (o || s.data("bs.popover", o = new t(this, a)), "string" == typeof i && o[i]())
        }))
    }, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
        return e.fn.popover = i, this
    }
}(jQuery),
function(e) {
    "use strict";

    function t(i, s) {
        this.$body = e(document.body), this.$scrollElement = e(i).is(document.body) ? e(window) : e(i), this.options = e.extend({}, t.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.scrollspy");
            o || s.data("bs.scrollspy", o = new t(this, "object" == typeof i && i)), "string" == typeof i && o[i]()
        }))
    }
    t.VERSION = "3.4.1", t.DEFAULTS = {
        offset: 10
    }, t.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, t.prototype.refresh = function() {
        var t = this,
            i = "offset",
            s = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), e.isWindow(this.$scrollElement[0]) || (i = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map((function() {
            var t = e(this),
                o = t.data("target") || t.attr("href"),
                a = /^#./.test(o) && e(o);
            return a && a.length && a.is(":visible") && [
                [a[i]().top + s, o]
            ] || null
        })).sort((function(e, t) {
            return e[0] - t[0]
        })).each((function() {
            t.offsets.push(this[0]), t.targets.push(this[1])
        }))
    }, t.prototype.process = function() {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            s = this.options.offset + i - this.$scrollElement.height(),
            o = this.offsets,
            a = this.targets,
            n = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), s <= t) return n != (e = a[a.length - 1]) && this.activate(e);
        if (n && t < o[0]) return this.activeTarget = null, this.clear();
        for (e = o.length; e--;) n != a[e] && t >= o[e] && (void 0 === o[e + 1] || t < o[e + 1]) && this.activate(a[e])
    }, t.prototype.activate = function(t) {
        this.activeTarget = t, this.clear();
        var i = e(this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]').parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, t.prototype.clear = function() {
        e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var s = e.fn.scrollspy;
    e.fn.scrollspy = i, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function() {
        return e.fn.scrollspy = s, this
    }, e(window).on("load.bs.scrollspy.data-api", (function() {
        e('[data-spy="scroll"]').each((function() {
            var t = e(this);
            i.call(t, t.data())
        }))
    }))
}(jQuery),
function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };

    function i(i) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.tab");
            o || s.data("bs.tab", o = new t(this)), "string" == typeof i && o[i]()
        }))
    }
    t.VERSION = "3.4.1", t.TRANSITION_DURATION = 150, t.prototype.show = function() {
        var t = this.element,
            i = t.closest("ul:not(.dropdown-menu)"),
            s = t.data("target");
        if (s || (s = (s = t.attr("href")) && s.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var o = i.find(".active:last a"),
                a = e.Event("hide.bs.tab", {
                    relatedTarget: t[0]
                }),
                n = e.Event("show.bs.tab", {
                    relatedTarget: o[0]
                });
            if (o.trigger(a), t.trigger(n), !n.isDefaultPrevented() && !a.isDefaultPrevented()) {
                var r = e(document).find(s);
                this.activate(t.closest("li"), i), this.activate(r, r.parent(), (function() {
                    o.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: t[0]
                    }), t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o[0]
                    })
                }))
            }
        }
    }, t.prototype.activate = function(i, s, o) {
        var a = s.find("> .active"),
            n = o && e.support.transition && (a.length && a.hasClass("fade") || !!s.find("> .fade").length);

        function r() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), n ? i.addClass("in") : i.removeClass("fade"), i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
        }
        a.length && n ? a.one("bsTransitionEnd", r).emulateTransitionEnd(t.TRANSITION_DURATION) : r(), a.removeClass("in")
    };
    var s = e.fn.tab;
    e.fn.tab = i, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
        return e.fn.tab = s, this
    };
    var o = function(t) {
        t.preventDefault(), i.call(e(this), "show")
    };
    e(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
}(jQuery),
function(e) {
    "use strict";
    var t = function(i, s) {
        this.options = e.extend({}, t.DEFAULTS, s);
        var o = this.options.target === t.DEFAULTS.target ? e(this.options.target) : e(document).find(this.options.target);
        this.$target = o.on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), this.$element = e(i), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };

    function i(i) {
        return this.each((function() {
            var s = e(this),
                o = s.data("bs.affix");
            o || s.data("bs.affix", o = new t(this, "object" == typeof i && i)), "string" == typeof i && o[i]()
        }))
    }
    t.VERSION = "3.4.1", t.RESET = "affix affix-top affix-bottom", t.DEFAULTS = {
        offset: 0,
        target: window
    }, t.prototype.getState = function(e, t, i, s) {
        var o = this.$target.scrollTop(),
            a = this.$element.offset(),
            n = this.$target.height();
        if (null != i && "top" == this.affixed) return o < i && "top";
        if ("bottom" == this.affixed) return null != i ? !(o + this.unpin <= a.top) && "bottom" : !(o + n <= e - s) && "bottom";
        var r = null == this.affixed;
        return null != i && o <= i ? "top" : null != s && e - s <= (r ? o : a.top) + (r ? n : t) && "bottom"
    }, t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var e = this.$target.scrollTop(),
            i = this.$element.offset();
        return this.pinnedOffset = i.top - e
    }, t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }, t.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var i = this.$element.height(),
                s = this.options.offset,
                o = s.top,
                a = s.bottom,
                n = Math.max(e(document).height(), e(document.body).height());
            "object" != typeof s && (a = o = s), "function" == typeof o && (o = s.top(this.$element)), "function" == typeof a && (a = s.bottom(this.$element));
            var r = this.getState(n, i, o, a);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : ""),
                    c = e.Event(l + ".bs.affix");
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(t.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == r && this.$element.offset({
                top: n - i - a
            })
        }
    };
    var s = e.fn.affix;
    e.fn.affix = i, e.fn.affix.Constructor = t, e.fn.affix.noConflict = function() {
        return e.fn.affix = s, this
    }, e(window).on("load", (function() {
        e('[data-spy="affix"]').each((function() {
            var t = e(this),
                s = t.data();
            s.offset = s.offset || {}, null != s.offsetBottom && (s.offset.bottom = s.offsetBottom), null != s.offsetTop && (s.offset.top = s.offsetTop), i.call(t, s)
        }))
    }))
}(jQuery);
var SDGGoals = {
        linking: [{
            id: 1,
            text1: "",
            text10: "If India stops inequality from rising further, it could end extreme poverty for 90 million people by 2019. If it goes further and reduces inequality by 36%, it could virtually eliminate extreme poverty.",
            text11: "Around 8.8 million households live in urban slums. The \u2018Housing for All by 2022\u2019 Mission will promote affordable urban housing through credit-linked subsidies, slum rehabilitation, and public-private partnerships.",
            text12: "",
            text13: "Climate change could encumber India\u2019s economic progress, pushing 45 million Indians into extreme poverty over the next 15 years. Further the poor are the most vulnerable to the adverse effects of climate change. India has ratified the Paris Agreement, dealing with greenhouse gases emissions mitigation, climate change adaptation and financing.",
            text14: "",
            text15: "Biodiversity and ecosystem services offer equitable and fair access to natural resources.",
            text16: "Corruption, bribery, theft and tax evasion cost developing countries around US$1.26 trillion per year; money that could be used to lift many out of poverty. Many of the countries that did not achieve their Millennium Development Goal targets by 2015 were countries experiencing armed conflict and instability.",
            text17: "Accelerated investment in poverty eradication will be fostered by policy frameworks at the regional and international levels which are based on pro-poor development strategies.",
            text2: "India accounts for the largest number of people living below the international poverty line of US$ 1.90 a day \u2013 224 million, and the largest number of people below the food poverty line \u2013 195 million.",
            text3: "Healthcare costs can neutralize gains from income increases and poverty eradication schemes. National Health Protection Scheme intends to provide health insurance cover to poor households.",
            text4: "Poverty can influence mental capacities. The success of the Mid-Day Meal Programme in improving enrollment and retention shows the importance of hunger in determining drop-out rates.",
            text5: "Female labour force participation has been on a declining trend since 2004-05. By IMF estimates, equal participation of women in the workforce will increase India\u2019s GDP by 27%.",
            text6: "Inadequate sanitation causes economic losses, equivalent to 6.4% of India's GDP in 2006. Nearly half the population defecates in the open. Swachh Bharat Mission aims to make India open defecation free, clean and sanitised by 2019.",
            text7: "237 million Indians have no access to energy. Access to modern and sustainable energy is fundamental for eliminating poverty. Government aims to achieve 100% village electrification by 2018.",
            text8: "Around 92% of employment in India is informal in nature (unorganized sector workers plus informal workers in the organized sector). The vast majority of untrained labour goes into such low productivity jobs.",
            text9: "Job creation by industrial expansion is the way forward along with redistributive policies to solve the problem of high poverty rates."
        }, {
            id: 2,
            text1: "Poverty is responsible for hunger, but malnutrition itself can push people into poverty by eroding their physical and mental development and well-being, and therefore capacity to study, work, and earn a living.",
            text10: "Inequality and hunger are inextricably linked. Hunger and malnutrition (60% of the world's hungry are women) are rooted in inequalities of social, political, and economic power.",
            text11: "Poor households from rural areas often migrate to cities due to hunger. Proportion of urban children who are stunted and wasted is high even in prosperous states. Better livelihood security for the urban poor is essential for urban food security.",
            text12: "",
            text13: "Climate change would have significant impacts on undernutrition even if the beneficial effects of economic growth are taken into account. In case of India, it could even reverse the improvements in nutrition so far.",
            text14: "Fish are an important source of proteins and essential nutrients. Moreover, a significant proportion of the population relies on fishing for its livelihood. Sustainable use of water resources and better access for small-scale fishing communities, women's groups, will promote food security.",
            text15: "Forests contribute to food security and nutrition in four ways: direct provision of food; provision of energy, especially for cooking; income generation and employment; and provision of ecosystem services. Therefore, sustainable management of forest resources is key to food security.",
            text16: "Armed conflict can push populations into hunger, as food production and distribution is affected. This is particularly true in countries like South Sudan, Yemen, Somalia, Nigeria Reducing conflict and extreme poverty - and addressing their consequences - are key to ending hunger.",
            text17: "Enhanced  finance, technology, capacity building and trade, policy coherence, partnerships and monitoring can support food security and nutrition as well as sustainable agriculture.",
            text2: "",
            text3: "India is home to 1/3rd of the world\u2019s stunted children. 38.4% of children under 5 years of age are stunted, and 21% are wasted. Malnutrition erodes the physical and mental health and wellbeing of children. \n\nSource: NFHS 4",
            text4: "Nutrition literacy can help caregivers make informed choices about children's nutrition.",
            text5: "In India, women and girls face discrimination and often have less access to nutritious food. Children of undernourished mothers are more likely to be underweight. Women-centric approach to nutrition recommended.",
            text6: "Water scarcity, poor water quality and inadequate sanitation adversely affect food security. Droughts in developing countries worsen hunger and malnutrition.",
            text7: "",
            text8: "Good nutrition represents an investment in human and social capital; the solid establishment of human capital is a key determinant of household and community well-being.",
            text9: "Without key infrastructure, communities face high transport costs, lack of storage facilties etc which limit farmers yields and access to food."
        }, {
            id: 3,
            text1: "Healthcare costs can neutralize gains from income increases and poverty eradication schemes. National Health Protection Scheme intends to provide health insurance cover to poor households.",
            text10: "Healthcare costs can neutralise gains from income increases and schemes for poverty reduction. The National Health Protection Scheme intends to provide health insurance cover to vulnerable households.",
            text11: "Housing, transport and access to green spaces are major determinants of health and wellbeing. Healthier cities need to be fostered through urban planning for cleaner, safer and more active living.",
            text12: "Half the global urban population breathes air that is 2.5 times more polluted than standards deemed acceptable by WHO. 600,000 people die of air pollution related diseases every year in India.",
            text13: "Climate-related hazards and disasters are among the biggest threats to human health at present. Health needs to be protected from climate risks and promoted through low-carbon development.",
            text14: "India is the 3rd largest producer of fish in the world and the 2nd largest producer of inland fish. Unsustainable fishing practices and poor ocean management threaten food supply and therefore health.",
            text15: "Roughly, 275 million rural people in India, depend on forests for at least a part of their subsistence. Agrobiodiversity and fishery products provide diversified and healthy diets.",
            text16: "Violent conflicts across the world have a detrimental effect on mental health, as a direct or an indirect result of the violence.",
            text17: "Good governance and macro-economic policies are important societal determinants that create the societal structures necessary for people to thrive and lead healthy lives.",
            text2: "India is home to 1/3rd of the world\u2019s stunted children. 38.4% of children under 5 years of age are stunted, and 21% are wasted. Malnutrition erodes the physical and mental health and wellbeing of children.",
            text3: "",
            text4: "For people to lead healthy lives, they need knowledge to prevent disease. Higher levels of education among mothers improves children\u2019s nutrition, and reduces child deaths, maternal mortality and HIV.",
            text5: "Considerations of gender equality are central to the goal of good health and well-being and universal health coverage. Gender discrimination in treatment seeking and health expenditure is quite common. Access to health services for vulnerable genders is also a key concern in India.",
            text6: "Every year, diarrhoea kills 188,000 children under five in India. Children weakened by frequent diarrhoea episodes are more vulnerable to malnutrition, stunting, and opportunistic infections such as pneumonia.",
            text7: "Indoor air pollution from traditional biomass usage is a prime cause of premature deaths, particularly among women and children.",
            text8: "In India, public expenditure on health as a share of the GDP (1.41%) is lower than the world average (5.99%) and sub-Saharan Africa (2.32%). Government has a target of increasing this to 2.5% by 2020.",
            text9: "Institutional births rose to 79% in 2015 from 39% in 2005. However, the doctor-to-patient ratio of 0.57 per 1000 people is lower than the Asian developing economy average (1.2)."
        }, {
            id: 4,
            text1: "Worldwide 10.6% of young people are illiterate and lack the means to be able to sustain a living through full and decent employment which prevents them from emerging from poverty.",
            text10: "Education facilitates the structural transformation of the economy and enables educated workers to transition into the non-agricultural sector. Education has helped narrow global income inequality by reducing poverty and creating a middle class in middle income countries.",
            text11: "A 1% increase in the proportion of tertiary education graduates in a city is associated with a 0.5 percentage point increase in output.",
            text12: "Agricultural education enhances quality of human resources and, enhances productivity, and promotes adoption of new technology and efficient processes. Education for Sustainable Development in classrooms can build awareness of the environmental impact of wasting food and resources.",
            text13: "Education is key to understanding the impacts of climate change and to adaptation and mitigation.",
            text14: "Technical education and sustainability awareness can empower coastal communities, strengthen the fishing industry, and help conserve maritime ecosystems.",
            text15: "Education and training increases skills and capacity to underpin sustainable livelihoods and conserve natural resources and biodiversity particularly in threatened environments.",
            text16: "Developing a culture of peace is essential for countries where war and conflict has been waged, especially in providing skills and capacities to former combatants and young people to help rebuild the economy.",
            text17: "International cooperation is necessary to increase scholarships for developing countries, for higher education, vocational training and ICT, technical, engineering and scientific programmes.",
            text2: "Education helps people move towards more sustainable farming methods, and understanding nutrition.",
            text3: "For people to lead healthy lives, they need knowledge to prevent disease. Higher levels of education among mothers improves children\u2019s nutrition, and reduces child deaths, maternal mortality and HIV.",
            text4: "",
            text5: "The education of women impacts generations. We can prevent child marriage, reduce by 70% the number of women dying in childbirth in sub-Saharan Africa \u2013 saving over 100,000 lives every year and halve the number of children dying under the age of five, just by educating women.",
            text6: "Education and training in life skills is essential to promoting hygienic behaviour and for the sustainable use of water resources.",
            text7: "Awareness building can promote better energy conservation and uptake of renewables.",
            text8: "An increase in the average educational attainment of a country by 1 year increases annual per capita GDP growth 2-2.5%. Less than 5% of India\u2019s workforce has formal skills training, and 122 million new workers will be added by 2030.",
            text9: "Only 5% of the Indian labour force between 20-24 years has obtained vocational skills through formal means and in a country where 12.8 million people enter the labour market every year, only about 2.5 million vocational training seats are available."
        }, {
            id: 5,
            text1: "Female labour force participation has been on a declining trend since 2004-05. By IMF estimates, equal participation of women in the workforce will increase India\u2019s GDP by 27%.",
            text10: "60% of women have no valuable assets in their name, compared to 30% of men. 47% of India\u2019s women do not have bank or savings accounts for their own use.",
            text11: "Safer and more accessible public infrastructure and transport can contribute to women's economic empowerment by enhancing their educational and professional opportunities.",
            text12: "Women in consumption and production must have equal access to means such as land and technology that can boost their standard of living.",
            text13: "The most vulnerable people are most at risk from climate change, including many poor women. For them, the impacts are already a daily reality. Many spend increasingly long hours hunting for food, fuel and water, or struggling to grow crops. When disasters strike, women are far more likely to perish .",
            text14: "Women make up 47% of the world\u2019s 120 million people working in fisheries and outnumber men in both large-scale marine fisheries (66%) and small-scale inland fisheries (54%).",
            text15: "",
            text16: "The first all women contingent in peacekeeping mission, a Formed Police Unit from India, was deployed in 2007 to the UN Operation. Women have made a positive impact on peacekeeping environments, both in supporting the role of women in building peace and protecting the rights of women for peacebuilding.",
            text17: "Women have the right to equal access to and benefits from each of the means of implementation. They also need to lead decisions being made \u2014 whether in ministries of finance, companies that produce technologies, statistical offices or institutions charged with global economic oversight.",
            text2: "50% of Indian women between the ages of 15 and 49 are anaemic. Women often have poor diets, and are unequally dealt food resources in homes, which hinders their wellbeing and capacities.",
            text3: "",
            text4: "For education to deliver, it must be inclusive and high-quality. Active efforts to end gender stereotypes must tackle those that limit schooling.",
            text5: "",
            text6: "Many girls opt to drop out of school due to the lack of proper toilet facilities. The Swachh Vidyalaya Programme aims to provide gender-segregated toilets in all government schools.",
            text7: "The burden of household air pollution because of fuel used for cooking, heating and lighting, falls disproportionately on women.",
            text8: "Women own more than 2.7 million MSMEs, employing over than 6 million people. However, their labour force participation rate remains low. Equal participation of women in the workforce will increase India\u2019s GDP by 27%.",
            text9: "95% of the work done by women is informal and unprotected. Involving women at all levels of the value chain provides access to employment and entrepreneurship opportunities."
        }, {
            id: 6,
            text1: "More than 75 million people lack access to safe water. National Rural Drinking Water Programme proposes to provide safe drinking water to over 28,000 arsenic and fluoride affected habitations in the next four years.",
            text10: "75% of Scheduled tribes and 63% of scheduled castes had no access to household sanitation.",
            text11: "Drinking water, sewerage and wastewater treatment, stormwater drains, and solid waste management needs to be planned and managed in an integrated manner.",
            text12: "Around two-thirds of the rural districts are affected by extreme water depletion of the water table. This is mostly due to excessive extraction for irrigation and industry.",
            text13: "The marked rise in precipitation intensity and variability in extremes will have impacts on water resource management, urban planning, and agriculture.",
            text14: "Management strategies need to be developed to reduce fluvial erosion and pollution.",
            text15: "Water in proper quantity and quality is needed to maintain ecosystems and ecosystems services.",
            text16: "International agreements and national strategies through programs such as water rights can promote the development of peaceful societies and institutions with meaningful roles.",
            text17: "International cooperation and capacity-building can enhance the efficiency and spread of activities such as water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies.",
            text2: "To meet increasing food demand, agriculture has built up a dependence on the intensification of irrigation. This has sustainability implications as seen in the declining trend of groundwater storage.",
            text3: "Every year, diarrhoea kills 188,000 children under five in India. Children weakened by frequent diarrhoea episodes are more vulnerable to malnutrition, stunting, and opportunistic infections such as pneumonia.",
            text4: "30 million children do not have access to toilet facilities in schools, and 5 million do not have access to safe drinking water facilities. The Swachh Vidyalaya Programme aims to remedy this.",
            text5: "Many girls opt to drop out of school due to the lack of proper toilet facilities. The Swachh Vidyalaya Programme aims to provide gender segregated toilets in all government schools.",
            text6: "",
            text7: "Policy actions are required to maintain and enforce checks and balances on maintenance of food and water security at the expense of depleting groundwater, along with high energy consumption.",
            text8: "Inadequate sanitation causes economic losses, equivalent to 6.4% of India\u2019s GDP in 2006. Over 180 thousand households in rural areas reported themselves as manual scavengers. Swachh Bharat Mission aims to make India clean and sanitised by 2019.",
            text9: "Innovations in the information architecture could provide an environmentally grounded understanding of water resources. Data infrastructure can be used by cities to integrate surface and groundwater resources more wisely."
        }, {
            id: 7,
            text1: "Access to modern and sustainable energy is fundamental for eliminating poverty. 237 million Indians have no access to energy. Government aims to achieve 100% village electrification by 2018.",
            text10: "The central government has a target of 100% village electrification by 2018. The current definition of village electrification requires only 10% of households to be electrified, implying that the number of Indians with no or limited access to electricity will still be significant.",
            text11: "The government aims to save 600 billion rupees a year by upgrading to energy-efficient air conditioners, lights and fans. A similar enhancement of equipment in manufacturing and industry can further cut down the country\u2019s energy consumption.",
            text12: "Energy use in India has almost doubled since 2000, but energy consumption per capita is one third of the global average. India is set to contribute 1/4th of the projected rise in global energy demand by 2040.",
            text13: "India is the 4th largest greenhouse gas emitter after China, USA, and EU, India has committed to boost renewable energy capacity to 40% by 2030 and ensure that 40% of electricity requirement will be met through non-fossil fuels.",
            text14: "Ocean energy is a renewable energy source. The total identified potential for tidal energy for India is more than 17000 MW, and that of wave energy is 40000 MW.",
            text15: "Energy projects need to be carefully located, and the energy mix needs to be carefully planned to avoid a negative impact on terrestrial ecosystems and biodiversity.",
            text16: "Transparent and corruption-free regimes are key to delivering energy services affordably.",
            text17: "India is spearheading the International Solar Alliance with more than 20 countries. International energy cooperation can accelerate progress towards adoption of renewable energy, through knowledge sharing and capacity development.",
            text2: "Use of biomass energy reduces agricultural productivity, because agricultural residues and dung are also widely used as fertilizer. The more biomass is put to household use, the less there is available for fertilizer.",
            text3: "Indoor air pollution from traditional biomass usage is a prime cause of premature deaths, particularly among women and children.",
            text4: "Electricity access can play a significant role in improving learning outcomes in schools. Educational programs can promote better energy conservation and uptake of renewables.",
            text5: "The burden of household air pollution because of fuel used for cooking, heating and lighting, falls disproportionately on women.",
            text6: "Policy actions are required to maintain and enforce checks on over utilization of groundwater due to subsided power supply.",
            text7: "",
            text8: "India has committed to reduce emissions intensity of GDP by 33-35% by 2030 from 2005 levels.",
            text9: "India has set a target for 175 GW of renewable energy by 2022. Last mile connectivity for remote communities is required through innovative and grid-complementing decentralized renewable energy solutions, such as home energy systems and renewable energy mini-grids."
        }, {
            id: 8,
            text1: "India accounts for the largest number of people living below the international poverty line of USD 1.90 a day \u2013 224 million. India has a labour force of over 475 million, of which nearly 33% work for less than 6 months a year.",
            text10: "Inequality harms growth, and an individuals\u2019 sense of self- worth. The Gini Coefficient of income inequality for India has fallen from 36.8% in 2010 to 33.6% in 2015.",
            text11: "An additional 315 million people \u2013 almost the population of the United States today \u2013 are expected to live in India\u2019s cities by 2040.",
            text12: "India\u2019s economy is projected to grow by 7.7% in fiscal year 2017 and 7.6% in 2018, benefiting from strong private consumption.  India might be affected by slowdown in global productivity growth.",
            text13: "India has committed to reduce emissions intensity of GDP by 33-35% by 2030 from 2005 levels.",
            text14: "Sustainable economic growth should minimize the degradation of oceans and marine resources.",
            text15: "Sustainable economic growth should minimize the degradation of terrestrial ecosystems.",
            text16: "Promoting the development of resilient societies and institutions builds a country's social capital and improves capacities for sustainable development. Countries with lower levels of armed violence and corruption can plan and implement economic growth more effectively.",
            text17: "There is a need to redouble the efforts to bring the global economy back on a stronger and more inclusive growth path and create an international economic environment that is conducive to sustainable development.",
            text2: "Sustained economic growth and enhanced resource use efficiency are important for food security and sustainable agriculture.",
            text3: "In India, public expenditure on health as a share of the GDP (1.41%) is lower than the world average (5.99%) and sub-Saharan Africa (2.32%). Government has a target of increasing this to 2.5% by 2020.",
            text4: "India has the largest youth population in the world. India\u2019s Gross Enrollment Ratio in higher education is only 23%, one of the lowest in the world.",
            text5: "Women own more than 2.7 million MSMEs, employing over than 6 million people. However, their labour force participation rate remains low. Equal participation of women in the workforce will increase India\u2019s GDP by 27%.",
            text6: "Inadequate sanitation causes India considerable economic losses, equivalent to 6.4 per cent of India\u2019s GDP in 2006 at US$53.8 billion. Swachh Bharat Mission aims to make India open defecation free, clean and sanitized by 2019.",
            text7: "India is set to contribute 1/4th of the projected rise in global energy demand by 2040. India has committed to boost renewable energy capacity to 40% by 2030 and ensure that 40% of electricity requirement will be met through non-fossil fuels",
            text8: "",
            text9: "India will need to generate 280 million jobs between now and 2050, a one-third increase above current levels."
        }, {
            id: 9,
            text1: "Job creation by industrial expansion is the way forward along with redistributive policies to solve the problem of high poverty rates.",
            text10: "India has over 350 million internet and broadband users. The government aims to increase this number to 500 million by 2018.",
            text11: "Sustainable urbanisation needs cities that focus on energy efficient buildings and industries, and optimal renewable energy systems. An additional 315 million people \u2013 almost the population of the United States today \u2013 are expected to live in India\u2019s cities by 2040.",
            text12: "In India, CO2 emissions from manufacturing industries and construction comprises more than 1/4th of total fuel combustion.",
            text13: "India has committed to reduce emissions intensity of GDP by 33-35% by 2030 from 2005 levels. The energy sector in India is responsible for 71% of country's total greenhouse gas emissions.",
            text14: "Unregulated pollution creates serious problems for the environment, including trans-boundary water bodies.",
            text15: "Over the last 30 years, 14,000 sq. km. of forests have been lost to 23,716 industrial projects.",
            text16: "Peaceful societies offer more opportunities for secure long term investments in industry and manufacturing, and secure supply chains, as businesses are confronted with lower political risk.",
            text17: "Partnerships related to trade, capacity development, technology transfer, financing for development and private sector involvement to facilitate resilient infrastructure development in developing countries will be key.",
            text2: "In India, the agriculture sector employs 54.6% of the total workforce. Infrastructure, including scientific research can enhance agricultural productivity and sustainable food production.",
            text3: "Institutional births rose to 79% in 2015 from 39% in 2005. However, the doctor-to-patient ratio of 0.57 per 1000 people is lower than the Asian developing economy average (1.2).",
            text4: "Around 2.5 million vocational training seats are available for the 12.8 million people entering the labour market every year.",
            text5: "95% of the work done by women is informal and unprotected. Involving women at all levels of the value chain provides access to employment and entrepreneurship opportunities.",
            text6: "Innovations in the information architecture could provide an environmentally grounded understanding of water resources. Data infrastructure can be used to integrate surface and groundwater resources more wisely.",
            text7: "India has set a target for 175 GW of renewable energy by 2022. Last mile connectivity for remote communities is required through innovative and grid-complementing decentralized renewable energy solutions, such as home energy systems and renewable energy mini-grids.",
            text8: "India will need to generate 280 million jobs between now and 2050, a 1/3rd increase above current levels.",
            text9: ""
        }, {
            id: 10,
            text1: "If India stops inequality from rising further, it could end extreme poverty for 90 million people by 2019. If it goes further and reduces inequality by 36%, it could virtually eliminate extreme poverty.",
            text10: "",
            text11: "Analysis into the spatial inequalities in India\u2019s populous cities has revealed that rapid growth in cities has not reduced segregation by caste or religion. Marginalized communities are still concentrated, mostly in unauthorized settlements and poor neighbourhoods.",
            text12: "",
            text13: "Energy use in India has almost doubled since 2000, but energy consumption per capita is still around one-third of the global average, and 237 million people have no access to electricity.",
            text14: "Local fishing communities can be empowered to assert their rights and stop large-scale factory fishing.",
            text15: "Local communities can be empowered to promote sustainable local management of resources instead of large-scale extractive management.",
            text16: "Reducing inequalities in access to resources and justice can alleviate the root causes of armed violence, polarization, and conflict. Political stability can offer better opportunities for strengthening institutions of justice and reconciliation.",
            text17: "The need of the hour is disaggregated quality data for vulnerable groups\u2013 including children, youth, persons with disabilities, people living with HIV, transgender, older persons, tribals, dalits, refugees, internally displaced persons and migrants.",
            text2: "Access to food and improved nutrition constitutes a basic human right and one of the central goals of development processes aimed at reducing poverty and inequality.",
            text3: "Healthcare costs can neutralise gains from income increases and schemes for poverty reduction. The National Health Protection Scheme intends to provide health insurance cover to vulnerable households.",
            text4: "In urban India, 6% of young people from the bottom fifth of the population attend educational levels above higher secondary, as compared to 31% for the richest fifth.",
            text5: "60% of women have no valuable assets in their name, compared to 30% of men. 47% of India\u2019s women do not have bank or savings accounts for their own use.",
            text6: "75% of Scheduled tribes and 63% of scheduled castes had no access to household sanitation. Swachh Bharat Mission has achieved a 20% increase in rural households with a toilet since 2014.",
            text7: "The government has a target of 100% village electrification by 2018. The current definition of village electrification requires 10% of households to be electrified.",
            text8: "Inequality harms growth and poverty reduction, and individuals\u2019 sense of self- worth. The Gini Coefficient of income inequality for India has fallen from 36.8% in 2010 to 33.6% in 2015.",
            text9: "Industrial development helps tackle inequality across the world through the provision of greater productivity, stable employment, increased incomes and opportunities for social mobility. However, these opportunities must be shared equally within societies."
        }, {
            id: 11,
            text1: "17% of India's urban population lives in slums, and many don\u2019t have access to basic services like education, healthcare, and sanitation. Urban planning to accommodate their needs can help in the alleviation of poverty.",
            text10: "Analysis into the spatial inequalities in India's populous cities has revealed that rapid growth in cities has not reduced spatial segregation by caste or religion. Dalits and adivasis are still heavily concentrated within certain geographical areas of cities, mostly in unauthorised settlements and poor neighbourhoods.",
            text11: "",
            text12: "43 million tonnes of waste is generated per annum by Indian cities. Cities are a crucial link in making consumption and production chains sustainable, cleaner, and in reducing waste.",
            text13: "The world\u2019s cities occupy just 3% of the planet\u2019s land but account for 75% of the planet\u2019s carbon emissions. Cities constitute the frontline in the fight against climate change.",
            text14: "Urban centres in coastal and delta regions are often vulnerable to the adverse impacts of hazards, including earthquakes, extreme weather events, flooding, and sea-level rise.",
            text15: "Urban sprawl can negatively impact natural ecosystems, and a more integrated approach to urbanisation which accommodates and conserves natural resources can reduce emissions, air pollution, and disaster risk.",
            text16: "Many urban areas have higher rates of homicide than the national average; cities are the source of both greater risk as well as opportunities for crime prevention. Cities are often vulnerable to security threats from flows of illicit commodities, organised crime, and terrorism.",
            text17: "Financial and technical assistance is required to build sustainable and resilient housing for cities and communities, in which local building materials are used.",
            text2: "Many cities cannot ensure reliable access to food and water for all, but food security and nutrition remain overlooked in urban planning.",
            text3: "Half the global urban population breathes air that is 2.5 times more polluted than standards deemed acceptable by WHO. 600,000 people die of air pollution related diseases every year in India.",
            text4: "A 1% increase in the proportion of tertiary education graduates in a city is associated with a 0.5 percentage point increase in output.",
            text5: "Safer and more accessible public infrastructure and transport can contribute to women's economic empowerment by enhancing their educational and professional opportunities.",
            text6: "16.7% urban households in India do not have bathroom facilities. Sustainable cities and communities need sanitation facilities proportional to a quickly expanding population.",
            text7: "Cities account for 60-80% of all energy consumption worldwide. By 2030, India will have 7 megacities, with a population of over 10 million each, and the demand for energy will require off grid solutions.",
            text8: "Cities account for more than 80% of global GDP and upto 60% of India\u2019s GDP. 49 metropolitan clusters are likely to account for 77% of incremental GDP by 2025. More sustainable cities contribute to stronger economic growth.",
            text9: "A truly smart city is built on grids of digital communications and transactions. India's Smart Cities mission aims to build 100 smart cities which will require technological innovation."
        }, {
            id: 12,
            text1: "Below poverty line households in rural India spend around 70% of their consumption expenditure to meet food requirements.",
            text10: "",
            text11: "43 million tonnes of waste is generated per annum by Indian cities. Cities are a crucial link in making consumption and production chains sustainable, cleaner, and in reducing waste.",
            text12: "",
            text13: "India is the fourth largest GHG emitter, responsible for 6.9% of global emissions. India will have to rationalise inefficient fossil-fuel subsidies that encourage wasteful consumption.",
            text14: "India is endowed with vast inland and marine bio-resources, and is the 3rd largest producer of fish in the world and the 2nd largest producer of inland fish. High erosion has been experienced in 15-16% of the coast.",
            text15: "India's share of crops is 44% as compared to the world average of 11%. India must promote fair and equitable sharing of the benefits arising from the utilization of these resources.",
            text16: "Conflicts cause loss of workforce in agriculture, livestock and land. Access to natural resources like land for grazing or crop can be key sources of conflict. People are displaced from their land as a result of resource-based conflicts.",
            text17: "Trade restrictions and distortions in world agricultural markets need to be corrected and prevented to ensure sustainable agricultural production.",
            text2: "The rural poor often have a higher percentage of the hungry and malnourished in developing countries, and promoting growth in agriculture and the rural sector can be an important component for promoting inclusive growth.",
            text3: "Half the global urban population breathes air that is 2.5 times more polluted than standards deemed acceptable by WHO. 600,000 people die of air pollution related diseases every year in India.",
            text4: "Agricultural education enhances quality of human resources and, enhances productivity, and promotes adoption of new technology and efficient processes.",
            text5: "Food losses occur at every stage. A sustainable future depends on reducing extremes. Women in consumption and production must have equal access to means such as land and technology boosting their standard of living.",
            text6: "Around two-thirds of the rural districts are affected by extreme water depletion of the water table. This is mostly due to excessive extraction for irrigation and industry.",
            text7: "Energy use in India has almost doubled since 2000, but energy consumption per capita is one third of the global average. India is set to contribute 1/4th of the projected rise in global energy demand by 2040.",
            text8: "India\u2019s economy is projected to grow by 7.7% in fiscal year 2017 and 7.6% in 2018, benefiting from strong private consumption. India might be affected by slowdown in global productivity growth.",
            text9: "In India, CO2 emissions from manufacturing industries and construction comprises more than 1/4th of total fuel combustion."
        }, {
            id: 13,
            text1: "Climate change could encumber India\u2019s economic progress, pushing 45 million Indians into extreme poverty over the next 15 years. India has ratified the Paris Agreement, dealing with greenhouse gases emissions mitigation, climate change adaptation and financing.",
            text10: "Energy use in India has almost doubled since 2000, but energy consumption per capita is still around one-third of the global average, and 237 million people have no access to electricity.",
            text11: "The world\u2019s cities occupy just 3% of the planet\u2019s land but account for 75% of the planet\u2019s carbon emissions. Cities constitute the frontline in the fight against climate change.",
            text12: "India is the fourth largest GHG emitter, responsible for 6.9% of global emissions. India will have to rationalize inefficient fossil-fuel subsidies that encourage wasteful consumption by removing market distortions, in accordance with national circumstances, including by restructuring taxation and phasing out those harmful subsidies, where they exist, to reflect their environmental impacts, taking fully into account the specific needs and conditions in India.",
            text13: "",
            text14: "In India, about 35% of the population live within 100 km of the country\u2019s coastline measuring around 7500 km.",
            text15: "With only 2.4% of world's land area, India accounts for 7-8% of the recorded species of the world. Significant action is required to reduce the degradation of natural habitats and halt the loss of biodiversity.",
            text16: "Conflicts are often fuelled by competition for resources, and exacerbated by the adverse impact of climate change on natural resources. Crop failure and mass migration of communities forced by climate change can contribute to political unrest in host regions.",
            text17: "The challenge of climate change cuts across national borders. Emissions in one part of the world may change the weather and affect communities in another. Concerted international action is required on the Paris Agreement.",
            text2: "Food production accounts for 11% of global greenhouse gas emissions; including food distribution and land use, food systems account for 30% of greenhouse gas emissions globally.",
            text3: "Climate-related hazards and disasters are among the biggest threats to human health at present. Health needs to be protected from climate risks and promoted through low-carbon development.",
            text4: "Education is key to understanding the impacts of climate change and to adaptation and mitigation.",
            text5: "For women,  impacts of climate change are  a daily reality. Many spend increasingly long hours hunting for food, fuel and water, or struggling to grow crops. When disasters strike, women are far more likely to perish .",
            text6: "The marked rise in precipitation intensity and variability in extremes will have impacts on water resource management, urban planning, and agriculture.",
            text7: "India is the 4th largest greenhouse gas emitter after China, USA, and EU, India has committed to boost renewable energy capacity to 40% by 2030 and ensure that 40% of electricity requirement will be met through non-fossil fuels.",
            text8: "India has committed to reduce emissions intensity of GDP by 33-35% by 2030 from 2005 levels.",
            text9: "The energy sector in India is responsible for 71% of country's total greenhouse gas emissions."
        }, {
            id: 14,
            text1: "",
            text10: "Local fishing communities can be empowered to assert their rights and stop large-scale factory fishing.",
            text11: "Urban centres in coastal and delta regions are often vulnerable to the adverse impacts of hazards, including earthquakes, extreme weather events, flooding, and sea-level rise.",
            text12: "India is the 3rd largest producer of fish in the world and the 2nd largest producer of inland fish. High erosion has been experienced in 15-16% of the coast.",
            text13: "In India, about 35% of the population live within 100 km of the country\u2019s coastline measuring around 7500 km. And the Sea level rise is a very slow phenomenon, however, the trends of sea level rise are estimated to be 1.3mm/year along the Indian coasts during the last 40-50 years due to changes in the climate.",
            text14: "",
            text15: "25% of the Total Geographical Area of India is affected by desertification. About 69% of the country\u2019s lands are drylands and degradation of these lands has severe implications for the livelihood and food security of millions.",
            text16: "Illegal and unregulated fishing activity can adversely impact fishing yield and the balance of marine and coastal ecosystems.",
            text17: "The effects of conflict spill across borders, often in the form of displacement, forced migration, and refugees seeking asylum and protection in other countries. These humanitarian needs require international cooperation and frameworks.",
            text2: "More sustainable ocean fisheries and better access of small-scale shers will support food security and nutrition in the long term.",
            text3: "",
            text4: "Technical education and sustainability awareness can empower coastal communities, strengthen the fishing industry, and help conserve maritime ecosystems.",
            text5: "Women make up 47% of the world\u2019s 120 million people working in fisheries. And yet, women are largely concentrated in low-skilled and low-paid jobs.",
            text6: "High erosion has been experienced in 15-16% of the Indian Coast. Prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution.",
            text7: "Ocean energy is a renewable energy source. The total identified potential for tidal energy for India is more than 17000 MW, and that of wave energy is 40000 MW.",
            text8: "Over 3 billion people depend on marine and coastal biodiversity for their livelihoods. Providing access to small-scale artisanal fishers to marine resources and markets will contribute to the country's economic growth.",
            text9: "Unregulated pollution creates serious problems for the environment, including trans-boundary water bodies."
        }, {
            id: 15,
            text1: "Biodiversity and ecosystem services offer equitable and fair access to natural resources.",
            text10: "Local communities can be empowered to promote sustainable local management of resources instead of large-scale extractive management.",
            text11: "Urban sprawl can negatively impact natural ecosystems, and a more integrated approach to urbanisation which accommodates and conserves natural resources can reduce emissions, air pollution, and disaster risk.",
            text12: "India's share of crops is 44% as compared to the world average of 11%. India must promote fair and equitable sharing of the benefits arising from the utilization of these resources.",
            text13: "With only 2.4% of world's land area, India accounts for 7-8% of the recorded species of the world. Significant action is required to reduce the degradation of natural habitats and halt the loss of biodiversity.",
            text14: "In India, 25% of the Total Geographical Area of India is affected by desertification. About 69% of the country\u2019s lands are drylands and degradation of these lands has severe implications for the livelihood and food security of millions.",
            text15: "",
            text16: "Conflict adversely impacts natural and forest resources, that often become casualty or collateral damage to war, or are additionally pressured by displacement.",
            text17: "Illegal trafficking of wildlife is a transnational challenge pushing many endangered species towards extinction, and can only be addressed at an international level.",
            text2: "Healthy ecosystems are important for water regulation and supply. Forests are a critical source of food and livelihoods for millions of people, and therefore provide an important part of people's nutrition.",
            text3: "",
            text4: "Education and training increases skills and capacity to underpin sustainable livelihoods and conserve natural resources and biodiversity particularly in threatened environments.",
            text5: "Women are primary collectors of resources such as wood for fuel, as well as wild foods and herbs for medicines. Their knowledge about traditional practices is often excluded from decisions about sustainable ecosystems.",
            text6: "Water in proper quantity and quality is needed to maintain ecosystems and ecosystems services.",
            text7: "",
            text8: "Sustainable economic growth should minimize the degradation of terrestrial ecosystems.",
            text9: "Over the last 30 years, 14,000 sq. km. of forests have been lost to 23,716 industrial projects."
        }, {
            id: 16,
            text1: "Corruption and tax evasion cost developing countries around USD1.26 trillion per year; money that could be used to lift many above the poverty threshold of USD 1.90 a day for 6 years. Many countries that did not achieve the Millennium Development Goals were countries experiencing armed conflict.",
            text10: "Reducing inequalities in access to resources and justice can alleviate the root causes of armed violence, polarisation, and conflict. Political stability can offer better opportunities for strengthening institutions of justice and reconciliation.",
            text11: "Many urban areas have higher rates of homicide than the national average; cities are a source of risk as well as opportunities for crime prevention. They are often vulnerable to threats from flows of illicit commodities, organised crime, and terrorism.",
            text12: "Conflicts cause loss of workforce in agriculture, livestock and land. Access to natural resources like land for grazing or crop can be key sources of conflict. People are displaced from their land as a result of resource-based conflicts.",
            text13: "Conflicts are often fuelled by competition for resources, and exacerbated by the adverse impact of climate change on natural resources. Crop failure and mass migration of communities forced by climate change can contribute to political unrest in host regions.",
            text14: "Illegal and unregulated fishing activity can adversely impact fishing yield and the balance of marine and coastal ecosystems.",
            text15: "Conflict adversely impacts natural and forest resources, that often become casualty or collateral damage to war, or are additionally pressured by displacement.",
            text16: "",
            text17: "The effects of conflict spill across borders, in the form of displacement and refugees seeking protection in other countries. These humanitarian needs require international cooperation.",
            text2: "Conflicts and civil unrest are exacerbating food insecurity conditions for millions of people as well as affecting nearby countries hosting refugees.",
            text3: "Violent conflicts across the world have a detrimental effect on mental health, as a direct or an indirect result of the violence.",
            text4: "More than 13 million children are prevented from attending school by conflict in the Middle East and North Africa",
            text5: "Rate of crimes against women is 53.9% in India. In Delhi, 92% women have experienced sexual or physical violence in public spaces. Sexual and gender based violence threatens a society's peace and security, as well as framework of justice.",
            text6: "International agreements and national strategies through programs such as water rights can promote the development of peaceful societies and institutions with meaningful roles.",
            text7: "Transparent and corruption-free regimes are key to delivering energy services affordably.",
            text8: "Countries with lower levels of armed violence and corruption can plan and implement economic growth more effectively.",
            text9: "Peaceful societies offer more opportunities for secure long term investments in industry and manufacturing, and secure supply chains, as businesses are confronted with lower political risk."
        }, {
            id: 17,
            text1: "Accelerated investment in poverty eradication will be fostered by policy frameworks at the regional and international levels which are based on pro-poor development strategies.",
            text10: "The need of the hour is disaggregated quality data for vulnerable groups- including children, youth, persons with disabilities, people living with HIV, transgender, older persons, tribals, dalits, refugees, internally displaced persons and migrants.",
            text11: "International Frameworks such as the Sendai Framework for Disaster Risk Reduction can enhance cooperation on building and funding resilience, knowledge sharing, and developing standards to mitigate the impact of natural disasters everywhere.",
            text12: "Trade restrictions and distortions in world agricultural markets need to be corrected and prevented to ensure sustainable agricultural production.",
            text13: "The challenge of climate change cuts across national borders. Emissions in one part of the world may change the weather and affect communities in another. Concerted international action is required on the Paris Agreement as well as SDG 13.",
            text14: "Coastal and marine resources contribute USD 28 trillion to the global economy each year through ecosystem services. International cooperation is necessary for the sustainable development of shared coasts.",
            text15: "Illegal trafficking of wildlife is a transnational challenge pushing many endangered species towards extinction, and can only be addressed at an international level.",
            text16: "The effects of conflict spill across borders, often in the form of displacement, forced migration, and refugees seeking asylum and protection in other countries. These humanitarian needs require international cooperation and frameworks.",
            text17: "",
            text2: "Ensuring adequate food availibility and fair distribution can be facilitated by international cooperation to prevent distortions in world agricultural markets.",
            text3: "Shared challenges like Ebola, HIV and avian flu can only be dealt with through transnational action and sharing knowledge and research across borders.",
            text4: "Scholarships for developing countries, for higher education, vocational training and ICT can be increased through international cooperation.",
            text5: "International frameworks help push for change at local levels. The Beijing Platform for Action and global campaigns have created awareness and contributed to the economic empowerment of women.",
            text6: "International cooperation and capacity-building can enhance the efficiency and spread of activities such as water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies.",
            text7: "International energy cooperation can accelerate progress towards adoption of renewable energy, through knowledge sharing and capacity development. India is spearheading the International Solar Alliance with more than 20 countries",
            text8: "Calculations show that the returns on investments that can be generated by the full implementation of the SDGs globally could be approximately US$30 billion per year.",
            text9: "Innovation cannot happen without exchange of knowledge across continents, among scientists and universities."
        }]
    },
    pJS = function(e, t) {
        var i = document.querySelector("#" + e + " > .particles-js-canvas-el");
        this.pJS = {
            canvas: {
                el: i,
                w: i.offsetWidth,
                h: i.offsetHeight
            },
            particles: {
                number: {
                    value: 400,
                    density: {
                        enable: !0,
                        value_area: 800
                    }
                },
                color: {
                    value: "#fff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#ff0000"
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    image: {
                        src: "",
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: 1,
                    random: !1,
                    anim: {
                        enable: !1,
                        speed: 2,
                        opacity_min: 0,
                        sync: !1
                    }
                },
                size: {
                    value: 20,
                    random: !1,
                    anim: {
                        enable: !1,
                        speed: 20,
                        size_min: 0,
                        sync: !1
                    }
                },
                line_linked: {
                    enable: !0,
                    distance: 100,
                    color: "#fff",
                    opacity: 1,
                    width: 1
                },
                move: {
                    enable: !0,
                    speed: 2,
                    direction: "none",
                    random: !1,
                    straight: !1,
                    out_mode: "out",
                    bounce: !1,
                    attract: {
                        enable: !1,
                        rotateX: 3e3,
                        rotateY: 3e3
                    }
                },
                array: []
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: !0,
                        mode: "grab"
                    },
                    onclick: {
                        enable: !0,
                        mode: "push"
                    },
                    resize: !0
                },
                modes: {
                    grab: {
                        distance: 100,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 200,
                        size: 80,
                        duration: .4
                    },
                    repulse: {
                        distance: 200,
                        duration: .4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                },
                mouse: {}
            },
            retina_detect: !1,
            fn: {
                interact: {},
                modes: {},
                vendors: {}
            },
            tmp: {}
        };
        var s = this.pJS;
        t && Object.deepExtend(s, t), s.tmp.obj = {
            size_value: s.particles.size.value,
            size_anim_speed: s.particles.size.anim.speed,
            move_speed: s.particles.move.speed,
            line_linked_distance: s.particles.line_linked.distance,
            line_linked_width: s.particles.line_linked.width,
            mode_grab_distance: s.interactivity.modes.grab.distance,
            mode_bubble_distance: s.interactivity.modes.bubble.distance,
            mode_bubble_size: s.interactivity.modes.bubble.size,
            mode_repulse_distance: s.interactivity.modes.repulse.distance
        }, s.fn.retinaInit = function() {
            s.retina_detect && window.devicePixelRatio > 1 ? (s.canvas.pxratio = window.devicePixelRatio, s.tmp.retina = !0) : (s.canvas.pxratio = 1, s.tmp.retina = !1), s.canvas.w = s.canvas.el.offsetWidth * s.canvas.pxratio, s.canvas.h = s.canvas.el.offsetHeight * s.canvas.pxratio, s.particles.size.value = s.tmp.obj.size_value * s.canvas.pxratio, s.particles.size.anim.speed = s.tmp.obj.size_anim_speed * s.canvas.pxratio, s.particles.move.speed = s.tmp.obj.move_speed * s.canvas.pxratio, s.particles.line_linked.distance = s.tmp.obj.line_linked_distance * s.canvas.pxratio, s.interactivity.modes.grab.distance = s.tmp.obj.mode_grab_distance * s.canvas.pxratio, s.interactivity.modes.bubble.distance = s.tmp.obj.mode_bubble_distance * s.canvas.pxratio, s.particles.line_linked.width = s.tmp.obj.line_linked_width * s.canvas.pxratio, s.interactivity.modes.bubble.size = s.tmp.obj.mode_bubble_size * s.canvas.pxratio, s.interactivity.modes.repulse.distance = s.tmp.obj.mode_repulse_distance * s.canvas.pxratio
        }, s.fn.canvasInit = function() {
            s.canvas.ctx = s.canvas.el.getContext("2d")
        }, s.fn.canvasSize = function() {
            s.canvas.el.width = s.canvas.w, s.canvas.el.height = s.canvas.h, s && s.interactivity.events.resize && window.addEventListener("resize", (function() {
                s.canvas.w = s.canvas.el.offsetWidth, s.canvas.h = s.canvas.el.offsetHeight, s.tmp.retina && (s.canvas.w *= s.canvas.pxratio, s.canvas.h *= s.canvas.pxratio), s.canvas.el.width = s.canvas.w, s.canvas.el.height = s.canvas.h, s.particles.move.enable || (s.fn.particlesEmpty(), s.fn.particlesCreate(), s.fn.particlesDraw(), s.fn.vendors.densityAutoParticles()), s.fn.vendors.densityAutoParticles()
            }))
        }, s.fn.canvasPaint = function() {
            s.canvas.ctx.fillRect(0, 0, s.canvas.w, s.canvas.h)
        }, s.fn.canvasClear = function() {
            s.canvas.ctx.clearRect(0, 0, s.canvas.w, s.canvas.h)
        }, s.fn.particle = function(e, t, i) {
            if (this.radius = (s.particles.size.random ? Math.random() : 1) * s.particles.size.value, s.particles.size.anim.enable && (this.size_status = !1, this.vs = s.particles.size.anim.speed / 100, s.particles.size.anim.sync || (this.vs = this.vs * Math.random())), this.x = i ? i.x : Math.random() * s.canvas.w, this.y = i ? i.y : Math.random() * s.canvas.h, this.x > s.canvas.w - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius), this.y > s.canvas.h - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius), s.particles.move.bounce && s.fn.vendors.checkOverlap(this, i), this.color = {}, "object" == typeof e.value)
                if (e.value instanceof Array) {
                    var o = e.value[Math.floor(Math.random() * s.particles.color.value.length)];
                    this.color.rgb = hexToRgb(o)
                } else null != e.value.r && null != e.value.g && null != e.value.b && (this.color.rgb = {
                    r: e.value.r,
                    g: e.value.g,
                    b: e.value.b
                }), null != e.value.h && null != e.value.s && null != e.value.l && (this.color.hsl = {
                    h: e.value.h,
                    s: e.value.s,
                    l: e.value.l
                });
            else "random" == e.value ? this.color.rgb = {
                r: Math.floor(256 * Math.random()) + 0,
                g: Math.floor(256 * Math.random()) + 0,
                b: Math.floor(256 * Math.random()) + 0
            } : "string" == typeof e.value && (this.color = e, this.color.rgb = hexToRgb(this.color.value));
            this.opacity = (s.particles.opacity.random ? Math.random() : 1) * s.particles.opacity.value, s.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = s.particles.opacity.anim.speed / 100, s.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
            var a = {};
            switch (s.particles.move.direction) {
                case "top":
                    a = {
                        x: 0,
                        y: -1
                    };
                    break;
                case "top-right":
                    a = {
                        x: .5,
                        y: -.5
                    };
                    break;
                case "right":
                    a = {
                        x: 1,
                        y: -0
                    };
                    break;
                case "bottom-right":
                    a = {
                        x: .5,
                        y: .5
                    };
                    break;
                case "bottom":
                    a = {
                        x: 0,
                        y: 1
                    };
                    break;
                case "bottom-left":
                    a = {
                        x: -.5,
                        y: 1
                    };
                    break;
                case "left":
                    a = {
                        x: -1,
                        y: 0
                    };
                    break;
                case "top-left":
                    a = {
                        x: -.5,
                        y: -.5
                    };
                    break;
                default:
                    a = {
                        x: 0,
                        y: 0
                    }
            }
            s.particles.move.straight ? (this.vx = a.x, this.vy = a.y, s.particles.move.random && (this.vx = this.vx * Math.random(), this.vy = this.vy * Math.random())) : (this.vx = a.x + Math.random() - .5, this.vy = a.y + Math.random() - .5), this.vx_i = this.vx, this.vy_i = this.vy;
            var n = s.particles.shape.type;
            if ("object" == typeof n) {
                if (n instanceof Array) {
                    var r = n[Math.floor(Math.random() * n.length)];
                    this.shape = r
                }
            } else this.shape = n;
            if ("image" == this.shape) {
                var l = s.particles.shape;
                this.img = {
                    src: l.image.src,
                    ratio: l.image.width / l.image.height
                }, this.img.ratio || (this.img.ratio = 1), "svg" == s.tmp.img_type && null != s.tmp.source_svg && (s.fn.vendors.createSvgImg(this), s.tmp.pushing && (this.img.loaded = !1))
            }
        }, s.fn.particle.prototype.draw = function() {
            var e = this;
            if (null != e.radius_bubble) var t = e.radius_bubble;
            else t = e.radius;
            if (null != e.opacity_bubble) var i = e.opacity_bubble;
            else i = e.opacity;
            if (e.color.rgb) var o = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + i + ")";
            else o = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + i + ")";
            switch (s.canvas.ctx.fillStyle = o, s.canvas.ctx.beginPath(), e.shape) {
                case "circle":
                    s.canvas.ctx.arc(e.x, e.y, t, 0, 2 * Math.PI, !1);
                    break;
                case "edge":
                    s.canvas.ctx.rect(e.x - t, e.y - t, 2 * t, 2 * t);
                    break;
                case "triangle":
                    s.fn.vendors.drawShape(s.canvas.ctx, e.x - t, e.y + t / 1.66, 2 * t, 3, 2);
                    break;
                case "polygon":
                    s.fn.vendors.drawShape(s.canvas.ctx, e.x - t / (s.particles.shape.polygon.nb_sides / 3.5), e.y - t / .76, 2.66 * t / (s.particles.shape.polygon.nb_sides / 3), s.particles.shape.polygon.nb_sides, 1);
                    break;
                case "star":
                    s.fn.vendors.drawShape(s.canvas.ctx, e.x - 2 * t / (s.particles.shape.polygon.nb_sides / 4), e.y - t / 1.52, 2 * t * 2.66 / (s.particles.shape.polygon.nb_sides / 3), s.particles.shape.polygon.nb_sides, 2);
                    break;
                case "image":
                    if ("svg" == s.tmp.img_type) var a = e.img.obj;
                    else a = s.tmp.img_obj;
                    a && s.canvas.ctx.drawImage(a, e.x - t, e.y - t, 2 * t, 2 * t / e.img.ratio)
            }
            s.canvas.ctx.closePath(), s.particles.shape.stroke.width > 0 && (s.canvas.ctx.strokeStyle = s.particles.shape.stroke.color, s.canvas.ctx.lineWidth = s.particles.shape.stroke.width, s.canvas.ctx.stroke()), s.canvas.ctx.fill()
        }, s.fn.particlesCreate = function() {
            for (var e = 0; e < s.particles.number.value; e++) s.particles.array.push(new s.fn.particle(s.particles.color, s.particles.opacity.value))
        }, s.fn.particlesUpdate = function() {
            for (var e = 0; e < s.particles.array.length; e++) {
                var t = s.particles.array[e];
                if (s.particles.move.enable) {
                    var i = s.particles.move.speed / 2;
                    t.x += t.vx * i, t.y += t.vy * i
                }
                if (s.particles.opacity.anim.enable && (1 == t.opacity_status ? (t.opacity >= s.particles.opacity.value && (t.opacity_status = !1), t.opacity += t.vo) : (t.opacity <= s.particles.opacity.anim.opacity_min && (t.opacity_status = !0), t.opacity -= t.vo), t.opacity < 0 && (t.opacity = 0)), s.particles.size.anim.enable && (1 == t.size_status ? (t.radius >= s.particles.size.value && (t.size_status = !1), t.radius += t.vs) : (t.radius <= s.particles.size.anim.size_min && (t.size_status = !0), t.radius -= t.vs), t.radius < 0 && (t.radius = 0)), "bounce" == s.particles.move.out_mode) var o = {
                    x_left: t.radius,
                    x_right: s.canvas.w,
                    y_top: t.radius,
                    y_bottom: s.canvas.h
                };
                else o = {
                    x_left: -t.radius,
                    x_right: s.canvas.w + t.radius,
                    y_top: -t.radius,
                    y_bottom: s.canvas.h + t.radius
                };
                switch (t.x - t.radius > s.canvas.w ? (t.x = o.x_left, t.y = Math.random() * s.canvas.h) : t.x + t.radius < 0 && (t.x = o.x_right, t.y = Math.random() * s.canvas.h), t.y - t.radius > s.canvas.h ? (t.y = o.y_top, t.x = Math.random() * s.canvas.w) : t.y + t.radius < 0 && (t.y = o.y_bottom, t.x = Math.random() * s.canvas.w), s.particles.move.out_mode) {
                    case "bounce":
                        t.x + t.radius > s.canvas.w ? t.vx = -t.vx : t.x - t.radius < 0 && (t.vx = -t.vx), t.y + t.radius > s.canvas.h ? t.vy = -t.vy : t.y - t.radius < 0 && (t.vy = -t.vy)
                }
                if (isInArray("grab", s.interactivity.events.onhover.mode) && s.fn.modes.grabParticle(t), (isInArray("bubble", s.interactivity.events.onhover.mode) || isInArray("bubble", s.interactivity.events.onclick.mode)) && s.fn.modes.bubbleParticle(t), (isInArray("repulse", s.interactivity.events.onhover.mode) || isInArray("repulse", s.interactivity.events.onclick.mode)) && s.fn.modes.repulseParticle(t), s.particles.line_linked.enable || s.particles.move.attract.enable)
                    for (var a = e + 1; a < s.particles.array.length; a++) {
                        var n = s.particles.array[a];
                        s.particles.line_linked.enable && s.fn.interact.linkParticles(t, n), s.particles.move.attract.enable && s.fn.interact.attractParticles(t, n), s.particles.move.bounce && s.fn.interact.bounceParticles(t, n)
                    }
            }
        }, s.fn.particlesDraw = function() {
            s.canvas.ctx.clearRect(0, 0, s.canvas.w, s.canvas.h), s.fn.particlesUpdate();
            for (var e = 0; e < s.particles.array.length; e++) s.particles.array[e].draw()
        }, s.fn.particlesEmpty = function() {
            s.particles.array = []
        }, s.fn.particlesRefresh = function() {
            cancelRequestAnimFrame(s.fn.checkAnimFrame), cancelRequestAnimFrame(s.fn.drawAnimFrame), s.tmp.source_svg = void 0, s.tmp.img_obj = void 0, s.tmp.count_svg = 0, s.fn.particlesEmpty(), s.fn.canvasClear(), s.fn.vendors.start()
        }, s.fn.interact.linkParticles = function(e, t) {
            var i = e.x - t.x,
                o = e.y - t.y,
                a = Math.sqrt(i * i + o * o);
            if (a <= s.particles.line_linked.distance) {
                var n = s.particles.line_linked.opacity - a / (1 / s.particles.line_linked.opacity) / s.particles.line_linked.distance;
                if (n > 0) {
                    var r = s.particles.line_linked.color_rgb_line;
                    s.canvas.ctx.strokeStyle = "rgba(" + r.r + "," + r.g + "," + r.b + "," + n + ")", s.canvas.ctx.lineWidth = s.particles.line_linked.width, s.canvas.ctx.beginPath(), s.canvas.ctx.moveTo(e.x, e.y), s.canvas.ctx.lineTo(t.x, t.y), s.canvas.ctx.stroke(), s.canvas.ctx.closePath()
                }
            }
        }, s.fn.interact.attractParticles = function(e, t) {
            var i = e.x - t.x,
                o = e.y - t.y;
            if (Math.sqrt(i * i + o * o) <= s.particles.line_linked.distance) {
                var a = i / (1e3 * s.particles.move.attract.rotateX),
                    n = o / (1e3 * s.particles.move.attract.rotateY);
                e.vx -= a, e.vy -= n, t.vx += a, t.vy += n
            }
        }, s.fn.interact.bounceParticles = function(e, t) {
            var i = e.x - t.x,
                s = e.y - t.y;
            Math.sqrt(i * i + s * s) <= e.radius + t.radius && (e.vx = -e.vx, e.vy = -e.vy, t.vx = -t.vx, t.vy = -t.vy)
        }, s.fn.modes.pushParticles = function(e, t) {
            s.tmp.pushing = !0;
            for (var i = 0; i < e; i++) s.particles.array.push(new s.fn.particle(s.particles.color, s.particles.opacity.value, {
                x: t ? t.pos_x : Math.random() * s.canvas.w,
                y: t ? t.pos_y : Math.random() * s.canvas.h
            })), i == e - 1 && (s.particles.move.enable || s.fn.particlesDraw(), s.tmp.pushing = !1)
        }, s.fn.modes.removeParticles = function(e) {
            s.particles.array.splice(0, e), s.particles.move.enable || s.fn.particlesDraw()
        }, s.fn.modes.bubbleParticle = function(e) {
            if (s.interactivity.events.onhover.enable && isInArray("bubble", s.interactivity.events.onhover.mode)) {
                var t = e.x - s.interactivity.mouse.pos_x,
                    i = e.y - s.interactivity.mouse.pos_y,
                    o = 1 - (l = Math.sqrt(t * t + i * i)) / s.interactivity.modes.bubble.distance;

                function a() {
                    e.opacity_bubble = e.opacity, e.radius_bubble = e.radius
                }
                if (l <= s.interactivity.modes.bubble.distance) {
                    if (o >= 0 && "mousemove" == s.interactivity.status) {
                        var n, r;
                        s.interactivity.modes.bubble.size != s.particles.size.value && (s.interactivity.modes.bubble.size > s.particles.size.value ? (n = e.radius + s.interactivity.modes.bubble.size * o) >= 0 && (e.radius_bubble = n) : e.radius_bubble = (n = e.radius - (e.radius - s.interactivity.modes.bubble.size) * o) > 0 ? n : 0), s.interactivity.modes.bubble.opacity != s.particles.opacity.value && (s.interactivity.modes.bubble.opacity > s.particles.opacity.value ? (r = s.interactivity.modes.bubble.opacity * o) > e.opacity && r <= s.interactivity.modes.bubble.opacity && (e.opacity_bubble = r) : (r = e.opacity - (s.particles.opacity.value - s.interactivity.modes.bubble.opacity) * o) < e.opacity && r >= s.interactivity.modes.bubble.opacity && (e.opacity_bubble = r))
                    }
                } else a();
                "mouseleave" == s.interactivity.status && a()
            } else if (s.interactivity.events.onclick.enable && isInArray("bubble", s.interactivity.events.onclick.mode)) {
                if (s.tmp.bubble_clicking) {
                    t = e.x - s.interactivity.mouse.click_pos_x, i = e.y - s.interactivity.mouse.click_pos_y;
                    var l = Math.sqrt(t * t + i * i),
                        c = ((new Date).getTime() - s.interactivity.mouse.click_time) / 1e3;
                    c > s.interactivity.modes.bubble.duration && (s.tmp.bubble_duration_end = !0), c > 2 * s.interactivity.modes.bubble.duration && (s.tmp.bubble_clicking = !1, s.tmp.bubble_duration_end = !1)
                }

                function d(t, i, o, a, n) {
                    if (t != i)
                        if (s.tmp.bubble_duration_end) null != o && (d = t + (t - (a - c * (a - t) / s.interactivity.modes.bubble.duration)), "size" == n && (e.radius_bubble = d), "opacity" == n && (e.opacity_bubble = d));
                        else if (l <= s.interactivity.modes.bubble.distance) {
                        if (null != o) var r = o;
                        else r = a;
                        if (r != t) {
                            var d = a - c * (a - t) / s.interactivity.modes.bubble.duration;
                            "size" == n && (e.radius_bubble = d), "opacity" == n && (e.opacity_bubble = d)
                        }
                    } else "size" == n && (e.radius_bubble = void 0), "opacity" == n && (e.opacity_bubble = void 0)
                }
                s.tmp.bubble_clicking && (d(s.interactivity.modes.bubble.size, s.particles.size.value, e.radius_bubble, e.radius, "size"), d(s.interactivity.modes.bubble.opacity, s.particles.opacity.value, e.opacity_bubble, e.opacity, "opacity"))
            }
        }, s.fn.modes.repulseParticle = function(e) {
            if (s.interactivity.events.onhover.enable && isInArray("repulse", s.interactivity.events.onhover.mode) && "mousemove" == s.interactivity.status) {
                var t = e.x - s.interactivity.mouse.pos_x,
                    i = e.y - s.interactivity.mouse.pos_y,
                    o = Math.sqrt(t * t + i * i),
                    a = {
                        x: t / o,
                        y: i / o
                    },
                    n = clamp(1 / (l = s.interactivity.modes.repulse.distance) * (-1 * Math.pow(o / l, 2) + 1) * l * 100, 0, 50),
                    r = {
                        x: e.x + a.x * n,
                        y: e.y + a.y * n
                    };
                "bounce" == s.particles.move.out_mode ? (r.x - e.radius > 0 && r.x + e.radius < s.canvas.w && (e.x = r.x), r.y - e.radius > 0 && r.y + e.radius < s.canvas.h && (e.y = r.y)) : (e.x = r.x, e.y = r.y)
            } else if (s.interactivity.events.onclick.enable && isInArray("repulse", s.interactivity.events.onclick.mode))
                if (s.tmp.repulse_finish || (s.tmp.repulse_count++, s.tmp.repulse_count == s.particles.array.length && (s.tmp.repulse_finish = !0)), s.tmp.repulse_clicking) {
                    var l = Math.pow(s.interactivity.modes.repulse.distance / 6, 3),
                        c = s.interactivity.mouse.click_pos_x - e.x,
                        d = s.interactivity.mouse.click_pos_y - e.y,
                        u = c * c + d * d,
                        f = -l / u * 1;
                    u <= l && function() {
                        var t = Math.atan2(d, c);
                        if (e.vx = f * Math.cos(t), e.vy = f * Math.sin(t), "bounce" == s.particles.move.out_mode) {
                            var i = {
                                x: e.x + e.vx,
                                y: e.y + e.vy
                            };
                            i.x + e.radius > s.canvas.w ? e.vx = -e.vx : i.x - e.radius < 0 && (e.vx = -e.vx), i.y + e.radius > s.canvas.h ? e.vy = -e.vy : i.y - e.radius < 0 && (e.vy = -e.vy)
                        }
                    }()
                } else 0 == s.tmp.repulse_clicking && (e.vx = e.vx_i, e.vy = e.vy_i)
        }, s.fn.modes.grabParticle = function(e) {
            if (s.interactivity.events.onhover.enable && "mousemove" == s.interactivity.status) {
                var t = e.x - s.interactivity.mouse.pos_x,
                    i = e.y - s.interactivity.mouse.pos_y,
                    o = Math.sqrt(t * t + i * i);
                if (o <= s.interactivity.modes.grab.distance) {
                    var a = s.interactivity.modes.grab.line_linked.opacity - o / (1 / s.interactivity.modes.grab.line_linked.opacity) / s.interactivity.modes.grab.distance;
                    if (a > 0) {
                        var n = s.particles.line_linked.color_rgb_line;
                        s.canvas.ctx.strokeStyle = "rgba(" + n.r + "," + n.g + "," + n.b + "," + a + ")", s.canvas.ctx.lineWidth = s.particles.line_linked.width, s.canvas.ctx.beginPath(), s.canvas.ctx.moveTo(e.x, e.y), s.canvas.ctx.lineTo(s.interactivity.mouse.pos_x, s.interactivity.mouse.pos_y), s.canvas.ctx.stroke(), s.canvas.ctx.closePath()
                    }
                }
            }
        }, s.fn.vendors.eventsListeners = function() {
            s.interactivity.el = "window" == s.interactivity.detect_on ? window : s.canvas.el, (s.interactivity.events.onhover.enable || s.interactivity.events.onclick.enable) && (s.interactivity.el.addEventListener("mousemove", (function(e) {
                if (s.interactivity.el == window) var t = e.clientX,
                    i = e.clientY;
                else t = e.offsetX || e.clientX, i = e.offsetY || e.clientY;
                s.interactivity.mouse.pos_x = t, s.interactivity.mouse.pos_y = i, s.tmp.retina && (s.interactivity.mouse.pos_x *= s.canvas.pxratio, s.interactivity.mouse.pos_y *= s.canvas.pxratio), s.interactivity.status = "mousemove"
            })), s.interactivity.el.addEventListener("mouseleave", (function(e) {
                s.interactivity.mouse.pos_x = null, s.interactivity.mouse.pos_y = null, s.interactivity.status = "mouseleave"
            }))), s.interactivity.events.onclick.enable && s.interactivity.el.addEventListener("click", (function() {
                if (s.interactivity.mouse.click_pos_x = s.interactivity.mouse.pos_x, s.interactivity.mouse.click_pos_y = s.interactivity.mouse.pos_y, s.interactivity.mouse.click_time = (new Date).getTime(), s.interactivity.events.onclick.enable) switch (s.interactivity.events.onclick.mode) {
                    case "push":
                        s.particles.move.enable ? s.fn.modes.pushParticles(s.interactivity.modes.push.particles_nb, s.interactivity.mouse) : 1 == s.interactivity.modes.push.particles_nb ? s.fn.modes.pushParticles(s.interactivity.modes.push.particles_nb, s.interactivity.mouse) : s.interactivity.modes.push.particles_nb > 1 && s.fn.modes.pushParticles(s.interactivity.modes.push.particles_nb);
                        break;
                    case "remove":
                        s.fn.modes.removeParticles(s.interactivity.modes.remove.particles_nb);
                        break;
                    case "bubble":
                        s.tmp.bubble_clicking = !0;
                        break;
                    case "repulse":
                        s.tmp.repulse_clicking = !0, s.tmp.repulse_count = 0, s.tmp.repulse_finish = !1, setTimeout((function() {
                            s.tmp.repulse_clicking = !1
                        }), 1e3 * s.interactivity.modes.repulse.duration)
                }
            }))
        }, s.fn.vendors.densityAutoParticles = function() {
            if (s.particles.number.density.enable) {
                var e = s.canvas.el.width * s.canvas.el.height / 1e3;
                s.tmp.retina && (e /= 2 * s.canvas.pxratio);
                var t = s.particles.array.length - e * s.particles.number.value / s.particles.number.density.value_area;
                t < 0 ? s.fn.modes.pushParticles(Math.abs(t)) : s.fn.modes.removeParticles(t)
            }
        }, s.fn.vendors.checkOverlap = function(e, t) {
            for (var i = 0; i < s.particles.array.length; i++) {
                var o = s.particles.array[i],
                    a = e.x - o.x,
                    n = e.y - o.y;
                Math.sqrt(a * a + n * n) <= e.radius + o.radius && (e.x = t ? t.x : Math.random() * s.canvas.w, e.y = t ? t.y : Math.random() * s.canvas.h, s.fn.vendors.checkOverlap(e))
            }
        }, s.fn.vendors.createSvgImg = function(e) {
            var t = s.tmp.source_svg.replace(/#([0-9A-F]{3,6})/gi, (function(t, i, s, o) {
                    if (e.color.rgb) var a = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + e.opacity + ")";
                    else a = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + e.opacity + ")";
                    return a
                })),
                i = new Blob([t], {
                    type: "image/svg+xml;charset=utf-8"
                }),
                o = window.URL || window.webkitURL || window,
                a = o.createObjectURL(i),
                n = new Image;
            n.addEventListener("load", (function() {
                e.img.obj = n, e.img.loaded = !0, o.revokeObjectURL(a), s.tmp.count_svg++
            })), n.src = a
        }, s.fn.vendors.destroypJS = function() {
            cancelAnimationFrame(s.fn.drawAnimFrame), i.remove(), pJSDom = null
        }, s.fn.vendors.drawShape = function(e, t, i, s, o, a) {
            var n = o * a,
                r = o / a,
                l = Math.PI - Math.PI * (180 * (r - 2) / r) / 180;
            e.save(), e.beginPath(), e.translate(t, i), e.moveTo(0, 0);
            for (var c = 0; c < n; c++) e.lineTo(s, 0), e.translate(s, 0), e.rotate(l);
            e.fill(), e.restore()
        }, s.fn.vendors.exportImg = function() {
            window.open(s.canvas.el.toDataURL("image/png"), "_blank")
        }, s.fn.vendors.loadImg = function(e) {
            if (s.tmp.img_error = void 0, "" != s.particles.shape.image.src)
                if ("svg" == e) {
                    var t = new XMLHttpRequest;
                    t.open("GET", s.particles.shape.image.src), t.onreadystatechange = function(e) {
                        4 == t.readyState && (200 == t.status ? (s.tmp.source_svg = e.currentTarget.response, s.fn.vendors.checkBeforeDraw()) : (console.log("Error pJS - Image not found"), s.tmp.img_error = !0))
                    }, t.send()
                } else {
                    var i = new Image;
                    i.addEventListener("load", (function() {
                        s.tmp.img_obj = i, s.fn.vendors.checkBeforeDraw()
                    })), i.src = s.particles.shape.image.src
                }
            else console.log("Error pJS - No image.src"), s.tmp.img_error = !0
        }, s.fn.vendors.draw = function() {
            "image" == s.particles.shape.type ? "svg" == s.tmp.img_type ? s.tmp.count_svg >= s.particles.number.value ? (s.fn.particlesDraw(), s.particles.move.enable ? s.fn.drawAnimFrame = requestAnimFrame(s.fn.vendors.draw) : cancelRequestAnimFrame(s.fn.drawAnimFrame)) : s.tmp.img_error || (s.fn.drawAnimFrame = requestAnimFrame(s.fn.vendors.draw)) : null != s.tmp.img_obj ? (s.fn.particlesDraw(), s.particles.move.enable ? s.fn.drawAnimFrame = requestAnimFrame(s.fn.vendors.draw) : cancelRequestAnimFrame(s.fn.drawAnimFrame)) : s.tmp.img_error || (s.fn.drawAnimFrame = requestAnimFrame(s.fn.vendors.draw)) : (s.fn.particlesDraw(), s.particles.move.enable ? s.fn.drawAnimFrame = requestAnimFrame(s.fn.vendors.draw) : cancelRequestAnimFrame(s.fn.drawAnimFrame))
        }, s.fn.vendors.checkBeforeDraw = function() {
            "image" == s.particles.shape.type ? "svg" == s.tmp.img_type && null == s.tmp.source_svg ? s.tmp.checkAnimFrame = requestAnimFrame(check) : (cancelRequestAnimFrame(s.tmp.checkAnimFrame), s.tmp.img_error || (s.fn.vendors.init(), s.fn.vendors.draw())) : (s.fn.vendors.init(), s.fn.vendors.draw())
        }, s.fn.vendors.init = function() {
            s.fn.retinaInit(), s.fn.canvasInit(), s.fn.canvasSize(), s.fn.canvasPaint(), s.fn.particlesCreate(), s.fn.vendors.densityAutoParticles(), s.particles.line_linked.color_rgb_line = hexToRgb(s.particles.line_linked.color)
        }, s.fn.vendors.start = function() {
            isInArray("image", s.particles.shape.type) ? (s.tmp.img_type = s.particles.shape.image.src.substr(s.particles.shape.image.src.length - 3), s.fn.vendors.loadImg(s.tmp.img_type)) : s.fn.vendors.checkBeforeDraw()
        }, s.fn.vendors.eventsListeners(), s.fn.vendors.start()
    };

function hexToRgb(e) {
    e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function(e, t, i, s) {
        return t + t + i + i + s + s
    }));
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? {
        r: parseInt(t[1], 16),
        g: parseInt(t[2], 16),
        b: parseInt(t[3], 16)
    } : null
}

function clamp(e, t, i) {
    return Math.min(Math.max(e, t), i)
}

function isInArray(e, t) {
    return t.indexOf(e) > -1
}

function setFocusToSdgBlocks() {
    $("#sdgTextBlocks").focus(), console.log("triggered")
}

function bindSDGValue(e) {
    setFocusToSdgBlocks();
    for (var t = $(e).attr("id"), i = 0; i < SDGGoals.linking.length; i++)
        if (t === "slice" + SDGGoals.linking[i].id) {
            for (var s = SDGGoals.linking[i], o = 1; o <= SDGGoals.linking.length; o++) {
                var a = "text" + parseInt(o);
                document.getElementById("sdgText" + parseInt(o)).innerHTML = s[a]
            }
            document.getElementById("sdgText1")
        }
}
Object.deepExtend = function(e, t) {
    for (var i in t) t[i] && t[i].constructor && t[i].constructor === Object ? (e[i] = e[i] || {}, arguments.callee(e[i], t[i])) : e[i] = t[i];
    return e
}, window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
    window.setTimeout(e, 1e3 / 60)
}, window.cancelRequestAnimFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout, window.pJSDom = [], window.particlesJS = function(e, t) {
    "string" != typeof e && (t = e, e = "particles-js"), e || (e = "particles-js");
    var i = document.getElementById(e),
        s = i ? i.getElementsByClassName("particles-js-canvas-el") : [];
    if (s.length)
        for (; s.length > 0;) i.removeChild(s[0]);
    var o = document.createElement("canvas");
    o.className = "particles-js-canvas-el", o.style.width = "100%", o.style.height = "100%", null != document.getElementById(e) && document.getElementById(e).appendChild(o) && pJSDom.push(new pJS(e, t))
}, window.particlesJS.load = function(e, t, i) {
    var s = new XMLHttpRequest;
    s.open("GET", t), s.onreadystatechange = function(t) {
        if (4 == s.readyState)
            if (200 == s.status) {
                var o = JSON.parse(t.currentTarget.response);
                window.particlesJS(e, o), i && i()
            } else console.log("Error pJS - XMLHttpRequest status: " + s.status), console.log("Error pJS - File config not found")
    }, s.send()
}, $(document).ready((function() {
    $(".slices > a").click((function() {
        $(".slices > a").removeClass("hideCont"), $(".leaderLine").addClass("show"), $(".sdg-Content > div, .sdgTextBlocks > div, .lines .leaderLine, .slices2 .darkSlice").removeClass("hideCont"), $($(this).data("target")).addClass("hideCont"), $(".logo").hide(), $(".sdgTextBlocks").addClass("show"), $(".sdgTextBlocks > div").addClass("change"), $(".sliceActive").removeClass("sliceActive"), $(".slices > a").addClass("sliceSmall"), $(this).toggleClass("sliceActive"), $(this).removeClass("sliceSmall"), $(".slices2 .darkSlice").addClass("dSliceTrans"), $(".cirPlc").removeClass("show"), $(".reset").addClass("resetActive"), $(".sdg-Content").addClass("smallCirc"), $(".mainContainer").addClass("spiderMode"), setTimeout((function() {
            $(".sdgTextBlocks > div").removeClass("change")
        }), 800)
    })), $(".slices > a.sliceActive").click((function() {})), $(".slices > a").click((function(e) {
        var t = $(e.target).closest("a").attr("class").split(" ")[0],
            i = $(e.target).closest("body").attr("class");
        $("body").removeClass(i), $("body").addClass(t)
    })), $(".reset > a").on("click", (function() {
        $(".slices > a").removeClass("hideCont"), $(".logo").show(), $(".leaderLine").removeClass("show"), $(".sdgTextBlocks").removeClass("show"), $(".slices > a").removeClass("sliceSmall"), $(".sliceActive").removeClass("sliceActive"), $(".sdg-Content > div").removeClass("hideCont"), $(".slices2 .darkSlice").removeClass("dSliceTrans"), $(".slices2 .darkSlice").removeClass("hideCont"), $(".cirPlc").removeClass("showPermanant"), $(".reset").removeClass("resetActive"), $("body").removeClass(), $(".mainContainer").removeClass("spiderMode"), $(".circle > .cirPlc").removeClass("inrCircHide"), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice1").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle1").addClass("showPermanant"), $("#circle1").removeClass("inrCircHide"), $("#circle1").siblings().addClass("inrCircHide")
    })), $("#slice1").mouseover((function() {
        $("#circle1").addClass("show"), $(".text1").addClass("sliceActive")
    })), $("#slice1").mouseout((function() {
        $("#circle1").removeClass("show"), $(".text1").removeClass("sliceActive")
    })), $("#slice1_01").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle1").addClass("showPermanant"), $("#circle1").removeClass("inrCircHide"), $("#circle1").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice1_01").mouseover((function() {
        $("#circle1").addClass("show")
    })), $("#slice1_01").mouseout((function() {
        $("#circle1").removeClass("show")
    })), $("#slice2").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle2").toggleClass("showPermanant"), $("#circle2").removeClass("inrCircHide"), $("#circle2").siblings().addClass("inrCircHide")
    })), $("#slice2").mouseover((function() {
        $("#circle2").addClass("show"), $(".text2").addClass("sliceActive")
    })), $("#slice2").mouseout((function() {
        $("#circle2").removeClass("show"), $(".text2").removeClass("sliceActive")
    })), $("#slice2_02").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle2").toggleClass("showPermanant"), $("#circle2").removeClass("inrCircHide"), $("#circle2").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice2_02").mouseover((function() {
        $("#circle2").addClass("show")
    })), $("#slice2_02").mouseout((function() {
        $("#circle2").removeClass("show")
    })), $("#slice3").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle3").toggleClass("showPermanant"), $("#circle3").removeClass("inrCircHide"), $("#circle3").siblings().addClass("inrCircHide")
    })), $("#slice3").mouseover((function() {
        $("#circle3").addClass("show"), $(".text3").addClass("sliceActive")
    })), $("#slice3").mouseout((function() {
        $("#circle3").removeClass("show"), $(".text3").removeClass("sliceActive")
    })), $("#slice3_03").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle3").toggleClass("showPermanant"), $("#circle3").removeClass("inrCircHide"), $("#circle3").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice3_03").mouseover((function() {
        $("#circle3").addClass("show")
    })), $("#slice3_03").mouseout((function() {
        $("#circle3").removeClass("show")
    })), $("#slice4").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle4").toggleClass("showPermanant"), $("#circle4").removeClass("inrCircHide"), $("#circle4").siblings().addClass("inrCircHide")
    })), $("#slice4").mouseover((function() {
        $("#circle4").addClass("show"), $(".text4").addClass("sliceActive")
    })), $("#slice4_04").mouseout((function() {
        $("#circle4").removeClass("show"), $(".text4").removeClass("sliceActive")
    })), $("#slice4_04").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle4").toggleClass("showPermanant"), $("#circle4").removeClass("inrCircHide"), $("#circle4").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice4_04").mouseover((function() {
        $("#circle4").addClass("show")
    })), $("#slice4_04").mouseout((function() {
        $("#circle4").removeClass("show")
    })), $("#slice5").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle5").toggleClass("showPermanant"), $("#circle5").removeClass("inrCircHide"), $("#circle5").siblings().addClass("inrCircHide")
    })), $("#slice5").mouseover((function() {
        $("#circle5").addClass("show"), $(".text5").addClass("sliceActive")
    })), $("#slice5").mouseout((function() {
        $("#circle5").removeClass("show"), $(".text5").removeClass("sliceActive")
    })), $("#slice5_05").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle5").toggleClass("showPermanant"), $("#circle5").removeClass("inrCircHide"), $("#circle5").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice5_05").mouseover((function() {
        $("#circle5").addClass("show")
    })), $("#slice5_05").mouseout((function() {
        $("#circle5").removeClass("show")
    })), $("#slice6").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle6").toggleClass("showPermanant"), $("#circle6").removeClass("inrCircHide"), $("#circle6").siblings().addClass("inrCircHide")
    })), $("#slice6").mouseover((function() {
        $("#circle6").addClass("show"), $(".text6").addClass("sliceActive")
    })), $("#slice6").mouseout((function() {
        $("#circle6").removeClass("show"), $(".text6").removeClass("sliceActive")
    })), $("#slice6_06").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle6").toggleClass("showPermanant"), $("#circle6").removeClass("inrCircHide"), $("#circle6").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice6_06").mouseover((function() {
        $("#circle6").addClass("show")
    })), $("#slice6_06").mouseout((function() {
        $("#circle6").removeClass("show")
    })), $("#slice7").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle7").toggleClass("showPermanant"), $("#circle7").removeClass("inrCircHide"), $("#circle7").siblings().addClass("inrCircHide")
    })), $("#slice7").mouseover((function() {
        $("#circle7").addClass("show"), $(".text7").addClass("sliceActive")
    })), $("#slice7").mouseout((function() {
        $("#circle7").removeClass("show"), $(".text7").removeClass("sliceActive")
    })), $("#slice7_07").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle7").toggleClass("showPermanant"), $("#circle7").removeClass("inrCircHide"), $("#circle7").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice7_07").mouseover((function() {
        $("#circle7").addClass("show")
    })), $("#slice7_07").mouseout((function() {
        $("#circle7").removeClass("show")
    })), $("#slice8").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle8").toggleClass("showPermanant"), $("#circle8").removeClass("inrCircHide"), $("#circle8").siblings().addClass("inrCircHide")
    })), $("#slice8").mouseover((function() {
        $("#circle8").addClass("show"), $(".text8").addClass("sliceActive")
    })), $("#slice8").mouseout((function() {
        $("#circle8").removeClass("show"), $(".text8").removeClass("sliceActive")
    })), $("#slice8_08").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle8").toggleClass("showPermanant"), $("#circle8").removeClass("inrCircHide"), $("#circle8").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice8_08").mouseover((function() {
        $("#circle8").addClass("show")
    })), $("#slice8_08").mouseout((function() {
        $("#circle8").removeClass("show")
    })), $("#slice9").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle9").toggleClass("showPermanant"), $("#circle9").removeClass("inrCircHide"), $("#circle9").siblings().addClass("inrCircHide")
    })), $("#slice9").mouseover((function() {
        $("#circle9").addClass("show")
    })), $("#slice9").mouseout((function() {
        $("#circle9").removeClass("show")
    })), $("#slice9_09").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle9").toggleClass("showPermanant"), $("#circle9").removeClass("inrCircHide"), $("#circle9").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice9_09").mouseover((function() {
        $("#circle9").addClass("show")
    })), $("#slice9_09").mouseout((function() {
        $("#circle9").removeClass("show")
    })), $("#slice10").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle10").toggleClass("showPermanant"), $("#circle10").removeClass("inrCircHide"), $("#circle10").siblings().addClass("inrCircHide")
    })), $("#slice10").mouseover((function() {
        $("#circle10").addClass("show"), $(".text10").addClass("sliceActive")
    })), $("#slice10").mouseout((function() {
        $("#circle10").removeClass("show"), $(".text10").removeClass("sliceActive")
    })), $("#slice10_10").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle10").toggleClass("showPermanant"), $("#circle10").removeClass("inrCircHide"), $("#circle10").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice10_10").mouseover((function() {
        $("#circle10").addClass("show")
    })), $("#slice10_10").mouseout((function() {
        $("#circle10").removeClass("show")
    })), $("#slice11").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle11").toggleClass("showPermanant"), $("#circle11").removeClass("inrCircHide"), $("#circle11").siblings().addClass("inrCircHide")
    })), $("#slice11").mouseover((function() {
        $("#circle11").addClass("show"), $(".text11").addClass("sliceActive")
    })), $("#slice11").mouseout((function() {
        $("#circle11").removeClass("show"), $(".text11").removeClass("sliceActive")
    })), $("#slice11_11").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle11").toggleClass("showPermanant"), $("#circle11").removeClass("inrCircHide"), $("#circle11").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice11_11").mouseover((function() {
        $("#circle11").addClass("show")
    })), $("#slice11_11").mouseout((function() {
        $("#circle11").removeClass("show")
    })), $("#slice12").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle12").toggleClass("showPermanant"), $("#circle12").removeClass("inrCircHide"), $("#circle12").siblings().addClass("inrCircHide")
    })), $("#slice12").mouseover((function() {
        $("#circle12").addClass("show"), $(".text12").addClass("sliceActive")
    })), $("#slice12").mouseout((function() {
        $("#circle12").removeClass("show"), $(".text12").removeClass("sliceActive")
    })), $("#slice12_12").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle12").toggleClass("showPermanant"), $("#circle12").removeClass("inrCircHide"), $("#circle12").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice12_12").mouseover((function() {
        $("#circle12").addClass("show")
    })), $("#slice12_12").mouseout((function() {
        $("#circle12").removeClass("show")
    })), $("#slice13").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle13").toggleClass("showPermanant"), $("#circle13").removeClass("inrCircHide"), $("#circle13").siblings().addClass("inrCircHide")
    })), $("#slice13").mouseover((function() {
        $("#circle13").addClass("show"), $(".text13").addClass("sliceActive")
    })), $("#slice13").mouseout((function() {
        $("#circle13").removeClass("show"), $(".text13").removeClass("sliceActive")
    })), $("#slice13_13").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle13").toggleClass("showPermanant"), $("#circle13").removeClass("inrCircHide"), $("#circle13").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice13_13").mouseover((function() {
        $("#circle13").addClass("show")
    })), $("#slice13_13").mouseout((function() {
        $("#circle13").removeClass("show")
    })), $("#slice14").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle14").toggleClass("showPermanant"), $("#circle14").removeClass("inrCircHide"), $("#circle14").siblings().addClass("inrCircHide")
    })), $("#slice14").mouseover((function() {
        $("#circle14").addClass("show"), $(".text14").addClass("sliceActive")
    })), $("#slice14").mouseout((function() {
        $("#circle14").removeClass("show"), $(".text14").removeClass("sliceActive")
    })), $("#slice14_14").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle14").toggleClass("showPermanant"), $("#circle14").removeClass("inrCircHide"), $("#circle14").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice14_14").mouseover((function() {
        $("#circle14").addClass("show")
    })), $("#slice14_14").mouseout((function() {
        $("#circle14").removeClass("show")
    })), $("#slice15").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle15").toggleClass("showPermanant"), $("#circle15").removeClass("inrCircHide"), $("#circle15").siblings().addClass("inrCircHide")
    })), $("#slice15").mouseover((function() {
        $("#circle15").addClass("show"), $(".text15").addClass("sliceActive")
    })), $("#slice15").mouseout((function() {
        $("#circle15").removeClass("show"), $(".text15").removeClass("sliceActive")
    })), $("#slice15_15").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle15").toggleClass("showPermanant"), $("#circle15").removeClass("inrCircHide"), $("#circle15").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice15_15").mouseover((function() {
        $("#circle15").addClass("show")
    })), $("#slice15_15").mouseout((function() {
        $("#circle15").removeClass("show")
    })), $("#slice16").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle16").toggleClass("showPermanant"), $("#circle16").removeClass("inrCircHide"), $("#circle16").siblings().addClass("inrCircHide")
    })), $("#slice16").mouseover((function() {
        $("#circle16").addClass("show"), $(".text16").addClass("sliceActive")
    })), $("#slice16").mouseout((function() {
        $("#circle16").removeClass("show"), $(".text16").removeClass("sliceActive")
    })), $("#slice16_16").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle16").toggleClass("showPermanant"), $("#circle16").removeClass("inrCircHide"), $("#circle16").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal17").removeClass("hideCont")
    })), $("#slice16_16").mouseover((function() {
        $("#circle16").addClass("show")
    })), $("#slice16_16").mouseout((function() {
        $("#circle16").removeClass("show")
    })), $("#slice17").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle17").toggleClass("showPermanant"), $("#circle17").removeClass("inrCircHide"), $("#circle17").siblings().addClass("inrCircHide")
    })), $("#slice17").mouseover((function() {
        $("#circle17").addClass("show"), $(".text17").addClass("sliceActive")
    })), $("#slice17").mouseout((function() {
        $("#circle17").removeClass("show"), $(".text17").removeClass("sliceActive")
    })), $("#slice17_17").click((function() {
        $(".cirPlc").removeClass("showPermanant"), $("#circle17").toggleClass("showPermanant"), $("#circle17").removeClass("inrCircHide"), $("#circle17").siblings().addClass("inrCircHide"), $(".left_header").fadeOut(), $(".ContGoal1").removeClass("hideCont"), $(".ContGoal2").removeClass("hideCont"), $(".ContGoal3").removeClass("hideCont"), $(".ContGoal4").removeClass("hideCont"), $(".ContGoal5").removeClass("hideCont"), $(".ContGoal6").removeClass("hideCont"), $(".ContGoal7").removeClass("hideCont"), $(".ContGoal8").removeClass("hideCont"), $(".ContGoal9").removeClass("hideCont"), $(".ContGoal10").removeClass("hideCont"), $(".ContGoal11").removeClass("hideCont"), $(".ContGoal12").removeClass("hideCont"), $(".ContGoal13").removeClass("hideCont"), $(".ContGoal14").removeClass("hideCont"), $(".ContGoal15").removeClass("hideCont"), $(".ContGoal16").removeClass("hideCont")
    })), $("#slice17_17").mouseover((function() {
        $("#circle17").addClass("show")
    })), $("#slice17_17").mouseout((function() {
        $("#circle17").removeClass("show")
    })), $(".footerLeft > a.share").click((function() {
        $(".footerLeft > .sharePage").toggleClass("active"), $(".footerLeft > .sharePage").hasClass("active") ? $(this).attr("aria-expanded", "true") : $(this).attr("aria-expanded", "false")
    }))
})), $(document).on("click", "#slice1", (function() {
    $(".left_header").fadeOut(), $(".goal_1_specific").delay(1e3).fadeIn(), $(".goal_1_right_specific").delay(1e3).fadeIn(), $(".text1").addClass("selectedSlice"), $(".slice_11").addClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".text4").removeClass("selectedSlice"), $(".slice_44").removeClass("specific_slice_4"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice2", (function() {
    $(".left_header").fadeOut(), $(".goal_2_specific").delay(1e3).fadeIn(), $(".goal_2_right_specific").delay(1e3).fadeIn(), $(".text2").addClass("selectedSlice"), $(".slice_22").addClass("specific_slice_2"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".text4").removeClass("selectedSlice"), $(".slice_44").removeClass("specific_slice_4"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice3", (function() {
    $(".left_header").fadeOut(), $(".goal_3_specific").delay(1e3).fadeIn(), $(".goal_3_right_specific").delay(1e3).fadeIn(), $(".text3").addClass("selectedSlice"), $(".slice_33").addClass("specific_slice_3"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".text4").removeClass("selectedSlice"), $(".slice_44").removeClass("specific_slice_4"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice4", (function() {
    $(".left_header").fadeOut(), $(".goal_4_specific").delay(1e3).fadeIn(), $(".goal_4_right_specific").delay(1e3).fadeIn(), $(".text4").addClass("selectedSlice"), $(".slice_44").addClass("specific_slice_4"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice5", (function() {
    $(".left_header").fadeOut(), $(".goal_5_specific").delay(1e3).fadeIn(), $(".goal_5_right_specific").delay(1e3).fadeIn(), $(".text5").addClass("selectedSlice"), $(".slice_55").addClass("specific_slice_5"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice6", (function() {
    $(".left_header").fadeOut(), $(".goal_6_specific").delay(1e3).fadeIn(), $(".goal_6_right_specific").delay(1e3).fadeIn(), $(".text6").addClass("selectedSlice"), $(".slice_66").addClass("specific_slice_6"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice7", (function() {
    $(".left_header").fadeOut(), $(".goal_7_specific").delay(1e3).fadeIn(), $(".goal_7_right_specific").delay(1e3).fadeIn(), $(".text7").addClass("selectedSlice"), $(".slice_77").addClass("specific_slice_7"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice8", (function() {
    $(".left_header").fadeOut(), $(".goal_8_specific").delay(1e3).fadeIn(), $(".goal_8_right_specific").delay(1e3).fadeIn(), $(".text8").addClass("selectedSlice"), $(".slice_88").addClass("specific_slice_8"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice9", (function() {
    $(".left_header").fadeOut(), $(".goal_9_specific").delay(1e3).fadeIn(), $(".goal_9_right_specific").delay(1e3).fadeIn(), $(".text9").addClass("selectedSlice"), $(".slice_99").addClass("specific_slice_9"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".text4").removeClass("selectedSlice"), $(".slice_44").removeClass("specific_slice_4"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".slice_33").removeClass("specific_slice_3"), $(".text3").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice10", (function() {
    $(".left_header").fadeOut(), $(".goal_10_specific").delay(1e3).fadeIn(), $(".goal_10_right_specific").delay(1e3).fadeIn(), $(".text10").addClass("selectedSlice"), $(".slice_1010").addClass("specific_slice_10"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice11", (function() {
    $(".left_header").fadeOut(), $(".goal_11_specific").delay(1e3).fadeIn(), $(".goal_11_right_specific").delay(1e3).fadeIn(), $(".text11").addClass("selectedSlice"), $(".slice_1111").addClass("specific_slice_11"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice12", (function() {
    $(".left_header").fadeOut(), $(".goal_12_specific").delay(1e3).fadeIn(), $(".goal_12_right_specific").delay(1e3).fadeIn(), $(".text12").addClass("selectedSlice"), $(".slice_1212").addClass("specific_slice_12"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice13", (function() {
    $(".left_header").fadeOut(), $(".goal_13_specific").delay(1e3).fadeIn(), $(".goal_13_right_specific").delay(1e3).fadeIn(), $(".text13").addClass("selectedSlice"), $(".slice_1313").addClass("specific_slice_13"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice14", (function() {
    $(".left_header").fadeOut(), $(".goal_14_specific").delay(1e3).fadeIn(), $(".goal_14_right_specific").delay(1e3).fadeIn(), $(".text14").addClass("selectedSlice"), $(".slice_1414").addClass("specific_slice_14"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice15", (function() {
    $(".left_header").fadeOut(), $(".goal_15_specific").delay(1e3).fadeIn(), $(".goal_15_right_specific").delay(1e3).fadeIn(), $(".text15").addClass("selectedSlice"), $(".slice_1515").addClass("specific_slice_15"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".slice_1616").removeClass("specific_slice_16"), $(".text16").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice16", (function() {
    $(".left_header").fadeOut(), $(".goal_16_specific").delay(1e3).fadeIn(), $(".goal_16_right_specific").delay(1e3).fadeIn(), $(".text16").addClass("selectedSlice"), $(".slice_1616").addClass("specific_slice_16"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeOut(), $(".goal_17_right_specific").delay(1e3).fadeOut(), $(".slice_1717").removeClass("specific_slice_17"), $(".text17").removeClass("selectedSlice")
})), $(document).on("click", "#slice17", (function() {
    $(".left_header").fadeOut(), $(".left_header").fadeOut(), $(".goal_16_specific").delay(1e3).fadeOut(), $(".goal_16_right_specific").delay(1e3).fadeOut(), $(".text16").removeClass("selectedSlice"), $(".slice_1616").removeClass("specific_slice_16"), $(".goal_1_specific").delay(1e3).fadeOut(), $(".goal_1_right_specific").delay(1e3).fadeOut(), $(".text1").removeClass("selectedSlice"), $(".slice_11").removeClass("specific_slice_1"), $(".goal_2_specific").delay(1e3).fadeOut(), $(".goal_2_right_specific").delay(1e3).fadeOut(), $(".text2").removeClass("selectedSlice"), $(".slice_22").removeClass("specific_slice_2"), $(".goal_3_specific").delay(1e3).fadeOut(), $(".goal_3_right_specific").delay(1e3).fadeOut(), $(".text3").removeClass("selectedSlice"), $(".slice_33").removeClass("specific_slice_3"), $(".goal_4_specific").delay(1e3).fadeOut(), $(".goal_4_right_specific").delay(1e3).fadeOut(), $(".slice_44").removeClass("specific_slice_4"), $(".text4").removeClass("selectedSlice"), $(".goal_5_specific").delay(1e3).fadeOut(), $(".goal_5_right_specific").delay(1e3).fadeOut(), $(".slice_55").removeClass("specific_slice_5"), $(".text5").removeClass("selectedSlice"), $(".goal_6_specific").delay(1e3).fadeOut(), $(".goal_6_right_specific").delay(1e3).fadeOut(), $(".slice_66").removeClass("specific_slice_6"), $(".text6").removeClass("selectedSlice"), $(".goal_7_specific").delay(1e3).fadeOut(), $(".goal_7_right_specific").delay(1e3).fadeOut(), $(".slice_77").removeClass("specific_slice_7"), $(".text7").removeClass("selectedSlice"), $(".goal_8_specific").delay(1e3).fadeOut(), $(".goal_8_right_specific").delay(1e3).fadeOut(), $(".slice_88").removeClass("specific_slice_8"), $(".text8").removeClass("selectedSlice"), $(".goal_9_specific").delay(1e3).fadeOut(), $(".goal_9_right_specific").delay(1e3).fadeOut(), $(".slice_99").removeClass("specific_slice_9"), $(".text9").removeClass("selectedSlice"), $(".goal_10_specific").delay(1e3).fadeOut(), $(".goal_10_right_specific").delay(1e3).fadeOut(), $(".slice_1010").removeClass("specific_slice_10"), $(".text10").removeClass("selectedSlice"), $(".goal_11_specific").delay(1e3).fadeOut(), $(".goal_11_right_specific").delay(1e3).fadeOut(), $(".slice_1111").removeClass("specific_slice_11"), $(".text11").removeClass("selectedSlice"), $(".goal_12_specific").delay(1e3).fadeOut(), $(".goal_12_right_specific").delay(1e3).fadeOut(), $(".slice_1212").removeClass("specific_slice_12"), $(".text12").removeClass("selectedSlice"), $(".goal_13_specific").delay(1e3).fadeOut(), $(".goal_13_right_specific").delay(1e3).fadeOut(), $(".slice_1313").removeClass("specific_slice_13"), $(".text13").removeClass("selectedSlice"), $(".goal_14_specific").delay(1e3).fadeOut(), $(".goal_14_right_specific").delay(1e3).fadeOut(), $(".slice_1414").removeClass("specific_slice_14"), $(".text14").removeClass("selectedSlice"), $(".goal_15_specific").delay(1e3).fadeOut(), $(".goal_15_right_specific").delay(1e3).fadeOut(), $(".slice_1515").removeClass("specific_slice_15"), $(".text15").removeClass("selectedSlice"), $(".goal_17_specific").delay(1e3).fadeIn(), $(".goal_17_right_specific").delay(1e3).fadeIn(), $(".text17").addClass("selectedSlice"), $(".slice_1717").addClass("specific_slice_17")
})), $(document).ready((function() {
    $(".nuxt-progress").animate({
        width: "100%"
    }, 1e3), $(".nuxt-progress").fadeOut("500")
})), $(document).on("click", ".reset", (function() {
    $(".left_header").fadeIn()
})), $("ul.sdg_dropdown_1").on("click", ".init", (function() {
    $(this).closest("ul.sdg_dropdown_1").children("li:not(.init)").toggle()
}));
var allOptions = $("ul.sdg_dropdown_1").children("li:not(.init)");
$("ul.sdg_dropdown_1").on("click", "li:not(.init)", (function() {
        allOptions.removeClass("selected"), $(this).addClass("selected"), $("ul.sdg_dropdown_1").children(".init").html($(this).html()), allOptions.toggle()
    })), $(".dropdown-menu li a").click((function() {
        $(this).parents(".dropdown").find(".btn").html($(this).text() + ' <span class="caret"></span>'), $(this).parents(".dropdown").find(".btn").val($(this).data("value"))
    })), $(document).ready((function() {
        $("#state_1").focusin((function() {
            $(".down_arrow").css("transform", "rotate(180deg)"), $(".down_arrow").css("transition", "0.2s ease-out")
        })), $("#state_1").focusout((function() {
            $(".down_arrow").css("transform", "rotate(0deg)"), $(".down_arrow").css("transition", "0.2s ease-out")
        })), $("#state_2").focusin((function() {
            $(".down_arrow_1").css("transform", "rotate(180deg)"), $(".down_arrow_1").css("transition", "0.2s ease-out")
        })), $("#state_2").focusout((function() {
            $(".down_arrow_1").css("transform", "rotate(0deg)"), $(".down_arrow_1").css("transition", "0.2s ease-out")
        })), $(".form-control.goal_control").focusin((function() {
            $(".search_arrow").css("transform", "rotate(180deg)"), $(".search_arrow").css("transition", "0.2s ease-out"), $(".close_icon").css("display", "none"), $(".specific_pagination").css("display", "block"), $("#box_chart").css("display", "block")
        })), $(".form-control.goal_control").focusout((function() {
            $(".search_arrow").css("transform", "rotate(0deg)"), $(".search_arrow").css("transition", "0.2s ease-out"), $(".close_icon").css("display", "block"), $(".specific_pagination").css("display", "none"), $("#box_chart").css("display", "none")
        }))
    })), $(document).on("click", ".wonderful_goal", (function() {
        $(".wonderful_goal").toggleClass("active")
    })), $(document).on("click", ".dropdown-goal ul > li", (function() {
        let e = $(this).find(".p-r-xs").html();
        $("#goalText").html(e + " " + $(this).find(".p-r-xl").text());
        for (let t = 1; t <= 17; t++) $(".dropdown-goal").removeClass("goal-" + t + "-color");
        $(".dropdown-goal").addClass("goal-" + e + "-color")
    })), $(document).on("click", ".bottom_goal", (function() {
        $(".bottom_goal").removeClass("selected"), $(this).addClass("selected")
    })), $((function() {
        setTimeout((function() {
            $(".loader_specific").fadeOut(1e3)
        }))
    })), $(".dropdown-menu.highlight-menu li").hover((function() {
        $(this).addClass("highlight")
    }), (function() {
        $(this).removeClass("highlight")
    })), $(document).ready((function() {
        $(".form-control.goal_control").focusin((function() {
            $(".dropdown-menu.highlight-menu").css("display", "block")
        })), $(".form-control.goal_control").focusout((function() {
            $(".dropdown-menu.highlight-menu").css("display", "none")
        }))
    })), $(document).on("click", "li", (function() {})), particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: !0,
                    value_area: 700
                }
            },
            color: {
                value: "#49c4f2"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#c1ebfa"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 1,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 1,
                    opacity_min: .1,
                    sync: !1
                }
            },
            size: {
                value: 4,
                random: !0,
                anim: {
                    enable: !1,
                    speed: 40,
                    size_min: .1,
                    sync: !1
                }
            },
            line_linked: {
                enable: !0,
                distance: 150,
                color: "#bceafb",
                opacity: 1,
                width: 1
            },
            move: {
                enable: !0,
                speed: 3,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {
                    enable: !1,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !0,
                    mode: "grab"
                },
                onclick: {
                    enable: !0,
                    mode: "push"
                },
                resize: !0
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: .2
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: !0
    }),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
    }((function(e) {
        e.ui = e.ui || {}, e.ui.version = "1.12.1";
        var t, i = 0,
            s = Array.prototype.slice;
        e.cleanData = (t = e.cleanData, function(i) {
            var s, o, a;
            for (a = 0; null != (o = i[a]); a++) try {
                (s = e._data(o, "events")) && s.remove && e(o).triggerHandler("remove")
            } catch (n) {}
            t(i)
        }), e.widget = function(t, i, s) {
            var o, a, n, r = {},
                l = t.split(".")[0],
                c = l + "-" + (t = t.split(".")[1]);
            return s || (s = i, i = e.Widget), e.isArray(s) && (s = e.extend.apply(null, [{}].concat(s))), e.expr[":"][c.toLowerCase()] = function(t) {
                return !!e.data(t, c)
            }, e[l] = e[l] || {}, o = e[l][t], a = e[l][t] = function(e, t) {
                if (!this._createWidget) return new a(e, t);
                arguments.length && this._createWidget(e, t)
            }, e.extend(a, o, {
                version: s.version,
                _proto: e.extend({}, s),
                _childConstructors: []
            }), (n = new i).options = e.widget.extend({}, n.options), e.each(s, (function(t, s) {
                r[t] = e.isFunction(s) ? function() {
                    function e() {
                        return i.prototype[t].apply(this, arguments)
                    }

                    function o(e) {
                        return i.prototype[t].apply(this, e)
                    }
                    return function() {
                        var t, i = this._super,
                            a = this._superApply;
                        return this._super = e, this._superApply = o, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
                    }
                }() : s
            })), a.prototype = e.widget.extend(n, {
                widgetEventPrefix: o && n.widgetEventPrefix || t
            }, r, {
                constructor: a,
                namespace: l,
                widgetName: t,
                widgetFullName: c
            }), o ? (e.each(o._childConstructors, (function(t, i) {
                var s = i.prototype;
                e.widget(s.namespace + "." + s.widgetName, a, i._proto)
            })), delete o._childConstructors) : i._childConstructors.push(a), e.widget.bridge(t, a), a
        }, e.widget.extend = function(t) {
            for (var i, o, a = s.call(arguments, 1), n = 0, r = a.length; n < r; n++)
                for (i in a[n]) o = a[n][i], a[n].hasOwnProperty(i) && void 0 !== o && (t[i] = e.isPlainObject(o) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], o) : e.widget.extend({}, o) : o);
            return t
        }, e.widget.bridge = function(t, i) {
            var o = i.prototype.widgetFullName || t;
            e.fn[t] = function(a) {
                var n = "string" == typeof a,
                    r = s.call(arguments, 1),
                    l = this;
                return n ? this.length || "instance" !== a ? this.each((function() {
                    var i, s = e.data(this, o);
                    return "instance" === a ? (l = s, !1) : s ? e.isFunction(s[a]) && "_" !== a.charAt(0) ? (i = s[a].apply(s, r)) !== s && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0 : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + a + "'")
                })) : l = void 0 : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each((function() {
                    var t = e.data(this, o);
                    t ? (t.option(a || {}), t._init && t._init()) : e.data(this, o, new i(a, this))
                }))), l
            }
        }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                classes: {},
                disabled: !1,
                create: null
            },
            _createWidget: function(t, s) {
                s = e(s || this.defaultElement || this)[0], this.element = e(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), this.classesElementLookup = {}, s !== this && (e.data(s, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(e) {
                        e.target === s && this.destroy()
                    }
                }), this.document = e(s.style ? s.ownerDocument : s.document || s), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: function() {
                return {}
            },
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function() {
                var t = this;
                this._destroy(), e.each(this.classesElementLookup, (function(e, i) {
                    t._removeClass(i, e)
                })), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
            },
            _destroy: e.noop,
            widget: function() {
                return this.element
            },
            option: function(t, i) {
                var s, o, a, n = t;
                if (0 === arguments.length) return e.widget.extend({}, this.options);
                if ("string" == typeof t)
                    if (n = {}, s = t.split("."), t = s.shift(), s.length) {
                        for (o = n[t] = e.widget.extend({}, this.options[t]), a = 0; a < s.length - 1; a++) o[s[a]] = o[s[a]] || {}, o = o[s[a]];
                        if (t = s.pop(), 1 === arguments.length) return void 0 === o[t] ? null : o[t];
                        o[t] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                        n[t] = i
                    } return this._setOptions(n), this
            },
            _setOptions: function(e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function(e, t) {
                return "classes" === e && this._setOptionClasses(t), this.options[e] = t, "disabled" === e && this._setOptionDisabled(t), this
            },
            _setOptionClasses: function(t) {
                var i, s, o;
                for (i in t) o = this.classesElementLookup[i], t[i] !== this.options.classes[i] && o && o.length && (s = e(o.get()), this._removeClass(o, i), s.addClass(this._classes({
                    element: s,
                    keys: i,
                    classes: t,
                    add: !0
                })))
            },
            _setOptionDisabled: function(e) {
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e), e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _classes: function(t) {
                var i = [],
                    s = this;

                function o(o, a) {
                    var n, r;
                    for (r = 0; r < o.length; r++) n = s.classesElementLookup[o[r]] || e(), n = e(t.add ? e.unique(n.get().concat(t.element.get())) : n.not(t.element).get()), s.classesElementLookup[o[r]] = n, i.push(o[r]), a && t.classes[o[r]] && i.push(t.classes[o[r]])
                }
                return t = e.extend({
                    element: this.element,
                    classes: this.options.classes || {}
                }, t), this._on(t.element, {
                    remove: "_untrackClassesElement"
                }), t.keys && o(t.keys.match(/\S+/g) || [], !0), t.extra && o(t.extra.match(/\S+/g) || []), i.join(" ")
            },
            _untrackClassesElement: function(t) {
                var i = this;
                e.each(i.classesElementLookup, (function(s, o) {
                    -1 !== e.inArray(t.target, o) && (i.classesElementLookup[s] = e(o.not(t.target).get()))
                }))
            },
            _removeClass: function(e, t, i) {
                return this._toggleClass(e, t, i, !1)
            },
            _addClass: function(e, t, i) {
                return this._toggleClass(e, t, i, !0)
            },
            _toggleClass: function(e, t, i, s) {
                var o = "string" == typeof e || null === e,
                    a = {
                        extra: o ? t : i,
                        keys: o ? e : t,
                        element: o ? this.element : e,
                        add: s = "boolean" == typeof s ? s : i
                    };
                return a.element.toggleClass(this._classes(a), s), this
            },
            _on: function(t, i, s) {
                var o, a = this;
                "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = o = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, o = this.widget()), e.each(s, (function(s, n) {
                    function r() {
                        if (t || !0 !== a.options.disabled && !e(this).hasClass("ui-state-disabled")) return ("string" == typeof n ? a[n] : n).apply(a, arguments)
                    }
                    "string" != typeof n && (r.guid = n.guid = n.guid || r.guid || e.guid++);
                    var l = s.match(/^([\w:-]*)\s*(.*)$/),
                        c = l[1] + a.eventNamespace,
                        d = l[2];
                    d ? o.on(c, d, r) : i.on(c, r)
                }))
            },
            _off: function(t, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.off(i).off(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
            },
            _delay: function(e, t) {
                var i = this;
                return setTimeout((function() {
                    return ("string" == typeof e ? i[e] : e).apply(i, arguments)
                }), t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function(t) {
                        this._addClass(e(t.currentTarget), null, "ui-state-hover")
                    },
                    mouseleave: function(t) {
                        this._removeClass(e(t.currentTarget), null, "ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function(t) {
                        this._addClass(e(t.currentTarget), null, "ui-state-focus")
                    },
                    focusout: function(t) {
                        this._removeClass(e(t.currentTarget), null, "ui-state-focus")
                    }
                })
            },
            _trigger: function(t, i, s) {
                var o, a, n = this.options[t];
                if (s = s || {}, (i = e.Event(i)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                    for (o in a) o in i || (i[o] = a[o]);
                return this.element.trigger(i, s), !(e.isFunction(n) && !1 === n.apply(this.element[0], [i].concat(s)) || i.isDefaultPrevented())
            }
        }, e.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, (function(t, i) {
            e.Widget.prototype["_" + t] = function(s, o, a) {
                var n;
                "string" == typeof o && (o = {
                    effect: o
                });
                var r = o ? !0 === o || "number" == typeof o ? i : o.effect || i : t;
                "number" == typeof(o = o || {}) && (o = {
                    duration: o
                }), n = !e.isEmptyObject(o), o.complete = a, o.delay && s.delay(o.delay), n && e.effects && e.effects.effect[r] ? s[t](o) : r !== t && s[r] ? s[r](o.duration, o.easing, a) : s.queue((function(i) {
                    e(this)[t](), a && a.call(s[0]), i()
                }))
            }
        }))
    })),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery)
    }((function(e) {
        "use strict";
        var t = 0,
            i = e,
            s = "parseJSON";
        "JSON" in window && "parse" in JSON && (i = JSON, s = "parse"), e.ajaxTransport("iframe", (function(i) {
            if (i.async) {
                var s, o, a, n = i.initialIframeSrc || "javascript:false;";
                return {
                    send: function(r, l) {
                        (s = e('<form style="display:none;"></form>')).attr("accept-charset", i.formAcceptCharset), a = /\?/.test(i.url) ? "&" : "?", "DELETE" === i.type ? (i.url = i.url + a + "_method=DELETE", i.type = "POST") : "PUT" === i.type ? (i.url = i.url + a + "_method=PUT", i.type = "POST") : "PATCH" === i.type && (i.url = i.url + a + "_method=PATCH", i.type = "POST"), o = e('<iframe src="' + n + '" name="iframe-transport-' + (t += 1) + '"></iframe>').bind("load", (function() {
                            var t, a = e.isArray(i.paramName) ? i.paramName : [i.paramName];
                            o.unbind("load").bind("load", (function() {
                                var t;
                                try {
                                    if (!(t = o.contents()).length || !t[0].firstChild) throw new Error
                                } catch (i) {
                                    t = void 0
                                }
                                l(200, "success", {
                                    iframe: t
                                }), e('<iframe src="' + n + '"></iframe>').appendTo(s), window.setTimeout((function() {
                                    s.remove()
                                }), 0)
                            })), s.prop("target", o.prop("name")).prop("action", i.url).prop("method", i.type), i.formData && e.each(i.formData, (function(t, i) {
                                e('<input type="hidden"/>').prop("name", i.name).val(i.value).appendTo(s)
                            })), i.fileInput && i.fileInput.length && "POST" === i.type && (t = i.fileInput.clone(), i.fileInput.after((function(e) {
                                return t[e]
                            })), i.paramName && i.fileInput.each((function(t) {
                                e(this).prop("name", a[t] || i.paramName)
                            })), s.append(i.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"), i.fileInput.removeAttr("form")), s.submit(), t && t.length && i.fileInput.each((function(i, s) {
                                var o = e(t[i]);
                                e(s).prop("name", o.prop("name")).attr("form", o.attr("form")), o.replaceWith(s)
                            }))
                        })), s.append(o).appendTo(document.body)
                    },
                    abort: function() {
                        o && o.unbind("load").prop("src", n), s && s.remove()
                    }
                }
            }
        })), e.ajaxSetup({
            converters: {
                "iframe text": function(t) {
                    return t && e(t[0].body).text()
                },
                "iframe json": function(t) {
                    return t && i[s](e(t[0].body).text())
                },
                "iframe html": function(t) {
                    return t && e(t[0].body).html()
                },
                "iframe xml": function(t) {
                    var i = t && t[0];
                    return i && e.isXMLDoc(i) ? i : e.parseXML(i.XMLDocument && i.XMLDocument.xml || e(i.body).html())
                },
                "iframe script": function(t) {
                    return t && e.globalEval(e(t[0].body).text())
                }
            }
        })
    })),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "jquery-ui/ui/widget"], e) : "object" == typeof exports ? e(require("jquery"), require("./vendor/jquery.ui.widget")) : e(window.jQuery)
    }((function(e) {
        "use strict";

        function t(t) {
            var i = "dragover" === t;
            return function(s) {
                s.dataTransfer = s.originalEvent && s.originalEvent.dataTransfer;
                var o = s.dataTransfer;
                o && -1 !== e.inArray("Files", o.types) && !1 !== this._trigger(t, e.Event(t, {
                    delegatedEvent: s
                })) && (s.preventDefault(), i && (o.dropEffect = "copy"))
            }
        }
        e.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || e('<input type="file"/>').prop("disabled")), e.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader), e.support.xhrFormDataFileUpload = !!window.FormData, e.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), e.widget("blueimp.fileupload", {
            options: {
                dropZone: e(document),
                pasteZone: void 0,
                fileInput: void 0,
                replaceFileInput: !0,
                paramName: void 0,
                singleFileUploads: !0,
                limitMultiFileUploads: void 0,
                limitMultiFileUploadSize: void 0,
                limitMultiFileUploadSizeOverhead: 512,
                sequentialUploads: !1,
                limitConcurrentUploads: void 0,
                forceIframeTransport: !1,
                redirect: void 0,
                redirectParamName: void 0,
                postMessage: void 0,
                multipart: !0,
                maxChunkSize: void 0,
                uploadedBytes: void 0,
                recalculateProgress: !0,
                progressInterval: 100,
                bitrateInterval: 500,
                autoUpload: !0,
                uniqueFilenames: void 0,
                messages: {
                    uploadedBytes: "Uploaded bytes exceed file size"
                },
                i18n: function(t, i) {
                    return t = this.messages[t] || t.toString(), i && e.each(i, (function(e, i) {
                        t = t.replace("{" + e + "}", i)
                    })), t
                },
                formData: function(e) {
                    return e.serializeArray()
                },
                add: function(t, i) {
                    if (t.isDefaultPrevented()) return !1;
                    (i.autoUpload || !1 !== i.autoUpload && e(this).fileupload("option", "autoUpload")) && i.process().done((function() {
                        i.submit()
                    }))
                },
                processData: !1,
                contentType: !1,
                cache: !1,
                timeout: 0
            },
            _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
            _blobSlice: e.support.blobSlice && function() {
                var e = this.slice || this.webkitSlice || this.mozSlice;
                return e.apply(this, arguments)
            },
            _BitrateTimer: function() {
                this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function(e, t, i) {
                    var s = e - this.timestamp;
                    return (!this.bitrate || !i || s > i) && (this.bitrate = 1e3 / s * (t - this.loaded) * 8, this.loaded = t, this.timestamp = e), this.bitrate
                }
            },
            _isXHRUpload: function(t) {
                return !t.forceIframeTransport && (!t.multipart && e.support.xhrFileUpload || e.support.xhrFormDataFileUpload)
            },
            _getFormData: function(t) {
                var i;
                return "function" === e.type(t.formData) ? t.formData(t.form) : e.isArray(t.formData) ? t.formData : "object" === e.type(t.formData) ? (i = [], e.each(t.formData, (function(e, t) {
                    i.push({
                        name: e,
                        value: t
                    })
                })), i) : []
            },
            _getTotal: function(t) {
                var i = 0;
                return e.each(t, (function(e, t) {
                    i += t.size || 1
                })), i
            },
            _initProgressObject: function(t) {
                var i = {
                    loaded: 0,
                    total: 0,
                    bitrate: 0
                };
                t._progress ? e.extend(t._progress, i) : t._progress = i
            },
            _initResponseObject: function(e) {
                var t;
                if (e._response)
                    for (t in e._response) e._response.hasOwnProperty(t) && delete e._response[t];
                else e._response = {}
            },
            _onProgress: function(t, i) {
                if (t.lengthComputable) {
                    var s, o = Date.now ? Date.now() : (new Date).getTime();
                    if (i._time && i.progressInterval && o - i._time < i.progressInterval && t.loaded !== t.total) return;
                    i._time = o, s = Math.floor(t.loaded / t.total * (i.chunkSize || i._progress.total)) + (i.uploadedBytes || 0), this._progress.loaded += s - i._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(o, this._progress.loaded, i.bitrateInterval), i._progress.loaded = i.loaded = s, i._progress.bitrate = i.bitrate = i._bitrateTimer.getBitrate(o, s, i.bitrateInterval), this._trigger("progress", e.Event("progress", {
                        delegatedEvent: t
                    }), i), this._trigger("progressall", e.Event("progressall", {
                        delegatedEvent: t
                    }), this._progress)
                }
            },
            _initProgressListener: function(t) {
                var i = this,
                    s = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
                s.upload && (e(s.upload).bind("progress", (function(e) {
                    var s = e.originalEvent;
                    e.lengthComputable = s.lengthComputable, e.loaded = s.loaded, e.total = s.total, i._onProgress(e, t)
                })), t.xhr = function() {
                    return s
                })
            },
            _deinitProgressListener: function(t) {
                var i = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
                i.upload && e(i.upload).unbind("progress")
            },
            _isInstanceOf: function(e, t) {
                return Object.prototype.toString.call(t) === "[object " + e + "]"
            },
            _getUniqueFilename: function(e, t) {
                return t[e = String(e)] ? (e = e.replace(/(?: \(([\d]+)\))?(\.[^.]+)?$/, (function(e, t, i) {
                    return " (" + (t ? Number(t) + 1 : 1) + ")" + (i || "")
                })), this._getUniqueFilename(e, t)) : (t[e] = !0, e)
            },
            _initXHRData: function(t) {
                var i, s = this,
                    o = t.files[0],
                    a = t.multipart || !e.support.xhrFileUpload,
                    n = "array" === e.type(t.paramName) ? t.paramName[0] : t.paramName;
                t.headers = e.extend({}, t.headers), t.contentRange && (t.headers["Content-Range"] = t.contentRange), a && !t.blob && this._isInstanceOf("File", o) || (t.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(o.uploadName || o.name) + '"'), a ? e.support.xhrFormDataFileUpload && (t.postMessage ? (i = this._getFormData(t), t.blob ? i.push({
                    name: n,
                    value: t.blob
                }) : e.each(t.files, (function(s, o) {
                    i.push({
                        name: "array" === e.type(t.paramName) && t.paramName[s] || n,
                        value: o
                    })
                }))) : (s._isInstanceOf("FormData", t.formData) ? i = t.formData : (i = new FormData, e.each(this._getFormData(t), (function(e, t) {
                    i.append(t.name, t.value)
                }))), t.blob ? i.append(n, t.blob, o.uploadName || o.name) : e.each(t.files, (function(o, a) {
                    if (s._isInstanceOf("File", a) || s._isInstanceOf("Blob", a)) {
                        var r = a.uploadName || a.name;
                        t.uniqueFilenames && (r = s._getUniqueFilename(r, t.uniqueFilenames)), i.append("array" === e.type(t.paramName) && t.paramName[o] || n, a, r)
                    }
                }))), t.data = i) : (t.contentType = o.type || "application/octet-stream", t.data = t.blob || o), t.blob = null
            },
            _initIframeSettings: function(t) {
                var i = e("<a></a>").prop("href", t.url).prop("host");
                t.dataType = "iframe " + (t.dataType || ""), t.formData = this._getFormData(t), t.redirect && i && i !== location.host && t.formData.push({
                    name: t.redirectParamName || "redirect",
                    value: t.redirect
                })
            },
            _initDataSettings: function(e) {
                this._isXHRUpload(e) ? (this._chunkedUpload(e, !0) || (e.data || this._initXHRData(e), this._initProgressListener(e)), e.postMessage && (e.dataType = "postmessage " + (e.dataType || ""))) : this._initIframeSettings(e)
            },
            _getParamName: function(t) {
                var i = e(t.fileInput),
                    s = t.paramName;
                return s ? e.isArray(s) || (s = [s]) : (s = [], i.each((function() {
                    for (var t = e(this), i = t.prop("name") || "files[]", o = (t.prop("files") || [1]).length; o;) s.push(i), o -= 1
                })), s.length || (s = [i.prop("name") || "files[]"])), s
            },
            _initFormSettings: function(t) {
                t.form && t.form.length || (t.form = e(t.fileInput.prop("form")), t.form.length || (t.form = e(this.options.fileInput.prop("form")))), t.paramName = this._getParamName(t), t.url || (t.url = t.form.prop("action") || location.href), t.type = (t.type || "string" === e.type(t.form.prop("method")) && t.form.prop("method") || "").toUpperCase(), "POST" !== t.type && "PUT" !== t.type && "PATCH" !== t.type && (t.type = "POST"), t.formAcceptCharset || (t.formAcceptCharset = t.form.attr("accept-charset"))
            },
            _getAJAXSettings: function(t) {
                var i = e.extend({}, this.options, t);
                return this._initFormSettings(i), this._initDataSettings(i), i
            },
            _getDeferredState: function(e) {
                return e.state ? e.state() : e.isResolved() ? "resolved" : e.isRejected() ? "rejected" : "pending"
            },
            _enhancePromise: function(e) {
                return e.success = e.done, e.error = e.fail, e.complete = e.always, e
            },
            _getXHRPromise: function(t, i, s) {
                var o = e.Deferred(),
                    a = o.promise();
                return i = i || this.options.context || a, !0 === t ? o.resolveWith(i, s) : !1 === t && o.rejectWith(i, s), a.abort = o.promise, this._enhancePromise(a)
            },
            _addConvenienceMethods: function(t, i) {
                var s = this,
                    o = function(t) {
                        return e.Deferred().resolveWith(s, t).promise()
                    };
                i.process = function(t, a) {
                    return (t || a) && (i._processQueue = this._processQueue = (this._processQueue || o([this])).then((function() {
                        return i.errorThrown ? e.Deferred().rejectWith(s, [i]).promise() : o(arguments)
                    })).then(t, a)), this._processQueue || o([this])
                }, i.submit = function() {
                    return "pending" !== this.state() && (i.jqXHR = this.jqXHR = !1 !== s._trigger("submit", e.Event("submit", {
                        delegatedEvent: t
                    }), this) && s._onSend(t, this)), this.jqXHR || s._getXHRPromise()
                }, i.abort = function() {
                    return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort", s._trigger("fail", null, this), s._getXHRPromise(!1))
                }, i.state = function() {
                    return this.jqXHR ? s._getDeferredState(this.jqXHR) : this._processQueue ? s._getDeferredState(this._processQueue) : void 0
                }, i.processing = function() {
                    return !this.jqXHR && this._processQueue && "pending" === s._getDeferredState(this._processQueue)
                }, i.progress = function() {
                    return this._progress
                }, i.response = function() {
                    return this._response
                }
            },
            _getUploadedBytes: function(e) {
                var t = e.getResponseHeader("Range"),
                    i = t && t.split("-"),
                    s = i && i.length > 1 && parseInt(i[1], 10);
                return s && s + 1
            },
            _chunkedUpload: function(t, i) {
                t.uploadedBytes = t.uploadedBytes || 0;
                var s, o, a = this,
                    n = t.files[0],
                    r = n.size,
                    l = t.uploadedBytes,
                    c = t.maxChunkSize || r,
                    d = this._blobSlice,
                    u = e.Deferred(),
                    f = u.promise();
                return !(!(this._isXHRUpload(t) && d && (l || ("function" === e.type(c) ? c(t) : c) < r)) || t.data) && (!!i || (l >= r ? (n.error = t.i18n("uploadedBytes"), this._getXHRPromise(!1, t.context, [null, "error", n.error])) : (o = function() {
                    var i = e.extend({}, t),
                        f = i._progress.loaded;
                    i.blob = d.call(n, l, l + ("function" === e.type(c) ? c(i) : c), n.type), i.chunkSize = i.blob.size, i.contentRange = "bytes " + l + "-" + (l + i.chunkSize - 1) + "/" + r, a._trigger("chunkbeforesend", null, i), a._initXHRData(i), a._initProgressListener(i), s = (!1 !== a._trigger("chunksend", null, i) && e.ajax(i) || a._getXHRPromise(!1, i.context)).done((function(s, n, c) {
                        l = a._getUploadedBytes(c) || l + i.chunkSize, f + i.chunkSize - i._progress.loaded && a._onProgress(e.Event("progress", {
                            lengthComputable: !0,
                            loaded: l - i.uploadedBytes,
                            total: l - i.uploadedBytes
                        }), i), t.uploadedBytes = i.uploadedBytes = l, i.result = s, i.textStatus = n, i.jqXHR = c, a._trigger("chunkdone", null, i), a._trigger("chunkalways", null, i), l < r ? o() : u.resolveWith(i.context, [s, n, c])
                    })).fail((function(e, t, s) {
                        i.jqXHR = e, i.textStatus = t, i.errorThrown = s, a._trigger("chunkfail", null, i), a._trigger("chunkalways", null, i), u.rejectWith(i.context, [e, t, s])
                    })).always((function() {
                        a._deinitProgressListener(i)
                    }))
                }, this._enhancePromise(f), f.abort = function() {
                    return s.abort()
                }, o(), f)))
            },
            _beforeSend: function(e, t) {
                0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(t), this._initProgressObject(t), t._progress.loaded = t.loaded = t.uploadedBytes || 0, t._progress.total = t.total = this._getTotal(t.files) || 1, t._progress.bitrate = t.bitrate = 0, this._active += 1, this._progress.loaded += t.loaded, this._progress.total += t.total
            },
            _onDone: function(t, i, s, o) {
                var a = o._progress.total,
                    n = o._response;
                o._progress.loaded < a && this._onProgress(e.Event("progress", {
                    lengthComputable: !0,
                    loaded: a,
                    total: a
                }), o), n.result = o.result = t, n.textStatus = o.textStatus = i, n.jqXHR = o.jqXHR = s, this._trigger("done", null, o)
            },
            _onFail: function(e, t, i, s) {
                var o = s._response;
                s.recalculateProgress && (this._progress.loaded -= s._progress.loaded, this._progress.total -= s._progress.total), o.jqXHR = s.jqXHR = e, o.textStatus = s.textStatus = t, o.errorThrown = s.errorThrown = i, this._trigger("fail", null, s)
            },
            _onAlways: function(e, t, i, s) {
                this._trigger("always", null, s)
            },
            _onSend: function(t, i) {
                i.submit || this._addConvenienceMethods(t, i);
                var s, o, a, n, r = this,
                    l = r._getAJAXSettings(i),
                    c = function() {
                        return r._sending += 1, l._bitrateTimer = new r._BitrateTimer, s = s || ((o || !1 === r._trigger("send", e.Event("send", {
                            delegatedEvent: t
                        }), l)) && r._getXHRPromise(!1, l.context, o) || r._chunkedUpload(l) || e.ajax(l)).done((function(e, t, i) {
                            r._onDone(e, t, i, l)
                        })).fail((function(e, t, i) {
                            r._onFail(e, t, i, l)
                        })).always((function(e, t, i) {
                            if (r._deinitProgressListener(l), r._onAlways(e, t, i, l), r._sending -= 1, r._active -= 1, l.limitConcurrentUploads && l.limitConcurrentUploads > r._sending)
                                for (var s = r._slots.shift(); s;) {
                                    if ("pending" === r._getDeferredState(s)) {
                                        s.resolve();
                                        break
                                    }
                                    s = r._slots.shift()
                                }
                            0 === r._active && r._trigger("stop")
                        }))
                    };
                return this._beforeSend(t, l), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (a = e.Deferred(), this._slots.push(a), n = a.then(c)) : (this._sequence = this._sequence.then(c, c), n = this._sequence), n.abort = function() {
                    return o = [void 0, "abort", "abort"], s ? s.abort() : (a && a.rejectWith(l.context, o), c())
                }, this._enhancePromise(n)) : c()
            },
            _onAdd: function(t, i) {
                var s, o, a, n, r = this,
                    l = !0,
                    c = e.extend({}, this.options, i),
                    d = i.files,
                    u = d.length,
                    f = c.limitMultiFileUploads,
                    p = c.limitMultiFileUploadSize,
                    h = c.limitMultiFileUploadSizeOverhead,
                    m = 0,
                    g = this._getParamName(c),
                    v = 0;
                if (!u) return !1;
                if (p && void 0 === d[0].size && (p = void 0), (c.singleFileUploads || f || p) && this._isXHRUpload(c))
                    if (c.singleFileUploads || p || !f)
                        if (!c.singleFileUploads && p)
                            for (a = [], s = [], n = 0; n < u; n += 1) m += d[n].size + h, (n + 1 === u || m + d[n + 1].size + h > p || f && n + 1 - v >= f) && (a.push(d.slice(v, n + 1)), (o = g.slice(v, n + 1)).length || (o = g), s.push(o), v = n + 1, m = 0);
                        else s = g;
                else
                    for (a = [], s = [], n = 0; n < u; n += f) a.push(d.slice(n, n + f)), (o = g.slice(n, n + f)).length || (o = g), s.push(o);
                else a = [d], s = [g];
                return i.originalFiles = d, e.each(a || d, (function(o, n) {
                    var c = e.extend({}, i);
                    return c.files = a ? n : [n], c.paramName = s[o], r._initResponseObject(c), r._initProgressObject(c), r._addConvenienceMethods(t, c), l = r._trigger("add", e.Event("add", {
                        delegatedEvent: t
                    }), c)
                })), l
            },
            _replaceFileInput: function(t) {
                var i = t.fileInput,
                    s = i.clone(!0),
                    o = i.is(document.activeElement);
                t.fileInputClone = s, e("<form></form>").append(s)[0].reset(), i.after(s).detach(), o && s.focus(), e.cleanData(i.unbind("remove")), this.options.fileInput = this.options.fileInput.map((function(e, t) {
                    return t === i[0] ? s[0] : t
                })), i[0] === this.element[0] && (this.element = s)
            },
            _handleFileTreeEntry: function(t, i) {
                var s, o = this,
                    a = e.Deferred(),
                    n = [],
                    r = function(e) {
                        e && !e.entry && (e.entry = t), a.resolve([e])
                    },
                    l = function() {
                        s.readEntries((function(e) {
                            e.length ? (n = n.concat(e), l()) : function(e) {
                                o._handleFileTreeEntries(e, i + t.name + "/").done((function(e) {
                                    a.resolve(e)
                                })).fail(r)
                            }(n)
                        }), r)
                    };
                return i = i || "", t.isFile ? t._file ? (t._file.relativePath = i, a.resolve(t._file)) : t.file((function(e) {
                    e.relativePath = i, a.resolve(e)
                }), r) : t.isDirectory ? (s = t.createReader(), l()) : a.resolve([]), a.promise()
            },
            _handleFileTreeEntries: function(t, i) {
                var s = this;
                return e.when.apply(e, e.map(t, (function(e) {
                    return s._handleFileTreeEntry(e, i)
                }))).then((function() {
                    return Array.prototype.concat.apply([], arguments)
                }))
            },
            _getDroppedFiles: function(t) {
                var i = (t = t || {}).items;
                return i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry) ? this._handleFileTreeEntries(e.map(i, (function(e) {
                    var t;
                    return e.webkitGetAsEntry ? ((t = e.webkitGetAsEntry()) && (t._file = e.getAsFile()), t) : e.getAsEntry()
                }))) : e.Deferred().resolve(e.makeArray(t.files)).promise()
            },
            _getSingleFileInputFiles: function(t) {
                var i, s, o = (t = e(t)).prop("webkitEntries") || t.prop("entries");
                if (o && o.length) return this._handleFileTreeEntries(o);
                if ((i = e.makeArray(t.prop("files"))).length) void 0 === i[0].name && i[0].fileName && e.each(i, (function(e, t) {
                    t.name = t.fileName, t.size = t.fileSize
                }));
                else {
                    if (!(s = t.prop("value"))) return e.Deferred().resolve([]).promise();
                    i = [{
                        name: s.replace(/^.*\\/, "")
                    }]
                }
                return e.Deferred().resolve(i).promise()
            },
            _getFileInputFiles: function(t) {
                return t instanceof e && 1 !== t.length ? e.when.apply(e, e.map(t, this._getSingleFileInputFiles)).then((function() {
                    return Array.prototype.concat.apply([], arguments)
                })) : this._getSingleFileInputFiles(t)
            },
            _onChange: function(t) {
                var i = this,
                    s = {
                        fileInput: e(t.target),
                        form: e(t.target.form)
                    };
                this._getFileInputFiles(s.fileInput).always((function(o) {
                    s.files = o, i.options.replaceFileInput && i._replaceFileInput(s), !1 !== i._trigger("change", e.Event("change", {
                        delegatedEvent: t
                    }), s) && i._onAdd(t, s)
                }))
            },
            _onPaste: function(t) {
                var i = t.originalEvent && t.originalEvent.clipboardData && t.originalEvent.clipboardData.items,
                    s = {
                        files: []
                    };
                i && i.length && (e.each(i, (function(e, t) {
                    var i = t.getAsFile && t.getAsFile();
                    i && s.files.push(i)
                })), !1 !== this._trigger("paste", e.Event("paste", {
                    delegatedEvent: t
                }), s) && this._onAdd(t, s))
            },
            _onDrop: function(t) {
                t.dataTransfer = t.originalEvent && t.originalEvent.dataTransfer;
                var i = this,
                    s = t.dataTransfer,
                    o = {};
                s && s.files && s.files.length && (t.preventDefault(), this._getDroppedFiles(s).always((function(s) {
                    o.files = s, !1 !== i._trigger("drop", e.Event("drop", {
                        delegatedEvent: t
                    }), o) && i._onAdd(t, o)
                })))
            },
            _onDragOver: t("dragover"),
            _onDragEnter: t("dragenter"),
            _onDragLeave: t("dragleave"),
            _initEventHandlers: function() {
                this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    dragenter: this._onDragEnter,
                    dragleave: this._onDragLeave
                }), this._on(this.options.pasteZone, {
                    paste: this._onPaste
                })), e.support.fileInput && this._on(this.options.fileInput, {
                    change: this._onChange
                })
            },
            _destroyEventHandlers: function() {
                this._off(this.options.dropZone, "dragenter dragleave dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
            },
            _destroy: function() {
                this._destroyEventHandlers()
            },
            _setOption: function(t, i) {
                var s = -1 !== e.inArray(t, this._specialOptions);
                s && this._destroyEventHandlers(), this._super(t, i), s && (this._initSpecialOptions(), this._initEventHandlers())
            },
            _initSpecialOptions: function() {
                var t = this.options;
                void 0 === t.fileInput ? t.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : t.fileInput instanceof e || (t.fileInput = e(t.fileInput)), t.dropZone instanceof e || (t.dropZone = e(t.dropZone)), t.pasteZone instanceof e || (t.pasteZone = e(t.pasteZone))
            },
            _getRegExp: function(e) {
                var t = e.split("/"),
                    i = t.pop();
                return t.shift(), new RegExp(t.join("/"), i)
            },
            _isRegExpOption: function(t, i) {
                return "url" !== t && "string" === e.type(i) && /^\/.*\/[igm]{0,3}$/.test(i)
            },
            _initDataAttributes: function() {
                var t = this,
                    i = this.options,
                    s = this.element.data();
                e.each(this.element[0].attributes, (function(e, o) {
                    var a, n = o.name.toLowerCase();
                    /^data-/.test(n) && (n = n.slice(5).replace(/-[a-z]/g, (function(e) {
                        return e.charAt(1).toUpperCase()
                    })), t._isRegExpOption(n, a = s[n]) && (a = t._getRegExp(a)), i[n] = a)
                }))
            },
            _create: function() {
                this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
            },
            active: function() {
                return this._active
            },
            progress: function() {
                return this._progress
            },
            add: function(t) {
                var i = this;
                t && !this.options.disabled && (t.fileInput && !t.files ? this._getFileInputFiles(t.fileInput).always((function(e) {
                    t.files = e, i._onAdd(null, t)
                })) : (t.files = e.makeArray(t.files), this._onAdd(null, t)))
            },
            send: function(t) {
                if (t && !this.options.disabled) {
                    if (t.fileInput && !t.files) {
                        var i, s, o = this,
                            a = e.Deferred(),
                            n = a.promise();
                        return n.abort = function() {
                            return s = !0, i ? i.abort() : (a.reject(null, "abort", "abort"), n)
                        }, this._getFileInputFiles(t.fileInput).always((function(e) {
                            s || (e.length ? (t.files = e, (i = o._onSend(null, t)).then((function(e, t, i) {
                                a.resolve(e, t, i)
                            }), (function(e, t, i) {
                                a.reject(e, t, i)
                            }))) : a.reject())
                        })), this._enhancePromise(n)
                    }
                    if (t.files = e.makeArray(t.files), t.files.length) return this._onSend(null, t)
                }
                return this._getXHRPromise(!1, t && t.context)
            }
        })
    })),
    function() {
        "use strict";

        function e(s) {
            if (!s) throw new Error("No options passed to Waypoint constructor");
            if (!s.element) throw new Error("No element option passed to Waypoint constructor");
            if (!s.handler) throw new Error("No handler option passed to Waypoint constructor");
            this.key = "waypoint-" + t, this.options = e.Adapter.extend({}, e.defaults, s), this.element = this.options.element, this.adapter = new e.Adapter(this.element), this.callback = s.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = e.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis
            }), this.context = e.Context.findOrCreateByElement(this.options.context), e.offsetAliases[this.options.offset] && (this.options.offset = e.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, t += 1
        }
        var t = 0,
            i = {};
        e.prototype.queueTrigger = function(e) {
            this.group.queueTrigger(this, e)
        }, e.prototype.trigger = function(e) {
            this.enabled && this.callback && this.callback.apply(this, e)
        }, e.prototype.destroy = function() {
            this.context.remove(this), this.group.remove(this), delete i[this.key]
        }, e.prototype.disable = function() {
            return this.enabled = !1, this
        }, e.prototype.enable = function() {
            return this.context.refresh(), this.enabled = !0, this
        }, e.prototype.next = function() {
            return this.group.next(this)
        }, e.prototype.previous = function() {
            return this.group.previous(this)
        }, e.invokeAll = function(e) {
            var t = [];
            for (var s in i) t.push(i[s]);
            for (var o = 0, a = t.length; a > o; o++) t[o][e]()
        }, e.destroyAll = function() {
            e.invokeAll("destroy")
        }, e.disableAll = function() {
            e.invokeAll("disable")
        }, e.enableAll = function() {
            for (var t in e.Context.refreshAll(), i) i[t].enabled = !0;
            return this
        }, e.refreshAll = function() {
            e.Context.refreshAll()
        }, e.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }, e.viewportWidth = function() {
            return document.documentElement.clientWidth
        }, e.adapters = [], e.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: "default",
            horizontal: !1,
            offset: 0
        }, e.offsetAliases = {
            "bottom-in-view": function() {
                return this.context.innerHeight() - this.adapter.outerHeight()
            },
            "right-in-view": function() {
                return this.context.innerWidth() - this.adapter.outerWidth()
            }
        }, window.Waypoint = e
    }(),
    function() {
        "use strict";

        function e(e) {
            window.setTimeout(e, 1e3 / 60)
        }

        function t(e) {
            this.element = e, this.Adapter = o.Adapter, this.adapter = new this.Adapter(e), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }, this.waypoints = {
                vertical: {},
                horizontal: {}
            }, e.waypointContextKey = this.key, s[e.waypointContextKey] = this, i += 1, o.windowContext || (o.windowContext = !0, o.windowContext = new t(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
        }
        var i = 0,
            s = {},
            o = window.Waypoint,
            a = window.onload;
        t.prototype.add = function(e) {
            this.waypoints[e.options.horizontal ? "horizontal" : "vertical"][e.key] = e, this.refresh()
        }, t.prototype.checkEmpty = function() {
            var e = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                t = this.Adapter.isEmptyObject(this.waypoints.vertical);
            e && t && this.element != this.element.window && (this.adapter.off(".waypoints"), delete s[this.key])
        }, t.prototype.createThrottledResizeHandler = function() {
            function e() {
                t.handleResize(), t.didResize = !1
            }
            var t = this;
            this.adapter.on("resize.waypoints", (function() {
                t.didResize || (t.didResize = !0, o.requestAnimationFrame(e))
            }))
        }, t.prototype.createThrottledScrollHandler = function() {
            function e() {
                t.handleScroll(), t.didScroll = !1
            }
            var t = this;
            this.adapter.on("scroll.waypoints", (function() {
                (!t.didScroll || o.isTouch) && (t.didScroll = !0, o.requestAnimationFrame(e))
            }))
        }, t.prototype.handleResize = function() {
            o.Context.refreshAll()
        }, t.prototype.handleScroll = function() {
            var e = {},
                t = {
                    horizontal: {
                        newScroll: this.adapter.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.adapter.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
            for (var i in t) {
                var s = t[i],
                    o = s.newScroll > s.oldScroll ? s.forward : s.backward;
                for (var a in this.waypoints[i]) {
                    var n = this.waypoints[i][a];
                    if (null !== n.triggerPoint) {
                        var r = s.oldScroll < n.triggerPoint,
                            l = s.newScroll >= n.triggerPoint;
                        (r && l || !r && !l) && (n.queueTrigger(o), e[n.group.id] = n.group)
                    }
                }
            }
            for (var c in e) e[c].flushTriggers();
            this.oldScroll = {
                x: t.horizontal.newScroll,
                y: t.vertical.newScroll
            }
        }, t.prototype.innerHeight = function() {
            return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
        }, t.prototype.remove = function(e) {
            delete this.waypoints[e.axis][e.key], this.checkEmpty()
        }, t.prototype.innerWidth = function() {
            return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
        }, t.prototype.destroy = function() {
            var e = [];
            for (var t in this.waypoints)
                for (var i in this.waypoints[t]) e.push(this.waypoints[t][i]);
            for (var s = 0, o = e.length; o > s; s++) e[s].destroy()
        }, t.prototype.refresh = function() {
            var e, t = this.element == this.element.window,
                i = t ? void 0 : this.adapter.offset(),
                s = {};
            for (var a in this.handleScroll(), e = {
                    horizontal: {
                        contextOffset: t ? 0 : i.left,
                        contextScroll: t ? 0 : this.oldScroll.x,
                        contextDimension: this.innerWidth(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: t ? 0 : i.top,
                        contextScroll: t ? 0 : this.oldScroll.y,
                        contextDimension: this.innerHeight(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }) {
                var n = e[a];
                for (var r in this.waypoints[a]) {
                    var l, c, d, u = this.waypoints[a][r],
                        f = u.options.offset,
                        p = u.triggerPoint,
                        h = 0,
                        m = null == p;
                    u.element !== u.element.window && (h = u.adapter.offset()[n.offsetProp]), "function" == typeof f ? f = f.apply(u) : "string" == typeof f && (f = parseFloat(f), u.options.offset.indexOf("%") > -1 && (f = Math.ceil(n.contextDimension * f / 100))), u.triggerPoint = Math.floor(h + (n.contextScroll - n.contextOffset) - f), c = u.triggerPoint >= n.oldScroll, d = !(l = p < n.oldScroll) && !c, !m && l && c ? (u.queueTrigger(n.backward), s[u.group.id] = u.group) : !m && d ? (u.queueTrigger(n.forward), s[u.group.id] = u.group) : m && n.oldScroll >= u.triggerPoint && (u.queueTrigger(n.forward), s[u.group.id] = u.group)
                }
            }
            return o.requestAnimationFrame((function() {
                for (var e in s) s[e].flushTriggers()
            })), this
        }, t.findOrCreateByElement = function(e) {
            return t.findByElement(e) || new t(e)
        }, t.refreshAll = function() {
            for (var e in s) s[e].refresh()
        }, t.findByElement = function(e) {
            return s[e.waypointContextKey]
        }, window.onload = function() {
            a && a(), t.refreshAll()
        }, o.requestAnimationFrame = function(t) {
            (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || e).call(window, t)
        }, o.Context = t
    }(),
    function() {
        "use strict";

        function e(e, t) {
            return e.triggerPoint - t.triggerPoint
        }

        function t(e, t) {
            return t.triggerPoint - e.triggerPoint
        }

        function i(e) {
            this.name = e.name, this.axis = e.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), s[this.axis][this.name] = this
        }
        var s = {
                vertical: {},
                horizontal: {}
            },
            o = window.Waypoint;
        i.prototype.add = function(e) {
            this.waypoints.push(e)
        }, i.prototype.clearTriggerQueues = function() {
            this.triggerQueues = {
                up: [],
                down: [],
                left: [],
                right: []
            }
        }, i.prototype.flushTriggers = function() {
            for (var i in this.triggerQueues) {
                var s = this.triggerQueues[i];
                s.sort("up" === i || "left" === i ? t : e);
                for (var o = 0, a = s.length; a > o; o += 1) {
                    var n = s[o];
                    (n.options.continuous || o === s.length - 1) && n.trigger([i])
                }
            }
            this.clearTriggerQueues()
        }, i.prototype.next = function(t) {
            this.waypoints.sort(e);
            var i = o.Adapter.inArray(t, this.waypoints);
            return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
        }, i.prototype.previous = function(t) {
            this.waypoints.sort(e);
            var i = o.Adapter.inArray(t, this.waypoints);
            return i ? this.waypoints[i - 1] : null
        }, i.prototype.queueTrigger = function(e, t) {
            this.triggerQueues[t].push(e)
        }, i.prototype.remove = function(e) {
            var t = o.Adapter.inArray(e, this.waypoints);
            t > -1 && this.waypoints.splice(t, 1)
        }, i.prototype.first = function() {
            return this.waypoints[0]
        }, i.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1]
        }, i.findOrCreate = function(e) {
            return s[e.axis][e.name] || new i(e)
        }, o.Group = i
    }(),
    function() {
        "use strict";

        function e(e) {
            return e === e.window
        }

        function t(t) {
            return e(t) ? t : t.defaultView
        }

        function i(e) {
            this.element = e, this.handlers = {}
        }
        var s = window.Waypoint;
        i.prototype.innerHeight = function() {
            return e(this.element) ? this.element.innerHeight : this.element.clientHeight
        }, i.prototype.innerWidth = function() {
            return e(this.element) ? this.element.innerWidth : this.element.clientWidth
        }, i.prototype.off = function(e, t) {
            function i(e, t, i) {
                for (var s = 0, o = t.length - 1; o > s; s++) {
                    var a = t[s];
                    i && i !== a || e.removeEventListener(a)
                }
            }
            var s = e.split("."),
                o = s[0],
                a = s[1],
                n = this.element;
            if (a && this.handlers[a] && o) i(n, this.handlers[a][o], t), this.handlers[a][o] = [];
            else if (o)
                for (var r in this.handlers) i(n, this.handlers[r][o] || [], t), this.handlers[r][o] = [];
            else if (a && this.handlers[a]) {
                for (var l in this.handlers[a]) i(n, this.handlers[a][l], t);
                this.handlers[a] = {}
            }
        }, i.prototype.offset = function() {
            if (!this.element.ownerDocument) return null;
            var e = this.element.ownerDocument.documentElement,
                i = t(this.element.ownerDocument),
                s = {
                    top: 0,
                    left: 0
                };
            return this.element.getBoundingClientRect && (s = this.element.getBoundingClientRect()), {
                top: s.top + i.pageYOffset - e.clientTop,
                left: s.left + i.pageXOffset - e.clientLeft
            }
        }, i.prototype.on = function(e, t) {
            var i = e.split("."),
                s = i[0],
                o = i[1] || "__default",
                a = this.handlers[o] = this.handlers[o] || {};
            (a[s] = a[s] || []).push(t), this.element.addEventListener(s, t)
        }, i.prototype.outerHeight = function(t) {
            var i, s = this.innerHeight();
            return t && !e(this.element) && (i = window.getComputedStyle(this.element), s += parseInt(i.marginTop, 10), s += parseInt(i.marginBottom, 10)), s
        }, i.prototype.outerWidth = function(t) {
            var i, s = this.innerWidth();
            return t && !e(this.element) && (i = window.getComputedStyle(this.element), s += parseInt(i.marginLeft, 10), s += parseInt(i.marginRight, 10)), s
        }, i.prototype.scrollLeft = function() {
            var e = t(this.element);
            return e ? e.pageXOffset : this.element.scrollLeft
        }, i.prototype.scrollTop = function() {
            var e = t(this.element);
            return e ? e.pageYOffset : this.element.scrollTop
        }, i.extend = function() {
            function e(e, t) {
                if ("object" == typeof e && "object" == typeof t)
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                return e
            }
            for (var t = Array.prototype.slice.call(arguments), i = 1, s = t.length; s > i; i++) e(t[0], t[i]);
            return t[0]
        }, i.inArray = function(e, t, i) {
            return null == t ? -1 : t.indexOf(e, i)
        }, i.isEmptyObject = function(e) {
            for (var t in e) return !1;
            return !0
        }, s.adapters.push({
            name: "noframework",
            Adapter: i
        }), s.Adapter = i
    }();