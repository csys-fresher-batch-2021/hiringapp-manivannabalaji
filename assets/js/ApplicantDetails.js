let email = localStorage.getItem("APPLICANT_EMAIL");
let applicationId = localStorage.getItem("APPLICATION_ID");
let updateBtn = document.getElementById('updateBtn');
let backBtn = document.getElementById('backBtn');

let application = ApplicationManager.getApplication(email, applicationId);

backBtn.addEventListener('click', function(){
    window.location.href = "AllApplicants.html";
});

updateBtn.addEventListener('click', function(){
    let currentscore = document.getElementById('score').value;
    let currentStatus = document.getElementById('status').value;
    let comments = document.getElementById('comments').value;
    let storedStatus = application.status;
    if(currentStatus != storedStatus){      //checking if there is any change in application status.
        application["score"] = currentscore;
        application["status"] = currentStatus;
        application["comments"] = comments;
        ApplicationManager.updateApplication(applicationId, application);
        if(currentStatus === "selected"){
            saveToSelectedList(application);        //Storing application to selected list if status becomes selected.
        } else if(currentStatus === "notselected" && storedStatus === "selected"){
            SelectionManager.deleteSelection(application.id);       //Deleting the application from selected list if status becomes not selected.
        } else if((currentStatus === "pending" || currentStatus === "hold") && storedStatus === "selected"){
            SelectionManager.deleteSelection(application.id);       //Deleting the application from selected list if status becomes pending.
            ApplicationManager.updateApplication(applicationId, application);
        }
        alert("Application Updated successfully.");
    } else{
        application["score"] = currentscore;
        application["comments"] = comments;
        ApplicationManager.updateApplication(applicationId, application);
        alert("Application Updated successfully.");
    }
});

showAllData(application);
/**
 * Function to display application details.
 * @param {*} application 
 */
function showAllData(application){
    document.getElementById('name').innerText = application.name;
    document.getElementById('email').innerText = application.email;
    document.getElementById('mobile').innerText = application.mobile;
    document.getElementById('jobTitle').innerText = application.jobTitle;
    document.getElementById('yop').innerText = application.yop;
    document.getElementById('experience').innerText = application.experience;
    document.getElementById('address').innerText = application.address;
    document.getElementById('score').value = application.score;
    document.getElementById('status').value = application.status;
    document.getElementById('comments').value = application.comments;
}

function saveToSelectedList(selectedApplication){
    selectedApplication["applicationId"] = selectedApplication.id;
    selectedApplication["id"] = 0;
    SelectionManager.addSelection(selectedApplication);
}