import CustomButton from "../../common/CustomButton";

function TeamCard({ member }) {
    return (
        <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
            <img
                src={member.image}
                alt={member.name}
                className="img-fluid mb-5"
            />

            <h3>
                <a href="/">
                    {member.firstName}{" "}
                    <span>{member.lastName}</span>
                </a>
            </h3>

            <span className="d-block position mb-4">
                {member.position}
            </span>

            <p>{member.description}</p>

            <p className="mb-0">
                <CustomButton
                    to="/about"
                    title="Learn More →"
                    className="more dark"
                />
            </p>
        </div>
    );
}

export default TeamCard;