import React from 'react'
import "../css/leftEditorPanel.css"

const leftEditorPanel = ({onAddSection}) => {
  const addSectionWithTitle = () => {
    const sectionWithTitle = `
    <div class="hidden">
      <div class="view-header">
        <h1 contenteditable="true" >Title</h1>
      </div>
      <p contenteditable="true" >cont</p>
    </div>
    <hr>
    `;
    onAddSection(sectionWithTitle)
  }

  return (
    <div className="leftPanel">
      <h2>Left panel</h2>
      <button onClick={addSectionWithTitle} >sec</button>

    </div>
  )
}

export default leftEditorPanel
