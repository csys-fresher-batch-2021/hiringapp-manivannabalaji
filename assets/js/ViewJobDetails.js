let deleteBtn = document.getElementById('deleteBtn');
let updateBtn = document.getElementById('updateBtn');

setJobDetails();

updateBtn.addEventListener('click', function(){
    window.location.href = "UpdateJobPost.html";
});

deleteBtn.addEventListener('click', function(){
    let jobId = JobManager.getCurrentJobId();
    JobManager.removeJobOffer(jobId);
    alert('Job post deleted');
    window.location.href = "AllJobs.html";
});

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