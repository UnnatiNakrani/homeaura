import TeamCard from "./TeamCard";

function TeamSection() {
    const teamMembers = [
        {
            id: 1,
            firstName: "Lawson",
            lastName: "Arnold",
            position: "CEO, Founder, Atty.",
            image: "/assets/images/person_1.jpg",
            description:
                "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
        },
        {
            id: 2,
            firstName: "Jeremy",
            lastName: "Walker",
            position: "CEO, Founder, Atty.",
            image: "/assets/images/person_2.jpg",
            description:
                "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
        },
        {
            id: 3,
            firstName: "Patrik",
            lastName: "White",
            position: "CEO, Founder, Atty.",
            image: "/assets/images/person_3.jpg",
            description:
                "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
        },
        {
            id: 4,
            firstName: "Kathryn",
            lastName: "Ryan",
            position: "CEO, Founder, Atty.",
            image: "/assets/images/person_4.jpg",
            description:
                "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
        },
    ];

    return (
        <div className="untree_co-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-5 mx-auto text-center">
                        <h2 className="section-title">
                            Our Team
                        </h2>
                    </div>
                </div>

                <div className="row">
                    {teamMembers.map((member) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TeamSection;