let jobId = JobManager.getCurrentJobId();

/**
 * Function to store the updated job details to storage.
 */
function updatePost(){
    event.preventDefault();
    let jobType = document.getElementById('jobType').value;
    let description = document.getElementById('description').value;
    let skills = document.getElementById('skills').value;
    let minYears = document.getElementById('minYears').value;
    let maxYears = document.getElementById('maxYears').value;
    let minSalary = document.getElementById('minSalary').value;
    let maxSalary = document.getElementById('maxSalary').value;
    let noOfVacancy = document.getElementById('noOfVacancy').value;
    let qualification = document.getElementById('qualification').value;
    let endDate = document.getElementById('endDate').value;
    let errorText = document.getElementById('errorText');

    let updatedJob = {
        "jobtype": jobType,
        "description": description,
        "skills": skills,
        "minyears": minYears,
        "maxyears": maxYears,
        "minsalary": minSalary,
        "maxsalary": maxSalary,
        "vacancy": noOfVacancy,
        "qualification": qualification,
        "end_date": endDate
    };

    let isValidSalary = InputValidator.validateSalary(minSalary, maxSalary);
    let isValidYear = InputValidator.validateExperience(minYears, maxYears);
    let allFieldsFilled = InputValidator.checkUpdateFields(updatedJob);

    if(!isValidSalary){
        errorText.innerText = 'Please check minimum salary is less than maximum salary';
    } else if(!isValidYear){
        errorText.innerText = 'Please check minimum experience is less than maximum experience';
    } else if(!allFieldsFilled){
        errorText.innerText = "Please fill all fields(Empty spaces not allowed!)";
    } else{
        updateJobData(jobId, updatedJob);
    }

}

async function updateJobData(jobId, updatedJob){
    try{
        let jobOffer = await JobManager.updateJobOffer(jobId, updatedJob);
        if(jobOffer != null){
            alert("Job details updated successfully");
            window.location.href = "AllJobs.html";
        }
    } catch(err){
        alert(err.response.data.errorMessage);
    }
}

getJobData(jobId);

/**
 * Function to get job data for prefilling form
 * @param {*} jobId 
 */
async function getJobData(jobId){
    try{
        let jobOffer = await JobManager.getJobOffer(jobId);
        if(jobOffer != null){
            fillDetailsToForm(jobOffer.data);
        }
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

/**
 * Function to fill job details to form for updating purpose.
 */
function fillDetailsToForm(jobOffer){
    document.getElementById('jobTitle').value = jobOffer.jobtitle;
    document.getElementById('jobType').value = jobOffer.jobtype;
    document.getElementById('description').value = jobOffer.description;
    document.getElementById('skills').value = jobOffer.skills;
    document.getElementById('minYears').value = jobOffer.minyears;
    document.getElementById('maxYears').value = jobOffer.maxyears;
    document.getElementById('minSalary').value = jobOffer.minsalary;
    document.getElementById('maxSalary').value = jobOffer.maxsalary;
    document.getElementById('location').value = jobOffer.location;
    document.getElementById('noOfVacancy').value = jobOffer.vacancy;
    document.getElementById('qualification').value = jobOffer.qualification;
    document.getElementById('endDate').value = jobOffer.end_date;
    setMinDate();
}

/**
 * Function to disable past date in date picker
 */
function setMinDate(){
    let date = new Date().toJSON().substr(0, 10);
    document.getElementById('endDate').setAttribute('min', date);
}