document.getElementById('dashboard').addEventListener('click', () => {
  let citys = document.getElementById('citys').style.display;
  if (citys == 'block') {
    document.getElementById('citys').style.display = 'none';
  }
  else {
    document.getElementById('citys').style.display = 'block';
  }
});

document.getElementById('lima').addEventListener('click', () => {
  sede = "lim" ;
  console.log(sede);
  let info = document.getElementById('info');
  let head2 = document.getElementById('dash');
  let cohort = document.getElementById('cohortsH')
  info.style.display = 'block';
  head2.style.display = 'block';
  cohort.style.display = 'block';
  citys.style.display = 'none';
});



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
  getData('../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json', (err, dataUsers) => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, dataProgress) => {
      getData('../data/cohortsPrueba.json', (err, dataCohorts) => {

        let users = computeUsersStats(dataUsers, dataProgress, courses);

        var i = 0;
        var countdata = users.length;
        var strhtml = '';
        if (countdata > 0) {
            while (i < countdata) {
              strhtml += '<tr><td>' + users[i].name + '</td><td>'+ users[i].stats.percent+ '%' +'</td><td>'+ users[i].stats.exercises.percent + '%' +'</td><td>'+ Math.round(users[i].stats.reads.percent)+ '%' + '</td><td>' + Math.round(users[i].stats.quizzes.percent) + '%' +'</td><td>'+ Math.round(users[i].stats.quizzes.scoreAvg) + '</td></tr>'
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
          else if (value = 'exercises') {
            sortUsers(users, 'exercises', 'ASC');
          }
          else
            sortUsers(users, 'percent', 'ASC')
        }
        else {
          if (value == 'name') {
            sortUsers(users, 'name', 'DSC');
          }
          else if (value = 'exercises') {
            sortUsers(users, 'exercises', 'DSC')
          }
          else
            sortUsers(users, 'percent', 'DSC')
        };


      });
    });
  });
})

