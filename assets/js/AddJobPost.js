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

    let isValidSalary = InputValidator.validateSalary(minSalary, maxSalary);
    let isValidYear = InputValidator.validateExperience(minYears, maxYears);

    let job = {
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

    let allFieldsFilled = InputValidator.checkFormFields(job);

    if(isValidSalary && isValidYear && allFieldsFilled){
        JobManager.addJobOffer(job);
        window.location.href="AllJobs.html";
    } else if(!isValidSalary){
        alert('Please check minimum salary is less than maximum salary');
    } else if(!isValidYear){
        alert('Please check minimum experience is less than maximum experience');
    } else{
        alert("Please fill all fields(Empty spaces not allowed!)");
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