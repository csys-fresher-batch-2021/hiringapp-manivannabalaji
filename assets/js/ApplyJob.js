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
    let jobData = JobManager.getJobOffer(jobId);

    let application = {
        "name": name,
        "email": email,
        "mobile": mobile,
        "yop": yop,
        "experience": experience,
        "address": address,
        "jobId": jobId,
        "jobTitle": jobData.jobTitle,
        "status": "pending",
        "score": "",
        "comments": ""
    }

    let isValidName = InputValidator.validateName(name);
    let isValidMobile = InputValidator.validateMobile(mobile);
    let isValidYear = InputValidator.validateYearOfPassing(yop);
    let isValidExperience = InputValidator.validateExperience(experience);

    if(isValidName && isValidMobile && isValidYear && isValidExperience){
        ApplicationManager.addApplication(application);
        alert("Application saved successfully.");
        window.location.href = "ApplicantDashboard.html";
    } else if(!isValidName){
        alert("Name must have only alphabets and spaces (Starting with alphabet is must).");
    } else if(!isValidMobile){
        alert("Please enter your 10 digit mobile number.");
    } else if(!isValidYear){
        alert("Please enter a valid Year of Passing");
    } else{
        alert("Work experience should have 1 or 2 digits");
    }
}