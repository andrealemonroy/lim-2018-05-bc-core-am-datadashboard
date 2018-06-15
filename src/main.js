document.getElementById('lima').addEventListener('click', ()=>{
  let info=document.getElementById('info');
  let head2=document.getElementById('dash')
  info.style.display='block';
  head2.style.display='block';
  citys.style.display='none';
})

document.getElementById('mostrarDatos').addEventListener('click', () => {
  var resulListaAlumnas = document.getElementById("listStudent");
  let listStudentStyle = document.getElementById('listStudent').style.display;
  if (listStudentStyle == 'none') {
    document.getElementById('listStudent').style.display = 'block';
  }
  else document.getElementById('listStudent').style.display = 'none';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (resulListaAlumnas.innerHTML === "") {

      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var datos = JSON.parse(xmlhttp.responseText);

        for (var i in datos) {
          resulListaAlumnas.innerHTML += datos[i].name + "<hr/>";
        }
      }
    }
  }
  xmlhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json", true);
  xmlhttp.send();

});

var resultadoPercent = document.getElementById("info2");
document.getElementById('mostrarPercent').addEventListener('click', () => {
  let info2Style = document.getElementById('info2').style.display;
  if (info2Style == 'none') {
    document.getElementById('info2').style.display = 'block';
  }
  else document.getElementById('info2').style.display = 'none';

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (resultadoPercent.innerHTML === "") {

      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var data = JSON.parse(xmlhttp.responseText);
        var promPercentCurso = 0;
        var w = 0;

        for (var i in data) {

          resultadoPercent.innerHTML += "<h5>" + i + "</h5>";

          var course = data[i];
          var percentCourse = [];

          for (var j in course) {

            resultadoPercent.innerHTML += j + "- percent :" + course[j].percent + "<br/>"+ "<hr/>";

            percentCourse.push(course[j].percent);
            promPercentCurso = promPercentCurso + course[j].percent+ "<hr/>";

          }

          w = w + 1;

        }

        rpta = promPercentCurso / w;
        console.log(rpta);

      }
    }
  }
  xmlhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json", true);
  xmlhttp.send();

});

var percentXAlumna=document.getElementById('percentAlumna')
document.getElementById('mostrarPercentAlumna').addEventListener('click', () => {
  let percentXAlumnaStyle = document.getElementById('percentAlumna').style.display;
  if (percentXAlumnaStyle == 'none') {
    document.getElementById('percentAlumna').style.display = 'block';
  }
  else document.getElementById('percentAlumna').style.display = 'none';
  var id = '00hJv4mzvqM3D9kBy3dfxoJyFV82';

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (percentXAlumna.innerHTML === "") {

      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var dataPercent = JSON.parse(xmlhttp.responseText);

        for (var i in dataPercent) {

          var course = dataPercent[i];

          if (i == id) {
            percentXAlumna.innerHTML += "<h5>" + i + "</h5>";
            for (var j in course) {
              percentXAlumna.innerHTML += j + "- percent :" + course[j].percent + "<br/>";
            }

          }
        }

      }

    }

  }

  xmlhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json", true);
  xmlhttp.send();

});

var resultadoQuizzesAlumna = document.getElementById("quizzesAlumna");
function mostrarQuizzesAlumna(callback) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (resultadoQuizzesAlumna.innerHTML === "") {

      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var data = JSON.parse(xmlhttp.responseText);

        callback(null, data);

      }

    }

  }

  xmlhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json", true);
  xmlhttp.send();

}

document.getElementById('dashboard').addEventListener('click', () => {
  let citys = document.getElementById('citys').style.display;
  if (citys == 'none') {
    document.getElementById('citys').style.display = 'block';
  }
  else document.getElementById('citys').style.display = 'none';
});

function mostrarQuizzesAlumna2(){
  let quizAlumna = document.getElementById('quizzesAlumna').style.display;
  if (quizAlumna == 'none') {
    document.getElementById('quizzesAlumna').style.display = 'block';
  }
  else document.getElementById('quizzesAlumna').style.display = 'none';
  mostrarQuizzesAlumna((err, data) => {
    const id='00hJv4mzvqM3D9kBy3dfxoJyFV82';
    const scores = [];
    Object.keys(data[id]).map((topic) => {
      Object.keys(data[id][topic].units).map((leccion) => {
        Object.keys(data[id][topic].units[leccion].parts).map((lectura) => {
          if (data[id][topic].units[leccion].parts[lectura].hasOwnProperty('score')) {
            scores.push(data[id][topic].units[leccion].parts[lectura].score)
          }
        });
      });
    });
    const promedio = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    document.getElementById('quizzesAlumna').innerHTML=promedio;
  })
};
document.getElementById('mostrarQuizzesAlumna2').addEventListener('click', mostrarQuizzesAlumna2);