import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../../styles/popup.css";

const popupRoot = document.getElementById("popup-root");

export const Popup = ({ children, closePopup, onSave }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    popupRoot.classList.add("open");
    document.addEventListener("mousedown", handleClick);

    return () => {
      popupRoot.classList.remove("open");
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const handleClick = (e) => {
    if (popupRef?.current && e.target.contains(popupRef.current)) {
      closePopup();
    }
  };

  return createPortal(
    <div className="popup-container" ref={popupRef}>
      <div className="popup-body">
        <div className="popup-btn-close">
          <button onClick={closePopup}>X</button>
        </div>

        {children}
        <div className="form-btn-save">
          <button className="btn-save" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>,
    popupRoot
  );
};
