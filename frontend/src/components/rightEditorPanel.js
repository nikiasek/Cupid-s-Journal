import React, { useState, useEffect } from 'react';
import "../css/rightEditorPanel.css";

const RightEditorPanel = ({ onSaveContent, projectSettings, updateProjectSettings }) => {
  const [localSettings, setLocalSettings] = useState(projectSettings);

  useEffect(() => {
    setLocalSettings(projectSettings);
  }, [projectSettings]);

  useEffect(() => {
    applyStyles();
  }, [localSettings.font, localSettings.paragraphFontSize]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };

  const applyStyles = () => {
    const container = document.querySelector('.content-container');
    if (container) {
      container.style.fontFamily = localSettings.font;
      const paragraphs = container.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.style.fontSize = `${localSettings.paragraphFontSize}px`;
      });
    }
  };

  const handleVisibilityChange = (e) => {
    setLocalSettings(prevSettings => ({ ...prevSettings, visibility: e.target.value }));
  };

  const addUser = (email) => {
    setLocalSettings(prevSettings => ({ ...prevSettings, users: [...prevSettings.users, email] }));
  };

  const removeUser = (email) => {
    setLocalSettings(prevSettings => ({ ...prevSettings, users: prevSettings.users.filter(user => user !== email) }));
  };

  const handleSave = () => {
    updateProjectSettings(localSettings);
    onSaveContent();
  };

  return (
    <div className='rightPanel'>
      <h2 className="rightPanelHeader"> Project settings </h2>
      <div className="labelElement">
        <p className="labelName"> Project name </p>
        <input
          type="text"
          name="projectName"
          value={localSettings.projectName}
          onChange={handleInputChange}
        />
      </div>
      <div className="optionElement">
        <p className="optionName"> Visibility </p>
        <select id="visibility" value={localSettings.visibility} onChange={handleVisibilityChange}>
          <option value="secret"> Secret </option>
          <option value="invisible"> Invisible </option>
          <option value="public"> Public </option>
        </select>
      </div>
      {localSettings.visibility === 'secret' && (
        <div className="labelElement">
          <p className="labelName"> Add User by Email </p>
          <input
            type="email"
            placeholder="User email"
            onKeyDown={(e) => {
              if (e.key === 'Enter') addUser(e.target.value);
            }}
          />
          <p className="labelName"> Remove User by Email </p>
          <input
            type="email"
            placeholder="User email"
            onKeyDown={(e) => {
              if (e.key === 'Enter') removeUser(e.target.value);
            }}
          />
        </div>
      )}
      <div className="optionElement">
        <p className="optionName"> Font </p>
        <select name="font" value={localSettings.font} onChange={handleInputChange}>
          <option value="Arial"> Arial </option>
          <option value="Verdana"> Verdana </option>
          <option value="Times New Roman"> Times New Roman </option>
        </select>
      </div>
      <div className="optionElement">
        <p className="optionName"> Paragraph Font Size </p>
        <input
          type="number"
          name="paragraphFontSize"
          value={localSettings.paragraphFontSize}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default RightEditorPanel;
