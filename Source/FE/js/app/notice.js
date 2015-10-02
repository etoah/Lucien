/**
 * Created by Lucien on 10/2/2015.
 */
define(function(){

    var noticeEle=document.getElementById("notice"),
        nDelay=1500;

    function notice(html,styleClass,delay)
    {
        noticeEle.className=styleClass;
        noticeEle.innerHTML=html;
        noticeEle.style.display="block";
        setTimeout(function(){
            noticeEle.style.display="none";
        },delay||nDelay);
        return noticeEle;
    }

    function warning(html)
    {
       return notice(html,"notice-show warning");
    }

    function error(html)
    {
        return notice(html,"notice-show error");
    }

    function success(html)
    {
        return notice(html,"notice-show success");
    }

    function confirm(html,delay)
    {
        return notice(html,"confirm",delay||2000);
    }

    return {
        'warning':warning,
        'error':error,
        'success':success,
        'confirm':confirm
    };
});