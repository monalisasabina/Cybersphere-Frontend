import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                 {projects.map((project) =>(
                 <div className="project-card" key={project.id}>
                    <img src={project.images[0]} alt={project.title} />
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                    <Link to={`/projects/${project.id}`}>
                        <button className="project-button">Description</button>
                    </Link>
                </div>
            ))}

            </div>
            
           
        </div>
    );
};

export default Projects;
