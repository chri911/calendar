import {createStore} from 'redux';
import {createWrapper} from 'next-redux-wrapper';

const CHANGE_DATE = 'CHANGE_DATE';

export const actions = {
  changeDate: date => ({type: CHANGE_DATE, date})
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_DATE:
            return {...state, date: action.date};
        default:
            return state;
    }
};

const makeStore = (context) => createStore(reducer);

export const wrapper = createWrapper(makeStore, {debug: true});