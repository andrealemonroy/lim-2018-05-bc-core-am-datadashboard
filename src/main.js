var resultado = document.getElementById("info");

function ajax_get_json()
{

  var xmlhttp =  new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

      if(resultado.innerHTML === ""){

        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
            var datos = JSON.parse(xmlhttp.responseText);

            for(var i in datos){
                resultado.innerHTML += datos[i].name + "<hr/>" ;
            }
        }
      }
    }

    xmlhttp.open("GET","../data/cohorts/lim-2018-03-pre-core-pw/userPrueba.json",true);
    xmlhttp.send();

}





  var resultado2 = document.getElementById("info2");

  function ajax_get_json2(){

  var xmlhttp =  new XMLHttpRequest();

  xmlhttp.onreadystatechange = function(){

    if(resultado2.innerHTML === ""){

      if(xmlhttp.readyState === 4 && xmlhttp.status === 200){

        var data = JSON.parse(xmlhttp.responseText);
        var promPercentCurso = 0 ;
        var w = 0 ;

        for (var i in data){

          resultado2.innerHTML += "<h5>" + i + "</h5>" ;

          var course = data[i];
          var percentCourse=[];

          for(var j in course){

            resultado2.innerHTML += j + "- percent :" + course[j].percent + "<br/>";

            percentCourse.push(course[j].percent);
            promPercentCurso = promPercentCurso+ course[j].percent ;

          }

          w=w+1;

          }

          rpta = promPercentCurso/w;
          console.log(rpta);

      }

    }

  }

  // xmlhttp.open("GET","progress.json",true);
  xmlhttp.open("GET","../data/cohorts/lim-2018-03-pre-core-pw/progressPrueba.json",true);

  xmlhttp.send();

  }