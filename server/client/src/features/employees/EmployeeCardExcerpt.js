import { Fragment } from 'react';
import { useDeleteEmployeeMutation } from './EmployeesApiSlice';

//Returns a card for each product
export default function EmployeeCardExcerpt ({element}) {
  let {_id, name, image} = element;

  let [deleteEmployee] = useDeleteEmployeeMutation();

  const handleClick = () =>{
    deleteEmployee(_id);
  }

  let content = (
    <div className='col d-flex justify-content-center'>
    <div className="card d-flex justify-content-center" value={_id} style={{width: 180}}>
        <img src={image} className="card-img-top" alt="..."/>
          <h5 className="card-title text-center">{name}</h5>
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
