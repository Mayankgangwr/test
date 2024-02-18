// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/questions';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getQuestions = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const addQuestion = async (questionData) => {
  try {
    const response = await api.post('/', questionData);
    return response.data;
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    const response = await api.put(`/${questionId}`, questionData);
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await api.delete(`/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};

// Add other functions as needed
