import React, { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Headder from './components/Headder';
import Home from './components/Home';
import Summary from './components/Summary';
import { IAnalyticsSummary } from './utils/models';

const App: FC = () => {
  return (
    <>
      <Headder></Headder>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
