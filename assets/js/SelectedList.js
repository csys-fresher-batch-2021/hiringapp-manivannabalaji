let tableContent = document.getElementById("table-content");
let sortBtn = document.getElementById("sortBtn");
let result;

getSelectedList();

async function getSelectedList(){
    try{
        result = await SelectionManager.getAllSelection();
        if(result != null){
            displayData(result.data);
        }
    } catch(err){
        console.log(err.response.data.errorMessage);
    }
}

/**
 * Function to show selected list in table.
 * @param {*} selectedList 
 */
function displayData(selectedList){
    selectedList.forEach(element => {
        //creating tr tag for each application.
        let tr = DynamicElements.createTableRow();
        //creating th tag for application Id.
        let th = DynamicElements.createTableHeader(element.applicationid);
        tr.appendChild(th);
        //creating td tag for applicant name.
        let tdName = DynamicElements.createTableData();
        tdName.innerText = element.name;
        tr.appendChild(tdName);
        //creating td tag for job post title.
        let tdPost = DynamicElements.createTableData();
        tdPost.innerText = element.jobtitle;
        tr.appendChild(tdPost);
        //creating td tag for applicant score.
        let tdScore = DynamicElements.createTableData();
        tdScore.innerText = element.score;
        tr.appendChild(tdScore);
        //creating td tag for applicant email.
        let tdEmail = DynamicElements.createTableData();
        tdEmail.innerText = element.email;
        tdEmail.className = "email";
        tr.appendChild(tdEmail);
        //creating td tag for location
        let tdLocation = DynamicElements.createTableData();
        tdLocation.innerText = element.location;
        tr.appendChild(tdLocation);
        //creating td tag for action button
        let tdButton = DynamicElements.createTableData();
        tdButton.className = "noExport";
        //creating button
        let button = DynamicElements.createButton();
        tdButton.appendChild(button);
        tr.appendChild(tdButton);
        //appending tr tag to tbody.
        tableContent.appendChild(tr);
    });
    addListenerToButtons();
}

/**
 * Function to sort selected list by ascending or descending order.
 */
sortBtn.addEventListener("click", function(){
    tableContent.innerHTML = "";
    let sortOrder = document.getElementById("order").value;
    let job = document.getElementById("job_search").value;
    let location = document.getElementById("job_location").value;
    if(job === "" && location === ""){
        performSorting(sortOrder, result.data);
    } else if(job === ""){
       let searchedLocation = JobManager.searchJobLocation(location.toLowerCase(), result.data); 
       performSorting(sortOrder, searchedLocation);
    } else if (location === ""){
        let searchedJob = JobManager.searchJobOffer(job.toLowerCase(), result.data);
        performSorting(sortOrder, searchedJob);
    } else{
        let searchedJob = JobManager.searchJobOffer(job.toLowerCase(), result.data);
        let searchedLocation = JobManager.searchJobLocation(location, searchedJob);
        performSorting(sortOrder, searchedLocation); 
    }
});

/**
 * Function to add event listener to all dynamically generated buttons.
 */
function addListenerToButtons(){
    if(document.querySelector('button')){
        document.querySelectorAll('.viewBtn').forEach(function(event){
            event.addEventListener('click', function(e){
                let applicationId = e.target.parentNode.parentNode.querySelector("th").innerText;
                let email = e.target.parentNode.parentNode.querySelector(".email").innerText;
                localStorage.setItem("APPLICANT_EMAIL", email);
                localStorage.setItem("APPLICATION_ID", applicationId);
                window.location.href = "ApplicantDetails.html";
            });
        });
    }
}

function performSorting(sortOrder, data) {
    if(sortOrder === "ascending"){
        let ascendingList = SelectionManager.orderByAscending(data);
        displayData(ascendingList);
    } else if(sortOrder === "descending"){
        let descendingList = SelectionManager.orderByDescending(data);
        displayData(descendingList);
    }
}

function generateSheet() {
    $("#selectedTable").table2excel({
        exclude: ".noExport",
        filename: "SelectedList.xls",
    });
}