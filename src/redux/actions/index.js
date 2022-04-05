/* export const ACTION = (state) => ({ type: 'ACTION', state }); */
export const GET_TOKEN = 'GET_TOKEN';

const getTokenAction = (value) => ({ type: GET_TOKEN, value });

export const getToken = () => async (dispatch) => {
  const url = 'https://opentdb.com/api_token.php?command=request';

  const response = await fetch(url);
  const data = await response.json();

  dispatch(getTokenAction(data.token));
};
