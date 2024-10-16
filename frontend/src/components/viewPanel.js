import React, { useRef, useEffect } from 'react';
import "../css/view.css";

const ViewPanel = ({ htmlContent, updateHtmlContent, setSelectedElement }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = containerRef.current.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, [htmlContent]);

  const handleSectionEdit = (e) => {
    const updatedContent = containerRef.current.innerHTML;
    updateHtmlContent(updatedContent);
  };

  const handlePanelFocus = (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.setAttribute("contentEditable", "false");
    }
  };

  const handleElementFocus = (e) => {
    e.target.setAttribute("contentEditable", "true");
    setSelectedElement(e.target);
  };

  return (
    <div id="view-panel" className='view' onFocus={handlePanelFocus}>
      <div id="editor-heart"></div>
      <div
        ref={containerRef}
        className='content-container'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onBlur={handleSectionEdit}
        onFocus={handleElementFocus}
      />
    </div>
  );
};

export default ViewPanel;
