const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function myReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default myReducer;
