import axios from "axios"

const API_URL= "http://localhost:5000/api/users"

export const getAllUsers=async()=>{
    try {
        const response= await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error("error getting users")
        throw error
    }
}
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
  } catch (error) {
      console.error("API error:", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : { error: "An unexpected error occurred" };
  }
};

export const verifyUser = async (verifyCode, email) => {
  try {
      const response = await axios.post(`${API_URL}/verify`, { verifyCode, email });
      return response.data;
  } catch (error) {
      console.error("error getting users");
      throw error;
  }
};

export const login = async (identifier, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { identifier, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const getCurrentUser = async (userId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

  
  export const updateUser=async(id,updatedUser)=>{
    try{
        
        const response=await axios.put(
            `${API_URL}/update_user/${id}`,updatedUser)
            return response.data
    }
    catch(error){
        console.log("erreur"+error.message)
        throw error

    }
}
export const deleteUser=async(id,)=>{
  try{
      console.log("donnees mises a jour:")
      const response=await axios.delete(
          `${API_URL}/delete/${id}`)
          return response.data
  }
  catch(error){
      console.log("erreur"+error.message)
      throw error

  }
}

export const getStById = async (userId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}/get/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgetpassword`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (token, email, newPassword) => {
  try {
    const response = await axios.post(
      `${API_URL}/resetpassword/${token}`,
      { email, newPassword }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const searchUser = async (searchParams) => {
  try {
    const { fullName, email, mobile, id, role } = searchParams

    const params = new URLSearchParams()
    if (fullName) params.append('fullName', fullName)
    if (email) params.append('email', email)
    if (mobile) params.append('mobile', mobile)
    if (id) params.append('id', id)
    if (role) params.append('role', role)

    const response = await axios.get(`${API_URL}/search?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error('Error searching users:', error)
    throw error
  }
}

export const updatePassword = async (email, currentPassword, newPassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/update_password`,
      { email, currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};