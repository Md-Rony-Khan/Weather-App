export default function Error() {
    return (
        // eslint-disable-next-line jsx-a11y/aria-role
        <div className="alart alart-danger mx-5" style={{ color: 'SlateBlue' }} role="alart">
            <h4>Please Enter City Name!</h4>
        </div>
    );
}
