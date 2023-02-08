import EmployeesList from "./EmployeesListExerpt"
import EmployeeForm from "./EmployeeFormExcerpt"
import Nav from "../../components/NavAuth";
import { Fragment } from 'react';

const Employees = () => {

  return (
    <Fragment>
      <Nav/>
      <div className='container'>
        <div className="row row-cols-2 gy-10">
          <div className="col ">
            <EmployeeForm/>
          </div>
          <div className="col ">
            <EmployeesList/>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Employees