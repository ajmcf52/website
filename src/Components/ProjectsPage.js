import React from "react";

const config = require("../Config/projects.json");

const ProjectsPage = () => {
  return (
    <div className="projectPage">
      <div className="projectPageHeader">
        <p className="projectPageTitle">Some Stuff I've Built</p>
      </div>
      <hr className="hrule" />
      <div>
        {
          // Object.values(config).map(project, i => {
          //   let result = (<p></p>)
          // })
          config.forEach((project, i) => {
            return (
              <div>
                <p className="projectTitle">
                  <b>{project.name}</b> - {project.description}
                </p>
                <ul>
                  {project.points.forEach((line) => {
                    return <li>{line}</li>;
                  })}
                  {project.github && (
                    <li>
                      Code can be found <a href={project.github}>here</a>
                    </li>
                  )}
                </ul>
                {i < config.length - 1 && <hr className="hrule" />}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ProjectsPage;
