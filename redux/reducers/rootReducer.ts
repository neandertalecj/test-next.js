import { combineReducers } from 'redux'
import postReducer from './postReduser'
import appReducer from './appReducer'

const rootReducer = combineReducers({
  posts: postReducer,
  app: appReducer,
})

export default rootReducer
