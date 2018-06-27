
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