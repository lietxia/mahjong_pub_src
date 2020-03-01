//首頁
function break_element(str) {
  var div = document.createElement('div');
  var hr = document.createElement('hr');
  hr.setAttribute("class", "dash_hr");

  var new_span = document.createElement('span');
  new_span.setAttribute("class", "dash_hr_txt");
  new_span.innerText = str;

  div.appendChild(hr);
  div.appendChild(new_span);
  return div
}

function page_index() {
  $.getJSON("api/data.php?t=cs_list&cid=1", function (data) {
    var navlink = [
      ["申請新賽事", "https://wiki.mahjong.pub/#!newcs.md"],
      ["分組器", "fenzu.html"],
    ];

    var friendlylink = [
      ["【麻雀用品网店】牌友之家", "card_fans.png", "https://paiyouzhijia.taobao.com"],
      ["日本麻雀百科", "wiki_lingshangkaihua_com.png", "http://wiki.lingshangkaihua.com"],
      ["Allen's Mahjong Blog", "allen_blog.png", "https://jpmj.nagchan.com"],
      ["天鳳用戶日誌(水表網)", "nodocchi_moe.png", "https://nodocchi.moe"],
      ["日本麻將介紹網站", "jmj_tw.png", "http://jmj.tw"]
    ];

    var qqgrouplink = [
      ["火警立直雀力日進群", 6575294, "https://jq.qq.com/?_wv=1027&k=5SkUGpK"],
      ["長沙日麻總會", 109935221, "https://jq.qq.com/?_wv=1027&k=4AoLHuq"],
      ["长春日本麻將聯盟", 195586910, "https://jq.qq.com/?_wv=1027&k=4B4g9ZH"],
      ["北美日麻小站", 299490237, "https://jq.qq.com/?_wv=1027&k=4BHCn9w"],
      ["魔都面麻同好會", 151747829, "https://jq.qq.com/?_wv=1027&k=4CEIF2Z"],
      ["宁波棍力训练营", 144751555, "https://jq.qq.com/?_wv=1027&k=5iHkeca"],
      ["苏州saki研究社", 260025364, "https://jq.qq.com/?_wv=1027&k=5FThhYl"],
      ["廈門綫下日麻群", 733157756, "https://jq.qq.com/?_wv=1027&k=5pPEyUP"],
      ["深圳竞技麻将协会", 461861930, "https://jq.qq.com/?_wv=1027&k=5vVh2x6"],
      ["泸州市綫下日麻群", 669578617, "https://jq.qq.com/?_wv=1027&k=5Kg09UD"],
    ];

    var nav = document.getElementById("nav");
    var c = document.getElementById("display");


    //init
    nav.innerHTML = "";
    c.innerHTML = "";
    document.body.setAttribute("class", "bg_purple");

    //logo
    var logo = document.createElement('embed');
    logo.setAttribute("src", "icon/dql.svg");
    logo.setAttribute("type", "image/svg+xml");
    logo.setAttribute("pluginspage", "http://www.adobe.com/svg/viewer/install");
    logo.setAttribute("width", 300);
    logo.setAttribute("height", 300);
    c.appendChild(logo);

    //頂部
    for (var i = 0; i < navlink.length; i++) {
      var new_el = document.createElement("a");
      new_el.innerText = navlink[i][0];
      new_el.setAttribute("href", navlink[i][1]);
      nav.appendChild(new_el);
    }

    c.appendChild(break_element("進行中賽事"));


    var running_cs = document.createElement('div');
    running_cs.setAttribute('class', "index_list");
    var end_cs = document.createElement('div');
    end_cs.setAttribute('class', "index_list");

    for (var i = 0; i < data.length; i++) {
      var new_a = document.createElement("a");
      new_a.setAttribute("href", "./?cid=" + data[i]["cid"]);
      new_a.innerText = data[i]["c_name"];

      if (data[i]["CS_END"] === "1") {
        end_cs.appendChild(new_a);
      } else {
        running_cs.appendChild(new_a);
      }
    }

    c.appendChild(running_cs);

    c.appendChild(break_element("QQ群推薦"));

    for (var i = 0; i < qqgrouplink.length; i++) {
      var new_a = document.createElement("a");
      new_a.setAttribute("href", qqgrouplink[i][2]);
      new_a.setAttribute("class", "index_card");

      var new_img = document.createElement('img');
      new_img.setAttribute("src",
        "https://p.qlogo.cn/gh/"
        + qqgrouplink[i][1]
        + '/'
        + qqgrouplink[i][1]
        + "/640");
      new_img.setAttribute(
        "onerror",
        'this.style.display = "none"'
      );
      new_a.appendChild(new_img);

      var new_div = document.createElement('div');
      new_div.innerText = qqgrouplink[i][0];
      new_a.appendChild(new_div);

      var new_span = document.createElement('span');
      new_span.innerText = qqgrouplink[i][1];
      new_a.appendChild(new_span);

      c.appendChild(new_a)
    }


    c.appendChild(break_element("結束的賽事"));
    c.appendChild(end_cs);

    c.appendChild(break_element("友情鏈接"));

    //var fl=document.createElement('div')
    //fl.setAttribute("id","index_frendlylink")
    for (var i = 0; i < friendlylink.length; i++) {
      var new_a = document.createElement("a");
      new_a.setAttribute("target", "_blank");

      new_a.setAttribute("href", friendlylink[i][2]);

      var new_img = document.createElement('img');
      new_img.setAttribute("src", "img/" + friendlylink[i][1]);
      new_img.setAttribute("class", "index_frendlylink");
      new_img.setAttribute("alt", friendlylink[i][0]);
      new_a.appendChild(new_img);
      //fl.appendChild(new_a)
      c.appendChild(new_a);
    }
    //c.appendChild(fl);

  });
}