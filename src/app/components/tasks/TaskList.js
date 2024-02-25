import { useState } from "react";
import { TASKSTATUSES } from "../../constants/taskStatus";
import { TaskItem } from "./TaskItem";

import "../../styles/task.css";
import { TASKPRIORITIES } from "../../constants/taskPriority";
import { Popup } from "../popups/Popup";
import { TaskForm } from "./TaskForm";

const initTaskData = [
  {
    id: 2,
    title: "title2",
    description: "desc2",
    status: "todo",
    priority: "mid",
    assigned: "Ani",
  },
  {
    id: 3,
    title: "title3",
    description: "desc3",
    status: "in progress",
    priority: "low",
    assigned: "Gayane",
  },
  {
    id: 4,
    title: "title4",
    description: "desc4",
    status: "blocked",
    priority: "low",
    assigned: "Emma",
  },
  {
    id: 5,
    title: "title5",
    description: "desc5",
    status: "todo",
    priority: "low",
    assigned: "Ani",
  },
  {
    id: 6,
    title: "title6",
    description: "desc6",
    status: "done",
    priority: "high",
    assigned: "Gayane",
  },
  {
    id: 7,
    title: "title7",
    description: "desc7",
    status: "done",
    priority: "low",
    assigned: "Emma",
  },
  {
    id: 8,
    title: "title8",
    description: "desc8",
    status: "in progress",
    priority: "mid",
    assigned: "Gayane",
  },
  {
    id: 1,
    title: "title1",
    description: "desc1",
    status: "blocked",
    priority: "high",
    assigned: "Emma",
  },
  {
    id: 9,
    title: "title9",
    description: "desc9",
    status: "done",
    priority: "mid",
    assigned: "Gayane",
  },
];

const priorities = Object.values(TASKPRIORITIES);
const statuses = Object.values(TASKSTATUSES);

export const dropdownPriorities = priorities.map((priority) => ({
  value: priority,
  text: priority,
}));

export const dropdownStatuses = statuses.map((status) => ({
  value: status,
  text: status,
}));

export const TaskList = () => {
  const [taskData, setTaskData] = useState(initTaskData);
  const [isNewTaskPopupOpen, setIsNewTaskPopupOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  const addTask = (status) => {
    setIsNewTaskPopupOpen(true);
    setCurrentStatus(status);
  };

  return (
    <div className="taskContainer">
      <div className="taskList">
        <text>
          {statuses.find((status) => status === TASKSTATUSES.Blocked)}
        </text>
        {/* <text>{TASKSTATUSES.Blocked}</text> */}
        {taskData
          .filter((task) => task.status === TASKSTATUSES.Blocked)
          .sort(
            (prev, next) =>
              priorities.indexOf(prev.priority) -
              priorities.indexOf(next.priority)
          )
          .map((taskItem, i) => (
            <TaskItem
              task={taskItem}
              key={taskItem.id}
              i={i}
              setTaskData={setTaskData}
            />
          ))}
        <div className="add-task-btn-container">
          <button
            className="btn-add"
            onClick={() => {
              addTask(TASKSTATUSES.Blocked);
            }}
          >
            Add task
          </button>
        </div>
      </div>
      <div className="taskList">
        <text>{TASKSTATUSES.Todo}</text>
        {taskData
          .filter((task) => task.status === TASKSTATUSES.Todo)
          .sort(
            (prev, next) =>
              priorities.indexOf(prev.priority) -
              priorities.indexOf(next.priority)
          )
          .map((taskItem, i) => (
            <TaskItem
              task={taskItem}
              key={taskItem.id}
              i={i}
              setTaskData={setTaskData}
            />
          ))}
        <div className="add-task-btn-container">
          <button
            className="btn-add"
            onClick={() => {
              addTask(TASKSTATUSES.Todo);
            }}
          >
            Add task
          </button>
        </div>
      </div>
      <div className="taskList">
        <text>{TASKSTATUSES.InProgress}</text>
        {taskData
          .filter((task) => task.status === TASKSTATUSES.InProgress)
          .sort(
            (prev, next) =>
              priorities.indexOf(prev.priority) -
              priorities.indexOf(next.priority)
          )
          .map((taskItem, i) => (
            <TaskItem
              task={taskItem}
              key={taskItem.id}
              i={i}
              setTaskData={setTaskData}
            />
          ))}
        <div className="add-task-btn-container">
          <button
            className="btn-add"
            onClick={() => {
              addTask(TASKSTATUSES.InProgress);
            }}
          >
            Add task
          </button>
        </div>
      </div>
      <div className="taskList">
        <text>{TASKSTATUSES.Done}</text>
        {taskData
          .filter((task) => task.status === TASKSTATUSES.Done)
          .sort(
            (prev, next) =>
              priorities.indexOf(prev.priority) -
              priorities.indexOf(next.priority)
          )
          .map((taskItem, i) => (
            <TaskItem
              task={taskItem}
              key={taskItem.id}
              i={i}
              setTaskData={setTaskData}
            />
          ))}
        <div className="add-task-btn-container">
          <button
            className="btn-add"
            onClick={() => {
              addTask(TASKSTATUSES.Done);
            }}
          >
            Add task
          </button>
        </div>
      </div>
      {isNewTaskPopupOpen && (
        <TaskForm
          defaultValues={{ status: currentStatus }}
          setTaskData={setTaskData}
          closePopup={() => {
            setIsNewTaskPopupOpen(false);
          }}
          isNew={true}
        />
      )}
    </div>
  );
};
