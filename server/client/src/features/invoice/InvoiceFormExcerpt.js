//form with email, price, name, and submit button

import { Fragment } from "react";
import { useRef, useState, useEffect } from "react";
import { usePostInvoiceListMutation } from "./invoiceApiSlice";

const InvoiceForm  = () => {
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');

  const userRef = useRef();
  //const [setErrMsg] = useState('');

  useEffect(()=> {
    userRef.current.focus()
  },[])
  
  const [postInvoiceList, {isLoading}] = usePostInvoiceListMutation({skip: name === '' || price === '' || email ===''});

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  }

  const handleSubmit = async(e) => {
    let invoiceFormQuery = `email=${email}&price=${price}&name=${name}`;  
    e.preventDefault()
    postInvoiceList(invoiceFormQuery)
    content = <p ref={userRef}>Invoice sent!</p>
    setEmail('')
    setPrice('')
    setName('')
    userRef.current.focus()
  }

  return (
    <Fragment>
      <div className="row row-cols-2 gy-10 offset-4">
        <div className="col ">
          <div className="jumbotron jumbotron-fluid ">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    ref={userRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}  
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <br></br>

              {content}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InvoiceForm;
