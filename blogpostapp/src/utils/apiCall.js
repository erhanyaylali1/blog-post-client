import fetch from 'isomorphic-fetch';
import { API } from '../config/config';

// AUTH APIs

export const registerToServer = (user) => {
  return fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const loginToServer = (user) => {
  return fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const logoutFromServer = () => {
  return fetch(`${API}/auth/logout`, { method: 'GET' })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

// Category APIs

export const createCategory = (category, token) => {
  return fetch(`${API}/category`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getCategories = (token) => {
  return fetch(`${API}/category`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getCategory = (id) => {
  return fetch(`${API}/category/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getCategoryPosts = (id, filter) => {
  return fetch(`${API}/category/${id}/posts?filter=${filter}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteCategory = (token, slug) => {
  return fetch(`${API}/category/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// TAG APIs

export const createTag = (tag, token) => {
  return fetch(`${API}/tag`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getTags = (token) => {
  return fetch(`${API}/tag`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getTag = (id) => {
  return fetch(`${API}/tag/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getTagPosts = (id, filter) => {
  return fetch(`${API}/tag/${id}/posts?filter=${filter}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteTag = (token, slug) => {
  return fetch(`${API}/tag/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// POST APIs

export const getPosts = () => {
  return fetch(`${API}/post`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const createPost = (body, token) => {
  return fetch(`${API}/post`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getPost = (id) => {
  return fetch(`${API}/post/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const editPost = (id, body, token) => {
  return fetch(`${API}/post/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deletePost = (id, token) => {
  return fetch(`${API}/post/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const likePost = (id, token) => {
  return fetch(`${API}/post/${id}/like`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const unlikePost = (id, token) => {
  return fetch(`${API}/post/${id}/unlike`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const shareComment = (id, token, body) => {
  return fetch(`${API}/post/${id}/comment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteComment = (id, comment_id, token) => {
  return fetch(`${API}/post/${id}/comment/${comment_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const increaseViewCount = (id) => {
  return fetch(`${API}/post/${id}/view`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// USER API

export const getUsers = () => {
  return fetch(`${API}/user`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getUser = (id) => {
  return fetch(`${API}/user/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getUserPosts = (id) => {
  return fetch(`${API}/user/${id}/posts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getUserTrends = (id) => {
  return fetch(`${API}/user/${id}/trends`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getUserLikes = (id) => {
  return fetch(`${API}/user/${id}/likes`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getUserComments = (id) => {
  return fetch(`${API}/user/${id}/comments`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateUser = (id, body, token) => {
  return fetch(`${API}/user/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateUserRole = (id, body, token) => {
  return fetch(`${API}/user/${id}/role`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteUser = (id, token) => {
  return fetch(`${API}/user/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateAccount = (id, body, token) => {
  return fetch(`${API}/user/${id}/account`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const sendResetLink = (email) => {
  return fetch(`${API}/user/send-reset-password-link`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const checkPasswordResetLink = (id) => {
  return fetch(`${API}/user/check-reset-password/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const resetPassword = (body) => {
  return fetch(`${API}/user/reset-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// OTHERS
export const getCountries = () => {
  return fetch(`https://restcountries.com/v3.1/all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
