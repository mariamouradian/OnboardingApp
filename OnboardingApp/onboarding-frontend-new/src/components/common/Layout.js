import React from 'react';
import { Helmet } from 'react-helmet';
import NotificationsPanel from '../notifications/NotificationsPanel'; // Исправленный путь

const Layout = ({ children, title = "Onboarding System" }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Helmet>
                <html lang="ru" />
                <meta charSet="utf-8" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>{title}</title>
            </Helmet>

            <header style={{
                padding: '15px 20px',
                background: '#1976d2',
                color: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '24px',
                    fontFamily: "'Roboto', sans-serif"
                }}>
                    Onboarding System
                </h1>

                <NotificationsPanel />
            </header>

            <main style={{
                padding: '20px',
                maxWidth: '1200px',
                margin: '0 auto',
                minHeight: 'calc(100vh - 80px)',
                fontFamily: "'Roboto', sans-serif"
            }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;