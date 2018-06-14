// const usersRequest = new XMLHttpRequest();
// const progressRequest = new XMLHttpRequest();
// const cohortsRequest = new XMLHttpRequest();

// usersRequest.open('GET', requestURLUsers);
// progressRequest.open('GET', requestURLProgress);
// cohortsRequest.open('GET', requestURLCohorts);

// usersRequest.onload = () =>{
//     const userJSON = JSON.parse(usersRequest.responseText);
// };

// progressRequest.onload = () =>{
//     const progressJSON = JSON.parse(progressRequest.responseText);
// };

// cohortsRequest.onload = () =>{
//     const cohortsJSON = JSON.parse(cohortsRequest.responseText);
// };

// const requestURLUsers= './users.json';
// const requestURLProgress= './progress.json';
// const requestURLCohorts= './cohorts.json';


document.getElementById('dashboard').addEventListener('click', () =>{
    let citys = document.getElementById('citys').style.display;
    if (citys=='none'){
        document.getElementById('citys').style.display='block';
    }
    else document.getElementById('citys').style.display='none';
});

// document.getElementById("courses").addEventListener('click', () =>{
//     console.log("funciona!")
// });