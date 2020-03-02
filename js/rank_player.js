//統計多個回合個人成績
function MULTI_RND(i) {
    try {
        var a = document.getElementById("display");
        var rnds = [];
        var isck = false;
        for (var j = 1; j < i; j++) {
            if ($("#cb_" + j).prop("checked")) {
                isck = true;
                rnds.push(j);
            }
        }

        if (isck) {
            var tmpstr = "";
            tmpstr = rnds.join(",");
            $.getJSON(
                window.hosturl + "api/data.php?t=multi_log&cid=" + window.ARGS.cid + "&r=" + tmpstr,
                function (data) {
                    rank_player(a, 0, data, tmpstr);
                }
            );
        } else {
            alert("請選中至少1個輪次");
        }
    } catch (error) {
        console.log(error)
    }

}

//個人統計
function rank_player(a, rnd, logdata, tl) {
    try {

        var is4 = true;
        if (window.admin.r_type == "2" || window.admin.r_type == "5") {
            is4 = false;
        }
        document.body.setAttribute("class", "bg_dark");
        if (rnd != 0) {
            logdata = window.data;
        }
        a.innerText = "";
        var new_p = document.createElement("p");
        for (var i = 1; i <= window.admin["c_round"]; i++) {
            var new_input = document.createElement("input");
            new_input.setAttribute("class", "rank_cb");
            new_input.setAttribute("type", "checkbox");
            new_input.setAttribute("id", "cb_" + i);
            new_p.appendChild(new_input);
            var new_label = document.createElement("label");
            new_label.setAttribute("for", "cb_" + i);
            new_label.innerText = "第" + i + "輪";
            new_p.appendChild(new_label);
        }
        a.appendChild(new_p);
        var new_input = document.createElement("input");
        new_input.setAttribute("type", "button");
        new_input.setAttribute("onclick", "MULTI_RND(" + i + ")");
        new_input.setAttribute("value", "統計所選輪次");
        a.appendChild(new_input);
        a.appendChild(document.createTextNode(' '));
        var new_input = document.createElement("input");
        new_input.setAttribute("type", "button");
        new_input.setAttribute("onclick", '$(".rank_cb").prop("checked", true);');
        new_input.setAttribute("value", "選中全部輪次");
        a.appendChild(new_input);

        var new_p = document.createElement("p");
        new_p.innerText = "※按住SHIFT，再點表頭，可以多條件排序";
        a.appendChild(new_p);

        var clsrid = [];
        for (var i = 0; i < window.cls.length; i++) {
            clsrid[window.cls[i]["rid"]] = window.cls[i];
        }

        var new_table = document.createElement("table");
        new_table.setAttribute("class", "tablesorter");

        var new_caption = document.createElement("caption");
        if (rnd == 0) {
            new_caption.innerText = window.admin.c_name + " 第 " + tl + " 輪 個人統計";
        } else {
            new_caption.innerText = window.admin.c_name + " 第 " + rnd + " 輪 個人統計";
        }
        new_table.appendChild(new_caption);

        var new_thead = document.createElement("thead");
        var new_tr = document.createElement("tr");

        var new_th = document.createElement("th");
        new_th.innerText = "排行";
        new_tr.appendChild(new_th);
        var new_th = document.createElement("th");
        new_th.innerText = "選手";
        new_tr.appendChild(new_th);
        var new_th = document.createElement("th");
        new_th.innerText = "隊伍";
        new_tr.appendChild(new_th);
        var new_th = document.createElement("th");
        new_th.innerText = "合計";
        new_tr.appendChild(new_th);
        var new_th = document.createElement("th");
        new_th.innerText = "對局";
        new_tr.appendChild(new_th);
        var new_th = document.createElement("th");
        new_th.innerText = "1位";
        new_tr.appendChild(new_th);
        var new_th = document.createElement("th");
        new_th.innerText = "2位";
        new_tr.appendChild(new_th);
        var new_th = document.createElement("th");
        new_th.innerText = "3位";
        new_tr.appendChild(new_th);

        if (is4) {
            var new_th = document.createElement("th");
            new_th.innerText = "4位";
            new_tr.appendChild(new_th);
        }
        new_thead.appendChild(new_tr);
        new_table.appendChild(new_thead);

        var new_tbody = document.createElement("tbody");
        new_tbody.setAttribute("id", "player_info");
        new_table.appendChild(new_tbody);

        // 選手名/隊名/纍計得點/對戰數/1/2/3/4/
        //   --/tn/pt/cnt/cnt1/cnt2
        //new_tbody.appendChild(new_tr);

        var table_data = {};
        for (rid in logdata) {
            //for in
            for (var i = 0; i < logdata[rid].length; i++) {
                //fordata
                //排序
                var dic = {}; //输出   {z:1，x:2，y:3}
                dic[logdata[rid][i]["name1"]] = logdata[rid][i]["pint1"];
                dic[logdata[rid][i]["name2"]] = logdata[rid][i]["pint2"];
                dic[logdata[rid][i]["name3"]] = logdata[rid][i]["pint3"];
                if (is4) {
                    dic[logdata[rid][i]["name4"]] = logdata[rid][i]["pint4"];
                }

                var sdic = Object.keys(dic).sort(function (a, b) {
                    return dic[b] - dic[a];
                });
                var soft = [];
                for (ki in sdic) {
                    soft.push(sdic[ki]);
                }

                //構建

                //<!--第一人-->>
                if (typeof table_data[logdata[rid][i]["name1"]] === "undefined") {
                    //如果未創立（初始化數據）
                    table_data[logdata[rid][i]["name1"]] = {};

                    if (
                        typeof clsrid[rid] != "undefined" &&
                        typeof logdata[rid][i]["name1"] != "undefined" &&
                        typeof window.team[clsrid[rid]["tid1"]]["t_name"] != "undefined"
                    ) {
                        table_data[logdata[rid][i]["name1"]].tn =
                            window.team[clsrid[rid]["tid1"]]["t_name"];
                    } else {
                        table_data[logdata[rid][i]["name1"]].tn = "未知";
                    }
                    table_data[logdata[rid][i]["name1"]].pt = 0;
                    table_data[logdata[rid][i]["name1"]].cnt = 0;
                    table_data[logdata[rid][i]["name1"]].cnt1 = 0;
                    table_data[logdata[rid][i]["name1"]].cnt2 = 0;
                    table_data[logdata[rid][i]["name1"]].cnt3 = 0;
                    table_data[logdata[rid][i]["name1"]].cnt4 = 0;
                }
                //如果已創立
                table_data[logdata[rid][i]["name1"]].pt += parseInt(
                    logdata[rid][i]["pint1"]
                );
                table_data[logdata[rid][i]["name1"]].cnt++;
                if (logdata[rid][i]["name1"] == soft[0]) {
                    table_data[logdata[rid][i]["name1"]].cnt1++;
                } else {
                    if (logdata[rid][i]["name1"] == soft[1]) {
                        table_data[logdata[rid][i]["name1"]].cnt2++;
                    } else {
                        if (logdata[rid][i]["name1"] == soft[2]) {
                            table_data[logdata[rid][i]["name1"]].cnt3++;
                        } else {
                            table_data[logdata[rid][i]["name1"]].cnt4++;
                        }
                    }
                }
                //<!--第一人-->>

                //<!--第2人-->>
                if (
                    typeof clsrid[rid] != "undefined" &&
                    typeof logdata[rid][i]["name2"] != "undefined" &&
                    typeof table_data[logdata[rid][i]["name2"]] === "undefined"
                ) {
                    table_data[logdata[rid][i]["name2"]] = {};
                    if (typeof window.team[clsrid[rid]["tid2"]]["t_name"] != "undefined") {
                        table_data[logdata[rid][i]["name2"]].tn =
                            window.team[clsrid[rid]["tid2"]]["t_name"];
                    } else {
                        table_data[logdata[rid][i]["name2"]].tn = "未知";
                    }
                    table_data[logdata[rid][i]["name2"]].pt = 0;
                    table_data[logdata[rid][i]["name2"]].cnt = 0;
                    table_data[logdata[rid][i]["name2"]].cnt1 = 0;
                    table_data[logdata[rid][i]["name2"]].cnt2 = 0;
                    table_data[logdata[rid][i]["name2"]].cnt3 = 0;
                    table_data[logdata[rid][i]["name2"]].cnt4 = 0;
                }
                //如果已創立
                table_data[logdata[rid][i]["name2"]].pt += parseInt(
                    logdata[rid][i]["pint2"]
                );
                table_data[logdata[rid][i]["name2"]].cnt++;
                if (logdata[rid][i]["name2"] == soft[0]) {
                    table_data[logdata[rid][i]["name2"]].cnt1++;
                } else {
                    if (logdata[rid][i]["name2"] == soft[1]) {
                        table_data[logdata[rid][i]["name2"]].cnt2++;
                    } else {
                        if (logdata[rid][i]["name2"] == soft[2]) {
                            table_data[logdata[rid][i]["name2"]].cnt3++;
                        } else {
                            table_data[logdata[rid][i]["name2"]].cnt4++;
                        }
                    }
                }
                //<!--第2人-->>

                //<!--第3人-->>
                if (
                    typeof clsrid[rid] != "undefined" &&
                    typeof logdata[rid][i]["name3"] != "undefined" &&
                    typeof table_data[logdata[rid][i]["name3"]] === "undefined"
                ) {
                    table_data[logdata[rid][i]["name3"]] = {};
                    if (typeof window.team[clsrid[rid]["tid3"]]["t_name"] != "undefined") {
                        table_data[logdata[rid][i]["name3"]].tn =
                            window.team[clsrid[rid]["tid3"]]["t_name"];
                    } else {
                        table_data[logdata[rid][i]["name3"]].tn = "未知";
                    }
                    table_data[logdata[rid][i]["name3"]].pt = 0;
                    table_data[logdata[rid][i]["name3"]].cnt = 0;
                    table_data[logdata[rid][i]["name3"]].cnt1 = 0;
                    table_data[logdata[rid][i]["name3"]].cnt2 = 0;
                    table_data[logdata[rid][i]["name3"]].cnt3 = 0;
                    table_data[logdata[rid][i]["name3"]].cnt4 = 0;
                }
                //如果已創立
                table_data[logdata[rid][i]["name3"]].pt += parseInt(
                    logdata[rid][i]["pint3"]
                );
                table_data[logdata[rid][i]["name3"]].cnt++;
                if (logdata[rid][i]["name3"] == soft[0]) {
                    table_data[logdata[rid][i]["name3"]].cnt1++;
                } else {
                    if (logdata[rid][i]["name3"] == soft[1]) {
                        table_data[logdata[rid][i]["name3"]].cnt2++;
                    } else {
                        if (logdata[rid][i]["name3"] == soft[2]) {
                            table_data[logdata[rid][i]["name3"]].cnt3++;
                        } else {
                            table_data[logdata[rid][i]["name3"]].cnt4++;
                        }
                    }
                }
                //<!--第3人-->>

                //<!--第4人-->>
                if (is4) {
                    if (
                        typeof clsrid[rid] != "undefined" &&
                        typeof logdata[rid][i]["name4"] != "undefined" &&
                        typeof table_data[logdata[rid][i]["name4"]] === "undefined"
                    ) {
                        table_data[logdata[rid][i]["name4"]] = {};
                        if (
                            typeof window.team[clsrid[rid]["tid4"]]["t_name"] != "undefined"
                        ) {
                            table_data[logdata[rid][i]["name4"]].tn =
                                window.team[clsrid[rid]["tid4"]]["t_name"];
                        } else {
                            table_data[logdata[rid][i]["name4"]].tn = "未知";
                        }
                        table_data[logdata[rid][i]["name4"]].pt = 0;
                        table_data[logdata[rid][i]["name4"]].cnt = 0;
                        table_data[logdata[rid][i]["name4"]].cnt1 = 0;
                        table_data[logdata[rid][i]["name4"]].cnt2 = 0;
                        table_data[logdata[rid][i]["name4"]].cnt3 = 0;
                        table_data[logdata[rid][i]["name4"]].cnt4 = 0;
                    }
                    //如果已創立
                    table_data[logdata[rid][i]["name4"]].pt += parseInt(
                        logdata[rid][i]["pint4"]
                    );
                    table_data[logdata[rid][i]["name4"]].cnt++;
                    if (logdata[rid][i]["name4"] == soft[0]) {
                        table_data[logdata[rid][i]["name4"]].cnt1++;
                    } else {
                        if (logdata[rid][i]["name4"] == soft[1]) {
                            table_data[logdata[rid][i]["name4"]].cnt2++;
                        } else {
                            if (logdata[rid][i]["name4"] == soft[2]) {
                                table_data[logdata[rid][i]["name4"]].cnt3++;
                            } else {
                                table_data[logdata[rid][i]["name4"]].cnt4++;
                            }
                        }
                    }
                } //<!--第4人-->>
            } //fordata
        } //for in

        //document.getElementById("display").appendChild(new_table);
        // 選手名/隊名/纍計得點/對戰數/1/2/3/4/
        //   --/tn/pt/cnt/cnt1/cnt2
        //new_tbody.appendChild(new_tr);

        var nums = [];
        var i = 0;
        for (player_name in table_data) {
            nums[i] = table_data[player_name].pt;
            i++;
        }
        nums.sort(function (a, b) {
            return b - a;
        });
        var num_rank = [];
        for (var i = 0; i < nums.length; i++) {
            num_rank[nums[i]] = i + 1;
        }

        for (player_name in table_data) {
            var new_tr = document.createElement("tr");

            var new_td = document.createElement("td");
            new_td.innerText = num_rank[table_data[player_name].pt];
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.innerText = player_name;
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.innerText = table_data[player_name].tn;
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.innerText = table_data[player_name].pt;
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.innerText = table_data[player_name].cnt;
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.innerText = table_data[player_name].cnt1;
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.innerText = table_data[player_name].cnt2;
            new_tr.appendChild(new_td);

            var new_td = document.createElement("td");
            new_td.innerText = table_data[player_name].cnt3;
            new_tr.appendChild(new_td);

            if (is4) {
                var new_td = document.createElement("td");
                new_td.innerText = table_data[player_name].cnt4;
                new_tr.appendChild(new_td);
            }

            new_tbody.appendChild(new_tr);
        }
        var new_div = document.createElement("div");
        new_div.setAttribute("id", "table_rankp");
        new_div.appendChild(new_table);
        a.appendChild(new_div);

        $(".tablesorter").tablesorter({
            // theme: 'blue',
            theme: "dark",
            widgets: ["zebra", "filter", "stickyHeaders"],
            sortList: [[0, 0]],
            widgetOptions: {
                stickyHeaders_offset: 26
            }
        });
    } catch (error) {
        console.log(error)
    }
} //rank_palyer