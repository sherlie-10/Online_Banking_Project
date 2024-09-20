import { Link } from "react-router-dom";
import './navbar.css';
const NavBar = ()=>{
    return(
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand text-white">Online Banking</a>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#excelRContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="excelRContent" className="collapse navbar-collapse navbar-link">
                        <ul className="navbar-nav nav-links mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a href="/" className="nav-link">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#services" className="nav-link">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#about" className="nav-link">About</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">Contact</a>
                                </li>
                          </ul>
                          <Link to="/login" className="login-btn">Login</Link>

                    </div>
                </div>
            </nav>
        </>
    )
}


export default NavBar;