import axios from "axios";

export function fetchData(){
   return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => { 
        return res.data
    })
    .catch((error) => {
        throw error
    })
}