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
function insert_student() {
    createXMLHttpRequest();
    var sid = document.getElementById("sid").value;
	var sname = document.getElementById("sname").value;
    var spwd = document.getElementById("spwd").value;
	var cid = document.getElementById("cid").value;
	XMLHttpReq.onreadystatechange = insert_student_r;
	XMLHttpReq.open("POST", "/admin/insert_student?sid=" + sid + "&sname=" + sname+ "&spwd=" + spwd + "&cid=" + cid, true);
	XMLHttpReq.send(null);
}
function insert_student_r() {
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
                "<td><a href='javascript:update_student_input(\"" + student.sid + "\")' class='btn waves-effect waves-light'>更新</a></td>" +
                "<td><a href='javascript:delete_student(\"" + student.sid + "\")' class='btn waves-effect waves-light red darken-3'>删除</a></td>";
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
function update_student_input(sid) {
    var students = document.getElementById('tab1').getElementsByTagName('tbody')[0];
    var rows = students.getElementsByTagName('tr');
    for(var i = 0; i < rows.length; ++i) {
        var student = rows[i].getElementsByTagName('td');
        if (student[0].innerHTML == sid) {
            document.getElementById('update_student_sid').innerHTML = student[0].innerHTML;
            var sname = document.getElementById('update_student_sname');
            sname.placeholder = student[1].innerHTML;
            sname.value = "";
            var spwd = document.getElementById('update_student_spwd');
            spwd.placeholder = student[2].innerHTML;
            spwd.value = "";
            var cid = document.getElementById('update_student_cid');
            cid.placeholder = student[3].innerHTML;
            cid.value = "";
            break;
        }
    }
    $('#update_student_input').openModal();
}
function update_student() {
    createXMLHttpRequest();
    var sid = document.getElementById('update_student_sid').innerHTML;
    var sname = document.getElementById('update_student_sname');
    sname = sname.value ? sname.value : sname.placeholder;
    var spwd = document.getElementById('update_student_spwd');
    spwd = spwd.value ? spwd.value : spwd.placeholder;
    var cid = document.getElementById('update_student_cid');
    cid = cid.value ? cid.value : cid.placeholder;
	XMLHttpReq.onreadystatechange = update_student_r;
	XMLHttpReq.open("POST", "/admin/update_student?sid=" + sid + "&sname=" + sname + "&spwd=" + spwd + "&cid=" + cid, true);
	XMLHttpReq.send(null);
}
function update_student_r() {
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var result = eval('(' + response + ')');
        if (result.success) {
            var students = document.getElementById('tab1').getElementsByTagName('tbody')[0];
            var rows = students.getElementsByTagName('tr');
            for(var i = 0; i < rows.length; ++i) {
                var student = rows[i].getElementsByTagName('td');
                if (student[0].innerHTML == result.sid) {
                    student[1].innerHTML = result.sname;
                    student[2].innerHTML = result.spwd;
                    student[3].innerHTML = result.cid;
                    break;
                }
            }
            $('#update_student_input').closeModal();
            Materialize.toast('修改成功!', 1000);
        }
        else {
            Materialize.toast('修改失败!', 1000);
        }
	}
}
function delete_student(sid) {
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
                "<td><a href='javascript:update_teacher_input(\"" + teacher.tid + "\")' class='btn waves-effect waves-light'>更新</a></td>" +
                "<td><a href='javascript:delete_teacher(\"" + teacher.tid + "\")' class='btn waves-effect waves-light red darken-3'>删除</a></td>";
            document.getElementById('tid').value = "";
            document.getElementById('tname').value = "";
            document.getElementById('tpwd').value = "";
        }
        else {
            Materialize.toast('插入失败!', 1000);
        }
	}
}
function update_teacher_input(tid) {
    var teachers = document.getElementById('tab2').getElementsByTagName('tbody')[0];
    var rows = teachers.getElementsByTagName('tr');
    for(var i = 0; i < rows.length; ++i) {
        var teacher = rows[i].getElementsByTagName('td');
        if (teacher[0].innerHTML == tid) {
            document.getElementById('update_teacher_tid').innerHTML = teacher[0].innerHTML;
            var tname = document.getElementById('update_teacher_tname');
            tname.placeholder = teacher[1].innerHTML;
            tname.value = "";
            var tpwd = document.getElementById('update_teacher_tpwd');
            tpwd.placeholder = teacher[2].innerHTML;
            tpwd.value = "";
            break;
        }
    }
    $('#update_teacher_input').openModal();
}
function update_teacher() {
    createXMLHttpRequest();
    var tid = document.getElementById('update_teacher_tid').innerHTML;
    var tname = document.getElementById('update_teacher_tname');
    tname = tname.value ? tname.value : tname.placeholder;
    var tpwd = document.getElementById('update_teacher_tpwd');
    tpwd = tpwd.value ? tpwd.value : tpwd.placeholder;
	XMLHttpReq.onreadystatechange = update_teacher_r;
	XMLHttpReq.open("POST", "/admin/update_teacher?tid=" + tid + "&tname=" + tname + "&tpwd=" + tpwd, true);
	XMLHttpReq.send(null);
}
function update_teacher_r() {
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var result = eval('(' + response + ')');
        if (result.success) {
            var teachers = document.getElementById('tab2').getElementsByTagName('tbody')[0];
            var rows = teachers.getElementsByTagName('tr');
            for(var i = 0; i < rows.length; ++i) {
                var teacher = rows[i].getElementsByTagName('td');
                if (teacher[0].innerHTML == result.tid) {
                    teacher[1].innerHTML = result.tname;
                    teacher[2].innerHTML = result.tpwd;
                    break;
                }
            }
            $('#update_teacher_input').closeModal();
            Materialize.toast('修改成功!', 1000);
        }
        else {
            Materialize.toast('修改失败!', 1000);
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
                "<td><a href='javascript:update_admin_input(\"" + admin.aid + "\")' class='btn waves-effect waves-light'>更新</a></td>" +
                "<td><a href='javascript:delete_admin(\"" + admin.aid + "\")' class='btn waves-effect waves-light red darken-3'>删除</a></td>";
            document.getElementById('aid').value = "";
            document.getElementById('aname').value = "";
            document.getElementById('apwd').value = "";
        }
        else {
            Materialize.toast('插入失败!', 1000);
        }
	}
}
function update_admin_input(tid) {
    var admins = document.getElementById('tab3').getElementsByTagName('tbody')[0];
    var rows = admins.getElementsByTagName('tr');
    for(var i = 0; i < rows.length; ++i) {
        var admin = rows[i].getElementsByTagName('td');
        if (admin[0].innerHTML == tid) {
            document.getElementById('update_admin_aid').innerHTML = admin[0].innerHTML;
            var aname = document.getElementById('update_admin_aname');
            aname.placeholder = admin[1].innerHTML;
            aname.value = "";
            var apwd = document.getElementById('update_admin_apwd');
            apwd.placeholder = admin[2].innerHTML;
            apwd.value = "";
            break;
        }
    }
    $('#update_admin_input').openModal();
}
function update_admin() {
    createXMLHttpRequest();
    var aid = document.getElementById('update_admin_aid').innerHTML;
    var aname = document.getElementById('update_admin_aname');
    aname = aname.value ? aname.value : aname.placeholder;
    var apwd = document.getElementById('update_admin_apwd');
    apwd = apwd.value ? apwd.value : apwd.placeholder;
	XMLHttpReq.onreadystatechange = update_admin_r;
	XMLHttpReq.open("POST", "/admin/update_admin?aid=" + aid + "&aname=" + aname + "&apwd=" + apwd, true);
	XMLHttpReq.send(null);
}
function update_admin_r() {
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var result = eval('(' + response + ')');
        if (result.success) {
            var admins = document.getElementById('tab3').getElementsByTagName('tbody')[0];
            var rows = admins.getElementsByTagName('tr');
            for(var i = 0; i < rows.length; ++i) {
                var admin = rows[i].getElementsByTagName('td');
                if (admin[0].innerHTML == result.aid) {
                    admin[1].innerHTML = result.aname;
                    admin[2].innerHTML = result.apwd;
                    break;
                }
            }
            $('#update_admin_input').closeModal();
            Materialize.toast('修改成功!', 1000);
        }
        else {
            Materialize.toast('修改失败!', 1000);
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