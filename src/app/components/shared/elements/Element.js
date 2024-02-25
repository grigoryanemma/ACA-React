import React from "react";
import { Controller } from "react-hook-form";

import { INPUT_TYPE } from "../../../constants/inputType";
import { FormField } from "./FormField";
import { SelectInner } from "./Select";
import { InputInner } from "./Input";

export const Element = React.forwardRef(({ control, name, ...rest }, ref) => {
  return control ? (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ref },
        fieldState: { error, isDirty, invalid, isTouched },
      }) => (
        <ElementInner
          ref={ref}
          value={value}
          error={error}
          isDirty={isDirty}
          invalid={invalid}
          isTouched={isTouched}
          onChange={onChange}
          {...rest}
        />
      )}
    />
  ) : (
    <ElementInner ref={ref} name={name} {...rest} />
  );
});

const ElementInner = React.forwardRef(({ type, ...rest }, ref) => {
  let element;

  switch (type) {
    case INPUT_TYPE.Text:
      element = <InputInner ref={ref} {...rest} />;
      break;

    case INPUT_TYPE.Select:
      element = <SelectInner ref={ref} {...rest} />;
      break;

    case INPUT_TYPE.Checkbox:
      element = <CheckboxInner ref={ref} {...rest} />;
      break;

    default:
      element = <input type={type} ref={ref} {...rest} />;
  }

  return <FormField {...rest}>{element}</FormField>;
});

const CheckboxInner = ({ ref, name, value, ...rest }) => {
  return <input type="checkbox" ref={ref} checked={value} {...rest} />;
};
