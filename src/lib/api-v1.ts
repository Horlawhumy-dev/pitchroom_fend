import axios from "axios";

// Create an axios instance for the V1 API
const apiV1 = axios.create({
  baseURL: "http://localhost:3000/pitch-simulator/api/v1",
  withCredentials: true, // Required for cookie-based authentication
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for easy error handling
apiV1.interceptors.response.use(
  (response) => {
    // Return the response body which now contains { message, statusCode, error, data }
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || "An unexpected error occurred.";
    const errorDetails = error.response?.data?.error || null;
    return Promise.reject({
      message,
      error: errorDetails,
      statusCode: error.response?.status || 500
    });
  }
);

export default apiV1;
