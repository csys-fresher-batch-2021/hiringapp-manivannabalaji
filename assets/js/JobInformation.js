let applyBtn = document.getElementById('applyBtn');

applyBtn.addEventListener('click', function(){
    window.location.href = "ApplyJob.html";
});

setJobDetails();

/**
 * Function to display job details.
 */
function setJobDetails(){
    let jobId = JobManager.getCurrentJobId();
    let jobOffer = JobManager.getJobOffer(jobId);
    document.getElementById('jobTitle').innerText = jobOffer.jobTitle;
    document.getElementById('jobType').innerText = jobOffer.jobType;
    document.getElementById('description').innerText = jobOffer.description;
    document.getElementById('skills').innerText = jobOffer.skills;
    document.getElementById('minYears').innerText = jobOffer.minYears;
    document.getElementById('maxYears').innerText = jobOffer.maxYears;
    document.getElementById('minSalary').innerText = jobOffer.minSalary;
    document.getElementById('maxSalary').innerText = jobOffer.maxSalary;
    document.getElementById('location').innerText = jobOffer.location;
    document.getElementById('noOfVacancy').innerText = jobOffer.noOfVacancy;
    document.getElementById('qualification').innerText = jobOffer.qualification;
}