import { Fragment } from 'react';
import { useDeleteEmployeeMutation } from './EmployeesApiSlice';

//Returns a card for each product
export default function EmployeeCardExcerpt ({element}) {
  let {_id, name, image} = element;

  let [deleteEmployee] = useDeleteEmployeeMutation();

  const handleClick = () =>{
    deleteEmployee(_id);
    //refetch();
    //content = <p>Deleted</p>
  }

  let content = (
    <div className="col ">
      <div className="card" value={_id} style={{width: 180}}>
        <img src={image} className="card-img-top" alt="..."/>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Name: {name}</li>
        </ul>
        <button type="button" value={_id} className="btn btn-outline-danger" onClick={handleClick}>Delete</button>
      </div>
    </div>
  )
  
  return (
    <Fragment>
      {content}
    </Fragment>
  )
}
