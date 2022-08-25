//on click listener for log in button
//get email and password from DOM elements in HTML

const button = document.getElementById("btn");


document.getElementById("btn").addEventListener("click",sendRequest);

function sendRequest(creds)
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
        'username' : creds.username || document.getElementById("username").value,
        'password' : creds.password || document.getElementById("password").value
    })
}).then(res => {

    if(res.status == 200)
    {
        res.json().then(data=> {
            var creds = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            };
            chrome.storage.local.set({creds: creds}, function() {});
            chrome.storage.local.set({token: data.access_token}, function() {
                console.log('Value is set to ' + data.access_token);
                getData();
              });
        });
    }
    else
    console.log("failure");

})

}

function getData(){
    chrome.storage.local.get(['token'], function(result) {
        console.log('Value currently is ' + result);
        fetch('https://interns-exceed.espace.ws/api/v1/reviews/todo?page=1', {
            method: 'GET',
            headers: {
            'accept': 'application/json',
            "Authorization": "Bearer "+result.token,
            }
        })
        .then(res => {
            if(res.status == 200)
            {
                res.json().then(data => {
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
                    document.getElementById("login").classList.add('d-none');
                    document.getElementById("login").classList.remove('d-block');
                });
            } else if (res.status == 401){ //Show login in failure
                chrome.storage.local.get(['creds'], function(result) {
                    console.log('Value currently is ' + result);
                    sendRequest(result.creds);
                    document.getElementById("login").classList.add('d-block');
                    document.getElementById("login").classList.remove('d-none');
                });
            }
     });
    });    
};

getData();