import React, { useState, useEffect, useCallback } from 'react';
import "../css/rightEditorPanel.css";

const RightEditorPanel = ({ onSaveContent, projectSettings, updateProjectSettings }) => {
  const [localSettings, setLocalSettings] = useState(projectSettings);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setLocalSettings(projectSettings);
  }, [projectSettings]);

  const applyStyles = useCallback(() => {
    const container = document.querySelector('.content-container');
    if (container) {
      container.style.fontFamily = localSettings.font;
      const paragraphs = container.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.style.fontSize = `${localSettings.paragraphFontSize}px`;
      });
    }
  }, [localSettings.font, localSettings.paragraphFontSize]);

  useEffect(() => {
    applyStyles();
  }, [applyStyles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setLocalSettings(prevSettings => ({ ...prevSettings, visibility: e.target.value }));
  };

  const addUser = () => {
    if (email && !localSettings.users.includes(email)) {
      setLocalSettings(prevSettings => ({ ...prevSettings, users: [...prevSettings.users, email] }));
      setEmail('');
    }
  };

  const removeUser = (emailToRemove) => {
    setLocalSettings(prevSettings => ({ ...prevSettings, users: prevSettings.users.filter(user => user !== emailToRemove) }));
  };

  const handleSave = () => {
    console.log('handleSave called with localSettings:', localSettings);
    updateProjectSettings(localSettings);
    onSaveContent(localSettings); // Pass the updated settings directly
  };

  return (
    <div className='rightPanel'>
      <h2 className="rightPanelHeader">Project Settings</h2>
      <div className="labelElement">
        <p className="labelName">Project Name</p>
        <input
          type="text"
          name="projectName"
          value={localSettings.projectName}
          onChange={handleInputChange}
        />
      </div>
      <div className="optionElement">
        <p className="optionName">Visibility</p>
        <select id="visibility" value={localSettings.visibility} onChange={handleVisibilityChange}>
          <option value="secret">Secret</option>
          <option value="invisible">Invisible</option>
          <option value="public">Public</option>
        </select>
      </div>
      {localSettings.visibility === 'secret' && (
        <div className="labelElement">
          <p className="labelName">Add User by Email</p>
          <div className="emailInputContainer">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="User email"
            />
            <button onClick={addUser}>Add</button>
          </div>
          <div className="userList">
            {localSettings.users.map((userEmail, index) => (
              <div key={index} className="userItem">
                <span>{userEmail}</span>
                <button onClick={() => removeUser(userEmail)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="optionElement">
        <p className="optionName">Font</p>
        <select name="font" value={localSettings.font} onChange={handleInputChange}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Roboto">Roboto</option>
        </select>
      </div>
      <div className="optionElement">
        <p className="optionName">Paragraph Font Size</p>
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
