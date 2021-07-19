 /**
 * Function to store user data to localstorage
 */
async function createAccount(){ 
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let isValidName = InputValidator.validateName(name);
    let isValidEmail = InputValidator.validateEmail(email);
    let isValidPassword = InputValidator.validatePassword(password);

    let newApplicant = {
        "name": name,
        "email": email,
        "password": password
    }
    if (!isValidName){
        document.getElementById('errorText').innerText = "Name must be only alphabets and spaces.";
    } else if (!isValidEmail){
        document.getElementById('errorText').innerText = "Invalid Email";
    }else if (!isValidPassword){
        document.getElementById('errorText').innerText = "Password should have at least 8 characters";
    } else{
        try{
            let result = await ApplicantManager.addApplicant(newApplicant);
            if(result != null){
                alert('Account created successfully.');
                window.location.href = "ApplicantLogin.html";
            }
        } catch(err){
            document.getElementById('errorText').innerText = err.response.data.errorMessage;
        }
    }
}

function clearMessage(){
    document.getElementById('errorText').innerText = "";
}