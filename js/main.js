//配置marked
marked.setOptions({
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

function mk_img(img) {
    /*
    var e = document.createElement('img');
    e.setAttribute("class", 'img');
    if (img != null && img != "") {
      e.setAttribute("src", img);
      if (qq != 0 && qq != '0' && qq != '' && qq != null) {
        e.setAttribute("onerror", 'this.e.setAttribute("src","http://q1.qlogo.cn/g?b=qq&s=640&nk=' + qq + '")');
      } else {
        e.setAttribute("onerror", 'this.style.display = "none"');
      }
    } else {
      e.setAttribute("src", "http://q1.qlogo.cn/g?b=qq&s=640&nk=" + qq);
      e.setAttribute("onerror", 'this.style.display = "none"');
    }
    */
    var e = document.createElement('img');
    e.setAttribute("class", 'img');
    if (img != null && img != "") {
        e.setAttribute("src", img);
        e.setAttribute("onerror", 'this.style.display = "none"');
    } else {
        e.setAttribute("class", 'hidden');
    }

    return e
}

//獲取數據
window.ARGS = {};
var match = null;
var search = decodeURIComponent(location.search.substring(1));
var reg = /(?:([^&=]+)=([^&]+))/g;
while ((match = reg.exec(search)) !== null) {
    window.ARGS[match[1]] = match[2];
}
//window.location.href.match(/\?cid=(\d+)/gi)

function ce(arr) {//创建元素
    if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
    var e = document.createElement(arr[0]);
    for (var i = arr.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arr[i - 1], arr[i]);
    }
    return e;
}
function cet(arr,t) {//创建元素
    if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
    var e = document.createElement(arr[0]);
    for (var i = arr.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arr[i - 1], arr[i]);
    }
    e.innerText=t;
    return e;
}

function _ABOUT(i) {
    alert(window.team[i]["t_ps"]);
}

//報名對話框
function JOIN_CS() {
    var TEAM_NAME = "";
    TEAM_NAME = $.trim(prompt("請輸入隊名", ""));
    if (TEAM_NAME != null && TEAM_NAME != "") {
        TEAM_NAME = encodeURI(TEAM_NAME);
        document.getElementById("qq").value = document
            .getElementById("qq")
            .value.replace(/[^\d]/g, "");
        document.getElementById("tname").value = TEAM_NAME;
        document.getElementById("form2").submit();
    }
}
//function end

//登入
function TEAM_LOGIN() {
    var TEAM_PASS = null;
    TEAM_PASS = prompt("請輸入隊伍密碼(Please enter your password)", "");
    if (TEAM_PASS != null && TEAM_PASS != "") {
        var a = "team.htm?t_pw=" + TEAM_PASS;
        window.location.href = a;
    }
}

//onhashchangce
function HC() {
    //window.addEventListener("hashchange", HC, false);

    if (
        window.location.hash === "" ||
        window.location.hash === null ||
        window.location.hash === "#!rule"
    ) {
        HC_RULE();
    }
    if (window.location.hash === "#!register") {
        HC_REG();
    }
    if (window.location.hash.substr(2, 5) === "class") {
        HC_CLS();
    }
    if (window.location.hash.substr(2, 7) === "ranking") {
        HC_RANK();
    }
}

//初始化
if (location.search != "" && location.search != null) {
    window.admin = [];
    window.team = [];
    window.cls = [];
    $.getJSON("api/data.php?t=admin&cid=" + window.ARGS.cid, function (data) {
        if (data == "") {
            window.location.href = "./";
        }
        window.admin = data;
        window.document.title = window.admin.c_name;
        if (window.admin.c_gonggao === null || window.admin.c_gonggao === "") {
            window.admin.c_gonggao = "暫無公告";
        }
        if (window.admin.c_pad === null || window.admin.c_pad === "") {
            window.admin.c_pad = "暫無規則";
        }

        $.ajax({
            dataType: "json",
            url: "api/data.php?t=team&cid=" + window.ARGS.cid,
            success: function (data) {
                window.team = data;
                $.ajax({
                    dataType: "json",
                    url: "api/data.php?t=class&cid=" + window.ARGS.cid,
                    success: function (data) {
                        window.cls = data;
                        HC();
                    },
                    error: HC()
                });
            },
            error: HC()
        });
    });
} else {
    page_index();
}

