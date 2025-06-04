  //helper func for escaping, should be placed in a utils folder
  const basicHtmlEscape = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, 
    char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]
  );
};

export default basicHtmlEscape;