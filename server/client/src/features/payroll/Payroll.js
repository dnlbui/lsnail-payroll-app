import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
import PayrollBarExcerpt from "./PayrollFormExcerpt";
//import PayrollCardRowExcerpt from "./PayrollCardRowExcerpt";


const Payroll = () => {

  return (
    <Fragment>
      <Nav/>
      <br></br>
      <div className="row row-cols-3 gy-10 offset-5">
        <div className="col ">
          <div className="jumbotron jumbotron-fluid ">
            <div className="container">
              <h1 className="display-8 text-center">Payroll</h1>
            </div>
          </div>
        </div>
      </div>
      <PayrollBarExcerpt/>
      {/* <PayrollCardRowExcerpt/> */}
    </Fragment>

  )
}

export default Payroll;