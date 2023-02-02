//a protected component
import {Fragment} from "react";
import { useSelector } from "react-redux";
import { selectCurrentEmail } from "../auth/authSlice";
import Nav from "../../components/AuthNav";


const Home = () => {
  const email = useSelector(selectCurrentEmail)

  const home = email ? `Welcome ${email}! Charts Coming Soon!` : 'Welcome! Charts Coming Soon!'

  const content = (
    <Fragment>
      <Nav/>
      <div className='container'>
        <div className="row row-cols-1 gy-5 offset-3">
          <section className="welcome">
            <h1>{home}</h1>
          </section>
        </div>
      </div>
    </Fragment>
  )
  return content
}

export default Home