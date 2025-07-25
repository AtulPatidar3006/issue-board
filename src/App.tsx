import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { BoardPage } from './pages/BoardPage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { Navigation } from './components/Navigation';
import { IssueContextProvider } from './utils/issueContext';

export const App = () => {

  return (
    <IssueContextProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/board" element={<BoardPage />} />
          <Route path="/issue/:id" element={<IssueDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/board" />} />
        </Routes>
      </Router>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        pauseOnHover={false}
        closeOnClick
      />
    </IssueContextProvider>
  );
}