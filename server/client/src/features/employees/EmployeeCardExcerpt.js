//Returns a card for each product
export default function EmployeeCardExcerpt ({element}) {
  let {_id, name, image} = element;
  return (
    <div className="col ">
      <div className="card" value={_id} style={{width: 288}}>
        <img src={image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Name: {name}</li>
        </ul>
        <button type="button" value={_id} class="btn btn-danger">Delete</button>
      </div>
    </div>
  )
}
