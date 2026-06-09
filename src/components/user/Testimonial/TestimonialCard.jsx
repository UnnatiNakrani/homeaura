function TestimonialCard({ item }) {
    return (
        <div className="item">
            <div className="row justify-content-center">
                <div className="col-lg-8 mx-auto">
                    <div className="testimonial-block text-center">
                        <blockquote className="mb-5">
                            <p>{item.message}</p>
                        </blockquote>

                        <div className="author-info">
                            <div className="author-pic">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid"
                                />
                            </div>

                            <h3 className="font-weight-bold">
                                {item.name}
                            </h3>

                            <span className="position d-block mb-3">
                                {item.position}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestimonialCard;