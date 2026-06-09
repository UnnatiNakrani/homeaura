import { Link } from "react-router-dom";

function Hero({
    title,
    subtitle,
    description,
    primaryBtnText,
    primaryBtnLink,
    secondaryBtnText,
    secondaryBtnLink,
    image,
}) {
    return (
        <div className="hero">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-5">
                        <div className="intro-excerpt">
                            <h1>
                                {title}{" "}
                                <span className="d-block">
                                    {subtitle}
                                </span>
                            </h1>

                            <p className="mb-4">
                                {description}
                            </p>

                            <p>
                                <Link
                                    to={primaryBtnLink}
                                    className="btn btn-secondary me-2"
                                >
                                    {primaryBtnText}
                                </Link>

                                <Link
                                    to={secondaryBtnLink}
                                    className="btn btn-white-outline"
                                >
                                    {secondaryBtnText}
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="hero-img-wrap">
                            <img
                                src={image}
                                alt="Hero"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;