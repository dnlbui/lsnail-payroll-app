import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
import PayrollBarExcerpt from "./PayrollFormExcerpt";

const Payroll = () => {

  return (
    <Fragment>
      <Nav/>
      <br></br>
      <div className="container">
        <div className="row row-cols-xl-2 row-cols-md-2 row-cols-sm-1">
         <PayrollBarExcerpt/>
        </div>
      </div>
    </Fragment>

  )
}

export default Payroll;