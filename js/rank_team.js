//隊分榜
function rank_team(a, rnd) {

    var is4 = true;
    if (window.admin.r_type == "2" || window.admin.r_type == "5") {
        is4 = false;
    }
    document.body.setAttribute("class", "bg_cyan");
    var clsrid = [];
    for (var i = 0; i < window.cls.length; i++) {
        clsrid[window.cls[i]["rid"]] = window.cls[i];
    }

    var rank = [];
    rank[0] = {};
    rank[1] = {};
    rank[2] = {};
    rank[3] = {};

    for (key in window.data) {
        try {
            var arr = {};
            var keyl = window.data[key].length - 1;
            arr[clsrid[key]["tid1"]] = parseInt(window.data[key][keyl]["num1"]);
            arr[clsrid[key]["tid2"]] = parseInt(window.data[key][keyl]["num2"]);
            arr[clsrid[key]["tid3"]] = parseInt(window.data[key][keyl]["num3"]);
            if (is4) {
                arr[clsrid[key]["tid4"]] = parseInt(window.data[key][keyl]["num4"]);
            }
        } catch (e) {
            console.log("err key=" + key + ";" + e);
            continue;
        }

        var arr = {};
        var keyl = window.data[key].length - 1;
        arr[clsrid[key]["tid1"]] = parseInt(window.data[key][keyl]["num1"]);
        arr[clsrid[key]["tid2"]] = parseInt(window.data[key][keyl]["num2"]);
        arr[clsrid[key]["tid3"]] = parseInt(window.data[key][keyl]["num3"]);
        if (is4) {
            arr[clsrid[key]["tid4"]] = parseInt(window.data[key][keyl]["num4"]);
        }
        //arr = DESC_SORT(arr);

        //
        var sdic = arr;
        var out = [];
        var i = 0;
        sdic = Object.keys(arr).sort(function (a, b) {
            return arr[b] - arr[a];
        });
        for (ki in sdic) {
            out[i] = [];
            out[i][0] = sdic[ki];
            out[i][1] = arr[sdic[ki]];
            i++;
        }
        arr = out;
        //

        rank[0][arr[0][0]] = arr[0][1];
        rank[1][arr[1][0]] = arr[1][1];
        rank[2][arr[2][0]] = arr[2][1];
        if (is4) {
            rank[3][arr[3][0]] = arr[3][1];
        }
    }

    var new_table = document.createElement("table");
    new_table.setAttribute("class", "bordered");
    var new_tr = document.createElement("tr");
    var new_th = document.createElement("th");
    if (is4) {
        new_th.setAttribute("colspan", "13");
    } else {
        new_th.setAttribute("colspan", "10");
    }
    new_th.innerText =
        window.admin.c_name + "　第" + rnd + "輪　同順位分數排行榜";
    new_tr.appendChild(new_th);
    new_table.appendChild(new_tr);

    var new_tr = document.createElement("tr");
    var new_th = document.createElement("td");
    new_th.setAttribute("colspan", "4");
    new_th.innerText = "一位排行";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("colspan", "3");
    new_th.innerText = "二位排行";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("colspan", "3");
    new_th.innerText = "三位排行";
    new_tr.appendChild(new_th);

    if (is4) {
        var new_th = document.createElement("td");
        new_th.setAttribute("colspan", "3");
        new_th.innerText = "四位排行";
        new_tr.appendChild(new_th);
    }
    new_table.appendChild(new_tr);

    var new_tr = document.createElement("tr");
    var new_th = document.createElement("td");
    new_th.innerText = "序";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "隊名";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "位";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "分數";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "隊名";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "位";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "分數";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "隊名";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "位";
    new_tr.appendChild(new_th);

    var new_th = document.createElement("td");
    new_th.setAttribute("class", "mw769h");
    new_th.innerText = "分數";
    new_tr.appendChild(new_th);

    if (is4) {
        var new_th = document.createElement("td");
        new_th.setAttribute("class", "mw769h");
        new_th.innerText = "隊名";
        new_tr.appendChild(new_th);

        var new_th = document.createElement("td");
        new_th.setAttribute("class", "mw769h");
        new_th.innerText = "位";
        new_tr.appendChild(new_th);

        var new_th = document.createElement("td");
        new_th.innerText = "分數";
        new_th.setAttribute("class", "mw769h");
        new_tr.appendChild(new_th);
    }

    var new_th = document.createElement("td");
    if (is4) {
        new_th.setAttribute("colspan", "12");
    } else {
        new_th.setAttribute("colspan", "9");
    }
    new_th.setAttribute("class", "mw769d");
    new_th.innerText = "隊名 / 總排行 / 最終點數";
    new_tr.appendChild(new_th);

    new_table.appendChild(new_tr);

    var rank1 = [];
    var dic = rank[0];
    var sdic = Object.keys(dic).sort(function (a, b) {
        return dic[b] - dic[a];
    });
    var j = 0;
    for (ki in sdic) {
        rank1[j] = [];
        rank1[j][0] = sdic[ki];
        rank1[j][1] = dic[sdic[ki]];
        j++;
    }
    var rank2 = [];
    var dic = rank[1];
    var sdic = Object.keys(dic).sort(function (a, b) {
        return dic[b] - dic[a];
    });
    var j = 0;
    for (ki in sdic) {
        rank2[j] = [];
        rank2[j][0] = sdic[ki];
        rank2[j][1] = dic[sdic[ki]];
        j++;
    }
    var rank3 = [];
    var dic = rank[2];
    var sdic = Object.keys(dic).sort(function (a, b) {
        return dic[b] - dic[a];
    });
    var j = 0;
    for (ki in sdic) {
        rank3[j] = [];
        rank3[j][0] = sdic[ki];
        rank3[j][1] = dic[sdic[ki]];
        j++;
    }

    var rank4 = [];
    var dic = rank[3];
    var sdic = Object.keys(dic).sort(function (a, b) {
        return dic[b] - dic[a];
    });
    var j = 0;
    for (ki in sdic) {
        rank4[j] = [];
        rank4[j][0] = sdic[ki];
        rank4[j][1] = dic[sdic[ki]];
        j++;
    }

    var tmpobj = {};
    $.extend(tmpobj, rank[0], rank[1], rank[2], rank[3]);
    var sdic = Object.keys(tmpobj).sort(function (a, b) {
        return tmpobj[a] - tmpobj[b];
    });
    var j = rank1.length * 4;
    var rank_arr = {};
    for (ki in sdic) {
        rank_arr[tmpobj[sdic[ki]]] = j;
        j--;
    }

    var tmpstr1 = "",
        tmpstr2 = "",
        tmpstr3 = "",
        tmpstr4 = "";
    for (var i = 0; i < rank1.length; i++) {
        var team_name1 = window.team[rank1[i][0]]["t_name"];
        var team_name2 = window.team[rank2[i][0]]["t_name"];
        var team_name3 = window.team[rank3[i][0]]["t_name"];

        var p1 = rank1[i][1];
        var p2 = rank2[i][1];
        var p3 = rank3[i][1];

        var r1 = rank_arr[p1];
        var r2 = rank_arr[p2];
        var r3 = rank_arr[p3];

        tmpstr1 += team_name1 + "\n";
        tmpstr2 += team_name2 + "\n";
        tmpstr3 += team_name3 + "\n";

        if (is4) {
            var team_name4 = window.team[rank4[i][0]]["t_name"];
            var p4 = rank4[i][1];
            var r4 = rank_arr[p4];
            tmpstr4 += team_name4 + "\n";
        }

        var new_tr = document.createElement("tr");

        var new_td = document.createElement("td");
        new_td.innerText = 1 + i;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h word_break");
        new_td.innerText = team_name1;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h");
        new_td.innerText = r1;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h");
        new_td.innerText = p1;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h word_break");
        new_td.innerText = team_name2;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h");
        new_td.innerText = r2;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h");
        new_td.innerText = p2;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h word_break");
        new_td.innerText = team_name3;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h");
        new_td.innerText = r3;
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769h");
        new_td.innerText = p3;
        new_tr.appendChild(new_td);

        if (is4) {
            var new_td = document.createElement("td");
            new_td.setAttribute("class", "mw769h word_break");
            new_td.innerText = team_name4;
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.setAttribute("class", "mw769h");
            new_td.innerText = r4;
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.setAttribute("class", "mw769h");
            new_td.innerText = p4;
            new_tr.appendChild(new_td);
        }

        //--------
        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769d");
        new_td.setAttribute("colspan", "3");
        var new_p = document.createElement("span");
        new_p.setAttribute("class", "word_break");
        new_p.innerText = team_name1;
        new_td.appendChild(new_p);
        new_td.appendChild(document.createElement("br"));
        new_td.appendChild(document.createTextNode(r1 + "位 " + p1));
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769d");
        new_td.setAttribute("colspan", "3");
        var new_p = document.createElement("span");
        new_p.setAttribute("class", "word_break");
        new_p.innerText = team_name2;
        new_td.appendChild(new_p);
        new_td.appendChild(document.createElement("br"));
        new_td.appendChild(document.createTextNode(r2 + "位 " + p2));
        new_tr.appendChild(new_td);

        var new_td = document.createElement("td");
        new_td.setAttribute("class", "mw769d");
        new_td.setAttribute("colspan", "3");
        var new_p = document.createElement("span");
        new_p.setAttribute("class", "word_break");
        new_p.innerText = team_name3;
        new_td.appendChild(new_p);
        new_td.appendChild(document.createElement("br"));
        new_td.appendChild(document.createTextNode(r3 + "位 " + p3));
        new_tr.appendChild(new_td);

        if (is4) {
            var new_td = document.createElement("td");
            new_td.setAttribute("class", "mw769d");
            new_td.setAttribute("colspan", "3");
            var new_p = document.createElement("span");
            new_p.setAttribute("class", "word_break");
            new_p.innerText = team_name4;
            new_td.appendChild(new_p);
            new_td.appendChild(document.createElement("br"));
            new_td.appendChild(document.createTextNode(r4 + "位 " + p4));
            new_tr.appendChild(new_td);
        }

        new_table.appendChild(new_tr);
    }

    a.appendChild(new_table);
    var new_el = document.createElement("hr");
    a.appendChild(new_el);
    var new_el = document.createElement("textarea");
    new_el.value = tmpstr1;
    a.appendChild(new_el);
    var new_el = document.createElement("textarea");
    new_el.value = tmpstr2;
    a.appendChild(new_el);
    var new_el = document.createElement("textarea");
    new_el.value = tmpstr3;
    a.appendChild(new_el);
    if (is4) {
        var new_el = document.createElement("textarea");
        new_el.value = tmpstr4;
        a.appendChild(new_el);
    }

}