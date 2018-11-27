import { combineReducers } from 'redux'

import rootReducer from './rootReducer'
import simpleReducer from './simpleReducer'

export default combineReducers({
	rootReducer,
	simpleReducer,
})
