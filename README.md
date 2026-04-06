# AeroFlutter Multi-Agent Bridge

## Project Introduction

AeroFlutter is an experimental multi-agent bridge designed to automate the transformation of React UI and Logic into high-fidelity Flutter code using Vision-driven feedback loops. The project orchestrates several AI agents to parse source code, generate translations, and visually compare the resulting application on an actual or simulated device via the Android Debug Bridge (ADB).

### Multi-Agent Architecture

The system utilizes a structured state machine (`INIT` -> `BUILD` -> `SENSE` -> `COMPARE` -> `SUCCESS`) driven by specialized AI roles:

- **CEO Agent (Claude-3.5-Sonnet):** The strategist orchestrating the entire workflow and deciding when the translation meets the > 95% similarity threshold.
- **Source Auditor (Claude-3.5-Sonnet):** The logic analyst responsible for parsing React source files (`.tsx`/`.css`) to extract style variables, Flexbox logic, and functional hooks.
- **Visual Scout (MiniMax-6-Vision):** The perception engine that executes ADB commands to capture live UI visuals and extract UI representations (like Paperclip AI DSL).
- **Flutter Architect (Claude-3.5-Sonnet):** The builder that generates and refactors the `.dart` code and handles Hot Reload triggers.
- **QA Inspector (MiniMax-6-Vision):** The validator that performs comparative visual analysis between the React Dev-Server and the Flutter application.

## Usage Instructions

This project consists of two main parts: a Python backend script that orchestrates the workflow, and a React frontend dashboard to visualize the simulation.

### Prerequisites

To run the backend workflow, you must export the following environment variables:

```bash
export ANTHROPIC_API_KEY="your-anthropic-api-key"
export ADB_CONNECTION="your-adb-connection-string"
```

### Running the Python Backend

First, ensure you have the required Python dependencies installed:

```bash
pip install -r requirements.txt
```

Run the backend script:

```bash
python aeroflutter.py
```

*Note: If the environment variables are missing, the script will pause and prompt you to input them.*

### Running the Visualization Dashboard

The visual interface (Jules Visualization Panel) is built with React and Vite. It simulates and displays the workflow states, visual similarity trends, and agent logs.

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the Node.js dependencies (if you haven't already):
   ```bash
   npm install
   ```
   > **Troubleshooting:** If you encounter a native binding error like `Cannot find native binding...` or an issue related to `rolldown` and optional dependencies (a known `npm` bug across platforms), run the following command to clear your modules and reinstall:
   > ```bash
   > rm -rf node_modules package-lock.json && npm install
   > ```

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided local URL (typically `http://localhost:5173/`) in your browser to view the dashboard and click **"Start Workflow Simulation"** to watch the multi-agent system in action.
