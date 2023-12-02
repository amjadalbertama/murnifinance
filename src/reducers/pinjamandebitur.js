// import { add } from "numeral";

const pinjamandebitur = (state, action) => {
  state=[];
  switch (action.type) {
    case 'SET_PINJDEBITUR':
      return [...state, ...action.payload];
    case 'DELETE_PINJDEBITUR':
      return [...state];
    default:
      return state;
  }
};

export default pinjamandebitur;
