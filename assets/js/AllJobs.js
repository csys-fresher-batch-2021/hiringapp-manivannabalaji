let contentTable = document.getElementById('table-content');
let allJobs;
getData();

async function getData(){
    try{
        allJobs = await JobManager.getJobOffers();
        displayAllJobs(allJobs.data);
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

/**
 * Function to display all jobs to html table.
 * @param {*} jobs 
 */
function displayAllJobs(allJobs){
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
        contentTable.appendChild(tr);
    });
    addListenerToButtons();
}

function searchJob(){
    let searchText = document.getElementById('search').value.toLowerCase();
    contentTable.innerHTML = "";
    let jobOffers = JobManager.searchJobOffer(searchText, allJobs.data);
    if(jobOffers.length < 1){
        tableContent.innerHTML = "<p>No Jobs Found!";
    }
    displayAllJobs(jobOffers);
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
                localStorage.setItem("JOB_VIEW_ID", jobId);
                window.location.href = "ViewJobDetails.html";
            });
        });
    }
}