import os
import json
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, HTTPServer


def init_config():
    # Load environment variables from .env manually
    env_path = Path(".env")

    if env_path.exists():
        with env_path.open() as f:
            for line in f:
                if line.strip() and not line.startswith("#"):
                    key, value = line.strip().split("=", 1)
                    os.environ[key] = value  # Set environment variable

    # Read the secret key from environment (or use a default)
    JAWG_MAP_KEY = os.getenv("JAWG_MAP_KEY", "default-secret")

    # Generate config.json dynamically
    config = {
        "JAWG_MAP_KEY": JAWG_MAP_KEY
    }

    with open("config.json", "w") as f:
        json.dump(config, f, indent=4)

    print("✅ Config file generated: config.json")


def run_server():
    # Set up and run the HTTP server within the same process
    PORT = 8000  # Change if needed
    server_address = ("", PORT)

    class CustomHandler(SimpleHTTPRequestHandler):
        def log_message(self, format, *args):
            return  # Suppress logging for cleaner output

    print(f"🚀 Starting server on http://localhost:{PORT}")
    httpd = HTTPServer(server_address, CustomHandler)
    httpd.serve_forever()  # Keeps running until you stop it (Ctrl+C)


init_config()
run_server()
