import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Projects.css"


const ProjectDescription = () => {

    const {id} = useParams();
    console.log("Project ID:", id);
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/projects/${id}`)
            .then(response => response.json())
            .then(data => {
                setProject(data);
                console
            })
            .catch(error => console.error("Error fetching project:", error));
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="project-cont">
            <div className="project-images">
                {project.images.map((image, index) => (
                    <img 
                        key={index} 
                        src={image} 
                        alt={`Project ${project.title} - Image ${index + 1}`} />
                ))}
            </div>
            
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <button onClick={() => window.history.back()} className="project-button"
                >Go back to Projects
            </button>

        </div>
    );
};

export default ProjectDescription;
