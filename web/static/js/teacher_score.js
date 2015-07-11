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

function update_student_score(sid, cid){
    createXMLHttpRequest();
    var score = document.getElementById(sid + '_' + cid).value;
	XMLHttpReq.onreadystatechange = update_student_score_r;
	XMLHttpReq.open("POST", "/teacher/update_student_score?sid=" + sid + "&cid=" + cid + "&score=" + score, true);
	XMLHttpReq.send(null);
}

function update_student_score_r(){
	if(XMLHttpReq.readyState == 4) {
		var response = XMLHttpReq.responseText;
		var result = eval('(' + response + ')');
        if (result.success) {
            console.log(result);
            var score = document.getElementById('0_0');
            score.value = "";
            score = score.parentNode.parentNode.parentNode.getElementsByTagName('td');
            score[2].innerHTML = result.score;
            if (result.score >= 60) {
                score[3].innerHTML = "<i class='small mdi-toggle-check-box left teal-text darken-1'></i>";
            }
            else {
                score[3].innerHTML = "<i class='small mdi-toggle-check-box-outline-blank left teal-text'></i>";
            }
        }
        else {
            Materialize.toast('修改失败!', 1000);
        }
	}
}