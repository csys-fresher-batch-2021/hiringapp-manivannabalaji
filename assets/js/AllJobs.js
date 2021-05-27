let allJobs = JobManager.getJobOffers();
let contentTable = document.getElementById('table-content');

displayAllJobs(allJobs);

/**
 * Function to display all jobs to html table.
 * @param {*} jobs 
 */
function displayAllJobs(jobs){
    jobs.forEach(element => {
        //creating tr tag for a job.
        let tr = DynamicElements.createTableRow();
        //creating th tag for jobid.
        let th = DynamicElements.createTableHeader(element.id);
        tr.appendChild(th);
        //creating td tag for job title.
        let td = DynamicElements.createTableData();
        td.innerText = element.jobTitle;
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
}

addListenerToButtons();

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