let tableContent = document.getElementById('table-content');
let search = document.getElementById('search');
let allJobs;

getJobData();

async function getJobData(){
    try{
        allJobs = await JobManager.getJobOffers();
        if(allJobs != null){
            tableContent.innerHTML = "";
            displayJobs(allJobs.data);
        }
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

/**
 * Function to display all available jobs to applicant.
 * @param {*} allJobs 
 */
function displayJobs(allJobs){
    allJobs.forEach(element => {
        //creating tr tag for a job.
        let tr = DynamicElements.createTableRow();
        //creating th tag for jobid.
        let th = DynamicElements.createTableHeader(element.id);
        tr.appendChild(th);
        //creating td tag for job title.
        let td = DynamicElements.createTableData();
        td.innerText = element.jobtitle;
        tr.appendChild(td);
        //creating td tag for action button
        let tdButton = DynamicElements.createTableData();
        //creating button
        let button = DynamicElements.createButton();
        tdButton.appendChild(button);
        tr.appendChild(tdButton);
        //appending the tr to tbody in html.
        tableContent.appendChild(tr);
    });
    addListenerToButtons();   
}

function searchJob(){
    let searchText = document.getElementById('search').value.toLowerCase();
    tableContent.innerHTML = "";
    let jobOffers = JobManager.searchJobOffer(searchText, allJobs.data);
    if(jobOffers.length < 1){
        tableContent.innerHTML = "<p>No Jobs Found!";
    }
    displayJobs(jobOffers);
    addListenerToButtons();
}

setUserName();
/**
 * Function to show username
 */
function setUserName(){
    let user = JSON.parse(localStorage.getItem("USER"));
    document.getElementById('userName').innerText = user.name;
}

/**
 * Function to add event listener to all dynamically generated buttons.
 */
function addListenerToButtons(){
    if(document.querySelector('button')){
        document.querySelectorAll('.viewBtn').forEach(function(event){
            event.addEventListener('click', function(e){
                let jobId = e.target.parentNode.parentNode.querySelector('th').innerText;
                localStorage.setItem("JOB_VIEW_ID", jobId);
                window.location.href = "JobInformation.html";
            });
        });
    }
}