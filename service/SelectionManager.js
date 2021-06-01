let selected = [];
class SelectionManager{
    /**
     * Function to add new application to selected list.
     * @param {*} application 
     */
    static addSelection(application){
        selected = this.getAllSelection();
        let length = selected.length;
        if(length > 0){
            let lastElementId = selected[length-1].id;
            application["id"] = lastElementId + 1;
        } else{
            application["id"] = 1;
        }
        selected.push(application);
        this.saveToStorage(selected);
    }

    /**
     * Function to get all selected applicant.
     */
    static getAllSelection(){
        selected = JSON.parse(localStorage.getItem("SELECTED_LIST")) || [];
        return selected;
    }

    /**
     * Function to delete an application from selected list.
     * @param {*} applicationId 
     */
    static deleteSelection(applicationId){
        selected = this.getAllSelection();
        let index =  selected.findIndex(application => application.applicationId === parseInt(applicationId));
        if(index != -1){
            selected.splice(index, 1);
            this.saveToStorage(selected);
            console.log("Application removed from selection list");
        } else{
            console.log("Error : unable to find the application");
        }
    }

    /**
     * Function to get selection count for a specific job.
     * @param {*} jobId 
     */
    static getJobSelectionCount(jobId){
        selected = this.getAllSelection();
        let count = 0;
        selected.forEach(element => {
            if(element.jobId == parseInt(jobId)){
                count++;
            }
        });
        return count;
    }

    /**
     * Function to sort selected list by ascending order.
     * @param {*} selectedList 
     */
    static orderByAscending(selectedList){
        selectedList.sort(function(a, b){
            return ((parseInt(a.score) < parseInt(b.score)) ? -1 : ((parseInt(a.score) > parseInt(b.score)) ? 1 : 0));
        });
        return selectedList;
    }

    /**
     * Function to sort selected list by descending order.
     * @param {*} selectedList 
     */
    static orderByDescending(selectedList){
        selectedList.sort(function(a, b){
            return ((parseInt(a.score) > parseInt(b.score)) ? -1 : ((parseInt(a.score) < parseInt(b.score)) ? 1 : 0));
        });
        return selectedList;
    }

    /**
     * Function to save selection list to storage.
     * @param {*} selection 
     */
    static saveToStorage(selection){
        localStorage.setItem("SELECTED_LIST", JSON.stringify(selection));
    }
}