import moment from "moment-timezone";
import { axiosInstance } from "./AxiosInstance";

const getHeader = () => {
    const authToken = localStorage.getItem("authToken");
    const timezone = moment.tz.guess(); // Get device's current time zone
    const headers = {
        timezone: timezone,
        Authorization: "Bearer " + authToken, //the token is a variable which holds the token
    };
    return headers;
};

const postRequest = async (path, data) => {
    let res = {
        success: false,
        message: "Something went wrong, please try again later",
    };
    try {
        const response = await axiosInstance.post(path, data, { headers: getHeader() });
        res = response.data;
    } catch (err) {
        res.message = err.response?.data.message || err.message;
        return res;
    }
    return res;
};

const deleteRequest = async (path) => {
    let res = {
        success: false,
        message: "Something went wrong, please try again later",
    };

    try {
        const response = await axiosInstance.delete(path, { headers: getHeader() });
        res = response.data;
    } catch (err) {
        res.message = err.response?.data.message || err.message;
        return res;
    }
    return res;
};

const putRequest = async (path, data) => {
    let res = {
        success: false,
        message: "Something went wrong, please try again later",
    };

    try {
        const response = await axiosInstance.put(path, data, { headers: getHeader() });
        res = response.data;
    } catch (err) {
        res.message = err.response?.data.message || err.message;
        return res;
    }
    return res;
};

const getRequest = async (path) => {
    let res = {
        success: false,
        message: "Something went wrong, please try again later",
    };

    try {
        const response = await axiosInstance.get(path, { headers: getHeader() });
        res = response.data;
    } catch (err) {
        res.message = err.response?.data.message || err.message;
        return res;
    }
    return res;
};


export const loginAPI = async (data) => {
    const path = "auth/login";
    return await postRequest(path, data);
};

// -----------------University APIS---------------------- //
    
export const getUniversityList = async (page = 1, limit = 15) => {
    const path = `university?page=${page}&limit=${limit}`;
    return await getRequest(path);
}

export const addUniversity = async (data) => {
    const path = `university`;
    return await postRequest(path, data);
}

export const updateUniversity = async ({ id, data }) => {
    const path = `university/${id}`;
    return await putRequest(path, data);
}

export const deleteUniversityAPI = async ({ id }) => {
    const path = `university/${id}`;
    return await deleteRequest(path);
}

// -----------------Dashboard APIS---------------------- //

export const getDashboardAPI = async () => {
    const path = `dashboard`;
    return await getRequest(path);
} 

export const getUniversityStudentsList = async ({ universityId, limit ,page}) => {
    const path = `students?university_id=${universityId}&limit=${limit}&page=${page}`;
    return await getRequest(path);
}


// -----------------Modules APIS---------------------- //

export const getModulesAPI = async (page, limit = 15) => {
    let path;
    if (page) {
        path = `modules?page=${page}&limit=${limit}`
    } else {
        path = `modules?all=true`;
    }
    return await getRequest(path);
}

export const createModuleAPI = async (data) => {
    const path = "modules";
    return await postRequest(path, data);
}

export const updateModuleAPI = async ({ id, data }) => {
    const path = `modules/${id}`;
    return await putRequest(path, data);
}

export const deleteModuleAPI = async ({ id }) => {
    const path = `modules/${id}`;
    return await deleteRequest(path);
}


// -----------------Sub Modules APIS---------------------- //

export const getSubModuleAPI = async ({ moduleId, page }) => {
    const path = `sub-module?module_id=${moduleId}&page=${page}`;
    return await getRequest(path);
}

export const getAllSubModuleAPI = async ({ moduleId }) => {
    const path = `sub-module?module_id=${moduleId}&all=true`;
    return await getRequest(path);
}

export const createSubModuleAPI = async (data) => {
    const path = "sub-module";
    return postRequest(path, data);
}

export const updateSubModuleAPI = async ({ id, data }) => {
    const path = `sub-module/${id}`;
    return putRequest(path, data);
}

export const deleteSubModuleAPI = async (id) => {
    const path = `sub-module/${id}`;
    return deleteRequest(path);
}


// -----------------Categories APIS---------------------- //

export const getCategoriesAPI = async ({ moduleId, subModuleId, page }) => {
    let path;
    if (subModuleId) {
        path = `categories?module_id=${moduleId}&sub_module_id=${subModuleId}&page=${page}`
    } else {
        path = `categories?module_id=${moduleId}&page=${page}`;
    }
    return await getRequest(path);
}

export const createCategoriesAPI  = async (data) => {
    const path = "categories";
    return postRequest(path, data);
}

export const updateCategoriesAPI = async ({ id, data }) => {
    const path = `categories/${id}`;
    return putRequest(path, data);
}

export const deleteCategoriesAPI = async (id) => {
    const path = `categories/${id}`;
    return deleteRequest(path);
}


// -----------------Steps APIS---------------------- //

export const createStepsAPI = async (data) => {
    const path = "steps";
    return postRequest(path, data);
}

export const getStepsAPI = async ({categoryId='', page}) => {
    const path = `steps/${categoryId}?page=${page}`;
    return getRequest(path);
}

export const updateStepsAPI = async ({id, data}) => {
    const path = `steps/${id}`;
    return putRequest(path, data);
}

export const deleteStepsAPI = async (id) => {
    const path = `steps/${id}`;
    return deleteRequest(path);
}

export const getStepsDetailAPI = async ({ module_id, sub_module_id="" }) => {
    const path = `steps/detail?module_id=${module_id}&sub_module_id=${sub_module_id}`;
    return getRequest(path);
}
