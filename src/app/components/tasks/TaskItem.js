import { useState } from "react";
import { TASKSTATUSES } from "../../constants/taskStatus";
import { TASKPRIORITIES } from "../../constants/taskPriority";
import { Popup } from "../popups/Popup";

import { TaskForm } from "./TaskForm";
import { dropdownPriorities, dropdownStatuses } from "./TaskList";
import { Select } from "../shared/elements/Select";
import { INPUT_TYPE } from "../../constants/inputType";

export const TaskItem = ({ task, setTaskData }) => {
  const { id, title, description, status, priority, assigned } = task;
  const [dropdownPriority, setDropdownPriority] = useState(priority);
  const [dropdownStatus, setDropdownStatus] = useState(status);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const dropdownStatusChangeHandler = (val) => {
    setDropdownStatus(val);
    setTaskData((taskData) => {
      return taskData.map((task) => {
        if (task.id === id) {
          task.status = val;
        }

        return task;
      });
    });
  };

  const dropdownPriorityChangeHandler = (val) => {
    setDropdownPriority(val);
    setTaskData((taskData) => {
      return taskData.map((task) => {
        if (task.id === id) {
          task.priority = val;
        }

        return task;
      });
    });
  };

  const editHandler = () => {
    console.log(task);
    setIsOpenPopup(true);
  };

  const deleteHandler = () => {
    setTaskData((taskData) => {
      return taskData.filter((currTask) => currTask.id !== task.id);
    });
  };

  return (
    <div className="taskItem">
      <div>{title}</div>
      <div>{description}</div>
      <div>
        <Select
          type={INPUT_TYPE.Select}
          label="Status"
          options={dropdownStatuses}
          value={dropdownStatus}
          onChange={dropdownStatusChangeHandler}
          style={{ width: "100px", height: "25px" }}
        />
      </div>
      <div>
        <Select
          type={INPUT_TYPE.Select}
          label="Priority"
          options={dropdownPriorities}
          value={dropdownPriority}
          onChange={dropdownPriorityChangeHandler}
          style={{ width: "100px", height: "25px" }}
        />
      </div>
      <div>{assigned}</div>
      <div className="taskEditDeleteBtnContainer">
        <button onClick={editHandler} className="btnEdit">
          edit
        </button>
        <button onClick={deleteHandler} className="btnDelete">
          delete
        </button>
      </div>

      {isOpenPopup && (
        <TaskForm
          defaultValues={task}
          setTaskData={setTaskData}
          closePopup={() => {
            setIsOpenPopup(false);
          }}
        />
      )}
    </div>
  );
};
