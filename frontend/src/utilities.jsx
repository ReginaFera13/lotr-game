import axios from "axios";

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
  });

export const login = async (email, password) => {
    let response = await api.post('users/login/', {
      email: email,
      password: password,
    });
    if (response.status === 200 || response.status === 201) {
      let token = response.data.token;
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      localStorage.setItem("token", token);
      return response.data.user;
    } else {
      alert("Log In failed");
    }
  };

export const getInfo = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    let response = await api.get("users/");
    return response.data;
  } else {
    return null;
  }
};

export const logout = async () => {
  let response = await api.post("users/logout/");
  if (response.status === 204) {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    return null;
  }
  alert("log out failed");
};

export const deleteProfile = async () => {
  try {
    const response = await api.delete("users/delete_user/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      return null;
    } else {
      throw new Error("Failed to delete user account");
    }
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
  }
};

export const createAGame = async(diff, userId)=> {
  let response = await api.post('saved_games/', {
    'diff_level':diff,
    'user_id': userId
  })
  if (response.status === 201){
    alert("New game has been created")
    return response.data
  }
  alert("Failed to create game")
  return null
}

export const saveAGame = async(scene_state)=> {
  let response = await api.put('saved_games/1/', {
    'scene_state':scene_state,
  })
  if (response.status === 200){
    return response.data
  }
  return null
}