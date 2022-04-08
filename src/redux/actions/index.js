export const GET_TOKEN = 'GET_TOKEN';

export const RESULTS = 'RESULTS';

export const CHANGE_SCORE = 'CHANGE_SCORE';

export const CHANGE_PICTURE = 'CHANGE_PICTURE';

export const changeEmail = ({ email, player }) => ({
  type: 'CHANGE_EMAIL', email, player,
});

const getTokenAction = (value) => ({ type: GET_TOKEN, value });

export const changeScore = (state) => ({ type: CHANGE_SCORE, state });

export const changePicture = (picture) => ({ type: CHANGE_PICTURE, picture });

export const getToken = () => async (dispatch) => {
  const url = 'https://opentdb.com/api_token.php?command=request';

  const response = await fetch(url);
  const data = await response.json();

  dispatch(getTokenAction(data.token));
};
