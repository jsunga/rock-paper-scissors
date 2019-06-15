const INITIAL_STATE = {
  choice: '',
  message: '',
};

const finalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_CHOICE':
    return {
      ...state,
      choice: action.choice,
    };
    case 'UPDATE_MESSAGE':
    return {
      ...state,
      message: action.message,
    };
    default:
      return state;
  }
};

export default finalReducer;