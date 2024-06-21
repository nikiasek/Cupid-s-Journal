import React, { useState } from 'react'
import LeftEditorPanel from '../components/leftEditorPanel'
import View from "../components/viewPanel"
import RightEditorPanel from '../components/rightEditorPanel'
import "../css/editor.css"

const Editor = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [selectedElement, setSelectedElement] = useState(null)

  const addSection = (sectionContent) => {
    setHtmlContent(prevContent => prevContent + sectionContent);
  };

  const updateHtmlContent = (updatedContent) => {
    setHtmlContent(updatedContent)
  }

  const addStyle = (style) => {
    if(selectedElement) {
      Object.assign(selectedElement.style, style);
      setHtmlContent(document.getElementById("view-panel").innerHTML);
    }
  }

  return (
    <div className="container">
      < LeftEditorPanel  onAddSection={addSection} />
      < View 
        htmlContent={htmlContent} 
        updateHtmlContent={updateHtmlContent}  
        setSelectedElement={setSelectedElement}
      />
      < RightEditorPanel addStyle={addStyle} />
    </div>
  )
}

export default Editor