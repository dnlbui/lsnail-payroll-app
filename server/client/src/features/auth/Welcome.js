//a protected component
import { useSelector } from "react-redux";
import { selectCurrentEmail, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom"
import {Fragment} from "react";
import Nav from "../../components/AuthNav";

const Welcome = () => {
  const user = useSelector(selectCurrentEmail)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user}!` : 'Welcome!'
  const tokenAbbr = `${token.slice(0, 9)}...`

  const content = (
    <Fragment>
      <Nav/>
      <div className='container'>
        <div className="row row-cols-1 gy-5 offset-3">
          <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/home">Go to the home page!</Link></p>
          </section>
        </div>
      </div>
    </Fragment>
  )
  return content
}

export default Welcome