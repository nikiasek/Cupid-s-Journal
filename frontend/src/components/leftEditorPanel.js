import React from 'react';
import "../css/leftEditorPanel.css";

const LeftEditorPanel = ({ onAddSection, onAddParagraph, onAddUnorderedList, onAddOrderedList, onAddListItem, onAddHeader }) => {
  const addSectionWithTitle = () => {
    const sectionWithTitle = `
      <div class="hidden editor-section">
        <div class="view-header">
          <h1 class="hidden" contenteditable="true">Title</h1>
        </div>
        <p class="hidden" contenteditable="true">Starting paragraph</p>
      </div>
      <hr>
    `;
    onAddSection(sectionWithTitle);
  };

  return (
    <div className="leftPanel">
      <h2 className='leftPanelHeader'> Structure </h2>
      <div className="buttonElement"> 
        <p className="buttonName">Add section</p>
        <button className='buttonEditor' onClick={addSectionWithTitle}></button> 
      </div>
      <hr />
      <div className="buttonElement"> 
        <p className="buttonName">Add Paragraph</p> 
        <button className='buttonEditor' onClick={onAddParagraph}></button> 
      </div>
      <div className="buttonElement"> 
        <p className="buttonName">Add Header 1</p> 
        <button className='buttonEditor' onClick={() => onAddHeader('h1')}></button>
      </div>
      <div className="buttonElement"> 
        <p className="buttonName">Add Header 2</p> 
        <button className='buttonEditor' onClick={() => onAddHeader('h2')}></button>
      </div>
      <div className="buttonElement"> 
        <p className="buttonName">Add Header 3</p> 
        <button className='buttonEditor' onClick={() => onAddHeader('h3')}></button>
      </div>
      <hr />
      <div className="buttonElement"> 
        <p className="buttonName">Add Unordered List</p> 
        <button className='buttonEditor' onClick={onAddUnorderedList}></button> 
      </div>
      <div className="buttonElement"> 
        <p className="buttonName">Add Ordered List</p> 
        <button className='buttonEditor' onClick={onAddOrderedList}></button> 
      </div>
      <div className="buttonElement"> 
        <p className="buttonName">Add List Item</p> 
        <button className='buttonEditor' onClick={onAddListItem}></button> 
      </div>
    </div>
  );
};

export default LeftEditorPanel;
