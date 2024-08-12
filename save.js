function saveSettings(){
    //This collects the data from the html user input
    const width = document.getElementById('width');
    const height = document.getElementById('height')
    const scale = document.getElementById('scale');
    const noiseScale = document.getElementById('noiseScale');
    const zoomFactor = document.getElementById('zoomFactor');

   //creates the JSON object
   const settings = {
    width: width,
    height: height,
    scale: scale,
    noiseScale: noiseScale,
    zoomFactor: zoomFactor
   };


   //Converts JSON object  to a string hehe
   const jsonSettings = JSON.stringify(settings);
   //blobb
   const blob = new blob([jsonSettings], { type: "application/json"});
   
   const link = document.createElement('a');
   link.href = url;
   link.download = 'map.json';

   
   document.body.appendChild(link);

  
   link.click();

   
   document.body.removeChild(link);
}