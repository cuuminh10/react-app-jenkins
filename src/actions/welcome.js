import {
  GET_MEMBER, GET_EXAMPLE, GET_STATUS
} from 'src/actions/types';

import GMCService from '../services/gmc.service';

export const getMembers = () => async (dispatch) => {
  try {
    const res = await GMCService.getMembers();
    dispatch({
      type: GET_MEMBER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getExamples = () => async (dispatch) => {
  try {
    const res = await GMCService.getExamples();
    dispatch({
      type: GET_EXAMPLE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getStatus = () => async (dispatch) => {
  try {
    const res = await GMCService.getStatus();
    dispatch({
      type: GET_STATUS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

const mapApiCallSelectOptions = {
  status: getStatus
};

export default mapApiCallSelectOptions;
