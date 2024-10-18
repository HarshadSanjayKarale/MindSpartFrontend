import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeft } from 'lucide-react';

// Load the Poppins font using a link tag
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Mock function to simulate AI classification
const classifyError = async (error) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  const types = ['Critical', 'Warning', 'Info'];
  return {
    type: types[Math.floor(Math.random() * types.length)],
    resolution: `Suggested fix for: ${error}`
  };
};

export default function ErrorClassificationDashboard() {
  const [errors, setErrors] = useState([]);
  const [selectedError, setSelectedError] = useState(null);
  const [criticalAlerts, setCriticalAlerts] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newError = {
        id: Date.now(),
        message: `New error occurred at ${new Date().toLocaleTimeString()}`,
        type: '',
        resolution: '',
        timestamp: new Date()
      };
      classifyError(newError.message).then(result => {
        newError.type = result.type;
        newError.resolution = result.resolution;
        setErrors(prev => [newError, ...prev.slice(0, 99)]);

        // Update counts based on the error type
        if (result.type === 'Critical') {
          setCriticalAlerts(prev => prev + 1);
        } else if (result.type === 'Warning') {
          setWarningCount(prev => prev + 1);
        } else if (result.type === 'Info') {
          setInfoCount(prev => prev + 1);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getErrorTypeStyle = (type) => {
    switch (type) {
      case 'Critical':
        return { backgroundColor: 'rgb(231, 64, 64)', color: 'white' };
      case 'Warning':
        return { backgroundColor: 'orange', color: 'white' };
      case 'Info':
        return { backgroundColor: '#17a2b8', color: 'white' };
      default:
        return { backgroundColor: 'gray', color: 'white' };
    }
  };

  const styles = {
    body:{
      margin:'0',
      padding:'0',

    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#2c2c2c' : '#f8f9fa',
      borderBottom: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
      padding: '10px 20px',
    },
    headerButtons: {
      display: 'flex',
      alignItems: 'center',
    },
    backButton: {
      padding: '10px 15px',
      backgroundColor: 'transparent',
      border: 'none',
      color: isDarkMode ? '#ffffff' : '#000000',
      cursor: 'pointer',
      fontSize: '1em',
      display: 'flex',
      alignItems: 'center',
    },
    criticalButton: {
      padding: '10px 15px',
      border: '1px solid #dc3545',
      backgroundColor: '#dc3545',
      color: '#ffffff',
      cursor: 'pointer',
      fontFamily: 'Poppins, sans-serif',
      borderRadius: '5px',
      margin: '0 5px',
      transition: 'background-color 0.3s, color 0.3s',
      fontSize: '0.9em',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    infoButton: {
      padding: '10px 15px',
      border: '1px solid #17a2b8',
      backgroundColor: '#17a2b8',
      color: '#ffffff',
      cursor: 'pointer',
      fontFamily: 'Poppins, sans-serif',
      borderRadius: '5px',
      margin: '0 5px',
      transition: 'background-color 0.3s, color 0.3s',
      fontSize: '0.9em',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    warningButton: {
      padding: '10px 15px',
      border: '1px solid #ffc107',
      backgroundColor: '#ffc107',
      color: '#ffffff',
      cursor: 'pointer',
      fontFamily: 'Poppins, sans-serif',
      borderRadius: '5px',
      margin: '0 5px',
      transition: 'background-color 0.3s, color 0.3s',
      fontSize: '0.9em',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    toggleButton: {
      padding: '10px 15px',
      backgroundColor: 'transparent',
      border: 'none',
      color: isDarkMode ? '#ffffff' : '#000000',
      cursor: 'pointer',
      fontSize: '1em',
    },
    main: {
      display: 'flex',
      flexGrow: 1,
      overflow: 'hidden',
    },
    sidebar: {
      flex: '0 0 30%',
      borderRight: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
      overflowY: 'auto',
      padding: '10px',
    },
    content: {
      flex: '1 0 40%',
      overflowY: 'auto',
      padding: '10px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '10px',
      borderBottom: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
    },
    badge: {
      borderRadius: '5px',
      padding: '5px 10px',
      marginRight: '10px',
      marginBottom: '10px',
    },
    badge1: {
      borderRadius: '5px',
      padding: '5px 10px',
      marginRight: '10px',
      marginBottom: '20px',
      width: '8%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
      borderRadius: '5px',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: isDarkMode ? '#2c2c2c' : 'white',
      fontFamily: 'Poppins, sans-serif',
    },
    alert: {
      border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
      borderRadius: '5px',
      padding: '10px',
      backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.2)' : 'rgba(173, 216, 230, 0.2)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    title: {
      fontSize: '1.2em',
      marginBottom: '5px',
      fontFamily: 'Poppins, sans-serif',
    },
    subtitle: {
      color: isDarkMode ? '#aaa' : '#666',
      fontSize: '0.9em',
      marginBottom: '10px',
      fontFamily: 'Poppins, sans-serif',
    },
  };

  return (
    <div style={styles.body}>
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => console.log('Back button clicked')}>
          <ArrowLeft size={20} style={{ marginRight: '5px' }} />
          Back
        </button>
        <h1>AI Error Classification Dashboard</h1>
        <div style={styles.headerButtons}>
          <button style={styles.criticalButton} onClick={() => setCriticalAlerts(0)}>
            Critical Alerts: {criticalAlerts}
          </button>
          <button style={styles.infoButton} onClick={() => setInfoCount(0)}>
            Info: {infoCount}
          </button>
          <button style={styles.warningButton} onClick={() => setWarningCount(0)}>
            Warning: {warningCount}
          </button>
          <button style={styles.toggleButton} onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.sidebar}>
          <div style={styles.card}>
            <h2>Error List</h2>
            {errors.map(error => (
              <div
                key={error.id}
                style={styles.listItem}
                onClick={() => setSelectedError(error)}
              >
                <span style={{ ...styles.badge, ...getErrorTypeStyle(error.type) }}>
                  {error.type}
                </span>
                <span>{error.message}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <h2>Error Details</h2>
            {selectedError ? (
              <>
                <div style={styles.title}>{selectedError.message}</div>
                <div style={styles.subtitle}>
                  {selectedError.timestamp.toLocaleString()}
                </div>
                <div style={{ ...styles.badge1, ...getErrorTypeStyle(selectedError.type) }}>
                  {selectedError.type}
                </div>
                <div style={styles.alert}>
                  <h3>Suggested Resolution</h3>
                  <p>{selectedError.resolution}</p>
                </div>
              </>
            ) : (
              <p style={{ textAlign: 'center', color: isDarkMode ? '#aaa' : '#666' }}>
                Select an error to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}