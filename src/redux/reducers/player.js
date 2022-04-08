const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
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
      score: action.state.points,
      assertions: action.state.correctAnswers.length,
    });
  case 'CHANGE_PICTURE':
    return ({
      ...state,
      picture: action.picture,
    });

  default:
    return state;
  }
}

export default player;
