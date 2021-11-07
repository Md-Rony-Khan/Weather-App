import React from 'react';
import Body from './Body';
import Form from './Form';
import './weather.style.css';

/* openweathermap
 api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} */
const apiKey = 'f675fcf32c12c0998879d69c13aedb3a';

export default class Weather extends React.Component {
    constructor() {
        super();
        this.state = {
            city: undefined,
            // country: undefined,
            temperatureCel: undefined,
            temperatureFar: undefined,
            minTemp: undefined,
            maxtemp: undefined,
            description: '',
            icon: undefined,
            error: false,
            code: '404',
            flag: false,
        };

        this.weatherIcon = {
            Thunderstrom: 'wi-thunderstorm',
            Drizzle: 'wi-showers',
            Rain: 'wi-rain',
            Snow: 'wi-snow',
            Atmosphere: 'wi-day-haze',
            Clear: 'wi-day-sunny',
            Cloud: 'wi-cloudy',
        };
    }

    getWeatherIcon = (icon, idRange) => {
        switch (true) {
            case idRange >= 200 && idRange <= 232:
                this.setState({
                    icon: this.weatherIcon.Thunderstrom,
                });
                break;
            case idRange >= 300 && idRange <= 321:
                this.setState({
                    icon: this.weatherIcon.Drizzle,
                });
                break;
            case idRange >= 500 && idRange <= 531:
                this.setState({
                    icon: this.weatherIcon.Rain,
                });
                break;
            case idRange >= 600 && idRange <= 622:
                this.setState({
                    icon: this.weatherIcon.Snow,
                });
                break;
            case idRange >= 701 && idRange <= 781:
                this.setState({
                    icon: this.weatherIcon.Atmosphere,
                });
                break;
            case idRange === 800:
                this.setState({
                    icon: this.weatherIcon.Clear,
                });
                break;
            case idRange >= 801 && idRange <= 804:
                this.setState({
                    icon: this.weatherIcon.Cloud,
                });
                break;
            default:
                break;
        }
    };

    calTemperature = (temp) => {
        const celsius = Math.floor(temp - 274.15);
        return celsius;
    };

    calTemperatureFar = (temp) => {
        const fahrenheit = Math.floor(temp - 255.928);
        return fahrenheit;
    };

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        // const country = e.target.elements.country.value;

        if (city) {
            const apiCall = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );
            const response = await apiCall.json();

            console.log(response);
            console.log(`After API call  ${city}`);

            const { code } = this.state;

            if (code === response.cod) {
                console.log(`Message: ${response.message}`);
                this.setState({
                    city,
                    flag: true,
                });
            } else {
                this.setState({
                    city: `${response.name}, ${response.sys.country}`,
                    temperatureCel: this.calTemperature(response.main.temp),
                    temperatureFar: this.calTemperatureFar(response.main.temp),
                    minTemp: this.calTemperature(response.main.temp_min),
                    maxtemp: this.calTemperature(response.main.temp_max),
                    description: response.weather[0].description,
                    error: false,
                    flag: false,
                });
                this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
            }
        } else {
            this.setState({
                error: true,
                city: '',
            });
        }
    };

    minmaxTemp = (min, max) => (
        <h3>
            {min ? <span className="px-4">Min {min}&deg;</span> : null}
            {max ? <span className="px-4">Max {max}&deg;</span> : null}
        </h3>
    );

    render() {
        const {
            city,
            temperatureCel,
            temperatureFar,
            minTemp,
            maxtemp,
            description,
            icon,
            error,
            flag,
        } = this.state;
        console.log(`render  ${city}`);
        console.log(`render  ${flag}`);
        return (
            <div>
                <Form getWeather={this.getWeather} error={error} />
                {city ? (
                    <Body
                        minmaxTemp={this.minmaxTemp}
                        city={city}
                        temperatureCel={temperatureCel}
                        temperatureFar={temperatureFar}
                        minTemp={minTemp}
                        maxtemp={maxtemp}
                        description={description}
                        icon={icon}
                        flag={flag}
                    />
                ) : null}
            </div>
        );
    }
}
