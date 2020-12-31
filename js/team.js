window.webobj = {
	can_edit: true,
	apiurl: "https://000.mk/",
	teamdata: {},
	admin: {},
	args: {},
	img_use_url: function () {
		var img = document.getElementById("show_img");
		var input = document.getElementById("input_url");
		var url = input.value.replace(/\s+/g, "");
		if (url == "") { return; }
		if (/^http\S+\.(?:png|jpg|bmp|gif|jpeg)$/.test(url) === false) {
			return alert("網址必須以png|jpg|bmp|gif結尾，建議使用上傳");
		}
		img.setAttribute("src", url);
		alert("檢測通過，別忘了保存");
	},
	save: function () {
		if (window.webobj.can_edit === false) {
			return alert('網頁端修改出場名單功能，被關閉了');
		}
		var name_text = "";
		$(".player_name").each(function () {
			name_text += $(this).val() + "\n";
		});
		var linkurl = $("#show_img").attr("src");
		linkurl = (linkurl.substr(-12) == "img/none.jpg") ? "" : linkurl;
		$.ajax({
			url: window.webobj.apiurl + "team_post.php",
			data: {
				"posttype": "update",
				"t_pw": window.webobj.args.t_pw,
				"t_ps": $("#t_ps").val(),
				"cid": window.webobj.args.cid,
				"postdata": name_text,
				"linkurl": linkurl,
				"team_type": $("#team_type").prop("checked") ? 1 : 0
			},
			method: "POST",
			dataType: "json",
			success: function (data) { alert(data.msg); }
		});
	},
	reset_pw: function () {
		if (window.confirm("密碼暴露時，才需要重設，確定要重新生成密碼嗎？")) {
			$.ajax({
				url: window.webobj.apiurl + "team_post.php",
				data: {
					"posttype": "reset_pw",
					"t_pw": window.webobj.args.t_pw,
				},
				method: "POST",
				dataType: "json",
				success: function (data) {
					if (data.hasOwnProperty("new_pw")) {
						prompt("密碼重設成功,新密碼：", data.new_pw);
						return window.open(
							"./team.htm?t_pw=" + data.new_pw, "_self");
					} else { alert(data.msg); }
				}
			});
		}
	},
	exit_cs: function () {
		if (window.webobj.can_edit) {
			if (window.confirm("確定退賽？")) {
				$.ajax({
					url: window.webobj.apiurl + "team_post.php",
					data: {
						"posttype": "exit",
						"t_pw": window.webobj.args.t_pw,
					},
					method: "POST",
					dataType: "json",
					success: function (data) { alert(data.msg); }
				});
			}
		}
	},
	init: function () {
		if (window.webobj.teamdata === false) {
			return alert("密碼錯誤");
			//window.history.go(-1);
		}
		//禁止修改
		if (window.webobj.admin.STOP_EDIT == 1) {
			window.webobj.can_edit = false;
		}
		window.webobj.args.cid = window.webobj.teamdata.cid;

		//讀取信息
		if (window.webobj.teamdata.img != null && window.webobj.teamdata.img != "") {
			document.getElementById("show_img")
				.setAttribute("src", window.webobj.teamdata.img);
		}
		$("#t_ps").val(window.webobj.teamdata.t_ps);

		var status2text = {
			"0": "不鴿",
			"1": "可能鴿"
		};
		var status = window.webobj.teamdata.t_type;
		var status_text = "不鴿"
		if (status2text.hasOwnProperty(status)) {
			if (status == 1) {
				status_text = "可能鴿"
				$("#team_type").prop("checked", true);
			}
		} else {
			status_text = "已退賽";
			window.webobj.can_edit = false;
		}
		document.getElementById("t_name").innerText = window.webobj.teamdata.t_name;
		document.getElementById("tid").innerText = window.webobj.teamdata.tid;
		document.getElementById("t_status").innerText = status_text;

		if (window.webobj.teamdata.t_player == null) window.webobj.teamdata.t_player = "";
		if (window.webobj.teamdata.t_sub == null) window.webobj.teamdata.t_sub = "";

		var playerlist = (
			window.webobj.teamdata.t_player +
			"\n" +
			window.webobj.teamdata.t_sub
		).split(/\s+/);
		document.getElementById('players').innerText = "";
		return window.webobj.add_id(playerlist);

	},
	del_id: function () {
		if (confirm("是否刪除列表最後的ID？（若誤操作，請不要保存，直接刷新）"))
			$("#players li:last-child").remove();
		return
	},
	add_id: function (names = [""]) {//添加ID
		var target = document.getElementById("players");
		for (var i = 0; i < names.length; i++) {
			var li = document.createElement('li');
			var div_mian = document.createElement("div");
			div_mian.className = "input-group input-group-sm mb-2";
			var ipt = document.createElement("input");
			ipt.className = "form-control player_name";
			ipt.setAttribute("type", "text");
			ipt.setAttribute("value", names[i])
			div_mian.appendChild(ipt);
			var div_append = document.createElement("div");
			div_append.className = "input-group-append";
			var btn1 = document.createElement("button");
			btn1.className = "btn btn-info";
			btn1.setAttribute("onclick", "window.webobj.move(true,this)");
			btn1.setAttribute("type", "button");
			btn1.appendChild(document.createTextNode("↑"));
			div_append.appendChild(btn1);
			var btn2 = document.createElement("button");
			btn2.className = "btn btn-secondary";
			btn2.setAttribute("onclick", "window.webobj.move(false,this)");
			btn2.setAttribute("type", "button");
			btn2.appendChild(document.createTextNode("↓"));
			div_append.appendChild(btn2);
			div_mian.appendChild(div_append);
			li.appendChild(div_mian);
			target.appendChild(li);
		}
	},
	move: function (isup, that) {
		var this_e = $(that).parent().parent().parent();
		var target_e = (isup) ?
			$(that).parent().parent().parent().prev()
			: $(that).parent().parent().parent().next();
		if (target_e.text() == "") { return; }
		var this_text = this_e.find("input").val();
		this_e.find("input").val(target_e.find("input").val());
		target_e.find("input").val(this_text);
	},
	upload_img: function () {
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

		var fileObj = document.getElementById("smfile").files[0];
		if (typeof fileObj == "undefined" || fileObj.size <= 0) {
			return alert("請選擇圖片");
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
					//document.getElementById("linkurl").value = data.data.url;
					document.getElementById("show_img").setAttribute("src", data.data.url);
					alert("頭像上傳成功");
				} else {
					alert("錯誤\n" + data.error.message);
				}
			}
		});
	},
	toindex: function () {
		if (window.webobj.args.hasOwnProperty("cid")) {
			window.open("./?cid=" + window.webobj.args.cid, "_self");
		} else {
			window.open("./", "_self");
		}
	}
};

(function () {
	var args = {};
	var match = null;
	var search = decodeURIComponent(location.search.substring(1));
	var reg = /(?:([^&=]+)=([^&]+))/g;
	while ((match = reg.exec(search)) !== null) {
		args[match[1]] = match[2];
	}
	if (args.length == 0) { return; }
	window.webobj.args = args;
	$.getJSON(
		window.webobj.apiurl
		+ "api/data.php?t=tm_pw&cid="
		+ window.webobj.args.t_pw
	).done(function (teamdata) {
		console.log("teamdata success");
		window.webobj.teamdata = teamdata;
		window.webobj.args.cid = teamdata.cid;
		$.getJSON(window.webobj.apiurl
			+ "api/data.php?t=admin&cid="
			+ teamdata.cid)
			.done(function (admin) {
				console.log("admin success");
				window.webobj.admin = admin;
				window.webobj.init();
			}).fail(function () {
				console.log("ajax admin error");
			});
	}).fail(function () {
		console.log("ajax team error");
	});
})()