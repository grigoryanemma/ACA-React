import { useCallback, useEffect, useMemo, useState } from "react";
import { getUsers } from "./getUsers";
import { ResponseStatuses } from "../../constants/responseStatus";
import { UserItem } from "./UserItem";

import '../../styles/user.css';

const getValueByKey = (user, inputKeyValueInEditMode) => {
    const {key, value} = inputKeyValueInEditMode;

    if (user.hasOwnProperty(key)) {
        user[key] = value;

        return true;
    } 

        for (let prop in user) {
            if (typeof user[prop] === "object") {
                const res = getValueByKey(user[prop], inputKeyValueInEditMode);

                if (res) {
                    break;
                }
            }
        }
};

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const usersData = useMemo(() => {
        if (!searchValue) {
            return users;
        }

        let filteredArr = [];

        if (users.length) {
            users.forEach(user => {
                console.log(user.name.toLowerCase(), searchValue.toLowerCase())
                if (user.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                    filteredArr.push(user);
                }
            });
        }
        
        return filteredArr;

    }, [searchValue, users]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const deleteUser = useCallback((id) => {
        setUsers(users.filter(user => user.id !== id));
    }, [users]);

    const editUser = useCallback((id) => {
        setUsers(users => {
            return users.map(user => {
                    user.isDisabled = true;
                    user.isEditMode = user.id === id;

                    return user;
            });
        });
    }, []);

    const cancelEditMode = useCallback(() => {
        setUsers(users => {
            return users.map(user => {
                    user.isDisabled = false;
                    user.isEditMode = false;

                    return user;
            });
        });
    }, []);


    const updateUser = (id, inputKeyValueInEditMode) => {
        setUsers(users => {
            return users.map(user => {
                if (user.id === id) {
                    getValueByKey(user, inputKeyValueInEditMode);
                }
                    user.isDisabled = false;
                    user.isEditMode = false;

                    return user;
            });
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getUsers().then(res => {
            if (res.status === ResponseStatuses.Ok) {
                setUsers(res.users);
            } else {
                setHasError(true);
            }
        }).catch(err => console.log(err))
        .finally(() => {
            setIsLoading(false);
        })    
    }, []);

    return (
        <>
        { isLoading ?  <div>Loading...</div> : hasError ? <h1>Something went wrong</h1> :
            <>
                <input placeholder="Seacrh" className="search" onChange={handleSearch}/>
                <div className="userContainer">
                { 
                usersData.length > 0 && usersData.map((user, i) =>
                    <UserItem key={users.id} user={user} cancelEditMode={cancelEditMode} deleteUser={deleteUser} editUser={editUser} updateUser={updateUser}  i={i}/>)
                } 
                </div> 
            </>
        }   
        </>
    );
};