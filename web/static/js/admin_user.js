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

// student
function insert_student(){
    createXMLHttpRequest();
    var sid = document.getElementById("sid").value;
	var sname = document.getElementById("sname").value;
    var spwd = document.getElementById("spwd").value;
	var cid = document.getElementById("cid").value;
	XMLHttpReq.onreadystatechange = insert_student_r;
	XMLHttpReq.open("POST", "/admin/insert_student?sid=" + sid + "&sname=" + sname+ "&spwd=" + spwd + "&cid=" + cid, true);
	XMLHttpReq.send(null);
}
function insert_student_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var student = eval('(' + response + ')');
        student = student.student;
        if (student) {
            var students = document.getElementById('tab1').getElementsByTagName('tbody')[0];
            var row = students.insertRow(students.getElementsByTagName('tr').length - 1);
            row.innerHTML +=
                "<td>" + student.sid + "</td>" +
                "<td>" + student.sname + "</td>" +
                "<td>" + student.spwd + "</td>" +
                "<td>" + student.cid + "</td>" +
                "<td><a href='javascript:delete_student(\"" + student.sid + "\")' class='btn waves-effect waves-light'>删除</a></td>";
            document.getElementById('sid').value = "";
            document.getElementById('sname').value = "";
            document.getElementById('spwd').value = "";
            document.getElementById('cid').value = "";
        }
        else {
            Materialize.toast('插入失败!', 1000);
        }
	}
}

function delete_student(sid){
    createXMLHttpRequest();
	XMLHttpReq.onreadystatechange = delete_student_r;
	XMLHttpReq.open("POST", "/admin/delete_student?sid=" + sid, true);
	XMLHttpReq.send(null);
}
function delete_student_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var result = eval('(' + response + ')');
        if (result.success) {
            var students = document.getElementById('tab1').getElementsByTagName('tbody')[0];
            var rows = students.getElementsByTagName('tr');
            for(var i = 0; i < rows.length; ++i) {
                if (rows[i].getElementsByTagName('td')[0].innerHTML == result.sid) {
                    students.deleteRow(i);
                    break;
                }
            }
        }
        else {
            Materialize.toast('删除失败!', 1000);
        }
	}
}

// teacher
function insert_teacher(){
    createXMLHttpRequest();
    var tid = document.getElementById("tid").value;
	var tname = document.getElementById("tname").value;
    var tpwd = document.getElementById("tpwd").value;
	XMLHttpReq.onreadystatechange = insert_teacher_r;
	XMLHttpReq.open("POST", "/admin/insert_teacher?tid=" + tid + "&tname=" + tname+ "&tpwd=" + tpwd, true);
	XMLHttpReq.send(null);
}
function insert_teacher_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var teacher = eval('(' + response + ')');
        teacher = teacher.teacher;
        if (teacher) {
            var teachers = document.getElementById('tab2').getElementsByTagName('tbody')[0];
            var row = teachers.insertRow(teachers.getElementsByTagName('tr').length - 1);
            row.innerHTML +=
                "<td>" + teacher.tid + "</td>" +
                "<td>" + teacher.tname + "</td>" +
                "<td>" + teacher.tpwd + "</td>" +
                "<td><a href='javascript:delete_teacher(\"" + teacher.tid + "\")' class='btn waves-effect waves-light'>删除</a></td>";
            document.getElementById('tid').value = "";
            document.getElementById('tname').value = "";
            document.getElementById('tpwd').value = "";
        }
        else {
            Materialize.toast('插入失败!', 1000);
        }
	}
}

function delete_teacher(tid){
    createXMLHttpRequest();
	XMLHttpReq.onreadystatechange = delete_teacher_r;
	XMLHttpReq.open("POST", "/admin/delete_teacher?tid=" + tid, true);
	XMLHttpReq.send(null);
}
function delete_teacher_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var result = eval('(' + response + ')');
        if (result.success) {
            var teachers = document.getElementById('tab2').getElementsByTagName('tbody')[0];
            var rows = teachers.getElementsByTagName('tr');
            for(var i = 0; i < rows.length; ++i) {
                if (rows[i].getElementsByTagName('td')[0].innerHTML == result.tid) {
                    teachers.deleteRow(i);
                    break;
                }
            }
        }
        else {
            Materialize.toast('删除失败!', 1000);
        }
	}
}

// admin
function insert_admin(){
    createXMLHttpRequest();
    var aid = document.getElementById("aid").value;
	var aname = document.getElementById("aname").value;
    var apwd = document.getElementById("apwd").value;
	XMLHttpReq.onreadystatechange = insert_admin_r;
	XMLHttpReq.open("POST", "/admin/insert_admin?aid=" + aid + "&aname=" + aname+ "&apwd=" + apwd, true);
	XMLHttpReq.send(null);
}
function insert_admin_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var admin = eval('(' + response + ')');
        admin = admin.admin;
        if (admin) {
            var teachers = document.getElementById('tab3').getElementsByTagName('tbody')[0];
            var row = teachers.insertRow(teachers.getElementsByTagName('tr').length - 1);
            row.innerHTML +=
                "<td>" + admin.aid + "</td>" +
                "<td>" + admin.aname + "</td>" +
                "<td>" + admin.apwd + "</td>" +
                "<td><a href='javascript:delete_admin(\"" + admin.aid + "\")' class='btn waves-effect waves-light'>删除</a></td>";
            document.getElementById('aid').value = "";
            document.getElementById('aname').value = "";
            document.getElementById('apwd').value = "";
        }
        else {
            Materialize.toast('插入失败!', 1000);
        }
	}
}

function delete_admin(aid){
    createXMLHttpRequest();
	XMLHttpReq.onreadystatechange = delete_admin_r;
	XMLHttpReq.open("POST", "/admin/delete_admin?aid=" + aid, true);
	XMLHttpReq.send(null);
}
function delete_admin_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var result = eval('(' + response + ')');
        if (result.success) {
            var admins = document.getElementById('tab3').getElementsByTagName('tbody')[0];
            var rows = admins.getElementsByTagName('tr');
            for(var i = 0; i < rows.length; ++i) {
                if (rows[i].getElementsByTagName('td')[0].innerHTML == result.tid) {
                    admins.deleteRow(i);
                    break;
                }
            }
        }
        else {
            Materialize.toast('删除失败!', 1000);
        }
	}
}