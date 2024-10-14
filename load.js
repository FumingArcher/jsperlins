function loadMapSettings(event) {
    const file = event.target.files[0];
    
    if (!file) {
      alert("No file selected!");
      return;
    }
  
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        const jsonContent = JSON.parse(e.target.result);
  
        // Assuming the JSON structure is consistent
        width = jsonContent.width;
        height = jsonContent.height;
        scl = jsonContent.scale;
        noiseScale = jsonContent.noiseScale;
        zoomFactor = jsonContent.zoomFactor;
        seed = jsonContent.seed;
  
        alert("Settings loaded successfully!");
  
      } catch (error) {
        alert("Error parsing JSON: " + error);
      }
    };
    
    reader.readAsText(file);
  }
  
  document.getElementById('load-json').addEventListener('change', loadMapSettings);
  