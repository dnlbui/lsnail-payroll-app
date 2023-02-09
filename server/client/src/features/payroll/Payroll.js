import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
import PayrollBarExcerpt from "./PayrollFormExcerpt";

const Payroll = () => {

  return (
    <Fragment>
      <Nav/>
      <br></br>
      <div className="container">
      <div className="row row-cols-md-2 row-cols-1 gy-10">
         <PayrollBarExcerpt/>
        </div>
      </div>
    </Fragment>

  )
}

export default Payroll;