import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
import PayrollBarExcerpt from "./PayrollFormExcerpt";

const Payroll = () => {

  return (
    <Fragment>
      <Nav/>
      <br></br>
      <div className="container">
      <div className="row gy-5 d-flex justify-content-center">
         <PayrollBarExcerpt/>
        </div>
      </div>
    </Fragment>

  )
}

export default Payroll;