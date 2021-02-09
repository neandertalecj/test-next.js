import { connect } from 'react-redux'
import { fetchPosts } from '../redux/actions/main'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import Layout from '../components/Layout'
import { IPost, ILoder } from '../redux/types'
import Spiner from '../components/Spiner'
import { UL } from '../components/styledComponents/general'
import React from 'react'

interface IHomePops {
  fetchPosts: () => {}
  fetchedPosts: Array<IPost>
  loading: ILoder
}

const Home: React.FC<IHomePops> = (props) => {
  const { fetchedPosts, loading } = props

  if (loading) {
    return <Spiner />
  }

  return (
    <Layout title="Posts">
      <div>
        <main className="container">
          <h1 className="main-title">Lates posts</h1>
          <UL>
            {fetchedPosts
              .map((post) => (
                <li key={post.id}>
                  <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                    <a className="article-title">{post.title}</a>
                  </Link>
                  <div>{post.body}</div>
                  <div>
                    <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                      <a>
                        <i className="under">red more...</i>
                      </a>
                    </Link>
                  </div>
                </li>
              ))
              .reverse()}
          </UL>
        </main>
      </div>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: bindActionCreators(fetchPosts, dispatch),
  }
}

const mapStateToProps = (state) => ({
  fetchedPosts: state.posts.fetchedPosts,
  loading: state.app.loading,
})

Home.getInitialProps = async (ctx) => {
  if (!ctx.req) {
    return { post: null }
  }
  await ctx.store.dispatch(fetchPosts())

  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
