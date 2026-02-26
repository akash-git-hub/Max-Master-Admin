import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl = process.env.REACT_APP_API_URL;

/// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: baseUrl,
});

// Interceptor to handle 401 responses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            handleSessionExpired();
        }
        return Promise.reject(error);
    }
);

const handleSessionExpired = () => {
    Swal.fire({
        title: "Session Expired",
        text: "Your session has been expired. Please login again!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    }).then((result) => {
        if (result.isConfirmed) {
            redirectToLogin();
        }
    });

    // Attach a click event listener to the document to detect any click
    document.addEventListener("click", redirectToLogin);
};

const redirectToLogin = () => {
    // Clean up localStorage and redirect to login
    localStorage.removeItem("authToken");
    localStorage.removeItem("profileData");
    localStorage.removeItem("loggedIn");

    // Remove the click event listener after redirection
    document.removeEventListener("click", redirectToLogin);

    // Navigate to the login screen
    window.location.href = '/';
};