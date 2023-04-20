import axios from 'axios';

const apiEndpoint = '//localhost:8000';

export const addCrime = (crime) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/crimes`, criminal)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
}); 


export const getCrimeById =() => new Promise ((resolve, reject) =>{

    axios.get(`${apiEndpoint}/crimes`)
    .then(x => resolve(x.data))
    .catch(x=>{

        alert(x);
        reject(x);
    });

});

export const getCrimeByStatus =(crime_id, status) => new Promise ((resolve, reject) =>{

    axios.get(`${apiEndpoint}/crimes?crime_id=${crime_id}&criminal_status=${status}`)
    .then(x => resolve(x.data))
    .catch(x=>{

        alert(x);
        reject(x);
    });
});

export const getSortCrimeByStatus =(crime_id, status, sortBy) => new Promise ((resolve, reject) =>{

    axios.get(`${apiEndpoint}/crimes?crime_id=${crime_id}&criminal_status=${status}&sortBy=${sortBy}`)
    .then(x => resolve(x.data))
    .catch(x=>{

        alert(x);
        reject(x);
    });
});




