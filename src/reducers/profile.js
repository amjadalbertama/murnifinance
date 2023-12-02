const profileState ={
 name: 'Eko Purnomo',
 no_hp: '0239229283',
 email: 'okePurnomo@gmail.com',

};

const profile = (state = profileState, action) => {
    switch (action.type) {
      case 'ADD_PROFILE':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ];
      case 'SET_PROFILE':
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };
  
  export default profile;