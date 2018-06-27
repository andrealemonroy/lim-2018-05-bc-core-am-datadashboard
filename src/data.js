window.computerUsersStats = (users, progress, courses) => {
  
  const usersWithStats = [];

  getPercentByStudent = (id)=>{
    let coursePercent = 0 ;
    for(const i in progress){
      // if(){

      // }
      let course = progress[i];
      if(i == id){
        for (var j in course) {
           coursePercent = course[j].percent;
        }
      }  
    }
    return  coursePercent ;
  }

  getExercisesByStudent = (id)=>{
    let arrayExercises=[];
    for(const i in progress){
      if(i == id){
        units = Object.keys(progress[i].intro.units);
        for(let unit of units){
          parts=Object.keys(progress[i].intro.units[unit].parts);
          for(let part of parts){
            if (progress[i].intro.units[unit].parts[part].hasOwnProperty('exercises')) {   
              exercises=Object.keys(progress[i].intro.units[unit].parts[part].exercises);
              numberExercises = exercises.length ;
              percentExercises = progress[i].intro.units[unit].parts[part].completed ;
              completedExercises =numberExercises*percentExercises ;
              arrayExercises.push(numberExercises)
              arrayExercises.push(completedExercises)
              arrayExercises.push(percentExercises*100)

            }
          }
        }
      }
    }
    return arrayExercises
    
  }

  getQuizzesByStudent = (id) =>{
    let numberQuizzes = 0 ;
    let numberQuizzesCompleted = 0 ;
    const scores = [];
    let arrayQuizzes=[];
    for(const i in progress){
      if(i == id){
        units = Object.keys(progress[i].intro.units);
        for(let unit of units){
          parts=Object.keys(progress[i].intro.units[unit].parts);
          for(let part of parts){
            if (progress[i].intro.units[unit].parts[part].type ==="quiz") {  
              numberQuizzes=numberQuizzes+1;
              if(progress[i].intro.units[unit].parts[part].score === undefined){
                progress[i].intro.units[unit].parts[part].score = 0 ;
                scores.push(progress[i].intro.units[unit].parts[part].score)
              }else{
                scores.push(progress[i].intro.units[unit].parts[part].score)
              }
              if(progress[i].intro.units[unit].parts[part].completed === 1){
                numberQuizzesCompleted=numberQuizzesCompleted+1;
              }
            }
          }
        }
      }
    }
    percentQuizzes =(numberQuizzesCompleted*100)/numberQuizzes ;
    const sumaScores = scores.reduce((sum, score) => sum + score, 0);
    const promedioScores = sumaScores / scores.length;
    arrayQuizzes.push(numberQuizzes);
    arrayQuizzes.push(numberQuizzesCompleted);
    arrayQuizzes.push(percentQuizzes);
    arrayQuizzes.push(sumaScores);
    arrayQuizzes.push(promedioScores);
    return arrayQuizzes
  }

  getReadsByStudent = (id) =>{

    let numberReads = 0 ;
    let numberReadsCompleted = 0 ;
    let arrayReads=[];
    for(const i in progress){
      if(i == id){
        units = Object.keys(progress[i].intro.units);
        for(let unit of units){
          parts=Object.keys(progress[i].intro.units[unit].parts);
          for(let part of parts){
            if (progress[i].intro.units[unit].parts[part].type ==="read") {  
             numberReads = numberReads +1 ;
             if(progress[i].intro.units[unit].parts[part].completed == 1){
              numberReadsCompleted=numberReadsCompleted+1;
             }
            }
          }
        }
      }
    }
    percentReads = (numberReadsCompleted*100) / numberReads ;
    arrayReads.push(numberReads);
    arrayReads.push(numberReadsCompleted);
    arrayReads.push(percentReads);
    return arrayReads ;

  }

 console.log("---------------------------------------------")

  for (const i in users) {
    if (users[i].role == "student") {
      let objStudent = users[i];
      objStudent["stats"] = {
        percent: getPercentByStudent(users[i].id) ,
        exercises: {
          total : getExercisesByStudent(users[i].id)[0],
          completed :getExercisesByStudent(users[i].id)[1],
          percent: getExercisesByStudent(users[i].id)[2]
        },
        reads: {
          total:getReadsByStudent(users[i].id)[0],
          completed:getReadsByStudent(users[i].id)[1],
          percent:getReadsByStudent(users[i].id)[2],
        },
        quizzes: {
          total : getQuizzesByStudent(users[i].id)[0],
          completed:getQuizzesByStudent(users[i].id)[1],
          percent:getQuizzesByStudent(users[i].id)[2],
          scoreSum:getQuizzesByStudent(users[i].id)[3],
          scoreAvg:getQuizzesByStudent(users[i].id)[4]
        }
      };
      usersWithStats.push(users[i]);
    } else {
      console.log(users[i].name + " -- " + users[i].role);
    }
  }
  return usersWithStats
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
            by('progress.intro.percent', orden, parseFloat)
        );
    }

    else if (orderBy == 'exercises') {

        users.sort(
            by('progress.intro.units.02-variables-and-data-types.parts.06-exercises.completed', orden, parseFloat)
        );

    }
    // else if (orderBy == 'complete') {
    //     users.sort(
    //         by('progress.intro.complete', orden, parseFloat)
    //     );

    // }

    var i = 0;
    var countdata = users.length;
    var strhtml = '';
    if (countdata > 0) {
        while (i < countdata) {
            strhtml += '<tr><td>' + users[i].name + '</td><td>'+ users[i].progress.intro.percent +'</td><td>'+ users[i].progress.intro.units['02-variables-and-data-types'].parts['06-exercises'].completed +'</td></tr>'
            ++i;
        }
    }
    
    document.getElementById('table').getElementsByTagName('tbody')[0].innerHTML = strhtml;

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

window.filterUser = (users, search) => {
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