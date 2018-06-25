window.computeUsersStats = (users, progress, courses) => {
    dataUsers = users;
    dataProgress = progress;
    let resultprueba2 = document.getElementById('prueba2');
    let prueba2Style = document.getElementById('prueba2').style.display;
    let resultExercises = document.getElementById('promExercises');
    let resultTotalExercises = document.getElementById('promTotalExercises');
    

    if (prueba2Style == 'block') {
        document.getElementById('prueba2').style.display = 'none';
        document.getElementById('promExercises').style.display = 'none';

    } else {
        if (resultprueba2.innerHTML === "") {
            resultExercises.innerHTML = "<h5>" + "PROMEDIO DE EXERCISES" + "<hr/>" + "</h5>";
            resultprueba2.innerHTML += "<h5>" + "ALUMNAS" + "<hr/>" + "</h5>";
           
            const exer = [];
            for (var i in dataUsers) {
                for (var j in dataProgress) {

                    if (dataUsers[i].id === j) {
                        var course = dataProgress[j];
                        // console.log(course);

                        resultprueba2.innerHTML += dataUsers[i].name + "<hr/>"  ;
                        if( dataProgress[j] != undefined ){
                            console.log(j);
                            dataUsers[i]['progress']=course;
                            for (var k in course) {
                                var a = 0 ;
                                 // empieza
                                // try {
                                    // resultprueba2.innerHTML += dataUsers[i].name;
                                Object.keys(course).map((topic) => {
                                    let unit = dataProgress[j][topic].units;
                                    Object.keys(unit).map((leccion) => {
                                        let parts_unit = dataProgress[j][topic].units[leccion].parts;
                                        Object.keys(parts_unit).map((lectura) => {
                                            if (parts_unit[lectura].hasOwnProperty('exercises')) {
                                                a = dataProgress[j][topic].units[leccion].parts[lectura].completed;
                                                exer.push(a); 
                                                console.log(a);
                                                // resultExercises.innerHTML +=  "  su percent es :  " + course[k].percent +
                                                // "  su prom exercises es :  " + a + "<hr/>";
                                                resultExercises.innerHTML += a*100 +"%" + "<hr/>";
                               
                                            }
                                        })
                                    })
                                })
                                console.log("---------------------------");
    
                                // } catch (error) {
                                //   console.log("no se "); 
                                // }
    
    
                                //Termina
    
                            }

                        }else{
                            resultprueba2.innerHTML += "  su percent es :  " +
                                                "  su prom exercises es :  " + "<hr/>";

                        }
                        
                    }
                }
            }
            const promedio = exer.reduce((sum, exer) => sum + exer, 0) /exer.length;
            console.log("El promedio de las estudiantes es : " + promedio);
            resultTotalExercises.innerHTML += "Promedio de las estudiantes es en ejercicios : " + Math.round(promedio*100) + "%";
        }
        document.getElementById('prueba2').style.display = 'block';
    }
    resu= courses ;
    return resu ;
    
}

window.sortUsers = (users, orderBy, orderDirection) => {
 
    let orden = orderDirection == 'ASC' ? false : true;

    if (orderBy == 'name') {
            users.sort(
                by('name', orden, function (x) {
                    return x.toUpperCase().replace(/\W/g, '');
                })
            );
    }
    else if (orderBy == 'percent') {
        users.sort(
            by('progress.intro.percent', orden, function(a, b){
                return parseFloat(a)-parseFloat(b);
            })
        );

    }
    else if (orderBy == 'exercises') {
        /*users.sort(
            by('progress.intro.units', orden, function(course){
                let field = '';
 
                  Object.keys(course).map((leccion) => {
                    let parts_unit = course[leccion].parts;
                    Object.keys(parts_unit).map((lectura) => {
                      if (parts_unit[lectura].hasOwnProperty('exercises')) {
                        let completed= course[leccion].parts[lectura].completed;

                        return completed;
                      }
                    })
                  });
            })
        );*/

        users.sort(
            by('progress.intro.units.02-variables-and-data-types.parts.06-exercises.completed', orden, parseFloat)
        );

    }
    else if (orderBy == 'complete') {
        users.sort(
            by('progress.intro.complete', orden, parseFloat)
        );

    }

    else if (orderBy = 'complete') {
        users.sort(
            by('progress.intro.complete', orden, parseFloat)
        );

    }

    else if (orderBy = 'complete') {
        users.sort(
            by('progress.intro.complete', orden, parseFloat)
        );

    }


    var i = 0;
    var countdata = users.length;
    var strhtml = '';
    if (countdata > 0) {
        while (i < countdata) {
            strhtml += '<tr><td>' + users[i].name + '</td></tr>';
            ++i;
        }
    }


    //document.getElementById('tablaxd').getElementsByTagName('tbody')[0].innerHTML = strhtml;
    console.log(users);

    var txtSearch = document.getElementById('txtSearch');
    txtSearch.addEventListener('keyup', function(e) {

        var filtered_users = find_in_object(users, this.value);

        console.log(filtered_users);

        var i = 0;
        var countdata = filtered_users.length;
        var strhtml = '';
        if (countdata > 0) {
            while (i < countdata) {
                strhtml += filtered_users[i].name + '<br />';
                ++i;
            }
        }


        document.getElementById('results').innerHTML = strhtml;
    })
}

window.filterUsers = (users, search) => {

}

window.processCohortData = (options) => {

}
window.dataMerged = (users, progress) => {
    dataUsers = users;
    dataProgress = progress;
    for (var i in dataUsers) {
        for (var j in dataProgress) {

            if (dataUsers[i].id === j) {
                var course = dataProgress[j];
                // console.log(course);
                if( dataProgress[j] != undefined ){
                    dataUsers[i]['progress']=course;
                }
            }
        }
    }

    return dataUsers;
};
window.by = (path, reverse, primer, then) => {
    var get = function (obj, path) {
            if (path) {
                path = path.split('.');
                for (var i = 0, len = path.length - 1; i < len; i++) {
                    obj = obj[path[i]];
                };
                return obj[path[len]];
            }
            return obj;
        },
        prime = function (obj) {
            return primer ? primer(get(obj, path)) : get(obj, path);
        };
    
    return function (a, b) {
        var A = prime(a),
            B = prime(b);
        
        return (
            (A < B) ? -1 :
            (A > B) ?  1 :
            (typeof then === 'function') ? then(a, b) : 0
        ) * [1,-1][+!!reverse];
    };
};

window.find_in_object = (arr, value) => {

 return arr.filter(function(item,index){
     return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
});

}