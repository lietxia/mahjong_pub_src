function HC_CLS() {
    //分组页面
    //window.admin.r_type= "1" 天凤4麻
    //window.admin.r_type= "2" 天凤3麻
    //window.admin.r_type= "3" 天凤个人
    //window.admin.r_type= "4" 雀魂4麻
    //window.admin.r_type= "5" 雀魂3麻
    //window.admin.r_type= "6" 雀魂个人
    var is4 = true;
    if (window.admin.r_type == "2" || window.admin.r_type == "5") {
        is4 = false;
    }
    var a = document.getElementById("display");
    var player_title = window.admin.t_type
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n");
    player_title = player_title.split("\n");
    $.uniqueSort(player_title);
    a.innerHTML = "";
    document.body.setAttribute("class", "bg_cyan");
    document.getElementById("title_h1").innerText = window.admin.c_name + " 分組";
    document.getElementById("title_p").innerText = "";
    $("#banner").css("background-image", "url('https://cdn.jsdelivr.net/gh/lietxia/mahjong_pub_src/img/banner3.jpg')");

    for (i = 1; i <= window.admin.c_round; i++) {
        var new_a = document.createElement("a");
        new_a.setAttribute("href", "#_class" + i);
        new_a.innerText = "第" + i + "輪";
        document.getElementById("title_p").appendChild(new_a);
    }

    if (window.cls.length === 0) {
        a.innerHTML = "<h2>暫無分組數據</h2>";
    } else {
        window.team[0] = { tid: 0, t_name: "", t_player: null, t_sub: null, t_type: null };
        for (i = 0; i < window.cls.length; i++) {
            if (window.cls[i]["t_class"] === "1") {
                var new_table = document.createElement("table");
                new_table.setAttribute("id", "t" + window.cls[i]["round"]);
                new_table.setAttribute("class", "bordered");
                var new_tr = document.createElement("tr");
                var new_th = document.createElement("th");
                if (is4) {
                    new_th.setAttribute("colspan", "5");
                } else {
                    new_th.setAttribute("colspan", "4");
                }
                var new_a = document.createElement("a");
                new_a.setAttribute("class", "radius_a");
                new_a.setAttribute("name", "_class" + window.cls[i]["round"]);
                new_a.innerText =
                    window.admin.c_name +
                    "　第" +
                    window.cls[i]["round"] +
                    "輪　分組一覽";
                new_th.appendChild(new_a);
                new_tr.appendChild(new_th);
                new_table.appendChild(new_tr);
                a.appendChild(new_table);
            }
            var team1 = window.team[window.cls[i]["tid1"]];
            var team2 = window.team[window.cls[i]["tid2"]];
            var team3 = window.team[window.cls[i]["tid3"]];
            var team4 = window.team[window.cls[i]["tid4"]];

            var new_tr = document.createElement("tr");
            var new_td = document.createElement("td");
            if (is4) {
                new_td.setAttribute("colspan", "5");
            } else {
                new_td.setAttribute("colspan", "4");
            }
            new_td.setAttribute("class", "head");
            var new_span = document.createElement("span");
            new_span.setAttribute("class", "py");
            new_span.innerText =
                "第 " +
                window.cls[i]["round"] +
                " 輪　 第 " +
                window.cls[i]["t_class"] +
                " 組";
            var new_a = document.createElement("a");
            new_a.setAttribute("target", "_blank");
            new_a.setAttribute("class", "lk");
            new_a.setAttribute(
                "href",
                "http://tenhou.net/0/?C" + window.cls[i]["code"]
            );
            var new_span2 = document.createElement("span");
            new_span2.setAttribute("class", "mw332h");
            new_span2.innerText = "大會室：";
            var new_txt = document.createTextNode(window.cls[i]["code"]);
            new_a.appendChild(new_span2);
            new_a.appendChild(new_txt);
            new_td.appendChild(new_span);
            new_td.appendChild(new_a);
            if (window.cls[i]["clsmark"] != "" && window.cls[i]["clsmark"] != null) {
                var new_span2 = document.createElement("span");
                new_span2.innerText = window.cls[i]["clsmark"];
                new_span2.setAttribute("class", "lft");
                new_td.appendChild(new_span2);
            }
            new_tr.appendChild(new_td);
            document.getElementById("t" + window.cls[i]["round"]).appendChild(new_tr);

            var new_tr = document.createElement("tr");
            new_tr.setAttribute("class", "h");
            var new_td = document.createElement("td");
            new_td.innerText = "隊名";
            var new_td1 = document.createElement("td");
            var new_td2 = document.createElement("td");
            var new_td3 = document.createElement("td");
            var new_td4 = document.createElement("td");

            new_td1.appendChild(mk_img(team1["img"]));
            var newdiv = document.createElement('div');
            newdiv.appendChild(document.createTextNode(team1["t_name"]));
            new_td1.appendChild(newdiv);

            new_td2.appendChild(mk_img(team2["img"]));
            var newdiv = document.createElement('div');
            newdiv.appendChild(document.createTextNode(team2["t_name"]));
            new_td2.appendChild(newdiv);

            new_td3.appendChild(mk_img(team3["img"]));
            var newdiv = document.createElement('div');
            newdiv.appendChild(document.createTextNode(team3["t_name"]));
            new_td3.appendChild(newdiv);

            new_tr.appendChild(new_td);
            new_tr.appendChild(new_td1);
            new_tr.appendChild(new_td2);
            new_tr.appendChild(new_td3);
            if (is4) {
                new_td4.appendChild(mk_img(team4["img"]));
                var newdiv = document.createElement('div');
                newdiv.appendChild(document.createTextNode(team4["t_name"]));
                new_td4.appendChild(newdiv);
                new_tr.appendChild(new_td4);
            }

            document.getElementById("t" + window.cls[i]["round"]).appendChild(new_tr);
            var tmparr = [];
            for (var ii = 0; ii < player_title.length; ii++) {
                tmparr[ii] = " ";
            }
            //正選
            if (team1["t_player"] == null || team1["t_player"] == "") {
                var tp1 = tmparr;
            } else {
                var tp1 = team1["t_player"]
                    .replace(/\r\n/g, "\n")
                    .replace(/\r/g, "\n")
                    .split("\n");
            }

            if (team2["t_player"] == null || team2["t_player"] == "") {
                var tp2 = tmparr;
            } else {
                var tp2 = team2["t_player"]
                    .replace(/\r\n/g, "\n")
                    .replace(/\r/g, "\n")
                    .split("\n");
            }

            if (team3["t_player"] == null || team3["t_player"] == "") {
                var tp3 = tmparr;
            } else {
                var tp3 = team3["t_player"]
                    .replace(/\r\n/g, "\n")
                    .replace(/\r/g, "\n")
                    .split("\n");
            }

            if (is4) {
                if (team4["t_player"] == null || team4["t_player"] == "") {
                    var tp4 = tmparr;
                } else {
                    var tp4 = team4["t_player"]
                        .replace(/\r\n/g, "\n")
                        .replace(/\r/g, "\n")
                        .split("\n");
                }
            }

            for (var j = 0; j < player_title.length; j++) {
                var new_tr = document.createElement("tr");
                var new_td = document.createElement("td");
                new_td.innerText = player_title[j];
                var new_td1 = document.createElement("td");
                var new_td2 = document.createElement("td");
                var new_td3 = document.createElement("td");

                new_td1.innerText = tp1[j];
                new_td2.innerText = tp2[j];
                new_td3.innerText = tp3[j];

                new_tr.appendChild(new_td);
                new_tr.appendChild(new_td1);
                new_tr.appendChild(new_td2);
                new_tr.appendChild(new_td3);

                if (is4) {
                    var new_td4 = document.createElement("td");
                    new_td4.innerText = tp4[j];
                    new_tr.appendChild(new_td4);
                }
                document
                    .getElementById("t" + window.cls[i]["round"])
                    .appendChild(new_tr);
            }

            //替補
            var new_tr = document.createElement("tr");
            var new_td = document.createElement("td");
            new_td.innerText = "替補";
            var new_td1 = document.createElement("td");
            var new_td2 = document.createElement("td");
            var new_td3 = document.createElement("td");
            var new_td4 = document.createElement("td");
            new_td1.innerText = team1["t_sub"];
            new_td2.innerText = team2["t_sub"];
            new_td3.innerText = team3["t_sub"];

            new_tr.appendChild(new_td);
            new_tr.appendChild(new_td1);
            new_tr.appendChild(new_td2);
            new_tr.appendChild(new_td3);
            if (is4) {
                new_td4.innerText = team4["t_sub"];
                new_tr.appendChild(new_td4);
            }

            document.getElementById("t" + window.cls[i]["round"]).appendChild(new_tr);
        }
    }
}