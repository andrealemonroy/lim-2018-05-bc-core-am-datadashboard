window.computeUsersStats = (users, progress, courses) => {
    dataUsers=users;
    dataProgress=progress;
    let resultprueba2 = document.getElementById('prueba2'); 
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
    resu= " // " + courses ;
    return resu ;
}

window.sortUsers = (users, orderBy, orderDirection) => {

}

window.filterUsers = (users, search) => {

}

window.processCohortData= (options) => {

}
