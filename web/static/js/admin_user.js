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
            row.innerHTML += "<td>" + student.sid + "</td>" + "<td>" + student.sname + "</td>" + "<td>" + student.spwd + "</td>" + "<td>" + student.cid + "</td>";
            document.getElementById('sid').value = "";
            document.getElementById('sname').value = "";
            document.getElementById('spwd').value = "";
            document.getElementById('cid').value = "";
        }
        else {

        }
	}
}

