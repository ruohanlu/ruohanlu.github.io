'use strict';
(function() {
    function n(d) {
        d.stopPropagation()
    }
    function g(d) {
        d.clientY > a && f()
    }
    function p() {
        w.overflowY = "hidden";
        t.className = "header header--open";
        m.onclick = f;
        m.setAttribute("aria-expanded", "true");
        r = !0
    }
    function f() {
        w.overflowY = "auto";
        t.className = "header";
        m.onclick = p;
        m.setAttribute("aria-expanded", "false");
        r = !1
    }
    function e(d) {
        d.shiftKey || "Tab" !== d.key || (d.preventDefault(),
        u.focus())
    }
    function k(d) {
        d.shiftKey && "Tab" === d.key && (d.preventDefault(),
        v.focus())
    }
    function h(d) {
        r && "Escape" === d.key && f()
    }
    function c() {
        600 >= window.innerWidth ? (a = t.offsetHeight,
        q.addEventListener("touchdown", g, b),
        q.addEventListener("click", g, b),
        window.addEventListener("keydown", h, b),
        u.addEventListener("keydown", k, b),
        v.addEventListener("keydown", e, b)) : (q.removeEventListener("touchdown", g, b),
        q.removeEventListener("click", g, b),
        window.removeEventListener("keydown", h, b),
        u.removeEventListener("keydown", k, b),
        v.removeEventListener("keydown", e, b),
        r && f())
    }
    var a, r = !1;
    const w = document.documentElement.style
      , b = {
        passive: !0
    }
      , t = document.getElementById("Header")
      , q = document.getElementById("HeaderNav")
      , m = q.firstElementChild;
    m.onclick = p;
    var l = m.nextElementSibling;
    l.addEventListener("touchdown", n, b);
    l.addEventListener("click", n, b);
    l = l.getElementsByTagName("a");
    const u = l[0]
      , v = l[l.length - 1];
    window.addEventListener("pagehide", f, b);
    window.addEventListener("resize", c, b);
    window.addEventListener("orientationchange", c, b);
    c()
}
)();
(function() {
    function n() {
        window.removeEventListener("mousemove", n, e);
        for (var a = 0; a < h.length; ++a)
            h[a].addEventListener("mousemove", g, e)
    }
    function g() {
        c.add("mouse-hover");
        c.remove("key-hover");
        for (var a = 0; a < h.length; ++a)
            h[a].removeEventListener("mousemove", g, e)
    }
    function p() {
        window.keyMode = !1;
        window.mouseMode = !0;
        c.add("mouse-input");
        c.remove("key-input");
        window.removeEventListener("focusin", f, k);
        g()
    }
    function f() {
        window.keyMode = !0;
        window.mouseMode = !1;
        c.remove("mouse-hover");
        c.add("key-hover");
        c.remove("mouse-input");
        c.add("key-input");
        window.removeEventListener("focusin", f, k);
        window.addEventListener("mousemove", n, e)
    }
    const e = {
        passive: !0
    }
      , k = {
        passive: !0,
        capture: !0
    }
      , h = document.querySelectorAll("a, button")
      , c = document.documentElement.classList;
    p();
    window.addEventListener("mousedown", p, e);
    window.addEventListener("touchstart", function() {
        window.keyMode = !1;
        window.mouseMode = !0;
        c.remove("mouse-hover");
        c.remove("key-hover");
        window.removeEventListener("focusin", f, k);
        for (var a = 0; a < h.length; ++a)
            h[a].removeEventListener("mousemove", g, e)
    }, e);
    window.addEventListener("keydown", function(a) {
        "Tab" === a.key && window.addEventListener("focusin", f, k)
    }, e)
}
)();
