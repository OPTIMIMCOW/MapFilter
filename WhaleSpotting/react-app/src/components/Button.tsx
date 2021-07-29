import React, { useState } from "react";

enum func{
    next,
    previous,
    sightings,
    approvals
}

interface ButtonProps {
    type: boolean;
    text: string;
    use: func;
}

export function Button({ type, text, use: func }: ButtonProps): JSX.Element {
    const onClickFunction;

    switch (use) {
        case 'Oranges':
          console.log('Oranges are $0.59 a pound.');
          break;
        case 'Mangoes':
        case 'Papayas':
          console.log('Mangoes and papayas are $2.79 a pound.');
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }

    return (<button className={type ? "primary-button" : "secondary-button"} onClick={() => }>{text}</button>);
}