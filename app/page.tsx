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

PORT = 6969

class Handler(http.server.BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_headers()
        self.end_headers()

    def do_POST(self):
        if self.path == '/apply':
            print("[*] Apply Spoof triggered")
            subprocess.Popen('cmd.exe /c start cmd.exe /k "echo Hello World"', shell=True)
            self.send_response(200)
            self._set_headers()
            self.end_headers()
            self.wfile.write(b'OK')
        elif self.path == '/applyv2':
            print("[*] Apply Spoof v2 triggered")
            subprocess.Popen('cmd.exe /c start cmd.exe /k "echo Apply Spoof V2"', shell=True)
            self.send_response(200)
            self._set_headers()
            self.end_headers()
            self.wfile.write(b'OK')
        elif self.path == '/clear':
            print("[*] Clear Spoof triggered")
            subprocess.Popen('cmd.exe /c start cmd.exe /k "echo Clear Spoof"', shell=True)
            self.send_response(200)
            self._set_headers()
            self.end_headers()
            self.wfile.write(b'OK')
        elif self.path == '/check':
            print("[*] Check Spoof triggered")
            subprocess.Popen('cmd.exe /c start cmd.exe /k "echo Check Spoof"', shell=True)
            self.send_response(200)
            self._set_headers()
            self.end_headers()
            self.wfile.write(b'OK')
        else:
            self.send_response(404)
            self._set_headers()
            self.end_headers()
            self.wfile.write(b'NOT FOUND')

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"[+] Listening on port {PORT}")
        httpd.serve_forever()
