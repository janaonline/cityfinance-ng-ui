
module.exports = function () {
    if (window.JOONBOT_WIDGET_ID) {
        console.warn("Joonbot snippet included twice");
    } else {
        window.JOONBOT_WIDGET_ID = "f846bb00-1359-4196-9ecf-47094ddc04f7";
        window.JB_source = (JSON.parse(localStorage.getItem("userData"))).name;
        var n, o;
        o = document.createElement("script");
        o.src = "https://js.joonbot.com/init.js", o.defer = !0, o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous";
        n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
    }
}()
