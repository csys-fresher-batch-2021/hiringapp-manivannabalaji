let selected = [];
class SelectionManager{
    /**
     * Function to add new application to selected list.
     * @param {*} application 
     */
    static addSelection(id){
        let url = "http://localhost:3000/api/applications/" + id + "/select";
        return axios.post(url, {});
    }

    /**
     * Function to get all selected applicant.
     */
    static getAllSelection(){
        let url = "http://localhost:3000/api/selected";
        return axios.get(url);
    }

    /**
     * Function to delete an application from selected list.
     * @param {*} applicationId 
     */
    static deleteSelection(id){
        let url = "http://localhost:3000/api/applications/" + id + "/deselect";
        return axios.delete(url);
    }

    /**
     * Function to update score on selected list, if score in application changes.
     * @param {*} data 
     */
    static updateScore(id, data){
        let url = "http://localhost:3000/api/selected/score/" + id;
        return axios.put(url, data);
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
}