import React, { useState } from "react";

enum ButtonFunction {
  nextPage,
  previousPage,
  sightings,
  approvals
}

interface ButtonProps {
  type: boolean;
  text: string;
  buttonFunction: ButtonFunction;
}

export function Button({ type, text, buttonFunction }: ButtonProps): JSX.Element {
  let onClickFunction;

  switch (buttonFunction) {
    case ButtonFunction.approvals:
      // a function that changes context?
      break;
    case ButtonFunction.sightings:
      break;
    case ButtonFunction.nextPage:
      break;
    case ButtonFunction.previousPage:
      break;
  }

  return (<button className={type ? "primary-button" : "secondary-button"} onClick={() => }>{text}</button>);
}