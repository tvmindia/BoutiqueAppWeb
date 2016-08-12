(function() {
    $(document).ready(function() {
        var e, o, i, t, s, a, l, n, r;
        return r = ResponsiveBootstrapToolkit, e = new ScrollMagic.Controller, t = function() {
            var o, i, t, s;
            return s = (new TimelineMax).add([TweenMax.to(".slide_intro_title", 1, {
                color: "#000000"
            }), TweenMax.to(".header", 1, {
                color: "#000000"
            }), TweenMax.to(".header .-button", 1, {
                borderColor: "#f21b4f",
                backgroundColor: "#f21b4f",
                color: "#fff"
            }), TweenMax.to(".slide_intro_cover", 1, {
                autoAlpha: 1
            })]), o = new ScrollMagic.Scene({
                triggerElement: ".slide",
                duration: "15%",
                triggerHook: "onLeave"
            }).setTween(s).addTo(e), i = new ScrollMagic.Scene({
                triggerElement: ".slide_intro_trigger",
                duration: 0,
                triggerHook: "onLeave"
            }).setClassToggle(".header", "-sticky").addTo(e), t = new ScrollMagic.Scene({
                triggerElement: ".slide_intro_trigger",
                duration: 0,
                triggerHook: "onLeave"
            }).setClassToggle(".slide_intro", "-static").addTo(e)
        }, l = function() {
            var o, i, t, s, a, l, n, r, d, g, _;
            return o = new ScrollMagic.Scene({
                triggerElement: ".slide_shop_trigger1",
                duration: "75%",
                triggerHook: "onLeave"
            }).setPin(".slide_shop").addTo(e), n = (new TimelineMax).add([TweenMax.to(".slide_shop_pages", 1, {
                autoAlpha: 1
            })]), i = new ScrollMagic.Scene({
                triggerElement: ".slide_shop_trigger0",
                duration: "25%",
                triggerHook: "onLeave"
            }).setTween(n).addTo(e), r = (new TimelineMax).add([TweenMax.to(".slide_shop_list_item1", 1, {
                autoAlpha: 0,
                y: "-100%"
            }), TweenMax.to(".slide_shop_list_item2", 1, {
                autoAlpha: 1,
                y: "0%"
            }), TweenMax.to(".slide_shop_page1", 1, {
                scale: 0
            }), TweenMax.to(".slide_shop_page2", 1, {
                scale: 1
            }), TweenMax.to(".slide_shop_bg.-slide1", 1, {
                autoAlpha: 0
            }), TweenMax.to(".slide_shop_bg.-slide2", 1, {
                autoAlpha: 1
            }), TweenMax.to(".slide_shop_bg.-door", 1, {
                autoAlpha: 1
            })]), t = new ScrollMagic.Scene({
                triggerElement: ".slide_shop_trigger1",
                duration: "25%",
                triggerHook: "onLeave"
            }).setTween(r).addTo(e), d = (new TimelineMax).add([TweenMax.to(".slide_shop_list_item2", 1, {
                autoAlpha: 0,
                y: "-100%"
            }), TweenMax.to(".slide_shop_list_item3", 1, {
                autoAlpha: 1,
                y: "0%"
            }), TweenMax.to(".slide_shop_page2", 1, {
                scale: 0
            }), TweenMax.to(".slide_shop_page3", 1, {
                scale: 1
            }), TweenMax.to(".slide_shop_bg.-slide2", 1, {
                autoAlpha: 0
            }), TweenMax.to(".slide_shop_bg.-slide3", 1, {
                autoAlpha: 1
            }), TweenMax.to(".slide_shop_bg.-door", 1, {
                autoAlpha: 0
            })]), s = new ScrollMagic.Scene({
                triggerElement: ".slide_shop_trigger2",
                duration: "25%",
                triggerHook: "onLeave"
            }).setTween(d).addTo(e), g = (new TimelineMax).add([TweenMax.to(".slide_shop_list_item3", 1, {
                autoAlpha: 0,
                y: "-100%"
            }), TweenMax.to(".slide_shop_list_item4", 1, {
                autoAlpha: 1,
                y: "0%"
            }), TweenMax.to(".slide_shop_page3", 1, {
                scale: 0
            }), TweenMax.to(".slide_shop_page4", 1, {
                scale: 1
            }), TweenMax.to(".slide_shop_bg.-slide3", 1, {
                autoAlpha: 0
            }), TweenMax.to(".slide_shop_bg.-slide4", 1, {
                autoAlpha: 1
            }), TweenMax.to(".slide_shop_bg.-sign", 1, {
                autoAlpha: 1
            }), TweenMax.to(".slide_shop_bg.-door", 1, {
                autoAlpha: 1
            })]), a = new ScrollMagic.Scene({
                triggerElement: ".slide_shop_trigger3",
                duration: "25%",
                triggerHook: "onLeave"
            }).setTween(g).addTo(e), _ = (new TimelineMax).add([TweenMax.to(".slide_shop_pages", 1, {
                autoAlpha: 0
            })]), l = new ScrollMagic.Scene({
                triggerElement: ".slide_shop_trigger4",
                duration: "25%",
                triggerHook: "onLeave"
            }).setTween(_).addTo(e)
        }, a = function() {
            return $(".slide_shop_bg_container").cycle({
                slides: ".slide_shop_bg.-carousel",
                timeout: 0,
                pager: ".slide_shop_list_pager",
                pagerTemplate: "",
                slideCss: "",
                log: !1,
                updateView: 1,
                sync: !1,
                speed: 0,
                autoHeight: !1,
                fx: "custom"
            }), $(".slide_shop_list").cycle({
                slides: ".slide_shop_list_item",
                timeout: 0,
                pager: ".slide_shop_list_pager",
                slideCss: "",
                log: !1,
                swipe: !0,
                updateView: 1,
                sync: !1,
                speed: 0,
                autoHeight: !1,
                fx: "custom",
                hideNonActive: !1
            }).on("cycle-initialized cycle-before", function(e, o) {
                return $(".slide_shop_bg_container").cycle("goto", o.slideNum - 1)
            })
        }, n = function() {
            var o, i, t, s, a;
            return o = $("#iphone1_video")[0], i = $("#iphone2_video")[0], a = $("#mail_video")[0], t = new ScrollMagic.Scene({
                triggerElement: ".slide_service",
                duration: 0
            }).on("progress", function(e) {
                return 1 === e.progress ? (o.play(), i.play()) : (o.pause(), i.pause())
            }).addTo(e), s = new ScrollMagic.Scene({
                triggerElement: ".slide_inbox",
                duration: 0
            }).on("progress", function(e) {
                return 1 === e.progress ? a.play() : a.pause()
            }).addTo(e)
        }, s = function() {
            return $(".slide_service").cycle({
                slides: ".slide_service_list_item",
                pager: ".slide_service_pager",
                timeout: 0,
                slideCss: "",
                log: !1,
                swipe: !0,
                updateView: 1,
                sync: !1,
                speed: 0,
                autoHeight: !1,
                fx: "custom",
                hideNonActive: !1
            })
        }, r.is("xs") ? (a(), s()) : (t(), l(), n()), o = document.getElementById("promo_video"), i = $f(o), $(".js-play-video").click(function() {
            return $(".slide_intro_video").addClass("-playing"), $(".slide.-intro").addClass("-playing"), i.api("play"), !1
        }), $(".js-pause-video").click(function() {
            return $(".slide_intro_video").removeClass("-playing"), $(".slide.-intro").removeClass("-playing"), i.api("pause"), !1
        })
    })
}).call(this);