import { axiosInstance } from "./axios";

export const signUp = async (signUpData) => {
    const response = await axiosInstance.post("/auth/signup", signUpData);
    return response.data;
}

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get('/auth/me');
        return res.data;
    } catch (error) {
        console.log("Error in getAuthUser: ", error);
        return null;
    }
}
export const completeOnboarding = async (userData) =>{
    const res = await axiosInstance.post("/auth/onboarding", userData);
    return res.data
    
}

export const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}

export const getUserFriends = async () => {
    const response = await axiosInstance.get('/users/friends');
    return response.data
}
export const getRecommendedFriends = async () => {
    const response = await axiosInstance.get('/users');
    return response.data
}

// outgoindFriendReq
export const getOutFriendsReqs = async () => {
    const response = await axiosInstance.get('/users/outgoing-friend-requests');
    return response.data
}
export const sendFriendReq = async (userId) => {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data
}
export const acceptFriendReqs = async (requestId) => {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data
}

export const getFriendRequests = async () => {
    const response = await axiosInstance.get('/users/friend-requests');
    return response.data
}

export const getStreamToken = async () => {
    const response = await axiosInstance.get('/chat/token');
    return response.data
}

