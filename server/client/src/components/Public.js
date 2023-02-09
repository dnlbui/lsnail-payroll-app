import { Link } from "react-router-dom"
import { Fragment } from "react"
import Nav from "./NavUnAuth"

const Public = () => {

    const content = (
        <Fragment>
            <Nav/>
            <div className='container'>
                <div className="row">
                    <div className="col"></div>
                        <div className="col col-6">
                            <section className="public">
                                <header>
                                    <h1>Lorem Ipsum!</h1>
                                </header>
                                <main>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                                    </div>
                                </footer>
                            </section>
                        </div>
                    <div className="col"></div>
                </div>
            </div>
        </Fragment>
    )
    return content
}
export default Public