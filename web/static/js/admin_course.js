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

// class
function insert_class(){
    createXMLHttpRequest();
    var cid = document.getElementById("cid").value;
	XMLHttpReq.onreadystatechange = insert_class_r;
	XMLHttpReq.open("POST", "/admin/insert_class?cid=" + cid, true);
	XMLHttpReq.send(null);
}
function insert_class_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var classObj = eval('(' + response + ')');
        classObj = classObj.class;
        if (classObj) {
            var classes = document.getElementById('tab1').getElementsByTagName('tbody')[0];
            var row = classes.insertRow(classes.getElementsByTagName('tr').length - 1);
            row.innerHTML += "<td>" + classObj.cid + "</td>";
            document.getElementById('cid').value = "";
        }
        else {
            Materialize.toast('插入失败!', 1000);
        }
	}
}

// course
function insert_course(){
    createXMLHttpRequest();
    var cid = document.getElementById("course_cid").value;
	var cname = document.getElementById("course_cname").value;
    var tid = document.getElementById("course_tid").value;
	XMLHttpReq.onreadystatechange = insert_course_r;
	XMLHttpReq.open("POST", "/admin/insert_course?cid=" + cid + "&cname=" + cname+ "&tid=" + tid, true);
	XMLHttpReq.send(null);
}
function insert_course_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var course = eval('(' + response + ')');
        course = course.course;
        if (course) {
            var courses = document.getElementById('tab2').getElementsByTagName('tbody')[0];
            var row = courses.insertRow(courses.getElementsByTagName('tr').length - 1);
            row.innerHTML += "<td>" + course.cid + "</td>" + "<td>" + course.cname + "</td>" + "<td>" + course.tid + "</td>";
            document.getElementById('course_cid').value = "";
            document.getElementById('course_cname').value = "";
            document.getElementById('course_tid').value = "";
        }
        else {
            Materialize.toast('插入失败!', 1000);
        }
	}
}

// student_course
function insert_student_course(){
    createXMLHttpRequest();
    var sid = document.getElementById("student_course_sid").value;
	var cid = document.getElementById("student_course_cid").value;
    var score = document.getElementById("student_course_score").value;
	XMLHttpReq.onreadystatechange = student_course_r;
	XMLHttpReq.open("POST", "/admin/insert_student_course?sid=" + sid + "&cid=" + cid+ "&score=" + score, true);
	XMLHttpReq.send(null);
}
function student_course_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var student_course = eval('(' + response + ')');
        student_course = student_course.student_course;
        if (student_course) {
            var student_courses = document.getElementById('tab3').getElementsByTagName('tbody')[0];
            var row = student_courses.insertRow(student_courses.getElementsByTagName('tr').length - 1);
            row.innerHTML += "<td>" + student_course.sid + "</td>" + "<td>" + student_course.cid + "</td>" + "<td>" + student_course.score + "</td>";
            document.getElementById('student_course_sid').value = "";
            document.getElementById('student_course_cid').value = "";
            document.getElementById('student_course_score').value = "";
        }
        else {
            Materialize.toast('插入失败!', 1000);
        }
	}
}