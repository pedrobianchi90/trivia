const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_EMAIL':
    return ({
      ...state,
      name: action.player,
      gravatarEmail: action.email,
    });
  case 'CHANGE_SCORE':
    return ({
      ...state,
      score: action.points,
    });
  default:
    return state;
  }
}

export default player;
