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

function ce(arr) {//创建元素
    if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
    var e = document.createElement(arr[0]);
    for (var i = arr.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arr[i - 1], arr[i]);
    }
    return e;
}
function cet(arr, t) {//创建元素
    if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
    var e = document.createElement(arr[0]);
    for (var i = arr.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arr[i - 1], arr[i]);
    }
    e.innerText = t;
    return e;
}

function _ABOUT(i) {
    return alert(window.team[i]["t_ps"]);
}

//報名對話框
function JOIN_CS() {
    var team_name = decodeURI($.trim(document.getElementById("tname").value));
    var qq = document.getElementById("qq").value.replace(/[^\d]/g, "");
    if (team_name == "" || qq == "") {
        return alert("隊名不能為空,QQ只能是數字");
    }
    return window.open(
        window.hosturl + "join.php?cid="
        + window.ARGS.cid + "&qq="
        + qq + "$tname=" + team_name,
        "_blank");
}

//登入
function TEAM_LOGIN() {
    var TEAM_PASS = $.trim(prompt("請輸入隊伍密碼(Please enter your password)", ""));
    if (TEAM_PASS != null && TEAM_PASS != "") {
        return window.location.href = "team.htm?t_pw=" + TEAM_PASS;
    }
}

//onhashchangce
function HC() {
    var hash = window.location.hash;

    if (hash == "#!register") {
        return HC_REG();
    }
    if (hash.substr(2, 5) == "class") {
        return HC_CLS();
    }
    if (hash.substr(2, 7) == "ranking") {
        return HC_RANK();
    }

    return HC_RULE();
}

//初始化
if (location.search == "" || location.search == null) {
    page_index();
} else {
    window.admin = [];
    window.team = [];
    window.cls = [];
    var datacount = 0;
    $.getJSON(window.hosturl + "api/data.php?t=admin&cid=" + window.ARGS.cid,
        function (data) {
            if (data == "") { return window.location.href = "./"; }
            window.admin = data;
            window.document.title = window.admin.c_name;
            if (window.admin.c_gonggao == null || window.admin.c_gonggao == "") {
                window.admin.c_gonggao = "暫無公告";
            }
            if (window.admin.c_pad == null || window.admin.c_pad == "") {
                window.admin.c_pad = "暫無規則";
            }
            datacount++;
            if (datacount == 3) { HC(); }
        })

    $.getJSON(window.hosturl + "api/data.php?t=team&cid=" + window.ARGS.cid,
        function (data) {
            window.team = data;
            datacount++;
            if (datacount == 3) { HC(); }
        })

    $.getJSON(window.hosturl + "api/data.php?t=class&cid=" + window.ARGS.cid,
        function (data) {
            window.cls = data;
            datacount++;
            if (datacount == 3) { HC(); }
        })
}

