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

getArrayUsersStats = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, dataUsers) => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, dataProgress) => {
      getData('../data/cohortsPrueba.json', (err, dataCohorts) => {
        console.log(computeUsersStats(dataUsers, dataProgress, dataCohorts));
        const courses = ["intro"];
        let user = computeUsersStats(dataUsers, dataProgress, courses);
        sortUsers(user, "name", "ASC");
        const options = {
          cohort: [{}, {}],
          cohortData: {
            users: [{}, {}],
            progress: {},
          },
          orderBy: 'nombre',
          orderDirection: 'ASC',
          search: ''
        }
      });
    });
  });
}

document.getElementById('btnArrayUserStats').addEventListener('click', () => {
  getArrayUsersStats();
  // let imageCircle = document.getElementById('imageCircle');
  // imageCircle.style.display='none';
  // btnArrayUserStats.style.display='none';
});


document.getElementById('buttonStart').addEventListener('click', () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, dataUsers) => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, dataProgress) => {
      getData('../data/cohortsPrueba.json', (err, dataCohorts) => {

        let users = computeUsersStats(dataUsers, dataProgress, courses);
        console.log(users)
        var i = 0;
        var countdata = users.length;
        var strhtml = '';
        if (countdata > 0) {
          while (i < countdata) {
            strhtml += '<tr><td>' + users[i].name + '</td><td>' + users[i].stats.percent + '%' + '</td><td>' + users[i].stats.exercises.percent + '%' + '</td><td>' + Math.round(users[i].stats.reads.percent) + '%' + '</td><td>' + Math.round(users[i].stats.quizzes.percent) + '%' + '</td><td>' + Math.round(users[i].stats.quizzes.scoreAvg) + '</td></tr>'
            ++i;

          }

          document.getElementById('table').getElementsByTagName('tbody')[0].innerHTML = strhtml;
        }
        const opcion = document.getElementById('fill');
        const order = document.getElementById('order');

        let value = opcion.options[opcion.selectedIndex].value;
        let valueOrder = order.options[order.selectedIndex].value;
        if (valueOrder == 'ASC') {
          if (value == 'name') {
            sortUsers(users, 'name', 'ASC');
          }
          else if (value == 'percent') {
            sortUsers(users, 'percent', 'ASC');
          }
          else if (value == 'exercises') {
            sortUsers(users, 'exercises', 'ASC');
          }
          else if (value == 'reads') {
            sortUsers(users, 'reads', 'ASC');
          }
          else if (value == 'quizzes') {
            sortUsers(users, 'quizzes', 'ASC');
          }
          else if (value == 'quizzesAvg') {
            sortUsers(users, 'quizzesAvg', 'ASC');
          };
        }
        else if (valueOrder == 'DSC') {
          if (value == 'name') {
            sortUsers(users, 'name', 'DSC');
          }
          else if (value == 'percent') {
            sortUsers(users, 'percent', 'DSC');
          }
          else if (value == 'exercises') {
            sortUsers(users, 'exercises', 'DSC');
          }
          else if (value == 'reads') {
            sortUsers(users, 'reads', 'DSC');
          }
          else if (value == 'quizzes') {
            sortUsers(users, 'quizzes', 'DSC');
          }
          else {
            sortUsers(users, 'quizzesAvg', 'DSC')
          }
        }
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
        let notCohort = document.getElementById('enProceso')

        info.style.display = 'block';
        head2.style.display = 'block';
        cohort.style.display = 'block';
        citys.style.display = 'none';
        notCohort.style.display = 'none';
    
      } else {
        console.log("hola mundo " + select.value)

        let info = document.getElementById('info');
        let head2 = document.getElementById('dash');
        let cohort = document.getElementById('cohortsH')
        let notCohort = document.getElementById('enProceso')

        info.style.display = 'none';
        head2.style.display = 'none';
        cohort.style.display = 'none';
        citys.style.display = 'none';
        notCohort.style.display = 'block';
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

