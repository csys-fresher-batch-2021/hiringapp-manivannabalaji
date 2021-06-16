let applyBtn = document.getElementById('applyBtn');

applyBtn.addEventListener('click', function(){
    window.location.href = "ApplyJob.html";
});

setJobDetails();

/**
 * Function to display job details.
 */
async function setJobDetails(){
    let jobId = JobManager.getCurrentJobId();
    try{
        let jobOffer = await JobManager.getJobOffer(jobId);
        if(jobOffer != null){
            displayData(jobOffer.data);
        }
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

function displayData(jobOffer){
    document.getElementById('jobTitle').innerText = jobOffer.jobtitle;
    document.getElementById('jobType').innerText = jobOffer.jobtype;
    document.getElementById('description').innerText = jobOffer.description;
    document.getElementById('skills').innerText = jobOffer.skills;
    document.getElementById('minYears').innerText = jobOffer.minyears;
    document.getElementById('maxYears').innerText = jobOffer.maxyears;
    document.getElementById('minSalary').innerText = jobOffer.minsalary;
    document.getElementById('maxSalary').innerText = jobOffer.maxsalary;
    document.getElementById('location').innerText = jobOffer.location;
    document.getElementById('noOfVacancy').innerText = jobOffer.vacancy;
    document.getElementById('qualification').innerText = jobOffer.qualification;
    document.getElementById('endDate').innerText = jobOffer.end_date;
}