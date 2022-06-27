import {
  FETCH_ALL_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../constants/actionTypes";
import * as api from "../api";

//Action Creators

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCategory();

    dispatch({ type: FETCH_ALL_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    const { data } = await api.createCategory(category);

    dispatch({ type: CREATE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = (id, category) => async (dispatch) => {
  try {
    const { data } = await api.updateCategory(id, category);

    dispatch({ type: UPDATE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = (id, productId) => async (dispatch) => {
  try {
    await api.deleteCategory(id);

    for (let index = 0; index < productId.length; index++) {
      const id = productId[index];
      await api.deleteProduct(id);
    }

    dispatch({ type: DELETE_CATEGORY, payload: id });
  } catch (error) {
    console.log(error);
  }
};
