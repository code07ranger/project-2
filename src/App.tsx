import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Explore from './pages/Explore';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Join from './pages/Join';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="explore" element={<Explore />} />
                  <Route path="events" element={<Events />} />
                  <Route path="events/:slug" element={<EventDetail />} />
                  <Route path="join" element={<Join />} />
                  <Route path="student" element={<StudentDashboard />} />
                  <Route path="dashboard" element={<Navigate to="/student" replace />} />
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

