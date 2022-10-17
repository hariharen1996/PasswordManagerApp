import {Component} from 'react'
import './index.css'

class PasswordItem extends Component {
  render() {
    const {item, deleteProfile, checkPassword} = this.props
    const {website, username, password, colors, id} = item

    const deleteData = () => {
      deleteProfile(id)
    }
    return (
      <li className="password-lists">
        <div className={colors}>
          <p className="image-start-text">{website.split('').slice(0, 1)}</p>
        </div>
        <div className="pass-content">
          <p className="pass-text">{website}</p>
          <p className="pass-text">{username}</p>
          {checkPassword ? (
            <p className="pass-text">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              className="star-img"
              alt="stars"
            />
          )}
        </div>
        <div className="btn-list-container">
          <button
            type="button"
            className="delete-btn"
            // eslint-disable-next-line react/no-unknown-property
            testId="delete"
            onClick={deleteData}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
              className="btn-img"
              alt="delete"
            />
          </button>
        </div>
      </li>
    )
  }
}

export default PasswordItem
