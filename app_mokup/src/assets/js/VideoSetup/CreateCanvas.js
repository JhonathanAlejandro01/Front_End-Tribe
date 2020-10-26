function createCanvas(option){
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '640');
    canvas.setAttribute('height', '480');
    if(option){
      const container = document.createElement('div');
      container.classList.add('container');
      container.appendChild(canvas); //container > canvas
      canvas.setAttribute('autoplay','false');
      canvas.setAttribute('playsinline', 'false');
      canvas.setAttribute('controls', 'false');
      return container;
    }

    return canvas
  }

export default createCanvas;
  