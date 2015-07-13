var XMLHttpReq;
function createXMLHttpRequest() {
    try {
        XMLHttpReq = new ActiveXObject("MSXML2.XMLHTTP");
    }
    catch(E) {
        try {
            XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(E) {
            XMLHttpReq = new XMLHttpRequest();
        }
    }
}

function update_pwd(type) {
    createXMLHttpRequest();
    var old_pwd = document.getElementById("old_pwd").value;
    var new_pwd_first = document.getElementById("new_pwd_first").value;
    var new_pwd_second = document.getElementById("new_pwd_second").value;
    if (!old_pwd || !new_pwd_first || !new_pwd_second) {
        Materialize.toast('请输入完整信息!', 1000);
        return;
    }
    if (new_pwd_first != new_pwd_second) {
        Materialize.toast('两次密码不一致!', 1000);
        return;
    }
	XMLHttpReq.onreadystatechange = update_pwd_r;
	XMLHttpReq.open("POST", "/" + type + "/update_pwd?old_pwd=" + old_pwd + "&new_pwd=" + new_pwd_first, true);
	XMLHttpReq.send(null);
}
function update_pwd_r() {
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var result = eval('(' + response + ')');
        if (result.success) {
            $('#update_pwd').closeModal();
            Materialize.toast('修改成功!', 1000);
            document.getElementById("old_pwd").value = "";
            document.getElementById("new_pwd_first").value = "";
            document.getElementById("new_pwd_second").value = "";
        }
        else {
            Materialize.toast('修改失败!', 1000);
        }
	}
}
