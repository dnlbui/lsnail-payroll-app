import EmployeesList from "./EmployeesListExerpt"
import EmployeeForm from "./EmployeeFormExcerpt"
import Nav from "../../components/NavAuth";
import { Fragment } from 'react';

const Employees = () => {

  return (
    <Fragment>
      <Nav/>
      <EmployeeForm/>
      <EmployeesList/>
    </Fragment>
  )
}

export default Employees