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
    forAdmin?: boolean;
    isAdmin?: boolean;
}

export function Button({ style, text, onClick, dataTestId, minWidth25 = false, link, forAdmin = false, isAdmin = false }: ButtonProps): JSX.Element {
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
                className={`${styleClass} ${width} link`} 
                to={link}>
                {text}
            </Link>
        );
    }

    if(forAdmin) {
        return (
            <button
                data-testid={dataTestId}
                className={`${styleClass} ${width}`}
                onClick={onClick}
                hidden={!isAdmin}>
                {text}
            </button>
        );
    }

    return (
        <button
            data-testid={dataTestId}
            className={`${styleClass} ${width}`}
            onClick={onClick}>
            {text}
        </button>
    );
}