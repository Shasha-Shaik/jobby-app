import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div>
        <Link to="/" className="link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </div>
      <ul className="header-list-items">
        <Link to="/" className="link-item">
          <li className="home-heading home">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="job-heading home">Jobs</li>
        </Link>
      </ul>
      <div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <ul className="ul-sm">
        <Link to="/" className="link-item">
          <li>
            <AiFillHome className="react-icon" />
          </li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li>
            <BsBriefcaseFill className="react-icon" />
          </li>
        </Link>
        <FiLogOut className="react-icon" onClick={onClickLogout} />
      </ul>
    </nav>
  )
}

export default withRouter(Header)
