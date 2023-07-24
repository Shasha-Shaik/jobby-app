import './index.css'
import {Component} from 'react'
import Header from '../Header'
import JobProfileDetails from '../JobProfileDetails'

class Jobs extends Component {
  render() {
    return (
      <div>
        <Header />
        <JobProfileDetails />
      </div>
    )
  }
}
export default Jobs
