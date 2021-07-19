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
        document.getElementById('errorText').innerText = err.response.data.errorMessage;
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

async function updateProfile() {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let mobile = document.getElementById('mobile').value;
    let yop = document.getElementById('yop').value;
    let experience = document.getElementById('experience').value;
    let address = document.getElementById('address').value;
    let errorText = document.getElementById('errorText');
    errorText.innerText = "";
    let updatedData = {
        "name": name,
        "mobile": mobile,
        "yop": yop,
        "experience": experience,
        "address": address
    };

    let isValidName = InputValidator.validateName(name);
    let isValidMobile = InputValidator.validateMobile(mobile);
    let isValidYear = InputValidator.validateYearOfPassing(yop);
    let isValidExperience = InputValidator.validateExpYear(experience);
    let isInvalidAddress = InputValidator.checkEmptyData(address);

    if(!isValidName){
        errorText.innerText = "Name must have only alphabets and spaces (Starting with alphabet is must).";
    } else if(!isValidMobile){
        errorText.innerText = "Please enter your 10 digit mobile number.";
    } else if(!isValidYear){
        errorText.innerText = "Please enter a valid Year of Passing";
    } else if(!isValidExperience){
        errorText.innerText = "Work experience should have 1 or 2 digits";
    } else if(isInvalidAddress){
        errorText.innerText = "Invalid Address";
    } else{
        try{
            let result = await ApplicantManager.updateProfile(email, updatedData);
            if(result != null){
                alert("Profile Updated successfully");
            }
        } catch(err){
            document.getElementById('errorText').innerText = err.response.data.errorMessage;
        }
    }
}

function logout() {
    localStorage.removeItem('USER');
    window.location.href="../../index.html";
}