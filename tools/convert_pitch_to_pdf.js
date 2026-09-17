const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdPath = path.join(__dirname, '..', 'docs', 'REVIEW_PITCH_SCRIPT.md');
const htmlPath = path.join(__dirname, '..', 'docs', 'REVIEW_PITCH_SCRIPT.html');
const pdfPath = path.join(__dirname, '..', 'docs', 'REVIEW_PITCH_SCRIPT.pdf');

const markdown = fs.readFileSync(mdPath, 'utf-8');

// Basic Markdown to HTML converter with custom styling for Pitch Script
function markdownToHtml(md) {
  let html = md;

  // Escape HTML characters
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Pre-process fenced code blocks
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Headers
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-black text-slate-900 border-b pb-2 mb-4 mt-6">$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-slate-900 border-b pb-1 mb-3 mt-6">$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-base font-bold text-emerald-800 mb-2 mt-4">$1</h3>');
  html = html.replace(/^#### (.*$)/gm, '<h4 class="text-sm font-bold text-slate-800 mb-1 mt-3">$1</h4>');

  // Bold & Italics
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Blockquotes (Callouts)
  html = html.replace(/^&gt;\s*(\*\*\[ACTION:.*?\]\*\*.*$)/gm, '<div class="action-box">$1</div>');
  html = html.replace(/^&gt;\s*(\*\*\[SCREEN:.*?\]\*\*.*$)/gm, '<div class="screen-box">$1</div>');
  html = html.replace(/^&gt;\s*(.*?)$/gm, '<blockquote>$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-6 border-slate-200" />');

  // Tables
  const tableRegex = /((?:\|[^\n]+\|\r?\n)+)/g;
  html = html.replace(tableRegex, (table) => {
    const lines = table.trim().split(/\r?\n/);
    if (lines.length < 2) return table;

    const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
    const rows = lines.slice(2).map(line => line.split('|').slice(1, -1).map(c => c.trim()));

    let tHtml = '<table class="w-full text-left my-4 border-collapse text-xs">';
    tHtml += '<thead><tr class="bg-slate-100 border-b border-slate-300">';
    headers.forEach(h => {
      tHtml += `<th class="p-2 font-bold text-slate-800 border border-slate-200">${h}</th>`;
    });
    tHtml += '</tr></thead><tbody>';

    rows.forEach((row, i) => {
      tHtml += `<tr class="${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}">`;
      row.forEach(c => {
        tHtml += `<td class="p-2 border border-slate-200">${c}</td>`;
      });
      tHtml += '</tr>';
    });

    tHtml += '</tbody></table>';
    return tHtml;
  });

  // Unordered lists
  html = html.replace(/^[-\*]\s+(.*$)/gm, '<li class="ml-4 list-disc text-sm text-slate-700 mb-1">$1</li>');

  // Paragraphs
  html = html.split(/\n\n+/).map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<table') || p.startsWith('<pre') || p.startsWith('<hr') || p.startsWith('<li') || p.startsWith('<blockquote')) {
      return p;
    }
    return `<p class="text-sm text-slate-700 leading-relaxed mb-3">${p}</p>`;
  }).join('\n');

  return html;
}

const bodyContent = markdownToHtml(markdown);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CropEye — HackGrid Review Pitch Script & Defense Card</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');
    
    @page {
      size: A4;
      margin: 15mm;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
      margin: 0;
      padding: 0;
    }

    h1 { font-size: 22px; font-weight: 900; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px; margin-bottom: 12px; }
    h2 { font-size: 16px; font-weight: 800; color: #047857; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 18px; margin-bottom: 10px; page-break-after: avoid; }
    h3 { font-size: 14px; font-weight: 700; color: #065f46; margin-top: 14px; margin-bottom: 6px; page-break-after: avoid; }
    h4 { font-size: 13px; font-weight: 700; color: #1e293b; margin-top: 10px; margin-bottom: 4px; }

    p { margin-bottom: 8px; line-height: 1.55; }
    strong { font-weight: 700; color: #0f172a; }

    table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 11px; page-break-inside: avoid; }
    th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
    th { background-color: #f1f5f9; font-weight: 700; color: #1e293b; }
    tr:nth-child(even) { background-color: #f8fafc; }

    blockquote {
      border-left: 3px solid #059669;
      background-color: #f0fdf4;
      padding: 8px 12px;
      margin: 8px 0;
      color: #064e3b;
      font-size: 12px;
      border-radius: 0 4px 4px 0;
      page-break-inside: avoid;
    }

    .action-box {
      border-left: 3px solid #2563eb;
      background-color: #eff6ff;
      padding: 8px 12px;
      margin: 8px 0;
      color: #1e40af;
      font-size: 12px;
      border-radius: 0 4px 4px 0;
      font-weight: 600;
      page-break-inside: avoid;
    }

    .screen-box {
      border-left: 3px solid #d97706;
      background-color: #fffbeb;
      padding: 8px 12px;
      margin: 8px 0;
      color: #92400e;
      font-size: 12px;
      border-radius: 0 4px 4px 0;
      font-weight: 600;
      page-break-inside: avoid;
    }

    pre {
      background-color: #0f172a;
      color: #38bdf8;
      padding: 10px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      overflow-x: auto;
      line-height: 1.4;
      margin: 10px 0;
      page-break-inside: avoid;
    }

    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      background-color: #f1f5f9;
      padding: 1px 4px;
      border-radius: 3px;
      color: #0f172a;
    }

    pre code {
      background-color: transparent;
      padding: 0;
      color: inherit;
    }

    ul { margin: 6px 0 10px 18px; padding: 0; font-size: 12px; }
    li { margin-bottom: 4px; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 16px 0; }

    .header-banner {
      background: linear-gradient(135deg, #065f46 0%, #047857 100%);
      color: white;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .header-banner h1 { color: white; border-bottom: none; margin: 0 0 6px 0; font-size: 20px; }
    .header-banner p { color: #a7f3d0; margin: 0; font-size: 11px; font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body>
  <div class="header-banner">
    <h1>CropEye — HackGrid Review Pitch Script &amp; Defense Card</h1>
    <p>Team CopyPasta • Agriculture Track • Computer Vision • Autonomous Workflow • Small Businesses (500–5,000 Acres)</p>
  </div>
  ${bodyContent}
</body>
</html>`;

fs.writeFileSync(htmlPath, fullHtml, 'utf-8');
console.log('HTML written to:', htmlPath);

// Locate Edge executable
const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = null;
for (const p of edgePaths) {
  if (fs.existsSync(p)) {
    browserPath = p;
    break;
  }
}

if (!browserPath) {
  console.error('Neither Edge nor Chrome was found to print PDF.');
  process.exit(1);
}

console.log('Using browser at:', browserPath);
const cmd = `"${browserPath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${htmlPath}"`;
console.log('Executing command...');
execSync(cmd, { stdio: 'inherit' });

if (fs.existsSync(pdfPath)) {
  const stats = fs.statSync(pdfPath);
  console.log(`SUCCESS! PDF generated at: ${pdfPath} (${(stats.size / 1024).toFixed(1)} KB)`);
} else {
  console.error('PDF file was not created.');
  process.exit(1);
}
