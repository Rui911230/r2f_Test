import { useState, useEffect } from 'react';
import './App.css';

const WORKFLOW_STATES = ['INIT', 'BUILD', 'SENSE', 'COMPARE', 'SUCCESS'];
const MAX_CYCLES = 10;

function App() {
  const [currentState, setCurrentState] = useState('INIT');
  const [cycleCount, setCycleCount] = useState(1);
  const [similarity, setSimilarity] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const addLog = (agent, status, payload) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}][${agent}][${status}][${JSON.stringify(payload)}]`;
    setLogs(prev => [...prev, logEntry]);
  };

  useEffect(() => {
    if (!isRunning) return;

    let timeout;

    const simulateWorkflow = () => {
      if (currentState === 'SUCCESS' || cycleCount >= MAX_CYCLES) {
        setIsRunning(false);
        return;
      }

      if (currentState === 'INIT') {
        addLog("CEO Agent", "STARTED", { task: "Analyze React source & orchestrate workflow" });
        setTimeout(() => {
          addLog("CEO Agent", "COMPLETED", { status: "Analysis complete, assigning tasks" });
          addLog("Source Auditor", "STARTED", { task: "Extract Metadata from React source" });
          setTimeout(() => {
            addLog("Source Auditor", "COMPLETED", { status: "Metadata extracted", variables: 12, hooks: 3 });
            setCurrentState('BUILD');
          }, 500);
        }, 500);
      } else if (currentState === 'BUILD') {
        addLog("Flutter Architect", "STARTED", { task: "Generate Dart code and trigger Hot Reload" });
        setTimeout(() => {
          addLog("Flutter Architect", "COMPLETED", { status: "Dart code generated, Hot Reload triggered" });
          setCurrentState('SENSE');
        }, 800);
      } else if (currentState === 'SENSE') {
        addLog("Visual Scout", "STARTED", { task: "Capture ADB screenshot and extract UI DSL" });
        setTimeout(() => {
          addLog("Visual Scout", "COMPLETED", { status: "Screenshot captured", diff_found: true });
          setCurrentState('COMPARE');
        }, 800);
      } else if (currentState === 'COMPARE') {
        addLog("QA Inspector", "STARTED", { task: "Compute visual similarity" });
        setTimeout(() => {
          const newSimilarity = Math.min(similarity + 15, 100);
          addLog("QA Inspector", "COMPLETED", { similarity: newSimilarity });
          setSimilarity(newSimilarity);

          addLog("CEO Agent", "DECISION_STARTED", { task: "Evaluate if similarity > 95%" });
          setTimeout(() => {
            if (newSimilarity > 95) {
              addLog("CEO Agent", "DECISION_MADE", { result: "SUCCESS", similarity: newSimilarity });
              setCurrentState('SUCCESS');
            } else {
              addLog("CEO Agent", "DECISION_MADE", { result: "LOOP to BUILD", similarity: newSimilarity });
              setCurrentState('BUILD');
              setCycleCount(prev => prev + 1);
            }
          }, 300);
        }, 600);
      }
    };

    timeout = setTimeout(simulateWorkflow, 1000);
    return () => clearTimeout(timeout);
  }, [currentState, isRunning, cycleCount, similarity]);

  const startSimulation = () => {
    setCurrentState('INIT');
    setCycleCount(1);
    setSimilarity(0);
    setLogs([]);
    setIsRunning(true);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>AeroFlutter Jules Visualization Panel</h1>
        <button onClick={startSimulation} disabled={isRunning} className="run-button">
          {isRunning ? 'Running Simulation...' : 'Start Workflow Simulation'}
        </button>
      </header>

      <div className="dashboard-grid">
        <div className="panel map-panel">
          <h2>Live Progress Map</h2>
          <div className="progress-map">
            {WORKFLOW_STATES.map((state, index) => (
              <div key={state} className={`map-node ${currentState === state ? 'active' : ''} ${WORKFLOW_STATES.indexOf(currentState) > index ? 'completed' : ''}`}>
                <div className="node-circle">{index + 1}</div>
                <div className="node-label">{state}</div>
                {index < WORKFLOW_STATES.length - 1 && <div className="node-line"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="panel metrics-panel">
          <h2>Metrics</h2>
          <div className="metric">
            <span>Cycle Counter</span>
            <div className="metric-value">{cycleCount} / {MAX_CYCLES}</div>
          </div>
          <div className="metric">
            <span>Visual Similarity Trend</span>
            <div className="metric-value">{similarity}%</div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${similarity}%`, backgroundColor: similarity > 95 ? '#4caf50' : '#2196f3' }}></div>
            </div>
          </div>
        </div>

        <div className="panel logs-panel">
          <h2>Agent Logs</h2>
          <div className="logs-container">
            {logs.length === 0 ? (
              <p className="empty-logs">No logs yet. Start simulation.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-entry">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
