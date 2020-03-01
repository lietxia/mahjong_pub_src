function HC_RULE() {
  //onHashChange_规则页
  var a = document.getElementById("display");
  a.innerHTML = "";
  document.getElementById("title_p").innerHTML = "";
  document.getElementById("title_h1").innerText = window.admin.c_name;
  document.body.setAttribute("class", "bg_black");
  $("#banner").css("background-image", "url('img/banner1.jpg')");

  var new_a = document.createElement("a");
  new_a.setAttribute("href", "#!register");
  new_a.innerText = "比賽報名";
  document.getElementById("title_p").appendChild(new_a);

  var new_a = document.createElement("a");
  new_a.setAttribute("href", "#!class");
  new_a.innerText = "查看分組";
  document.getElementById("title_p").appendChild(new_a);

  var new_a = document.createElement("a");
  new_a.setAttribute("href", "#!ranking");
  new_a.innerText = "成績統計";
  document.getElementById("title_p").appendChild(new_a);

  var new_a = document.createElement("a");
  new_a.setAttribute("onclick", "TEAM_LOGIN()");
  new_a.innerText = "隊伍編輯";
  document.getElementById("title_p").appendChild(new_a);

  var new_hr = document.createElement("hr");
  new_hr.setAttribute("class", "dash_hr");
  a.appendChild(new_hr);

  var new_span = document.createElement("span");
  new_span.setAttribute("class", "dash_hr_txt");
  new_span.innerText = " 比 賽 公 告 ";
  a.appendChild(new_span);

  var new_div = document.createElement("div");
  new_div.setAttribute("id", "msg");
  new_div.innerHTML = marked(window.admin.c_gonggao);
  a.appendChild(new_div);

  var new_hr = document.createElement("hr");
  new_hr.setAttribute("class", "dash_hr");
  a.appendChild(new_hr);

  var new_span = document.createElement("span");
  new_span.setAttribute("class", "dash_hr_txt");
  new_span.innerText = " 比 賽 規 則 ";
  a.appendChild(new_span);

  var new_div = document.createElement("div");
  new_div.setAttribute("id", "rule");
  new_div.innerHTML = marked(window.admin.c_pad);
  a.appendChild(new_div);
}