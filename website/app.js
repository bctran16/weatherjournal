/* Global Variables */
const APIkey = '&appid=b31032759b3d24f904a645ae965e04af'; 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async( url = '', data = {}) => {
    console.log(data);
    const response = await fetch( url , {
        method: 'POST', 
        credentials:'same-origin', 
        headers: {
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(data),
    }); 
    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch (error)
    {
        console.log ('error', error);
    }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(event) {
    const newZIP = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value; 
    console.log(newZIP);
    console.log(feelings);
    getTemp(baseURL, APIkey, newZIP).then((data) =>{
        console.log(data.main.temp);
        postData('/addEntry', {temp: data.main.temp, date: newDate, feeling: feelings});
    })
    
}
const getTemp = async (baseURL, APIkey, newZIP) => {
    const res = await fetch(baseURL+newZIP+APIkey);
    try {
        const data = await res.json(); 
        console.log(data)
        return data;
    } catch (error) {
        console.log('error', error);
    }
}