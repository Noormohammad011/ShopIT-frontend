import axios from 'axios'
import {
  CONTACT_CREATE_FAIL,
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_SUCCESS,
} from '../constants/contactConstants'
export const createContact =
  ({ name, email, subject, message }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CONTACT_CREATE_REQUEST,
      })

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/contact`,
        { name, email, subject, message }
      )

      dispatch({
        type: CONTACT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CONTACT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
