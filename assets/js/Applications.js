let user = JSON.parse(localStorage.getItem("USER"));
let userEmail = user.email;
let contentTable = document.getElementById('table-content');
let userApplications = ApplicationManager.getApplicationsByUser(userEmail);

showDetails(userApplications);

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
        td.innerText = element.jobTitle;
        tr.appendChild(td);
        //creating td tag for job type.
        let tdJobId = DynamicElements.createTableData();
        tdJobId.innerText = element.jobId;
        tr.appendChild(tdJobId);
        //creating td tag for job status.
        let tdStatus = DynamicElements.createTableData();
        tdStatus.innerText = element.status;
        tr.appendChild(tdStatus);
        //appending the tr to tbody in html.
        contentTable.appendChild(tr);
    });
}