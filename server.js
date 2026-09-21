import http from "node:http";

const port = Number(process.env.PORT || 8080);
const started = new Date();
let hits = 0;

const page = (req) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>FadeHost app hosting demo</title>
<style>body{font:16px/1.5 system-ui,sans-serif;background:#0b0b0d;color:#e4e4e7;margin:0;padding:48px 24px;max-width:720px}
h1{font-weight:500;font-size:28px;margin:0 0 8px}code{background:#18181b;padding:2px 6px;border-radius:6px}dl{display:grid;grid-template-columns:max-content 1fr;gap:8px 24px}dt{color:#a1a1aa}</style></head>
<body><h1>It works.</h1><p>This page is served by a hosted app on FadeHost through its web address.</p>
<dl><dt>Listening on</dt><dd><code>PORT=${port}</code></dd>
<dt>Public URL</dt><dd><code>${process.env.APP_URL || "(not set)"}</code></dd>
<dt>Host header</dt><dd><code>${req.headers.host || ""}</code></dd>
<dt>Visitor</dt><dd><code>${req.headers["cf-connecting-ip"] || req.socket.remoteAddress || ""}</code> via <code>${req.headers["x-forwarded-for"] || "direct"}</code></dd>
<dt>Started</dt><dd>${started.toISOString()}</dd><dt>Requests</dt><dd>${hits}</dd></dl></body></html>`;

http.createServer((req, res) => {
  hits += 1;
  if (req.url === "/health") { res.writeHead(200, { "content-type": "application/json" }); res.end(JSON.stringify({ ok: true, port, uptime: process.uptime() })); return; }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(page(req));
}).listen(port, "0.0.0.0", () => console.log(`demo listening on ${port}`));
