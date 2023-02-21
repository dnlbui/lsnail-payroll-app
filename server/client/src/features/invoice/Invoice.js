import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
import InvoiceFormExerpt from "./InvoiceFormExcerpt";

const Invoice = () => {
  
    return (
      <Fragment>
        <Nav/>
        <br></br>
        <div className="row gy-5 d-flex justify-content-center">
          <div className="col d-flex justify-content-center">
            <div className="jumbotron jumbotron-fluid ">
              <div className="container">
                <h1 className="display-8 text-center">Invoice</h1>
                <p>Invoice using Stripe API connected to a test account.</p>
                <p>Right now price is hard coded to a $30 item and have not made a confirmation alert.</p>
                <p>Will only be able to see that this worked in a video I'll link here.</p>
                <a href="https://www.loom.com/share/80e4d6514b43493da092116e5f2acba9">Watch me demo the app!</a>
                <br></br>
              </div>
            </div>
          </div>
        </div>
        <InvoiceFormExerpt/>
      </Fragment>
    )
  }

export default Invoice;