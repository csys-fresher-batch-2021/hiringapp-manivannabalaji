let email = localStorage.getItem("APPLICANT_EMAIL");
let applicationId = localStorage.getItem("APPLICATION_ID");
let updateBtn = document.getElementById('updateBtn');
let backBtn = document.getElementById('backBtn');
let result;
getApplication(applicationId);

/**
 * Function to get application details.
 * @param {*} id 
 */
async function getApplication(id){
    try{
        result = await ApplicationManager.getApplication(id);
        if(result != null){
            showAllData(result.data);
        }
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

backBtn.addEventListener('click', function(){
    window.location.href = "AllApplicants.html";
});

updateBtn.addEventListener('click', function(){
    let currentscore = document.getElementById('score').value;
    let currentStatus = document.getElementById('status').value;
    let comments = document.getElementById('comments').value;
    let storedStatus = result.data.status;

    let updatedData = {
        "score": currentscore,
        "status": currentStatus,
        "comments": comments
    }

    if(currentStatus != storedStatus){
        if(currentStatus === "selected"){
            if(updateApplication(applicationId, updatedData)){
                addToSelectedList(applicationId);
            }
        } else if((currentStatus === "notselected" || currentStatus === "pending" 
                    || currentStatus === "hold") && storedStatus === "selected"){
            if(updateApplication(applicationId, updatedData)){
                deleteFromSelectedList(applicationId);
            }
        } else{
            if(updateApplication(applicationId, updatedData)){
                alert("Application updated successfully");
            }
        }
    } else{
        if(updateApplication(applicationId, updatedData)){
            alert("Application updated successfully");
        }
        if(storedStatus === "selected"){
            updateSelectedScore(applicationId, {"score": currentscore});
        }
    }
});

async function updateApplication(id, updateData){
    try{
        let result = await ApplicationManager.updateApplication(id, updateData);
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

async function addToSelectedList(id){
    try{
        let result = await SelectionManager.addSelection(id);
        if(result != null){
            alert("Application added to selected list");
        }
    } catch(err){
        alert(err.response.data.errorMessage);
    }
}

async function deleteFromSelectedList(id){
    try{
        let result = await SelectionManager.deleteSelection(id);
        if(result != null){
            alert("Application removed from selected list");
        }
    } catch(err){
        alert(err.response.data.errorMessage);
    }
}

async function updateSelectedScore(id, data){
    try{
        let result = await SelectionManager.updateScore(id, data);
    } catch(err){
        alert(err.response.data.errorMessage);
    }
}


/**
 * Function to display application details.
 * @param {*} application 
 */
function showAllData(application){
    document.getElementById('name').innerText = application.name;
    document.getElementById('email').innerText = application.email;
    document.getElementById('mobile').innerText = application.mobile;
    document.getElementById('jobTitle').innerText = application.jobtitle;
    document.getElementById('yop').innerText = application.yop;
    document.getElementById('experience').innerText = application.experience;
    document.getElementById('address').innerText = application.address;
    document.getElementById('score').value = application.score;
    document.getElementById('status').value = application.status;
    document.getElementById('comments').value = application.comments;
}

// function saveToSelectedList(selectedApplication){
//     selectedApplication["applicationId"] = selectedApplication.id;
//     selectedApplication["id"] = 0;
//     SelectionManager.addSelection(selectedApplication);
// }