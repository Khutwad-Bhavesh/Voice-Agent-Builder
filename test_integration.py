import subprocess
import time
import requests
import sys

def test_integration():
    print("1. Starting FastAPI backend server in test mode...")
    proc = subprocess.Popen(
        ["venv/bin/uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]
    )
    
    # Wait for the backend to start
    time.sleep(3)
    
    success = True
    try:
        # Test 1: Health check
        print("2. Testing health check endpoint...")
        res = requests.get("http://127.0.0.1:8000/")
        print(f"   Status: {res.status_code}")
        print(f"   Response: {res.json()}")
        assert res.status_code == 200
        assert res.json()["status"] == "online"
        print("   -> Health check passed!")
        
        # Test 2: TTS endpoint
        print("3. Testing TTS synthesis endpoint...")
        payload = {"text": "Namaste, aap kaise hain?", "language": "Hinglish"}
        res_tts = requests.post("http://127.0.0.1:8000/api/tts", json=payload)
        print(f"   Status: {res_tts.status_code}")
        print(f"   Content Length: {len(res_tts.content)} bytes")
        assert res_tts.status_code == 200
        assert len(res_tts.content) > 0
        assert res_tts.headers.get("content-type") == "audio/mpeg"
        print("   -> TTS synthesis passed!")

    except Exception as e:
        print(f"❌ Test failed: {e}")
        success = False
    finally:
        print("4. Shutting down FastAPI server...")
        proc.terminate()
        proc.wait()
        print("   -> Server shut down.")
    
    if success:
        print("🎉 All integration tests passed successfully!")
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    test_integration()
