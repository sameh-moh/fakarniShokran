//on click listener for log in button
//get email and password from DOM elements in HTML

const username = "hebatullah.ahmed"
const password = "1234567890"
const button = document.getElementById("btn");


document.getElementById("btn").addEventListener("click",sendRequest);

function sendRequest()
{

fetch('https://exceed-keycloak.espace.ws/auth/realms/exceed_realm/protocol/openid-connect/token', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept' : 'application/json'
    },    
    body: new URLSearchParams({
        'grant_type' : "password",
        'client_id' : "exceed-frontend",
        'client_secret' : "13692c99-485f-4993-b93c-dfb2bb262e87",
        'scope' : "openid",
        'username' : document.getElementById("username").value,
        'password' : document.getElementById("password").value
    })
}).then(res => {

    if(res.status == 200)
    {
        res.json().then(data=> {
            document.getElementById("login").classList.add('d-none');
            document.getElementById("login").classList.remove('d-block');
            getData(data); 
        });
    }
    else
    console.log("failure");

})

}

function getData(data){
    // chrome.storage.local.get(['key'], function(result) {
        // console.log('Value currently is ' + result);
        fetch('https://interns-exceed.espace.ws/api/v1/reviews/todo?page=1', {
            method: 'GET',
            headers: {
            'accept': 'application/json',
            "Authorization": "Bearer "+data.access_token,
            }
        })
        .then(res => res.json())
        .then(res => {
            var data = res;
            var reviews = data.reviews;
            if(data.meta.total_count > 0){
                var revieweesHtml = "";
                var deadlineDate = new Date(reviews[0].cycle.deadline);
                for(var i = 0; i < reviews.length; i++){
                    revieweesHtml += "<li>"+reviews[i].reviewee.name + "'s Review</li>";
                }
                revieweesHtml += "";
                document.getElementById("deadline").innerHTML = deadlineDate.toDateString();
                document.getElementById("countDown").innerHTML = Math.floor((deadlineDate.getTime() - new Date())/ (1000 * 3600 * 24));
                document.getElementById("data").innerHTML =revieweesHtml;
                document.getElementById("noData").classList.add('d-none');
                document.getElementById("noData").classList.remove('d-block');
                document.getElementById("todo").classList.remove('d-none');
                document.getElementById("todo").classList.add('d-block');
    
            } else {
                document.getElementById("todo").classList.add('d-none');
                document.getElementById("todo").classList.remove('d-block');
                document.getElementById("noData").classList.remove('d-none');
                document.getElementById("noData").classList.add('d-block');
            }
     });
    // });    
};