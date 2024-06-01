import {useLocation} from "react-router-dom";


const Home = () => {
    const location=useLocation()


    return (
        <div className="homeClass">
            <h1>Hello {location.state.id} and thank you </h1>
        </div>
    )
  };
  
  export default Home;
  