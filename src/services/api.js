import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all posts
export const getAllPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch posts');
  }
};

// Get post by ID
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch post');
  }
};

// Add new post
export const addPost = async (post) => {
  try {
    const response = await api.post('/posts', post);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add post');
  }
};

// Update post
export const updatePost = async (id, post) => {
  try {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update post');
  }
};

// Delete post
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete post');
  }
};