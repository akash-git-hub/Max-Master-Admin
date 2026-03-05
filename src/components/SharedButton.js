import React from "react";
import { Button } from "react-bootstrap";

export const SharedButton = ({ BtnClick, BtnLabel, BtnType, BtnVariant, BtnClass, BtnTitle ,BtnSize}) => {
    return (
        <Button 
         title={BtnTitle}
         type={BtnType} 
         variant={BtnVariant} 
         onClick={BtnClick}
         className={`rounded-pill ${BtnClass}`}
         size={BtnSize}
         >
            {BtnLabel}
        </Button>
    );
};
