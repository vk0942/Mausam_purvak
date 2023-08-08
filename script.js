const form = document.querySelector('#form');
const input = document.querySelector('#place_input');
const info = document.querySelector('#info');
let celcius = true;


async function get_Climate(place) {
    try {
        const raw_response = await fetch(`https://api.weatherapi.com/v1/current.json?key=57993af0fd1141e48ab54901230208 &q=${place}`, { mode: 'cors' })
        const response = await raw_response.json();

        return response;
    } catch (err) {
        throw new Error(err);
    };
}
function FillInfo(data)
{
    info.innerHTML = "";
  const one =  document.createElement('div'); one.id="one";
  const two =  document.createElement('div'); two.id="two";
  const three =  document.createElement('div'); three.id="three";
  
  const one_left = document.createElement('div');
  const place =  document.createElement('div'); place.id="place"
  const condition =  document.createElement('div');
  const icon =  document.createElement('img');
  
  const temp =  document.createElement('div'); temp.id = "temp";
  const other =  document.createElement('div'); other.id="other";
  const pressure = document.createElement('div');
  const humidity = document.createElement('div');
  const wind = document.createElement('div');
  const temp_change = document.createElement('button'); temp_change.id="temp_change";
  
  temp_change.textContent = "°Farenhite";
  temp_change.addEventListener('click',()=>{
    if(celcius)
    {
       celcius = false;
       temp_change.textContent = "°Celcius";
       temp.textContent = data.current.temp_f + "°F";
    }else{
        celcius = true;
        temp_change.textContent = "°Farenhite";
        temp.textContent = data.current.temp_c + "°C";
    }
  })
  place.textContent = data.location.name;
  condition.textContent = data.current.condition.text;
  icon.src= data.current.condition.icon;

  temp.textContent = data.current.temp_c+"°C";
  pressure.textContent = "Pressure   "+" ‏‏‎ ‎ "+ data.current.pressure_in+'"';
  humidity.textContent = "Humidity  "+"‏‏‎ ‎"+data.current.humidity;
  wind.textContent = "Wind " +" ‏‏‎ ‎ "+ data.current.wind_mph+ " mph ";

  one_left.appendChild(place);
  one_left.appendChild(condition);
  one.appendChild(one_left);
  one.appendChild(icon);

  other.appendChild(pressure);
  other.appendChild(humidity);
  other.appendChild(wind);
  two.appendChild(temp);
  two.appendChild(other);

  three.appendChild(temp_change);

  info.appendChild(one);
  info.appendChild(two);
  info.appendChild(three);
}
form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    
    const place = input.value;
    get_Climate(place).then((data)=>{
        console.log(data);
        FillInfo(data);
    }).catch(err =>{
        console.log(err.message);
    });
});