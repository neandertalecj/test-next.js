import * as t from '../types'
import axios from 'axios'

export const fetchPosts = () => async (dispatch): Promise<any> => {
  dispatch(showLoader())
  await axios
    .get('https://simple-blog-api.crew.red/posts')
    .then((res) => res.data)
    .then((res) =>
      dispatch({
        type: t.GET_POSTS,
        payload: res,
      }),
    )
    .catch((err) => console.log(err))
    .then(() => dispatch(hideLoader()))
}

export const fetchPost = (id: number): t.PostActionTypes => async (dispatch): Promise<any> => {
  dispatch(showLoader())
  axios
    .get(`https://simple-blog-api.crew.red/posts/${id}?_embed=comments`)
    .then((res) => res.data)
    .then((res) =>
      dispatch({
        type: t.GET_POST,
        payload: res,
      }),
    )
    .catch((err) => console.log(err))
    .then(() => dispatch(hideLoader()))
}

export const addPost = (newPost: t.IPost): t.PostActionTypes => async (dispatch): Promise<any> => {
  await axios
    .post(`https://simple-blog-api.crew.red/posts`, newPost)
    .then((res) => res.data)
    .then((res) => console.log('ADD POST ACTION', res))
    .then(() =>
      dispatch({
        type: t.ADD_POST,
        payload: newPost,
      }),
    )
    .catch((err) => console.log(err))
}

export const deletePost = (id: number): Promise<t.PostActionTypes> => async (dispatch): Promise<any> => {
  console.log('ACTION DELETE', id)
  await axios
    .delete(`https://simple-blog-api.crew.red/posts/${id}`)
    .then(() =>
      dispatch({
        type: t.DELETE_POST,
        payload: id,
      }),
    )
    .catch((err) => console.log(err))
}

export function showLoader(): t.LoaderActionTypes {
  return {
    type: t.SHOW_LOADER,
  }
}

export function hideLoader(): t.LoaderActionTypes {
  return {
    type: t.HIDE_LOADER,
  }
}
