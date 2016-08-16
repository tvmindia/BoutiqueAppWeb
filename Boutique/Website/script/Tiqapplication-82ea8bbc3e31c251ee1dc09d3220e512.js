function deeplink(t, e, i) {
    var n = e.fallback || "",
        r = e.url || "",
        o = e.ios_store_link,
        s = {
            ios_deep_link: r,
            ios_store_link: o,
            fallback: n
        },
        a = {
            ios: function() {
                return /iPhone|iPad|iPod/i.test(t.navigator.userAgent)
            }
        };
    a.ios() && s.ios_deep_link ? (t.location = s.ios_deep_link, setTimeout(function() {
        t.location = s.ios_store_link || s.fallback
    }, 25)) : s.fallback ? t.location = s.fallback : i()
}

function debounce(t, e, i) {
    var n;
    return function() {
        var r = this,
            o = arguments,
            s = function() {
                n = null, i || t.apply(r, o)
            },
            a = i && !n;
        clearTimeout(n), n = setTimeout(s, e), a && t.apply(r, o)
    }
}

function initWookmark() {
    $(".js-wookmark > li").wookmark({
        container: $(".js-wookmark"),
        offset: -1
    })
}

function initCrossHover() {
    $("[data-cross-hover=from]").hover(function() {
        $("[data-cross-hover=to]").addClass("hoverlink")
    }, function() {
        $("[data-cross-hover=to]").removeClass("hoverlink")
    })
}
void 0 === window.requestAnimationFrame && (window.requestAnimationFrame = function(t) {
    return setTimeout(t, 0)
});
var _rollbarConfig = {
    accessToken: "981fc1adeb97420583e5d30cf0d68c40",
    captureUncaught: !0,
    payload: {
        environment: "production"
    }
};
! function(t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var r = i[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return t[n].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0)
}([function(t, e, i) {
    "use strict";
    var n = i(1).Rollbar,
        r = i(2);
    _rollbarConfig.rollbarJsUrl = _rollbarConfig.rollbarJsUrl || "https://d37gvrvc0wt4s1.cloudfront.net/js/v1.7/rollbar.min.js";
    var o = n.init(window, _rollbarConfig),
        s = r(o, _rollbarConfig);
    o.loadFull(window, document, !_rollbarConfig.async, _rollbarConfig, s)
}, function(t, e) {
    "use strict";

    function i() {
        var t = window.console;
        t && "function" == typeof t.log && t.log.apply(t, arguments)
    }

    function n(t, e) {
        return e = e || i,
            function() {
                try {
                    return t.apply(this, arguments)
                } catch (i) {
                    e("Rollbar internal error:", i)
                }
            }
    }

    function r(t, e, i) {
        window._rollbarWrappedError && (i[4] || (i[4] = window._rollbarWrappedError), i[5] || (i[5] = window._rollbarWrappedError._rollbarContext), window._rollbarWrappedError = null), t.uncaughtError.apply(t, i), e && e.apply(window, i)
    }

    function o(t) {
        var e = function() {
            var e = Array.prototype.slice.call(arguments, 0);
            r(t, t._rollbarOldOnError, e)
        };
        return e.belongsToShim = !0, e
    }

    function s(t) {
        this.shimId = ++c, this.notifier = null, this.parentShim = t, this.logger = i, this._rollbarOldOnError = null
    }

    function a(t) {
        var e = s;
        return n(function() {
            if (this.notifier) return this.notifier[t].apply(this.notifier, arguments);
            var i = this,
                n = "scope" === t;
            n && (i = new e(this));
            var r = Array.prototype.slice.call(arguments, 0),
                o = {
                    shim: i,
                    method: t,
                    args: r,
                    ts: new Date
                };
            return window._rollbarShimQueue.push(o), n ? i : void 0
        })
    }

    function l(t, e) {
        if (e.hasOwnProperty && e.hasOwnProperty("addEventListener")) {
            var i = e.addEventListener;
            e.addEventListener = function(e, n, r) {
                i.call(this, e, t.wrap(n), r)
            };
            var n = e.removeEventListener;
            e.removeEventListener = function(t, e, i) {
                n.call(this, t, e && e._wrapped ? e._wrapped : e, i)
            }
        }
    }
    var c = 0;
    s.init = function(t, e) {
        var i = e.globalAlias || "Rollbar";
        if ("object" == typeof t[i]) return t[i];
        t._rollbarShimQueue = [], t._rollbarWrappedError = null, e = e || {};
        var r = new s;
        return n(function() {
            if (r.configure(e), e.captureUncaught) {
                r._rollbarOldOnError = t.onerror, t.onerror = o(r);
                var n, s, a = "EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");
                for (n = 0; n < a.length; ++n) s = a[n], t[s] && t[s].prototype && l(r, t[s].prototype)
            }
            return t[i] = r, r
        }, r.logger)()
    }, s.prototype.loadFull = function(t, e, i, r, o) {
        var s = function() {
                var e;
                if (void 0 === t._rollbarPayloadQueue) {
                    var i, n, r, s;
                    for (e = new Error("rollbar.js did not load"); i = t._rollbarShimQueue.shift();)
                        for (r = i.args, s = 0; s < r.length; ++s)
                            if (n = r[s], "function" == typeof n) {
                                n(e);
                                break
                            }
                }
                "function" == typeof o && o(e)
            },
            a = !1,
            l = e.createElement("script"),
            c = e.getElementsByTagName("script")[0],
            u = c.parentNode;
        l.src = r.rollbarJsUrl, l.async = !i, l.onload = l.onreadystatechange = n(function() {
            if (!(a || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                l.onload = l.onreadystatechange = null;
                try {
                    u.removeChild(l)
                } catch (t) {}
                a = !0, s()
            }
        }, this.logger), u.insertBefore(l, c)
    }, s.prototype.wrap = function(t, e) {
        try {
            var i;
            if (i = "function" == typeof e ? e : function() {
                    return e || {}
                }, "function" != typeof t) return t;
            if (t._isWrap) return t;
            if (!t._wrapped) {
                t._wrapped = function() {
                    try {
                        return t.apply(this, arguments)
                    } catch (e) {
                        throw e._rollbarContext = i() || {}, e._rollbarContext._wrappedSource = t.toString(), window._rollbarWrappedError = e, e
                    }
                }, t._wrapped._isWrap = !0;
                for (var n in t) t.hasOwnProperty(n) && (t._wrapped[n] = t[n])
            }
            return t._wrapped
        } catch (r) {
            return t
        }
    };
    for (var u = "log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","), d = 0; d < u.length; ++d) s.prototype[u[d]] = a(u[d]);
    t.exports = {
        Rollbar: s,
        _rollbarWindowOnError: r
    }
}, function(t, e) {
    "use strict";
    t.exports = function(t, e) {
        return function(i) {
            if (!i && !window._rollbarInitialized) {
                var n = window.RollbarNotifier,
                    r = e || {},
                    o = r.globalAlias || "Rollbar",
                    s = window.Rollbar.init(r, t);
                s._processShimQueue(window._rollbarShimQueue || []), window[o] = s, window._rollbarInitialized = !0, n.processPayloads()
            }
        }
    }
}]),
function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t) {
        var e = t.length,
            i = rt.type(t);
        return "function" === i || rt.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }

    function n(t, e, i) {
        if (rt.isFunction(e)) return rt.grep(t, function(t, n) {
            return !!e.call(t, n, t) !== i
        });
        if (e.nodeType) return rt.grep(t, function(t) {
            return t === e !== i
        });
        if ("string" == typeof e) {
            if (ht.test(e)) return rt.filter(e, t, i);
            e = rt.filter(e, t)
        }
        return rt.grep(t, function(t) {
            return rt.inArray(t, e) >= 0 !== i
        })
    }

    function r(t, e) {
        do t = t[e]; while (t && 1 !== t.nodeType);
        return t
    }

    function o(t) {
        var e = bt[t] = {};
        return rt.each(t.match(_t) || [], function(t, i) {
            e[i] = !0
        }), e
    }

    function s() {
        pt.addEventListener ? (pt.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1)) : (pt.detachEvent("onreadystatechange", a), t.detachEvent("onload", a))
    }

    function a() {
        (pt.addEventListener || "load" === event.type || "complete" === pt.readyState) && (s(), rt.ready())
    }

    function l(t, e, i) {
        if (void 0 === i && 1 === t.nodeType) {
            var n = "data-" + e.replace(kt, "-$1").toLowerCase();
            if (i = t.getAttribute(n), "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : St.test(i) ? rt.parseJSON(i) : i
                } catch (r) {}
                rt.data(t, e, i)
            } else i = void 0
        }
        return i
    }

    function c(t) {
        var e;
        for (e in t)
            if (("data" !== e || !rt.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function u(t, e, i, n) {
        if (rt.acceptData(t)) {
            var r, o, s = rt.expando,
                a = t.nodeType,
                l = a ? rt.cache : t,
                c = a ? t[s] : t[s] && s;
            if (c && l[c] && (n || l[c].data) || void 0 !== i || "string" != typeof e) return c || (c = a ? t[s] = Y.pop() || rt.guid++ : s), l[c] || (l[c] = a ? {} : {
                toJSON: rt.noop
            }), ("object" == typeof e || "function" == typeof e) && (n ? l[c] = rt.extend(l[c], e) : l[c].data = rt.extend(l[c].data, e)), o = l[c], n || (o.data || (o.data = {}), o = o.data), void 0 !== i && (o[rt.camelCase(e)] = i), "string" == typeof e ? (r = o[e], null == r && (r = o[rt.camelCase(e)])) : r = o, r
        }
    }

    function d(t, e, i) {
        if (rt.acceptData(t)) {
            var n, r, o = t.nodeType,
                s = o ? rt.cache : t,
                a = o ? t[rt.expando] : rt.expando;
            if (s[a]) {
                if (e && (n = i ? s[a] : s[a].data)) {
                    rt.isArray(e) ? e = e.concat(rt.map(e, rt.camelCase)) : e in n ? e = [e] : (e = rt.camelCase(e), e = e in n ? [e] : e.split(" ")), r = e.length;
                    for (; r--;) delete n[e[r]];
                    if (i ? !c(n) : !rt.isEmptyObject(n)) return
                }(i || (delete s[a].data, c(s[a]))) && (o ? rt.cleanData([t], !0) : it.deleteExpando || s != s.window ? delete s[a] : s[a] = null)
            }
        }
    }

    function h() {
        return !0
    }

    function f() {
        return !1
    }

    function p() {
        try {
            return pt.activeElement
        } catch (t) {}
    }

    function m(t) {
        var e = Ft.split("|"),
            i = t.createDocumentFragment();
        if (i.createElement)
            for (; e.length;) i.createElement(e.pop());
        return i
    }

    function g(t, e) {
        var i, n, r = 0,
            o = typeof t.getElementsByTagName !== Tt ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== Tt ? t.querySelectorAll(e || "*") : void 0;
        if (!o)
            for (o = [], i = t.childNodes || t; null != (n = i[r]); r++) !e || rt.nodeName(n, e) ? o.push(n) : rt.merge(o, g(n, e));
        return void 0 === e || e && rt.nodeName(t, e) ? rt.merge([t], o) : o
    }

    function v(t) {
        Ot.test(t.type) && (t.defaultChecked = t.checked)
    }

    function y(t, e) {
        return rt.nodeName(t, "table") && rt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function _(t) {
        return t.type = (null !== rt.find.attr(t, "type")) + "/" + t.type, t
    }

    function b(t) {
        var e = Vt.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function w(t, e) {
        for (var i, n = 0; null != (i = t[n]); n++) rt._data(i, "globalEval", !e || rt._data(e[n], "globalEval"))
    }

    function x(t, e) {
        if (1 === e.nodeType && rt.hasData(t)) {
            var i, n, r, o = rt._data(t),
                s = rt._data(e, o),
                a = o.events;
            if (a) {
                delete s.handle, s.events = {};
                for (i in a)
                    for (n = 0, r = a[i].length; r > n; n++) rt.event.add(e, i, a[i][n])
            }
            s.data && (s.data = rt.extend({}, s.data))
        }
    }

    function T(t, e) {
        var i, n, r;
        if (1 === e.nodeType) {
            if (i = e.nodeName.toLowerCase(), !it.noCloneEvent && e[rt.expando]) {
                r = rt._data(e);
                for (n in r.events) rt.removeEvent(e, n, r.handle);
                e.removeAttribute(rt.expando)
            }
            "script" === i && e.text !== t.text ? (_(e).text = t.text, b(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), it.html5Clone && t.innerHTML && !rt.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && Ot.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
        }
    }

    function S(e, i) {
        var n, r = rt(i.createElement(e)).appendTo(i.body),
            o = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(r[0])) ? n.display : rt.css(r[0], "display");
        return r.detach(), o
    }

    function k(t) {
        var e = pt,
            i = Kt[t];
        return i || (i = S(t, e), "none" !== i && i || (Jt = (Jt || rt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Jt[0].contentWindow || Jt[0].contentDocument).document, e.write(), e.close(), i = S(t, e), Jt.detach()), Kt[t] = i), i
    }

    function C(t, e) {
        return {
            get: function() {
                var i = t();
                if (null != i) return i ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }

    function A(t, e) {
        if (e in t) return e;
        for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, r = he.length; r--;)
            if (e = he[r] + i, e in t) return e;
        return n
    }

    function P(t, e) {
        for (var i, n, r, o = [], s = 0, a = t.length; a > s; s++) n = t[s], n.style && (o[s] = rt._data(n, "olddisplay"), i = n.style.display, e ? (o[s] || "none" !== i || (n.style.display = ""), "" === n.style.display && Pt(n) && (o[s] = rt._data(n, "olddisplay", k(n.nodeName)))) : (r = Pt(n), (i && "none" !== i || !r) && rt._data(n, "olddisplay", r ? i : rt.css(n, "display"))));
        for (s = 0; a > s; s++) n = t[s], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? o[s] || "" : "none"));
        return t
    }

    function E(t, e, i) {
        var n = le.exec(e);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
    }

    function O(t, e, i, n, r) {
        for (var o = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; 4 > o; o += 2) "margin" === i && (s += rt.css(t, i + At[o], !0, r)), n ? ("content" === i && (s -= rt.css(t, "padding" + At[o], !0, r)), "margin" !== i && (s -= rt.css(t, "border" + At[o] + "Width", !0, r))) : (s += rt.css(t, "padding" + At[o], !0, r), "padding" !== i && (s += rt.css(t, "border" + At[o] + "Width", !0, r)));
        return s
    }

    function R(t, e, i) {
        var n = !0,
            r = "width" === e ? t.offsetWidth : t.offsetHeight,
            o = te(t),
            s = it.boxSizing && "border-box" === rt.css(t, "boxSizing", !1, o);
        if (0 >= r || null == r) {
            if (r = ee(t, e, o), (0 > r || null == r) && (r = t.style[e]), ne.test(r)) return r;
            n = s && (it.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
        }
        return r + O(t, e, i || (s ? "border" : "content"), n, o) + "px"
    }

    function I(t, e, i, n, r) {
        return new I.prototype.init(t, e, i, n, r)
    }

    function D() {
        return setTimeout(function() {
            fe = void 0
        }), fe = rt.now()
    }

    function N(t, e) {
        var i, n = {
                height: t
            },
            r = 0;
        for (e = e ? 1 : 0; 4 > r; r += 2 - e) i = At[r], n["margin" + i] = n["padding" + i] = t;
        return e && (n.opacity = n.width = t), n
    }

    function j(t, e, i) {
        for (var n, r = (_e[e] || []).concat(_e["*"]), o = 0, s = r.length; s > o; o++)
            if (n = r[o].call(i, e, t)) return n
    }

    function F(t, e, i) {
        var n, r, o, s, a, l, c, u, d = this,
            h = {},
            f = t.style,
            p = t.nodeType && Pt(t),
            m = rt._data(t, "fxshow");
        i.queue || (a = rt._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
            a.unqueued || l()
        }), a.unqueued++, d.always(function() {
            d.always(function() {
                a.unqueued--, rt.queue(t, "fx").length || a.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [f.overflow, f.overflowX, f.overflowY], c = rt.css(t, "display"), u = "none" === c ? rt._data(t, "olddisplay") || k(t.nodeName) : c, "inline" === u && "none" === rt.css(t, "float") && (it.inlineBlockNeedsLayout && "inline" !== k(t.nodeName) ? f.zoom = 1 : f.display = "inline-block")), i.overflow && (f.overflow = "hidden", it.shrinkWrapBlocks() || d.always(function() {
            f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2]
        }));
        for (n in e)
            if (r = e[n], me.exec(r)) {
                if (delete e[n], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
                    if ("show" !== r || !m || void 0 === m[n]) continue;
                    p = !0
                }
                h[n] = m && m[n] || rt.style(t, n)
            } else c = void 0;
        if (rt.isEmptyObject(h)) "inline" === ("none" === c ? k(t.nodeName) : c) && (f.display = c);
        else {
            m ? "hidden" in m && (p = m.hidden) : m = rt._data(t, "fxshow", {}), o && (m.hidden = !p), p ? rt(t).show() : d.done(function() {
                rt(t).hide()
            }), d.done(function() {
                var e;
                rt._removeData(t, "fxshow");
                for (e in h) rt.style(t, e, h[e])
            });
            for (n in h) s = j(p ? m[n] : 0, n, d), n in m || (m[n] = s.start, p && (s.end = s.start, s.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function L(t, e) {
        var i, n, r, o, s;
        for (i in t)
            if (n = rt.camelCase(i), r = e[n], o = t[i], rt.isArray(o) && (r = o[1], o = t[i] = o[0]), i !== n && (t[n] = o, delete t[i]), s = rt.cssHooks[n], s && "expand" in s) {
                o = s.expand(o), delete t[n];
                for (i in o) i in t || (t[i] = o[i], e[i] = r)
            } else e[n] = r
    }

    function M(t, e, i) {
        var n, r, o = 0,
            s = ye.length,
            a = rt.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (r) return !1;
                for (var e = fe || D(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, o = 1 - n, s = 0, l = c.tweens.length; l > s; s++) c.tweens[s].run(o);
                return a.notifyWith(t, [c, o, i]), 1 > o && l ? i : (a.resolveWith(t, [c]), !1)
            },
            c = a.promise({
                elem: t,
                props: rt.extend({}, e),
                opts: rt.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: e,
                originalOptions: i,
                startTime: fe || D(),
                duration: i.duration,
                tweens: [],
                createTween: function(e, i) {
                    var n = rt.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(n), n
                },
                stop: function(e) {
                    var i = 0,
                        n = e ? c.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; n > i; i++) c.tweens[i].run(1);
                    return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
                }
            }),
            u = c.props;
        for (L(u, c.opts.specialEasing); s > o; o++)
            if (n = ye[o].call(c, t, u, c.opts)) return n;
        return rt.map(u, j, c), rt.isFunction(c.opts.start) && c.opts.start.call(t, c), rt.fx.timer(rt.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function $(t) {
        return function(e, i) {
            "string" != typeof e && (i = e, e = "*");
            var n, r = 0,
                o = e.toLowerCase().match(_t) || [];
            if (rt.isFunction(i))
                for (; n = o[r++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }

    function z(t, e, i, n) {
        function r(a) {
            var l;
            return o[a] = !0, rt.each(t[a] || [], function(t, a) {
                var c = a(e, i, n);
                return "string" != typeof c || s || o[c] ? s ? !(l = c) : void 0 : (e.dataTypes.unshift(c), r(c), !1)
            }), l
        }
        var o = {},
            s = t === qe;
        return r(e.dataTypes[0]) || !o["*"] && r("*")
    }

    function H(t, e) {
        var i, n, r = rt.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
        return i && rt.extend(!0, t, i), t
    }

    function B(t, e, i) {
        for (var n, r, o, s, a = t.contents, l = t.dataTypes;
            "*" === l[0];) l.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
        if (r)
            for (s in a)
                if (a[s] && a[s].test(r)) {
                    l.unshift(s);
                    break
                }
        if (l[0] in i) o = l[0];
        else {
            for (s in i) {
                if (!l[0] || t.converters[s + " " + l[0]]) {
                    o = s;
                    break
                }
                n || (n = s)
            }
            o = o || n
        }
        return o ? (o !== l[0] && l.unshift(o), i[o]) : void 0
    }

    function q(t, e, i, n) {
        var r, o, s, a, l, c = {},
            u = t.dataTypes.slice();
        if (u[1])
            for (s in t.converters) c[s.toLowerCase()] = t.converters[s];
        for (o = u.shift(); o;)
            if (t.responseFields[o] && (i[t.responseFields[o]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = u.shift())
                if ("*" === o) o = l;
                else if ("*" !== l && l !== o) {
            if (s = c[l + " " + o] || c["* " + o], !s)
                for (r in c)
                    if (a = r.split(" "), a[1] === o && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                        s === !0 ? s = c[r] : c[r] !== !0 && (o = a[0], u.unshift(a[1]));
                        break
                    }
            if (s !== !0)
                if (s && t["throws"]) e = s(e);
                else try {
                    e = s(e)
                } catch (d) {
                    return {
                        state: "parsererror",
                        error: s ? d : "No conversion from " + l + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }

    function W(t, e, i, n) {
        var r;
        if (rt.isArray(e)) rt.each(e, function(e, r) {
            i || Ve.test(t) ? n(t, r) : W(t + "[" + ("object" == typeof r ? e : "") + "]", r, i, n)
        });
        else if (i || "object" !== rt.type(e)) n(t, e);
        else
            for (r in e) W(t + "[" + r + "]", e[r], i, n)
    }

    function X() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {}
    }

    function U() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }

    function V(t) {
        return rt.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }
    var Y = [],
        Q = Y.slice,
        G = Y.concat,
        Z = Y.push,
        J = Y.indexOf,
        K = {},
        tt = K.toString,
        et = K.hasOwnProperty,
        it = {},
        nt = "1.11.1",
        rt = function(t, e) {
            return new rt.fn.init(t, e)
        },
        ot = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        st = /^-ms-/,
        at = /-([\da-z])/gi,
        lt = function(t, e) {
            return e.toUpperCase()
        };
    rt.fn = rt.prototype = {
        jquery: nt,
        constructor: rt,
        selector: "",
        length: 0,
        toArray: function() {
            return Q.call(this)
        },
        get: function(t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : Q.call(this)
        },
        pushStack: function(t) {
            var e = rt.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(t, e) {
            return rt.each(this, t, e)
        },
        map: function(t) {
            return this.pushStack(rt.map(this, function(e, i) {
                return t.call(e, i, e)
            }))
        },
        slice: function() {
            return this.pushStack(Q.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                i = +t + (0 > t ? e : 0);
            return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Z,
        sort: Y.sort,
        splice: Y.splice
    }, rt.extend = rt.fn.extend = function() {
        var t, e, i, n, r, o, s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || rt.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++)
            if (null != (r = arguments[a]))
                for (n in r) t = s[n], i = r[n], s !== i && (c && i && (rt.isPlainObject(i) || (e = rt.isArray(i))) ? (e ? (e = !1, o = t && rt.isArray(t) ? t : []) : o = t && rt.isPlainObject(t) ? t : {}, s[n] = rt.extend(c, o, i)) : void 0 !== i && (s[n] = i));
        return s
    }, rt.extend({
        expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === rt.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === rt.type(t)
        },
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            return !rt.isArray(t) && t - parseFloat(t) >= 0
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        isPlainObject: function(t) {
            var e;
            if (!t || "object" !== rt.type(t) || t.nodeType || rt.isWindow(t)) return !1;
            try {
                if (t.constructor && !et.call(t, "constructor") && !et.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (i) {
                return !1
            }
            if (it.ownLast)
                for (e in t) return et.call(t, e);
            for (e in t);
            return void 0 === e || et.call(t, e)
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? K[tt.call(t)] || "object" : typeof t
        },
        globalEval: function(e) {
            e && rt.trim(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            })(e)
        },
        camelCase: function(t) {
            return t.replace(st, "ms-").replace(at, lt)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e, n) {
            var r, o = 0,
                s = t.length,
                a = i(t);
            if (n) {
                if (a)
                    for (; s > o && (r = e.apply(t[o], n), r !== !1); o++);
                else
                    for (o in t)
                        if (r = e.apply(t[o], n), r === !1) break
            } else if (a)
                for (; s > o && (r = e.call(t[o], o, t[o]), r !== !1); o++);
            else
                for (o in t)
                    if (r = e.call(t[o], o, t[o]), r === !1) break; return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(ot, "")
        },
        makeArray: function(t, e) {
            var n = e || [];
            return null != t && (i(Object(t)) ? rt.merge(n, "string" == typeof t ? [t] : t) : Z.call(n, t)), n
        },
        inArray: function(t, e, i) {
            var n;
            if (e) {
                if (J) return J.call(e, t, i);
                for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                    if (i in e && e[i] === t) return i
            }
            return -1
        },
        merge: function(t, e) {
            for (var i = +e.length, n = 0, r = t.length; i > n;) t[r++] = e[n++];
            if (i !== i)
                for (; void 0 !== e[n];) t[r++] = e[n++];
            return t.length = r, t
        },
        grep: function(t, e, i) {
            for (var n, r = [], o = 0, s = t.length, a = !i; s > o; o++) n = !e(t[o], o), n !== a && r.push(t[o]);
            return r
        },
        map: function(t, e, n) {
            var r, o = 0,
                s = t.length,
                a = i(t),
                l = [];
            if (a)
                for (; s > o; o++) r = e(t[o], o, n), null != r && l.push(r);
            else
                for (o in t) r = e(t[o], o, n), null != r && l.push(r);
            return G.apply([], l)
        },
        guid: 1,
        proxy: function(t, e) {
            var i, n, r;
            return "string" == typeof e && (r = t[e], e = t, t = r), rt.isFunction(t) ? (i = Q.call(arguments, 2), n = function() {
                return t.apply(e || this, i.concat(Q.call(arguments)))
            }, n.guid = t.guid = t.guid || rt.guid++, n) : void 0
        },
        now: function() {
            return +new Date
        },
        support: it
    }), rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        K["[object " + e + "]"] = e.toLowerCase()
    });
    var ct = function(t) {
        function e(t, e, i, n) {
            var r, o, s, a, l, c, d, f, p, m;
            if ((e ? e.ownerDocument || e : z) !== I && R(e), e = e || I, i = i || [], !t || "string" != typeof t) return i;
            if (1 !== (a = e.nodeType) && 9 !== a) return [];
            if (N && !n) {
                if (r = yt.exec(t))
                    if (s = r[1]) {
                        if (9 === a) {
                            if (o = e.getElementById(s), !o || !o.parentNode) return i;
                            if (o.id === s) return i.push(o), i
                        } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(s)) && M(e, o) && o.id === s) return i.push(o), i
                    } else {
                        if (r[2]) return K.apply(i, e.getElementsByTagName(t)), i;
                        if ((s = r[3]) && w.getElementsByClassName && e.getElementsByClassName) return K.apply(i, e.getElementsByClassName(s)), i
                    }
                if (w.qsa && (!j || !j.test(t))) {
                    if (f = d = $, p = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                        for (c = k(t), (d = e.getAttribute("id")) ? f = d.replace(bt, "\\$&") : e.setAttribute("id", f), f = "[id='" + f + "'] ", l = c.length; l--;) c[l] = f + h(c[l]);
                        p = _t.test(t) && u(e.parentNode) || e, m = c.join(",")
                    }
                    if (m) try {
                        return K.apply(i, p.querySelectorAll(m)), i
                    } catch (g) {} finally {
                        d || e.removeAttribute("id")
                    }
                }
            }
            return A(t.replace(lt, "$1"), e, i, n)
        }

        function i() {
            function t(i, n) {
                return e.push(i + " ") > x.cacheLength && delete t[e.shift()], t[i + " "] = n
            }
            var e = [];
            return t
        }

        function n(t) {
            return t[$] = !0, t
        }

        function r(t) {
            var e = I.createElement("div");
            try {
                return !!t(e)
            } catch (i) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function o(t, e) {
            for (var i = t.split("|"), n = t.length; n--;) x.attrHandle[i[n]] = e
        }

        function s(t, e) {
            var i = e && t,
                n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Y) - (~t.sourceIndex || Y);
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === e) return -1;
            return t ? 1 : -1
        }

        function a(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return "input" === i && e.type === t
            }
        }

        function l(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }

        function c(t) {
            return n(function(e) {
                return e = +e, n(function(i, n) {
                    for (var r, o = t([], i.length, e), s = o.length; s--;) i[r = o[s]] && (i[r] = !(n[r] = i[r]))
                })
            })
        }

        function u(t) {
            return t && typeof t.getElementsByTagName !== V && t
        }

        function d() {}

        function h(t) {
            for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
            return n
        }

        function f(t, e, i) {
            var n = e.dir,
                r = i && "parentNode" === n,
                o = B++;
            return e.first ? function(e, i, o) {
                for (; e = e[n];)
                    if (1 === e.nodeType || r) return t(e, i, o)
            } : function(e, i, s) {
                var a, l, c = [H, o];
                if (s) {
                    for (; e = e[n];)
                        if ((1 === e.nodeType || r) && t(e, i, s)) return !0
                } else
                    for (; e = e[n];)
                        if (1 === e.nodeType || r) {
                            if (l = e[$] || (e[$] = {}), (a = l[n]) && a[0] === H && a[1] === o) return c[2] = a[2];
                            if (l[n] = c, c[2] = t(e, i, s)) return !0
                        }
            }
        }

        function p(t) {
            return t.length > 1 ? function(e, i, n) {
                for (var r = t.length; r--;)
                    if (!t[r](e, i, n)) return !1;
                return !0
            } : t[0]
        }

        function m(t, i, n) {
            for (var r = 0, o = i.length; o > r; r++) e(t, i[r], n);
            return n
        }

        function g(t, e, i, n, r) {
            for (var o, s = [], a = 0, l = t.length, c = null != e; l > a; a++)(o = t[a]) && (!i || i(o, n, r)) && (s.push(o), c && e.push(a));
            return s
        }

        function v(t, e, i, r, o, s) {
            return r && !r[$] && (r = v(r)), o && !o[$] && (o = v(o, s)), n(function(n, s, a, l) {
                var c, u, d, h = [],
                    f = [],
                    p = s.length,
                    v = n || m(e || "*", a.nodeType ? [a] : a, []),
                    y = !t || !n && e ? v : g(v, h, t, a, l),
                    _ = i ? o || (n ? t : p || r) ? [] : s : y;
                if (i && i(y, _, a, l), r)
                    for (c = g(_, f), r(c, [], a, l), u = c.length; u--;)(d = c[u]) && (_[f[u]] = !(y[f[u]] = d));
                if (n) {
                    if (o || t) {
                        if (o) {
                            for (c = [], u = _.length; u--;)(d = _[u]) && c.push(y[u] = d);
                            o(null, _ = [], c, l)
                        }
                        for (u = _.length; u--;)(d = _[u]) && (c = o ? et.call(n, d) : h[u]) > -1 && (n[c] = !(s[c] = d))
                    }
                } else _ = g(_ === s ? _.splice(p, _.length) : _), o ? o(null, s, _, l) : K.apply(s, _)
            })
        }

        function y(t) {
            for (var e, i, n, r = t.length, o = x.relative[t[0].type], s = o || x.relative[" "], a = o ? 1 : 0, l = f(function(t) {
                    return t === e
                }, s, !0), c = f(function(t) {
                    return et.call(e, t) > -1
                }, s, !0), u = [function(t, i, n) {
                    return !o && (n || i !== P) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n))
                }]; r > a; a++)
                if (i = x.relative[t[a].type]) u = [f(p(u), i)];
                else {
                    if (i = x.filter[t[a].type].apply(null, t[a].matches), i[$]) {
                        for (n = ++a; r > n && !x.relative[t[n].type]; n++);
                        return v(a > 1 && p(u), a > 1 && h(t.slice(0, a - 1).concat({
                            value: " " === t[a - 2].type ? "*" : ""
                        })).replace(lt, "$1"), i, n > a && y(t.slice(a, n)), r > n && y(t = t.slice(n)), r > n && h(t))
                    }
                    u.push(i)
                }
            return p(u)
        }

        function _(t, i) {
            var r = i.length > 0,
                o = t.length > 0,
                s = function(n, s, a, l, c) {
                    var u, d, h, f = 0,
                        p = "0",
                        m = n && [],
                        v = [],
                        y = P,
                        _ = n || o && x.find.TAG("*", c),
                        b = H += null == y ? 1 : Math.random() || .1,
                        w = _.length;
                    for (c && (P = s !== I && s); p !== w && null != (u = _[p]); p++) {
                        if (o && u) {
                            for (d = 0; h = t[d++];)
                                if (h(u, s, a)) {
                                    l.push(u);
                                    break
                                }
                            c && (H = b)
                        }
                        r && ((u = !h && u) && f--, n && m.push(u))
                    }
                    if (f += p, r && p !== f) {
                        for (d = 0; h = i[d++];) h(m, v, s, a);
                        if (n) {
                            if (f > 0)
                                for (; p--;) m[p] || v[p] || (v[p] = Z.call(l));
                            v = g(v)
                        }
                        K.apply(l, v), c && !n && v.length > 0 && f + i.length > 1 && e.uniqueSort(l)
                    }
                    return c && (H = b, P = y), m
                };
            return r ? n(s) : s
        }
        var b, w, x, T, S, k, C, A, P, E, O, R, I, D, N, j, F, L, M, $ = "sizzle" + -new Date,
            z = t.document,
            H = 0,
            B = 0,
            q = i(),
            W = i(),
            X = i(),
            U = function(t, e) {
                return t === e && (O = !0), 0
            },
            V = "undefined",
            Y = 1 << 31,
            Q = {}.hasOwnProperty,
            G = [],
            Z = G.pop,
            J = G.push,
            K = G.push,
            tt = G.slice,
            et = G.indexOf || function(t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (this[e] === t) return e;
                return -1
            },
            it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            nt = "[\\x20\\t\\r\\n\\f]",
            rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ot = rt.replace("w", "w#"),
            st = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ot + "))|)" + nt + "*\\]",
            at = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + st + ")*)|.*)\\)|)",
            lt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
            ct = new RegExp("^" + nt + "*," + nt + "*"),
            ut = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
            dt = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
            ht = new RegExp(at),
            ft = new RegExp("^" + ot + "$"),
            pt = {
                ID: new RegExp("^#(" + rt + ")"),
                CLASS: new RegExp("^\\.(" + rt + ")"),
                TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + st),
                PSEUDO: new RegExp("^" + at),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + it + ")$", "i"),
                needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
            },
            mt = /^(?:input|select|textarea|button)$/i,
            gt = /^h\d$/i,
            vt = /^[^{]+\{\s*\[native \w/,
            yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            _t = /[+~]/,
            bt = /'|\\/g,
            wt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
            xt = function(t, e, i) {
                var n = "0x" + e - 65536;
                return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            };
        try {
            K.apply(G = tt.call(z.childNodes), z.childNodes), G[z.childNodes.length].nodeType
        } catch (Tt) {
            K = {
                apply: G.length ? function(t, e) {
                    J.apply(t, tt.call(e))
                } : function(t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++];);
                    t.length = i - 1
                }
            }
        }
        w = e.support = {}, S = e.isXML = function(t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, R = e.setDocument = function(t) {
            var e, i = t ? t.ownerDocument || t : z,
                n = i.defaultView;
            return i !== I && 9 === i.nodeType && i.documentElement ? (I = i, D = i.documentElement, N = !S(i), n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", function() {
                R()
            }, !1) : n.attachEvent && n.attachEvent("onunload", function() {
                R()
            })), w.attributes = r(function(t) {
                return t.className = "i", !t.getAttribute("className")
            }), w.getElementsByTagName = r(function(t) {
                return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length
            }), w.getElementsByClassName = vt.test(i.getElementsByClassName) && r(function(t) {
                return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
            }), w.getById = r(function(t) {
                return D.appendChild(t).id = $, !i.getElementsByName || !i.getElementsByName($).length
            }), w.getById ? (x.find.ID = function(t, e) {
                if (typeof e.getElementById !== V && N) {
                    var i = e.getElementById(t);
                    return i && i.parentNode ? [i] : []
                }
            }, x.filter.ID = function(t) {
                var e = t.replace(wt, xt);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete x.find.ID, x.filter.ID = function(t) {
                var e = t.replace(wt, xt);
                return function(t) {
                    var i = typeof t.getAttributeNode !== V && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }), x.find.TAG = w.getElementsByTagName ? function(t, e) {
                return typeof e.getElementsByTagName !== V ? e.getElementsByTagName(t) : void 0
            } : function(t, e) {
                var i, n = [],
                    r = 0,
                    o = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = o[r++];) 1 === i.nodeType && n.push(i);
                    return n
                }
                return o
            }, x.find.CLASS = w.getElementsByClassName && function(t, e) {
                return typeof e.getElementsByClassName !== V && N ? e.getElementsByClassName(t) : void 0
            }, F = [], j = [], (w.qsa = vt.test(i.querySelectorAll)) && (r(function(t) {
                t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && j.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || j.push("\\[" + nt + "*(?:value|" + it + ")"), t.querySelectorAll(":checked").length || j.push(":checked")
            }), r(function(t) {
                var e = i.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && j.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || j.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), j.push(",.*:")
            })), (w.matchesSelector = vt.test(L = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && r(function(t) {
                w.disconnectedMatch = L.call(t, "div"), L.call(t, "[s!='']:x"), F.push("!=", at)
            }), j = j.length && new RegExp(j.join("|")), F = F.length && new RegExp(F.join("|")), e = vt.test(D.compareDocumentPosition), M = e || vt.test(D.contains) ? function(t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t,
                    n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            } : function(t, e) {
                if (e)
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                return !1
            }, U = e ? function(t, e) {
                if (t === e) return O = !0, 0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !w.sortDetached && e.compareDocumentPosition(t) === n ? t === i || t.ownerDocument === z && M(z, t) ? -1 : e === i || e.ownerDocument === z && M(z, e) ? 1 : E ? et.call(E, t) - et.call(E, e) : 0 : 4 & n ? -1 : 1)
            } : function(t, e) {
                if (t === e) return O = !0, 0;
                var n, r = 0,
                    o = t.parentNode,
                    a = e.parentNode,
                    l = [t],
                    c = [e];
                if (!o || !a) return t === i ? -1 : e === i ? 1 : o ? -1 : a ? 1 : E ? et.call(E, t) - et.call(E, e) : 0;
                if (o === a) return s(t, e);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (n = e; n = n.parentNode;) c.unshift(n);
                for (; l[r] === c[r];) r++;
                return r ? s(l[r], c[r]) : l[r] === z ? -1 : c[r] === z ? 1 : 0
            }, i) : I
        }, e.matches = function(t, i) {
            return e(t, null, null, i)
        }, e.matchesSelector = function(t, i) {
            if ((t.ownerDocument || t) !== I && R(t), i = i.replace(dt, "='$1']"), w.matchesSelector && N && (!F || !F.test(i)) && (!j || !j.test(i))) try {
                var n = L.call(t, i);
                if (n || w.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
            } catch (r) {}
            return e(i, I, null, [t]).length > 0
        }, e.contains = function(t, e) {
            return (t.ownerDocument || t) !== I && R(t), M(t, e)
        }, e.attr = function(t, e) {
            (t.ownerDocument || t) !== I && R(t);
            var i = x.attrHandle[e.toLowerCase()],
                n = i && Q.call(x.attrHandle, e.toLowerCase()) ? i(t, e, !N) : void 0;
            return void 0 !== n ? n : w.attributes || !N ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }, e.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function(t) {
            var e, i = [],
                n = 0,
                r = 0;
            if (O = !w.detectDuplicates, E = !w.sortStable && t.slice(0), t.sort(U), O) {
                for (; e = t[r++];) e === t[r] && (n = i.push(r));
                for (; n--;) t.splice(i[n], 1)
            }
            return E = null, t
        }, T = e.getText = function(t) {
            var e, i = "",
                n = 0,
                r = t.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) i += T(t)
                } else if (3 === r || 4 === r) return t.nodeValue
            } else
                for (; e = t[n++];) i += T(e);
            return i
        }, x = e.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: pt,
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
                ATTR: function(t) {
                    return t[1] = t[1].replace(wt, xt), t[3] = (t[3] || t[4] || t[5] || "").replace(wt, xt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },
                CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                },
                PSEUDO: function(t) {
                    var e, i = !t[6] && t[2];
                    return pt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ht.test(i) && (e = k(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function(t) {
                    var e = t.replace(wt, xt).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    } : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(t) {
                    var e = q[t + " "];
                    return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && q(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== V && t.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, i, n) {
                    return function(r) {
                        var o = e.attr(r, t);
                        return null == o ? "!=" === i : i ? (o += "", "=" === i ? o === n : "!=" === i ? o !== n : "^=" === i ? n && 0 === o.indexOf(n) : "*=" === i ? n && o.indexOf(n) > -1 : "$=" === i ? n && o.slice(-n.length) === n : "~=" === i ? (" " + o + " ").indexOf(n) > -1 : "|=" === i ? o === n || o.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(t, e, i, n, r) {
                    var o = "nth" !== t.slice(0, 3),
                        s = "last" !== t.slice(-4),
                        a = "of-type" === e;
                    return 1 === n && 0 === r ? function(t) {
                        return !!t.parentNode
                    } : function(e, i, l) {
                        var c, u, d, h, f, p, m = o !== s ? "nextSibling" : "previousSibling",
                            g = e.parentNode,
                            v = a && e.nodeName.toLowerCase(),
                            y = !l && !a;
                        if (g) {
                            if (o) {
                                for (; m;) {
                                    for (d = e; d = d[m];)
                                        if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                    p = m = "only" === t && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [s ? g.firstChild : g.lastChild], s && y) {
                                for (u = g[$] || (g[$] = {}), c = u[t] || [], f = c[0] === H && c[1], h = c[0] === H && c[2], d = f && g.childNodes[f]; d = ++f && d && d[m] || (h = f = 0) || p.pop();)
                                    if (1 === d.nodeType && ++h && d === e) {
                                        u[t] = [H, f, h];
                                        break
                                    }
                            } else if (y && (c = (e[$] || (e[$] = {}))[t]) && c[0] === H) h = c[1];
                            else
                                for (;
                                    (d = ++f && d && d[m] || (h = f = 0) || p.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++h || (y && ((d[$] || (d[$] = {}))[t] = [H, h]), d !== e)););
                            return h -= r, h === n || h % n === 0 && h / n >= 0
                        }
                    }
                },
                PSEUDO: function(t, i) {
                    var r, o = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return o[$] ? o(i) : o.length > 1 ? (r = [t, t, "", i], x.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                        for (var n, r = o(t, i), s = r.length; s--;) n = et.call(t, r[s]), t[n] = !(e[n] = r[s])
                    }) : function(t) {
                        return o(t, 0, r)
                    }) : o
                }
            },
            pseudos: {
                not: n(function(t) {
                    var e = [],
                        i = [],
                        r = C(t.replace(lt, "$1"));
                    return r[$] ? n(function(t, e, i, n) {
                        for (var o, s = r(t, null, n, []), a = t.length; a--;)(o = s[a]) && (t[a] = !(e[a] = o))
                    }) : function(t, n, o) {
                        return e[0] = t, r(e, null, o, i), !i.pop()
                    }
                }),
                has: n(function(t) {
                    return function(i) {
                        return e(t, i).length > 0
                    }
                }),
                contains: n(function(t) {
                    return function(e) {
                        return (e.textContent || e.innerText || T(e)).indexOf(t) > -1
                    }
                }),
                lang: n(function(t) {
                    return ft.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(wt, xt).toLowerCase(),
                        function(e) {
                            var i;
                            do
                                if (i = N ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                            while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function(e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                },
                root: function(t) {
                    return t === D
                },
                focus: function(t) {
                    return t === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: function(t) {
                    return t.disabled === !1
                },
                disabled: function(t) {
                    return t.disabled === !0
                },
                checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                },
                empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6) return !1;
                    return !0
                },
                parent: function(t) {
                    return !x.pseudos.empty(t)
                },
                header: function(t) {
                    return gt.test(t.nodeName)
                },
                input: function(t) {
                    return mt.test(t.nodeName)
                },
                button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(t, e) {
                    return [e - 1]
                }),
                eq: c(function(t, e, i) {
                    return [0 > i ? i + e : i]
                }),
                even: c(function(t, e) {
                    for (var i = 0; e > i; i += 2) t.push(i);
                    return t
                }),
                odd: c(function(t, e) {
                    for (var i = 1; e > i; i += 2) t.push(i);
                    return t
                }),
                lt: c(function(t, e, i) {
                    for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                    return t
                }),
                gt: c(function(t, e, i) {
                    for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
                    return t
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[b] = a(b);
        for (b in {
                submit: !0,
                reset: !0
            }) x.pseudos[b] = l(b);
        return d.prototype = x.filters = x.pseudos, x.setFilters = new d, k = e.tokenize = function(t, i) {
            var n, r, o, s, a, l, c, u = W[t + " "];
            if (u) return i ? 0 : u.slice(0);
            for (a = t, l = [], c = x.preFilter; a;) {
                (!n || (r = ct.exec(a))) && (r && (a = a.slice(r[0].length) || a), l.push(o = [])), n = !1, (r = ut.exec(a)) && (n = r.shift(), o.push({
                    value: n,
                    type: r[0].replace(lt, " ")
                }), a = a.slice(n.length));
                for (s in x.filter) !(r = pt[s].exec(a)) || c[s] && !(r = c[s](r)) || (n = r.shift(), o.push({
                    value: n,
                    type: s,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break
            }
            return i ? a.length : a ? e.error(t) : W(t, l).slice(0)
        }, C = e.compile = function(t, e) {
            var i, n = [],
                r = [],
                o = X[t + " "];
            if (!o) {
                for (e || (e = k(t)), i = e.length; i--;) o = y(e[i]), o[$] ? n.push(o) : r.push(o);
                o = X(t, _(r, n)), o.selector = t
            }
            return o
        }, A = e.select = function(t, e, i, n) {
            var r, o, s, a, l, c = "function" == typeof t && t,
                d = !n && k(t = c.selector || t);
            if (i = i || [], 1 === d.length) {
                if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && w.getById && 9 === e.nodeType && N && x.relative[o[1].type]) {
                    if (e = (x.find.ID(s.matches[0].replace(wt, xt), e) || [])[0], !e) return i;
                    c && (e = e.parentNode), t = t.slice(o.shift().value.length)
                }
                for (r = pt.needsContext.test(t) ? 0 : o.length; r-- && (s = o[r], !x.relative[a = s.type]);)
                    if ((l = x.find[a]) && (n = l(s.matches[0].replace(wt, xt), _t.test(o[0].type) && u(e.parentNode) || e))) {
                        if (o.splice(r, 1), t = n.length && h(o), !t) return K.apply(i, n), i;
                        break
                    }
            }
            return (c || C(t, d))(n, e, !N, i, _t.test(t) && u(e.parentNode) || e), i
        }, w.sortStable = $.split("").sort(U).join("") === $, w.detectDuplicates = !!O, R(), w.sortDetached = r(function(t) {
            return 1 & t.compareDocumentPosition(I.createElement("div"))
        }), r(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(t, e, i) {
            return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), w.attributes && r(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || o("value", function(t, e, i) {
            return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), r(function(t) {
            return null == t.getAttribute("disabled")
        }) || o(it, function(t, e, i) {
            var n;
            return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }), e
    }(t);
    rt.find = ct, rt.expr = ct.selectors, rt.expr[":"] = rt.expr.pseudos, rt.unique = ct.uniqueSort, rt.text = ct.getText, rt.isXMLDoc = ct.isXML, rt.contains = ct.contains;
    var ut = rt.expr.match.needsContext,
        dt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ht = /^.[^:#\[\.,]*$/;
    rt.filter = function(t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? rt.find.matchesSelector(n, t) ? [n] : [] : rt.find.matches(t, rt.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, rt.fn.extend({
        find: function(t) {
            var e, i = [],
                n = this,
                r = n.length;
            if ("string" != typeof t) return this.pushStack(rt(t).filter(function() {
                for (e = 0; r > e; e++)
                    if (rt.contains(n[e], this)) return !0
            }));
            for (e = 0; r > e; e++) rt.find(t, n[e], i);
            return i = this.pushStack(r > 1 ? rt.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
        },
        filter: function(t) {
            return this.pushStack(n(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(n(this, t || [], !0))
        },
        is: function(t) {
            return !!n(this, "string" == typeof t && ut.test(t) ? rt(t) : t || [], !1).length
        }
    });
    var ft, pt = t.document,
        mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        gt = rt.fn.init = function(t, e) {
            var i, n;
            if (!t) return this;
            if ("string" == typeof t) {
                if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : mt.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || ft).find(t) : this.constructor(e).find(t);
                if (i[1]) {
                    if (e = e instanceof rt ? e[0] : e, rt.merge(this, rt.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : pt, !0)), dt.test(i[1]) && rt.isPlainObject(e))
                        for (i in e) rt.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                    return this
                }
                if (n = pt.getElementById(i[2]), n && n.parentNode) {
                    if (n.id !== i[2]) return ft.find(t);
                    this.length = 1, this[0] = n
                }
                return this.context = pt, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : rt.isFunction(t) ? "undefined" != typeof ft.ready ? ft.ready(t) : t(rt) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), rt.makeArray(t, this))
        };
    gt.prototype = rt.fn, ft = rt(pt);
    var vt = /^(?:parents|prev(?:Until|All))/,
        yt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    rt.extend({
        dir: function(t, e, i) {
            for (var n = [], r = t[e]; r && 9 !== r.nodeType && (void 0 === i || 1 !== r.nodeType || !rt(r).is(i));) 1 === r.nodeType && n.push(r), r = r[e];
            return n
        },
        sibling: function(t, e) {
            for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
            return i
        }
    }), rt.fn.extend({
        has: function(t) {
            var e, i = rt(t, this),
                n = i.length;
            return this.filter(function() {
                for (e = 0; n > e; e++)
                    if (rt.contains(this, i[e])) return !0
            })
        },
        closest: function(t, e) {
            for (var i, n = 0, r = this.length, o = [], s = ut.test(t) || "string" != typeof t ? rt(t, e || this.context) : 0; r > n; n++)
                for (i = this[n]; i && i !== e; i = i.parentNode)
                    if (i.nodeType < 11 && (s ? s.index(i) > -1 : 1 === i.nodeType && rt.find.matchesSelector(i, t))) {
                        o.push(i);
                        break
                    }
            return this.pushStack(o.length > 1 ? rt.unique(o) : o)
        },
        index: function(t) {
            return t ? "string" == typeof t ? rt.inArray(this[0], rt(t)) : rt.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(rt.unique(rt.merge(this.get(), rt(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), rt.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return rt.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, i) {
            return rt.dir(t, "parentNode", i)
        },
        next: function(t) {
            return r(t, "nextSibling")
        },
        prev: function(t) {
            return r(t, "previousSibling")
        },
        nextAll: function(t) {
            return rt.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return rt.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, i) {
            return rt.dir(t, "nextSibling", i)
        },
        prevUntil: function(t, e, i) {
            return rt.dir(t, "previousSibling", i)
        },
        siblings: function(t) {
            return rt.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return rt.sibling(t.firstChild)
        },
        contents: function(t) {
            return rt.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : rt.merge([], t.childNodes)
        }
    }, function(t, e) {
        rt.fn[t] = function(i, n) {
            var r = rt.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (r = rt.filter(n, r)), this.length > 1 && (yt[t] || (r = rt.unique(r)), vt.test(t) && (r = r.reverse())), this.pushStack(r)
        }
    });
    var _t = /\S+/g,
        bt = {};
    rt.Callbacks = function(t) {
        t = "string" == typeof t ? bt[t] || o(t) : rt.extend({}, t);
        var e, i, n, r, s, a, l = [],
            c = !t.once && [],
            u = function(o) {
                for (i = t.memory && o, n = !0, s = a || 0, a = 0, r = l.length, e = !0; l && r > s; s++)
                    if (l[s].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                        i = !1;
                        break
                    }
                e = !1, l && (c ? c.length && u(c.shift()) : i ? l = [] : d.disable())
            },
            d = {
                add: function() {
                    if (l) {
                        var n = l.length;
                        ! function o(e) {
                            rt.each(e, function(e, i) {
                                var n = rt.type(i);
                                "function" === n ? t.unique && d.has(i) || l.push(i) : i && i.length && "string" !== n && o(i)
                            })
                        }(arguments), e ? r = l.length : i && (a = n, u(i))
                    }
                    return this
                },
                remove: function() {
                    return l && rt.each(arguments, function(t, i) {
                        for (var n;
                            (n = rt.inArray(i, l, n)) > -1;) l.splice(n, 1), e && (r >= n && r--, s >= n && s--)
                    }), this
                },
                has: function(t) {
                    return t ? rt.inArray(t, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], r = 0, this
                },
                disable: function() {
                    return l = c = i = void 0, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return c = void 0, i || d.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(t, i) {
                    return !l || n && !c || (i = i || [], i = [t, i.slice ? i.slice() : i], e ? c.push(i) : u(i)), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return d
    }, rt.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", rt.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", rt.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", rt.Callbacks("memory")]
                ],
                i = "pending",
                n = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return rt.Deferred(function(i) {
                            rt.each(e, function(e, o) {
                                var s = rt.isFunction(t[e]) && t[e];
                                r[o[1]](function() {
                                    var t = s && s.apply(this, arguments);
                                    t && rt.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o[0] + "With"](this === n ? i.promise() : this, s ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? rt.extend(t, n) : n
                    }
                },
                r = {};
            return n.pipe = n.then, rt.each(e, function(t, o) {
                var s = o[2],
                    a = o[3];
                n[o[1]] = s.add, a && s.add(function() {
                    i = a
                }, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function() {
                    return r[o[0] + "With"](this === r ? n : this, arguments), this
                }, r[o[0] + "With"] = s.fireWith
            }), n.promise(r), t && t.call(r, r), r
        },
        when: function(t) {
            var e, i, n, r = 0,
                o = Q.call(arguments),
                s = o.length,
                a = 1 !== s || t && rt.isFunction(t.promise) ? s : 0,
                l = 1 === a ? t : rt.Deferred(),
                c = function(t, i, n) {
                    return function(r) {
                        i[t] = this, n[t] = arguments.length > 1 ? Q.call(arguments) : r, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                    }
                };
            if (s > 1)
                for (e = new Array(s), i = new Array(s), n = new Array(s); s > r; r++) o[r] && rt.isFunction(o[r].promise) ? o[r].promise().done(c(r, n, o)).fail(l.reject).progress(c(r, i, e)) : --a;
            return a || l.resolveWith(n, o), l.promise()
        }
    });
    var wt;
    rt.fn.ready = function(t) {
        return rt.ready.promise().done(t), this
    }, rt.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? rt.readyWait++ : rt.ready(!0)
        },
        ready: function(t) {
            if (t === !0 ? !--rt.readyWait : !rt.isReady) {
                if (!pt.body) return setTimeout(rt.ready);
                rt.isReady = !0, t !== !0 && --rt.readyWait > 0 || (wt.resolveWith(pt, [rt]), rt.fn.triggerHandler && (rt(pt).triggerHandler("ready"), rt(pt).off("ready")))
            }
        }
    }), rt.ready.promise = function(e) {
        if (!wt)
            if (wt = rt.Deferred(), "complete" === pt.readyState) setTimeout(rt.ready);
            else if (pt.addEventListener) pt.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1);
        else {
            pt.attachEvent("onreadystatechange", a), t.attachEvent("onload", a);
            var i = !1;
            try {
                i = null == t.frameElement && pt.documentElement
            } catch (n) {}
            i && i.doScroll && ! function r() {
                if (!rt.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (t) {
                        return setTimeout(r, 50)
                    }
                    s(), rt.ready()
                }
            }()
        }
        return wt.promise(e)
    };
    var xt, Tt = "undefined";
    for (xt in rt(it)) break;
    it.ownLast = "0" !== xt, it.inlineBlockNeedsLayout = !1, rt(function() {
            var t, e, i, n;
            i = pt.getElementsByTagName("body")[0], i && i.style && (e = pt.createElement("div"), n = pt.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== Tt && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", it.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (i.style.zoom = 1)), i.removeChild(n))
        }),
        function() {
            var t = pt.createElement("div");
            if (null == it.deleteExpando) {
                it.deleteExpando = !0;
                try {
                    delete t.test
                } catch (e) {
                    it.deleteExpando = !1
                }
            }
            t = null
        }(), rt.acceptData = function(t) {
            var e = rt.noData[(t.nodeName + " ").toLowerCase()],
                i = +t.nodeType || 1;
            return 1 !== i && 9 !== i ? !1 : !e || e !== !0 && t.getAttribute("classid") === e
        };
    var St = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        kt = /([A-Z])/g;
    rt.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(t) {
            return t = t.nodeType ? rt.cache[t[rt.expando]] : t[rt.expando], !!t && !c(t)
        },
        data: function(t, e, i) {
            return u(t, e, i)
        },
        removeData: function(t, e) {
            return d(t, e)
        },
        _data: function(t, e, i) {
            return u(t, e, i, !0)
        },
        _removeData: function(t, e) {
            return d(t, e, !0)
        }
    }), rt.fn.extend({
        data: function(t, e) {
            var i, n, r, o = this[0],
                s = o && o.attributes;
            if (void 0 === t) {
                if (this.length && (r = rt.data(o), 1 === o.nodeType && !rt._data(o, "parsedAttrs"))) {
                    for (i = s.length; i--;) s[i] && (n = s[i].name, 0 === n.indexOf("data-") && (n = rt.camelCase(n.slice(5)), l(o, n, r[n])));
                    rt._data(o, "parsedAttrs", !0)
                }
                return r
            }
            return "object" == typeof t ? this.each(function() {
                rt.data(this, t)
            }) : arguments.length > 1 ? this.each(function() {
                rt.data(this, t, e)
            }) : o ? l(o, t, rt.data(o, t)) : void 0
        },
        removeData: function(t) {
            return this.each(function() {
                rt.removeData(this, t)
            })
        }
    }), rt.extend({
        queue: function(t, e, i) {
            var n;
            return t ? (e = (e || "fx") + "queue", n = rt._data(t, e), i && (!n || rt.isArray(i) ? n = rt._data(t, e, rt.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var i = rt.queue(t, e),
                n = i.length,
                r = i.shift(),
                o = rt._queueHooks(t, e),
                s = function() {
                    rt.dequeue(t, e)
                };
            "inprogress" === r && (r = i.shift(), n--), r && ("fx" === e && i.unshift("inprogress"), delete o.stop, r.call(t, s, o)), !n && o && o.empty.fire()
        },
        _queueHooks: function(t, e) {
            var i = e + "queueHooks";
            return rt._data(t, i) || rt._data(t, i, {
                empty: rt.Callbacks("once memory").add(function() {
                    rt._removeData(t, e + "queue"), rt._removeData(t, i)
                })
            })
        }
    }), rt.fn.extend({
        queue: function(t, e) {
            var i = 2;
            return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? rt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var i = rt.queue(this, t, e);
                rt._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && rt.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                rt.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var i, n = 1,
                r = rt.Deferred(),
                o = this,
                s = this.length,
                a = function() {
                    --n || r.resolveWith(o, [o])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;) i = rt._data(o[s], t + "queueHooks"), i && i.empty && (n++, i.empty.add(a));
            return a(), r.promise(e)
        }
    });
    var Ct = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        At = ["Top", "Right", "Bottom", "Left"],
        Pt = function(t, e) {
            return t = e || t, "none" === rt.css(t, "display") || !rt.contains(t.ownerDocument, t)
        },
        Et = rt.access = function(t, e, i, n, r, o, s) {
            var a = 0,
                l = t.length,
                c = null == i;
            if ("object" === rt.type(i)) {
                r = !0;
                for (a in i) rt.access(t, e, a, i[a], !0, o, s)
            } else if (void 0 !== n && (r = !0, rt.isFunction(n) || (s = !0), c && (s ? (e.call(t, n), e = null) : (c = e, e = function(t, e, i) {
                    return c.call(rt(t), i)
                })), e))
                for (; l > a; a++) e(t[a], i, s ? n : n.call(t[a], a, e(t[a], i)));
            return r ? t : c ? e.call(t) : l ? e(t[0], i) : o
        },
        Ot = /^(?:checkbox|radio)$/i;
    ! function() {
        var t = pt.createElement("input"),
            e = pt.createElement("div"),
            i = pt.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", it.leadingWhitespace = 3 === e.firstChild.nodeType, it.tbody = !e.getElementsByTagName("tbody").length, it.htmlSerialize = !!e.getElementsByTagName("link").length, it.html5Clone = "<:nav></:nav>" !== pt.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, i.appendChild(t), it.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", it.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, i.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", it.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, it.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
                it.noCloneEvent = !1
            }), e.cloneNode(!0).click()), null == it.deleteExpando) {
            it.deleteExpando = !0;
            try {
                delete e.test
            } catch (n) {
                it.deleteExpando = !1
            }
        }
    }(),
    function() {
        var e, i, n = pt.createElement("div");
        for (e in {
                submit: !0,
                change: !0,
                focusin: !0
            }) i = "on" + e, (it[e + "Bubbles"] = i in t) || (n.setAttribute(i, "t"), it[e + "Bubbles"] = n.attributes[i].expando === !1);
        n = null
    }();
    var Rt = /^(?:input|select|textarea)$/i,
        It = /^key/,
        Dt = /^(?:mouse|pointer|contextmenu)|click/,
        Nt = /^(?:focusinfocus|focusoutblur)$/,
        jt = /^([^.]*)(?:\.(.+)|)$/;
    rt.event = {
        global: {},
        add: function(t, e, i, n, r) {
            var o, s, a, l, c, u, d, h, f, p, m, g = rt._data(t);
            if (g) {
                for (i.handler && (l = i, i = l.handler, r = l.selector), i.guid || (i.guid = rt.guid++), (s = g.events) || (s = g.events = {}), (u = g.handle) || (u = g.handle = function(t) {
                        return typeof rt === Tt || t && rt.event.triggered === t.type ? void 0 : rt.event.dispatch.apply(u.elem, arguments)
                    }, u.elem = t), e = (e || "").match(_t) || [""], a = e.length; a--;) o = jt.exec(e[a]) || [], f = m = o[1], p = (o[2] || "").split(".").sort(), f && (c = rt.event.special[f] || {}, f = (r ? c.delegateType : c.bindType) || f, c = rt.event.special[f] || {}, d = rt.extend({
                    type: f,
                    origType: m,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: r,
                    needsContext: r && rt.expr.match.needsContext.test(r),
                    namespace: p.join(".")
                }, l), (h = s[f]) || (h = s[f] = [], h.delegateCount = 0, c.setup && c.setup.call(t, n, p, u) !== !1 || (t.addEventListener ? t.addEventListener(f, u, !1) : t.attachEvent && t.attachEvent("on" + f, u))), c.add && (c.add.call(t, d), d.handler.guid || (d.handler.guid = i.guid)), r ? h.splice(h.delegateCount++, 0, d) : h.push(d), rt.event.global[f] = !0);
                t = null
            }
        },
        remove: function(t, e, i, n, r) {
            var o, s, a, l, c, u, d, h, f, p, m, g = rt.hasData(t) && rt._data(t);
            if (g && (u = g.events)) {
                for (e = (e || "").match(_t) || [""], c = e.length; c--;)
                    if (a = jt.exec(e[c]) || [], f = m = a[1], p = (a[2] || "").split(".").sort(), f) {
                        for (d = rt.event.special[f] || {}, f = (n ? d.delegateType : d.bindType) || f, h = u[f] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = h.length; o--;) s = h[o], !r && m !== s.origType || i && i.guid !== s.guid || a && !a.test(s.namespace) || n && n !== s.selector && ("**" !== n || !s.selector) || (h.splice(o, 1), s.selector && h.delegateCount--, d.remove && d.remove.call(t, s));
                        l && !h.length && (d.teardown && d.teardown.call(t, p, g.handle) !== !1 || rt.removeEvent(t, f, g.handle), delete u[f])
                    } else
                        for (f in u) rt.event.remove(t, f + e[c], i, n, !0);
                rt.isEmptyObject(u) && (delete g.handle, rt._removeData(t, "events"))
            }
        },
        trigger: function(e, i, n, r) {
            var o, s, a, l, c, u, d, h = [n || pt],
                f = et.call(e, "type") ? e.type : e,
                p = et.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = u = n = n || pt, 3 !== n.nodeType && 8 !== n.nodeType && !Nt.test(f + rt.event.triggered) && (f.indexOf(".") >= 0 && (p = f.split("."), f = p.shift(), p.sort()), s = f.indexOf(":") < 0 && "on" + f, e = e[rt.expando] ? e : new rt.Event(f, "object" == typeof e && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : rt.makeArray(i, [e]), c = rt.event.special[f] || {}, r || !c.trigger || c.trigger.apply(n, i) !== !1)) {
                if (!r && !c.noBubble && !rt.isWindow(n)) {
                    for (l = c.delegateType || f, Nt.test(l + f) || (a = a.parentNode); a; a = a.parentNode) h.push(a), u = a;
                    u === (n.ownerDocument || pt) && h.push(u.defaultView || u.parentWindow || t)
                }
                for (d = 0;
                    (a = h[d++]) && !e.isPropagationStopped();) e.type = d > 1 ? l : c.bindType || f, o = (rt._data(a, "events") || {})[e.type] && rt._data(a, "handle"), o && o.apply(a, i), o = s && a[s], o && o.apply && rt.acceptData(a) && (e.result = o.apply(a, i), e.result === !1 && e.preventDefault());
                if (e.type = f, !r && !e.isDefaultPrevented() && (!c._default || c._default.apply(h.pop(), i) === !1) && rt.acceptData(n) && s && n[f] && !rt.isWindow(n)) {
                    u = n[s], u && (n[s] = null), rt.event.triggered = f;
                    try {
                        n[f]()
                    } catch (m) {}
                    rt.event.triggered = void 0, u && (n[s] = u)
                }
                return e.result
            }
        },
        dispatch: function(t) {
            t = rt.event.fix(t);
            var e, i, n, r, o, s = [],
                a = Q.call(arguments),
                l = (rt._data(this, "events") || {})[t.type] || [],
                c = rt.event.special[t.type] || {};
            if (a[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                for (s = rt.event.handlers.call(this, t, l), e = 0;
                    (r = s[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = r.elem, o = 0;
                        (n = r.handlers[o++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(n.namespace)) && (t.handleObj = n, t.data = n.data, i = ((rt.event.special[n.origType] || {}).handle || n.handler).apply(r.elem, a), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, e) {
            var i, n, r, o, s = [],
                a = e.delegateCount,
                l = t.target;
            if (a && l.nodeType && (!t.button || "click" !== t.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                        for (r = [], o = 0; a > o; o++) n = e[o], i = n.selector + " ", void 0 === r[i] && (r[i] = n.needsContext ? rt(i, this).index(l) >= 0 : rt.find(i, this, null, [l]).length), r[i] && r.push(n);
                        r.length && s.push({
                            elem: l,
                            handlers: r
                        })
                    }
            return a < e.length && s.push({
                elem: this,
                handlers: e.slice(a)
            }), s
        },
        fix: function(t) {
            if (t[rt.expando]) return t;
            var e, i, n, r = t.type,
                o = t,
                s = this.fixHooks[r];
            for (s || (this.fixHooks[r] = s = Dt.test(r) ? this.mouseHooks : It.test(r) ? this.keyHooks : {}), n = s.props ? this.props.concat(s.props) : this.props, t = new rt.Event(o), e = n.length; e--;) i = n[e], t[i] = o[i];
            return t.target || (t.target = o.srcElement || pt), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, s.filter ? s.filter(t, o) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var i, n, r, o = e.button,
                    s = e.fromElement;
                return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || pt, r = n.documentElement, i = n.body, t.pageX = e.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !t.relatedTarget && s && (t.relatedTarget = s === t.target ? e.toElement : s), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== p() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === p() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return rt.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(t) {
                    return rt.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, i, n) {
            var r = rt.extend(new rt.Event, i, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            n ? rt.event.trigger(r, null, e) : rt.event.dispatch.call(e, r), r.isDefaultPrevented() && i.preventDefault()
        }
    }, rt.removeEvent = pt.removeEventListener ? function(t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i, !1)
    } : function(t, e, i) {
        var n = "on" + e;
        t.detachEvent && (typeof t[n] === Tt && (t[n] = null), t.detachEvent(n, i))
    }, rt.Event = function(t, e) {
        return this instanceof rt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? h : f) : this.type = t, e && rt.extend(this, e), this.timeStamp = t && t.timeStamp || rt.now(), void(this[rt.expando] = !0)) : new rt.Event(t, e)
    }, rt.Event.prototype = {
        isDefaultPrevented: f,
        isPropagationStopped: f,
        isImmediatePropagationStopped: f,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = h, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = h, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = h, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, rt.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        rt.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var i, n = this,
                    r = t.relatedTarget,
                    o = t.handleObj;
                return (!r || r !== n && !rt.contains(n, r)) && (t.type = o.origType, i = o.handler.apply(this, arguments), t.type = e), i
            }
        }
    }), it.submitBubbles || (rt.event.special.submit = {
        setup: function() {
            return rt.nodeName(this, "form") ? !1 : void rt.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target,
                    i = rt.nodeName(e, "input") || rt.nodeName(e, "button") ? e.form : void 0;
                i && !rt._data(i, "submitBubbles") && (rt.event.add(i, "submit._submit", function(t) {
                    t._submit_bubble = !0
                }), rt._data(i, "submitBubbles", !0))
            })
        },
        postDispatch: function(t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && rt.event.simulate("submit", this.parentNode, t, !0))
        },
        teardown: function() {
            return rt.nodeName(this, "form") ? !1 : void rt.event.remove(this, "._submit")
        }
    }), it.changeBubbles || (rt.event.special.change = {
        setup: function() {
            return Rt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (rt.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), rt.event.add(this, "click._change", function(t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), rt.event.simulate("change", this, t, !0)
            })), !1) : void rt.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                Rt.test(e.nodeName) && !rt._data(e, "changeBubbles") && (rt.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || rt.event.simulate("change", this.parentNode, t, !0)
                }), rt._data(e, "changeBubbles", !0))
            })
        },
        handle: function(t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return rt.event.remove(this, "._change"), !Rt.test(this.nodeName)
        }
    }), it.focusinBubbles || rt.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var i = function(t) {
            rt.event.simulate(e, t.target, rt.event.fix(t), !0)
        };
        rt.event.special[e] = {
            setup: function() {
                var n = this.ownerDocument || this,
                    r = rt._data(n, e);
                r || n.addEventListener(t, i, !0), rt._data(n, e, (r || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this,
                    r = rt._data(n, e) - 1;
                r ? rt._data(n, e, r) : (n.removeEventListener(t, i, !0), rt._removeData(n, e))
            }
        }
    }), rt.fn.extend({
        on: function(t, e, i, n, r) {
            var o, s;
            if ("object" == typeof t) {
                "string" != typeof e && (i = i || e, e = void 0);
                for (o in t) this.on(o, e, i, t[o], r);
                return this
            }
            if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, i = void 0) : (n = i, i = e, e = void 0)), n === !1) n = f;
            else if (!n) return this;
            return 1 === r && (s = n, n = function(t) {
                return rt().off(t), s.apply(this, arguments)
            }, n.guid = s.guid || (s.guid = rt.guid++)), this.each(function() {
                rt.event.add(this, t, n, i, e)
            })
        },
        one: function(t, e, i, n) {
            return this.on(t, e, i, n, 1)
        },
        off: function(t, e, i) {
            var n, r;
            if (t && t.preventDefault && t.handleObj) return n = t.handleObj, rt(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" == typeof t) {
                for (r in t) this.off(r, e, t[r]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (i = e, e = void 0), i === !1 && (i = f), this.each(function() {
                rt.event.remove(this, t, i, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                rt.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var i = this[0];
            return i ? rt.event.trigger(t, e, i, !0) : void 0
        }
    });
    var Ft = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Lt = / jQuery\d+="(?:null|\d+)"/g,
        Mt = new RegExp("<(?:" + Ft + ")[\\s/>]", "i"),
        $t = /^\s+/,
        zt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ht = /<([\w:]+)/,
        Bt = /<tbody/i,
        qt = /<|&#?\w+;/,
        Wt = /<(?:script|style|link)/i,
        Xt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ut = /^$|\/(?:java|ecma)script/i,
        Vt = /^true\/(.*)/,
        Yt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Qt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: it.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Gt = m(pt),
        Zt = Gt.appendChild(pt.createElement("div"));
    Qt.optgroup = Qt.option, Qt.tbody = Qt.tfoot = Qt.colgroup = Qt.caption = Qt.thead, Qt.th = Qt.td, rt.extend({
        clone: function(t, e, i) {
            var n, r, o, s, a, l = rt.contains(t.ownerDocument, t);
            if (it.html5Clone || rt.isXMLDoc(t) || !Mt.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (Zt.innerHTML = t.outerHTML, Zt.removeChild(o = Zt.firstChild)), !(it.noCloneEvent && it.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || rt.isXMLDoc(t)))
                for (n = g(o), a = g(t), s = 0; null != (r = a[s]); ++s) n[s] && T(r, n[s]);
            if (e)
                if (i)
                    for (a = a || g(t), n = n || g(o), s = 0; null != (r = a[s]); s++) x(r, n[s]);
                else x(t, o);
            return n = g(o, "script"), n.length > 0 && w(n, !l && g(t, "script")), n = a = r = null, o
        },
        buildFragment: function(t, e, i, n) {
            for (var r, o, s, a, l, c, u, d = t.length, h = m(e), f = [], p = 0; d > p; p++)
                if (o = t[p], o || 0 === o)
                    if ("object" === rt.type(o)) rt.merge(f, o.nodeType ? [o] : o);
                    else if (qt.test(o)) {
                for (a = a || h.appendChild(e.createElement("div")), l = (Ht.exec(o) || ["", ""])[1].toLowerCase(), u = Qt[l] || Qt._default, a.innerHTML = u[1] + o.replace(zt, "<$1></$2>") + u[2], r = u[0]; r--;) a = a.lastChild;
                if (!it.leadingWhitespace && $t.test(o) && f.push(e.createTextNode($t.exec(o)[0])), !it.tbody)
                    for (o = "table" !== l || Bt.test(o) ? "<table>" !== u[1] || Bt.test(o) ? 0 : a : a.firstChild, r = o && o.childNodes.length; r--;) rt.nodeName(c = o.childNodes[r], "tbody") && !c.childNodes.length && o.removeChild(c);
                for (rt.merge(f, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                a = h.lastChild
            } else f.push(e.createTextNode(o));
            for (a && h.removeChild(a), it.appendChecked || rt.grep(g(f, "input"), v), p = 0; o = f[p++];)
                if ((!n || -1 === rt.inArray(o, n)) && (s = rt.contains(o.ownerDocument, o), a = g(h.appendChild(o), "script"), s && w(a), i))
                    for (r = 0; o = a[r++];) Ut.test(o.type || "") && i.push(o);
            return a = null, h
        },
        cleanData: function(t, e) {
            for (var i, n, r, o, s = 0, a = rt.expando, l = rt.cache, c = it.deleteExpando, u = rt.event.special; null != (i = t[s]); s++)
                if ((e || rt.acceptData(i)) && (r = i[a], o = r && l[r])) {
                    if (o.events)
                        for (n in o.events) u[n] ? rt.event.remove(i, n) : rt.removeEvent(i, n, o.handle);
                    l[r] && (delete l[r], c ? delete i[a] : typeof i.removeAttribute !== Tt ? i.removeAttribute(a) : i[a] = null, Y.push(r))
                }
        }
    }), rt.fn.extend({
        text: function(t) {
            return Et(this, function(t) {
                return void 0 === t ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || pt).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.appendChild(t)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function(t, e) {
            for (var i, n = t ? rt.filter(t, this) : this, r = 0; null != (i = n[r]); r++) e || 1 !== i.nodeType || rt.cleanData(g(i)), i.parentNode && (e && rt.contains(i.ownerDocument, i) && w(g(i, "script")), i.parentNode.removeChild(i));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && rt.cleanData(g(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && rt.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function(t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                return rt.clone(this, t, e)
            })
        },
        html: function(t) {
            return Et(this, function(t) {
                var e = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(Lt, "") : void 0;
                if ("string" == typeof t && !Wt.test(t) && (it.htmlSerialize || !Mt.test(t)) && (it.leadingWhitespace || !$t.test(t)) && !Qt[(Ht.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = t.replace(zt, "<$1></$2>");
                    try {
                        for (; n > i; i++) e = this[i] || {}, 1 === e.nodeType && (rt.cleanData(g(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (r) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, rt.cleanData(g(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, e) {
            t = G.apply([], t);
            var i, n, r, o, s, a, l = 0,
                c = this.length,
                u = this,
                d = c - 1,
                h = t[0],
                f = rt.isFunction(h);
            if (f || c > 1 && "string" == typeof h && !it.checkClone && Xt.test(h)) return this.each(function(i) {
                var n = u.eq(i);
                f && (t[0] = h.call(this, i, n.html())), n.domManip(t, e)
            });
            if (c && (a = rt.buildFragment(t, this[0].ownerDocument, !1, this), i = a.firstChild, 1 === a.childNodes.length && (a = i), i)) {
                for (o = rt.map(g(a, "script"), _), r = o.length; c > l; l++) n = a, l !== d && (n = rt.clone(n, !0, !0), r && rt.merge(o, g(n, "script"))), e.call(this[l], n, l);
                if (r)
                    for (s = o[o.length - 1].ownerDocument, rt.map(o, b), l = 0; r > l; l++) n = o[l], Ut.test(n.type || "") && !rt._data(n, "globalEval") && rt.contains(s, n) && (n.src ? rt._evalUrl && rt._evalUrl(n.src) : rt.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Yt, "")));
                a = i = null
            }
            return this
        }
    }), rt.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        rt.fn[t] = function(t) {
            for (var i, n = 0, r = [], o = rt(t), s = o.length - 1; s >= n; n++) i = n === s ? this : this.clone(!0), rt(o[n])[e](i), Z.apply(r, i.get());
            return this.pushStack(r)
        }
    });
    var Jt, Kt = {};
    ! function() {
        var t;
        it.shrinkWrapBlocks = function() {
            if (null != t) return t;
            t = !1;
            var e, i, n;
            return i = pt.getElementsByTagName("body")[0], i && i.style ? (e = pt.createElement("div"), n = pt.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== Tt && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(pt.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), i.removeChild(n), t) : void 0
        }
    }();
    var te, ee, ie = /^margin/,
        ne = new RegExp("^(" + Ct + ")(?!px)[a-z%]+$", "i"),
        re = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (te = function(t) {
            return t.ownerDocument.defaultView.getComputedStyle(t, null)
        }, ee = function(t, e, i) {
            var n, r, o, s, a = t.style;
            return i = i || te(t), s = i ? i.getPropertyValue(e) || i[e] : void 0, i && ("" !== s || rt.contains(t.ownerDocument, t) || (s = rt.style(t, e)), ne.test(s) && ie.test(e) && (n = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = i.width, a.width = n, a.minWidth = r, a.maxWidth = o)), void 0 === s ? s : s + ""
        }) : pt.documentElement.currentStyle && (te = function(t) {
            return t.currentStyle
        }, ee = function(t, e, i) {
            var n, r, o, s, a = t.style;
            return i = i || te(t), s = i ? i[e] : void 0, null == s && a && a[e] && (s = a[e]), ne.test(s) && !re.test(e) && (n = a.left, r = t.runtimeStyle, o = r && r.left, o && (r.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : s, s = a.pixelLeft + "px", a.left = n, o && (r.left = o)), void 0 === s ? s : s + "" || "auto"
        }),
        function() {
            function e() {
                var e, i, n, r;
                i = pt.getElementsByTagName("body")[0], i && i.style && (e = pt.createElement("div"), n = pt.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = s = !1, l = !0, t.getComputedStyle && (o = "1%" !== (t.getComputedStyle(e, null) || {}).top, s = "4px" === (t.getComputedStyle(e, null) || {
                    width: "4px"
                }).width, r = e.appendChild(pt.createElement("div")), r.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", r.style.marginRight = r.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(r, null) || {}).marginRight)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = e.getElementsByTagName("td"), r[0].style.cssText = "margin:0;border:0;padding:0;display:none", a = 0 === r[0].offsetHeight, a && (r[0].style.display = "", r[1].style.display = "none", a = 0 === r[0].offsetHeight), i.removeChild(n))
            }
            var i, n, r, o, s, a, l;
            i = pt.createElement("div"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = i.getElementsByTagName("a")[0], n = r && r.style, n && (n.cssText = "float:left;opacity:.5", it.opacity = "0.5" === n.opacity, it.cssFloat = !!n.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", it.clearCloneStyle = "content-box" === i.style.backgroundClip, it.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, rt.extend(it, {
                reliableHiddenOffsets: function() {
                    return null == a && e(), a
                },
                boxSizingReliable: function() {
                    return null == s && e(), s
                },
                pixelPosition: function() {
                    return null == o && e(), o
                },
                reliableMarginRight: function() {
                    return null == l && e(), l
                }
            }))
        }(), rt.swap = function(t, e, i, n) {
            var r, o, s = {};
            for (o in e) s[o] = t.style[o], t.style[o] = e[o];
            r = i.apply(t, n || []);
            for (o in e) t.style[o] = s[o];
            return r
        };
    var oe = /alpha\([^)]*\)/i,
        se = /opacity\s*=\s*([^)]*)/,
        ae = /^(none|table(?!-c[ea]).+)/,
        le = new RegExp("^(" + Ct + ")(.*)$", "i"),
        ce = new RegExp("^([+-])=(" + Ct + ")", "i"),
        ue = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        de = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        he = ["Webkit", "O", "Moz", "ms"];
    rt.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var i = ee(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": it.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var r, o, s, a = rt.camelCase(e),
                    l = t.style;
                if (e = rt.cssProps[a] || (rt.cssProps[a] = A(l, a)), s = rt.cssHooks[e] || rt.cssHooks[a], void 0 === i) return s && "get" in s && void 0 !== (r = s.get(t, !1, n)) ? r : l[e];
                if (o = typeof i, "string" === o && (r = ce.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(rt.css(t, e)), o = "number"), null != i && i === i && ("number" !== o || rt.cssNumber[a] || (i += "px"), it.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(s && "set" in s && void 0 === (i = s.set(t, i, n))))) try {
                    l[e] = i
                } catch (c) {}
            }
        },
        css: function(t, e, i, n) {
            var r, o, s, a = rt.camelCase(e);
            return e = rt.cssProps[a] || (rt.cssProps[a] = A(t.style, a)), s = rt.cssHooks[e] || rt.cssHooks[a], s && "get" in s && (o = s.get(t, !0, i)), void 0 === o && (o = ee(t, e, n)), "normal" === o && e in de && (o = de[e]), "" === i || i ? (r = parseFloat(o), i === !0 || rt.isNumeric(r) ? r || 0 : o) : o
        }
    }), rt.each(["height", "width"], function(t, e) {
        rt.cssHooks[e] = {
            get: function(t, i, n) {
                return i ? ae.test(rt.css(t, "display")) && 0 === t.offsetWidth ? rt.swap(t, ue, function() {
                    return R(t, e, n)
                }) : R(t, e, n) : void 0
            },
            set: function(t, i, n) {
                var r = n && te(t);
                return E(t, i, n ? O(t, e, n, it.boxSizing && "border-box" === rt.css(t, "boxSizing", !1, r), r) : 0)
            }
        }
    }), it.opacity || (rt.cssHooks.opacity = {
        get: function(t, e) {
            return se.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var i = t.style,
                n = t.currentStyle,
                r = rt.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                o = n && n.filter || i.filter || "";
            i.zoom = 1, (e >= 1 || "" === e) && "" === rt.trim(o.replace(oe, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = oe.test(o) ? o.replace(oe, r) : o + " " + r)
        }
    }), rt.cssHooks.marginRight = C(it.reliableMarginRight, function(t, e) {
        return e ? rt.swap(t, {
            display: "inline-block"
        }, ee, [t, "marginRight"]) : void 0
    }), rt.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        rt.cssHooks[t + e] = {
            expand: function(i) {
                for (var n = 0, r = {}, o = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) r[t + At[n] + e] = o[n] || o[n - 2] || o[0];
                return r
            }
        }, ie.test(t) || (rt.cssHooks[t + e].set = E)
    }), rt.fn.extend({
        css: function(t, e) {
            return Et(this, function(t, e, i) {
                var n, r, o = {},
                    s = 0;
                if (rt.isArray(e)) {
                    for (n = te(t), r = e.length; r > s; s++) o[e[s]] = rt.css(t, e[s], !1, n);
                    return o
                }
                return void 0 !== i ? rt.style(t, e, i) : rt.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function() {
            return P(this, !0)
        },
        hide: function() {
            return P(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                Pt(this) ? rt(this).show() : rt(this).hide()
            })
        }
    }), rt.Tween = I, I.prototype = {
        constructor: I,
        init: function(t, e, i, n, r, o) {
            this.elem = t, this.prop = i, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = o || (rt.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var t = I.propHooks[this.prop];
            return t && t.get ? t.get(this) : I.propHooks._default.get(this)
        },
        run: function(t) {
            var e, i = I.propHooks[this.prop];
            return this.options.duration ? this.pos = e = rt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : I.propHooks._default.set(this), this
        }
    }, I.prototype.init.prototype = I.prototype, I.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = rt.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function(t) {
                rt.fx.step[t.prop] ? rt.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[rt.cssProps[t.prop]] || rt.cssHooks[t.prop]) ? rt.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, rt.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, rt.fx = I.prototype.init, rt.fx.step = {};
    var fe, pe, me = /^(?:toggle|show|hide)$/,
        ge = new RegExp("^(?:([+-])=|)(" + Ct + ")([a-z%]*)$", "i"),
        ve = /queueHooks$/,
        ye = [F],
        _e = {
            "*": [function(t, e) {
                var i = this.createTween(t, e),
                    n = i.cur(),
                    r = ge.exec(e),
                    o = r && r[3] || (rt.cssNumber[t] ? "" : "px"),
                    s = (rt.cssNumber[t] || "px" !== o && +n) && ge.exec(rt.css(i.elem, t)),
                    a = 1,
                    l = 20;
                if (s && s[3] !== o) {
                    o = o || s[3], r = r || [], s = +n || 1;
                    do a = a || ".5", s /= a, rt.style(i.elem, t, s + o); while (a !== (a = i.cur() / n) && 1 !== a && --l)
                }
                return r && (s = i.start = +s || +n || 0, i.unit = o, i.end = r[1] ? s + (r[1] + 1) * r[2] : +r[2]), i
            }]
        };
    rt.Animation = rt.extend(M, {
            tweener: function(t, e) {
                rt.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var i, n = 0, r = t.length; r > n; n++) i = t[n], _e[i] = _e[i] || [], _e[i].unshift(e)
            },
            prefilter: function(t, e) {
                e ? ye.unshift(t) : ye.push(t)
            }
        }), rt.speed = function(t, e, i) {
            var n = t && "object" == typeof t ? rt.extend({}, t) : {
                complete: i || !i && e || rt.isFunction(t) && t,
                duration: t,
                easing: i && e || e && !rt.isFunction(e) && e
            };
            return n.duration = rt.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in rt.fx.speeds ? rt.fx.speeds[n.duration] : rt.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                rt.isFunction(n.old) && n.old.call(this), n.queue && rt.dequeue(this, n.queue)
            }, n
        }, rt.fn.extend({
            fadeTo: function(t, e, i, n) {
                return this.filter(Pt).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, i, n)
            },
            animate: function(t, e, i, n) {
                var r = rt.isEmptyObject(t),
                    o = rt.speed(e, i, n),
                    s = function() {
                        var e = M(this, rt.extend({}, t), o);
                        (r || rt._data(this, "finish")) && e.stop(!0)
                    };
                return s.finish = s, r || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
            },
            stop: function(t, e, i) {
                var n = function(t) {
                    var e = t.stop;
                    delete t.stop, e(i)
                };
                return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        r = null != t && t + "queueHooks",
                        o = rt.timers,
                        s = rt._data(this);
                    if (r) s[r] && s[r].stop && n(s[r]);
                    else
                        for (r in s) s[r] && s[r].stop && ve.test(r) && n(s[r]);
                    for (r = o.length; r--;) o[r].elem !== this || null != t && o[r].queue !== t || (o[r].anim.stop(i), e = !1, o.splice(r, 1));
                    (e || !i) && rt.dequeue(this, t)
                })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"), this.each(function() {
                    var e, i = rt._data(this),
                        n = i[t + "queue"],
                        r = i[t + "queueHooks"],
                        o = rt.timers,
                        s = n ? n.length : 0;
                    for (i.finish = !0, rt.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                    for (e = 0; s > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete i.finish
                })
            }
        }), rt.each(["toggle", "show", "hide"], function(t, e) {
            var i = rt.fn[e];
            rt.fn[e] = function(t, n, r) {
                return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(N(e, !0), t, n, r)
            }
        }), rt.each({
            slideDown: N("show"),
            slideUp: N("hide"),
            slideToggle: N("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            rt.fn[t] = function(t, i, n) {
                return this.animate(e, t, i, n)
            }
        }), rt.timers = [], rt.fx.tick = function() {
            var t, e = rt.timers,
                i = 0;
            for (fe = rt.now(); i < e.length; i++) t = e[i], t() || e[i] !== t || e.splice(i--, 1);
            e.length || rt.fx.stop(), fe = void 0
        }, rt.fx.timer = function(t) {
            rt.timers.push(t), t() ? rt.fx.start() : rt.timers.pop()
        }, rt.fx.interval = 13, rt.fx.start = function() {
            pe || (pe = setInterval(rt.fx.tick, rt.fx.interval))
        }, rt.fx.stop = function() {
            clearInterval(pe), pe = null
        }, rt.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, rt.fn.delay = function(t, e) {
            return t = rt.fx ? rt.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                var n = setTimeout(e, t);
                i.stop = function() {
                    clearTimeout(n)
                }
            })
        },
        function() {
            var t, e, i, n, r;
            e = pt.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = e.getElementsByTagName("a")[0], i = pt.createElement("select"), r = i.appendChild(pt.createElement("option")), t = e.getElementsByTagName("input")[0], n.style.cssText = "top:1px", it.getSetAttribute = "t" !== e.className, it.style = /top/.test(n.getAttribute("style")), it.hrefNormalized = "/a" === n.getAttribute("href"), it.checkOn = !!t.value, it.optSelected = r.selected, it.enctype = !!pt.createElement("form").enctype, i.disabled = !0, it.optDisabled = !r.disabled, t = pt.createElement("input"), t.setAttribute("value", ""), it.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), it.radioValue = "t" === t.value
        }();
    var be = /\r/g;
    rt.fn.extend({
        val: function(t) {
            var e, i, n, r = this[0]; {
                if (arguments.length) return n = rt.isFunction(t), this.each(function(i) {
                    var r;
                    1 === this.nodeType && (r = n ? t.call(this, i, rt(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : rt.isArray(r) && (r = rt.map(r, function(t) {
                        return null == t ? "" : t + ""
                    })), e = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
                });
                if (r) return e = rt.valHooks[r.type] || rt.valHooks[r.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(r, "value")) ? i : (i = r.value, "string" == typeof i ? i.replace(be, "") : null == i ? "" : i)
            }
        }
    }), rt.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = rt.find.attr(t, "value");
                    return null != e ? e : rt.trim(rt.text(t))
                }
            },
            select: {
                get: function(t) {
                    for (var e, i, n = t.options, r = t.selectedIndex, o = "select-one" === t.type || 0 > r, s = o ? null : [], a = o ? r + 1 : n.length, l = 0 > r ? a : o ? r : 0; a > l; l++)
                        if (i = n[l], (i.selected || l === r) && (it.optDisabled ? !i.disabled : null === i.getAttribute("disabled")) && (!i.parentNode.disabled || !rt.nodeName(i.parentNode, "optgroup"))) {
                            if (e = rt(i).val(), o) return e;
                            s.push(e)
                        }
                    return s
                },
                set: function(t, e) {
                    for (var i, n, r = t.options, o = rt.makeArray(e), s = r.length; s--;)
                        if (n = r[s], rt.inArray(rt.valHooks.option.get(n), o) >= 0) try {
                            n.selected = i = !0
                        } catch (a) {
                            n.scrollHeight
                        } else n.selected = !1;
                    return i || (t.selectedIndex = -1), r
                }
            }
        }
    }), rt.each(["radio", "checkbox"], function() {
        rt.valHooks[this] = {
            set: function(t, e) {
                return rt.isArray(e) ? t.checked = rt.inArray(rt(t).val(), e) >= 0 : void 0
            }
        }, it.checkOn || (rt.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var we, xe, Te = rt.expr.attrHandle,
        Se = /^(?:checked|selected)$/i,
        ke = it.getSetAttribute,
        Ce = it.input;
    rt.fn.extend({
        attr: function(t, e) {
            return Et(this, rt.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                rt.removeAttr(this, t)
            })
        }
    }), rt.extend({
        attr: function(t, e, i) {
            var n, r, o = t.nodeType;
            if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === Tt ? rt.prop(t, e, i) : (1 === o && rt.isXMLDoc(t) || (e = e.toLowerCase(), n = rt.attrHooks[e] || (rt.expr.match.bool.test(e) ? xe : we)), void 0 === i ? n && "get" in n && null !== (r = n.get(t, e)) ? r : (r = rt.find.attr(t, e), null == r ? void 0 : r) : null !== i ? n && "set" in n && void 0 !== (r = n.set(t, i, e)) ? r : (t.setAttribute(e, i + ""), i) : void rt.removeAttr(t, e))
        },
        removeAttr: function(t, e) {
            var i, n, r = 0,
                o = e && e.match(_t);
            if (o && 1 === t.nodeType)
                for (; i = o[r++];) n = rt.propFix[i] || i, rt.expr.match.bool.test(i) ? Ce && ke || !Se.test(i) ? t[n] = !1 : t[rt.camelCase("default-" + i)] = t[n] = !1 : rt.attr(t, i, ""), t.removeAttribute(ke ? i : n)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!it.radioValue && "radio" === e && rt.nodeName(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e), i && (t.value = i), e
                    }
                }
            }
        }
    }), xe = {
        set: function(t, e, i) {
            return e === !1 ? rt.removeAttr(t, i) : Ce && ke || !Se.test(i) ? t.setAttribute(!ke && rt.propFix[i] || i, i) : t[rt.camelCase("default-" + i)] = t[i] = !0, i
        }
    }, rt.each(rt.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var i = Te[e] || rt.find.attr;
        Te[e] = Ce && ke || !Se.test(e) ? function(t, e, n) {
            var r, o;
            return n || (o = Te[e], Te[e] = r, r = null != i(t, e, n) ? e.toLowerCase() : null, Te[e] = o), r
        } : function(t, e, i) {
            return i ? void 0 : t[rt.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), Ce && ke || (rt.attrHooks.value = {
        set: function(t, e, i) {
            return rt.nodeName(t, "input") ? void(t.defaultValue = e) : we && we.set(t, e, i)
        }
    }), ke || (we = {
        set: function(t, e, i) {
            var n = t.getAttributeNode(i);
            return n || t.setAttributeNode(n = t.ownerDocument.createAttribute(i)), n.value = e += "", "value" === i || e === t.getAttribute(i) ? e : void 0
        }
    }, Te.id = Te.name = Te.coords = function(t, e, i) {
        var n;
        return i ? void 0 : (n = t.getAttributeNode(e)) && "" !== n.value ? n.value : null
    }, rt.valHooks.button = {
        get: function(t, e) {
            var i = t.getAttributeNode(e);
            return i && i.specified ? i.value : void 0
        },
        set: we.set
    }, rt.attrHooks.contenteditable = {
        set: function(t, e, i) {
            we.set(t, "" === e ? !1 : e, i)
        }
    }, rt.each(["width", "height"], function(t, e) {
        rt.attrHooks[e] = {
            set: function(t, i) {
                return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
            }
        }
    })), it.style || (rt.attrHooks.style = {
        get: function(t) {
            return t.style.cssText || void 0
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    });
    var Ae = /^(?:input|select|textarea|button|object)$/i,
        Pe = /^(?:a|area)$/i;
    rt.fn.extend({
        prop: function(t, e) {
            return Et(this, rt.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = rt.propFix[t] || t, this.each(function() {
                try {
                    this[t] = void 0, delete this[t]
                } catch (e) {}
            })
        }
    }), rt.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(t, e, i) {
            var n, r, o, s = t.nodeType;
            if (t && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !rt.isXMLDoc(t), o && (e = rt.propFix[e] || e, r = rt.propHooks[e]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(t, i, e)) ? n : t[e] = i : r && "get" in r && null !== (n = r.get(t, e)) ? n : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = rt.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Ae.test(t.nodeName) || Pe.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), it.hrefNormalized || rt.each(["href", "src"], function(t, e) {
        rt.propHooks[e] = {
            get: function(t) {
                return t.getAttribute(e, 4)
            }
        }
    }), it.optSelected || (rt.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), rt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        rt.propFix[this.toLowerCase()] = this
    }), it.enctype || (rt.propFix.enctype = "encoding");
    var Ee = /[\t\r\n\f]/g;
    rt.fn.extend({
        addClass: function(t) {
            var e, i, n, r, o, s, a = 0,
                l = this.length,
                c = "string" == typeof t && t;
            if (rt.isFunction(t)) return this.each(function(e) {
                rt(this).addClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(_t) || []; l > a; a++)
                    if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ee, " ") : " ")) {
                        for (o = 0; r = e[o++];) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                        s = rt.trim(n), i.className !== s && (i.className = s)
                    }
            return this
        },
        removeClass: function(t) {
            var e, i, n, r, o, s, a = 0,
                l = this.length,
                c = 0 === arguments.length || "string" == typeof t && t;
            if (rt.isFunction(t)) return this.each(function(e) {
                rt(this).removeClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(_t) || []; l > a; a++)
                    if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ee, " ") : "")) {
                        for (o = 0; r = e[o++];)
                            for (; n.indexOf(" " + r + " ") >= 0;) n = n.replace(" " + r + " ", " ");
                        s = t ? rt.trim(n) : "", i.className !== s && (i.className = s)
                    }
            return this
        },
        toggleClass: function(t, e) {
            var i = typeof t;
            return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : rt.isFunction(t) ? this.each(function(i) {
                rt(this).toggleClass(t.call(this, i, this.className, e), e)
            }) : this.each(function() {
                if ("string" === i)
                    for (var e, n = 0, r = rt(this), o = t.match(_t) || []; e = o[n++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                else(i === Tt || "boolean" === i) && (this.className && rt._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : rt._data(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Ee, " ").indexOf(e) >= 0) return !0;
            return !1
        }
    }), rt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        rt.fn[e] = function(t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
        }
    }), rt.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function(t, e, i) {
            return this.on(t, null, e, i)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, i, n) {
            return this.on(e, t, i, n)
        },
        undelegate: function(t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    });
    var Oe = rt.now(),
        Re = /\?/,
        Ie = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    rt.parseJSON = function(e) {
        if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
        var i, n = null,
            r = rt.trim(e + "");
        return r && !rt.trim(r.replace(Ie, function(t, e, r, o) {
            return i && e && (n = 0), 0 === n ? t : (i = r || e, n += !o - !r, "")
        })) ? Function("return " + r)() : rt.error("Invalid JSON: " + e)
    }, rt.parseXML = function(e) {
        var i, n;
        if (!e || "string" != typeof e) return null;
        try {
            t.DOMParser ? (n = new DOMParser, i = n.parseFromString(e, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e))
        } catch (r) {
            i = void 0
        }
        return i && i.documentElement && !i.getElementsByTagName("parsererror").length || rt.error("Invalid XML: " + e), i
    };
    var De, Ne, je = /#.*$/,
        Fe = /([?&])_=[^&]*/,
        Le = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Me = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        $e = /^(?:GET|HEAD)$/,
        ze = /^\/\//,
        He = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Be = {},
        qe = {},
        We = "*/".concat("*");
    try {
        Ne = location.href
    } catch (Xe) {
        Ne = pt.createElement("a"), Ne.href = "", Ne = Ne.href
    }
    De = He.exec(Ne.toLowerCase()) || [], rt.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ne,
            type: "GET",
            isLocal: Me.test(De[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": We,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": rt.parseJSON,
                "text xml": rt.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? H(H(t, rt.ajaxSettings), e) : H(rt.ajaxSettings, t)
        },
        ajaxPrefilter: $(Be),
        ajaxTransport: $(qe),
        ajax: function(t, e) {
            function i(t, e, i, n) {
                var r, u, v, y, b, x = e;
                2 !== _ && (_ = 2, a && clearTimeout(a), c = void 0, s = n || "", w.readyState = t > 0 ? 4 : 0, r = t >= 200 && 300 > t || 304 === t, i && (y = B(d, w, i)), y = q(d, y, w, r), r ? (d.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (rt.lastModified[o] = b), b = w.getResponseHeader("etag"), b && (rt.etag[o] = b)), 204 === t || "HEAD" === d.type ? x = "nocontent" : 304 === t ? x = "notmodified" : (x = y.state, u = y.data, v = y.error, r = !v)) : (v = x, (t || !x) && (x = "error", 0 > t && (t = 0))), w.status = t, w.statusText = (e || x) + "", r ? p.resolveWith(h, [u, x, w]) : p.rejectWith(h, [w, x, v]), w.statusCode(g), g = void 0, l && f.trigger(r ? "ajaxSuccess" : "ajaxError", [w, d, r ? u : v]), m.fireWith(h, [w, x]), l && (f.trigger("ajaxComplete", [w, d]), --rt.active || rt.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var n, r, o, s, a, l, c, u, d = rt.ajaxSetup({}, e),
                h = d.context || d,
                f = d.context && (h.nodeType || h.jquery) ? rt(h) : rt.event,
                p = rt.Deferred(),
                m = rt.Callbacks("once memory"),
                g = d.statusCode || {},
                v = {},
                y = {},
                _ = 0,
                b = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === _) {
                            if (!u)
                                for (u = {}; e = Le.exec(s);) u[e[1].toLowerCase()] = e[2];
                            e = u[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === _ ? s : null
                    },
                    setRequestHeader: function(t, e) {
                        var i = t.toLowerCase();
                        return _ || (t = y[i] = y[i] || t, v[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return _ || (d.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (2 > _)
                                for (e in t) g[e] = [g[e], t[e]];
                            else w.always(t[w.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || b;
                        return c && c.abort(e), i(0, e), this
                    }
                };
            if (p.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, d.url = ((t || d.url || Ne) + "").replace(je, "").replace(ze, De[1] + "//"), d.type = e.method || e.type || d.method || d.type, d.dataTypes = rt.trim(d.dataType || "*").toLowerCase().match(_t) || [""], null == d.crossDomain && (n = He.exec(d.url.toLowerCase()), d.crossDomain = !(!n || n[1] === De[1] && n[2] === De[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (De[3] || ("http:" === De[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = rt.param(d.data, d.traditional)), z(Be, d, e, w), 2 === _) return w;
            l = d.global, l && 0 === rt.active++ && rt.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !$e.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (Re.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Fe.test(o) ? o.replace(Fe, "$1_=" + Oe++) : o + (Re.test(o) ? "&" : "?") + "_=" + Oe++)), d.ifModified && (rt.lastModified[o] && w.setRequestHeader("If-Modified-Since", rt.lastModified[o]), rt.etag[o] && w.setRequestHeader("If-None-Match", rt.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || e.contentType) && w.setRequestHeader("Content-Type", d.contentType), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + We + "; q=0.01" : "") : d.accepts["*"]);
            for (r in d.headers) w.setRequestHeader(r, d.headers[r]);
            if (d.beforeSend && (d.beforeSend.call(h, w, d) === !1 || 2 === _)) return w.abort();
            b = "abort";
            for (r in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[r](d[r]);
            if (c = z(qe, d, e, w)) {
                w.readyState = 1, l && f.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (a = setTimeout(function() {
                    w.abort("timeout")
                }, d.timeout));
                try {
                    _ = 1, c.send(v, i)
                } catch (x) {
                    if (!(2 > _)) throw x;
                    i(-1, x)
                }
            } else i(-1, "No Transport");
            return w
        },
        getJSON: function(t, e, i) {
            return rt.get(t, e, i, "json")
        },
        getScript: function(t, e) {
            return rt.get(t, void 0, e, "script")
        }
    }), rt.each(["get", "post"], function(t, e) {
        rt[e] = function(t, i, n, r) {
            return rt.isFunction(i) && (r = r || n, n = i, i = void 0), rt.ajax({
                url: t,
                type: e,
                dataType: r,
                data: i,
                success: n
            })
        }
    }), rt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        rt.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), rt._evalUrl = function(t) {
        return rt.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, rt.fn.extend({
        wrapAll: function(t) {
            if (rt.isFunction(t)) return this.each(function(e) {
                rt(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = rt(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            return rt.isFunction(t) ? this.each(function(e) {
                rt(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = rt(this),
                    i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = rt.isFunction(t);
            return this.each(function(i) {
                rt(this).wrapAll(e ? t.call(this, i) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                rt.nodeName(this, "body") || rt(this).replaceWith(this.childNodes)
            }).end()
        }
    }), rt.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !it.reliableHiddenOffsets() && "none" === (t.style && t.style.display || rt.css(t, "display"))
    }, rt.expr.filters.visible = function(t) {
        return !rt.expr.filters.hidden(t)
    };
    var Ue = /%20/g,
        Ve = /\[\]$/,
        Ye = /\r?\n/g,
        Qe = /^(?:submit|button|image|reset|file)$/i,
        Ge = /^(?:input|select|textarea|keygen)/i;
    rt.param = function(t, e) {
        var i, n = [],
            r = function(t, e) {
                e = rt.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (void 0 === e && (e = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(t) || t.jquery && !rt.isPlainObject(t)) rt.each(t, function() {
            r(this.name, this.value)
        });
        else
            for (i in t) W(i, t[i], e, r);
        return n.join("&").replace(Ue, "+")
    }, rt.fn.extend({
        serialize: function() {
            return rt.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = rt.prop(this, "elements");
                return t ? rt.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !rt(this).is(":disabled") && Ge.test(this.nodeName) && !Qe.test(t) && (this.checked || !Ot.test(t))
            }).map(function(t, e) {
                var i = rt(this).val();
                return null == i ? null : rt.isArray(i) ? rt.map(i, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Ye, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: i.replace(Ye, "\r\n")
                }
            }).get()
        }
    }), rt.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || U()
    } : X;
    var Ze = 0,
        Je = {},
        Ke = rt.ajaxSettings.xhr();
    t.ActiveXObject && rt(t).on("unload", function() {
        for (var t in Je) Je[t](void 0, !0)
    }), it.cors = !!Ke && "withCredentials" in Ke, Ke = it.ajax = !!Ke, Ke && rt.ajaxTransport(function(t) {
        if (!t.crossDomain || it.cors) {
            var e;
            return {
                send: function(i, n) {
                    var r, o = t.xhr(),
                        s = ++Ze;
                    if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (r in t.xhrFields) o[r] = t.xhrFields[r];
                    t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (r in i) void 0 !== i[r] && o.setRequestHeader(r, i[r] + "");
                    o.send(t.hasContent && t.data || null), e = function(i, r) {
                        var a, l, c;
                        if (e && (r || 4 === o.readyState))
                            if (delete Je[s], e = void 0, o.onreadystatechange = rt.noop, r) 4 !== o.readyState && o.abort();
                            else {
                                c = {}, a = o.status, "string" == typeof o.responseText && (c.text = o.responseText);
                                try {
                                    l = o.statusText
                                } catch (u) {
                                    l = ""
                                }
                                a || !t.isLocal || t.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                            }
                        c && n(a, l, c, o.getAllResponseHeaders())
                    }, t.async ? 4 === o.readyState ? setTimeout(e) : o.onreadystatechange = Je[s] = e : e()
                },
                abort: function() {
                    e && e(void 0, !0)
                }
            }
        }
    }), rt.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(t) {
                return rt.globalEval(t), t
            }
        }
    }), rt.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), rt.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, i = pt.head || rt("head")[0] || pt.documentElement;
            return {
                send: function(n, r) {
                    e = pt.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, i) {
                        (i || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, i || r(200, "success"))
                    }, i.insertBefore(e, i.firstChild)
                },
                abort: function() {
                    e && e.onload(void 0, !0)
                }
            }
        }
    });
    var ti = [],
        ei = /(=)\?(?=&|$)|\?\?/;
    rt.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = ti.pop() || rt.expando + "_" + Oe++;
            return this[t] = !0, t
        }
    }), rt.ajaxPrefilter("json jsonp", function(e, i, n) {
        var r, o, s, a = e.jsonp !== !1 && (ei.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && ei.test(e.data) && "data");
        return a || "jsonp" === e.dataTypes[0] ? (r = e.jsonpCallback = rt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(ei, "$1" + r) : e.jsonp !== !1 && (e.url += (Re.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return s || rt.error(r + " was not called"), s[0]
        }, e.dataTypes[0] = "json", o = t[r], t[r] = function() {
            s = arguments
        }, n.always(function() {
            t[r] = o, e[r] && (e.jsonpCallback = i.jsonpCallback, ti.push(r)), s && rt.isFunction(o) && o(s[0]), s = o = void 0
        }), "script") : void 0
    }), rt.parseHTML = function(t, e, i) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (i = e, e = !1), e = e || pt;
        var n = dt.exec(t),
            r = !i && [];
        return n ? [e.createElement(n[1])] : (n = rt.buildFragment([t], e, r), r && r.length && rt(r).remove(), rt.merge([], n.childNodes))
    };
    var ii = rt.fn.load;
    rt.fn.load = function(t, e, i) {
        if ("string" != typeof t && ii) return ii.apply(this, arguments);
        var n, r, o, s = this,
            a = t.indexOf(" ");
        return a >= 0 && (n = rt.trim(t.slice(a, t.length)), t = t.slice(0, a)), rt.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (o = "POST"), s.length > 0 && rt.ajax({
            url: t,
            type: o,
            dataType: "html",
            data: e
        }).done(function(t) {
            r = arguments, s.html(n ? rt("<div>").append(rt.parseHTML(t)).find(n) : t)
        }).complete(i && function(t, e) {
            s.each(i, r || [t.responseText, e, t])
        }), this
    }, rt.expr.filters.animated = function(t) {
        return rt.grep(rt.timers, function(e) {
            return t === e.elem
        }).length
    };
    var ni = t.document.documentElement;
    rt.offset = {
        setOffset: function(t, e, i) {
            var n, r, o, s, a, l, c, u = rt.css(t, "position"),
                d = rt(t),
                h = {};
            "static" === u && (t.style.position = "relative"), a = d.offset(), o = rt.css(t, "top"), l = rt.css(t, "left"), c = ("absolute" === u || "fixed" === u) && rt.inArray("auto", [o, l]) > -1, c ? (n = d.position(), s = n.top, r = n.left) : (s = parseFloat(o) || 0, r = parseFloat(l) || 0), rt.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (h.top = e.top - a.top + s), null != e.left && (h.left = e.left - a.left + r), "using" in e ? e.using.call(t, h) : d.css(h)
        }
    }, rt.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                rt.offset.setOffset(this, t, e)
            });
            var e, i, n = {
                    top: 0,
                    left: 0
                },
                r = this[0],
                o = r && r.ownerDocument;
            if (o) return e = o.documentElement, rt.contains(e, r) ? (typeof r.getBoundingClientRect !== Tt && (n = r.getBoundingClientRect()), i = V(o), {
                top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : n
        },
        position: function() {
            if (this[0]) {
                var t, e, i = {
                        top: 0,
                        left: 0
                    },
                    n = this[0];
                return "fixed" === rt.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), rt.nodeName(t[0], "html") || (i = t.offset()), i.top += rt.css(t[0], "borderTopWidth", !0), i.left += rt.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - i.top - rt.css(n, "marginTop", !0),
                    left: e.left - i.left - rt.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || ni; t && !rt.nodeName(t, "html") && "static" === rt.css(t, "position");) t = t.offsetParent;
                return t || ni
            })
        }
    }), rt.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var i = /Y/.test(e);
        rt.fn[t] = function(n) {
            return Et(this, function(t, n, r) {
                var o = V(t);
                return void 0 === r ? o ? e in o ? o[e] : o.document.documentElement[n] : t[n] : void(o ? o.scrollTo(i ? rt(o).scrollLeft() : r, i ? r : rt(o).scrollTop()) : t[n] = r)
            }, t, n, arguments.length, null)
        }
    }), rt.each(["top", "left"], function(t, e) {
        rt.cssHooks[e] = C(it.pixelPosition, function(t, i) {
            return i ? (i = ee(t, e), ne.test(i) ? rt(t).position()[e] + "px" : i) : void 0
        })
    }), rt.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        rt.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(i, n) {
            rt.fn[n] = function(n, r) {
                var o = arguments.length && (i || "boolean" != typeof n),
                    s = i || (n === !0 || r === !0 ? "margin" : "border");
                return Et(this, function(e, i, n) {
                    var r;
                    return rt.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === n ? rt.css(e, i, s) : rt.style(e, i, n, s)
                }, e, o ? n : void 0, o, null)
            }
        })
    }), rt.fn.size = function() {
        return this.length
    }, rt.fn.andSelf = rt.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return rt
    });
    var ri = t.jQuery,
        oi = t.$;
    return rt.noConflict = function(e) {
        return t.$ === rt && (t.$ = oi), e && t.jQuery === rt && (t.jQuery = ri), rt
    }, typeof e === Tt && (t.jQuery = t.$ = rt), rt
}),
function(t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var i, n = t(document);
    t.rails = i = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        CSRFProtection: function(e) {
            var i = t('meta[name="csrf-token"]').attr("content");
            i && e.setRequestHeader("X-CSRF-Token", i)
        },
        refreshCSRFTokens: function() {
            var e = t("meta[name=csrf-token]").attr("content"),
                i = t("meta[name=csrf-param]").attr("content");
            t('form input[name="' + i + '"]').val(e)
        },
        fire: function(e, i, n) {
            var r = t.Event(i);
            return e.trigger(r, n), r.result !== !1
        },
        confirm: function(t) {
            return confirm(t)
        },
        ajax: function(e) {
            return t.ajax(e)
        },
        href: function(t) {
            return t[0].href
        },
        handleRemote: function(n) {
            var r, o, s, a, l, c;
            if (i.fire(n, "ajax:before")) {
                if (a = n.data("with-credentials") || null, l = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
                    r = n.attr("method"), o = n.attr("action"), s = n.serializeArray();
                    var u = n.data("ujs:submit-button");
                    u && (s.push(u), n.data("ujs:submit-button", null))
                } else n.is(i.inputChangeSelector) ? (r = n.data("method"), o = n.data("url"), s = n.serialize(), n.data("params") && (s = s + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (r = n.data("method") || "get", o = n.data("url"), s = n.serialize(), n.data("params") && (s = s + "&" + n.data("params"))) : (r = n.data("method"), o = i.href(n), s = n.data("params") || null);
                return c = {
                    type: r || "GET",
                    data: s,
                    dataType: l,
                    beforeSend: function(t, r) {
                        return r.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), i.fire(n, "ajax:beforeSend", [t, r]) ? void n.trigger("ajax:send", t) : !1
                    },
                    success: function(t, e, i) {
                        n.trigger("ajax:success", [t, e, i])
                    },
                    complete: function(t, e) {
                        n.trigger("ajax:complete", [t, e])
                    },
                    error: function(t, e, i) {
                        n.trigger("ajax:error", [t, e, i])
                    },
                    crossDomain: i.isCrossDomain(o)
                }, a && (c.xhrFields = {
                    withCredentials: a
                }), o && (c.url = o), i.ajax(c)
            }
            return !1
        },
        isCrossDomain: function(t) {
            var e = document.createElement("a");
            e.href = location.href;
            var i = document.createElement("a");
            try {
                return i.href = t, i.href = i.href, !((!i.protocol || ":" === i.protocol) && !i.host || e.protocol + "//" + e.host == i.protocol + "//" + i.host)
            } catch (n) {
                return !0
            }
        },
        handleMethod: function(n) {
            var r = i.href(n),
                o = n.data("method"),
                s = n.attr("target"),
                a = t("meta[name=csrf-token]").attr("content"),
                l = t("meta[name=csrf-param]").attr("content"),
                c = t('<form method="post" action="' + r + '"></form>'),
                u = '<input name="_method" value="' + o + '" type="hidden" />';
            l === e || a === e || i.isCrossDomain(r) || (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'), s && c.attr("target", s), c.hide().append(u).appendTo("body"), c.submit()
        },
        formElements: function(e, i) {
            return e.is("form") ? t(e[0].elements).filter(i) : e.find(i)
        },
        disableFormElements: function(e) {
            i.formElements(e, i.disableSelector).each(function() {
                i.disableFormElement(t(this))
            })
        },
        disableFormElement: function(t) {
            var i, n;
            i = t.is("button") ? "html" : "val", n = t.data("disable-with"), t.data("ujs:enable-with", t[i]()), n !== e && t[i](n), t.prop("disabled", !0)
        },
        enableFormElements: function(e) {
            i.formElements(e, i.enableSelector).each(function() {
                i.enableFormElement(t(this))
            })
        },
        enableFormElement: function(t) {
            var e = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
        },
        allowAction: function(t) {
            var e, n = t.data("confirm"),
                r = !1;
            return n ? (i.fire(t, "confirm") && (r = i.confirm(n), e = i.fire(t, "confirm:complete", [r])), r && e) : !0
        },
        blankInputs: function(e, i, n) {
            var r, o, s = t(),
                a = i || "input,textarea",
                l = e.find(a);
            return l.each(function() {
                if (r = t(this), o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : r.val(), !o == !n) {
                    if (r.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length) return !0;
                    s = s.add(r)
                }
            }), s.length ? s : !1
        },
        nonBlankInputs: function(t, e) {
            return i.blankInputs(t, e, !0)
        },
        stopEverything: function(e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function(t) {
            var n = t.data("disable-with");
            t.data("ujs:enable-with", t.html()), n !== e && t.html(n), t.bind("click.railsDisable", function(t) {
                return i.stopEverything(t)
            })
        },
        enableElement: function(t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
        }
    }, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, n) {
        t.crossDomain || i.CSRFProtection(n)
    }), n.delegate(i.linkDisableSelector, "ajax:complete", function() {
        i.enableElement(t(this))
    }), n.delegate(i.buttonDisableSelector, "ajax:complete", function() {
        i.enableFormElement(t(this))
    }), n.delegate(i.linkClickSelector, "click.rails", function(n) {
        var r = t(this),
            o = r.data("method"),
            s = r.data("params"),
            a = n.metaKey || n.ctrlKey;
        if (!i.allowAction(r)) return i.stopEverything(n);
        if (!a && r.is(i.linkDisableSelector) && i.disableElement(r), r.data("remote") !== e) {
            if (a && (!o || "GET" === o) && !s) return !0;
            var l = i.handleRemote(r);
            return l === !1 ? i.enableElement(r) : l.error(function() {
                i.enableElement(r)
            }), !1
        }
        return r.data("method") ? (i.handleMethod(r), !1) : void 0
    }), n.delegate(i.buttonClickSelector, "click.rails", function(e) {
        var n = t(this);
        if (!i.allowAction(n)) return i.stopEverything(e);
        n.is(i.buttonDisableSelector) && i.disableFormElement(n);
        var r = i.handleRemote(n);
        return r === !1 ? i.enableFormElement(n) : r.error(function() {
            i.enableFormElement(n)
        }), !1
    }), n.delegate(i.inputChangeSelector, "change.rails", function(e) {
        var n = t(this);
        return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
    }), n.delegate(i.formSubmitSelector, "submit.rails", function(n) {
        var r, o, s = t(this),
            a = s.data("remote") !== e;
        if (!i.allowAction(s)) return i.stopEverything(n);
        if (s.attr("novalidate") == e && (r = i.blankInputs(s, i.requiredInputSelector), r && i.fire(s, "ajax:aborted:required", [r]))) return i.stopEverything(n);
        if (a) {
            if (o = i.nonBlankInputs(s, i.fileInputSelector)) {
                setTimeout(function() {
                    i.disableFormElements(s)
                }, 13);
                var l = i.fire(s, "ajax:aborted:file", [o]);
                return l || setTimeout(function() {
                    i.enableFormElements(s)
                }, 13), l
            }
            return i.handleRemote(s), !1
        }
        setTimeout(function() {
            i.disableFormElements(s)
        }, 13)
    }), n.delegate(i.formInputClickSelector, "click.rails", function(e) {
        var n = t(this);
        if (!i.allowAction(n)) return i.stopEverything(e);
        var r = n.attr("name"),
            o = r ? {
                name: r,
                value: n.val()
            } : null;
        n.closest("form").data("ujs:submit-button", o)
    }), n.delegate(i.formSubmitSelector, "ajax:send.rails", function(e) {
        this == e.target && i.disableFormElements(t(this))
    }), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function(e) {
        this == e.target && i.enableFormElements(t(this))
    }), t(function() {
        i.refreshCSRFTokens()
    }))
}(jQuery);
var ResponsiveBootstrapToolkit = function(t) {
    var e = {
            detectionDivs: {
                bootstrap: {
                    xs: t('<div class="device-xs visible-xs visible-xs-block"></div>'),
                    sm: t('<div class="device-sm visible-sm visible-sm-block"></div>'),
                    md: t('<div class="device-md visible-md visible-md-block"></div>'),
                    lg: t('<div class="device-lg visible-lg visible-lg-block"></div>')
                },
                foundation: {
                    small: t('<div class="device-xs show-for-small-only"></div>'),
                    medium: t('<div class="device-sm show-for-medium-only"></div>'),
                    large: t('<div class="device-md show-for-large-only"></div>'),
                    xlarge: t('<div class="device-lg show-for-xlarge-only"></div>')
                }
            },
            applyDetectionDivs: function() {
                t(document).ready(function() {
                    t.each(i.breakpoints, function(t) {
                        i.breakpoints[t].appendTo(".responsive-bootstrap-toolkit")
                    })
                })
            },
            isAnExpression: function(t) {
                return "<" == t.charAt(0) || ">" == t.charAt(0)
            },
            splitExpression: function(t) {
                var e = t.charAt(0),
                    i = "=" == t.charAt(1) ? !0 : !1,
                    n = 1 + (i ? 1 : 0),
                    r = t.slice(n);
                return {
                    operator: e,
                    orEqual: i,
                    breakpointName: r
                }
            },
            isAnyActive: function(e) {
                var n = !1;
                return t.each(e, function(t, e) {
                    return i.breakpoints[e].is(":visible") ? (n = !0, !1) : void 0
                }), n
            },
            isMatchingExpression: function(t) {
                var n = e.splitExpression(t),
                    r = Object.keys(i.breakpoints),
                    o = r.indexOf(n.breakpointName);
                if (-1 !== o) {
                    var s = 0,
                        a = 0;
                    "<" == n.operator && (s = 0, a = n.orEqual ? ++o : o), ">" == n.operator && (s = n.orEqual ? o : ++o, a = void 0);
                    var l = r.slice(s, a);
                    return e.isAnyActive(l)
                }
            }
        },
        i = {
            interval: 300,
            framework: null,
            breakpoints: null,
            is: function(t) {
                return e.isAnExpression(t) ? e.isMatchingExpression(t) : i.breakpoints[t] && i.breakpoints[t].is(":visible")
            },
            use: function(t, n) {
                i.framework = t.toLowerCase(), "bootstrap" === i.framework || "foundation" === i.framework ? i.breakpoints = e.detectionDivs[i.framework] : i.breakpoints = n, e.applyDetectionDivs()
            },
            current: function() {
                var e = "unrecognized";
                return t.each(i.breakpoints, function(t) {
                    i.is(t) && (e = t)
                }), e
            },
            changed: function(t, e) {
                var n;
                return function() {
                    clearTimeout(n), n = setTimeout(function() {
                        t()
                    }, e || i.interval)
                }
            }
        };
    return t(document).ready(function() {
        t('<div class="responsive-bootstrap-toolkit"></div>').appendTo("body")
    }), null === i.framework && i.use("bootstrap"), i
}(jQuery);
if ($.fn.wookmark = function(t) {
        this.wookmarkOptions ? t && (this.wookmarkOptions = $.extend(this.wookmarkOptions, t)) : this.wookmarkOptions = $.extend({
            container: $("body"),
            offset: 2,
            autoResize: !1,
            itemWidth: $(this[0]).outerWidth(),
            resizeDelay: 50
        }, t), this.wookmarkColumns || (this.wookmarkColumns = null, this.wookmarkContainerWidth = null), this.wookmarkLayout = function() {
            var t = this.wookmarkOptions.itemWidth + this.wookmarkOptions.offset,
                e = this.wookmarkOptions.container.width(),
                i = Math.floor((e + this.wookmarkOptions.offset) / t),
                n = Math.round((e - (i * t - this.wookmarkOptions.offset)) / 2),
                r = 0;
            r = null != this.wookmarkColumns && this.wookmarkColumns.length == i ? this.wookmarkLayoutColumns(t, n) : this.wookmarkLayoutFull(t, i, n), this.wookmarkOptions.container.css("height", r + "px")
        }, this.wookmarkLayoutFull = function(t, e, i) {
            for (var n = []; n.length < e;) n.push(0);
            for (this.wookmarkColumns = []; this.wookmarkColumns.length < e;) this.wookmarkColumns.push([]);
            for (var r, o = 0, s = 0, a = this.length, l = null, c = null, u = 0; a > o; o++) {
                for (r = $(this[o]), l = null, c = 0, s = 0; e > s; s++)(null == l || n[s] < l) && (l = n[s], c = s);
                r.css({
                    position: "absolute",
                    top: l + "px",
                    left: c * t + i + "px"
                }), n[c] = l + r.outerHeight() + this.wookmarkOptions.offset, u = Math.max(u, n[c]), r.attr("column", c), this.wookmarkColumns[c].push(r)
            }
            return u
        }, this.wookmarkLayoutColumns = function(t, e) {
            for (var i = []; i.length < this.wookmarkColumns.length;) i.push(0);
            for (var n, r, o, s = 0, a = this.wookmarkColumns.length, l = 0, c = 0; a > s; s++) {
                for (n = this.wookmarkColumns[s], r = n.length, l = 0; r > l; l++) o = n[l], o.css({
                    left: s * t + e + "px",
                    top: i[s] + "px"
                }), o.attr("row", l), i[s] += o.outerHeight() + this.wookmarkOptions.offset, c = Math.max(c, i[s]);
                o.attr("column", s)
            }
            return c
        }, this.wookmarkResizeTimer = null, this.wookmarkResizeMethod || (this.wookmarkResizeMethod = null), this.wookmarkOptions.autoResize && (this.wookmarkOnResize = function(t) {
            this.wookmarkResizeTimer && clearTimeout(this.wookmarkResizeTimer), this.wookmarkResizeTimer = setTimeout($.proxy(this.wookmarkLayout, this), this.wookmarkOptions.resizeDelay)
        }, this.wookmarkResizeMethod || (this.wookmarkResizeMethod = $.proxy(this.wookmarkOnResize, this)), $(window).resize(this.wookmarkResizeMethod)), this.wookmarkClear = function() {
            this.wookmarkResizeTimer && (clearTimeout(this.wookmarkResizeTimer), this.wookmarkResizeTimer = null), this.wookmarkResizeMethod && $(window).unbind("resize", this.wookmarkResizeMethod)
        }, this.wookmarkLayout(), this.show()
    }, "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {
                end: e[i]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            n = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0
        });
        var r = function() {
            i || t(n).trigger(t.support.transition.end)
        };
        return setTimeout(r, e), this
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.alert");
            r || i.data("bs.alert", r = new n(this)), "string" == typeof e && r[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]',
        n = function(e) {
            t(e).on("click", i, this.close)
        };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 150, n.prototype.close = function(e) {
        function i() {
            s.detach().trigger("closed.bs.alert").remove()
        }
        var r = t(this),
            o = r.attr("data-target");
        o || (o = r.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t(o);
        e && e.preventDefault(), s.length || (s = r.closest(".alert")), s.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i())
    };
    var r = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function() {
        return t.fn.alert = r, this
    }, t(document).on("click.bs.alert.data-api", i, n.prototype.close)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.button"),
                o = "object" == typeof e && e;
            r || n.data("bs.button", r = new i(this, o)), "toggle" == e ? r.toggle() : e && r.setState(e)
        })
    }
    var i = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.isLoading = !1
    };
    i.VERSION = "3.3.4", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function(e) {
        var i = "disabled",
            n = this.$element,
            r = n.is("input") ? "val" : "html",
            o = n.data();
        e += "Text", null == o.resetText && n.data("resetText", n[r]()), setTimeout(t.proxy(function() {
            n[r](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, n.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, n.removeClass(i).removeAttr(i))
        }, this), 0)
    }, i.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var n = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = n, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var n = t(i.target);
        n.hasClass("btn") || (n = n.closest(".btn")), e.call(n, "toggle"), i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.carousel"),
                o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e),
                s = "string" == typeof e ? e : o.slide;
            r || n.data("bs.carousel", r = new i(this, o)), "number" == typeof e ? r.to(e) : s ? r[s]() : o.interval && r.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
            n = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (n && !this.options.wrap) return e;
        var r = "prev" == t ? -1 : 1,
            o = (i + r) % this.$items.length;
        return this.$items.eq(o)
    }, i.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function(e, n) {
        var r = this.$element.find(".item.active"),
            o = n || this.getItemForDirection(e, r),
            s = this.interval,
            a = "next" == e ? "left" : "right",
            l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var c = o[0],
            u = t.Event("slide.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
        if (this.$element.trigger(u), !u.isDefaultPrevented()) {
            if (this.sliding = !0, s && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var d = t(this.$indicators.children()[this.getItemIndex(o)]);
                d && d.addClass("active")
            }
            var h = t.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, r.addClass(a), o.addClass(a), r.one("bsTransitionEnd", function() {
                o.removeClass([e, a].join(" ")).addClass("active"), r.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(h)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (r.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(h)), s && this.cycle(), this
        }
    };
    var n = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = n, this
    };
    var r = function(i) {
        var n, r = t(this),
            o = t(r.attr("data-target") || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var s = t.extend({}, o.data(), r.data()),
                a = r.attr("data-slide-to");
            a && (s.interval = !1), e.call(o, s), a && o.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i, n = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(n)
    }

    function i(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.collapse"),
                o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
            !r && o.toggle && /show|hide/.test(e) && (o.toggle = !1), r || i.data("bs.collapse", r = new n(this, o)), "string" == typeof e && r[e]()
        })
    }
    var n = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 350, n.DEFAULTS = {
        toggle: !0
    }, n.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, n.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(r && r.length && (e = r.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    r && r.length && (i.call(r, "hide"), e || r.data("bs.collapse", null));
                    var s = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[s](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", s].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[s](this.$element[0][l])
                }
            }
        }
    }, n.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var r = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : r.call(this)
            }
        }
    }, n.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, n.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, n) {
            var r = t(n);
            this.addAriaAndCollapsedClass(e(r), r)
        }, this)).end()
    }, n.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var r = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = r, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(n) {
        var r = t(this);
        r.attr("data-target") || n.preventDefault();
        var o = e(r),
            s = o.data("bs.collapse"),
            a = s ? "toggle" : r.data();
        i.call(o, a)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        e && 3 === e.which || (t(r).remove(), t(o).each(function() {
            var n = t(this),
                r = i(n),
                o = {
                    relatedTarget: this
                };
            r.hasClass("open") && (r.trigger(e = t.Event("hide.bs.dropdown", o)), e.isDefaultPrevented() || (n.attr("aria-expanded", "false"), r.removeClass("open").trigger("hidden.bs.dropdown", o)))
        }))
    }

    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var n = i && t(i);
        return n && n.length ? n : e.parent()
    }

    function n(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.dropdown");
            n || i.data("bs.dropdown", n = new s(this)), "string" == typeof e && n[e].call(i)
        })
    }
    var r = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        s = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    s.VERSION = "3.3.4", s.prototype.toggle = function(n) {
        var r = t(this);
        if (!r.is(".disabled, :disabled")) {
            var o = i(r),
                s = o.hasClass("open");
            if (e(), !s) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var a = {
                    relatedTarget: this
                };
                if (o.trigger(n = t.Event("show.bs.dropdown", a)), n.isDefaultPrevented()) return;
                r.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger("shown.bs.dropdown", a)
            }
            return !1
        }
    }, s.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var n = t(this);
            if (e.preventDefault(), e.stopPropagation(), !n.is(".disabled, :disabled")) {
                var r = i(n),
                    s = r.hasClass("open");
                if (!s && 27 != e.which || s && 27 == e.which) return 27 == e.which && r.find(o).trigger("focus"), n.trigger("click");
                var a = " li:not(.disabled):visible a",
                    l = r.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                if (l.length) {
                    var c = l.index(e.target);
                    38 == e.which && c > 0 && c--, 40 == e.which && c < l.length - 1 && c++, ~c || (c = 0), l.eq(c).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = n, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, s.prototype.toggle).on("keydown.bs.dropdown.data-api", o, s.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', s.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', s.prototype.keydown)
}(jQuery), + function(t) {
    "use strict";

    function e(e, n) {
        return this.each(function() {
            var r = t(this),
                o = r.data("bs.modal"),
                s = t.extend({}, i.DEFAULTS, r.data(), "object" == typeof e && e);
            o || r.data("bs.modal", o = new i(this, s)), "string" == typeof e ? o[e](n) : s.show && o.show(n)
        })
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function(e) {
        var n = this,
            r = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(r), this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            n.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(n.$element) && (n.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var r = t.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(n.$body), n.$element.show().scrollTop(0), n.adjustDialog(), r && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            r ? n.$dialog.one("bsTransitionEnd", function() {
                n.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(o)
        }))
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function(e) {
        var n = this,
            r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && r;
            if (this.$backdrop = t('<div class="modal-backdrop ' + r + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var s = function() {
                n.removeBackdrop(),
                    e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : s()
        } else e && e()
    }, i.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var n = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = n, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var n = t(this),
            r = n.attr("href"),
            o = t(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = o.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(r) && r
            }, o.data(), n.data());
        n.is("a") && i.preventDefault(), o.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                n.is(":visible") && n.trigger("focus")
            })
        }), e.call(o, s, this)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.tooltip"),
                o = "object" == typeof e && e;
            (r || !/destroy|hide/.test(e)) && (r || n.data("bs.tooltip", r = new i(this, o)), "string" == typeof e && r[e]())
        })
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
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
        }
    }, i.prototype.init = function(e, i, n) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var r = this.options.trigger.split(" "), o = r.length; o--;) {
            var s = r[o];
            if ("click" == s) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != s) {
                var a = "hover" == s ? "mouseenter" : "focusin",
                    l = "hover" == s ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, n) {
            i[t] != n && (e[t] = n)
        }), e
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var n = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !n) return;
            var r = this,
                o = this.tip(),
                s = this.getUID(this.type);
            this.setContent(), o.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && o.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                c = l.test(a);
            c && (a = a.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var u = this.getPosition(),
                d = o[0].offsetWidth,
                h = o[0].offsetHeight;
            if (c) {
                var f = a,
                    p = this.options.container ? t(this.options.container) : this.$element.parent(),
                    m = this.getPosition(p);
                a = "bottom" == a && u.bottom + h > m.bottom ? "top" : "top" == a && u.top - h < m.top ? "bottom" : "right" == a && u.right + d > m.width ? "left" : "left" == a && u.left - d < m.left ? "right" : a, o.removeClass(f).addClass(a)
            }
            var g = this.getCalculatedOffset(a, u, d, h);
            this.applyPlacement(g, a);
            var v = function() {
                var t = r.hoverState;
                r.$element.trigger("shown.bs." + r.type), r.hoverState = null, "out" == t && r.leave(r)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v()
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var n = this.tip(),
            r = n[0].offsetWidth,
            o = n[0].offsetHeight,
            s = parseInt(n.css("margin-top"), 10),
            a = parseInt(n.css("margin-left"), 10);
        isNaN(s) && (s = 0), isNaN(a) && (a = 0), e.top = e.top + s, e.left = e.left + a, t.offset.setOffset(n[0], t.extend({
            using: function(t) {
                n.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), n.addClass("in");
        var l = n[0].offsetWidth,
            c = n[0].offsetHeight;
        "top" == i && c != o && (e.top = e.top + o - c);
        var u = this.getViewportAdjustedDelta(i, e, l, c);
        u.left ? e.left += u.left : e.top += u.top;
        var d = /top|bottom/.test(i),
            h = d ? 2 * u.left - r + l : 2 * u.top - o + c,
            f = d ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(h, n[0][f], d)
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function(e) {
        function n() {
            "in" != r.hoverState && o.detach(), r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), e && e()
        }
        var r = this,
            o = t(this.$tip),
            s = t.Event("hide.bs." + this.type);
        return this.$element.trigger(s), s.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function() {
        return this.getTitle()
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0],
            n = "BODY" == i.tagName,
            r = i.getBoundingClientRect();
        null == r.width && (r = t.extend({}, r, {
            width: r.right - r.left,
            height: r.bottom - r.top
        }));
        var o = n ? {
                top: 0,
                left: 0
            } : e.offset(),
            s = {
                scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            a = n ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, r, s, a, o)
    }, i.prototype.getCalculatedOffset = function(t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - n / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, n) {
        var r = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return r;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            s = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - o - s.scroll,
                l = e.top + o - s.scroll + n;
            a < s.top ? r.top = s.top - a : l > s.top + s.height && (r.top = s.top + s.height - l)
        } else {
            var c = e.left - o,
                u = e.left + o + i;
            c < s.left ? r.left = s.left - c : u > s.width && (r.left = s.left + s.width - u)
        }
        return r
    }, i.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function() {
        this.enabled = !0
    }, i.prototype.disable = function() {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = n, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.popover"),
                o = "object" == typeof e && e;
            (r || !/destroy|hide/.test(e)) && (r || n.data("bs.popover", r = new i(this, o)), "string" == typeof e && r[e]())
        })
    }
    var i = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.4", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var n = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = n, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(i, n) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, n), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.scrollspy"),
                o = "object" == typeof i && i;
            r || n.data("bs.scrollspy", r = new e(this, o)), "string" == typeof i && r[i]()
        })
    }
    e.VERSION = "3.3.4", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = this,
            i = "offset",
            n = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", n = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                r = e.data("target") || e.attr("href"),
                o = /^#./.test(r) && t(r);
            return o && o.length && o.is(":visible") && [
                [o[i]().top + n, r]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            n = this.options.offset + i - this.$scrollElement.height(),
            r = this.offsets,
            o = this.targets,
            s = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= n) return s != (t = o[o.length - 1]) && this.activate(t);
        if (s && e < r[0]) return this.activeTarget = null, this.clear();
        for (t = r.length; t--;) s != o[t] && e >= r[t] && (void 0 === r[t + 1] || e < r[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            n = t(i).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var n = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = n, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.tab");
            r || n.data("bs.tab", r = new i(this)), "string" == typeof e && r[e]()
        })
    }
    var i = function(e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            n = e.data("target");
        if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var r = i.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                s = t.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            if (r.trigger(o), e.trigger(s), !s.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var a = t(n);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function() {
                    r.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function(e, n, r) {
        function o() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), r && r()
        }
        var s = n.find("> .active"),
            a = r && t.support.transition && (s.length && s.hasClass("fade") || !!n.find("> .fade").length);
        s.length && a ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), s.removeClass("in")
    };
    var n = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = n, this
    };
    var r = function(i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.affix"),
                o = "object" == typeof e && e;
            r || n.data("bs.affix", r = new i(this, o)), "string" == typeof e && r[e]()
        })
    }
    var i = function(e, n) {
        this.options = t.extend({}, i.DEFAULTS, n), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.4", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function(t, e, i, n) {
        var r = this.$target.scrollTop(),
            o = this.$element.offset(),
            s = this.$target.height();
        if (null != i && "top" == this.affixed) return i > r ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? r + this.unpin <= o.top ? !1 : "bottom" : t - n >= r + s ? !1 : "bottom";
        var a = null == this.affixed,
            l = a ? r : o.top,
            c = a ? s : e;
        return null != i && i >= r ? "top" : null != n && l + c >= t - n ? "bottom" : !1
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                n = this.options.offset,
                r = n.top,
                o = n.bottom,
                s = t(document.body).height();
            "object" != typeof n && (o = r = n), "function" == typeof r && (r = n.top(this.$element)), "function" == typeof o && (o = n.bottom(this.$element));
            var a = this.getState(s, e, r, o);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""),
                    c = t.Event(l + ".bs.affix");
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({
                top: s - e - o
            })
        }
    };
    var n = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = n, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this),
                n = i.data();
            n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), e.call(i, n)
        })
    })
}(jQuery);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e !== n; i.push(t[e++]));
                        return i
                    },
                    r = function(t, e, i) {
                        var n, r, o = t.cycle;
                        for (n in o) r = o[n], t[n] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
                        delete t.cycle
                    },
                    o = function(t, e, n) {
                        i.call(this, t, e, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = o.prototype.render
                    },
                    s = 1e-10,
                    a = i._internals,
                    l = a.isSelector,
                    c = a.isArray,
                    u = o.prototype = i.to({}, .1, {}),
                    d = [];
                o.version = "1.18.2", u.constructor = o, u.kill()._gc = !1, o.killTweensOf = o.killDelayedCallsTo = i.killTweensOf, o.getTweensOf = i.getTweensOf, o.lagSmoothing = i.lagSmoothing, o.ticker = i.ticker, o.render = i.render, u.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                }, u.updateTo = function(t, e) {
                    var n, r = this.ratio,
                        o = this.vars.immediateRender || t.immediateRender;
                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (n in t) this.vars[n] = t[n];
                    if (this._initted || o)
                        if (e) this._initted = !1, o && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var s = this._totalTime;
                        this.render(0, !0, !1), this._initted = !1, this.render(s, !0, !1)
                    } else if (this._initted = !1, this._init(), this._time > 0 || o)
                        for (var a, l = 1 / (1 - r), c = this._firstPT; c;) a = c.s + c.c, c.c *= l, c.s = a - c.c, c = c._next;
                    return this
                }, u.render = function(t, e, i) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var n, r, o, l, c, u, d, h, f = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        m = this._totalTime,
                        g = this._cycle,
                        v = this._duration,
                        y = this._rawPrevTime;
                    if (t >= f - 1e-7 ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > y || 0 >= t && t >= -1e-7 || y === s && "isPause" !== this.data) && y !== t && (i = !0, y > s && (r = "onReverseComplete")), this._rawPrevTime = h = !e || t || y === t ? t : s)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === v && y > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = h = !e || t || y === t ? t : s)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (l = v + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : this._time < 0 && (this._time = 0)), this._easeType ? (c = this._time / v, u = this._easeType, d = this._easePower, (1 === u || 3 === u && c >= .5) && (c = 1 - c), 3 === u && (c *= 2), 1 === d ? c *= c : 2 === d ? c *= c * c : 3 === d ? c *= c * c * c : 4 === d && (c *= c * c * c * c), 1 === u ? this.ratio = 1 - c : 2 === u ? this.ratio = c : this._time / v < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2) : this.ratio = this._ease.getRatio(this._time / v)), p === this._time && !i && g === this._cycle) return void(m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = p, this._totalTime = m, this._rawPrevTime = y, this._cycle = g, a.lazyTweens.push(this), void(this._lazy = [t, e]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / v) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== p && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== m || n) && this._callback("onUpdate")), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === v && this._rawPrevTime === s && h !== s && (this._rawPrevTime = 0))
                }, o.to = function(t, e, i) {
                    return new o(t, e, i)
                }, o.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new o(t, e, i)
                }, o.fromTo = function(t, e, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new o(t, e, n)
                }, o.staggerTo = o.allTo = function(t, e, s, a, u, h, f) {
                    a = a || 0;
                    var p, m, g, v, y = 0,
                        _ = [],
                        b = function() {
                            s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments), u.apply(f || s.callbackScope || this, h || d)
                        },
                        w = s.cycle,
                        x = s.startAt && s.startAt.cycle;
                    for (c(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t))), t = t || [], 0 > a && (t = n(t), t.reverse(), a *= -1), p = t.length - 1, g = 0; p >= g; g++) {
                        m = {};
                        for (v in s) m[v] = s[v];
                        if (w && r(m, t, g), x) {
                            x = m.startAt = {};
                            for (v in s.startAt) x[v] = s.startAt[v];
                            r(m.startAt, t, g)
                        }
                        m.delay = y + (m.delay || 0), g === p && u && (m.onComplete = b), _[g] = new o(t[g], e, m), y += a
                    }
                    return _
                }, o.staggerFrom = o.allFrom = function(t, e, i, n, r, s, a) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, o.staggerTo(t, e, i, n, r, s, a)
                }, o.staggerFromTo = o.allFromTo = function(t, e, i, n, r, s, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, o.staggerTo(t, e, n, r, s, a, l)
                }, o.delayedCall = function(t, e, i, n, r) {
                    return new o(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        useFrames: r,
                        overwrite: 0
                    })
                }, o.set = function(t, e) {
                    return new o(t, 0, e)
                }, o.isTweening = function(t) {
                    return i.getTweensOf(t, !0).length > 0
                };
                var h = function(t, e) {
                        for (var n = [], r = 0, o = t._first; o;) o instanceof i ? n[r++] = o : (e && (n[r++] = o), n = n.concat(h(o, e)), r = n.length), o = o._next;
                        return n
                    },
                    f = o.getAllTweens = function(e) {
                        return h(t._rootTimeline, e).concat(h(t._rootFramesTimeline, e))
                    };
                o.killAll = function(t, i, n, r) {
                    null == i && (i = !0), null == n && (n = !0);
                    var o, s, a, l = f(0 != r),
                        c = l.length,
                        u = i && n && r;
                    for (a = 0; c > a; a++) s = l[a], (u || s instanceof e || (o = s.target === s.vars.onComplete) && n || i && !o) && (t ? s.totalTime(s._reversed ? 0 : s.totalDuration()) : s._enabled(!1, !1))
                }, o.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var r, s, u, d, h, f = a.tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t)), c(t))
                            for (d = t.length; --d > -1;) o.killChildTweensOf(t[d], e);
                        else {
                            r = [];
                            for (u in f)
                                for (s = f[u].target.parentNode; s;) s === t && (r = r.concat(f[u].tweens)), s = s.parentNode;
                            for (h = r.length, d = 0; h > d; d++) e && r[d].totalTime(r[d].totalDuration()), r[d]._enabled(!1, !1)
                        }
                    }
                };
                var p = function(t, i, n, r) {
                    i = i !== !1, n = n !== !1, r = r !== !1;
                    for (var o, s, a = f(r), l = i && n && r, c = a.length; --c > -1;) s = a[c], (l || s instanceof e || (o = s.target === s.vars.onComplete) && n || i && !o) && s.paused(t)
                };
                return o.pauseAll = function(t, e, i) {
                    p(!0, t, e, i)
                }, o.resumeAll = function(t, e, i) {
                    p(!1, t, e, i)
                }, o.globalTimeScale = function(e) {
                    var n = t._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (e = e || s, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
                }, u.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, u.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, u.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, u.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, u.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, u.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, o
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, n, r = this.vars;
                        for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                        l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = 1e-10,
                    o = i._internals,
                    s = n._internals = {},
                    a = o.isSelector,
                    l = o.isArray,
                    c = o.lazyTweens,
                    u = o.lazyRender,
                    d = _gsScope._gsDefine.globals,
                    h = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    f = function(t, e, i) {
                        var n, r, o = t.cycle;
                        for (n in o) r = o[n], t[n] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
                        delete t.cycle
                    },
                    p = s.pauseCallback = function() {},
                    m = function(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e !== n; i.push(t[e++]));
                        return i
                    },
                    g = n.prototype = new e;
                return n.version = "1.18.2", g.constructor = n, g.kill()._gc = g._forcingPlayhead = g._hasPause = !1, g.to = function(t, e, n, r) {
                    var o = n.repeat && d.TweenMax || i;
                    return e ? this.add(new o(t, e, n), r) : this.set(t, n, r)
                }, g.from = function(t, e, n, r) {
                    return this.add((n.repeat && d.TweenMax || i).from(t, e, n), r)
                }, g.fromTo = function(t, e, n, r, o) {
                    var s = r.repeat && d.TweenMax || i;
                    return e ? this.add(s.fromTo(t, e, n, r), o) : this.set(t, r, o)
                }, g.staggerTo = function(t, e, r, o, s, l, c, u) {
                    var d, p, g = new n({
                            onComplete: l,
                            onCompleteParams: c,
                            callbackScope: u,
                            smoothChildTiming: this.smoothChildTiming
                        }),
                        v = r.cycle;
                    for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = m(t)), o = o || 0, 0 > o && (t = m(t), t.reverse(), o *= -1), p = 0; p < t.length; p++) d = h(r), d.startAt && (d.startAt = h(d.startAt), d.startAt.cycle && f(d.startAt, t, p)), v && f(d, t, p), g.to(t[p], e, d, p * o);
                    return this.add(g, s)
                }, g.staggerFrom = function(t, e, i, n, r, o, s, a) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, o, s, a)
                }, g.staggerFromTo = function(t, e, i, n, r, o, s, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, o, s, a, l)
                }, g.call = function(t, e, n, r) {
                    return this.add(i.delayedCall(0, t, e, n), r)
                }, g.set = function(t, e, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
                }, n.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, o, s = new n(t),
                        a = s._timeline;
                    for (null == e && (e = !0), a._remove(s, !0), s._startTime = 0, s._rawPrevTime = s._time = s._totalTime = a._time, r = a._first; r;) o = r._next, e && r instanceof i && r.target === r.vars.onComplete || s.add(r, r._startTime - r._delay), r = o;
                    return a.add(s, 0), s
                }, g.add = function(r, o, s, a) {
                    var c, u, d, h, f, p;
                    if ("number" != typeof o && (o = this._parseTimeOrLabel(o, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array || r && r.push && l(r)) {
                            for (s = s || "normal", a = a || 0, c = o, u = r.length, d = 0; u > d; d++) l(h = r[d]) && (h = new n({
                                tweens: h
                            })), this.add(h, c), "string" != typeof h && "function" != typeof h && ("sequence" === s ? c = h._startTime + h.totalDuration() / h._timeScale : "start" === s && (h._startTime -= h.delay())), c += a;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, o);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, o), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (f = this, p = f.rawTime() > r._startTime; f._timeline;) p && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
                    return this
                }, g.remove = function(e) {
                    if (e instanceof t) {
                        this._remove(e, !1);
                        var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                        return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                    }
                    if (e instanceof Array || e && e.push && l(e)) {
                        for (var n = e.length; --n > -1;) this.remove(e[n]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, g._remove = function(t, i) {
                    e.prototype._remove.call(this, t, i);
                    var n = this._last;
                    return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, g.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, g.insert = g.insertMultiple = function(t, e, i, n) {
                    return this.add(t, e || 0, i, n)
                }, g.appendMultiple = function(t, e, i, n) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
                }, g.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, g.addPause = function(t, e, n, r) {
                    var o = i.delayedCall(0, p, n, r || this);
                    return o.vars.onComplete = o.vars.onReverseComplete = e, o.data = "isPause", this._hasPause = !0, this.add(o, t)
                }, g.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, g.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, g._parseTimeOrLabel = function(e, i, n, r) {
                    var o;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && l(r)))
                        for (o = r.length; --o > -1;) r[o] instanceof t && r[o].timeline === this && this.remove(r[o]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (o = e.indexOf("="), -1 === o) return null == this._labels[e] ? n ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : this.duration()
                    }
                    return Number(e) + i
                }, g.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                }, g.stop = function() {
                    return this.paused(!0)
                }, g.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, g.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, g.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, o, s, a, l, d, h, f = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        m = this._startTime,
                        g = this._timeScale,
                        v = this._paused;
                    if (t >= f - 1e-7) this._totalTime = this._time = f, this._reversed || this._hasPausedChild() || (o = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = f + 1e-4;
                    else if (1e-7 > t)
                        if (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete", o = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = o = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && o)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (o = !1), n = n._next;
                            t = 0, this._initted || (l = !0)
                        } else {
                        if (this._hasPause && !this._forcingPlayhead && !e) {
                            if (t >= p)
                                for (n = this._first; n && n._startTime <= t && !d;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (d = n), n = n._next;
                            else
                                for (n = this._last; n && n._startTime >= t && !d;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (d = n), n = n._prev;
                            d && (this._time = t = d._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = t
                    }
                    if (this._time !== p && this._first || i || l || d) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), h = this._time, h >= p)
                            for (n = this._first; n && (s = n._next, h === this._time && (!this._paused || v));)(n._active || n._startTime <= h && !n._paused && !n._gc) && (d === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s;
                        else
                            for (n = this._last; n && (s = n._prev, h === this._time && (!this._paused || v));) {
                                if (n._active || n._startTime <= p && !n._paused && !n._gc) {
                                    if (d === n) {
                                        for (d = n._prev; d && d.endTime() > this._time;) d.render(d._reversed ? d.totalDuration() - (t - d._startTime) * d._timeScale : (t - d._startTime) * d._timeScale, e, i), d = d._prev;
                                        d = null, this.pause()
                                    }
                                    n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                                }
                                n = s
                            }
                        this._onUpdate && (e || (c.length && u(), this._callback("onUpdate"))), a && (this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (o && (c.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
                    }
                }, g._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, g.getChildren = function(t, e, n, r) {
                    r = r || -9999999999;
                    for (var o = [], s = this._first, a = 0; s;) s._startTime < r || (s instanceof i ? e !== !1 && (o[a++] = s) : (n !== !1 && (o[a++] = s), t !== !1 && (o = o.concat(s.getChildren(!0, e, n)), a = o.length))), s = s._next;
                    return o
                }, g.getTweensOf = function(t, e) {
                    var n, r, o = this._gc,
                        s = [],
                        a = 0;
                    for (o && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (s[a++] = n[r]);
                    return o && this._enabled(!1, !0), s
                }, g.recent = function() {
                    return this._recent
                }, g._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, g.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var n, r = this._first, o = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (n in o) o[n] >= i && (o[n] += t);
                    return this._uncache(!0)
                }, g._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                    return r
                }, g.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}), this._uncache(!0)
                }, g.invalidate = function() {
                    for (var e = this._first; e;) e.invalidate(), e = e._next;
                    return t.prototype.invalidate.call(this)
                }, g._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                    return e.prototype._enabled.call(this, t, i)
                }, g.totalTime = function(e, i, n) {
                    this._forcingPlayhead = !0;
                    var r = t.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, r
                }, g.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, g.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, n = 0, r = this._last, o = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > o && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : o = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), o = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                            this._duration = this._totalDuration = n, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
                }, g.paused = function(e) {
                    if (!e)
                        for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                    return t.prototype.paused.apply(this, arguments)
                }, g.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, g.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, n
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var n = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    r = 1e-10,
                    o = e._internals,
                    s = o.lazyTweens,
                    a = o.lazyRender,
                    l = new i(null, null, 1, 0),
                    c = n.prototype = new t;
                return c.constructor = n, c.kill()._gc = !1, n.version = "1.18.2", c.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, c.addCallback = function(t, i, n, r) {
                    return this.add(e.delayedCall(0, t, n, r), i)
                }, c.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                    return this
                }, c.removePause = function(e) {
                    return this.removeCallback(t._internals.pauseCallback, e)
                }, c.tweenTo = function(t, i) {
                    i = i || {};
                    var n, r, o, s = {
                        ease: l,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (r in i) s[r] = i[r];
                    return s.time = this._parseTimeOrLabel(t), n = Math.abs(Number(s.time) - this._time) / this._timeScale || .001, o = new e(this, n, s), s.onStart = function() {
                        o.target.paused(!0), o.vars.time !== o.target.time() && n === o.duration() && o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale), i.onStart && o._callback("onStart")
                    }, o
                }, c.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        callbackScope: this
                    }, i.immediateRender = i.immediateRender !== !1;
                    var n = this.tweenTo(e, i);
                    return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
                }, c.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, o, l, c, u, d, h, f, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        m = this._duration,
                        g = this._time,
                        v = this._totalTime,
                        y = this._startTime,
                        _ = this._timeScale,
                        b = this._rawPrevTime,
                        w = this._paused,
                        x = this._cycle;
                    if (t >= p - 1e-7) this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (o = !0, c = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || 0 > b || b === r) && b !== t && this._first && (u = !0, b > r && (c = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = m, t = m + 1e-4);
                    else if (1e-7 > t)
                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== g || 0 === m && b !== r && (b > 0 || 0 > t && b >= 0) && !this._locked) && (c = "onReverseComplete", o = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = o = !0, c = "onReverseComplete") : b >= 0 && this._first && (u = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r, 0 === t && o)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (o = !1), n = n._next;
                            t = 0, this._initted || (u = !0)
                        } else if (0 === m && 0 > b && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (d = m + this._repeatDelay, this._cycle = this._totalTime / d >> 0, 0 !== this._cycle && this._cycle === this._totalTime / d && this._cycle--, this._time = this._totalTime - this._cycle * d, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
                        if (t = this._time, t >= g)
                            for (n = this._first; n && n._startTime <= t && !h;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (h = n), n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= t && !h;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (h = n), n = n._prev;
                        h && (this._time = t = h._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== x && !this._locked) {
                        var T = this._yoyo && 0 !== (1 & x),
                            S = T === (this._yoyo && 0 !== (1 & this._cycle)),
                            k = this._totalTime,
                            C = this._cycle,
                            A = this._rawPrevTime,
                            P = this._time;
                        if (this._totalTime = x * m, this._cycle < x ? T = !T : this._totalTime += m, this._time = g, this._rawPrevTime = 0 === m ? b - 1e-4 : b, this._cycle = x, this._locked = !0, g = T ? 0 : m, this.render(g, e, 0 === m), e || this._gc || this.vars.onRepeat && this._callback("onRepeat"), g !== this._time) return;
                        if (S && (g = T ? m + 1e-4 : -1e-4, this.render(g, !0, !1)), this._locked = !1, this._paused && !w) return;
                        this._time = P, this._totalTime = k, this._cycle = C, this._rawPrevTime = A
                    }
                    if (!(this._time !== g && this._first || i || u || h)) return void(v !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== v && t > 0 && (this._active = !0), 0 === v && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")), f = this._time, f >= g)
                        for (n = this._first; n && (l = n._next, f === this._time && (!this._paused || w));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (h === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = l;
                    else
                        for (n = this._last; n && (l = n._prev, f === this._time && (!this._paused || w));) {
                            if (n._active || n._startTime <= g && !n._paused && !n._gc) {
                                if (h === n) {
                                    for (h = n._prev; h && h.endTime() > this._time;) h.render(h._reversed ? h.totalDuration() - (t - h._startTime) * h._timeScale : (t - h._startTime) * h._timeScale, e, i), h = h._prev;
                                    h = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                            }
                            n = l
                        }
                    this._onUpdate && (e || (s.length && a(), this._callback("onUpdate"))), c && (this._locked || this._gc || (y === this._startTime || _ !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (o && (s.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[c] && this._callback(c)))
                }, c.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var n, r, o = [],
                        s = this.getChildren(t, e, i),
                        a = 0,
                        l = s.length;
                    for (n = 0; l > n; n++) r = s[n], r.isActive() && (o[a++] = r);
                    return o
                }, c.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        n = i.length;
                    for (e = 0; n > e; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, c.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (e[i].time < t) return e[i].name;
                    return null
                }, c.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, c.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }, c.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }, c.totalDuration = function(e) {
                    return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, c.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, c.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, c.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, c.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, c.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, n
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = [],
                    i = [],
                    n = [],
                    r = {},
                    o = _gsScope._gsDefine.globals,
                    s = function(t, e, i, n) {
                        this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
                    },
                    a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    l = function(t, e, i, n) {
                        var r = {
                                a: t
                            },
                            o = {},
                            s = {},
                            a = {
                                c: n
                            },
                            l = (t + e) / 2,
                            c = (e + i) / 2,
                            u = (i + n) / 2,
                            d = (l + c) / 2,
                            h = (c + u) / 2,
                            f = (h - d) / 8;
                        return r.b = l + (t - l) / 4, o.b = d + f, r.c = o.a = (r.b + o.b) / 2, o.c = s.a = (d + h) / 2, s.b = h - f, a.b = u + (n - u) / 4, s.c = a.a = (s.b + a.b) / 2, [r, o, s, a]
                    },
                    c = function(t, r, o, s, a) {
                        var c, u, d, h, f, p, m, g, v, y, _, b, w, x = t.length - 1,
                            T = 0,
                            S = t[0].a;
                        for (c = 0; x > c; c++) f = t[T], u = f.a, d = f.d, h = t[T + 1].d, a ? (_ = e[c], b = i[c], w = (b + _) * r * .25 / (s ? .5 : n[c] || .5), p = d - (d - u) * (s ? .5 * r : 0 !== _ ? w / _ : 0), m = d + (h - d) * (s ? .5 * r : 0 !== b ? w / b : 0), g = d - (p + ((m - p) * (3 * _ / (_ + b) + .5) / 4 || 0))) : (p = d - (d - u) * r * .5, m = d + (h - d) * r * .5, g = d - (p + m) / 2), p += g, m += g, f.c = v = p, 0 !== c ? f.b = S : f.b = S = f.a + .6 * (f.c - f.a), f.da = d - u, f.ca = v - u, f.ba = S - u, o ? (y = l(u, S, v, d), t.splice(T, 1, y[0], y[1], y[2], y[3]), T += 4) : T++, S = m;
                        f = t[T], f.b = S, f.c = S + .4 * (f.d - S), f.da = f.d - f.a, f.ca = f.c - f.a, f.ba = S - f.a, o && (y = l(f.a, S, f.c, f.d), t.splice(T, 1, y[0], y[1], y[2], y[3]))
                    },
                    u = function(t, n, r, o) {
                        var a, l, c, u, d, h, f = [];
                        if (o)
                            for (t = [o].concat(t), l = t.length; --l > -1;) "string" == typeof(h = t[l][n]) && "=" === h.charAt(1) && (t[l][n] = o[n] + Number(h.charAt(0) + h.substr(2)));
                        if (a = t.length - 2, 0 > a) return f[0] = new s(t[0][n], 0, 0, t[-1 > a ? 0 : 1][n]), f;
                        for (l = 0; a > l; l++) c = t[l][n], u = t[l + 1][n], f[l] = new s(c, 0, 0, u), r && (d = t[l + 2][n], e[l] = (e[l] || 0) + (u - c) * (u - c), i[l] = (i[l] || 0) + (d - u) * (d - u));
                        return f[l] = new s(t[l][n], 0, 0, t[l + 1][n]), f
                    },
                    d = function(t, o, s, l, d, h) {
                        var f, p, m, g, v, y, _, b, w = {},
                            x = [],
                            T = h || t[0];
                        d = "string" == typeof d ? "," + d + "," : a, null == o && (o = 1);
                        for (p in t[0]) x.push(p);
                        if (t.length > 1) {
                            for (b = t[t.length - 1], _ = !0, f = x.length; --f > -1;)
                                if (p = x[f], Math.abs(T[p] - b[p]) > .05) {
                                    _ = !1;
                                    break
                                }
                            _ && (t = t.concat(), h && t.unshift(h), t.push(t[1]), h = t[t.length - 3])
                        }
                        for (e.length = i.length = n.length = 0, f = x.length; --f > -1;) p = x[f], r[p] = -1 !== d.indexOf("," + p + ","), w[p] = u(t, p, r[p], h);
                        for (f = e.length; --f > -1;) e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
                        if (!l) {
                            for (f = x.length; --f > -1;)
                                if (r[p])
                                    for (m = w[x[f]], y = m.length - 1, g = 0; y > g; g++) v = m[g + 1].da / i[g] + m[g].da / e[g], n[g] = (n[g] || 0) + v * v;
                            for (f = n.length; --f > -1;) n[f] = Math.sqrt(n[f])
                        }
                        for (f = x.length, g = s ? 4 : 1; --f > -1;) p = x[f], m = w[p], c(m, o, s, l, r[p]), _ && (m.splice(0, g), m.splice(m.length - g, g));
                        return w
                    },
                    h = function(t, e, i) {
                        e = e || "soft";
                        var n, r, o, a, l, c, u, d, h, f, p, m = {},
                            g = "cubic" === e ? 3 : 2,
                            v = "soft" === e,
                            y = [];
                        if (v && i && (t = [i].concat(t)), null == t || t.length < g + 1) throw "invalid Bezier data";
                        for (h in t[0]) y.push(h);
                        for (c = y.length; --c > -1;) {
                            for (h = y[c], m[h] = l = [], f = 0, d = t.length, u = 0; d > u; u++) n = null == i ? t[u][h] : "string" == typeof(p = t[u][h]) && "=" === p.charAt(1) ? i[h] + Number(p.charAt(0) + p.substr(2)) : Number(p), v && u > 1 && d - 1 > u && (l[f++] = (n + l[f - 2]) / 2), l[f++] = n;
                            for (d = f - g + 1, f = 0, u = 0; d > u; u += g) n = l[u], r = l[u + 1], o = l[u + 2], a = 2 === g ? 0 : l[u + 3], l[f++] = p = 3 === g ? new s(n, r, o, a) : new s(n, (2 * r + n) / 3, (2 * r + o) / 3, o);
                            l.length = f
                        }
                        return m
                    },
                    f = function(t, e, i) {
                        for (var n, r, o, s, a, l, c, u, d, h, f, p = 1 / i, m = t.length; --m > -1;)
                            for (h = t[m], o = h.a, s = h.d - o, a = h.c - o, l = h.b - o, n = r = 0, u = 1; i >= u; u++) c = p * u, d = 1 - c, n = r - (r = (c * c * s + 3 * d * (c * a + d * l)) * c), f = m * i + u - 1, e[f] = (e[f] || 0) + n * n
                    },
                    p = function(t, e) {
                        e = e >> 0 || 6;
                        var i, n, r, o, s = [],
                            a = [],
                            l = 0,
                            c = 0,
                            u = e - 1,
                            d = [],
                            h = [];
                        for (i in t) f(t[i], s, e);
                        for (r = s.length, n = 0; r > n; n++) l += Math.sqrt(s[n]), o = n % e, h[o] = l, o === u && (c += l, o = n / e >> 0, d[o] = h, a[o] = c, l = 0, h = []);
                        return {
                            length: c,
                            lengths: a,
                            segments: d
                        }
                    },
                    m = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.4",
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var n, r, o, s, a, l = e.values || [],
                                c = {},
                                u = l[0],
                                f = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = f ? f instanceof Array ? f : [
                                ["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
                            ] : null;
                            for (n in u) this._props.push(n);
                            for (o = this._props.length; --o > -1;) n = this._props[o], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], c[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), a || c[n] !== l[0][n] && (a = c);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? d(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : h(l, e.type, c), this._segCount = this._beziers[n].length, this._timeRes) {
                                var m = p(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (f = this._autoRotate)
                                for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), o = f.length; --o > -1;) {
                                    for (s = 0; 3 > s; s++) n = f[o][s], this._func[n] = "function" == typeof t[n] ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)] : !1;
                                    n = f[o][2], this._initialRotations[o] = this._func[n] ? this._func[n].call(this._target) : this._target[n]
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(e) {
                            var i, n, r, o, s, a, l, c, u, d, h = this._segCount,
                                f = this._func,
                                p = this._target,
                                m = e !== this._startRatio;
                            if (this._timeRes) {
                                if (u = this._lengths, d = this._curSeg, e *= this._length, r = this._li, e > this._l2 && h - 1 > r) {
                                    for (c = h - 1; c > r && (this._l2 = u[++r]) <= e;);
                                    this._l1 = u[r - 1], this._li = r, this._curSeg = d = this._segments[r], this._s2 = d[this._s1 = this._si = 0]
                                } else if (e < this._l1 && r > 0) {
                                    for (; r > 0 && (this._l1 = u[--r]) >= e;);
                                    0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = u[r], this._li = r, this._curSeg = d = this._segments[r], this._s1 = d[(this._si = d.length - 1) - 1] || 0, this._s2 = d[this._si]
                                }
                                if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < d.length - 1) {
                                    for (c = d.length - 1; c > r && (this._s2 = d[++r]) <= e;);
                                    this._s1 = d[r - 1], this._si = r
                                } else if (e < this._s1 && r > 0) {
                                    for (; r > 0 && (this._s1 = d[--r]) >= e;);
                                    0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = d[r], this._si = r
                                }
                                a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else i = 0 > e ? 0 : e >= 1 ? h - 1 : h * e >> 0, a = (e - i * (1 / h)) * h;
                            for (n = 1 - a, r = this._props.length; --r > -1;) o = this._props[r], s = this._beziers[o][i], l = (a * a * s.da + 3 * n * (a * s.ca + n * s.ba)) * a + s.a, this._round[o] && (l = Math.round(l)), f[o] ? p[o](l) : p[o] = l;
                            if (this._autoRotate) {
                                var g, v, y, _, b, w, x, T = this._autoRotate;
                                for (r = T.length; --r > -1;) o = T[r][2], w = T[r][3] || 0, x = T[r][4] === !0 ? 1 : t, s = this._beziers[T[r][0]], g = this._beziers[T[r][1]], s && g && (s = s[i], g = g[i], v = s.a + (s.b - s.a) * a, _ = s.b + (s.c - s.b) * a, v += (_ - v) * a, _ += (s.c + (s.d - s.c) * a - _) * a, y = g.a + (g.b - g.a) * a, b = g.b + (g.c - g.b) * a, y += (b - y) * a, b += (g.c + (g.d - g.c) * a - b) * a, l = m ? Math.atan2(b - y, _ - v) * x + w : this._initialRotations[r], f[o] ? p[o](l) : p[o] = l)
                            }
                        }
                    }),
                    g = m.prototype;
                m.bezierThrough = d, m.cubicToQuadratic = l, m._autoCSS = !0, m.quadraticToCubic = function(t, e, i) {
                    return new s(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, m._cssRegister = function() {
                    var t = o.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            n = e._setPluginRatio,
                            r = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, o, s, a, l) {
                                e instanceof Array && (e = {
                                    values: e
                                }), l = new m;
                                var c, u, d, h = e.values,
                                    f = h.length - 1,
                                    p = [],
                                    g = {};
                                if (0 > f) return a;
                                for (c = 0; f >= c; c++) d = i(t, h[c], s, a, l, f !== c), p[c] = d.end;
                                for (u in e) g[u] = e[u];
                                return g.values = p, a = new r(t, "bezier", 0, 0, d.pt, 2), a.data = d, a.plugin = l, a.setRatio = n, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (c = g.autoRotate === !0 ? 0 : Number(g.autoRotate), g.autoRotate = null != d.end.left ? [
                                    ["left", "top", "rotation", c, !1]
                                ] : null != d.end.x ? [
                                    ["x", "y", "rotation", c, !1]
                                ] : !1), g.autoRotate && (s._transform || s._enableTransforms(!1), d.autoRotate = s._target._gsTransform), l._onInitTween(d.proxy, g, s._tween), a
                            }
                        })
                    }
                }, g._roundProps = function(t, e) {
                    for (var i = this._overwriteProps, n = i.length; --n > -1;)(t[i[n]] || t.bezier || t.bezierThrough) && (this._round[i[n]] = e)
                }, g._kill = function(t) {
                    var e, i, n = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, n, r, o, s = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = s.prototype.setRatio
                    },
                    a = _gsScope._gsDefine.globals,
                    l = {},
                    c = s.prototype = new t("css");
                c.constructor = s, s.version = "1.18.2", s.API = 2, s.defaultTransformPerspective = 0, s.defaultSkewType = "compensated", s.defaultSmoothOrigin = !0, c = "px", s.suffixMap = {
                    top: c,
                    right: c,
                    bottom: c,
                    left: c,
                    width: c,
                    height: c,
                    fontSize: c,
                    padding: c,
                    margin: c,
                    perspective: c,
                    lineHeight: ""
                };
                var u, d, h, f, p, m, g = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    v = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    _ = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    b = /(?:\d|\-|\+|=|#|\.)*/g,
                    w = /opacity *= *([^)]*)/i,
                    x = /opacity:([^;]*)/i,
                    T = /alpha\(opacity *=.+?\)/i,
                    S = /^(rgb|hsl)/,
                    k = /([A-Z])/g,
                    C = /-([a-z])/gi,
                    A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    P = function(t, e) {
                        return e.toUpperCase()
                    },
                    E = /(?:Left|Right|Width)/i,
                    O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    R = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    I = /,(?=[^\)]*(?:\(|$))/gi,
                    D = Math.PI / 180,
                    N = 180 / Math.PI,
                    j = {},
                    F = document,
                    L = function(t) {
                        return F.createElementNS ? F.createElementNS("http://www.w3.org/1999/xhtml", t) : F.createElement(t)
                    },
                    M = L("div"),
                    $ = L("img"),
                    z = s._internals = {
                        _specialProps: l
                    },
                    H = navigator.userAgent,
                    B = function() {
                        var t = H.indexOf("Android"),
                            e = L("a");
                        return h = -1 !== H.indexOf("Safari") && -1 === H.indexOf("Chrome") && (-1 === t || Number(H.substr(t + 8, 1)) > 3), p = h && Number(H.substr(H.indexOf("Version/") + 8, 1)) < 6, f = -1 !== H.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(H) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(H)) && (m = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
                    }(),
                    q = function(t) {
                        return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    W = function(t) {
                        window.console && console.log(t)
                    },
                    X = "",
                    U = "",
                    V = function(t, e) {
                        e = e || M;
                        var i, n, r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
                        return n >= 0 ? (U = 3 === n ? "ms" : i[n], X = "-" + U.toLowerCase() + "-", U + t) : null
                    },
                    Y = F.defaultView ? F.defaultView.getComputedStyle : function() {},
                    Q = s.getStyle = function(t, e, i, n, r) {
                        var o;
                        return B || "opacity" !== e ? (!n && t.style[e] ? o = t.style[e] : (i = i || Y(t)) ? o = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(k, "-$1").toLowerCase()) : t.currentStyle && (o = t.currentStyle[e]), null == r || o && "none" !== o && "auto" !== o && "auto auto" !== o ? o : r) : q(t)
                    },
                    G = z.convertToPixels = function(t, i, n, r, o) {
                        if ("px" === r || !r) return n;
                        if ("auto" === r || !n) return 0;
                        var a, l, c, u = E.test(i),
                            d = t,
                            h = M.style,
                            f = 0 > n;
                        if (f && (n = -n), "%" === r && -1 !== i.indexOf("border")) a = n / 100 * (u ? t.clientWidth : t.clientHeight);
                        else {
                            if (h.cssText = "border:0 solid red;position:" + Q(t, "position") + ";line-height:0;", "%" !== r && d.appendChild && "v" !== r.charAt(0) && "rem" !== r) h[u ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                            else {
                                if (d = t.parentNode || F.body, l = d._gsCache, c = e.ticker.frame, l && u && l.time === c) return l.width * n / 100;
                                h[u ? "width" : "height"] = n + r
                            }
                            d.appendChild(M), a = parseFloat(M[u ? "offsetWidth" : "offsetHeight"]), d.removeChild(M), u && "%" === r && s.cacheWidths !== !1 && (l = d._gsCache = d._gsCache || {}, l.time = c, l.width = a / n * 100), 0 !== a || o || (a = G(t, i, n, r, !0))
                        }
                        return f ? -a : a
                    },
                    Z = z.calculateOffset = function(t, e, i) {
                        if ("absolute" !== Q(t, "position", i)) return 0;
                        var n = "left" === e ? "Left" : "Top",
                            r = Q(t, "margin" + n, i);
                        return t["offset" + n] - (G(t, e, parseFloat(r), r.replace(b, "")) || 0)
                    },
                    J = function(t, e) {
                        var i, n, r, o = {};
                        if (e = e || Y(t, null))
                            if (i = e.length)
                                for (; --i > -1;) r = e[i], (-1 === r.indexOf("-transform") || kt === r) && (o[r.replace(C, P)] = e.getPropertyValue(r));
                            else
                                for (i in e)(-1 === i.indexOf("Transform") || St === i) && (o[i] = e[i]);
                        else if (e = t.currentStyle || t.style)
                            for (i in e) "string" == typeof i && void 0 === o[i] && (o[i.replace(C, P)] = e[i]);
                        return B || (o.opacity = q(t)), n = Lt(t, e, !1), o.rotation = n.rotation, o.skewX = n.skewX, o.scaleX = n.scaleX, o.scaleY = n.scaleY, o.x = n.x, o.y = n.y, At && (o.z = n.z, o.rotationX = n.rotationX, o.rotationY = n.rotationY, o.scaleZ = n.scaleZ), o.filters && delete o.filters, o
                    },
                    K = function(t, e, i, n, r) {
                        var o, s, a, l = {},
                            c = t.style;
                        for (s in i) "cssText" !== s && "length" !== s && isNaN(s) && (e[s] !== (o = i[s]) || r && r[s]) && -1 === s.indexOf("Origin") && ("number" == typeof o || "string" == typeof o) && (l[s] = "auto" !== o || "left" !== s && "top" !== s ? "" !== o && "auto" !== o && "none" !== o || "string" != typeof e[s] || "" === e[s].replace(_, "") ? o : 0 : Z(t, s), void 0 !== c[s] && (a = new pt(c, s, c[s], a)));
                        if (n)
                            for (s in n) "className" !== s && (l[s] = n[s]);
                        return {
                            difs: l,
                            firstMPT: a
                        }
                    },
                    tt = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    et = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    it = function(t, e, i) {
                        var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = tt[e],
                            o = r.length;
                        for (i = i || Y(t, null); --o > -1;) n -= parseFloat(Q(t, "padding" + r[o], i, !0)) || 0, n -= parseFloat(Q(t, "border" + r[o] + "Width", i, !0)) || 0;
                        return n
                    },
                    nt = function(t, e) {
                        if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                        (null == t || "" === t) && (t = "0 0");
                        var i = t.split(" "),
                            n = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                            r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                        return null == r ? r = "center" === n ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), t = n + " " + r + (i.length > 2 ? " " + i[2] : ""), e && (e.oxp = -1 !== n.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === n.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(n.replace(_, "")), e.oy = parseFloat(r.replace(_, "")), e.v = t), e || t
                    },
                    rt = function(t, e) {
                        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                    },
                    ot = function(t, e) {
                        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
                    },
                    st = function(t, e, i, n) {
                        var r, o, s, a, l, c = 1e-6;
                        return null == t ? a = e : "number" == typeof t ? a = t : (r = 360, o = t.split("_"), l = "=" === t.charAt(1), s = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(o[0].substr(2)) : parseFloat(o[0])) * (-1 === t.indexOf("rad") ? 1 : N) - (l ? 0 : e), o.length && (n && (n[i] = e + s), -1 !== t.indexOf("short") && (s %= r, s !== s % (r / 2) && (s = 0 > s ? s + r : s - r)), -1 !== t.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * r) % r - (s / r | 0) * r : -1 !== t.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * r) % r - (s / r | 0) * r)), a = e + s), c > a && a > -c && (a = 0), a
                    },
                    at = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    lt = function(t, e, i) {
                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                    },
                    ct = s.parseColor = function(t, e) {
                        var i, n, r, o, s, a, l, c, u, d, h;
                        if (t)
                            if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];
                            else {
                                if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), at[t]) i = at[t];
                                else if ("#" === t.charAt(0)) 4 === t.length && (n = t.charAt(1), r = t.charAt(2), o = t.charAt(3), t = "#" + n + n + r + r + o + o), t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & 255, 255 & t];
                                else if ("hsl" === t.substr(0, 3))
                                    if (i = h = t.match(g), e) {
                                        if (-1 !== t.indexOf("=")) return t.match(v)
                                    } else s = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, r = .5 >= l ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(t[3])), i[0] = lt(s + 1 / 3, n, r), i[1] = lt(s, n, r), i[2] = lt(s - 1 / 3, n, r);
                                else i = t.match(g) || at.transparent;
                                i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                            } else i = at.black;
                        return e && !h && (n = i[0] / 255, r = i[1] / 255, o = i[2] / 255, c = Math.max(n, r, o), u = Math.min(n, r, o), l = (c + u) / 2, c === u ? s = a = 0 : (d = c - u, a = l > .5 ? d / (2 - c - u) : d / (c + u), s = c === n ? (r - o) / d + (o > r ? 6 : 0) : c === r ? (o - n) / d + 2 : (n - r) / d + 4, s *= 60), i[0] = s + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
                    },
                    ut = function(t, e) {
                        var i, n, r, o = t.match(dt) || [],
                            s = 0,
                            a = o.length ? "" : t;
                        for (i = 0; i < o.length; i++) n = o[i], r = t.substr(s, t.indexOf(n, s) - s), s += r.length + n.length, n = ct(n, e), 3 === n.length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                        return a
                    },
                    dt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (c in at) dt += "|" + c + "\\b";
                dt = new RegExp(dt + ")", "gi"), s.colorStringFilter = function(t) {
                    var e, i = t[0] + t[1];
                    dt.lastIndex = 0, dt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = ut(t[0], e), t[1] = ut(t[1], e))
                }, e.defaultStringFilter || (e.defaultStringFilter = s.colorStringFilter);
                var ht = function(t, e, i, n) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var r, o = e ? (t.match(dt) || [""])[0] : "",
                            s = t.split(o).join("").match(y) || [],
                            a = t.substr(0, t.indexOf(s[0])),
                            l = ")" === t.charAt(t.length - 1) ? ")" : "",
                            c = -1 !== t.indexOf(" ") ? " " : ",",
                            u = s.length,
                            d = u > 0 ? s[0].replace(g, "") : "";
                        return u ? r = e ? function(t) {
                            var e, h, f, p;
                            if ("number" == typeof t) t += d;
                            else if (n && I.test(t)) {
                                for (p = t.replace(I, "|").split("|"), f = 0; f < p.length; f++) p[f] = r(p[f]);
                                return p.join(",")
                            }
                            if (e = (t.match(dt) || [o])[0], h = t.split(e).join("").match(y) || [], f = h.length, u > f--)
                                for (; ++f < u;) h[f] = i ? h[(f - 1) / 2 | 0] : s[f];
                            return a + h.join(c) + c + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                        } : function(t) {
                            var e, o, h;
                            if ("number" == typeof t) t += d;
                            else if (n && I.test(t)) {
                                for (o = t.replace(I, "|").split("|"), h = 0; h < o.length; h++) o[h] = r(o[h]);
                                return o.join(",")
                            }
                            if (e = t.match(y) || [], h = e.length, u > h--)
                                for (; ++h < u;) e[h] = i ? e[(h - 1) / 2 | 0] : s[h];
                            return a + e.join(c) + l
                        } : function(t) {
                            return t
                        }
                    },
                    ft = function(t) {
                        return t = t.split(","),
                            function(e, i, n, r, o, s, a) {
                                var l, c = (i + "").split(" ");
                                for (a = {}, l = 0; 4 > l; l++) a[t[l]] = c[l] = c[l] || c[(l - 1) / 2 >> 0];
                                return r.parse(e, a, o, s)
                            }
                    },
                    pt = (z._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, n, r, o, s = this.data, a = s.proxy, l = s.firstMPT, c = 1e-6; l;) e = a[l.v], l.r ? e = Math.round(e) : c > e && e > -c && (e = 0), l.t[l.p] = e, l = l._next;
                        if (s.autoRotate && (s.autoRotate.rotation = a.rotation), 1 === t || 0 === t)
                            for (l = s.firstMPT, o = 1 === t ? "e" : "b"; l;) {
                                if (i = l.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                        i[o] = r
                                    }
                                } else i[o] = i.s + i.xs0;
                                l = l._next
                            }
                    }, function(t, e, i, n, r) {
                        this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                    }),
                    mt = (z._parseToProxy = function(t, e, i, n, r, o) {
                        var s, a, l, c, u, d = n,
                            h = {},
                            f = {},
                            p = i._transform,
                            m = j;
                        for (i._transform = null, j = e, n = u = i.parse(t, e, n, r), j = m, o && (i._transform = p, d && (d._prev = null, d._prev && (d._prev._next = null))); n && n !== d;) {
                            if (n.type <= 1 && (a = n.p, f[a] = n.s + n.c, h[a] = n.s, o || (c = new pt(n, "s", a, c, n.r), n.c = 0), 1 === n.type))
                                for (s = n.l; --s > 0;) l = "xn" + s, a = n.p + "_" + l, f[a] = n.data[l], h[a] = n[l], o || (c = new pt(n, l, a, c, n.rxp[l]));
                            n = n._next
                        }
                        return {
                            proxy: h,
                            end: f,
                            firstMPT: c,
                            pt: u
                        }
                    }, z.CSSPropTween = function(t, e, n, r, s, a, l, c, u, d, h) {
                        this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof mt || o.push(this.n), this.r = c, this.type = a || 0, u && (this.pr = u, i = !0), this.b = void 0 === d ? n : d, this.e = void 0 === h ? n + r : h, s && (this._next = s, s._prev = this)
                    }),
                    gt = function(t, e, i, n, r, o) {
                        var s = new mt(t, e, i, n - i, r, -1, o);
                        return s.b = i, s.e = s.xs0 = n, s
                    },
                    vt = s.parseComplex = function(t, e, i, n, r, o, s, a, l, c) {
                        i = i || o || "", s = new mt(t, e, 0, 0, s, c ? 2 : 1, null, !1, a, i, n), n += "";
                        var d, h, f, p, m, y, _, b, w, x, T, S, k, C = i.split(", ").join(",").split(" "),
                            A = n.split(", ").join(",").split(" "),
                            P = C.length,
                            E = u !== !1;
                        for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (C = C.join(" ").replace(I, ", ").split(" "), A = A.join(" ").replace(I, ", ").split(" "), P = C.length), P !== A.length && (C = (o || "").split(" "), P = C.length), s.plugin = l, s.setRatio = c, dt.lastIndex = 0, d = 0; P > d; d++)
                            if (p = C[d], m = A[d], b = parseFloat(p),
                                b || 0 === b) s.appendXtra("", b, rt(m, b), m.replace(v, ""), E && -1 !== m.indexOf("px"), !0);
                            else if (r && dt.test(p)) S = "," === m.charAt(m.length - 1) ? ")," : ")", k = -1 !== m.indexOf("hsl") && B, p = ct(p, k), m = ct(m, k), w = p.length + m.length > 6, w && !B && 0 === m[3] ? (s["xs" + s.l] += s.l ? " transparent" : "transparent", s.e = s.e.split(A[d]).join("transparent")) : (B || (w = !1), k ? s.appendXtra(w ? "hsla(" : "hsl(", p[0], rt(m[0], p[0]), ",", !1, !0).appendXtra("", p[1], rt(m[1], p[1]), "%,", !1).appendXtra("", p[2], rt(m[2], p[2]), w ? "%," : "%" + S, !1) : s.appendXtra(w ? "rgba(" : "rgb(", p[0], m[0] - p[0], ",", !0, !0).appendXtra("", p[1], m[1] - p[1], ",", !0).appendXtra("", p[2], m[2] - p[2], w ? "," : S, !0), w && (p = p.length < 4 ? 1 : p[3], s.appendXtra("", p, (m.length < 4 ? 1 : m[3]) - p, S, !1))), dt.lastIndex = 0;
                        else if (y = p.match(g)) {
                            if (_ = m.match(v), !_ || _.length !== y.length) return s;
                            for (f = 0, h = 0; h < y.length; h++) T = y[h], x = p.indexOf(T, f), s.appendXtra(p.substr(f, x - f), Number(T), rt(_[h], T), "", E && "px" === p.substr(x + T.length, 2), 0 === h), f = x + T.length;
                            s["xs" + s.l] += p.substr(f)
                        } else s["xs" + s.l] += s.l ? " " + m : m;
                        if (-1 !== n.indexOf("=") && s.data) {
                            for (S = s.xs0 + s.data.s, d = 1; d < s.l; d++) S += s["xs" + d] + s.data["xn" + d];
                            s.e = S + s["xs" + d]
                        }
                        return s.l || (s.type = -1, s.xs0 = s.e), s.xfirst || s
                    },
                    yt = 9;
                for (c = mt.prototype, c.l = c.pr = 0; --yt > 0;) c["xn" + yt] = 0, c["xs" + yt] = "";
                c.xs0 = "", c._next = c._prev = c.xfirst = c.data = c.plugin = c.setRatio = c.rxp = null, c.appendXtra = function(t, e, i, n, r, o) {
                    var s = this,
                        a = s.l;
                    return s["xs" + a] += o && a ? " " + t : t || "", i || 0 === a || s.plugin ? (s.l++, s.type = s.setRatio ? 2 : 1, s["xs" + s.l] = n || "", a > 0 ? (s.data["xn" + a] = e + i, s.rxp["xn" + a] = r, s["xn" + a] = e, s.plugin || (s.xfirst = new mt(s, "xn" + a, e, i, s.xfirst || s, 0, s.n, r, s.pr), s.xfirst.xs0 = 0), s) : (s.data = {
                        s: e + i
                    }, s.rxp = {}, s.s = e, s.c = i, s.r = r, s)) : (s["xs" + a] += e + (n || ""), s)
                };
                var _t = function(t, e) {
                        e = e || {}, this.p = e.prefix ? V(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || ht(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    bt = z._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var n, r, o = t.split(","),
                            s = e.defaultValue;
                        for (i = i || [s], n = 0; n < o.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || s, r = new _t(o[n], e)
                    },
                    wt = function(t) {
                        if (!l[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            bt(t, {
                                parser: function(t, i, n, r, o, s, c) {
                                    var u = a.com.greensock.plugins[e];
                                    return u ? (u._cssRegister(), l[n].parse(t, i, n, r, o, s, c)) : (W("Error: " + e + " js file not loaded."), o)
                                }
                            })
                        }
                    };
                c = _t.prototype, c.parseComplex = function(t, e, i, n, r, o) {
                    var s, a, l, c, u, d, h = this.keyword;
                    if (this.multi && (I.test(i) || I.test(e) ? (a = e.replace(I, "|").split("|"), l = i.replace(I, "|").split("|")) : h && (a = [e], l = [i])), l) {
                        for (c = l.length > a.length ? l.length : a.length, s = 0; c > s; s++) e = a[s] = a[s] || this.dflt, i = l[s] = l[s] || this.dflt, h && (u = e.indexOf(h), d = i.indexOf(h), u !== d && (-1 === d ? a[s] = a[s].split(h).join("") : -1 === u && (a[s] += " " + h)));
                        e = a.join(", "), i = l.join(", ")
                    }
                    return vt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, o)
                }, c.parse = function(t, e, i, n, o, s, a) {
                    return this.parseComplex(t.style, this.format(Q(t, this.p, r, !1, this.dflt)), this.format(e), o, s)
                }, s.registerSpecialProp = function(t, e, i) {
                    bt(t, {
                        parser: function(t, n, r, o, s, a, l) {
                            var c = new mt(t, r, 0, 0, s, 2, r, !1, i);
                            return c.plugin = a, c.setRatio = e(t, n, o._tween, r), c
                        },
                        priority: i
                    })
                }, s.useSVGTransformAttr = h || f;
                var xt, Tt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    St = V("transform"),
                    kt = X + "transform",
                    Ct = V("transformOrigin"),
                    At = null !== V("perspective"),
                    Pt = z.Transform = function() {
                        this.perspective = parseFloat(s.defaultTransformPerspective) || 0, this.force3D = s.defaultForce3D !== !1 && At ? s.defaultForce3D || "auto" : !1
                    },
                    Et = window.SVGElement,
                    Ot = function(t, e, i) {
                        var n, r = F.createElementNS("http://www.w3.org/2000/svg", t),
                            o = /([a-z])([A-Z])/g;
                        for (n in i) r.setAttributeNS(null, n.replace(o, "$1-$2").toLowerCase(), i[n]);
                        return e.appendChild(r), r
                    },
                    Rt = F.documentElement,
                    It = function() {
                        var t, e, i, n = m || /Android/i.test(H) && !window.chrome;
                        return F.createElementNS && !n && (t = Ot("svg", Rt), e = Ot("rect", t, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), i = e.getBoundingClientRect().width, e.style[Ct] = "50% 50%", e.style[St] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(f && At), Rt.removeChild(t)), n
                    }(),
                    Dt = function(t, e, i, n, r) {
                        var o, a, l, c, u, d, h, f, p, m, g, v, y, _, b = t._gsTransform,
                            w = Ft(t, !0);
                        b && (y = b.xOrigin, _ = b.yOrigin), (!n || (o = n.split(" ")).length < 2) && (h = t.getBBox(), e = nt(e).split(" "), o = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * h.width : parseFloat(e[0])) + h.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * h.height : parseFloat(e[1])) + h.y]), i.xOrigin = c = parseFloat(o[0]), i.yOrigin = u = parseFloat(o[1]), n && w !== jt && (d = w[0], h = w[1], f = w[2], p = w[3], m = w[4], g = w[5], v = d * p - h * f, a = c * (p / v) + u * (-f / v) + (f * g - p * m) / v, l = c * (-h / v) + u * (d / v) - (d * g - h * m) / v, c = i.xOrigin = o[0] = a, u = i.yOrigin = o[1] = l), b && (r || r !== !1 && s.defaultSmoothOrigin !== !1 ? (a = c - y, l = u - _, b.xOffset += a * w[0] + l * w[2] - a, b.yOffset += a * w[1] + l * w[3] - l) : b.xOffset = b.yOffset = 0), t.setAttribute("data-svg-origin", o.join(" "))
                    },
                    Nt = function(t) {
                        return !!(Et && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
                    },
                    jt = [1, 0, 0, 1, 0, 0],
                    Ft = function(t, e) {
                        var i, n, r, o, s, a = t._gsTransform || new Pt,
                            l = 1e5;
                        if (St ? n = Q(t, kt, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(O), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), a.x || 0, a.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, (a.svg || t.getBBox && Nt(t)) && (i && -1 !== (t.style[St] + "").indexOf("matrix") && (n = t.style[St], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return jt;
                        for (r = (n || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], yt = r.length; --yt > -1;) o = Number(r[yt]), r[yt] = (s = o - (o |= 0)) ? (s * l + (0 > s ? -.5 : .5) | 0) / l + o : o;
                        return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                    },
                    Lt = z.getTransform = function(t, i, n, o) {
                        if (t._gsTransform && n && !o) return t._gsTransform;
                        var a, l, c, u, d, h, f = n ? t._gsTransform || new Pt : new Pt,
                            p = f.scaleX < 0,
                            m = 2e-5,
                            g = 1e5,
                            v = At ? parseFloat(Q(t, Ct, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0,
                            y = parseFloat(s.defaultTransformPerspective) || 0;
                        if (f.svg = !(!t.getBBox || !Nt(t)), f.svg && (Dt(t, Q(t, Ct, r, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), xt = s.useSVGTransformAttr || It), a = Ft(t), a !== jt) {
                            if (16 === a.length) {
                                var _, b, w, x, T, S = a[0],
                                    k = a[1],
                                    C = a[2],
                                    A = a[3],
                                    P = a[4],
                                    E = a[5],
                                    O = a[6],
                                    R = a[7],
                                    I = a[8],
                                    D = a[9],
                                    j = a[10],
                                    F = a[12],
                                    L = a[13],
                                    M = a[14],
                                    $ = a[11],
                                    z = Math.atan2(O, j);
                                f.zOrigin && (M = -f.zOrigin, F = I * M - a[12], L = D * M - a[13], M = j * M + f.zOrigin - a[14]), f.rotationX = z * N, z && (x = Math.cos(-z), T = Math.sin(-z), _ = P * x + I * T, b = E * x + D * T, w = O * x + j * T, I = P * -T + I * x, D = E * -T + D * x, j = O * -T + j * x, $ = R * -T + $ * x, P = _, E = b, O = w), z = Math.atan2(-C, j), f.rotationY = z * N, z && (x = Math.cos(-z), T = Math.sin(-z), _ = S * x - I * T, b = k * x - D * T, w = C * x - j * T, D = k * T + D * x, j = C * T + j * x, $ = A * T + $ * x, S = _, k = b, C = w), z = Math.atan2(k, S), f.rotation = z * N, z && (x = Math.cos(-z), T = Math.sin(-z), S = S * x + P * T, b = k * x + E * T, E = k * -T + E * x, O = C * -T + O * x, k = b), f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0, f.rotationY = 180 - f.rotationY), f.scaleX = (Math.sqrt(S * S + k * k) * g + .5 | 0) / g, f.scaleY = (Math.sqrt(E * E + D * D) * g + .5 | 0) / g, f.scaleZ = (Math.sqrt(O * O + j * j) * g + .5 | 0) / g, f.skewX = 0, f.perspective = $ ? 1 / (0 > $ ? -$ : $) : 0, f.x = F, f.y = L, f.z = M, f.svg && (f.x -= f.xOrigin - (f.xOrigin * S - f.yOrigin * P), f.y -= f.yOrigin - (f.yOrigin * k - f.xOrigin * E))
                            } else if ((!At || o || !a.length || f.x !== a[4] || f.y !== a[5] || !f.rotationX && !f.rotationY) && (void 0 === f.x || "none" !== Q(t, "display", i))) {
                                var H = a.length >= 6,
                                    B = H ? a[0] : 1,
                                    q = a[1] || 0,
                                    W = a[2] || 0,
                                    X = H ? a[3] : 1;
                                f.x = a[4] || 0, f.y = a[5] || 0, c = Math.sqrt(B * B + q * q), u = Math.sqrt(X * X + W * W), d = B || q ? Math.atan2(q, B) * N : f.rotation || 0, h = W || X ? Math.atan2(W, X) * N + d : f.skewX || 0, Math.abs(h) > 90 && Math.abs(h) < 270 && (p ? (c *= -1, h += 0 >= d ? 180 : -180, d += 0 >= d ? 180 : -180) : (u *= -1, h += 0 >= h ? 180 : -180)), f.scaleX = c, f.scaleY = u, f.rotation = d, f.skewX = h, At && (f.rotationX = f.rotationY = f.z = 0, f.perspective = y, f.scaleZ = 1), f.svg && (f.x -= f.xOrigin - (f.xOrigin * B + f.yOrigin * W), f.y -= f.yOrigin - (f.xOrigin * q + f.yOrigin * X))
                            }
                            f.zOrigin = v;
                            for (l in f) f[l] < m && f[l] > -m && (f[l] = 0)
                        }
                        return n && (t._gsTransform = f, f.svg && (xt && t.style[St] ? e.delayedCall(.001, function() {
                            Ht(t.style, St)
                        }) : !xt && t.getAttribute("transform") && e.delayedCall(.001, function() {
                            t.removeAttribute("transform")
                        }))), f
                    },
                    Mt = function(t) {
                        var e, i, n = this.data,
                            r = -n.rotation * D,
                            o = r + n.skewX * D,
                            s = 1e5,
                            a = (Math.cos(r) * n.scaleX * s | 0) / s,
                            l = (Math.sin(r) * n.scaleX * s | 0) / s,
                            c = (Math.sin(o) * -n.scaleY * s | 0) / s,
                            u = (Math.cos(o) * n.scaleY * s | 0) / s,
                            d = this.t.style,
                            h = this.t.currentStyle;
                        if (h) {
                            i = l, l = -c, c = -i, e = h.filter, d.filter = "";
                            var f, p, g = this.t.offsetWidth,
                                v = this.t.offsetHeight,
                                y = "absolute" !== h.position,
                                _ = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + c + ", M22=" + u,
                                x = n.x + g * n.xPercent / 100,
                                T = n.y + v * n.yPercent / 100;
                            if (null != n.ox && (f = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2, p = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, x += f - (f * a + p * l), T += p - (f * c + p * u)), y ? (f = g / 2, p = v / 2, _ += ", Dx=" + (f - (f * a + p * l) + x) + ", Dy=" + (p - (f * c + p * u) + T) + ")") : _ += ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? d.filter = e.replace(R, _) : d.filter = _ + " " + e, (0 === t || 1 === t) && 1 === a && 0 === l && 0 === c && 1 === u && (y && -1 === _.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && d.removeAttribute("filter")), !y) {
                                var S, k, C, A = 8 > m ? 1 : -1;
                                for (f = n.ieOffsetX || 0, p = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * v)) / 2 + x), n.ieOffsetY = Math.round((v - ((0 > u ? -u : u) * v + (0 > c ? -c : c) * g)) / 2 + T), yt = 0; 4 > yt; yt++) k = et[yt], S = h[k], i = -1 !== S.indexOf("px") ? parseFloat(S) : G(this.t, k, parseFloat(S), S.replace(b, "")) || 0, C = i !== n[k] ? 2 > yt ? -n.ieOffsetX : -n.ieOffsetY : 2 > yt ? f - n.ieOffsetX : p - n.ieOffsetY, d[k] = (n[k] = Math.round(i - C * (0 === yt || 2 === yt ? 1 : A))) + "px"
                            }
                        }
                    },
                    $t = z.set3DTransformRatio = z.setTransformRatio = function(t) {
                        var e, i, n, r, o, s, a, l, c, u, d, h, p, m, g, v, y, _, b, w, x, T, S, k = this.data,
                            C = this.t.style,
                            A = k.rotation,
                            P = k.rotationX,
                            E = k.rotationY,
                            O = k.scaleX,
                            R = k.scaleY,
                            I = k.scaleZ,
                            N = k.x,
                            j = k.y,
                            F = k.z,
                            L = k.svg,
                            M = k.perspective,
                            $ = k.force3D;
                        if (((1 === t || 0 === t) && "auto" === $ && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !$) && !F && !M && !E && !P && 1 === I || xt && L || !At) return void(A || k.skewX || L ? (A *= D, T = k.skewX * D, S = 1e5, e = Math.cos(A) * O, r = Math.sin(A) * O, i = Math.sin(A - T) * -R, o = Math.cos(A - T) * R, T && "simple" === k.skewType && (y = Math.tan(T), y = Math.sqrt(1 + y * y), i *= y, o *= y, k.skewY && (e *= y, r *= y)), L && (N += k.xOrigin - (k.xOrigin * e + k.yOrigin * i) + k.xOffset, j += k.yOrigin - (k.xOrigin * r + k.yOrigin * o) + k.yOffset, xt && (k.xPercent || k.yPercent) && (m = this.t.getBBox(), N += .01 * k.xPercent * m.width, j += .01 * k.yPercent * m.height), m = 1e-6, m > N && N > -m && (N = 0), m > j && j > -m && (j = 0)), b = (e * S | 0) / S + "," + (r * S | 0) / S + "," + (i * S | 0) / S + "," + (o * S | 0) / S + "," + N + "," + j + ")", L && xt ? this.t.setAttribute("transform", "matrix(" + b) : C[St] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + b) : C[St] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + R + "," + N + "," + j + ")");
                        if (f && (m = 1e-4, m > O && O > -m && (O = I = 2e-5), m > R && R > -m && (R = I = 2e-5), !M || k.z || k.rotationX || k.rotationY || (M = 0)), A || k.skewX) A *= D, g = e = Math.cos(A), v = r = Math.sin(A), k.skewX && (A -= k.skewX * D, g = Math.cos(A), v = Math.sin(A), "simple" === k.skewType && (y = Math.tan(k.skewX * D), y = Math.sqrt(1 + y * y), g *= y, v *= y, k.skewY && (e *= y, r *= y))), i = -v, o = g;
                        else {
                            if (!(E || P || 1 !== I || M || L)) return void(C[St] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + N + "px," + j + "px," + F + "px)" + (1 !== O || 1 !== R ? " scale(" + O + "," + R + ")" : ""));
                            e = o = 1, i = r = 0
                        }
                        c = 1, n = s = a = l = u = d = 0, h = M ? -1 / M : 0, p = k.zOrigin, m = 1e-6, w = ",", x = "0", A = E * D, A && (g = Math.cos(A), v = Math.sin(A), a = -v, u = h * -v, n = e * v, s = r * v, c = g, h *= g, e *= g, r *= g), A = P * D, A && (g = Math.cos(A), v = Math.sin(A), y = i * g + n * v, _ = o * g + s * v, l = c * v, d = h * v, n = i * -v + n * g, s = o * -v + s * g, c *= g, h *= g, i = y, o = _), 1 !== I && (n *= I, s *= I, c *= I, h *= I), 1 !== R && (i *= R, o *= R, l *= R, d *= R), 1 !== O && (e *= O, r *= O, a *= O, u *= O), (p || L) && (p && (N += n * -p, j += s * -p, F += c * -p + p), L && (N += k.xOrigin - (k.xOrigin * e + k.yOrigin * i) + k.xOffset, j += k.yOrigin - (k.xOrigin * r + k.yOrigin * o) + k.yOffset), m > N && N > -m && (N = x), m > j && j > -m && (j = x), m > F && F > -m && (F = 0)), b = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(", b += (m > e && e > -m ? x : e) + w + (m > r && r > -m ? x : r) + w + (m > a && a > -m ? x : a), b += w + (m > u && u > -m ? x : u) + w + (m > i && i > -m ? x : i) + w + (m > o && o > -m ? x : o), P || E || 1 !== I ? (b += w + (m > l && l > -m ? x : l) + w + (m > d && d > -m ? x : d) + w + (m > n && n > -m ? x : n), b += w + (m > s && s > -m ? x : s) + w + (m > c && c > -m ? x : c) + w + (m > h && h > -m ? x : h) + w) : b += ",0,0,0,0,1,0,", b += N + w + j + w + F + w + (M ? 1 + -F / M : 1) + ")", C[St] = b
                    };
                c = Pt.prototype, c.x = c.y = c.z = c.skewX = c.skewY = c.rotation = c.rotationX = c.rotationY = c.zOrigin = c.xPercent = c.yPercent = c.xOffset = c.yOffset = 0, c.scaleX = c.scaleY = c.scaleZ = 1, bt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(t, e, i, n, o, a, l) {
                        if (n._lastParsedTransform === l) return o;
                        n._lastParsedTransform = l;
                        var c, u, d, h, f, p, m, g, v, y, _ = t._gsTransform,
                            b = t.style,
                            w = 1e-6,
                            x = Tt.length,
                            T = l,
                            S = {},
                            k = "transformOrigin";
                        if (l.display ? (h = Q(t, "display"), b.display = "block", c = Lt(t, r, !0, l.parseTransform), b.display = h) : c = Lt(t, r, !0, l.parseTransform), n._transform = c, "string" == typeof T.transform && St) h = M.style, h[St] = T.transform, h.display = "block", h.position = "absolute", F.body.appendChild(M), u = Lt(M, null, !1), F.body.removeChild(M), u.perspective || (u.perspective = c.perspective), null != T.xPercent && (u.xPercent = ot(T.xPercent, c.xPercent)), null != T.yPercent && (u.yPercent = ot(T.yPercent, c.yPercent));
                        else if ("object" == typeof T) {
                            if (u = {
                                    scaleX: ot(null != T.scaleX ? T.scaleX : T.scale, c.scaleX),
                                    scaleY: ot(null != T.scaleY ? T.scaleY : T.scale, c.scaleY),
                                    scaleZ: ot(T.scaleZ, c.scaleZ),
                                    x: ot(T.x, c.x),
                                    y: ot(T.y, c.y),
                                    z: ot(T.z, c.z),
                                    xPercent: ot(T.xPercent, c.xPercent),
                                    yPercent: ot(T.yPercent, c.yPercent),
                                    perspective: ot(T.transformPerspective, c.perspective)
                                }, g = T.directionalRotation, null != g)
                                if ("object" == typeof g)
                                    for (h in g) T[h] = g[h];
                                else T.rotation = g;
                                "string" == typeof T.x && -1 !== T.x.indexOf("%") && (u.x = 0, u.xPercent = ot(T.x, c.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (u.y = 0, u.yPercent = ot(T.y, c.yPercent)), u.rotation = st("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : c.rotation, c.rotation, "rotation", S), At && (u.rotationX = st("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : c.rotationX || 0, c.rotationX, "rotationX", S), u.rotationY = st("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : c.rotationY || 0, c.rotationY, "rotationY", S)), u.skewX = null == T.skewX ? c.skewX : st(T.skewX, c.skewX), u.skewY = null == T.skewY ? c.skewY : st(T.skewY, c.skewY), (d = u.skewY - c.skewY) && (u.skewX += d, u.rotation += d)
                        }
                        for (At && null != T.force3D && (c.force3D = T.force3D, m = !0), c.skewType = T.skewType || c.skewType || s.defaultSkewType, p = c.force3D || c.z || c.rotationX || c.rotationY || u.z || u.rotationX || u.rotationY || u.perspective, p || null == T.scale || (u.scaleZ = 1); --x > -1;) i = Tt[x], f = u[i] - c[i], (f > w || -w > f || null != T[i] || null != j[i]) && (m = !0, o = new mt(c, i, c[i], f, o), i in S && (o.e = S[i]), o.xs0 = 0, o.plugin = a, n._overwriteProps.push(o.n));
                        return f = T.transformOrigin, c.svg && (f || T.svgOrigin) && (v = c.xOffset, y = c.yOffset, Dt(t, nt(f), u, T.svgOrigin, T.smoothOrigin), o = gt(c, "xOrigin", (_ ? c : u).xOrigin, u.xOrigin, o, k), o = gt(c, "yOrigin", (_ ? c : u).yOrigin, u.yOrigin, o, k), (v !== c.xOffset || y !== c.yOffset) && (o = gt(c, "xOffset", _ ? v : c.xOffset, c.xOffset, o, k), o = gt(c, "yOffset", _ ? y : c.yOffset, c.yOffset, o, k)), f = xt ? null : "0px 0px"), (f || At && p && c.zOrigin) && (St ? (m = !0, i = Ct, f = (f || Q(t, i, r, !1, "50% 50%")) + "", o = new mt(b, i, 0, 0, o, -1, k), o.b = b[i], o.plugin = a, At ? (h = c.zOrigin, f = f.split(" "), c.zOrigin = (f.length > 2 && (0 === h || "0px" !== f[2]) ? parseFloat(f[2]) : h) || 0, o.xs0 = o.e = f[0] + " " + (f[1] || "50%") + " 0px", o = new mt(c, "zOrigin", 0, 0, o, -1, o.n), o.b = h, o.xs0 = o.e = c.zOrigin) : o.xs0 = o.e = f) : nt(f + "", c)), m && (n._transformType = c.svg && xt || !p && 3 !== this._transformType ? 2 : 3), o
                    },
                    prefix: !0
                }), bt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), bt("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, o, s, a) {
                        e = this.format(e);
                        var l, c, u, d, h, f, p, m, g, v, y, _, b, w, x, T, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            k = t.style;
                        for (g = parseFloat(t.offsetWidth), v = parseFloat(t.offsetHeight), l = e.split(" "), c = 0; c < S.length; c++) this.p.indexOf("border") && (S[c] = V(S[c])), h = d = Q(t, S[c], r, !1, "0px"), -1 !== h.indexOf(" ") && (d = h.split(" "), h = d[0], d = d[1]), f = u = l[c], p = parseFloat(h), _ = h.substr((p + "").length), b = "=" === f.charAt(1), b ? (m = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), m *= parseFloat(f), y = f.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(f), y = f.substr((m + "").length)), "" === y && (y = n[i] || _), y !== _ && (w = G(t, "borderLeft", p, _), x = G(t, "borderTop", p, _), "%" === y ? (h = w / g * 100 + "%", d = x / v * 100 + "%") : "em" === y ? (T = G(t, "borderLeft", 1, "em"), h = w / T + "em", d = x / T + "em") : (h = w + "px", d = x + "px"), b && (f = parseFloat(h) + m + y, u = parseFloat(d) + m + y)), s = vt(k, S[c], h + " " + d, f + " " + u, !1, "0px", s);
                        return s
                    },
                    prefix: !0,
                    formatter: ht("0px 0px 0px 0px", !1, !0)
                }), bt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, n, o, s) {
                        var a, l, c, u, d, h, f = "background-position",
                            p = r || Y(t, null),
                            g = this.format((p ? m ? p.getPropertyValue(f + "-x") + " " + p.getPropertyValue(f + "-y") : p.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            v = this.format(e);
                        if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (h = Q(t, "backgroundImage").replace(A, ""), h && "none" !== h)) {
                            for (a = g.split(" "), l = v.split(" "), $.setAttribute("src", h), c = 2; --c > -1;) g = a[c], u = -1 !== g.indexOf("%"), u !== (-1 !== l[c].indexOf("%")) && (d = 0 === c ? t.offsetWidth - $.width : t.offsetHeight - $.height, a[c] = u ? parseFloat(g) / 100 * d + "px" : parseFloat(g) / d * 100 + "%");
                            g = a.join(" ")
                        }
                        return this.parseComplex(t.style, g, v, o, s)
                    },
                    formatter: nt
                }), bt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: nt
                }), bt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), bt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), bt("transformStyle", {
                    prefix: !0
                }), bt("backfaceVisibility", {
                    prefix: !0
                }), bt("userSelect", {
                    prefix: !0
                }), bt("margin", {
                    parser: ft("marginTop,marginRight,marginBottom,marginLeft")
                }), bt("padding", {
                    parser: ft("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), bt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, n, o, s) {
                        var a, l, c;
                        return 9 > m ? (l = t.currentStyle, c = 8 > m ? " " : ",", a = "rect(" + l.clipTop + c + l.clipRight + c + l.clipBottom + c + l.clipLeft + ")", e = this.format(e).split(",").join(c)) : (a = this.format(Q(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, o, s)
                    }
                }), bt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), bt("autoRound,strictUnits", {
                    parser: function(t, e, i, n, r) {
                        return r
                    }
                }), bt("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, n, o, s) {
                        return this.parseComplex(t.style, this.format(Q(t, "borderTopWidth", r, !1, "0px") + " " + Q(t, "borderTopStyle", r, !1, "solid") + " " + Q(t, "borderTopColor", r, !1, "#000")), this.format(e), o, s)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(dt) || ["#000"])[0]
                    }
                }), bt("borderWidth", {
                    parser: ft("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), bt("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, n, r, o) {
                        var s = t.style,
                            a = "cssFloat" in s ? "cssFloat" : "styleFloat";
                        return new mt(s, a, 0, 0, r, -1, i, !1, 0, s[a], e)
                    }
                });
                var zt = function(t) {
                    var e, i = this.t,
                        n = i.filter || Q(this.data, "filter") || "",
                        r = this.s + this.c * t | 0;
                    100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !Q(this.data, "filter")) : (i.filter = n.replace(T, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(w, "opacity=" + r))
                };
                bt("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, n, o, s) {
                        var a = parseFloat(Q(t, "opacity", r, !1, "1")),
                            l = t.style,
                            c = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), c && 1 === a && "hidden" === Q(t, "visibility", r) && 0 !== e && (a = 0), B ? o = new mt(l, "opacity", a, e - a, o) : (o = new mt(l, "opacity", 100 * a, 100 * (e - a), o), o.xn1 = c ? 1 : 0, l.zoom = 1, o.type = 2, o.b = "alpha(opacity=" + o.s + ")", o.e = "alpha(opacity=" + (o.s + o.c) + ")", o.data = t, o.plugin = s, o.setRatio = zt), c && (o = new mt(l, "visibility", 0, 0, o, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), o.xs0 = "inherit", n._overwriteProps.push(o.n), n._overwriteProps.push(i)), o
                    }
                });
                var Ht = function(t, e) {
                        e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(k, "-$1").toLowerCase())) : t.removeAttribute(e))
                    },
                    Bt = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Ht(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                bt("className", {
                    parser: function(t, e, n, o, s, a, l) {
                        var c, u, d, h, f, p = t.getAttribute("class") || "",
                            m = t.style.cssText;
                        if (s = o._classNamePT = new mt(t, n, 0, 0, s, 2), s.setRatio = Bt, s.pr = -11, i = !0, s.b = p, u = J(t, r), d = t._gsClassPT) {
                            for (h = {}, f = d.data; f;) h[f.p] = 1, f = f._next;
                            d.setRatio(1)
                        }
                        return t._gsClassPT = s, s.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", s.e), c = K(t, u, J(t), l, h), t.setAttribute("class", p), s.data = c.firstMPT, t.style.cssText = m, s = s.xfirst = o.parse(t, c.difs, s, a)
                    }
                });
                var qt = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, n, r, o, s = this.t.style,
                            a = l.transform.parse;
                        if ("all" === this.e) s.cssText = "", r = !0;
                        else
                            for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1;) i = e[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Ct : l[i].p), Ht(s, i);
                        r && (Ht(s, St), o = this.t._gsTransform, o && (o.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                    }
                };
                for (bt("clearProps", {
                        parser: function(t, e, n, r, o) {
                            return o = new mt(t, n, 0, 0, o, 2), o.setRatio = qt, o.e = e, o.pr = -10, o.data = r._tween, i = !0, o
                        }
                    }), c = "bezier,throwProps,physicsProps,physics2D".split(","), yt = c.length; yt--;) wt(c[yt]);
                c = s.prototype, c._firstPT = c._lastParsedTransform = c._transform = null, c._onInitTween = function(t, e, a) {
                    if (!t.nodeType) return !1;
                    this._target = t, this._tween = a, this._vars = e, u = e.autoRound, i = !1, n = e.suffixMap || s.suffixMap, r = Y(t, ""), o = this._overwriteProps;
                    var c, f, m, g, v, y, _, b, w, T = t.style;
                    if (d && "" === T.zIndex && (c = Q(t, "zIndex", r), ("auto" === c || "" === c) && this._addLazySet(T, "zIndex", 0)), "string" == typeof e && (g = T.cssText, c = J(t, r), T.cssText = g + ";" + e, c = K(t, c, J(t)).difs, !B && x.test(e) && (c.opacity = parseFloat(RegExp.$1)), e = c, T.cssText = g), e.className ? this._firstPT = f = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = f = this.parse(t, e, null), this._transformType) {
                        for (w = 3 === this._transformType, St ? h && (d = !0, "" === T.zIndex && (_ = Q(t, "zIndex", r), ("auto" === _ || "" === _) && this._addLazySet(T, "zIndex", 0)), p && this._addLazySet(T, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : T.zoom = 1, m = f; m && m._next;) m = m._next;
                        b = new mt(t, "transform", 0, 0, null, 2), this._linkCSSP(b, null, m), b.setRatio = St ? $t : Mt, b.data = this._transform || Lt(t, r, !0), b.tween = a, b.pr = -1, o.pop()
                    }
                    if (i) {
                        for (; f;) {
                            for (y = f._next, m = g; m && m.pr > f.pr;) m = m._next;
                            (f._prev = m ? m._prev : v) ? f._prev._next = f: g = f, (f._next = m) ? m._prev = f : v = f, f = y
                        }
                        this._firstPT = g
                    }
                    return !0
                }, c.parse = function(t, e, i, o) {
                    var s, a, c, d, h, f, p, m, g, v, y = t.style;
                    for (s in e) f = e[s], a = l[s], a ? i = a.parse(t, f, s, this, i, o, e) : (h = Q(t, s, r) + "", g = "string" == typeof f, "color" === s || "fill" === s || "stroke" === s || -1 !== s.indexOf("Color") || g && S.test(f) ? (g || (f = ct(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = vt(y, s, h, f, !0, "transparent", i, 0, o)) : !g || -1 === f.indexOf(" ") && -1 === f.indexOf(",") ? (c = parseFloat(h), p = c || 0 === c ? h.substr((c + "").length) : "", ("" === h || "auto" === h) && ("width" === s || "height" === s ? (c = it(t, s, r), p = "px") : "left" === s || "top" === s ? (c = Z(t, s, r), p = "px") : (c = "opacity" !== s ? 0 : 1, p = "")), v = g && "=" === f.charAt(1), v ? (d = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), d *= parseFloat(f), m = f.replace(b, "")) : (d = parseFloat(f), m = g ? f.replace(b, "") : ""), "" === m && (m = s in n ? n[s] : p), f = d || 0 === d ? (v ? d + c : d) + m : e[s], p !== m && "" !== m && (d || 0 === d) && c && (c = G(t, s, c, p), "%" === m ? (c /= G(t, s, 100, "%") / 100, e.strictUnits !== !0 && (h = c + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? c /= G(t, s, 1, m) : "px" !== m && (d = G(t, s, d, m), m = "px"), v && (d || 0 === d) && (f = d + c + m)), v && (d += c), !c && 0 !== c || !d && 0 !== d ? void 0 !== y[s] && (f || f + "" != "NaN" && null != f) ? (i = new mt(y, s, d || c || 0, 0, i, -1, s, !1, 0, h, f), i.xs0 = "none" !== f || "display" !== s && -1 === s.indexOf("Style") ? f : h) : W("invalid " + s + " tween value: " + e[s]) : (i = new mt(y, s, c, d - c, i, 0, s, u !== !1 && ("px" === m || "zIndex" === s), 0, h, f), i.xs0 = m)) : i = vt(y, s, h, f, !0, null, i, 0, o)), o && i && !i.plugin && (i.plugin = o);
                    return i
                }, c.setRatio = function(t) {
                    var e, i, n, r = this._firstPT,
                        o = 1e-6;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; r;) {
                                if (e = r.c * t + r.s, r.r ? e = Math.round(e) : o > e && e > -o && (e = 0), r.type)
                                    if (1 === r.type)
                                        if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i
                                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                else r.t[r.p] = e + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                        else
                            for (; r;) {
                                if (2 !== r.type)
                                    if (r.r && -1 !== r.type)
                                        if (e = Math.round(r.s + r.c), r.type) {
                                            if (1 === r.type) {
                                                for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                                r.t[r.p] = i
                                            }
                                        } else r.t[r.p] = e + r.xs0;
                                else r.t[r.p] = r.e;
                                else r.setRatio(t);
                                r = r._next
                            }
                }, c._enableTransforms = function(t) {
                    this._transform = this._transform || Lt(this._target, r, !0), this._transformType = this._transform.svg && xt || !t && 3 !== this._transformType ? 2 : 3
                };
                var Wt = function(t) {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                c._addLazySet = function(t, e, i) {
                    var n = this._firstPT = new mt(t, e, 0, 0, this._firstPT, 2);
                    n.e = i, n.setRatio = Wt, n.data = this
                }, c._linkCSSP = function(t, e, i, n) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, c._kill = function(e) {
                    var i, n, r, o = e;
                    if (e.autoAlpha || e.alpha) {
                        o = {};
                        for (n in e) o[n] = e[n];
                        o.opacity = 1, o.autoAlpha && (o.visibility = 1)
                    }
                    return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, o)
                };
                var Xt = function(t, e, i) {
                    var n, r, o, s;
                    if (t.slice)
                        for (r = t.length; --r > -1;) Xt(t[r], e, i);
                    else
                        for (n = t.childNodes, r = n.length; --r > -1;) o = n[r], s = o.type, o.style && (e.push(J(o)), i && i.push(o)), 1 !== s && 9 !== s && 11 !== s || !o.childNodes.length || Xt(o, e, i)
                };
                return s.cascadeTo = function(t, i, n) {
                    var r, o, s, a, l = e.to(t, i, n),
                        c = [l],
                        u = [],
                        d = [],
                        h = [],
                        f = e._internals.reservedProps;
                    for (t = l._targets || l.target, Xt(t, u, h), l.render(i, !0, !0), Xt(t, d), l.render(0, !0, !0), l._enabled(!0), r = h.length; --r > -1;)
                        if (o = K(h[r], u[r], d[r]), o.firstMPT) {
                            o = o.difs;
                            for (s in n) f[s] && (o[s] = n[s]);
                            a = {};
                            for (s in o) a[s] = u[r][s];
                            c.push(e.fromTo(h[r], i, a, o))
                        }
                    return c
                }, t.activate([s]), s
            }, !0),
            function() {
                var t = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        version: "1.5",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }),
                    e = function(t) {
                        for (; t;) t.f || t.blob || (t.r = 1), t = t._next
                    },
                    i = t.prototype;
                i._onInitAllProps = function() {
                    for (var t, i, n, r = this._tween, o = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), s = o.length, a = {}, l = r._propLookup.roundProps; --s > -1;) a[o[s]] = 1;
                    for (s = o.length; --s > -1;)
                        for (t = o[s], i = r._firstPT; i;) n = i._next, i.pg ? i.t._roundProps(a, !0) : i.n === t && (2 === i.f && i.t ? e(i.t._firstPT) : (this._add(i.t, t, i.s, i.c), n && (n._prev = i._prev), i._prev ? i._prev._next = n : r._firstPT === i && (r._firstPT = n), i._next = i._prev = null, r._propLookup[t] = l)), i = n;
                    return !1
                }, i._add = function(t, e, i, n) {
                    this._addTween(t, e, i, i + n, e, !0), this._overwriteProps.push(e)
                }
            }(),
            function() {
                _gsScope._gsDefine.plugin({
                    propName: "attr",
                    API: 2,
                    version: "0.5.0",
                    init: function(t, e, i) {
                        var n;
                        if ("function" != typeof t.setAttribute) return !1;
                        for (n in e) this._addTween(t, "setAttribute", t.getAttribute(n) + "", e[n] + "", n, !1, n), this._overwriteProps.push(n);
                        return !0
                    }
                })
            }(), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.2.1",
                API: 2,
                init: function(t, e, i) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var n, r, o, s, a, l, c = e.useRadians === !0 ? 2 * Math.PI : 360,
                        u = 1e-6;
                    for (n in e) "useRadians" !== n && (l = (e[n] + "").split("_"), r = l[0], o = parseFloat("function" != typeof t[n] ? t[n] : t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]()), s = this.finals[n] = "string" == typeof r && "=" === r.charAt(1) ? o + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0, a = s - o, l.length && (r = l.join("_"), -1 !== r.indexOf("short") && (a %= c, a !== a % (c / 2) && (a = 0 > a ? a + c : a - c)), -1 !== r.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * c) % c - (a / c | 0) * c : -1 !== r.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * c) % c - (a / c | 0) * c)), (a > u || -u > a) && (this._addTween(t, n, o, o + a, n), this._overwriteProps.push(n)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
                    o = r.com.greensock,
                    s = 2 * Math.PI,
                    a = Math.PI / 2,
                    l = o._class,
                    c = function(e, i) {
                        var n = l("easing." + e, function() {}, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, n
                    },
                    u = t.register || function() {},
                    d = function(t, e, i, n, r) {
                        var o = l("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new n
                        }, !0);
                        return u(o, t), o
                    },
                    h = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    f = function(e, i) {
                        var n = l("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, r.config = function(t) {
                            return new n(t)
                        }, n
                    },
                    p = d("Back", f("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), f("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), f("BackInOut", function(t) {
                        return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    m = l("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                    }, !0),
                    g = m.prototype = new t;
                return g.constructor = m, g.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, m.ease = new m(.7, .7), g.config = m.config = function(t, e, i) {
                    return new m(t, e, i)
                }, e = l("easing.SteppedEase", function(t) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function(t) {
                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                }, g.config = e.config = function(t) {
                    return new e(t)
                }, i = l("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, n, r, o, s, a, l = e.taper || "none", c = [], u = 0, d = 0 | (e.points || 20), f = d, p = e.randomize !== !1, m = e.clamp === !0, g = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = p ? Math.random() : 1 / d * f, n = g ? g.getRatio(i) : i, "none" === l ? r = v : "out" === l ? (o = 1 - i, r = o * o * v) : "in" === l ? r = i * i * v : .5 > i ? (o = 2 * i, r = o * o * .5 * v) : (o = 2 * (1 - i), r = o * o * .5 * v), p ? n += Math.random() * r - .5 * r : f % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), c[u++] = {
                        x: i,
                        y: n
                    };
                    for (c.sort(function(t, e) {
                            return t.x - e.x
                        }), a = new h(1, 1, null), f = d; --f > -1;) s = c[f], a = new h(s.x, s.y, a);
                    this._prev = new h(0, 0, 0 !== a.t ? a : a.next)
                }, !0), g = i.prototype = new t, g.constructor = i, g.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && t <= e.t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, g.config = function(t) {
                    return new i(t)
                }, i.ease = new i, d("Bounce", c("BounceOut", function(t) {
                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), c("BounceIn", function(t) {
                    return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), c("BounceInOut", function(t) {
                    var e = .5 > t;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), d("Circ", c("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), c("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), c("CircInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), n = function(e, i, n) {
                    var r = l("easing." + e, function(t, e) {
                            this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (1 > t ? t : 1), this._p3 = this._p2 / s * (Math.asin(1 / this._p1) || 0), this._p2 = s / this._p2
                        }, !0),
                        o = r.prototype = new t;
                    return o.constructor = r, o.getRatio = i,
                        o.config = function(t, e) {
                            return new r(t, e)
                        }, r
                }, d("Elastic", n("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                }, .3), n("ElasticIn", function(t) {
                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
                }, .3), n("ElasticInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
                }, .45)), d("Expo", c("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), c("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), c("ExpoInOut", function(t) {
                    return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), d("Sine", c("SineOut", function(t) {
                    return Math.sin(t * a)
                }), c("SineIn", function(t) {
                    return -Math.cos(t * a) + 1
                }), c("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), l("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), u(r.SlowMo, "SlowMo", "ease,"), u(i, "RoughEase", "ease,"), u(e, "SteppedEase", "ease,"), p
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t, e) {
        "use strict";
        var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!i.TweenLite) {
            var n, r, o, s, a, l = function(t) {
                    var e, n = t.split("."),
                        r = i;
                    for (e = 0; e < n.length; e++) r[n[e]] = r = r[n[e]] || {};
                    return r
                },
                c = l("com.greensock"),
                u = 1e-10,
                d = function(t) {
                    var e, i = [],
                        n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]));
                    return i
                },
                h = function() {},
                f = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                p = {},
                m = function(n, r, o, s) {
                    this.sc = p[n] ? p[n].sc : [], p[n] = this, this.gsClass = null, this.func = o;
                    var a = [];
                    this.check = function(c) {
                        for (var u, d, h, f, g, v = r.length, y = v; --v > -1;)(u = p[r[v]] || new m(r[v], [])).gsClass ? (a[v] = u.gsClass, y--) : c && u.sc.push(this);
                        if (0 === y && o)
                            for (d = ("com.greensock." + n).split("."), h = d.pop(), f = l(d.join("."))[h] = this.gsClass = o.apply(o, a), s && (i[h] = f, g = "undefined" != typeof module && module.exports, !g && "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                    return f
                                }) : n === e && g && (module.exports = f)), v = 0; v < this.sc.length; v++) this.sc[v].check()
                    }, this.check(!0)
                },
                g = t._gsDefine = function(t, e, i, n) {
                    return new m(t, e, i, n)
                },
                v = c._class = function(t, e, i) {
                    return e = e || function() {}, g(t, [], function() {
                        return e
                    }, i), e
                };
            g.globals = i;
            var y = [0, 0, 1, 1],
                _ = [],
                b = v("easing.Ease", function(t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? y.concat(e) : y
                }, !0),
                w = b.map = {},
                x = b.register = function(t, e, i, n) {
                    for (var r, o, s, a, l = e.split(","), u = l.length, d = (i || "easeIn,easeOut,easeInOut").split(","); --u > -1;)
                        for (o = l[u], r = n ? v("easing." + o, null, !0) : c.easing[o] || {}, s = d.length; --s > -1;) a = d[s], w[o + "." + a] = w[a + o] = r[a] = t.getRatio ? t : t[a] || new t
                };
            for (o = b.prototype, o._calcEnd = !1, o.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
                }, n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = n.length; --r > -1;) o = n[r] + ",Power" + r, x(new b(null, null, 1, r), o, "easeOut", !0), x(new b(null, null, 2, r), o, "easeIn" + (0 === r ? ",easeNone" : "")), x(new b(null, null, 3, r), o, "easeInOut");
            w.linear = c.easing.Linear.easeIn, w.swing = c.easing.Quad.easeInOut;
            var T = v("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            o = T.prototype, o.addEventListener = function(t, e, i, n, r) {
                r = r || 0;
                var o, l, c = this._listeners[t],
                    u = 0;
                for (null == c && (this._listeners[t] = c = []), l = c.length; --l > -1;) o = c[l], o.c === e && o.s === i ? c.splice(l, 1) : 0 === u && o.pr < r && (u = l + 1);
                c.splice(u, 0, {
                    c: e,
                    s: i,
                    up: n,
                    pr: r
                }), this !== s || a || s.wake()
            }, o.removeEventListener = function(t, e) {
                var i, n = this._listeners[t];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === e) return void n.splice(i, 1)
            }, o.dispatchEvent = function(t) {
                var e, i, n, r = this._listeners[t];
                if (r)
                    for (e = r.length, i = this._eventTarget; --e > -1;) n = r[e], n && (n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var S = t.requestAnimationFrame,
                k = t.cancelAnimationFrame,
                C = Date.now || function() {
                    return (new Date).getTime()
                },
                A = C();
            for (n = ["ms", "moz", "webkit", "o"], r = n.length; --r > -1 && !S;) S = t[n[r] + "RequestAnimationFrame"], k = t[n[r] + "CancelAnimationFrame"] || t[n[r] + "CancelRequestAnimationFrame"];
            v("Ticker", function(t, e) {
                var i, n, r, o, l, c = this,
                    d = C(),
                    f = e !== !1 && S ? "auto" : !1,
                    p = 500,
                    m = 33,
                    g = "tick",
                    v = function(t) {
                        var e, s, a = C() - A;
                        a > p && (d += a - m), A += a, c.time = (A - d) / 1e3, e = c.time - l, (!i || e > 0 || t === !0) && (c.frame++, l += e + (e >= o ? .004 : o - e), s = !0), t !== !0 && (r = n(v)), s && c.dispatchEvent(g)
                    };
                T.call(c), c.time = c.frame = 0, c.tick = function() {
                    v(!0)
                }, c.lagSmoothing = function(t, e) {
                    p = t || 1 / u, m = Math.min(e, p, 0)
                }, c.sleep = function() {
                    null != r && (f && k ? k(r) : clearTimeout(r), n = h, r = null, c === s && (a = !1))
                }, c.wake = function(t) {
                    null !== r ? c.sleep() : t ? d += -A + (A = C()) : c.frame > 10 && (A = C() - p + 5), n = 0 === i ? h : f && S ? S : function(t) {
                        return setTimeout(t, 1e3 * (l - c.time) + 1 | 0)
                    }, c === s && (a = !0), v(2)
                }, c.fps = function(t) {
                    return arguments.length ? (i = t, o = 1 / (i || 60), l = this.time + o, void c.wake()) : i
                }, c.useRAF = function(t) {
                    return arguments.length ? (c.sleep(), f = t, void c.fps(i)) : f
                }, c.fps(t), setTimeout(function() {
                    "auto" === f && c.frame < 5 && "hidden" !== document.visibilityState && c.useRAF(!1)
                }, 1500)
            }), o = c.Ticker.prototype = new c.events.EventDispatcher, o.constructor = c.Ticker;
            var P = v("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, V) {
                    a || s.wake();
                    var i = this.vars.useFrames ? U : V;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            s = P.ticker = new c.Ticker, o = P.prototype, o._dirty = o._gc = o._initted = o._paused = !1, o._totalTime = o._time = 0, o._rawPrevTime = -1, o._next = o._last = o._onUpdate = o._timeline = o.timeline = null, o._paused = !1;
            var E = function() {
                a && C() - A > 2e3 && s.wake(), setTimeout(E, 2e3)
            };
            E(), o.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, o.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, o.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, o.seek = function(t, e) {
                return this.totalTime(Number(t), e !== !1)
            }, o.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
            }, o.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, o.render = function(t, e, i) {}, o.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, o.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && t < i + this.totalDuration() / this._timeScale
            }, o._enabled = function(t, e) {
                return a || s.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, o._kill = function(t, e) {
                return this._enabled(!1, !1)
            }, o.kill = function(t, e) {
                return this._kill(t, e), this
            }, o._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, o._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, o._callback = function(t) {
                var e = this.vars;
                e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || _)
            }, o.eventCallback = function(t, e, i, n) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = f(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, o.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, o.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, o.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, o.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, o.totalTime = function(t, e, i) {
                if (a || s.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (N.length && Q(), this.render(t, e, !1), N.length && Q())
                }
                return this
            }, o.progress = o.totalProgress = function(t, e) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
            }, o.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, o.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, o.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || u, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, o.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, o.paused = function(t) {
                if (!arguments.length) return this._paused;
                var e, i, n = this._timeline;
                return t != this._paused && n && (a || t || s.wake(), e = n.rawTime(), i = e - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
            };
            var O = v("core.SimpleTimeline", function(t) {
                P.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            o = O.prototype = new P, o.constructor = O, o.kill()._gc = !1, o._first = o._last = o._recent = null, o._sortChildren = !1, o.add = o.insert = function(t, e, i, n) {
                var r, o;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (o = t._startTime; r && r._startTime > o;) r = r._prev;
                return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
            }, o._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, o.render = function(t, e, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
            }, o.rawTime = function() {
                return a || s.wake(), this._totalTime
            };
            var R = v("TweenLite", function(e, i, n) {
                    if (P.call(this, i, n), this.render = R.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : R.selector(e) || e;
                    var r, o, s, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? X[R.defaultOverwrite] : "number" == typeof l ? l >> 0 : X[l], (a || e instanceof Array || e.push && f(e)) && "number" != typeof e[0])
                        for (this._targets = s = d(e), this._propLookup = [], this._siblings = [], r = 0; r < s.length; r++) o = s[r], o ? "string" != typeof o ? o.length && o !== t && o[0] && (o[0] === t || o[0].nodeType && o[0].style && !o.nodeType) ? (s.splice(r--, 1), this._targets = s = s.concat(d(o))) : (this._siblings[r] = G(o, this, !1), 1 === l && this._siblings[r].length > 1 && J(o, this, null, 1, this._siblings[r])) : (o = s[r--] = R.selector(o), "string" == typeof o && s.splice(r + 1, 1)) : s.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = G(e, this, !1), 1 === l && this._siblings.length > 1 && J(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -u, this.render(-this._delay))
                }, !0),
                I = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                D = function(t, e) {
                    var i, n = {};
                    for (i in t) W[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!H[i] || H[i] && H[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                    t.css = n
                };
            o = R.prototype = new P, o.constructor = R, o.kill()._gc = !1, o.ratio = 0, o._firstPT = o._targets = o._overwrittenProps = o._startAt = null, o._notifyPluginsOfEnabled = o._lazy = !1, R.version = "1.18.2", R.defaultEase = o._ease = new b(null, null, 1, 1), R.defaultOverwrite = "auto", R.ticker = s, R.autoSleep = 120, R.lagSmoothing = function(t, e) {
                s.lagSmoothing(t, e)
            }, R.selector = t.$ || t.jQuery || function(e) {
                var i = t.$ || t.jQuery;
                return i ? (R.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var N = [],
                j = {},
                F = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                L = function(t) {
                    for (var e, i = this._firstPT, n = 1e-6; i;) e = i.blob ? t ? this.join("") : this.start : i.c * t + i.s, i.r ? e = Math.round(e) : n > e && e > -n && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                },
                M = function(t, e, i, n) {
                    var r, o, s, a, l, c, u, d = [t, e],
                        h = 0,
                        f = "",
                        p = 0;
                    for (d.start = t, i && (i(d), t = d[0], e = d[1]), d.length = 0, r = t.match(F) || [], o = e.match(F) || [], n && (n._next = null, n.blob = 1, d._firstPT = n), l = o.length, a = 0; l > a; a++) u = o[a], c = e.substr(h, e.indexOf(u, h) - h), f += c || !a ? c : ",", h += c.length, p ? p = (p + 1) % 5 : "rgba(" === c.substr(-5) && (p = 1), u === r[a] || r.length <= a ? f += u : (f && (d.push(f), f = ""), s = parseFloat(r[a]), d.push(s), d._firstPT = {
                        _next: d._firstPT,
                        t: d,
                        p: d.length - 1,
                        s: s,
                        c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - s) || 0,
                        f: 0,
                        r: p && 4 > p
                    }), h += u.length;
                    return f += e.substr(h), f && d.push(f), d.setRatio = L, d
                },
                $ = function(t, e, i, n, r, o, s, a) {
                    var l, c, u = "get" === i ? t[e] : i,
                        d = typeof t[e],
                        h = "string" == typeof n && "=" === n.charAt(1),
                        f = {
                            t: t,
                            p: e,
                            s: u,
                            f: "function" === d,
                            pg: 0,
                            n: r || e,
                            r: o,
                            pr: 0,
                            c: h ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - u || 0
                        };
                    return "number" !== d && ("function" === d && "get" === i && (c = e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), f.s = u = s ? t[c](s) : t[c]()), "string" == typeof u && (s || isNaN(u)) ? (f.fp = s, l = M(u, n, a || R.defaultStringFilter, f), f = {
                        t: l,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: r || e,
                        pr: 0
                    }) : h || (f.s = parseFloat(u), f.c = parseFloat(n) - f.s || 0)), f.c ? ((f._next = this._firstPT) && (f._next._prev = f), this._firstPT = f, f) : void 0
                },
                z = R._internals = {
                    isArray: f,
                    isSelector: I,
                    lazyTweens: N,
                    blobDif: M
                },
                H = R._plugins = {},
                B = z.tweenLookup = {},
                q = 0,
                W = z.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1
                },
                X = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                U = P._rootFramesTimeline = new O,
                V = P._rootTimeline = new O,
                Y = 30,
                Q = z.lazyRender = function() {
                    var t, e = N.length;
                    for (j = {}; --e > -1;) t = N[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    N.length = 0
                };
            V._startTime = s.time, U._startTime = s.frame, V._active = U._active = !0, setTimeout(Q, 1), P._updateRoot = R.render = function() {
                var t, e, i;
                if (N.length && Q(), V.render((s.time - V._startTime) * V._timeScale, !1, !1), U.render((s.frame - U._startTime) * U._timeScale, !1, !1), N.length && Q(), s.frame >= Y) {
                    Y = s.frame + (parseInt(R.autoSleep, 10) || 120);
                    for (i in B) {
                        for (e = B[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete B[i]
                    }
                    if (i = V._first, (!i || i._paused) && R.autoSleep && !U._first && 1 === s._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || s.sleep()
                    }
                }
            }, s.addEventListener("tick", P._updateRoot);
            var G = function(t, e, i) {
                    var n, r, o = t._gsTweenID;
                    if (B[o || (t._gsTweenID = o = "t" + q++)] || (B[o] = {
                            target: t,
                            tweens: []
                        }), e && (n = B[o].tweens, n[r = n.length] = e, i))
                        for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return B[o].tweens
                },
                Z = function(t, e, i, n) {
                    var r, o, s = t.vars.onOverwrite;
                    return s && (r = s(t, e, i, n)), s = R.onOverwrite, s && (o = s(t, e, i, n)), r !== !1 && o !== !1
                },
                J = function(t, e, i, n, r) {
                    var o, s, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, o = 0; l > o; o++)
                            if ((a = r[o]) !== e) a._gc || a._kill(null, t, e) && (s = !0);
                            else if (5 === n) break;
                        return s
                    }
                    var c, d = e._startTime + u,
                        h = [],
                        f = 0,
                        p = 0 === e._duration;
                    for (o = r.length; --o > -1;)(a = r[o]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (c = c || K(e, 0, p), 0 === K(a, c, p) && (h[f++] = a)) : a._startTime <= d && a._startTime + a.totalDuration() / a._timeScale > d && ((p || !a._initted) && d - a._startTime <= 2e-10 || (h[f++] = a)));
                    for (o = f; --o > -1;)
                        if (a = h[o], 2 === n && a._kill(i, t, e) && (s = !0), 2 !== n || !a._firstPT && a._initted) {
                            if (2 !== n && !Z(a, e)) continue;
                            a._enabled(!1, !1) && (s = !0)
                        }
                    return s
                },
                K = function(t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, o = t._startTime; n._timeline;) {
                        if (o += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return o /= r, o > e ? o - e : i && o === e || !t._initted && 2 * u > o - e ? u : (o += t.totalDuration() / t._timeScale / r) > e + u ? 0 : o - e - u
                };
            o._init = function() {
                var t, e, i, n, r, o = this.vars,
                    s = this._overwrittenProps,
                    a = this._duration,
                    l = !!o.immediateRender,
                    c = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in o.startAt) r[n] = o.startAt[n];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = l && o.lazy !== !1, r.startAt = r.delay = null, this._startAt = R.to(this.target, 0, r), l)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== a) return
                } else if (o.runBackwards && 0 !== a)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (l = !1), i = {};
                        for (n in o) W[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && o.lazy !== !1, i.immediateRender = l, this._startAt = R.to(this.target, 0, i), l) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = c = c ? c instanceof b ? c : "function" == typeof c ? new b(c, o.easeParams) : w[c] || R.defaultEase : R.defaultEase, o.easeParams instanceof Array && c.config && (this._ease = c.config.apply(c, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], s ? s[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, s);
                if (e && R._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = o.onUpdate, this._initted = !0
            }, o._initProps = function(e, i, n, r) {
                var o, s, a, l, c, u;
                if (null == e) return !1;
                j[e._gsTweenID] && Q(), this.vars.css || e.style && e !== t && e.nodeType && H.css && this.vars.autoCSS !== !1 && D(this.vars, e);
                for (o in this.vars)
                    if (u = this.vars[o], W[o]) u && (u instanceof Array || u.push && f(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[o] = u = this._swapSelfInParams(u, this));
                    else if (H[o] && (l = new H[o])._onInitTween(e, this.vars[o], this)) {
                    for (this._firstPT = c = {
                            _next: this._firstPT,
                            t: l,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: l._priority
                        }, s = l._overwriteProps.length; --s > -1;) i[l._overwriteProps[s]] = this._firstPT;
                    (l._priority || l._onInitAllProps) && (a = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0), c._next && (c._next._prev = c)
                } else i[o] = $.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter);
                return r && this._kill(r, e) ? this._initProps(e, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && J(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (j[e._gsTweenID] = !0), a)
            }, o.render = function(t, e, i) {
                var n, r, o, s, a = this._time,
                    l = this._duration,
                    c = this._rawPrevTime;
                if (t >= l - 1e-7) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > c || 0 >= t && t >= -1e-7 || c === u && "isPause" !== this.data) && c !== t && (i = !0, c > u && (r = "onReverseComplete")), this._rawPrevTime = s = !e || t || c === t ? t : u);
                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && c > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (c >= 0 && (c !== u || "isPause" !== this.data) && (i = !0), this._rawPrevTime = s = !e || t || c === t ? t : u)), this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var d = t / l,
                        h = this._easeType,
                        f = this._easePower;
                    (1 === h || 3 === h && d >= .5) && (d = 1 - d), 3 === h && (d *= 2), 1 === f ? d *= d : 2 === f ? d *= d * d : 3 === f ? d *= d * d * d : 4 === f && (d *= d * d * d * d), 1 === h ? this.ratio = 1 - d : 2 === h ? this.ratio = d : .5 > t / l ? this.ratio = d / 2 : this.ratio = 1 - d / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== a || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = c, N.push(this), void(this._lazy = [t, e]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                    this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== a || n) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === u && s !== u && (this._rawPrevTime = 0))
                }
            }, o._kill = function(t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : R.selector(e) || e;
                var n, r, o, s, a, l, c, u, d, h = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((f(e) || I(e)) && "number" != typeof e[0])
                    for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (e === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (c = t || a, u = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (R.onOverwrite || this.vars.onOverwrite)) {
                            for (o in c) a[o] && (d || (d = []), d.push(o));
                            if ((d || !t) && !Z(this, i, e, d)) return !1
                        }
                        for (o in c)(s = a[o]) && (h && (s.f ? s.t[s.p](s.s) : s.t[s.p] = s.s, l = !0), s.pg && s.t._kill(c) && (l = !0), s.pg && 0 !== s.t._overwriteProps.length || (s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null), delete a[o]), u && (r[o] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, o.invalidate = function() {
                return this._notifyPluginsOfEnabled && R._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], P.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -u, this.render(-this._delay)), this
            }, o._enabled = function(t, e) {
                if (a || s.wake(), t && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = G(n[i], this, !0);
                    else this._siblings = G(this.target, this, !0)
                }
                return P.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? R._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
            }, R.to = function(t, e, i) {
                return new R(t, e, i)
            }, R.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new R(t, e, i)
            }, R.fromTo = function(t, e, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new R(t, e, n)
            }, R.delayedCall = function(t, e, i, n, r) {
                return new R(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, R.set = function(t, e) {
                return new R(t, 0, e)
            }, R.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : R.selector(t) || t;
                var i, n, r, o;
                if ((f(t) || I(t)) && "number" != typeof t[0]) {
                    for (i = t.length, n = []; --i > -1;) n = n.concat(R.getTweensOf(t[i], e));
                    for (i = n.length; --i > -1;)
                        for (o = n[i], r = i; --r > -1;) o === n[r] && n.splice(i, 1)
                } else
                    for (n = G(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                return n
            }, R.killTweensOf = R.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var n = R.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
            };
            var tt = v("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = tt.prototype
            }, !0);
            if (o = tt.prototype, tt.version = "1.18.0", tt.API = 2, o._firstPT = null, o._addTween = $, o.setRatio = L, o._kill = function(t) {
                    var e, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, o._roundProps = function(t, e) {
                    for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
                }, R._onPluginEvent = function(t, e) {
                    var i, n, r, o, s, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (s = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : o) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : o = a, a = s
                        }
                        a = e._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                    return i
                }, tt.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === tt.API && (H[(new t[e])._propName] = t[e]);
                    return !0
                }, g.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        n = t.priority || 0,
                        r = t.overwriteProps,
                        o = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        s = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            tt.call(this, i, n), this._overwriteProps = r || []
                        }, t.global === !0),
                        a = s.prototype = new tt(i);
                    a.constructor = s, s.API = t.API;
                    for (e in o) "function" == typeof t[e] && (a[o[e]] = t[e]);
                    return s.version = t.version, tt.activate([s]), s
                }, n = t._gsQueue) {
                for (r = 0; r < n.length; r++) n[r]();
                for (o in p) p[o].func || t.console.log("GSAP encountered missing dependency: com.greensock." + o)
            }
            a = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"),
    function(t, e) {
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.ScrollMagic = e()
    }(this, function() {
        "use strict";
        var t = function() {
            r.log(2, "(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")
        };
        t.version = "2.0.5", window.addEventListener("mousewheel", function() {});
        var e = "data-scrollmagic-pin-spacer";
        t.Controller = function(n) {
            var o, s, a = "ScrollMagic.Controller",
                l = "FORWARD",
                c = "REVERSE",
                u = "PAUSED",
                d = i.defaults,
                h = this,
                f = r.extend({}, d, n),
                p = [],
                m = !1,
                g = 0,
                v = u,
                y = !0,
                _ = 0,
                b = !0,
                w = function() {
                    for (var e in f) d.hasOwnProperty(e) || (O(2, 'WARNING: Unknown option "' + e + '"'), delete f[e]);
                    if (f.container = r.get.elements(f.container)[0], !f.container) throw O(1, "ERROR creating object " + a + ": No valid scroll container supplied"), a + " init failed.";
                    y = f.container === window || f.container === document.body || !document.body.contains(f.container), y && (f.container = window), _ = S(), f.container.addEventListener("resize", P), f.container.addEventListener("scroll", P), f.refreshInterval = parseInt(f.refreshInterval) || d.refreshInterval, x(), O(3, "added new " + a + " controller (v" + t.version + ")")
                },
                x = function() {
                    f.refreshInterval > 0 && (s = window.setTimeout(E, f.refreshInterval))
                },
                T = function() {
                    return f.vertical ? r.get.scrollTop(f.container) : r.get.scrollLeft(f.container)
                },
                S = function() {
                    return f.vertical ? r.get.height(f.container) : r.get.width(f.container)
                },
                k = this._setScrollPos = function(t) {
                    f.vertical ? y ? window.scrollTo(r.get.scrollLeft(), t) : f.container.scrollTop = t : y ? window.scrollTo(t, r.get.scrollTop()) : f.container.scrollLeft = t
                },
                C = function() {
                    if (b && m) {
                        var t = r.type.Array(m) ? m : p.slice(0);
                        m = !1;
                        var e = g;
                        g = h.scrollPos();
                        var i = g - e;
                        0 !== i && (v = i > 0 ? l : c), v === c && t.reverse(), t.forEach(function(e, i) {
                            O(3, "updating Scene " + (i + 1) + "/" + t.length + " (" + p.length + " total)"), e.update(!0)
                        }), 0 === t.length && f.loglevel >= 3 && O(3, "updating 0 Scenes (nothing added to controller)")
                    }
                },
                A = function() {
                    o = r.rAF(C)
                },
                P = function(t) {
                    O(3, "event fired causing an update:", t.type), "resize" == t.type && (_ = S(), v = u), m !== !0 && (m = !0, A())
                },
                E = function() {
                    if (!y && _ != S()) {
                        var t;
                        try {
                            t = new Event("resize", {
                                bubbles: !1,
                                cancelable: !1
                            })
                        } catch (e) {
                            t = document.createEvent("Event"), t.initEvent("resize", !1, !1)
                        }
                        f.container.dispatchEvent(t)
                    }
                    p.forEach(function(t, e) {
                        t.refresh()
                    }), x()
                },
                O = this._log = function(t, e) {
                    f.loglevel >= t && (Array.prototype.splice.call(arguments, 1, 0, "(" + a + ") ->"), r.log.apply(window, arguments))
                };
            this._options = f;
            var R = function(t) {
                if (t.length <= 1) return t;
                var e = t.slice(0);
                return e.sort(function(t, e) {
                    return t.scrollOffset() > e.scrollOffset() ? 1 : -1
                }), e
            };
            return this.addScene = function(e) {
                if (r.type.Array(e)) e.forEach(function(t, e) {
                    h.addScene(t)
                });
                else if (e instanceof t.Scene) {
                    if (e.controller() !== h) e.addTo(h);
                    else if (p.indexOf(e) < 0) {
                        p.push(e), p = R(p), e.on("shift.controller_sort", function() {
                            p = R(p)
                        });
                        for (var i in f.globalSceneOptions) e[i] && e[i].call(e, f.globalSceneOptions[i]);
                        O(3, "adding Scene (now " + p.length + " total)")
                    }
                } else O(1, "ERROR: invalid argument supplied for '.addScene()'");
                return h
            }, this.removeScene = function(t) {
                if (r.type.Array(t)) t.forEach(function(t, e) {
                    h.removeScene(t)
                });
                else {
                    var e = p.indexOf(t);
                    e > -1 && (t.off("shift.controller_sort"), p.splice(e, 1), O(3, "removing Scene (now " + p.length + " left)"), t.remove())
                }
                return h
            }, this.updateScene = function(e, i) {
                return r.type.Array(e) ? e.forEach(function(t, e) {
                    h.updateScene(t, i)
                }) : i ? e.update(!0) : m !== !0 && e instanceof t.Scene && (m = m || [], -1 == m.indexOf(e) && m.push(e), m = R(m), A()), h
            }, this.update = function(t) {
                return P({
                    type: "resize"
                }), t && C(), h
            }, this.scrollTo = function(i, n) {
                if (r.type.Number(i)) k.call(f.container, i, n);
                else if (i instanceof t.Scene) i.controller() === h ? h.scrollTo(i.scrollOffset(), n) : O(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", i);
                else if (r.type.Function(i)) k = i;
                else {
                    var o = r.get.elements(i)[0];
                    if (o) {
                        for (; o.parentNode.hasAttribute(e);) o = o.parentNode;
                        var s = f.vertical ? "top" : "left",
                            a = r.get.offset(f.container),
                            l = r.get.offset(o);
                        y || (a[s] -= h.scrollPos()), h.scrollTo(l[s] - a[s], n)
                    } else O(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", i)
                }
                return h
            }, this.scrollPos = function(t) {
                return arguments.length ? (r.type.Function(t) ? T = t : O(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."), h) : T.call(h)
            }, this.info = function(t) {
                var e = {
                    size: _,
                    vertical: f.vertical,
                    scrollPos: g,
                    scrollDirection: v,
                    container: f.container,
                    isDocument: y
                };
                return arguments.length ? void 0 !== e[t] ? e[t] : void O(1, 'ERROR: option "' + t + '" is not available') : e
            }, this.loglevel = function(t) {
                return arguments.length ? (f.loglevel != t && (f.loglevel = t), h) : f.loglevel
            }, this.enabled = function(t) {
                return arguments.length ? (b != t && (b = !!t, h.updateScene(p, !0)), h) : b
            }, this.destroy = function(t) {
                window.clearTimeout(s);
                for (var e = p.length; e--;) p[e].destroy(t);
                return f.container.removeEventListener("resize", P), f.container.removeEventListener("scroll", P), r.cAF(o), O(3, "destroyed " + a + " (reset: " + (t ? "true" : "false") + ")"), null;
            }, w(), h
        };
        var i = {
            defaults: {
                container: window,
                vertical: !0,
                globalSceneOptions: {},
                loglevel: 2,
                refreshInterval: 100
            }
        };
        t.Controller.addOption = function(t, e) {
            i.defaults[t] = e
        }, t.Controller.extend = function(e) {
            var i = this;
            t.Controller = function() {
                return i.apply(this, arguments), this.$super = r.extend({}, this), e.apply(this, arguments) || this
            }, r.extend(t.Controller, i), t.Controller.prototype = i.prototype, t.Controller.prototype.constructor = t.Controller
        }, t.Scene = function(i) {
            var o, s, a = "ScrollMagic.Scene",
                l = "BEFORE",
                c = "DURING",
                u = "AFTER",
                d = n.defaults,
                h = this,
                f = r.extend({}, d, i),
                p = l,
                m = 0,
                g = {
                    start: 0,
                    end: 0
                },
                v = 0,
                y = !0,
                _ = function() {
                    for (var t in f) d.hasOwnProperty(t) || (w(2, 'WARNING: Unknown option "' + t + '"'), delete f[t]);
                    for (var e in d) E(e);
                    A()
                },
                b = {};
            this.on = function(t, e) {
                return r.type.Function(e) ? (t = t.trim().split(" "), t.forEach(function(t) {
                    var i = t.split("."),
                        n = i[0],
                        r = i[1];
                    "*" != n && (b[n] || (b[n] = []), b[n].push({
                        namespace: r || "",
                        callback: e
                    }))
                })) : w(1, "ERROR when calling '.on()': Supplied callback for '" + t + "' is not a valid function!"), h
            }, this.off = function(t, e) {
                return t ? (t = t.trim().split(" "), t.forEach(function(t, i) {
                    var n = t.split("."),
                        r = n[0],
                        o = n[1] || "",
                        s = "*" === r ? Object.keys(b) : [r];
                    s.forEach(function(t) {
                        for (var i = b[t] || [], n = i.length; n--;) {
                            var r = i[n];
                            !r || o !== r.namespace && "*" !== o || e && e != r.callback || i.splice(n, 1)
                        }
                        i.length || delete b[t]
                    })
                }), h) : (w(1, "ERROR: Invalid event name supplied."), h)
            }, this.trigger = function(e, i) {
                if (e) {
                    var n = e.trim().split("."),
                        r = n[0],
                        o = n[1],
                        s = b[r];
                    w(3, "event fired:", r, i ? "->" : "", i || ""), s && s.forEach(function(e, n) {
                        o && o !== e.namespace || e.callback.call(h, new t.Event(r, e.namespace, h, i))
                    })
                } else w(1, "ERROR: Invalid event name supplied.");
                return h
            }, h.on("change.internal", function(t) {
                "loglevel" !== t.what && "tweenChanges" !== t.what && ("triggerElement" === t.what ? S() : "reverse" === t.what && h.update())
            }).on("shift.internal", function(t) {
                x(), h.update()
            });
            var w = this._log = function(t, e) {
                f.loglevel >= t && (Array.prototype.splice.call(arguments, 1, 0, "(" + a + ") ->"), r.log.apply(window, arguments))
            };
            this.addTo = function(e) {
                return e instanceof t.Controller ? s != e && (s && s.removeScene(h), s = e, A(), T(!0), S(!0), x(), s.info("container").addEventListener("resize", k), e.addScene(h), h.trigger("add", {
                    controller: s
                }), w(3, "added " + a + " to controller"), h.update()) : w(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"), h
            }, this.enabled = function(t) {
                return arguments.length ? (y != t && (y = !!t, h.update(!0)), h) : y
            }, this.remove = function() {
                if (s) {
                    s.info("container").removeEventListener("resize", k);
                    var t = s;
                    s = void 0, t.removeScene(h), h.trigger("remove"), w(3, "removed " + a + " from controller")
                }
                return h
            }, this.destroy = function(t) {
                return h.trigger("destroy", {
                    reset: t
                }), h.remove(), h.off("*.*"), w(3, "destroyed " + a + " (reset: " + (t ? "true" : "false") + ")"), null
            }, this.update = function(t) {
                if (s)
                    if (t)
                        if (s.enabled() && y) {
                            var e, i = s.info("scrollPos");
                            e = f.duration > 0 ? (i - g.start) / (g.end - g.start) : i >= g.start ? 1 : 0, h.trigger("update", {
                                startPos: g.start,
                                endPos: g.end,
                                scrollPos: i
                            }), h.progress(e)
                        } else O && p === c && I(!0);
                else s.updateScene(h, !1);
                return h
            }, this.refresh = function() {
                return T(), S(), h
            }, this.progress = function(t) {
                if (arguments.length) {
                    var e = !1,
                        i = p,
                        n = s ? s.info("scrollDirection") : "PAUSED",
                        r = f.reverse || t >= m;
                    if (0 === f.duration ? (e = m != t, m = 1 > t && r ? 0 : 1, p = 0 === m ? l : c) : 0 > t && p !== l && r ? (m = 0, p = l, e = !0) : t >= 0 && 1 > t && r ? (m = t, p = c, e = !0) : t >= 1 && p !== u ? (m = 1, p = u, e = !0) : p !== c || r || I(), e) {
                        var o = {
                                progress: m,
                                state: p,
                                scrollDirection: n
                            },
                            a = p != i,
                            d = function(t) {
                                h.trigger(t, o)
                            };
                        a && i !== c && (d("enter"), d(i === l ? "start" : "end")), d("progress"), a && p !== c && (d(p === l ? "start" : "end"), d("leave"))
                    }
                    return h
                }
                return m
            };
            var x = function() {
                    g = {
                        start: v + f.offset
                    }, s && f.triggerElement && (g.start -= s.info("size") * f.triggerHook), g.end = g.start + f.duration
                },
                T = function(t) {
                    if (o) {
                        var e = "duration";
                        P(e, o.call(h)) && !t && (h.trigger("change", {
                            what: e,
                            newval: f[e]
                        }), h.trigger("shift", {
                            reason: e
                        }))
                    }
                },
                S = function(t) {
                    var i = 0,
                        n = f.triggerElement;
                    if (s && n) {
                        for (var o = s.info(), a = r.get.offset(o.container), l = o.vertical ? "top" : "left"; n.parentNode.hasAttribute(e);) n = n.parentNode;
                        var c = r.get.offset(n);
                        o.isDocument || (a[l] -= s.scrollPos()), i = c[l] - a[l]
                    }
                    var u = i != v;
                    v = i, u && !t && h.trigger("shift", {
                        reason: "triggerElementPosition"
                    })
                },
                k = function(t) {
                    f.triggerHook > 0 && h.trigger("shift", {
                        reason: "containerResize"
                    })
                },
                C = r.extend(n.validate, {
                    duration: function(t) {
                        if (r.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
                            var e = parseFloat(t) / 100;
                            t = function() {
                                return s ? s.info("size") * e : 0
                            }
                        }
                        if (r.type.Function(t)) {
                            o = t;
                            try {
                                t = parseFloat(o())
                            } catch (i) {
                                t = -1
                            }
                        }
                        if (t = parseFloat(t), !r.type.Number(t) || 0 > t) throw o ? (o = void 0, ['Invalid return value of supplied function for option "duration":', t]) : ['Invalid value for option "duration":', t];
                        return t
                    }
                }),
                A = function(t) {
                    t = arguments.length ? [t] : Object.keys(C), t.forEach(function(t, e) {
                        var i;
                        if (C[t]) try {
                            i = C[t](f[t])
                        } catch (n) {
                            i = d[t];
                            var o = r.type.String(n) ? [n] : n;
                            r.type.Array(o) ? (o[0] = "ERROR: " + o[0], o.unshift(1), w.apply(this, o)) : w(1, "ERROR: Problem executing validation callback for option '" + t + "':", n.message)
                        } finally {
                            f[t] = i
                        }
                    })
                },
                P = function(t, e) {
                    var i = !1,
                        n = f[t];
                    return f[t] != e && (f[t] = e, A(t), i = n != f[t]), i
                },
                E = function(t) {
                    h[t] || (h[t] = function(e) {
                        return arguments.length ? ("duration" === t && (o = void 0), P(t, e) && (h.trigger("change", {
                            what: t,
                            newval: f[t]
                        }), n.shifts.indexOf(t) > -1 && h.trigger("shift", {
                            reason: t
                        })), h) : f[t]
                    })
                };
            this.controller = function() {
                return s
            }, this.state = function() {
                return p
            }, this.scrollOffset = function() {
                return g.start
            }, this.triggerPosition = function() {
                var t = f.offset;
                return s && (t += f.triggerElement ? v : s.info("size") * h.triggerHook()), t
            };
            var O, R;
            h.on("shift.internal", function(t) {
                var e = "duration" === t.reason;
                (p === u && e || p === c && 0 === f.duration) && I(), e && D()
            }).on("progress.internal", function(t) {
                I()
            }).on("add.internal", function(t) {
                D()
            }).on("destroy.internal", function(t) {
                h.removePin(t.reset)
            });
            var I = function(t) {
                    if (O && s) {
                        var e = s.info(),
                            i = R.spacer.firstChild;
                        if (t || p !== c) {
                            var n = {
                                    position: R.inFlow ? "relative" : "absolute",
                                    top: 0,
                                    left: 0
                                },
                                o = r.css(i, "position") != n.position;
                            R.pushFollowers ? f.duration > 0 && (p === u && 0 === parseFloat(r.css(R.spacer, "padding-top")) ? o = !0 : p === l && 0 === parseFloat(r.css(R.spacer, "padding-bottom")) && (o = !0)) : n[e.vertical ? "top" : "left"] = f.duration * m, r.css(i, n), o && D()
                        } else {
                            "fixed" != r.css(i, "position") && (r.css(i, {
                                position: "fixed"
                            }), D());
                            var a = r.get.offset(R.spacer, !0),
                                d = f.reverse || 0 === f.duration ? e.scrollPos - g.start : Math.round(m * f.duration * 10) / 10;
                            a[e.vertical ? "top" : "left"] += d, r.css(R.spacer.firstChild, {
                                top: a.top,
                                left: a.left
                            })
                        }
                    }
                },
                D = function() {
                    if (O && s && R.inFlow) {
                        var t = p === c,
                            e = s.info("vertical"),
                            i = R.spacer.firstChild,
                            n = r.isMarginCollapseType(r.css(R.spacer, "display")),
                            o = {};
                        R.relSize.width || R.relSize.autoFullWidth ? t ? r.css(O, {
                            width: r.get.width(R.spacer)
                        }) : r.css(O, {
                            width: "100%"
                        }) : (o["min-width"] = r.get.width(e ? O : i, !0, !0), o.width = t ? o["min-width"] : "auto"), R.relSize.height ? t ? r.css(O, {
                            height: r.get.height(R.spacer) - (R.pushFollowers ? f.duration : 0)
                        }) : r.css(O, {
                            height: "100%"
                        }) : (o["min-height"] = r.get.height(e ? i : O, !0, !n), o.height = t ? o["min-height"] : "auto"), R.pushFollowers && (o["padding" + (e ? "Top" : "Left")] = f.duration * m, o["padding" + (e ? "Bottom" : "Right")] = f.duration * (1 - m)), r.css(R.spacer, o)
                    }
                },
                N = function() {
                    s && O && p === c && !s.info("isDocument") && I()
                },
                j = function() {
                    s && O && p === c && ((R.relSize.width || R.relSize.autoFullWidth) && r.get.width(window) != r.get.width(R.spacer.parentNode) || R.relSize.height && r.get.height(window) != r.get.height(R.spacer.parentNode)) && D()
                },
                F = function(t) {
                    s && O && p === c && !s.info("isDocument") && (t.preventDefault(), s._setScrollPos(s.info("scrollPos") - ((t.wheelDelta || t[s.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -t.detail)))
                };
            this.setPin = function(t, i) {
                var n = {
                    pushFollowers: !0,
                    spacerClass: "scrollmagic-pin-spacer"
                };
                if (i = r.extend({}, n, i), t = r.get.elements(t)[0], !t) return w(1, "ERROR calling method 'setPin()': Invalid pin element supplied."), h;
                if ("fixed" === r.css(t, "position")) return w(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."), h;
                if (O) {
                    if (O === t) return h;
                    h.removePin()
                }
                O = t;
                var o = O.parentNode.style.display,
                    s = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                O.parentNode.style.display = "none";
                var a = "absolute" != r.css(O, "position"),
                    l = r.css(O, s.concat(["display"])),
                    c = r.css(O, ["width", "height"]);
                O.parentNode.style.display = o, !a && i.pushFollowers && (w(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."), i.pushFollowers = !1), window.setTimeout(function() {
                    O && 0 === f.duration && i.pushFollowers && w(2, "WARNING: pushFollowers =", !0, "has no effect, when scene duration is 0.")
                }, 0);
                var u = O.parentNode.insertBefore(document.createElement("div"), O),
                    d = r.extend(l, {
                        position: a ? "relative" : "absolute",
                        boxSizing: "content-box",
                        mozBoxSizing: "content-box",
                        webkitBoxSizing: "content-box"
                    });
                if (a || r.extend(d, r.css(O, ["width", "height"])), r.css(u, d), u.setAttribute(e, ""), r.addClass(u, i.spacerClass), R = {
                        spacer: u,
                        relSize: {
                            width: "%" === c.width.slice(-1),
                            height: "%" === c.height.slice(-1),
                            autoFullWidth: "auto" === c.width && a && r.isMarginCollapseType(l.display)
                        },
                        pushFollowers: i.pushFollowers,
                        inFlow: a
                    }, !O.___origStyle) {
                    O.___origStyle = {};
                    var p = O.style,
                        m = s.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
                    m.forEach(function(t) {
                        O.___origStyle[t] = p[t] || ""
                    })
                }
                return R.relSize.width && r.css(u, {
                    width: c.width
                }), R.relSize.height && r.css(u, {
                    height: c.height
                }), u.appendChild(O), r.css(O, {
                    position: a ? "relative" : "absolute",
                    margin: "auto",
                    top: "auto",
                    left: "auto",
                    bottom: "auto",
                    right: "auto"
                }), (R.relSize.width || R.relSize.autoFullWidth) && r.css(O, {
                    boxSizing: "border-box",
                    mozBoxSizing: "border-box",
                    webkitBoxSizing: "border-box"
                }), window.addEventListener("scroll", N), window.addEventListener("resize", N), window.addEventListener("resize", j), O.addEventListener("mousewheel", F), O.addEventListener("DOMMouseScroll", F), w(3, "added pin"), I(), h
            }, this.removePin = function(t) {
                if (O) {
                    if (p === c && I(!0), t || !s) {
                        var i = R.spacer.firstChild;
                        if (i.hasAttribute(e)) {
                            var n = R.spacer.style,
                                o = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                            margins = {}, o.forEach(function(t) {
                                margins[t] = n[t] || ""
                            }), r.css(i, margins)
                        }
                        R.spacer.parentNode.insertBefore(i, R.spacer), R.spacer.parentNode.removeChild(R.spacer), O.parentNode.hasAttribute(e) || (r.css(O, O.___origStyle), delete O.___origStyle)
                    }
                    window.removeEventListener("scroll", N), window.removeEventListener("resize", N), window.removeEventListener("resize", j), O.removeEventListener("mousewheel", F), O.removeEventListener("DOMMouseScroll", F), O = void 0, w(3, "removed pin (reset: " + (t ? "true" : "false") + ")")
                }
                return h
            };
            var L, M = [];
            return h.on("destroy.internal", function(t) {
                h.removeClassToggle(t.reset)
            }), this.setClassToggle = function(t, e) {
                var i = r.get.elements(t);
                return 0 !== i.length && r.type.String(e) ? (M.length > 0 && h.removeClassToggle(), L = e, M = i, h.on("enter.internal_class leave.internal_class", function(t) {
                    var e = "enter" === t.type ? r.addClass : r.removeClass;
                    M.forEach(function(t, i) {
                        e(t, L)
                    })
                }), h) : (w(1, "ERROR calling method 'setClassToggle()': Invalid " + (0 === i.length ? "element" : "classes") + " supplied."), h)
            }, this.removeClassToggle = function(t) {
                return t && M.forEach(function(t, e) {
                    r.removeClass(t, L)
                }), h.off("start.internal_class end.internal_class"), L = void 0, M = [], h
            }, _(), h
        };
        var n = {
            defaults: {
                duration: 0,
                offset: 0,
                triggerElement: void 0,
                triggerHook: .5,
                reverse: !0,
                loglevel: 2
            },
            validate: {
                offset: function(t) {
                    if (t = parseFloat(t), !r.type.Number(t)) throw ['Invalid value for option "offset":', t];
                    return t
                },
                triggerElement: function(t) {
                    if (t = t || void 0) {
                        var e = r.get.elements(t)[0];
                        if (!e) throw ['Element defined in option "triggerElement" was not found:', t];
                        t = e
                    }
                    return t
                },
                triggerHook: function(t) {
                    var e = {
                        onCenter: .5,
                        onEnter: 1,
                        onLeave: 0
                    };
                    if (r.type.Number(t)) t = Math.max(0, Math.min(parseFloat(t), 1));
                    else {
                        if (!(t in e)) throw ['Invalid value for option "triggerHook": ', t];
                        t = e[t]
                    }
                    return t
                },
                reverse: function(t) {
                    return !!t
                },
                loglevel: function(t) {
                    if (t = parseInt(t), !r.type.Number(t) || 0 > t || t > 3) throw ['Invalid value for option "loglevel":', t];
                    return t
                }
            },
            shifts: ["duration", "offset", "triggerHook"]
        };
        t.Scene.addOption = function(e, i, r, o) {
            e in n.defaults ? t._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + e + "', because it already exists.") : (n.defaults[e] = i, n.validate[e] = r, o && n.shifts.push(e))
        }, t.Scene.extend = function(e) {
            var i = this;
            t.Scene = function() {
                return i.apply(this, arguments), this.$super = r.extend({}, this), e.apply(this, arguments) || this
            }, r.extend(t.Scene, i), t.Scene.prototype = i.prototype, t.Scene.prototype.constructor = t.Scene
        }, t.Event = function(t, e, i, n) {
            n = n || {};
            for (var r in n) this[r] = n[r];
            return this.type = t, this.target = this.currentTarget = i, this.namespace = e || "", this.timeStamp = this.timestamp = Date.now(), this
        };
        var r = t._util = function(t) {
            var e, i = {},
                n = function(t) {
                    return parseFloat(t) || 0
                },
                r = function(e) {
                    return e.currentStyle ? e.currentStyle : t.getComputedStyle(e)
                },
                o = function(e, i, o, s) {
                    if (i = i === document ? t : i, i === t) s = !1;
                    else if (!p.DomElement(i)) return 0;
                    e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
                    var a = (o ? i["offset" + e] || i["outer" + e] : i["client" + e] || i["inner" + e]) || 0;
                    if (o && s) {
                        var l = r(i);
                        a += "Height" === e ? n(l.marginTop) + n(l.marginBottom) : n(l.marginLeft) + n(l.marginRight)
                    }
                    return a
                },
                s = function(t) {
                    return t.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(t) {
                        return t[1].toUpperCase()
                    })
                };
            i.extend = function(t) {
                for (t = t || {}, e = 1; e < arguments.length; e++)
                    if (arguments[e])
                        for (var i in arguments[e]) arguments[e].hasOwnProperty(i) && (t[i] = arguments[e][i]);
                return t
            }, i.isMarginCollapseType = function(t) {
                return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(t) > -1
            };
            var a = 0,
                l = ["ms", "moz", "webkit", "o"],
                c = t.requestAnimationFrame,
                u = t.cancelAnimationFrame;
            for (e = 0; !c && e < l.length; ++e) c = t[l[e] + "RequestAnimationFrame"], u = t[l[e] + "CancelAnimationFrame"] || t[l[e] + "CancelRequestAnimationFrame"];
            c || (c = function(e) {
                var i = (new Date).getTime(),
                    n = Math.max(0, 16 - (i - a)),
                    r = t.setTimeout(function() {
                        e(i + n)
                    }, n);
                return a = i + n, r
            }), u || (u = function(e) {
                t.clearTimeout(e)
            }), i.rAF = c.bind(t), i.cAF = u.bind(t);
            var d = ["error", "warn", "log"],
                h = t.console || {};
            for (h.log = h.log || function() {}, e = 0; e < d.length; e++) {
                var f = d[e];
                h[f] || (h[f] = h.log)
            }
            i.log = function(t) {
                (t > d.length || 0 >= t) && (t = d.length);
                var e = new Date,
                    i = ("0" + e.getHours()).slice(-2) + ":" + ("0" + e.getMinutes()).slice(-2) + ":" + ("0" + e.getSeconds()).slice(-2) + ":" + ("00" + e.getMilliseconds()).slice(-3),
                    n = d[t - 1],
                    r = Array.prototype.splice.call(arguments, 1),
                    o = Function.prototype.bind.call(h[n], h);
                r.unshift(i), o.apply(h, r)
            };
            var p = i.type = function(t) {
                return Object.prototype.toString.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
            };
            p.String = function(t) {
                return "string" === p(t)
            }, p.Function = function(t) {
                return "function" === p(t)
            }, p.Array = function(t) {
                return Array.isArray(t)
            }, p.Number = function(t) {
                return !p.Array(t) && t - parseFloat(t) + 1 >= 0
            }, p.DomElement = function(t) {
                return "object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName
            };
            var m = i.get = {};
            return m.elements = function(e) {
                var i = [];
                if (p.String(e)) try {
                    e = document.querySelectorAll(e)
                } catch (n) {
                    return i
                }
                if ("nodelist" === p(e) || p.Array(e))
                    for (var r = 0, o = i.length = e.length; o > r; r++) {
                        var s = e[r];
                        i[r] = p.DomElement(s) ? s : m.elements(s)
                    } else(p.DomElement(e) || e === document || e === t) && (i = [e]);
                return i
            }, m.scrollTop = function(e) {
                return e && "number" == typeof e.scrollTop ? e.scrollTop : t.pageYOffset || 0
            }, m.scrollLeft = function(e) {
                return e && "number" == typeof e.scrollLeft ? e.scrollLeft : t.pageXOffset || 0
            }, m.width = function(t, e, i) {
                return o("width", t, e, i)
            }, m.height = function(t, e, i) {
                return o("height", t, e, i)
            }, m.offset = function(t, e) {
                var i = {
                    top: 0,
                    left: 0
                };
                if (t && t.getBoundingClientRect) {
                    var n = t.getBoundingClientRect();
                    i.top = n.top, i.left = n.left, e || (i.top += m.scrollTop(), i.left += m.scrollLeft())
                }
                return i
            }, i.addClass = function(t, e) {
                e && (t.classList ? t.classList.add(e) : t.className += " " + e)
            }, i.removeClass = function(t, e) {
                e && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "))
            }, i.css = function(t, e) {
                if (p.String(e)) return r(t)[s(e)];
                if (p.Array(e)) {
                    var i = {},
                        n = r(t);
                    return e.forEach(function(t, e) {
                        i[t] = n[s(t)]
                    }), i
                }
                for (var o in e) {
                    var a = e[o];
                    a == parseFloat(a) && (a += "px"), t.style[s(o)] = a
                }
            }, i
        }(window || {});
        return t.Scene.prototype.addIndicators = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this
        }, t.Scene.prototype.removeIndicators = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this
        }, t.Scene.prototype.setTween = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this
        }, t.Scene.prototype.removeTween = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this
        }, t.Scene.prototype.setVelocity = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this
        }, t.Scene.prototype.removeVelocity = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this
        }, t
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["ScrollMagic", "TweenMax", "TimelineMax"], e) : "object" == typeof exports ? (require("gsap"), e(require("scrollmagic"), TweenMax, TimelineMax)) : e(t.ScrollMagic || t.jQuery && t.jQuery.ScrollMagic, t.TweenMax || t.TweenLite, t.TimelineMax || t.TimelineLite)
    }(this, function(t, e, i) {
        "use strict";
        var n = "animation.gsap",
            r = window.console || {},
            o = Function.prototype.bind.call(r.error || r.log || function() {}, r);
        t || o("(" + n + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs."), e || o("(" + n + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs."), t.Scene.addOption("tweenChanges", !1, function(t) {
            return !!t
        }), t.Scene.extend(function() {
            var t, r = this,
                o = function() {
                    r._log && (Array.prototype.splice.call(arguments, 1, 0, "(" + n + ")", "->"), r._log.apply(this, arguments))
                };
            r.on("progress.plugin_gsap", function() {
                s()
            }), r.on("destroy.plugin_gsap", function(t) {
                r.removeTween(t.reset)
            });
            var s = function() {
                if (t) {
                    var e = r.progress(),
                        i = r.state();
                    t.repeat && -1 === t.repeat() ? "DURING" === i && t.paused() ? t.play() : "DURING" === i || t.paused() || t.pause() : e != t.progress() && (0 === r.duration() ? e > 0 ? t.play() : t.reverse() : r.tweenChanges() && t.tweenTo ? t.tweenTo(e * t.duration()) : t.progress(e).pause())
                }
            };
            r.setTween = function(n, a, l) {
                var c;
                arguments.length > 1 && (arguments.length < 3 && (l = a, a = 1), n = e.to(n, a, l));
                try {
                    c = i ? new i({
                        smoothChildTiming: !0
                    }).add(n) : n, c.pause()
                } catch (u) {
                    return o(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject"), r
                }
                if (t && r.removeTween(), t = c, n.repeat && -1 === n.repeat() && (t.repeat(-1), t.yoyo(n.yoyo())), r.tweenChanges() && !t.tweenTo && o(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic."), t && r.controller() && r.triggerElement() && r.loglevel() >= 2) {
                    var d = e.getTweensOf(r.triggerElement()),
                        h = r.controller().info("vertical");
                    d.forEach(function(t, e) {
                        var i = t.vars.css || t.vars,
                            n = h ? void 0 !== i.top || void 0 !== i.bottom : void 0 !== i.left || void 0 !== i.right;
                        return n ? (o(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!"), !1) : void 0
                    })
                }
                if (parseFloat(TweenLite.version) >= 1.14)
                    for (var f, p, m = t.getChildren ? t.getChildren(!0, !0, !1) : [t], g = function() {
                            o(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another")
                        }, v = 0; v < m.length; v++) f = m[v], p !== g && (p = f.vars.onOverwrite, f.vars.onOverwrite = function() {
                        p && p.apply(this, arguments), g.apply(this, arguments)
                    });
                return o(3, "added tween"), s(), r
            }, r.removeTween = function(e) {
                return t && (e && t.progress(0).pause(), t.kill(), t = void 0, o(3, "removed tween (reset: " + (e ? "true" : "false") + ")")), r
            }
        })
    }), ! function(t) {
        "use strict";

        function e(t) {
            return (t || "").toLowerCase()
        }
        var i = "2.1.6";
        t.fn.cycle = function(i) {
            var n;
            return 0 !== this.length || t.isReady ? this.each(function() {
                var n, r, o, s, a = t(this),
                    l = t.fn.cycle.log;
                if (!a.data("cycle.opts")) {
                    (a.data("cycle-log") === !1 || i && i.log === !1 || r && r.log === !1) && (l = t.noop), l("--c2 init--"), n = a.data();
                    for (var c in n) n.hasOwnProperty(c) && /^cycle[A-Z]+/.test(c) && (s = n[c], o = c.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, e), l(o + ":", s, "(" + typeof s + ")"), n[o] = s);
                    r = t.extend({}, t.fn.cycle.defaults, n, i || {}), r.timeoutId = 0, r.paused = r.paused || !1, r.container = a, r._maxZ = r.maxZ, r.API = t.extend({
                        _container: a
                    }, t.fn.cycle.API), r.API.log = l, r.API.trigger = function(t, e) {
                        return r.container.trigger(t, e), r.API
                    }, a.data("cycle.opts", r), a.data("cycle.API", r.API), r.API.trigger("cycle-bootstrap", [r, r.API]), r.API.addInitialSlides(), r.API.preInitSlideshow(), r.slides.length && r.API.initSlideshow()
                }
            }) : (n = {
                s: this.selector,
                c: this.context
            }, t.fn.cycle.log("requeuing slideshow (dom not ready)"), t(function() {
                t(n.s, n.c).cycle(i)
            }), this)
        }, t.fn.cycle.API = {
            opts: function() {
                return this._container.data("cycle.opts")
            },
            addInitialSlides: function() {
                var e = this.opts(),
                    i = e.slides;
                e.slideCount = 0, e.slides = t(), i = i.jquery ? i : e.container.find(i), e.random && i.sort(function() {
                    return Math.random() - .5
                }), e.API.add(i)
            },
            preInitSlideshow: function() {
                var e = this.opts();
                e.API.trigger("cycle-pre-initialize", [e]);
                var i = t.fn.cycle.transitions[e.fx];
                i && t.isFunction(i.preInit) && i.preInit(e), e._preInitialized = !0
            },
            postInitSlideshow: function() {
                var e = this.opts();
                e.API.trigger("cycle-post-initialize", [e]);
                var i = t.fn.cycle.transitions[e.fx];
                i && t.isFunction(i.postInit) && i.postInit(e)
            },
            initSlideshow: function() {
                var e, i = this.opts(),
                    n = i.container;
                i.API.calcFirstSlide(), "static" == i.container.css("position") && i.container.css("position", "relative"), t(i.slides[i.currSlide]).css({
                    opacity: 1,
                    display: "block",
                    visibility: "visible"
                }), i.API.stackSlides(i.slides[i.currSlide], i.slides[i.nextSlide], !i.reverse), i.pauseOnHover && (i.pauseOnHover !== !0 && (n = t(i.pauseOnHover)), n.hover(function() {
                    i.API.pause(!0)
                }, function() {
                    i.API.resume(!0)
                })), i.timeout && (e = i.API.getSlideOpts(i.currSlide), i.API.queueTransition(e, e.timeout + i.delay)), i._initialized = !0, i.API.updateView(!0), i.API.trigger("cycle-initialized", [i]), i.API.postInitSlideshow()
            },
            pause: function(e) {
                var i = this.opts(),
                    n = i.API.getSlideOpts(),
                    r = i.hoverPaused || i.paused;
                e ? i.hoverPaused = !0 : i.paused = !0, r || (i.container.addClass("cycle-paused"), i.API.trigger("cycle-paused", [i]).log("cycle-paused"), n.timeout && (clearTimeout(i.timeoutId), i.timeoutId = 0, i._remainingTimeout -= t.now() - i._lastQueue, (i._remainingTimeout < 0 || isNaN(i._remainingTimeout)) && (i._remainingTimeout = void 0)))
            },
            resume: function(t) {
                var e = this.opts(),
                    i = !e.hoverPaused && !e.paused;
                t ? e.hoverPaused = !1 : e.paused = !1, i || (e.container.removeClass("cycle-paused"), 0 === e.slides.filter(":animated").length && e.API.queueTransition(e.API.getSlideOpts(), e._remainingTimeout), e.API.trigger("cycle-resumed", [e, e._remainingTimeout]).log("cycle-resumed"))
            },
            add: function(e, i) {
                var n, r = this.opts(),
                    o = r.slideCount,
                    s = !1;
                "string" == t.type(e) && (e = t.trim(e)), t(e).each(function() {
                    var e, n = t(this);
                    i ? r.container.prepend(n) : r.container.append(n), r.slideCount++, e = r.API.buildSlideOpts(n), r.slides = i ? t(n).add(r.slides) : r.slides.add(n), r.API.initSlide(e, n, --r._maxZ), n.data("cycle.opts", e), r.API.trigger("cycle-slide-added", [r, e, n])
                }), r.API.updateView(!0), s = r._preInitialized && 2 > o && r.slideCount >= 1, s && (r._initialized ? r.timeout && (n = r.slides.length, r.nextSlide = r.reverse ? n - 1 : 1, r.timeoutId || r.API.queueTransition(r)) : r.API.initSlideshow())
            },
            calcFirstSlide: function() {
                var t, e = this.opts();
                t = parseInt(e.startingSlide || 0, 10), (t >= e.slides.length || 0 > t) && (t = 0), e.currSlide = t, e.reverse ? (e.nextSlide = t - 1, e.nextSlide < 0 && (e.nextSlide = e.slides.length - 1)) : (e.nextSlide = t + 1, e.nextSlide == e.slides.length && (e.nextSlide = 0))
            },
            calcNextSlide: function() {
                var t, e = this.opts();
                e.reverse ? (t = e.nextSlide - 1 < 0, e.nextSlide = t ? e.slideCount - 1 : e.nextSlide - 1, e.currSlide = t ? 0 : e.nextSlide + 1) : (t = e.nextSlide + 1 == e.slides.length, e.nextSlide = t ? 0 : e.nextSlide + 1, e.currSlide = t ? e.slides.length - 1 : e.nextSlide - 1)
            },
            calcTx: function(e, i) {
                var n, r = e;
                return r._tempFx ? n = t.fn.cycle.transitions[r._tempFx] : i && r.manualFx && (n = t.fn.cycle.transitions[r.manualFx]), n || (n = t.fn.cycle.transitions[r.fx]), r._tempFx = null, this.opts()._tempFx = null, n || (n = t.fn.cycle.transitions.fade, r.API.log('Transition "' + r.fx + '" not found.  Using fade.')), n
            },
            prepareTx: function(t, e) {
                var i, n, r, o, s, a = this.opts();
                return a.slideCount < 2 ? void(a.timeoutId = 0) : (!t || a.busy && !a.manualTrump || (a.API.stopTransition(), a.busy = !1, clearTimeout(a.timeoutId), a.timeoutId = 0), void(a.busy || (0 !== a.timeoutId || t) && (n = a.slides[a.currSlide], r = a.slides[a.nextSlide], o = a.API.getSlideOpts(a.nextSlide), s = a.API.calcTx(o, t), a._tx = s, t && void 0 !== o.manualSpeed && (o.speed = o.manualSpeed), a.nextSlide != a.currSlide && (t || !a.paused && !a.hoverPaused && a.timeout) ? (a.API.trigger("cycle-before", [o, n, r, e]), s.before && s.before(o, n, r, e), i = function() {
                    a.busy = !1, a.container.data("cycle.opts") && (s.after && s.after(o, n, r, e), a.API.trigger("cycle-after", [o, n, r, e]), a.API.queueTransition(o), a.API.updateView(!0))
                }, a.busy = !0, s.transition ? s.transition(o, n, r, e, i) : a.API.doTransition(o, n, r, e, i), a.API.calcNextSlide(), a.API.updateView()) : a.API.queueTransition(o))))
            },
            doTransition: function(e, i, n, r, o) {
                var s = e,
                    a = t(i),
                    l = t(n),
                    c = function() {
                        l.animate(s.animIn || {
                            opacity: 1
                        }, s.speed, s.easeIn || s.easing, o)
                    };
                l.css(s.cssBefore || {}), a.animate(s.animOut || {}, s.speed, s.easeOut || s.easing, function() {
                    a.css(s.cssAfter || {}), s.sync || c()
                }), s.sync && c()
            },
            queueTransition: function(e, i) {
                var n = this.opts(),
                    r = void 0 !== i ? i : e.timeout;
                return 0 === n.nextSlide && 0 === --n.loop ? (n.API.log("terminating; loop=0"), n.timeout = 0, r ? setTimeout(function() {
                    n.API.trigger("cycle-finished", [n])
                }, r) : n.API.trigger("cycle-finished", [n]), void(n.nextSlide = n.currSlide)) : void 0 !== n.continueAuto && (n.continueAuto === !1 || t.isFunction(n.continueAuto) && n.continueAuto() === !1) ? (n.API.log("terminating automatic transitions"), n.timeout = 0, void(n.timeoutId && clearTimeout(n.timeoutId))) : void(r && (n._lastQueue = t.now(), void 0 === i && (n._remainingTimeout = e.timeout), n.paused || n.hoverPaused || (n.timeoutId = setTimeout(function() {
                    n.API.prepareTx(!1, !n.reverse)
                }, r))))
            },
            stopTransition: function() {
                var t = this.opts();
                t.slides.filter(":animated").length && (t.slides.stop(!1, !0), t.API.trigger("cycle-transition-stopped", [t])), t._tx && t._tx.stopTransition && t._tx.stopTransition(t)
            },
            advanceSlide: function(t) {
                var e = this.opts();
                return clearTimeout(e.timeoutId), e.timeoutId = 0, e.nextSlide = e.currSlide + t, e.nextSlide < 0 ? e.nextSlide = e.slides.length - 1 : e.nextSlide >= e.slides.length && (e.nextSlide = 0), e.API.prepareTx(!0, t >= 0), !1
            },
            buildSlideOpts: function(i) {
                var n, r, o = this.opts(),
                    s = i.data() || {};
                for (var a in s) s.hasOwnProperty(a) && /^cycle[A-Z]+/.test(a) && (n = s[a], r = a.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, e), o.API.log("[" + (o.slideCount - 1) + "]", r + ":", n, "(" + typeof n + ")"), s[r] = n);
                s = t.extend({}, t.fn.cycle.defaults, o, s), s.slideNum = o.slideCount;
                try {
                    delete s.API, delete s.slideCount, delete s.currSlide, delete s.nextSlide, delete s.slides
                } catch (l) {}
                return s
            },
            getSlideOpts: function(e) {
                var i = this.opts();
                void 0 === e && (e = i.currSlide);
                var n = i.slides[e],
                    r = t(n).data("cycle.opts");
                return t.extend({}, i, r)
            },
            initSlide: function(e, i, n) {
                var r = this.opts();
                i.css(e.slideCss || {}), n > 0 && i.css("zIndex", n), isNaN(e.speed) && (e.speed = t.fx.speeds[e.speed] || t.fx.speeds._default), e.sync || (e.speed = e.speed / 2), i.addClass(r.slideClass)
            },
            updateView: function(t, e) {
                var i = this.opts();
                if (i._initialized) {
                    var n = i.API.getSlideOpts(),
                        r = i.slides[i.currSlide];
                    !t && e !== !0 && (i.API.trigger("cycle-update-view-before", [i, n, r]), i.updateView < 0) || (i.slideActiveClass && i.slides.removeClass(i.slideActiveClass).eq(i.currSlide).addClass(i.slideActiveClass), t && i.hideNonActive && i.slides.filter(":not(." + i.slideActiveClass + ")").css("visibility", "hidden"), 0 === i.updateView && setTimeout(function() {
                        i.API.trigger("cycle-update-view", [i, n, r, t])
                    }, n.speed / (i.sync ? 2 : 1)), 0 !== i.updateView && i.API.trigger("cycle-update-view", [i, n, r, t]), t && i.API.trigger("cycle-update-view-after", [i, n, r]))
                }
            },
            getComponent: function(e) {
                var i = this.opts(),
                    n = i[e];
                return "string" == typeof n ? /^\s*[\>|\+|~]/.test(n) ? i.container.find(n) : t(n) : n.jquery ? n : t(n)
            },
            stackSlides: function(e, i, n) {
                var r = this.opts();
                e || (e = r.slides[r.currSlide], i = r.slides[r.nextSlide], n = !r.reverse), t(e).css("zIndex", r.maxZ);
                var o, s = r.maxZ - 2,
                    a = r.slideCount;
                if (n) {
                    for (o = r.currSlide + 1; a > o; o++) t(r.slides[o]).css("zIndex", s--);
                    for (o = 0; o < r.currSlide; o++) t(r.slides[o]).css("zIndex", s--)
                } else {
                    for (o = r.currSlide - 1; o >= 0; o--) t(r.slides[o]).css("zIndex", s--);
                    for (o = a - 1; o > r.currSlide; o--) t(r.slides[o]).css("zIndex", s--)
                }
                t(i).css("zIndex", r.maxZ - 1)
            },
            getSlideIndex: function(t) {
                return this.opts().slides.index(t)
            }
        }, t.fn.cycle.log = function() {
            window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " "))
        }, t.fn.cycle.version = function() {
            return "Cycle2: " + i
        }, t.fn.cycle.transitions = {
            custom: {},
            none: {
                before: function(t, e, i, n) {
                    t.API.stackSlides(i, e, n), t.cssBefore = {
                        opacity: 1,
                        visibility: "visible",
                        display: "block"
                    }
                }
            },
            fade: {
                before: function(e, i, n, r) {
                    var o = e.API.getSlideOpts(e.nextSlide).slideCss || {};
                    e.API.stackSlides(i, n, r), e.cssBefore = t.extend(o, {
                        opacity: 0,
                        visibility: "visible",
                        display: "block"
                    }), e.animIn = {
                        opacity: 1
                    }, e.animOut = {
                        opacity: 0
                    }
                }
            },
            fadeout: {
                before: function(e, i, n, r) {
                    var o = e.API.getSlideOpts(e.nextSlide).slideCss || {};
                    e.API.stackSlides(i, n, r), e.cssBefore = t.extend(o, {
                        opacity: 1,
                        visibility: "visible",
                        display: "block"
                    }), e.animOut = {
                        opacity: 0
                    }
                }
            },
            scrollHorz: {
                before: function(t, e, i, n) {
                    t.API.stackSlides(e, i, n);
                    var r = t.container.css("overflow", "hidden").width();
                    t.cssBefore = {
                        left: n ? r : -r,
                        top: 0,
                        opacity: 1,
                        visibility: "visible",
                        display: "block"
                    }, t.cssAfter = {
                        zIndex: t._maxZ - 2,
                        left: 0
                    }, t.animIn = {
                        left: 0
                    }, t.animOut = {
                        left: n ? -r : r
                    }
                }
            }
        }, t.fn.cycle.defaults = {
            allowWrap: !0,
            autoSelector: ".cycle-slideshow[data-cycle-auto-init!=false]",
            delay: 0,
            easing: null,
            fx: "fade",
            hideNonActive: !0,
            loop: 0,
            manualFx: void 0,
            manualSpeed: void 0,
            manualTrump: !0,
            maxZ: 100,
            pauseOnHover: !1,
            reverse: !1,
            slideActiveClass: "cycle-slide-active",
            slideClass: "cycle-slide",
            slideCss: {
                position: "absolute",
                top: 0,
                left: 0
            },
            slides: "> img",
            speed: 500,
            startingSlide: 0,
            sync: !0,
            timeout: 4e3,
            updateView: 0
        }, t(document).ready(function() {
            t(t.fn.cycle.defaults.autoSelector).cycle()
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e, n) {
            var r, o, s, a = n.autoHeight;
            if ("container" == a) o = t(n.slides[n.currSlide]).outerHeight(), n.container.height(o);
            else if (n._autoHeightRatio) n.container.height(n.container.width() / n._autoHeightRatio);
            else if ("calc" === a || "number" == t.type(a) && a >= 0) {
                if (s = "calc" === a ? i(e, n) : a >= n.slides.length ? 0 : a, s == n._sentinelIndex) return;
                n._sentinelIndex = s, n._sentinel && n._sentinel.remove(), r = t(n.slides[s].cloneNode(!0)), r.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"), r.css({
                    position: "static",
                    visibility: "hidden",
                    display: "block"
                }).prependTo(n.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"), r.find("*").css("visibility", "hidden"), n._sentinel = r
            }
        }

        function i(e, i) {
            var n = 0,
                r = -1;
            return i.slides.each(function(e) {
                var i = t(this).height();
                i > r && (r = i, n = e)
            }), n
        }

        function n(e, i, n, r) {
            var o = t(r).outerHeight();
            i.container.animate({
                height: o
            }, i.autoHeightSpeed, i.autoHeightEasing)
        }

        function r(i, o) {
            o._autoHeightOnResize && (t(window).off("resize orientationchange", o._autoHeightOnResize), o._autoHeightOnResize = null), o.container.off("cycle-slide-added cycle-slide-removed", e), o.container.off("cycle-destroyed", r), o.container.off("cycle-before", n), o._sentinel && (o._sentinel.remove(), o._sentinel = null)
        }
        t.extend(t.fn.cycle.defaults, {
            autoHeight: 0,
            autoHeightSpeed: 250,
            autoHeightEasing: null
        }), t(document).on("cycle-initialized", function(i, o) {
            function s() {
                e(i, o)
            }
            var a, l = o.autoHeight,
                c = t.type(l),
                u = null;
            ("string" === c || "number" === c) && (o.container.on("cycle-slide-added cycle-slide-removed", e), o.container.on("cycle-destroyed", r), "container" == l ? o.container.on("cycle-before", n) : "string" === c && /\d+\:\d+/.test(l) && (a = l.match(/(\d+)\:(\d+)/), a = a[1] / a[2], o._autoHeightRatio = a), "number" !== c && (o._autoHeightOnResize = function() {
                clearTimeout(u), u = setTimeout(s, 50)
            }, t(window).on("resize orientationchange", o._autoHeightOnResize)), setTimeout(s, 30))
        })
    }(jQuery),
    function(t) {
        "use strict";
        t.extend(t.fn.cycle.defaults, {
            caption: "> .cycle-caption",
            captionTemplate: "{{slideNum}} / {{slideCount}}",
            overlay: "> .cycle-overlay",
            overlayTemplate: "<div>{{title}}</div><div>{{desc}}</div>",
            captionModule: "caption"
        }), t(document).on("cycle-update-view", function(e, i, n, r) {
            "caption" === i.captionModule && t.each(["caption", "overlay"], function() {
                var t = this,
                    e = n[t + "Template"],
                    o = i.API.getComponent(t);
                o.length && e ? (o.html(i.API.tmpl(e, n, i, r)), o.show()) : o.hide()
            })
        }), t(document).on("cycle-destroyed", function(e, i) {
            var n;
            t.each(["caption", "overlay"], function() {
                var t = this,
                    e = i[t + "Template"];
                i[t] && e && (n = i.API.getComponent("caption"),
                    n.empty())
            })
        })
    }(jQuery),
    function(t) {
        "use strict";
        var e = t.fn.cycle;
        t.fn.cycle = function(i) {
            var n, r, o, s = t.makeArray(arguments);
            return "number" == t.type(i) ? this.cycle("goto", i) : "string" == t.type(i) ? this.each(function() {
                var a;
                return n = i, o = t(this).data("cycle.opts"), void 0 === o ? void e.log('slideshow must be initialized before sending commands; "' + n + '" ignored') : (n = "goto" == n ? "jump" : n, r = o.API[n], t.isFunction(r) ? (a = t.makeArray(s), a.shift(), r.apply(o.API, a)) : void e.log("unknown command: ", n))
            }) : e.apply(this, arguments)
        }, t.extend(t.fn.cycle, e), t.extend(e.API, {
            next: function() {
                var t = this.opts();
                if (!t.busy || t.manualTrump) {
                    var e = t.reverse ? -1 : 1;
                    t.allowWrap === !1 && t.currSlide + e >= t.slideCount || (t.API.advanceSlide(e), t.API.trigger("cycle-next", [t]).log("cycle-next"))
                }
            },
            prev: function() {
                var t = this.opts();
                if (!t.busy || t.manualTrump) {
                    var e = t.reverse ? 1 : -1;
                    t.allowWrap === !1 && t.currSlide + e < 0 || (t.API.advanceSlide(e), t.API.trigger("cycle-prev", [t]).log("cycle-prev"))
                }
            },
            destroy: function() {
                this.stop();
                var e = this.opts(),
                    i = t.isFunction(t._data) ? t._data : t.noop;
                clearTimeout(e.timeoutId), e.timeoutId = 0, e.API.stop(), e.API.trigger("cycle-destroyed", [e]).log("cycle-destroyed"), e.container.removeData(), i(e.container[0], "parsedAttrs", !1), e.retainStylesOnDestroy || (e.container.removeAttr("style"), e.slides.removeAttr("style"), e.slides.removeClass(e.slideActiveClass)), e.slides.each(function() {
                    var n = t(this);
                    n.removeData(), n.removeClass(e.slideClass), i(this, "parsedAttrs", !1)
                })
            },
            jump: function(t, e) {
                var i, n = this.opts();
                if (!n.busy || n.manualTrump) {
                    var r = parseInt(t, 10);
                    if (isNaN(r) || 0 > r || r >= n.slides.length) return void n.API.log("goto: invalid slide index: " + r);
                    if (r == n.currSlide) return void n.API.log("goto: skipping, already on slide", r);
                    n.nextSlide = r, clearTimeout(n.timeoutId), n.timeoutId = 0, n.API.log("goto: ", r, " (zero-index)"), i = n.currSlide < n.nextSlide, n._tempFx = e, n.API.prepareTx(!0, i)
                }
            },
            stop: function() {
                var e = this.opts(),
                    i = e.container;
                clearTimeout(e.timeoutId), e.timeoutId = 0, e.API.stopTransition(), e.pauseOnHover && (e.pauseOnHover !== !0 && (i = t(e.pauseOnHover)), i.off("mouseenter mouseleave")), e.API.trigger("cycle-stopped", [e]).log("cycle-stopped")
            },
            reinit: function() {
                var t = this.opts();
                t.API.destroy(), t.container.cycle()
            },
            remove: function(e) {
                for (var i, n, r = this.opts(), o = [], s = 1, a = 0; a < r.slides.length; a++) i = r.slides[a], a == e ? n = i : (o.push(i), t(i).data("cycle.opts").slideNum = s, s++);
                n && (r.slides = t(o), r.slideCount--, t(n).remove(), e == r.currSlide ? r.API.advanceSlide(1) : e < r.currSlide ? r.currSlide-- : r.currSlide++, r.API.trigger("cycle-slide-removed", [r, e, n]).log("cycle-slide-removed"), r.API.updateView())
            }
        }), t(document).on("click.cycle", "[data-cycle-cmd]", function(e) {
            e.preventDefault();
            var i = t(this),
                n = i.data("cycle-cmd"),
                r = i.data("cycle-context") || ".cycle-slideshow";
            t(r).cycle(n, i.data("cycle-arg"))
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e, i) {
            var n;
            return e._hashFence ? void(e._hashFence = !1) : (n = window.location.hash.substring(1), void e.slides.each(function(r) {
                if (t(this).data("cycle-hash") == n) {
                    if (i === !0) e.startingSlide = r;
                    else {
                        var o = e.currSlide < r;
                        e.nextSlide = r, e.API.prepareTx(!0, o)
                    }
                    return !1
                }
            }))
        }
        t(document).on("cycle-pre-initialize", function(i, n) {
            e(n, !0), n._onHashChange = function() {
                e(n, !1)
            }, t(window).on("hashchange", n._onHashChange)
        }), t(document).on("cycle-update-view", function(t, e, i) {
            i.hash && "#" + i.hash != window.location.hash && (e._hashFence = !0, window.location.hash = i.hash)
        }), t(document).on("cycle-destroyed", function(e, i) {
            i._onHashChange && t(window).off("hashchange", i._onHashChange)
        })
    }(jQuery),
    function(t) {
        "use strict";
        t.extend(t.fn.cycle.defaults, {
            loader: !1
        }), t(document).on("cycle-bootstrap", function(e, i) {
            function n(e, n) {
                function o(e) {
                    var o;
                    "wait" == i.loader ? (a.push(e), 0 === c && (a.sort(s), r.apply(i.API, [a, n]), i.container.removeClass("cycle-loading"))) : (o = t(i.slides[i.currSlide]), r.apply(i.API, [e, n]), o.show(), i.container.removeClass("cycle-loading"))
                }

                function s(t, e) {
                    return t.data("index") - e.data("index")
                }
                var a = [];
                if ("string" == t.type(e)) e = t.trim(e);
                else if ("array" === t.type(e))
                    for (var l = 0; l < e.length; l++) e[l] = t(e[l])[0];
                e = t(e);
                var c = e.length;
                c && (e.css("visibility", "hidden").appendTo("body").each(function(e) {
                    function s() {
                        0 === --l && (--c, o(u))
                    }
                    var l = 0,
                        u = t(this),
                        d = u.is("img") ? u : u.find("img");
                    return u.data("index", e), d = d.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'), d.length ? (l = d.length, void d.each(function() {
                        this.complete ? s() : t(this).load(function() {
                            s()
                        }).on("error", function() {
                            0 === --l && (i.API.log("slide skipped; img not loaded:", this.src), 0 === --c && "wait" == i.loader && r.apply(i.API, [a, n]))
                        })
                    })) : (--c, void a.push(u))
                }), c && i.container.addClass("cycle-loading"))
            }
            var r;
            i.loader && (r = i.API.add, i.API.add = n)
        })
    }(jQuery),
    function(t) {
        "use strict";

        function e(e, i, n) {
            var r, o = e.API.getComponent("pager");
            o.each(function() {
                var o = t(this);
                if (i.pagerTemplate) {
                    var s = e.API.tmpl(i.pagerTemplate, i, e, n[0]);
                    r = t(s).appendTo(o)
                } else r = o.children().eq(e.slideCount - 1);
                r.on(e.pagerEvent, function(t) {
                    e.pagerEventBubble || t.preventDefault(), e.API.page(o, t.currentTarget)
                })
            })
        }

        function i(t, e) {
            var i = this.opts();
            if (!i.busy || i.manualTrump) {
                var n = t.children().index(e),
                    r = n,
                    o = i.currSlide < r;
                i.currSlide != r && (i.nextSlide = r, i._tempFx = i.pagerFx, i.API.prepareTx(!0, o), i.API.trigger("cycle-pager-activated", [i, t, e]))
            }
        }
        t.extend(t.fn.cycle.defaults, {
            pager: "> .cycle-pager",
            pagerActiveClass: "cycle-pager-active",
            pagerEvent: "click.cycle",
            pagerEventBubble: void 0,
            pagerTemplate: "<span>&bull;</span>"
        }), t(document).on("cycle-bootstrap", function(t, i, n) {
            n.buildPagerLink = e
        }), t(document).on("cycle-slide-added", function(t, e, n, r) {
            e.pager && (e.API.buildPagerLink(e, n, r), e.API.page = i)
        }), t(document).on("cycle-slide-removed", function(e, i, n) {
            if (i.pager) {
                var r = i.API.getComponent("pager");
                r.each(function() {
                    var e = t(this);
                    t(e.children()[n]).remove()
                })
            }
        }), t(document).on("cycle-update-view", function(e, i) {
            var n;
            i.pager && (n = i.API.getComponent("pager"), n.each(function() {
                t(this).children().removeClass(i.pagerActiveClass).eq(i.currSlide).addClass(i.pagerActiveClass)
            }))
        }), t(document).on("cycle-destroyed", function(t, e) {
            var i = e.API.getComponent("pager");
            i && (i.children().off(e.pagerEvent), e.pagerTemplate && i.empty())
        })
    }(jQuery),
    function(t) {
        "use strict";
        t.extend(t.fn.cycle.defaults, {
            next: "> .cycle-next",
            nextEvent: "click.cycle",
            disabledClass: "disabled",
            prev: "> .cycle-prev",
            prevEvent: "click.cycle",
            swipe: !1
        }), t(document).on("cycle-initialized", function(t, e) {
            if (e.API.getComponent("next").on(e.nextEvent, function(t) {
                    t.preventDefault(), e.API.next()
                }), e.API.getComponent("prev").on(e.prevEvent, function(t) {
                    t.preventDefault(), e.API.prev()
                }), e.swipe) {
                var i = e.swipeVert ? "swipeUp.cycle" : "swipeLeft.cycle swipeleft.cycle",
                    n = e.swipeVert ? "swipeDown.cycle" : "swipeRight.cycle swiperight.cycle";
                e.container.on(i, function() {
                    e._tempFx = e.swipeFx, e.API.next()
                }), e.container.on(n, function() {
                    e._tempFx = e.swipeFx, e.API.prev()
                })
            }
        }), t(document).on("cycle-update-view", function(t, e) {
            if (!e.allowWrap) {
                var i = e.disabledClass,
                    n = e.API.getComponent("next"),
                    r = e.API.getComponent("prev"),
                    o = e._prevBoundry || 0,
                    s = void 0 !== e._nextBoundry ? e._nextBoundry : e.slideCount - 1;
                e.currSlide == s ? n.addClass(i).prop("disabled", !0) : n.removeClass(i).prop("disabled", !1), e.currSlide === o ? r.addClass(i).prop("disabled", !0) : r.removeClass(i).prop("disabled", !1)
            }
        }), t(document).on("cycle-destroyed", function(t, e) {
            e.API.getComponent("prev").off(e.nextEvent), e.API.getComponent("next").off(e.prevEvent), e.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")
        })
    }(jQuery),
    function(t) {
        "use strict";
        t.extend(t.fn.cycle.defaults, {
            progressive: !1
        }), t(document).on("cycle-pre-initialize", function(e, i) {
            if (i.progressive) {
                var n, r, o = i.API,
                    s = o.next,
                    a = o.prev,
                    l = o.prepareTx,
                    c = t.type(i.progressive);
                if ("array" == c) n = i.progressive;
                else if (t.isFunction(i.progressive)) n = i.progressive(i);
                else if ("string" == c) {
                    if (r = t(i.progressive), n = t.trim(r.html()), !n) return;
                    if (/^(\[)/.test(n)) try {
                        n = t.parseJSON(n)
                    } catch (u) {
                        return void o.log("error parsing progressive slides", u)
                    } else n = n.split(new RegExp(r.data("cycle-split") || "\n")), n[n.length - 1] || n.pop()
                }
                l && (o.prepareTx = function(t, e) {
                    var r, o;
                    return t || 0 === n.length ? void l.apply(i.API, [t, e]) : void(e && i.currSlide == i.slideCount - 1 ? (o = n[0], n = n.slice(1), i.container.one("cycle-slide-added", function(t, e) {
                        setTimeout(function() {
                            e.API.advanceSlide(1)
                        }, 50)
                    }), i.API.add(o)) : e || 0 !== i.currSlide ? l.apply(i.API, [t, e]) : (r = n.length - 1, o = n[r], n = n.slice(0, r), i.container.one("cycle-slide-added", function(t, e) {
                        setTimeout(function() {
                            e.currSlide = 1, e.API.advanceSlide(-1)
                        }, 50)
                    }), i.API.add(o, !0)))
                }), s && (o.next = function() {
                    var t = this.opts();
                    if (n.length && t.currSlide == t.slideCount - 1) {
                        var e = n[0];
                        n = n.slice(1), t.container.one("cycle-slide-added", function(t, e) {
                            s.apply(e.API), e.container.removeClass("cycle-loading")
                        }), t.container.addClass("cycle-loading"), t.API.add(e)
                    } else s.apply(t.API)
                }), a && (o.prev = function() {
                    var t = this.opts();
                    if (n.length && 0 === t.currSlide) {
                        var e = n.length - 1,
                            i = n[e];
                        n = n.slice(0, e), t.container.one("cycle-slide-added", function(t, e) {
                            e.currSlide = 1, e.API.advanceSlide(-1), e.container.removeClass("cycle-loading")
                        }), t.container.addClass("cycle-loading"), t.API.add(i, !0)
                    } else a.apply(t.API)
                })
            }
        })
    }(jQuery),
    function(t) {
        "use strict";
        t.extend(t.fn.cycle.defaults, {
            tmplRegex: "{{((.)?.*?)}}"
        }), t.extend(t.fn.cycle.API, {
            tmpl: function(e, i) {
                var n = new RegExp(i.tmplRegex || t.fn.cycle.defaults.tmplRegex, "g"),
                    r = t.makeArray(arguments);
                return r.shift(), e.replace(n, function(e, i) {
                    var n, o, s, a, l = i.split(".");
                    for (n = 0; n < r.length; n++)
                        if (s = r[n]) {
                            if (l.length > 1)
                                for (a = s, o = 0; o < l.length; o++) s = a, a = a[l[o]] || i;
                            else a = s[i];
                            if (t.isFunction(a)) return a.apply(s, r);
                            if (void 0 !== a && null !== a && a != i) return a
                        }
                    return i
                })
            }
        })
    }(jQuery),
    function(t) {
        "use strict";
        "ontouchend" in document;
        t.event.special.swipe = t.event.special.swipe || {
            scrollSupressionThreshold: 10,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 75,
            setup: function() {
                var e = t(this);
                e.bind("touchstart", function(i) {
                    function n(e) {
                        if (s) {
                            var i = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                            r = {
                                time: (new Date).getTime(),
                                coords: [i.pageX, i.pageY]
                            }, Math.abs(s.coords[0] - r.coords[0]) > t.event.special.swipe.scrollSupressionThreshold && e.preventDefault()
                        }
                    }
                    var r, o = i.originalEvent.touches ? i.originalEvent.touches[0] : i,
                        s = {
                            time: (new Date).getTime(),
                            coords: [o.pageX, o.pageY],
                            origin: t(i.target)
                        };
                    e.bind("touchmove", n).one("touchend", function(i) {
                        e.unbind("touchmove", n), s && r && r.time - s.time < t.event.special.swipe.durationThreshold && Math.abs(s.coords[0] - r.coords[0]) > t.event.special.swipe.horizontalDistanceThreshold && Math.abs(s.coords[1] - r.coords[1]) < t.event.special.swipe.verticalDistanceThreshold && s.origin.trigger("swipe").trigger(s.coords[0] > r.coords[0] ? "swipeleft" : "swiperight"), s = r = void 0
                    })
                })
            }
        }, t.event.special.swipeleft = t.event.special.swipeleft || {
            setup: function() {
                t(this).bind("swipe", t.noop)
            }
        }, t.event.special.swiperight = t.event.special.swiperight || t.event.special.swipeleft
    }(jQuery), ! function(t) {
        "use strict";
        t(document).on("cycle-bootstrap", function(t, e, i) {
            "carousel" === e.fx && (i.getSlideIndex = function(t) {
                var e = this.opts()._carouselWrap.children(),
                    i = e.index(t);
                return i % e.length
            }, i.next = function() {
                var t = e.reverse ? -1 : 1;
                e.allowWrap === !1 && e.currSlide + t > e.slideCount - e.carouselVisible || (e.API.advanceSlide(t), e.API.trigger("cycle-next", [e]).log("cycle-next"))
            })
        }), t.fn.cycle.transitions.carousel = {
            preInit: function(e) {
                e.hideNonActive = !1, e.container.on("cycle-destroyed", t.proxy(this.onDestroy, e.API)), e.API.stopTransition = this.stopTransition;
                for (var i = 0; i < e.startingSlide; i++) e.container.append(e.slides[0])
            },
            postInit: function(e) {
                var i, n, r, o, s = e.carouselVertical;
                e.carouselVisible && e.carouselVisible > e.slideCount && (e.carouselVisible = e.slideCount - 1);
                var a = e.carouselVisible || e.slides.length,
                    l = {
                        display: s ? "block" : "inline-block",
                        position: "static"
                    };
                if (e.container.css({
                        position: "relative",
                        overflow: "hidden"
                    }), e.slides.css(l), e._currSlide = e.currSlide, o = t('<div class="cycle-carousel-wrap"></div>').prependTo(e.container).css({
                        margin: 0,
                        padding: 0,
                        top: 0,
                        left: 0,
                        position: "absolute"
                    }).append(e.slides), e._carouselWrap = o, s || o.css("white-space", "nowrap"), e.allowWrap !== !1) {
                    for (n = 0; n < (void 0 === e.carouselVisible ? 2 : 1); n++) {
                        for (i = 0; i < e.slideCount; i++) o.append(e.slides[i].cloneNode(!0));
                        for (i = e.slideCount; i--;) o.prepend(e.slides[i].cloneNode(!0))
                    }
                    o.find(".cycle-slide-active").removeClass("cycle-slide-active"), e.slides.eq(e.startingSlide).addClass("cycle-slide-active")
                }
                e.pager && e.allowWrap === !1 && (r = e.slideCount - a, t(e.pager).children().filter(":gt(" + r + ")").hide()), e._nextBoundry = e.slideCount - e.carouselVisible, this.prepareDimensions(e)
            },
            prepareDimensions: function(e) {
                var i, n, r, o, s = e.carouselVertical,
                    a = e.carouselVisible || e.slides.length;
                if (e.carouselFluid && e.carouselVisible ? e._carouselResizeThrottle || this.fluidSlides(e) : e.carouselVisible && e.carouselSlideDimension ? (i = a * e.carouselSlideDimension, e.container[s ? "height" : "width"](i)) : e.carouselVisible && (i = a * t(e.slides[0])[s ? "outerHeight" : "outerWidth"](!0), e.container[s ? "height" : "width"](i)), n = e.carouselOffset || 0, e.allowWrap !== !1)
                    if (e.carouselSlideDimension) n -= (e.slideCount + e.currSlide) * e.carouselSlideDimension;
                    else
                        for (r = e._carouselWrap.children(), o = 0; o < e.slideCount + e.currSlide; o++) n -= t(r[o])[s ? "outerHeight" : "outerWidth"](!0);
                e._carouselWrap.css(s ? "top" : "left", n)
            },
            fluidSlides: function(e) {
                function i() {
                    clearTimeout(r), r = setTimeout(n, 20)
                }

                function n() {
                    e._carouselWrap.stop(!1, !0);
                    var t = e.container.width() / e.carouselVisible;
                    t = Math.ceil(t - s), e._carouselWrap.children().width(t), e._sentinel && e._sentinel.width(t), a(e)
                }
                var r, o = e.slides.eq(0),
                    s = o.outerWidth() - o.width(),
                    a = this.prepareDimensions;
                t(window).on("resize", i), e._carouselResizeThrottle = i, n()
            },
            transition: function(e, i, n, r, o) {
                var s, a = {},
                    l = e.nextSlide - e.currSlide,
                    c = e.carouselVertical,
                    u = e.speed;
                if (e.allowWrap === !1) {
                    r = l > 0;
                    var d = e._currSlide,
                        h = e.slideCount - e.carouselVisible;
                    l > 0 && e.nextSlide > h && d == h ? l = 0 : l > 0 && e.nextSlide > h ? l = e.nextSlide - d - (e.nextSlide - h) : 0 > l && e.currSlide > h && e.nextSlide > h ? l = 0 : 0 > l && e.currSlide > h ? l += e.currSlide - h : d = e.currSlide, s = this.getScroll(e, c, d, l), e.API.opts()._currSlide = e.nextSlide > h ? h : e.nextSlide
                } else r && 0 === e.nextSlide ? (s = this.getDim(e, e.currSlide, c), o = this.genCallback(e, r, c, o)) : r || e.nextSlide != e.slideCount - 1 ? s = this.getScroll(e, c, e.currSlide, l) : (s = this.getDim(e, e.currSlide, c), o = this.genCallback(e, r, c, o));
                a[c ? "top" : "left"] = r ? "-=" + s : "+=" + s, e.throttleSpeed && (u = s / t(e.slides[0])[c ? "height" : "width"]() * e.speed), e._carouselWrap.animate(a, u, e.easing, o)
            },
            getDim: function(e, i, n) {
                var r = t(e.slides[i]);
                return r[n ? "outerHeight" : "outerWidth"](!0)
            },
            getScroll: function(t, e, i, n) {
                var r, o = 0;
                if (n > 0)
                    for (r = i; i + n > r; r++) o += this.getDim(t, r, e);
                else
                    for (r = i; r > i + n; r--) o += this.getDim(t, r, e);
                return o
            },
            genCallback: function(e, i, n, r) {
                return function() {
                    var i = t(e.slides[e.nextSlide]).position(),
                        o = 0 - i[n ? "top" : "left"] + (e.carouselOffset || 0);
                    e._carouselWrap.css(e.carouselVertical ? "top" : "left", o), r()
                }
            },
            stopTransition: function() {
                var t = this.opts();
                t.slides.stop(!1, !0), t._carouselWrap.stop(!1, !0)
            },
            onDestroy: function() {
                var e = this.opts();
                e._carouselResizeThrottle && t(window).off("resize", e._carouselResizeThrottle), e.slides.prependTo(e.container), e._carouselWrap.remove()
            }
        }
    }(jQuery),
    function() {
        $(document).ready(function() {
            return $("#btn-buy").click(function() {
                var t, e, i, n, r;
                if (i = $(this).data("path"), n = $(this).data("schema"), r = $(this).data("url"), window.navigator.userAgent.match(/(iPad|iPhone)/i)) try {
                    return window.location = n + "://" + i
                } catch (e) {
                    return t = e, window.location = r, console.log("App is not installed")
                }
            })
        })
    }.call(this),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["jQuery"], e) : "object" == typeof exports ? module.exports = e(require("jQuery")) : t.jquery_dotdotdot_min_js = e(t.jQuery)
    }(this, function(t) {
        return ! function(t, e) {
            function i(t, e, i) {
                var n = t.children(),
                    r = !1;
                t.empty();
                for (var s = 0, a = n.length; a > s; s++) {
                    var l = n.eq(s);
                    if (t.append(l), i && t.append(i), o(t, e)) {
                        l.remove(), r = !0;
                        break
                    }
                    i && i.detach()
                }
                return r
            }

            function n(e, i, s, a, l) {
                var c = !1,
                    u = "a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",
                    d = "script, .dotdotdot-keep";
                return e.contents().detach().each(function() {
                    var h = this,
                        f = t(h);
                    if ("undefined" == typeof h) return !0;
                    if (f.is(d)) e.append(f);
                    else {
                        if (c) return !0;
                        e.append(f), !l || f.is(a.after) || f.find(a.after).length || e[e.is(u) ? "after" : "append"](l), o(s, a) && (c = 3 == h.nodeType ? r(f, i, s, a, l) : n(f, i, s, a, l)), c || l && l.detach()
                    }
                }), i.addClass("is-truncated"), c
            }

            function r(e, i, n, r, a) {
                var u = e[0];
                if (!u) return !1;
                var h = c(u),
                    f = -1 !== h.indexOf(" ") ? " " : "\u3000",
                    p = "letter" == r.wrap ? "" : f,
                    m = h.split(p),
                    g = -1,
                    v = -1,
                    y = 0,
                    _ = m.length - 1;
                for (r.fallbackToLetter && 0 == y && 0 == _ && (p = "", m = h.split(p), _ = m.length - 1); _ >= y && (0 != y || 0 != _);) {
                    var b = Math.floor((y + _) / 2);
                    if (b == v) break;
                    v = b, l(u, m.slice(0, v + 1).join(p) + r.ellipsis), n.children().each(function() {
                        t(this).toggle().toggle()
                    }), o(n, r) ? (_ = v, r.fallbackToLetter && 0 == y && 0 == _ && (p = "", m = m[0].split(p), g = -1, v = -1, y = 0, _ = m.length - 1)) : (g = v, y = v)
                }
                if (-1 == g || 1 == m.length && 0 == m[0].length) {
                    var w = e.parent();
                    e.detach();
                    var x = a && a.closest(w).length ? a.length : 0;
                    w.contents().length > x ? u = d(w.contents().eq(-1 - x), i) : (u = d(w, i, !0), x || w.detach()), u && (h = s(c(u), r), l(u, h), x && a && t(u).parent().append(a))
                } else h = s(m.slice(0, g + 1).join(p), r), l(u, h);
                return !0
            }

            function o(t, e) {
                return t.innerHeight() > e.maxHeight
            }

            function s(e, i) {
                for (; t.inArray(e.slice(-1), i.lastCharacter.remove) > -1;) e = e.slice(0, -1);
                return t.inArray(e.slice(-1), i.lastCharacter.noEllipsis) < 0 && (e += i.ellipsis), e
            }

            function a(t) {
                return {
                    width: t.innerWidth(),
                    height: t.innerHeight()
                }
            }

            function l(t, e) {
                t.innerText ? t.innerText = e : t.nodeValue ? t.nodeValue = e : t.textContent && (t.textContent = e)
            }

            function c(t) {
                return t.innerText ? t.innerText : t.nodeValue ? t.nodeValue : t.textContent ? t.textContent : ""
            }

            function u(t) {
                do t = t.previousSibling; while (t && 1 !== t.nodeType && 3 !== t.nodeType);
                return t
            }

            function d(e, i, n) {
                var r, o = e && e[0];
                if (o) {
                    if (!n) {
                        if (3 === o.nodeType) return o;
                        if (t.trim(e.text())) return d(e.contents().last(), i)
                    }
                    for (r = u(o); !r;) {
                        if (e = e.parent(), e.is(i) || !e.length) return !1;
                        r = u(e[0])
                    }
                    if (r) return d(t(r), i)
                }
                return !1
            }

            function h(e, i) {
                return e ? "string" == typeof e ? (e = t(e, i), e.length ? e : !1) : e.jquery ? e : !1 : !1
            }

            function f(t) {
                for (var e = t.innerHeight(), i = ["paddingTop", "paddingBottom"], n = 0, r = i.length; r > n; n++) {
                    var o = parseInt(t.css(i[n]), 10);
                    isNaN(o) && (o = 0), e -= o
                }
                return e
            }
            if (!t.fn.dotdotdot) {
                t.fn.dotdotdot = function(e) {
                    if (0 == this.length) return t.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;
                    if (this.length > 1) return this.each(function() {
                        t(this).dotdotdot(e)
                    });
                    var r = this,
                        s = r.contents();
                    r.data("dotdotdot") && r.trigger("destroy.dot"), r.data("dotdotdot-style", r.attr("style") || ""), r.css("word-wrap", "break-word"), "nowrap" === r.css("white-space") && r.css("white-space", "normal"), r.bind_events = function() {
                        return r.bind("update.dot", function(e, a) {
                            switch (r.removeClass("is-truncated"), e.preventDefault(), e.stopPropagation(), typeof l.height) {
                                case "number":
                                    l.maxHeight = l.height;
                                    break;
                                case "function":
                                    l.maxHeight = l.height.call(r[0]);
                                    break;
                                default:
                                    l.maxHeight = f(r)
                            }
                            l.maxHeight += l.tolerance, "undefined" != typeof a && (("string" == typeof a || "nodeType" in a && 1 === a.nodeType) && (a = t("<div />").append(a).contents()), a instanceof t && (s = a)), m = r.wrapInner('<div class="dotdotdot" />').children(), m.contents().detach().end().append(s.clone(!0)).find("br").replaceWith("  <br />  ").end().css({
                                height: "auto",
                                width: "auto",
                                border: "none",
                                padding: 0,
                                margin: 0
                            });
                            var u = !1,
                                d = !1;
                            return c.afterElement && (u = c.afterElement.clone(!0), u.show(), c.afterElement.detach()), o(m, l) && (d = "children" == l.wrap ? i(m, l, u) : n(m, r, m, l, u)), m.replaceWith(m.contents()), m = null, t.isFunction(l.callback) && l.callback.call(r[0], d, s), c.isTruncated = d, d
                        }).bind("isTruncated.dot", function(t, e) {
                            return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(r[0], c.isTruncated), c.isTruncated
                        }).bind("originalContent.dot", function(t, e) {
                            return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(r[0], s), s
                        }).bind("destroy.dot", function(t) {
                            t.preventDefault(), t.stopPropagation(), r.unwatch().unbind_events().contents().detach().end().append(s).attr("style", r.data("dotdotdot-style") || "").removeClass("is-truncated").data("dotdotdot", !1)
                        }), r
                    }, r.unbind_events = function() {
                        return r.unbind(".dot"), r
                    }, r.watch = function() {
                        if (r.unwatch(), "window" == l.watch) {
                            var e = t(window),
                                i = e.width(),
                                n = e.height();
                            e.bind("resize.dot" + c.dotId, function() {
                                i == e.width() && n == e.height() && l.windowResizeFix || (i = e.width(), n = e.height(), d && clearInterval(d), d = setTimeout(function() {
                                    r.trigger("update.dot")
                                }, 100))
                            })
                        } else u = a(r), d = setInterval(function() {
                            if (r.is(":visible")) {
                                var t = a(r);
                                u.width == t.width && u.height == t.height || (r.trigger("update.dot"), u = t)
                            }
                        }, 500);
                        return r
                    }, r.unwatch = function() {
                        return t(window).unbind("resize.dot" + c.dotId), d && clearInterval(d), r
                    };
                    var l = t.extend(!0, {}, t.fn.dotdotdot.defaults, e),
                        c = {},
                        u = {},
                        d = null,
                        m = null;
                    return l.lastCharacter.remove instanceof Array || (l.lastCharacter.remove = t.fn.dotdotdot.defaultArrays.lastCharacter.remove), l.lastCharacter.noEllipsis instanceof Array || (l.lastCharacter.noEllipsis = t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), c.afterElement = h(l.after, r), c.isTruncated = !1, c.dotId = p++, r.data("dotdotdot", !0).bind_events().trigger("update.dot"), l.watch && r.watch(), r
                }, t.fn.dotdotdot.defaults = {
                    ellipsis: "... ",
                    wrap: "word",
                    fallbackToLetter: !0,
                    lastCharacter: {},
                    tolerance: 0,
                    callback: null,
                    after: null,
                    height: null,
                    watch: !1,
                    windowResizeFix: !0
                }, t.fn.dotdotdot.defaultArrays = {
                    lastCharacter: {
                        remove: [" ", "\u3000", ",", ";", ".", "!", "?"],
                        noEllipsis: []
                    }
                }, t.fn.dotdotdot.debug = function(t) {};
                var p = 1,
                    m = t.fn.html;
                t.fn.html = function(i) {
                    return i != e && !t.isFunction(i) && this.data("dotdotdot") ? this.trigger("update", [i]) : m.apply(this, arguments)
                };
                var g = t.fn.text;
                t.fn.text = function(i) {
                    return i != e && !t.isFunction(i) && this.data("dotdotdot") ? (i = t("<div />").text(i).html(), this.trigger("update", [i])) : g.apply(this, arguments)
                }
            }
        }(t), t(document).ready(function(t) {
            t(".dot-ellipsis").each(function() {
                var e = t(this).hasClass("dot-resize-update"),
                    i = t(this).hasClass("dot-timer-update"),
                    n = 0,
                    r = t(this).attr("class").split(/\s+/);
                t.each(r, function(t, e) {
                    var i = e.match(/^dot-height-(\d+)$/);
                    null !== i && (n = Number(i[1]))
                });
                var o = new Object;
                i && (o.watch = !0), e && (o.watch = "window"), n > 0 && (o.height = n), t(this).dotdotdot(o)
            })
        }), t(window).load(function() {
            t(".dot-ellipsis.dot-load-update").trigger("update.dot")
        }), !0
    });
var Froogaloop = function() {
    function t(e) {
        return new t.fn.init(e)
    }

    function e(t, e, i) {
        if (!i.contentWindow.postMessage) return !1;
        var n = JSON.stringify({
            method: t,
            value: e
        });
        i.contentWindow.postMessage(n, c)
    }

    function i(t) {
        var e, i;
        try {
            e = JSON.parse(t.data), i = e.event || e.method
        } catch (n) {}
        if ("ready" != i || l || (l = !0), !/^https?:\/\/player.vimeo.com/.test(t.origin)) return !1;
        "*" === c && (c = t.origin);
        var o = e.value,
            s = e.data,
            a = "" === a ? null : e.player_id,
            u = r(i, a),
            d = [];
        return u ? (void 0 !== o && d.push(o), s && d.push(s), a && d.push(a), d.length > 0 ? u.apply(null, d) : u.call()) : !1
    }

    function n(t, e, i) {
        i ? (a[i] || (a[i] = {}), a[i][t] = e) : a[t] = e
    }

    function r(t, e) {
        return e ? a[e][t] : a[t]
    }

    function o(t, e) {
        if (e && a[e]) {
            if (!a[e][t]) return !1;
            a[e][t] = null
        } else {
            if (!a[t]) return !1;
            a[t] = null
        }
        return !0
    }

    function s(t) {
        return !!(t && t.constructor && t.call && t.apply)
    }
    var a = {},
        l = !1,
        c = (Array.prototype.slice, "*");
    return t.fn = t.prototype = {
        element: null,
        init: function(t) {
            return "string" == typeof t && (t = document.getElementById(t)), this.element = t, this
        },
        api: function(t, i) {
            if (!this.element || !t) return !1;
            var r = this,
                o = r.element,
                a = "" !== o.id ? o.id : null,
                l = s(i) ? null : i,
                c = s(i) ? i : null;
            return c && n(t, c, a), e(t, l, o), r
        },
        addEvent: function(t, i) {
            if (!this.element) return !1;
            var r = this,
                o = r.element,
                s = "" !== o.id ? o.id : null;
            return n(t, i, s), "ready" != t ? e("addEventListener", t, o) : "ready" == t && l && i.call(null, s), r
        },
        removeEvent: function(t) {
            if (!this.element) return !1;
            var i = this,
                n = i.element,
                r = "" !== n.id ? n.id : null,
                s = o(t, r);
            "ready" != t && s && e("removeEventListener", t, n)
        }
    }, t.fn.init.prototype = t.fn, window.addEventListener ? window.addEventListener("message", i, !1) : window.attachEvent("onmessage", i), window.Froogaloop = window.$f = t
}();
(function() {
    $(document).ready(function() {
        var t, e;
        return t = $(".js-post-comments"), e = $("#js-load-more-post-comments"), e.click(function(e) {
            var i, n;
            return e.preventDefault(), n = t.children().length, i = $(this), $.ajax(i.attr("href"), {
                type: "GET",
                data: {
                    offset: n
                },
                beforeSend: function() {
                    return i.addClass("loading")
                },
                success: function(e, n, r) {
                    return i.removeClass("loading"), e ? t.append(e) : i.remove()
                }
            })
        })
    })
}).call(this), $(document).ready(function() {
    $(".js-wookmark > li").length && (requestAnimationFrame(initWookmark), $(window).resize(function() {
        initWookmark()
    })), $("[data-cross-hover]").length > 1 && initCrossHover(), $(".post_content").dotdotdot({
        watch: !0
    })
});