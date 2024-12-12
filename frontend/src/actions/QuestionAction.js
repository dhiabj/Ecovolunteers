import axios from "axios";
import {
  FETCH_QUESTIONS,
  ADD_MARK,
  FETCH_QUESTION,
  ATTEMP_QUES,
  CLEAR_STATE,
} from "./QuestionType";

export const fetchQustions = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/Question/questions");
  
    dispatch({
      type: FETCH_QUESTIONS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchQustion = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:5000/Question/question/${id}`);
  dispatch({
    type: FETCH_QUESTION,
    payload: response.data,
  });
};
export const addMark = () => {
  return {
    type: ADD_MARK,
  };
};

export const attempQues = (id) => {
  return {
    type: ATTEMP_QUES,
    payload: id,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
    payload: {},
  };
};
export const clearQsState = () => {
  return {
    type: "CLEAR_QUESTION_STATE",
    payload: null,
  };
};

export const timeOut = (time) => {
  return {
    type: "TIME_OUT",
    payload: time,
  };
};

