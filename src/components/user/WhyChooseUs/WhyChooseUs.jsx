import FeaturesSection from "../FeaturesSection/FeaturesSection";

function WhyChooseUs() {
    return (
        <div className="why-choose-section">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-6">
                        <h2 className="section-title">
                            Why Choose Us
                        </h2>

                        <p>
                            Donec vitae odio quis nisl dapibus malesuada.
                            Nullam ac aliquet velit. Aliquam vulputate
                            velit imperdiet dolor tempor tristique.
                        </p>

                        <FeaturesSection
                            limit={4}
                            className="col-6 col-md-6"
                        />
                    </div>

                    <div className="col-lg-5">
                        <div className="img-wrap">
                            <img
                                src="/assets/images/why-choose-us-img.jpg"
                                alt="Why Choose Us"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUs;