import { getData } from "../../../getData";
import { ResponseStatuses } from "../../constants/responseStatus";

export async function getUsers() {
    const users = await getData("https://jsonplaceholder.typicode.com/users");
    const randomNum = Math.round(Math.random()) === 1;

     return  {
        users: randomNum ? users : null,
        status: randomNum ? ResponseStatuses.Ok : ResponseStatuses.BadRequest
    }
};