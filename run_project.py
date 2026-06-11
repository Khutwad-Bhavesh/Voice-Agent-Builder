import subprocess
import sys
import time
import os
import signal
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent
VENV_BIN = PROJECT_DIR / "venv" / "bin"

# On Windows, venv bin directory is Scripts
if os.name == "nt":
    VENV_BIN = PROJECT_DIR / "venv" / "Scripts"

UVICORN_PATH = VENV_BIN / ("uvicorn" + (".exe" if os.name == "nt" else ""))
STREAMLIT_PATH = VENV_BIN / ("streamlit" + (".exe" if os.name == "nt" else ""))

processes = []

def cleanup(signum=None, frame=None):
    print("\nShutting down servers...")
    for p in processes:
        try:
            p.terminate()
            p.wait(timeout=2)
        except Exception:
            try:
                p.kill()
            except Exception:
                pass
    sys.exit(0)

# Register shutdown signals
signal.signal(signal.SIGINT, cleanup)
signal.signal(signal.SIGTERM, cleanup)

def main():
    # Check virtual environment
    if not UVICORN_PATH.exists() or not STREAMLIT_PATH.exists():
        print(f"Error: Virtual environment or dependencies not found in {PROJECT_DIR / 'venv'}.")
        print("Please run setup first:")
        print("  python3 -m venv venv")
        print("  venv/bin/pip install -r requirements.txt")
        sys.exit(1)

    print("Starting Voice AI Agent Builder...")
    
    # 1. Start FastAPI backend (uvicorn) on port 8000
    print("Starting FastAPI Backend on http://localhost:8000 ...")
    backend_cmd = [
        str(UVICORN_PATH),
        "main:app",
        "--host", "0.0.0.0",
        "--port", "8000"
    ]
    backend_proc = subprocess.Popen(backend_cmd, cwd=str(PROJECT_DIR))
    processes.append(backend_proc)

    # Give backend a moment to start
    time.sleep(2)

    # 2. Start Next.js frontend on port 3000
    print("Starting Next.js Frontend on http://localhost:3000 ...")
    
    # 2. Start Next.js frontend
    frontend_cmd = [
        "npm",
        "run",
        "dev",
        "--",
        "-p", "3000"
    ]
    
    frontend_dir = PROJECT_DIR / "frontend"
    frontend_proc = subprocess.Popen(frontend_cmd, cwd=str(frontend_dir))
    processes.append(frontend_proc)

    print("\nVoice AI Agent Builder is running!")
    print("  Frontend : http://localhost:3000")
    print("  Backend  : http://localhost:8000")
    print("  API Docs : http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop both servers.")

    # Keep script alive and monitor processes
    try:
        while True:
            # Check if any process terminated unexpectedly
            for p in processes:
                ret = p.poll()
                if ret is not None:
                    print(f"\nOne of the processes terminated unexpectedly with code {ret}.")
                    cleanup()
            time.sleep(1)
    except KeyboardInterrupt:
        cleanup()

if __name__ == "__main__":
    main()
