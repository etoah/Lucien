/**
 * Created by Lucien on 10/1/2015.
 */


define(function () {

    var keyCodeMap = {
        enter: 13,
        shift: 16,
        control: 17,
        option: 18,
        escape: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90,
        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57,
        command: 91,
        rcommand: 93,
        f1: 112,
        f2: 113,
        f3: 114,
        f4: 115,
        f5: 116,
        f6: 117,
        f7: 118,
        f8: 119,
        f9: 120,
        f10: 121,
        f11: 122,
        f12: 123,
        plus: 187,
        comma: 188,
        minus: 189,
        period: 190,
        slash: 191,
        tilde: 192,
        'left bracket': 219,
        backslash: 220,
        'right bracket': 221
    };

    function shouldTrigger(e, keys) {
        var len = keys.length,
            i = 0;
        if (typeof keys == 'string' || len == 1) {

            return e.which == keyCodeMap[keys];

        }
        else if (e.altKey || e.ctrlKey || e.shiftKey) {
            for (; i < len - 1; i++)//最后一个为非功能键
            {
                //前面几个为功能键
                if (!e[keys[i].toLowerCase() + 'Key']) {
                    return false;
                }
            }
            return e.which == keyCodeMap[keys[len - 1]];

        }
        else {
            return false;
        }
    }


    function KeyMap(seletor) {
        if (seletor) {
            this.element = document.querySelector(seletor);
        }
        else {
            this.element = document;
        }


    }


    KeyMap.prototype.keyBind = function (keys, keyup, keydown) {


        if (keyup) {
            this.element.addEventListener("keyup", function (e) {
                if (shouldTrigger(e, keys)) {
                    keyup(e);
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }
            });
        }
        if (keydown) {
            this.element.addEventListener("keydown", function (e) {
                if (shouldTrigger(e, keys)) {
                    keydown(e);
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }
            });
        }

        return this;

    };


    return KeyMap;
});
