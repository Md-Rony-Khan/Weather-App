import Message from './Message';

export default function Body(props) {
    const {
        city,
        temperatureCel,
        temperatureFar,
        minTemp,
        maxtemp,
        description,
        icon,
        minmaxTemp,
        flag,
    } = props;
    return (
        <div className="container">
            {flag ? (
                <Message />
            ) : (
                <div className="card" style={{ opacity: 0.8 }}>
                    <h1 className="py-3">{city}</h1>
                    <h5 className="py-4">
                        <i className={`wi ${icon} display-1`}></i>
                    </h5>
                    <h1 className="py-2">
                        {temperatureCel ? (
                            <span className="px-2">{temperatureCel}&#8451; |</span>
                        ) : null}
                        {temperatureCel ? (
                            <span className="px-2">{temperatureFar}&#8457;</span>
                        ) : null}
                    </h1>
                    {minmaxTemp(minTemp, maxtemp)}
                    <h4 className="py-3">{description}</h4>
                </div>
            )}
        </div>
    );
}
