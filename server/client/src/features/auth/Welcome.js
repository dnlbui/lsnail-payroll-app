//a protected component
import { useSelector } from "react-redux";
import { selectCurrentEmail, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom"
import {Fragment} from "react";
import Nav from "../../components/NavAuth";

const Welcome = () => {
  const user = useSelector(selectCurrentEmail)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user}!` : 'Welcome!'
  const tokenAbbr = `${token.slice(0, 9)}...`

  const content = (
    <Fragment>
      <Nav/>
      <div className='container'>
        <div className="row row-cols-1 gy-5 ">
          <div className="col">
          <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/home">Go to the home page!</Link></p>
          </section>
          </div>
        </div>
        <div className="row">
        <img src="https://scontent-dfw5-2.xx.fbcdn.net/v/t1.18169-9/19437568_10213320713232945_6356459327715879214_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=0debeb&_nc_ohc=6LD9T9mer8oAX9h9cgN&_nc_ht=scontent-dfw5-2.xx&oh=00_AfByjmyfU5qAhLfyyNodpMJVmm-2-oi1Em48zlTG-bHU_A&oe=640BA9B0" className="img-fluid" alt="Taken by Bui"></img>
        </div>
      </div>
    </Fragment>
  )
  return content
}

export default Welcome