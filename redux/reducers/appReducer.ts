import * as t from '../types'
import { ILoder } from '../types'
import { Reducer } from 'redux'

type State = {
  loading: ILoder
  alert?: boolean
}

const initialState: State = {
  loading: false,
  alert: null,
}

const appReducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case t.SHOW_LOADER:
      return { ...state, loading: true }
    case t.HIDE_LOADER:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default appReducer
