import axiosInstance from "../baseapi";
import { API_ENDPOINTS } from "../constants";

export class UserService {
    async getAllUsers() {
        try {
            const { data } = await axiosInstance.get(`${API_ENDPOINTS.DISPLAY_USERS_LIST}`);
            return data;
        } catch (error) {
            console.log('Error fetching data:', error.message);
            return error;
        }
    }
    async postUsers(userPayload) {
        try {
            const { data } = await axiosInstance.post(`${API_ENDPOINTS.CREATE_USERS_LIST}`, { ...userPayload });
            return data;
        } catch (error) {
            console.log('Error fetching data:', error.message);
            return error;
        }
    }
    async updateUsers(userPayload, id) {
        try {
            const { data } = await axiosInstance.put(`${API_ENDPOINTS.UDPATE_USER}${id}`, { ...userPayload });
            return data;
        } catch (error) {
            console.log('Error fetching data:', error.message);
            return error;
        }
    }
    async deleteUsers(id) {
        try {
            const { data } = await axiosInstance.delete(`${API_ENDPOINTS.DELETE_USER}${id}`);
            return data;
        } catch (error) {
            console.log('Error fetching data:', error.message);
            return error;
        }
    }
    async uploadFile(uploadedImage) {
        try {
            const { data } = await axiosInstance.post(API_ENDPOINTS.UPLOAD_IMAGE, uploadedImage,
                {
                    headers: { "content-type": "multipart/form-data" }
                }
            );
            return data;
        } catch (error) {
            console.log('Error fetching data:', error.message);
            return error;
        }
    }


}