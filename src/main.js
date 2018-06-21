document.getElementById('lima').addEventListener('click', () => {
  let info = document.getElementById('info');
  let head2 = document.getElementById('dash');
  let cohort = document.getElementById('cohortsH')
  info.style.display = 'block';
  head2.style.display = 'block';
  cohort.style.display = 'block';
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
        Object.keys(courses).map((topic) => {
          let unit = data[id][topic].units;
          Object.keys(unit).map((leccion) => {
            let parts_unit = data[id][topic].units[leccion].parts ;
            Object.keys(parts_unit).map((lectura) => {
              
              if (parts_unit[lectura].hasOwnProperty('score')) {
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

getPrueba = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json', (err, dataU) => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, data) =>{
      let resultprueba = document.getElementById('prueba'); 
      let pruebaStyle = document.getElementById('prueba').style.display;

      if (pruebaStyle == 'block') {
        document.getElementById('prueba').style.display = 'none';
      } else {

        if (resultprueba.innerHTML === "") {
          for (var i in dataU) {
            resultprueba.innerHTML += dataU[i].name + "<hr/>";
          }

          for (var i in data) {
            resultprueba.innerHTML += "<h5>" + i + "</h5>";
            var course = data[i];
            for (var j in course) {
              resultprueba.innerHTML += j + "- percent :" + course[j].percent + "<br/>" + "<hr/>";
            }
          }


        }
        document.getElementById('prueba').style.display = 'block';
      }

    });
  });
}

getPrueba2 = () => {

 
  getData('../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json', (err, dataUsers) => {

    getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, dataProgress) =>{

      // let resultprueba2 = document.getElementById('prueba2'); 

      // users = dataUsers ;
      // progress = dataProgress ;

      courses = "";
      let resultprueba3 = document.getElementById('prueba3'); 

      let result = computeUsersStats(dataUsers, dataProgress, courses);

      resultprueba3.innerHTML = "<h5>" + result + "</h5>";

    });

  });
  
}

getExercisesByStudent = () => {

  getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, data) => {
    let resultExerciseByStudent = document.getElementById("resultExerciseByStudent")
    let resultTwo = document.getElementById("resultNo")
    if (resultExerciseByStudent.innerHTML === "") {
      let scores = [];
      for (var id in data) {
        let course = data[id];
          Object.keys(course).map((topic) => {
            let unit = data[id][topic].units;
            Object.keys(unit).map((leccion) => {
              let parts_unit = data[id][topic].units[leccion].parts;
              Object.keys(parts_unit).map((lectura) => {
                if (parts_unit[lectura].hasOwnProperty('exercises')) {
                  let exercises = data[id][topic].units[leccion].parts[lectura].exercises;
                  Object.keys(exercises).map((complete) => {
                    if (exercises[complete].hasOwnProperty('completed')) {
                      scores.push(exercises[complete].completed) ;
                      // console.log(id + " - " + scores);
                    }
                  })
                  console.log(id + " - " + scores);
                }
              })
            })
          })
          // if (scores>0){
          //   resultExerciseByStudent.innerHTML=id+"sí hizo!"
          // }
          // else{
          //   resultExerciseByStudent.innerHTML=id+"no hizo!"
          // }
          console.log("---------------------------");
          scores = [] ;
        }
      }
  })
}


// document.getElementById('mostrarDatos').addEventListener('click', getStudents);
// document.getElementById('mostrarPercent').addEventListener('click', getPercent);
// document.getElementById('mostrarPercentAlumna').addEventListener('click', getPercentByStudent);
// document.getElementById('mostrarQuizzesAlumna').addEventListener('click', getQuizByStudent);
// document.getElementById('mostrar').addEventListener('click', getPrueba);
document.getElementById('mostrar2').addEventListener('click', ()=>{
  getPrueba2();
  let imageCircle = document.getElementById('imageCircle');
    imageCircle.style.display='none';
});

// document.getElementById('exercisesByStudent').addEventListener('click', getExercisesByStudent);

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

