import { Link } from "react-router-dom";

function CustomButton({ to, title, className }) {
    return (
        <Link to={to} className={className}>
            {title}
        </Link>
    );
}

export default CustomButton;