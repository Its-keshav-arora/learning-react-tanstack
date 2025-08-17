import axios from "axios";

const api  = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
});

// to fetch the data 
export const fetchPosts = async (pageNumber) => {
    return api.get(`/posts?_start=${(pageNumber - 1)*10}&_limit=10`);
}

// to fetch the individual data 
export const fetchIndividualPost = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`);
        console.log(res.data);
        return res.status === 200 ? res.data : [];
    }
    catch(err) {
        console.log(err.message);
        throw err;
    }
}

// API to delete the individual post
export const deletePost = async(id) => {
    return await api.delete(`/posts/${id}`);
}

// API to delete the update post
export const updatePost = async(id) => {
    const res = await api.patch(`/posts/${id}`, {title :"I have updated"});
    return res.data;
}

// Implementing Infinite Scrolling : 
export const fetchUsers = async ({pageParams = 1}) => {
    try {
        const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParams}`);
        return res.status === 200 ? res.data : [];
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}