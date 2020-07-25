/* Global Variables */
const APIkey = '&appid=b31032759b3d24f904a645ae965e04af&units=imperial'; 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async( url = '', data = {}) => {
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
        return newData
    } catch (error)
    {
        console.log ('error', error);
    }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(event) {
    const newZIP = document.querySelector('#zip').value;
    if (newZIP===""){ 
        alert("not a number");
    }
    const feelings = document.querySelector('#feelings').value; 
    getTemp(baseURL, APIkey, newZIP).then((data) =>{
        postData('/addEntry', {temp: data.main.temp, date: newDate, feeling: feelings});
    }).then( () => {
        updateUI();
    });
}
const getTemp = async (baseURL, APIkey, newZIP) => {
    const res = await fetch(baseURL+newZIP+APIkey);
    try {
        const data = await res.json(); 
        return data;
    } catch (error) {
        alert("request to server failed");
    }
}

const updateUI = async() => {
    const request = await fetch('/getAll');
    try {
        const allData = await (request.json());
        let i = allData.length-1;
        let date = document.createElement('p');
        let temperature = document.createElement('p');
        let feeling = document.createElement('p');
        temperature.innerText = (allData[i].temp).toFixed(1);
        date.innerText = allData[i].date;
        feeling.innerText = allData[i].feeling;
        document.querySelector('#date').appendChild(date);
        document.querySelector('#temp').appendChild(temperature);
        document.querySelector('#content').appendChild(feeling);

    } catch (error){
        console.log('error', error);
    }
}