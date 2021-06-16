async function authenticate(){
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let credentials = {
        "email": email,
        "password": password
    }
    try{
        let result = await ApplicantManager.authenticateApplicant(credentials);
        if(result != null){
            result.data['userType'] = 'applicant';
            localStorage.setItem('USER', JSON.stringify(result.data));
            window.location.href = "ApplicantDashboard.html";
        }
    } catch(err){
        document.getElementById('errorText').innerText = err.response.data.errorMessage;
    }
}

function clearMessage(){
    document.getElementById('errorText').innerText = '';
}