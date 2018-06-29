window.computeUsersStats = (users, progress, courses) => {
  
  const usersWithStats = [];

  getPercentByStudent = (id)=>{
    let coursePercent = [] ;
    for(const i in progress){
      if(i == id){
      if(progress[i].hasOwnProperty('intro')){
          if(progress[i].intro.hasOwnProperty('percent')){
              coursePercent.push(progress[i].intro.percent);
          }else coursePercent.push(0);
        }else coursePercent.push(0);
      }
    }
    return  coursePercent ;
  }

  getExercisesByStudent = (id)=>{
    let arrayExercises=[];
    for(const i in progress){
      if(i == id){
        if(progress[i].hasOwnProperty('intro')){
          try {
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
          } catch (error) {
            arrayExercises.push(0)
            arrayExercises.push(0)
            arrayExercises.push(0)
          }

        }else{
          arrayExercises.push(0 , 0 , 0)
        }
      }
    }
    return arrayExercises 
  }

  getQuizzesByStudent = (id) =>{
    let numberQuizzes = 0 ;
    let numberQuizzesCompleted = 0 ;
    const scores = [];
    let sumaScores = 0 ;
    let promedioScores = 0 ;
    let percentQuizzes = 0 ;
    let arrayQuizzes=[];
    for(const i in progress){
      if(i == id){
        if(progress[i].hasOwnProperty('intro')){
          try {
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
            percentQuizzes =(numberQuizzesCompleted*100)/numberQuizzes ;
            sumaScores = scores.reduce((sum, score) => sum + score, 0);
            if(sumaScores == 0){
              promedioScores = 0
            }else{
              promedioScores = sumaScores / numberQuizzesCompleted;
            }
          } catch (error) {
            arrayQuizzes.push(numberQuizzes ,numberQuizzesCompleted ,percentQuizzes , sumaScores , promedioScores );
          } 
        }
      }
    }
    arrayQuizzes.push(numberQuizzes ,numberQuizzesCompleted ,percentQuizzes , sumaScores , promedioScores );
    return arrayQuizzes
  }

  getReadsByStudent = (id) =>{

    let numberReads = 0 ;
    let numberReadsCompleted = 0 ;
    let percentReads = 0 ;
    let arrayReads=[];
    for(const i in progress){
      if(i == id){
        if(progress[i].hasOwnProperty('intro')){
          try {
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
          percentReads = (numberReadsCompleted*100) / numberReads ;
          } catch (error) {
            arrayReads.push(numberReads);
            arrayReads.push(numberReadsCompleted);
            arrayReads.push(percentReads);
          }
        } 
      }
    }
    arrayReads.push(numberReads);
    arrayReads.push(numberReadsCompleted);
    arrayReads.push(percentReads);
    return arrayReads ;

  }

  for (const i in users) {
    if (users[i].role == "student") {
      let objStudent = users[i];
      objStudent["stats"] = {
        percent: getPercentByStudent(users[i].id)[0] ,
        exercises: {
          total : getExercisesByStudent(users[i].id)[0],
          completed :getExercisesByStudent(users[i].id)[1],
          percent: getExercisesByStudent(users[i].id)[2],
        },
        reads: {
          total:getReadsByStudent(users[i].id)[0],
          completed:getReadsByStudent(users[i].id)[1],
          percent:Math.round(getReadsByStudent(users[i].id)[2]),
        },
        quizzes: {
          total : getQuizzesByStudent(users[i].id)[0],
          completed: getQuizzesByStudent(users[i].id)[1],
          percent:Math.round(getQuizzesByStudent(users[i].id)[2]),
          scoreSum:Math.round(getQuizzesByStudent(users[i].id)[3]),
          scoreAvg:Math.round(getQuizzesByStudent(users[i].id)[4]),
        }
      };
      usersWithStats.push(users[i]);
    } else {
    //  console.log(users[i].name + " -- " + users[i].role); 
    }
  }
  return usersWithStats ;
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
            by('stats.percent', orden, parseFloat)
        );
    }

    else if (orderBy == 'exercises') {

        users.sort(
            by('stats.exercises.percent', orden, parseFloat)
        );

    }
    else if (orderBy == 'reads') {
        users.sort(
            by('stats.reads.percent', orden, parseFloat)
        );

    }
    else if (orderBy == 'quizzes'){
      users.sort(
        by('stats.quizzes.percent', orden, parseFloat)
      );
    }
    else if (orderBy == 'quizzesAvg'){
      users.sort(
        by('stats.quizzes.scoreAvg', orden, parseFloat)
      );
    }

    var i = 0;
        var countdata = users.length;
        var strhtml = '';
        if (countdata > 0) {
            while (i < countdata) {
              strhtml += '<tr><td>' + users[i].name + '</td><td>'+ users[i].stats.percent + '%' +'</td><td>'+ users[i].stats.exercises.percent + '%' +'</td><td>'+ Math.round(users[i].stats.reads.percent)+ '%' + '</td><td>' + Math.round(users[i].stats.quizzes.percent) + '%' +'</td><td>'+ Math.round(users[i].stats.quizzes.scoreAvg) + '</td></tr>'
                ++i;
            }
          }
          document.getElementById('table').getElementsByTagName('tbody')[0].innerHTML = strhtml;
}

window.filterUsers = (users, search) => {

}

window.processCohortData = (options) => {


  

  const processCohortData = (options) => {
    let estudiantes = computeUsersStats(options.cohortData.users, options.cohortData.progress,courses);
    estudiantes = sortUsers(estudiantes, options.orderBy, options.orderDirection);
    if (options.search !== '') {
      estudiantes = filterUsers(users, search);
    }
    return estudiantes;
  }

}

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
