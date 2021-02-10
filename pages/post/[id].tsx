import { connect } from 'react-redux'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { bindActionCreators } from 'redux'
import { fetchPost, deletePost } from '../../redux/actions/main'
import { IPost, ILoder } from '../../redux/types'
import { useState } from 'react'
import Spiner from '../../components/Spiner'
import { Textarea, InputBtn, UL, InputBtnDel } from '../../components/styledComponents/general'
import axios from 'axios'
/* eslint-disable */
interface IPostPops {
  fetchPost: () => {}
  deletePost: () => {}
  fetchedPost: IPost
  id: number
  loading: ILoder
}
/* eslint-enable */

function Post(props: IPostPops) {
  const [state, setState] = useState({ textareaVal: '' })
  const [valid, setValid] = useState({ flag: false, err: [] })
  const [hidden, setHidden] = useState('')

  if (props.loading) {
    return <Spiner />
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
    if (state.textareaVal.length < 5) {
      if (!valid.flag) {
        setValid({ flag: true, err: [...valid.err, 'The comment should be longer than 5 characters'] })
      }
    } else {
      setValid({ flag: false, err: [] })
      const comm = {
        body: state.textareaVal,
        postId: props.fetchedPost.id,
      }
      axios
        .post(`https://simple-blog-api.crew.red/comments`, comm)
        .then((res) => res.data)
        .then(() => {
          setState({
            textareaVal: '',
          })
        })
    }
  }
/* eslint-disable */
  function handleDelete(id) {
    console.log(' handleDelete', id)
    props.deletePost(id)
    setHidden(true)
  }
/* eslint-able */
  return (
    <Layout title="Post">
      <main style={{ display: hidden && 'none' }}>
        <h1>{props.fetchedPost.title}</h1>
        <p>{props.fetchedPost.body}</p>
        <br />
        <br />
        <Link href={'/'}>
          <a>Back to all posts</a>
        </Link>
        <br />
        <br />
        <hr />
        <h3>Comments</h3>
        <div>
          <UL>
            {props.fetchedPost.comments.map(({ postId, body }) => (
              <li key={postId}>
                <p>{body}</p>
                <hr />
              </li>
            ))}
          </UL>
        </div>
        <form onSubmit={handleSubmit}>
          <Textarea value={state.textareaVal} onChange={handleTexareaChange} />
          <UL>
            {valid.err.map((item: string) => (
              <li>
                <p className="error-text">{item}</p>
              </li>
            ))}
          </UL>
          <br />
          <br />
          <InputBtn type="submit" value="Comment" />
        </form>
        <br />
        <InputBtnDel type="button" value="Delete Post" onClick={() => handleDelete(props.fetchedPost.id)} />
        <br />
      </main>
      <section className="removed-post" style={{ display: !hidden && 'none' }}>
        <Link href={'/'}>
          <a>Back to all posts</a>
        </Link>
      </section>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: bindActionCreators(fetchPost, dispatch),
    deletePost: bindActionCreators(deletePost, dispatch),
  }
}

const mapStateToProps = (state) => ({
  fetchedPost: state.posts.fetchedPost,
  loading: state.app.loading,
})

Post.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(fetchPost(parseInt(ctx.query.id)))
  return { id: parseInt(ctx.query.id) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
