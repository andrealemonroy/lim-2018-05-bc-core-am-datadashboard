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

getAvgUsersStats=(arr)=>{
  let sumPercent=0;
  let sumQuizzes=0;
  let sumExercises=0;
  let sumReadings=0;
  let sumScoreQuizzes=0;
  let i = 0;
  arrayUsersAvg =[];
  for (let student of arr){
    sumPercent += student.stats.percent ;
    sumQuizzes += student.stats.quizzes.percent;
    sumExercises+= student.stats.exercises.percent;
    sumReadings += student.stats.reads.percent;
    sumScoreQuizzes+= student.stats.quizzes.scoreAvg;
    i++;
  }

  avgPercent = sumPercent/i;
  avgQuizzes = sumQuizzes/i;
  avgExercises = sumExercises/i;
  avgReadings = sumReadings/i;
  avgScoreQuizzes = sumScoreQuizzes/i;

  document.getElementById('avgQuizzes').innerHTML = Math.round(avgQuizzes)+'%';
  document.getElementById('avgExercises').innerHTML =  Math.round(avgExercises)+'%';
  document.getElementById('avgReadings').innerHTML =  Math.round(avgReadings)+'%';
  document.getElementById('avgPercent').innerHTML =  Math.round(avgPercent)+'%';
  document.getElementById('scoreQuizzes').innerHTML = Math.round(avgScoreQuizzes);

  arrayUsersAvg.push(avgPercent , avgQuizzes ,  avgExercises);

  return arrayUsersAvg
}

getArrayUsersStats = () => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, dataUsers) => {
        getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, dataProgress) => {
            getData('../data/cohortsPrueba.json', (err, dataCohorts) => {
                const courses = ["intro"];
                let search = document.getElementById('txtSearch').value;
                let user = computeUsersStats(dataUsers, dataProgress, courses);
                console.log(user);
                // sortUsers(user, "name", "ASC");
                // filterUsers(user, search);
                arrayUsersAvg=getAvgUsersStats(user);

                const options = {
                  cohort : {
                    coursesIndex: dataCohorts
                  },
                  cohortData : {
                    users: dataUsers,
                    progress: dataProgress
                  },
                  orderBy: 'Nombre',
                  orderDirection: 'ASC',
                  search: 'HEYDY'
                }

                console.log(options);
                let usersProcess=processCohortData(options);
                console.log(usersProcess);

            });
        });
    });
}

document.getElementById('btnArrayUserStats').addEventListener('click', () => {
  // getArrayUsersStats();
  console.log("Ahora veremos todos los datos");
  document.getElementById("buttonStart").click();   
  console.log("------------------------------");
  let imageCircle = document.getElementById('figures');
  imageCircle.style.display='none';
  btnArrayUserStats.style.display='none';
  let info = document.getElementById('info');
  let detailStudents = document.getElementById('studentsBox');
  detailStudents.style.display='block';

});

document.getElementById('buttonStart').addEventListener('click', () => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, dataUsers) => {
        getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, dataProgress) => {
            getData('../data/cohortsPrueba.json', (err, dataCohorts) => {

              console.log("entramos al button ->");

                const options = {
                    cohort : {
                      coursesIndex: dataCohorts
                    },
                    cohortData : {
                      users: dataUsers,
                      progress: dataProgress
                    },
                    orderBy: '',
                    orderDirection: '',
                    search: ''
                }
                
                let filter = document.getElementById('txtSearch').value.toUpperCase(); 
                const opcion = document.getElementById('fill');
                const order = document.getElementById('order');

                let value = opcion.options[opcion.selectedIndex].value;
                let valueOrder = order.options[order.selectedIndex].value;

                options.orderBy = value;
                options.orderDirection = valueOrder;
                options.search = filter;

                let users = processCohortData(options)

                viewTable(users);

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
  console.log("entre a lim")
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
        console.log("entre a lim-2018-03-pre-core-pw")
        let info = document.getElementById('info');
        let head2 = document.getElementById('dash');
        let cohort = document.getElementById('cohortsH');
        let detailStudents = document.getElementById('studentsBox');

        getArrayUsersStats();

        info.style.display = 'block';
        head2.style.display = 'block';
        cohort.style.display = 'block';
        citys.style.display = 'none';
        detailStudents.style.display='none'
    
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
        detailStudents.style.display='none'
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

viewTable = (users) => {

  var i = 0;
  console.log(users)
  var countdata = users.length;
  var strhtml = '';
  if (countdata > 0) {
    while (i < countdata) {
      strhtml += '<tr><td>' + users[i].name + '</td><td>' + users[i].stats.percent + '%' + '</td><td>' + users[i].stats.exercises.percent + '%' + '</td><td>' + users[i].stats.reads.completed + '%' + '</td><td>' + users[i].stats.quizzes.completed + '</td><td>' + users[i].stats.quizzes.scoreAvg + '</td></tr>'
      ++i;
    }
  }
  document.getElementById('table').getElementsByTagName('tbody')[0].innerHTML = strhtml;
}

document.getElementById('lim').addEventListener('click', getCohorts);
document.getElementById('cdmx').addEventListener('click', getCohorts1);
document.getElementById('txtSearch').addEventListener('keyup', () => {
document.getElementById("buttonStart").click();               
});