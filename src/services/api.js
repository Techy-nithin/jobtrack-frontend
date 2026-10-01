import axios from "axios";
import apiClient from "./apiClient";

export async function loginUser(email, password) {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }

    throw new Error("Unable to connect to the server");
  }
}

export async function testBackend() {
  try {
    const response = await apiClient.get("/api/test");

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser(name, email, password) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      {
        name: name,
        email: email,
        password: password,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);

    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }

    throw new Error("Unable to connect to the server");
  }
}

export async function getApplications() {
  try {
    const response = await apiClient.get("/api/applications");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createApplication(application) {
  try {
    const response = await apiClient.post("/api/applications", application);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateApplication(id, application) {
  try {
    const response = await apiClient.put(
      `/api/applications/${id}`,
      application,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getApplicationById(id) {
  try {
    const response = await apiClient.get(`/api/applications/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteApplication(id) {
  try {
    const response = await apiClient.delete(`/api/applications/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getInterviews(applicationId) {
  try {
    const response = await apiClient.get(
      `/api/applications/${applicationId}/interviews`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createInterview(applicationId, interview) {
  try {
    const response = await apiClient.post(
      `/api/applications/${applicationId}/interviews`,
      interview,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteInterview(applicationId, interviewId) {
  try {
    const response = await apiClient.delete(
      `/api/applications/${applicationId}/interviews/${interviewId}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateInterview(applicationId, interviewId, interview) {
  try {
    const response = await apiClient.put(
      `/api/applications/${applicationId}/interviews/${interviewId}`,
      interview,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
