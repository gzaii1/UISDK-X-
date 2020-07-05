import { combineReducers } from 'redux';
import { HomeReducer } from './Home.reducer'
import { LoginReducer } from './Login.reducer'
const rootReducer = combineReducers({
    HomeReducer,
    LoginReducer,
});

export default rootReducer;