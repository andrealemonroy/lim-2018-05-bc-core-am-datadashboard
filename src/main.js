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
                const courses = ["intro"];
                let search = document.getElementById('txtSearch').value;
                let user = computeUsersStats(dataUsers, dataProgress, courses);
                sortUsers(user, "name", "ASC");
                filterUsers(user, search);               
            });
        });
    });
}

document.getElementById('btnArrayUserStats').addEventListener('click', () => {
    getArrayUsersStats();
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


document.getElementById('txtSearch').addEventListener('keyup', () => {
   document.getElementById("buttonStart").click();               
});