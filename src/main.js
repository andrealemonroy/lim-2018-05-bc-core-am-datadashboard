
var resulListaAlumnas = document.getElementById("info");
function mostrarDatos() {

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

}

var resultadoPercent = document.getElementById("info2");
function mostrarPercent() {

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

            resultadoPercent.innerHTML += j + "- percent :" + course[j].percent + "<br/>";

            percentCourse.push(course[j].percent);
            promPercentCurso = promPercentCurso + course[j].percent;

          }

          w = w + 1;

        }

        rpta = promPercentCurso / w;
        console.log(rpta);

      }

    }

  }

  // xmlhttp.open("GET","progress.json",true);
  xmlhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json", true);

  xmlhttp.send();

}

var percentXAlumna = document.getElementById("PercentAlumna");
function mostrarPercentAlumna(){

  var id ='00hJv4mzvqM3D9kBy3dfxoJyFV82';

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (percentXAlumna.innerHTML === "") {

      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var dataPercent = JSON.parse(xmlhttp.responseText);

        for(var i in dataPercent){

          var course = dataPercent[i];
          
          if (i == id) {
            percentXAlumna.innerHTML += "<h5>" + i + "</h5>";
            for (var j in course){
              percentXAlumna.innerHTML += j + "- percent :" + course[j].percent + "<br/>";
            }

          }
        }

      }

    }

  }

  xmlhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json", true);
  xmlhttp.send();


  
}

var  resultadoQuizzesAlumna= document.getElementById("quizzesAlumna");
function mostrarQuizzesAlumna(){

  var id ='00hJv4mzvqM3D9kBy3dfxoJyFV82';

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (resultadoQuizzesAlumna.innerHTML === "") {

      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var data = JSON.parse(xmlhttp.responseText);

        for(var i in data){

          var coursesByStudent = data[i];

          if (i == id) {
            resultadoQuizzesAlumna.innerHTML += "<h5>" + i + "</h5>";
            for (var j in coursesByStudent ){
              resultadoQuizzesAlumna.innerHTML += " percent :" + coursesByStudent[j].percent + "<br/>";
              console.log(coursesByStudent[j])
            }
          }

        }

      }

    }

  }

  xmlhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json", true);
  xmlhttp.send();


  
}