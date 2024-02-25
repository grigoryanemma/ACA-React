import { useState } from "react";

export const UserItem = ({ user, cancelEditMode, deleteUser, editUser, updateUser, i }) => {
    const [inputKeyValueInEditMode, setInputInEditMode] = useState({key: "", value: ""})
    const handleDelete = () => {
        deleteUser(user.id);
    };

    const handleEditMode = () => {
        editUser(user.id);
        setInputInEditMode({key: "lat"})
    };

    const handleCancel = () => {
        cancelEditMode(i, user);
    };

    const handleEdit = () => {
        updateUser(user.id, inputKeyValueInEditMode);
        setInputInEditMode({key: "", value: ""})
    }

    const handleInputValueInEditMode = (e) => {
        setInputInEditMode(input => {
            return {
                ...input,
                value: e.target.value
            }
        })
    };

    return (
        <div className="user">
            { user.isEditMode &&
                <div className="editModeContainer">
                    <label htmlFor="edit">{inputKeyValueInEditMode.key}</label>
                    <input type="text" name="name" value={inputKeyValueInEditMode.value} id="edit" className="inputInEditMode" onChange={handleInputValueInEditMode} />
                    <button onClick={handleEdit} className="btnEdit">Add</button>
                    <button onClick={handleCancel} className="btnCancel">Cancel</button>
                </div>
            }      
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>City: {user.address.city}</div>
            <div>Lat: {user.address.geo.lat}</div>
            <div>
                <button className="btn" onClick={handleDelete}>Delete</button>
                <button className="btn" disabled={user.isDisabled} onClick={handleEditMode}>Edit</button>
            </div>
            
        </div>
    );
};