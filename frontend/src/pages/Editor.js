import React, { useState, useEffect, useCallback } from 'react';
import LeftEditorPanel from '../components/leftEditorPanel';
import ViewPanel from "../components/viewPanel";
import RightEditorPanel from '../components/rightEditorPanel';
import "../css/editor.css";

const Editor = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [projectSettings, setProjectSettings] = useState({
    projectName: '',
    visibility: 'public',
    font: 'Arial',
    paragraphFontSize: '14',
    users: []
  });
  const [selectedElement, setSelectedElement] = useState(null);

  const isLoggedIn = () => {
    return localStorage.getItem("userToken") !== null;
  };

  const loadFromLocalStorage = () => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      const { content, projectSettings } = JSON.parse(savedContent);
      setHtmlContent(content);
      setProjectSettings(projectSettings);
    }
  };

  const loadFromDatabase = () => {
    const userId = localStorage.getItem("userId");
    fetch(`/api/getContent?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.content) {
          setHtmlContent(data.content);
          setProjectSettings(data.projectSettings);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to load content from database.');
      });
  };

  const loadContent = useCallback(() => {
    if (isLoggedIn()) {
      loadFromDatabase();
    } else {
      loadFromLocalStorage();
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const saveToLocalStorage = (content, projectSettings) => {
    localStorage.setItem('editorContent', JSON.stringify({ content, projectSettings }));
    alert('Content saved locally!');
  };

  const saveToDatabase = (content, projectSettings) => {
    fetch('/api/saveContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, projectSettings, userId: localStorage.getItem("userId") }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Content saved to database!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to save content to database.');
      });
  };

  const saveContent = (updatedProjectSettings) => {
    const settingsToSave = updatedProjectSettings || projectSettings; // Use updated settings if provided
    console.log('saveContent called with projectSettings:', settingsToSave);
    if (isLoggedIn()) {
      saveToDatabase(htmlContent, settingsToSave);
    } else {
      saveToLocalStorage(htmlContent, settingsToSave);
    }
  };

  const updateHtmlContent = (updatedContent) => {
    setHtmlContent(updatedContent);
  };

  const updateProjectSettings = (newSettings) => {
    console.log('updateProjectSettings called with newSettings:', newSettings);
    setProjectSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

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
        onSaveContent={saveContent}
        projectSettings={projectSettings}
        updateProjectSettings={updateProjectSettings}
      />
    </div>
  );
};

export default Editor;
