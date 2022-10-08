import axios from "axios";

const BASE_URL="https://localhost:44350/api/TimerProject/"

export const createAPIEndpoint=()=>{

    return{
        fetchall:()=>axios.get(BASE_URL),
        create: newRecord=>axios.post(BASE_URL,newRecord),
        update:updatedRecord=>axios.put(BASE_URL,updatedRecord),
        delete:projectId=>axios.delete(BASE_URL+projectId)
    }
}