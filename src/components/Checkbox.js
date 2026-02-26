import { Form } from "react-bootstrap";

export const Checkbox = ({ type, disabled = false, name, checked, onClick, label, className, checkboxColor, id }) => {

    const customStyle = checkboxColor ? {
        color: checkboxColor,
        background: checkboxColor
    } : {};

    return (
        <Form.Group>
            <Form.Check
                type={type}
                name={name}
                disabled={disabled}
                checked={checked}
                onChange={(e) => (e.target.checked)}
                onClick={onClick}
                label={label}
                className={className}
                id={id}
                style={customStyle} />
        </Form.Group>
    );
}
