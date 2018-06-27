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
  let info = document.getElementById('info');
  let head2 = document.getElementById('dash');
  let cohort = document.getElementById('cohortsH')
  info.style.display = 'block';
  head2.style.display = 'block';
  cohort.style.display = 'block';
  citys.style.display = 'none';
});

document.getElementById('mostrar2').addEventListener('click', () => {
  getPrueba2();
  let imageCircle = document.getElementById('imageCircle');
  imageCircle.style.display = 'none';
});

document.getElementById('buttonStart').addEventListener('click', () => {

  const opcion = document.getElementById('fill');
  const order = document.getElementById('order');
  const exer = [];
  let users = dataMerged(dataUsers, dataProgress);
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


getArrayUsersStats=() =>{
  getData('../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json',(err, dataUsers) => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json',(err, dataProgress) => {
      getData('../data/cohortsPrueba.json',(err,dataCohorts)=>{
        console.log(computerUsersStats(dataUsers,dataProgress,dataCohorts));
      });  
    });  
  }); 
}

document.getElementById('btnArrayUserStats').addEventListener('click', ()=>{
  getArrayUsersStats();
  let btnArrayUserStats=document.getElementById('mostrar2');
  let imageCircle = document.getElementById('imageCircle');
    imageCircle.style.display='none';
    btnArrayUserStats.style.display='none';
});



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
getPrueba2 = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/usersPrueba.json', (err, dataUsers) => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json', (err, dataProgress) => {

      let users = dataMerged(dataUsers, dataProgress);

      sortUsers(users, 'name', 'ASC');
    });

  });
}


  
