// get current time when window loads
var window_loaded_timestamp = new Date().getTime();

(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            zoomRatio = getBrowserZoomRatio();
            width = (screen.width) ? screen.width * zoomRatio : '';
            height = (screen.height) ? screen.height * zoomRatio : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Chrome OS', r: /CrOS/ },
            { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
    }


    var time = new Date();


    //获取网站来源地址
    var a = document.createElement("a"); //通过指定名称创建一个元素
    a.href = document.referrer;

    window.clientInfo = {
        "clientIP": a.hostname,
        "fromURL": a.href,
        "curURL": window.location.href,
        "OS": os + ' ' + osVersion,
        "browser": browser + ' ' + majorVersion + '(' + version + ')',
        "mobile": mobile,
        "cookies": cookieEnabled,
        "screenSize": screenSize,
        "fullUserAgent": navigator.userAgent,
        "time": time,
        "timer": 0,
        "mouse_trace": [],
        "mouse_click_trace": [],
        "keyDown_trace": [],
        "keyUp_trace": [],
        "scrollbarX_trace": [],
        "scrollbarY_trace": [],
        "zoomRatio_trace": [],
        "windowSize_trace": [],
    }
}(this));


// get screen size ratio
function getBrowserZoomRatio() {
    var ratio = 0;
    var screen = window.screen;
    var ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }

    }
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }

    return ratio;
}

function findScreenCoords(mouseEvent) {

    if (mouseEvent) {
        //FireFox
        xpos = mouseEvent.pageX;
        xpos_abs = mouseEvent.screenX;
        ypos = mouseEvent.pageY;
        ypos_abs = mouseEvent.screenY;
    }
    else {
        //IE
        xpos = window.event.pageX;
        xpos_abs = window.event.screenX;
        ypos = window.event.pageY;
        ypos_abs = window.event.screenY;
    }
}

function keyDownListener(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];

    if (e.type == "keydown") {
        keyCode = [[e.keyCode], 'D', timer];
        clientInfo.keyDown_trace.push(keyCode);
    }
}

function keyUpListener(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];

    if (e.type == "keyup") {
        keyCode = [[e.keyCode], 'U', timer];
        clientInfo.keyUp_trace.push(keyCode);
    }
}

function mouseDownListener(mouseEvent){
    if (mouseEvent) {
        //FireFox
        xcpos = mouseEvent.pageX;
        ycpos = mouseEvent.pageY;
        clientInfo.mouse_click_trace.push([xcpos,ycpos,'D',timer]);
    }
}

function mouseUpListener(mouseEvent){
    if (mouseEvent) {
        //FireFox
        xcpos = mouseEvent.pageX;
        ycpos = mouseEvent.pageY;
        clientInfo.mouse_click_trace.push([xcpos,ycpos,'U',timer]);
    }
}


// get mouse trace
var timer;
var xpos, ypos, xpos_now, ypos_now;
var xpos_abs, ypos_abs;

var scrollX, scrollY, scrollX_now, scrollY_now;

var zoomRatio, zoomRatio_now;
var width, height, width_now, height_now;

document.onmousemove = findScreenCoords;
document.onmousedown = mouseDownListener;
document.onmouseup = mouseUpListener;
document.onkeydown = keyDownListener;
document.onkeyup = keyUpListener;

// get traces
var timerReg = setInterval(function () {
    var now_timestamp = new Date().getTime();
    timer = (now_timestamp - window_loaded_timestamp);
    clientInfo.timer = timer;

    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

    // if mouse has moved, push the new coord with current time to the mouse trace
    if (xpos_now != xpos || ypos_now != ypos) {
        xpos_now = xpos;
        ypos_now = ypos;
        clientInfo.mouse_trace.push([xpos_now - scrollX, ypos_now - scrollY, timer]);
    }

    if (scrollX_now != scrollX) {
        scrollX_now = scrollX;
        clientInfo.scrollbarX_trace.push([scrollX, timer]);
    }

    if (scrollY_now != scrollY) {
        scrollY_now = scrollY;
        clientInfo.scrollbarY_trace.push([scrollY, timer]);
    }

    // screen zoom ratio 屏幕缩放比率
    zoomRatio = getBrowserZoomRatio();

    if (zoomRatio_now != zoomRatio) {
        zoomRatio_now = zoomRatio;
        clientInfo.zoomRatio_trace.push([zoomRatio, timer])
    }

    width = document.body.clientWidth;
    height = window.innerHeight;

    if (width_now != width || height_now != height) {
        width_now = width;
        height_now = height;
        clientInfo.windowSize_trace.push([width, height, timer])
    }
}, 1000)

