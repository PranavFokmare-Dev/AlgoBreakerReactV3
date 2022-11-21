import React from 'react';

const ParentCard = function ({ title, ChildComponent }: { title: string; ChildComponent: JSX.Element }) {
  return (
    <div className="card">
      <div className="card-highlight"></div>
      <div className="card-container">
        <h4 className="card-title">{title}</h4>
        {ChildComponent}
      </div>
    </div>
  );
};

export default ParentCard;
