import { useEffect } from "react";
import { tns } from "tiny-slider";
import "tiny-slider/dist/tiny-slider.css";
import TestimonialCard from "./TestimonialCard";

function TestimonialSection() {
    const testimonials = [
        {
            id: 1,
            name: "Maria Jones",
            position: "CEO, Co-Founder, XYZ Inc.",
            image: "/assets/images/person-1.png",
            message:
                "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada.",
        },
        {
            id: 2,
            name: "John Smith",
            position: "Marketing Manager",
            image: "/assets/images/person-1.png",
            message:
                "Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.",
        },
        {
            id: 3,
            name: "Emma Watson",
            position: "Interior Designer",
            image: "/assets/images/person-1.png",
            message:
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
        },
    ];

    useEffect(() => {
        const slider = tns({
            container: ".testimonial-slider",
            items: 1,
            slideBy: 1,
            autoplay: true,
            nav: true,
            controlsContainer: "#testimonial-nav",
            autoplayButtonOutput: false,
        });

        return () => {
            slider.destroy();
        };
    }, []);

    return (
        <div className="testimonial-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mx-auto text-center">
                        <h2 className="section-title">
                            Testimonials
                        </h2>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="testimonial-slider-wrap text-center">
                            <div id="testimonial-nav">
                                <span
                                    className="prev"
                                    data-controls="prev"
                                >
                                    <span className="fa fa-chevron-left" />
                                </span>

                                <span
                                    className="next"
                                    data-controls="next"
                                >
                                    <span className="fa fa-chevron-right" />
                                </span>
                            </div>

                            <div className="testimonial-slider">
                                {testimonials.map((item) => (
                                    <TestimonialCard
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestimonialSection;