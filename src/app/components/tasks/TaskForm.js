import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../shared/elements/Input";
import { Select } from "../shared/elements/Select";
import { INPUT_TYPE } from "../../constants/inputType";
import { dropdownPriorities, dropdownStatuses } from "./TaskList";
import { Popup } from "../popups/Popup";

const schema = yup.object().shape({
  title: yup.string().label("Title").required(),
  description: yup.string().label("Description").required(),
  status: yup.string().label("Status").required(),
  priority: yup.string().label("Priority").required(),
  assigned: yup.string().label("Assigned").required(),
});

export const TaskForm = ({ defaultValues, setTaskData, closePopup, isNew }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      assigned: "",
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const modifiedTask = { ...values };

    setTaskData((taskData) => {
      return isNew
        ? taskData.concat(values)
        : taskData.map((task) => {
            if (task.id === values.id) {
              return modifiedTask;
            }

            return task;
          });
    });

    //closePopup();
  };

  return (
    <Popup closePopup={closePopup} onSave={handleSubmit(onSubmit)}>
      <form>
        <div className="group-fields">
          <Input
            name="title"
            type={INPUT_TYPE.Text}
            control={control}
            label="Title"
          />
          <Input
            name="description"
            type={INPUT_TYPE.Text}
            control={control}
            label="Description"
          />
        </div>
        <div className="group-fields">
          <Select
            name="status"
            type={INPUT_TYPE.Select}
            control={control}
            label="Status"
            options={dropdownStatuses}
          />
          <Select
            name="priority"
            type={INPUT_TYPE.Select}
            control={control}
            label="Priority"
            options={dropdownPriorities}
          />
        </div>
        <div className="group-fields">
          <Input
            name="assigned"
            type={INPUT_TYPE.Text}
            control={control}
            label="Assigned"
          />
        </div>
      </form>
    </Popup>
  );
};
