//表格

function down_xls_step1(rnd) {
    if (document.getElementById('xls_script')) {
        down_xls_step2(rnd);
        return
    }
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        //如果是IE
        var js = document.createElement('script');
        js.setAttribute('src', 'https://cdn.jsdelivr.net/npm/xlsx@0.16.1/dist/shim.min.js');
        document.body.appendChild(js);
    }
    var js2 = document.createElement('script');
    js2.setAttribute('src', 'https://cdn.jsdelivr.net/npm/xlsx@0.16.1/dist/xlsx.full.min.js');
    js2.setAttribute('id', 'xls_script');
    js2.setAttribute('onload', 'down_xls_step2(' + rnd + ')');
    document.body.appendChild(js2);

}

function down_xls_step2(rnd) {
    var workbook = XLSX.utils.book_new();
    var tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
        var ws = XLSX.utils.table_to_sheet(tables[i]);
        XLSX.utils.book_append_sheet(workbook, ws, tables[i].children[0].innerText);
    }
    XLSX.writeFile(workbook, "cid" + window.ARGS.cid + "_r" + rnd + ".xlsx");
}


function rank_log(a, rnd, player_title) {


    var is4 = true;
    if (window.admin.r_type == "2" || window.admin.r_type == "5") {
        is4 = false;
    }
    var clsrid = [];
    for (var i = 0; i < window.cls.length; i++) {
        clsrid[window.cls[i]["rid"]] = window.cls[i];
    }

    document.body.setAttribute("class", "bg_cyan");
    a.innerText = "";

    //下載全部的按鈕
    var btn = document.createElement('input');
    btn.setAttribute("id", "down_xls");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "下載數據(xls格式)");
    btn.setAttribute("onclick", "down_xls_step1(" + rnd + ")");
    a.appendChild(btn);
    a.appendChild(document.createElement('br'));

    if (!window.data) { return }

    for (rid in window.data) {
        try {
            var tids = [clsrid[rid]["tid1"], clsrid[rid]["tid2"], clsrid[rid]["tid3"], clsrid[rid]["tid4"]];
        } catch (e) {
            console.log("err rid=" + rid + ";" + e);
            continue;
        }

        var diff4_3 = 0;//3麻4麻数量补正
        var tids = [clsrid[rid]["tid1"], clsrid[rid]["tid2"], clsrid[rid]["tid3"]];
        if (is4) {
            tids = [clsrid[rid]["tid1"], clsrid[rid]["tid2"], clsrid[rid]["tid3"], clsrid[rid]["tid4"]];
            diff4_3 = 3;
        }
        var tidlen = tids.length;

        var new_table = document.createElement("table");
        new_table.setAttribute("class", "bordered");
        new_table.setAttribute("id", "c_" + rid);
        var new_tr = document.createElement("tr");
        var new_th = document.createElement("th");
        new_th.setAttribute("colspan", 10 + diff4_3);

        new_th.innerText = window.admin.c_name + " 第" + rnd + "輪 第" + clsrid[rid]["t_class"] + "組 " + clsrid[rid]["clsmark"];
        new_tr.appendChild(new_th);
        new_table.appendChild(new_tr);

        var new_tr1 = document.createElement("tr");
        new_tr1.setAttribute("class", "h");

        var new_td = document.createElement("td");
        new_td.innerText = "隊名";
        new_tr1.appendChild(new_td);

        for (var i = 0; i < tidlen; i++) {
            var new_td = document.createElement("td");
            new_td.setAttribute("colspan", "3");
            new_td.appendChild(mk_img(window.team[tids[i]]["img"]));
            var new_div = document.createElement('div');
            new_div.appendChild(document.createTextNode(window.team[tids[i]]["t_name"]));
            new_td.appendChild(new_div);
            new_tr1.appendChild(new_td);
        }
        new_table.appendChild(new_tr1);

        var new_tr1 = document.createElement("tr");
        var new_td = document.createElement("td");
        new_td.innerText = "分";
        new_tr1.appendChild(new_td);

        keylast = window.data[rid].length - 1;//最后一行
        for (var i = 0; i < tidlen; i++) {
            var new_td1 = document.createElement("td");
            new_td1.setAttribute("colspan", "3");
            new_td1.innerText = window.data[rid][keylast]["num" + (i + 1)];
            new_tr1.appendChild(new_td1);
        }
        new_table.appendChild(new_tr1);

        var new_tr2 = document.createElement("tr");

        var new_td = document.createElement("td");
        new_td.innerText = "譜";
        new_tr2.appendChild(new_td);

        var text_arr = ["選手", "得失", "隊分"];
        for (var i = 0; i < tidlen; i++) {
            for (var j = 0; j < text_arr.length; j++) {
                var new_td = document.createElement("td");
                new_td.innerText = text_arr[j];
                new_td.setAttribute("class", "mw769h");
                new_tr2.appendChild(new_td);
            }
        }
        //隐藏牌谱链接，导出xls时用
        var hide_td = document.createElement('td');
        hide_td.setAttribute('class', 'hidden');
        hide_td.innerText = "牌譜";
        new_tr2.appendChild(hide_td);


        var new_tdx = document.createElement("td");
        new_tdx.innerText = "得失點 / 選手ID / 隊伍點數";
        new_tdx.setAttribute("colspan", 9 + diff4_3);
        new_tdx.setAttribute("class", "mw769d");
        new_tr2.appendChild(new_tdx);


        new_table.appendChild(new_tr2); //導入新行

        //<!--添加數據
        for (var i = 0; i < window.data[rid].length; i++) {
            var new_tr2 = document.createElement("tr"); //

            //new_el.setAttribute("class", "mw769d");

            //<!--称谓
            var new_td = document.createElement("td");
            if (window.data[rid][i]["url"] != "") {
                var new_a = document.createElement("a");
                new_a.setAttribute("href", window.data[rid][i]["url"]);
                new_a.innerText = player_title[window.data[rid][i]["rowi"]];
                new_td.appendChild(new_a);
            } else {
                new_td.innerText = player_title[window.data[rid][i]["rowi"]];
            }
            new_tr2.appendChild(new_td);
            //称谓-->

            var last_tds = [];
            for (var j = 0; j < tidlen; j++) {
                var td_name = document.createElement("td");
                var td_point = document.createElement("td");
                var td_num = document.createElement("td");
                td_name.setAttribute("class", "mw769h");
                td_point.setAttribute("class", "mw769h");
                td_num.setAttribute("class", "mw769h");

                var node_point = document.createElement('span');
                if (window.data[rid][i]["pint" + (j + 1)] < 0) {
                    node_point.setAttribute("class", "txt_red");
                    node_point.innerText = window.data[rid][i]["pint" + (j + 1)];
                } else {
                    node_point.setAttribute("class", "txt_blue");
                    node_point.innerText = "+" + window.data[rid][i]["pint" + (j + 1)];
                }

                var node_num = document.createTextNode(window.data[rid][i]["num" + (j + 1)]);

                td_name.appendChild(document.createTextNode(window.data[rid][i]["name" + (j + 1)]));
                td_point.appendChild(node_point);
                td_num.appendChild(node_num);

                new_tr2.appendChild(td_name);
                new_tr2.appendChild(td_point);
                new_tr2.appendChild(td_num);

                //窄寬度下的樣式(手機等)
                var last_td = document.createElement('td');
                last_td.setAttribute('class', "mw769d")
                last_td.setAttribute("colspan", "3")

                var node_name = document.createElement("p")
                node_name.appendChild(document.createTextNode(window.data[rid][i]["name" + (j + 1)]));

                last_td.appendChild(node_point.cloneNode(true));
                last_td.appendChild(node_name);
                last_td.appendChild(node_num.cloneNode(true));
                last_tds[j] = last_td;
            }

            //隐藏牌谱链接，导出xls时用
            var hide_td = document.createElement('td');
            hide_td.setAttribute('class', 'hidden');
            hide_td.innerText = window.data[rid][i]["url"];
            new_tr2.appendChild(hide_td);

            for (var j = 0; j < last_tds.length; j++) {
                new_tr2.appendChild(last_tds[j]);
            }
            new_table.appendChild(new_tr2);
        }
        //數據-->

        //導入表格
        a.appendChild(new_table);

    } //forin


} //func
