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

export const fetchTeam = async (charIds) => {
  console.log('charIds', charIds)
  try {
      const characters = await Promise.all(charIds.map(async (charId) => {
        console.log('charId', charId)
          const response = await api.get(`dev_characters/${charId}/`);
          console.log('response', response)
          console.log('response data',response.data)
          const chars = response.data
          // console.log('chars', chars)
          return chars
      }));
      
  } catch (error) {
      console.error("Error fetching characters:", error);
  }
};

export const setActivePlayer = async (charId) => {
  try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/dev_characters/${charId}/`);
      const character = response.data;
      setPlayer([character]);
  } catch (error) {
      console.error("Error fetching characters:", error);
  }
};

export const getTeamInfo = async (team) => {
  if (team) {
      let allCharInfo = []
      for (let i = 0; i < team.length; i++) {
          const theOneId = team[i].char_id
          const myId = team[i].id
          const reponse = await axios.get(`http://127.0.0.1:8000/api/v1/the_one_api/${theOneId}/`)
          const char = reponse.data.docs[0] 
          allCharInfo[myId] = char;
      }
      setTeamInfo(allCharInfo)
  } else {
      console.log("Team is undefined")
  }
}

export const getTeamStats = async (team) => {
  try {
      const teamStatsObject = []; // Array to store stats objects
  
      // Iterate through each character in the team
      for (const character of team) {
          const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_characters/${character.id}`);
          const stats = response.data;
          
          // Push the stats object to the teamStatsObject array
          teamStatsObject.push(stats);
      }

      // Set the team stats array
      setTeamStats(teamStatsObject);
  } catch (error) {
      console.error("Error fetching team stats:", error);
  }
}