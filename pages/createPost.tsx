import { connect } from 'react-redux'
import { addPost } from '../redux/actions/main'
import { bindActionCreators } from 'redux'
import Layout from '../components/Layout'
import { IPost, ILoder } from '../redux/types'
import { useState } from 'react'
import React from 'react'
import Spiner from '../components/Spiner'
import { Input, Textarea, FormBox, InputBtn, UL } from '../components/styledComponents/general'

interface INewPostPops {
  addPost: () => {}
  fetchedPosts: Array<IPost>
  loading: ILoder
}

function newPost(props) {
  const [state, setState] = useState({
    inputVal: '',
    textareaVal: '',
    selectVal: 1,
  })
  const [valid, setValid] = useState({ flagInput: false, flagText: false, err: [] })

  const { addPost, loading } = props

  function handleInputChange(e) {
    const {
      target: { value: inputVal },
    } = e
    setState({
      ...state,
      inputVal,
    })
  }

  function handleTexareaChange(e) {
    const {
      target: { value: textareaVal },
    } = e
    setState({
      ...state,
      textareaVal,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (state.inputVal.length < 5) {
      if (!valid.flagInput) {
        setValid({ ...valid, flagInput: true, err: ['The title should be longer than 5 characters'] })
      } else {
        setValid({ ...valid, flagInput: false, err: [] })
      }
    } else if (state.textareaVal.length < 10) {
      if (!valid.flagInput) {
        setValid({ ...valid, flagText: true, err: ['The article should be longer than 10 characters'] })
      }
      console.log('Text mast be longer then 5 charaters')
    } else {
      setValid({ flagInput: false, flagText: false, err: [] })
      addPost({
        title: state.inputVal,
        body: state.textareaVal,
      })
      setState({
        inputVal: '',
        textareaVal: '',
        selectVal: 1,
      })
    }
  }

  if (loading) {
    return <Spiner />
  }

  return (
    <Layout title="Create page">
      <FormBox>
        <h1>Create a new post</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={state.inputVal}
            onChange={handleInputChange}
            style={{ borderColor: valid.flagInput ? 'red' : 'grey' }}
          />
          <br />
          <br />
          <Textarea value={state.textareaVal} onChange={handleTexareaChange} />
          <UL>
            {valid.err.map((item: string, i: number) => (
              <li key={i}>
                <p className="error-text">{item}</p>
              </li>
            ))}
          </UL>
          <br />
          <br />
          <InputBtn
            type="submit"
            value="Create Post"
            color="grey"
            style={{ borderColor: valid.flagText ? 'red' : 'grey' }}
          />
        </form>
      </FormBox>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch: any): any => {
  return {
    addPost: bindActionCreators(addPost, dispatch),
  }
}

const mapStateToProps = (state: any): any => ({
  fetchedPosts: state.posts.fetchedPosts,
  loading: state.app.loading,
})

export default connect<typeof mapStateToProps, typeof mapDispatchToProps, INewPostPops>(
  mapStateToProps,
  mapDispatchToProps,
)(newPost)
