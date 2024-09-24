import React from "react";
import './services.css'
const Services = ()=>{
    return(
        <>
        <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="services-container">
        <div className="service-item">
          <h3>Fast Transfers</h3>
          <p>Transfer money globally within seconds with our secure services.</p>
        </div>
        <div className="service-item">
          <h3>Secure Accounts</h3>
          <p>Your account is protected with industry-leading security measures.</p>
        </div>
        <div className="service-item">
          <h3>24/7 Support</h3>
          <p>Our support team is available anytime to assist you with your needs.</p>
        </div>
      </div>
    </section>
        </>
    )
}

export default Services;