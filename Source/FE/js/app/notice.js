/**
 * Created by Lucien on 10/2/2015.
 */
define(function () {

    var noticeEle = document.getElementById("notice"),
        cancel_html = "<span class='notice-cancel' data-action='cancel'>撤消</span>",
        nDelay = 4000;

    function notice(html, styleClass, delay) {
        noticeEle.className = styleClass;
        noticeEle.innerHTML = html;
        noticeEle.style.display = "block";
        setTimeout(function () {
            noticeEle.style.display = "none";
        }, delay || nDelay);
        return noticeEle;
    }

    function warning(html) {
        return notice(html, "notice-show warning");
    }

    function error(html) {
        return notice(html, "notice-show error");
    }

    function success(html) {
        return notice(html, "notice-show success");
    }

    function confirm(f,html, delay) {
        var timer = setTimeout(f, delay);
        removeTimer(timer);
        return notice(html + cancel_html, "notice-show-3s confirm", delay || 3000);


    }

    function removeTimer(timer) {
        timer&&noticeEle.addEventListener("click", function (event) {
            var src = event.srcElement || event.target,
                action = src.getAttribute("data-action");
            if (action === "cancel") {
                timer&&clearTimeout(timer);
                success("撤消成功");
            }

        })
    }

    return {
        'warning': warning,
        'error': error,
        'success': success,
        'confirm': confirm
    };
});