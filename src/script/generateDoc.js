function generateWord(contentMarkdown, fileName) {
    const contentHTML = marked.parse(contentMarkdown);
  
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <style>
          body { font-family: "Segoe UI", sans-serif; line-height: 1.6; padding: 20px; }
          h1 { font-size: 28px; color: #2e3b4e; }
          h2 { font-size: 24px; color: #3f4c63; }
          h3 { font-size: 20px; color: #4e5d78; }
          p { margin-bottom: 12px; }
          ul, ol { margin: 12px 0; padding-left: 24px; }
          li { margin-bottom: 6px; }
          strong { font-weight: bold; }
          em { font-style: italic; }
        </style>
      </head><body>`;
  
    const footer = `</body></html>`;
    const html = header + contentHTML + footer;
  
    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  