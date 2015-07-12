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
            var student = document.getElementById(result.sid + '_' + result.cid);
            student.value = "";
            student = student.parentNode.parentNode.parentNode.getElementsByTagName('td');
            student[2].innerHTML = result.score;
            if (result.score >= 60) {
                student[3].innerHTML = "<i class='small mdi-toggle-check-box left teal-text darken-1'></i>";
            }
            else {
                student[3].innerHTML = "<i class='small mdi-toggle-check-box-outline-blank left teal-text'></i>";
            }
            draw_chart(result.cid);
        }
        else {
            Materialize.toast('修改失败!', 1000);
        }
	}
}

function draw_chart(cid) {
    var data = [0, 0, 0, 0, 0];
    var course = document.getElementById(cid);
    var students = course.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (var i = 0; i < students.length; ++i) {
        var student = students[i].getElementsByTagName('td');
        if (student[2].innerHTML >= 90)
            data[4] += 1;
        else if (student[2].innerHTML >= 80) {
            data[3] += 1;
        }
        else if (student[2].innerHTML >= 70) {
            data[2] += 1;
        }
        else if (student[2].innerHTML >= 60) {
            data[1] += 1;
        }
        else {
            data[0] += 1;
        }
    }

    // bar
    var bar_ctx = document.getElementById("bar_chart_" + cid).getContext("2d");
    var bar_data = {
        labels: ["0-60", "60-70", "70-80", "80-90", "90-100"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: data
            }
        ]
    };
    if (bar_ctx.bar_chart)
        bar_ctx.bar_chart.destroy();
    bar_ctx.bar_chart = new Chart(bar_ctx).Bar(bar_data);

    // pie
    var pie_ctx = document.getElementById("pie_chart_" + cid).getContext("2d");
    var pie_data = [
        {
            value: data[0],
            color:"#584A5E"
        },
        {
            value : data[1],
            color : "#C7604C"
        },
        {
            value : data[2],
            color : "#21323D"
        },
        {
            value : data[3],
            color : "#9D9B7F"
        },
        {
            value : data[4],
            color : "#D97041"
        }
    ];
    if (pie_ctx.pie_chart)
        pie_ctx.pie_chart.destroy();
    pie_ctx.pie_chart = new Chart(pie_ctx).Pie(pie_data);
}

window.onload = function() {

};