
export const getApiData = function(apiUrl, setApiData) {
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(result => {
            setApiData(result.data);
            //console.log(result.data)
        })
        .catch(error => {
            console.log(error);
            alert('Error ' + error + ' while connecting to Api');
        });
}