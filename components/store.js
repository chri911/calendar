import {createStore} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

const CHANGEDATE = 'CHANGEDATE';

export const actions = {
  changeDate: date => ({type: CHANGEDATE, date})
};

const reducer = (state = {date: new Date()}, action) => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};
        case CHANGEDATE:
            console.log(123, action.payload, action.date);
            // return {...state, date: action.payload};
            return {...state, date: action.Date};
        default:
            return state;
    }
};
// export const makeStore = (initialState) => {
//     return createStore(reducer, initialState);
// };
const makeStore = context => createStore(reducer);

export const wrapper = createWrapper(makeStore, {debug: true});