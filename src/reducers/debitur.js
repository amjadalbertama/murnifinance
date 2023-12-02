// import { add } from "numeral";

const debitur = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DEBITUR':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default debitur;
