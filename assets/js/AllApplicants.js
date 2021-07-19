let search = document.getElementById('search');
let tableContent = document.getElementById('table-content');
let result;

getApplications();

async function getApplications(){
    try{
        tableContent.innerHTML = "";
        result = await ApplicationManager.getAllApplications();
        if(result != null){
            displayApplications(result.data);
        }
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

/**
 * Function to display all application to table.
 * @param {*} applications 
 */
function displayApplications(applications){
    applications.forEach(element => {
        //creating tr for a application.
        let tr = DynamicElements.createTableRow();
        //creating th for applicantion Id.
        let th = DynamicElements.createTableHeader(element.id);
        th.id = "id";
        tr.appendChild(th);
        //creating td for applicant name.
        let tdName = DynamicElements.createTableData();
        tdName.innerText = element.name;
        tr.appendChild(tdName);
        //creating td for email.
        let tdEmail = DynamicElements.createTableData();
        tdEmail.innerText = element.email;
        tdEmail.id = "email";
        tr.appendChild(tdEmail);
        //creating td for job post name.
        let tdPost = DynamicElements.createTableData();
        tdPost.innerText = element.jobtitle;
        tr.appendChild(tdPost);
        //creating td for button.
        let tdButton = DynamicElements.createTableData();
        //creating button
        let button = DynamicElements.createButton();
        tdButton.appendChild(button);
        tr.appendChild(tdButton);
        //appending tr to tbody tag in html
        tableContent.appendChild(tr);
    });
    addListenerToButtons();
}

function searchApplication(){
    let searchText = search.value;
    tableContent.innerHTML = "";
    let applications = ApplicationManager.filterApplicationByJob(searchText, result.data);
    if(applications.length < 1){
        tableContent.innerText = "No data found!";
    }
    displayApplications(applications);
}

function searchName(){
    let searchText = document.getElementById('searchName').value.toLowerCase();
    tableContent.innerHTML = "";
    let applications = ApplicationManager.filterApplicationByName(searchText,result.data);
    if(applications.length < 1){
        tableContent.innerHTML = "<p>No Jobs Found!";
    }
    displayApplications(applications);
}

/**
 * Function to add event listener to all dynamically generated buttons.
 */
function addListenerToButtons(){
    if(document.querySelector('button')){
        document.querySelectorAll('.viewBtn').forEach(function(event){
            event.addEventListener('click', function(e){
                let email = e.target.parentNode.parentNode.querySelector('#email').innerText;
                let applicationId = e.target.parentNode.parentNode.querySelector('#id').innerText;
                localStorage.setItem("APPLICANT_EMAIL", email);
                localStorage.setItem("APPLICATION_ID", applicationId);
                window.location.href = "ApplicantDetails.html";
            });
        });
    }
}