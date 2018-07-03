// Función para hacer las conexiones  XHR
const getData = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data1 = JSON.parse(xhr.responseText);
      callback(null, data1);
    }
  }
  xhr.send();
}


getAvgUsersStats = (arr) => {



  let sumPercent = 0;
  let sumQuizzes = 0;
  let sumExercises = 0;
  let i = 0;
  arrayUsersAvg = [];




  for (let student of arr) {

    sumPercent += student.stats.percent;
    sumQuizzes += student.stats.quizzes.percent;
    sumExercises += student.stats.exercises.percent;
    i++;
  }

  avgPercent = sumPercent / i;
  avgQuizzes = sumQuizzes / i;
  avgExercises = sumExercises / i;
  console.log("prom percent " + avgPercent);
  console.log("prom quizzes " + avgQuizzes);
  console.log("prom exercises " + avgExercises);

  document.getElementById('avgQuizzes').innerHTML = avgQuizzes;

  arrayUsersAvg.push(avgPercent, avgQuizzes, avgExercises);



  return arrayUsersAvg
}

getArrayUsersStats = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json', (err, dataUsers) => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, dataProgress) => {
      getData('../data/cohortsPrueba.json', (err, dataCohorts) => {
        const courses = ["intro"];
        let search = document.getElementById('txtSearch').value;
        let users = computeUsersStats(dataUsers, dataProgress, courses);
        console.log(users);
        sortUsers(users, "name", "ASC");
        filterUsers(users, search);
        var i = 0;
        var countdata = users.length;
        var strhtml = '';
        document.getElementById('table').getElementsByTagName('tbody')[0].innerHTML = "";
        if (countdata > 0) {
          while (i < countdata) {
            strhtml += '<tr><td>' + users[i].name + '</td><td>' + users[i].stats.percent + '%' + '</td><td>' + users[i].stats.exercises.completed + '</td><td>' + Math.round(users[i].stats.reads.completed) + '%' + '</td><td>' + users[i].stats.quizzes.completed + '</td><td>' + users[i].stats.quizzes.scoreAvg + '</td></tr>'
            ++i;
          }
          document.getElementById('table').getElementsByTagName('tbody')[0].innerHTML = strhtml;
        }
      });
    });
  });
}

document.getElementById('btnArrayUserStats').addEventListener('click', () => {
  // getArrayUsersStats();
  let imageCircle = document.getElementById('imageCircle');
  imageCircle.style.display = 'none';
  btnArrayUserStats.style.display = 'none';

  let info = document.getElementById('info');
  let detailStudents = document.getElementById('studentsBox')


  info.style.display = 'none';
  citys.style.display = 'none';
  detailStudents.style.display = 'block';

});

document.getElementById('buttonStart').addEventListener('click', () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json', (err, dataUsers) => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, dataProgress) => {
      getData('../data/cohortsPrueba.json', (err, dataCohorts) => {
        const options = {
          cohort: [{}, {}],
          cohortData: {
            users: dataUsers,
            progress: dataProgress,
          },
          orderBy: '',
          orderDirection: '',
          search: ''
        }
        console.log(options);
        let users = computeUsersStats(dataUsers, dataProgress, courses);
        let oJSON = users; // oJSON contiene la misma información de la data agrupada sin ordenar todavía
        let filter = document.getElementById('txtSearch').value.toUpperCase(); // tiene la cadena ingresada en mayúsculas 
        const opcion = document.getElementById('fill');
        const order = document.getElementById('order');

        let value = opcion.options[opcion.selectedIndex].value;
        let valueOrder = order.options[order.selectedIndex].value;

        if (valueOrder == 'ASC') {
          if (value == 'name') {
            options.orderBy = 'name';
            options.orderDirection = 'ASC';
          }
          else if (value == 'percent') {
            options.orderBy = 'percent';
            options.orderDirection = 'ASC';
          }
          else if (value == 'exercises') {
            options.orderBy = 'exercises';
            options.orderDirection = 'ASC';

          }
          else if (value == 'reads') {
            options.orderBy = 'reads';
            options.orderDirection = 'ASC';

          }
          else if (value == 'quizzes') {
            options.orderBy = 'quizzes';
            options.orderDirection = 'ASC';

          }
          else if (value == 'quizzesAvg') {
            options.orderBy = 'quizzesAvg';
            options.orderDirection = 'ASC';

          };
          let oJSON = sortUsers(users, options.orderBy, options.orderDirection);
        }
        else if (valueOrder == 'DSC') {
          if (value == 'name') {
            options.orderBy = 'name';
            options.orderDirection = 'DSC';

          }
          else if (value == 'percent') {
            options.orderBy = 'percent';
            options.orderDirection = 'DSC';

          }
          else if (value == 'exercises') {
            options.orderBy = 'exercises';
            options.orderDirection = 'DSC';

          }
          else if (value == 'reads') {
            options.orderBy = 'reads';
            options.orderDirection = 'DSC';

          }
          else if (value == 'quizzes') {
            options.orderBy = 'quizzes';
            options.orderDirection = 'DSC';

          }
          else {
            options.orderBy = 'quizzesAvg';
            options.orderDirection = 'DSC';

          }
          let oJSON = sortUsers(users, options.orderBy, options.orderDirection);



          var i = 0;
        var countdata = oJSON.length;
        var strhtml = '';
        if (countdata > 0) {
          while (i < countdata) {
            strhtml += '<tr><td>' + oJSON[i].name + '</td><td>' + oJSON[i].stats.percent + '%' + '</td><td>' + oJSON[i].stats.exercises.percent + '%' + '</td><td>' + oJSON[i].stats.reads.completed + '%' + '</td><td>' + oJSON[i].stats.quizzes.completed + '</td><td>' + oJSON[i].stats.quizzes.scoreAvg + '</td></tr>'
            ++i;
          }
        }
        }
        // en oJSON estará la nueva data ordenada, lo se envía la data a mostrar a filter
        filterUsers(oJSON, filter);

        

       


      });

    });
  });
});


document.getElementById('dashboard').addEventListener('click', () => {
  let citys = document.getElementById('citys').style.display;
  if (citys == 'block') {
    document.getElementById('citys').style.display = 'none';
  }
  else {
    document.getElementById('citys').style.display = 'block';
  }
});


getCohorts = () => {
  // const section = document.getElementById('container');

  getData('../data/cohorts.json', (err, dataCohorts) => {

    cohorts = dataCohorts;
    select = document.getElementById('selectCohorts')

    for (var cohort of cohorts) {
      nameCohorts = cohort.id;
      if (nameCohorts.indexOf('lim') === 0) {
        select.innerHTML += `<option value =${nameCohorts}> ${nameCohorts} </option>`;
      }
    }

    select.addEventListener('change', () => {

      if (select.value == "lim-2018-03-pre-core-pw") {

        let info = document.getElementById('info');
        let head2 = document.getElementById('dash');
        let cohort = document.getElementById('cohortsH')
        let detailStudents = document.getElementById('studentsBox')
        getArrayUsersStats();


        info.style.display = 'block';
        head2.style.display = 'block';
        cohort.style.display = 'block';
        citys.style.display = 'none';
        detailStudents.style.display = 'none'

      } else {
        console.log("hola mundo " + select.value)

        let info = document.getElementById('info');
        let head2 = document.getElementById('dash');
        let cohort = document.getElementById('cohortsH')
        let detailStudents = document.getElementById('studentsBox')

        info.style.display = 'none';
        head2.style.display = 'none';
        cohort.style.display = 'none';
        citys.style.display = 'none';
        detailStudents.style.display = 'none'
      }

    });



  });
}


getCohorts1 = () => {
  // const section = document.getElementById('container');

  getData('../data/cohorts.json', (err, dataCohorts) => {

    cohorts = dataCohorts;
    select = document.getElementById('selectCohorts')

    for (var cohort of cohorts) {
      nameCohorts = cohort.id;
      if (nameCohorts.indexOf('cdmx') === 0) {
        select.innerHTML += `<option value =${nameCohorts}> ${nameCohorts} </option>`;
      }
    }

    select.addEventListener('change', () => {
      alert(select.value)

    });

  });
}

document.getElementById('lim').addEventListener('click', getCohorts);
document.getElementById('cdmx').addEventListener('click', getCohorts1);
document.getElementById('txtSearch').addEventListener('keyup', () => {
  document.getElementById("buttonStart").click();
});
