/**
 *Function to perform authentication. 
    */
async function authenticate(){
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let data = {
        "email": email,
        "password": password
    };
    try{
        let result = await RecruiterManager.authenticate(data);
        if(result != null){
            localStorage.setItem('USER', JSON.stringify(result.data));
            window.location.href = 'RecruiterDashboard.html';
        }
    } catch(err){
        document.getElementById('errorText').innerText = err.response.data.errorMessage;
    }
}

function clearMessage(){
    document.getElementById('errorText').innerText = "";
}