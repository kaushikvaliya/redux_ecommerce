import httpanything from "./../http-common.jsx";

const getAll = () =>{
    console.log("getAll API");
    return httpanything.get("users")
}
const getUserLoginData = (userid) =>{
    return httpanything.get(`users?id=1`)
}

const UserService = {
    getAll,
    getUserLoginData
}
export default UserService;