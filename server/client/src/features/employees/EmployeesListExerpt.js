import { Fragment } from 'react';
import { useEmployeesListQuery } from "./EmployeesApiSlice";
import EmployeeCardExcerpt from "./EmployeeCardExcerpt";


const EmployeesList = () => {
  
  //destructure data from EmployeeList Query
  const {
    data: queryData,
    isLoading,
    isSuccess,
    isError,
    error
  }  = useEmployeesListQuery();

  //if statement that will return component depending on query status
  let content;
  if(isLoading) {
    content = <p>Loading...</p>
  } 
  else if (isSuccess) {
    content = queryData.map( element => {
      return(<EmployeeCardExcerpt key={element._id} element={element}/>)
    })
  } 
  else if (isError) {
    content = <p>{error}</p>
  }
  return (
    <Fragment>
      <div className="row row-cols-3 gy-10 offset-5">
        <div className="col ">
          <div className="jumbotron jumbotron-fluid ">
            <div className="container">
              <h1 className="display-8 text-center">Employee List</h1>
            </div>
          </div>
        </div>
      </div>
      <section className='employeelist'>
        <div className='container'>
          <div className="row row-cols-3 gy-5 offset-1">
            {content}
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
    </Fragment>
  )
}

export default EmployeesList