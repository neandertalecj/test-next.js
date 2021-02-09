import * as t from '../types'
import { Reducer } from 'redux'

interface State {
  fetchedPosts: Array<t.IPost>
  fetchedPost: Array<t.IPost>
}

const initialState: State = {
  fetchedPosts: [],
  fetchedPost: [
    {
      id: 0,
      title: '',
      body: '',
      comments: {
        body: '',
        postId: 0,
      },
    },
  ],
}

const postReducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_POSTS:
      return {
        ...state,
        fetchedPosts: action.payload,
      }
    case t.GET_POST:
      return {
        ...state,
        fetchedPost: action.payload,
      }
    case t.ADD_POST:
      return {
        ...state,
        fetchedPosts: state.fetchedPosts.concat(action.payload),
      }
    case t.DELETE_POST:
      console.log('DELETE_POST', action.payload)
      return {
        ...state,
        fetchedPosts: state.fetchedPosts.filter(({ id }) => id !== action.payload),
      }
    default:
      return { ...state }
  }
}

export default postReducer
