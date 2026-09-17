const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdPath = path.join(__dirname, '..', 'docs', 'BUSINESS_DOCUMENT.md');
const htmlPath = path.join(__dirname, '..', 'docs', 'BUSINESS_DOCUMENT.html');
const pdfPath = path.join(__dirname, '..', 'docs', 'BUSINESS_DOCUMENT.pdf');

const markdown = fs.readFileSync(mdPath, 'utf-8');

function markdownToHtml(md) {
  let html = md;

  // Escape HTML characters
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Headers
  html = html.replace(/^# (.*$)/gm, '<h1 class="doc-title">$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="section-title">$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="subsection-title">$1</h3>');
  html = html.replace(/^#### (.*$)/gm, '<h4 class="minor-title">$1</h4>');

  // Bold & Italics
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Callouts & Blockquotes
  html = html.replace(/^&gt;\s*(.*?)$/gm, '<div class="callout-box">$1</div>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="divider" />');

  // Tables
  const tableRegex = /((?:\|[^\n]+\|\r?\n)+)/g;
  html = html.replace(tableRegex, (table) => {
    const lines = table.trim().split(/\r?\n/);
    if (lines.length < 2) return table;

    const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
    const rows = lines.slice(2).map(line => line.split('|').slice(1, -1).map(c => c.trim()));

    let tHtml = '<div class="table-wrapper"><table class="data-table"><thead><tr>';
    headers.forEach(h => {
      tHtml += `<th>${h}</th>`;
    });
    tHtml += '</tr></thead><tbody>';

    rows.forEach(r => {
      if (r.length === 0 || (r.length === 1 && r[0] === '')) return;
      tHtml += '<tr>';
      r.forEach((c, idx) => {
        const isHighlight = c.includes('CropEye') || c.includes('✅') || idx === headers.length - 1;
        tHtml += `<td class="${isHighlight ? 'highlight-cell' : ''}">${c}</td>`;
      });
      tHtml += '</tr>';
    });

    tHtml += '</tbody></table></div>';
    return tHtml;
  });

  // Lists
  const listRegex = /((?:^[\*\-]\s+[^\n]+\r?\n?)+)/gm;
  html = html.replace(listRegex, (match) => {
    const items = match.trim().split(/\r?\n/);
    let lHtml = '<ul class="bullet-list">';
    items.forEach(it => {
      const text = it.replace(/^[\*\-]\s+/, '');
      lHtml += `<li>${text}</li>`;
    });
    lHtml += '</ul>';
    return lHtml;
  });

  // Numbered lists
  const numListRegex = /((?:^\d+\.\s+[^\n]+\r?\n?)+)/gm;
  html = html.replace(numListRegex, (match) => {
    const items = match.trim().split(/\r?\n/);
    let lHtml = '<ol class="ordered-list">';
    items.forEach(it => {
      const text = it.replace(/^\d+\.\s+/, '');
      lHtml += `<li>${text}</li>`;
    });
    lHtml += '</ol>';
    return lHtml;
  });

  // Paragraphs
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h1') || p.startsWith('<h2') || p.startsWith('<h3') || p.startsWith('<h4') ||
        p.startsWith('<div') || p.startsWith('<table') || p.startsWith('<ul') || p.startsWith('<ol') ||
        p.startsWith('<pre') || p.startsWith('<hr')) {
      return p;
    }
    return `<p class="body-text">${p}</p>`;
  }).join('\n\n');

  return html;
}

const bodyContent = markdownToHtml(markdown);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CropEye — HackGrid Official Business Document</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .header-card {
      background: linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%);
      color: #ffffff;
      padding: 24px;
      border-radius: 10px;
      margin-bottom: 24px;
      border: 1px solid #047857;
    }

    .header-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 8.5pt;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .doc-title {
      font-size: 20pt;
      font-weight: 900;
      color: #ffffff;
      margin: 0 0 6px 0;
      letter-spacing: -0.5px;
      border-bottom: none;
    }

    .doc-subtitle {
      font-size: 10pt;
      color: #a7f3d0;
      margin: 0;
      font-weight: 500;
    }

    .section-title {
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2px solid #059669;
      padding-bottom: 4px;
      margin-top: 24px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }

    .subsection-title {
      font-size: 11pt;
      font-weight: 700;
      color: #065f46;
      margin-top: 16px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }

    .body-text {
      font-size: 9.5pt;
      line-height: 1.55;
      color: #334155;
      margin-top: 0;
      margin-bottom: 10px;
    }

    .callout-box {
      background: #ecfdf5;
      border-left: 4px solid #059669;
      padding: 12px 14px;
      border-radius: 0 6px 6px 0;
      font-size: 9pt;
      color: #065f46;
      margin: 14px 0;
      line-height: 1.5;
    }

    .divider {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 20px 0;
    }

    .table-wrapper {
      margin: 14px 0;
      overflow-x: auto;
      page-break-inside: avoid;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      font-family: 'JetBrains Mono', monospace;
    }

    .data-table th {
      background: #f1f5f9;
      color: #1e293b;
      font-weight: 700;
      padding: 8px 10px;
      border: 1px solid #cbd5e1;
      text-align: left;
    }

    .data-table td {
      padding: 7px 10px;
      border: 1px solid #e2e8f0;
      color: #334155;
    }

    .data-table tr:nth-child(even) {
      background: #f8fafc;
    }

    .data-table td.highlight-cell {
      background: #ecfdf5;
      color: #065f46;
      font-weight: 600;
    }

    .bullet-list, .ordered-list {
      margin: 6px 0 12px 20px;
      padding: 0;
      font-size: 9.5pt;
      color: #334155;
      line-height: 1.55;
    }

    .bullet-list li, .ordered-list li {
      margin-bottom: 6px;
    }

    strong {
      color: #0f172a;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="header-card">
    <div class="header-badge">HACKGRID OFFICIAL DELIVERABLE • TEAM COPYPASTA</div>
    <div class="doc-title">CropEye: Official Business Document</div>
    <div class="doc-subtitle">Autonomous Computer Vision Crop Pathology &amp; Precision Spray Defense Platform | Commercial Family Farms (500–5,000 Acres)</div>
  </div>

  ${bodyContent}
</body>
</html>`;

fs.writeFileSync(htmlPath, fullHtml, 'utf-8');
console.log('Business Document HTML written to:', htmlPath);

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
  console.log(`SUCCESS! Business Document PDF generated at: ${pdfPath} (${(stats.size / 1024).toFixed(1)} KB)`);
} else {
  console.error('PDF file was not created.');
  process.exit(1);
}
