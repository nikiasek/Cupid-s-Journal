import { useNavigate } from 'react-router-dom';
import Header  from '../components/Header';
import ProjectBrowserProjects from "../components/projectBrowseProjects";
import useAuth from "../hooks/useAuth";
import { useEffect } from 'react';


const ProjectBrowser = () => {
    const { auth } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if(Object.keys(auth).length ===0) {
            console.log("not authenticated")
            navigate("/login")
        }
    },[]);
    
    return (
        <div className="project-browser">
            <Header />
            <ProjectBrowserProjects />
            
        </div>
    )
}

export default ProjectBrowser;
