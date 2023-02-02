import { Link } from "react-router-dom"

const Public = () => {

    const content = (
      <div className="row row-cols-1 gy-4 offset-3">
        <section className="public">
            <header>
                <h1>Welcome to Lone Star Nails!</h1>
            </header>
            <main>
                <p>Located in Fort Worth, Texas. Estalished in 2009.</p>
                <p>&nbsp;</p>
                <div className="row row-cols-1 gy-4 offset-2">
                <address>
                    Lone Star Nails<br />
                    7812 Crowley Rd<br />
                    Fort Worth, TX 76134<br />
                    <a href="tel:+18176158899">(817) 615-8899</a>
                </address>
                </div>
            </main>
            <footer>
            <div className="row row-cols-1 gy-4 offset-2">
                <Link to="/login">Employee Login</Link>
                </div>
            </footer>
        </section>
        </div>
    )
    return content
}
export default Public