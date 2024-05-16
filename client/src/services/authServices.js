import axios from 'axios';

export const signup = async ({name, email, password}) => {
    try {
        const {data} = await axios.post('/api/auth/sign-up', {
            name,
            email,
            password
        });
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export const signin = async ({email, password}) => {
    try {
        const {data} = await axios.post('/api/auth/sign-in', {
            email,
            password
        });
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}