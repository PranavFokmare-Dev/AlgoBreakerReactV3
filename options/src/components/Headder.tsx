import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
const Headder: FC = () => {
 
  return (
    <div>
         <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/summary">Summary</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Headder;
