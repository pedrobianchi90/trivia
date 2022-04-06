export const changeEmail = ({ email, player }) => ({
  type: 'CHANGE_EMAIL', email, player,
});

export const GET_TOKEN = 'GET_TOKEN';

export const RESULTS = 'RESULTS';

const getTokenAction = (value) => ({ type: GET_TOKEN, value });

// const resultsAction = (value) => ({ type: RESULTS, value });

export const getToken = () => async (dispatch) => {
  const url = 'https://opentdb.com/api_token.php?command=request';

  const response = await fetch(url);
  const data = await response.json();

  dispatch(getTokenAction(data.token));
};

// export const getAPI = (tokenValue) => async (dispatch) => {
//   const url = `https://opentdb.com/api.php?amount=5&token=${tokenValue}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   const { results } = data;
//   dispatch(resultsAction(results));
// };
