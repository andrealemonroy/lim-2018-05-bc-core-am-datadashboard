document.getElementById('lima').addEventListener('click', () => {
  let info = document.getElementById('info');
  let head2 = document.getElementById('dash')
  info.style.display = 'block';
  head2.style.display = 'block';
  citys.style.display = 'none';
})

// Función para hacer las conexiones  XHR 
const getData = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      callback(null, data);
    }
  }
  xhr.send();
}

// Función para obtener los datos de todas las estudiantes y listarlos
getStudents = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json', (err, data) => {
    let resulListsAlumnas = document.getElementById("listStudents");
    let listStudentsStyle = document.getElementById('listStudents').style.display;
    if (listStudentsStyle == 'block') {
      document.getElementById('listStudents').style.display = 'none';
    } else {
      if (resulListsAlumnas.innerHTML === "") {
        for (var i in data) {
          resulListsAlumnas.innerHTML += data[i].name + "<hr/>";
        }
      }
      document.getElementById('listStudents').style.display = 'block';
    }
  });
}

// Función para mostrar el % de todos los cursos aprendidos de todos las estudiantes
getPercent = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, data) => {
    let resulPercentAlumnas = document.getElementById('percentStudents');
    let percentStudentsStyle = document.getElementById('percentStudents').style.display;
    if (percentStudentsStyle == 'block') {
      document.getElementById('percentStudents').style.display = 'none';
    }
    else {
      if (resulPercentAlumnas.innerHTML === "") {
        var promPercentCourse = 0;
        var w = 0;
        for (var i in data) {
          resulPercentAlumnas.innerHTML += "<h5>" + i + "</h5>";
          var course = data[i];
          var percentCourse = [];
          for (var j in course) {
            resulPercentAlumnas.innerHTML += j + "- percent :" + course[j].percent + "<br/>" + "<hr/>";
            percentCourse.push(course[j].percent);
            promPercentCourse = promPercentCourse + course[j].percent + "<hr/>";
          }
          w = w + 1;
        }
      }
      document.getElementById('percentStudents').style.display = 'block';
    }
  });
}

// Función para mostrar el % de todos los cursos aprendidos por Alumna
getPercentByStudent = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, data) => {
    let resulPercentByAlumna = document.getElementById('percentByStudent');
    let percentByStudentStyle = document.getElementById('percentByStudent').style.display;
    let id = '00hJv4mzvqM3D9kBy3dfxoJyFV82';
    if (percentByStudentStyle == 'block') {
      document.getElementById('percentByStudent').style.display = 'none';
    } else {
      if (resulPercentByAlumna.innerHTML === "") {
        for (var i in data) {
          let course = data[i];
          if (i == id) {
            resulPercentByAlumna.innerHTML += "<h5>" + i + "</h5>";
            for (var j in course) {
              resulPercentByAlumna.innerHTML += j + "- percent :" + course[j].percent + "<br/>";
            }
          }
        }
      }
      document.getElementById('percentByStudent').style.display = 'block';
    }
  });
}

getQuizByStudent = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, data) => {

    let resultQuizByAlumna = document.getElementById("quizByStudent"); 
    let quizByStudentStyle = document.getElementById('quizByStudent').style.display;

    // let id = '00hJv4mzvqM3D9kBy3dfxoJyFV82';

    if (quizByStudentStyle == 'block') {
      document.getElementById('quizByStudent').style.display = 'none';
    } else {
      if (resultQuizByAlumna.innerHTML === "") {

        const id = '00hJv4mzvqM3D9kBy3dfxoJyFV82';
        const scores = [];

        let courses = data[id];
        let units = data[id][topic].units
        let parts_units = data[id][topic].units[leccion].parts ;

        Object.keys(courses).map((topic) => {
          Object.keys(units).map((leccion) => {
            Object.keys(parts_units).map((lectura) => {
              if (parts_units[lectura].hasOwnProperty('score')) {
                scores.push(parts_unit[lectura].score)
              }
            });
          });
        });
        const promedio = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        document.getElementById('quizByStudent').innerHTML = promedio;

      }
      document.getElementById('quizByStudent').style.display = 'block';
    }
  });
}

document.getElementById('mostrarDatos').addEventListener('click', getStudents);
document.getElementById('mostrarPercent').addEventListener('click', getPercent);
document.getElementById('mostrarPercentAlumna').addEventListener('click', getPercentByStudent);
document.getElementById('mostrarQuizzesAlumna').addEventListener('click', getQuizByStudent);

// Función para mostrar lista de dashboard
document.getElementById('dashboard').addEventListener('click', () => {
  let citys = document.getElementById('citys').style.display;
  if (citys == 'block') {
    document.getElementById('citys').style.display = 'none';
  }
  else {
    document.getElementById('citys').style.display = 'block';
  }
});