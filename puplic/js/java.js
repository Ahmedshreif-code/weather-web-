let form = document.getElementById("form1");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(document.getElementById('address').value);
    weatherfunction();
    form.reset();
});

const errorf = document.getElementById("error");
const Location = document.getElementById("location");
const forecast = document.getElementById("forecast");

let weatherfunction = async () => {
    try {
        const address = document.getElementById('address').value;
        const res = await fetch('http://localhost:3000/weather?address=' + address);
        const data = await res.json();
        console.log(data);

        if (data.error) {
            errorf.innerText = data.error;
            Location.innerText = '';
            forecast.innerText = '';
        } else {
            Location.innerText = "The Country is " +data.location;
            forecast.innerText = "the Forecast is " +data.forcast;
            errorf.innerText = '';
        }
    } catch (error) {
        console.log(error);
    }
};
