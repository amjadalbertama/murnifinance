const setDebitur = (payload) => ({
  type: 'SET_DEBITUR',
  payload,
});

const setUser = (payload) => ({
  type: 'SET_USER',
  payload,
});

const setProfile = (payload) => ({
  type: 'SET_PROFILE',
  payload,
});

const delpinjmanandebitur = (payload) => ({
  type: 'DELETE_PINJDEBITUR',
  payload,
});

const setpinjmanandebitur = (payload) => ({
  type: 'SET_PINJDEBITUR',
  payload,
});

export {setDebitur, setUser, setProfile, setpinjmanandebitur, delpinjmanandebitur};
