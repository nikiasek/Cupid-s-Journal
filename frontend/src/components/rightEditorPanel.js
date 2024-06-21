import React from 'react'
import "../css/rightEditorPanel.css"

const rightEditorPanel = ({addStyle}) => {
  
  const handleFontChange = (e) => {
    addStyle({ fontFamily: e.target.value });
  };

  const handleSizeChange = (e) => {
    addStyle({ fontSize: "${e.target.value}px" });
  };

  return (
    <div className='rightPanel'>
      <label htmlFor="font">fonnnt:</label>
      <select id="font" onChange={handleFontChange} >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
      <br />
      <label htmlFor="size">size</label>
      <select  id="size" onChange={handleSizeChange} >
        <option value="12">12px</option>
        <option value="14">14px</option>
        <option value="16">16px</option>
        <option value="18">18px</option>
        <option value="20">20px</option>
        <option value="24">24px</option>
        <option value="28">28px</option>
        <option value="32">32px</option>
      </select>
    </div>
  )
}

export default rightEditorPanel
