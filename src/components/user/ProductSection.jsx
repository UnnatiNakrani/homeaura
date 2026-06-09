import CustomButton from "../common/CustomButton";
import ShopCart from "./ShopCart";

function ProductSection() {
    return (
        <div className="product-section">
            <div className="container">
                <div className="row">

                    <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                        <h2 className="mb-4 section-title">
                            Crafted with excellent material.
                        </h2>

                        <p className="mb-4">
                            Donec vitae odio quis nisl dapibus malesuada.
                            Nullam ac aliquet velit. Aliquam vulputate
                            velit imperdiet dolor tempor tristique.
                        </p>

                        <p>
                            <CustomButton
                                to="/shop"
                                title="Explore"
                                className="btn"
                            />
                        </p>
                    </div>

                    <ShopCart limit={3} />

                </div>
            </div>
        </div>
    );
}

export default ProductSection;