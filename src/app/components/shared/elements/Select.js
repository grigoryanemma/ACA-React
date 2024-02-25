import { Select as AntSelect } from "antd";

import { Element } from "./Element";
import React from "react";

export const Select = React.forwardRef(({ name, ...rest }, ref) => {
  return <Element ref={ref} name={name} {...rest} />;
});

export const SelectInner = React.forwardRef(
  ({ name, options, ...rest }, ref) => {
    const { Option } = AntSelect;

    return (
      <AntSelect ref={ref} style={{ width: "200px", height: "27px" }} {...rest}>
        {options?.length &&
          options.map(({ value, text }) => {
            return <Option value={value} text={text}></Option>;
          })}
      </AntSelect>
    );
  }
);
