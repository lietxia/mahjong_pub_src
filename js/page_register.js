function HC_REG() {
  var a = document.getElementById("display");
  document.body.setAttribute("class", "bg_green");

  $("#banner").css("background-image", "url('https://cdn.jsdelivr.net/gh/lietxia/mahjong_pub_src@latest/img/banner4.jpg')");

  document.getElementById("title_p").innerHTML =
    '<form id="form2" name="form2" method="get" action="' + window.hosturl + 'join.php" onkeydown="if(event.keyCode==13)return false;"> <hr /> <label>輸入QQ號： <input type="text" name="qq" id="qq" onkeyup="value=value.replace(/[^\\d]/g,\'\') " /> </label> <input type="hidden" name="cid" id="cid" value="" /> <input type="hidden" name="tname" id="tname" value="" /> <input type="button" class="anniu" value="報名" onClick="JOIN_CS()" /> <hr /></form><h3>共有 <span id="max_team">0</span>個名額，已報名 <span id="join_cnt">0</span>隊 剩餘 <span id="remain">0</span>名額</h3> 報名自：<span id="start_time">0000-00-00 00:00:00</span> 至 <span id="end_time">0000-00-00 00:00:00</span>';

  a.innerHTML = "";
  document.getElementById("title_h1").innerText = window.admin.c_name + " 報名";

  //是否關閉報名
  if (window.admin.JOIN_END === "1") {
    $("#form2").hide();
  }

  //要执行的js代码
  if (window.team != "") {
    //創建表格
    var table_j = document.createElement("table");
    var table_e = document.createElement("table");
    var new_tr = document.createElement("tr");
    var new_th1 = document.createElement("th");
    var new_th2 = document.createElement("th");
    var new_th3 = document.createElement("th");
    var new_th4 = document.createElement("th");
    var new_th5 = document.createElement("th");
    new_th1.innerText = "編號";
    new_th2.innerText = "隊名";
    new_th3.innerText = "正選";
    new_th3.setAttribute("class", "NAMES");
    new_th4.innerText = "替補";
    new_th4.setAttribute("class", "NAMES");
    new_th5.innerText = "簡介";
    new_tr.appendChild(new_th1);
    new_tr.appendChild(new_th2);
    new_tr.appendChild(new_th3);
    new_tr.appendChild(new_th4);
    new_tr.appendChild(new_th5);
    new_tr2 = new_tr.cloneNode(true);
    table_e.appendChild(new_tr);
    table_j.appendChild(new_tr2);

    //a.appendChild(new_log);

    //var has_exit = false;//初始化,沒有退賽

    var cnt_j = 1,
      cnt_e = 1;
    $.each(window.team, function (i) {
      var new_tr = document.createElement("tr");
      var new_td1 = document.createElement("td"); //編號
      var new_td2 = document.createElement("td"); //隊名
      var new_td3 = document.createElement("td");
      var new_td4 = document.createElement("td");
      var new_td5 = document.createElement("td");

      //是否已準備
      if (window.team[i]["t_type"] === "1") {
        new_tr.setAttribute("class", "ready");
      }

      new_td2.setAttribute("class", "word_break");
      new_td2.appendChild(mk_img(window.team[i]["img"]))

      var team_name = document.createElement("div");

      var tidstr = document.createElement('span');
      tidstr.setAttribute('class', "tidstr")
      tidstr.innerText = "[" + window.team[i]["tid"] + "]";
      team_name.appendChild(tidstr);
      team_name.appendChild(document.createTextNode(window.team[i]["t_name"]));
      new_td2.appendChild(team_name);

      new_td3.innerText = window.team[i]["t_player"];
      new_td4.innerText = window.team[i]["t_sub"];

      if (window.team[i]["t_ps"] != "" && window.team[i]["t_ps"] != null) {
        var new_el = document.createElement("a");
        new_el.setAttribute("onclick", "_ABOUT(" + i + ")");
        new_el.setAttribute("class", "mw563d");
        new_el.innerText = "簡介";
        new_td5.appendChild(new_el);
        var new_el = document.createElement("span");
        new_el.innerText = window.team[i]["t_ps"];
        new_el.setAttribute("class", "mw563h");
        new_td5.appendChild(new_el);
      }
      //new_td5.innerText = window.team[i]["t_ps"];

      if (window.team[i]["t_type"] === null) {
        //退賽
        var new_el = document.createElement("span");
        new_el.setAttribute("class", "mw563h");
        new_el.innerText = window.team[i]["tid"] + "號 \n 第";
        new_td1.appendChild(new_el);
        var new_el = document.createTextNode(cnt_e);
        new_td1.appendChild(new_el);
        new_tr.appendChild(new_td1);
        new_tr.appendChild(new_td2);
        new_tr.appendChild(new_td3);
        new_tr.appendChild(new_td4);
        new_tr.appendChild(new_td5);
        table_e.appendChild(new_tr);
        cnt_e++;
      } else {
        //不是退賽
        var new_el = document.createElement("span");
        new_el.setAttribute("class", "mw563h");
        new_el.innerText = window.team[i]["tid"] + "號 \n 第";
        new_td1.appendChild(new_el);
        var new_el = document.createTextNode(cnt_j);
        new_td1.appendChild(new_el);
        new_tr.appendChild(new_td1);
        new_tr.appendChild(new_td2);
        new_tr.appendChild(new_td3);
        new_tr.appendChild(new_td4);
        new_tr.appendChild(new_td5);
        table_j.appendChild(new_tr);
        cnt_j++;
      }
      //for完成
    });

    //創建説明文字
    var h2_join = document.createElement("h2");
    var h2_exit = document.createElement("h2");
    h2_join.innerText = "已報名隊伍(" + (cnt_j - 1) + ")";
    h2_exit.innerText = "退赛隊伍(" + (cnt_e - 1) + ")";
    if (cnt_j > 1) {
      a.appendChild(h2_join);
      a.appendChild(table_j);
    }
    if (cnt_e > 1) {
      a.appendChild(h2_exit);
      a.appendChild(table_e);
    }
  } //如果有數據
  else {
    a.innerHTML = "<h2>暫無數據</h2>";
  }
  document.getElementById("start_time").innerText = window.admin.bm_st;
  document.getElementById("end_time").innerText = window.admin.bm_ed;
  document.getElementById("join_cnt").innerText = parseInt(cnt_j - 1);
  if (window.admin.c_sub_t == -1) {
    window.admin.c_sub_t = "∞";
  }
  if (window.admin.t_max == -1) {
    window.admin.t_max = "∞";
  }
  var maxteam =
    window.admin.t_max + "(正選)+" + window.admin.c_sub_t + "(替補)";
  document.getElementById("max_team").innerText = maxteam;
  if (window.admin.c_sub_t == "∞" || window.admin.t_max == "∞") {
    var remain = "∞";
  } else {
    var remain =
      parseInt(window.admin.t_max) +
      parseInt(window.admin.c_sub_t) -
      parseInt(cnt_j - 1);
  }
  document.getElementById("remain").innerText = remain;
  document.getElementById("cid").value = window.admin.cid;
}