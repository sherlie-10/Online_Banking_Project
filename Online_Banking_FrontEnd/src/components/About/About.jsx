import React from "react";
import './About.css'
import aboutImage from './about1.png';
const About = ()=>{
    return(
        <>
       {/* <!-- About Section  --> */}
    <section id="about" className="about py-3">
      <div className="row align-items-center container my-3 mx-auto">
        {/* <!-- Left Side Content Area  --> */}
        <div className="text col-lg-6 col-md-6 col-12 pt-5 pb-5">
          <h6>PREMIUM BANK</h6>
          <h2>Unlimited Transaction with zero fees</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
            consequatur non delectus ad quasi. Consectetur necessitatibus alias
            eveniet corporis hic, expedita dolore quo eos tempore!
          </p>
          <a href="#">Learn More</a>
        </div>
      
        <div className="img col-lg-6 col-md-6 col-12 pt-5 pb-5">
          <img className="img-fluid" src={aboutImage} />
        </div>
      </div>
    </section>
        </>
    )
}

export default About;