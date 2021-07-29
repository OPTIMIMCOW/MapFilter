import React from "react";
import "../styles/Buttons.scss";

interface ButtonProps {
  stylePrimary: boolean;
  text: string;
  onClick: () => void;
  dataTestId?: string;
  minWidth25: boolean;
}

export function Button({ stylePrimary, text, onClick, dataTestId, minWidth25}: ButtonProps): JSX.Element {
    const style = stylePrimary ? "primary-button" : "secondary-button";
    const width = minWidth25 ? "minWidth25" : "";

    return (<button data-testid={dataTestId} className={`${style} ${width}`} onClick={onClick}>{text}</button>);
}