let deleteBtn = document.getElementById('deleteBtn');
let updateBtn = document.getElementById('updateBtn');

setJobDetails();

updateBtn.addEventListener('click', function(){
    window.location.href = "UpdateJobPost.html";
});

deleteBtn.addEventListener('click', function(){
    let jobId = JobManager.getCurrentJobId();
    deleteJob(jobId);
});

async function setJobDetails(){
    let jobId = JobManager.getCurrentJobId();
    let jobOffer;
    try{
        jobOffer = await JobManager.getJobOffer(jobId);
        setJobDetailsInPage(jobOffer.data);
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
    
}

async function deleteJob(jobId){
    try{
        let result = await JobManager.removeJobOffer(jobId);
        if(result != null){
            alert("Job deleted successfully");
            window.location.href = "AllJobs.html";
        }
    } catch(err){
        alert(err.response.data.errorMessage);
    }
}

function setJobDetailsInPage(jobOffer){
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
    let isDateExpired = checkExpireDate(jobOffer.end_date);
    if(isDateExpired){
        document.getElementById('status').innerText = "Closed";
    } else{
        document.getElementById('status').innerText = "Opened";
    }
}

async function archivePost() {
    let jobId = JobManager.getCurrentJobId();
    try{
        let result = await JobManager.archivePost(jobId);
        if(result != null){
            alert("Job archived successfully");
            window.location.href = "AllJobs.html";
        }
    } catch(err){
        alert(err.response.data.errorMessage);
    }
}

function checkExpireDate(date) {
    let isExpired = false;
    let endDate = new Date(date);
    let todayString = new Date().toJSON().substr(0, 10);
    let today = new Date(todayString);
    if(endDate < today){
        isExpired = true;
    }
    return isExpired;
}