let selected = [];
class SelectionManager{
    /**
     * Function to add new application to selected list.
     * @param {*} application 
     */
    static addSelection(id){
        let url = "http://localhost:3000/api/applications/" + id + "/select";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.post(url, {}, config);
    }

    /**
     * Function to get all selected applicant.
     */
    static getAllSelection(){
        let url = "http://localhost:3000/api/selected";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.get(url, config);
    }

    /**
     * Function to delete an application from selected list.
     * @param {*} applicationId 
     */
    static deleteSelection(id){
        let url = "http://localhost:3000/api/applications/" + id + "/deselect";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.delete(url, config);
    }

    /**
     * Function to update score on selected list, if score in application changes.
     * @param {*} data 
     */
    static updateScore(id, data){
        let url = "http://localhost:3000/api/selected/score/" + id;
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.put(url, data, config);
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
     * Function to return user auth token
     */
    static getUserToken(){
        let token = JSON.parse(localStorage.getItem('USER')).token;
        return token;
    }
}