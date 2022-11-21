import React, { FC, useEffect, useState } from 'react';

const Card = function ({ title, text }: { title: string; text: string }) {
  return (
    <div className="card">
      <div className="card-highlight"></div>
      <div className="card-container">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
