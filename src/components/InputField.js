import moment from 'moment-timezone';
import React, { useEffect, useRef, useState } from 'react'
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const InputField = ({
    pattern = "",
    FormLabel = "",
    FormType = "",
    FormPlaceHolder = "",
    error = "",
    name = "",
    onChange = null,
    value = "",
    readOnly = false,
    isTextArea = false,
    max = '',
    min = "",
    required = false,
    disabled = false,
    className = "custom-input rounded-2",
    minLength = "",
    maxLength = "",
    startIcon,
    endIcon,
    rows = 3,
    size,
}) => {
    const [startDate, setStartDate] = useState();
    const datepickerRef = useRef();

    useEffect(() => {
        if (FormType === 'date' && value !== "") {
            setStartDate(value);

        }
    }, [FormType, value]);

    const handleDateChange = (date) => {
        setStartDate(date);
        let formattedDate = "";
        if (date) {
            formattedDate = moment(date).format('YYYY-MM-DD');
        }
        if (onChange) {
            onChange({ target: { name, value: formattedDate } });
        }
    };

    const handleIconClick = () => {
        if (datepickerRef.current)
            datepickerRef.current.setOpen(true);
    }


    return (
        <Form.Group className='position-relative w-100'>
            {FormLabel && (<Form.Label>{FormLabel} {required ? <small className='error text-danger'>*</small> : ""}</Form.Label>)}
            {FormType === 'date' ? (
                readOnly === false ? (<>

                    <DatePicker
                        // showIcon
                        ref={datepickerRef}
                        selected={startDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        onKeyDown={(e) => e.preventDefault()}
                        placeholderText={FormPlaceHolder || "select date"}
                        readOnly={disabled}
                        minDate={min ? new Date(min) : null}
                    />
                    <div className='position-absolute end-0 p-1 top-0 cursor-pointer' onClick={handleIconClick}>
                        {/* <CalenderIcon onChange={handleDateChange} /> */}
                    </div>
                </>)
                    :
                    <DatePicker
                        onKeyDown={(e) => e.preventDefault()}
                        selected={startDate}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        placeholderText={"select date"}
                        minDate={min ? new Date(min) : null}
                    />
            ) : (
                <InputGroup>
                    {startIcon && (
                        <InputGroup.Text className="Input-Group-Icon border-0">
                            {startIcon}
                        </InputGroup.Text>
                    )}
                    <Form.Control
                        as={isTextArea ? 'textarea' : 'input'}
                        type={isTextArea ? undefined : FormType}
                        name={name}
                        value={value ? value : ''}
                        placeholder={FormPlaceHolder}
                        onChange={onChange}
                        readOnly={readOnly}
                        maxLength={maxLength}
                        minLength={minLength}
                        min={min}
                        max={max}
                        size={size}
                        disabled={disabled}
                        className={className ? className : "rounded"}
                        rows={isTextArea ? rows : undefined}
                    />
                    {endIcon && (
                        <InputGroup.Text className="Input-Group-Icon border-0 end-0">
                            {endIcon}
                        </InputGroup.Text>
                    )}
                </InputGroup>
            )}

            <small className='error text-danger'>{error}</small>
        </Form.Group>
    );
};
