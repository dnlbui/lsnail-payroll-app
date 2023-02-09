import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
import InvoiceFormExerpt from "./InvoiceFormExcerpt";

const Invoice = () => {
  
    return (
      <Fragment>
        <Nav/>
        <br></br>
        <div className="row row-cols-3 gy-10 offset-5">
          <div className="col d-flex justify-content-center">
            <div className="jumbotron jumbotron-fluid ">
              <div className="container">
                <h1 className="display-8 text-center">Invoice</h1>
              </div>
            </div>
          </div>
        </div>
        <InvoiceFormExerpt/>
      </Fragment>
    )
  }

export default Invoice;