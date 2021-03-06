let user = JSON.parse(localStorage.getItem('USER'));
let email = user.email;

getProfile(email);

/**
 * Function to get profile from backend
 * @param {*} email 
 */
async function getProfile(email) {
    try{
        let result = await ApplicantManager.getProfile(email);
        if(result != null){
            displayData(result.data);
        }
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

/**
 * Function to display retrived profile data.
 * @param {*} profile 
 */
function displayData(profile){
    document.getElementById('name').value = profile.name;
    document.getElementById('email').value = profile.email;
    document.getElementById('mobile').value = profile.mobile;
    document.getElementById('yop').value = profile.yop;
    document.getElementById('experience').value = profile.experience;
    document.getElementById('address').value = profile.address;
}

/**
 * Function to save new application to storage.
 */
function applyJob(){
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let mobile = document.getElementById('mobile').value;
    let yop = document.getElementById('yop').value;
    let experience = document.getElementById('experience').value;
    let address = document.getElementById('address').value;
    let jobId = localStorage.getItem("JOB_VIEW_ID");

    let application = {
        "name": name,
        "email": email,
        "mobile": mobile,
        "yop": yop,
        "experience": experience,
        "address": address,
    }

    let isValidName = InputValidator.validateName(name);
    let isValidMobile = InputValidator.validateMobile(mobile);
    let isValidYear = InputValidator.validateYearOfPassing(yop);
    let isValidExperience = InputValidator.validateExpYear(experience);
    let isInvalidAddress = InputValidator.checkEmptyData(address);

    if(!isValidName){
        document.getElementById('errorText').innerText = "Name must have only alphabets and spaces (Starting with alphabet is must).";
    } else if(!isValidMobile){
        document.getElementById('errorText').innerText = "Please enter your 10 digit mobile number.";
    } else if(!isValidYear){
        document.getElementById('errorText').innerText = "Please enter a valid Year of Passing";
    } else if(!isValidExperience){
        document.getElementById('errorText').innerText = "Work experience should have 1 or 2 digits";
    }else if(isInvalidAddress){
        document.getElementById('errorText').innerText = "Invalid Address";
    } else{
        saveApplication(jobId, application);
    }
}

async function saveApplication(jobId, application){
    try{
        let result = await ApplicationManager.addApplication(jobId, application);
        if(result != null){
            alert("Application saved successfully.");
            window.location.href = "ApplicantDashboard.html";
        }
    } catch(err){
        document.getElementById('errorText').innerText = err.response.data.errorMessage;
    }
}