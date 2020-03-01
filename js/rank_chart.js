//添加resize event(图表改变尺寸用)
window.onresize = function () {
  $(".charts").each(function () {
    var id = $(this).attr("_echarts_instance_");
    window.echarts.getInstanceById(id).resize();
  });
};

//圖表
function rank_chart(a, rnd, lab2) {
  var is4 = true;
  if (window.admin.r_type == "2" || window.admin.r_type == "5") {
    is4 = false;
  }
  document.body.setAttribute("class", "bg_dark");
  var clsrid = [];
  for (var i = 0; i < window.cls.length; i++) {
    clsrid[window.cls[i]["rid"]] = window.cls[i];
  }
  //var lab2=player_title;
  var player_title = [];

  for (var i = 0; i < lab2.length; i++) {
    if (lab2[i] === lab2[i + 1]) {
      player_title[i] = lab2[i] + "1";
      player_title[i + 1] = lab2[i + 1] + "2";
      i++;
    } else {
      player_title[i] = lab2[i];
    }
  }
  player_title.unshift("起始");
  lab2.unshift("起始");
  //標記--
  for (rid in window.data) {
    /*
		function add_chart(cls,rnd,line,bar,pie,tn,lab) {
		輸入
		cls     隊伍
		rnd     回合
		line    折綫圖數據
		bar     柱狀圖數據
		pie     餅狀圖 & 標簽
		tn  折綫圖標簽 隊名1/隊名1/隊名1/隊名1
		lab  柱狀圖標簽 先鋒/先鋒/先鋒/先鋒/先鋒/
    */
    try {
      var tn1 = window.team[clsrid[rid]["tid1"]]["t_name"];
      var tn2 = window.team[clsrid[rid]["tid2"]]["t_name"];
      var tn3 = window.team[clsrid[rid]["tid3"]]["t_name"];
      var tn4 = window.team[clsrid[rid]["tid4"]]["t_name"];
    } catch (e) {
      console.log("err rid=" + rid + ";" + e);
      continue;
    }

    var tn1 = window.team[clsrid[rid]["tid1"]]["t_name"];
    var tn2 = window.team[clsrid[rid]["tid2"]]["t_name"];
    var tn3 = window.team[clsrid[rid]["tid3"]]["t_name"];
    var tn4 = window.team[clsrid[rid]["tid4"]]["t_name"];

    if (tn1.length > 8) {
      tn1 = tn1.substr(0, 8);
    }
    if (tn2.length > 8) {
      tn2 = tn2.substr(0, 8);
    }
    if (tn3.length > 8) {
      tn3 = tn3.substr(0, 8);
    }
    if (tn4.length > 8) {
      tn4 = tn4.substr(0, 8);
    }

    var lab = [],
      line = [],
      bar = [],
      tn = [tn1, tn2, tn3, tn4];

    line[0] = [];
    line[1] = [];
    line[2] = [];
    line[3] = [];
    line[0][0] = window.admin.c_s_po;
    line[1][0] = window.admin.c_s_po;
    line[2][0] = window.admin.c_s_po;
    line[3][0] = window.admin.c_s_po;
    line[0][1] = window.data[rid][0]["num1"];
    line[1][1] = window.data[rid][0]["num2"];
    line[2][1] = window.data[rid][0]["num3"];
    line[3][1] = window.data[rid][0]["num4"];

    bar[0] = [
      window.data[rid][0]["pint1"],
      window.data[rid][0]["pint2"],
      window.data[rid][0]["pint3"],
      window.data[rid][0]["pint4"]
    ];

    for (var i = 1; i < window.data[rid].length; i++) {
      bar[i] = [
        window.data[rid][i]["pint1"],
        window.data[rid][i]["pint2"],
        window.data[rid][i]["pint3"],
        window.data[rid][i]["pint4"]
      ];
      line[0][i + 1] = window.data[rid][i]["num1"];
      line[1][i + 1] = window.data[rid][i]["num2"];
      line[2][i + 1] = window.data[rid][i]["num3"];
      line[3][i + 1] = window.data[rid][i]["num4"];
    }

    var pie = [
      { name: tn1, value: window.data[rid][i - 1]["num1"] },
      { name: tn2, value: window.data[rid][i - 1]["num2"] },
      { name: tn3, value: window.data[rid][i - 1]["num3"] },
      { name: tn4, value: window.data[rid][i - 1]["num4"] }
    ];

    add_chart(
      clsrid[rid]["t_class"],
      rnd,
      line,
      bar,
      pie,
      tn,
      player_title,
      lab2
    );
  } //for in
} //func


//圖表add_chart(cls, rnd, line, bar, pie, tn, lab);
function add_chart(cls, rnd, line, bar, pie, tn, lab, lab2) {
  /*
	function add_chart(cls,rnd,line,bar,pie,tn,lab) {
	輸入
	cls     隊伍
	rnd     回合
	line    折綫圖數據
	bar     柱狀圖數據
	pie     餅狀圖 & 標簽
	lab[0]  折綫圖標簽 隊名1/隊名1/隊名1/隊名1
	lab[1]  柱狀圖標簽 先鋒/先鋒/先鋒/先鋒/先鋒/
	*/

  var is4 = true;
  if (window.admin.r_type == "2" || window.admin.r_type == "5") {
    is4 = false;
  }
  if (!is4) {
    //lab[0].pop();
    tn.pop();
    pie.pop();
  }
  var new_div = document.createElement("h2");
  new_div.innerText = window.admin.c_name + " 第" + rnd + "輪 第" + cls + "組";
  document.getElementById("display").appendChild(new_div);
  var show_lab = true;
  var new_div = document.createElement("div");
  new_div.setAttribute("id", "bar_" + cls);
  new_div.setAttribute("class", "charts");
  if (document.body.clientWidth < 768) {
    new_div.setAttribute("style", "width:100%;height:500px;");
    show_lab = false;
  } else {
    if (document.body.clientWidth >= 1200) {
      new_div.setAttribute("style", "width:70%;height:600px;margin:0 auto;");
    } else {
      new_div.setAttribute("style", "width:90%;height:600px;margin:0 auto;");
    }
  }
  document.getElementById("display").appendChild(new_div);
  var new_div = document.createElement("hr");
  document.getElementById("display").appendChild(new_div);

  var myChart = echarts.init(document.getElementById("bar_" + cls), "chalk");

  //開始繪圖
  var out = [];
  var radius = ["10%", "20%"];
  var center = ["80%", "85%"];
  if (document.body.clientWidth < 768) {
    radius = ["6%", "13%"];
    center = ["50%", "61%"];
  }
  if (is4) {
    out.push(
      {
        type: "pie",
        radius: radius,
        center: center,
        data: pie,
        label: { normal: { formatter: "{b}\n{c}點" } }
      },
      {
        type: "line",
        name: tn[0],
        data: line[0],
        itemStyle: { color: "#ff715e" },
        markLine: {
          data: [{ name: "起始分", yAxis: line[0][0] }],
          label: { position: "start", formatter: "{b}" },
          itemStyle: { color: "#FFF" }
        }
      },
      {
        type: "line",
        name: tn[1],
        data: line[1],
        itemStyle: { color: "#51c0ff" }
      },
      {
        type: "line",
        name: tn[2],
        data: line[2],
        itemStyle: { color: "#ffee51" }
      },
      {
        type: "line",
        name: tn[3],
        data: line[3],
        itemStyle: { color: "#17ff8c" }
      },

      {
        type: "bar",
        name: lab2[1],
        data: bar[0],
        stack: "p0",
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    );
  } else {
    out.push(
      {
        type: "pie",
        radius: radius,
        center: center,
        data: pie,
        label: { normal: { formatter: "{b}\n{c}點" } }
      },
      {
        type: "line",
        name: tn[0],
        data: line[0],
        itemStyle: { color: "#ff715e" },
        markLine: {
          data: [{ name: "起始分", yAxis: line[0][0] }],
          label: { position: "start", formatter: "{b}" },
          itemStyle: { color: "#FFF" }
        }
      },
      {
        type: "line",
        name: tn[1],
        data: line[1],
        itemStyle: { color: "#51c0ff" }
      },
      {
        type: "line",
        name: tn[2],
        data: line[2],
        itemStyle: { color: "#ffee51" }
      },

      {
        type: "bar",
        name: lab2[1],
        data: bar[0],
        stack: "p0",
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    );
  }

  for (var i = 1, stack = 0; i < bar.length; i++) {
    if (lab2[i] === lab2[i - 1]) {
      stack++;
    } else {
      stack = 0;
    }
    out.push({
      type: "bar",
      name: lab2[1 + i],
      data: bar[i],
      stack: "p" + stack,
      xAxisIndex: 1,
      yAxisIndex: 1
    });
  }
  //
  var grid_set = [];
  if (document.body.clientWidth < 768) {
    grid_set = [
      {
        left: "1%",
        right: "3%",
        bottom: "50%",
        containLabel: true
      },
      {
        top: "75%",
        left: "1%",
        right: "1%",
        bottom: "1%",
        containLabel: true
      }
    ];
  } else {
    grid_set = [
      {
        left: "1%",
        right: "3%",
        bottom: "35%",
        containLabel: true
      },
      {
        top: "75%",
        left: "1%",
        right: "40%",
        bottom: "1%",
        containLabel: true
      }
    ];
  }

  var option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" }
    },
    legend: {
      type: "scroll"
    },
    grid: grid_set,
    xAxis: [
      {
        type: "category",
        gridIndex: 0,
        data: lab,
        boundaryGap: false
      },
      {
        show: show_lab,
        gridIndex: 1,
        type: "value"
      }
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: "value"
      },
      {
        type: "category",
        gridIndex: 1,
        data: tn
      }
    ],
    series: out
  };
  myChart.setOption(option);
}