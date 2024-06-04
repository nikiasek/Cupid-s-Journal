import React from "react"


const Home = () => {



    return (
        <div className="homeClass">
            <h1>Hello {localStorage.getItem("email")} and thank you </h1>
        </div>
    )
  };
  
  export default Home;
  