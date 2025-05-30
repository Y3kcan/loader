// --- page.tsx ---
"use client"

import { MenuBar } from "@/components/menu-bar"
import { ThemeToggle, DiscordButton, MusicButton, GitBookButton, CheatGlobalButton } from "@/components/theme-toggle"
import { AuthorCredit } from "@/components/author-credit"

export default function Page() {
  const applySpoof = () => {
    fetch("http://localhost:6969/apply", { method: "POST" })
      .then(res => res.text())
      .then(data => console.log("[Apply Spoof]:", data))
      .catch(err => console.error("[Apply Spoof Error]:", err));
  };

  const applySpoofV2 = () => {
    fetch("http://localhost:6969/applyv2", { method: "POST" })
      .then(res => res.text())
      .then(data => console.log("[Apply Spoof v2]:", data))
      .catch(err => console.error("[Apply Spoof v2 Error]:", err));
  };

  const clearSpoof = () => {
    fetch("http://localhost:6969/clear", { method: "POST" })
      .then(res => res.text())
      .then(data => console.log("[Clear Spoof]:", data))
      .catch(err => console.error("[Clear Spoof Error]:", err));
  };

  const checkSpoof = () => {
    fetch("http://localhost:6969/check", { method: "POST" })
      .then(res => res.text())
      .then(data => console.log("[Check Spoof]:", data))
      .catch(err => console.error("[Check Spoof Error]:", err));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/valorant-bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <AuthorCredit />
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <MusicButton />
        <GitBookButton />
        <CheatGlobalButton />
        <DiscordButton />
        <ThemeToggle />
      </div>

      <MenuBar
        onApplySpoof={applySpoof}
        onApplySpoofV2={applySpoofV2}
        onClearSpoof={clearSpoof}
        onCheckSpoof={checkSpoof}
      />
    </div>
  )
}


// --- spoof_listener.py ---
import http.server
import socketserver
import subprocess
import ctypes
import time
import pyautogui
import pygetwindow as gw

PORT = 6969

class CORSRequestHandler(http.server.BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_headers()
        self.end_headers()

    def do_POST(self):
        matched = True

        if self.path == '/apply':
            print("[*] Apply Spoof triggered")
            subprocess.Popen(["cmd.exe", "/k", "echo APPLY SPOOF çalıştı"])
        elif self.path == '/applyv2':
            print("[*] Apply Spoof v2 triggered")
            subprocess.Popen(["cmd.exe", "/k", "echo APPLY SPOOF V2 çalıştı"])
        elif self.path == '/clear':
            print("[*] Clear Spoof triggered")
            subprocess.Popen(["cmd.exe", "/k", "echo CLEAR SPOOF çalıştı"])
        elif self.path == '/check':
            print("[*] Check Spoof triggered")
            subprocess.Popen(["cmd.exe", "/k", "echo CHECK SPOOF çalıştı"])
        else:
            matched = False

        if matched:
            self.send_response(200)
            self._set_headers()
            self.end_headers()
            self.wfile.write(b'OK')
        else:
            self.send_response(404)
            self._set_headers()
            self.end_headers()
            self.wfile.write(b'NOT FOUND')

def hide_console():
    ctypes.windll.user32.ShowWindow(ctypes.windll.kernel32.GetConsoleWindow(), 0)

def open_browser():
    chrome_path = r"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    url = "https://loader-five-tan.vercel.app/"
    subprocess.Popen([chrome_path, "--new-window", url, "--window-size=1920,1080"])
    time.sleep(2)

    for w in gw.getWindowsWithTitle(' - Google Chrome'):
        w.activate()
        w.maximize()
        time.sleep(1)
        pyautogui.press('f11')
        break

if __name__ == "__main__":
    hide_console()
    open_browser()
    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        print(f"[+] Listening on port {PORT}")
        httpd.serve_forever()
