let tableContent = document.getElementById('table-content');
let searchBtn = document.getElementById('searchBtn');

let allJobs = JobManager.getJobOffers();

displayJobs(allJobs)
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
        td.innerText = element.jobTitle;
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
}

searchBtn.addEventListener('click', function(){
    let searchText = document.getElementById('search').value;
    tableContent.innerHTML = "";
    searchText = searchText.charAt(0).toUpperCase() + searchText.slice(1); //capitalize search term first letter.
    let jobOffers = JobManager.searchJobOffer(searchText);
    if(jobOffers.length < 1){
        tableContent.innerHTML = "<p>No Jobs Found!";
    }
    displayJobs(jobOffers);
    addListenerToButtons();
});

setUserName();
/**
 * Function to show username
 */
function setUserName(){
    let user = JSON.parse(localStorage.getItem("USER"));
    document.getElementById('userName').innerText = user.name;
}

addListenerToButtons();
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