import React, { useState } from 'react';
import LeftEditorPanel from '../components/leftEditorPanel';
import View from "../components/viewPanel";
import RightEditorPanel from '../components/rightEditorPanel';
import "../css/editor.css";

const Editor = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);

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

  const updateHtmlContent = (updatedContent) => {
    setHtmlContent(updatedContent);
  };

  const addStyle = (style) => {
    if (selectedElement) {
      Object.assign(selectedElement.style, style);
      setHtmlContent(document.getElementById("view-panel").innerHTML);
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
      <View
        htmlContent={htmlContent}
        updateHtmlContent={updateHtmlContent}
        setSelectedElement={setSelectedElement}
      />
      <RightEditorPanel addStyle={addStyle} />
    </div>
  );
};

export default Editor;
