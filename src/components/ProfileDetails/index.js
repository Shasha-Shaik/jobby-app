import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}
class ProfileDetails extends Component {
  state = {apiStatus: '', profileData: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      const profileDataList = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: profileDataList,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="name-heading">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  getApiCallThroughRetry = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <button
        type="button"
        data-testid="button"
        className="job-item-failure-button"
        onClick={this.getApiCallThroughRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'INPROGRESS':
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {profileData} = this.state
    console.log(profileData)
    return <div>{this.renderJobProfile()}</div>
  }
}
export default ProfileDetails
