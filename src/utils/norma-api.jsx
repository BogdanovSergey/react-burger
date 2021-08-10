
export const getApiData = function(apiUrl, setApiData) {
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Can't get data from Api");
            }
        })
        .then(result => {
            setApiData(result.data);
            //console.log(result.data)
        })
        .catch(error => {
            console.log(error);
            alert('Error connecting to Api');
        });
}