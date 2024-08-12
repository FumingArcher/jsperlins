function saveSettings(width,height,scale,noiseScale,zoomFactor){
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
   const blob = new Blob([jsonSettings], { type: "application/json"});
   
   const url = URL.createObjectURL(blob);
   const link = document.createElement('a');

   link.href = url;
   link.download = 'map.json';

   
   document.body.appendChild(link);

  
   link.click();

   
   document.body.removeChild(link);
}