var info;

document.getElementById("btn").addEventListener('click', () => getCity())

document.getElementById('btnXY').addEventListener('click', () => getXY())

function getXY(){
    let lat_val = document.getElementById('lat').value;
    let lon_val = document.getElementById('lon').value;
    if(lat_val.localeCompare("") != 0 && lon_val.localeCompare("") != 0){
        fetch('getWeather-By-XY', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({lat: lat_val, lon: lon_val})
        })
        .then(response => response.json())
        .then(data => {
            info = data;
            updateTemp();
        })
    }
}

function getCity(){
    // Selecting the input element and get its value 
    val = document.getElementById("city").value;
    if(val.localeCompare("") != 0) {
        fetch('getWeather-By-City', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({city: val})
        })
        .then(response => response.json())
        .then(data => {
            info = data;
            updateTemp();
        })
    }
    else{
        document.getElementById('temp').innerHTML = '';
        info = {cod: 400, main: {temp: ''}};
    }
}

document.getElementById("c").addEventListener('click', () => {
    document.getElementById("c").checked = true;
    document.getElementById("h").checked = false;
    updateTemp();
    
});

document.getElementById("h").addEventListener('click', () => {
    document.getElementById("h").checked = true;
    document.getElementById("c").checked = false;
    updateTemp();
});

function updateTemp(){
    if(info.cod == 200){
        if(document.getElementById('c').checked == true)
            document.getElementById('temp').innerHTML = Math.round(info.main.temp - 272.15);
        else
        document.getElementById('temp').innerHTML = Math.round(info.main.temp * 9 / 5 - 457.87);
    }
    else
        document.getElementById('temp').innerHTML = 'Not a valid city';
}