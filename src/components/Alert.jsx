import { BiError, BiInfoCircle, BiCheckCircle } from "react-icons/bi";
import { BsExclamationTriangleFill } from "react-icons/bs";

const Alert = (props) => {
    return (
        <div
            className={`alert alert-${props.type} alert-dismissible fade show`}
            role="alert"
        >
            <div style={{ marginRight: ".5em", display: "inline" }}>
                {props.type === "danger" && <BiError />}
                {props.type === "info" && <BiInfoCircle />}
                {props.type === "success" && <BiCheckCircle />}
                {props.type === "warning" && <BsExclamationTriangleFill />}
            </div>
            {props.message}
            <button
                type="button"
                onClick={props.onClose}
                className="btn-close"
            ></button>
        </div>
    );
};

export default Alert;
