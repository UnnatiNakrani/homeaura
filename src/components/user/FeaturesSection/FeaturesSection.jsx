import FeatureCard from "./FeatureCard";

function FeaturesSection({ limit, className }) {
    const features = [
        {
            id: 1,
            icon: "/assets/images/truck.svg",
            title: "Fast & Free Shipping",
            description:
                "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
        },
        {
            id: 2,
            icon: "/assets/images/bag.svg",
            title: "Easy to Shop",
            description:
                "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
        },
        {
            id: 3,
            icon: "/assets/images/support.svg",
            title: "24/7 Support",
            description:
                "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
        },
        {
            id: 4,
            icon: "/assets/images/return.svg",
            title: "Hassle Free Returns",
            description:
                "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
        },
        {
            id: 5,
            icon: "/assets/images/truck.svg",
            title: "Fast & Free Shipping",
            description:
                "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
        },
        {
            id: 6,
            icon: "/assets/images/bag.svg",
            title: "Easy to Shop",
            description:
                "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
        },
        {
            id: 7,
            icon: "/assets/images/support.svg",
            title: "24/7 Support",
            description:
                "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
        },
        {
            id: 8,
            icon: "/assets/images/return.svg",
            title: "Hassle Free Returns",
            description:
                "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
        },
    ];

    const displayFeatures = limit
        ? features.slice(0, limit)
        : features;

    return (
        <div className="row my-5">
            {displayFeatures.map((item) => (
                <FeatureCard
                    key={item.id}
                    item={item}
                    className={className}
                />
            ))}
        </div>
    );
}

export default FeaturesSection;