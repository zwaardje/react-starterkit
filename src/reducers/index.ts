import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { languages } from './languages';

export default history => combineReducers({
    languages,
    router: connectRouter(history),
});
