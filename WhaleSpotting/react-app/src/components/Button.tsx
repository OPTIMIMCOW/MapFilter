import React from "react";
import "../styles/Buttons.scss";
import { Link } from "react-router-dom";

export enum Style {
    primary,
    secondary,
    reject
}

interface ButtonProps {
    style: Style;
    text: string;
    onClick?: () => void;
    dataTestId?: string;
    minWidth25?: boolean;
    link?: string;
    hidden?: boolean;
}

export function Button({ style, text, onClick, dataTestId, minWidth25 = false, link, hidden = false }: ButtonProps): JSX.Element {
    const width = minWidth25 ? "minWidth25" : "";
    let styleClass;

    switch (style) {
    case Style.primary:
        styleClass = "primary-button";
        break;
    case Style.secondary:
        styleClass = "secondary-button";
        break;
    case Style.reject:
        styleClass = "reject-button";
        break;
    }

    if (link) {
        return (
            <Link
                data-testid={dataTestId}
                className={`${styleClass} ${width} link ${hidden ? "hidden" : "" }`}
                to={link}>
                hidden={hidden}>
                {text}
            </Link>
        );
    }
    return (
        <button
            data-testid={dataTestId}
            className={`${styleClass} ${width} ${hidden ? "hidden" : "" }`}
            onClick={onClick}>
            hidden={hidden}>
            {text}
        </button>
    );
}