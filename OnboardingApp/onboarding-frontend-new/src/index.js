import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Функция для скрытия экрана загрузки
const hideLoadingScreen = () => {
  if (typeof window !== 'undefined' && window.hideLoadingScreen) {
    window.hideLoadingScreen();
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App onAppReady={hideLoadingScreen} />
  </React.StrictMode>
);

// Скрываем экран загрузки после рендера
setTimeout(hideLoadingScreen, 1000);