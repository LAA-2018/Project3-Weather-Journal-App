/* Global Variables */
const key ="&appid=953a4f7258bda2265985cbc75dd2b27c&units=imperial";
const url ="api.openweathermap.org/data/2.5/weather?zip=";
let genertationButton = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

genertationButton.addEventListener('click',getData);
// get data from user
function getData(){

    let zipcode = document.querySelector('#zip').value.split(",");
    let feeling = document.querySelector('#feelings').value;
    
    let apiUrl=`https://${url}${zipcode}${key}`;
    getWeatherData(apiUrl).then((dataWeather)=>{
        let data = {
                temperature: dataWeather.main.temp,
                date:newDate,
                cFeeling: feeling
            }
            //  return data;
            postData('http://localhost:9000/addData',data)
    }).then(updateUl)
    }
    
// get data from  API Websit
let getWeatherData = async(zipcode) =>{
    let requset = await fetch(zipcode);
    // console.log(requset);
    try {
        let dataWeather = await requset.json();
        return dataWeather;
        // console.log(jsozzn);
      }  catch(error) {
        console.log("error", error);
      }
}
// post data to the server
async function postData (url , data){

    const response = await fetch(url , {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data) 
    })
}
// send the data to user
const updateUl = async()=>{
    const req = await fetch('http://localhost:9000/geteData')  
    try {
        let jsonFile = await req.json();
        document.querySelector('#date').innerHTML = jsonFile[0].date;
        document.querySelector('#temp').innerHTML = jsonFile[0].temperature;
        document.querySelector('#content').innerHTML = jsonFile[0].cFeeling;
    }  catch(error) {
        console.log("error", error);

      }
}