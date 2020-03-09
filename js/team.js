
//手動輸入頭像URL
function ENTER_IMG() {
  var IMGURL = null;
  IMGURL = prompt("請輸入圖片網址", "");
  //  \S+\.(?:png|jpg|bmp|gif)$
  if (IMGURL != null && IMGURL != "") {
    var patt1 = new RegExp(/\S+\.(?:png|jpg|bmp|gif|jpeg)$/);
    var result = patt1.test(IMGURL);
    if (result) {
      alert("檢測通過，別忘了保存");
      $("#show_img").attr("src", IMGURL);
    } else {
      alert("網址必須以png|jpg|bmp|gif結尾，建議使用上傳");
    }
  } //選了yes
}

//提交表單前的處理
function SAVE_EDIT() {
  if (!window.CAN_EDIT) { return alert('網頁端修改出場名單功能，被關閉了'); }
  var x = "";
  $(".ls").each(function () {
    x += $(this).text() + "\n";
  });
  var linkurl = $("#show_img").attr("src");
  linkurl = (linkurl.substr(-12) == "img/none.jpg") ? "" : linkurl;
  var data = {
    "posttype": "update",
    "t_pw": window.ARGS.t_pw,
    "t_ps": $("#t_ps").val(),
    "cid": window.ARGS.cid,
    "postdata": x,
    "linkurl": linkurl,
    "team_type": $("#team_type").prop("checked") ? 1 : 0
  }
  $.ajax({
    url: window.hosturl + "team_post.php",
    data: data,
    method: "POST",
    dataType: "json",
    success: function (data) { alert(data.msg) }
  });
}

//退賽處理
function EXIT_CS() {
  if (window.CAN_EDIT) {
    if (window.confirm("確定退賽？")) {
      var data = {
        "posttype": "exit",
        "t_pw": window.ARGS.t_pw,
      }
      $.ajax({
        url: window.hosturl + "team_post.php",
        data: data,
        method: "POST",
        dataType: "json",
        success: function (data) { alert(data.msg) }
      });
    }
  }
}


//上傳頭像
function LOCAL_UP_IMG() {
  var returnmsg = {
    'Access Denied.': '拒絕訪問',
    'Upload file count limit.': '超過了最大可上傳次數',
    'Upload file frequency limit.': '超過了最大可上傳頻率',
    "Server error. Upload directory isn't writable.": '服务器錯誤。上傳目录不可寫。',
    'No files were uploaded.': '未上傳文件',
    'File is empty.': '文件是空的',
    'File is too large.': '文件太大',
    'File has an invalid extension.': '不支持的文件格式',
    'Image upload repeated limit.': '圖片已上傳過',
    'Could not save uploaded file.': '無法保存文件'
  };

  var fileObj = document.getElementById("smfile").files[0]; // js 获取文件对象
  if (typeof fileObj == "undefined" || fileObj.size <= 0) {
    alert("請選擇圖片");
    return;
  }
  var formFile = new FormData();
  formFile.append("image", fileObj); //加入文件对象
  $.ajax({
    url: "https://api.imgbb.com/1/upload?key=48529e1dc7e367e0b725508338369b11",
    data: formFile,
    method: "POST",
    dataType: "json",
    cache: false, //上传文件无需缓存
    processData: false, //用于对data参数进行序列化处理 这里必须false
    contentType: false, //必须
    success: function (data) {
      if (data.success) {
        alert("頭像上傳成功");
        document.getElementById("linkurl").value = data.data.url;
        $("#show_img").attr("src", data.data.url);
      } else {
        alert("錯誤\n" + data.error.message);
        /*
        var rs_match = data["message"].match(/http.+$/);
        if (rs_match) {
          alert("頭像上傳成功！");
          document.getElementById("linkurl").value = rs_match[0];
          $("#show_img").attr("src", rs_match[0]);
        } else {
          var text = (data.message in returnmsg) ? returnmsg[data.message] : data.message;
          alert("上傳錯誤\n" + text);
        }
      */
      }
    }
  });
}

//刪除ID
function DEL_LAST_ID() {
  if (confirm("是否刪除列表最後的ID？（若誤操作，請不要保存，直接刷新）"))
    $("#all_player_list li:last-child").remove();
  return
}

function move(isup, that) {
  var this_e = $(that).parent();
  var target_e = (isup) ? $(that).parent().prev()
    : $(that).parent().next();
  if (target_e.text() == "") { return }
  var this_text = this_e.text();
  var target_text = target_e.text();
  this_e.children("span").text(target_text);
  target_e.children("span").text(this_text);
}


function ADD_ID(newid) {//添加ID
  newid = newid ? newid : prompt("請輸入新的ID", "");
  if (newid != null && newid.replace(/\s+/g, "") != "") {
    var e = document.createElement('li');
    var span = document.createElement('span');
    span.innerText = newid;
    span.setAttribute('class', 'ls');
    var btnup = document.createElement("input");
    btnup.setAttribute('value', '↑');
    btnup.setAttribute('class', 'btnup');
    btnup.setAttribute('type', 'button');
    btnup.setAttribute('onclick', "move(true,this)")
    var btndn = document.createElement("input");
    btndn.setAttribute('type', 'button');
    btndn.setAttribute('class', 'btndn');
    btndn.setAttribute('value', '↓');
    btndn.setAttribute('onclick', "move(false,this)")
    e.appendChild(btnup);
    e.appendChild(btndn);
    e.appendChild(span);
    document.getElementById("all_player_list").appendChild(e);
  }
  return
}

(function () {
  var args = {};
  var match = null;
  var search = decodeURIComponent(location.search.substring(1));
  var reg = /(?:([^&=]+)=([^&]+))/g;
  while ((match = reg.exec(search)) !== null) {
    args[match[1]] = match[2];
  }

  window.ARGS = args;
  window.team = false;

  match = 0;

  $.getJSON(window.hosturl + "api/data.php?t=tm_pw&cid=" + window.ARGS.t_pw, function (data) {
    window.team = data;
    window.ARGS.cid = data.cid;
    match++;
    if (match == 2) { init(); }
  });

  $.getJSON(window.hosturl + "api/data.php?t=admin&cid=" + window.ARGS.cid, function (data) {
    window.admin = data;
    match++;
    if (match == 2) { init(); }
  });

})()

function init() {

  window.CAN_EDIT = true; //可以修改

  if (window.team === false) {
    alert("密碼錯誤");
    window.history.go(-1);
  }

  //禁止修改
  if (window.admin.STOP_EDIT == 1) {
    window.CAN_EDIT = false;
  }

  /*
  //只能通過牌譜添加ID
  if (window.admin.ONLY_GET == 1) {
    $("#ADD_NEW_ID").hide();
  }
  */

  window.ARGS.cid = window.team.cid;

  //讀取信息
  if (window.team.img != null && window.team.img != "") {
    $("#show_img").attr("src", window.team.img);
    $("#linkurl").val(window.team.img);
  }
  $("#t_ps").val(window.team.t_ps);
  var h3 = "［不鴿］";

  if (window.team.t_type == 1) {
    $("#team_type").prop("checked", true);
  }
  if (window.team.t_type == 0) {
    h3 = "［可能鴿］";
  }

  if (window.team.t_type == null || window.team.t_type == "") {
    h3 = "［已退賽］";
    window.CAN_EDIT = false;
  }

  $("#t_name").text("{" + window.team.tid + "}" + window.admin.c_name + h3 + window.team.t_name);
  if (window.team.t_player == null) window.team.t_player = "";
  if (window.team.t_sub == null) window.team.t_sub = "";

  window.playerlist = (
    window.team.t_player +
    "\n" +
    window.team.t_sub
  ).split(/\s+/);

  var target_list = document.getElementById("all_player_list");
  if (window.playerlist.length == 0) {
    var e = document.createElement('li');
    target_list.appendChild(e)
  } else {
    for (var i = 0; i < window.playerlist.length; i++) {
      if (window.playerlist[i] != "") {
        ADD_ID(window.playerlist[i]);
      }
    }
  }

  //構建導航條

  var new_nav = document.createElement("div");
  new_nav.setAttribute("id", "nav");

  var link1 = document.createElement("a");
  link1.setAttribute("href", "./?cid=" + window.ARGS.cid + "#!rule");
  link1.innerText = "規則";
  var link2 = document.createElement("a");
  link2.setAttribute("href", "./?cid=" + window.ARGS.cid + "#!register");
  link2.innerText = "報名";
  var link3 = document.createElement("a");
  link3.setAttribute("href", "./?cid=" + window.ARGS.cid + "#!class");
  link3.innerText = "分組";
  var link4 = document.createElement("a");
  link4.setAttribute("href", "./?cid=" + window.ARGS.cid + "#!ranking");
  link4.innerText = "統計";
  var link5 = document.createElement("a");
  link5.setAttribute("onclick", "TEAM_LOGIN()");
  link5.innerText = "登入";
  var link6 = document.createElement("a");
  link6.setAttribute("href", "./");
  link6.innerText = "賽事";
  new_nav.appendChild(link1);
  new_nav.appendChild(link2);
  new_nav.appendChild(link3);
  new_nav.appendChild(link4);
  new_nav.appendChild(link5);
  new_nav.appendChild(link6);
  document.body.appendChild(new_nav);
}

