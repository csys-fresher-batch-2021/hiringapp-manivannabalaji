let user = JSON.parse(localStorage.getItem("USER"));
let userEmail = user.email;
let contentTable = document.getElementById('table-content');

getApplications(userEmail);
/**
 * Function to get all applications applied by an user
 * @param {*} email 
 */
async function getApplications(email){
    try{
        let result = await ApplicationManager.getApplicationsByUser(email);
        if(result != null){
            showDetails(result.data);
        }
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

/**
 * Function to dynamically show application details to user.
 * @param {*} userApplications 
 */
function showDetails(userApplications){
    userApplications.forEach(element => {
        //creating tr tag for a job.
        let tr = DynamicElements.createTableRow();
        //creating th tag for jobid.
        let th = DynamicElements.createTableHeader(element.id);
        tr.appendChild(th);
        //creating td tag for job title.
        let td = DynamicElements.createTableData();
        td.innerText = element.jobtitle;
        tr.appendChild(td);
        //creating td tag for job type.
        let tdJobId = DynamicElements.createTableData();
        tdJobId.innerText = element.jobid;
        tr.appendChild(tdJobId);
        //creating td tag for job status.
        let tdStatus = DynamicElements.createTableData();
        tdStatus.innerText = element.status;
        tr.appendChild(tdStatus);
        //creating button for actions
        if(element.status != 'pending'){
            let tdButton = DynamicElements.createTableData();
            let button = DynamicElements.createButton();
            button.innerText = "Feedback";
            tdButton.appendChild(button);
            tr.appendChild(tdButton);
        }
        //appending the tr to tbody in html.
        contentTable.appendChild(tr);
    });
    addListenerToButtons();
}

/**
 * Function to add event listener to all dynamically generated buttons.
 */
function addListenerToButtons(){
    if(document.querySelector('button')){
        document.querySelectorAll('.viewBtn').forEach(function(event){
            event.addEventListener('click', function(e){
                // get jobid from th field which is two level up for button.
                let jobId = e.target.parentNode.parentNode.querySelector('th').innerText;
                let jobName = e.target.parentNode.parentNode.querySelector('td').innerText;
                localStorage.setItem("JOB_VIEW_ID", jobId);
                localStorage.setItem("JOB_VIEW_TITLE", jobName);
                window.location.href = "InterviewFeedback.html";
            });
        });
    }
}