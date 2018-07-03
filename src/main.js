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
                sortUsers(user, "name", "ASC");
                filterUsers(user, search);
                arrayUsersAvg=getAvgUsersStats(user);
            });
        });
    });
}

document.getElementById('btnArrayUserStats').addEventListener('click', () => {
  // getArrayUsersStats();
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
                const options = {
                    cohort : [{},{}],
                    cohortData : {
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
                        options.orderDirection= 'ASC';
                    }
                    else if (value == 'percent') {
                        options.orderBy = 'percent';
                        options.orderDirection= 'ASC';
                    }
                    else if (value == 'exercises') {
                        options.orderBy = 'exercises';
                        options.orderDirection= 'ASC';
    
                    }
                    else if (value == 'reads') {
                        options.orderBy = 'reads';
                        options.orderDirection= 'ASC';
    
                    }
                    else if (value == 'quizzes') {
                        options.orderBy = 'quizzes';
                        options.orderDirection= 'ASC';
    
                    }
                    else if (value == 'quizzesAvg') {
                        options.orderBy = 'quizzesAvg';
                        options.orderDirection= 'ASC';
    
                    };
                    let oJSON = sortUsers(users, options.orderBy, options.orderDirection);
                }
                else if (valueOrder == 'DSC') {
                    if (value == 'name') {
                        options.orderBy = 'name';
                        options.orderDirection= 'DSC';
    
                    }
                    else if (value == 'percent') {
                        options.orderBy = 'percent';
                        options.orderDirection= 'DSC';
    
                    }
                    else if (value == 'exercises') {
                        options.orderBy = 'exercises';
                        options.orderDirection= 'DSC';
    
                    }
                    else if (value == 'reads') {
                        options.orderBy = 'reads';
                        options.orderDirection= 'DSC';
    
                    }
                    else if (value == 'quizzes') {
                        options.orderBy = 'quizzes';
                        options.orderDirection= 'DSC';
    
                    }
                    else {
                        options.orderBy = 'quizzesAvg';
                        options.orderDirection= 'DSC';
    
                    }
                    let oJSON = sortUsers(users, options.orderBy, options.orderDirection);
                }
                // en oJSON estará la nueva data ordenada, lo se envía la data a mostrar a filter
                filterUsers(oJSON,filter);


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

document.getElementById('lim').addEventListener('click', getCohorts);
document.getElementById('cdmx').addEventListener('click', getCohorts1);
document.getElementById('txtSearch').addEventListener('keyup', () => {
document.getElementById("buttonStart").click();               
});