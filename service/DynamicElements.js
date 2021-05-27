class DynamicElements{
    /**
     * Function to create button for actions.
     */
    static createButton(){
        let button = document.createElement('button');
        button.className = "btn btn-warning viewBtn";
        button.innerText = "More Details";
        return button;
    }
    /**
     * Function to create tr tag.
     */
    static createTableRow(){
        let tr = document.createElement('tr');
        return tr;
    }
    /**
     * Function to create th tag with innertext.
     * @param {*} value 
     */
    static createTableHeader(value){
        let th = document.createElement('th');
        th.scope = "row";
        th.innerText = value;
        return th;
    }
    /**
     * Function to create td tag.
     */
    static createTableData(){
        let td = document.createElement('td');
        return td;
    }

    /**
     * Function to create a column class for responsive page.
     */
    static createColumn(){
        let section = document.createElement('section');
        section.className = "col-lg-4";
        return section;
    }

    /**
     * Function to create card element.
     */
    static createCard(){
        let card = document.createElement('section');
        card.className = "card";
        card.style.width = "18rem";
        let cardBody = document.createElement('div');
        cardBody.className = "card-body";
        card.appendChild(cardBody);
        return card;
    }

    /**
     * Function to create progress bar.
     * @param {*} percentage 
     */
    static createProgress(percentage){
        let div = document.createElement('div');
        div.className = "progress";
        let progress = document.createElement('div');
        progress.className = "progress-bar";
        progress.setAttribute("role", "progressbar");
        progress.style.width = percentage + "%";
        div.appendChild(progress);
        return div;
    }
}