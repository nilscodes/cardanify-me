export const createCircularImage = (image: any, onComplete: Function) => {
  const sizes = [210, 125, 105, 88, 70];
  const canvases = sizes.map(() => document.createElement('canvas') as any);
  const img = new Image();

  img.src = image;
  img.onload = () => {
    const size = Math.min(img.width, img.height);
    canvases.forEach((canvas, index) => {
      canvas.width = sizes[index];
      canvas.height = sizes[index];
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, canvas.width, canvas.height);

      ctx.restore();
    });

    drawOnLargeCanvas(canvases, onComplete);
  };
};

const drawOnLargeCanvas = (images: CanvasImageSource[], onComplete: Function) => {
  const largeCanvas = document.createElement('canvas');
  largeCanvas.width = 1600;
  largeCanvas.height = 1600;
  const ctx = largeCanvas.getContext('2d') as any;

  const locations = [
    [{ x: 570, y: 480 }, { x: 817, y: 480 }, { x: 446, y: 694 }, { x: 942, y: 694 }, { x: 570, y: 909 }, { x: 817, y: 909 }],
    [{ x: 736, y: 312 }, { x: 370, y: 525 }, { x: 1105, y: 525 }, { x: 370, y: 950 }, { x: 736, y: 1162 }, { x: 1105, y: 950 }],
    [{ x: 470, y: 270 }, { x: 1020, y: 270 }, { x: 470, y: 1225 }, { x: 1020, y: 1225 }, { x: 195, y: 750 }, { x: 1300, y: 750 }],
    [{ x: 167, y: 417 }, { x: 167, y: 1093 }, { x: 754, y: 75 }, { x: 754, y: 1435 }, { x: 1342, y: 415 }, { x: 1342, y: 1093 }],
    [{ x: 390, y: 120 }, { x: 1138, y: 120 }, { x: 1512, y: 764 }, { x: 18, y: 764 }, { x: 390, y: 1412 }, { x: 1138, y: 1412 }],
  ];

  images.forEach((canvas, idx) => {
    locations[idx].forEach((location) => {
      ctx.drawImage(canvas, location.x, location.y);
    });
  });

  addWatermarkToCanvas(largeCanvas, '/watermark.png', onComplete);
};

function addWatermarkToCanvas(canvas: HTMLCanvasElement, watermarkUrl: string, onComplete: Function) {
  const watermark = new Image();
  watermark.src = watermarkUrl;

  watermark.onload = () => {
    // Set watermark size
    const scale = .75; // Adjust scale factor to desired watermark size
    const watermarkWidth = watermark.width * scale;
    const watermarkHeight = watermark.height * scale;

    // Set watermark position
    const x = canvas.width - watermarkWidth - 10; // 10 pixels from the right edge
    const y = canvas.height - watermarkHeight - 10; // 10 pixels from the bottom edge

    // Draw the watermark on the canvas
    const ctx = canvas.getContext('2d') as any;
    ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);
    ctx.restore();
    onComplete(canvas.toDataURL());
  };

  watermark.onerror = (e) => {
    console.error("Error loading watermark image", e);
  };
}