/* eslint-disable */
export const GET_POSTS: string = 'POST/GET_POSTS'
export const GET_POST: string = 'POST/GET_POST'
export const ADD_POST: string = 'POST/ADD_POST'
export const DELETE_POST: string = 'DELETE_POST'
export const ADD_COMMENT: string = 'POST/ADD_COMMENT'
export const SHOW_LOADER: string = 'APP/SHOW_LOADER'
export const HIDE_LOADER: string = 'APP/HIDE_LOADER '
export const SHOW_ALERT: string = 'APP/SHOW_ALERT'
export const HIDE_ALERT: string = 'APP/HIDE_ALERT'
/* eslint-enable */

export type ILoder = boolean

export interface IComment {
  body: string
  postId: number
}

interface IAddCommentAction {
  type: typeof ADD_COMMENT
  payload: IComment
}

export interface IPost {
  id: number
  title: string
  body: string
  comments: IComment[]
}

interface IFetchPostAction {
  type: typeof GET_POST
  payload: IPost
}

interface IFetchPostsAction {
  type: typeof GET_POSTS
  payload: Array<IPost>
}

interface IAddPostAction {
  type: typeof ADD_POST
  payload: IPost
}

interface IDeletePostAction {
  type: typeof DELETE_POST
  payload: number
}

interface IShowLoaderAction {
  type: typeof SHOW_LOADER
}

interface IHideLoaderAction {
  type: typeof HIDE_LOADER
}

export type PostActionTypes =
  | IFetchPostsAction
  | IFetchPostAction
  | IAddPostAction
  | IDeletePostAction
  | IAddCommentAction
export type LoaderActionTypes = IShowLoaderAction | IHideLoaderAction
