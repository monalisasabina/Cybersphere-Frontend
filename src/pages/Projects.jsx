import { useEffect, useState } from "react";
import "./Projects.css";

const Projects = () => {

    const [projects, setProjects] = useState([]);

    // Fetching Projects
    useEffect(() => {

        fetch("http://127.0.0.1:5555/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data =>{ 
                  setProjects(data)
                  console.log("fetched projects:", data)
                })
        .catch(error => console.error("Error fetching projects:", error));
    }, []);

    return (
        <div className="project-cont">
            <h2>Projects</h2>

            <div className="projects-list">
                 {projects.map((map) =>(
                 <div className="project-card" key={map.id}>
                    <h3>{map.title}</h3>
                    <img src={map.images} alt={map.title} />
                    <p>{map.description}</p>
                </div>
            ))}

            </div>
            
           
        </div>
    );
};

export default Projects;
