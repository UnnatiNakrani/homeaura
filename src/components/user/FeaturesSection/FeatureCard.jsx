function FeatureCard({ item, className }) {
    return (
        <div className={className}>
            <div className="feature">
                <div className="icon">
                    <img
                        src={item.icon}
                        alt={item.title}
                        className="img-fluid"
                    />
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        </div>
    );
}

export default FeatureCard;