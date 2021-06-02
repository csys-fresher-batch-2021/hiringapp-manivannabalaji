let tableContent = document.getElementById("table-content");
let selectedList = SelectionManager.getAllSelection();
let sortBtn = document.getElementById("sortBtn");

displayData(selectedList);

/**
 * Function to show selected list in table.
 * @param {*} selectedList 
 */
function displayData(selectedList){
    selectedList.forEach(element => {
        //creating tr tag for each application.
        let tr = DynamicElements.createTableRow();
        //creating th tag for application Id.
        let th = DynamicElements.createTableHeader(element.applicationId);
        tr.appendChild(th);
        //creating td tag for applicant name.
        let tdName = DynamicElements.createTableData();
        tdName.innerText = element.name;
        tr.appendChild(tdName);
        //creating td tag for job post title.
        let tdPost = DynamicElements.createTableData();
        tdPost.innerText = element.jobTitle;
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
        //creating td tag for action button
        let tdButton = DynamicElements.createTableData();
        //creating button
        let button = DynamicElements.createButton();
        tdButton.appendChild(button);
        tr.appendChild(tdButton);
        //appending tr tag to tbody.
        tableContent.appendChild(tr);
    });
}

/**
 * Function to sort selected list by ascending or descending order.
 */
sortBtn.addEventListener("click", function(){
    tableContent.innerHTML = "";
    let sortOrder = document.getElementById("order").value;
    if(sortOrder === "ascending"){
        let ascendingList = SelectionManager.orderByAscending(selectedList);
        displayData(ascendingList);
    } else if(sortOrder === "descending"){
        let descendingList = SelectionManager.orderByDescending(selectedList);
        displayData(descendingList);
    }
    addListenerToButtons();
});

addListenerToButtons();
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