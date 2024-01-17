import { Languages } from '@i18n/constants';
const initialState = {
  language: Languages.ZH_CN, // 默认语言
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default languageReducer;
