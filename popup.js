//on click listener for log in button
//get email and password from DOM elements in HTML

const username = "hebatullah.ahmed"
const password = "1234567890"


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
        'username' : username,
        'password' : password
    })
}).then(res => console.log(res))

// fetch('http://localhost:8080/login',
// {
//     method: 'POST', 
//     headers: {'accept' : 'application/json' ,  'Content-Type': 'application/json'} , 
//     body: JSON.stringify({'username':username, 'password':password})})
// .then(res => res.json().then(data=>console.log(data)));

