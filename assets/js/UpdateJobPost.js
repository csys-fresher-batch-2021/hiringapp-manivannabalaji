let jobId = JobManager.getCurrentJobId();

/**
 * Function to store the updated job details to storage.
 */
function updatePost(){
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

    let updatedJob = {
        "id": jobId,
        "jobTitle": jobTitle,
        "jobType": jobType,
        "description": description,
        "skills": skills,
        "minYears": minYears,
        "maxYears": maxYears,
        "minSalary": minSalary,
        "maxSalary": maxSalary,
        "location": location,
        "noOfVacancy": noOfVacancy,
        "qualification": qualification
    };

    let isValidSalary = InputValidator.validateSalary(minSalary, maxSalary);
    let isValidYear = InputValidator.validateExperience(minYears, maxYears);
    let allFieldsFilled = InputValidator.checkFormFields(updatedJob);

    if(isValidSalary && isValidYear && allFieldsFilled){
        JobManager.updateJobOffer(jobId, updatedJob);
        alert('Job Details updated');
        window.location.href = "AllJobs.html";
    } else if(!isValidSalary){
        alert('Please check minimum salary is less than maximum salary');
    } else if(!isValidYear){
        alert('Please check minimum experience is less than maximum experience');
    } else{
        alert("Please fill all fields(Empty spaces not allowed!)");
    }

}

fillDetailsToForm();

/**
 * Function to fill job details to form for updating purpose.
 */
function fillDetailsToForm(){
    let jobOffer = JobManager.getJobOffer(jobId);
    document.getElementById('jobTitle').value = jobOffer.jobTitle;
    document.getElementById('jobType').value = jobOffer.jobType;
    document.getElementById('description').value = jobOffer.description;
    document.getElementById('skills').value = jobOffer.skills;
    document.getElementById('minYears').value = jobOffer.minYears;
    document.getElementById('maxYears').value = jobOffer.maxYears;
    document.getElementById('minSalary').value = jobOffer.minSalary;
    document.getElementById('maxSalary').value = jobOffer.maxSalary;
    document.getElementById('location').value = jobOffer.location;
    document.getElementById('noOfVacancy').value = jobOffer.noOfVacancy;
    document.getElementById('qualification').value = jobOffer.qualification;
}