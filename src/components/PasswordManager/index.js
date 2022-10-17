import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem/index'
import './index.css'

const backgroundColors = [
  'yellow',
  'green',
  'orange',
  'lightgreen',
  'meroon',
  'blue',
  'silver',
  'violet',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    data: [],
    searchData: '',
    checkPassword: false,
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  onUserChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  searchInput = event => {
    this.setState({searchData: event.target.value})
  }

  onAddForm = event => {
    event.preventDefault()
    const {website, password, username} = this.state
    const randomColors = `image-list-container ${
      backgroundColors[Math.ceil(Math.random() * backgroundColors.length - 1)]
    }`

    if (website !== '' && username !== '' && password !== '') {
      const newData = {
        id: uuidv4(),
        website,
        username,
        password,
        colors: randomColors,
      }
      this.setState(prevState => ({
        data: [...prevState.data, newData],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  deleteProfile = id => {
    const {data} = this.state
    const deleteId = data.filter(item => item.id !== id)
    this.setState({data: deleteId})
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      checkPassword: !prevState.checkPassword,
    }))
  }

  render() {
    const {
      data,
      website,
      username,
      password,
      searchData,
      checkPassword,
    } = this.state

    const filterData = data.filter(item =>
      item.website.toLowerCase().includes(searchData.toLowerCase()),
    )
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
            className="logo"
            alt="app logo"
          />
        </div>
        <div className="manager-card">
          <div className="form-container">
            <form className="form" onSubmit={this.onAddForm}>
              <h1 className="form-text">Add New Password</h1>
              <div className="input-flex">
                <div className="web-img">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="img-logo"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={website}
                  onChange={this.onWebsiteChange}
                />
              </div>
              <div className="input-flex">
                <div className="web-img">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="img-logo"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={username}
                  onChange={this.onUserChange}
                />
              </div>
              <div className="input-flex">
                <div className="web-img">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="img-logo"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={password}
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="btn">
                  Add
                </button>
              </div>
            </form>
            <div className="image-container-lg">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                className="side-img"
                alt="password manager"
              />
            </div>
            <div className="image-container-sm">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                className="side-img"
                alt="password manager"
              />
            </div>
          </div>
        </div>

        <div className="password-container">
          <div className="count-search-container">
            <div className="count">
              <h1 className="count-text">Your Passwords</h1>
              <div className="count-bg">
                <button type="button" className="counter">
                  <p> {filterData.length}</p>
                </button>
              </div>
            </div>
            <div className="search-container">
              <div className="web-img">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search"
                />
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchData}
                onChange={this.searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              value={checkPassword}
              onChange={this.onShowPassword}
              id="changePassword"
              className="check"
            />
            <label htmlFor="changePassword" className="check-text">
              Show Passwords
            </label>
          </div>
          {filterData.length === 0 ? (
            <div className="no-password-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  className="no-pass-img"
                  alt="no passwords"
                />
                <p className="no-pass-text">No Passwords</p>
              </div>
            </div>
          ) : (
            <ul className="password-card">
              {filterData.map(item => (
                <PasswordItem
                  key={item.id}
                  item={item}
                  deleteProfile={this.deleteProfile}
                  checkPassword={checkPassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
