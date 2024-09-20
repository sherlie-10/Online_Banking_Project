import React from "react";
import './footer.css';

const Footer = () => {
    return (
        <>
            <footer className="footer bg-dark text-white text-center py-3">
                <div className="container p-4 pb-0">
                    {/* Social media section */}
                    <section className="mb-4">
                        <a
                            className="btn btn-outline-light btn-floating m-1"
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            className="btn btn-outline-light btn-floating m-1"
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            className="btn btn-outline-light btn-floating m-1"
                            href="#!"
                            role="button"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </section>
                </div>
                <div className="container">
                    <p>&copy; 2024 Online Banking. All Rights Reserved.</p>
                    <ul className="footer-links">
                        <li><a href="#terms">Terms & Conditions</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default Footer;
