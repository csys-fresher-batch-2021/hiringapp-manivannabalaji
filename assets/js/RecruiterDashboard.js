let container = document.getElementById('card-container');

getStatus();

async function getStatus() {
    let result = await JobManager.getStatus();
    if(result != null){
        displayResults(result.data);
    }
}

function displayResults(jobStatus) {
    jobStatus.forEach(element => {
        let columnClass = DynamicElements.createColumn();
        //creating card element for each job.
        let card = DynamicElements.createCard();
        let cardBody = card.querySelector(".card-body");
        //getting count of each job title.
        let percentage = (element.selected / element.vacancy) * 100;
        //creating h5 element for job title.
        let h5 = document.createElement('h5');
        h5.innerText = element.jobtitle;
        cardBody.appendChild(h5);
        //creating p tag for vacancy details.
        let vacancyDetails = document.createElement("p");
        vacancyDetails.innerText = "No of vacancy : " + element.vacancy;
        cardBody.appendChild(vacancyDetails);
        //creating p tag for selected count.
        let selectedDetails = document.createElement("p");
        selectedDetails.innerText = "Selected : " + element.selected;
        cardBody.appendChild(selectedDetails);
        //creating p tag for location.
        let location = document.createElement("p");
        location.innerText = "Location : " + element.location;
        cardBody.appendChild(location);
        //creating progress bar to show selection progress.
        let progress = DynamicElements.createProgress(percentage);
        cardBody.appendChild(progress);
        columnClass.appendChild(card);
        container.appendChild(columnClass);
    });   
}