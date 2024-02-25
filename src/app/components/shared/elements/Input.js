import React from "react";
import { Element } from "./Element";

export const Input = React.forwardRef((props, ref) => {
  return <Element {...props} ref={ref} />;
});

export const InputInner = React.forwardRef((props, ref) => {
  return (
    <input
      type="text"
      ref={ref}
      style={{ width: "170px", height: "20px" }}
      {...props}
    />
  );
});
