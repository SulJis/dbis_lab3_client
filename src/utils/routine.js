export default function getToken(){
    const token = localStorage.getItem("jwt-token");
     return {
            "Authorization": "Bearer " + token
        }
}
