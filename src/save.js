function saveSettings(width,height,scl,noiseScale,zoomFactor,seed){
   //creates the JSON object
   const settings = {
    width: width,
    height: height,
    scl: scl,
    noiseScale: noiseScale,
    zoomFactor: zoomFactor,
    seed: seed
   };


   //Converts JSON object  to a string
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

   fetch('/api/maps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
})
    .then(response => {
        if (response.ok) {
            console.log('Map saved to database.');
        } else {
            console.error('Failed to save map to database.');
        }
    })
    .catch(err => console.error('Error:', err));
}