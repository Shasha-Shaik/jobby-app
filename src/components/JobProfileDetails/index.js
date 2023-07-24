import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import JobFiltersGroup from '../JobFiltersGroup'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobProfileDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    employmentType: [],
    salaryPackage: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileItems()
  }

  getProfileItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {employmentType, salaryPackage, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryPackage}&search=${searchInput}`
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmployment = type => {
    const {employmentType} = this.state

    const idAlreadyInList = employmentType.filter(each => each === type)
    if (idAlreadyInList.length === 0) {
      this.setState(
        prev => ({
          employmentType: [...prev.employmentType, type],
        }),
        this.getProfileItems,
      )
    } else {
      const filteredData = employmentType.filter(each => each !== type)
      this.setState({employmentType: filteredData}, this.getProfileItems)
    }
  }

  salaryRangesListType = type => {
    this.setState({salaryPackage: type}, this.getProfileItems)
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getProfileItems()
    }
  }

  getInputElement = () => {
    const {searchInput} = this.state
    return (
      <div className="input-search-container-lg">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onKeyDown}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.getProfileItems}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobsList} = this.state
    const jobsDisplay = jobsList.length > 0
    return jobsDisplay ? (
      <ul className="job-details-item-container">
        {jobsList.map(eachData => (
          <JobCard key={eachData.id} jobDetails={eachData} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  getJobApiCallThroughRetry = () => {
    this.getProfileItems()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobApiCallThroughRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="job-profile-app-container-1">
        <div className="job-profile-app-container-2">
          <div>
            <div className="input-search-container-sm">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDown}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.getProfileItems}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>

          <JobFiltersGroup
            employmentTypesList={employmentTypesList}
            onChangeEmployment={this.onChangeEmployment}
            salaryRangesList={salaryRangesList}
            salaryRangesListType={this.salaryRangesListType}
          />
        </div>
        <div className="job-profile-app-container-2-lg">
          <div>{this.getInputElement()}</div>

          {this.renderJobProfileDetailsList()}
        </div>
      </div>
    )
  }
}
export default JobProfileDetails
