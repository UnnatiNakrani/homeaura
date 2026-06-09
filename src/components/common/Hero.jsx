import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

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
                                {title} <span className="d-block">{subtitle}</span>
                            </h1>

                            <p className="mb-4">
                                {description}
                            </p>

                            <p>
                                <CustomButton
                                    to={primaryBtnLink}
                                    title={primaryBtnText}
                                    className="btn btn-secondary me-2"
                                />

                                <CustomButton
                                    to={secondaryBtnLink}
                                    title={secondaryBtnText}
                                    className="btn btn-white-outline"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="hero-img-wrap">
                            <img
                                src={image}
                                className="img-fluid"
                                alt={title}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;