window.computeUsersStats = (users, progress, courses) => {
    dataUsers = users;
    dataProgress = progress;
    let resultprueba2 = document.getElementById('prueba2');
    let prueba2Style = document.getElementById('prueba2').style.display;
    if (prueba2Style == 'block') {
        document.getElementById('prueba2').style.display = 'none';
    } else {
        if (resultprueba2.innerHTML === "") {
            resultprueba2.innerHTML += "<h5>" + "ALUMNAS" + "<hr/>" + "</h5>";
            const exer = [];
            for (var i in dataUsers) {
                for (var j in dataProgress) {

                    if (dataUsers[i].id === j) {

                        var course = dataProgress[j];
                        console.log(course);
                        // resultprueba2.innerHTML += dataUsers[i].name + "<hr/>"  ;
                        if( dataProgress[j] != undefined ){
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
                                                resultprueba2.innerHTML += dataUsers[i].name + "  su percent es :  " + course[k].percent +
                                                "  su prom exercises es :  " + a + "<hr/>";
                               
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
        }
        document.getElementById('prueba2').style.display = 'block';
    }
    resu= courses ;
    return resu ;
    
}

window.sortUsers = (users, orderBy, orderDirection) => {

}

window.filterUsers = (users, search) => {

}

window.processCohortData = (options) => {

}
