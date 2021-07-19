/**
 * Function to add new job post.
 */
function addJob(){
    event.preventDefault();
    let jobTitle = document.getElementById('jobTitle').value;
    let jobType = document.getElementById('jobType').value;
    let description = document.getElementById('description').value;
    let skills = document.getElementById('skills').value;
    let minYears = document.getElementById('minYears').value;
    let maxYears = document.getElementById('maxYears').value;
    let minSalary = document.getElementById('minSalary').value;
    let maxSalary = document.getElementById('maxSalary').value;
    let location = document.getElementById('location').value;
    let noOfVacancy = document.getElementById('noOfVacancy').value;
    let qualification = document.getElementById('qualification').value;
    let endDate = document.getElementById('endDate').value;
    let errorText = document.getElementById('errorText');

    const job = {
        "jobtitle": jobTitle,
        "jobtype": jobType,
        "description": description,
        "skills": skills,
        "minyears": minYears,
        "maxyears": maxYears,
        "minsalary": minSalary,
        "maxsalary": maxSalary,
        "location": location,
        "vacancy": noOfVacancy,
        "qualification": qualification,
        "end_date": endDate
    };

    let isValidSalary = InputValidator.validateSalary(minSalary, maxSalary);
    let isValidYear = InputValidator.validateExperience(minYears, maxYears);
    let allFieldsFilled = InputValidator.checkFormFields(job);
    
    if(!isValidSalary){
        errorText.innerText = 'Please check minimum salary is less than maximum salary';
    } else if(!isValidYear){
        errorText.innerText = 'Please check minimum experience is less than maximum experience';
    } else if(!allFieldsFilled){
        errorText.innerText = "Please fill all fields(Empty spaces not allowed!)";
    } else{
        createJob(job);
    }

}

async function createJob(job){
    try{
        let result = await JobManager.addJobOffer(job);
        if(result != null){
            alert("Job added successfully");
            window.location.href="AllJobs.html";
        }
    } catch(err){
        alert(err.response.data.errorMessage);
    }
}

addDescription();
/**
 * Function to add multi-line placeholder text to textarea
 */
function addDescription(){
    let textArea = document.getElementById('description');
    let description = "Roles and Responsibilities\n\nDesired Candidate Profile\n\nPerks and Benefits";
    textArea.placeholder = description;
}

setMinDate();
/**
 * Function to disable past date in date picker
 */
function setMinDate(){
    let date = new Date().toJSON().substr(0, 10);
    document.getElementById('endDate').setAttribute('min', date);
}