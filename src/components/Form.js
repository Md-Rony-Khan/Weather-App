import React from 'react';
import Error from './Error';
import './form.style.css';

function Form({ getWeather, error }) {
    return (
        <div className="container h-100">
            <div>{error ? <Error /> : null}</div>
            <form onSubmit={getWeather}>
                <div className="row">
                    <div className="col align-self-center">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            autoComplete="off"
                            placeholder="City"
                        />
                    </div>
                    <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
                        <input type="submit" className="btn btn-warning" value="Get Weather" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;
