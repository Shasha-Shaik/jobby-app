import './index.css'
import ProfileDetails from '../ProfileDetails'

// const employmentList = []
const JobFiltersGroup = props => {
  const getRenderEmploymentTypeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(each => {
      const {onChangeEmployment} = props
      const onChangeEmploymentType = event =>
        onChangeEmployment(event.target.value)

      return (
        <li
          className="list-items"
          key={each.employmentTypeId}
          onChange={onChangeEmploymentType}
        >
          <input
            type="checkbox"
            className="input-type"
            id={each.employmentTypeId}
            value={each.employmentTypeId}
          />
          <label className="label" htmlFor={each.employmentTypeId}>
            {each.label}
          </label>
        </li>
      )
    })
  }

  const getRenderSalaryList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(each => {
      const {salaryRangesListType} = props
      const onChangeSalaryType = event => {
        salaryRangesListType(event.target.value)
      }
      return (
        <li
          className="list-items"
          key={each.salaryRangeId}
          onChange={onChangeSalaryType}
        >
          <input
            type="radio"
            className="input-type"
            id={each.salaryRangeId}
            value={each.salaryRangeId}
            name="salary"
          />
          <label className="label" htmlFor={each.salaryRangeId}>
            {each.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filter-app-container">
      <ProfileDetails />
      <hr className="hr-line" />
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="ul-items">{getRenderEmploymentTypeList()}</ul>

      <hr className="hr-line" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="ul-items">{getRenderSalaryList()}</ul>
    </div>
  )
}
export default JobFiltersGroup
