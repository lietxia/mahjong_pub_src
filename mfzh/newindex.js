$.getJSON(window.hosturl + "api/data.php?t=cs_list&cid=1", function (data) {

    var friendlylink = [
        ["【麻雀用品网店】牌友之家", "card_fans.png", "https://paiyouzhijia.taobao.com"],
        ["日本麻雀百科", "wiki_lingshangkaihua_com.png", "http://wiki.lingshangkaihua.com"],
        ["Allen's Mahjong Blog", "allen_blog.png", "https://jpmj.nagchan.com"],
        ["天鳳用戶日誌(水表網)", "nodocchi_moe.png", "https://nodocchi.moe"],
        ["日本麻將介紹網站", "jmj_tw.png", "http://jmj.tw"]
    ];

    var qqgrouplink = [
        ["火警立直雀力日進群", 6575294, "https://jq.qq.com/?_wv=1027&k=5SkUGpK"],
        ["長沙線下日麻", 109935221, "https://jq.qq.com/?_wv=1027&k=4AoLHuq"],
        ["长春線下日麻", 195586910, "https://jq.qq.com/?_wv=1027&k=4B4g9ZH"],
        ["北美日麻小站", 299490237, "https://jq.qq.com/?_wv=1027&k=4BHCn9w"],
        ["上海線下日麻", 151747829, "https://jq.qq.com/?_wv=1027&k=4CEIF2Z"],
        ["宁波線下日麻", 144751555, "https://jq.qq.com/?_wv=1027&k=5iHkeca"],
        ["苏州線下日麻", 260025364, "https://jq.qq.com/?_wv=1027&k=5FThhYl"],
        ["廈門線下日麻", 733157756, "https://jq.qq.com/?_wv=1027&k=5pPEyUP"],
        ["深圳線下日麻", 461861930, "https://jq.qq.com/?_wv=1027&k=5vVh2x6"],
        ["泸州線下日麻", 669578617, "https://jq.qq.com/?_wv=1027&k=5Kg09UD"],
        ["南京線下日麻", 872957333, "https://jq.qq.com/?_wv=1027&k=527uO4p"],
        ["昆明線下日麻", 370653876, "https://jq.qq.com/?_wv=1027&k=5DDlv1W"],
        ["沈阳線下日麻", 310806720, "https://jq.qq.com/?_wv=1027&k=ORBRRAYr"],
        ["西北竞技麻雀联盟", 620904958, "https://jq.qq.com/?_wv=1027&k=B1fMUwLN"],
        ["济南立直麻将俱乐部", 835228612, "https://jq.qq.com/?_wv=1027&k=mxZ8HhEc"],
    ];
    var end_count = 0, running_count = 0;
    for (var i = 0; i < data.length; i++) {
        var running_cs = document.createElement('tr');
        var end_cs = document.createElement('tr');
        var td0 = cet(['td'], data[i]["cid"])
        var td = document.createElement('td');
        td.appendChild(cet(['a', 'target', '_top', "href", "./?cid=" + data[i]["cid"]], data[i]["c_name"]))
        var rtype2text = { '1': '四麻', '2': '三麻', }
        if (data[i]["CS_END"] === "1") {
            end_cs.appendChild(td0);
            end_cs.appendChild(td);
            end_cs.appendChild(cet(['td'], rtype2text[data[i]["r_type"]]));
            end_cs.appendChild(cet(['td'], data[i]["bm_ed"]));
            document.getElementById('end_cs').appendChild(end_cs);
            end_count++;
        } else {
            running_cs.appendChild(td0);
            running_cs.appendChild(td);
            running_cs.appendChild(cet(['td'], rtype2text[data[i]["r_type"]]));
            running_cs.appendChild(cet(['td'], data[i]["bm_ed"]));
            document.getElementById('running_cs').appendChild(running_cs);
            running_count++;
        }
    }
    document.getElementById('running_count').innerText = running_count;
    document.getElementById('end_count').innerText = end_count;

    for (var i = 0; i < qqgrouplink.length; i++) {
        var new_a = ce(['a', 'target', '_blank', "class", "index_card", "href", qqgrouplink[i][2]]);
        var new_img = ce(['img', "src", "https://p.qlogo.cn/gh/" + qqgrouplink[i][1] + '/' + qqgrouplink[i][1] + "/640"]);
        new_a.appendChild(new_img);
        new_a.appendChild(cet(['div'], qqgrouplink[i][0]));
        //var new_span = document.createElement('span');
        new_a.appendChild(cet(['span'], qqgrouplink[i][1]));

        document.getElementById('offlineclub').appendChild(new_a)
    }

    for (var i = 0; i < friendlylink.length; i++) {
        var new_a = document.createElement("a");
        new_a.setAttribute("target", "_blank");
        new_a.setAttribute("href", friendlylink[i][2]);

        var new_img = document.createElement('img');
        new_img.setAttribute("src", "https://cdn.jsdelivr.net/gh/lietxia/mahjong_pub_src/img/" + friendlylink[i][1]);
        new_img.setAttribute("class", "index_frendlylink");
        new_img.setAttribute("alt", friendlylink[i][0]);
        new_a.appendChild(new_img);
        document.getElementById('friendly_link').appendChild(new_a);
    }

});
