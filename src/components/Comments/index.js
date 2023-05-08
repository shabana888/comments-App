import {Component} from 'react'
import './index.css'
import {v4 as uuidV4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    commentList: [],
    name: '',
    comment: '',
    count: 0,
  }

  userName = event => {
    this.setState({name: event.target.value})
  }

  userComment = event => {
    this.setState({comment: event.target.value})
  }

  submitPage = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const colorClassName =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    console.log(colorClassName)
    const newList = {id: uuidV4(), name, comment, colorClassName, isLike: false}
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newList],
      name: '',
      comment: '',
      count: prevState.count + 1,
    }))
  }

  delete = id => {
    const {commentList} = this.state
    const filterList = commentList.filter(each => each.id !== id)
    this.setState(prevState => ({
      commentList: filterList,
      count: prevState.count - 1,
    }))
  }

  like = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(each => {
        if (id === each.id) {
          return {...each, isLike: !each.isLike}
        }
        return each
      }),
    }))
  }

  render() {
    const {name, comment, commentList, count} = this.state

    return (
      <>
        <div className="bgContainer">
          <div className="formContainer">
            <div>
              <div className="headContainer">
                <h1 className="head">Comments</h1>
              </div>
              <div className="paraCont">
                <p className="para">Say something about 4.0 Technologies</p>
                <form className="form" onSubmit={this.submitPage}>
                  <input
                    className="inputName"
                    type="text"
                    placeholder="Your Name"
                    onChange={this.userName}
                    value={name}
                  />
                  <textarea
                    className="textarea"
                    placeholder="Your Comment"
                    rows="7"
                    cols="37"
                    onChange={this.userComment}
                    value={comment}
                  />
                  <button className="button" type="submit">
                    Add Comment
                  </button>
                </form>
              </div>
            </div>
            <div className="imageContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                className="image"
                alt="comments"
              />
            </div>
          </div>
        </div>
        <hr className="hr" />

        <div className="commentHead">
          <div className="number">{count}</div>
          <p className="para">Comments</p>
        </div>

        <ul className="list">
          {commentList.map(each => (
            <CommentItem
              item={each}
              key={each.id}
              deleteComment={this.delete}
              toggleLike={this.like}
            />
          ))}
        </ul>
      </>
    )
  }
}
export default Comments
