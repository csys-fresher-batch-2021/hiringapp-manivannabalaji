let jobOffers = JobManager.getJobOffers();
let container = document.getElementById('card-container');

jobOffers.forEach(element => {
    let columnClass = DynamicElements.createColumn();
    //creating card element for each job.
    let card = DynamicElements.createCard();
    let cardBody = card.querySelector(".card-body");
    //getting count of each job title.
    let selectedCount = SelectionManager.getJobSelectionCount(element.id);
    let percentage = (selectedCount / element.noOfVacancy) * 100;
    //creating h5 element for job title.
    let h5 = document.createElement('h5');
    h5.innerText = element.jobTitle;
    cardBody.appendChild(h5);
    //creating p tag for vacancy details.
    let vacancyDetails = document.createElement("p");
    vacancyDetails.innerText = "No of vacancy : " + element.noOfVacancy;
    cardBody.appendChild(vacancyDetails);
    //creating p tag for selected count.
    let selectedDetails = document.createElement("p");
    selectedDetails.innerText = "Selected applicants : " + selectedCount;
    cardBody.appendChild(selectedDetails);
    //creating progress bar to show selection progress.
    let progress = DynamicElements.createProgress(percentage);
    cardBody.appendChild(progress);
    columnClass.appendChild(card);
    container.appendChild(columnClass);
});