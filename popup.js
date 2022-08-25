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
}).then(res => console.log(res))

}