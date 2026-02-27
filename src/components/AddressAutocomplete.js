import React, { useRef, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { LocationEditIcon } from "lucide-react";

export const AddressAutocomplete = ({
    label ="",
    placeholder = "Enter Address",
    value = "",
    onSelect,
    className = "",
    required = false,
    error = "",
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (!window.google) return;

        const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current,
            { types: ["geocode"] }
        );

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) return;

            const address = {
                full_address: place.formatted_address,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
                city: "",
                state: "",
                country: "",
                postal_code: "",
            };

            place.address_components.forEach((c) => {
                if (c.types.includes("locality")) address.city = c.long_name;
                if (c.types.includes("administrative_area_level_1")) address.state = c.long_name;
                if (c.types.includes("country")) address.country = c.long_name;
                if (c.types.includes("postal_code")) address.postal_code = c.long_name;
            });

            onSelect(address);
        });
    }, [onSelect]);

    return (
        <Form.Group>
            {label && (
                <Form.Label>
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </Form.Label>
            )} 
            <InputGroup>
                <InputGroup.Text className='Input-Group-Icon start-0 rounded-start border-0'>
                    <LocationEditIcon />
                </InputGroup.Text>
                <Form.Control
                    required={required}
                    ref={inputRef}
                    defaultValue={value}
                    placeholder={placeholder}
                    className={`rounded-pill custom-input ${className}`}
                />
            </InputGroup>
            {error && (
                <small className="text-danger mt-1 d-block">
                    {error}
                </small>
            )}
        </Form.Group>
    );
};
