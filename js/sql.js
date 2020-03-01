//JavaScript Document

function isCon(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return true;
  }
  return false;
}
function LASTIDS() {
  var thei = $("#thei").val();
  var nm1 = ZKSZ(CWLB, ns1);
  var nm2 = ZKSZ(CWLB, ns2);
  var nm3 = ZKSZ(CWLB, ns3);
  var nm4 = ZKSZ(CWLB, ns4);
  var nm1 = nm1[thei];
  var nm2 = nm2[thei];
  var nm3 = nm3[thei];
  var nm4 = nm4[thei];
  var out = [nm1, nm2, nm3, nm4];
  return out;
}
function NEXT() {
  //下一出場
  var lsid = LASTIDS();
  var nm1 = lsid[0].replace(/(\r|\n)/g, "") + " " + $("#zongfen1").text();
  var nm2 = lsid[1].replace(/(\r|\n)/g, "") + " " + $("#zongfen2").text();
  var nm3 = lsid[2].replace(/(\r|\n)/g, "") + " " + $("#zongfen3").text();
  var nm4 = lsid[3].replace(/(\r|\n)/g, "") + " " + $("#zongfen4").text();
  var x = [nm1, nm2, nm3, nm4];
  if ($ID("randture").checked)
    var x = x.sort(function (a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    });
  $ID("nextinfo").value = x.join("\n");
} //FUNCTION END

//FUNCTION END

function $ID($$) {
  return document.getElementById($$);
}

function SCCF(array) {
  //刪除數組重複
  var x = {},
    out = [];
  for (var i = 0; i < array.length; i++) {
    x[array[i]] = array[i];
  } //for
  var i = 0;
  for (array in x) {
    out[i] = array;
    i++;
  }
  return out;
} //返回形式：數組

function ZKSZ(array1, array2) {
  //展開數組 A1=長，A2=短
  x = SCCF(array1);
  var obj = {},
    out = [];
  for (var i = 0; i < x.length; i++) {
    obj[x[i]] = array2[i];
  }
  for (var i = 0; i < array1.length; i++) {
    out[i] = obj[array1[i]];
  }
  return out;
}

function AFTERPOST(thisid, inx) {
  //提交前確認
  if (thisid == "subpost") {
    $("#player1").val($("#t1n").val() + "\n" + $("#t1s").val());
    $("#lsp1").val($("#zongfen1").text());

    $("#player2").val($("#t2n").val() + "\n" + $("#t2s").val());
    $("#lsp2").val($("#zongfen2").text());

    $("#player3").val($("#t3n").val() + "\n" + $("#t3s").val());
    $("#lsp3").val($("#zongfen3").text());

    $("#player4").val($("#t4n").val() + "\n" + $("#t4s").val());
    $("#lsp4").val($("#zongfen4").text());

    $("#therowi").val($("#thei").val());
    $("#therid").val($("#thisrid").val());
    $("#posttype").val("newpost");
    $("#post_l_data").val(QSFS);
    $ID("bt_post").submit();
  } else if (thisid == "dellast") {
    if (confirm("確認刪除最後一條記錄？")) {
      $("#posttype").val("del");
      $("#post_l_data").val(inx);
      $ID("bt_post").submit();
    }
  } else if (confirm("確認修改？")) return true;
  else return false;
}

function GET_QS(name) {
  //得到當前URL的GET參數
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

$("meta").after("<title>" + GET_QS("t_class") + "組</title>");

//載入後功能
$(document).ready(function () {
  $(".paipu").each(function () {
    //遍歷查詢
    if ($(this).html() == "" || $(this).html() == "&nbsp;") $(this).text("無");
    else
      $(this).html("<a href='" + $(this).text() + "' target='_blank'>牌譜</a>");
  });
  $(".j_DD").each(function () {
    //遍歷查詢正負
    if ($(this).text() > 0) $(this).text("+" + $(this).text());
  });

  $(".zongfen1").each(function (i) {
    //總分特效
    $fenshu = $(this)
      .parent()
      .parent()
      .children()
      .children()
      .slice(-11);
    if (isNaN($fenshu.eq(0).text())) {
      $(this).text(QSFS);
      $(".zongfen2")
        .eq(i)
        .text(QSFS);
      $(".zongfen3")
        .eq(i)
        .text(QSFS);
      $(".zongfen4")
        .eq(i)
        .text(QSFS);
    } else {
      $(this).text($fenshu.eq(0).text());
      $(".zongfen2")
        .eq(i)
        .text($fenshu.eq(3).text());
      $(".zongfen3")
        .eq(i)
        .text($fenshu.eq(6).text());
      $(".zongfen4")
        .eq(i)
        .text($fenshu.eq(9).text());
    }
  }); //總分結束

  $("#team_w").click(function () {
    //隊伍隱藏
    $("#hid").slideToggle();
  });
  $("#datas").click(function () {
    //履歷隱藏
    $("#hid3").slideToggle();
  });

  $("#ckinfo").focus(function () {
    //隱藏類
    $("#ifr").slideUp();
    $("#hid2").slideDown();
  });
  $("#nextinfo").focus(function () {
    $("#ifr").slideDown();
    $("#hid2").slideUp();
  });
  $("#btinfo").focus(function () {
    $("#hid4").slideDown();
  });
  $("#btinfo").blur(function () {
    $("#hid4").slideUp();
  });

  $(".z_20").change(
    //文本框
    function () {
      $(this).val(
        $(this)
          .val()
          .replace(/^\s+|\s+$| /g, "")
          .replace(/\r\n/g, "\n")
          .replace(/\r/g, "\n")
      );
    }
  );

  $("#ifr").attr("src", "//tenhou.net/cs/edit/?C" + DHS);

  $("#ckinfo").change(
    //檢查ID
    function () {
      $("#id1").val($("#t1n").val());
      $("#id2").val($("#t2n").val());
      $("#id3").val($("#t3n").val());
      $("#id4").val($("#t4n").val());
      $("#ckids").submit();
    } //function
  ); //change

  NEXT();
});
