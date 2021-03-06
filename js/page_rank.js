function CHANGE_RND(rnd) {
  rnd = parseInt(rnd);
  if (window.location.hash === "#!ranking") {
    var rank_type = "_Log_";
    var rnd_old = 1;
  } else {
    var rank_type = window.location.hash.substr(9, 5);
    var rnd_old = parseInt(window.location.hash.substr(14));
  }
  if (rnd_old != rnd) {
    window.location.hash = "#!ranking" + rank_type + rnd;
  }
}

//子页面切换
function CHANGE_TYPE(rank_type) {
  if (window.location.hash === "#!ranking") {
    var rank_type_old = "_Log_";
    var rnd = 1;
  } else {
    var rank_type_old = window.location.hash.substr(9, 5);
    var rnd = parseInt(window.location.hash.substr(14));
  }
  if (rank_type != rank_type_old) {
    window.location.hash = "#!ranking" + rank_type + rnd;
  }
}

//入口
function HC_RANK() {
  var a = document.getElementById("display");
  var player_title = window.admin.t_type
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
  player_title = player_title.split("\n");

  $("#banner").css("background-image", "url('https://cdn.jsdelivr.net/gh/lietxia/mahjong_pub_src/img/banner2.jpg')");
  a.innerHTML = "";
  document.getElementById("title_h1").innerText = window.admin.c_name + " 統計";
  document.getElementById("title_p").innerText = "";

  //創建按鈕組

  var btns = {
    "fn": ["CHANGE_TYPE('_Log_')", "CHANGE_TYPE('Chart')", "CHANGE_TYPE('Playe')", "CHANGE_TYPE('_Team')"],
    "value": ["記錄", "圖表", "個人統計", "隊伍統計"]
  };
  for (var i = 0; i < btns.fn.length; i++) {
    var new_a = document.createElement("a");
    new_a.setAttribute("onclick", btns.fn[i]);
    new_a.innerText = btns.value[i];
    document.getElementById("title_p").appendChild(new_a);
  }

  var new_hr = document.createElement("hr");
  document.getElementById("title_p").appendChild(new_hr);

  //創建按鈕組
  for (var i = 1; i <= window.admin["c_round"]; i++) {
    var new_a = document.createElement("a");
    new_a.setAttribute("onclick", "CHANGE_RND(" + i + ")");
    new_a.innerText = "第" + i + "輪";
    document.getElementById("title_p").appendChild(new_a);
  }

  var rank_type = "_Log_"; //統計方式
  var rnd = 1; //回合
  // #!ranking01
  if (window.location.hash != "#!ranking") {
    rank_type = window.location.hash.substr(9, 5);
    rnd = parseInt(window.location.hash.substr(14));
  }

  $.ajax({
    dataType: "json",
    url: window.hosturl + "api/data.php?t=c_data&cid=" + window.ARGS.cid + "&r=" + rnd,
    error: function () {
      document.getElementById("display").innerText = "暫無數據";
    },
    success: function (data) {
      window.data = data;
      window.team[0] = {
        img: "",
        t_name: "",
        t_player: "",
        t_ps: "",
        t_sub: "",
        t_type: null,
        tid: "0"
      };
      if (rank_type === "_Log_") {
        rank_log(a, rnd, player_title);
      }
      if (rank_type === "Chart") {
        rank_chart(a, rnd, player_title);
      }
      if (rank_type === "Playe") {
        rank_player(a, rnd, 0, 0);
      }
      if (rank_type === "_Team") {
        rank_team(a, rnd);
      }
    }
  });
}

