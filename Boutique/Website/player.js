/* VimeoPlayer - v2.29.0 - 2016-08-03 */
var VimeoPlayer = function(e) {
    function t(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    (function(i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t["default"] = e, t
        }

        function a(e, t, n, r) {
            function o() {
                var t = J,
                    n = window.getComputedStyle(e, ":after");
                n && (J = n.getPropertyValue("content").replace(/["'\s]*/g, ""), J && t !== J && "undefined" != typeof Z[J] && D.events.fire(Z[J]))
            }

            function a() {
                var t = (D.config.view === s.View.main || D.config.view === s.View.privateUnlocked) && D.config.embed.settings && !D.config.embed.settings.playbar;
                e.classList.toggle("no-playbar", t), e.classList.toggle("with-fullscreen", !!D.config.embed.settings.fullscreen);
                var n = D.config.embed.settings.custom_logo;
                e.classList.toggle("with-custom-logo", !!n), e.classList.toggle("with-sticky-custom-logo", n && n.sticky), e.classList.toggle("background-mode", !!D.config.embed.settings.background), e.classList.toggle("touch-support", _["default"].touch)
            }

            function c(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? D.config.video.url : arguments[1];
                if (!(!t || e && e.metaKey)) return -1 === t.indexOf("#") && D.telecine.currentTime > 0 && D.telecine.currentTime < D.config.video.duration - 30 && !D.telecine.paused && (t += "#at=" + Math.floor(D.telecine.currentTime)), D.config.embed.on_site ? void(window.location = t) : (window.open(t), (0, u.blurActiveElement)(e), D.events.fire(s.Events.pauseButtonPressed), !1)
            }

            function d() {
                a(), D.events.on(s.Events.configChanged, a)
            }

            function v() {
                $ = new i(function(e, t) {
                    var n = function() {
                            return window.innerWidth > 0 && window.innerHeight > 0
                        },
                        i = null,
                        r = function o() {
                            return clearTimeout(i), n() ? void e() : void(i = setTimeout(o, 250))
                        };
                    D.events.once(s.Events.ready, r), D.events.once(s.Events.error, r)
                })
            }

            function p() {
                var e = function(e, t) {
                    return D.verifyConfig().then(function() {
                        var n = D.config.request,
                            i = n.signature,
                            r = n.session,
                            o = n.timestamp,
                            a = n.expires,
                            s = "https://" + D.config.player_url + "/video/" + D.config.video.id + "/" + e + "?signature=" + i + "&session=" + r + "&time=" + o + "&expires=" + a;
                        return (0, u.request)(s, {
                            method: t
                        })
                    })
                };
                D.events.on(s.Events.vodButtonPressed, function(e) {
                    if (D.config.user.purchased) {
                        if (!D.config.video.vod.is_feature && D.config.video.vod.feature_id) return void D.loadVideo(D.config.video.vod.feature_id).then(function() {
                            return D.events.fire(s.Events.playButtonPressed), D.config.video.vod.feature_id
                        })["catch"](function(e) {
                            D.events.fire(s.Control.showOverlay, "error", {
                                title: "Sorry",
                                message: "There was a problem. Please try again."
                            })
                        });
                        if (D.config.video.vod && D.config.video.vod.is_coming_soon) return;
                        return void D.events.fire(s.Events.playButtonPressed)
                    }
                    D.performDelegateAction(s.Delegate.purchase, function() {
                        D.events.fire(s.Control.openPopup, "purchase", {
                            productId: e
                        })
                    }, e)
                }), D.events.on(s.Events.likeButtonPressed, function() {
                    return D.config.user.logged_in ? void(D.config.user.id !== D.config.video.owner.id && (D.config.user.liked ? D.performDelegateAction(s.Delegate.unlike, function() {
                        e("like", "DELETE"), D.config.user.liked = !1, D.events.fire(s.Events.unliked)
                    }) : D.performDelegateAction(s.Delegate.like, function() {
                        e("like", "PUT"), D.config.user.liked = !0, D.events.fire(s.Events.liked)
                    }))) : void D.performDelegateAction(s.Delegate.loginForm, function() {
                        D.events.fire(s.Control.openPopup, "login-like")
                    }, "like")
                }), D.events.on(s.Events.watchLaterButtonPressed, function() {
                    return D.config.video.url || "unlisted" === D.config.video.privacy ? D.config.user.logged_in ? D.config.user.watch_later ? void D.performDelegateAction(s.Delegate.removeFromWatchLater, function() {
                        e("watch-later", "DELETE"), D.config.user.watch_later = !1, D.events.fire(s.Events.removedFromWatchLater)
                    }) : void D.performDelegateAction(s.Delegate.addToWatchLater, function() {
                        e("watch-later", "PUT"), D.config.user.watch_later = !0, D.events.fire(s.Events.addedToWatchLater)
                    }) : void D.performDelegateAction(s.Delegate.loginForm, function() {
                        D.events.fire(s.Control.openPopup, "login-watch-later")
                    }, "watch-later") : void 0
                }), D.events.on(s.Events.collectionsButtonPressed, function() {
                    D.performDelegateAction(s.Delegate.collectionsOverlay, function() {
                        return D.config.video.vod && D.config.video.vod.url ? void c(null, D.config.video.vod.url + "#collections") : D.config.video.url ? void c(null, D.config.video.url + "#collections") : void 0
                    })
                }), D.events.on(s.Events.shareButtonPressed, function() {
                    var e = D.config.embed.settings.share && D.config.embed.settings.share.embed_only,
                        t = function() {
                            D.events.fire(s.Control.showOverlay, "share", e)
                        };
                    return m["default"].element ? void t() : void D.performDelegateAction(s.Delegate.shareOverlay, t)
                }), D.events.on(s.Events.embedButtonPressed, function() {
                    D.config.embed.settings.share.embed_only && D.performDelegateAction(s.Delegate.shareOverlay, function() {
                        D.events.fire(s.Control.showOverlay, "share", !0)
                    })
                })
            }

            function g() {
                function t() {
                    var e = 90 === Math.abs(window.orientation) ? screen.height : screen.width;
                    return _["default"].mobileAndroid && !_["default"].browser.chrome && !_["default"].browser.opera && _["default"].android >= 4 && (e /= window.devicePixelRatio), e / window.innerWidth
                }

                function n(e) {
                    var t = Math.round(10 * Math.pow(e, -1.2));
                    return Math.max(t, 10) + "px"
                }

                function i(e) {
                    var t = Math.round(10 * Math.pow(e, -.7));
                    return Math.max(t, 10) + "px"
                }

                function r() {
                    $.then(function() {
                        var e = t(),
                            r = n(e),
                            o = i(e);
                        return Y.style.fontSize = r, Q.style.fontSize = o, G.style.fontSize = o, !0
                    })["catch"](function() {})
                }

                function o() {
                    Y.style.fontSize = "", Q.style.fontSize = "", G.style.fontSize = ""
                }
                D.events.on(s.Events.didEnterFullscreen, o), D.events.on(s.Events.didExitFullscreen, r), K && (e.classList.add("mobile"), r())
            }

            function b() {
                if ((0, y["default"])(window).on("resize", o), "undefined" != typeof MutationObserver) {
                    var t = new MutationObserver(o);
                    t.observe(e, {
                        attributes: !0,
                        attributeFilter: ["class"]
                    })
                }
            }

            function w() {
                function t() {
                    var t = e;
                    if (r && r.getFullscreenElement && "function" == typeof r.getFullscreenElement) {
                        var n = r.getFullscreenElement();
                        n && n instanceof HTMLElement && n.contains(self.element) && n.classList.contains("js-player-fullscreen") && (t = n)
                    }
                    return t
                }

                function n(t, n) {
                    return u ? void(u = !1) : void(o || (o = !0, D.events.fire(s.Events.didEnterFullscreen, e === t, a)))
                }

                function i(e) {
                    return u ? void(u = !1) : void(o && (o = !1, D.events.fire(s.Events.didExitFullscreen, a), a || D.events.fire(s.Control.toggleNativeControls, !1), a = !1))
                }
                D.config.embed.fullscreen = !0, _["default"].iPad && e.classList.add("no-fullscreen-api-support"), m["default"].enabled && !_["default"].browser.bb10 || _["default"].iPad || (e.classList.add("no-fullscreen-support"), _["default"].iOS || (D.config.embed.fullscreen = !1));
                var o = !1,
                    a = !1,
                    u = !1;
                D.events.on([s.Events.pictureInPictureActivated, s.Events.pictureInPictureDeactivated], function() {
                    u = !0
                }), D.events.on(s.Control.forceFullscreen, function() {
                    return m["default"].enabled || m["default"].videoEnabled(e) ? (D.events.fire(s.Events.willEnterFullscreen), a = !1, void m["default"].request(t())) : void D.events.fire(s.Control.toggleNativeControls, !0)
                }), D.events.on(s.Events.fullscreenButtonPressed, function() {
                    "picture-in-picture" === D.telecine.presentationMode && D.events.fire(s.Control.deactivatePictureInPicture), m["default"].element ? (D.events.fire(s.Events.willExitFullscreen), m["default"].exit()) : (D.events.fire(s.Events.willEnterFullscreen), a = !0, m["default"].request(t()))
                });
                var c = m["default"].onenter,
                    l = m["default"].onexit;
                if (m["default"].onenter = function(t) {
                        return o ? void 0 : e.contains(t) ? void n(t, !0) : void("function" == typeof c && c(t))
                    }, m["default"].onexit = function() {
                        return o ? void i(!0) : void("function" == typeof l && l())
                    }, (0, y["default"])(e).on("click", "a", function(e) {
                        m["default"].element === t() && m["default"].exit()
                    }), (0, y["default"])(e).on("gestureend", function(e) {
                        e.scale > 1 && D.events.fire(s.Events.fullscreenButtonPressed)
                    }), "undefined" != typeof MSGesture) {
                    var d = 1,
                        f = new MSGesture;
                    f.target = e, (0, y["default"])(e).on("pointerdown", function(e) {
                        f.addPointer(e.pointerId)
                    }).on(["MSGestureChange"], function(e) {
                        d *= e.scale
                    }).on(["MSGestureEnd"], function() {
                        (!o && d >= 2 || o && 1 > d) && D.events.fire(s.Events.fullscreenButtonPressed), d = 1
                    })
                }
            }

            function E() {
                var e = D.config.embed.settings.instant_sidedock,
                    t = D.config.video.vod,
                    n = t && "purchase_options" in t && t.purchase_options.length,
                    i = t && l.isAvailableInCountry(D.config.video.vod.countries, D.config.request.country);
                (e || n && i) && (Q.classList.remove("hidden"), Q.hidden = !1)
            }

            function T() {
                (0, f["default"])(e, "a[data-clip-link]", c), D.events.on(s.Control.openVimeo, c)
            }

            function P() {
                d(), v(), p(), g(), b(), w(), E(), T()
            }

            function L() {
                U || (U = new B["default"](D, e.querySelector(".overlay-wrapper")))
            }

            function M() {
                W || (W = new R["default"](D, {
                    uuid: D.uuid,
                    id: e.id,
                    isMobileDevice: !1
                }))
            }

            function F() {
                X || (X = new V["default"](D))
            }

            function I() {
                L(), M(), F(), void new S["default"](D, Y), void new x["default"](D, e);
                var t = new O["default"](D, e);
                void new A["default"](D, e.querySelector(".notification-wrapper")), void new q["default"](D, e.querySelector(".outro-wrapper")), void new H["default"](D, Q), void new z["default"](D, G), Object.defineProperties(N, {
                    pauseKeyboard: {
                        enumerable: !0,
                        value: t.pause
                    },
                    unpauseKeyboard: {
                        enumerable: !0,
                        value: t.unpause
                    }
                })
            }
            h["default"].helpers = l;
            var j = (0, u.loadCss)(n),
                D = new k["default"]({
                    element: e,
                    delegate: r,
                    cssLoadedPromise: j
                });
            e.classList.add("js-player-fullscreen");
            var N = D.externalApi,
                U = null,
                W = null,
                X = null,
                $ = null,
                Y = e.querySelector(".controls"),
                Q = e.querySelector(".sidedock"),
                G = e.querySelector(".title"),
                K = _["default"].mobileAndroid || _["default"].iPhone || _["default"].windowsPhone || _["default"].browser.bb10,
                J = "normal",
                Z = {
                    tiny: s.Events.enteredTinyMode,
                    mini: s.Events.enteredMiniMode,
                    normal: s.Events.enteredNormalMode,
                    none: s.Events.enteredNormalMode
                },
                ee = {
                    initializationHandler: function() {
                        return I(), P(), i.resolve()
                    },
                    postInitializationHandler: function() {
                        return D.telecine && void new C["default"](D, e.querySelector(".stats-debug")), i.resolve()
                    },
                    authorizationHandler: function(e) {
                        e(), L(), M();
                        var t = "Error",
                            n = "Unhandled video privacy";
                        switch (D.config.view) {
                            case s.View.privatePassword:
                                return new i(function(e, t) {
                                    D.events.fire(s.Control.showOverlay, "password"), D.events.once(s.Events.passwordUnlocked, function(t) {
                                        e(t)
                                    })
                                });
                            case s.View.privateLocked:
                                F();
                                var r = "private-locked",
                                    o = null;
                                return D.config.user.logged_in && (r = "error", o = {
                                    title: "Private Video",
                                    message: "Sorry, you don’t have permission to watch.",
                                    modal: !0,
                                    logo: !!D.config.embed.settings.branding,
                                    icon: "lock"
                                }), D.events.fire(s.Control.showOverlay, r, o), i.reject();
                            case s.View.error:
                                t = D.config.title, n = D.config.message
                        }
                        return D.events.fire(s.Control.showOverlay, "error", {
                            title: t,
                            message: n,
                            modal: !0
                        }), i.reject()
                    }
                };
            return D.init(t, ee).then(function() {
                return D.config.view !== s.View.privateUnlocked || D.config.embed.autoplay || D.events.fire(s.Control.showOverlay, "private-unlocked"), !0
            })["catch"](function(t) {
                L(), M(), e.classList.remove("loading"), D.events.fire(s.Events.error, "error", {
                    message: "There was an error loading this video.",
                    modal: !0,
                    "final": !0
                })
            }), N
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(2),
            u = n(5),
            c = n(75),
            l = o(c),
            d = n(13),
            f = r(d),
            v = n(9),
            h = r(v),
            p = n(76),
            m = r(p),
            g = n(8),
            y = r(g),
            b = n(6),
            _ = r(b),
            w = n(65),
            k = r(w),
            E = n(79),
            S = r(E),
            T = n(80),
            x = r(T),
            P = n(66),
            C = r(P),
            L = n(81),
            O = r(L),
            M = n(82),
            A = r(M),
            F = n(83),
            q = r(F),
            I = n(84),
            B = r(I),
            j = n(78),
            R = r(j),
            D = n(68),
            V = r(D),
            N = n(85),
            H = r(N),
            U = n(86),
            z = r(U);
        t["default"] = a, e.exports = t["default"]
    }).call(t, n(3))
}, function(e, t, n) {
    (function(t) {
        "use strict";
        e.exports = n(42)() ? t : n(44)
    }).call(t, n(1))
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
            main: 1,
            privateLocked: 2,
            privateUnlocked: 3,
            privatePassword: 4,
            error: 7,
            contentRating: 9
        },
        i = {
            like: {
                will: "willLikeVideo",
                did: "didLikeVideo"
            },
            unlike: {
                will: "willUnlikeVideo",
                did: "didUnlikeVideo"
            },
            addToWatchLater: {
                will: "willAddToWatchLater",
                did: "didAddToWatchLater"
            },
            removeFromWatchLater: {
                will: "willRemoveFromWatchLater",
                did: "didRemoveFromWatchLater"
            },
            purchase: {
                will: "willOpenVodPurchaseForm",
                did: "didOpenVodPurchaseForm"
            },
            shareOverlay: {
                will: "willOpenShareOverlay",
                did: "didOpenShareOverlay"
            },
            loginForm: {
                will: "willOpenLoginForm",
                did: "didOpenLoginForm"
            },
            collectionsOverlay: {
                will: "willOpenCollectionsOverlay",
                did: "didOpenCollectionsOverlay"
            },
            showOutro: {
                will: "willShowOutro",
                did: "didShowOutro"
            },
            playLog: {
                will: "willSendPlayLog",
                did: "didSendPlayLog"
            }
        },
        r = {
            "application/vnd.apple.mpegurl": "hls",
            "application/vnd.vimeo.dash+json": "dash",
            "video/mp4": "progressive",
            "video/webm": "progressive",
            "video/x-flv": "progressive"
        },
        o = {
            h264: "video/mp4",
            hls: "application/vnd.apple.mpegurl",
            dash: "application/vnd.vimeo.dash+json",
            vp6: "video/x-flv",
            vp8: "video/webm",
            webm: "video/webm",
            hds: "application/f4m"
        },
        a = {
            HTMLScanner: "html",
            MediaSourceScanner: "html",
            SWFScanner: "flash"
        },
        s = {
            seek: 1,
            changeVolume: 3,
            showOverlay: 5,
            openPopup: 6,
            reset: 7,
            changeLoop: 8,
            changeQuality: 9,
            openVimeo: 10,
            changeColor: 11,
            disableHd: 14,
            disableVolume: 15,
            enableVolume: 16,
            disableCaptions: 17,
            enableCaptions: 18,
            forceFullscreen: 19,
            turnCaptionsOn: 20,
            turnCaptionsOff: 21,
            toggleNativeControls: 22,
            showOutro: 23,
            hideOutro: 24,
            setFilter: 25,
            activatePictureInPicture: 26,
            deactivatePictureInPicture: 27
        },
        u = {
            apiError: 48,
            error: 49,
            playInitiated: 50,
            paused: 51,
            played: 52,
            loadProgress: 53,
            playProgress: 54,
            seeked: 55,
            ended: 56,
            bufferStarted: 57,
            bufferEnded: 58,
            volumeChanged: 59,
            qualityChanged: 60,
            targetTimeReached: 61,
            cueChanged: 62,
            streamChanged: 63,
            adaptiveBufferStarted: 64,
            adaptiveBufferEnded: 65,
            adaptiveBandwidth: 66,
            resize: 67,
            streamTargetChange: 68,
            forcedQuality: 69,
            fullscreenButtonPressed: 100,
            pauseButtonPressed: 101,
            playButtonPressed: 102,
            hdButtonPressed: 103,
            ccButtonPressed: 104,
            scrubbingStarted: 105,
            scrubbingEnded: 106,
            volumeScrubbingStarted: 107,
            volumeScrubbingEnded: 108,
            controlBarVisibilityChanged: 109,
            sidedockVisibilityChanged: 110,
            menuVisibilityChanged: 111,
            captionsChanged: 112,
            badgePressed: 140,
            willEnterFullscreen: 150,
            didEnterFullscreen: 151,
            willExitFullscreen: 152,
            didExitFullscreen: 153,
            likeButtonPressed: 200,
            watchLaterButtonPressed: 201,
            shareButtonPressed: 202,
            embedButtonPressed: 203,
            vodButtonPressed: 205,
            collectionsButtonPressed: 206,
            overlayOpened: 250,
            overlayClosed: 251,
            overlayCleared: 252,
            overlayCloseButtonPressed: 253,
            facebookButtonPressed: 254,
            twitterButtonPressed: 255,
            tumblrButtonPressed: 256,
            emailButtonPressed: 257,
            embedCodeCopied: 258,
            popupOpened: 259,
            filterButtonPressed: 260,
            debugButtonPressed: 261,
            emailCaptureSubmitted: 262,
            popupClosed: 263,
            mousedOut: 300,
            mousedOver: 301,
            mouseTimeout: 302,
            liked: 303,
            unliked: 304,
            addedToWatchLater: 305,
            removedFromWatchLater: 306,
            userLogIn: 307,
            userLoggedIn: 308,
            userLoggedOut: 309,
            loginFailure: 310,
            colorChanged: 311,
            configChanged: 312,
            passwordUnlocked: 313,
            privateUnlocked: 314,
            enteredTinyMode: 315,
            enteredMiniMode: 320,
            enteredNormalMode: 316,
            signatureExpired: 317,
            requestConfigReloaded: 318,
            embedSettingChanged: 319,
            outroDisplayed: 321,
            outroHidden: 322,
            outroVideoPressed: 323,
            becameActive: 324,
            becameInactive: 325,
            tipped: 326,
            emailCaptureSuccess: 327,
            titleModuleReady: 350,
            sidedockModuleReady: 351,
            controlBarModuleReady: 352,
            videoModuleReady: 353,
            overlayModuleReady: 354,
            notificationModuleReady: 355,
            statsModuleReady: 356,
            apiModuleReady: 357,
            analyticsModuleReady: 358,
            ready: 359,
            notificationHidden: 400,
            alertVisibilityChanged: 401,
            airPlayAvailable: 500,
            airPlayNotAvailable: 501,
            airPlayActivated: 502,
            airPlayDeactivated: 503,
            airPlayButtonPressed: 504,
            pictureInPictureAvailable: 505,
            pictureInPictureNotAvailable: 506,
            pictureInPictureActivated: 507,
            pictureInPictureDeactivated: 508,
            cedexisResponseReceived: 600
        };
    t.View = n, t.Delegate = i, t.MimeToDelivery = r, t.CodecToMime = o, t.ScannerToType = a, t.Control = s, t.Events = u
}, function(e, t, n) {
    var i;
    (function(r, o) {
        /*! Native Promise Only
        	    v0.8.1 (c) Kyle Simpson
        	    MIT License: http://getify.mit-license.org
        	*/
        ! function(r, o, a) {
            o[r] = o[r] || a(), "undefined" != typeof e && e.exports ? e.exports = o[r] : (i = function() {
                return o[r]
            }.call(t, n, t, e), !(void 0 !== i && (e.exports = i)))
        }("Promise", "undefined" != typeof r ? r : this, function() {
            "use strict";

            function e(e, t) {
                v.add(e, t), f || (f = p(v.drain))
            }

            function t(e) {
                var t, n = typeof e;
                return null == e || "object" != n && "function" != n || (t = e.then), "function" == typeof t ? t : !1
            }

            function n() {
                for (var e = 0; e < this.chain.length; e++) i(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
                this.chain.length = 0
            }

            function i(e, n, i) {
                var r, o;
                try {
                    n === !1 ? i.reject(e.msg) : (r = n === !0 ? e.msg : n.call(void 0, e.msg), r === i.promise ? i.reject(TypeError("Promise-chain cycle")) : (o = t(r)) ? o.call(r, i.resolve, i.reject) : i.resolve(r))
                } catch (a) {
                    i.reject(a)
                }
            }

            function r(i) {
                var o, s = this;
                if (!s.triggered) {
                    s.triggered = !0, s.def && (s = s.def);
                    try {
                        (o = t(i)) ? e(function() {
                            var e = new u(s);
                            try {
                                o.call(i, function() {
                                    r.apply(e, arguments)
                                }, function() {
                                    a.apply(e, arguments)
                                })
                            } catch (t) {
                                a.call(e, t)
                            }
                        }): (s.msg = i, s.state = 1, s.chain.length > 0 && e(n, s))
                    } catch (c) {
                        a.call(new u(s), c)
                    }
                }
            }

            function a(t) {
                var i = this;
                i.triggered || (i.triggered = !0, i.def && (i = i.def), i.msg = t, i.state = 2, i.chain.length > 0 && e(n, i))
            }

            function s(e, t, n, i) {
                for (var r = 0; r < t.length; r++) ! function(r) {
                    e.resolve(t[r]).then(function(e) {
                        n(r, e)
                    }, i)
                }(r)
            }

            function u(e) {
                this.def = e, this.triggered = !1
            }

            function c(e) {
                this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
            }

            function l(t) {
                if ("function" != typeof t) throw TypeError("Not a function");
                if (0 !== this.__NPO__) throw TypeError("Not a promise");
                this.__NPO__ = 1;
                var i = new c(this);
                this.then = function(t, r) {
                    var o = {
                        success: "function" == typeof t ? t : !0,
                        failure: "function" == typeof r ? r : !1
                    };
                    return o.promise = new this.constructor(function(e, t) {
                        if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                        o.resolve = e, o.reject = t
                    }), i.chain.push(o), 0 !== i.state && e(n, i), o.promise
                }, this["catch"] = function(e) {
                    return this.then(void 0, e)
                };
                try {
                    t.call(void 0, function(e) {
                        r.call(i, e)
                    }, function(e) {
                        a.call(i, e)
                    })
                } catch (o) {
                    a.call(i, o)
                }
            }
            var d, f, v, h = Object.prototype.toString,
                p = "undefined" != typeof o ? function(e) {
                    return o(e)
                } : setTimeout;
            try {
                Object.defineProperty({}, "x", {}), d = function(e, t, n, i) {
                    return Object.defineProperty(e, t, {
                        value: n,
                        writable: !0,
                        configurable: i !== !1
                    })
                }
            } catch (m) {
                d = function(e, t, n) {
                    return e[t] = n, e
                }
            }
            v = function() {
                function e(e, t) {
                    this.fn = e, this.self = t, this.next = void 0
                }
                var t, n, i;
                return {
                    add: function(r, o) {
                        i = new e(r, o), n ? n.next = i : t = i, n = i, i = void 0
                    },
                    drain: function() {
                        var e = t;
                        for (t = n = f = void 0; e;) e.fn.call(e.self), e = e.next
                    }
                }
            }();
            var g = d({}, "constructor", l, !1);
            return l.prototype = g, d(g, "__NPO__", 0, !1), d(l, "resolve", function(e) {
                var t = this;
                return e && "object" == typeof e && 1 === e.__NPO__ ? e : new t(function(t, n) {
                    if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                    t(e)
                })
            }), d(l, "reject", function(e) {
                return new this(function(t, n) {
                    if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                    n(e)
                })
            }), d(l, "all", function(e) {
                var t = this;
                return "[object Array]" != h.call(e) ? t.reject(TypeError("Not an array")) : 0 === e.length ? t.resolve([]) : new t(function(n, i) {
                    if ("function" != typeof n || "function" != typeof i) throw TypeError("Not a function");
                    var r = e.length,
                        o = Array(r),
                        a = 0;
                    s(t, e, function(e, t) {
                        o[e] = t, ++a === r && n(o)
                    }, i)
                })
            }), d(l, "race", function(e) {
                var t = this;
                return "[object Array]" != h.call(e) ? t.reject(TypeError("Not an array")) : new t(function(n, i) {
                    if ("function" != typeof n || "function" != typeof i) throw TypeError("Not a function");
                    s(t, e, function(e, t) {
                        n(t)
                    }, i)
                })
            }), l
        })
    }).call(t, function() {
        return this
    }(), n(10).setImmediate)
}, function(e, t, n) {
    var i;
    ! function(r) {
        "use strict";
        var o = {
            make: function(e) {
                e = e || {};
                var t = {};
                return e.on = function(n, i) {
                    n = [].concat(n);
                    for (var r = 0, o = n.length; o > r; r++) {
                        var a = n[r];
                        if (!a) throw new Error("Tried to listen for an undefined event.");
                        t[a] || (t[a] = []), t[a].push(i)
                    }
                    return e
                }, e.once = function(t, n) {
                    function i() {
                        n.apply(e.off(t, i), arguments)
                    }
                    return i.handler = n, e.on(t, i)
                }, e.off = function(n, i) {
                    n = [].concat(n);
                    for (var r = 0, o = n.length; o > r; r++) {
                        var a = n[r];
                        if (!a) throw new Error("Tried to remove an undefined event.");
                        if (a in t) {
                            var s = t[a].indexOf(i);
                            if (-1 === s) {
                                for (var u = 0, c = t[a].length; c > u; u++)
                                    if (t[a][u].handler === i) {
                                        s = r;
                                        break
                                    }
                                if (-1 === s) return e
                            }
                            t[a].splice(s, 1)
                        }
                    }
                    return e
                }, e.fire = function(n) {
                    if (!n) throw new Error("Tried to fire an undefined event.");
                    if (n in t)
                        for (var i = t[n].slice(0), r = 0, o = i.length; o > r; r++) i[r].apply(e, i.slice.call(arguments, 1));
                    return e
                }, e
            }
        };
        i = function() {
            return o
        }.call(t, n, t, e), !(void 0 !== i && (e.exports = i))
    }(this)
}, function(e, t, n) {
    (function(e, n) {
        "use strict";

        function i(e, t) {
            var n = arguments.length <= 2 || void 0 === arguments[2] ? document.styleSheets[0] : arguments[2];
            try {
                n.insertRule ? n.insertRule(e + "{" + t + "}", (n.cssRules || n.rules).length) : n.addRule(e, t)
            } catch (i) {}
        }

        function r(e) {
            if (e && e.detail > 0) try {
                document.activeElement.blur()
            } catch (t) {}
        }

        function o(e) {
            var t = e.getBoundingClientRect();
            return document.msFullscreenElement && window.parent !== window && (t = {
                bottom: 100 * t.bottom,
                left: 100 * t.left,
                top: 100 * t.top,
                right: 100 * t.right,
                width: 100 * t.width,
                height: 100 * t.height
            }), t
        }

        function a(e) {
            try {
                return new URL(e).origin
            } catch (t) {}
            var n = document.createElement("a");
            return n.href = e, n.origin ? n.origin : n.protocol.replace(":", "") + "://" + n.host
        }

        function s(e) {
            var t = e.width,
                n = e.height,
                i = e.elementWidth,
                r = e.elementHeight,
                o = e.threshold,
                a = void 0 === o ? 10 : o,
                s = 1,
                u = t / n,
                c = i - r * u,
                l = r - i / u;
            if (c > 0 && a > c || l > 0 && a > l) {
                var d = i / (i - c),
                    f = r / (r - l);
                s = Math.max(d, f)
            }
            return {
                extraWidth: c,
                extraHeight: l,
                scaleFactor: s
            }
        }

        function u(e, t, n) {
            return e > n ? n : t > e ? t : e
        }

        function c(e) {
            if (e === !0) return n.resolve(null);
            var t = !1;
            return new n(function(n, i) {
                var r = function() {
                    t || ! function() {
                        t = !0;
                        var i = (new Date).getTime() - e.startTime;
                        setTimeout(function() {
                            return n(i)
                        }, 100)
                    }()
                };
                e.link.addEventListener("load", r, !1)
            })
        }

        function l(e, t, n) {
            var i = n.width,
                r = n.height,
                o = n.scrollbars,
                a = void 0 === o ? "yes" : o,
                s = n.resizable,
                u = void 0 === s ? "yes" : s,
                c = n.toolbar,
                l = void 0 === c ? "no" : c,
                d = (window.screenY || window.screenTop || 0) + window.outerHeight / 2 - r / 2,
                f = (window.screenX || window.screenLeft || 0) + window.outerWidth / 2 - i / 2;
            window.chrome && -1 !== window.navigator.userAgent.toLowerCase().indexOf("mac os x") && (r += 27), window.safari && (r += 47);
            var v = "scrollbars=" + a + ",resizable=" + u + ",toolbar=" + l;
            return window.open(e, t, "width=" + i + ",height=" + r + ",left=" + f + ",top=" + d + "," + v)
        }

        function d(e) {
            var t = e.match(/\ba?t=([0-9hms:]+)/);
            null !== t && (e = t[1]);
            var n = !1,
                i = 0,
                r = 0,
                o = 0;
            if (t = e.match(/^([0-9]+)$/), t && t.length && (n = !0, o = t[1]), n === !1 && (t = e.match(/^(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s)?/), null !== t && "" !== t[0])) {
                n = !0;
                var a = t,
                    s = g(a, 4),
                    u = s[1];
                i = void 0 === u ? 0 : u;
                var c = s[2];
                r = void 0 === c ? 0 : c;
                var l = s[3];
                o = void 0 === l ? 0 : l
            }
            if (n === !1 && (t = e.match(/^([0-9:]+)/), null !== t)) {
                n = !0;
                var d = e.split(":").reverse(),
                    f = g(d, 3);
                o = f[0];
                var v = f[1];
                r = void 0 === v ? 0 : v;
                var h = f[2];
                i = void 0 === h ? 0 : h
            }
            return n ? 60 * parseInt(i, 10) * 60 + 60 * parseInt(r, 10) + parseInt(o, 10) : null
        }

        function f(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                i = t.method,
                r = void 0 === i ? "GET" : i,
                o = t.withCredentials,
                a = void 0 === o ? !0 : o,
                s = t.allowErrorStatuses,
                u = void 0 === s ? !1 : s;
            return new n(function(t, n) {
                var i = new XMLHttpRequest;
                i.open(r, e, !0), a && (i.withCredentials = !0), i.onload = function() {
                    return i.status >= 400 && !u ? void n(i.status) : void t(i.responseText)
                }, i.onerror = function() {
                    return n(new Error("The request failed."))
                }, i.send()
            })
        }

        function v(e) {
            for (var t, n, i = (e || document).querySelectorAll("[tabindex]"), r = [], o = 0, a = 0, s = i.length; s > a; a++) t = i[a], n = window.getComputedStyle(t, ""), t.tabIndex > 0 && "none" !== n.display && n.opacity > 0 && "hidden" !== n.visibility && (r[o++] = t);
            var u = r.shift();
            u && (u.focus(), u.blur())
        }

        function h(e, t) {
            if (e = parseFloat(e), isNaN(e)) return 0;
            var n = Math.pow(10, t || 3);
            return Math.round(e * n) / n
        }

        function p(e, t) {
            var n, i, r, o, a = 0,
                s = function() {
                    a = new Date, r = null, o = e.apply(n, i)
                };
            return function() {
                var u = new Date,
                    c = t - (u - a);
                return n = this, i = arguments, 0 >= c ? (clearTimeout(r), r = null, a = u, o = e.apply(n, i)) : r || (r = setTimeout(s, c)), o
            }
        }

        function m() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(e) {
                return (e ^ 16 * Math.random() >> e / 4).toString(16)
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var g = function() {
            function t(t, n) {
                var i = [],
                    r = !0,
                    o = !1,
                    a = void 0;
                try {
                    for (var s, u = t[e.iterator](); !(r = (s = u.next()).done) && (i.push(s.value), !n || i.length !== n); r = !0);
                } catch (c) {
                    o = !0, a = c
                } finally {
                    try {
                        !r && u["return"] && u["return"]()
                    } finally {
                        if (o) throw a
                    }
                }
                return i
            }
            return function(n, i) {
                if (Array.isArray(n)) return n;
                if (e.iterator in Object(n)) return t(n, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.addCssRule = i, t.blurActiveElement = r, t.getBoundingClientRect = o, t.getOrigin = a, t.getScaleFactor = s, t.limit = u, t.loadCss = c, t.openWindow = l, t.parseTime = d, t.request = f, t.resetFocus = v, t.round = h, t.throttle = p, t.uuid = m
    }).call(t, n(1), n(3))
}, function(e, t, n) {
    (function(n) {
        "use strict";

        function i(e) {
            return new RegExp(e.toLowerCase()).test(s)
        }

        function r(e) {
            var t = document.createElement("div"),
                n = e.charAt(0).toUpperCase() + e.slice(1),
                i = (e + " " + ["Webkit", "Moz", "O", "ms"].join(n + " ") + n).split(" ");
            for (var r in i) {
                var o = i[r];
                if (void 0 !== t.style[o]) return o
            }
            return e
        }

        function o() {
            var e = navigator,
                t = !1,
                n = [0, 0, 0],
                i = null,
                r = "Shockwave Flash",
                o = "application/x-shockwave-flash",
                s = "ShockwaveFlash.ShockwaveFlash";
            if ("undefined" != typeof e.plugins && "object" === a(e.plugins[r])) i = e.plugins[r].description, !i || "undefined" != typeof e.mimeTypes && e.mimeTypes[o] && !e.mimeTypes[o].enabledPlugin || (t = !0, i = i.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), n[0] = parseInt(i.replace(/^(.*)\..*$/, "$1"), 10), n[1] = parseInt(i.replace(/^.*\.(.*)\s.*$/, "$1"), 10), n[2] = /[a-zA-Z]/.test(i) ? parseInt(i.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
            else if ("undefined" != typeof window.ActiveXObject) try {
                var u = new ActiveXObject(s);
                u && (i = u.GetVariable("$version"), i && (t = !0, i = i.split(" ")[1].split(","), n = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]))
            } catch (c) {}
            return {
                installed: t,
                version: n.join("."),
                major: n[0],
                minor: n[1],
                revision: n[2]
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = "function" == typeof n && "symbol" == typeof n.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof n && e.constructor === n ? "symbol" : typeof e
            },
            s = navigator.userAgent.toLowerCase(),
            u = i("android") ? parseFloat(s.replace(/^.* android (\d+)\.(\d+).*$/, "$1.$2")) || !0 : !1,
            c = window.devicePixelRatio || 1,
            l = i("windows phone") || i("iemobile") ? parseFloat(s.replace(/^.* windows phone (os )?(\d+)\.(\d+).*$/, "$2.$3")) || !0 : !1,
            d = i("msie") ? parseFloat(s.replace(/^.*msie (\d+).*$/, "$1")) : !1,
            f = i("trident") ? parseFloat(s.replace(/^.*trident\/(\d+)\.(\d+).*$/, "$1.$2")) + 4 : !1,
            v = i("ipad;") || i("iphone;") || i("ipod touch;") ? parseFloat(s.replace(/^.* os (\d+)_(\d+).*$/, "$1.$2")) : !1;
        t["default"] = {
            airPlay: "WebKitPlaybackTargetAvailabilityEvent" in window,
            android: u,
            iOS: v,
            mobileAndroid: u && i("mobile"),
            browser: {
                bb10: i("bb10"),
                chrome: i("chrome"),
                firefox: i("firefox"),
                ie: d || f,
                edge: i("edge"),
                opera: i("opera"),
                safari: i("safari") && i("apple") && !i("chrome") && !i("android")
            },
            devicePixelRatio: c,
            flash: o(),
            iPhone: i("iphone;") || i("ipod touch;") || i("ipod;"),
            iPad: i("ipad;"),
            iPadNonRetina: i("ipad;") && 2 > c,
            mac: i("mac os"),
            pointerEvents: window.navigator.pointerEnabled || window.navigator.msPointerEnabled || !1,
            svg: !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || i("windows phone") || window.navigator.maxTouchPoints > 1 || window.navigator.msMaxTouchPoints || !1,
            transformProperty: r("transform"),
            windowsPhone: l
        }, e.exports = t["default"]
    }).call(t, n(1))
}, function(e, t, n) {
    (function(e, n) {
        "use strict";

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function r(t, n) {
            var r, o = 0;
            return r = {}, i(r, e.iterator, function() {
                return this
            }), i(r, "next", function() {
                if (o < t.length) {
                    var e = n ? [t[o], n[o++]] : t[o++];
                    return {
                        done: !1,
                        value: e
                    }
                }
                return {
                    done: !0
                }
            }), r
        }

        function o() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
            return e.getFileById = g, e
        }

        function a() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
            return e.item = function(e) {
                return this[e]
            }, e.getTrackById = g, e
        }

        function s(t, n) {
            for (var i = t, r = Array.isArray(i), o = 0, i = r ? i : i[e.iterator]();;) {
                var a;
                if (r) {
                    if (o >= i.length) break;
                    a = i[o++]
                } else {
                    if (o = i.next(), o.done) break;
                    a = o.value
                }
                var s = a,
                    u = f(s, 2),
                    c = u[0],
                    l = u[1];
                if (n >= c && l >= n) return [c, l]
            }
            return []
        }

        function u() {
            return "undefined" != typeof window.performance && "function" == typeof window.performance.now ? window.performance.now() : Date.now()
        }

        function c() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(e) {
                return (e ^ 16 * Math.random() >> e / 4).toString(16)
            })
        }

        function l(e) {
            for (var t = window.atob(e), n = t.length, i = new Uint8Array(n), r = 0; n > r; r++) i[r] = t.charCodeAt(r);
            return i.buffer
        }

        function n(e) {
            return setTimeout(e, 0)
        }

        function d(e, t, n, i) {
            var r = 0,
                o = 0,
                a = 0,
                s = 0,
                u = e,
                c = t,
                l = n / i,
                d = u / c;
            return d >= l ? (o = c, r = (l * c).toFixed(2)) : (r = u, o = (u / l).toFixed(2)), a = Math.max((u - r) / 2, 0), s = Math.max((c - o) / 2, 0), {
                width: r,
                height: o,
                left: a,
                top: s
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var f = function() {
            function t(t, n) {
                var i = [],
                    r = !0,
                    o = !1,
                    a = void 0;
                try {
                    for (var s, u = t[e.iterator](); !(r = (s = u.next()).done) && (i.push(s.value), !n || i.length !== n); r = !0);
                } catch (c) {
                    o = !0, a = c
                } finally {
                    try {
                        !r && u["return"] && u["return"]()
                    } finally {
                        if (o) throw a
                    }
                }
                return i
            }
            return function(n, i) {
                if (Array.isArray(n)) return n;
                if (e.iterator in Object(n)) return t(n, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.createArrayIterator = r, t.createFileList = o, t.createTextTrackList = a, t.findBufferedRange = s, t.getTime = u, t.uuid = c, t.base64ToArrayBuffer = l, t.setImmediate = n, t.getFittedDimensions = d;
        var v = /Firefox/.test(navigator.userAgent),
            h = /i(Phone|Pad|Pod touch);/.test(navigator.userAgent),
            p = /Android/.test(navigator.userAgent),
            m = p && /mobile/.test(navigator.userAgent.toLowerCase()),
            g = (t.browser = {
                firefox: v,
                iOS: h,
                android: p,
                androidMobile: m
            }, function(e) {
                for (var t = 0, n = this.length; n > t; t++)
                    if (this[t].id === "" + e) return this[t];
                return null
            })
    }).call(t, n(1), n(10).setImmediate)
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t, n, i) {
        return i.relatedTarget ? n && e !== t ? !1 : t === i.relatedTarget ? !1 : !t.contains(i.relatedTarget) : !0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(74),
        a = i(o),
        s = a["default"].addEvent,
        u = "undefined" == typeof window.PointerEvent && "undefined" != typeof window.MSPointerEvent,
        c = {
            pointerdown: "MSPointerDown",
            pointerup: "MSPointerUp",
            pointercancel: "MSPointerCancel",
            pointermove: "MSPointerMove",
            pointerenter: "MSPointerEnter",
            pointerleave: "MSPointerLeave",
            pointerover: "MSPointerOver",
            pointerout: "MSPointerOut"
        },
        l = "onmspointerenter" in document,
        d = "onmspointerleave" in document;
    a["default"].addEvent = function(e, t, n) {
        u && c[t] && (t = c[t]), "transitionend" === t && (s(e, "webkitTransitionEnd", n), s(e, "otransitionend", n)), "mouseenter" === t && (t = "mouseover"), "mouseleave" === t && (t = "mouseout"), "MSPointerEnter" !== t || l || (t = "MSPointerOver"), "MSPointerLeave" !== t || d || (t = "MSPointerOut"), s(e, t, n)
    }, a["default"].matchesEvent = function(e, t, n, i, o) {
        return "mouseenter" === e || "mouseleave" === e || !l && "MSPointerEnter" === e || !d && "MSPointerLeave" === e ? r(t, n, i, o) : !0
    }, t["default"] = a["default"], e.exports = t["default"]
}, function(e, t) {
    "use strict";
    ! function() {
        var t = {};
        t.templates = {}, t.render = function(e, n) {
            return t.templates[e] ? t.templates[e].call(t, n || {}) : ""
        }, t.map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        }, t.escape = function(e) {
            return e.replace(/[&<>"'\/]/g, function(e) {
                return t.map[e]
            })
        }, t.helpers = {}, t.templates.stream_studder = function(e) {
            var t = "<h3> ";
            return t += this.render("icon_warning") || "", t += ' <span>Having issues? <button class="player-alert-button-link button-link" aria-label="Switch to auto" data-alert-autofocus data-close data-context="suggestion">Switch to Auto</button> for smoother streaming.</span></h3>'
        }, t.templates.buffer_pattern = function(e) {
            var t = '<pattern id="' + e.id + '" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="10" viewBox="0 0 10 10"><line x1="5" y1="-1" x2="-5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /><line x1="10" y1="-1" x2="0" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /><line x1="15" y1="-1" x2="5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /></pattern>';
            return t
        }, t.templates.content_rating = function(e) {
            var t = '<div class="content-rating"><h1>Hold up!</h1><p class="subtitle">This video does not match your content rating preferences.</p><p>It may contain content indended for mature audiences including: nudity, strong language, and violence. <a href="">Edit your content rating preferences.</a></p><button>I still want to watch this video</button><div class="logo">' + e.logo + "</div></div>";
            return t
        }, t.templates.controlbar = function(e) {
            var t = '<button class="play rounded-box state-' + e.playState + '" title="Play" data-title-play="Play" data-title-pause="Pause" aria-label="Play"><div class="tiny-bars"><svg width="100%" height="100%" viewBox="0 0 65 40"><defs><clipPath id="rounded-border"><rect height="100%" width="100%" x="0" y="0" rx="5"/></clipPath> ';
            return t += this.render("buffer_pattern", {
                id: "tiny-buffer"
            }) || "", t += ' </defs><g clip-path="url(#rounded-border)"><rect class="buffer hidden" height="3" width="110%" x="0" y="37" fill="url(#tiny-buffer)"/><rect class="loaded" height="3" width="0" x="0" y="37" fill="#666"/><rect class="played fill" height="3" width="0" x="0" y="37"/></g></svg></div><div class="play-icon">', t += this.render("icon_play") || "", t += '</div><div class="pause-icon">', t += this.render("icon_pause") || "", t += '</div></button><div class="play-bar rounded-box"><div class="progress"><div class="buffer hidden"><svg width="110%" tabindex="-1"><defs> ', t += this.render("buffer_pattern", {
                id: "buffer"
            }) || "", t += ' </defs><rect fill="url(#buffer)" width="100%" height="100%" /></svg></div><div class="loaded', e.rawDuration < 60 && (t += " short-video"), t += '" role="progressbar" aria-label="loaded" aria-valuemin="0" aria-valuemax="' + e.rawDuration + '" aria-valuenow="0"></div><div class="played" role="progressbar" aria-label="played" aria-valuemin="0" aria-valuemax="' + e.rawDuration + '" aria-valuenow="0"></div><div class="thumb-preview invisible hidden" role="presentation" aria-hidden="true"><div class="thumb"></div></div><div class="ghost-timecode invisible hidden" role="presentation" aria-hidden="true"><div class="box">00:00</div></div><div class="timecode" role="presentation" aria-hidden="true"><div class="box">' + e.duration + "</div></div></div> ", e.volume && (t += ' <div class="volume" role="slider" aria-label="Volume (use arrow keys to change)" aria-valuemin="0" aria-valuemax="1" tabindex="0"><div></div><div></div><div></div><div></div><div></div></div> '), e.ccButton && (t += ' <button class="toggle cc ' + (e.ccOn ? "on" : "off") + '" title="Choose captions"> ', t += this.render("icon_cc") || "", t += " </button> "), e.hdButton && (t += ' <button class="hd" title="Select video quality" aria-label="HD"> ', t += this.render("icon_hd") || "", t += " </button> "), t += ' <button class="hidden toggle filter off" title="Choose a filter to apply the video"><svg viewBox="0 0 210 200" version="1.1"><g fill="none" fill-rule="evenodd"><circle class="red" fill="#f00" cx="63.5" cy="136.5" r="63.5"/><circle class="blue" fill="#2653ff" cx="146.5" cy="136.5" r="63.5"/><circle class="green" fill="#0f0" cx="104.5" cy="63.5" r="63.5"/></g></svg></button> ', e.airplayButton && (t += ' <button class="toggle airplay off hidden" title="Choose an AirPlay device" data-title-off="Choose an AirPlay device" data-title-on="Turn off AirPlay" hidden> ', t += this.render("icon_airplay") || "", t += " </button> "), t += ' <button class="pip hidden enter" title="Enter Picture-in-Picture" data-title-enter="Enter Picture-in-Picture" data-title-return="Exit Picture-in-Picture" hidden> ', t += this.render("icon_pip") || "", t += ' </button><button class="fullscreen', e.fullscreenButton || (t += " only-in-fullscreen"), t += '" title="Enter full screen" data-title-fullscreen="Enter full screen" data-title-unfullscreen="Exit full screen" aria-label="Fullscreen"><div class="fullscreen-icon">', t += this.render("icon_fullscreen") || "", t += '</div><div class="unfullscreen-icon">', t += this.render("icon_unfullscreen") || "", t += "</div></button> ", e.vimeoLogo.show && (t += ' <div class="logo"> ', e.vimeoLogo.showLink && (t += ' <a href="' + e.vimeoLogo.url + '"', e.targetBlank && (t += ' target="_blank"'), t += ' title="Watch on vimeo.com" aria-label="Watch on vimeo.com" data-clip-link> '), t += this.render("logo") || "", e.vimeoLogo.showLink && (t += " </a> "), t += " </div> "), t += ' <div class="mobile-timecode" role="presentation" aria-hidden="true">' + e.duration + "</div></div> ", e.customLogo && (t += ' <div class="custom-logo', e.customLogo.sticky && (t += " sticky"), t += '" style="width:' + e.customLogo.width + "px;height:" + e.customLogo.height + 'px"> ', e.customLogo.showLink && (t += '<a href="' + e.customLogo.url + '" target="_blank">'), t += ' <img src="' + e.customLogo.img + '" alt=""> ', e.customLogo.showLink && (t += "</a>"), t += " </div>"), t += ""
        }, t.templates.controlbar_trailer = function(e) {
            var t = '<button class="play trailer rounded-box" title="Play Trailer" aria-label="Play Trailer"><div><span class="play-icon">';
            return t += this.render("icon_play") || "", t += "</span><p>" + e.text + "</p></div></button>", e.vimeoLogo.show && (t += ' <div class="logo"> ', e.vimeoLogo.showLink && (t += ' <a href="' + e.vimeoLogo.url + '"', e.targetBlank && (t += ' target="_blank"'), t += ' title="Watch on vimeo.com" aria-label="Watch on vimeo.com" data-clip-link> '), t += this.render("logo") || "", e.vimeoLogo.showLink && (t += " </a> "), t += " </div>"), t += "", e.customLogo && (t += ' <div class="custom-logo', e.customLogo.sticky && (t += " sticky"), t += '" style="width:' + e.customLogo.width + "px;height:" + e.customLogo.height + 'px"> ', e.customLogo.showLink && (t += '<a href="' + e.customLogo.url + '" target="_blank">'), t += ' <img src="' + e.customLogo.img + '" alt=""> ', e.customLogo.showLink && (t += "</a>"), t += " </div>"), t += ""
        }, t.templates.error = function(e) {
            var t = '<div class="window-wrapper error"><h1>' + e.title + "</h1> ";
            return e.message && (t += " <p>" + e.message + "</p> "), t += "</div>"
        }, t.templates.help = function(e) {
            var t = '<div class="window-wrapper help"><h1>Keyboard Shortcuts</h1><dl><div class="volume-up secondary"><dt class="arrow">↑</dt><dd>Volume up</dd></div><div class="volume-down secondary"><dt class="arrow">↓</dt><dd>Volume down</dd></div><div class="scrub-forward secondary"><dt class="arrow">→</dt><dd>Scrub forward</dd></div><div class="scrub-backwards secondary"><dt class="arrow">←</dt><dd>Scrub backwards</dd></div><div class="like"><dt>L</dt><dd>Like</dd></div><div class="share"><dt>S</dt><dd>Share</dd></div><div class="watch-later"><dt>W</dt><dd>Watch Later</dd></div><div class="toggle-captions"><dt>C</dt><dd>Toggle Captions</dd></div><div class="toggle-hd"><dt>H</dt><dd>Toggle HD menu</dd></div><div class="fullscreen"><dt>F</dt><dd>Toggle fullscreen</dd></div> ';
            return e.onSite || (t += '<div class="view-on-vimeo"><dt>V</dt><dd>View on Vimeo</dd></div>'), t += " </dl></div>"
        }, t.templates.icon_airplay = function(e) {
            var t = '<svg class="airplay-icon" viewBox="0 0 44 36" tabindex="-1"><polygon class="fill" points="0,0 44,0 44,27 34.5,27 31,23 40,23 40,4 4,4 4,23 13,23 9.5,27 0,27"/><polygon class="fill" points="7,36 22,18 37,36"/></svg>';
            return t
        }, t.templates.icon_back = function(e) {
            var t = '<svg class="icon-back" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M0 32l32 32v-20h32l0-24h-32v-20z"/></svg>';
            return t
        }, t.templates.icon_broken_heart = function(e) {
            var t = '<svg class="unlike-icon" viewBox="0 0 110 81" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M82.496 1c-14.594 0-23.198 10.043-25.948 14.48l-6.77 10.727 13.661 8.543-13.661 12.535 5.695 15.348-9.686-15.348 11.389-11.975-11.969-7.402s4.22-14.27 4.621-15.521c.782-2.438.782-2.438-.813-3.289-5.516-2.944-12.608-8.098-21.509-8.098-16.299 0-27.506 15.037-27.506 27.885 0 12.795 12.562 22.558 22.245 27.592 9.186 4.771 30.601 18.349 32.755 24.523 2.154-6.174 23.57-19.752 32.753-24.523 9.684-5.034 22.247-14.797 22.247-27.592 0-12.848-11.208-27.885-27.504-27.885z"/></svg>';
            return t
        }, t.templates.icon_cc = function(e) {
            var t = '<svg viewBox="0 0 20 14" tabindex="-1"><path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M17 0h-14c-1.657 0-3 1.343-3 3v8c0 1.656 1.343 3 3 3h14c1.657 0 3-1.344 3-3v-8c0-1.657-1.343-3-3-3zm-7.271 8.282c-.145.923-.516 1.686-1.105 2.268-.597.591-1.369.89-2.294.89-1.138 0-2.049-.402-2.706-1.195-.647-.786-.975-1.866-.975-3.215 0-1.458.372-2.603 1.105-3.403.65-.708 1.487-1.067 2.487-1.067 1.33 0 2.321.482 2.947 1.435.34.53.526 1.072.553 1.611l.013.236h-1.984l-.044-.169c-.092-.355-.207-.622-.343-.793-.239-.298-.591-.443-1.076-.443-.483 0-.856.209-1.14.641-.298.455-.449 1.12-.449 1.977 0 .851.156 1.49.466 1.898.298.395.666.588 1.122.588.469 0 .814-.16 1.058-.491.138-.183.255-.472.351-.856l.042-.17h2.013l-.041.258zm7.582 0c-.145.923-.516 1.686-1.104 2.268-.598.591-1.369.89-2.294.89-1.139 0-2.049-.402-2.707-1.195-.646-.785-.975-1.865-.975-3.214 0-1.458.372-2.603 1.106-3.403.649-.708 1.485-1.067 2.486-1.067 1.33 0 2.32.482 2.946 1.435.34.53.526 1.072.554 1.611l.012.236h-1.9829999999999999l-.043-.169c-.092-.355-.208-.623-.344-.793-.238-.298-.591-.443-1.076-.443-.483 0-.856.209-1.139.641-.299.455-.45 1.12-.45 1.977 0 .851.157 1.49.467 1.898.299.395.666.588 1.121.588.469 0 .814-.16 1.058-.491.138-.183.256-.472.352-.856l.042-.17h2.012l-.041.257z"/></svg>';
            return t
        }, t.templates.icon_clock = function(e) {
            var t = '<svg class="watch-later-icon" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1"><polyline class="fill hour-hand" points="9.64,4.68 10.56,4.68 11.28,11.21 8.93,11.21 9.64,4.68" /><polyline class="fill minute-hand" points="14.19,13.65 13.7,14.14 8.58,10.4 10.44,8.5 14.19,13.65" /><circle class="stroke" cx="10" cy="10" r="8" stroke-width="2" /></svg>';
            return t
        }, t.templates.icon_close = function(e) {
            var t = '<svg class="icon-close" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M60 48.796l-16.812-16.796 16.812-16.796-11.204-11.204-16.796 16.804-16.804-16.804-11.196 11.204 16.796 16.796-16.796 16.796 11.196 11.204 16.804-16.804 16.796 16.804z"/></svg>';
            return t
        }, t.templates.icon_collections = function(e) {
            var t = '<svg class="collections-icon" viewBox="0 0 24 24" tabindex="-1"><path class="fill" d="M24 12c0-.3-.1-.6-.4-.8l-2.7-2.3 2.4-1c.4-.1.7-.5.7-.9 0-.3-.1-.6-.4-.8l-7-6c-.1-.1-.4-.2-.6-.2-.1 0-.3 0-.4.1l-15 6c-.3.1-.6.5-.6.9 0 .3.1.6.4.8l2.7 2.3-2.4 1c-.4.1-.7.5-.7.9 0 .3.1.6.4.8l2.7 2.3-2.4 1c-.4.1-.7.5-.7.9 0 .3.1.6.4.8l7 6c.1.1.4.2.6.2.1 0 .3 0 .4-.1l15-6c.4-.1.6-.5.6-.9 0-.3-.1-.6-.4-.8l-2.7-2.3 2.4-1c.4-.1.7-.5.7-.9zm-8.2-9.8l5.3 4.5-12.9 5.1-5.3-4.5 12.9-5.1zm5.3 14.5L8.2 21.8l-5.3-4.5 1.9-.8 2.6 2.2c.1.2.4.3.6.3.1 0 .3 0 .4-.1l10.5-4.2 2.2 2zm-12.9.1l-5.3-4.5 1.9-.8 2.6 2.2c.1.2.4.3.6.3.1 0 .3 0 .4-.1l10.5-4.2 2.3 1.9-13 5.2z"/></svg>';
            return t
        }, t.templates.icon_embed = function(e) {
            var t = '<svg class="embed-icon" viewBox="0 0 55 48" preserveAspectRatio="xMidYMid" tabindex="-1"><polygon class="fill" points="16.019,16.385 11.968,13.131 0,24.543 12.082,35.955 16.132,32.703 7.439,24.543"/><polygon class="fill" points="42.92,13.131 38.868,16.384 47.561,24.542 38.981,32.701 43.033,35.955 55,24.542"/><polygon class="fill" points="24.083,39.221 28.76,39.221 36.243,8.351 31.566,8.351"/></svg>';
            return t
        }, t.templates.icon_facebook = function(e) {
            var t = '<svg class="facebook-icon" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M35.992 64h-11.992v-32h-8v-11.028l8-0.004-0.013-6.497c0-8.997 2.44-14.471 13.037-14.471h8.824v11.030h-5.514c-4.127 0-4.325 1.541-4.325 4.418l-0.016 5.52h9.918l-1.169 11.028-8.741 0.004-0.008 32z"/></svg>';
            return t
        }, t.templates.icon_fullscreen = function(e) {
            var t = '<svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid" tabindex="-1"><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(90)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(180)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(270)" /></svg>';
            return t
        }, t.templates.icon_hd = function(e) {
            var t = '<svg viewBox="';
            return t += e.notification ? "-1 -1 104.717 49.035" : "0 0 102.717 47.035", t += '" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="', t += e.stroke ? "stroke" : "fill", t += '" d="M100.014 6.758c-1.352-2.162-3.244-3.781-5.676-5.134-2.434-1.083-5.947-1.624-10.274-1.624h-21.625l-7.297 47.035h21.895c2.434 0 5.676-.274 8.92-1.352 2.434-.542 4.596-1.627 7.03-3.785 2.161-1.621 4.324-4.055 5.675-7.028 1.621-2.701 2.973-6.757 3.786-11.623.269-3.244.269-6.487.269-9.19-.54-2.704-1.352-5.138-2.703-7.299zm-12.433 16.76c-.541 3.783-1.352 6.485-2.165 8.109-1.08 1.893-2.162 2.703-3.782 3.514-1.083.541-3.515 1.082-6.217 1.082h-3.517l3.517-25.41h3.782c3.514 0 6.217.811 7.568 2.703 1.083 1.625 1.352 5.135.814 10.002z"/><path class="', t += e.stroke ? "stroke" : "fill", t += '" d="M37.572,0L35.14,16.491H19.463L21.895,0H7.027L0,47.035h14.866l2.703-18.922h15.677l-2.971,18.922h14.866L52.439,0H37.572z"/></svg>'
        }, t.templates.icon_heart = function(e) {
            var t = '<svg class="like-icon" viewBox="0 0 110 81" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M82.496 1c-14.698 0-25.969 11.785-27.496 13.457-1.526-1.672-12.798-13.457-27.494-13.457-16.299 0-27.506 15.037-27.506 27.885 0 12.795 12.562 22.558 22.245 27.592 9.186 4.771 30.601 18.349 32.755 24.523 2.154-6.174 23.57-19.752 32.755-24.523 9.684-5.034 22.245-14.797 22.245-27.592 0-12.848-11.206-27.885-27.504-27.885z"/></svg>';
            return t
        }, t.templates.icon_lock = function(e) {
            var t = '<svg viewBox="0 0 46 76" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill bolt" d="M5,42v-15C8,5 39,5 42,27v30h-7v-30C32,14 15,14 12,27v15z"/><rect class="fill" x="0" y="41" height="35" width="46" rx="4" ry="4"/></svg>';
            return t
        }, t.templates.icon_mail = function(e) {
            var t = '<svg class="mail-icon" viewBox="0 0 72 72" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M71.754,57.6C71.9,57.169,72,56.718,72,56.241V16.759c0-0.453-0.092-0.881-0.225-1.291l-23.487,19.86L71.754,57.6z"/><path class="fill" d="M35.999,40.118l6.187-4.971l3.131-2.516L68.9,12.693c-0.387-0.113-0.789-0.193-1.213-0.193H4.312c-0.424,0-0.827,0.08-1.215,0.194l23.599,19.949l3.132,2.517L35.999,40.118z"/><path class="fill" d="M67.688,60.5c0.405,0,0.791-0.074,1.164-0.18L45.157,37.843l-9.159,7.361l-9.145-7.351L3.15,60.322C3.522,60.426,3.907,60.5,4.312,60.5H67.688z"/><path class="fill" d="M0.226,15.468C0.092,15.878,0,16.307,0,16.759v39.482c0,0.478,0.099,0.929,0.247,1.356l23.476-22.261L0.226,15.468z"/></svg>';
            return t
        }, t.templates.icon_pause = function(e) {
            var t = '<svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1"><rect class="fill" width="6" height="20" x="0" y="0" /><rect class="fill" width="6" height="20" x="12" y="0" /></svg>';
            return t
        }, t.templates.icon_play = function(e) {
            var t = '<svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1"><polygon class="fill" points="1,0 20,10 1,20" /></svg>';
            return t
        }, t.templates.icon_share = function(e) {
            var t = '<svg class="share-icon" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1"><polygon class="fill" points="20,0 0,12 5,15 17,4 7,16 7,19 9,17 14,20"/></svg>';
            return t
        }, t.templates.icon_tumblr = function(e) {
            var t = '<svg class="tumblr-icon" viewBox="0 0 12 20" tabindex="-1"><path class="fill" d="M7.865,19.958 C3.629,19.958 2.02,16.834 2.02,14.627 L2.02,8.105 L0,8.105 L0,5.527 C3.027,4.436 3.756,1.705 3.927,0.149 C3.938,0.042 4.022,0 4.07,0 L6.994,0 L6.994,5.084 L10.987,5.084 L10.987,8.105 L6.979,8.105 L6.979,14.318 C6.993,15.149 7.291,16.287 8.815,16.287 C8.843,16.287 8.872,16.287 8.9,16.286 C9.43,16.272 10.14,16.118 10.511,15.941 L11.471,18.788 C11.11,19.317 9.481,19.932 8.015,19.957 C7.964,19.958 7.915,19.958 7.865,19.958"/></svg>';
            return t
        }, t.templates.icon_twitter = function(e) {
            var t = '<svg class="twitter-icon" viewBox="0 0 274 223" preserveAspectRatio="xMidYMid" tabindex="-1"><path class="fill" d="M85.98,222 C54.305,222 24.822,212.715 0,196.801 C4.388,197.319 8.853,197.584 13.38,197.584 C39.658,197.584 63.843,188.617 83.039,173.574 C58.495,173.121 37.781,156.905 30.644,134.621 C34.068,135.276 37.582,135.627 41.196,135.627 C46.312,135.627 51.267,134.942 55.974,133.66 C30.314,128.508 10.981,105.838 10.981,78.662 C10.981,78.426 10.981,78.191 10.985,77.957 C18.548,82.158 27.196,84.681 36.391,84.972 C21.341,74.914 11.438,57.746 11.438,38.287 C11.438,28.008 14.204,18.373 19.032,10.089 C46.696,44.023 88.025,66.353 134.641,68.692 C133.685,64.587 133.188,60.306 133.188,55.91 C133.188,24.935 158.302,-0.178 189.279,-0.178 C205.411,-0.178 219.988,6.634 230.22,17.535 C242.996,15.019 255,10.351 265.837,3.924 C261.649,17.021 252.756,28.013 241.175,34.955 C252.521,33.599 263.331,30.584 273.39,26.123 C265.87,37.371 256.36,47.25 245.402,55.158 C245.51,57.563 245.564,59.982 245.564,62.414 C245.564,136.533 189.148,222 85.98,222"/></svg>';
            return t
        }, t.templates.icon_unfullscreen = function(e) {
            var t = '<svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid" tabindex="-1"><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) "/><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(90)" /><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(180)" /><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(270)" /></svg>';
            return t
        }, t.templates.icon_vod = function(e) {
            var t = '<svg class="vod-icon" viewBox="0 0 21 23" tabindex="-1"><path class="fill" d="M19.602,4.716l-7.665-4.385C11.169-0.108,9.91-0.111,9.139,0.327L1.4,4.721C0.63,5.158,0,6.234,0,7.112v8.776c0,0.878,0.63,1.955,1.398,2.393l0.526,0.3l7.176,4.09c0.77,0.438,2.028,0.438,2.798,0l7.702-4.39c0.77-0.438,1.4-1.516,1.4-2.393V7.112C21,6.234,20.37,5.156,19.602,4.716z M7.336,15.761L7.337,7.24l8.008,4.26L7.336,15.761z"/></svg>';
            return t
        }, t.templates.icon_check = function(e) {
            var t = '<svg class="check-icon" viewBox="0 0 12 12"><path class="fill" d="M10.9 2.9l-.7-.7c-.2-.2-.6-.2-.8-.1L5 6.6 2.6 4.1c-.2-.1-.6-.1-.7 0l-.8.8c-.1.1-.1.5 0 .7l3.1 3.1c.4.4 1 .4 1.4 0l5.1-5.1c.3-.2.3-.6.2-.7z"/></svg>';
            return t
        }, t.templates.icon_pip = function(e) {
            var t = '<svg class="pip-icon" viewBox="0 0 16 12"><polygon class="fill" points="6 8 1 8 1 1 14 1 14 6 15 6 15 0 0 0 0 9 6 9 6 8"/><rect class="fill" x="7" y="7" width="9" height="5"/><path class="fill enter" d="M5.5,4.45a0.5,0.5,0,0,0-.5.5v1.3L2.58,3.83a0.5,0.5,0,0,0-.71.71L4.33,7H3A0.5,0.5,0,0,0,3,8H5.5A0.5,0.5,0,0,0,6,7.5V4.95A0.5,0.5,0,0,0,5.5,4.45Z" transform="translate(0 -2)"/><path class="fill return" d="M2.22,7.23a0.5,0.5,0,0,0,.5-0.5V5.43L5.15,7.85a0.5,0.5,0,0,0,.71-0.71L3.39,4.68H4.77a0.5,0.5,0,0,0,0-1H2.22a0.5,0.5,0,0,0-.5.5V6.73A0.5,0.5,0,0,0,2.22,7.23Z" transform="translate(0 -2)"/></svg>';
            return t
        }, t.templates.icon_vod_download = function(e) {
            var t = '<svg class="vod-download-icon" viewBox="0 0 32 32" tabindex="-1"><path class="fill" d="M21.707 24.707l-5 5c-.39.39-1.024.39-1.414 0l-5-5c-.39-.39-.39-1.024 0-1.414l1.06-1.06c.392-.392 1.025-.392 1.415 0L14 23.462V15c0-.552.448-1 1-1h2c.552 0 1 .448 1 1v8.464l1.232-1.232c.39-.39 1.024-.39 1.414 0l1.06 1.06c.392.39.392 1.025 0 1.415z"/><path class="fill" d="M27.894 12.31c.063-.43.106-.864.106-1.31 0-4.97-4.03-9-9-9-3.6 0-6.7 2.12-8.138 5.175C10.175 6.75 9.368 6.5 8.5 6.5 6.015 6.5 4 8.515 4 11c0 .445.067.874.187 1.28C1.76 13.05 0 15.318 0 18c0 3.314 2.686 6 6 6h1c0-2.42 1.718-4.436 4-4.9V15c0-2.21 1.79-4 4-4h2c2.21 0 4 1.79 4 4v4.1c2.282.464 4 2.48 4 4.9h1c3.314 0 6-2.686 6-6 0-2.65-1.72-4.896-4.106-5.69z"/></svg>';
            return t
        }, t.templates.icon_vod_rent = function(e) {
            var t = '<svg class="vod-rent-icon" viewBox="0 0 32 32" tabindex="-1"><path class="fill" d="M23 11H9c-.552 0-1 .448-1 1v8c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-8c0-.552-.448-1-1-1z"/><path class="fill" d="M32 22V10c-2.76 0-5-2.24-5-5H5c0 2.76-2.24 5-5 5v12c2.76 0 5 2.24 5 5h22c0-2.76 2.24-5 5-5zm-6-1c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2V11c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2v10z"/></svg>';
            return t
        }, t.templates.icon_vod_subscribe = function(e) {
            var t = '<svg class="vod-subscribe-icon" viewBox="0 0 32 32" tabindex="-1"><path class="fill" d="M20 9v2c0 .552.448 1 1 1h10c.552 0 1-.448 1-1V1c0-.552-.448-1-1-1h-2c-.552 0-1 .448-1 1v4.445C24.98 2.01 20.523-.128 15.558.005 7.293.23.413 6.96.018 15.216-.42 24.41 6.905 32 16 32c8.47 0 15.404-6.583 15.964-14.912.04-.585-.413-1.088-1-1.088H28.96c-.514 0-.956.388-.994.9C27.506 23.107 22.326 28 16 28 9.217 28 3.748 22.37 4.01 15.53 4.246 9.284 9.47 4.147 15.72 4.003 19.38 3.92 22.674 5.483 24.926 8H21c-.552 0-1 .448-1 1z"/><path class="fill" d="M13 20v-8l8 4"/></svg>';
            return t
        }, t.templates.icon_warning = function(e) {
            var t = '<svg class="warning-icon" tabindex="-1" width="36" height="32.326" viewBox="287.915 380.297 36 32.326"><path d="M309.646 382.963c-2.052-3.555-5.41-3.555-7.462 0L288.79 406.16c-2.05 3.555-.372 6.463 3.732 6.463h26.786c4.104 0 5.783-2.908 3.73-6.463l-13.392-23.197zm-2 23.224c0 .983-.804 1.788-1.788 1.788-.983 0-1.788-.805-1.788-1.788 0-.984.805-1.79 1.788-1.79s1.79.805 1.788 1.79zm-.317-7.76c-.254 2.604-.916 4.735-1.472 4.735-.557 0-1.22-2.13-1.477-4.735-.255-2.604-.464-5.72-.464-6.925 0-1.204.87-2.19 1.935-2.19 1.066 0 1.936.986 1.936 2.19s-.205 4.32-.457 6.925z"/></svg>';
            return t
        }, t.templates.logo = function(e) {
            var t = '<svg viewBox="0 0 140 40" preserveAspectRatio="xMidYMid" role="img" aria-label="Vimeo" tabindex="-1"><title>Vimeo</title><g><path class="fill logo-v" d="M31.277 18.832c-.14 3.052-2.27 7.229-6.39 12.531-4.259 5.536-7.863 8.306-10.811 8.306-1.825 0-3.371-1.687-4.633-5.059l-2.529-9.275c-.938-3.372-1.943-5.06-3.019-5.06-.234 0-1.054.494-2.458 1.477l-1.474-1.901c1.546-1.358 3.071-2.717 4.572-4.078 2.062-1.783 3.609-2.72 4.642-2.814 2.438-.234 3.938 1.433 4.502 5.001.608 3.851 1.03 6.246 1.266 7.182.704 3.195 1.476 4.791 2.321 4.791.657 0 1.641-1.037 2.954-3.108 1.312-2.072 2.015-3.649 2.109-4.732.188-1.789-.516-2.686-2.109-2.686-.75 0-1.522.173-2.318.514 1.54-5.044 4.481-7.495 8.823-7.355 3.22.095 4.737 2.184 4.552 6.266z"/><path class="fill logo-i" d="M50.613 28.713c-1.313 2.484-3.119 4.733-5.417 6.748-3.143 2.718-6.285 4.076-9.425 4.076-1.456 0-2.57-.469-3.343-1.406-.773-.938-1.137-2.153-1.09-3.653.045-1.548.526-3.938 1.441-7.173.914-3.232 1.373-4.967 1.373-5.201 0-1.218-.423-1.828-1.266-1.828-.282 0-1.079.494-2.393 1.477l-1.618-1.901c1.501-1.358 3.001-2.717 4.502-4.078 2.017-1.783 3.518-2.72 4.504-2.814 1.546-.14 2.684.314 3.411 1.367.726 1.052.996 2.417.81 4.098-.61 2.852-1.268 6.472-1.972 10.864-.046 2.01.681 3.014 2.182 3.014.656 0 1.827-.693 3.518-2.083 1.406-1.156 2.555-2.243 3.447-3.262l1.336 1.755zm-6.12-25.016c-.047 1.168-.633 2.288-1.76 3.361-1.266 1.212-2.767 1.82-4.501 1.82-2.672 0-3.963-1.166-3.869-3.499.045-1.213.76-2.381 2.144-3.501 1.384-1.119 2.919-1.68 4.609-1.68.984 0 1.805.387 2.462 1.155.656.772.961 1.553.915 2.344z"/><path class="fill logo-m" d="M94.543 28.713c-1.314 2.484-3.117 4.733-5.416 6.748-3.145 2.718-6.285 4.076-9.426 4.076-3.051 0-4.527-1.687-4.432-5.06.045-1.501.338-3.306.877-5.415.539-2.108.832-3.748.879-4.921.049-1.779-.492-2.673-1.623-2.673-1.223 0-2.682 1.456-4.375 4.362-1.788 3.05-2.754 6.003-2.894 8.861-.095 2.02.103 3.568.592 4.645-3.272.096-5.565-.444-6.873-1.617-1.171-1.032-1.708-2.742-1.614-5.135.045-1.501.276-3.001.69-4.502.414-1.5.644-2.837.69-4.011.095-1.734-.54-2.604-1.9-2.604-1.177 0-2.444 1.339-3.806 4.011-1.361 2.673-2.113 5.465-2.253 8.371-.094 2.627.074 4.456.503 5.486-3.219.096-5.505-.582-6.857-2.035-1.122-1.214-1.634-3.06-1.539-5.54.044-1.214.258-2.911.645-5.084.386-2.175.603-3.87.647-5.087.093-.841-.119-1.263-.633-1.263-.281 0-1.079.475-2.393 1.424l-1.687-1.901c.234-.184 1.71-1.545 4.432-4.078 1.969-1.828 3.306-2.766 4.009-2.812 1.219-.095 2.204.409 2.954 1.511s1.126 2.38 1.126 3.834c0 .469-.047.915-.14 1.336.703-1.077 1.523-2.017 2.463-2.814 2.156-1.874 4.572-2.931 7.245-3.166 2.298-.187 3.938.352 4.925 1.617.795 1.033 1.17 2.511 1.125 4.433.329-.28.681-.586 1.056-.915 1.078-1.267 2.133-2.273 3.164-3.023 1.736-1.267 3.541-1.97 5.418-2.112 2.25-.187 3.867.35 4.852 1.611.844 1.028 1.219 2.5 1.127 4.415-.047 1.309-.363 3.213-.949 5.712-.588 2.501-.879 3.936-.879 4.31-.049.982.047 1.659.279 2.034.236.373.797.559 1.689.559.656 0 1.826-.693 3.518-2.083 1.406-1.156 2.555-2.243 3.447-3.262l1.337 1.757z"/><path class="fill logo-e" d="M120.922 28.642c-1.361 2.249-4.033 4.495-8.02 6.743-4.971 2.856-10.012 4.284-15.125 4.284-3.797 0-6.52-1.267-8.16-3.797-1.172-1.735-1.734-3.797-1.688-6.189.045-3.797 1.736-7.407 5.064-10.832 3.658-3.75 7.973-5.627 12.945-5.627 4.596 0 7.033 1.873 7.314 5.615.188 2.384-1.125 4.842-3.938 7.368-3.004 2.76-6.781 4.515-11.328 5.263.842 1.169 2.109 1.752 3.799 1.752 3.375 0 7.059-.855 11.045-2.574 2.859-1.207 5.111-2.461 6.754-3.76l1.338 1.754zm-15.969-7.345c.045-1.259-.469-1.89-1.547-1.89-1.406 0-2.83.969-4.283 2.906-1.451 1.936-2.201 3.789-2.248 5.562-.025 0-.025.305 0 .911 2.295-.839 4.287-2.122 5.971-3.849 1.357-1.491 2.06-2.707 2.107-3.64z"/><path class="fill logo-o" d="M140.018 23.926c-.189 4.31-1.781 8.031-4.783 11.169-3.002 3.137-6.73 4.706-11.186 4.706-3.705 0-6.52-1.195-8.441-3.585-1.404-1.777-2.182-4.001-2.32-6.668-.236-4.029 1.217-7.729 4.361-11.101 3.377-3.746 7.619-5.618 12.732-5.618 3.281 0 5.766 1.102 7.457 3.301 1.594 2.015 2.32 4.614 2.18 7.796zm-7.95-.264c.047-1.269-.129-2.434-.527-3.49-.4-1.057-.975-1.587-1.725-1.587-2.391 0-4.361 1.293-5.906 3.877-1.316 2.115-2.02 4.371-2.111 6.766-.049 1.176.164 2.21.633 3.104.514 1.032 1.242 1.549 2.182 1.549 2.109 0 3.914-1.244 5.416-3.735 1.267-2.068 1.945-4.23 2.038-6.484z"/></g></svg>';
            return t
        }, t.templates.outer = function(e) {
            var t = '<div class="video-wrapper"><div class="video"><div class="telecine"></div></div></div><div class="target"></div><div class="captions hidden with-controls" hidden aria-live="assertive"><span></span></div><div class="outro-wrapper hidden" hidden><div class="outro" role="dialog" aria-live="assertive"></div></div><div class="controls-wrapper"><div class="title" role="contentinfo"></div><div class="controls"></div><div class="sidedock hidden" role="toolbar" hidden></div></div><div class="overlay-wrapper hidden" hidden><div class="overlay-cell"><div class="overlay" role="dialog" aria-live="assertive"></div><div class="overlay-icon-wrapper hidden"><div class="overlay-icon"></div></div><div class="overlay-logo logo"></div></div><nav><button class="back cloaked" aria-label="Back">';
            return t += this.render("icon_back") || "", t += '</button><button class="close" aria-label="Close overlay">', t += this.render("icon_close") || "", t += '</button></nav></div><div class="notification-wrapper hidden" hidden><div class="notification-cell"><div class="notification" role="dialog" aria-live="assertive"></div></div></div><div class="stats-debug rounded-box hidden" aria-hidden="true" hidden></div>'
        }, t.templates.outro_image = function(e) {
            var t = "<div> ";
            return e.url && (t += '<a href="' + e.url + '" target="_blank">'), t += '<img src="' + e.svg_url + '" class="outro-image">', e.url && (t += "</a>"), t += "</div>"
        }, t.templates.outro_link = function(e) {
            var t = '<h1><a href="' + e.url + '" target="_blank">';
            return t += this.escape(e.text ? e.text : e.url) || "", t += "</a></h1>"
        }, t.templates.outro_text = function(e) {
            var t = '<div class="text-wrapper"><div class="text">' + e.text + "</div></div>";
            return t
        }, t.templates.outro_videos = function(e) {
            for (var t = "", n = 0, i = e.contexts.length; i > n; n++) {
                t += "";
                var r = e.contexts[n];
                t += '<div class="video-section', r.promoted && (t += " promoted"), t += '" data-videos="' + r.videos.length + '"><div><h1>' + r.context + '</h1><ul class="videos"> ';
                for (var o = 0, a = r.videos.length; a > o; o++) t += ' <li><a href="' + r.videos[o].url + '"', e.target && (t += ' target="_blank"'), t += " title=\"'", t += this.escape(r.videos[o].title) || "", t += "'", r.videos[o].owner.id !== e.owner && (t += " from ", t += this.escape(r.videos[o].owner.name) || ""), t += '" data-video-id="' + r.videos[o].id + '"><div class="img-wrapper"><img src="' + r.videos[o].thumbnail + '" alt="" width="295" height="166"></div><div class="header-wrapper"><header><h1>', t += this.escape(r.videos[o].title) || "", t += "</h1> ", r.videos[o].owner.id !== e.owner && (t += " <h2><span>from</span>&nbsp;", t += this.escape(r.videos[o].owner.name) || "", t += "</h2> "), t += " </header></div></a> ";
                t += " </ul></div></div>"
            }
            return t += ""
        }, t.templates.outro_vod = function(e) {
            var t = '<div class="vod-wrapper"><h1 class="vod-header"><a href="' + e.url + '" target="_blank">';
            t += this.escape(e.title) || "", t += "</a></h1> ";
            var n = e.countries,
                i = e.country;
            if (this.helpers.isAvailableInCountry(n, i))
                if (e.purchased) t += ' <a class="vod-watch-button" role="button" href="' + e.url + '" target="_blank">', t += e.isPreorder ? "Watch on " + e.releaseDate : "Watch Now", t += "</a> ";
                else {
                    if (!e.isComingSoon) {
                        t += ' <ul class="vod"> ';
                        for (var r = 0, o = e.buttons.length; o > r; r++) {
                            t += ' <li><a class="vod-button ' + e.buttons[r].type + '" role="button" href="' + e.url + "#buy=" + e.buttons[r].product_id + '" target="_blank" data-product-id="' + e.buttons[r].product_id + '" role="button"><div class="icon"> ', t += "buy" === e.buttons[r].type ? this.render("icon_vod_download") || "" : "rent" === e.buttons[r].type ? this.render("icon_vod_rent") || "" : "subscribe" === e.buttons[r].type ? this.render("icon_vod_subscribe") || "" : this.render("icon_vod") || "", t += " </div> ";
                            var a = e.currency,
                                s = e.buttons[r].prices;
                            t += " <p>" + this.helpers.getDisplayPrice(e.buttons[r].outro_string, a, s) + "</p></a></li> "
                        }
                        t += " </ul> "
                    }
                    e.isPreorder ? t += " <p>Pre-order now. Watch on " + e.releaseDate + ".</p> " : e.isComingSoon && (t += e.releaseDate ? " <p>Coming soon to Vimeo On Demand on " + e.releaseDate + ".</p> " : " <p>Coming soon to Vimeo On Demand</p> ")
                }
            return t += "</div>"
        }, t.templates.overlay_email_capture = function(e) {
            var t = '<div class="window-wrapper email-capture form"><div class="email-capture-form"><h1>' + e.text + '</h1><p class="subtitle">' + e.subtitle + '</p><form action="' + e.action + '" method="post" novalidate><div class="validation-bubble hidden"><div class="validation-bubble-arrow-clipper"><div class="validation-bubble-arrow"></div></div><div class="validation-bubble-message"></div></div><input type="email" name="email" placeholder="Email address" aria-label="Email address" required aria-required="true"><input type="text" name="name" placeholder="Full name (optional)" aria-label="Full name (optional)" maxlength="180"><input type="hidden" name="referrer" value="' + e.referrer + '"><input type="hidden" name="signature" value=""><input type="hidden" name="time" value=""><input type="hidden" name="expires" value=""><input type="submit" value="Submit"></form></div><div class="email-capture-confirm hidden"><div class="check-icon-wrapper">';
            return t += this.render("icon_check") || "", t += "</div><h1>" + e.confirmation + "</h1></div></div>"
        }, t.templates.password = function(e) {
            var t = '<div class="window-wrapper password form"><h1>' + e.title + '</h1><p class="subtitle">' + e.subtitle + '</p><form action="' + e.action + '" method="post" novalidate><div class="validation-bubble hidden"><div class="validation-bubble-arrow-clipper"><div class="validation-bubble-arrow"></div></div><div class="validation-bubble-message"></div></div><input type="password" name="password" placeholder="Password" required aria-required="true" aria-label="Password"><input type="submit" value="Watch Video"></form></div>';
            return t
        }, t.templates.private_locked = function(e) {
            var t = '<div class="window-wrapper login"><h1>' + e.title + '</h1><p class="subtitle">' + e.subtitle + '</p><a href="' + e.action + '" class="popup" target="_blank" role="button" aria-label="Log in (opens in a new window)">Log in</a></div>';
            return t
        }, t.templates.private_unlocked = function(e) {
            var t = '<div class="window-wrapper form unlocked"><h1>Private Video</h1><p class="subtitle">You are logged in and have permission to watch (congrats).</p><button>Watch Video</button></div>';
            return t
        }, t.templates.share = function(e) {
            var t = '<div class="share-wrapper"><section class="share-screen' + (e.embedOnly ? " cloaked" : "") + '"><h1>Share</h1><ul class="buttons"><li><a href="' + e.playerShareUrl + '/facebook" target="_blank" class="facebook" title="Share on Facebook" role="button" aria-label="Share on Facebook">';
            return t += this.render("icon_facebook") || "", t += '</a><li><a href="' + e.playerShareUrl + '/twitter" target="_blank" class="twitter" title="Share on Twitter" role="button" aria-label="Share on Twitter">', t += this.render("icon_twitter") || "", t += '</a><li><a href="' + e.playerShareUrl + '/tumblr" target="_blank" class="tumblr" title="Share on Tumblr" role="button" aria-label="Share on Tumblr">', t += this.render("icon_tumblr") || "", t += "</a> ", e.url && (t += ' <li><a href="mailto:?subject=', t += encodeURIComponent("Check out “" + e.title + "” by " + e.owner + " on Vimeo") || "", t += "&amp;body=", t += encodeURIComponent("Check out “" + e.title + "” by " + e.owner + " on Vimeo.\n\nThe video is available for your viewing pleasure at " + e.shareUrl + "\n\nIf you like this video, make sure you share it, too!\n\nVimeo is filled with lots of amazing videos. See more at https://vimeo.com.") || "", t += '" class="email" title="Share via E-mail" role="button" aria-label="Share via E-Mail">', t += this.render("icon_mail") || "", t += "</a> "), t += " </ul> ", e.embed && (t += ' <ul class="buttons"><li><a href="' + e.url + '#share" target="_blank" class="embed" title="Get embed code" role="button" aria-label="Get embed code">', t += this.render("icon_embed") || "", t += "</a></li></ul> "), e.url && (t += ' <p class="footnote share"><a class="clip_url" href="' + e.shareUrl + '" target="_blank">' + e.shareUrl + "</a></p> "), t += " </section> ", e.embed && (t += ' <section class="embed-screen' + (e.embedOnly ? "" : " cloaked") + '"><div class="embed-wrapper"><h1>Embed</h1><p class="subtitle">Add this video to your site with the embed code below.</p><div class="embed-code form"><div><input type="text" name="embed_code" title="Embed code" value="' + e.embedCode + '" spellcheck="false" aria-readonly="true"', e.readOnly && (t += " readonly"), t += "></div> ", e.copyButton && (t += ' <button class="embed-copy" data-clipboard-text=\'' + e.embedCode + "'>Copy</button> "), t += " </div> ", e.customizeEmbed && (t += ' <p class="footnote"><a href="' + e.url + '#embed" target="_blank">Customize this embed</a> on Vimeo</p> '), t += " </div></section> "), t += "</div>"
        }, t.templates.sidedock = function(e) {
            var t = "";
            if (e.vodButton) {
                t += ' <div class="box" data-vod-expiring="' + e.vodPurchaseInfo.expiring + '" data-vod-purchased="' + e.purchased + '"><button class="vod-button rounded-box', e.purchased && (t += " on"), e.vodPurchaseInfo.expiring && (t += " expiring"), t += '" data-product-id="' + e.vodPurchaseInfo.product_id + '"><div class="vod-button-inner"> ';
                var n = e.currency,
                    i = e.vodPurchaseInfo.prices;
                t += ' <span class="vod-label">' + this.helpers.getDisplayPrice(e.vodPurchaseInfo.label_string, n, i) + "</span> ", t += this.render("icon_vod") || "", t += ' </div></button></div><div class="sidedock-inner">'
            }
            return e.likeButton && (t += ' <div class="box"><label class="rounded-box hidden like-label" role="presentation"><span>', t += e.liked ? "Unlike" : "Like", t += '</span></label><button class="like-button rounded-box', e.liked && (t += " on"), t += '" aria-label="', t += e.liked ? "Unlike" : "Like", e.loggedIn || (t += " (opens in a new window)"), t += '" data-label-add="Like" data-label-add-logged-out="Like (opens in a new window)" data-label-remove="Unlike"> ', t += this.render("icon_heart") || "", t += " </button></div>"), e.watchLaterButton && (t += ' <div class="box"><label class="rounded-box hidden watch-later-label" role="presentation"><span>', t += e.addedToWatchLater ? "Remove from" : "Add to", t += ' Watch Later</span></label><button class="watch-later-button rounded-box', e.addedToWatchLater && (t += " on"), t += '" aria-label="', t += e.addedToWatchLater ? "Remove from" : "Add to", t += " Watch Later", e.loggedIn || (t += " (opens in a new window)"), t += '" data-label-add="Add to Watch Later" data-label-add-logged-out="Add to Watch Later (opens in a new window)" data-label-remove="Remove from Watch Later"> ', t += this.render("icon_clock") || "", t += " </button></div>"), e.collectionsButton && (t += ' <div class="box"><label class="rounded-box hidden collections-label" role="presentation"><span>Add to collections</span></label><button class="collections-button rounded-box" aria-label="Add to collections"> ', t += this.render("icon_collections") || "", t += " </button></div>"), e.shareButton && (t += ' <div class="box"><label class="rounded-box hidden share-label" role="presentation"><span>' + e.shareButtonLabel + '</span></label><button class="share-button rounded-box" aria-label="' + e.shareButtonLabel + '"> ', t += this.render("icon_share") || "", t += " </button></div>"), e.vodButton && (t += " </div>"), t += ""
        }, t.templates.stats_debug = function(e) {
            var t = '<p><span class="stats-debug-label">Clip ID:</span><span class="stats-debug-value stats-debug-clip-id">' + e.clipId + "</span></p>";
            return e.displayProfile && (t += '<p><span class="stats-debug-label">Profile ID:</span><span class="stats-debug-value stats-debug-profile-id">' + e.profileId + "</span></p>"), t += '<p><span class="stats-debug-label">Delivery:</span><span class="stats-debug-value stats-debug-delivery">' + e.delivery + '</span></p><p><span class="stats-debug-label">Playing:</span><span class="stats-debug-value stats-debug-resolution">' + e.resolution + '</span></p><p><span class="stats-debug-label">Embed size:</span><span class="stats-debug-value stats-debug-dimensions">' + e.dimensions + '</span></p><p><span class="stats-debug-label">CDN:</span><span class="stats-debug-value stats-debug-cdn">' + e.cdn + "</span></p>", e.displayAudioVideoStream && (t += '<p><span class="stats-debug-label">Separate AV:</span><span class="stats-debug-value stats-debug-test-group">' + e.separateAudioVideo + "</span></p>"), t += "", e.testGroup && (t += '<p><span class="stats-debug-label">Group:</span><span class="stats-debug-value stats-debug-test-group">' + e.testGroup + "</span></p>"), t += "", e.displayDroppedFrames && (t += '<p><span class="stats-debug-label">Dropped frames:</span><span class="stats-debug-value stats-debug-dropped-frames">0 / 0</span></p>'), t += "", e.displayBandwidth && (t += '<p><span class="stats-debug-label">Bandwidth:</span><span class="stats-debug-value stats-debug-bandwidth">0 Kbps</span><span class="stats-debug-bandwidth-minmax"> (<span class="stats-debug-value stats-debug-bandwidth-min"></span><span class="stats-debug-value stats-debug-bandwidth-max"></span>) </span></p><div class="stats-debug-time-series"></div>'), t += '<button class="stats-debug-close" aria-label="Close stats debug panel">', t += this.render("icon_close") || "", t += '</button><input type="text" class="stats-debug-code"><a href="javascript:void(0)" class="stats-debug-copy" target="_blank">Open link</a>'
        }, t.templates.title = function(e) {
            var t = "<header> ";
            return e.badge && (t += ' <div class="badge', e.badge.shadow && (t += " shadow"), t += '"> ', e.badge.link && (t += '<a href="' + e.badge.link + '"', e.targetBlank && (t += ' target="_blank"'), t += ">"), t += ' <img src="' + e.badge.img + '"', e.badge.offset && (t += ' style="margin-top:' + e.badge.offset.y + "px;margin-left:" + e.badge.offset.x + 'px"'), t += ' width="' + e.badge.width + '" height="' + e.badge.height + '" alt="' + e.badge.name + ' Badge"> ', e.badge.link && (t += "</a>"), t += " </div> "), e.showPortrait && (t += ' <div class="portrait" aria-hidden="true"> ', e.linkToOwner && (t += '<a tabindex="-1" href="' + e.ownerLink + '"', e.targetBlank && (t += ' target="_blank"'), t += ">"), t += ' <img src="' + e.portraitImg + '" alt="Portrait image for ', t += this.escape(e.owner) || "", t += '" width="60" height="60"> ', e.linkToOwner && (t += "</a>"), t += " </div> "), t += ' <div class="headers"> ', e.showTitle && (t += " <h1> ", e.showTitleLink && (t += '<a href="' + e.titleLink + '"', e.targetBlank && (t += ' target="_blank"'), t += " data-clip-link>"), t += this.escape(e.title) || "", e.showTitleLink && (t += "</a>"), t += " </h1> "), e.showByline && (t += " <h2> from ", e.linkToOwner ? (t += '<a href="' + e.ownerLink + '"', e.targetBlank && (t += ' target="_blank"'), t += ">") : t += '<span class="user">', t += this.escape(e.owner) || "", t += e.linkToOwner ? "</a>" : "</span>", e.bylineBadge && (t += "&nbsp; ", e.bylineBadge.link && (t += '<a tabindex="-1" href="' + e.bylineBadge.link + '"', e.targetBlank && (t += ' target="_blank"'), t += ">"), t += ' <span class="byline-badge ' + e.bylineBadge.cssClass + '">' + e.bylineBadge.cssClass + "</span> ", e.bylineBadge.link && (t += "</a>")), t += " </h2> "), t += " </div></header>"
        }, "undefined" != typeof e && e.exports ? e.exports = t : window.Aftershave = t
    }()
}, function(e, t, n) {
    (function(e, i) {
        function r(e, t) {
            this._id = e, this._clearFn = t
        }
        var o = n(46).nextTick,
            a = Function.prototype.apply,
            s = Array.prototype.slice,
            u = {},
            c = 0;
        t.setTimeout = function() {
            return new r(a.call(setTimeout, window, arguments), clearTimeout)
        }, t.setInterval = function() {
            return new r(a.call(setInterval, window, arguments), clearInterval)
        }, t.clearTimeout = t.clearInterval = function(e) {
            e.close()
        }, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
            this._clearFn.call(window, this._id)
        }, t.enroll = function(e, t) {
            clearTimeout(e._idleTimeoutId), e._idleTimeout = t
        }, t.unenroll = function(e) {
            clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
        }, t._unrefActive = t.active = function(e) {
            clearTimeout(e._idleTimeoutId);
            var t = e._idleTimeout;
            t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                e._onTimeout && e._onTimeout()
            }, t))
        }, t.setImmediate = "function" == typeof e ? e : function(e) {
            var n = c++,
                i = arguments.length < 2 ? !1 : s.call(arguments, 1);
            return u[n] = !0, o(function() {
                u[n] && (i ? e.apply(null, i) : e.call(null), t.clearImmediate(n))
            }), n
        }, t.clearImmediate = "function" == typeof i ? i : function(e) {
            delete u[e]
        }
    }).call(t, n(10).setImmediate, n(10).clearImmediate)
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = window.Array.from,
        i = [1];
    "function" == typeof n && n(i) === i && (n = !1);
    var r = n || function(e) {
        return [].slice.call(e, 0)
    };
    t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    (function(n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = "function" == typeof n && "symbol" == typeof n.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof n && e.constructor === n ? "symbol" : typeof e
            },
            r = window.WeakMap || function() {
                var e = Object.defineProperty,
                    t = Date.now() % 1e9,
                    n = function() {
                        this.name = "__st" + (1e9 * Math.random() >>> 0) + (t++ + "__")
                    };
                return n.prototype.set = function(t, n) {
                    if ("object" !== ("undefined" == typeof t ? "undefined" : i(t)) && "function" != typeof t) throw new TypeError("Invalid value used as weak map key");
                    var r = t[this.name];
                    return r && r[0] === t ? r[1] = n : e(t, this.name, {
                        value: [t, n],
                        writable: !0
                    }), this
                }, n.prototype.get = function(e) {
                    var t;
                    return (t = e[this.name]) && t[0] === e ? t[1] : void 0
                }, n.prototype["delete"] = function(e) {
                    var t = e[this.name];
                    return t && t[0] === e ? (t[0] = t[1] = void 0, !0) : !1
                }, n.prototype.has = function(e) {
                    var t = e[this.name];
                    return t ? t[0] === e : !1
                }, n
            }();
        t["default"] = r, e.exports = t["default"]
    }).call(t, n(1))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t, n, i) {
        var r = !1;
        i = "function" == typeof t ? n : i, n = "function" == typeof t ? t : n, t = "function" == typeof t ? null : t;
        var o = function(e) {
                var t = !0;
                if (e.changedTouches) {
                    var o = e.changedTouches[0].pageX - window.pageXOffset,
                        a = e.changedTouches[0].pageY - window.pageYOffset,
                        s = document.elementFromPoint(o, a);
                    null !== s && this.contains(s) && (t = n.call(this, e))
                }
                return "function" == typeof i && i.call(this, e), r = !0, t
            },
            s = function(e) {
                return r ? void(r = !1) : n.call(this, e)
            };
        return t ? void(0, a["default"])(e).on("click", t, s).on("touchend", t, o) : void(0, a["default"])(e).on("click", s).on("touchend", o)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = r;
    var o = n(8),
        a = i(o);
    e.exports = t["default"]
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting", "webkitbeginfullscreen", "webkitendfullscreen", "webkitpresentationmodechanged"],
        i = ["externaldisplayavailable", "externaldisplayunavailable", "externaldisplayactivated", "externaldisplaydeactivated"],
        r = ["scannerchange", "scannererror", "currentfilechange", "streamchange", "streambufferstart", "streambufferend", "droppedframes", "bandwidth", "streamtargetchange", "alert", "presentationmodechange"],
        o = [].concat(n, i, r);
    t.videoEvents = n, t.externalDisplayEvents = i, t.telecineEvents = r, t.allEvents = o
}, function(e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var TelecineError = function TelecineError(e, t) {
        n(this, TelecineError), this.name = e, this.message = t, Object.freeze(this)
    };
    t["default"] = TelecineError
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function o() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
                n = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
            return Object.freeze(r({get length() {
                    return t.length
                },
                start: function(e) {
                    return c(t, e)
                },
                end: function(e) {
                    return c(n, e)
                }
            }, e.iterator, function() {
                return (0, u.createArrayIterator)(t, n)
            }))
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(24),
            s = i(a),
            u = n(7),
            c = function(e, t) {
                if (!e || void 0 === e[t]) throw (0, s["default"])(1, "INDEX_SIZE_ERR");
                return e[t]
            };
        o.from = function(e) {
            if (!(e instanceof TimeRanges)) throw new TypeError("Can only create a TelecineTimeRange from a TimeRanges object.");
            for (var t = [], n = [], i = 0, r = e.length; r > i; i++) t.push(e.start(i)), n.push(e.end(i));
            return o(t, n)
        }, t["default"] = o
    }).call(t, n(1))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        a = n(4),
        s = i(a),
        u = n(15),
        c = i(u),
        l = n(16),
        d = i(l),
        f = function() {
            function e(t) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                r(this, e), this._element = t, this._options = n, this._telecineVideo = null, this._currentFile = null, this._externalDisplays = [], s["default"].make(this)
            }
            return o(e, null, [{
                key: "displayName",
                get: function() {
                    return "Scanner"
                }
            }, {
                key: "supported",
                get: function() {
                    return !1
                }
            }, {
                key: "supportedVideoTypes",
                get: function() {
                    return []
                }
            }, {
                key: "supportedAudioTypes",
                get: function() {
                    return []
                }
            }, {
                key: "supportedExternalDisplays",
                get: function() {
                    return []
                }
            }, {
                key: "supportsSettingVolume",
                get: function() {
                    return !0
                }
            }, {
                key: "supportsTextTracks",
                get: function() {
                    return !1
                }
            }]), o(e, [{
                key: "deactivate",
                value: function() {
                    this._telecineVideo && (this._telecineVideo.off("filesrcupdate"), this._telecineVideo.off("texttracksrcupdate"))
                }
            }, {
                key: "reactivate",
                value: function() {}
            }, {
                key: "play",
                value: function() {
                    throw new c["default"]("NotImplemented", "The scanner must implement the play method.")
                }
            }, {
                key: "pause",
                value: function() {
                    throw new c["default"]("NotImplemented", "The scanner must implement the pause method.")
                }
            }, {
                key: "addTextTrack",
                value: function(e) {
                    return this
                }
            }, {
                key: "removeTextTrack",
                value: function(e) {
                    return this
                }
            }, {
                key: "getCuesForTrack",
                value: function(e) {
                    return []
                }
            }, {
                key: "getActiveCuesForTrack",
                value: function(e) {
                    return []
                }
            }, {
                key: "setModeForTrack",
                value: function(e, t) {
                    return this
                }
            }, {
                key: "setSrcForTrack",
                value: function(e, t) {
                    return this
                }
            }, {
                key: "showExternalDisplayPicker",
                value: function(e) {
                    if (!this._externalDisplays.length) throw new c["default"]("externalDisplayUnvailable", "No external displays are available.");
                    if (!e) return void this._externalDisplays[0].showPicker();
                    var t = this._externalDisplays.filter(function(t) {
                        return t.constructor.displayName.replace("ExternalDisplay", "") === e
                    })[0];
                    if (!t) throw new c["default"]("invalidExternalDisplay", "The specified external display is not available.");
                    t.showPicker()
                }
            }, {
                key: "_pickFile",
                value: function() {
                    if (this._files.length < 1) return null;
                    var e = this._files.slice(0).sort(function(e, t) {
                        return e.priority - t.priority
                    });
                    return e[0]
                }
            }, {
                key: "_updateCurrentFile",
                value: function() {
                    var e = this._pickFile();
                    return e ? void(this.currentFile = e) : void this.fire("scannererror", {
                        reason: "all files failed"
                    })
                }
            }, {
                key: "_switchToNextFile",
                value: function() {
                    var e = this._files.indexOf(this._currentFile);
                    this._files.splice(e, 1), this._updateCurrentFile()
                }
            }, {
                key: "buffered",
                get: function() {
                    return (0, d["default"])()
                }
            }, {
                key: "currentFile",
                get: function() {
                    return this._currentFile
                },
                set: function(e) {
                    this._currentFile = e, this.fire("currentfilechange", e)
                }
            }, {
                key: "currentTime",
                get: function() {
                    return 0
                },
                set: function(e) {}
            }, {
                key: "duration",
                get: function() {
                    return NaN
                }
            }, {
                key: "ended",
                get: function() {
                    return !1
                }
            }, {
                key: "externalDisplayAvailable",
                get: function() {
                    return this._externalDisplays.some(function(e) {
                        return e.available
                    })
                }
            }, {
                key: "externalDisplayActive",
                get: function() {
                    return this._externalDisplays.some(function(e) {
                        return e.active
                    })
                }
            }, {
                key: "loop",
                get: function() {
                    return !1
                },
                set: function(e) {}
            }, {
                key: "muted",
                get: function() {
                    return !1
                },
                set: function(e) {}
            }, {
                key: "paused",
                get: function() {
                    return !0
                }
            }, {
                key: "playbackRate",
                get: function() {
                    return 1
                },
                set: function(e) {}
            }, {
                key: "preload",
                get: function() {
                    return "none"
                },
                set: function(e) {}
            }, {
                key: "presentationMode",
                get: function() {
                    return "inline"
                },
                set: function(e) {
                    if (-1 === this.supportedPresentationModes.indexOf(e)) throw new c["default"]("invalidPresentationMode", "The “" + e + "” presentation mode is not supported.")
                }
            }, {
                key: "supportedPresentationModes",
                get: function() {
                    return ["inline"]
                }
            }, {
                key: "video",
                get: function() {
                    return this._telecineVideo
                },
                set: function(e) {
                    var t = this;
                    this.reactivate(), this._telecineVideo !== e && (this._telecineVideo && (this._telecineVideo.off("filesrcupdate"), this._telecineVideo.off("texttracksrcupdate")), this._telecineVideo = e, this._files = e.files.filter(function(e) {
                        return -1 !== t.constructor.supportedVideoTypes.indexOf(e.mime)
                    }), this._telecineVideo.on("filesrcupdate", function(e) {
                        e === t._currentFile && t._updateCurrentFile()
                    }), this._telecineVideo.on("texttracksrcupdate", function(e) {
                        t.video.currentScanner && t.video.currentScanner.setSrcForTrack(e, e.src)
                    }), this._options.externalDisplays && this._options.externalDisplays.length && ! function() {
                        t._externalDisplays = [];
                        var n = t.constructor.supportedExternalDisplays.map(function(e) {
                            return e.displayName
                        });
                        t._options.externalDisplays.filter(function(e) {
                            return e.supported && -1 !== n.indexOf(e.displayName)
                        }).forEach(function(n) {
                            var i = new n(e),
                                r = n.displayName.replace("ExternalDisplay", "");
                            i.on("available", function() {
                                return t.fire("externaldisplayavailable", {
                                    type: r
                                })
                            }), i.on("unavailable", function() {
                                return t.fire("externaldisplayunavailable", {
                                    type: r
                                })
                            }), i.on("activated", function() {
                                "function" == typeof t.onexternaldisplayactivated && t.onexternaldisplayactivated(i), t.fire("externaldisplayactivated", {
                                    type: r
                                })
                            }), i.on("deactivated", function() {
                                "function" == typeof t.onexternaldisplaydeactivated && t.onexternaldisplaydeactivated(i), t.fire("externaldisplaydeactivated", {
                                    type: r
                                })
                            }), t._externalDisplays.push(i)
                        })
                    }(), this._updateCurrentFile())
                }
            }, {
                key: "videoWidth",
                get: function() {
                    return 0
                }
            }, {
                key: "videoHeight",
                get: function() {
                    return 0
                }
            }, {
                key: "volume",
                get: function() {
                    return 1
                },
                set: function(e) {}
            }]), e
        }();
    t["default"] = f
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e) {
        return a["default"].iOS && "onpagehide" in window ? void window.addEventListener("pagehide", e, !1) : void window.addEventListener("beforeunload", e, !1)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = r;
    var o = n(6),
        a = i(o);
    e.exports = t["default"]
}, function(e, t, n) {
    (function(n) {
        "use strict";

        function i(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
            if (!e || "null" === e || 0 === t.length) return {
                track: null
            };
            var n = e.split("."),
                i = r(n, 2),
                o = i[0],
                a = i[1],
                s = o.substr(0, 2),
                u = o !== s,
                c = t.filter(function(e) {
                    return u ? e.language === o || e.language === s : e.language === s
                }).sort(function(e, t) {
                    var n = 2 * (e.language === s && e.kind === a) + 2 * (e.language === o) + 1 * (e.kind === a),
                        i = 2 * (t.language === s && t.kind === a) + 2 * (t.language === o) + 1 * (t.kind === a);
                    return i - n
                });
            return c.length > 0 ? {
                track: c[0],
                exactMatch: c[0].language === o && c[0].kind === a
            } : {
                track: null
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                var i = [],
                    r = !0,
                    o = !1,
                    a = void 0;
                try {
                    for (var s, u = e[n.iterator](); !(r = (s = u.next()).done) && (i.push(s.value), !t || i.length !== t); r = !0);
                } catch (c) {
                    o = !0, a = c
                } finally {
                    try {
                        !r && u["return"] && u["return"]()
                    } finally {
                        if (o) throw a
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (n.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t["default"] = i, e.exports = t["default"]
    }).call(t, n(1))
}, function(e, t) {
    "use strict";

    function n(e) {
        return e = e.replace("#", ""), "string" == typeof e && (3 === e.length || 6 === e.length) && !isNaN(parseInt(e, 16))
    }

    function i(e) {
        var t = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*([\d\.]+))?\)/.exec(e);
        if (!t) throw new Error("Invalid rgb value");
        return {
            red: parseInt(t[1], 10),
            green: parseInt(t[2], 10),
            blue: parseInt(t[3], 10),
            alpha: parseFloat(t[5]) || 1
        }
    }

    function r() {
        for (var e = arguments.length, t = Array(e), o = 0; e > o; o++) t[o] = arguments[o];
        if (1 === t.length && t[0] instanceof r) {
            var a = t[0];
            return this.red = a.red, this.green = a.green, this.blue = a.blue, this.alpha = a.alpha, this.hue = a.hue, this.saturation = a.saturation, this.lightness = a.lightness, this
        }
        if (1 === t.length) {
            if ("string" == typeof t[0] && t[0].indexOf("rgb") >= 0) return this.rgba = i(t[0]), this;
            if (!n("" + t[0])) throw new Error("Invalid hex value");
            return this.hex = t[0], this
        }
        if (3 === t.length || 4 === t.length) {
            for (var s = 0; 3 > s; s++)
                if (isNaN(parseInt(t[s], 10)) || parseInt(t[s], 10) < 0 || parseInt(t[s], 10) > 255) throw new Error("Invalid rgb value");
            if (t[3] && parseFloat(t[3]) < 0 || parseFloat(t[3]) > 1) throw new Error("Invalid alpha value");
            return this.rgba = {
                red: t[0],
                green: t[1],
                blue: t[2],
                alpha: parseFloat(t[3]) || 1
            }, this
        }
        throw new Error("Invalid color")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.prototype = {get complement() {
            var e = this.clone();
            return e.rgb = {
                red: 255 - this.red,
                green: 255 - this.green,
                blue: 255 - this.blue
            }, e
        },
        get hex() {
            return r.rgbToHex(this.red, this.green, this.blue)
        },
        set hex(e) {
            return this.rgba = r.hexToRgb(e), this
        },
        get hsl() {
            return "hsl(" + this.hue + "," + this.saturation + "%," + Math.round(this.lightness) + "%)"
        },
        set hsl(e) {
            this.hue = e.hue, this.saturation = e.saturation, this.lightness = e.lightness;
            var t = r.hslToRgb(e.hue, e.saturation, e.lightness);
            return this.red = t.red, this.green = t.green, this.blue = t.blue, this.alpha = t.alpha, this
        },
        get luminance() {
            function e(e) {
                return .03928 >= e ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
            }
            var t = e(this.red / 255),
                n = e(this.green / 255),
                i = e(this.blue / 255),
                r = .2126 * t + .7152 * n + .0722 * i;
            return r
        },
        get rgb() {
            return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
        },
        set rgb(e) {
            return this.rgba = e, this
        },
        get rgba() {
            return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")"
        },
        set rgba(e) {
            this.red = e.red, this.green = e.green, this.blue = e.blue, this.alpha = e.alpha || 1;
            var t = r.rgbToHsl(e.red, e.green, e.blue);
            return this.hue = t.hue, this.saturation = t.saturation, this.lightness = t.lightness, this
        },
        get yiq() {
            return (299 * this.red + 587 * this.green + 114 * this.blue) / 1e3
        },
        clone: function() {
            return new r(this)
        },
        lighten: function(e, t, n) {
            if (this.hsl = {
                    hue: this.hue,
                    saturation: this.saturation,
                    lightness: this.lightness + e
                }, t && n)
                for (var i = n.contrast(this).ratio; t > i && (this.lighten(5), i = n.contrast(this).ratio, !(this.lightness >= 100)););
            return this
        },
        darken: function(e, t, n) {
            if (this.hsl = {
                    hue: this.hue,
                    saturation: this.saturation,
                    lightness: this.lightness - e
                }, t && n)
                for (var i = n.contrast(this).ratio; t > i && (this.darken(5), i = n.contrast(this).ratio, !(this.lightness <= 0)););
            return this
        },
        overlayOn: function(e) {
            if (this.alpha >= 1) return this;
            var t = this.clone();
            return t.rgba = {
                red: t.red * this.alpha + e.red * e.alpha * (1 - this.alpha),
                green: t.green * this.alpha + e.green * e.alpha * (1 - this.alpha),
                blue: t.blue * this.alpha + e.blue * e.alpha * (1 - this.alpha),
                alpha: t.alpha + e.alpha * (1 - this.alpha)
            }, t
        },
        contrast: function(e) {
            var t = this.alpha;
            if (t >= 1) {
                e.alpha < 1 && (e = e.overlayOn(this));
                var n = this.luminance + .05,
                    i = e.luminance + .05,
                    o = n / i;
                return i > n && (o = 1 / o), o = Math.round(10 * o) / 10, {
                    ratio: o,
                    error: 0,
                    min: o,
                    max: o
                }
            }
            var a = this.overlayOn(r.white).contrast(e).ratio,
                s = this.overlayOn(r.black).contrast(e).ratio,
                u = Math.max(a, s),
                c = {
                    red: Math.min(Math.max(0, (e.red - this.red * t) / (1 - t)), 255),
                    green: Math.min(Math.max(0, (e.green - this.green * t) / (1 - t)), 255),
                    blue: Math.min(Math.max(0, (e.blue - this.blue * t) / (1 - t)), 255)
                },
                l = this.clone();
            l.rgb = c;
            var d = this.overlayOn(l).contrast(e).ratio;
            return {
                ratio: Math.round((d + u) / 2 * 10) / 10,
                error: Math.round((u - d) / 2 * 10) / 10,
                min: d,
                max: u,
                closest: l,
                farthest: s === u ? r.white : r.black
            }
        },
        wcagAACompliant: function(e) {
            return this.contrast(e).ratio >= 4.5
        },
        wcagAAACompliant: function(e) {
            return this.contrast(e).ratio >= 7
        },
        yiqContrastColor: function() {
            return this.yiq >= 120 ? new r(0, 0, 0) : new r(255, 255, 255)
        }
    }, r.hexToRgb = function(e) {
        var t;
        return e = String(e), 3 === e.length || 4 === e.length ? (t = /^#?([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/i.exec(e), t && (t[1] += t[1], t[2] += t[2], t[3] += t[3])) : t = /^#?([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})$/i.exec(e), t ? {
            red: parseInt(t[1], 16),
            green: parseInt(t[2], 16),
            blue: parseInt(t[3], 16),
            alpha: 1
        } : null
    }, r.rgbToHex = function(e, t, n) {
        return "#" + ((1 << 24) + (Math.round(e) << 16) + (Math.round(t) << 8) + Math.round(n)).toString(16).slice(1)
    }, r.rgbToHsl = function(e, t, n) {
        e /= 255, t /= 255, n /= 255;
        var i = Math.max(e, t, n),
            r = Math.min(e, t, n),
            o = (i + r) / 2,
            a = o,
            s = o;
        if (i === r) return {
            hue: 0,
            saturation: 0,
            lightness: 100 * s
        };
        var u = i - r;
        return a = s > .5 ? u / (2 - i - r) : u / (i + r), i === e ? o = (t - n) / u + (n > t ? 6 : 0) : i === t ? o = (n - e) / u + 2 : i === n && (o = (e - t) / u + 4), o /= 6, {
            hue: Math.round(360 * o),
            saturation: Math.round(100 * a),
            lightness: Math.round(100 * s)
        }
    }, r.hslToRgb = function(e, t, n) {
        function i(e, t, n) {
            return 0 > n && (n += 1), n > 1 && (n -= 1), 1 > 6 * n ? e + 6 * (t - e) * n : 1 > 2 * n ? t : 2 > 3 * n ? e + (t - e) * (6 * (2 / 3 - n)) : e
        }
        if (e /= 360, t /= 100, n /= 100, 0 === t) return {
            red: Math.floor(255 * n),
            green: Math.floor(255 * n),
            blue: Math.floor(255 * n)
        };
        var r = .5 > n ? n * (1 + t) : n + t - t * n,
            o = 2 * n - r;
        return {
            red: Math.floor(255 * i(o, r, e + 1 / 3)),
            green: Math.floor(255 * i(o, r, e)),
            blue: Math.floor(255 * i(o, r, e - 1 / 3))
        }
    }, r.hslToHex = function(e, t, n) {
        var i = r.hslToRgb(e, t, n);
        return r.rgbToHex(i.red, i.green, i.blue)
    }, r.white = new r("fff"), r.black = new r("000"), t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return function(t) {
                return v.MimeToDelivery[t.mime] === e
            }
        }

        function r(e) {
            var t = e.fps;
            return "metadata" in e && (t = e.metadata.fps), t > 30
        }

        function o(e) {
            return e.quality || e.metadata.quality
        }

        function a(e) {
            return "string" != typeof e && (e = o(e)), parseInt(e, 10)
        }

        function s(e) {
            return a(e) >= 720
        }

        function u(t) {
            var n = e(t).filter(r).map(o);
            return function(e) {
                return !(-1 !== n.indexOf(o(e)) && !r(e))
            }
        }

        function c(e) {
            return "fps" in e ? e.fps : "metadata" in e && "fps" in e.metadata ? e.metadata.fps : 0
        }

        function l() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? "desc" : arguments[0];
            return function(t, n) {
                var i = a(t),
                    r = c(t),
                    o = a(n),
                    s = c(n);
                return "asc" === e ? i - o || r - s : o - i || s - r
            }
        }

        function d(e, t) {
            var n = o(e);
            return n = n.replace("1440p", "2K").replace("2160p", "4K"), s(e) && t && (n += t), n
        }

        function f(t) {
            var n = t.files,
                i = void 0 === n ? [] : n,
                r = t.preference,
                s = void 0 === r ? "360p" : r,
                u = t.priorityOffset,
                c = void 0 === u ? 0 : u;
            i = e(i), i.sort(l());
            var d = i.map(o);
            if (s) {
                -1 === d.indexOf(s) && (d.push(s), d.sort(function(e, t) {
                    return a(t) - a(e)
                }));
                var f = d.indexOf(s),
                    v = d.splice(0, f);
                v.reverse(), d.push.apply(d, v)
            }
            return i.map(function(e) {
                return {
                    id: e.id,
                    src: e.url,
                    mime: e.mime,
                    priority: d.indexOf(e.quality) + 1 + c,
                    metadata: {
                        profile: e.profile,
                        cdn: e.cdn,
                        origin: e.origin,
                        quality: e.quality,
                        fps: e.fps
                    }
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.deliveryFilter = i, t.isHfr = r, t.getIdentifier = o, t.getQuality = a, t.isHD = s, t.hfrFilter = u, t.getFps = c, t.qualityCompare = l, t.getLabel = d, t.getProgressiveFiles = f;
        var v = n(2)
    }).call(t, n(11))
}, function(e, t, n) {
    (function(e, i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, n) {
                    var i = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var s, u = t[e.iterator](); !(r = (s = u.next()).done) && (i.push(s.value), !n || i.length !== n); r = !0);
                    } catch (c) {
                        o = !0, a = c
                    } finally {
                        try {
                            !r && u["return"] && u["return"]()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return i
                }
                return function(n, i) {
                    if (Array.isArray(n)) return n;
                    if (e.iterator in Object(n)) return t(n, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            u = n(23),
            c = n(4),
            l = r(c),
            d = [],
            f = function() {
                function e() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                        n = t.retryCount,
                        r = void 0 === n ? 3 : n,
                        a = t.parallel,
                        s = void 0 === a ? 1 : a;
                    o(this, e), this._queue = [], this._activeXhrRequests = new Set, this._retries = new i, this._retryCount = r, this._running = !1, this._processingQueue = !1, this._parallel = s, l["default"].make(this)
                }
                return s(e, null, [{
                    key: "getPercentileSpeed",
                    value: function() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? 5 : arguments[0],
                            t = arguments.length <= 1 || void 0 === arguments[1] ? .8 : arguments[1],
                            n = d.slice(-e);
                        return (0, u.percentile)(n, t)
                    }
                }, {
                    key: "getAverageSpeed",
                    value: function() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? 5 : arguments[0],
                            t = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1],
                            n = d.slice(-e);
                        return (0, u.average)(n, t)
                    }
                }, {
                    key: "getMedianSpeed",
                    value: function() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? 5 : arguments[0],
                            t = d.slice(-e);
                        return (0, u.median)(t)
                    }
                }, {
                    key: "getResponseSpeeds",
                    value: function() {
                        return d
                    }
                }, {
                    key: "getTime",
                    value: function() {
                        return "undefined" != typeof performance ? performance.now() : (new Date).getTime()
                    }
                }, {
                    key: "calculateExponentialBackoff",
                    value: function(e) {
                        return 500 * Math.pow(2, e) + Math.round(1e3 * Math.random())
                    }
                }]), s(e, [{
                    key: "add",
                    value: function(e, t, n) {
                        return this._queue[n ? "unshift" : "push"]([e, t]), this._running && !this._processingQueue && this._processQueue(), this
                    }
                }, {
                    key: "start",
                    value: function() {
                        return this._running = !0, this._processQueue(), this
                    }
                }, {
                    key: "stop",
                    value: function() {
                        return this._running = !1, this
                    }
                }, {
                    key: "abort",
                    value: function() {
                        var e = this;
                        this._queue.forEach(function(t) {
                            var n = e._getIdentifierFromData(t),
                                i = a(n, 3),
                                r = i[2];
                            e.fire("downloadabort", r)
                        }), this._queue = [], this._processingQueue = !1, this._activeXhrRequests.forEach(function(e) {
                            e.abort()
                        })
                    }
                }, {
                    key: "_processQueue",
                    value: function() {
                        if (this._running) {
                            this._processingQueue = !0;
                            for (var e = this._parallel - this._activeXhrRequests.size, t = 0; e > t; t++) this._fetchOne()
                        }
                    }
                }, {
                    key: "_retry",
                    value: function(t, n, i) {
                        var r = this,
                            o = n[0],
                            a = n[1];
                        if (this._retries.get(o) || this._retries.set(o, 0), this._retries.set(o, this._retries.get(o) + 1), this._retries.get(o) > this._retryCount) return void this.fire("downloaderror", i, t.status);
                        var s = e.calculateExponentialBackoff(this._retries.get(o));
                        setTimeout(function() {
                            var e = !0;
                            r.add(o, a, e)
                        }, s)
                    }
                }, {
                    key: "_handleXHRResponse",
                    value: function(e, t, n, i) {
                        return e.status >= 500 && e.status < 600 ? void this._retry(e, t, n) : e.status >= 400 && e.status < 500 ? void this.fire("downloaderror", n, e.status) : (this.fire("downloadend", n), void i.call(this, new Uint8Array(e.response)))
                    }
                }, {
                    key: "_getIdentifierFromData",
                    value: function(e) {
                        var t = e[1],
                            n = e[0],
                            i = n;
                        return n.id && (i = n.id), [n.url, n.byteRange, i, t]
                    }
                }, {
                    key: "_continueProcessingQueue",
                    value: function() {
                        return 0 === this._activeXhrRequests.size && 0 === this._queue.length ? void(this._processingQueue = !1) : void(this._activeXhrRequests.size < this._parallel && this._processQueue())
                    }
                }, {
                    key: "_fetchOne",
                    value: function() {
                        var t = this;
                        if (0 === this._queue.length) return void(this._processingQueue = !1);
                        var n = this._queue.shift(),
                            i = this._getIdentifierFromData(n),
                            r = a(i, 4),
                            o = r[0],
                            s = r[1],
                            u = r[2],
                            c = r[3],
                            l = e.getTime(),
                            f = new XMLHttpRequest;
                        f.open("GET", o, !0), f.responseType = "arraybuffer", s && f.setRequestHeader("Range", "bytes=" + s), f.onload = function(i) {
                            t._activeXhrRequests["delete"](f);
                            var r = (e.getTime() - l) / 1e3,
                                o = i.target.response.byteLength;
                            if (o > 40960) {
                                var a = 8 * o,
                                    s = a / r;
                                d.length > 100 && d.shift(), d.push(s)
                            }
                            t._handleXHRResponse(f, n, u, c), t._continueProcessingQueue()
                        }, f.onerror = function() {
                            t._activeXhrRequests["delete"](f), t._retry(f, n, u), t._continueProcessingQueue()
                        }, f.onabort = function() {
                            t._activeXhrRequests["delete"](f), t.fire("downloadabort", u)
                        }, this.fire("downloadstart", u), this._activeXhrRequests.add(f), f.send()
                    }
                }, {
                    key: "parallel",
                    get: function() {
                        return this._parallel
                    },
                    set: function(e) {
                        this._parallel = e
                    }
                }]), e
            }();
        t["default"] = f
    }).call(t, n(1), n(12))
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
        if (0 === e.length) return 0;
        for (var n = 0, i = 0, r = 0; r < e.length; r++) {
            var o = t[r] || 1;
            i += o, n += e[r] * o
        }
        return n / i
    }

    function i(e, t) {
        if (e.sort(), 0 === e.length) return 0;
        if (0 >= t) return e[0];
        if (t >= 1) return e[e.length - 1];
        var n = e.length * t,
            i = Math.floor(n),
            r = i + 1,
            o = n % 1;
        return r >= e.length ? e[i] : e[i] * (1 - o) + e[r] * o
    }

    function r(e) {
        e.sort(function(e, t) {
            return e - t
        });
        var t = Math.floor(e.length / 2);
        return e.length % 2 ? e[t] : (e[t - 1] + e[t]) / 2
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.average = n, t.percentile = i, t.median = r
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        var i = void 0;
        try {
            document.removeChild({})
        } catch (r) {
            i = Object.create(Object.getPrototypeOf(r), {
                name: {
                    value: t,
                    configurable: !0,
                    writable: !0
                },
                code: {
                    value: e,
                    configurable: !0,
                    writable: !0
                },
                message: {
                    value: n,
                    configurable: !0,
                    writable: !0
                },
                toString: {
                    value: function() {
                        return t + ": DOM Exception " + e
                    },
                    configurable: !0,
                    writable: !0
                }
            })
        }
        return Object.freeze(i)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            u = n(58),
            c = i(u),
            l = function(t) {
                function n(e) {
                    r(this, n);
                    var t = o(this, Object.getPrototypeOf(n).call(this, e));
                    return t._videoElement = document.createElement("video"), t._videoElement.setAttribute("data-airplay", ""), t._videoElement.setAttribute("x-webkit-airplay", "allow"), t.addVideoEventListeners(), t
                }
                return a(n, t), s(n, null, [{
                    key: "displayName",
                    get: function() {
                        return "AirPlayExternalDisplay"
                    }
                }, {
                    key: "supported",
                    get: function() {
                        return "WebKitPlaybackTargetAvailabilityEvent" in window
                    }
                }, {
                    key: "supportedVideoTypes",
                    get: function() {
                        return ["application/vnd.apple.mpegurl", "video/mp4"]
                    }
                }]), s(n, [{
                    key: "addVideoEventListeners",
                    value: function() {
                        var e = this,
                            t = arguments.length <= 0 || void 0 === arguments[0] ? this._videoElement : arguments[0];
                        t.addEventListener("webkitplaybacktargetavailabilitychanged", function(t) {
                            switch (t.availability) {
                                case "available":
                                    e._available || (e._available = !0, e.fire("available"));
                                    break;
                                case "not-available":
                                    e._available && (e._available = !1, e.fire("unavailable"))
                            }
                        }), t.addEventListener("webkitcurrentplaybacktargetiswirelesschanged", function(t) {
                            return t.target.webkitCurrentPlaybackTargetIsWireless ? (e._active = !0, void e.fire("activated")) : (e._active = !1, void e.fire("deactivated"))
                        })
                    }
                }, {
                    key: "showPicker",
                    value: function() {
                        var e = this;
                        this._videoElement.webkitShowPlaybackTargetPicker(), this.loadMetadata().then(function() {
                            e._videoElement.webkitShowPlaybackTargetPicker()
                        })
                    }
                }, {
                    key: "loadMetadata",
                    value: function() {
                        var t = this;
                        return this._videoElement.readyState >= 1 ? e.resolve() : new e(function(e, n) {
                            t._videoElement.addEventListener("loadedmetadata", function() {
                                e()
                            }), t._videoElement.src = t.getFile().src
                        })
                    }
                }, {
                    key: "element",
                    get: function() {
                        return this._videoElement
                    },
                    set: function(e) {
                        if (!(e instanceof HTMLVideoElement)) throw new TypeError("The element for AirPlay must be a <video>.");
                        e !== this._videoElement && (this.addVideoEventListeners(e), this._videoElement = e, this._videoElement.setAttribute("x-webkit-airplay", "allow"))
                    }
                }]), n
            }(c["default"]);
        t["default"] = l
    }).call(t, n(3))
}, function(e, t, n) {
    (function(e, i, r) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function s(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function u(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = function() {
                function t(t, n) {
                    var i = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var s, u = t[e.iterator](); !(r = (s = u.next()).done) && (i.push(s.value), !n || i.length !== n); r = !0);
                    } catch (c) {
                        o = !0, a = c
                    } finally {
                        try {
                            !r && u["return"] && u["return"]()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return i
                }
                return function(n, i) {
                    if (Array.isArray(n)) return n;
                    if (e.iterator in Object(n)) return t(n, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            l = function I(e, t, n, i) {
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var o = Object.getPrototypeOf(e);
                    null !== o && I(o, t, n, i)
                } else if ("value" in r && r.writable) r.value = n;
                else {
                    var a = r.set;
                    void 0 !== a && a.call(i, n)
                }
                return n
            },
            d = function B(e, t, n) {
                null === e && (e = Function.prototype);
                var i = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === i) {
                    var r = Object.getPrototypeOf(e);
                    return null === r ? void 0 : B(r, t, n)
                }
                if ("value" in i) return i.value;
                var o = i.get;
                if (void 0 !== o) return o.call(n)
            },
            f = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            v = n(17),
            h = o(v),
            p = n(14),
            m = n(7),
            g = n(54),
            y = o(g),
            b = n(15),
            _ = o(b),
            w = n(16),
            k = o(w),
            E = n(25),
            S = o(E),
            T = document.createElement("video"),
            x = {
                "application/vnd.apple.mpegurl": "application/vnd.apple.mpegurl",
                "video/mp4": 'video/mp4; codecs="avc1.64001E"',
                "video/webm": 'video/webm; codecs="vp8, vorbis"',
                "video/x-flv": 'video/x-flv; codecs="vp6"'
            },
            P = function() {
                var e = "undefined" != typeof TextTrack ? TextTrack : {};
                return {
                    disabled: "DISABLED" in e ? e.DISABLED : "disabled",
                    hidden: "HIDDEN" in e ? e.HIDDEN : "hidden",
                    showing: "SHOWING" in e ? e.SHOWING : "showing"
                }
            }(),
            C = function() {
                var e = document.createElement("track");
                return "track" in e ? "oncuechange" in e.track : !1
            }(),
            L = 0,
            O = 1,
            M = 2,
            A = 3,
            F = 4,
            q = function(t) {
                function n(e) {
                    var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    a(this, n);
                    var i = s(this, Object.getPrototypeOf(n).call(this, e, t)),
                        r = e.querySelector("video");
                    return r || (r = document.createElement("video"), r.preload = "none", i._element.appendChild(r)), i._video = r, t.htmlScanner && t.htmlScanner.controls && (i._video.controls = !0), i._boundHandleVideoEvent = i.handleVideoEvent.bind(i), i.addVideoEventListeners(), i._downloadRate = new y["default"](i), i._bufferTimer = null, i._readyState = L, i._paused = !0, i._preload = "none", i._externalDisplayActivated = !1, i
                }
                return u(n, t), f(n, null, [{
                    key: "displayName",
                    get: function() {
                        return "HTMLScanner"
                    }
                }, {
                    key: "supported",
                    get: function() {
                        return n.supportedVideoTypes.length > 0
                    }
                }, {
                    key: "supportedVideoTypes",
                    get: function() {
                        var e = [];
                        if ("function" != typeof T.canPlayType) return e;
                        for (var t in x) {
                            var n = x[t];
                            m.browser.android && "application/vnd.apple.mpegurl" === t || (!m.browser.android || m.browser.androidMobile || "video/mp4" !== t ? T.canPlayType(n).replace(/^no$/, "") && e.push(t) : e.push(t))
                        }
                        return e
                    }
                }, {
                    key: "supportedExternalDisplays",
                    get: function() {
                        return [S["default"]]
                    }
                }, {
                    key: "supportsSettingVolume",
                    get: function() {
                        if (m.browser.android) return !1;
                        var e = T.volume;
                        return T.volume = .5 * e, T.volume !== e
                    }
                }, {
                    key: "supportsTextTracks",
                    get: function() {
                        return "undefined" != typeof T.textTracks && T.textTracks instanceof TextTrackList
                    }
                }]), f(n, [{
                    key: "deactivate",
                    value: function() {
                        d(Object.getPrototypeOf(n.prototype), "deactivate", this).call(this), this.removeVideoEventListeners(), this.removeSnapshot(), this._video.style.display = "none"
                    }
                }, {
                    key: "reactivate",
                    value: function() {
                        d(Object.getPrototypeOf(n.prototype), "reactivate", this).call(this), this.addVideoEventListeners(), this._video.style.display = ""
                    }
                }, {
                    key: "addVideoEventListeners",
                    value: function() {
                        var e = this,
                            t = arguments.length <= 0 || void 0 === arguments[0] ? this._video : arguments[0];
                        p.videoEvents.forEach(function(n) {
                            t.addEventListener(n, e._boundHandleVideoEvent)
                        })
                    }
                }, {
                    key: "removeVideoEventListeners",
                    value: function() {
                        var e = this,
                            t = arguments.length <= 0 || void 0 === arguments[0] ? this._video : arguments[0];
                        p.videoEvents.forEach(function(n) {
                            t.removeEventListener(n, e._boundHandleVideoEvent)
                        })
                    }
                }, {
                    key: "play",
                    value: function() {
                        this._video.preload = "", this._paused = !1, this._video.play()
                    }
                }, {
                    key: "pause",
                    value: function() {
                        this._paused = !0, this._video.pause()
                    }
                }, {
                    key: "addTextTrack",
                    value: function(e) {
                        var t = this,
                            r = document.createElement("track");
                        return r.id = "telecine-track-" + e.id, r.src = e.src, r.kind = e.kind, r.srclang = e.language, r.label = e.label, r.addEventListener("cuechange", function() {
                            return e.dispatchEvent("cuechange")
                        }), this._video.addEventListener("timeupdate", function() {
                            t._video.webkitDisplayingFullscreen && (e.mode = r.track.mode)
                        }), r.addEventListener("load", function() {
                            var n = m.browser.iOS && t._video.webkitDisplayingFullscreen;
                            return e._modeHasBeenSet && !n ? void(r.track.mode = P[e.mode]) : void(e.mode = r.track.mode)
                        }), e._modeHasBeenSet && (r.track.mode = P[e.mode]), C || ! function() {
                            var n = [];
                            t._video.addEventListener("timeupdate", function() {
                                var t = r.track;
                                if ("disabled" !== P[t.mode]) {
                                    if (n.length !== t.activeCues.length) return e.dispatchEvent("cuechange"), void(n = i(t.activeCues));
                                    for (var o = 0, a = t.activeCues.length; a > o; o++)
                                        if (t.activeCues[o].startTime !== n[o].startTime) return e.dispatchEvent("cuechange"), void(n = i(t.activeCues))
                                }
                            })
                        }(), (0, m.setImmediate)(function() {
                            return t._video.appendChild(r)
                        }), d(Object.getPrototypeOf(n.prototype), "addTextTrack", this).call(this, e)
                    }
                }, {
                    key: "removeTextTrack",
                    value: function(e) {
                        var t = this._video.querySelector("#telecine-track-" + e.id);
                        return t && this._video.removeChild(t), d(Object.getPrototypeOf(n.prototype), "removeTextTrack", this).call(this, e)
                    }
                }, {
                    key: "getCuesForTrack",
                    value: function(e) {
                        var t = this.getTrackById("telecine-track-" + e.id);
                        return t ? i(t.cues) : d(Object.getPrototypeOf(n.prototype), "getCuesForTrack", this).call(this, e)
                    }
                }, {
                    key: "getActiveCuesForTrack",
                    value: function(e) {
                        var t = this.getTrackById("telecine-track-" + e.id);
                        return t ? i(t.activeCues) : d(Object.getPrototypeOf(n.prototype), "getActiveCuesForTrack", this).call(this, e)
                    }
                }, {
                    key: "setModeForTrack",
                    value: function(e, t) {
                        var i = this.getTrackById("telecine-track-" + e.id);
                        return i && i.mode !== P[t] && (i.mode = P[t], C || "disabled" === t || e.dispatchEvent("cuechange")), d(Object.getPrototypeOf(n.prototype), "setModeForTrack", this).call(this, e, t)
                    }
                }, {
                    key: "setSrcForTrack",
                    value: function(e, t) {
                        var i = this._video.querySelector("#telecine-track-" + e.id);
                        return i && (i.src = t), d(Object.getPrototypeOf(n.prototype), "setSrcForTrack", this).call(this, e, t)
                    }
                }, {
                    key: "oncanplay",
                    value: function() {
                        return !1
                    }
                }, {
                    key: "oncanplaythrough",
                    value: function() {
                        return !1
                    }
                }, {
                    key: "onerror",
                    value: function() {
                        if (!this._video.error) return !1;
                        switch (this._video.error.code) {
                            case this._video.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                                return this.fire("error", new _["default"]("HTMLSourceNotSupported", this._currentFile)), this._switchToNextFile(), !1;
                            case this._video.error.MEDIA_ERR_DECODE:
                                return this.fire("error", new _["default"]("HTMLDecode", this._currentFile)), this._switchToNextFile(), !1;
                            case this._video.error.MEDIA_ERR_NETWORK:
                                return this.fire("error", new _["default"]("HTMLNetwork", this._currentFile)), !1;
                            case this._video.error.MEDIA_ERR_ABORTED:
                                return this.fire("error", new _["default"]("HTMLAborted", this._currentFile)), !1;
                            default:
                                return this.fire("error", new _["default"]("HTMLUnknown", this._currentFile)), !1
                        }
                    }
                }, {
                    key: "onloadedmetadata",
                    value: function() {
                        this.readyState = O
                    }
                }, {
                    key: "onloadeddata",
                    value: function() {
                        this.readyState = M
                    }
                }, {
                    key: "onsuspend",
                    value: function() {
                        this.updateReadyState()
                    }
                }, {
                    key: "onplay",
                    value: function() {
                        return this._ignorePlayEvent ? (this._ignorePlayEvent = !1, !1) : void("picture-in-picture" === this.presentationMode && (this._paused = !1))
                    }
                }, {
                    key: "onpause",
                    value: function() {
                        return window.clearTimeout(this._bufferTimer), this._ignorePauseEvent ? (this._ignorePauseEvent = !1, !1) : void("picture-in-picture" === this.presentationMode && (this._paused = !0))
                    }
                }, {
                    key: "onended",
                    value: function() {
                        return this._paused = !0, this.currentTime < this._video.duration ? !1 : void 0
                    }
                }, {
                    key: "onprogress",
                    value: function() {
                        this.updateReadyState()
                    }
                }, {
                    key: "ontimeupdate",
                    value: function() {
                        var t = this,
                            n = (0, m.findBufferedRange)(this.buffered, this.currentTime),
                            i = c(n, 2),
                            r = i[1],
                            o = 1e3 * (r - this.currentTime);
                        if (!m.browser.firefox && (.25 > o && this.currentTime + o < this.duration && (this.readyState = M), window.clearTimeout(this._bufferTimer), !this.paused)) {
                            for (var a = 0, s = this.buffered, u = Array.isArray(s), l = 0, s = u ? s : s[e.iterator]();;) {
                                var d;
                                if (u) {
                                    if (l >= s.length) break;
                                    d = s[l++]
                                } else {
                                    if (l = s.next(), l.done) break;
                                    d = l.value
                                }
                                var f = d,
                                    v = c(f, 2),
                                    h = v[0],
                                    p = v[1];
                                a += p - h
                            }
                            a >= this.duration || (this._bufferTimer = window.setTimeout(function() {
                                t._video.paused || t.readyState > M && (t.readyState = M)
                            }, 1500))
                        }
                    }
                }, {
                    key: "onwaiting",
                    value: function() {
                        return m.browser.firefox && (this.readyState = M), !1
                    }
                }, {
                    key: "onemptied",
                    value: function() {
                        this._readyState = L
                    }
                }, {
                    key: "onseeked",
                    value: function() {
                        this.readyState < M && (this.readyState = M), this.updateReadyState()
                    }
                }, {
                    key: "onwebkitendfullscreen",
                    value: function() {
                        this._video.paused && (this._paused = !0)
                    }
                }, {
                    key: "onwebkitpresentationmodechanged",
                    value: function() {
                        switch (this._video.webkitPresentationMode) {
                            case "picture-in-picture":
                                this._video.controls = !0;
                                break;
                            case "inline":
                                var e = this._options.htmlScanner && this._options.htmlScanner.controls;
                                e || (this._video.controls = !1)
                        }
                        this.fire("presentationmodechange", this._video.webkitPresentationMode)
                    }
                }, {
                    key: "shouldHandleVideoEvent",
                    value: function(e) {
                        return !0
                    }
                }, {
                    key: "handleVideoEvent",
                    value: function(e) {
                        e.target === this._video && this.shouldHandleVideoEvent(e) !== !1 && ("function" == typeof this["on" + e.type] && this["on" + e.type](e) === !1 || this.fire(e.type))
                    }
                }, {
                    key: "swapVideo",
                    value: function(e, t) {
                        var n = e.paused;
                        this.removeVideoEventListeners(e), e.parentElement.replaceChild(t, e), e.pause(), t.currentTime = e.currentTime, n || t.play(), this.addVideoEventListeners(t), this._video = t
                    }
                }, {
                    key: "onexternaldisplayactivated",
                    value: function(e) {
                        this._externalDisplayActivated || (this._video !== e.element && (this._originalVideo = this._video, this.swapVideo(this._video, e.element)), this._externalDisplayActivated = !0)
                    }
                }, {
                    key: "onexternaldisplaydeactivated",
                    value: function(e) {
                        this._externalDisplayActivated && (this._originalVideo && (this.swapVideo(e.element, this._originalVideo), this._originalVideo = null), this._externalDisplayActivated = !1)
                    }
                }, {
                    key: "setVideoSrc",
                    value: function(e) {
                        this._video.src = e
                    }
                }, {
                    key: "canSeekTo",
                    value: function(e) {
                        var t = this.duration;
                        if (t && e > t && (e = t), this._video.seekable.length > 0)
                            for (var n = 0, i = this._video.seekable.length; i > n; n++)
                                if (this._video.seekable.start(n) <= e && this._video.seekable.end(n) >= e) return !0;
                        return !1
                    }
                }, {
                    key: "seekToTime",
                    value: function(e) {
                        var t = this;
                        return this.canSeekTo(e) ? ((0, m.findBufferedRange)(this.buffered, e).length || (this.readyState = O), this._video.currentTime = e, r.resolve(this._video.currentTime)) : new r(function(n, i) {
                            var r = function o() {
                                t.canSeekTo(e) && (p.videoEvents.forEach(function(e) {
                                    t._video.removeEventListener(e, o)
                                }), (0, m.findBufferedRange)(t.buffered, e).length || (t.readyState = O), t._video.currentTime = e, n(t._video.currentTime))
                            };
                            p.videoEvents.forEach(function(e) {
                                t._video.addEventListener(e, r)
                            })
                        })
                    }
                }, {
                    key: "takeSnapshot",
                    value: function() {
                        var e = this._element.querySelector("[telecine-snapshot]");
                        e || (e = document.createElement("canvas"), e.setAttribute("telecine-snapshot", ""), this._element.appendChild(e)), e.setAttribute("width", this._element.clientWidth + "px"), e.setAttribute("height", this._element.clientHeight + "px"), e.style.display = "";
                        var t = (0, m.getFittedDimensions)(this._video.clientWidth, this._video.clientHeight, this._video.videoWidth, this._video.videoHeight),
                            n = t.width,
                            i = t.height,
                            r = t.left,
                            o = t.top;
                        e.style.cssText = "position:absolute;width:" + n + "px;height:" + i + "px;left:" + r + "px;top:" + o + "px";
                        var a = e.getContext("2d");
                        a.drawImage(this._video, 0, 0, e.width, e.height)
                    }
                }, {
                    key: "removeSnapshot",
                    value: function() {
                        var e = this._element.querySelector("[telecine-snapshot]");
                        e && (e.style.display = "none")
                    }
                }, {
                    key: "getTrackById",
                    value: function(e) {
                        if ("function" == typeof this._video.textTracks.getTrackById) return this._video.textTracks.getTrackById(e);
                        var t = document.getElementById(e);
                        return t ? t.track : null
                    }
                }, {
                    key: "updateReadyState",
                    value: function() {
                        if (this.buffered.length) {
                            var e = this.duration - this.buffered.end(this.buffered.length - 1),
                                t = e / this._downloadRate.averageDownloadRate,
                                n = this.duration - this.currentTime;
                            if (isFinite(t)) {
                                var i = (0, m.findBufferedRange)(this.buffered, this.currentTime),
                                    r = c(i, 2),
                                    o = r[1],
                                    a = o - this.currentTime;
                                n > t ? this.readyState = F : this.readyState === F && t > n ? this.readyState = A : a > 2 && (n / 2 >= t || a > 10) && (this.readyState = A)
                            }
                        }
                    }
                }, {
                    key: "buffered",
                    get: function() {
                        return k["default"].from(this._video.buffered)
                    }
                }, {
                    key: "currentFile",
                    get: function() {
                        return d(Object.getPrototypeOf(n.prototype), "currentFile", this)
                    },
                    set: function(e) {
                        var t = this,
                            i = !this._video.paused,
                            r = this.currentTime,
                            o = !this._currentFile || e.video.id !== this._currentFile.video.id;
                        if (o || this.takeSnapshot(), this._ignorePlayEvent = !1, this._ignorePauseEvent = !1, this._currentFile = e, o && (this._video.preload = this._preload), this.constructor === n && this._video.readyState > L && (this._video.currentTime = 0), (m.browser.iOS || m.browser.android) && this._currentFile.video.title) {
                            var a = this._currentFile.video.title;
                            this._currentFile.video.subtitle && (a = a + " " + this._currentFile.video.subtitle), this._video.setAttribute("title", a)
                        } else this._video.removeAttribute("title");
                        this._readyState = L, this.setVideoSrc(this._currentFile.src, o), this.fire("currentfilechange", e), this.constructor !== n || o ? i && (this._video.preload = "", this._video.play()) : (this._video.preload = "", this.seekToTime(r).then(function() {
                            i && t._video.play()
                        }), this.once("canplay", function() {
                            return t.removeSnapshot()
                        }), this.once("playing", function() {
                            return t.removeSnapshot()
                        }))
                    }
                }, {
                    key: "currentTime",
                    get: function() {
                        return this._video.currentTime
                    },
                    set: function(e) {
                        this.seekToTime(e)
                    }
                }, {
                    key: "duration",
                    get: function() {
                        return this._video.duration
                    }
                }, {
                    key: "ended",
                    get: function() {
                        return this._video.ended
                    }
                }, {
                    key: "loop",
                    get: function() {
                        return this._video.loop
                    },
                    set: function(e) {
                        this._video.loop = e
                    }
                }, {
                    key: "muted",
                    get: function() {
                        return this._video.muted
                    },
                    set: function(e) {
                        this._video.muted = e
                    }
                }, {
                    key: "paused",
                    get: function() {
                        return this._paused
                    }
                }, {
                    key: "playbackRate",
                    get: function() {
                        return this.video.playbackRate
                    },
                    set: function(e) {
                        this.video.playbackRate = e
                    }
                }, {
                    key: "preload",
                    get: function() {
                        return this._preload
                    },
                    set: function(e) {
                        this._video.preload = e, this._preload = e
                    }
                }, {
                    key: "presentationMode",
                    get: function() {
                        return this._video.webkitPresentationMode ? this._video.webkitPresentationMode : d(Object.getPrototypeOf(n.prototype), "presentationMode", this)
                    },
                    set: function(e) {
                        l(Object.getPrototypeOf(n.prototype), "presentationMode", e, this), "function" == typeof this._video.webkitSetPresentationMode && this._video.webkitSetPresentationMode(e)
                    }
                }, {
                    key: "supportedPresentationModes",
                    get: function() {
                        var e = d(Object.getPrototypeOf(n.prototype), "supportedPresentationModes", this);
                        if ("function" == typeof this._video.webkitSupportsPresentationMode && (this._video.webkitSupportsPresentationMode("picture-in-picture") && e.push("picture-in-picture"), !this._video.webkitSupportsPresentationMode("inline"))) {
                            var t = e.indexOf("inline");
                            t >= 0 && e.splice(t, 1)
                        }
                        return e
                    }
                }, {
                    key: "video",
                    get: function() {
                        return this._telecineVideo
                    },
                    set: function(e) {
                        var t = this;
                        l(Object.getPrototypeOf(n.prototype), "video", e, this), m.browser.iOS && this._externalDisplays.forEach(function(e) {
                            "AirPlay" === e.constructor.displayName && (e.element = t._video)
                        })
                    }
                }, {
                    key: "videoWidth",
                    get: function() {
                        return this._video.videoWidth
                    }
                }, {
                    key: "videoHeight",
                    get: function() {
                        return this._video.videoHeight
                    }
                }, {
                    key: "volume",
                    get: function() {
                        return this._video.volume
                    },
                    set: function(e) {
                        this._video.volume = e
                    }
                }, {
                    key: "readyState",
                    get: function() {
                        return this._readyState
                    },
                    set: function(e) {
                        if (this._readyState !== e && !(this._video.readyState === O && e > O)) {
                            var t = this._readyState;
                            this._readyState = e, t >= A && M >= e && (this.fire("waiting"), this._video.paused || (this._ignorePauseEvent = !0, this._video.pause())), M >= t && e === A && (this.fire("canplay"), this._paused === !1 && this._video.play()), e === F && (M >= t && (this.fire("canplay"), this._paused === !1 && this._video.paused && (this._ignorePlayEvent = !0, this._video.play())), this.fire("canplaythrough"))
                        }
                    }
                }]), n
            }(h["default"]);
        t["default"] = q
    }).call(t, n(1), n(11), n(3))
}, function(e, t, n) {
    "use strict";
    if (function() {
            for (var e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
                var n = e[t];
                window.requestAnimationFrame = window[n + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]
            }!/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) && window.requestAnimationFrame && window.cancelAnimationFrame || (window.requestAnimationFrame = function(e) {
                return setTimeout(e, 0)
            }, window.cancelAnimationFrame = clearTimeout)
        }(), Number.isInteger || (Number.isInteger = function(e) {
            return "number" == typeof e && isFinite(e) && Math.floor(e) === e
        }), !Object.setPrototypeOf && !{}.__proto__) {
        var i = Object.getPrototypeOf;
        Object.getPrototypeOf = function(e) {
            return e.__proto__ ? e.__proto__ : i.call(Object, e)
        }
    }
    if ("undefined" != typeof DOMTokenList) {
        var r = function() {
            var e = document.createElement("div");
            return e.classList.toggle("test-class", !1), !e.classList.contains("test-class")
        }();
        r || ! function() {
            var e = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(t, n) {
                return n === !0 ? void this.add(t) : n === !1 ? void this.remove(t) : void e.call(this, t)
            }
        }()
    }
}, function(e, t, n) {
    (function(i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e) {
            function t(e, t, n) {
                this.message = e, this.name = t, this.source = n
            }

            function n(n) {
                switch (e.config.view) {
                    case m.View.privateLocked:
                        throw new t("The video is private.", "PrivacyError", n);
                    case m.View.privatePassword:
                        throw new t("The video is password-protected. The viewer must enter the password first.", "PasswordError", n);
                    case m.View.error:
                        throw new t(e.config.message, "NotFoundError", n)
                }
            }

            function i() {
                var e = [];
                for (var t in z)
                    if (z.hasOwnProperty(t) && 0 !== t.indexOf("_")) {
                        if ("function" == typeof z[t]) {
                            e.push(t);
                            continue
                        }
                        "function" == typeof z[t].get && e.push("get" + t.charAt(0).toUpperCase() + t.slice(1)), "function" == typeof z[t].set && e.push("set" + t.charAt(0).toUpperCase() + t.slice(1))
                    }
                return e.sort()
            }

            function r() {
                R || (g({
                    event: "loaded",
                    data: {
                        id: e.config.video.id
                    }
                }), R = !0)
            }

            function o(e) {
                if (!e || "" === e) return {};
                if ("object" === ("undefined" == typeof e ? "undefined" : a(e))) return e;
                try {
                    return F = 2, JSON.parse(e)
                } catch (t) {
                    var n = {};
                    return e.split("&").forEach(function(e) {
                        try {
                            var t = e.split("="),
                                i = decodeURIComponent(t[0]),
                                r = decodeURIComponent(t[1]);
                            if ("id" === i) return;
                            "params" === i && (i = "value"), r = r.split(",")[0], n[i] = r
                        } catch (o) {}
                    }), F = 1, n
                }
            }

            function s(e) {
                if (!e || "_" === e.substr(0, 1)) return null;
                switch (1 === F && (e = e.replace("api_", "")), e) {
                    case "changeColor":
                        return z.color.set;
                    case "paused":
                        return z.paused.get;
                    case "seekTo":
                        return z.currentTime.set
                }
                if ("function" == typeof z[e]) return z[e];
                var t = e.substr(0, 3),
                    n = e.substr(3, 1).toLowerCase() + e.substr(4);
                return z[n] && z[n][t] ? z[n][t] : null
            }

            function c(e) {
                if (e.source === window.parent) {
                    var n = o(e.data),
                        r = n.method,
                        u = n.value;
                    if (void 0 !== r) try {
                        var c = s(r);
                        if (!c) throw new t("“" + r + "” is not a valid method. Valid methods are: " + i().join(", ") + ".", "TypeError", r);
                        var l = [u];
                        c === z.enableTextTrack && "object" === ("undefined" == typeof u ? "undefined" : a(u)) && (l = [u.language, u.kind]);
                        var d = c.apply(e, l),
                            f = 0 !== r.indexOf("get") && "paused" !== r;
                        if (d === P || f && 3 > F) return;
                        g({
                            method: r,
                            value: void 0 !== d && "" !== d ? d : u
                        })
                    } catch (v) {
                        y(v)
                    }
                }
            }

            function d(e) {
                var t = e.event;
                if (1 === F)
                    for (var n in H)
                        if (H[n] === e.event) {
                            t = n;
                            break
                        }
                switch (t) {
                    case "onSeek":
                    case "onProgress":
                        delete e.data.percent, delete e.data.duration;
                        break;
                    case "onLoading":
                        delete e.data.seconds, delete e.data.duration
                }
                var i = "method=" + encodeURIComponent(t || e.method);
                i += "&params=";
                var r = [];
                if (void 0 !== e.value) r.push(encodeURIComponent(e.value));
                else if ("object" === a(e.data))
                    for (var o in e.data) r.push(encodeURIComponent(e.data[o]));
                else void 0 !== e.data && r.push(encodeURIComponent(e.data));
                return e.player_id && r.push(e.player_id), i += r.join(",")
            }

            function h(e) {
                if (e.event) {
                    for (var t in U)
                        if (U[t] === e.event) {
                            e.event = t;
                            break
                        }
                        "cuechange" === e.event && (e.data.text = e.data.cues[0].text, e.data.html = e.data.cues[0].html, delete e.data.cues)
                }
                return JSON.stringify(e)
            }

            function g(t) {
                if ((!t.event || (L.fire(t.event, t.data), C[t.event])) && O) {
                    e.config.embed && e.config.embed.player_id && (t.player_id = e.config.embed.player_id);
                    try {
                        1 === F ? t = d(t) : 2 === F && (t = h(t)), "object" !== ("undefined" == typeof t ? "undefined" : a(t)) || "ready" !== t.event && M || (t = JSON.stringify(t))
                    } catch (n) {}
                    if (window.parent != window) try {
                        window.parent.postMessage(t, S && "null" !== S ? S : "*")
                    } catch (i) {}
                }
            }

            function y(e) {
                var n = {
                    event: "error",
                    data: {
                        message: "An error occurred.",
                        name: "Error",
                        method: e.source
                    }
                };
                e instanceof t && (n = {
                    event: "error",
                    data: {
                        message: e.message,
                        name: e.name,
                        method: e.source
                    }
                }), g(n)
            }

            function b() {
                if (q && B) {
                    try {
                        switch (B) {
                            case "not-supported":
                                throw new t("This video is not supported in this browser.", "NotSupportedError");
                            case "no-files":
                                throw new t("There was an error loading the files for this video.", "FileError");
                            default:
                                throw new t("An error occurred during playback.", "PlaybackError")
                        }
                    } catch (e) {
                        y(e)
                    }
                    B = null
                }
            }

            function _() {
                "embed" in e.config && e.config.embed.on_site || (window.addEventListener ? window.addEventListener("message", c, !1) : window.attachEvent("onmessage", c))
            }

            function w() {
                e.events.on(m.Events.played, function(t) {
                    I || (I = !0, g({
                        event: "play",
                        data: {
                            seconds: (0, v.round)(t),
                            percent: (0, v.round)(t / e.config.video.duration),
                            duration: (0, v.round)(e.config.video.duration)
                        }
                    }))
                }), e.events.on(m.Events.paused, function(t) {
                    I = !1, g({
                        event: "pause",
                        data: {
                            seconds: (0, v.round)(t),
                            percent: (0, v.round)(t / e.config.video.duration),
                            duration: (0, v.round)(e.config.video.duration)
                        }
                    })
                }), e.events.on(m.Events.ended, function() {
                    I = !1, g({
                        event: "ended",
                        data: {
                            seconds: (0, v.round)(e.config.video.duration),
                            percent: 1,
                            duration: (0, v.round)(e.config.video.duration)
                        }
                    })
                }), e.events.on(m.Events.playProgress, function(e, t, n) {
                    g({
                        event: "timeupdate",
                        data: {
                            seconds: (0, v.round)(e),
                            percent: (0, v.round)(n),
                            duration: (0, v.round)(t)
                        }
                    })
                }), e.events.on(m.Events.loadProgress, function(e, t, n) {
                    var i = {
                        event: "progress",
                        data: {
                            percent: (0, v.round)(n),
                            duration: (0, v.round)(t),
                            seconds: (0, v.round)(e)
                        }
                    };
                    3 > F && (i.data.bytesLoaded = -1, i.data.bytesTotal = -1), g(i)
                }), e.events.on(m.Events.seeked, function(e, t, n) {
                    g({
                        event: "seeked",
                        data: {
                            seconds: (0, v.round)(e),
                            percent: (0, v.round)(n),
                            duration: (0, v.round)(t)
                        }
                    })
                }), e.events.on(m.Events.volumeChanged, function(e) {
                    g({
                        event: "volumechange",
                        data: {
                            volume: (0, v.round)(e)
                        }
                    })
                }), e.events.on(m.Events.error, function(e) {
                    B = e, b()
                }), e.events.on(m.Events.apiError, function(e) {
                    y(new t(e.message, e.name, e.method))
                }), e.events.on(m.Events.cueChanged, function(e) {
                    var t = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1],
                        n = e || {},
                        i = n.language,
                        r = void 0 === i ? null : i,
                        o = n.label,
                        a = void 0 === o ? null : o,
                        s = n.kind,
                        u = void 0 === s ? null : s;
                    g({
                        event: "cuechange",
                        data: {
                            label: a,
                            language: r,
                            kind: u,
                            cues: t
                        }
                    })
                }), e.events.on(m.Events.captionsChanged, function(e) {
                    D = e;
                    var t = e || {},
                        n = t.language,
                        i = void 0 === n ? null : n,
                        r = t.label,
                        o = void 0 === r ? null : r,
                        a = t.kind,
                        s = void 0 === a ? null : a;
                    g({
                        event: "texttrackchange",
                        data: {
                            label: o,
                            language: i,
                            kind: s
                        }
                    })
                }), e.config.request.flags.dnt || e.events.on(m.Events.emailCaptureSuccess, function() {
                    g({
                        event: "emailcapture"
                    })
                })
            }

            function k() {
                e.events.on(m.Control.reset, function() {
                    B = null, j = !1, R = !1
                })
            }

            function E() {
                e.events.on(m.Events.configChanged, function(t) {
                    A && setTimeout(function() {
                        var t = !0;
                        e.events.fire(m.Control.changeVolume, A, t)
                    }, 0), t && r()
                })
            }
            var S = document.referrer || e.config.request.referrer;
            try {
                S = decodeURIComponent(S)
            } catch (T) {
                S = unescape(S)
            }
            var x, P = "_ASYNC_",
                C = {
                    ready: !0
                },
                L = u["default"].make(),
                O = !(!window.postMessage || !window.parent.postMessage),
                M = !(f["default"].browser.ie >= 8 && f["default"].browser.ie < 10),
                A = null,
                F = e.config.embed.api,
                q = !1,
                I = !1,
                B = null,
                j = !1,
                R = !1,
                D = null,
                V = ["play", "pause", "ended", "timeupdate", "progress", "seeked", "error", "texttrackchange", "cuechange", "volumechange", "loaded", "emailcapture"],
                N = V.filter(function(e) {
                    return "emailcapture" !== e
                }),
                H = {
                    onFinish: "ended",
                    onLoading: "progress",
                    onLoad: "ready",
                    onProgress: "timeupdate",
                    onPlay: "play",
                    onPause: "pause",
                    onSeek: "seeked"
                },
                U = {
                    playProgress: "timeupdate",
                    loadProgress: "progress",
                    finish: "ended",
                    seek: "seeked"
                };
            t.prototype = new Error;
            var z = {
                _setEmbedSetting: function(t, n) {
                    e.config.embed.on_site && (n = "object" === ("undefined" == typeof n ? "undefined" : a(n)) ? n : Number(n), "badge" === t && (n ? n = x : x = e.config.embed.settings.badge), e.config.embed.settings[t] = n, e.events.fire(m.Events.embedSettingChanged, t, n), e.events.fire(m.Events.configChanged, e.config))
                },
                _showOverlay: function(t, n) {
                    e.events.fire(m.Control.showOverlay, t, n)
                },
                _toggleDebugHud: function() {
                    e.events.fire(m.Events.debugButtonPressed)
                },
                addEventListener: function(n, i) {
                    if (n in H && (n = H[n]), n in U && (n = U[n]), V.indexOf(n) < 0) throw new t("“" + n + "” is not a valid event. Valid events are: " + N.join(", ") + ".", "TypeError", "addEventListener");
                    i ? L.on(n, i) : C[n] = !0, ("loaded" === n && e.config.view === m.View.main || e.config.view === m.View.privateUnlocked) && r()
                },
                removeEventListener: function(e, t) {
                    t ? L.off(e, t) : C[e] = !1
                },
                play: function() {
                    n("play");
                    var i = "[object MessageEvent]" === Object.prototype.toString.call(this);
                    if (i && "undefined" != typeof f["default"] && (f["default"].iPhone || f["default"].iPad || f["default"].iPod) && !j) throw new t("The viewer must initiate playback first.", "Error", "play");
                    e.events.fire(m.Events.playButtonPressed)
                },
                pause: function() {
                    n("pause"), e.events.fire(m.Events.pauseButtonPressed)
                },
                loadVideo: function(i) {
                    if (isNaN(Number(i))) {
                        if (!e.config.embed.on_site) throw new t("The video id must be a number.", "TypeError", "loadVideo");
                        if (i.match(null === new RegExp("^https?://" + e.config.player_url + "/video/([0-9]+)/config"))) throw new t("The config url must be a valid Vimeo url.", "TypeError", "loadVideo")
                    }
                    return e.loadVideo(i).then(function() {
                        return F > 2 && g({
                            method: "loadVideo",
                            value: i
                        }), i
                    })["catch"](function() {
                        try {
                            n("loadVideo")
                        } catch (e) {
                            if (e instanceof t) return void y(e);
                            y(new t("An error occurred loading the video.", "Error", "loadVideo"))
                        }
                    }), P
                },
                unload: function() {
                    e.config.view !== m.View.main && e.config.view !== m.View.privateUnlocked || e.events.fire(m.Control.reset)
                },
                enableTextTrack: function(n) {
                    var i = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1],
                        r = ("text_tracks" in e.config.request ? e.config.request.text_tracks : []).map(function(e) {
                            return e.language = e.lang, e
                        }),
                        o = r.some(function(e) {
                            return e.language.toLowerCase() === n.toLowerCase()
                        });
                    if (!o) throw new t("There are no tracks for “" + n.toUpperCase() + "”.", "InvalidTrackLanguageError", "enableTextTrack");
                    var a = i ? n + "." + i : n,
                        s = (0, p["default"])(a, r),
                        u = s.track;
                    if (!u || i && u.kind !== i) throw new t("There are no " + i + " tracks for “" + n.toUpperCase() + "”.", "InvalidTrackError", "enableTextTrack");
                    return e.events.fire(m.Control.turnCaptionsOn, u.id, !0), F > 2 && e.events.once(m.Events.captionsChanged, function(e, t) {
                        g({
                            method: "enableTextTrack",
                            value: {
                                label: e.label,
                                language: e.language,
                                kind: e.kind
                            }
                        })
                    }), P
                },
                disableTextTrack: function() {
                    e.events.fire(m.Control.turnCaptionsOff)
                },
                ping: function() {
                    return e.config.video.id
                },
                autopause: {
                    get: function() {
                        if (e.telecine && "moogaloop" === e.telecine.currentScanner) throw new t("Autopause is not supported in the current player.", "UnsupportedError", "getAutopause");
                        return !!e.config.embed.autopause
                    },
                    set: function(n) {
                        if (e.telecine && "moogaloop" === e.telecine.currentScanner) throw new t("Autopause is not supported in the current player.", "UnsupportedError", "setAutopause");
                        e.config.embed.autopause = !!n
                    }
                },
                color: {
                    get: function() {
                        return e.config.embed.color.replace("#", "")
                    },
                    set: function(n) {
                        if ("moogaloop" === e.telecine.currentScanner) return void e.events.fire(m.Control.changeColor, n);
                        if (e.config.embed.settings.color && !e.config.embed.on_site) throw new t("The creator of the video has chosen to always use " + new l["default"](e.config.embed.color).hex + ".", "EmbedSettingsError", "setColor");
                        try {
                            var i = new l["default"](n);
                            e.events.fire(m.Control.changeColor, i.hex)
                        } catch (r) {
                            throw new t("The color should be 3- or 6-digit hex value.", "TypeError", "setColor")
                        }
                        var o = new l["default"](23, 35, 34, .75),
                            a = o.contrast(i).ratio;
                        if (3 > a) {
                            var s = i.clone().lighten(5, 3, o);
                            throw new t(i.hex + " does not meet minimum contrast ratio. We recommend using brighter colors. (You could try " + s.hex + " instead.) See WCAG 2.0 guidelines: http://www.w3.org/TR/WCAG/#visual-audio-contrast", "ContrastError", "setColor")
                        }
                    }
                },
                currentTime: {
                    get: function() {
                        return e.telecine && e.telecine.currentTime > .1 ? (0, v.round)(e.telecine.currentTime) : 0
                    },
                    set: function(n) {
                        if (n = parseFloat(n), isNaN(n) || 0 > n || n > e.config.video.duration) throw new t("Seconds must be a positive number less than the duration of the video (" + (0, v.round)(e.config.video.duration) + ").", "RangeError", "setCurrentTime");
                        var i = "[object MessageEvent]" === Object.prototype.toString.call(this);
                        if (i && "undefined" != typeof f["default"] && (f["default"].iPhone || f["default"].iPad || f["default"].iPod) && !j) throw new t("The viewer must initiate playback first.", "Error", "setCurrentTime");
                        return e.events.fire(m.Control.seek, null, n), e.events.fire(m.Events.mousedOver), F > 2 && e.events.once(m.Events.seeked, function(e, t, n) {
                            g({
                                method: "setCurrentTime",
                                value: e
                            })
                        }), P
                    }
                },
                duration: {
                    get: function() {
                        return (0, v.round)(e.config.video.duration)
                    }
                },
                ended: {
                    get: function() {
                        return !!e.telecine.ended
                    }
                },
                loop: {
                    get: function() {
                        return !!e.config.embed.loop
                    },
                    set: function(t) {
                        e.events.fire(m.Control.changeLoop, t)
                    }
                },
                paused: {
                    get: function() {
                        return e.telecine && "paused" in e.telecine ? !!e.telecine.paused : !0
                    }
                },
                textTracks: {
                    get: function() {
                        var t = e.telecine ? e.telecine.video.textTracks : [];
                        return t.map(function(e) {
                            return {
                                label: e.label,
                                language: e.language,
                                kind: e.kind,
                                mode: e === D ? "showing" : "disabled"
                            }
                        })
                    }
                },
                videoEmbedCode: {
                    get: function() {
                        return e.config.video.embed_code
                    }
                },
                videoHeight: {
                    get: function() {
                        return e.telecine.videoHeight || e.config.video.height
                    }
                },
                videoId: {
                    get: function() {
                        return e.config.video.id
                    }
                },
                videoTitle: {
                    get: function() {
                        return e.config.video.title
                    }
                },
                videoWidth: {
                    get: function() {
                        return e.telecine.videoWidth || e.config.video.width
                    }
                },
                videoUrl: {
                    get: function() {
                        if (!e.config.video.url) throw new t("The URL is not available because of the video’s privacy settings.", "PrivacyError", "getVideoUrl");
                        return e.config.video.url
                    }
                },
                volume: {
                    get: function() {
                        var t = (0, v.round)(e.config.request.cookie.volume);
                        return 1 === F ? Math.round(100 * t) : t
                    },
                    set: function(n) {
                        if (n = parseFloat(n), 1 === F && (n /= 100), isNaN(n) || 0 > n || n > 1) throw new t("Volume should be a number between 0 and 1.", "RangeError", "setVolume");
                        A = n;
                        var i = !0;
                        e.events.fire(m.Control.changeVolume, n, i)
                    }
                },
                _like: {
                    get: function() {
                        return !!e.config.user.liked
                    },
                    set: function(t) {
                        if (e.config.embed.on_site) {
                            if (e.config.user.liked === t) return;
                            e.events.fire(m.Events.likeButtonPressed, t)
                        }
                    }
                },
                _watchLater: {
                    get: function() {
                        return !!e.config.user.watch_later
                    },
                    set: function(t) {
                        if (e.config.embed.on_site) {
                            if (e.config.user.watch_later === t) return;
                            e.events.fire(m.Events.watchLaterButtonPressed, t)
                        }
                    }
                }
            };
            return e.events.on(m.Events.playInitiated, function() {
                j = !0
            }), w(), k(), E(), e.events.fire(m.Events.apiModuleReady), e.events.once(m.Events.ready, function() {
                q = !0, _(), g({
                    event: "ready"
                }), b()
            }), z
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = "function" == typeof i && "symbol" == typeof i.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof i && e.constructor === i ? "symbol" : typeof e
            },
            s = n(4),
            u = r(s),
            c = n(20),
            l = r(c),
            d = n(6),
            f = r(d),
            v = n(5),
            h = n(19),
            p = r(h),
            m = n(2);
        t["default"] = o, e.exports = t["default"]
    }).call(t, n(1))
}, function(e, t, n) {
    "use strict";
    var i, r = n(30),
        o = n(37),
        a = n(33),
        s = n(39);
    i = e.exports = function(e, t) {
        var n, i, a, u, c;
        return arguments.length < 2 || "string" != typeof e ? (u = t, t = e, e = null) : u = arguments[2], null == e ? (n = a = !0, i = !1) : (n = s.call(e, "c"), i = s.call(e, "e"), a = s.call(e, "w")), c = {
            value: t,
            configurable: n,
            enumerable: i,
            writable: a
        }, u ? r(o(u), c) : c
    }, i.gs = function(e, t, n) {
        var i, u, c, l;
        return "string" != typeof e ? (c = n, n = t, t = e, e = null) : c = arguments[3], null == t ? t = void 0 : a(t) ? null == n ? n = void 0 : a(n) || (c = n, n = void 0) : (c = t, t = n = void 0), null == e ? (i = !0, u = !1) : (i = s.call(e, "c"), u = s.call(e, "e")), l = {
            get: t,
            set: n,
            configurable: i,
            enumerable: u
        }, c ? r(o(c), l) : l
    }
}, function(e, t, n) {
    "use strict";
    e.exports = n(31)() ? Object.assign : n(32)
}, function(e, t) {
    "use strict";
    e.exports = function() {
        var e, t = Object.assign;
        return "function" != typeof t ? !1 : (e = {
            foo: "raz"
        }, t(e, {
            bar: "dwa"
        }, {
            trzy: "trzy"
        }), e.foo + e.bar + e.trzy === "razdwatrzy")
    }
}, function(e, t, n) {
    "use strict";
    var i = n(34),
        r = n(38),
        o = Math.max;
    e.exports = function(e, t) {
        var n, a, s, u = o(arguments.length, 2);
        for (e = Object(r(e)), s = function(i) {
                try {
                    e[i] = t[i]
                } catch (r) {
                    n || (n = r)
                }
            }, a = 1; u > a; ++a) t = arguments[a], i(t).forEach(s);
        if (void 0 !== n) throw n;
        return e
    }
}, function(e, t) {
    "use strict";
    e.exports = function(e) {
        return "function" == typeof e
    }
}, function(e, t, n) {
    "use strict";
    e.exports = n(35)() ? Object.keys : n(36)
}, function(e, t) {
    "use strict";
    e.exports = function() {
        try {
            return Object.keys("primitive"), !0
        } catch (e) {
            return !1
        }
    }
}, function(e, t) {
    "use strict";
    var n = Object.keys;
    e.exports = function(e) {
        return n(null == e ? e : Object(e))
    }
}, function(e, t) {
    "use strict";
    var n = Array.prototype.forEach,
        i = Object.create,
        r = function(e, t) {
            var n;
            for (n in e) t[n] = e[n]
        };
    e.exports = function(e) {
        var t = i(null);
        return n.call(arguments, function(e) {
            null != e && r(Object(e), t)
        }), t
    }
}, function(e, t) {
    "use strict";
    e.exports = function(e) {
        if (null == e) throw new TypeError("Cannot use null or undefined");
        return e
    }
}, function(e, t, n) {
    "use strict";
    e.exports = n(40)() ? String.prototype.contains : n(41)
}, function(e, t) {
    "use strict";
    var n = "razdwatrzy";
    e.exports = function() {
        return "function" != typeof n.contains ? !1 : n.contains("dwa") === !0 && n.contains("foo") === !1
    }
}, function(e, t) {
    "use strict";
    var n = String.prototype.indexOf;
    e.exports = function(e) {
        return n.call(this, e, arguments[1]) > -1
    }
}, function(e, t, n) {
    (function(t) {
        "use strict";
        e.exports = function() {
            var e;
            if ("function" != typeof t) return !1;
            e = t("test symbol");
            try {
                String(e)
            } catch (n) {
                return !1
            }
            return "symbol" == typeof t.iterator ? !0 : "object" != typeof t.isConcatSpreadable ? !1 : "object" != typeof t.iterator ? !1 : "object" != typeof t.toPrimitive ? !1 : "object" != typeof t.toStringTag ? !1 : "object" == typeof t.unscopables
        }
    }).call(t, n(1))
}, function(e, t) {
    "use strict";
    e.exports = function(e) {
        return e && ("symbol" == typeof e || "Symbol" === e["@@toStringTag"]) || !1
    }
}, function(e, t, n) {
    (function(t) {
        "use strict";
        var i, r, o, a = n(29),
            s = n(45),
            u = Object.create,
            c = Object.defineProperties,
            l = Object.defineProperty,
            d = Object.prototype,
            f = u(null);
        "function" == typeof t && (i = t);
        var v = function() {
            var e = u(null);
            return function(t) {
                for (var n, i, r = 0; e[t + (r || "")];) ++r;
                return t += r || "", e[t] = !0, n = "@@" + t, l(d, n, a.gs(null, function(e) {
                    i || (i = !0, l(this, n, a(e)), i = !1)
                })), n
            }
        }();
        o = function(e) {
            if (this instanceof o) throw new TypeError("TypeError: Symbol is not a constructor");
            return r(e)
        }, e.exports = r = function h(e) {
            var t;
            if (this instanceof h) throw new TypeError("TypeError: Symbol is not a constructor");
            return t = u(o.prototype), e = void 0 === e ? "" : String(e), c(t, {
                __description__: a("", e),
                __name__: a("", v(e))
            })
        }, c(r, {
            "for": a(function(e) {
                return f[e] ? f[e] : f[e] = r(String(e))
            }),
            keyFor: a(function(e) {
                var t;
                s(e);
                for (t in f)
                    if (f[t] === e) return t
            }),
            hasInstance: a("", i && i.hasInstance || r("hasInstance")),
            isConcatSpreadable: a("", i && i.isConcatSpreadable || r("isConcatSpreadable")),
            iterator: a("", i && i.iterator || r("iterator")),
            match: a("", i && i.match || r("match")),
            replace: a("", i && i.replace || r("replace")),
            search: a("", i && i.search || r("search")),
            species: a("", i && i.species || r("species")),
            split: a("", i && i.split || r("split")),
            toPrimitive: a("", i && i.toPrimitive || r("toPrimitive")),
            toStringTag: a("", i && i.toStringTag || r("toStringTag")),
            unscopables: a("", i && i.unscopables || r("unscopables"))
        }), c(o.prototype, {
            constructor: a(r),
            toString: a("", function() {
                return this.__name__
            })
        }), c(r.prototype, {
            toString: a(function() {
                return "Symbol (" + s(this).__description__ + ")"
            }),
            valueOf: a(function() {
                return s(this)
            })
        }), l(r.prototype, r.toPrimitive, a("", function() {
            return s(this)
        })), l(r.prototype, r.toStringTag, a("c", "Symbol")), l(o.prototype, r.toStringTag, a("c", r.prototype[r.toStringTag])), l(o.prototype, r.toPrimitive, a("c", r.prototype[r.toPrimitive]))
    }).call(t, n(1))
}, function(e, t, n) {
    "use strict";
    var i = n(43);
    e.exports = function(e) {
        if (!i(e)) throw new TypeError(e + " is not a symbol");
        return e
    }
}, function(e, t) {
    function n() {
        c = !1, a.length ? u = a.concat(u) : l = -1, u.length && i()
    }

    function i() {
        if (!c) {
            var e = setTimeout(n);
            c = !0;
            for (var t = u.length; t;) {
                for (a = u, u = []; ++l < t;) a && a[l].run();
                l = -1, t = u.length
            }
            a = null, c = !1, clearTimeout(e)
        }
    }

    function r(e, t) {
        this.fun = e, this.array = t
    }

    function o() {}
    var a, s = e.exports = {},
        u = [],
        c = !1,
        l = -1;
    s.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        u.push(new r(e, t)), 1 !== u.length || c || setTimeout(i, 0)
    }, r.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = o, s.addListener = o, s.once = o, s.off = o, s.removeListener = o, s.removeAllListeners = o, s.emit = o, s.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, s.cwd = function() {
        return "/"
    }, s.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, s.umask = function() {
        return 0
    }
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function r(e, t) {
            var n = e,
                i = t;
            return n % 320 !== 0 && (n = 100 * Math.ceil(e / 100), i = Math.round(n / e * t)), {
                width: n,
                height: i
            }
        }

        function o(e) {
            var t = e.width,
                n = e.height,
                i = e.baseUrl,
                r = e.webpSupport,
                o = void 0 === r ? !1 : r,
                a = i + (o ? ".webp" : ".jpg");
            return a += "?mw=" + t, 0 !== n && (a += "&mh=" + n), u["default"].devicePixelRatio > 1 && (a += "&q=70"), a
        }

        function a(t) {
            return new e(function(e, n) {
                var i = new Image;
                i.src = t, i.onload = function() {
                    return e(i)
                }, i.onerror = function(e) {
                    return n(e)
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getThumbnailDimensions = r, t.getThumbnailUrl = o, t.loadImage = a;
        var s = n(6),
            u = i(s)
    }).call(t, n(3))
}, function(e, t, n) {
    (function(e, i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, n) {
                    var i = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var s, u = t[e.iterator](); !(r = (s = u.next()).done) && (i.push(s.value), !n || i.length !== n); r = !0);
                    } catch (c) {
                        o = !0, a = c
                    } finally {
                        try {
                            !r && u["return"] && u["return"]()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return i
                }
                return function(n, i) {
                    if (Array.isArray(n)) return n;
                    if (e.iterator in Object(n)) return t(n, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = "function" == typeof e && "symbol" == typeof e.iterator ? function(e) {
                return typeof e
            } : function(t) {
                return t && "function" == typeof e && t.constructor === e ? "symbol" : typeof t
            },
            u = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            c = n(4),
            l = r(c),
            d = function() {
                function e(t) {
                    o(this, e), l["default"].make(this), this._sorcerer = t, this._sourceBuffer = null, this._activeStreamIndex = null, this._needsStreamSwitch = !1, this._needInitSegment = !0, this._lastAppended = null, this._toRemove = [], this._streams = [], this._quotaExceeded = !1, this._quotaExceededTimer = null
                }
                return u(e, [{
                    key: "addStream",
                    value: function(e) {
                        var t = this;
                        e.on("segmentadd", function() {
                            return t._process()
                        });
                        var n = this._streams.push(e) - 1;
                        e.index = n, null === this._activeStreamIndex && (this._setActiveIndex(n), this._needsStreamSwitch = !0)
                    }
                }, {
                    key: "switchTo",
                    value: function(e) {
                        var t = this,
                            n = e;
                        "object" === ("undefined" == typeof e ? "undefined" : s(e)) && (n = e.index);
                        var r = this._activeStreamIndex !== n,
                            o = r;
                        if (!r && this._needsStreamSwitch && (r = !0), r) {
                            this._needsStreamSwitch = !1;
                            var a = this._activeStreamIndex,
                                u = this._streams[a];
                            u && o && u.abort(), this._switchToIndex = n, this._setActiveIndex(n)
                        }
                        return this._process(), new i(function(e) {
                            return r ? void(t._resolveSwitchComplete = function() {
                                t._switchToIndex === n && (t._resolveSwitchComplete = null, e(), t.fire("streamchange", n))
                            }) : void e()
                        })
                    }
                }, {
                    key: "clear",
                    value: function() {
                        this._streams.forEach(function(e) {
                            e.clear()
                        })
                    }
                }, {
                    key: "remove",
                    value: function(e) {
                        var t = this,
                            n = arguments.length <= 1 || void 0 === arguments[1] ? this._sorcerer._mediaSource.duration : arguments[1];
                        return new i(function(i, r) {
                            t._toRemove.push([e, n, i]), t._process()
                        })
                    }
                }, {
                    key: "_attachEvents",
                    value: function() {
                        this.bound = {
                            handleUpdateEnd: this._handleUpdateEnd.bind(this)
                        }, this._sourceBuffer.addEventListener("updateend", this.bound.handleUpdateEnd), this._sorcerer.on("endofstream", this.bound.handleUpdateEnd)
                    }
                }, {
                    key: "_handleUpdateEnd",
                    value: function() {
                        return this._sorcerer._delayBufferEndUntilEndOfStream ? void this._sorcerer._fireStreamHasEnded() : (this._lastAppended && (this.fire("appendbufferend", this._lastAppended), this._lastAppended = null, this._resolveSwitchComplete && this._resolveSwitchComplete()), void this._process())
                    }
                }, {
                    key: "_removeEventListeners",
                    value: function() {
                        this.bound && (this._sourceBuffer && this._sourceBuffer.removeEventListener("updateend", this.bound.handleUpdateEnd), this._sorcerer.off("endofstream", this.bound.handleUpdateEnd))
                    }
                }, {
                    key: "_setActiveIndex",
                    value: function(e) {
                        this._needInitSegment = !0, this._activeStreamIndex = e, this._sorcerer._frameDropper.streamIndex = e
                    }
                }, {
                    key: "_process",
                    value: function() {
                        var e = this,
                            t = this._streams[this._activeStreamIndex];
                        if (!this._sourceBuffer) return void this.on("sourcebufferattach", this._process);
                        if (t && "closed" !== this._sorcerer._mediaSource.readyState) {
                            var n = this._sourceBuffer;
                            if (!n.updating) {
                                if (this._toRemove.length) {
                                    var i = function() {
                                        var t = e._toRemove.shift(),
                                            i = a(t, 3),
                                            r = i[0],
                                            o = i[1],
                                            s = i[2],
                                            u = e;
                                        n.addEventListener("updateend", function l(e) {
                                            n.removeEventListener("updateend", l), s(), clearTimeout(u._quotaExceededTimer), u._quotaExceededTimer = setTimeout(function() {
                                                u._quotaExceeded = !1, u._process()
                                            }, 5e3)
                                        });
                                        var c = r;
                                        return c > o && (c = 0), n.remove(c, o), {
                                            v: void 0
                                        }
                                    }();
                                    if ("object" === ("undefined" == typeof i ? "undefined" : s(i))) return i.v
                                }
                                if (!this._quotaExceeded) {
                                    if (this._needInitSegment) return t.getInitSegment().then(function(t) {
                                        return e._lastAppended = null, n.appendBuffer(t), t
                                    })["catch"](function(e) {}), void(this._needInitSegment = !1);
                                    var r = t.getNextSegment();
                                    if (null !== r) {
                                        var o = t.getIdForSegment(r),
                                            u = t.isFinal(r);
                                        if (u) {
                                            var c = 0;
                                            this._sourceBuffer.buffered.length > 0 && (c = this._sourceBuffer.buffered.end(this._sourceBuffer.buffered.length - 1)), this._sorcerer._finalSegmentStartTime = c, this._sorcerer._delayBufferEndUntilEndOfStream = !0
                                        }
                                        this._lastAppended = o, this.fire("appendbufferstart", o);
                                        try {
                                            n.appendBuffer(r)
                                        } catch (l) {
                                            "QuotaExceededError" === l.name && (this._quotaExceeded = !0, this.removeBuffer(0, Math.max(.1, this._video.currentTime - 6)), t._readyToAppend.unshift(r))
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, {
                    key: "streams",
                    get: function() {
                        return this._streams
                    }
                }, {
                    key: "activeStreamIndex",
                    get: function() {
                        return this._activeStreamIndex
                    }
                }, {
                    key: "sourceBuffer",
                    get: function() {
                        return this._sourceBuffer
                    },
                    set: function(e) {
                        this._sourceBuffer = e, this._attachEvents(), this.fire("sourcebufferattach")
                    }
                }]), e
            }();
        t["default"] = d
    }).call(t, n(1), n(3))
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        o = n(23),
        a = function() {
            function e(t) {
                i(this, e), this._video = t, this._running = !1, this._droppedFramesTimeout = null, this._droppedFrameData = {}, this._decodedFrameData = {}, this._droppedFrames = 0, this._decodedFrames = 0, this._streamIndex = "default", this.bound = {
                    startCheckingDroppedFrames: this._startCheckingDroppedFrames.bind(this),
                    stopCheckingDroppedFrames: this._stopCheckingDroppedFrames.bind(this)
                }
            }
            return r(e, [{
                key: "start",
                value: function() {
                    return this._startCheckingDroppedFrames(), this
                }
            }, {
                key: "stop",
                value: function() {
                    return this._stopCheckingDroppedFrames(), this
                }
            }, {
                key: "destroy",
                value: function() {
                    this._stopCheckingDroppedFrames(), this._removeEvents()
                }
            }, {
                key: "getDroppedFrameRate",
                value: function(e, t) {
                    var n = arguments.length <= 2 || void 0 === arguments[2] ? "average" : arguments[2],
                        i = this._droppedFrameData[t];
                    if (!i) return 0;
                    if (i.length < e) return 0;
                    var r = i.slice(-e);
                    return "median" === n ? (0, o.median)(r) : (0, o.average)(r)
                }
            }, {
                key: "getDroppedFrameTotal",
                value: function() {
                    return {
                        dropped: this._getTotalDroppedFrames(),
                        total: this._getTotalFrames()
                    }
                }
            }, {
                key: "_attachEvents",
                value: function() {
                    this._video.addEventListener("playing", this.bound.startCheckingDroppedFrames), this._video.addEventListener("pause", this.bound.stopCheckingDroppedFrames), this._video.addEventListener("ended", this.bound.stopCheckingDroppedFrames)
                }
            }, {
                key: "_removeEvents",
                value: function() {
                    this._video.removeEventListener("playing", this.bound.startCheckingDroppedFrames), this._video.removeEventListener("pause", this.bound.stopCheckingDroppedFrames), this._video.removeEventListener("ended", this.bound.stopCheckingDroppedFrames)
                }
            }, {
                key: "_startCheckingDroppedFrames",
                value: function() {
                    this._running = !0, this._checkDroppedFrames()
                }
            }, {
                key: "_stopCheckingDroppedFrames",
                value: function() {
                    this._running = !1
                }
            }, {
                key: "_checkDroppedFrames",
                value: function() {
                    var e = this;
                    if (this._running && null !== this._streamIndex) {
                        clearTimeout(this._droppedFramesTimeout);
                        var t = this._getTotalDroppedFrames(),
                            n = t - this._droppedFrames;
                        this._droppedFrames = t;
                        var i = this._getTotalFrames(),
                            r = i - this._decodedFrames;
                        this._decodedFrames = i, this._droppedFrameData[this._streamIndex] || (this._droppedFrameData[this._streamIndex] = []), this._decodedFrameData[this._streamIndex] || (this._decodedFrameData[this._streamIndex] = []), this._droppedFrameData[this._streamIndex].length > 100 && this._droppedFrameData[this._streamIndex].shift(), this._decodedFrameData[this._streamIndex].length > 100 && this._decodedFrameData[this._streamIndex].shift(), this._droppedFrameData[this._streamIndex].push(n), this._decodedFrameData[this._streamIndex].push(r), this._droppedFramesTimeout = setTimeout(function() {
                            e._checkDroppedFrames()
                        }, 1e3)
                    }
                }
            }, {
                key: "_getTotalDroppedFrames",
                value: function() {
                    return "function" == typeof this._video.getVideoPlaybackQuality ? this._video.getVideoPlaybackQuality().droppedVideoFrames : this._video.webkitDroppedFrameCount || 0
                }
            }, {
                key: "_getTotalFrames",
                value: function() {
                    if ("function" == typeof this._video.getVideoPlaybackQuality) {
                        var e = this._video.getVideoPlaybackQuality();
                        return e.totalVideoFrames - e.droppedVideoFrames - e.corruptedVideoFrames
                    }
                    return this._video.webkitDecodedFrameCount || 0
                }
            }, {
                key: "streamIndex",
                get: function() {
                    return this._streamIndex
                },
                set: function(e) {
                    this._streamIndex = e
                }
            }]), e
        }();
    t["default"] = a
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            a = n(22),
            s = i(a),
            u = n(48),
            c = i(u),
            l = n(51),
            d = i(l),
            f = n(49),
            v = i(f),
            h = n(4),
            p = i(h),
            m = function() {
                function t(e) {
                    var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    r(this, t), this._video = e, this._options = n, p["default"].make(this), this._options.duration && (this._options.duration = Math.ceil(100 * this._options.duration) / 100), this._bufferCount = 0, this._frameDropper = new v["default"](e), this._mediaSource = new MediaSource, this._video.src = URL.createObjectURL(this._mediaSource), this._buffersForCodec = {}, this._readyPromiseResolve = null, this._finalSegmentStartTime = void 0, this._delayBufferEndUntilEndOfStream = !1, this._attachEvents()
                }
                return o(t, [{
                    key: "switchTo",
                    value: function(e) {
                        return 1 === this._bufferCount ? this.video.switchTo(e) : !1
                    }
                }, {
                    key: "getCurrentSpeed",
                    value: function() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                            t = e.type,
                            n = void 0 === t ? "average" : t,
                            i = e.howMany,
                            r = void 0 === i ? 10 : i,
                            o = e.weights,
                            a = void 0 === o ? [] : o,
                            u = e.percentile,
                            c = void 0 === u ? null : u;
                        return "average" === n ? s["default"].getAverageSpeed(r, a) : "median" === n ? s["default"].getMedianSpeed(r) : s["default"].getPercentileSpeed(r, c)
                    }
                }, {
                    key: "getResponseSpeeds",
                    value: function() {
                        return s["default"].getResponseSpeeds()
                    }
                }, {
                    key: "getDroppedFrameRate",
                    value: function(e) {
                        var t = arguments.length <= 1 || void 0 === arguments[1] ? this.activeStreamIndex : arguments[1],
                            n = arguments.length <= 2 || void 0 === arguments[2] ? "average" : arguments[2];
                        return this._frameDropper.getDroppedFrameRate(e, t, n)
                    }
                }, {
                    key: "getDroppedFrameTotal",
                    value: function() {
                        return this._frameDropper.getDroppedFrameTotal()
                    }
                }, {
                    key: "clear",
                    value: function() {
                        for (var e in this._buffersForCodec) this._buffersForCodec[e].clear()
                    }
                }, {
                    key: "removeBuffer",
                    value: function() {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
                            n = arguments.length <= 1 || void 0 === arguments[1] ? this._video.duration : arguments[1],
                            i = [];
                        for (var r in this._buffersForCodec) i.push(this._buffersForCodec[r].remove(t, n));
                        return e.all(i)
                    }
                }, {
                    key: "addStream",
                    value: function(e, t) {
                        var n = this,
                            i = this._getCodecType(e);
                        this._buffersForCodec[i] || ! function() {
                            n._bufferCount += 1;
                            var t = new c["default"](n, i);
                            n._buffersForCodec[i] = t, n.readyPromise.then(function() {
                                var r = void 0;
                                try {
                                    r = n._mediaSource.addSourceBuffer(e)
                                } catch (o) {
                                    if (22 !== o.code) return void n.fire("srcnotsupported", o);
                                    r = n._buffersForCodec[i]
                                }
                                n._options.duration && (r.appendWindowEnd = n._options.duration), t.sourceBuffer = r
                            }), ["appendbufferstart", "appendbufferend", "streamchange"].forEach(function(e) {
                                t.on(e, function(t) {
                                    n.fire(e, t)
                                })
                            })
                        }();
                        var r = new d["default"](t);
                        return r.codec = e, ["downloadend", "downloadabort", "queued", "bufferqueueadd"].forEach(function(e) {
                            r.on(e, function(t) {
                                n.fire(e, t)
                            })
                        }), this._buffersForCodec[i].addStream(r), r
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.clear(), this._removeEventListeners(), this._frameDropper.destroy(), this._video.src && URL.revokeObjectURL(this._video.src)
                    }
                }, {
                    key: "_attachEvents",
                    value: function() {
                        var t = this;
                        this.bound = {
                            handleSourceOpen: this._handleSourceOpen.bind(this),
                            handleTimeUpdate: this._handleTimeUpdate.bind(this),
                            handleEnded: this._handleEnded.bind(this)
                        }, this.readyPromise = new e(function(e, n) {
                            t._readyPromiseResolve = e, t._mediaSource.addEventListener("sourceopen", t.bound.handleSourceOpen)
                        })
                    }
                }, {
                    key: "_sourceBuffersAreUpdating",
                    value: function() {
                        for (var e = 0; e < this._mediaSource.sourceBuffers.length; e++)
                            if (this._mediaSource.sourceBuffers[e].updating) return !0;
                        return !1
                    }
                }, {
                    key: "_fireStreamHasEnded",
                    value: function() {
                        void 0 !== this._finalSegmentStartTime && "open" === this._mediaSource.readyState && (this._sourceBuffersAreUpdating() || (this._mediaSource.endOfStream(), this._delayBufferEndUntilEndOfStream && (this._delayBufferEndUntilEndOfStream = !1, this._finalSegmentStartTime = void 0, this.fire("endofstream"))))
                    }
                }, {
                    key: "_handleTimeUpdate",
                    value: function() {
                        this._fireStreamHasEnded()
                    }
                }, {
                    key: "_handleEnded",
                    value: function() {
                        this._finalSegmentStartTime = void 0
                    }
                }, {
                    key: "_handleSourceOpen",
                    value: function() {
                        this._options.duration && (this._mediaSource.duration = this._options.duration), this._addEventListeners(), this._readyPromiseResolve(), this._mediaSource.removeEventListener("sourceopen", this.bound.handleSourceOpen)
                    }
                }, {
                    key: "_addEventListeners",
                    value: function() {
                        this._video.addEventListener("timeupdate", this.bound.handleTimeUpdate), this._video.addEventListener("ended", this.bound.handleEnded)
                    }
                }, {
                    key: "_removeEventListeners",
                    value: function() {
                        for (var e in this._buffersForCodec) this._buffersForCodec[e]._removeEventListeners();
                        this._video.removeEventListener("timeupdate", this.bound.handleTimeUpdate), this._video.removeEventListener("ended", this.bound.handleEnded)
                    }
                }, {
                    key: "_getCodecType",
                    value: function(e) {
                        return 0 === e.indexOf("audio") ? "audio" : "video"
                    }
                }, {
                    key: "mediaSource",
                    get: function() {
                        return this._mediaSource
                    }
                }, {
                    key: "streams",
                    get: function() {
                        return 1 === this._bufferCount ? this.video.streams : !1
                    }
                }, {
                    key: "activeStreamIndex",
                    get: function() {
                        return 1 === this._bufferCount ? this.video.activeStreamIndex : !1
                    }
                }, {
                    key: "video",
                    get: function() {
                        return this._buffersForCodec.video ? this._buffersForCodec.video : !1
                    }
                }, {
                    key: "audio",
                    get: function() {
                        return this._buffersForCodec.audio ? this._buffersForCodec.audio : !1
                    }
                }]), t
            }();
        t["default"] = m
    }).call(t, n(3))
}, function(e, t, n) {
    (function(e, i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            s = n(22),
            u = r(s),
            c = n(4),
            l = r(c),
            d = function() {
                function t(n) {
                    var r = this;
                    o(this, t), l["default"].make(this), this._readyToAppend = [], this._initSegment = null, this._index = NaN, this._codec = "", this._fetcher = (new u["default"]).start(), ["downloadend", "downloadabort"].forEach(function(e) {
                        r._fetcher.on(e, function(t) {
                            r.fire(e, t)
                        })
                    }), this._bufferData = new e, this._segmentToId = {}, this._getInitSegmentPromise = new i(function(e, i) {
                        return t.isValidSegmentUrl(n) ? void r._fetcher.add({
                            url: n.url || n,
                            byteRange: n.byteRange,
                            id: null
                        }, function(t) {
                            r._initSegment = t, e(t)
                        }) : (r._initSegment = n, void e(n))
                    })
                }
                return a(t, null, [{
                    key: "isValidSegmentUrl",
                    value: function(e) {
                        return "string" == typeof e ? !0 : "string" == typeof e.url && "string" == typeof e.byteRange
                    }
                }]), a(t, [{
                    key: "getIdForSegment",
                    value: function(e) {
                        return t.isValidSegmentUrl(e) ? this._segmentToId[e] : this._bufferData.get(e).id
                    }
                }, {
                    key: "isFinal",
                    value: function(e) {
                        return this._bufferData.get(e)["final"]
                    }
                }, {
                    key: "addSegment",
                    value: function(e, n, r) {
                        var o = this,
                            a = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3];
                        return new i(function(i, s) {
                            return t.isValidSegmentUrl(e) ? (o._segmentToId[e] = n || e, o.fire("queued", o.getIdForSegment(e)), void o._fetcher.add({
                                url: e.url || e,
                                byteRange: e.byteRange,
                                id: o.getIdForSegment(e)
                            }, function(t) {
                                o._bufferData.set(t, {
                                    id: n || e,
                                    "final": r
                                }), o._readyToAppend.push(t), o.fire("bufferqueueadd", o.getIdForSegment(e)), a || o.fire("segmentadd"), i()
                            })) : (o._bufferData.set(e, {
                                id: n,
                                "final": r
                            }), o._readyToAppend.push(e), o.fire("bufferqueueadd", n), void i())
                        })
                    }
                }, {
                    key: "clear",
                    value: function() {
                        this._readyToAppend = []
                    }
                }, {
                    key: "abort",
                    value: function() {
                        var e = this;
                        this._getInitSegmentPromise.then(function() {
                            e._fetcher.abort()
                        })
                    }
                }, {
                    key: "getNextSegment",
                    value: function() {
                        return 0 === this._readyToAppend.length ? null : this._readyToAppend.shift()
                    }
                }, {
                    key: "getInitSegment",
                    value: function() {
                        return this._getInitSegmentPromise
                    }
                }, {
                    key: "codec",
                    get: function() {
                        return this._codec
                    },
                    set: function(e) {
                        this._codec = e
                    }
                }, {
                    key: "index",
                    get: function() {
                        return this._index
                    },
                    set: function(e) {
                        this._index = e
                    }
                }]), t
            }();
        t["default"] = d
    }).call(t, n(12), n(3))
}, function(e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        r = function() {
            function e(t) {
                n(this, e), this.scanner = t
            }
            return i(e, null, [{
                key: "displayName",
                get: function() {
                    return "Brain"
                }
            }]), i(e, [{
                key: "shouldPowerUp",
                value: function(e, t) {
                    return !1
                }
            }, {
                key: "shouldPowerDown",
                value: function(e, t) {
                    return !1
                }
            }, {
                key: "canPowerUp",
                value: function(e, t) {
                    return 1 === e.length ? !1 : t < e.length - 1
                }
            }, {
                key: "canPowerDown",
                value: function(e, t) {
                    return 1 === e.length ? !1 : t > 0
                }
            }, {
                key: "filterStreams",
                value: function(e) {
                    return e
                }
            }]), e
        }();
    t["default"] = r
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        u = n(52),
        c = i(u),
        l = function(e) {
            function t(e) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                r(this, t);
                var i = o(this, Object.getPrototypeOf(t).call(this, e));
                return i._options = n, i.finalSegmentLoaded = !1, i.blacklisted = [], i.whitelisted = [], i
            }
            return a(t, e), s(t, null, [{
                key: "displayName",
                get: function() {
                    return "Skyfire"
                }
            }]), s(t, [{
                key: "shouldPowerUp",
                value: function(e, t, n) {
                    var i = .85;
                    n && this._options.startingBandwidthThreshold && (i = this._options.startingBandwidthThreshold);
                    var r = e.indexOf(t);
                    if (-1 === r && (r = 0), !this.canPowerUp(e, r)) return !1;
                    var o = this.getCurrentSpeed();
                    if (!o) return !1;
                    for (var a = r + 1, s = r; a < e.length;) o * i > e[a].bitrate + e[a].audioBitrate && (s = a), a += 1;
                    return s === r ? !1 : s
                }
            }, {
                key: "shouldPowerDown",
                value: function(e, t) {
                    var n = e.indexOf(t),
                        i = -1 === n;
                    if (i) return e.length - 1;
                    if (!this.canPowerDown(e, n)) return !1;
                    var r = 10,
                        o = this.scanner.sorcerer.getDroppedFrameRate(r, n, "median"),
                        a = t.framerate,
                        s = this.getCurrentSpeed();
                    if (!s) return !1;
                    var u = o / a * 100;
                    if (u >= 75) return this.blacklist(n), n - 1;
                    for (var c = n, l = n; l >= 0;).9 * s < e[l].bitrate + e[l].audioBitrate && (c = l - 1), l -= 1;
                    return 0 > c ? !1 : c === n ? !1 : c
                }
            }, {
                key: "isTimeInBuffer",
                value: function(e) {
                    var t = this.scanner._video;
                    return this._timesAreInRange(e, e, t.buffered)
                }
            }, {
                key: "getCurrentSpeed",
                value: function() {
                    var e = 3,
                        t = [1, 2, 5];
                    return this.scanner.sorcerer.getCurrentSpeed({
                        type: "average",
                        howMany: e,
                        weights: t
                    })
                }
            }, {
                key: "getDistanceFromBuffer",
                value: function(e) {
                    for (var t = e, n = this.scanner._video, i = 0; i < n.buffered.length; i++)
                        if (n.buffered.start(i) <= e && n.buffered.end(i) >= e) {
                            t = n.buffered.end(i);
                            break
                        }
                    return t - e
                }
            }, {
                key: "getTimeEstimateToLoad",
                value: function(e, t) {
                    if (null === t) return 3;
                    var n = t.segments[e],
                        i = n.end - n.start,
                        r = this.getCurrentSpeed(),
                        o = i * (t.bitrate + t.audioBitrate) / r;
                    return 1.3 * o
                }
            }, {
                key: "canPlayFromTimeInStream",
                value: function(e, t) {
                    if (!this.isTimeInBuffer(e)) return !1;
                    if (!t) return !1;
                    var n = this.getSegmentsToLoad();
                    if (0 === n.length) return !0;
                    var i = this.getDistanceFromBuffer(e);
                    return this.getTimeEstimateToLoad(n[0], t) < i
                }
            }, {
                key: "getSegmentsToLoad",
                value: function(e) {
                    for (var t = arguments.length <= 1 || void 0 === arguments[1] ? "video" : arguments[1], n = this.scanner._video, i = this.scanner.currentTime, r = [], o = this._getSecondsToLoadAhead(i, n.duration), a = i + o, s = this.scanner.sorcerer[t].activeStreamIndex, u = this.scanner._streams[t][s], c = this.scanner.sorcerer[t].sourceBuffer.buffered, l = 0; l < u.segments.length; l++) {
                        var d = u.segments[l],
                            f = l === u.segments.length - 1;
                        if (!(d.end < i || d.start > a)) {
                            var v = i >= d.start && i < d.end,
                                h = this._isSegmentInBuffer(d, c, f);
                            !e && h || e && h && v || (v ? r.push(l) : a >= d.start && r.push(l))
                        }
                    }
                    return r
                }
            }, {
                key: "blacklist",
                value: function(e) {
                    this.blacklisted[e] = 1
                }
            }, {
                key: "lock",
                value: function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                    this.whitelisted = e
                }
            }, {
                key: "filterStreams",
                value: function(e) {
                    for (var t = this.scanner._video.clientWidth, n = this.scanner._video.clientHeight, i = [], r = void 0, o = !1, a = 0; a < e.length; a++)
                        if (r && r[0] === e[a].width && r[1] === e[a].height) i.push(e[a]);
                        else {
                            if (o) break;
                            if (!(this.blacklisted[a] && -1 === this.whitelisted.indexOf(a) || this.whitelisted.length && -1 === this.whitelisted.indexOf(a)))
                                if (this.whitelisted.length) i.push(e[a]);
                                else {
                                    var s = this._getScaleFromDimensions(t, n, e[a].width, e[a].height),
                                        u = 1e3 / (window.devicePixelRatio || 1),
                                        c = u > n ? 1.75 : 1;
                                    s >= c && (o = !0), i.push(e[a]), r = [e[a].width, e[a].height]
                                }
                        }
                    return i
                }
            }, {
                key: "_getVisibleDimensions",
                value: function(e, t, n, i) {
                    var r = n / i,
                        o = e - t * r,
                        a = t - e / r,
                        s = e - o,
                        u = t - a;
                    return o > 0 && (u = t), a > 0 && (s = e), [s, u]
                }
            }, {
                key: "_getScaleFromDimensions",
                value: function(e, t, n, i) {
                    var r = this._getVisibleDimensions(e, t, n, i),
                        o = n * i,
                        a = window.devicePixelRatio || 1,
                        s = r[0] * r[1] * a * a;
                    return o / s
                }
            }, {
                key: "_getSecondsToLoadAhead",
                value: function(e, t) {
                    return 1 === this.whitelisted.length ? 90 : 18
                }
            }, {
                key: "_round",
                value: function(e) {
                    var t = arguments.length <= 1 || void 0 === arguments[1] ? 3 : arguments[1];
                    if (e = parseFloat(e), isNaN(e)) return 0;
                    var n = Math.pow(10, t);
                    return Math.round(e * n) / n
                }
            }, {
                key: "_timesAreInRange",
                value: function(e, t, n) {
                    var i = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
                    t = Math.min(t, this.scanner._video.duration);
                    for (var r = 0; r < n.length; r++) {
                        var o = this._round(n.start(r)) - i,
                            a = this._round(n.end(r)) + i;
                        if (e >= o && a >= t) return !0
                    }
                    return !1
                }
            }, {
                key: "_hasSeparateStreams",
                value: function() {
                    return this.scanner._streams.video.length > 0 && this.scanner._streams.audio.length > 0
                }
            }, {
                key: "_isSegmentInBuffer",
                value: function(e, t, n) {
                    var i = 1;
                    return this._hasSeparateStreams() && (i = .05), n && !this.finalSegmentLoaded ? (this.finalSegmentLoaded = !0, !1) : this._timesAreInRange(e.start, e.end, t, i)
                }
            }]), t
        }(c["default"]);
    t["default"] = l
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
                function t(t, n) {
                    var i = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var s, u = t[e.iterator](); !(r = (s = u.next()).done) && (i.push(s.value), !n || i.length !== n); r = !0);
                    } catch (c) {
                        o = !0, a = c
                    } finally {
                        try {
                            !r && u["return"] && u["return"]()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return i
                }
                return function(n, i) {
                    if (Array.isArray(n)) return n;
                    if (e.iterator in Object(n)) return t(n, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            a = n(7),
            s = function() {
                function t(e) {
                    var n = this;
                    i(this, t), this._interval = null, this._rates = [], this._averageRate = 0, this._lastChecked = null, this._lastLoaded = 0, this._scanner = e, this._scanner.on("loadstart", function() {
                        return n.startInterval()
                    }), this._scanner.on("progress", function() {
                        return n.startInterval()
                    }), this._scanner.on("ended", function() {
                        return n.stopInterval()
                    })
                }
                return o(t, [{
                    key: "startInterval",
                    value: function() {
                        var e = this;
                        this._interval || (this._interval = window.setInterval(function() {
                            return e.updateDownloadRate()
                        }, 1e3))
                    }
                }, {
                    key: "stopInterval",
                    value: function() {
                        window.clearInterval(this._interval)
                    }
                }, {
                    key: "updateDownloadRate",
                    value: function() {
                        for (var t = (0, a.getTime)(), n = 0, i = this._scanner.buffered, o = Array.isArray(i), s = 0, i = o ? i : i[e.iterator]();;) {
                            var u;
                            if (o) {
                                if (s >= i.length) break;
                                u = i[s++]
                            } else {
                                if (s = i.next(), s.done) break;
                                u = s.value
                            }
                            var c = u,
                                l = r(c, 2),
                                d = l[0],
                                f = l[1];
                            n += f - d
                        }
                        if (!this._lastChecked) return this._lastChecked = t, void(this._lastLoaded = n);
                        if (this._lastLoaded !== n) {
                            var v = Math.max(n - this._lastLoaded, 0);
                            this._rates.push(v), this._rates = this._rates.slice(-15), this._averageRate = this._rates.reduce(function(e, t) {
                                return e + t
                            }) / this._rates.length, this._lastChecked = t, this._lastLoaded = n, Math.round(n) >= Math.round(this._scanner.duration) && this.stopInterval()
                        }
                    }
                }, {
                    key: "averageDownloadRate",
                    get: function() {
                        return this._averageRate
                    }
                }]), t
            }();
        t["default"] = s
    }).call(t, n(1))
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            o = n(7),
            a = new e,
            s = new e,
            TelecineFile = function() {
                function TelecineFile(e, t) {
                    var n = e.src,
                        r = e.mime,
                        a = e.id,
                        s = void 0 === a ? (0, o.uuid)() : a,
                        u = e.priority,
                        c = void 0 === u ? 0 : u,
                        l = e.metadata,
                        d = void 0 === l ? {} : l;
                    if (i(this, TelecineFile), !n) throw new TypeError("Must provide a src for the file.");
                    if (!r) throw new TypeError("Must provide a mime type for the file.");
                    Object.defineProperties(this, {
                        mime: {
                            value: r,
                            enumerable: !0
                        },
                        id: {
                            value: "" + s,
                            enumerable: !0
                        },
                        metadata: {
                            value: d,
                            enumerable: !0
                        }
                    }), this.video = t, this.priority = c, this.src = n
                }
                return r(TelecineFile, [{
                    key: "priority",
                    get: function() {
                        return a.get(this)
                    },
                    set: function(e) {
                        if (e = parseInt(e, 10), "number" == typeof e && isFinite(e) && Math.floor(e) === e && e >= 0) return void a.set(this, e);
                        throw new TypeError("The file priority must be an integer greater than or equal to 0.")
                    }
                }, {
                    key: "src",
                    get: function() {
                        return s.get(this)
                    },
                    set: function(e) {
                        s.set(this, e), this.video.fire("filesrcupdate", this)
                    }
                }, {
                    key: "restrictedStreamIndexes",
                    get: function() {
                        if (!Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.video.currentScanner), "restrictedStreamIndexes")) throw new ReferenceError("The current scanner does not support streams.");
                        return this.video.currentScanner.restrictedStreamIndexes
                    },
                    set: function() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                        if (!Array.isArray(e)) throw new TypeError("Indexes must be an array.");
                        if (!Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.video.currentScanner), "restrictedStreamIndexes")) throw new ReferenceError("The current scanner does not support streams.");
                        this.video.currentScanner.restrictedStreamIndexes = e
                    }
                }]), TelecineFile
            }();
        t["default"] = TelecineFile
    }).call(t, n(12))
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.RTLLanguages = t.TextTrackKind = t.TextTrackMode = void 0;
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            a = n(24),
            s = i(a),
            u = n(4),
            c = i(u),
            l = n(7),
            d = ["disabled", "hidden", "showing"],
            f = ["subtitles", "captions", "descriptions", "chapters", "metadata"],
            v = ["ar", "fa", "he", "iw", "ku", "ps", "sd", "ur", "yi"],
            h = new e,
            p = new e,
            TelecineTextTrack = function() {
                function TelecineTextTrack(e, t) {
                    var n = e.kind,
                        i = e.src,
                        o = void 0 === i ? null : i,
                        a = e.label,
                        u = void 0 === a ? "" : a,
                        d = e.language,
                        p = void 0 === d ? "" : d,
                        m = e.id,
                        g = void 0 === m ? (0, l.uuid)() : m;
                    if (r(this, TelecineTextTrack), -1 === f.indexOf(n)) throw (0, s["default"])(12, "SYNTAX_ERR", "Syntax Error");
                    c["default"].make(this), Object.defineProperties(this, {
                        kind: {
                            value: n,
                            enumerable: !0
                        },
                        label: {
                            value: u,
                            enumerable: !0
                        },
                        language: {
                            value: p,
                            enumerable: !0
                        },
                        id: {
                            value: "" + g,
                            enumerable: !0
                        },
                        rtl: {
                            value: -1 !== v.indexOf(p.substr(0, 2)),
                            enumerable: !0
                        }
                    }), this.video = t, this.src = o, this._modeHasBeenSet = !1, h.set(this, "disabled")
                }
                return o(TelecineTextTrack, [{
                    key: "dispatchEvent",
                    value: function(e) {
                        this.fire(e, {
                            target: this
                        })
                    }
                }, {
                    key: "mode",
                    get: function() {
                        return h.get(this)
                    },
                    set: function(e) {
                        if (d.indexOf(e) > -1) {
                            if (this._modeHasBeenSet = !0, h.get(this) === e) return;
                            h.set(this, e), this.video.currentScanner && this.video.currentScanner.setModeForTrack(this, e), this.dispatchEvent("modechange")
                        }
                    }
                }, {
                    key: "src",
                    get: function() {
                        return p.get(this)
                    },
                    set: function(e) {
                        p.set(this, e), this.video.fire("texttracksrcupdate", this)
                    }
                }, {
                    key: "cues",
                    get: function() {
                        return this.video.currentScanner ? this.video.currentScanner.getCuesForTrack(this) : []
                    }
                }, {
                    key: "activeCues",
                    get: function() {
                        return this.video.currentScanner ? this.video.currentScanner.getActiveCuesForTrack(this) : []
                    }
                }]), TelecineTextTrack
            }();
        t["default"] = TelecineTextTrack, t.TextTrackMode = d, t.TextTrackKind = f, t.RTLLanguages = v
    }).call(t, n(12))
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            a = n(4),
            s = i(a),
            u = n(55),
            c = i(u),
            l = n(56),
            d = i(l),
            f = n(7),
            v = new e,
            TelecineVideo = function() {
                function TelecineVideo(e) {
                    var t = this,
                        n = e.files,
                        i = e.id,
                        o = void 0 === i ? (0, f.uuid)() : i,
                        a = e.title,
                        u = void 0 === a ? null : a,
                        l = e.subtitle,
                        v = void 0 === l ? null : l,
                        h = e.metadata,
                        p = void 0 === h ? {} : h,
                        m = e.textTracks,
                        g = void 0 === m ? (0, f.createTextTrackList)() : m,
                        y = e.externalDisplayFiles,
                        b = void 0 === y ? {} : y;
                    if (r(this, TelecineVideo), !n || !Array.isArray(n)) throw new TypeError("Must provide files for the video.");
                    s["default"].make(this);
                    var _ = (0, f.createFileList)(n.map(function(e) {
                            return e instanceof c["default"] ? (e.video = t, e) : new c["default"](e, t)
                        })),
                        w = (0, f.createTextTrackList)(g.map(function(e) {
                            return e instanceof d["default"] ? (e.video = t, e) : new d["default"](e, t)
                        }));
                    Object.keys(b).forEach(function(e) {
                        !b[e] || b[e] instanceof c["default"] || (b[e] = new c["default"](b[e], t))
                    }), Object.defineProperties(this, {
                        id: {
                            value: "" + o,
                            enumerable: !0
                        },
                        title: {
                            value: u,
                            enumerable: !0
                        },
                        subtitle: {
                            value: v,
                            enumerable: !0
                        },
                        metadata: {
                            value: p,
                            enumerable: !0
                        },
                        files: {
                            value: _,
                            enumerable: !0
                        },
                        textTracks: {
                            value: w,
                            enumerable: !0
                        },
                        externalDisplayFiles: {
                            value: b,
                            enumerable: !0
                        }
                    })
                }
                return o(TelecineVideo, [{
                    key: "deactivate",
                    value: function() {
                        var e = this;
                        this.textTracks.forEach(function(t) {
                            return e.currentScanner.removeTextTrack(t)
                        })
                    }
                }, {
                    key: "currentFile",
                    get: function() {
                        return this.currentScanner.currentFile
                    },
                    set: function(e) {
                        this.currentScanner.currentFile = e
                    }
                }, {
                    key: "currentScanner",
                    get: function() {
                        return v.get(this)
                    },
                    set: function(e) {
                        var t = this;
                        this.currentScanner && this.textTracks.forEach(function(e) {
                            return t.currentScanner.removeTextTrack(e)
                        }), this.textTracks.forEach(function(t) {
                            return e.addTextTrack(t)
                        }), v.set(this, e)
                    }
                }]), TelecineVideo
            }();
        t["default"] = TelecineVideo
    }).call(t, n(12))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        a = n(4),
        s = i(a),
        u = function() {
            function e(t) {
                r(this, e), this._available = !1, this._active = !1, this._video = t, s["default"].make(this)
            }
            return o(e, null, [{
                key: "displayName",
                get: function() {
                    return "ExternalDisplay"
                }
            }, {
                key: "supported",
                get: function() {
                    return !1
                }
            }, {
                key: "supportedVideoTypes",
                get: function() {
                    return []
                }
            }]), o(e, [{
                key: "showPicker",
                value: function() {}
            }, {
                key: "getFile",
                value: function() {
                    var e = this.constructor.displayName.replace("ExternalDisplay", "");
                    if (this._video.externalDisplayFiles[e]) return this._video.externalDisplayFiles[e];
                    var t = this.constructor.supportedVideoTypes,
                        n = this._video.files.filter(function(e) {
                            return -1 !== t.indexOf(e.mime)
                        }).sort(function(e, n) {
                            return e.mime === n.mime ? e.priority - n.priority : t.indexOf(e.mime) - t.indexOf(n.mime)
                        });
                    if (!n.length) throw new Error("No files available for " + this.constructor.displayName + " external display.");
                    return n[0]
                }
            }, {
                key: "active",
                get: function() {
                    return this._active
                }
            }, {
                key: "available",
                get: function() {
                    return this._available
                }
            }, {
                key: "element",
                get: function() {
                    return document.createElement("div")
                }
            }]), e
        }();
    t["default"] = u
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function T(e, t, n) {
                null === e && (e = Function.prototype);
                var i = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === i) {
                    var r = Object.getPrototypeOf(e);
                    return null === r ? void 0 : T(r, t, n)
                }
                if ("value" in i) return i.value;
                var o = i.get;
                if (void 0 !== o) return o.call(n)
            },
            u = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            c = n(50),
            l = i(c),
            d = n(7),
            f = n(53),
            v = i(f),
            h = n(26),
            p = i(h),
            m = 1,
            g = 2,
            y = 3,
            b = 4,
            _ = 1e4,
            w = 5,
            k = "video",
            E = "audio",
            S = function(t) {
                function n(e) {
                    var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    r(this, n);
                    var i = o(this, Object.getPrototypeOf(n).call(this, e, t));
                    return i.reset(), i
                }
                return a(n, t), u(n, null, [{
                    key: "displayName",
                    get: function() {
                        return "MediaSourceScanner"
                    }
                }, {
                    key: "supported",
                    get: function() {
                        return "undefined" != typeof MediaSource && "undefined" != typeof Set
                    }
                }, {
                    key: "supportedVideoTypes",
                    get: function() {
                        return ["application/vnd.vimeo.dash+json"]
                    }
                }]), u(n, [{
                    key: "deactivate",
                    value: function() {
                        s(Object.getPrototypeOf(n.prototype), "deactivate", this).call(this), this.reset(), this.sorcerer && this.sorcerer.destroy()
                    }
                }, {
                    key: "reset",
                    value: function() {
                        this._waitingOnSet = new Set, this._streamsForSegment = {}, this._brain = new v["default"](this, this._options.mediaSourceScanner || {}), this._ready = !1, this._startedPlaying = !1, this._manifest = null, this._streams = {}, this._streams[E] = [], this._streams[k] = [], this._audioStreams = [], this._onReady = null, this._baseUrl = null, this._lastTargetStreamId = null, this._timeToSeekTo = null, this._resolveSeek = null, this._resolveStartPreload = null, this._reloadingExistingVideo = !1, this._lastStreamIndex = null, this._checkSwitchUp = !1, this._clearBufferAtTime = !1, this._preloadStream = null, this._badPlaybackTimer = null, this._isBufferingTooLong = !1, this._bufferCount = 0, this._restrictedStreamIndexes = [], this._switching = {}
                    }
                }, {
                    key: "preloadStream",
                    value: function() {
                        var t = this;
                        return this._preloadStream ? this._preloadStream : (this._preloadStream = new e(function(e, n) {
                            var i = 1;
                            t._streams.audio.length && (i = 2);
                            var r = 0,
                                o = t.sorcerer.video.activeStreamIndex;
                            t._restrictedStreamIndexes.length && (o = t._streams[k].indexOf(t._manifest.video[t._restrictedStreamIndexes[0]]));
                            var a = function() {
                                    var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
                                    e && (o = t.sorcerer.video.activeStreamIndex);
                                    for (var n in t._streams)
                                        if (0 !== t._streams[n].length) {
                                            var i = o;
                                            n === E && (i = t._getAudioIndexFromVideo(o));
                                            var r = t._getSegmentUrl(i, 0, n),
                                                a = t._isFinalSegment(i, 0),
                                                s = t.sorcerer[n].streams[i],
                                                u = {
                                                    stream: i,
                                                    segment: 0,
                                                    type: n
                                                },
                                                c = !0,
                                                l = r;
                                            if (t._useRangeRequests()) {
                                                var d = t._getRangeForSegment(i, 0, n);
                                                l = {
                                                    url: l,
                                                    byteRange: d
                                                }
                                            }
                                            s.addSegment(l, u, a, c)
                                        }
                                },
                                s = function u(n) {
                                    if (r += 1, !(i > r) && 0 === n.segment) {
                                        if (0 === t._restrictedStreamIndexes.length) {
                                            var s = !0,
                                                c = t._getStreamIndexToLoad(s);
                                            if (c !== !1 && c > n.stream) return t.sorcerer.video.switchTo(c), t._streams.audio.length && t.sorcerer.audio.switchTo(t._getAudioIndexFromVideo(c)), r = 0, void a(!0)
                                        }
                                        var l = t._getCurrentStream(o),
                                            d = l.segments[0].end;
                                        t.currentTime > d && (t.sorcerer.clear(), t._waitingOnSet = new Set), t.sorcerer.video.switchTo(o), t._streams.audio.length && t.sorcerer.audio.switchTo(t._getAudioIndexFromVideo(o)), t.sorcerer.off("bufferqueueadd", u), t._ready = !0, e()
                                    }
                                };
                            t.sorcerer.on("bufferqueueadd", s), a()
                        }), this._preloadStream)
                    }
                }, {
                    key: "loadManifest",
                    value: function(t) {
                        return new e(function(e, n) {
                            var i = new XMLHttpRequest;
                            i.open("GET", t, !0), i.onload = function() {
                                if (i.status >= 400) return void n(i.status);
                                try {
                                    e(JSON.parse(i.response))
                                } catch (t) {
                                    n()
                                }
                            }, i.onerror = n, i.send()
                        })
                    }
                }, {
                    key: "setVideoSrc",
                    value: function(e, t) {
                        var n = this,
                            i = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2];
                        if (i && !t && this._onReady) {
                            if (("metadata" === this._preload || "none" === this._preload && !this._paused) && !this._ready) return void this._onReady.then(function() {
                                var t = n._paused;
                                n.setVideoSrc(e, t, !1)
                            });
                            if ("auto" === this._preload) return void this._onReady.then(function() {
                                n.setVideoSrc(e, !1, !1)
                            })
                        }
                        if (t) {
                            this.reset();
                            try {
                                this._video.currentTime = 0
                            } catch (r) {}
                        }
                        t || "none" !== this._preload || !this._paused || this.sorcerer || (t = !0);
                        var o = "_initializeManifest";
                        t && (this._video.preload = "", o = "_initialize");
                        var a = e.split("/");
                        a.pop(), this._baseUrl = a.join("/") + "/", this._reloadingExistingVideo = !t, this._onReady = this._startPreload(e, this._preload).then(this.loadManifest.bind(this)).then(this[o].bind(this)), t && "auto" === this._preload && (this._onReady = this._addCallbackToPromise(this._onReady, this.preloadStream.bind(this), !1)), this._onReady = this._addCatchToPromise(this._onReady)
                    }
                }, {
                    key: "updateReadyState",
                    value: function() {}
                }, {
                    key: "lockStreamIndexes",
                    value: function() {
                        var e = this,
                            t = this._restrictedStreamIndexes.map(function(t) {
                                return e._streams[k].indexOf(e._manifest.video[t])
                            });
                        if (this._video.paused || (this._ignorePauseEvent = !0, this._video.pause()), this._switching[k] = !1, this._brain.lock(t), this._startedPlaying || "auto" === this._preload) {
                            var n = 7,
                                i = Math.max(this.currentTime - n, 0),
                                r = Math.min(this.currentTime + n, this._video.duration);
                            this.sorcerer.removeBuffer(i, r).then(function() {
                                return e._startedPlaying || "auto" !== e._preload ? (e.seekToTime(e.currentTime), void(!e._paused && e._video.paused && (e._ignorePlayEvent = !0, e.play()))) : void e._loadSegments()
                            })
                        }
                    }
                }, {
                    key: "seekToTime",
                    value: function(e) {
                        var t = this,
                            n = null === this._timeToSeekTo;
                        if (n || (this._lastSeekReject && (this._lastSeekReject(),
                                this._lastSeekReject = null), this._seekInProgressPromise = null, this._timeToSeekTo = null, this._resolveSeek = null), this._timeToSeekTo = e, this._ready)
                            for (var i in this._streams)
                                if (this._streams[i].length > 0) {
                                    var r = this.sorcerer[i].activeStreamIndex,
                                        o = this.sorcerer[i].streams[r];
                                    o.abort()
                                }
                        return this._loadSegments(), this._paused && 0 === e && this.fire("seeking"), this.readyState = m, this._seekInProgressPromise = this._getSeekReadyPromiseForTime(e), !n && this._waitingOnPlay && this.play(), this._onReady.then(function() {
                            return t._seekInProgressPromise
                        })["catch"](function(e) {})
                    }
                }, {
                    key: "takeSnapshot",
                    value: function() {}
                }, {
                    key: "onseeked",
                    value: function(e) {
                        this._loadSegments(), s(Object.getPrototypeOf(n.prototype), "onseeked", this).call(this, e)
                    }
                }, {
                    key: "onended",
                    value: function(e) {
                        s(Object.getPrototypeOf(n.prototype), "onended", this).call(this, e);
                        var t = 6;
                        this.sorcerer.removeBuffer(t)
                    }
                }, {
                    key: "onseeking",
                    value: function(e) {
                        var t = this;
                        clearTimeout(this._seekTimeout), this._seekTimeout = setTimeout(function() {
                            t._loadSegments()
                        }, 100)
                    }
                }, {
                    key: "onloadeddata",
                    value: function() {
                        var e = this;
                        (0, d.setImmediate)(function() {
                            e.readyState = b
                        })
                    }
                }, {
                    key: "ontimeupdate",
                    value: function(e) {
                        if (0 === this.currentTime) return !1;
                        if (this._timeToSeekTo) return !1;
                        if (this._startedPlaying || (this._startedPlaying = !0), this._clearBufferAtTime && this.currentTime >= this._clearBufferAtTime) {
                            var t = 2;
                            this.sorcerer.removeBuffer(0, this._clearBufferAtTime - t), this._clearBufferAtTime = !1
                        }
                        this._loadSegments();
                        var n = this.sorcerer.getDroppedFrameTotal();
                        this.fire("droppedframes", n);
                        var i = this.sorcerer.getResponseSpeeds(),
                            r = this._streams[k][this.sorcerer.video.activeStreamIndex],
                            o = {
                                speed: this._brain.getCurrentSpeed(),
                                bitrate: r.bitrate,
                                speeds: i
                            };
                        this.fire("bandwidth", o);
                        var a = this._video.buffered.length;
                        if (!a) return !0;
                        var s = this._video.buffered.end(a - 1);
                        if (Math.ceil(s) === Math.ceil(this._video.duration)) return !0;
                        var u = .2;
                        return Math.abs(this.currentTime - s) < u ? this.readyState === g ? !1 : (this._bufferCount += 1, this.fire("streambufferstart"), this._startBadPlaybackTimer(), this.readyState = g, !1) : void 0
                    }
                }, {
                    key: "onprogress",
                    value: function() {
                        this._brain.canPlayFromTimeInStream(this.currentTime, this._getCurrentStream()) && (clearTimeout(this._badPlaybackTimer), this.readyState < y && (this.readyState = b, this.fire("streambufferend")))
                    }
                }, {
                    key: "onplay",
                    value: function() {
                        return "picture-in-picture" === this.presentationMode ? (this._paused = !1, !0) : !1
                    }
                }, {
                    key: "onpause",
                    value: function() {
                        return "picture-in-picture" === this.presentationMode ? (this._paused = !0, !0) : !1
                    }
                }, {
                    key: "onwaiting",
                    value: function(e) {
                        return !1
                    }
                }, {
                    key: "pause",
                    value: function() {
                        var e = this;
                        (0, d.setImmediate)(function() {
                            e.fire("pause")
                        }), s(Object.getPrototypeOf(n.prototype), "pause", this).call(this)
                    }
                }, {
                    key: "play",
                    value: function() {
                        var t = this;
                        (0, d.setImmediate)(function() {
                            t.fire("play")
                        }), this._waitingOnPlay = !0, this._paused = !1, d.browser.android && !this._ready && (this._waitingOnPlay = !1, this._video.play()), this._resolveStartPreload && this._resolveStartPreload(), this._reloadingExistingVideo || this._ready || "auto" === this._preload || (this._onReady = this._addCallbackToPromise(this._onReady, this.preloadStream.bind(this))), this._ready || this._startBadPlaybackTimer();
                        var n = this._seekInProgressPromise || e.resolve();
                        return this._onReady.then(function() {
                            return n
                        }).then(function() {
                            t._waitingOnPlay = !1, t._paused || t._video.play()
                        })
                    }
                }, {
                    key: "_getAudioIndexFromVideo",
                    value: function(e) {
                        return 0 === this._streams.audio.length ? !1 : this._streams.audio.length > 1 && this._streams.video[e].bitrate > 1e6 ? 1 : 0
                    }
                }, {
                    key: "_addCallbackToPromise",
                    value: function(e, t) {
                        var n = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2],
                            i = e.then(t);
                        return n && (i = this._addCatchToPromise(i)), i
                    }
                }, {
                    key: "_addCatchToPromise",
                    value: function(t) {
                        var n = this;
                        return t["catch"](function(t) {
                            return n.fire("scannererror", {
                                reason: "json manifest failed to load"
                            }), new e(function(e, t) {})
                        })
                    }
                }, {
                    key: "_handleBufferForSeek",
                    value: function() {
                        if (this._ready) {
                            var e = this._streams[k][this.sorcerer.video.activeStreamIndex],
                                t = e.bitrate / 1e3,
                                n = 12e3;
                            t > n && this.sorcerer.removeBuffer()
                        }
                    }
                }, {
                    key: "_startPreload",
                    value: function(t, n) {
                        var i = this;
                        return new e(function(e, r) {
                            return "none" !== n || i._reloadingExistingVideo && !i._paused ? void e(t) : void(i._resolveStartPreload = function() {
                                e(t), i._resolveStartPreload = null
                            })
                        })
                    }
                }, {
                    key: "_getSeekReadyPromiseForTime",
                    value: function() {
                        var t = this,
                            n = arguments.length <= 0 || void 0 === arguments[0] ? this._timeToSeekTo : arguments[0];
                        return new e(function(e, i) {
                            return t._brain.canPlayFromTimeInStream(n, t._getCurrentStream()) ? void e(n) : (t._handleBufferForSeek(), void(t._resolveSeek = e))
                        }).then(function(n) {
                            t._timeToSeekTo = null, t._seekInProgressPromise = null, t.readyState = b;
                            var i = new e(function(e, n) {
                                t._lastSeekReject = n;
                                var i = function r() {
                                    e(t._video.currentTime), t._video.removeEventListener("seeked", r)
                                };
                                t._video.addEventListener("seeked", i)
                            });
                            return t._video.currentTime = n, i
                        })
                    }
                }, {
                    key: "_handlePreloadChanged",
                    value: function(e, t) {
                        "auto" !== e && "auto" === t && (this._onReady = this._addCallbackToPromise(this._onReady, this.preloadStream.bind(this))), e !== t && "none" !== t && this._resolveStartPreload && this._resolveStartPreload()
                    }
                }, {
                    key: "_initializeManifest",
                    value: function(t) {
                        var n = this;
                        return new e(function(e, i) {
                            n._manifest = t, n._streams[k] = n._sortStreams(t.video), t.audio && (n._streams[E] = n._sortStreams(t.audio));
                            for (var r = 0; r < n._streams[k].length; r++) {
                                var o = 0;
                                if (t.audio) {
                                    var a = n._streams[E][n._getAudioIndexFromVideo(r)];
                                    a && (o = a.bitrate)
                                }
                                n._streams[k][r].audioBitrate = o
                            }
                            e()
                        })
                    }
                }, {
                    key: "_setUpSorcerer",
                    value: function(e, t) {
                        this.sorcerer && this.sorcerer.destroy(), this.sorcerer = new l["default"](e, t)
                    }
                }, {
                    key: "_initialize",
                    value: function(t) {
                        var n = this;
                        return new e(function(e, i) {
                            n._initializeManifest(t).then(function() {
                                var i = t.video[0];
                                n._restrictedStreamIndexes.length && (i = t.video[n._restrictedStreamIndexes[0]]), n._setUpSorcerer(n._video, {
                                    duration: n._streams[k][0].duration
                                }), n.sorcerer.on("srcnotsupported", function() {
                                    n.fire("scannererror", {
                                        reason: "this codec is not supported for mediasource playback"
                                    })
                                }), n.sorcerer.readyPromise.then(function() {
                                    var t = n._streams[k].indexOf(i),
                                        r = function(e) {
                                            n._streams[e].forEach(function(t, i) {
                                                var r = n._getSegmentUrl(i, "init", e);
                                                if (n._useRangeRequests() && n._streams[e][i].init_segment_range) {
                                                    var o = n._getRangeForSegment(i, "init", e);
                                                    r = {
                                                        url: r,
                                                        byteRange: o
                                                    }
                                                }
                                                n.sorcerer.addStream(t.mime_type + '; codecs="' + n._streams[e][i].codecs + '"', r)
                                            })
                                        };
                                    for (var o in n._streams) r(o);
                                    n.sorcerer.video.switchTo(t), n.sorcerer.on("queued", n._handleQueued.bind(n)), n.sorcerer.on("downloadabort", n._handleAborted.bind(n)), n.sorcerer.on("appendbufferend", n._handleAppendBufferEnd.bind(n)), n.sorcerer.on("downloadend", n._handleDownloadEnd.bind(n)), n.sorcerer.on("streamchange", function(e) {
                                        e > n._lastStreamIndex && n.currentTime > 0 && (n._checkSwitchUp = !0), n._lastStreamIndex = e;
                                        var t = n._manifest.video.indexOf(n._streams[k][e]),
                                            i = {
                                                index: t,
                                                streams: n._manifest.video
                                            };
                                        n.fire("streamchange", i), n._startBadPlaybackTimer()
                                    }), n.sorcerer.on("droppedframes", function() {
                                        return n.fire("alert", "droppedframes")
                                    }), n.sorcerer.mediaSource.addEventListener("sourceended", function() {
                                        n.fire("progress")
                                    }), e()
                                })
                            })
                        })
                    }
                }, {
                    key: "_sortStreams",
                    value: function(e) {
                        function t(e, t) {
                            var n = e.width * e.height * e.bitrate,
                                i = t.width * t.height * t.bitrate;
                            return e.width === t.width && e.height === t.height ? e.framerate - t.framerate : n - i
                        }
                        var n = e.slice(0);
                        return n.sort(t), n
                    }
                }, {
                    key: "_useRangeRequests",
                    value: function() {
                        return !!this._manifest.video[0].segments[0].range
                    }
                }, {
                    key: "_getRangeForSegment",
                    value: function(e, t, n) {
                        return "init" === t ? this._streams[n][e].init_segment_range : this._streams[n][e].segments[t].range
                    }
                }, {
                    key: "_getSegmentUrl",
                    value: function(e, t) {
                        var n = arguments.length <= 2 || void 0 === arguments[2] ? k : arguments[2],
                            i = "init" === t;
                        if (i && !this._streams[n][e].init_segment_range && -1 === this._streams[n][e].init_segment.indexOf(".")) {
                            var r = this._streams[n][e].init_segment;
                            return (0, d.base64ToArrayBuffer)(r)
                        }
                        var o = this._baseUrl,
                            a = this._manifest.base_url && -1 !== this._manifest.base_url.indexOf("//");
                        return a && (o = this._manifest.base_url), this._manifest.base_url && !a && (o += this._manifest.base_url), this._streams[n][e].base_url && (o += this._streams[n][e].base_url), this._useRangeRequests() ? o : "init" === t ? o += this._streams[n][e].init_segment : (this._streams[n][e].segments[t].url && (o += this._streams[n][e].segments[t].url), o)
                    }
                }, {
                    key: "_key",
                    value: function(e, t, n) {
                        return e + ":" + t + ":" + n
                    }
                }, {
                    key: "_isFinalSegment",
                    value: function(e, t) {
                        return t === this._streams[k][e].segments.length - 1
                    }
                }, {
                    key: "_getCurrentlyLoadingStreamsForSegment",
                    value: function(e, t) {
                        var n = [],
                            i = this._streamsForSegment[e];
                        if (!i) return n;
                        for (var r = 0; r < i.length; r++) this._waitingOnSet.has(this._key(i[r], e, t)) && n.push(i[r]);
                        return n
                    }
                }, {
                    key: "_getCurrentStream",
                    value: function() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
                            t = arguments.length <= 1 || void 0 === arguments[1] ? k : arguments[1];
                        return "undefined" != typeof this.sorcerer && (e = this.sorcerer[t].activeStreamIndex), this._streams[t][e]
                    }
                }, {
                    key: "_getStreamIndexToLoad",
                    value: function(e) {
                        var t = this._streams[k];
                        if (t = this._brain.filterStreams(t), 0 === t.length) return !1;
                        if (this._switching[k]) return !1;
                        var n = t[t.length - 1];
                        if (n.id !== this._lastTargetStreamId) {
                            this._lastTargetStreamId = n.id;
                            var i = this._streams[k].indexOf(n),
                                r = {
                                    index: i,
                                    streams: this._streams[k]
                                };
                            this.fire("streamtargetchange", r)
                        }
                        var o = this._getCurrentStream(),
                            a = this._brain.shouldPowerUp(t, o, e);
                        return this._checkForBadPlayback(), a === !1 && (a = this._brain.shouldPowerDown(t, o)), a === !1 ? a : this._streams[k].indexOf(t[a])
                    }
                }, {
                    key: "_startBadPlaybackTimer",
                    value: function() {
                        var e = this;
                        clearTimeout(this._badPlaybackTimer), this._badPlaybackTimer = setTimeout(function() {
                            e._isBufferingTooLong = !0, e._checkForBadPlayback()
                        }, _)
                    }
                }, {
                    key: "_checkForBadPlayback",
                    value: function() {
                        this._isHavingBadPlaybackInCurrentQuality() && this.fire("alert", "streamstudder")
                    }
                }, {
                    key: "_isHavingBadPlaybackInCurrentQuality",
                    value: function() {
                        return this._restrictedStreamIndexes.length ? !this._isBufferingTooLong && this._bufferCount < w ? !1 : (this._isBufferingTooLong, this._bufferCount >= w, this._isBufferingTooLong = !1, this._bufferCount = 0, !0) : !1
                    }
                }, {
                    key: "_loadSegmentsForType",
                    value: function() {
                        var e = this,
                            t = arguments.length <= 0 || void 0 === arguments[0] ? k : arguments[0],
                            n = this._getStreamIndexToLoad();
                        t === E && (n === !1 && (n = this.sorcerer[k].activeStreamIndex), n = this._getAudioIndexFromVideo(n), this.sorcerer[E].activeStreamIndex === n && (n = !1));
                        var i = !1;
                        n !== !1 && (i = n > this.sorcerer[t].activeStreamIndex, this._switching[t] = !0, this.sorcerer[t].switchTo(n).then(function() {
                            e._switching[t] = !1
                        }));
                        for (var r = this._brain.getSegmentsToLoad(i, t), o = this.sorcerer[t].activeStreamIndex, a = 0; a < r.length; a++) {
                            var s = this._getSegmentUrl(o, r[a], t),
                                u = this._getCurrentlyLoadingStreamsForSegment(r[a], t);
                            if (!(u.length > 1 || 1 === u.length && o <= u[0])) {
                                var c = this._isFinalSegment(o, r[a], t),
                                    l = {
                                        stream: o,
                                        segment: r[a],
                                        type: t
                                    },
                                    d = this.sorcerer[t].streams[o],
                                    f = s;
                                if (this._useRangeRequests()) {
                                    var v = this._getRangeForSegment(o, r[a], t);
                                    f = {
                                        url: f,
                                        byteRange: v
                                    }
                                }
                                d.addSegment(f, l, c)
                            }
                        }
                    }
                }, {
                    key: "_loadSegments",
                    value: function() {
                        var e = this;
                        return this._onReady.then(function() {
                            for (var t in e._streams) e._streams[t].length > 0 && e._loadSegmentsForType(t)
                        })
                    }
                }, {
                    key: "_handleQueued",
                    value: function(e) {
                        this._waitingOnSet.add(this._key(e.stream, e.segment, e.type)), this._streamsForSegment[e.segment] || (this._streamsForSegment[e.segment] = []), -1 === this._streamsForSegment[e.segment].indexOf(e.stream) && this._streamsForSegment[e.segment].push(e.stream)
                    }
                }, {
                    key: "_clearWaitingOn",
                    value: function(e) {
                        var t = this,
                            n = this._streamsForSegment[e.segment];
                        n.forEach(function(n) {
                            t._waitingOnSet["delete"](t._key(n, e.segment, e.type))
                        })
                    }
                }, {
                    key: "_handleAborted",
                    value: function(e) {
                        this._clearWaitingOn(e)
                    }
                }, {
                    key: "_handleAppendBufferEnd",
                    value: function(e) {
                        this._checkSwitchUp && e.stream === this._lastStreamIndex && (this._checkSwitchUp = !1, this._clearBufferAtTime = this._streams[k][e.stream].segments[e.segment].start), this._clearWaitingOn(e), null !== this._timeToSeekTo && this._resolveSeek && this._brain.canPlayFromTimeInStream(this._timeToSeekTo, this._getCurrentStream()) && (this._resolveSeek(this._timeToSeekTo), this._resolveSeek = null)
                    }
                }, {
                    key: "_handleDownloadEnd",
                    value: function(e) {}
                }, {
                    key: "preload",
                    get: function() {
                        return this._preload
                    },
                    set: function(e) {
                        this._handlePreloadChanged(this._preload, e), this._preload = e
                    }
                }, {
                    key: "videoWidth",
                    get: function() {
                        var e = this._getCurrentStream();
                        return e ? e.width : this._video.videoWidth
                    }
                }, {
                    key: "videoHeight",
                    get: function() {
                        var e = this._getCurrentStream();
                        return e ? e.height : this._video.videoHeight
                    }
                }, {
                    key: "restrictedStreamIndexes",
                    get: function() {
                        return this._restrictedStreamIndexes
                    },
                    set: function() {
                        var e = this,
                            t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                        this._restrictedStreamIndexes.join(",") !== t.join(",") && (this._restrictedStreamIndexes = t, this._onReady.then(function() {
                            return e.lockStreamIndexes()
                        }))
                    }
                }, {
                    key: "currentTime",
                    get: function() {
                        return null !== this._timeToSeekTo ? this._timeToSeekTo : this._video.currentTime
                    },
                    set: function(e) {
                        this.seekToTime(e)
                    }
                }]), n
            }(p["default"]);
        t["default"] = S
    }).call(t, n(3))
}, function(e, t, n) {
    (function(e, i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function a(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function _(e, t, n, i) {
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === r) {
                    var o = Object.getPrototypeOf(e);
                    null !== o && _(o, t, n, i)
                } else if ("value" in r && r.writable) r.value = n;
                else {
                    var a = r.set;
                    void 0 !== a && a.call(i, n)
                }
                return n
            },
            c = function w(e, t, n) {
                null === e && (e = Function.prototype);
                var i = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === i) {
                    var r = Object.getPrototypeOf(e);
                    return null === r ? void 0 : w(r, t, n)
                }
                if ("value" in i) return i.value;
                var o = i.get;
                if (void 0 !== o) return o.call(n)
            },
            l = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            d = "function" == typeof e && "symbol" == typeof e.iterator ? function(e) {
                return typeof e
            } : function(t) {
                return t && "function" == typeof e && t.constructor === e ? "symbol" : typeof t
            },
            f = n(17),
            v = r(f),
            h = n(14),
            p = n(7),
            m = n(16),
            g = r(m),
            y = function() {
                var e = "Shockwave Flash",
                    t = "application/x-shockwave-flash",
                    n = "ShockwaveFlash.ShockwaveFlash",
                    i = window.navigator,
                    r = 0,
                    o = !1,
                    a = null;
                if ("undefined" != typeof i.plugins && "object" === d(i.plugins[e])) {
                    if (a = i.plugins[e].description, a && ("undefined" == typeof i.mimeTypes || !i.mimeTypes[t] || i.mimeTypes[t].enabledPlugin)) {
                        o = !0, a = a.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                        var s = parseInt(a.replace(/^(.*)\..*$/, "$1"), 10),
                            u = parseInt(a.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                        r = parseFloat(s + "." + u)
                    }
                } else if ("undefined" != typeof window.ActiveXObject) try {
                    var c = new ActiveXObject(n);
                    c && (a = c.GetVariable("$version"), a && (o = !0, a = a.split(" ")[1].split(","), r = parseFloat(parseInt(a[0], 10) + "." + parseInt(a[1], 10))))
                } catch (l) {}
                return {
                    installed: o,
                    version: r
                }
            }(),
            b = function(e) {
                function t(e) {
                    var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    if (o(this, t), !n.swfScanner || !n.swfScanner.swfUrl) throw new Error("The url to the swf is required to use the SWFScanner.");
                    var r = a(this, Object.getPrototypeOf(t).call(this, e, n)),
                        s = "flideo_" + (0, p.uuid)().replace(/-/g, "_");
                    return window[s] = {
                        onFlashEvent: function(e) {
                            return r.onEvent(e)
                        }
                    }, r._swf = r.createSwf(r._options.swfScanner.swfUrl, s + ".onFlashReady"), r._element.appendChild(r._swf), r._loaded = !1, r._volume = 1, r._muted = !1, r._loadedPromise = new i(function(e, t) {
                        window[s].onFlashReady = function() {
                            r._loaded = !0, r.attachVideoEvents(s + ".onFlashEvent"), e()
                        }, setTimeout(t, 1e4)
                    }), r
                }
                return s(t, e), l(t, null, [{
                    key: "displayName",
                    get: function() {
                        return "SWFScanner"
                    }
                }, {
                    key: "supported",
                    get: function() {
                        return y.installed && y.version >= 10.1
                    }
                }, {
                    key: "supportedVideoTypes",
                    get: function() {
                        return ["application/vnd.apple.mpegurl", "video/mp4", "video/x-flv"]
                    }
                }]), l(t, [{
                    key: "deactivate",
                    value: function() {
                        this._swf.parentElement.removeChild(this._swf)
                    }
                }, {
                    key: "play",
                    value: function() {
                        var e = this;
                        this.onLoaded(function() {
                            return e._swf._play()
                        })
                    }
                }, {
                    key: "pause",
                    value: function() {
                        var e = this;
                        this.onLoaded(function() {
                            return e._swf._pause()
                        })
                    }
                }, {
                    key: "attachVideoEvents",
                    value: function(e) {
                        var t = this;
                        h.videoEvents.forEach(function(n) {
                            t._swf.api_addEventListener(n, e)
                        })
                    }
                }, {
                    key: "createSwf",
                    value: function(e, t) {
                        var n = document.createElement("object");
                        n.setAttribute("type", "application/x-shockwave-flash"), n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("data", e);
                        var i = {
                            flashvars: "ready=" + t,
                            movie: e,
                            allowfullscreen: "true",
                            allowscriptaccess: "always",
                            bgcolor: "#000000",
                            wmode: "opaque",
                            quality: "high",
                            scalemode: "noscale"
                        };
                        for (var r in i) {
                            var o = document.createElement("param");
                            o.setAttribute("name", r), o.setAttribute("value", i[r]), n.appendChild(o)
                        }
                        return n
                    }
                }, {
                    key: "onEvent",
                    value: function(e) {
                        this.fire(e.type, e)
                    }
                }, {
                    key: "onLoaded",
                    value: function(e) {
                        this._loadedPromise = this._loadedPromise.then(e)
                    }
                }, {
                    key: "buffered",
                    get: function() {
                        if (!this._loaded) return c(Object.getPrototypeOf(t.prototype), "buffered", this);
                        var e = this._swf.getBuffered(),
                            n = e.start,
                            i = e.end;
                        return (0, g["default"])(n, i)
                    }
                }, {
                    key: "currentFile",
                    get: function() {
                        return c(Object.getPrototypeOf(t.prototype), "currentFile", this)
                    },
                    set: function(e) {
                        var n = this,
                            i = this._currentFile;
                        u(Object.getPrototypeOf(t.prototype), "currentFile", e, this), this.onLoaded(function() {
                            var t = !n._swf.getPaused(),
                                r = n._swf.getCurrentTime();
                            n._swf.setSrc(e.src), n.fire("currentfilechange", e), i && (n._swf.setCurrentTime(r), t && n._swf._play())
                        })
                    }
                }, {
                    key: "currentTime",
                    get: function() {
                        return this._loaded ? this._swf.getCurrentTime() : c(Object.getPrototypeOf(t.prototype), "currentTime", this)
                    },
                    set: function(e) {
                        var t = this;
                        this.onLoaded(function() {
                            return t._swf.setCurrentTime(e)
                        })
                    }
                }, {
                    key: "duration",
                    get: function() {
                        return this._loaded ? this._swf.getDuration() : c(Object.getPrototypeOf(t.prototype), "duration", this)
                    }
                }, {
                    key: "ended",
                    get: function() {
                        return this._loaded ? this._swf.getEnded() : c(Object.getPrototypeOf(t.prototype), "ended", this)
                    }
                }, {
                    key: "loop",
                    get: function() {
                        return this._loaded ? this._swf.getLoop() : c(Object.getPrototypeOf(t.prototype), "loop", this)
                    },
                    set: function(e) {
                        var t = this;
                        this.onLoaded(function() {
                            return t._swf.setLoop(e)
                        })
                    }
                }, {
                    key: "muted",
                    get: function() {
                        return this._muted
                    },
                    set: function(e) {
                        var t = this;
                        this._muted = e;
                        var n = e === !0 ? 0 : this._volume;
                        this.onLoaded(function() {
                            return t._swf.setVolume(n)
                        })
                    }
                }, {
                    key: "paused",
                    get: function() {
                        return this._loaded ? this._swf.getPaused() : c(Object.getPrototypeOf(t.prototype), "paused", this)
                    }
                }, {
                    key: "videoWidth",
                    get: function() {
                        return this._loaded ? this._swf.getVideoWidth() : c(Object.getPrototypeOf(t.prototype), "videoWidth", this)
                    }
                }, {
                    key: "videoHeight",
                    get: function() {
                        return this._loaded ? this._swf.getVideoHeight() : c(Object.getPrototypeOf(t.prototype), "videoHeight", this)
                    }
                }, {
                    key: "volume",
                    get: function() {
                        return this._loaded ? this._swf.getVolume() : c(Object.getPrototypeOf(t.prototype), "volume", this)
                    },
                    set: function(e) {
                        var t = this;
                        this._volume = e, this.onLoaded(function() {
                            return t._swf.setVolume(e)
                        })
                    }
                }]), t
            }(v["default"]);
        t["default"] = b
    }).call(t, n(1), n(3))
}, function(e, t, n) {
    (function(e) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            a = n(4),
            s = i(a),
            u = n(17),
            c = i(u),
            l = n(14),
            d = n(15),
            f = i(d),
            v = n(57),
            h = i(v),
            p = n(7),
            m = function() {
                function t(e, n) {
                    var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
                    r(this, t), this._element = e, this._scanners = n, this._options = i, this._video = null, this._textTracks = (0, p.createTextTrackList)(), this._properties = {}, this._currentScanner = new c["default"], this._blacklistedScanners = [], this._activeEffects = [], s["default"].make(this)
                }
                return o(t, [{
                    key: "supportsEffect",
                    value: function(e) {
                        var t = this;
                        return e.supported ? e.supportedScanners.some(function(e) {
                            return t._getScannerName(t._currentScanner) === e.displayName
                        }) : !1
                    }
                }, {
                    key: "activateEffect",
                    value: function(e, t) {
                        var n = new e(this, t);
                        n.activate(), this._activeEffects.push(n)
                    }
                }, {
                    key: "deactivateEffect",
                    value: function(e) {
                        var t = this;
                        this._activeEffects.some(function(n, i) {
                            return n.constructor === e ? (n.deactivate(), t._activeEffects.splice(i, 1), !0) : !1
                        })
                    }
                }, {
                    key: "deactivateEffects",
                    value: function() {
                        var e = this;
                        this._activeEffects.forEach(function(t) {
                            return e.deactivateEffect(t.constructor)
                        })
                    }
                }, {
                    key: "play",
                    value: function() {
                        if (!this._video || this._video.files.length < 1) throw new f["default"]("NoFiles", "There are no files to play.");
                        return this._currentScanner.play(), this._properties.paused = !1, this
                    }
                }, {
                    key: "pause",
                    value: function() {
                        if (!this._video || this._video.files.length < 1) throw new f["default"]("NoFiles", "There are no files to play.");
                        return this._currentScanner.pause(), this._properties.paused = !0, this
                    }
                }, {
                    key: "showExternalDisplayPicker",
                    value: function(e) {
                        return this._currentScanner.showExternalDisplayPicker(e)
                    }
                }, {
                    key: "supportsPresentationMode",
                    value: function(e) {
                        return -1 !== this.supportedPresentationModes.indexOf(e)
                    }
                }, {
                    key: "_findScanner",
                    value: function() {
                        for (var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = t.textTrackSupport, i = void 0 === n ? !1 : n, r = this._video.files.map(function(e) {
                                return e.mime
                            }), o = this._scanners, a = o, s = Array.isArray(a), u = 0, a = s ? a : a[e.iterator]();;) {
                            var c;
                            if (s) {
                                if (u >= a.length) break;
                                c = a[u++]
                            } else {
                                if (u = a.next(), u.done) break;
                                c = u.value
                            }
                            var l = c;
                            if (l.supported && (!i || l.supportsTextTracks) && -1 === this._blacklistedScanners.indexOf(this._getScannerName(l))) {
                                var d = l.supportedVideoTypes;
                                if (d.some(function(e) {
                                        return -1 !== r.indexOf(e)
                                    })) return l
                            }
                        }
                        return i ? (this.fire("error", new f["default"]("TextTracksNotSupported", "None of the scanners support text tracks in this browser.")), this._blacklistedScanners = [], this._findScanner()) : null
                    }
                }, {
                    key: "_initScanner",
                    value: function(e, t) {
                        var n = this;
                        if (this._currentScanner.constructor === e) return void(this._currentScanner.video !== t && (t.currentScanner = this._currentScanner, this._currentScanner.video = t));
                        this._currentScanner.deactivate();
                        var i = new e(this._element, this._options);
                        l.allEvents.forEach(function(e) {
                            i.on(e, function(t) {
                                return n._handleEvent(e, t, i)
                            })
                        }), this._currentScanner = i, t.currentScanner = i, this._currentScanner.video = t, Object.keys(this._properties).forEach(function(e) {
                            return "paused" === e ? void(n._properties.paused === !1 && n._currentScanner.play()) : void(n._currentScanner[e] = n._properties[e])
                        }), this.fire("scannerchange", this._getScannerName(this._currentScanner))
                    }
                }, {
                    key: "_updateScanner",
                    value: function() {
                        if (null !== this._video) {
                            var e = this._findScanner({
                                textTrackSupport: this._video.textTracks.length > 0
                            });
                            return e ? void this._initScanner(e, this._video) : void this.fire("error", new f["default"]("FilesNotPlayable", "None of the files could be played in this browser."))
                        }
                    }
                }, {
                    key: "_handleEvent",
                    value: function(e, t, n) {
                        if (n === this._currentScanner) {
                            switch (e) {
                                case "error":
                                    return void(t instanceof f["default"] && this.fire("error", t));
                                case "scannererror":
                                    this.fire("error", new f["default"]("ScannerError", "The current scanner can no longer be used because " + t.reason)), this._blacklistedScanners.push(this._getScannerName(this._currentScanner)), this._updateScanner([]);
                                    break;
                                case "timeupdate":
                                    this._properties.currentTime = this._currentScanner.currentTime;
                                    break;
                                case "ended":
                                    this._properties.paused = !0
                            }
                            this._activeEffects.forEach(function(t) {
                                "function" == typeof t["on" + e] && t["on" + e]()
                            }), this.fire(e, t)
                        }
                    }
                }, {
                    key: "_getScannerName",
                    value: function(e) {
                        return e instanceof c["default"] ? e.constructor.displayName : e.prototype.constructor.displayName
                    }
                }, {
                    key: "supportsSettingVolume",
                    get: function() {
                        return this._scanners.some(function(e) {
                            return e.supported && e.supportsSettingVolume
                        })
                    }
                }, {
                    key: "supportsTextTracks",
                    get: function() {
                        return this._scanners.some(function(e) {
                            return e.supported && e.supportsTextTracks
                        })
                    }
                }, {
                    key: "activeEffects",
                    get: function() {
                        return this._activeEffects
                    }
                }, {
                    key: "buffered",
                    get: function() {
                        return this._currentScanner.buffered
                    }
                }, {
                    key: "currentFile",
                    get: function() {
                        return this._currentScanner.currentFile
                    },
                    set: function(e) {
                        if ("string" == typeof e && (e = this._files.filter(function(t) {
                                return t.id === e
                            })[0]), !e) throw new f["default"]("FileNotValid", "The file is not valid.");
                        this._currentScanner.currentFile = e
                    }
                }, {
                    key: "currentScanner",
                    get: function() {
                        return this._getScannerName(this._currentScanner)
                    }
                }, {
                    key: "currentTime",
                    get: function() {
                        return this._currentScanner.currentTime
                    },
                    set: function(e) {
                        this._properties.currentTime = e, this._currentScanner.currentTime = e
                    }
                }, {
                    key: "duration",
                    get: function() {
                        return this._currentScanner.duration
                    }
                }, {
                    key: "ended",
                    get: function() {
                        return this._currentScanner.ended
                    }
                }, {
                    key: "externalDisplayAvailable",
                    get: function() {
                        return this._currentScanner.externalDisplayAvailable
                    }
                }, {
                    key: "externalDisplayActive",
                    get: function() {
                        return this._currentScanner.externalDisplayActive
                    }
                }, {
                    key: "loop",
                    get: function() {
                        return this._currentScanner.loop
                    },
                    set: function(e) {
                        this._properties.loop = e, this._currentScanner.loop = e
                    }
                }, {
                    key: "muted",
                    get: function() {
                        return this._currentScanner.muted
                    },
                    set: function(e) {
                        this._properties.muted = !!e, this._currentScanner.muted = !!e
                    }
                }, {
                    key: "paused",
                    get: function() {
                        return this._currentScanner.paused
                    }
                }, {
                    key: "playbackRate",
                    get: function() {
                        return this._currentScanner.playbackRate
                    },
                    set: function(e) {
                        this._properties.playbackRate = e, this._currentScanner.playbackRate = e
                    }
                }, {
                    key: "preload",
                    get: function() {
                        return this._currentScanner.preload
                    },
                    set: function(e) {
                        this._properties.preload = e, this._currentScanner.preload = e
                    }
                }, {
                    key: "presentationMode",
                    get: function() {
                        return this._currentScanner.presentationMode
                    },
                    set: function(e) {
                        this._currentScanner.presentationMode = e
                    }
                }, {
                    key: "supportedPresentationModes",
                    get: function() {
                        return this._currentScanner.supportedPresentationModes
                    }
                }, {
                    key: "video",
                    get: function() {
                        return this._video
                    },
                    set: function(e) {
                        this._video && this._video.deactivate(), this._blacklistedScanners = [], this._video = new h["default"](e), this._updateScanner()
                    }
                }, {
                    key: "videoWidth",
                    get: function() {
                        return this._currentScanner.videoWidth
                    }
                }, {
                    key: "videoHeight",
                    get: function() {
                        return this._currentScanner.videoHeight
                    }
                }, {
                    key: "volume",
                    get: function() {
                        return this._currentScanner.volume
                    },
                    set: function(e) {
                        if (0 > e || e > 1) throw new f["default"]("IndexSizeError", "Failed to set the 'volume' property: The volume provided (" + e + ") is outside of the range [0, 1].");
                        this._properties.volume = e, this._currentScanner.volume = e
                    }
                }]), t
            }();
        t["default"] = m
    }).call(t, n(1))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        function t() {
            var t = e.telecine && e.telecine.currentScanner;
            switch (t) {
                case "HTMLScanner":
                    return "HTML5";
                case "SWFScanner":
                    return "Flideo";
                case "moogaloop":
                    return "Moogaloop";
                default:
                    return "Player"
            }
        }

        function n(t, n) {
            window._gaq && window._gaq.push(["player._trackSocial", t, n, e.config.video.share_url])
        }

        function i(e, n, i) {
            var r = (new Date).getTime() - n;
            window._gaq && window._gaq.push(["player._trackTiming", t(), e, r, i])
        }

        function o() {
            e.config.request.flags.dnt || (e.events.on(r.Events.facebookButtonPressed, function() {
                n("Facebook", "share")
            }), e.events.on(r.Events.twitterButtonPressed, function() {
                n("Twitter", "tweet")
            }), e.events.on(r.Events.tumblrButtonPressed, function() {
                n("Tumblr", "share")
            }), e.events.on(r.Events.emailButtonPressed, function() {
                n("Email", "email")
            }))
        }

        function a() {
            var t;
            e.events.on([r.Events.bufferStarted, r.Events.scrubbingStarted], function(e) {
                t || (t = e || (new Date).getTime())
            }), e.events.on(r.Events.bufferEnded, function() {
                if (t > 0) {
                    var n = e.telecine.currentFile.metadata.quality,
                        r = "Buffer Time";
                    d && (d = !1, r = "Start Time"), i(r, t, n), t = null
                }
            })
        }

        function s() {
            function t() {
                a = document.createElement("script"), a.id = "player-comscore", a.async = !0, a.src = e.config.request.urls.comscore_js;
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(a, t)
            }

            function n() {
                try {
                    o = new ns_.StreamingTag({
                        customerC2: e.config.request.comscore_id
                    }), s && (i(), s = !1)
                } catch (t) {}
            }

            function i() {
                try {
                    o.playContentPart({
                        ns_st_ci: e.config.video.id
                    })
                } catch (t) {}
            }
            if (!e.config.request.flags.dnt && e.config.request.flags.plays) {
                var o, a = document.getElementById("player-comscore"),
                    s = !1;
                e.events.on(r.Events.played, function() {
                    if (!o) {
                        if ("undefined" == typeof ns_) return a || t(), a.addEventListener("load", n, !1), void(s = !0);
                        n()
                    }
                    i()
                }), e.events.on(r.Events.paused, function() {
                    try {
                        o && o.stop()
                    } catch (e) {}
                })
            }
        }

        function u() {
            "tracking_pixel" in e.config.video && (e.config.request.flags.dnt || e.config.request.flags.plays && e.events.on(r.Events.playInitiated, function() {
                try {
                    (new Image).src = e.config.video.tracking_pixel
                } catch (t) {}
            }))
        }

        function c() {
            e.events.on(r.Events.configChanged, function() {
                l !== e.config.request.session && (window._gaq && window._gaq.push(["player._trackPageview", "/video/" + e.config.video.id]), d = !0)
            })
        }
        var l = e.config.request.session,
            d = !0;
        return o(), a(), s(), u(), c(), e.events.fire(r.Events.analyticsModuleReady), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(2);
    t["default"] = i, e.exports = t["default"]
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        function n() {
            return Math.max(10, Math.round(.045 * e.element.clientHeight)) + "px"
        }

        function i() {
            t.style.fontSize = n()
        }

        function o() {
            t.classList.add("hidden"), t.setAttribute("hidden", "")
        }

        function a() {
            "picture-in-picture" !== e.telecine.presentationMode && (t.classList.remove("hidden"), t.removeAttribute("hidden"))
        }

        function s() {
            e.events.on(r.Events.cueChanged, function(e) {
                for (var n = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1]; t.firstChild;) t.removeChild(t.firstChild);
                if (n.length) {
                    var i = document.createDocumentFragment();
                    return n.forEach(function(e) {
                        var t = document.createElement("span");
                        t.innerHTML = e.html, i.appendChild(t)
                    }), t.appendChild(i), f ? void a() : void(v = !0)
                }
                o()
            }).on(r.Events.captionsChanged, function(e) {
                return e ? (t.setAttribute("lang", e.language), void t.setAttribute("dir", e.rtl ? "rtl" : "ltr")) : (t.removeAttribute("dir"), void t.removeAttribute("lang"))
            }).on(r.Events.playInitiated, function() {
                f = !0, v && (v = !1, a())
            }).on(r.Events.pictureInPictureActivated, function() {
                o()
            }).on(r.Events.pictureInPictureDeactivated, function() {
                a()
            }).on(r.Control.reset, function() {
                f = !1, o()
            })
        }

        function u() {
            i(), window.addEventListener("resize", i, !1), e.events.on([r.Events.didEnterFullscreen, r.Events.didExitFullscreen, r.Events.enteredTinyMode, r.Events.enteredMiniMode, r.Events.enteredNormalMode], i)
        }

        function c() {
            e.events.on(r.Events.controlBarVisibilityChanged, function(e) {
                return e ? void t.classList.add("with-controls") : void t.classList.remove("with-controls")
            })
        }

        function l() {
            e.events.on(r.Events.overlayOpened, function() {
                t.classList.add("invisible")
            }).on(r.Events.overlayClosed, function() {
                t.classList.remove("invisible")
            })
        }

        function d() {
            e.events.on(r.Events.ended, function() {
                "nothing" !== e.config.embed.outro && t.classList.add("invisible")
            }).on([r.Events.played, r.Events.scrubbingStarted], function() {
                t.classList.remove("invisible")
            })
        }
        var f = !1,
            v = !1;
        return s(), u(), c(), l(), d(), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(2);
    t["default"] = i, e.exports = t["default"]
}, function(e, t, n) {
    (function(i) {
        "use strict";

        function r(e) {
            function t() {
                return d && d - s <= (new Date).getTime()
            }

            function n(e) {
                var t = (new Date).getTime() + 1e3 * e,
                    n = 1e3 * e - s - 5e3;
                return h = setTimeout(function() {
                    "onLine" in navigator && !navigator.onLine || (v = u(l.video.id))
                }, n), t
            }

            function r(e) {
                clearTimeout(h);
                var t = l;
                if (isNaN(e) && "string" != typeof e) return l = e, d = n(l.request.expires), i.resolve({
                    old: t,
                    loaded: l
                });
                var r = (new Date).getTime(),
                    s = l && l.video && l.video.id,
                    u = l && l.request && l.request.session,
                    c = l && l.request && l.request.referrer,
                    f = l && l.embed && l.embed.on_site,
                    v = l && l.embed && l.embed.context,
                    p = e;
                if (!isNaN(e)) {
                    var m = l && l.player_url ? "https://" + l.player_url : "";
                    p = m + "/video/" + e + "/config" + window.location.search
                }
                return (0, a.request)(p, {
                    allowErrorStatuses: !0
                }).then(function(e) {
                    l = JSON.parse(e), l.view !== o.View.error && (d = n(l.request.expires), u && l.video.id === s && (l.request.session = u), c && (l.request.referrer = c), f && (l.embed.on_site = 1,
                        l.embed.context = v));
                    (new Date).getTime() - r;
                    return {
                        old: t,
                        loaded: l
                    }
                })
            }

            function u() {
                clearTimeout(h);
                var e = (new Date).getTime(),
                    t = l && l.request.referrer,
                    i = l.request,
                    r = i.signature,
                    s = i.session,
                    u = i.timestamp,
                    f = i.expires,
                    p = "https://" + l.player_url + "/video/" + l.video.id + "/config/request?session=" + s + "&signature=" + r + "&time=" + u + "&expires=" + f;
                return (0, a.request)(p).then(function(i) {
                    l.request = JSON.parse(i), t && (l.request.referrer = t), d = n(l.request.expires);
                    (new Date).getTime() - e;
                    return v = null, c.fire(o.Events.requestConfigReloaded), l.request
                })
            }
            var c = e.events,
                l = null,
                d = null,
                f = null,
                v = null,
                h = null;
            return window.addEventListener("online", function() {
                t() && (v = u(l.video.id))
            }), {get isExpired() {
                    return t()
                },
                load: function(e) {
                    return r(e)
                },
                reload: function() {
                    return l && l.video.id ? r(l.video.id) : i.reject(new Error("No config loaded."))
                },
                toJSON: function() {
                    return l
                },
                get config() {
                    return l
                },
                set config(e) {
                    l = e
                },
                verify: function() {
                    return t() ? (v || (v = u()), v) : i.resolve(l.request)
                },
                get _video() {
                    return f
                },
                set _video(e) {
                    f = e
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(2),
            a = n(5),
            s = 6e4;
        t["default"] = r, e.exports = t["default"]
    }).call(t, n(3))
}, function(e, t, n) {
    (function(i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e) {
            function t() {
                var e = (0, u.getThumbnailDimensions)(E.clientWidth * l["default"].devicePixelRatio, E.clientHeight * l["default"].devicePixelRatio),
                    t = e.width,
                    n = e.height,
                    r = I.getAttribute("data-thumb-width");
                if (t <= parseInt(r, 10) || 0 === t) return i.resolve();
                var o = (0, u.getThumbnailUrl)({
                    width: t,
                    height: n,
                    baseUrl: F.config.video.thumbs.base,
                    webpSupport: F.config.request.flags.webp
                });
                if (I.setAttribute("data-thumb", o), I.setAttribute("data-thumb-width", t), F.config.embed.autoplay && "beginning" !== F.config.embed.outro) return i.resolve();
                var a = (0, u.loadImage)(o).then(function(e) {
                    "none" !== I.style.backgroundImage && (I.style.backgroundImage = "url(" + e.src + ")");
                    var t = F.config.video.width / F.config.video.height,
                        n = e.width / e.height;
                    return (.95 * t >= n || n >= 1.05 * t) && I.classList.remove("cover"), e
                })["catch"](function(e) {});
                return i.race([a, new i(function(e) {
                    return setTimeout(e, 2e3)
                })])
            }

            function n() {
                var e = (0, s.getScaleFactor)({
                        width: F.config.video.width,
                        height: F.config.video.height,
                        elementWidth: E.clientWidth,
                        elementHeight: E.clientHeight
                    }),
                    t = (e.extraWidth, e.extraHeight, e.scaleFactor);
                t > 1 ? (I.classList.add("cover"), B.style.webkitTransform = "scale(" + t + ")", B.style.transform = "scale(" + t + ")") : (I.classList.remove("cover"), B.style.webkitTransform = "", B.style.transform = "")
            }

            function r(e) {
                var t = e.old,
                    n = e.loaded;
                if (!t);
                if (window.parent !== window) {
                    var i = "Private Video on Vimeo";
                    n.view !== a.View.main && n.view !== a.View.privateUnlocked || (i = n.video.title + " from " + n.video.owner.name + " on Vimeo"), document.title = i, history && history.replaceState && n.video && t && history.replaceState({
                        id: n.video.id
                    }, "", "/video/" + n.video.id)
                }
                if (n.view !== a.View.main && n.view !== a.View.privateUnlocked) throw new Error("Config not authorized: " + n.view);
                t && t.embed && t.embed.color !== n.embed.color && A.fire(a.Control.changeColor, n.embed.color), X && X.reset(), (l["default"].mobileAndroid || l["default"].iPhone || l["default"].windowsPhone || l["default"].browser.bb10 || l["default"].iPad || l["default"].android) && (n.embed.autoplay = 0);
                var r = !t || !t.video || t.video.id !== n.video.id;
                return r && I.removeAttribute("data-thumb-width"), V = null, A.fire(a.Control.reset), A.fire(a.Events.configChanged, r), e
            }

            function o() {
                window.requestAnimationFrame(function() {
                    E.classList.remove("loading"), $()
                })
            }

            function c(e) {
                return M.then(function() {
                    if (b(e), I.setAttribute("data-thumb", ""), I.style.backgroundImage = "", "function" != typeof z.authorizationHandler) throw new Error("Config was not authorized.");
                    return z.authorizationHandler(o)
                }).then(function(e) {
                    F.config = e;
                    var t = !0;
                    return V = null, A.fire(a.Control.reset), A.fire(a.Events.configChanged, t), e
                })
            }

            function d() {
                var e = document.location.hash,
                    t = (0, s.parseTime)(e);
                null !== t && (F.config.embed.time = (0, s.limit)(t, 0, F.config.video.duration), l["default"].touch || (F.config.embed.autoplay = 1), -1 !== e.indexOf("at=") && history && history.replaceState && history.replaceState("", "", window.location.pathname + window.location.search))
            }

            function v() {
                A.on(a.Events.userLogIn, function(e) {
                    F.reload().then(function(t) {
                        if (!F.config.user.logged_in) return A.fire(a.Events.loginFailure), t;
                        switch (A.fire(a.Events.userLoggedIn, e), e) {
                            case "like":
                                F.config.user.liked && A.fire(a.Events.liked);
                                break;
                            case "watch-later":
                                F.config.user.watch_later && A.fire(a.Events.addedToWatchLater);
                                break;
                            case "private":
                                A.fire(a.Events.privateUnlocked)
                        }
                        return t
                    })["catch"](function(e) {})
                }), A.on(a.Events.userLoggedOut, function() {
                    F.reload()["catch"](function(e) {})
                })
            }

            function p() {
                H = t(), A.on([a.Events.playInitiated, a.Events.playButtonPressed], function() {
                    I.style.backgroundImage = "none"
                }), A.on(a.Events.didEnterFullscreen, function() {
                    "none" === I.style.backgroundImage && "beginning" !== F.config.embed.outro || (H = t())
                });
                var e = null;
                window.addEventListener("resize", function() {
                    clearTimeout(e), e = setTimeout(function() {
                        H = H.then(function() {
                            return t()
                        })["catch"](function(e) {})
                    }, 250), n()
                }, !1)
            }

            function g(e) {
                n(), d(), v(), p(), w(e)
            }

            function b(e) {
                W || (W = new y["default"](e), Object.keys(W).forEach(function(e) {
                    if ("function" == typeof W[e]) return void Object.defineProperty(Q, e, {
                        enumerable: !0,
                        value: W[e]
                    });
                    var t = {
                        enumerable: !0,
                        get: W[e].get
                    };
                    W[e].set && (t.set = W[e].set), Object.defineProperty(Q, e, t)
                }))
            }

            function w(e) {
                var t = F.config.embed.settings.background && (l["default"].iOS || l["default"].android);
                if (!t) {
                    var n = new O["default"](e, E.querySelector(".video-wrapper"));
                    D = n.telecine
                }
                void new m["default"](e), void new _["default"](e, E.querySelector(".captions")), void new S["default"](e), void new x["default"](e), X = new C["default"](e), b(e)
            }
            var E = e.element,
                T = e.delegate,
                P = void 0 === T ? {} : T,
                L = e.cssLoadedPromise,
                M = void 0 === L ? i.resolve(null) : L,
                A = (e.name, h["default"].make()),
                F = new k["default"]({
                    events: A
                }),
                q = (0, s.uuid)();
            E.classList.add("player-" + q), E.classList.add("loading"), E.id || (E.id = "player" + q), E.innerHTML = f["default"].render("outer");
            var I = E.querySelector(".video"),
                B = E.querySelector(".telecine");
            if (l["default"].iOS) {
                var j = document.createElement("video");
                B.appendChild(j);
                try {
                    j.play(), j.pause()
                } catch (R) {}
            }
            var D = null,
                V = null,
                N = null,
                H = null,
                U = null,
                z = {},
                W = null,
                X = null,
                $ = void 0,
                Y = new i(function(e, t) {
                    $ = e
                }).then(function() {
                    return A.fire(a.Events.ready), null
                }),
                Q = {get config() {
                        return F.config
                    },
                    set config(e) {
                        F.config = e
                    },
                    get delegate() {
                        return P
                    },
                    set delegate(e) {
                        P = e
                    },
                    ready: function(e) {
                        return e ? void Y.then(function() {
                            return e()
                        })["catch"](function(e) {}) : Y
                    },
                    get sessionId() {
                        return F.config.request.session
                    }
                },
                G = {get config() {
                        return F.config
                    },
                    get element() {
                        return E
                    },
                    get events() {
                        return A
                    },
                    get uuid() {
                        return q
                    },
                    get externalApi() {
                        return Q
                    },
                    get telecine() {
                        return D
                    },
                    init: function(e, t) {
                        return N ? N : (z = t, N = F.load(e).then(r)["catch"](function(e) {
                            return c(G)
                        }).then(function() {
                            return "function" == typeof z.initializationHandler ? i.resolve(t.initializationHandler()) : null
                        }).then(function() {
                            return g(G), "function" == typeof z.postInitializationHandler ? i.resolve(t.postInitializationHandler()) : null
                        }).then(function() {
                            return i.all([H, M])
                        }).then(o)["catch"](function(e) {}))
                    },
                    loadVideo: function(e) {
                        return U === e && V ? V : (U = e, E.classList.add("loading"), V = F.load(e).then(r)["catch"](function(e) {
                            return c(G)
                        }).then(function(e) {
                            return H = t(), i.resolve(H)
                        }).then(o))
                    },
                    performDelegateAction: function(e) {
                        var t = arguments.length <= 1 || void 0 === arguments[1] ? function() {} : arguments[1],
                            n = arguments.length <= 2 || void 0 === arguments[2] ? [] : arguments[2],
                            i = void 0;
                        if (P && P[e.will]) {
                            var r;
                            if (i = (r = P)[e.will].apply(r, [F.config.video.id].concat(n)), i === !1) return
                        }
                        t.apply(void 0, [F.config.video.id].concat(n, [i])), P && P[e.did] && P[e.did]()
                    },
                    ready: function() {
                        return Y
                    },
                    verifyConfig: function() {
                        return F.verify()
                    }
                };
            return G
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n(27);
        var a = n(2),
            s = n(5),
            u = n(47),
            c = n(6),
            l = r(c),
            d = n(9),
            f = r(d),
            v = n(4),
            h = r(v),
            p = n(62),
            m = r(p),
            g = n(28),
            y = r(g),
            b = n(63),
            _ = r(b),
            w = n(64),
            k = r(w),
            E = n(67),
            S = r(E),
            T = n(69),
            x = r(T),
            P = n(70),
            C = r(P),
            L = n(71),
            O = r(L);
        t["default"] = o, e.exports = t["default"]
    }).call(t, n(3))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        function n() {
            return t.classList.contains("overflow") ? void t.classList.remove("overflow") : void(t.clientHeight < t.clientHeight && t.classList.add("overflow"))
        }

        function i(e) {
            if (!e) return {};
            var t = window.getComputedStyle(e);
            if (!t) return {};
            var n = t.width,
                i = t.height;
            return {
                width: n,
                height: i
            }
        }

        function r(e, t) {
            return e && t ? parseInt(e, 10) + "×" + parseInt(t, 10) + " " + m() : ""
        }

        function a() {
            t.classList.add("hidden"), t.setAttribute("hidden", ""), t.setAttribute("aria-hidden", "true")
        }

        function u() {
            t.classList.remove("hidden"), t.removeAttribute("hidden"), t.setAttribute("aria-hidden", "false"), n()
        }

        function l() {
            function t(t) {
                function i(e) {
                    return window.btoa(unescape(encodeURIComponent(e)))
                }

                function r(t) {
                    var n = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1],
                        i = t;
                    n && (i = "https://" + e.config.player_url + "/debug?v=" + t), z.value = i
                }
                var o = {
                    sessionId: e.config.request.session,
                    clipId: F.textContent,
                    playing: I.textContent,
                    dimensions: B.textContent,
                    cdn: j.textContent,
                    ua: navigator.userAgent,
                    referrer: e.config.request.referrer,
                    country: e.config.request.country,
                    graphEvents: x,
                    graphLines: T,
                    graphSpeeds: S.map(function(e) {
                        return e.map(function(e) {
                            return {
                                speed: Math.round(e.speed) / 1e3,
                                time: Math.round(100 * e.time) / 100
                            }
                        })
                    }),
                    duration: e.telecine.duration
                };
                if (e.config.request.test && (o.testGroup = e.config.request.test.group), q && (o.profileId = q.textContent), U && (o.droppedFrames = U.textContent), V && (o.bandwidth = {
                        avg: V.textContent,
                        min: N.textContent,
                        max: H.textContent
                    }), window.btoa) {
                    var a = i(JSON.stringify(o));
                    return r(a), void t()
                }
                var s = new XMLHttpRequest;
                s.open("POST", "https://" + e.config.player_url + "/debug", !0), s.onload = function() {
                    var e = JSON.parse(s.responseText);
                    r(e, !1), t()
                }, s.onerror = function() {
                    n("Error!")
                }, s.send(JSON.stringify(o))
            }

            function n() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? "Copied!" : arguments[0];
                v(W, e), clearTimeout(X), X = setTimeout(function() {
                    v(W, "Open link")
                }, 2e3)
            }
            t(function() {
                W.href = z.value, window.open(z.value)
            })
        }

        function f() {
            var n = e.telecine.currentFile;
            if (n) {
                var u = n.metadata,
                    d = e.telecine.currentScanner,
                    f = "MediaSourceScanner" === d;
                $ = t.parentElement.querySelector("video");
                var v = i($),
                    h = v.width,
                    p = v.height;
                P = r(h, p);
                var m = {
                    clipId: e.config.video.id,
                    scanner: d,
                    cdn: u.cdn,
                    delivery: o.MimeToDelivery[e.telecine.video.currentFile.mime],
                    resolution: "" + u.quality + (u.fps ? "@" + u.fps : ""),
                    dimensions: P,
                    displayProfile: f,
                    displayBandwidth: f,
                    displayDroppedFrames: f,
                    displayAudioVideoStream: f
                };
                m.displayAudioVideoStream && (m.separateAudioVideo = e.config.request.files.dash.separate_av), e.config.request.test && (m.testGroup = e.config.request.test.group), t.innerHTML = s["default"].render("stats_debug", m), F = t.querySelector(".stats-debug-clip-id"), q = t.querySelector(".stats-debug-profile-id"), I = t.querySelector(".stats-debug-resolution"), B = t.querySelector(".stats-debug-dimensions"), j = t.querySelector(".stats-debug-cdn"), R = t.querySelector(".stats-debug-delivery"), D = t.querySelector(".stats-debug-time-series"), V = t.querySelector(".stats-debug-bandwidth"), N = t.querySelector(".stats-debug-bandwidth-min"), H = t.querySelector(".stats-debug-bandwidth-max"), U = t.querySelector(".stats-debug-dropped-frames"), W = t.querySelector(".stats-debug-copy"), z = t.querySelector(".stats-debug-code"), (0, c["default"])(t, ".stats-debug-close", a), (0, c["default"])(t, ".stats-debug-copy", l), A = !0
            }
        }

        function v(e, t) {
            var n = arguments.length <= 2 || void 0 === arguments[2] ? "textContent" : arguments[2];
            window.requestAnimationFrame(function() {
                var i = e.parentElement;
                return "undefined" == typeof t ? void(i.style.display = "none") : (i.style.display = "block", void(e[n] = t))
            })
        }

        function h(e, t, n) {
            return Math.min(Math.max(e, t), n)
        }

        function p(t, n) {
            var o = 200,
                a = 14;
            if (t !== G) {
                G = t, t > Y && (Y = t, v(H, Math.floor(t / 1e3).toLocaleString() + " Kbps")), Q > t && (Q = t, v(N, Math.floor(t / 1e3).toLocaleString() + " Kbps"));
                var s = e.telecine.currentTime;
                S[O].push({
                    speed: t,
                    time: s
                })
            }
            var u = '<svg width="' + o + '" height="' + a + '" viewBox="0 0 ' + o + " " + a + '">',
                c = S[O].map(function(t) {
                    var n = t.time / e.telecine.duration * o,
                        i = a - a * t.speed / Y;
                    return isNaN(i) && (i = 0), n + "," + h(i, 0, a)
                });
            if (J) {
                var l = {
                    time: e.telecine.currentTime,
                    color: J,
                    type: Z[J]
                };
                switch (l.type) {
                    case "resize":
                        var d = i($),
                            f = r(d.width, d.height);
                        P = f, l.title = "Resized from " + P + " to " + f;
                        break;
                    case "downswitch":
                    case "upswitch":
                        l.title = "Switched from " + C + " to " + L;
                        break;
                    default:
                        l.title = Z[J]
                }
                T[O].push(l), J = !1
            }
            return T[O].forEach(function(t) {
                var n = t.time,
                    i = t.color,
                    r = t.title,
                    s = n / e.telecine.duration * o,
                    c = "<g>";
                c += "<title>" + r + "</title>", c += '<line x1="' + s + '" y1="0" x2="' + s + '" y2="' + a + '" stroke-width="1" stroke="' + i + '" />', c += "</g>", u += c
            }), u += "<g>", u += '<polyline stroke="white" fill="none" points="', u += c.join(" "), u += '"></polyline>', u += "</g></svg></span></span>"
        }

        function m() {
            return window.devicePixelRatio && window.devicePixelRatio > 1 ? "@" + window.devicePixelRatio + "x" : ""
        }

        function g(e, t) {
            O += 1, S.push([]), T.push([]), x.push([{
                title: e,
                time: Math.round(100 * t) / 100
            }])
        }

        function y(n, a) {
            var s;
            M[n] || (M[n] = []), M[n].length === E && M[n].pop(), A || f(), M[n].unshift(a);
            var u = void 0;
            switch (n) {
                case "resize":
                    return J = ee.resize, u = i($), e.events.fire(o.Events.resize, u), void v(B, "" + r(u.width, u.height));
                case "streamchange":
                    var c = a.index,
                        l = a.streams,
                        d = l[c],
                        h = e.config.request.files.dash.cdn,
                        m = e.config.request.files.dash.streams[c].profile;
                    return K !== d.bitrate && (null !== K && (J = ee.upswitch, d.bitrate < K && (J = ee.downswitch)), K = d.bitrate), C !== L && (C = L), $ || ($ = t.querySelector("video")), L = d.width + "×" + d.height + "@" + Math.round(d.framerate) + " " + Math.round(d.bitrate / 1e3).toLocaleString() + " Kbps", v(I, L), u = i($), v(B, "" + r(u.width, u.height)), v(j, h), void v(q, m);
                case "scannerchange":
                    return void v(R, o.MimeToDelivery[e.telecine.video.currentFile.mime]);
                case "streamtargetchange":
                    var y = e.config.request.files.dash.streams[a.index],
                        b = [y, a.index, a.streams];
                    return void(s = e.events).fire.apply(s, [o.Events.streamTargetChange].concat(b));
                case "bandwidth":
                    var _ = a.speed,
                        w = a.bitrate;
                    v(V, Math.floor(_ / 1e3).toLocaleString() + " Kbps");
                    var k = p(_, w);
                    return void v(D, k, "innerHTML");
                case "droppedframes":
                    var S = a.dropped,
                        T = a.total;
                    return void v(U, S.toLocaleString() + " / " + T.toLocaleString());
                case "seeked":
                case "ended":
                    return void g(n, e.telecine.currentTime)
            }
        }

        function b() {
            e.events.on(o.Events.debugButtonPressed, function() {
                return t.classList.contains("hidden") ? void u() : void a()
            })
        }

        function _() {
            e.events.on(o.Events.configChanged, function(e) {
                window.requestAnimationFrame(f)
            })
        }

        function w() {
            ["streamchange", "droppedframes", "bandwidth", "scannerchange", "streamtargetchange", "seeked", "ended"].forEach(function(t) {
                e.telecine.on(t, function(e) {
                    return y(t, e)
                })
            })
        }

        function k() {
            (0, d["default"])(window).on("resize", function() {
                y("resize"), n()
            })
        }
        var E = 100,
            S = [
                []
            ],
            T = [
                []
            ],
            x = [],
            P = void 0,
            C = void 0,
            L = void 0,
            O = 0,
            M = {},
            A = !1,
            F = void 0,
            q = void 0,
            I = void 0,
            B = void 0,
            j = void 0,
            R = void 0,
            D = void 0,
            V = void 0,
            N = void 0,
            H = void 0,
            U = void 0,
            z = void 0,
            W = void 0,
            X = void 0,
            $ = void 0,
            Y = Number.NEGATIVE_INFINITY,
            Q = Number.POSITIVE_INFINITY,
            G = -1,
            K = null,
            J = !1,
            Z = {
                "#FB5454": "downswitch",
                "#54FB54": "upswitch",
                "#F9FF4B": "resize"
            },
            ee = {
                downswitch: "#FB5454",
                upswitch: "#54FB54",
                resize: "#F9FF4B"
            };
        f(), b(), _(), w(), k()
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(2),
        a = n(9),
        s = i(a),
        u = n(13),
        c = i(u),
        l = n(8),
        d = i(l);
    t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    (function(i, r) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e) {
            function t() {
                q = !1, I = !1, j = !1, R = !1, D = !1, V = !1, W = null, X = null, N = null, $ = null, Y = !1, Q = 0, G = 0, z = h(), O = n(), M = e.config.request.urls.blurr, H = "auto"
            }

            function n() {
                return parseInt(Date.now() / 1e3, 10)
            }

            function i() {
                return Date.now ? Date.now() : (new Date).getTime()
            }

            function o(e) {
                return i() - e
            }

            function a(e) {
                return n() - e
            }

            function l() {
                var t = document.createElement("a");
                return t.href = e.config.request.referrer, t.origin || t.protocol.replace(":", "") + "://" + t.host
            }

            function f() {
                F = !0, setTimeout(v, A)
            }

            function v(t) {
                var n = !0;
                if (t) {
                    if (n = !1, E && I && m("video-buffered", {
                            time: o(T) / 1e3,
                            video_time: P
                        }), S && (I && !V && m("video-stopped-during-playback", {
                            time: o(x) / 1e3,
                            video_time: C
                        }), B += o(x) / 1e3), q && !I) {
                        var i = o(k);
                        i >= 1e3 && !e.telecine.paused && m("video-exit-before-start", {
                            time: i / 1e3
                        })
                    }
                    I && !e.config.embed.loop && m("video-playback-session", _(z))
                }
                var r = L;
                if (L = [], 0 === r.length) return void f();
                var a = JSON.stringify(r);
                if (navigator.sendBeacon && navigator.sendBeacon(M, a)) return void f();
                var s = new XMLHttpRequest;
                s.open("POST", M, n), s.setRequestHeader("Content-Type", "text/plain"), s.onload = function() {}, s.send(a), f()
            }

            function h() {
                return {
                    session_id: e.config.request.session,
                    account_type: e.config.video.owner ? e.config.video.owner.account_type : null,
                    referrer: e.config.request.referrer,
                    video_duration: e.config.video.duration,
                    device_pixel_ratio: window.devicePixelRatio || 1,
                    startup_time: 0,
                    video_start_position: 0,
                    video_end_position: 0,
                    starting_profile: 0,
                    abandoned_during_buffer: 0,
                    forced_embed_quality: "none",
                    _fullscreen: [],
                    number_of_down_switches: 0,
                    number_of_up_switches: 0,
                    number_of_buffers: 0,
                    stayed_on_auto: 1,
                    alert_displayed: 0,
                    alert_dismissed: "none",
                    _speeds: [],
                    _playedProfiles: {},
                    _targetProfiles: {},
                    _embed_size: {},
                    _target_profile_id: {},
                    _profiles: {},
                    session_playback_duration: 0
                }
            }

            function p() {
                var t = e.telecine.video.currentFile || {},
                    n = t.id,
                    i = void 0 === n ? 0 : n,
                    r = t.mime,
                    o = void 0 === r ? u.CodecToMime.h264 : r,
                    a = t.metadata;
                a = void 0 === a ? {} : a;
                var s = a.profile,
                    c = void 0 === s ? -1 : s,
                    l = !1,
                    d = !1;
                switch (o) {
                    case u.CodecToMime.dash:
                        0 === t.restrictedStreamIndexes.length && (l = !0), e.config.request.files.dash.separate_av && (d = !0);
                        var f = U,
                            v = f.id;
                        i = void 0 === v ? 0 : v;
                        var h = f.profile;
                        c = void 0 === h ? -1 : h;
                        break;
                    case u.CodecToMime.hls:
                        l = !0
                }
                return {
                    clip_id: e.config.video.id,
                    video_file_id: Number.isInteger(Number(i)) ? parseInt(i, 10) : 0,
                    delivery: u.MimeToDelivery[o],
                    profile_id: c,
                    auto: Number(l),
                    player_type: "html",
                    version: e.config.request.build.js,
                    autoplay: e.config.embed.autoplay,
                    cdn: t.metadata.cdn || "akamai",
                    origin: t.metadata.origin,
                    secure: t.src && 0 === t.src.indexOf("https"),
                    vod: e.config.video.vod ? 1 : 0,
                    embed: !e.config.embed.on_site,
                    context: e.config.embed.context,
                    cedexis: t.metadata.cedexis ? t.metadata.cedexis : 0,
                    in_cedexis_test: t.metadata.inCedexisTest ? 1 : 0,
                    separate_av: d ? 1 : 0
                }
            }

            function m(t, n) {
                var i = p();
                for (var r in n) n.hasOwnProperty(r) && (i[r] = n[r]);
                i.name = t, i.event_time = e.config.request.timestamp + a(O), L.push(i), F || f()
            }

            function g() {
                var t = e.config.video.duration;
                e.config.request.flags.blurr && M && (e.events.on(u.Events.playInitiated, function() {
                    q || e.performDelegateAction(u.Delegate.playLog, function(n) {
                        var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                        m("video-start-attempt", {
                            autoplay: r.continuous || e.config.embed.autoplay
                        }), q = !0, k = i();
                        var o = e.config.user.progress,
                            a = e.config.video.duration;
                        !o || e.config.embed.autoplay || e.config.embed.time || setTimeout(function() {
                            var e = o / a * 100,
                                n = o > t ? "seeked_back" : "resume";
                            n = 0 === t ? "beginning" : n, m("video-start-attempt-from-resume", {
                                state: n,
                                duration: a,
                                percent: e,
                                playback_time: t,
                                resume_time: o
                            })
                        }, 1e4)
                    })
                }), e.events.on(u.Events.playProgress, function(e) {
                    if (t = Math.min(e, t), !I) {
                        I = !0;
                        var n = o(k) / 1e3;
                        m("video-start-time", {
                            time: n
                        }), z.startup_time = n, z.video_start_position = e
                    }
                }), e.events.on(u.Events.bufferStarted, function() {
                    T || (P = e.telecine.currentTime, T = i()), E = !0
                }), e.events.on(u.Events.bufferEnded, function() {
                    return E = !1, I ? (m("video-buffered", {
                        time: o(T) / 1e3,
                        video_time: P
                    }), void(T = null)) : void(T = null)
                }), e.events.on(u.Events.adaptiveBufferStarted, function() {
                    x || (C = e.telecine.currentTime, x = i()), S = !0
                }), e.events.on(u.Events.adaptiveBufferEnded, function() {
                    return !I || V ? void(x = null) : (B += o(x) / 1e3, V = !0, m("video-stopped-during-playback", {
                        time: o(x) / 1e3,
                        video_time: C
                    }), x = null, void(S = !1))
                }), e.events.on(u.Events.error, function(t) {
                    var n = arguments.length <= 1 || void 0 === arguments[1] ? {
                        "final": !0
                    } : arguments[1];
                    if (n["final"] !== !1 && q) {
                        var i = ["not-supported", "decode", "network", "unknown"],
                            r = -1 !== i.indexOf(t);
                        return I ? void(r && m("video-playback-error", {
                            type: t,
                            video_time: e.telecine.currentTime
                        })) : void(r && m("video-start-failure", {
                            type: t
                        }))
                    }
                }), e.events.on(u.Events.didEnterFullscreen, function(e, t) {
                    j || (m("video-enter-fullscreen", {
                        fullPlayer: e,
                        requested: t,
                        referrer: l()
                    }), j = !0)
                }), (0, d["default"])(v))
            }

            function y() {
                e.events.on(u.Control.changeQuality, function(t) {
                    e.telecine.video.currentFile.mime === u.CodecToMime.dash && ("auto" === t || R ? "auto" === t && R && !D && (m("video-switch-back-to-auto", {
                        quality: H,
                        auto: 1
                    }), D = !0) : (m("video-switch-from-auto", {
                        quality: t,
                        auto: 0
                    }), R = !0), H = t)
                }), e.events.on(u.Events.streamChanged, function(e) {
                    U = e
                })
            }

            function b() {
                function t(e, t) {
                    return e + ":" + t
                }

                function n(e) {
                    z._embed_size[e] = z._embed_size[e] || 0, $ = e
                }
                e.events.on(u.Events.playInitiated, function() {
                    $ = t(e.config.video.video_width, e.config.video.video_height), n($)
                }), e.events.on(u.Events.playProgress, function(e) {
                    z._embed_size[$] += 1, Y || (Y = !0, Q = e), G = e, z.video_end_position = e
                }), e.events.on(u.Control.seek, function() {
                    Y = !1, z.session_playback_duration += G - Q
                }), e.events.on(u.Events.seeked, function(e) {
                    Q = e
                }), e.events.on(u.Events.ended, function() {
                    Y && (Y = !1), z.session_playback_duration += e.config.video.duration - Q, z.video_end_position = e.config.video.duration
                }), e.events.on(u.Events.didEnterFullscreen, function(e, t) {
                    z._fullscreen.push({
                        start: i()
                    })
                }), e.events.on(u.Events.didExitFullscreen, function(e, t) {
                    var n = z._fullscreen.length - 1;
                    z._fullscreen[n].end = i()
                }), e.events.on(u.Events.adaptiveBandwidth, function(e) {
                    var t = e.speed;
                    z._speeds.push(t)
                }), e.events.on(u.Events.streamChanged, function(e, t, n) {
                    var r = e.profile,
                        o = i(),
                        a = n[t].bitrate;
                    if (z._profiles[r] = z._profiles[r] || [], z.starting_profile || (z.starting_profile = r), W) {
                        var s = z._profiles[W].length - 1;
                        z._profiles[W][s] && (z._profiles[W][s].end = o)
                    }
                    N && (a > N ? z.number_of_up_switches += 1 : z.number_of_down_switches += 1), z._profiles[r].push({
                        start: o
                    }), z._playedProfiles[r] = {
                        bitrate: a,
                        width: n[t].width,
                        height: n[t].height
                    }, W = r, N = a
                }), e.events.on(u.Events.adaptiveBufferStarted, function() {
                    z.number_of_buffers += 1, z.abandoned_during_buffer = 1
                }), e.events.on(u.Control.changeQuality, function(e) {
                    "auto" !== e && (z.stayed_on_auto = 0)
                }), e.events.on(u.Events.adaptiveBufferEnded, function() {
                    z.abandoned_during_buffer = 0
                }), e.events.on(u.Events.resize, function(e) {
                    var i = e.width,
                        r = e.height;
                    if (i && r) {
                        var o = t(i, r);
                        n(o)
                    }
                }), e.events.on(u.Events.streamTargetChange, function(e, t, n) {
                    var r = e.profile,
                        o = n[t].bitrate,
                        a = i();
                    if (z._target_profile_id[r] = z._target_profile_id[r] || [], X) {
                        var s = z._target_profile_id[X].length - 1;
                        z._target_profile_id[X][s] && (z._target_profile_id[X][s].end = a)
                    }
                    z._target_profile_id[r].push({
                        start: a
                    }), z._targetProfiles[r] = {
                        bitrate: o,
                        width: n[t].width,
                        height: n[t].height
                    }, X = r
                }), e.events.on(u.Events.forcedQuality, function(e) {
                    z.forced_embed_quality = e
                }), e.events.on(u.Events.alertVisibilityChanged, function(e, t) {
                    return e ? void(z.alert_displayed = 1) : void(z.alert_dismissed = t)
                }), e.events.on(u.Events.cedexisResponseReceived, function(e) {
                    z.cedexis_response_duration = e
                })
            }

            function _(t) {
                var n = {},
                    o = i(),
                    a = (0, c.qualityCompare)("asc"),
                    u = "MediaSourceScanner" === e.telecine.currentScanner,
                    l = "HTMLScanner" === e.telecine.currentScanner,
                    d = [];
                l && (d = e.config.request.files.progressive), u && (d = e.config.request.files.dash.streams);
                var f = r(d).sort(a).map(function(e) {
                    return e.profile
                });
                for (var v in t) t.hasOwnProperty(v) && (n[v] = t[v]);
                n.seconds_in_fullscreen = n._fullscreen.reduce(function(e, t) {
                    var n = t.end || o;
                    return (n - t.start) / 1e3 + e
                }, 0), n.session_playback_duration += G - Q;
                var h = null;
                if (Object.keys(n._embed_size).forEach(function(e) {
                        var t = n._embed_size[e];
                        t > h && (h = e)
                    }), h) {
                    var p = h.split(":"),
                        m = s(p, 2),
                        g = m[0],
                        y = m[1];
                    n.embed_width = parseInt(g, 10), n.embed_height = parseInt(y, 10)
                }
                var b = -1,
                    _ = 0,
                    w = null;
                if (Object.keys(n._profiles).forEach(function(e) {
                        var t = f.indexOf(parseInt(e, 10));
                        t > b && (b = t);
                        var i = n._profiles[e].reduce(function(e, t) {
                            var n = t.end || o;
                            return (n - t.start) / 1e3 + e
                        }, 0);
                        i > _ && (_ = i, w = e)
                    }), n.highest_profile = f[b], n.highest_available_profile = f[f.length - 1], n.most_used_profile = parseInt(w, 10), n.percent_watched = n.session_playback_duration / e.config.video.duration, u && ! function() {
                        var e, t;
                        n.max_speed = Math.round((e = Math).max.apply(e, n._speeds)) / 1e3, n.min_speed = Math.round((t = Math).min.apply(t, n._speeds)) / 1e3;
                        var i = n._speeds.reduce(function(e, t) {
                            return e + t
                        }, 0);
                        n.average_speed = Math.round(i / n._speeds.length) / 1e3;
                        var r = 0,
                            a = null;
                        Object.keys(n._target_profile_id).forEach(function(e) {
                            var t = n._target_profile_id[e].reduce(function(e, t) {
                                var n = t.end || o;
                                return (n - t.start) / 1e3 + e
                            }, 0);
                            t > r && (r = t, a = e)
                        }), n.target_profile = parseInt(a, 10);
                        var s = [];
                        Object.keys(n._playedProfiles).forEach(function(e) {
                            var t = n._playedProfiles[e],
                                i = t.width,
                                r = t.height,
                                o = parseInt(i, 10) * parseInt(r, 10);
                            s.push(o)
                        });
                        var u = s.reduce(function(e, t) {
                                return e + t
                            }, 0) / s.length,
                            c = [];
                        Object.keys(n._targetProfiles).forEach(function(e) {
                            c.push(n._targetProfiles[e].bitrate)
                        });
                        var l = c.reduce(function(e, t) {
                                return e / 1e3 + t / 1e3
                            }, 0) / c.length,
                            d = [];
                        Object.keys(n._targetProfiles).forEach(function(e) {
                            var t = n._targetProfiles[e],
                                i = t.width * t.height;
                            d.push(i)
                        });
                        var f = d.reduce(function(e, t) {
                                return e + t
                            }, 0) / d.length,
                            v = n._playedProfiles[n.most_used_profile],
                            h = v.width,
                            p = v.height,
                            m = h * p,
                            g = Math.min(m, f),
                            y = u * l / (g * Math.min(n.average_speed, l));
                        n.appdex = y, n.rPlayed = u, n.bMax = l, n.rMax = g
                    }(), "undefined" != typeof window.performance && "function" == typeof window.performance.getEntriesByType) {
                    var k = performance.getEntriesByType("resource").filter(function(e) {
                        return ".m4s" === e.name.split("?")[0].substr(-4)
                    });
                    n.ttfb = k.map(function(e) {
                        return e.responseStart - e.connectStart
                    }).reduce(function(e, t) {
                        return e + t
                    }, 0) / (k.length || 1)
                }
                return n.buffer_duration = B, n.buffer_ratio = B / (B + n.session_playback_duration) * 100, Object.keys(n).forEach(function(e) {
                    "_" === e.charAt(0) && delete n[e]
                }), n
            }

            function w() {
                e.events.on(u.Events.configChanged, function() {
                    t()
                })
            }
            var k, E, S, T, x, P, C, L = [],
                O = n(),
                M = e.config.request.urls.blurr,
                A = 3e4,
                F = !1,
                q = !1,
                I = !1,
                B = 0,
                j = !1,
                R = !1,
                D = !1,
                V = !1,
                N = null,
                H = "auto",
                U = {},
                z = h(),
                W = null,
                X = null,
                $ = null,
                Y = !1,
                Q = 0,
                G = 0;
            return g(), y(), b(), w(), {}
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var s, u = e[i.iterator](); !(r = (s = u.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                    } catch (c) {
                        o = !0, a = c
                    } finally {
                        try {
                            !r && u["return"] && u["return"]()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t)) return t;
                    if (i.iterator in Object(t)) return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            u = n(2),
            c = n(21),
            l = n(18),
            d = o(l);
        t["default"] = a, e.exports = t["default"]
    }).call(t, n(1), n(11))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        function t() {
            e.events.on(o.Control.openPopup, function(t, n) {
                var i = "https://" + e.config.player_url,
                    s = i + "/video/" + e.config.video.id,
                    u = 670,
                    c = 545;
                switch (t) {
                    case "login-like":
                        a = (0, r.openWindow)(s + "/login/like", "login", {
                            width: u,
                            height: c
                        }), e.events.fire(o.Events.popupOpened, t);
                        break;
                    case "login-watch-later":
                        a = (0, r.openWindow)(s + "/login/watch-later", "login", {
                            width: u,
                            height: c
                        }), e.events.fire(o.Events.popupOpened, t);
                        break;
                    case "login-private-locked":
                        a = (0, r.openWindow)(s + "/login/private", "login", {
                            width: u,
                            height: c
                        }), e.events.fire(o.Events.popupOpened, t);
                        break;
                    case "purchase":
                        var l = i + "/video/" + (e.config.video.vod.feature_id || e.config.video.id) + "/purchase/vod";
                        n && n.productId && (l += "/" + n.productId), l += "?referrer=" + encodeURIComponent(e.config.request.referrer), a = (0, r.openWindow)(l, "purchase", {
                            width: 790,
                            height: 670
                        }), e.events.fire(o.Events.popupOpened, t)
                }
            }), window.closePopup = function(t) {
                if (a) {
                    try {
                        a.close(), e.events.fire(o.Events.popupClosed, t)
                    } catch (n) {}
                    a = null
                }
            }
        }

        function n() {
            e.config.embed.on_site || (window.confirmPurchase = function(t, n, i) {
                return n ? void e.loadVideo(t) : void(i && e.events.fire(o.Events.playButtonPressed))
            })
        }

        function i() {
            e.config.embed.on_site || (window.confirmLoginAction = function(t, n) {
                e.events.fire(o.Events.userLogIn, n)
            })
        }
        var a = null;
        return t(), n(), i(), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(5),
        o = n(2);
    t["default"] = i, e.exports = t["default"]
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e) {
        function t() {
            return Date.now ? Date.now() : (new Date).getTime()
        }

        function n() {
            p = !1, m = e.telecine ? e.telecine.currentTime : 0, g = 0, y = 0, b = 0, _ = !1
        }

        function i(t, n, r, o) {
            e.verifyConfig().then(function() {
                var a = n;
                a.signature = e.config.request.signature, a.session = e.config.request.session, a.time = e.config.request.timestamp, a.expires = e.config.request.expires;
                var s = JSON.stringify(a),
                    u = "https://" + e.config.player_url + t;
                if (navigator.sendBeacon && navigator.sendBeacon(u, s)) return !0;
                var c = new XMLHttpRequest;
                return c.open("POST", u, !r), c.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), c.withCredentials = !0, c.onload = function() {
                    200 !== c.status && 2 > o && setTimeout(function() {
                        i(t, n, r, o + 1)
                    }, 1e3)
                }, c.send(s), c
            })["catch"](function(e) {})
        }

        function r(t, n, r) {
            var a = e.telecine.currentFile || {},
                s = a.id,
                c = void 0 === s ? 0 : s,
                l = a.mime,
                d = void 0 === l ? u.CodecToMime.h264 : l,
                f = a.metadata;
            f = void 0 === f ? {} : f;
            var v = f.profile,
                h = void 0 === v ? -1 : v;
            if (d === u.CodecToMime.dash) {
                var p = S,
                    m = p.id;
                c = void 0 === m ? 0 : m;
                var y = p.profile;
                h = void 0 === y ? -1 : y
            }
            e.performDelegateAction(u.Delegate.playLog, function(s) {
                var l = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                i(t, {
                    referrer: e.config.request.referrer,
                    embed: !e.config.embed.on_site,
                    context: e.config.embed.context,
                    autoplay: l.continuous || e.config.embed.autoplay,
                    loop: e.config.embed.loop ? 1 : 0,
                    id: e.config.video.id,
                    vodId: e.config.video.vod && e.config.video.vod.id ? e.config.video.vod.id : null,
                    vodSaleId: e.config.video.vod && e.config.video.vod.sale_id ? e.config.video.vod.sale_id : null,
                    sessionTime: (0, o.round)(g),
                    userId: e.config.user.id,
                    userAccountType: e.config.user.account_type,
                    userIsMod: e.config.user.mod ? 1 : 0,
                    ownerId: e.config.video.owner.id,
                    ownerAccountType: e.config.video.owner.account_type,
                    privacy: e.config.video.privacy,
                    rating: e.config.video.rating ? e.config.video.rating.id : null,
                    type: u.ScannerToType[e.telecine.currentScanner],
                    videoFileId: Number.isInteger(Number(c)) ? c : 0,
                    delivery: u.MimeToDelivery[d],
                    profileId: h,
                    quality: a.metadata.quality,
                    duration: (0, o.round)(e.config.video.duration),
                    seconds: (0, o.round)(n)
                }, r)
            })
        }

        function a() {
            !_ && e.config.request.flags.plays && (_ = !0, r("/log/play", 0))
        }

        function c() {
            var n = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
                i = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
                o = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2];
            if (e.config.request.flags.plays) {
                var a = t();
                o && y + E > a || (y = a, o && !e.config.request.flags.partials || p || r("/log/partial", n, i))
            }
        }

        function l(t, n) {
            if (!e.config.request.flags.dnt) {
                n = n || {};
                var r = {
                    referrer: e.config.request.referrer,
                    embed: !e.config.embed.on_site,
                    context: e.config.embed.context,
                    id: e.config.video.id,
                    vodId: e.config.video.vod && e.config.video.vod.id ? e.config.video.vod.id : null,
                    vodSaleId: e.config.video.vod && e.config.video.vod.sale_id ? e.config.video.vod.sale_id : null,
                    userId: e.config.user.id,
                    userAccountType: e.config.user.account_type,
                    ownerId: e.config.video.owner ? e.config.video.owner.id : 0,
                    duration: (0, o.round)(e.config.video.duration),
                    seconds: (0, o.round)(e.telecine.currentTime)
                };
                for (var a in n) n.hasOwnProperty(a) && (r[a] = n[a]);
                i("/log/" + t, r)
            }
        }

        function d() {
            e.events.on(u.Events.playProgress, function(e, n, i) {
                var r = Math.floor(e);
                !p && b + E < t() && (e > m && (g += e - m), m = e), r % w === 0 && c(e)
            }), e.events.on(u.Events.playInitiated, function() {
                a()
            }), e.events.on(u.Events.paused, function(e) {
                c(e)
            }), e.events.on(u.Events.seeked, function(e, t, n) {
                k = e, p || c(k)
            }), e.events.on(u.Events.scrubbingStarted, function() {
                b = t(), p = !0
            }), e.events.on(u.Events.scrubbingEnded, function() {
                m = e.telecine.currentTime, p = !1, c(k)
            }), e.events.on(u.Events.hdButtonPressed, function() {
                c(e.telecine.currentTime)
            }), e.events.on(u.Events.ended, function() {
                g += e.config.video.duration - m;
                var t = !1,
                    n = !1;
                c(e.config.video.duration, t, n)
            }), e.events.on(u.Events.streamChanged, function(e) {
                S = e
            }), (0, s["default"])(function() {
                if (e.telecine && e.telecine.currentTime > 0) {
                    var t = !0,
                        n = !1;
                    c(e.telecine.currentTime, t, n)
                }
            })
        }

        function f() {
            function t(e) {
                return function() {
                    l(e)
                }
            }
            if (!e.config.request.flags.dnt) {
                var n = [{
                    type: "share_press",
                    event: u.Events.shareButtonPressed
                }, {
                    type: "facebook_press",
                    event: u.Events.facebookButtonPressed
                }, {
                    type: "twitter_press",
                    event: u.Events.twitterButtonPressed
                }, {
                    type: "tumblr_press",
                    event: u.Events.tumblrButtonPressed
                }, {
                    type: "email_press",
                    event: u.Events.emailButtonPressed
                }, {
                    type: "embed_press",
                    event: u.Events.embedButtonPressed
                }, {
                    type: "login_success",
                    event: u.Events.userLoggedIn
                }, {
                    type: "airplay",
                    event: u.Events.airPlayActivated
                }, {
                    type: "vod_press",
                    event: u.Events.vodButtonPressed
                }, {
                    type: "collection_press",
                    event: u.Events.collectionsButtonPressed
                }, {
                    type: "email_capture_submitted",
                    event: u.Events.emailCaptureSubmitted
                }];
                n.forEach(function(n) {
                        e.events.on(n.event, t(n.type))
                    }),
                    e.events.on(u.Events.outroDisplayed, function(t) {
                        var n = {
                            outroType: e.config.embed.outro,
                            ownerAccountType: e.config.video.owner.account_type
                        };
                        t.length && (n.outroVideos = t.join(",")), l("outro_displayed", n)
                    }).on(u.Events.outroVideoPressed, function(t) {
                        l("outro_video_press", {
                            ownerAccountType: e.config.video.owner.account_type,
                            videoId: t
                        })
                    }).on(u.Events.likeButtonPressed, function() {
                        l("like_press", {
                            add: !e.config.user.liked
                        })
                    }).on(u.Events.watchLaterButtonPressed, function() {
                        l("watch_later_press", {
                            add: !e.config.user.watch_later
                        })
                    }).on(u.Events.popupOpened, function(e) {
                        0 === e.indexOf("login-") && l("login_attempt")
                    }).on(u.Events.captionsChanged, function(e, t) {
                        return t ? void 0 : e ? void l("text_track_change", {
                            textTrackLanguage: e.language,
                            textTrackKind: e.kind
                        }) : void l("text_track_change")
                    }).on(u.Events.badgePressed, function(e) {
                        1 !== e && 12 !== e || l("badge_press", {
                            badgeId: e
                        })
                    }).on(u.Events.overlayOpened, function(e) {
                        "email-capture" === e && l("email_capture_displayed")
                    }).on(u.Events.overlayClosed, function(e) {
                        "email-capture" === e && l("email_capture_dismissed")
                    })
            }
        }

        function v() {
            e.events.on(u.Events.configChanged, function(e) {
                e && n()
            })
        }

        function h() {
            var t = ["not-supported", "decode", "network", "aborted", "unknown"];
            e.events.on(u.Events.error, function(n, r) {
                t.indexOf(n) >= 0 && i("/log/" + n.replace("-", "") + "_error", {
                    id: e.config.video.id,
                    context: e.config.embed.context
                })
            })
        }
        var p, m, g, y, b, _, w = 30,
            k = 0,
            E = 1e3,
            S = {};
        return n(), d(), f(), v(), h(), e.events.fire(u.Events.statsModuleReady), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(5),
        a = n(18),
        s = i(a),
        u = n(2);
    t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    (function(i, r) {
        "use strict";

        function o(e) {
            function t(t) {
                return new r(function(n, i) {
                    var r = document.createElement("a");
                    r.href = e.config.request.urls.proxy;
                    var o = document.createElement("iframe");
                    o.src = t, o.setAttribute("title", "Vimeo LocalStorage Proxy"), o.setAttribute("aria-hidden", "true"), o.setAttribute("hidden", ""), o.onload = function(t) {
                        var n = (0, c.getOrigin)(e.config.request.urls.proxy);
                        o.contentWindow.postMessage({
                            method: "ping"
                        }, n)
                    }, o.onerror = function(e) {
                        i(e)
                    };
                    var a = setTimeout(function() {
                            i()
                        }, 1e4),
                        s = function u(e) {
                            0 !== t.indexOf(e.origin) || "ready" !== e.data && "ping" !== e.data || (window.removeEventListener("message", u, !1), clearTimeout(a), n(o))
                        };
                    window.addEventListener("message", s, !1), document.body.appendChild(o)
                })
            }

            function n() {
                T && !d && (d = t(e.config.request.urls.proxy))
            }

            function i(t) {
                return d.then(function(n) {
                    var i = (0, c.getOrigin)(e.config.request.urls.proxy);
                    return n.contentWindow.postMessage(t, i), n
                })["catch"](function(e) {})
            }

            function o(t) {
                e.config.embed.on_site && window.postMessage(t, window.location.origin)
            }

            function f(t, n) {
                if (d) {
                    var r = {
                        method: "set",
                        key: "sync_" + t,
                        val: n,
                        session: e.config.request.session
                    };
                    return i(r), void o(r)
                }
                try {
                    window.localStorage.setItem("sync_" + t, JSON.stringify(n))
                } catch (a) {}
            }

            function v(t, n) {
                l.indexOf(t) >= 0 && (e.config.request.cookie[t] = n);
                var i = [];
                l.indexOf(t) >= 0 && null !== n && i.push(t + "=" + n);
                var r = h(l);
                for (var o in r) o in r && null !== r[o] && o !== t && i.push(o + "=" + r[o]);
                (0, u.setCookie)("player", '"' + i.join("&") + '"', e.config.request.cookie_domain)
            }

            function h(e) {
                var t = (0, u.getCookie)("player");
                if (!t) return null;
                t = t.substring(1, t.length - 1);
                var n = {};
                t.split("&").forEach(function(e) {
                    e = e.split("="), n[e[0]] = (0, u.convertCookieValue)(decodeURIComponent(e[1] || ""))
                });
                var i = [].concat(e),
                    r = i.reduce(function(e, t) {
                        if (t in n) {
                            var i = parseFloat(n[t]);
                            return e[t] = isNaN(i) || "quality" === t ? n[t] : i, e
                        }
                        return e[t] = null, e
                    }, {});
                return 1 === i.length ? r[e] : r
            }

            function p(e, t) {
                t = (0, u.convertCookieValue)(t), f(e, t), v(e, t)
            }

            function m(t, n) {
                var i = !0;
                switch (t) {
                    case "sync_quality":
                        e.events.fire(s.Control.changeQuality, n, i);
                        break;
                    case "sync_volume":
                        e.events.fire(s.Control.changeVolume, n, i);
                        break;
                    case "sync_captions":
                        if (null === n) {
                            e.events.fire(s.Control.turnCaptionsOff, i);
                            break
                        }
                        e.events.fire(s.Control.turnCaptionsOn, n, i);
                        break;
                    case "sync_login":
                        g(n);
                        break;
                    case "sync_active":
                        null !== n && n !== e.config.request.session && e.config.embed.autopause && e.events.fire(s.Events.becameInactive)
                }
            }

            function g(t) {
                x > 4 || (x++, t && !e.config.user.logged_in ? e.events.fire(s.Events.userLogIn) : !t && e.config.user.logged_in && e.events.fire(s.Events.userLoggedOut))
            }

            function y() {
                p("login", !!e.config.user.logged_in)
            }

            function b() {
                e.events.on(s.Events.qualityChanged, function(e, t) {
                    t || p("quality", e)
                })
            }

            function _() {
                e.events.on(s.Events.volumeChanged, function(t, n) {
                    e.config.request.cookie.volume = (0, u.convertCookieValue)(t), n || p("volume", t)
                })
            }

            function w() {
                e.events.on(s.Events.captionsChanged, function(t, n) {
                    if (t) {
                        var i = t.language + "." + t.kind;
                        return e.config.request.cookie.captions = (0, u.convertCookieValue)(i), void(n || p("captions", i))
                    }
                    e.config.request.cookie.captions = null, n || p("captions", null)
                })
            }

            function k() {
                e.events.on(s.Events.playButtonPressed, function() {
                    p("active", e.config.request.session), e.events.fire(s.Events.becameActive)
                }), e.events.on([s.Events.pauseButtonPressed, s.Events.ended], function() {
                    h("active") === e.config.request.session && p("active", null)
                })
            }

            function E() {
                e.events.on(s.Events.userLoggedIn, function() {
                    p("login", !0)
                })
            }

            function S() {
                return T ? void window.addEventListener("message", function(t) {
                    var n = (0, c.getOrigin)(e.config.request.urls.proxy);
                    t.origin === n && "object" === a(t.data) && "key" in t.data && "newValue" in t.data ? m(t.data.key, t.data.newValue) : t.origin === window.location.origin && t.data.session !== e.config.request.session && m(t.data.key, t.data.val)
                }, !1) : void window.addEventListener("storage", function(e) {
                    if (0 === e.key.indexOf("sync_") && e.oldValue !== e.newValue && window.localStorage.getItem(e.key) === e.newValue) try {
                        m(e.key, JSON.parse(e.newValue))
                    } catch (t) {}
                }, !1)
            }
            var T = 0 !== e.config.request.urls.proxy.indexOf(window.location.origin),
                x = 0;
            return b(), _(), w(), k(), E(), n(), S(), {
                reset: y
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = "function" == typeof i && "symbol" == typeof i.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof i && e.constructor === i ? "symbol" : typeof e
            },
            s = n(2),
            u = n(73),
            c = n(5),
            l = ["quality", "volume", "captions"],
            d = null;
        t["default"] = o, e.exports = t["default"]
    }).call(t, n(1), n(3))
}, function(e, t, n) {
    (function(i, r) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            function n() {
                e.events.fire(y.Events.bufferStarted), _e = !0, be = !0
            }

            function o() {
                be && (e.events.fire(y.Events.bufferEnded), _e = !1, be = !1)
            }

            function a() {
                return ae.classList.remove("invisible"), Pe ? (e.events.fire(y.Events.error, Pe), void v()) : (pe || (e.events.fire(y.Events.playInitiated), n(), pe = !0, se.play(), !e.config.user.progress || le || !e.config.embed.settings.playbar || e.config.embed.autoplay || e.config.embed.time || (se.currentTime = e.config.user.progress, e.config.user.progress = 0)), ve = !0, he = !0, de && (Le = !0, e.events.fire(y.Control.forceFullscreen)), void(Te && s()))
            }

            function s() {
                Ee || Ce || (_e = !1, Se = !1, he && se.paused && (re && (se.currentTime = re, re = null), se.play()))
            }

            function c(e, t) {
                var n = e.length - 1;
                if (e.length > 1)
                    for (var i = 0, r = e.length; r > i; i++)
                        if (e.start(i) <= t && e.end(i) >= t) {
                            n = i;
                            break
                        }
                return n
            }

            function d(t) {
                if (!xe && se.buffered && se.buffered.length > 0) {
                    t = t || se.currentTime;
                    var n = c(se.buffered, t),
                        i = se.buffered.end(n),
                        r = i / se.duration;
                    if (e.events.fire(y.Events.loadProgress, i, se.duration, r), be && he && i === se.duration) return void s()
                }
            }

            function v() {
                oe.style.backgroundImage = "url(" + oe.getAttribute("data-thumb") + ")"
            }

            function m(t) {
                for (var n = t.target, i = n.activeCues, r = [], o = void 0, a = 0, s = i.length; s > a; a++) "" !== i[a].text.replace(/^\s+|\s+$/gm, "") && (o = document.createElement("span"), o.appendChild(i[a].getCueAsHTML()), r.push({
                    html: o.innerHTML.replace("\n", "<br>"),
                    text: i[a].text
                }));
                e.events.fire(y.Events.cueChanged, n, r)
            }

            function _(t, n) {
                t !== n.metadata.cdn && (n.src = e.config.request.files.dash.cdns[t].url, n.metadata.cdn = t, n.metadata.origin = e.config.request.files.dash.cdns[t].origin), n.metadata.cedexis = 1
            }

            function k() {
                return new i(function(t, n) {
                    var i = e.config.request.urls.cedexis,
                        r = JSON.parse(window.localStorage.getItem("cdn"));
                    if (r && r.fingerprint === e.config.request.fingerprint && (new Date).getTime() <= r.timestamp) return void t(r.value);
                    var o = (new Date).getTime();
                    t((0, p.request)(i, {
                        withCredentials: !1
                    }).then(function(t) {
                        e.events.fire(y.Events.cedexisResponseReceived, (new Date).getTime() - o);
                        var n = JSON.parse(t),
                            i = n.providers,
                            r = i[0].provider,
                            a = {
                                fingerprint: e.config.request.fingerprint,
                                value: r,
                                timestamp: (new Date).getTime() + e.config.request.cedexis_cache_ttl
                            };
                        return e.config.request.cedexis_cache_ttl > 0 && window.localStorage.setItem("cdn", JSON.stringify(a)), r
                    }))
                })
            }

            function S() {
                var t = se.video.files.getFileById("dash-" + e.config.video.id);
                t && (e.config.request.flags.in_cedexis_test && (t.metadata.inCedexisTest = !0), e.config.request.flags.cedexis && (t.metadata.cedexis = 2, k().then(function(e) {
                    return _(e, t), e
                })["catch"](function(e) {})))
            }

            function x() {
                se = new E["default"](ae, [T["default"], P["default"], L["default"]], {
                    externalDisplays: [M["default"]],
                    swfScanner: {
                        swfUrl: e.config.request.urls.flideo
                    },
                    mediaSourceScanner: {
                        startingBandwidthThreshold: e.config.request.test ? e.config.request.test.data.bandwidth_threshold : null
                    }
                }), se.on("scannerchange", function() {
                    C(), setTimeout(function() {
                        e.events.fire(se.supportsSettingVolume ? y.Control.enableVolume : y.Control.disableVolume), e.events.fire(se.supportsTextTracks ? y.Control.enableCaptions : y.Control.disableCaptions)
                    }, 0)
                }), se.on("currentfilechange", function(t) {
                    t.mime === y.CodecToMime.hls && e.events.fire(y.Control.disableHd);
                    var n = t.metadata.quality;
                    if (t.mime === y.CodecToMime.dash) {
                        var i = e.config.request.files.dash.streams.map(function(e) {
                            return e.quality
                        });
                        n = W(e.config.embed.quality, i) || "auto", X(n)
                    }
                    e.events.fire(y.Events.qualityChanged, n, !0)
                }), se.on("streamchange", function(t) {
                    var n = t.index,
                        i = t.streams,
                        r = e.config.request.files.dash.streams[n];
                    e.events.fire(y.Events.streamChanged, r, n, i)
                }), se.on("streambufferstart", function() {
                    e.events.fire(y.Events.adaptiveBufferStarted)
                }), se.on("streambufferend", function() {
                    e.events.fire(y.Events.adaptiveBufferEnded)
                }), se.on("bandwidth", function(t) {
                    e.events.fire(y.Events.adaptiveBandwidth, t)
                }), se.on("alert", function(e) {
                    var t = void 0;
                    switch (e) {
                        case "streamstudder":
                            if (Ae) return;
                            t = u["default"].render("stream_studder")
                    }
                    ce.message = t, ce.show()
                })
            }

            function C() {
                var t = "none";
                ("metadata" === e.config.request.flags.preload_video || de || f["default"].iOS >= 8) && (t = "metadata"), "auto" === e.config.request.flags.preload_video && (t = "metadata", "MediaSourceScanner" === se.currentScanner && (t = "auto")), se.preload = t, e.events.on(y.Events.mousedOver, function() {
                    "metadata_on_hover" !== e.config.request.flags.preload_video || pe || e.verifyConfig().then(function() {
                        return se.preload = "metadata", !0
                    })["catch"](function(e) {})
                })
            }

            function O() {
                se.on("loadedmetadata", function(t) {
                    Te = !0;
                    var n = se.duration;
                    isFinite(n) && n > 0 && (e.config.video.duration = n), e.config.video.video_width = se.videoWidth, e.config.video.video_height = se.videoHeight
                }), se.on("loadeddata", function() {
                    0 === se.currentTime && se.paused && o()
                }), se.on("durationchange", function(t) {
                    var n = se.duration;
                    isFinite(n) && (e.config.video.duration > 0 && (n < e.config.video.duration - 1 || n > e.config.video.duration + 1) || (e.config.video.duration = n))
                }), se.on("waiting", function() {
                    ke || n()
                }), se.on("canplay", function() {
                    ge = !0, o(), (e.config.embed.autoplay || he || ve && !pe && me) && s()
                }), se.on("canplaythrough", function() {
                    ye = !0, o(), !ve || pe || me || s(), (_e || he && se.paused) && s()
                }), se.on("progress", function(e) {
                    d()
                })
            }

            function A() {
                e.events.on(y.Events.playInitiated, function() {
                    t.classList.remove("invisible")
                }).on(y.Events.playButtonPressed, a).on(y.Events.pauseButtonPressed, function() {
                    he = !1, se.pause()
                }).on(y.Events.becameInactive, function() {
                    window.location.search.indexOf("autopause=0") < 0 && !se.paused && !e.config.embed.settings.background && (he = !1, e.events.fire(y.Events.pauseButtonPressed))
                }), se.on("play", function(t) {
                    return xe = !1, pe || (!me || ge) && (me || ye) ? (ae.classList.remove("invisible"), void e.events.fire(y.Events.played, se.currentTime)) : (e.events.fire(y.Events.playInitiated), pe = !0, ve = !0, void(he = !0))
                }), se.on("pause", function(t) {
                    !pe || _e || Ee || Se || e.events.fire(y.Events.paused, se.currentTime, se.ended)
                }), se.on("playing", function(t) {
                    pe || (e.events.fire(y.Events.playInitiated), pe = !0), d(), we = !0
                }), se.on("timeupdate", function(t) {
                    var i = se.currentTime;
                    if (we && be && i > 0 && (we = !1, o()), se.buffered.length > 0 && !be) {
                        var r = c(se.buffered, i),
                            a = se.buffered.end(r);
                        if (!Le && i > 0 && i < se.duration && a === i) return void n()
                    }
                    if (!xe) {
                        var s = se.duration,
                            u = i / s;
                        e.events.fire(y.Events.playProgress, i, s, u), re && i > re && (re = null)
                    }
                    ue && (ue.classList.add("hidden"), ue = null)
                }), se.on("ended", function(t) {
                    Ee || (e.config.embed.loop ? se.play() : (Le && e.events.fire(y.Events.fullscreenButtonPressed), e.events.fire(y.Events.ended), he = !1, ve = !1))
                })
            }

            function F() {
                ce = new h["default"](t.parentElement), ce.on("show", function(t) {
                    e.events.fire(y.Events.alertVisibilityChanged, !0, t)
                }), ce.on("hide", function(t) {
                    var n = t.target,
                        i = n && "function" == typeof n.getAttribute;
                    if (i) switch (n.getAttribute("data-context")) {
                        case "suggestion":
                            e.events.fire(y.Control.changeQuality, "auto"), t = "suggestion";
                            break;
                        default:
                            t = "close"
                    }(i || "qualitymenuauto" === t) && (Ae = !0), e.events.fire(y.Events.alertVisibilityChanged, !1, t)
                })
            }

            function q() {
                var t = !1;
                (0, g["default"])(function() {
                    t = !0
                }), se.on("error", function(n) {
                    if (!t) switch (n.name) {
                        case "FilesNotPlayable":
                            e.events.fire(y.Events.error, "not-supported"), Pe = "not-supported";
                            break;
                        case "TextTracksNotSupported":
                            e.events.fire(y.Control.disableCaptions);
                            break;
                        case "HTMLSourceNotSupported":
                            e.events.fire(y.Events.error, "not-supported", {
                                "final": !1
                            });
                            break;
                        case "HTMLDecode":
                            e.events.fire(y.Events.error, "decode", {
                                "final": !1
                            });
                            break;
                        case "HTMLNetwork":
                            e.events.fire(y.Events.error, "network");
                            break;
                        case "HTMLUnknown":
                            e.events.fire(y.Events.error, "unknown")
                    }
                })
            }

            function I() {
                e.events.on(y.Control.changeLoop, function(t) {
                    e.config.embed.loop = !!t, se.loop = !!t
                }), e.events.fire(y.Control.changeLoop, e.config.embed.loop)
            }

            function B() {
                e.events.on(y.Events.scrubbingStarted, function() {
                    n(), he = !se.paused, Ee = !0, se.pause()
                }), e.events.on(y.Events.scrubbingEnded, function(e) {
                    Ee = !1, e || s()
                }), e.events.on(y.Control.seek, function(t, n) {
                    n || (n = (se.duration || e.config.video.duration) * (0, p.limit)(t, 0, 1)), n = (0, p.limit)(n, 0, se.duration || e.config.video.duration), pe || (e.events.fire(y.Events.playButtonPressed), pe = !0, ve = !0, he = !0), se.currentTime = n
                }), se.on("seeking", function() {
                    ke = !0
                }, !1), se.on("seeked", function() {
                    d();
                    var t = se.currentTime,
                        n = se.duration;
                    e.events.fire(y.Events.seeked, t, n, t / n), ke = !1
                }, !1)
            }

            function j() {
                e.events.on(y.Control.changeVolume, function(t, n, i) {
                    i && (t += se.volume), se.volume = (0, p.limit)(t, 0, 1), e.events.fire(y.Events.volumeChanged, (0, p.limit)(t, 0, 1), n)
                });
                var t = e.config.request.cookie.volume;
                e.config.embed.mute && (t = 0), e.events.fire(y.Control.changeVolume, t, !0)
            }

            function R() {
                e.events.on(y.Control.changeQuality, function(t, n) {
                    if (se.video.currentFile.mime === y.CodecToMime.dash) n = !0, X(t);
                    else {
                        var i = r(e.telecine.video.files).filter(function(e) {
                            return parseInt(e.metadata.quality, 10) <= parseInt(t, 10)
                        });
                        i.sort((0, b.qualityCompare)()), i.length > 0 && (xe = !0, se.video.currentFile = i[0])
                    }
                    "auto" === t && ce.hide("qualitymenuauto"), e.events.fire(y.Events.qualityChanged, t, n)
                })
            }

            function D() {
                e.events.on(y.Events.overlayOpened, function() {
                    Ce = !0, pe && !Oe && (he = !se.paused, se.pause())
                }), e.events.on(y.Events.overlayClosed, function() {
                    Ce = !1, he && !Oe && s()
                })
            }

            function V() {
                e.events.on(y.Events.popupOpened, function(e) {
                    pe && !Oe && (he = !se.paused, se.pause())
                }), e.events.on(y.Events.popupClosed, function(e) {
                    Oe || s()
                })
            }

            function N() {
                e.events.on(y.Events.didEnterFullscreen, function(t, n) {
                    ae.classList.remove("hide-webkit-controls"), t || (pe || f["default"].browser.safari || (se.poster = oe.getAttribute("data-thumb")), Le = !0, setTimeout(function() {
                        se.video.textTracks.forEach(function(e) {
                            "hidden" === e.mode && (e.mode = "showing")
                        })
                    }, 500)), n || !f["default"].windowsPhone || f["default"].browser.edge || e.events.fire(y.Control.toggleNativeControls, !0)
                }), e.events.on(y.Events.didExitFullscreen, function(e) {
                    se.poster = "", pe || ae.classList.add("invisible"), Le = !1, fe && ae.classList.add("hide-webkit-controls"), se.video.textTracks.forEach(function(e) {
                        "showing" === e.mode && (e.mode = "hidden")
                    })
                }), e.events.on(y.Events.playInitiated, function() {
                    se.poster = ""
                })
            }

            function H() {
                e.events.on(y.Control.toggleNativeControls, function(e) {
                    return e ? (se.controls = !0, void t.classList.add("native-controls")) : (se.controls = !1, void t.classList.remove("native-controls"))
                })
            }

            function U() {
                e.events.on(y.Events.signatureExpired, function() {
                    re = se.currentTime
                }), e.events.on(y.Events.requestConfigReloaded, function(e) {
                    var t = se.currentTime;
                    G(), se.currentTime = t
                }), e.events.on(y.Events.configChanged, function(e) {
                    G(), te()
                })
            }

            function z() {
                (0, l["default"])(ae).on("transitionend", function(e) {
                    "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && ae.classList.remove("transition")
                }, !1), e.events.on(y.Control.reset, function(t) {
                    xe = !0, se.paused || (se.pause(), e.events.fire(y.Events.paused, se.currentTime)), v(), ae.classList.add("transition"), ae.classList.add("invisible"), t && (Te = !1), pe = !1, he = !1, Pe = null, setTimeout(function() {
                        se.currentTime = 0
                    }, 300)
                })
            }

            function W(t) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
                return e.config.embed.on_site || f["default"].android || f["default"].iOS || f["default"].windowsPhone || e.config.video.vod || !t ? null : n.length && -1 === n.indexOf(t) ? null : (e.events.fire(y.Events.forcedQuality, t), t)
            }

            function X(t) {
                if ("auto" === t) return void(se.video.currentFile.restrictedStreamIndexes = []);
                var n = e.config.request.files.dash.streams.map(function(e) {
                    return e.quality
                }).indexOf(t); - 1 !== n && (se.video.currentFile.restrictedStreamIndexes = [n])
            }

            function $() {
                var t = e.config.request.files,
                    n = r(t.progressive).filter((0, b.hfrFilter)(t.progressive)),
                    i = n.some(b.isHD);
                f["default"].mobileAndroid && (i = !1);
                var o = "720p";
                if (i) {
                    var a = r(n).map(b.getIdentifier); - 1 !== a.indexOf("1080p") && -1 === a.indexOf("720p") && (o = "1080p")
                }
                var s = e.config.request.cookie.hd || e.config.video.default_to_hd ? o : "360p",
                    u = n.map(function(e) {
                        return e.quality
                    }),
                    c = W(e.config.embed.quality, u),
                    l = e.config.request.cookie.quality || c || s,
                    d = (0, b.getProgressiveFiles)({
                        files: t.progressive,
                        preference: l,
                        priorityOffset: 2
                    });
                if (t.hls && (f["default"].iPhone || f["default"].iPad)) {
                    var v = t.hls.default_cdn,
                        h = t.hls.cdns[v].url;
                    d.push({
                        id: "hls-" + e.config.video.id,
                        src: h,
                        mime: y.CodecToMime.hls,
                        priority: 2,
                        metadata: {
                            cdn: v,
                            origin: t.hls.cdns[v].origin,
                            quality: "sd"
                        }
                    })
                }
                if (t.dash) {
                    var p = t.dash.default_cdn;
                    d.push({
                        id: "dash-" + e.config.video.id,
                        src: t.dash.cdns[p].url,
                        mime: y.CodecToMime.dash,
                        priority: 1,
                        metadata: {
                            cdn: p,
                            origin: t.dash.cdns[p].origin,
                            quality: "sd"
                        }
                    })
                }
                return e.config.video.hd && !i && e.events.fire(y.Control.disableHd), d
            }

            function Y() {
                return "text_tracks" in e.config.request ? e.config.request.text_tracks.map(function(e) {
                    return {
                        id: e.id,
                        src: e.url,
                        kind: e.kind,
                        label: e.label,
                        language: e.lang
                    }
                }) : []
            }

            function Q() {
                var t = e.config.request.files,
                    n = t.hls.default_cdn;
                if (t.hls) {
                    var i = t.hls.cdns[n].url;
                    return t.hls.cdns[n].captions && (i = t.hls.cdns[n].captions), {
                        src: i,
                        mime: y.CodecToMime.hls,
                        metadata: {
                            cdn: e.config.request.files.hls.cdn,
                            origin: e.config.request.files.hls.origin,
                            quality: "sd"
                        }
                    }
                }
                return null
            }

            function G() {
                var t = $(),
                    n = Y();
                if (se.video && se.video.id === "" + e.config.video.id) return t.forEach(function(e) {
                    var t = se.video.files.getFileById(e.id);
                    t && (t.src = e.src)
                }), void n.forEach(function(e) {
                    var t = se.video.textTracks.getTrackById(e.id);
                    t && (t.src = e.src)
                });
                if (se.video = {
                        id: e.config.video.id,
                        title: e.config.video.title,
                        subtitle: "from " + e.config.video.owner.name,
                        files: t,
                        textTracks: n,
                        externalDisplayFiles: {
                            AirPlay: Q()
                        },
                        metadata: {
                            thumbnail: e.config.video.thumbs[640]
                        }
                    }, 0 === n.length) {
                    var i = !0;
                    return void e.events.fire(y.Control.turnCaptionsOff, i)
                }
                if (se.video.textTracks.forEach(function(t) {
                        t.on("cuechange", m), t.on("modechange", function(n) {
                            Le && "showing" === t.mode && e.events.fire(y.Events.captionsChanged, t)
                        })
                    }), null === e.config.request.cookie.captions || "null" === e.config.request.cookie.captions) return void e.events.fire(y.Control.turnCaptionsOff);
                var r = !0;
                e.events.fire(y.Control.turnCaptionsOn, e.config.request.cookie.captions, r)
            }

            function K() {
                e.config.embed.time > 0 && (se.currentTime = e.config.embed.time, e.config.embed.time = 0)
            }

            function J() {
                e.events.on(y.Control.turnCaptionsOn, function(t, n) {
                    if (!Me || Me.id !== t) {
                        var i = se.video.textTracks.getTrackById(t),
                            r = !0;
                        if (!i) {
                            var o = (0, w["default"])(t, se.video.textTracks);
                            i = o.track, r = o.exactMatch
                        }
                        i !== Me && setTimeout(function() {
                            se.video.textTracks.forEach(function(e) {
                                e.mode = e === i ? "hidden" : "disabled"
                            }), e.events.fire(y.Events.captionsChanged, i, n || !r), Me = i
                        }, 0)
                    }
                }).on(y.Control.turnCaptionsOff, function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
                    setTimeout(function() {
                        se.video.textTracks.forEach(function(e) {
                            e.mode = "disabled"
                        }), e.events.fire(y.Events.cueChanged), Me && (Me = null, e.events.fire(y.Events.captionsChanged, null, t))
                    }, 0)
                })
            }

            function Z() {
                se.on("externaldisplayavailable", function(t) {
                    var n = t.type;
                    switch (n) {
                        case "AirPlay":
                            e.events.fire(y.Events.airPlayAvailable)
                    }
                }), se.on("externaldisplayunavailable", function(t) {
                    var n = t.type;
                    switch (n) {
                        case "AirPlay":
                            e.events.fire(y.Events.airPlayNotAvailable)
                    }
                }), se.on("externaldisplayactivated", function(t) {
                    var n = t.type;
                    switch (Oe = !0, n) {
                        case "AirPlay":
                            e.events.fire(y.Events.airPlayActivated)
                    }
                }), se.on("externaldisplaydeactivated", function(t) {
                    var n = t.type;
                    switch (Oe = !1, n) {
                        case "AirPlay":
                            e.events.fire(y.Events.airPlayDeactivated)
                    }
                }), e.events.on(y.Events.airPlayButtonPressed, function() {
                    se.showExternalDisplayPicker("AirPlay")
                })
            }

            function ee() {
                se.on("play", function() {
                    return se.supportsPresentationMode("picture-in-picture") ? void e.events.fire(y.Events.pictureInPictureAvailable) : void e.events.fire(y.Events.pictureInPictureNotAvailable)
                }), se.on("presentationmodechange", function(t) {
                    e.events.fire("picture-in-picture" === t ? y.Events.pictureInPictureActivated : y.Events.pictureInPictureDeactivated), se.video.textTracks.forEach(function(e) {
                        "picture-in-picture" === t && "hidden" === e.mode && (e.mode = "showing"), "inline" === t && "showing" === e.mode && (e.mode = "hidden")
                    })
                }), e.events.on(y.Control.activatePictureInPicture, function() {
                    se.supportsPresentationMode("picture-in-picture") && (se.presentationMode = "picture-in-picture")
                }), e.events.on(y.Control.deactivatePictureInPicture, function() {
                    se.supportsPresentationMode("picture-in-picture") && (se.presentationMode = "inline")
                })
            }

            function te() {
                e.config.embed.autoplay && (ve = !0, e.events.fire(y.Events.playButtonPressed))
            }

            function ne() {
                e.events.on(y.Events.enteredTinyMode, function() {
                    le = !0
                }).on([y.Events.enteredMiniMode, y.Events.enteredNormalMode], function() {
                    le = !1
                })
            }

            function ie() {
                e.events.on(y.Control.setFilter, function(e) {
                    return oe.setAttribute("data-filter", e)
                })
            }
            var re, oe = t.querySelector(".video"),
                ae = t.querySelector(".telecine"),
                se = null,
                ue = null,
                ce = null,
                le = !1,
                de = f["default"].mobileAndroid || f["default"].android && !f["default"].browser.chrome && !f["default"].browser.firefox && !f["default"].browser.opera || f["default"].windowsPhone || f["default"].iOS >= 8 && !f["default"].iPad,
                fe = f["default"].iOS >= 8 && !f["default"].iPad,
                ve = !1,
                he = !1,
                pe = !1,
                me = !0,
                ge = !1,
                ye = !1,
                be = !1,
                _e = !1,
                we = !1,
                ke = !1,
                Ee = !1,
                Se = !1,
                Te = !1,
                xe = !0,
                Pe = null,
                Ce = !1,
                Le = !1,
                Oe = !1,
                Me = null,
                Ae = !1;
            return ae.classList.add("invisible"), fe && ae.classList.add("hide-webkit-controls"), x(), C(), O(), A(), F(), q(), I(), B(), j(), R(), D(), V(), N(), H(), U(), z(), J(), K(), Z(), ee(), ne(), ie(), G(), S(), e.ready().then(function() {
                return setTimeout(function() {
                    return te()
                }, 0), null
            })["catch"](function(e) {}), e.events.fire(y.Events.videoModuleReady), {
                telecine: se
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(9),
            u = o(s),
            c = n(8),
            l = o(c),
            d = n(6),
            f = o(d),
            v = n(72),
            h = o(v),
            p = n(5),
            m = n(18),
            g = o(m),
            y = n(2),
            b = n(21),
            _ = n(19),
            w = o(_),
            k = n(61),
            E = o(k),
            S = (n(14), n(59)),
            T = o(S),
            x = n(26),
            P = o(x),
            C = n(60),
            L = o(C),
            O = n(25),
            M = o(O);
        t["default"] = a, e.exports = t["default"]
    }).call(t, n(3), n(11))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        a = n(9),
        s = i(a),
        u = n(4),
        c = i(u),
        l = n(8),
        d = i(l),
        f = function() {
            function e(t) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    i = n.displayTimeout,
                    o = void 0 === i ? 0 : i,
                    a = n.label,
                    s = void 0 === a ? "Alert" : a;
                r(this, e), c["default"].make(this), this._container = t, this._visible = !1, this._message = null, this._alert = null, this._alertLabel = s;
                var u = Math.round(o / 1e3);
                0 !== u && (this._alertLabel = s + " Will be dismissed in " + u + " seconds"), this._displayTimer = null, this._displayTimeout = o, this._renderTemplate(), this._attachEvents()
            }
            return o(e, [{
                key: "show",
                value: function(e) {
                    var t = this;
                    if (this._visible !== !0) {
                        clearTimeout(this._displayTimer), this._alert.classList.remove("hidden"), this._alert.removeAttribute("hidden"), window.requestAnimationFrame(function() {
                            t._alert.classList.add("in")
                        });
                        var n = this._alert.querySelector("[data-alert-autofocus]") || this._alert;
                        n.focus(), this._visible = !0, this.fire("show", e), 0 !== this._displayTimeout && (this._displayTimer = setTimeout(function() {
                            t.hide("timeout")
                        }, this._displayTimeout))
                    }
                }
            }, {
                key: "hide",
                value: function(e) {
                    var t = this;
                    this._visible !== !1 && (clearTimeout(this._displayTimer), this._alert.classList.add("leaving"), window.requestAnimationFrame(function() {
                        var e = t;
                        t._setHideAttributes(), (0, d["default"])(t._alert).on("transitionend", function n(t) {
                            "opacity" === t.propertyName && (e._alert.classList.remove("leaving"), e._alert.classList.add("hidden"), e._alert.setAttribute("hidden", ""), (0, d["default"])(e._alert).off("transitionend", n))
                        })
                    }), this._visible = !1, this.fire("hide", e))
                }
            }, {
                key: "_setHideAttributes",
                value: function() {
                    this._alert.classList.remove("in")
                }
            }, {
                key: "_renderTemplate",
                value: function() {
                    this._alert || (this._alert = document.createElement("div"), this._alert.setAttribute("role", "alertdialog"), this._alert.setAttribute("aria-label", this._alertLabel), this._alert.setAttribute("aria-atomic", "true"), this._alert.classList.add("player-alert"), this._alert.classList.add("hidden"), this._alert.setAttribute("hidden", ""), this._container.appendChild(this._alert), this._setHideAttributes()), this._message instanceof HTMLElement ? (this._alert.innerHTML = "", this._alert.appendChild(this._message)) : (this._alert.textContent = this._message, this._alert.innerHTML = this._message);
                    var e = document.createElement("button");
                    e.setAttribute("data-close", ""), e.setAttribute("aria-label", "Close alert"), e.classList.add("close"), e.innerHTML = s["default"].render("icon_close"), this._alert.appendChild(e)
                }
            }, {
                key: "_attachEvents",
                value: function() {
                    var e = this;
                    (0, d["default"])(this._alert).on("click", "[data-close]", function(t) {
                        e.hide(t)
                    })
                }
            }, {
                key: "visible",
                get: function() {
                    return this._visible
                }
            }, {
                key: "message",
                get: function() {
                    return this._message
                },
                set: function(e) {
                    e instanceof HTMLElement && this._message && e.textContent === this._message.textContent || e !== this._message && (this._message = e, this._renderTemplate())
                }
            }]), e
        }();
    t["default"] = f, e.exports = t["default"]
}, function(e, t) {
    "use strict";

    function n(e) {
        return e === !0 || e === !1 ? Number(e) : "null" === e ? null : e
    }

    function i(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? document.cookie : arguments[1];
        return t && "" !== t ? t.split(";").reduce(function(t, n) {
            return n = n.trim(), 0 === n.indexOf(e + "=") ? decodeURIComponent(n.substr(e.length + 1)) : t
        }, null) : null
    }

    function r(e, t, i) {
        var r = new Date;
        r.setFullYear(r.getFullYear() + 1), r = r.toGMTString(), t = n(t);
        var o = e + "=" + t + ";";
        o += "expires=" + r + ";", o += "path=/;", o += "domain=" + i + ";", document.cookie = o
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.convertCookieValue = n, t.getCookie = i, t.setCookie = r
}, function(e, t) {
    ! function() {
        function t(e, t, n) {
            var i = "blur" == t || "focus" == t;
            e.element.addEventListener(t, n, i)
        }

        function n(e) {
            e.preventDefault(), e.stopPropagation()
        }

        function i(e) {
            return l ? l : l = e.matches ? e.matches : e.webkitMatchesSelector ? e.webkitMatchesSelector : e.mozMatchesSelector ? e.mozMatchesSelector : e.msMatchesSelector ? e.msMatchesSelector : e.oMatchesSelector ? e.oMatchesSelector : c.matchesSelector
        }

        function r(e, t, n) {
            if ("_root" == t) return n;
            if (e !== n) return i(e).call(e, t) ? e : e.parentNode ? (d++, r(e.parentNode, t, n)) : void 0
        }

        function o(e, t, n, i) {
            v[e.id] || (v[e.id] = {}), v[e.id][t] || (v[e.id][t] = {}), v[e.id][t][n] || (v[e.id][t][n] = []), v[e.id][t][n].push(i)
        }

        function a(e, t, n, i) {
            if (v[e.id])
                if (t) {
                    if (!i && !n) return void(v[e.id][t] = {});
                    if (!i) return void delete v[e.id][t][n];
                    if (v[e.id][t][n])
                        for (var r = 0; r < v[e.id][t][n].length; r++)
                            if (v[e.id][t][n][r] === i) {
                                v[e.id][t][n].splice(r, 1);
                                break
                            }
                } else
                    for (var o in v[e.id]) v[e.id].hasOwnProperty(o) && (v[e.id][o] = {})
        }

        function s(e, t, n) {
            if (v[e][n]) {
                var i, o, a = t.target || t.srcElement,
                    s = {},
                    u = 0,
                    l = 0;
                d = 0;
                for (i in v[e][n]) v[e][n].hasOwnProperty(i) && (o = r(a, i, h[e].element), o && c.matchesEvent(n, h[e].element, o, "_root" == i, t) && (d++, v[e][n][i].match = o, s[d] = v[e][n][i]));
                for (t.stopPropagation = function() {
                        t.cancelBubble = !0
                    }, u = 0; d >= u; u++)
                    if (s[u])
                        for (l = 0; l < s[u].length; l++) {
                            if (s[u][l].call(s[u].match, t) === !1) return void c.cancel(t);
                            if (t.cancelBubble) return
                        }
            }
        }

        function u(e, t, n, i) {
            function r(e) {
                return function(t) {
                    s(l, t, e)
                }
            }
            if (this.element) {
                e instanceof Array || (e = [e]), n || "function" != typeof t || (n = t, t = "_root");
                var u, l = this.id;
                for (u = 0; u < e.length; u++) i ? a(this, e[u], t, n) : (v[l] && v[l][e[u]] || c.addEvent(this, e[u], r(e[u])), o(this, e[u], t, n));
                return this
            }
        }

        function c(e, t) {
            if (!(this instanceof c)) {
                for (var n in h)
                    if (h[n].element === e) return h[n];
                return f++, h[f] = new c(e, f), h[f]
            }
            this.element = e, this.id = t
        }
        var l, d = 0,
            f = 0,
            v = {},
            h = {};
        c.prototype.on = function(e, t, n) {
            return u.call(this, e, t, n)
        }, c.prototype.off = function(e, t, n) {
            return u.call(this, e, t, n, !0)
        }, c.matchesSelector = function() {}, c.cancel = n, c.addEvent = t, c.matchesEvent = function() {
            return !0
        }, "undefined" != typeof e && e.exports && (e.exports = c), window.Gator = c
    }()
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        var i = n.USD;
        return t in n && (i = n[t]), e.replace("${price}", i)
    }

    function i(e, t) {
        return e && 0 !== e.length ? -1 !== e.indexOf(t) : !0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getDisplayPrice = n, t.isAvailableInCountry = i
}, function(e, t, n) {
    (function(t) {
        e.exports = t.BigScreen = n(77)
    }).call(t, function() {
        return this
    }())
}, function(e, t) {
    "use strict";
    ! function(t, n, i) {
        function r() {
            var e = Array.prototype.slice.apply(arguments),
                t = e.shift();
            p[t].forEach(function(t) {
                "function" == typeof t && t.apply(t, e)
            })
        }

        function o(e) {
            return function(t, n) {
                -1 !== h.indexOf(t) && e.call(this, t, n)
            }
        }

        function a(e) {
            var t = null;
            if ("VIDEO" === e.tagName) t = e;
            else {
                var n = e.getElementsByTagName("video");
                n[0] && (t = n[0])
            }
            return t
        }

        function s(e) {
            var t = a(e);
            if (t && t.webkitEnterFullscreen) {
                try {
                    t.readyState < t.HAVE_METADATA ? (t.addEventListener("loadedmetadata", function i() {
                        t.removeEventListener("loadedmetadata", i, !1), t.webkitEnterFullscreen(), y = !!t.getAttribute("controls")
                    }, !1), t.load()) : (t.webkitEnterFullscreen(), y = !!t.getAttribute("controls")), g = t
                } catch (n) {
                    return x("not_supported", e)
                }
                return !0
            }
            return x(void 0 === f.request ? "not_supported" : "not_enabled", e)
        }

        function u() {
            P.element || (T(), l())
        }

        function c() {
            i && "webkitfullscreenchange" === f.change && t.addEventListener("resize", u, !1)
        }

        function l() {
            i && "webkitfullscreenchange" === f.change && t.removeEventListener("resize", u, !1)
        }
        var d = /i(Pad|Phone|Pod)/.test(navigator.userAgent) && parseInt(navigator.userAgent.replace(/^.*OS (\d+)_(\d+).*$/, "$1.$2"), 10) >= 7,
            f = function() {
                var e = n.createElement("video"),
                    t = {
                        request: ["requestFullscreen", "webkitRequestFullscreen", "webkitRequestFullScreen", "mozRequestFullScreen", "msRequestFullscreen"],
                        exit: ["exitFullscreen", "webkitCancelFullScreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"],
                        enabled: ["fullscreenEnabled", "webkitFullscreenEnabled", "mozFullScreenEnabled", "msFullscreenEnabled"],
                        element: ["fullscreenElement", "webkitFullscreenElement", "webkitCurrentFullScreenElement", "mozFullScreenElement", "msFullscreenElement"],
                        change: ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"],
                        error: ["fullscreenerror", "webkitfullscreenerror", "mozfullscreenerror", "MSFullscreenError"]
                    },
                    i = {};
                for (var r in t)
                    for (var o = 0, a = t[r].length; a > o; o++)
                        if (t[r][o] in e || t[r][o] in n || "on" + t[r][o].toLowerCase() in n) {
                            i[r] = t[r][o];
                            break
                        }
                return i
            }(),
            v = {
                ENTER: "enter",
                EXIT: "exit",
                CHANGE: "change",
                ERROR: "error"
            },
            h = [],
            p = {},
            m = null;
        Object.keys(v).forEach(function(e) {
            h.push(v[e]), p[v[e]] = []
        });
        var g = null,
            y = null,
            b = function() {},
            _ = [],
            w = !1,
            k = !1,
            E = {
                chrome: -1 !== navigator.userAgent.indexOf("Chrome"),
                android: -1 !== navigator.userAgent.indexOf("Android"),
                safari: -1 !== navigator.userAgent.indexOf("Safari"),
                apple: -1 !== navigator.userAgent.indexOf("Apple")
            };
        E.chrome && E.android && (w = parseInt(navigator.userAgent.replace(/^.*Chrome\/(\d+).*$/, "$1"), 10) || !0), E.safari && E.apple && !E.chrome && !E.android && (k = parseFloat(navigator.userAgent.replace(/^.*Version\/(\d+)\.(\d+).*$/, "$1.$2")) || !0);
        var S = function(e) {
                var t = _[_.length - 1];
                t && (e !== t.element && e !== g || !t.hasEntered) && ("VIDEO" === e.tagName && (g = e), 1 === _.length && P.onenter(P.element), t.enter.call(t.element, e || t.element), t.hasEntered = !0, r(v.ENTER, P.element))
            },
            T = function() {
                !g || y || d || (g.setAttribute("controls", "controls"), g.removeAttribute("controls")), g = null, y = null;
                var e = _.pop();
                e && (e.exit.call(e.element), r(v.EXIT, e.element), !i && m && 0 === t.scrollY && t.scrollTo(0, m), P.element || (_.forEach(function(e) {
                    e.exit.call(e.element), r(v.EXIT, e.element)
                }), _ = [], P.onexit()))
            },
            x = function(e, t) {
                if (_.length > 0) {
                    var n = _.pop();
                    t = t || n.element, n.error.call(t, e), P.onerror(t, e), r(v.ERROR, t, e)
                }
            },
            P = {
                request: function(e, r, o, a) {
                    if (e = e || n.body, _.push({
                            element: e,
                            enter: r || b,
                            exit: o || b,
                            error: a || b
                        }), void 0 === f.request) return s(e);
                    if (i && n[f.enabled] === !1) return s(e);
                    if (w !== !1 && 32 > w) return s(e);
                    if (i && void 0 === f.enabled) return f.enabled = "webkitFullscreenEnabled", e[f.request](), void setTimeout(function() {
                        n[f.element] ? n[f.enabled] = !0 : (n[f.enabled] = !1, s(e))
                    }, 250);
                    try {
                        !i && t && (m = t.scrollY), e[f.request](), k >= 5.1 && setTimeout(function() {
                            n[f.element] || x(i ? "not_enabled" : "not_allowed", e)
                        }, 100)
                    } catch (u) {
                        x("not_enabled", e)
                    }
                },
                exit: function() {
                    l(), !n[f.exit] && P.element ? P.element[f.exit]() : n[f.exit]()
                },
                toggle: function(e, t, n, i) {
                    P.element ? P.exit() : P.request(e, t, n, i)
                },
                videoEnabled: function(e) {
                    if (P.enabled) return !0;
                    e = e || n.body;
                    var t = a(e);
                    return t && void 0 !== t.webkitSupportsFullscreen ? t.readyState < t.HAVE_METADATA ? "maybe" : t.webkitSupportsFullscreen : !1
                },
                on: o(function(e, t) {
                    p[e].push(t)
                }),
                off: o(function(e, t) {
                    var n = p[e].indexOf(t);
                    n > -1 && p[e].splice(n, 1)
                }),
                onenter: b,
                onexit: b,
                onchange: b,
                onerror: b
            };
        try {
            Object.defineProperties(P, {
                element: {
                    enumerable: !0,
                    get: function() {
                        return g && g.webkitDisplayingFullscreen ? g : n[f.element] || null
                    }
                },
                enabled: {
                    enumerable: !0,
                    get: function() {
                        return "webkitCancelFullScreen" !== f.exit || i ? w !== !1 && 32 > w ? !1 : n[f.enabled] || !1 : !0
                    }
                }
            })
        } catch (C) {
            P.element = null, P.enabled = !1
        }
        f.change && n.addEventListener(f.change, function(e) {
            if (P.onchange(P.element), r(v.CHANGE, P.element), P.element) {
                var t = _[_.length - 2];
                t && t.element === P.element ? T() : (S(P.element), c())
            } else T()
        }, !1), n.addEventListener("webkitbeginfullscreen", function(e) {
            var t = !0;
            if (_.length > 0)
                for (var n = 0, i = _.length; i > n; n++) {
                    var o = a(_[n].element);
                    if (o === e.srcElement) {
                        t = !1;
                        break
                    }
                }
            t && _.push({
                element: e.srcElement,
                enter: b,
                exit: b,
                error: b
            }), P.onchange(e.srcElement), r(v.CHANGE, P.srcElement), S(e.srcElement)
        }, !0), n.addEventListener("webkitendfullscreen", function(e) {
            P.onchange(e.srcElement), r(v.CHANGE, e.srcElement), T(e.srcElement)
        }, !0), f.error && n.addEventListener(f.error, function(e) {
            x("not_allowed")
        }, !1), "undefined" != typeof e && e.exports ? e.exports = P : t.BigScreen = P
    }(window, document, self !== top)
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        function n(e, t) {
            var n = ".player-" + O + " ",
                i = n + e.join("," + n);
            if (t) {
                var r = "#" + M + " ";
                i += "," + r + e.join("," + r)
            }
            return A && (i = i.replace(/:hover/g, ":active")), i
        }

        function i() {
            var e = document.createElement("style");
            return e.setAttribute("data-player", O), document.querySelector("head").appendChild(e), F = e.sheet
        }

        function r() {
            for (; F.cssRules.length > 0;) F.deleteRule(0)
        }

        function o() {
            F ? r() : i()
        }

        function C(e) {
            o();
            var t = e.complement,
                i = new a["default"](23, 35, 34, .75),
                r = new a["default"](0, 0, 0, .15),
                u = r.overlayOn(e);
            i.contrast(t).ratio < 3 && t.lighten(5, 3, i);
            var C, L = e.lightness < 40 ? e.clone().lighten(15, 3, e) : e.clone().darken(15, 3, e);
            return (0, s.addCssRule)(n(c, !0), "color:" + e.hex + " !important", F), (0, s.addCssRule)(n(l, !0), "color:" + t.hex + " !important", F), (0, s.addCssRule)(n(d), "color:" + e.hex, F), (0, s.addCssRule)(n(h), "fill:" + e.hex, F), (0, s.addCssRule)(n(m), "stroke:" + e.hex, F), (0, s.addCssRule)(n(y), "background-color:" + e.hex, F), (0, s.addCssRule)(n(b), "border-color:" + e.hex, F), (0, s.addCssRule)(n(f), "color:" + t.hex, F), (0, s.addCssRule)(n(v), "fill:" + t.hex, F), (0, s.addCssRule)(n(p), "fill:" + L.hex, F), (0, s.addCssRule)(n(g), "stroke:" + L.hex, F), (0, s.addCssRule)(n(x), "border-color:" + u.hex, F), (0, s.addCssRule)(n(P), "background-color:" + u.hex, F), e.luminance > .95 && (t = e.clone().darken(15, 3, e), (0, s.addCssRule)(n(_), "color:" + t.hex, F), (0, s.addCssRule)(n(w), "fill:" + t.hex, F), (0, s.addCssRule)(n(k), "stroke:" + t.hex, F), L = t.clone().darken(15, 3, t), (0, s.addCssRule)(n(p), "fill:" + L.hex, F), (0, s.addCssRule)(n(g), "stroke:" + L.hex, F)), e.yiq > 175 && e.luminance < .95 && (C = L.clone().darken(15, 3, L), (0, s.addCssRule)(n(p), "fill:" + C.hex, F), (0, s.addCssRule)(n(g), "stroke:" + C.hex, F), (0, s.addCssRule)(n(E), "color:" + L.hex, F), (0, s.addCssRule)(n(S), "fill:" + L.hex, F), (0, s.addCssRule)(n(T), "stroke:" + L.hex, F)), {
                main: e.hex,
                selected: L.hex,
                sidedockHover: C ? L.hex : e.luminance > .95 ? t.hex : a["default"].white.hex,
                sidedockSelected: e.luminance > .95 ? t.hex : e.hex,
                sidedockSelectedHover: C ? C.hex : L.hex
            }
        }

        function L() {
            e.events.on(u.Control.changeColor, function(t) {
                var n;
                try {
                    n = new a["default"](t)
                } catch (i) {
                    n = new a["default"]("00adef")
                }
                var r = C(n);
                e.config._colors = r, e.config.embed.color = r.main.replace("#", ""), e.events.fire(u.Events.colorChanged, e.config.embed.color)
            }), e.events.fire(u.Control.changeColor, e.config.embed.color)
        }
        var O = t.uuid,
            M = t.id,
            A = t.isMobileDevice,
            F = null;
        return L(), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(20),
        a = i(o),
        s = n(5),
        u = n(2),
        c = [".title a"],
        l = [".title a:hover"],
        d = ["a", ".button-link", ".overlay-wrapper .footnote.share a:hover", ".title h1", ".title span.user", ".outro .video-section > div > h1 a:hover", ".outro .videos h1", ".outro .videos h2", ".menu li:hover", ".menu li.active"],
        f = ["a:hover", ".button-link:hover"],
        v = [".overlay-wrapper .close:hover .fill", ".overlay-wrapper .back:hover .fill", ".stats-debug-close:hover .fill", ".stats-debug-copy:hover"],
        h = [".play-bar .on .fill", ".play-bar a:hover .fill", ".play-bar button:not(.toggle):hover .fill", ".tiny-bars .fill", ".sidedock .on .fill"],
        p = [".sidedock .on:hover .fill"],
        m = [".play-bar .on .stroke", ".sidedock .on .stroke"],
        g = [".sidedock .on:hover .stroke"],
        y = [".sidedock button:hover", ".player.touch-support .sidedock button:active", ".controls .play:hover", ".controls .play-bar .played", ".controls .play-bar .fullscreen.tiny:hover", ".controls .volume div", ".overlay .buttons li", ".overlay .window-wrapper button", '.overlay .window-wrapper input[type="submit"]', '.overlay .window-wrapper a[role="button"]', ".overlay .embed-copy", ".overlay .email-capture-confirm .check-icon-wrapper", '.outro a[role="button"]', ".outro .videos li:hover img", ".outro .videos li a:focus img", ".outro .vod li", ".menu li.active:before"],
        b = [".outro .videos li:hover img", ".outro .videos li a:focus img", ".menu li.active:before"],
        _ = [".overlay-wrapper .overlay .buttons li a", ".overlay-wrapper .overlay button.embed-copy", ".overlay-wrapper .footnote.share a:hover", ".overlay .window-wrapper button", '.overlay .window-wrapper input[type="submit"]', '.overlay .window-wrapper a[role="button"]', ".outro .vod-header a:hover", '.outro .vod-wrapper a[role="button"]', '.outro-wrapper .outro-inner a[role="button"]', ".sidedock button:hover", ".sidedock button:hover .vod-label", ".play:hover"],
        w = [".controls .play:hover .fill", ".sidedock button:hover .fill", ".play-bar a:hover .fill", ".play-bar button:not(.toggle):hover .fill", ".controls .play-bar .fullscreen.tiny:hover .fill", ".sidedock .on .fill", '.overlay .share-wrapper a[role="button"] .fill', ".overlay .email-capture-confirm .check-icon .fill", '.outro .vod-wrapper a[role="button"] .fill'],
        k = [".controls .play:hover .stroke", ".sidedock button:hover .stroke", ".sidedock .on .stroke"],
        E = ['.overlay-wrapper .overlay a[role="button"]', ".overlay-wrapper .overlay button.embed-copy", ".sidedock button:hover", ".play:hover", '.outro a[role="button"]'],
        S = [".controls .play:hover .fill", ".sidedock button:hover .fill", ".controls .play-bar .fullscreen.tiny:hover .fill"],
        T = [".sidedock button:hover .stroke"],
        x = [".menu li:active:before"],
        P = ['.overlay .window-wrapper input[type="submit"]:active', ".overlay .embed-copy.zeroclipboard-is-active", '.overlay a[role="button"]:active', ".outro .vod-watch-button:active", ".sidedock button:active"];
    t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    (function(e, i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t, n) {
            return e = String(e), new Array(t - e.length + 1).join(n || "0") + e
        }

        function a(e, t) {
            var n = Math.floor(e / 3600 % 60),
                i = Math.floor(e / 60 % 60);
            if (e = Math.floor(e % 60), t) {
                var r = e + " second" + (1 === e ? "" : "s");
                return i > 0 && (r = i + " minute" + (1 === i ? "" : "s") + ", " + r), n > 0 && (r = n + " hour" + (1 === n ? "" : "s") + ", " + r), r
            }
            return (n > 0 ? n + ":" : "") + o(i, 2) + ":" + o(e, 2)
        }

        function s(e, t) {
            function n() {
                if (!Be) {
                    var e = ie.getBoundingClientRect().left;
                    ie.offsetWidth < ie.clientWidth && (e *= 100);
                    var t = parseInt(window.getComputedStyle(ie, "").borderLeftWidth, 10);
                    Be = e + t
                }
                return Be
            }

            function r() {
                if (!Ie) {
                    var e = ie.getBoundingClientRect().right;
                    ie.offsetWidth < ie.clientWidth && (e *= 100);
                    var t = parseInt(window.getComputedStyle(ie, "").borderRightWidth, 10);
                    Ie = e - t
                }
                return Ie
            }

            function o(t) {
                var i = n(),
                    o = r(),
                    a = o - i,
                    s = t - i;
                if (e.config.user.progress && 10 >= s && !ke) return 0;
                var u = s / a;
                return (0, b.limit)(u, 0, 1)
            }

            function s(t, n) {
                ke && !Me && (n = n || e.config.video.duration * t || 0, window.requestAnimationFrame(function() {
                    c(t, n), d(t, n)
                }))
            }

            function c(e, t) {
                se.style.left = Math.min((0, b.round)(100 * e), 100) + "%", ue.innerHTML = a(t)
            }

            function d(e, t) {
                var n = Math.min((0, b.round)(100 * e), 100);
                ae.style.width = n + "%", ae.setAttribute("aria-valuenow", (0, b.round)(t)), ae.setAttribute("aria-valuetext", a(Math.round(t), !0) + " played"), te.setAttribute("width", n + "%")
            }

            function v(e, t) {
                var n = Math.min((0, b.round)(100 * e), 100);
                oe.style.width = n + "%", oe.setAttribute("aria-valuenow", (0, b.round)(t)), oe.setAttribute("aria-valuetext", a(t, !0) + " loaded"), ee.setAttribute("width", n + "%")
            }

            function p() {
                return ke = !0, qe && (Ae = !1, t.classList.add("invisible"), M(), T()), J.classList.contains("state-playing") ? (e.events.fire(_.Events.pauseButtonPressed), g()) : (e.events.fire(_.Events.playButtonPressed), E()), !m["default"].android
            }

            function g() {
                Fe = !1, J.classList.remove("state-playing"), J.classList.add("state-paused");
                var e = J.getAttribute("data-title-play");
                J.setAttribute("title", e), J.setAttribute("aria-label", e)
            }

            function E() {
                Fe = !0, qe && M(), J.classList.add("state-playing"), J.classList.remove("state-paused");
                var e = J.getAttribute("data-title-pause");
                J.setAttribute("title", e), J.setAttribute("aria-label", e)
            }

            function S() {
                Ae && (we || (ke && Oe || Se) && (Ee || (!Ne && !He || Se) && (Se && e.config.view === _.View.privateUnlocked || Pe || Te || (Ae = !1, e.events.fire(_.Events.controlBarVisibilityChanged, Ae), t.classList.add("invisible")))))
            }

            function T() {
                Ae || Se || (t.classList.remove("hidden"), t.removeAttribute("hidden"), setTimeout(function() {
                    Ae = !0, e.events.fire(_.Events.controlBarVisibilityChanged, Ae), t.classList.remove("invisible")
                }, 0))
            }

            function x(t, n) {
                var i = [];
                "text_tracks" in e.config.request && (e.config.request.text_tracks.forEach(function(e) {
                    var t = "CC" === e.label.substring(e.label.length - 2),
                        n = "captions" !== e.kind || t ? "" : " CC";
                    i.push({
                        label: e.label + n,
                        id: e.id,
                        active: De === "" + e.id
                    })
                }), i.push({
                    label: "None",
                    id: "off",
                    active: null === De
                }));
                var r = new h["default"](i, t, n, e);
                return r.on("selected", function(t) {
                    return "off" === t ? void e.events.fire(_.Control.turnCaptionsOff) : void e.events.fire(_.Control.turnCaptionsOn, t)
                }), r
            }

            function P() {
                window.requestAnimationFrame(function() {
                    c(0, e.config.video.duration), d(0, 0), v(0, 0)
                })
            }

            function C() {
                ke = !1, Ee = !1, Te = !1, Ce = !1, Me = !1, we = !1, Oe = !1, Re = !0, ge && (ge.destroy(), ge = null), je && (je.destroy(), je = null)
            }

            function L() {
                if (!e.config.embed.settings.custom_logo) return null;
                var t = e.config.embed.settings.custom_logo,
                    n = t.img;
                return m["default"].devicePixelRatio >= 2 && (n = n.replace(/(mw|mh)=(\d+)/g, function(e, t, n) {
                    return t + "=" + 2 * parseInt(n, 10)
                })), {
                    showLink: null !== t.url,
                    url: t.url,
                    img: n,
                    sticky: t.sticky,
                    width: t.width,
                    height: t.height
                }
            }

            function O() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                if (ve) {
                    var t, n = 1 / he.length,
                        i = e / n,
                        r = Math.ceil(i),
                        o = i % 1;.33 >= o && (t = "fill1"), o > .33 && .66 >= o && (t = "fill2"), he.forEach(function(e, n) {
                        return e.classList.remove("fill0"), e.classList.remove("fill1"), e.classList.remove("fill2"), n === r - 1 && o && .66 >= o ? void e.classList.add(t) : void(n > r - 1 && e.classList.add("fill0"))
                    }), ve.setAttribute("aria-valuenow", e.toFixed(3)), ve.setAttribute("aria-valuetext", Math.round(100 * e) + "%")
                }
            }

            function M() {
                if (e.config.view === _.View.main || e.config.view === _.View.privateUnlocked) {
                    var n = e.config.embed.settings,
                        r = {
                            show: n.logo,
                            showLink: !!e.config.video.url,
                            url: e.config.video.url
                        },
                        o = L();
                    if (e.config.embed.settings.watch_trailer && !ke && !Fe && !e.config.embed.autoplay && e.config.embed.on_site) return void A(r, o);
                    var s = e.telecine ? e.telecine.supportsSettingVolume : !0,
                        u = e.telecine ? e.telecine.supportsTextTracks : !0,
                        c = "text_tracks" in e.config.request && e.config.request.text_tracks.length,
                        d = {
                            targetBlank: 0 === e.config.embed.on_site,
                            playState: Fe ? "playing" : "paused",
                            volume: s && n.volume,
                            ccButton: u && c,
                            ccOn: null !== De,
                            hdButton: Re && e.config.video.hd,
                            airplayButton: m["default"].airPlay,
                            fullscreenButton: n.fullscreen,
                            vimeoLogo: r,
                            duration: a(e.config.video.duration),
                            rawDuration: e.config.video.duration
                        };
                    o && (d.customLogo = o), t.classList.remove("trailer"), qe = !1, t.innerHTML = l["default"].render("controlbar", d), J = t.querySelector(".play"), Z = J.querySelector(".buffer"), ee = J.querySelector(".loaded"), te = J.querySelector(".played"), ne = t.querySelector(".play-bar"), ie = t.querySelector(".progress"), re = ne.querySelector(".buffer"), oe = ne.querySelector(".loaded"), ae = ne.querySelector(".played"), se = t.querySelector(".timecode"), ue = se.querySelector(".box"), ce = t.querySelector(".ghost-timecode"), le = ce.querySelector(".box"), de = t.querySelector(".thumb-preview"), fe = t.querySelector(".thumb"), ve = t.querySelector(".volume"), ve && (he = i(ve.querySelectorAll("div")), O(e.config.request.cookie.volume)), pe = t.querySelector(".hd"), me = t.querySelector(".play-bar .cc"), Ve = t.querySelector(".filter"), ye = t.querySelector(".pip"), m["default"].airPlay && (be = t.querySelector(".airplay")), _e = t.querySelector(".fullscreen"), Ee = !1, ke || G(), Ae && e.events.fire(_.Events.controlBarVisibilityChanged, Ae)
                }
            }

            function A(n, i) {
                t.classList.add("trailer");
                var r = {
                    vimeoLogo: n,
                    text: e.config.video.vod.button_text || "Watch Trailer"
                };
                i && (r.customLogo = i), t.innerHTML = l["default"].render("controlbar_trailer", r), J = t.querySelector(".play"), qe = !0
            }

            function F() {
                (0, y["default"])(t, ".play", p), e.events.on([_.Events.playInitiated, _.Events.playButtonPressed], E), e.events.on([_.Events.pauseButtonPressed, _.Events.paused, _.Events.error], g), e.events.on(_.Events.played, function() {
                    E()
                }), e.events.on(_.Events.ended, function() {
                    Me = !1, g(), s(1)
                }), e.events.on(_.Events.overlayOpened, function(e) {
                    "notsupported" === e && g()
                })
            }

            function q() {
                e.events.on(_.Events.loadProgress, function(e, t, n) {
                    we || window.requestAnimationFrame(function() {
                        v(n, e)
                    })
                })
            }

            function I() {
                e.events.on(_.Events.bufferStarted, function() {
                    re.classList.remove("hidden"), oe.classList.add("hidden"), Z.setAttribute("class", Z.getAttribute("class").replace(/\s+hidden/, "")), Pe = !0, T()
                }), e.events.on(_.Events.bufferEnded, function() {
                    re.classList.add("hidden"), oe.classList.remove("hidden"), Z.setAttribute("class", Z.getAttribute("class") + " hidden"), Pe = !1
                })
            }

            function B() {
                function n(n) {
                    if (!n.button || 2 !== n.button) {
                        e.element.classList.add("scrubbing"), e.events.fire(_.Events.scrubbingStarted);
                        var u = n.type;
                        if ("pointerdown" === u || "MSPointerDown" === u) {
                            a = n.pointerId;
                            try {
                                n.target.msSetPointerCapture ? n.target.msSetPointerCapture(a) : n.target.setPointerCapture(a)
                            } catch (l) {}(0, f["default"])(t).on("pointermove", ".progress", i).on("pointerup", ".progress", r)
                        } else "touchstart" === u ? (0, f["default"])(t).on("touchmove", i).on("touchend", r) : (0, f["default"])(document).on("mousemove", i).on("mouseup", r);
                        var v = n.clientX;
                        n.targetTouches && n.targetTouches.length > 0 && (v = n.targetTouches[0].clientX, n.preventDefault());
                        var h = o(v),
                            p = null;
                        if (ke) s(h);
                        else {
                            var m = e.config.video.duration * h;
                            c(h, m), d(h, m), Me = !0
                        }
                        return e.events.fire(_.Control.seek, h, p), !1
                    }
                }

                function i(t) {
                    if (Me = !1, a === t.pointerId && t.isPrimary !== !1) {
                        var n = t.clientX;
                        t.targetTouches && t.targetTouches.length > 0 && (n = t.targetTouches[0].clientX, t.preventDefault());
                        var i = o(n);
                        s(i), e.events.fire(_.Control.seek, i)
                    }
                }

                function r(n) {
                    var o = n.type;
                    "pointerup" === o || "MSPointerUp" === o ? (0, f["default"])(t).off("pointermove", ".progress", i).off("pointerup", ".progress", r) : "touchend" === n.type ? (0, f["default"])(t).off("touchmove", i).off("touchend", r) : (0, f["default"])(document).off("mousemove", i).off("mouseup", r), e.events.fire(_.Events.scrubbingEnded), e.element.classList.remove("scrubbing")
                }
                e.events.on(_.Events.playProgress, function(t, n, i) {
                    Me && (0 === e.config.embed.time || e.config.embed.time > 0 && t >= e.config.embed.time) && (Me = !1), Te || s(i, t)
                }), e.events.on(_.Events.scrubbingStarted, function(e) {
                    Te = !0, xe = e
                }), e.events.on(_.Events.scrubbingEnded, function() {
                    Te = !1, xe = !1
                });
                var a;
                e.events.on(_.Events.seeked, function(e, t, n) {
                    xe && s(n)
                }), (0, f["default"])(t).on(m["default"].pointerEvents ? "pointerdown" : ["touchstart", "mousedown"], ".progress", n)
            }

            function j() {
                function i() {
                    return y || (y = e.verifyConfig().then(function(e) {
                        return (0, k.loadImage)(e.thumb_preview.url)
                    })), y.then(function(t) {
                        var n = e.config.request.thumb_preview;
                        return fe.style.backgroundImage || (fe.style.width = n.frame_width / 2 + "px", fe.style.height = n.frame_height / 2 + "px", fe.style.backgroundImage = "url(" + n.url + ")", fe.style.backgroundSize = n.width / 2 + "px " + n.height / 2 + "px"), t
                    })
                }

                function c(t) {
                    if (t.target === ne) {
                        var n = o(t.clientX);
                        s(n), e.events.fire(_.Control.seek, n)
                    }
                }

                function l(e) {
                    return ce.classList.contains("hidden") ? e : (de.classList.remove("hidden"), window.requestAnimationFrame(function() {
                        window.requestAnimationFrame(function() {
                            de.classList.remove("invisible")
                        })
                    }), e)
                }

                function d(t) {
                    Le || Ce || (ce.classList.remove("hidden"), Le = !0, h(t), window.requestAnimationFrame(function() {
                        window.requestAnimationFrame(function() {
                            ce.classList.remove("invisible")
                        })
                    }), e.config.request.thumb_preview && b && i().then(l)["catch"](function() {}), (0, f["default"])(ne).on("click", c))
                }

                function v(t) {
                    var n = e.config.video.duration / e.config.request.thumb_preview.frames,
                        i = Math.min(e.config.request.thumb_preview.frames - 1, Math.ceil(t / n)),
                        r = i % e.config.request.thumb_preview.columns,
                        o = Math.floor(i / e.config.request.thumb_preview.columns),
                        a = -(r * e.config.request.thumb_preview.frame_width / 2),
                        s = -(o * e.config.request.thumb_preview.frame_height / 2);
                    return [a, s]
                }

                function h(t) {
                    if (e.config.request.thumb_preview && null === b) {
                        var n = ie.getBoundingClientRect().width,
                            s = document.querySelector(".player").clientHeight,
                            c = 215,
                            d = 185;
                        if (b = s >= c && n >= d, !b) return void de.classList.add("hidden");
                        i().then(l)["catch"](function() {})
                    }
                    Le && ! function() {
                        var n = o(t.clientX),
                            s = e.config.video.duration * n;
                        e.config.request.thumb_preview && b && i().then(function(e) {
                            var t = v(s),
                                n = u(t, 2),
                                i = n[0],
                                r = n[1];
                            return window.requestAnimationFrame(function() {
                                fe.style.backgroundPosition = i + "px " + r + "px"
                            }), e
                        })["catch"](function() {}), window.requestAnimationFrame(function() {
                            le.innerHTML = a(s);
                            var e = (100 * n).toFixed(3);
                            ce.style.left = e + "%", m(n, t.clientX), t.clientX > r() + 10 && g()
                        })
                    }()
                }

                function p() {
                    var e = J.getBoundingClientRect().left,
                        t = ne.getBoundingClientRect().right,
                        i = de.getBoundingClientRect().width,
                        o = e + Math.ceil(i / 2),
                        a = t - Math.ceil(i / 2),
                        s = n(),
                        u = r(),
                        c = u - s,
                        l = (o - s) / c,
                        d = (a - s) / c;
                    return [l, d]
                }

                function m(e, t) {
                    var n = p(),
                        i = u(n, 2),
                        r = i[0],
                        o = i[1],
                        a = Math.max(r, Math.min(o, e)),
                        s = (100 * a).toFixed(3);
                    de.style.left = s + "%"
                }

                function g() {
                    ce && (ce.classList.add("invisible"), de.classList.add("invisible")), Le = !1, (0, f["default"])(ne).off("click", c)
                }
                var y = void 0,
                    b = null;
                e.events.on(_.Events.resize, function() {
                    b = null
                }), (0, f["default"])(t).on("mouseenter", ".progress", d).on("mousemove", ".play-bar", h).on("mouseleave", ".play-bar", g), (0, f["default"])(t).on("transitionend", ".ghost-timecode", function(e) {
                    "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && (ce.classList.add("hidden"), de.classList.add("hidden"))
                }, !1), e.events.on(_.Events.mousedOut, g), e.events.on(_.Events.configChanged, function() {
                    y = null
                })
            }

            function R() {
                function n(e) {
                    De = e, ge && (ge.setActiveItem(e), setTimeout(function() {
                        ge.hide()
                    }, 100)), me && (me.classList.add("on"), me.classList.remove("off"))
                }

                function i() {
                    De = null, ge && (ge.setActiveItem("off"), setTimeout(function() {
                        ge.hide()
                    }, 100)), me && (me.classList.add("off"), me.classList.remove("on"))
                }(0, y["default"])(t, ".cc", function() {
                    e.events.fire(_.Events.ccButtonPressed)
                }), e.events.on(_.Events.ccButtonPressed, function(e) {
                    ge ? e && ge.toggle(e) : (ge = x(me, ne), ge.show(e))
                }), e.events.on(_.Events.captionsChanged, function(e) {
                    return e ? void n(e.id) : void i()
                }).on(_.Events.controlBarVisibilityChanged, function(e) {
                    e || ge && ge.hide()
                }).on([_.Control.enableCaptions, _.Control.disableCaptions], function() {
                    M()
                })
            }

            function D() {
                function n() {
                    var t = l["default"].render("icon_hd");
                    if (e.telecine.video.currentFile.mime === _.CodecToMime.dash) {
                        var n = e.config.request.files.dash.streams,
                            r = i(n).sort((0, w.qualityCompare)()).filter((0, w.hfrFilter)(n)).map(function(e) {
                                var n = (0, w.getIdentifier)(e);
                                return {
                                    id: n,
                                    label: (0, w.getLabel)(e, t),
                                    active: o === n
                                }
                            });
                        return r.push({
                            id: "auto",
                            label: "Auto",
                            active: !o || "auto" === o
                        }), r
                    }
                    var a = e.telecine.video.files;
                    return i(a).filter((0, w.deliveryFilter)("progressive")).filter((0, w.hfrFilter)(a)).sort((0, w.qualityCompare)()).map(function(e) {
                        return {
                            label: (0, w.getLabel)(e, t),
                            id: (0, w.getIdentifier)(e),
                            active: o === e.metadata.quality
                        }
                    })
                }

                function r() {
                    var t = n(),
                        i = new h["default"](t, pe, ne, e);
                    return i.on("selected", function(t) {
                        e.events.fire(_.Control.changeQuality, t)
                    }), i
                }
                var o = null;
                (0, y["default"])(t, ".hd", function() {
                    e.events.fire(_.Events.hdButtonPressed)
                }), e.events.on(_.Events.hdButtonPressed, function(e) {
                    return je ? void(e && je.toggle(e)) : (je = r(), void je.show(e))
                }), e.events.on(_.Events.qualityChanged, function(e) {
                    o = e, je && je.setActiveItem(e)
                }), e.events.on(_.Control.disableHd, function() {
                    Re = !1, M()
                })
            }

            function V() {
                var n = document.createElement("a");
                if (n.style.cssText = "-moz-filter:blur(2px);-webkit-filter:blur(2px);filter:blur(2px);", !(n.style.length < 1)) {
                    var i = null,
                        r = [{
                            label: "Soporific",
                            id: "aden"
                        }, {
                            label: "Escutcheon",
                            id: "earlybird"
                        }, {
                            label: "Pluvious",
                            id: "hudson"
                        }, {
                            label: "Moribund",
                            id: "inkwell"
                        }, {
                            label: "Fecundity",
                            id: "mayfair"
                        }, {
                            label: "Jejune",
                            id: "toaster"
                        }, {
                            label: "None",
                            id: "none",
                            active: !0
                        }];
                    (0, y["default"])(t, ".filter", function() {
                        return e.events.fire(_.Events.filterButtonPressed)
                    }), e.events.on(_.Events.filterButtonPressed, function(t) {
                        return Ve.classList.remove("hidden"), i ? void(t && i.toggle(t)) : (i = new h["default"](r, Ve, ne, e), i.on("selected", function(t) {
                            return e.events.fire(_.Control.setFilter, t)
                        }), void i.show(t))
                    }), e.events.on(_.Control.setFilter, function(e) {
                        return i.setActiveItem(e), "none" === e ? (Ve.classList.add("off"), void Ve.classList.remove("on")) : (Ve.classList.add("on"), void Ve.classList.remove("off"))
                    })
                }
            }

            function N() {
                (0, y["default"])(t, ".pip", function() {
                    return "picture-in-picture" === e.telecine.presentationMode ? void e.events.fire(_.Control.deactivatePictureInPicture) : void e.events.fire(_.Control.activatePictureInPicture)
                }), e.events.on(_.Events.pictureInPictureAvailable, function() {
                    ye && (ye.classList.remove("hidden"), ye.hidden = !1)
                }).on(_.Events.pictureInPictureNotAvailable, function() {
                    ye && (ye.classList.add("hidden"), ye.hidden = !0)
                }).on(_.Events.pictureInPictureActivated, function() {
                    He = !0, ye && (ye.classList.add("return"), ye.classList.remove("enter"), ye.setAttribute("title", ye.getAttribute("data-title-return")))
                }).on(_.Events.pictureInPictureDeactivated, function() {
                    He = !1, ye && (ye.classList.add("enter"), ye.classList.remove("return"), ye.setAttribute("title", ye.getAttribute("data-title-enter")))
                })
            }

            function H() {
                m["default"].airPlay && ((0, y["default"])(t, ".airplay", function() {
                    e.events.fire(_.Events.airPlayButtonPressed)
                }), e.events.on(_.Events.airPlayAvailable, function() {
                    be && (be.classList.remove("hidden"), be.hidden = !1)
                }).on(_.Events.airPlayNotAvailable, function() {
                    be && (be.classList.add("hidden"), be.hidden = !0)
                }).on(_.Events.airPlayActivated, function() {
                    Ne = !0, be && (be.classList.remove("off"), be.classList.add("on"), be.setAttribute("title", be.getAttribute("data-title-on"))), T()
                }).on(_.Events.airPlayDeactivated, function() {
                    Ne = !1, be && (be.classList.remove("on"), be.classList.add("off"), be.setAttribute("title", be.getAttribute("data-title-off")))
                }))
            }

            function U() {
                (0, y["default"])(t, ".fullscreen", function() {
                    e.events.fire(_.Events.fullscreenButtonPressed)
                }), e.events.on(_.Events.didEnterFullscreen, function() {
                    _e && (_e.setAttribute("title", _e.getAttribute("data-title-unfullscreen")), _e.classList.remove("tiny"))
                }), e.events.on(_.Events.didExitFullscreen, function(e) {
                    _e && _e.setAttribute("title", _e.getAttribute("data-title-fullscreen")), e || (we = !0, P()), K && _e && _e.classList.add("tiny")
                })
            }

            function z() {
                e.events.on([_.Events.mousedOver, _.Events.bufferStarted, _.Events.scrubbingStarted, _.Control.changeVolume], T).on([_.Events.mousedOut, _.Events.mouseTimeout], S).on(_.Events.willEnterFullscreen, function() {
                    Ee = !1, S()
                }).on(_.Events.willExitFullscreen, function() {
                    Ee = !1
                }).on(_.Events.targetTimeReached, function() {
                    Oe = !0, S()
                }).on(_.Control.changeVolume, function(e, t) {
                    t || T()
                });
                var n = [".play", ".play-bar", ".custom-logo", ".menu"];
                (0, f["default"])(t).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], n, function(e) {
                    return "pointerType" in e ? void("mouse" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_MOUSE || (Ee = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(m["default"].touch || (Ee = "mouseover" === e.type))
                }), (0, f["default"])(t).on("transitionend", function(e) {
                    this === t && "opacity" === e.propertyName && t.classList.contains("invisible") && (t.classList.add("hidden"), t.setAttribute("hidden", ""))
                })
            }

            function W() {
                function n(n) {
                    if (1 === n.which) {
                        ve.setAttribute("data-tabindex", ve.getAttribute("tabindex")), ve.removeAttribute("tabindex"), Ce = !0, e.element.classList.add("scrubbing"), e.events.fire(_.Events.volumeScrubbingStarted);
                        var s = n.type;
                        if ("pointerdown" === s || "MSPointerDown" === s) {
                            a = n.pointerId;
                            try {
                                n.target.msSetPointerCapture ? n.target.msSetPointerCapture(a) : n.target.setPointerCapture(a)
                            } catch (u) {}(0, f["default"])(t).on("pointermove", ".volume", i).on("pointerup", ".volume", r)
                        } else "touchstart" === s ? (0, f["default"])(document).on("touchmove", i).on("touchend", r) : (0, f["default"])(document).on("mousemove", i).on("mouseup", r);
                        var c = n.clientX;
                        n.targetTouches && (c = n.targetTouches[0].clientX);
                        var l = o(c);
                        e.events.fire(_.Control.changeVolume, l), O(l)
                    }
                }

                function i(t) {
                    var n = t.clientX;
                    t.targetTouches && (n = t.targetTouches[0].clientX, t.preventDefault());
                    var i = o(n);
                    e.events.fire(_.Control.changeVolume, i), O(i)
                }

                function r(n) {
                    Ce = !1, e.events.fire(_.Events.volumeScrubbingEnded), e.element.classList.remove("scrubbing");
                    var o = n.type;
                    "pointerup" === o || "MSPointerUp" === o ? (0, f["default"])(t).off("pointermove", ".volume", i).off("pointerup", ".volume", r) : "touchend" === n.type ? (0, f["default"])(document).off("touchmove", i).off("touchend", r) : (0, f["default"])(document).off("mousemove", i).off("mouseup", r), ve.setAttribute("tabindex", ve.getAttribute("data-tabindex")), ve.removeAttribute("data-tabindex")
                }

                function o(e) {
                    var t = ve.getBoundingClientRect().left,
                        n = ve.getBoundingClientRect().right,
                        i = n - t,
                        r = e - t,
                        o = r / i;
                    return (0, b.limit)(o, 0, 1)
                }(0, f["default"])(t).on("mouseover", ".volume div", function() {
                    var e = this;
                    e.classList.add("hover"), window.requestAnimationFrame(function() {
                        window.requestAnimationFrame(function() {
                            e.classList.remove("hover"), e.classList.add("animate")
                        })
                    })
                }), (0, f["default"])(t).on("transitionend", ".volume div", function(e) {
                    "height" === e.propertyName && 12 === this.clientHeight && this.classList.remove("animate")
                }), (0, f["default"])(document).on("contextmenu", ".volume", function() {
                    this.blur()
                });
                var a;
                (0, f["default"])(t).on(m["default"].pointerEvents ? "pointerdown" : ["touchstart", "mousedown"], ".volume", n), e.events.on(_.Events.volumeChanged, function(e) {
                    !Ce && he && O(e)
                }).on([_.Control.enableVolume, _.Control.disableVolume], function() {
                    M()
                })
            }

            function X() {
                e.events.on(_.Events.overlayOpened, function(e) {
                    if ("notsupported" !== e && "private-unlocked" !== e && "help" !== e) Se = !0, S();
                    else
                        for (var n = t.querySelectorAll("a, button, input, [tabindex]"), i = 0, r = n.length; r > i; i++) {
                            var o = n[i].getAttribute("tabindex");
                            o && n[i].setAttribute("data-tabindex", o), n[i].setAttribute("tabindex", "-1")
                        }
                }).on(_.Events.overlayClosed, function() {
                    Se = !1, T();
                    for (var e = t.querySelectorAll("[tabindex]"), n = 0, i = e.length; i > n; n++) {
                        var r = e[n].getAttribute("data-tabindex");
                        r && "null" !== r ? e[n].setAttribute("tabindex", r) : e[n].removeAttribute("tabindex"), e[n].removeAttribute("data-tabindex")
                    }
                })
            }

            function $() {
                e.events.on(_.Events.configChanged, function() {
                    M(), e.config.view === _.View.privateUnlocked && T(), Ie = null, Be = null, Re = !0
                })
            }

            function Y() {
                e.events.on(_.Control.reset, function() {
                    P(), T(), C()
                }), (0, f["default"])(window).on("resize", function() {
                    Ie = null, Be = null
                })
            }

            function Q() {
                e.events.on(_.Events.enteredTinyMode, function() {
                    K = !0, _e && _e.classList.add("tiny")
                }).on(_.Events.enteredMiniMode, function() {
                    K = !1, _e && _e.classList.remove("tiny")
                }).on(_.Events.enteredNormalMode, function() {
                    K = !1, _e && _e.classList.remove("tiny")
                })
            }

            function G() {
                var t = e.config.user.progress,
                    n = t / e.config.video.duration;
                !t || e.config.embed.autoplay || e.config.embed.time || (c(n, t), d(n, t), Me = !0)
            }
            var K, J, Z, ee, te, ne, ie, re, oe, ae, se, ue, ce, le, de, fe, ve, he, pe, me, ge, ye, be, _e, we = !1,
                ke = !1,
                Ee = !1,
                Se = !1,
                Te = !1,
                xe = !1,
                Pe = !1,
                Ce = !1,
                Le = !1,
                Oe = !1,
                Me = !1,
                Ae = !0,
                Fe = !1,
                qe = !1,
                Ie = null,
                Be = null,
                je = null,
                Re = !0,
                De = null,
                Ve = null,
                Ne = !1,
                He = !1;
            return M(), F(), B(), I(), j(), W(), R(), D(), V(), N(), H(), U(), z(), X(), $(), Y(), G(), Q(), e.events.on(_.Events.playInitiated, function() {
                q(), ke = !0;
                var t = e.config.embed.time || e.telecine.currentTime;
                s(t / e.config.video.duration, t), Me = !0
            }), e.events.fire(_.Events.controlBarModuleReady), {}
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.formatTime = t.pad = void 0;
        var u = function() {
                function t(t, n) {
                    var i = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var s, u = t[e.iterator](); !(r = (s = u.next()).done) && (i.push(s.value), !n || i.length !== n); r = !0);
                    } catch (c) {
                        o = !0, a = c
                    } finally {
                        try {
                            !r && u["return"] && u["return"]()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return i
                }
                return function(n, i) {
                    if (Array.isArray(n)) return n;
                    if (e.iterator in Object(n)) return t(n, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            c = n(9),
            l = r(c),
            d = n(8),
            f = r(d),
            v = n(88),
            h = r(v),
            p = n(6),
            m = r(p),
            g = n(13),
            y = r(g),
            b = n(5),
            _ = n(2),
            w = n(21),
            k = n(47);
        t["default"] = s, t.pad = o, t.formatTime = a
    }).call(t, n(1), n(11))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        function n() {
            clearTimeout(k), k = null
        }

        function i() {
            O && (clearTimeout(k), k = setTimeout(s, E))
        }

        function r() {
            a["default"].element && a["default"].element.classList.contains("js-player-fullscreen") && (x || (t.style.cursor = "none", T = !0, x = !0))
        }

        function o() {
            x && (t.style.cursor = "default", x = !1)
        }

        function s(t) {
            (C || P) && (n(), document.activeElement && document.body.classList.contains("showfocus") && (F.contains(document.activeElement) || q.contains(document.activeElement)) || (e.events.fire(t ? d.Events.mousedOut : d.Events.mouseTimeout), T = !0, A.classList.add("hidden"), A.setAttribute("hidden", ""), S = !0, r()))
        }

        function c() {
            C && P || (e.events.fire(d.Events.mousedOver), A.classList.remove("hidden"), A.removeAttribute("hidden")), i()
        }

        function f() {
            C || P ? t.removeAttribute("tabindex") : C || P || L || t.setAttribute("tabindex", "0")
        }

        function v() {
            function e() {
                c()
            }

            function a(e) {
                if (E = _, T) return void(T = !1);
                if (o(), 0 !== e.screenX && e.screenX !== screen.width - 1 && 0 !== e.screenY && e.screenY !== screen.height - 1) g = !0, S && c(), i();
                else if (n(), r(), g) {
                    var t = !0;
                    s(t), g = !1
                }
            }

            function d() {
                E = w, i()
            }

            function f() {
                var e = !0;
                s(e)
            }

            function v(e) {
                var t = q.contains(e.target) || F.contains(e.target);
                if (C && P) {
                    if (!t && (C || P)) {
                        var n = !0;
                        s(n)
                    }
                } else c()
            }

            function h(t) {
                return "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE ? (E = _, e(t)) : (E = w, void v(t))
            }

            function p(e) {
                return "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE ? a(e) : void 0
            }

            function m(e) {
                return "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE ? f(e) : void 0
            }
            var g = !0;
            return l["default"].pointerEvents ? void(0, u["default"])(t).on("pointerenter", h).on("pointermove", p).on("pointerleave", m) : void(0, u["default"])(t).on("touchmove", d).on("touchend", v).on("mouseenter", e).on("mousemove", a).on("mouseleave", f)
        }

        function h() {
            e.events.on([d.Events.ended, d.Events.played, d.Events.paused], c).on([d.Events.bufferEnded, d.Events.scrubbingEnded, d.Events.volumeChanged], i).on(d.Events.playInitiated, function() {
                O = !0
            }), e.events.on(d.Events.overlayOpened, f).on(d.Events.controlBarVisibilityChanged, function(e) {
                P = e, f()
            }).on(d.Events.sidedockVisibilityChanged, function(e) {
                C = e, f()
            })
        }

        function p() {
            function n(e) {
                return (e.classList.contains("title") || e.classList.contains("target") || I.contains(e.parentNode) && "HEADER" === e.parentNode.tagName || B.contains(e)) && !F.contains(e)
            }

            function i(t) {
                if (!o && 2 !== t.button && t.target.classList && n(t.target)) {
                    var i = ("pointerup" === t.type || "MSPointerUp" === t.type) && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE;
                    if (e.config.request.flags.increase_tap_area) {
                        if (l["default"].touch || i) {
                            var r = -1 !== e.telecine.supportedPresentationModes.indexOf("inline") && !l["default"].mobileAndroid;
                            if (O && r) return;
                            return void e.events.fire(d.Events.playButtonPressed)
                        }
                    } else {
                        if ((l["default"].iOS || l["default"].android) && (t.target === A || B.contains(t.target))) return;
                        if (i) return
                    }
                    a++, 1 === a && setTimeout(function() {
                        1 === a ? e.events.fire(e.telecine.paused ? d.Events.playButtonPressed : d.Events.pauseButtonPressed) : e.events.fire(d.Events.fullscreenButtonPressed), a = 0
                    }, 200)
                }
            }
            var r = !1,
                o = !1,
                a = 0;
            e.events.on(d.Events.menuVisibilityChanged, function(e) {
                o = e
            }), (0, u["default"])(t).on(l["default"].pointerEvents ? "pointerup" : "click", i), (0, u["default"])(t).on("mousedown", ".video-wrapper", function(e) {
                if (!r) {
                    if (A.classList.remove("hidden"), A.removeAttribute("hidden"), 2 !== e.button) {
                        var t;
                        document.createEvent && (t = document.createEvent("MouseEvents"), t.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), A.dispatchEvent(t))
                    }
                    return !1
                }
            }).on("contextmenu", ".video", function(e) {
                return A.classList.remove("hidden"), A.removeAttribute("hidden"), !1
            }), e.events.on(d.Control.toggleNativeControls, function(e) {
                return e ? (r = !0, void A.classList.add("hidden")) : (r = !1, void A.classList.remove("hidden"))
            })
        }

        function m() {
            if (!l["default"].touch) {
                var n, i;
                (0, u["default"])(t).on("focus", "a, button, input, [tabindex]", function() {
                    i = this, clearTimeout(n), n = null, document.activeElement === this && c()
                }), (0, u["default"])(t).on("blur", "a, button, input, [tabindex]", function() {
                    document.activeElement === this && (n = setTimeout(s, 50))
                }), t.addEventListener("focus", function(e) {
                    c(), i && i.focus()
                }, !1), e.events.on(d.Events.overlayOpened, function() {
                    L = !0, t.removeAttribute("tabindex")
                }), e.events.on(d.Events.overlayClosed, function() {
                    L = !1
                })
            }
        }

        function g() {
            e.events.on(d.Events.didEnterFullscreen, r).on(d.Events.didExitFullscreen, function(e) {
                return S = !0, e ? void s() : (c(), void n())
            })
        }

        function y() {
            e.events.on([d.Events.playProgress, d.Events.seeked], function t(n) {
                n >= M && null === k && (e.events.fire(d.Events.targetTimeReached), e.events.off([d.Events.playProgress, d.Events.seeked], t))
            })
        }

        function b() {
            e.events.on(d.Control.reset, function() {
                S = !0, T = !0, P = !0, C = !1, O = !1, y(), n()
            })
        }
        var _ = 2e3,
            w = 4500,
            k = null,
            E = l["default"].touch ? w : _,
            S = !0,
            T = !0,
            x = !1,
            P = !0,
            C = !1,
            L = !1,
            O = !1,
            M = 1.75,
            A = t.querySelector(".target"),
            F = t.querySelector(".sidedock"),
            q = t.querySelector(".controls"),
            I = t.querySelector(".title"),
            B = t.querySelector(".video");
        return v(), h(), p(), m(), g(), y(), b(), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(76),
        a = i(o),
        s = n(8),
        u = i(s),
        c = n(6),
        l = i(c),
        d = n(2);
    t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        function n() {
            return M ? !1 : e.config.view === o.View.main || e.config.view === o.View.privateUnlocked
        }

        function i() {
            F && "help" === O && e.events.fire(o.Events.overlayCloseButtonPressed)
        }

        function u(e) {
            return "number" != typeof e.which && (e.which = e.keyCode), e
        }

        function c(e) {
            if ("keypress" === e.type) {
                var t = String.fromCharCode(e.which);
                return e.shiftKey || (t = t.toLowerCase()), t
            }
            return e.which in s ? s[e.which] : String.fromCharCode(e.which).toLowerCase()
        }

        function l(e) {
            return e.ctrlKey || e.metaKey || e.altKey ? !1 : e.which in s ? "keydown" === e.type : "keypress" === e.type
        }

        function d(e) {
            var t = e.target || e.srcElement;
            return "INPUT" === t.tagName || "SELECT" === t.tagName || "TEXTAREA" === t.tagName || t.isContentEditable
        }

        function f(t) {
            if (t = Array.isArray(t) ? t : [t], F && "help" === O) {
                if (e.events.fire(o.Events.overlayCloseButtonPressed), t[0] === o.Control.showOverlay && "help" === t[1]) return !1;
                if (t[0] !== o.Control.openVimeo) return setTimeout(function() {
                    e.events.fire.apply(null, t)
                }, 250), !1
            }
            return e.events.fire.apply(null, t), !1
        }

        function v(t, n) {
            if (!V) {
                n && !e.telecine.paused && e.events.fire(o.Events.pauseButtonPressed);
                var i = !0;
                e.events.fire(o.Events.scrubbingStarted, i), V = !0
            }
            m(D), D++, 1 === D && (R = e.config.video.fps);
            var r = n ? 1 : R,
                a = "right" === t ? r : -r,
                s = Math["right" === t ? "ceil" : "floor"](e.telecine.currentTime * e.config.video.fps);
            h(s + a)
        }

        function h(t) {
            var n = null,
                i = t / e.config.video.fps;
            e.events.fire(o.Control.seek, n, i)
        }

        function p(t) {
            R = I, D = 0;
            var n = t.shiftKey;
            e.events.fire(o.Events.scrubbingEnded, n), V = !1
        }

        function m(e) {
            var t = e,
                n = Math.ceil(I),
                i = Math.ceil(B - I),
                r = j;
            R = g(t, n, i, r)
        }

        function g(e, t, n, i) {
            return e /= i, e--, n * (e * e * e + 1) + t
        }

        function y(e) {
            var t = q.focusableItems,
                n = t.indexOf(document.activeElement),
                i = "up" === e ? n - 1 : n + 1,
                r = null;
            return r = i >= t.length ? t[0] : 0 > i ? t[t.length - 1] : t[i], r ? (r.focus(), !1) : !0
        }

        function b() {
            return q ? !0 : document.activeElement && document.activeElement !== document.body ? void 0 : (e.events.fire(o.Events[e.telecine.paused ? "playButtonPressed" : "pauseButtonPressed"]), i(), !1)
        }

        function _() {
            return q ? (q.element.contains(document.activeElement) && q.button.focus(), q.hide(), !1) : document.activeElement && t.contains(document.activeElement) ? (document.activeElement.blur(), !0) : F ? (e.events.fire(o.Events.overlayCloseButtonPressed), !1) : void 0
        }

        function w() {
            if (q) return q.element.contains(document.activeElement) ? y("up") : !0;
            if (e.config.embed.on_site && document.activeElement && !t.contains(document.activeElement)) return !0;
            i();
            var n = !1,
                r = !0;
            return e.events.fire(o.Control.changeVolume, a, n, r), !1
        }

        function k() {
            if (q) return q.element.contains(document.activeElement) ? y("down") : !0;
            if (e.config.embed.on_site && document.activeElement && !t.contains(document.activeElement)) return !0;
            i();
            var n = !1,
                r = !0;
            return e.events.fire(o.Control.changeVolume, -a, n, r), !1
        }

        function E(t, n) {
            if (q) return q.element.contains(document.activeElement) ? y("left" === n ? "up" : "down") : !0;
            if (i(), document.activeElement && document.activeElement === A) {
                var r = !1,
                    s = !0,
                    u = "left" === n ? -a : a;
                return e.events.fire(o.Control.changeVolume, u, r, s), !1
            }
            return t.shiftKey || 0 === D ? void v(n, t.shiftKey) : void N(n, t.shiftKey)
        }

        function S() {
            e.events.on(o.Events.overlayOpened, function(e) {
                F = !0, O = e, "notsupported" === e && (M = !0)
            }), e.events.on(o.Events.overlayClosed, function() {
                F = !1, O = null
            })
        }

        function T() {
            e.events.on(o.Events.menuVisibilityChanged, function(e, t) {
                q = e ? t : !1
            })
        }

        function x() {
            e.events.on(o.Events.configChanged, function(e) {
                e && (M = !1)
            })
        }

        function P() {
            function t(e) {
                if (u(e), l(e) && !d(e) && n()) {
                    var t = c(e);
                    if (t in r) {
                        if ("function" == typeof r[t]) return void(r[t](e, t) === !1 && (e.preventDefault(), e.stopPropagation()));
                        f(r[t]) === !1 && (e.preventDefault(), e.stopPropagation())
                    }
                }
            }

            function i(e) {
                if (u(e), !d(e) && n()) {
                    var t = c(e);
                    "left" !== t && "right" !== t || p(e)
                }
            }
            var r = {
                l: o.Events.likeButtonPressed,
                w: o.Events.watchLaterButtonPressed,
                s: o.Events.shareButtonPressed,
                c: [o.Events.ccButtonPressed, !0],
                h: [o.Events.hdButtonPressed, !0],
                f: o.Events.fullscreenButtonPressed,
                x: [o.Events.filterButtonPressed, !0],
                d: o.Events.debugButtonPressed,
                space: b,
                up: w,
                down: k,
                left: E,
                right: E,
                esc: _,
                "?": [o.Control.showOverlay, "help"]
            };
            e.config.embed.on_site || (r.v = o.Control.openVimeo), document.addEventListener("keydown", t, !1), document.addEventListener("keypress", t, !1), document.addEventListener("keyup", i, !1)
        }

        function C() {
            e.events.on(o.Events.becameActive, function() {
                M = !1
            }).on(o.Events.becameInactive, function() {
                M = !0
            }), e.config.embed.on_site && document.querySelector(".player") === t && (M = !1)
        }

        function L() {
            var e = void 0,
                t = !1;
            document.body.addEventListener("keydown", function(n) {
                9 !== n.which || document.body.classList.contains("showfocus") ? 27 === n.which ? document.body.classList.remove("showfocus") : 32 !== n.which && 13 !== n.which || (t = !0, clearTimeout(e), e = setTimeout(function() {
                    t = !1
                }, 200)) : document.body.classList.add("showfocus")
            }), document.body.addEventListener("click", function(e) {
                t || document.body.classList.remove("showfocus")
            })
        }
        var O, M = !!e.config.embed.on_site,
            A = t.querySelector(".volume"),
            F = !1,
            q = !1,
            I = e.config.video.fps / 5,
            B = Math.max(I, .618 * e.config.video.duration),
            j = 100,
            R = I,
            D = 0,
            V = !1,
            N = (0, r.throttle)(v, 80);
        return S(), T(), x(), P(), C(), L(), {
            pause: function() {
                M = !0
            },
            unpause: function() {
                M = !1
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(5),
        o = n(2),
        a = .05,
        s = {
            16: "shift",
            27: "esc",
            32: "space",
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };
    t["default"] = i, e.exports = t["default"]
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        function n(e) {
            var n = "watchlater" === e || "unwatchlater" === e ? .5 : .4,
                i = t.clientHeight;
            return t.clientHeight > t.clientWidth && (i = t.clientWidth), {
                height: Math.round(i * n),
                width: Math.round(i * n * 1.6)
            }
        }

        function i(e, t) {
            var n = e.querySelector(".hour-hand"),
                i = e.querySelector(".minute-hand");
            if (n && i) {
                var r = t ? 1 : -1,
                    o = new Date,
                    a = Math.abs(o.getHours() - 12),
                    s = o.getMinutes(),
                    u = s / 60 * 360 - 135,
                    c = a / 12 * 360 + s / 60 * 5,
                    d = 1.5,
                    f = c + 30 * d * r,
                    v = u + 360 * d * r;
                if (l["default"].browser.firefox || l["default"].browser.opera) {
                    var h = "10 10";
                    n.setAttribute("transform", "rotate(" + c + "," + h + ")"), i.setAttribute("transform", "rotate(" + u + "," + h + ")");
                    var p = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
                    p.setAttribute("attributeName", "transform"), p.setAttribute("type", "rotate"), p.setAttribute("begin", "0.1s"), p.setAttribute("repeatCount", "indefinite");
                    var m = p.cloneNode(!1);
                    m.setAttribute("from", c + " " + h), m.setAttribute("to", c + 360 * r + " " + h), m.setAttribute("dur", "0.8s"), n.appendChild(m);
                    var g = p.cloneNode(!1);
                    g.setAttribute("from", u + " " + h), g.setAttribute("to", u + 360 * r + " " + h), g.setAttribute("dur", "9.6s"), i.appendChild(g)
                } else n.style[l["default"].transformProperty + "Origin"] = "46% 81.5%", i.style[l["default"].transformProperty + "Origin"] = "25.5% 26.5%", n.style[l["default"].transformProperty] = "rotate(" + c + "deg)", i.style[l["default"].transformProperty] = "rotate(" + u + "deg)";
                window.requestAnimationFrame(function() {
                    e.classList.add("animate"), l["default"].browser.firefox || l["default"].browser.opera || window.requestAnimationFrame(function() {
                        n.style[l["default"].transformProperty] = "rotate(" + f + "deg)", i.style[l["default"].transformProperty] = "rotate(" + v + "deg)"
                    })
                })
            }
        }

        function r(e, r) {
            if (null !== t.parentElement.offsetParent) {
                t.classList.remove("hidden"), t.removeAttribute("hidden"), t.setAttribute("data-name", e);
                var a = n(e),
                    s = "width:" + a.width + "px;height:" + a.height + "px";
                p.style.cssText = s, p.innerHTML = r, "watchlater" !== e && "unwatchlater" !== e || i(p, "watchlater" === e), clearTimeout(h), t.classList.remove("animate"), window.requestAnimationFrame(function() {
                    t.classList.remove("invisible"), h = setTimeout(o, 750)
                })
            }
        }

        function o() {
            t.classList.add("animate"), t.classList.add("invisible")
        }

        function s() {
            t.classList.remove("animate"), t.classList.remove("invisible"), t.classList.add("hidden"), t.setAttribute("hidden", ""), t.removeAttribute("data-name"), p.innerHTML = "", p.classList.remove("filled"), p.classList.remove("animate"), e.events.fire(d.Events.notificationHidden)
        }

        function c() {
            e.events.on(d.Events.liked, function(e) {
                e || r("like", a["default"].render("icon_heart"))
            }), e.events.on(d.Events.unliked, function(e) {
                e || r("unlike", a["default"].render("icon_broken_heart"))
            })
        }

        function f() {
            e.events.on(d.Events.addedToWatchLater, function(e) {
                e || r("watchlater", a["default"].render("icon_clock"))
            }), e.events.on(d.Events.removedFromWatchLater, function(e) {
                e || r("unwatchlater", a["default"].render("icon_clock"))
            })
        }

        function v() {
            (0, u["default"])(t).on("transitionend", function(e) {
                p.contains(e.target) && "height" === e.propertyName ? setTimeout(o, 100) : e.target === t && "opacity" === e.propertyName && window.requestAnimationFrame(s)
            })
        }
        var h, p = t.querySelector(".notification");
        return v(), c(), f(), e.events.fire(d.Events.notificationModuleReady), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(9),
        a = i(o),
        s = n(8),
        u = i(s),
        c = n(6),
        l = i(c),
        d = n(2);
    t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        function n(t) {
            if ("vod" === e.config.embed.outro) return y = {
                purchased: e.config.user.purchased,
                title: e.config.video.vod.feature_title,
                url: e.config.video.vod.url,
                currency: e.config.request.currency,
                countries: e.config.video.vod.countries,
                country: e.config.request.country,
                buttons: e.config.video.vod.purchase_options,
                isPreorder: "undefined" != typeof e.config.video.vod.is_preorder ? e.config.video.vod.is_preorder : !!e.config.video.vod.date_available,
                isComingSoon: e.config.video.vod.is_coming_soon,
                releaseDate: e.config.video.vod.date_available
            }, void(_ === !0 && s());
            k = !0;
            var n = new XMLHttpRequest;
            n.open("GET", "https://" + e.config.player_url + "/video/" + e.config.video.id + "/outro?on_site=" + e.config.embed.on_site + "&type=" + e.config.embed.outro, !0), n.withCredentials = !0, n.onload = function() {
                try {
                    var i = JSON.parse(n.response);
                    y = i.data, "videos" !== i.type && "promoted" !== i.type || (y = {
                        contexts: Array.isArray(y) ? y : [y],
                        owner: e.config.video.owner.id
                    }, r()), "function" == typeof t && t()
                } catch (o) {}
            }, n.send()
        }

        function i(e) {
            for (var t = e.innerHTML; e.scrollHeight > e.clientHeight;) t = t.substring(0, t.length - 1), e.innerHTML = t + "&hellip;"
        }

        function r() {
            for (var e = 0, t = y.contexts.length; t > e; e++)
                for (var n = 0, i = y.contexts[e].videos.length; i > n; n++) {
                    var r = new Image;
                    r.src = y.contexts[e].videos[n].thumbnail
                }
        }

        function o() {
            var e = window.getComputedStyle(g.querySelector("header h1"), null),
                t = e.getPropertyValue("-webkit-line-clamp"),
                n = e.textOverflow;
            if (!t)
                for (var r = g.querySelectorAll("header h1"), o = 0, a = r.length; a > o; o++) "clip" === n ? i(r[o]) : r[o].style.display = "inherit"
        }

        function s() {
            if ("beginning" === e.config.embed.outro) return void e.events.fire(d.Control.reset);
            if (null === y && !k) return void n(s);
            if (y) {
                if ("videos" === e.config.embed.outro || "promoted" === e.config.embed.outro) {
                    var i = y.contexts.reduce(function(e, t) {
                        return e + t.videos.length
                    }, 0);
                    if (0 === i) return
                }
                y.target = !e.config.embed.on_site, g.innerHTML = a["default"].render("outro_" + ("promoted" === e.config.embed.outro ? "videos" : e.config.embed.outro), y), g.setAttribute("data-type", e.config.embed.outro), t.classList.remove("hidden"), t.removeAttribute("hidden"), "videos" === e.config.embed.outro && o(), window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        t.classList.add("in");
                        var n = [];
                        if (y.contexts)
                            for (var i = 0; i < y.contexts.length; i++)
                                for (var r = 0; r < y.contexts[i].videos.length; r++) {
                                    var o = y.contexts[i].videos[r].id,
                                        a = g.querySelector('[data-video-id="' + o + '"]');
                                    a && a.clientWidth > 0 && n.push(o)
                                }
                        b = !0, e.events.fire(d.Events.outroDisplayed, n)
                    })
                })
            }
        }

        function c() {
            b && (b = !1, window.requestAnimationFrame(function() {
                t.classList.remove("in"), e.events.fire(d.Events.outroHidden)
            }))
        }

        function f() {
            e.events.on(d.Events.playProgress, function(e, t, i) {
                _ = !1, !k && null === y && e >= t - w && n()
            })
        }

        function v() {
            e.events.on(d.Events.playInitiated, function() {
                "nothing" !== e.config.embed.outro && "beginning" !== e.config.embed.outro || (y = !1)
            }), e.events.on(d.Events.ended, function() {
                return e.config.embed.email && 1 === e.config.embed.email.time ? (e.events.fire(d.Control.showOverlay, "email-capture"), void e.events.once(d.Events.overlayClosed, function() {
                    return e.events.fire(d.Control.showOutro)
                })) : void e.events.fire(d.Control.showOutro)
            }), e.events.on(d.Control.showOutro, function() {
                e.performDelegateAction(d.Delegate.showOutro, function() {
                    _ = !0, s()
                })
            }), e.events.on(d.Control.hideOutro, function() {
                c()
            }), (0, u["default"])(t).on("click", ".videos a", function(t) {
                e.events.fire(d.Events.outroVideoPressed, parseInt(this.getAttribute("data-video-id"), 10))
            }), (0, u["default"])(t).on("transitionend", function(e) {
                t.classList.contains("in") || (t.classList.add("hidden"), t.setAttribute("hidden", ""))
            }, !1), e.events.on([d.Events.played, d.Events.seeked, d.Events.scrubbingStarted], c)
        }

        function h() {
            e.events.on(d.Control.showOverlay, function() {
                setTimeout(function() {
                    t.classList.add("hidden")
                }, 150)
            }), e.events.on(d.Events.overlayClosed, function() {
                t.classList.contains("in") && t.classList.remove("hidden")
            })
        }

        function p() {
            e.events.on(d.Control.reset, function() {
                y = null, k = !1
            })
        }

        function m() {
            (0, l["default"])(t, ".vod-button", function() {
                var t = this.getAttribute("data-product-id");
                return e.events.fire(d.Events.vodButtonPressed, t), !1
            }), (0, l["default"])(t, ".vod-watch-button", function() {
                return "date_available" in e.config.video.vod ? void 0 : (c(), e.events.fire(d.Events.vodButtonPressed), !1)
            })
        }
        var g = t.querySelector(".outro"),
            y = null,
            b = !1,
            _ = !1,
            w = 10,
            k = !1;
        return f(), v(), h(), p(), m(), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(9),
        a = i(o),
        s = n(8),
        u = i(s),
        c = n(13),
        l = i(c),
        d = n(2);
    t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    (function(i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o() {
            return g[Math.floor(Math.random() * g.length)]
        }

        function a(e, t) {
            function n() {
                var e = t.getBoundingClientRect(),
                    n = ne.getBoundingClientRect(),
                    i = oe.getBoundingClientRect(),
                    r = n.bottom + (e.height - n.bottom) / 2;
                return e.height - r - i.height / 2 + "px"
            }

            function r() {
                var e = t.getBoundingClientRect(),
                    n = ne.getBoundingClientRect(),
                    i = ie.getBoundingClientRect(),
                    r = e.height / 2,
                    o = n.bottom + (e.height - n.bottom) / 2;
                return {
                    top: r - i.height / 2 + "px",
                    transform: "translateY(" + (o - r) + "px)"
                }
            }

            function a(i, o) {
                t.setAttribute("data-name", i), ne.innerHTML = o.template, ee = document.activeElement, ee.blur(), o.modal && h(), o.preventBackgroundClose && t.setAttribute("data-background-close", "false"), o.wrapperClass && t.classList.add(o.wrapperClass), o.icon.type && (o.logo && (oe.classList.remove("hidden"), ie.classList.add("cloaked"), window.requestAnimationFrame(function() {
                    oe.innerHTML = u["default"].render("logo"), oe.style.bottom = n()
                })), ie.classList.remove("hidden"), re.innerHTML = o.icon.html, window.requestAnimationFrame(function() {
                    var e = r();
                    ie.style.top = e.top, ie.style[f["default"].transformProperty] = e.transform
                }), t.setAttribute("data-icon", o.icon.type), ie.setAttribute("data-icon", o.icon.type), re.setAttribute("data-icon", o.icon.type), "private-unlocked" === i && re.classList.add("open")), t.classList.add("invisible"), t.classList.remove("hidden"), t.removeAttribute("hidden"), t.classList.add("in"), ue = o, se = i, ae = !0, e.events.fire(v.Events.overlayOpened, i), ["share", "hd-not-allowed"].indexOf(i) > -1 && (0, m.resetFocus)(t), window.requestAnimationFrame(function() {
                    t.classList.remove("invisible"), window.requestAnimationFrame(function() {
                        ne.classList.add("in"), te.classList.add("in")
                    })
                })
            }

            function s() {
                ne.classList.remove("in"), ne.classList.add("out")
            }

            function c(n) {
                if (!y() && ae) {
                    t.removeAttribute("data-background-close"), te.classList.remove("in"), te.classList.add("out"), s(), t.classList.remove("in"), t.classList.add("out"), clearTimeout(J), J = setTimeout(d, 200), n && n.preventDefault && n.preventDefault();
                    var i = t.querySelector(".back");
                    i && i.classList.add("cloaked"), e.events.fire(v.Events.overlayClosed, se), ae = !1, se = null, ue = null, window.requestAnimationFrame(function() {
                        ee && (ee.focus(), ee = null)
                    })
                }
            }

            function d() {
                t.setAttribute("hidden", ""), t.removeAttribute("data-name"), t.removeAttribute("data-icon"), t.classList.add("hidden"), t.classList.remove("out"), t.classList.remove("embed-active"), t.classList.remove("modal"), t.classList.remove("embed-only"), te.classList.remove("out"), te.classList.remove("in"), ie.removeAttribute("data-icon"), ie.classList.add("hidden"), ie.classList.remove("animate"), re.removeAttribute("data-icon"), re.innerHTML = "", oe.classList.add("hidden"), ne.classList.remove("out"), ne.innerHTML = "", e.events.fire(v.Events.overlayCleared)
            }

            function h() {
                t.classList.add("modal"), t.setAttribute("data-modal", "true")
            }

            function g() {
                t.setAttribute("data-modal", "false")
            }

            function y() {
                return "true" === t.getAttribute("data-modal")
            }

            function b(e) {
                if ("yes" === e.form.getAttribute("data-bubble")) {
                    e.form.setAttribute("data-bubble", "no");
                    var n = t.querySelector(".validation-bubble"),
                        i = n.querySelector(".validation-bubble-message");
                    i.innerHTML = e.validationMessage || "There is an error with this input.";
                    var r = e.getBoundingClientRect(),
                        o = e.form.getBoundingClientRect();
                    n.style.left = r.left - o.left + "px", n.style.top = r.height + 1 + "px", n.classList.remove("hidden"), e.focus(), window.requestAnimationFrame(function() {
                        n.classList.add("animate")
                    }), _()
                }
            }

            function _(e) {
                var n = t.querySelector(".validation-bubble");
                if (n) {
                    if (e) return clearTimeout(Z), void n.classList.remove("animate");
                    clearTimeout(Z), Z = setTimeout(function() {
                        n.classList.remove("animate")
                    }, 5e3)
                }
            }

            function w(e) {
                var n = t.querySelector("input[type=password]");
                return n.form.classList.contains("submitted") ? (n.setAttribute("aria-invalid", "false"), n.setCustomValidity(""), n.checkValidity && !n.checkValidity() ? (n.setAttribute("aria-invalid", "true"), n.validity.valueMissing && n.setCustomValidity("Please enter the password."), e || b(n), !1) : (_(!0), !0)) : null
            }

            function k() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                    n = e.showBubble,
                    i = void 0 === n ? !0 : n,
                    r = t.querySelector("input[type=email]");
                return r.setAttribute("aria-invalid", "false"), r.setCustomValidity(""), r.checkValidity && !r.checkValidity() ? (r.setAttribute("aria-invalid", "true"), r.validity.valueMissing && r.setCustomValidity("Please enter your email."), r.validity.typeMismatch && r.setCustomValidity("Please enter a valid email."), i && b(r), !1) : (_(!0), !0)
            }

            function E(e, n, r) {
                (0, m.resetFocus)(t);
                var o = i(e.querySelectorAll("input")),
                    a = o.map(function(e) {
                        return e.name ? encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) : encodeURIComponent(e.value)
                    }).join("&"),
                    s = new XMLHttpRequest;
                s.open(e.method, e.action + window.location.search, !0), s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s.withCredentials = !0, s.timeout = 3e3, s.onload = function() {
                    var e;
                    try {
                        e = JSON.parse(s.responseText)
                    } catch (t) {}
                    n(e, s)
                }, s.onerror = function(e) {
                    r(e)
                }, s.send(a)
            }

            function S() {
                T(), P(), g(), s()
            }

            function T() {
                oe.classList.add("animate")
            }

            function x() {
                oe.classList.add("hidden"), oe.classList.remove("animate")
            }

            function P() {
                ie.classList.remove("cloaked"), ie.classList.add("animate"), window.requestAnimationFrame(function() {
                    ie.style[f["default"].transformProperty] = "translateY(-10px)"
                })
            }

            function C() {
                ie.classList.add("centered"), ie.style[f["default"].transformProperty] = ""
            }

            function L() {
                re.classList.add("open")
            }

            function O() {
                re.classList.add("pulled-back")
            }

            function M() {
                re.classList.add("out"), re.classList.remove("pulled-back")
            }

            function A() {
                (0, l["default"])(t).on("transitionend", ".overlay-logo", function(e) {
                    "opacity" === e.propertyName && this.classList.contains("animate") && x()
                }), (0, l["default"])(t).on("transitionend", ".overlay-icon-wrapper", function(e) {
                    e.propertyName.indexOf("transform") > -1 && ("" === this.style[f["default"].transformProperty] ? (this.classList.remove("centered"), "lock" !== this.getAttribute("data-icon") || re.classList.contains("open") || re.querySelector("canvas") ? O() : setTimeout(L, 100)) : "translateY(-10px)" === this.style[f["default"].transformProperty] && C())
                }), (0, l["default"])(t).on("transitionend", ".overlay-icon", function(e) {
                    e.propertyName.indexOf("transform") > -1 && (this.classList.contains("out") ? (g(), c()) : this.classList.contains("pulled-back") ? M() : this.classList.contains("open") && O())
                })
            }

            function F() {
                return {
                    modal: !1,
                    template: null,
                    logo: !1,
                    icon: {
                        type: null,
                        html: null
                    }
                }
            }

            function q(t, n) {
                return t.template = u["default"].render("share", {
                    url: e.config.video.url,
                    shareUrl: e.config.video.share_url,
                    playerShareUrl: "https://" + e.config.player_url + "/video/" + e.config.video.id + "/share",
                    title: e.config.video.title,
                    owner: e.config.video.owner.name,
                    embed: "public" === e.config.video.embed_permission && e.config.embed.settings.embed,
                    embedOnly: e.config.embed.settings.share && e.config.embed.settings.share.embed_only,
                    embedCode: e.config.video.embed_code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
                    copyButton: ce || f["default"].flash.installed,
                    customizeEmbed: !!e.config.video.url,
                    readOnly: !f["default"].touch
                }), e.config.embed.settings.share && e.config.embed.settings.share.embed_only && (t.wrapperClass = "embed-only"), t
            }

            function I(t) {
                var n = "Private Video",
                    i = "Log in to watch (if you have permission).";
                return t.icon = {
                    type: "lock",
                    html: u["default"].render("icon_lock")
                }, t.modal = !0, t.logo = !0, t.template = u["default"].render("private_locked", {
                    title: n,
                    subtitle: i,
                    action: "https://" + e.config.vimeo_url + "/log_in"
                }), t
            }

            function B(t) {
                return t.icon = {
                    type: "lock",
                    html: u["default"].render("icon_lock")
                }, t.template = u["default"].render("password", {
                    title: "Password Required",
                    subtitle: "If you&rsquo;ve got it, enter it below.",
                    action: "https://" + e.config.player_url + "/video/" + e.config.video.id + "/check-password"
                }), t.modal = !0, t.logo = !!e.config.embed.settings.branding, t
            }

            function j(e) {
                return e.icon = {
                    type: "lock",
                    html: u["default"].render("icon_lock")
                }, e.template = u["default"].render("private_unlocked"), e
            }

            function R(e) {
                return e.template = u["default"].render("content_rating", {
                    logo: u["default"].render("logo")
                }), e.modal = !0, e
            }

            function D(e, t) {
                return e.template = u["default"].render("error", {
                    title: t.title,
                    message: t.message
                }), e.modal = !!t.modal, e.logo = !!t.logo, t.icon && "lock" === t.icon && (e.icon = {
                    type: "lock",
                    html: u["default"].render("icon_lock")
                }), e
            }

            function V(t) {
                return t.template = u["default"].render("help", {
                    onSite: e.config.embed.on_site
                }), t
            }

            function N(t) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return t.template = u["default"].render("overlay_email_capture", {
                    text: n.text || e.config.embed.email.text,
                    subtitle: n.subtitle || "Share your email address with " + e.config.video.owner.name + ".",
                    action: "https://" + e.config.player_url + "/video/" + e.config.video.id + "/submit-email",
                    confirmation: n.confirmation || e.config.embed.email.confirmation,
                    referrer: e.config.request.referrer
                }), t.modal = !1, t.logo = !1, t.preventBackgroundClose = !0, t
            }

            function H() {
                e.events.on(v.Control.showOverlay, function(t, n) {
                    ce = document.queryCommandSupported && document.queryCommandSupported("copy");
                    var i = function() {
                        var e = F();
                        switch (t) {
                            case "share":
                                return void a(t, q(e, n));
                            case "private-locked":
                                return void a(t, I(e));
                            case "password":
                                return void a(t, B(e));
                            case "private-unlocked":
                                return void a(t, j(e));
                            case "error":
                                return void a(t, D(e, n));
                            case "help":
                                return void a(t, V(e));
                            case "content-rating":
                                return void a(t, R(e));
                            case "email-capture":
                                return void a(t, N(e, n))
                        }
                    };
                    return ae ? "share" !== se && "help" !== se && "hd-not-allowed" !== se || se !== t ? (e.events.once(v.Events.overlayCleared, i), g(), void c()) : void c() : void i()
                }), (0, l["default"])(t).on("input", "input", function() {
                    this.form.classList.add("interacted")
                }).on(["focus", "blur"], "input", function() {
                    _(!0)
                }).on("transitionend", ".validation-bubble", function(e) {
                    "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && this.classList.add("hidden")
                }), e.events.on([v.Events.overlayCloseButtonPressed, v.Events.played], c), e.events.on(v.Events.privateUnlocked, function() {
                    "private-locked" === se && (g(), c())
                }), e.events.on(v.Events.configChanged, function() {
                    "share" === se && (ue = q(F(), e.config.embed.settings.share.embed_only), ne.innerHTML = ue.template)
                }), (0, l["default"])(window).on("resize", function() {
                    if (ae) {
                        oe.style.bottom = n();
                        var e = r();
                        ie.style.top = e.top, ie.style[f["default"].transformProperty] = e.transform
                    }
                })
            }

            function U() {
                function n() {
                    e.events.fire(v.Events.embedCodeCopied);
                    var t = document.querySelector(".embed-copy");
                    t.innerHTML = "Copied!", clearTimeout(i), i = setTimeout(function() {
                        t.innerHTML = "Copy"
                    }, 2e3)
                }
                var i;
                (0, l["default"])(t).on("transitionend", ".share-screen", function(e) {
                    "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && this.classList.add("cloaked")
                }).on("transitionend", ".embed-screen", function(e) {
                    "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && (t.querySelector(".back").classList.add("cloaked"), this.classList.add("cloaked"), (0, m.resetFocus)(t))
                }).on("copy", "input[name=embed_code]", function() {
                    e.events.fire(v.Events.embedCodeCopied)
                }), (0, p["default"])(t, ".back", function() {
                    return t.querySelector(".share-screen").classList.remove("cloaked"), t.classList.remove("embed-active"), !1
                }), (0, p["default"])(t, ".facebook", function() {
                    e.events.fire(v.Events.facebookButtonPressed, this.href);
                    try {
                        document.activeElement.blur()
                    } catch (t) {}
                    return !1
                }), (0, p["default"])(t, ".twitter", function() {
                    e.events.fire(v.Events.twitterButtonPressed, this.href);
                    try {
                        document.activeElement.blur()
                    } catch (t) {}
                    return !1
                }), (0, p["default"])(t, ".tumblr", function() {
                    e.events.fire(v.Events.tumblrButtonPressed, this.href);
                    try {
                        document.activeElement.blur()
                    } catch (t) {}
                    return !1
                }), (0, p["default"])(t, ".email", function() {
                    e.events.fire(v.Events.emailButtonPressed), window.location = this.href;
                    try {
                        document.activeElement.blur()
                    } catch (t) {}
                    return !1
                }), (0, p["default"])(t, ".embed", function() {
                    e.events.fire(v.Events.embedButtonPressed);
                    try {
                        document.activeElement.blur()
                    } catch (t) {}
                    return !1
                }), (0, p["default"])(t, ".embed-copy", function() {
                    if (ce) {
                        var e = document.querySelector("input[name=embed_code]");
                        e.select();
                        try {
                            document.execCommand("copy") && n()
                        } catch (t) {}
                        return document.activeElement.blur(), !1
                    }
                }), f["default"].touch ? (0, l["default"])(ne).on("focus", "input[name=embed_code]", function() {
                    var e = this;
                    setTimeout(function() {
                        e.setSelectionRange(0, 9999), e.setAttribute("readonly", "readonly")
                    }, 0)
                }).on("blur", "input", function() {
                    this.removeAttribute("readonly")
                }) : (0, l["default"])(ne).on("click", "input[name=embed_code]", function() {
                    this.setSelectionRange(0, 9999)
                }), e.events.on(v.Events.facebookButtonPressed, function(e) {
                    (0, m.openWindow)(e, "facebook", {
                        width: 580,
                        height: 400
                    })
                }).on(v.Events.twitterButtonPressed, function(e) {
                    (0, m.openWindow)(e, "twitter", {
                        width: 550,
                        height: 420
                    })
                }).on(v.Events.tumblrButtonPressed, function(e) {
                    (0, m.openWindow)(e, "tumblr", {
                        width: 540,
                        height: 600
                    })
                }).on(v.Events.embedButtonPressed, function() {
                    function i() {
                        var t = document.querySelector(".embed-copy"),
                            i = new ZeroClipboard(t, {
                                moviePath: e.config.request.urls.zeroclip_swf,
                                trustedDomains: ["*"],
                                allowScriptAccess: "always"
                            });
                        i.on("complete", n)
                    }
                    if (e.config.embed.settings.share.embed_only || (t.querySelector(".back").classList.remove("cloaked"), t.querySelector(".embed-screen").classList.remove("cloaked"), t.classList.add("embed-active")), !ce && f["default"].flash.installed) {
                        var r = "zc_script_loaded";
                        if (!document.getElementById(r)) {
                            var o, a = document.createElement("script");
                            return a.setAttribute("id", r), a.setAttribute("src", e.config.request.urls.zeroclip_js), a.onreadystatechange = a.onload = function() {
                                o || i(), o = !0
                            }, void document.getElementsByTagName("head")[0].appendChild(a)
                        }
                        i()
                    }
                })
            }

            function z() {
                (0, l["default"])(ne).on("click", ".popup", function() {
                    return e.events.fire(v.Control.openPopup, "login-private-locked"), !1
                })
            }

            function W() {
                function t(t) {
                    function n(t, n) {
                        return t === !1 ? void i(n.status, n) : (e.events.fire(v.Events.passwordUnlocked, t), "icon-hidden" === window.getComputedStyle(te, ":after").content ? (g(), void c()) : void S())
                    }

                    function i(e) {
                        a.classList.remove("loading"), o.setCustomValidity("Uh oh. There was a problem. Please try again."), o.setAttribute("aria-invalid", "true"), b(o)
                    }
                    var r = w();
                    if (!r) return !1;
                    var o = t.querySelector("input[type=password]"),
                        a = t.querySelector("input[type=submit]");
                    a.classList.add("loading"), E(t, n, i)
                }(0, l["default"])(ne).on("click", ".password input[type=submit]", function() {
                    this.form.classList.add("submitted"), this.form.setAttribute("data-bubble", "yes"), w(!0)
                }).on("submit", ".password form", function() {
                    return t(this), !1
                }).on(["focus", "input"], [".password input[type=email]", ".password input[type=password]"], function() {
                    w()
                })
            }

            function X() {
                (0, p["default"])(ne, ".unlocked button", function() {
                    S(), f["default"].iPad || f["default"].iPhone || e.events.once(v.Events.overlayCleared, function() {
                        e.events.fire(v.Events.playButtonPressed)
                    })
                })
            }

            function $() {
                (0, p["default"])(ne, ".content-rating button", function() {
                    g(), c()
                })
            }

            function Y() {
                function t() {
                    var e = ne.querySelector(".email-capture-form"),
                        t = ne.querySelector(".email-capture-confirm");
                    e.classList.add("invisible"), t.classList.remove("hidden"), window.requestAnimationFrame(function() {
                        window.requestAnimationFrame(function() {
                            t.classList.add("in"), setTimeout(c, 2750)
                        })
                    })
                }

                function n(n) {
                    function i(n, i) {
                        return n === !1 ? void r(i.status, i) : (e.events.fire(v.Events.emailCaptureSuccess), void t())
                    }

                    function r(e) {
                        a.classList.remove("loading"), o.setCustomValidity("Uh oh. There was a problem. Please try again."), o.setAttribute("aria-invalid", "true"), b(o)
                    }
                    if (!k()) return !1;
                    var o = n.querySelector("input[type=email]"),
                        a = n.querySelector("input[type=submit]"),
                        s = {
                            signature: "signature",
                            time: "timestamp",
                            expires: "expires"
                        };
                    Object.keys(s).forEach(function(t) {
                        var i = n.querySelector("input[name=" + t + "]");
                        i.value = e.config.request[s[t]]
                    }), a.classList.add("loading"), E(n, i, r)
                }(0, l["default"])(ne).on("click", ".email-capture input[type=submit]", function() {
                    this.form.classList.add("submitted"), this.form.setAttribute("data-bubble", "yes"), k()
                }).on("submit", ".email-capture form", function() {
                    return e.events.fire(v.Events.emailCaptureSubmitted), n(this), !1
                }).on(["focus", "input"], ".email-capture input[type=email]", function() {
                    k({
                        showBubble: !1
                    })
                })
            }

            function Q() {
                var t = function(e, t, n) {
                    var i = window.location.search.indexOf("partypooper=1") > -1 || window.location.search.indexOf("fun=0") > -1;
                    switch (e) {
                        case "not-supported":
                            return {
                                name: "notsupported",
                                title: i ? "Sorry" : o(),
                                message: n > .5 ? "There was an issue playing this video." : "This video can&rsquo;t be played with your current setup."
                            };
                        default:
                            return {
                                name: e,
                                title: t && t.title || "Sorry",
                                message: t && t.message || "There was an issue with playback."
                            }
                    }
                };
                e.events.on(v.Events.error, function(n) {
                    var i = arguments.length <= 1 || void 0 === arguments[1] ? {
                        modal: !0,
                        "final": !0
                    } : arguments[1];
                    if (i["final"] !== !1) {
                        var r = e.telecine ? e.telecine.currentTime : 0,
                            o = t(n, i, r),
                            s = o.name,
                            l = o.title,
                            d = o.message,
                            f = F();
                        return f.modal = i.modal, f.template = u["default"].render("error", {
                            title: l,
                            message: d
                        }), ae ? (c(), void e.events.once(v.Events.overlayClosed, function() {
                            return a(s, f)
                        })) : void a(s, f)
                    }
                })
            }

            function G() {
                e.events.on(v.Events.configChanged, function() {
                    window.requestAnimationFrame(function() {
                        g(), c()
                    })
                })
            }

            function K() {
                (0, p["default"])(t, ".close", function() {
                    e.events.fire(v.Events.overlayCloseButtonPressed)
                }), (0, l["default"])(t).on(["click", "touchend"], [".window-wrapper", ".share-wrapper", ".overlay-logo"], function(e) {
                    e.stopPropagation()
                }).on(["click", "touchend"], [".overlay-cell", "nav"], function() {
                    return "false" === t.getAttribute("data-background-close") ? !0 : (e.events.fire(v.Events.overlayCloseButtonPressed), !1)
                })
            }
            var J, Z, ee, te = t.querySelector(".overlay-cell"),
                ne = t.querySelector(".overlay"),
                ie = t.querySelector(".overlay-icon-wrapper"),
                re = ie.querySelector(".overlay-icon"),
                oe = t.querySelector(".overlay-logo"),
                ae = !1,
                se = null,
                ue = null,
                ce = !1;
            return H(), A(), U(), z(), W(), X(), $(), Y(), Q(), G(), K(), e.events.fire(v.Events.overlayModuleReady), {}
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(9),
            u = r(s),
            c = n(8),
            l = r(c),
            d = n(6),
            f = r(d),
            v = n(2),
            h = n(13),
            p = r(h),
            m = n(5),
            g = ["Uh Oh!", "D&rsquo;Oh!", "Aw fiddlesticks!", "Jeepers!", "Oh dear!", "Ouch!", "Zoinks!", "Awww, snap!", "Blast!", "Curses!", "ACK!", "Aw shucks.", "Major bummer.", "Dag-nab-it!", "Aargh!", "Boo-hoo!", "&iexcl;Ay caramba!"];
        t["default"] = a, e.exports = t["default"]
    }).call(t, n(11))
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        function n() {
            V && (K || (N && G || U || X) && (H || (!z && !W || U || X) && (V = !1, e.events.fire(v.Events.sidedockVisibilityChanged, V), (J || t).classList.add("invisible"))))
        }

        function i() {
            if (!V && !X && !U) {
                var n = J || t;
                n.classList.add("invisible"), n.classList.remove("hidden"), n.removeAttribute("hidden"), t.classList.remove("hidden"), t.removeAttribute("hidden"), t.classList.contains("vod") && t.classList.remove("vod"), setTimeout(function() {
                    V = !0, e.events.fire(v.Events.sidedockVisibilityChanged, V), n.classList.remove("invisible")
                }, 0)
            }
        }

        function r() {
            N = !1, H = !1, K = !1
        }

        function o(t, n, i) {
            var r = "data-label-" + i,
                o = "add" !== i || e.config.user.logged_in ? r : "data-label-add-logged-out";
            t.setAttribute("aria-label", t.getAttribute(o)), n.classList.add("hidden"), n.setAttribute("hidden", ""), n.firstChild.innerHTML = t.getAttribute(r)
        }

        function s() {
            var e = $.indexOf(this);
            Y.forEach(function(t, n) {
                n !== e && t && t.classList.add("invisible")
            }), e >= 0 && Y[e] && (Y[e].classList.add("invisible"), Y[e].classList.remove("hidden"), Y[e].removeAttribute("hidden", ""), Q = window.requestAnimationFrame(function() {
                Q = window.requestAnimationFrame(function() {
                    Y[e].classList.remove("invisible"), Y[e].classList.add("visible")
                })
            }))
        }

        function c() {
            var e = "BUTTON" === this.tagName ? this : this.querySelector("button"),
                t = $.indexOf(e);
            t >= 0 && Y[t] && (Q && (window.cancelAnimationFrame(Q), Q = null), Y[t].classList.add("invisible"))
        }

        function d() {
            if (M) {
                var e = M.parentElement;
                J.insertBefore(e, J.firstChild)
            }
        }

        function p() {
            if (M) {
                var e = M.parentElement;
                t.insertBefore(e, J)
            }
        }

        function m() {
            if (e.config.view === v.View.main || e.config.view === v.View.privateUnlocked) {
                var n = e.config.embed.settings,
                    i = e.config.video.vod && "purchase_options" in e.config.video.vod && e.config.video.vod.purchase_options.length,
                    r = i && e.config.video.vod.is_coming_soon,
                    o = "ondemand.main" === e.config.embed.context,
                    s = e.config.video.vod && e.config.user.purchased ? 1 : 0,
                    u = i && n.vod && (0, h.isAvailableInCountry)(e.config.video.vod.countries, e.config.request.country);
                u && r && o && (u = !1), t.innerHTML = a["default"].render("sidedock", {
                    loggedIn: !!e.config.user.logged_in,
                    vodButton: u,
                    purchased: s,
                    currency: e.config.request.currency,
                    vodPurchaseInfo: i && e.config.video.vod.purchase_options[0],
                    likeButton: n.like,
                    liked: e.config.user.liked,
                    watchLaterButton: n.watch_later,
                    addedToWatchLater: e.config.user.watch_later,
                    collectionsButton: n.collections,
                    shareButton: n.share,
                    shareButtonLabel: n.share && n.share.embed_only ? "Embed" : "Share"
                }), M = t.querySelector(".vod-button"), u && (J = t.querySelector(".sidedock-inner"), s && d());
                var c = J || t;
                i && u && !e.config.embed.settings.instant_sidedock ? t.classList.add("vod") : l["default"].touch && (V = !0, e.events.fire(v.Events.sidedockVisibilityChanged, V), c.classList.remove("hidden"), c.removeAttribute("hidden"), c.classList.remove("invisible")), A = t.querySelector(".like-button"), F = t.querySelector(".like-label"), q = t.querySelector(".watch-later-button"), I = t.querySelector(".watch-later-label"), B = t.querySelector(".collections-button"), j = t.querySelector(".collections-label"), R = t.querySelector(".share-button"), D = t.querySelector(".share-label"), $ = [M, A, q, R, B], Y = [null, F, I, D, j]
            }
        }

        function g() {
            (0, f["default"])(t, ".vod-button", function() {
                var t = M.getAttribute("data-product-id");
                e.events.fire(v.Events.vodButtonPressed, t)
            }, c), e.events.on(v.Events.outroDisplayed, function() {
                d()
            }), e.events.on(v.Events.outroHidden, function() {
                p()
            })
        }

        function y() {
            (0, f["default"])(t, ".like-button", function() {
                e.events.fire(v.Events.likeButtonPressed)
            }, c), e.events.on(v.Events.liked, function() {
                A && (A.classList.add("on"), o(A, F, "remove"))
            }), e.events.on(v.Events.unliked, function() {
                A && (A.classList.remove("on"), o(A, F, "add"))
            })
        }

        function b() {
            (0, f["default"])(t, ".watch-later-button", function() {
                e.events.fire(v.Events.watchLaterButtonPressed)
            }, c), e.events.on(v.Events.addedToWatchLater, function() {
                q && (q.classList.add("on"), o(q, I, "remove"))
            }), e.events.on(v.Events.removedFromWatchLater, function() {
                q && (q.classList.remove("on"), o(q, I, "add"))
            })
        }

        function _() {
            (0, f["default"])(t, ".collections-button", function() {
                e.events.fire(v.Events.collectionsButtonPressed)
            }, c)
        }

        function w() {
            (0, f["default"])(t, ".share-button", function() {
                return e.events.fire(e.config.embed.settings.share.embed_only ? v.Events.embedButtonPressed : v.Events.shareButtonPressed), !1
            }, c)
        }

        function k() {
            var e = function(e) {
                "opacity" === e.propertyName && e.target.classList.contains("invisible") && (e.target.classList.add("hidden"), e.target.setAttribute("hidden", ""), e.target.classList.remove("visible"))
            };
            (0, u["default"])(t).on("blur", "button", c).on("mouseleave", ".box", c).on(["focus", "pointerdown", "touchstart", "mouseenter"], "button", s).on("transitionend", "label", e), (0, f["default"])(t, "label", function() {
                var e = Y.indexOf(this);
                e >= 0 && $[e].click()
            })
        }

        function E() {
            e.events.on([v.Events.mousedOut, v.Events.mouseTimeout], n).on(v.Events.mousedOver, i).on(v.Events.targetTimeReached, function() {
                G = !0, n()
            }).on(v.Events.played, function() {
                N = !0
            }), (0, u["default"])(t).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], function(e) {
                return "pointerType" in e ? void("mouse" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_MOUSE || (H = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(H = "mouseover" === e.type)
            }), (0, u["default"])(t).on("transitionend", function(e) {
                var n = J || t;
                "opacity" === e.propertyName && n.classList.contains("invisible") && (n.classList.add("hidden"), n.setAttribute("hidden", ""), M && n.contains(M) && (t.classList.add("hidden"), t.setAttribute("hidden", "")))
            })
        }

        function S() {
            e.events.on(v.Events.willEnterFullscreen, function() {
                H = !1, n()
            }).on(v.Events.didExitFullscreen, function(e) {
                e || (K = !0)
            })
        }

        function T() {
            e.events.on([v.Events.airPlayActivated], function() {
                z = !0, i()
            }).on([v.Events.airPlayDeactivated], function() {
                z = !1
            })
        }

        function x() {
            e.events.on(v.Events.pictureInPictureActivated, function() {
                W = !0, i()
            }).on(v.Events.pictureInPictureDeactivated, function() {
                W = !1
            })
        }

        function P() {
            e.events.on(v.Events.overlayOpened, function() {
                U = !0, H = !1, n()
            }).on(v.Events.overlayClosed, function() {
                U = !1, i()
            })
        }

        function C() {
            e.events.on(v.Events.alertVisibilityChanged, function(e) {
                X = e, e && n()
            })
        }

        function L() {
            e.events.on(v.Events.configChanged, function() {
                m()
            })
        }

        function O() {
            e.events.on(v.Control.reset, function() {
                H = !1, G = !1, n(), r()
            })
        }
        var M, A, F, q, I, B, j, R, D, V = !1,
            N = !1,
            H = !1,
            U = !1,
            z = !1,
            W = !1,
            X = !1,
            $ = [],
            Y = [],
            Q = null,
            G = !1,
            K = !1,
            J = null;
        return m(), g(), y(), b(), _(), w(), k(), E(), S(), T(), x(), P(), C(), L(), O(), e.events.fire(v.Events.sidedockModuleReady), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(9),
        a = i(o),
        s = n(8),
        u = i(s),
        c = n(6),
        l = i(c),
        d = n(13),
        f = i(d),
        v = n(2),
        h = n(75);
    t["default"] = r, e.exports = t["default"]
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        function n() {
            b = !1, t.classList.add("invisible")
        }

        function i() {
            t.classList.remove("hidden"), t.removeAttribute("hidden"), setTimeout(function() {
                b = !0, t.classList.remove("invisible")
            }, 0)
        }

        function r() {
            if (b) {
                if (w) return void n();
                if (T) return void n();
                if (!k && E) return S && _ ? void 0 : void n()
            }
        }

        function o() {
            if (!b) {
                if (k && !w) return void i();
                if (S && !x && !T) return E || w ? e.config.embed.settings.info_on_pause && S && !w ? void i() : void 0 : void i()
            }
        }

        function s() {
            if (e.config.view === v.View.main || e.config.view === v.View.privateUnlocked) {
                var n = {
                        targetBlank: 0 === e.config.embed.on_site,
                        linkToOwner: null !== e.config.video.owner.url,
                        ownerLink: e.config.video.owner.url,
                        showPortrait: !!e.config.embed.settings.portrait,
                        portraitImg: e.config.video.owner[l["default"].devicePixelRatio > 1 ? "img_2x" : "img"],
                        showTitle: !!e.config.embed.settings.title,
                        showTitleLink: null !== e.config.video.url,
                        titleLink: e.config.video.url,
                        title: e.config.video.title,
                        showByline: !!e.config.embed.settings.byline,
                        owner: e.config.video.owner.name
                    },
                    i = e.config.embed.settings.byline_badge;
                i && i.type && (n.bylineBadge = {
                    cssClass: i.type,
                    link: i.url || !1
                });
                var r = e.config.embed.settings.badge;
                if (r) {
                    var o = l["default"].devicePixelRatio > 1 ? "img_2x" : "img";
                    l["default"].svg && r.svg && (o = "svg"), n.showPortrait = !1, n.badge = {
                        link: r.link,
                        img: r[o],
                        offset: r.offset || !1,
                        width: r.width,
                        height: r.height,
                        name: r.name,
                        shadow: r.shadow || !1
                    }
                }
                e.config.embed.autoplay && (t.classList.add("hidden"), t.setAttribute("hidden", "")), t.innerHTML = a["default"].render("title", n)
            }
        }

        function c() {
            e.events.on([v.Events.mousedOut, v.Events.mouseTimeout], r).on(v.Events.mousedOver, o).on(v.Events.playInitiated, function() {
                E = !0, S = !1, r()
            }).on([v.Events.playButtonPressed, v.Events.played], function() {
                S = !1, x = !1, r()
            }).on(v.Events.paused, function(e, t) {
                t || (S = !0, o())
            }).on(v.Events.ended, function() {
                T = !0, r()
            }).on(v.Events.scrubbingStarted, function() {
                P = S, x = !0
            }).on(v.Events.scrubbingEnded, function() {
                P && (x = !1)
            }).on(v.Events.willEnterFullscreen, function() {
                r()
            }).on(v.Events.didExitFullscreen, function(e) {
                e || o()
            }), (0, u["default"])(t).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], function(e) {
                return "pointerType" in e ? void("mouse" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_MOUSE || (_ = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(_ = "mouseover" === e.type)
            }), (0, u["default"])(t).on("transitionend", function(e) {
                "opacity" === e.propertyName && t.classList.contains("invisible") && (t.classList.add("hidden"), t.setAttribute("hidden", ""))
            }, !1)
        }

        function d() {
            e.events.on(v.Events.ended, function(e) {
                r()
            })
        }

        function h() {
            e.events.on([v.Events.airPlayActivated], function() {
                k = !0, o()
            }).on([v.Events.airPlayDeactivated], function() {
                k = !1, r()
            })
        }

        function p() {
            e.events.on(v.Events.overlayOpened, function(e) {
                "notsupported" !== e && "private-unlocked" !== e && "help" !== e && (w = !0, _ = !1, r())
            }).on(v.Events.overlayClosed, function() {
                w = !1, _ = !1, setTimeout(o, 0)
            })
        }

        function m() {
            (0, f["default"])(t, ".badge", function() {
                e.events.fire(v.Events.badgePressed, e.config.embed.settings.badge.id)
            })
        }

        function g() {
            e.events.on(v.Events.configChanged, function() {
                s(), e.config.view === v.View.privateUnlocked && o()
            })
        }

        function y() {
            e.events.on(v.Control.reset, function() {
                E = !1, S = !0, T = !1, x = !1, o()
            })
        }
        var b = !0,
            _ = !1,
            w = !1,
            k = !1,
            E = !1,
            S = !0,
            T = !1,
            x = !1,
            P = !1;
        return s(), c(), d(), h(), p(), m(), g(), y(), e.events.fire(v.Events.titleModuleReady), {}
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(9),
        a = i(o),
        s = n(8),
        u = i(s),
        c = n(6),
        l = i(c),
        d = n(13),
        f = i(d),
        v = n(2);
    t["default"] = r, e.exports = t["default"]
}, , function(e, t, n) {
    (function(i) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t, n, r) {
            function o() {
                x.style.left = "-999999px";
                var e = (0, d.getBoundingClientRect)(t),
                    i = (0, d.getBoundingClientRect)(n),
                    r = (0, d.getBoundingClientRect)(x),
                    o = e.left + e.width / 2 - r.width / 2 - i.left,
                    a = i.height,
                    s = i.left + o + r.width,
                    u = n.classList.contains("play-bar") ? i.right : i.width - parseInt(window.getComputedStyle(n).paddingRight, 10);
                if (s > u) {
                    var c = s - u;
                    o -= c;
                    var l = e.left - (i.left + o) + e.width / 2;
                    l !== S && ((0, d.addCssRule)(".player .menu::after", "left:" + l + "px", document.styleSheets[document.styleSheets.length - 1]), S = l)
                }
                x.style.left = o + "px", x.style.bottom = a + "px"
            }

            function a() {
                x.style.height = "auto";
                var e = (0, d.getBoundingClientRect)(r.element),
                    t = (0, d.getBoundingClientRect)(x),
                    n = e.bottom - t.bottom,
                    i = 0,
                    o = r.element.querySelector(".title");
                if (o) {
                    var a = (0, d.getBoundingClientRect)(o);
                    i = Math.max(10, a.height)
                }
                var s = e.height - n - i,
                    u = e.height / 2,
                    c = Math.max(s, u),
                    l = x.querySelector(".scrollable-items"),
                    f = l.children,
                    v = 0;
                if (f && f.length) {
                    var h = f[0],
                        p = getComputedStyle(h),
                        m = h.clientHeight + parseInt(p.marginTop, 10) + parseInt(p.marginBottom, 10);
                    v = m / 2
                }
                t.height > c && (x.style.height = Math.min(c - v, t.height) + "px")
            }

            function u(e) {
                var t = document.createElement("ul");
                t.classList.add("menu"), t.classList.add("rounded-box"), t.classList.add("hidden"), t.classList.add("invisible"), t.setAttribute("hidden", ""), t.setAttribute("id", L), t.setAttribute("role", "menu"), F = document.createElement("div"), F.classList.add("item-container");
                var n = document.createDocumentFragment();
                e.forEach(function(e) {
                    var t = document.createElement("li");
                    t.setAttribute("tabindex", "0"), t.setAttribute("role", "menuitemradio"), t.setAttribute("aria-checked", "false"), t.setAttribute("data-id", e.id), t.innerHTML = "<span>" + e.label + "</span>", e.active && (t.classList.add("active"), t.setAttribute("aria-checked", "true"), P = t), n.appendChild(t)
                }), A = document.createElement("div"), A.classList.add("scrollable-items");
                var i = document.createElement("div");
                i.classList.add("sticky-items"), i.appendChild(n.lastChild), A.appendChild(n);
                var a = document.createElement("div");
                return a.classList.add("top-shadow"), F.appendChild(A), F.appendChild(i), F.appendChild(a), t.appendChild(F), q = A.firstChild, I = A.lastChild, A.addEventListener("mousewheel", f), A.addEventListener("scroll", f), A.addEventListener("focusin", h), r.events.on(l.Events.menuVisibilityChanged, function(e) {
                    setTimeout(f, 10)
                }), r.events.on([l.Events.enteredTinyMode, l.Events.enteredMiniMode, l.Events.enteredNormalMode], function(e) {
                    f(), o(), C && r.events.fire(l.Events.menuVisibilityChanged, C, E)
                }), t
            }

            function f(e) {
                var t = A,
                    n = t.scrollHeight,
                    i = t.scrollTop,
                    r = t.clientHeight,
                    o = n - r,
                    a = e || {},
                    s = a.deltaY,
                    u = void 0 === s ? 0 : s;
                return F.classList.remove("scroll-off"), 1 >= n - r ? void F.classList.add("scroll-off") : (i >= o ? (O = !0, F.classList.add("scroll-end")) : O && (O = !1, F.classList.remove("scroll-end")), 0 >= i ? (M = !0, F.classList.add("scroll-start")) : M && (M = !1, F.classList.remove("scroll-start")), void((O && u > 0 || M && 0 > u) && e.preventDefault()))
            }

            function h(e) {
                var t = e.target,
                    n = q.contains(t),
                    i = I.contains(t);
                n ? A.scrollTop = 0 : i && (A.scrollTop = A.scrollHeight)
            }

            function p(e) {
                C || (e = e || t.contains(document.activeElement), x.classList.remove("hidden"), x.removeAttribute("hidden"), o(), o(), a(), t.setAttribute("aria-expanded", "true"), C = !0, r.events.fire(l.Events.menuVisibilityChanged, C, E), window.requestAnimationFrame(function() {
                    x.classList.remove("invisible"), x.classList.add("open"), f(), e && (P || _()[0]).focus()
                }))
            }

            function m() {
                C && (t.setAttribute("aria-expanded", "false"), C = !1, r.events.fire(l.Events.menuVisibilityChanged, C, E), x.classList.add("invisible"))
            }

            function g(e) {
                return C ? (m(), !1) : (p(e), !0)
            }

            function y(e) {
                P && (P.classList.remove("active"), P.setAttribute("aria-checked", "false"));
                var t = x.querySelector('[data-id="' + e + '"]');
                t && (P = t, P.classList.add("active"), P.setAttribute("aria-checked", "true"))
            }

            function b() {
                x.parentElement.removeChild(x)
            }

            function _() {
                var e = i(x.querySelectorAll('[tabindex="0"]'));
                return e
            }

            function w() {
                x = u(e), t.setAttribute("aria-controls", L), t.setAttribute("aria-expanded", "false"), t.setAttribute("aria-haspopup", "true"), (0, v["default"])(x, ["li", "span"], function() {
                    var e = "SPAN" === this.tagName ? this.parentElement : this;
                    T.fire("selected", e.getAttribute("data-id"))
                }), (0, v["default"])(t, function() {
                    g()
                }), (0, c["default"])(window).on("focus", function(e) {
                    var n = document.activeElement,
                        i = x.contains(n),
                        r = t.contains(n);
                    i || r || m()
                });
                var i = function(e) {
                    return ("keypress" === e.type && 13 === e.which || "keydown" === e.type && 32 === e.which) && x.contains(document.activeElement) ? (T.fire("selected", document.activeElement.getAttribute("data-id")), m(), !1) : void 0
                };
                (0, c["default"])(x).on("keydown", i), (0, c["default"])(x).on("keypress", i), window.addEventListener("resize", o), n.insertBefore(x, t.nextSibling)
            }

            function k() {
                (0, c["default"])(document).on("click", function(e) {
                    C && !t.contains(e.target) && m()
                }), (0, c["default"])(x).on("transitionend", function(e) {
                    this === x && "opacity" === e.propertyName && x.classList.contains("invisible") && (x.classList.add("hidden"), x.setAttribute("hidden", ""), x.classList.remove("open"))
                }), window.addEventListener("blur", m, !1), r.events.on(l.Events.didExitFullscreen, m).on(l.Events.controlBarVisibilityChanged, function(e) {
                    e || m()
                })
            }
            var E, S, T = s["default"].make(),
                x = null,
                P = null,
                C = !1,
                L = "menu-" + Math.round(1e3 * Math.random() + (new Date).getTime()),
                O = !1,
                M = !1,
                A = void 0,
                F = void 0,
                q = void 0,
                I = void 0;
            return w(), k(), E = {
                show: p,
                hide: m,
                toggle: g,
                setActiveItem: y,
                on: T.on,
                off: T.off,
                destroy: b,
                button: t,
                element: x,
                get focusableItems() {
                    return _()
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(4),
            s = r(a),
            u = n(8),
            c = r(u),
            l = n(2),
            d = n(5),
            f = n(13),
            v = r(f);
        t["default"] = o, e.exports = t["default"]
    }).call(t, n(11))
}]);