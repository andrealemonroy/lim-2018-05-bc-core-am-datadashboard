window.computeUsersStats = (users, progress, courses) => {
    dataUsers=users;
    dataProgress=progress;
    let resultprueba2 = document.getElementById('prueba2'); 
    let prueba2Style = document.getElementById('prueba2').style.display;
    if (prueba2Style == 'block') {
        document.getElementById('prueba2').style.display = 'none';
    }else{
        if (resultprueba2.innerHTML === "") {
            resultprueba2.innerHTML +=  "<h5>" + "ALUMNAS" + "  PROM EXERCISES" + "<hr/>" + "</h5>" ;
            for (var i in dataUsers) {
                for (var j in dataProgress) {
                    if(dataUsers[i].id === j ){
                        var course = dataProgress[j];
                        for (var k in course) {
                        resultprueba2.innerHTML +=  dataUsers[i].name + "  su percent es :  " + course[k].percent + "<hr/>";
                        }
                    }   
                }    
            }
        }
        document.getElementById('prueba2').style.display = 'block';
    }
    resu= " // " + courses ;
    return resu ;
}

window.sortUsers = (users, orderBy, orderDirection) => {

}

window.filterUsers = (users, search) => {

}

window.processCohortData= (options) => {

}
