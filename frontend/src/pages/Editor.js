import React, { useState, useEffect } from 'react';
import LeftEditorPanel from '../components/leftEditorPanel';
import ViewPanel from "../components/viewPanel";
import RightEditorPanel from '../components/rightEditorPanel';
import "../css/editor.css";
import Axios from "axios";

const Editor = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [projectSettings, setProjectSettings] = useState({
    projectName: '',
    visibility: 'public',
    font: 'Arial',
    paragraphFontSize: '14',
    date: "",
    users: [],
  });


  const updateHtmlContent = (updatedContent) => {
    setHtmlContent(updatedContent);
  };

  const updateProjectSettings = (newSettings) => {
    console.log('updateProjectSettings called with newSettings:', newSettings);
    console.log("html content:", htmlContent)
    const updatedSettings = { ...newSettings, date: Date.now() };
    setProjectSettings(prevSettings => ({ ...prevSettings, ...updatedSettings }));
  };

  // SAVE

  // 
  const saveToDatabase = async (projectSettings, htmlContent) => {
    try {
      const response = await Axios.post("http://localhost:5000/editor/save", {
        projectSettings,
        htmlContent
      });
      console.log(response.data);
      } catch  (error) {
      console.log(error)
    }
  }





  // LOAD


  //const findLatestKey = () => {
  //  console.log('localStorage:', localStorage);
  //  const projectDate = Object.entries(localStorage)
  //  .filter(([key, value]) => /-projectSettings$/.test(key))
  //  .reduce((acc, [key, value]) => {
  //    const projectSettings = JSON.parse(value);
  //    if (projectSettings.date) {
  //      acc[key] = projectSettings.date
  //    }
  //    
  //    return acc
  //  }, {});
  //  console.log('projectDate:', projectDate);
//
  //  const entries = Object.entries(projectDate);
  //  const [maxKey, maxValue] = entries.reduce((acc, [key, value]) => {
  //    return value > acc[1] ? [key, value] : acc;
  //  }, ['', 0]);
  //  
  //  const projectId = maxKey.replace('-projectSettings', '');
  //  console.log("max value:", maxValue);
  //  console.log("max key:", projectId);
  //  return projectId
  //};
  //
  //const loadFromLocalStorage = ({ projectId } = findLatestKey() ) => {
  //  const savedHtmlContent = localStorage.getItem(`${projectId}-htmlContent`);
  //  const savedProjectSettings = localStorage.getItem(`${projectId}-projectSettings`)
  //  console.log('savedHtmlContent:', savedHtmlContent);
  //  console.log('savedProjectSettings:', savedProjectSettings);
  //  if (savedHtmlContent &&  savedProjectSettings) {
  //    const content = savedHtmlContent
  //    const projectSettings = JSON.parse(savedProjectSettings)
  //    setHtmlContent(content);
  //    setProjectSettings(projectSettings);
  //    }
  //}
//
  //useEffect (() => {
  //  loadFromLocalStorage()
  //},[])



  // ADD STUFF 

  const addSection = (sectionContent) => {
    setHtmlContent(prevContent => prevContent + sectionContent);
  };

  const addParagraph = () => {
    const container = document.querySelector('.content-container');
    const sections = container.querySelectorAll('.editor-section');
    const latestSection = sections[sections.length - 1];

    if (latestSection) {
      latestSection.innerHTML += '<p class="hidden" contenteditable="true">New Paragraph</p>';
      setHtmlContent(container.innerHTML);
    } else {
      alert('Please add a section before adding a paragraph.');
    }
  };

  const addHeader = (type) => {
    const container = document.querySelector('.content-container');
    const sections = container.querySelectorAll('.hidden');
    const latestSection = sections[sections.length - 1];
    if (latestSection) {
      latestSection.innerHTML += `<${type} class="hidden" contenteditable="true">New ${type.toUpperCase()}</${type}>`;
      setHtmlContent(container.innerHTML);
    } else {
      alert('Please add a section before adding a header.');
    }
  };

  const addUnorderedList = () => {
    const container = document.querySelector('.content-container');
    const sections = container.querySelectorAll('.editor-section');
    const latestSection = sections[sections.length - 1];

    if (latestSection) {
      latestSection.innerHTML += `
        <ul class="hidden editor-ul">
          <li class="hidden" contenteditable="true">List item</li>
        </ul>
      `;
      setHtmlContent(container.innerHTML);
    } else {
      alert('Please add a section before adding an unordered list.');
    }
  };

  const addOrderedList = () => {
    const container = document.querySelector('.content-container');
    const sections = container.querySelectorAll('.editor-section');
    const latestSection = sections[sections.length - 1];

    if (latestSection) {
      latestSection.innerHTML += `
        <ol class="hidden editor-ol">
          <li class="hidden" contenteditable="true">List item</li>
        </ol>
      `;
      setHtmlContent(container.innerHTML);
    } else {
      alert('Please add a section before adding an ordered list.');
    }
  };

  const addListItem = () => {
    const container = document.querySelector('.content-container');
    const sections = container.querySelectorAll('.editor-section');
    const latestSection = sections[sections.length - 1];

    if (latestSection) {
      const lists = latestSection.querySelectorAll('.editor-ul, .editor-ol');
      const latestList = lists[lists.length - 1];

      if (latestList) {
        latestList.innerHTML += '<li class="hidden" contenteditable="true">List item</li>';
        setHtmlContent(container.innerHTML);
      } else {
        alert('Please add a list (unordered or ordered) before adding a list item.');
      }
    } else {
      alert('Please add a section before adding a list item.');
    }
  };

  return (
    <div className="container">
      <LeftEditorPanel
        onAddSection={addSection}
        onAddParagraph={addParagraph}
        onAddUnorderedList={addUnorderedList}
        onAddOrderedList={addOrderedList}
        onAddListItem={addListItem}
        onAddHeader={addHeader}
      />
      <ViewPanel
        htmlContent={htmlContent}
        updateHtmlContent={updateHtmlContent}
        setSelectedElement={setSelectedElement}
      />
      <RightEditorPanel
        saveToDatabase={saveToDatabase}
        projectSettings={projectSettings}
        updateProjectSettings={updateProjectSettings}
      />
    </div>
  );
};

export default Editor;
