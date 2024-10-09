import React from 'react';
import "../css/projectBrowserProjects.css";
import {Link} from "react-router-dom";

const projectBrowseProjects = () => {



  return (
    <div>
      <div className="projectCards">
        <div className="card">
            <div className="editorView">
              <h1>Hi!</h1>
              <h3>If you want to create a new journal, click on the button underneath!</h3>
              <p>You'll be able to create new letter and make your loved one happy</p>
              <Link to="/editor"><button>Editor</button></Link>
            </div>

        </div>
        <div className="card">
            <div className="cardView">
              <h1>Something new</h1>
              <p>Something something something idk idk what should i write i dont know like tf how would i know...</p>
            </div>
            <div className="cardInfo">
              <p>project name: something</p>

              <p>visibility:  public</p>

            </div>
        </div>

      </div>
    </div>
  )
};

export default projectBrowseProjects;
