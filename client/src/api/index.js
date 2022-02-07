import axios from "axios";

const API = axios.create({
  baseURL: "https://myfirstmemories-project.herokuapp.com/",
});

//should I change this ^^^ to my Heroku project url? the backend deployment url?
//https://myfirstmemories-project.herokuapp.com/

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// const url = "https://myfirstmemories-project.herokuapp.com/posts";

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => axios.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
