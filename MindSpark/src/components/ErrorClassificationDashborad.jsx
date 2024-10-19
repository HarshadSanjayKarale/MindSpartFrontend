import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fetchLogsFromAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/logs');
    if (!response.ok) throw new Error('Failed to fetch logs');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
};

export default function ErrorClassificationDashboard() {
  const [errors, setErrors] = useState([]);
  const [selectedError, setSelectedError] = useState(null);
  const [highAlerts, setHighAlerts] = useState(0);  // Updated to High
  const [infoCount, setInfoCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLogsFromAPI().then((logs) => {
        const parsedLogs = logs.map(log => {
          try {
            const parsedRawResponse = JSON.parse(log.analysis.rawResponse.match(/```json\n([\s\S]*)\n```/)[1]);
            return {
              ...log,
              analysis: {
                ...log.analysis,
                severity: parsedRawResponse.analysis?.severity,
                error: parsedRawResponse.input?.description,
                coreIssue: parsedRawResponse.analysis?.coreIssue,
                classification: parsedRawResponse.analysis?.classification,
                likelyCause: parsedRawResponse.analysis?.likelyCause,
                suggestedSolution: parsedRawResponse.suggestedSolution,
                tips: parsedRawResponse.tips,
              }
            };
          } catch (e) {
            console.error('Failed to parse rawResponse:', e);
            return log;
          }
        });

        setErrors(parsedLogs);

        // Update the counts based on 'High' instead of 'Critical'
        const high = parsedLogs.filter(log => log.analysis?.severity === 'High').length;
        const info = parsedLogs.filter(log => log.analysis?.severity === 'Info').length;
        const warning = parsedLogs.filter(log => log.analysis?.severity === 'Warning').length;

        setHighAlerts(high);
        setInfoCount(info);
        setWarningCount(warning);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const backbuttonfunction = () => {
    navigate('/error-dashboard');
  };

  const getErrorTypeStyle = (severity) => {
    switch (severity) {
      case 'High':  // Changed to High
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
    body: {
      margin: '0',
      padding: '0',
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
      margin:'10px',
    },
    alert: {
      border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
      borderRadius: '5px',
      padding: '10px',
      backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.2)' : 'rgba(173, 216, 230, 0.2)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: '10px',
      marginTop: '20px',  // Added margin from the top
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
          <button style={styles.backButton} onClick={backbuttonfunction}>
            <ArrowLeft size={20} style={{ marginRight: '5px' }} />
            Back
          </button>
          <h1>AI Error Classification Dashboard</h1>
          <div style={styles.headerButtons}>
            <button style={styles.criticalButton} onClick={() => setHighAlerts(0)}>  {/* Updated label */}
              High Alerts: {highAlerts}  {/* Display high alerts */}
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
              {errors.map((error) => (
                <div
                  key={error._id}
                  style={styles.listItem}
                  onClick={() => setSelectedError(error)}
                >
                  <span style={{ ...styles.badge, ...getErrorTypeStyle(error.analysis.severity) }}>
                    {error.analysis?.severity}
                  </span>
                  <span>{new Date(error.time).toLocaleTimeString()}: {error.analysis?.error}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.content}>
            <div style={styles.card}>
              <h2>Error Details</h2>
              {selectedError ? (
                <>
                  <div style={styles.title}>{selectedError.analysis?.error}</div>
                  <div style={styles.subtitle}>
                    {new Date(selectedError.time).toLocaleString()}
                  </div>
                  <div style={{ ...styles.badge1, ...getErrorTypeStyle(selectedError.analysis?.severity) }}>
                    {selectedError.analysis?.severity}
                  </div>
                  
                  <div style={styles.alert}>
                    <h3>Core Issue</h3>
                    <p>{selectedError.analysis?.coreIssue}</p>
                  </div>

                  <div style={styles.alert}>
                    <h3>Classification</h3>
                    <p>{selectedError.analysis?.classification}</p>
                  </div>

                  <div style={styles.alert}>
                    <h3>Likely Cause</h3>
                    <p>{selectedError.analysis?.likelyCause}</p>
                  </div>

                  <div style={styles.alert}>
                    <h3>Suggested Solutions</h3>
                    <ul>
                      {selectedError.analysis?.suggestedSolution?.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.alert}>
                    <h3>Tips</h3>
                    <ul>
                      {selectedError.analysis?.tips?.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
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
