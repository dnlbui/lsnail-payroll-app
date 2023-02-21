import { Link } from "react-router-dom"
import { Fragment } from "react"
import Nav from "./NavUnAuth"

const Public = () => {

    const content = (
        <Fragment>
            <Nav/>
            <div className='container'>
                <div className="row gy-5 d-flex justify-content-center">
                    <div className="col-8  ">
                            <section className="public">
                                <header>
                                    <h1>Lorem Ipsum!</h1>
                                </header>
                                <main>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <br></br>
                                    <h6>Service ticket book keeping and payroll calculator</h6>
                                    <h6>Created by Daniel Bui (<a href="https://www.linkedin.com/in/dnlbui/">LinkedIn</a>)</h6>
                                    <a href="https://www.loom.com/share/80e4d6514b43493da092116e5f2acba9">Loom Video</a>
                                    <br></br>
                                    
                                    <p>Tech stack: </p>
                                        <ul>
                                            <li>React/Redux</li>
                                            <li>Node+Express</li>
                                            <li>MongoDB+Mongoose</li>
                                            <li>BootStrap</li>
                                            <li>JavaScript, HTML, CSS</li>
                                        </ul>
                                    <p>Libaries and API used:</p>
                                    <ul>
                                        <li>JWT with local strategy</li>
                                        <li>bcrypt</li>
                                        <li>PassPort</li>
                                        <li>react-router with protected routes</li>
                                        <li>RTK Query</li>
                                        <li>RSuite</li>
                                        <li>Stripe API</li>
                                    </ul>


                                    <p>&nbsp;</p>
                                    <div className="row row-cols-1">
                                    <address>
                                        Ut at leo ac odio<br />
                                        mattis vulputate nec<br />
                                        Vestibulum, TX 3170<br />
                                        <a href="tel:+18176158899">(464) 464 -4648</a>
                                    </address>
                                    </div>
                                </main>
                                <footer>
                                    <div className="row row-cols-1">
                                        <Link to="/login">Employee Login</Link>
                                        <Link to="/register">Register</Link>
                                    </div>
                                </footer>
                            </section>
                    </div>
                </div>
            </div>
        </Fragment>
    )
    return content
}
export default Public