let canvas;
let pixelSize = 4;
let currentTool = 'pixel';
let shapes = [];
let shapeCounter = 0;
let tempShape = null;
let polygonPoints = [];
let pixelPoints = [];
let isDrawing = false;
let currentColor = 'SSD1306_WHITE';
const fontData = [
    0x00, 0x00, 0x00, 0x00, 0x00, 0x3E, 0x5B, 0x4F, 0x5B, 0x3E, 0x3E, 0x6B,
    0x4F, 0x6B, 0x3E, 0x1C, 0x3E, 0x7C, 0x3E, 0x1C, 0x18, 0x3C, 0x7E, 0x3C,
    0x18, 0x1C, 0x57, 0x7D, 0x57, 0x1C, 0x1C, 0x5E, 0x7F, 0x5E, 0x1C, 0x00,
    0x18, 0x3C, 0x18, 0x00, 0xFF, 0xE7, 0xC3, 0xE7, 0xFF, 0x00, 0x18, 0x24,
    0x18, 0x00, 0xFF, 0xE7, 0xDB, 0xE7, 0xFF, 0x30, 0x48, 0x3A, 0x06, 0x0E,
    0x26, 0x29, 0x79, 0x29, 0x26, 0x40, 0x7F, 0x05, 0x05, 0x07, 0x40, 0x7F,
    0x05, 0x25, 0x3F, 0x5A, 0x3C, 0xE7, 0x3C, 0x5A, 0x7F, 0x3E, 0x1C, 0x1C,
    0x08, 0x08, 0x1C, 0x1C, 0x3E, 0x7F, 0x14, 0x22, 0x7F, 0x22, 0x14, 0x5F,
    0x5F, 0x00, 0x5F, 0x5F, 0x06, 0x09, 0x7F, 0x01, 0x7F, 0x00, 0x66, 0x89,
    0x95, 0x6A, 0x60, 0x60, 0x60, 0x60, 0x60, 0x94, 0xA2, 0xFF, 0xA2, 0x94,
    0x08, 0x04, 0x7E, 0x04, 0x08, 0x10, 0x20, 0x7E, 0x20, 0x10, 0x08, 0x08,
    0x2A, 0x1C, 0x08, 0x08, 0x1C, 0x2A, 0x08, 0x08, 0x1E, 0x10, 0x10, 0x10,
    0x10, 0x0C, 0x1E, 0x0C, 0x1E, 0x0C, 0x30, 0x38, 0x3E, 0x38, 0x30, 0x06,
    0x0E, 0x3E, 0x0E, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x5F,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x07, 0x00, 0x14, 0x7F, 0x14, 0x7F, 0x14,
    0x24, 0x2A, 0x7F, 0x2A, 0x12, 0x23, 0x13, 0x08, 0x64, 0x62, 0x36, 0x49,
    0x56, 0x20, 0x50, 0x00, 0x08, 0x07, 0x03, 0x00, 0x00, 0x1C, 0x22, 0x41,
    0x00, 0x00, 0x41, 0x22, 0x1C, 0x00, 0x2A, 0x1C, 0x7F, 0x1C, 0x2A, 0x08,
    0x08, 0x3E, 0x08, 0x08, 0x00, 0x80, 0x70, 0x30, 0x00, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x00, 0x00, 0x60, 0x60, 0x00, 0x20, 0x10, 0x08, 0x04, 0x02,
    0x3E, 0x51, 0x49, 0x45, 0x3E, 0x00, 0x42, 0x7F, 0x40, 0x00, 0x72, 0x49,
    0x49, 0x49, 0x46, 0x21, 0x41, 0x49, 0x4D, 0x33, 0x18, 0x14, 0x12, 0x7F,
    0x10, 0x27, 0x45, 0x45, 0x45, 0x39, 0x3C, 0x4A, 0x49, 0x49, 0x31, 0x41,
    0x21, 0x11, 0x09, 0x07, 0x36, 0x49, 0x49, 0x49, 0x36, 0x46, 0x49, 0x49,
    0x29, 0x1E, 0x00, 0x00, 0x14, 0x00, 0x00, 0x00, 0x40, 0x34, 0x00, 0x00,
    0x00, 0x08, 0x14, 0x22, 0x41, 0x14, 0x14, 0x14, 0x14, 0x14, 0x00, 0x41,
    0x22, 0x14, 0x08, 0x02, 0x01, 0x59, 0x09, 0x06, 0x3E, 0x41, 0x5D, 0x59,
    0x4E, 0x7C, 0x12, 0x11, 0x12, 0x7C, 0x7F, 0x49, 0x49, 0x49, 0x36, 0x3E,
    0x41, 0x41, 0x41, 0x22, 0x7F, 0x41, 0x41, 0x41, 0x3E, 0x7F, 0x49, 0x49,
    0x49, 0x41, 0x7F, 0x09, 0x09, 0x09, 0x01, 0x3E, 0x41, 0x41, 0x51, 0x73,
    0x7F, 0x08, 0x08, 0x08, 0x7F, 0x00, 0x41, 0x7F, 0x41, 0x00, 0x20, 0x40,
    0x41, 0x3F, 0x01, 0x7F, 0x08, 0x14, 0x22, 0x41, 0x7F, 0x40, 0x40, 0x40,
    0x40, 0x7F, 0x02, 0x1C, 0x02, 0x7F, 0x7F, 0x04, 0x08, 0x10, 0x7F, 0x3E,
    0x41, 0x41, 0x41, 0x3E, 0x7F, 0x09, 0x09, 0x09, 0x06, 0x3E, 0x41, 0x51,
    0x21, 0x5E, 0x7F, 0x09, 0x19, 0x29, 0x46, 0x26, 0x49, 0x49, 0x49, 0x32,
    0x03, 0x01, 0x7F, 0x01, 0x03, 0x3F, 0x40, 0x40, 0x40, 0x3F, 0x1F, 0x20,
    0x40, 0x20, 0x1F, 0x3F, 0x40, 0x38, 0x40, 0x3F, 0x63, 0x14, 0x08, 0x14,
    0x63, 0x03, 0x04, 0x78, 0x04, 0x03, 0x61, 0x59, 0x49, 0x4D, 0x43, 0x00,
    0x7F, 0x41, 0x41, 0x41, 0x02, 0x04, 0x08, 0x10, 0x20, 0x00, 0x41, 0x41,
    0x41, 0x7F, 0x04, 0x02, 0x01, 0x02, 0x04, 0x40, 0x40, 0x40, 0x40, 0x40,
    0x00, 0x03, 0x07, 0x08, 0x00, 0x20, 0x54, 0x54, 0x78, 0x40, 0x7F, 0x28,
    0x44, 0x44, 0x38, 0x38, 0x44, 0x44, 0x44, 0x28, 0x38, 0x44, 0x44, 0x28,
    0x7F, 0x38, 0x54, 0x54, 0x54, 0x18, 0x00, 0x08, 0x7E, 0x09, 0x02, 0x18,
    0xA4, 0xA4, 0x9C, 0x78, 0x7F, 0x08, 0x04, 0x04, 0x78, 0x00, 0x44, 0x7D,
    0x40, 0x00, 0x20, 0x40, 0x40, 0x3D, 0x00, 0x7F, 0x10, 0x28, 0x44, 0x00,
    0x00, 0x41, 0x7F, 0x40, 0x00, 0x7C, 0x04, 0x78, 0x04, 0x78, 0x7C, 0x08,
    0x04, 0x04, 0x78, 0x38, 0x44, 0x44, 0x44, 0x38, 0xFC, 0x18, 0x24, 0x24,
    0x18, 0x18, 0x24, 0x24, 0x18, 0xFC, 0x7C, 0x08, 0x04, 0x04, 0x08, 0x48,
    0x54, 0x54, 0x54, 0x24, 0x04, 0x04, 0x3F, 0x44, 0x24, 0x3C, 0x40, 0x40,
    0x20, 0x7C, 0x1C, 0x20, 0x40, 0x20, 0x1C, 0x3C, 0x40, 0x30, 0x40, 0x3C,
    0x44, 0x28, 0x10, 0x28, 0x44, 0x4C, 0x90, 0x90, 0x90, 0x7C, 0x44, 0x64,
    0x54, 0x4C, 0x44, 0x00, 0x08, 0x36, 0x41, 0x00, 0x00, 0x00, 0x77, 0x00,
    0x00, 0x00, 0x41, 0x36, 0x08, 0x00, 0x02, 0x01, 0x02, 0x04, 0x02, 0x3C,
    0x26, 0x23, 0x26, 0x3C, 0x1E, 0xA1, 0xA1, 0x61, 0x12, 0x3A, 0x40, 0x40,
    0x20, 0x7A, 0x38, 0x54, 0x54, 0x55, 0x59, 0x21, 0x55, 0x55, 0x79, 0x41,
    0x22, 0x54, 0x54, 0x78, 0x42, // a-umlaut
    0x21, 0x55, 0x54, 0x78, 0x40, 0x20, 0x54, 0x55, 0x79, 0x40, 0x0C, 0x1E,
    0x52, 0x72, 0x12, 0x39, 0x55, 0x55, 0x55, 0x59, 0x39, 0x54, 0x54, 0x54,
    0x59, 0x39, 0x55, 0x54, 0x54, 0x58, 0x00, 0x00, 0x45, 0x7C, 0x41, 0x00,
    0x02, 0x45, 0x7D, 0x42, 0x00, 0x01, 0x45, 0x7C, 0x40, 0x7D, 0x12, 0x11,
    0x12, 0x7D, // A-umlaut
    0xF0, 0x28, 0x25, 0x28, 0xF0, 0x7C, 0x54, 0x55, 0x45, 0x00, 0x20, 0x54,
    0x54, 0x7C, 0x54, 0x7C, 0x0A, 0x09, 0x7F, 0x49, 0x32, 0x49, 0x49, 0x49,
    0x32, 0x3A, 0x44, 0x44, 0x44, 0x3A, // o-umlaut
    0x32, 0x4A, 0x48, 0x48, 0x30, 0x3A, 0x41, 0x41, 0x21, 0x7A, 0x3A, 0x42,
    0x40, 0x20, 0x78, 0x00, 0x9D, 0xA0, 0xA0, 0x7D, 0x3D, 0x42, 0x42, 0x42,
    0x3D, // O-umlaut
    0x3D, 0x40, 0x40, 0x40, 0x3D, 0x3C, 0x24, 0xFF, 0x24, 0x24, 0x48, 0x7E,
    0x49, 0x43, 0x66, 0x2B, 0x2F, 0xFC, 0x2F, 0x2B, 0xFF, 0x09, 0x29, 0xF6,
    0x20, 0xC0, 0x88, 0x7E, 0x09, 0x03, 0x20, 0x54, 0x54, 0x79, 0x41, 0x00,
    0x00, 0x44, 0x7D, 0x41, 0x30, 0x48, 0x48, 0x4A, 0x32, 0x38, 0x40, 0x40,
    0x22, 0x7A, 0x00, 0x7A, 0x0A, 0x0A, 0x72, 0x7D, 0x0D, 0x19, 0x31, 0x7D,
    0x26, 0x29, 0x29, 0x2F, 0x28, 0x26, 0x29, 0x29, 0x29, 0x26, 0x30, 0x48,
    0x4D, 0x40, 0x20, 0x38, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x38, 0x2F, 0x10, 0xC8, 0xAC, 0xBA, 0x2F, 0x10, 0x28, 0x34, 0xFA, 0x00,
    0x00, 0x7B, 0x00, 0x00, 0x08, 0x14, 0x2A, 0x14, 0x22, 0x22, 0x14, 0x2A,
    0x14, 0x08, 0x55, 0x00, 0x55, 0x00, 0x55, // #176 (25% block) missing in old
    // code
    0xAA, 0x55, 0xAA, 0x55, 0xAA,             // 50% block
    0xFF, 0x55, 0xFF, 0x55, 0xFF,             // 75% block
    0x00, 0x00, 0x00, 0xFF, 0x00, 0x10, 0x10, 0x10, 0xFF, 0x00, 0x14, 0x14,
    0x14, 0xFF, 0x00, 0x10, 0x10, 0xFF, 0x00, 0xFF, 0x10, 0x10, 0xF0, 0x10,
    0xF0, 0x14, 0x14, 0x14, 0xFC, 0x00, 0x14, 0x14, 0xF7, 0x00, 0xFF, 0x00,
    0x00, 0xFF, 0x00, 0xFF, 0x14, 0x14, 0xF4, 0x04, 0xFC, 0x14, 0x14, 0x17,
    0x10, 0x1F, 0x10, 0x10, 0x1F, 0x10, 0x1F, 0x14, 0x14, 0x14, 0x1F, 0x00,
    0x10, 0x10, 0x10, 0xF0, 0x00, 0x00, 0x00, 0x00, 0x1F, 0x10, 0x10, 0x10,
    0x10, 0x1F, 0x10, 0x10, 0x10, 0x10, 0xF0, 0x10, 0x00, 0x00, 0x00, 0xFF,
    0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0xFF, 0x10, 0x00,
    0x00, 0x00, 0xFF, 0x14, 0x00, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0x00, 0x1F,
    0x10, 0x17, 0x00, 0x00, 0xFC, 0x04, 0xF4, 0x14, 0x14, 0x17, 0x10, 0x17,
    0x14, 0x14, 0xF4, 0x04, 0xF4, 0x00, 0x00, 0xFF, 0x00, 0xF7, 0x14, 0x14,
    0x14, 0x14, 0x14, 0x14, 0x14, 0xF7, 0x00, 0xF7, 0x14, 0x14, 0x14, 0x17,
    0x14, 0x10, 0x10, 0x1F, 0x10, 0x1F, 0x14, 0x14, 0x14, 0xF4, 0x14, 0x10,
    0x10, 0xF0, 0x10, 0xF0, 0x00, 0x00, 0x1F, 0x10, 0x1F, 0x00, 0x00, 0x00,
    0x1F, 0x14, 0x00, 0x00, 0x00, 0xFC, 0x14, 0x00, 0x00, 0xF0, 0x10, 0xF0,
    0x10, 0x10, 0xFF, 0x10, 0xFF, 0x14, 0x14, 0x14, 0xFF, 0x14, 0x10, 0x10,
    0x10, 0x1F, 0x00, 0x00, 0x00, 0x00, 0xF0, 0x10, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xF0, 0xF0, 0xF0, 0xF0, 0xF0, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xFF, 0xFF, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x38, 0x44, 0x44,
    0x38, 0x44, 0xFC, 0x4A, 0x4A, 0x4A, 0x34, // sharp-s or beta
    0x7E, 0x02, 0x02, 0x06, 0x06, 0x02, 0x7E, 0x02, 0x7E, 0x02, 0x63, 0x55,
    0x49, 0x41, 0x63, 0x38, 0x44, 0x44, 0x3C, 0x04, 0x40, 0x7E, 0x20, 0x1E,
    0x20, 0x06, 0x02, 0x7E, 0x02, 0x02, 0x99, 0xA5, 0xE7, 0xA5, 0x99, 0x1C,
    0x2A, 0x49, 0x2A, 0x1C, 0x4C, 0x72, 0x01, 0x72, 0x4C, 0x30, 0x4A, 0x4D,
    0x4D, 0x30, 0x30, 0x48, 0x78, 0x48, 0x30, 0xBC, 0x62, 0x5A, 0x46, 0x3D,
    0x3E, 0x49, 0x49, 0x49, 0x00, 0x7E, 0x01, 0x01, 0x01, 0x7E, 0x2A, 0x2A,
    0x2A, 0x2A, 0x2A, 0x44, 0x44, 0x5F, 0x44, 0x44, 0x40, 0x51, 0x4A, 0x44,
    0x40, 0x40, 0x44, 0x4A, 0x51, 0x40, 0x00, 0x00, 0xFF, 0x01, 0x03, 0xE0,
    0x80, 0xFF, 0x00, 0x00, 0x08, 0x08, 0x6B, 0x6B, 0x08, 0x36, 0x12, 0x36,
    0x24, 0x36, 0x06, 0x0F, 0x09, 0x0F, 0x06, 0x00, 0x00, 0x18, 0x18, 0x00,
    0x00, 0x00, 0x10, 0x10, 0x00, 0x30, 0x40, 0xFF, 0x01, 0x01, 0x00, 0x1F,
    0x01, 0x01, 0x1E, 0x00, 0x19, 0x1D, 0x17, 0x12, 0x00, 0x3C, 0x3C, 0x3C,
    0x3C, 0x00, 0x00, 0x00, 0x00, 0x00 // #255 NBSP
];

function setup() {
    const scaleFactor = window.devicePixelRatio || 1; // allows scaling
    pixelDensity(window.devicePixelRatio);

    canvas = createCanvas(128 * pixelSize, 64 * pixelSize);
    canvas.parent('canvas-container');
    noSmooth();
    textFont('monospace');
    updateSidebar();
}

function draw() {
    background(0);

    // Draw all shapes
    for (let shape of shapes) {
        drawShape(shape, 0, 0);
    }

    // Draw temporary shape
    if (tempShape) {
        drawShape(tempShape, 0, 0);
    }

    if (currentTool === 'pixel') {
        for (let i = 0; i < pixelPoints.length; i++) {
            fill(currentColor === 'SSD1306_WHITE' ? 255 : 0);
            noStroke();
            rect(pixelPoints[i].x * pixelSize, pixelPoints[i].y * pixelSize, pixelSize, pixelSize);
        }
    }

    // Draw polygon points and lines
    if (currentTool === 'polygon' || currentTool === 'fillPolygon') {
        for (let i = 0; i < polygonPoints.length; i++) {
            let point = polygonPoints[i];
            fill(255);
            noStroke();
            rect(point.x * pixelSize, point.y * pixelSize, pixelSize, pixelSize);

            if (i > 0) {
                drawPixelatedLine(polygonPoints[i - 1].x, polygonPoints[i - 1].y, point.x, point.y);
            }
        }

        // Draw line from last point to mouse position
        if (polygonPoints.length > 0) {
            let lastPoint = polygonPoints[polygonPoints.length - 1];
            let mouseXPos = constrain(floor(mouseX / pixelSize), 0, 127);
            let mouseYPos = constrain(floor(mouseY / pixelSize), 0, 63);
            drawPixelatedLine(lastPoint.x, lastPoint.y, mouseXPos, mouseYPos);
        }
    }

    // Draw live preview for rectangle and circle tools
    if (isDrawing && (currentTool === 'rect' || currentTool === 'fillRect' || currentTool === 'circle' || currentTool === 'fillCircle')) {
        let x = constrain(floor(mouseX / pixelSize), 0, 127);
        let y = constrain(floor(mouseY / pixelSize), 0, 63);

        if (currentTool === 'rect' || currentTool === 'fillRect') {
            let w = abs(x - tempShape.x) + 1;
            let h = abs(y - tempShape.y) + 1;
            let startX = min(tempShape.x, x);
            let startY = min(tempShape.y, y);

            if (currentTool === 'fillRect') {
                drawPixelatedRect(startX, startY, w, h, true);
            } else {
                drawPixelatedRect(startX, startY, w, h, false);
            }
        } else if (currentTool === 'circle' || currentTool === 'fillCircle') {
            let r = floor(dist(tempShape.x, tempShape.y, x, y) / pixelSize);
            if (currentTool === 'fillCircle') {
                drawPixelatedCircle(tempShape.x, tempShape.y, r, true);
            } else {
                drawPixelatedCircle(tempShape.x, tempShape.y, r, false);
            }
        }
    }

    // Draw grid
    stroke(50);
    for (let x = 0; x < width; x += pixelSize) {
        line(x, 0, x, height);
    }
    for (let y = 0; y < height; y += pixelSize) {
        line(0, y, width, y);
    }


    // Draw subtle crosshair
    if (mouseX >= 0 && mouseX <= width && mouseY >= pixelSize && mouseY <= height) {
        stroke(80, 80, 80, 80); // very light gray, semi-transparent
        strokeWeight(1);
        
        const snappedX = floor(mouseX / pixelSize) * pixelSize + pixelSize / 2;
        const snappedY = floor((mouseY - pixelSize) / pixelSize) * pixelSize + pixelSize + pixelSize / 2;
        
        // Vertical line
        line(snappedX, pixelSize, snappedX, height);
        
        // Horizontal line
        line(0, snappedY, width, snappedY);
    }

    // Draw ruler ticks
    noFill();
    stroke(80);
    strokeWeight(1);
    textSize(8);
    textAlign(CENTER, TOP);
    fill(120);

    for (let i = 0; i < 128; i++) {
        let x = i * pixelSize;
        if (i % 8 === 0) {
            line(x, 0, x, 6); // top
        } else if (i % 4 === 0) {
            line(x, 0, x, 3); // minor tick
        }
    }

    textAlign(RIGHT, CENTER);
    for (let i = 0; i < 64; i++) {
        let y = i * pixelSize;
        if (i % 8 === 0) {
            line(0, y, 6, y); // left
        } else if (i % 4 === 0) {
            line(0, y, 3, y); // minor tick
        }
    }

    // Persistent coordinates display (top-right)
    let coordX = Math.floor(mouseX / pixelSize);
    let coordY = Math.floor(mouseY / pixelSize);
    if (coordX < 0 || coordX > 127) coordX = 0;
    if (coordY < 0 || coordY > 63) coordY = 0;

    noStroke();
    fill(150);
    textSize(10);
    textAlign(RIGHT, TOP);
    text(`(${coordX}, ${coordY})`, width - 4, 2);


    
}

function drawGlyph(charCode, x, y, scale = 1) {
    const glyphIndex = charCode; // Assuming the font starts at ASCII 32 (space)
    if (glyphIndex < 0 || glyphIndex >= fontData.length / 5) return;

    const glyphData = fontData.slice(glyphIndex * 5, (glyphIndex + 1) * 5);

    for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 8; row++) {
            if (glyphData[col] & (1 << row)) {
                rect((x * pixelSize) + col * pixelSize * scale, (y * pixelSize) + row * pixelSize * scale, pixelSize * scale, pixelSize * scale);
            }
        }
    }
}

function drawShape(shape, refX, refY) {
    noStroke();
    fill(shape.color === 'SSD1306_WHITE' ? 255 : 0);
    if (shape.selected) {
        fill(0, 0, 255);
    }

    switch (shape.type) {
        case 'group':
            for (let groupItem of shape.groupItems) {
                drawShape(groupItem, shape.x, shape.y);
            }
            break;
        case 'pixel':
            for (let i = 0; i < shape.points.length; i++) {
                rect((shape.points[i].x + refX) * pixelSize, (shape.points[i].y + refY) * pixelSize, pixelSize, pixelSize);
            }
            break;
        case 'line':
            drawPixelatedLine(shape.x + refX, shape.y + refY, shape.x2, shape.y2);
            break;
        case 'rect':
            drawPixelatedRect(shape.x + refX, shape.y + refY, shape.w, shape.h, false);
            break;
        case 'fillRect':
            drawPixelatedRect(shape.x + refX, shape.y + refY, shape.w, shape.h, true);
            break;
        case 'circle':
            drawPixelatedCircle(shape.x + refX, shape.y + refY, shape.r, false);
            break;
        case 'fillCircle':
            drawPixelatedCircle(shape.x + refX, shape.y + refY, shape.r, true);
            break;
        case 'triangle':
            drawPixelatedTriangle(shape.x1 + refX, shape.y1 + refY, shape.x2 + refX, shape.y2 + refY, shape.x3 + refX, shape.y3 + refY, false);
            break;
        case 'fillTriangle':
            drawPixelatedTriangle(shape.x1 + refX, shape.y1 + refY, shape.x2 + refX, shape.y2 + refY, shape.x3 + refX, shape.y3 + refY, true);
            break;
        case 'text':
            drawPixelatedText(shape.text, shape.x + refX, shape.y + refY, shape.size);
            break;
        case 'polygon':
            for (let i = 0; i < shape.points.length; i++) {
                if (shape.closed === false && i === shape.points.length - 1) {
                    break;
                }
                let point = shape.points[i];
                let nextPoint = shape.points[(i + 1) % shape.points.length];
                drawPixelatedLine(point.x + refX, point.y + refY, nextPoint.x + refX, nextPoint.y + refY);
            }
            break;
        case 'fillPolygon':
            const triangles = triangulate(shape.points);
            triangles.forEach(triangle => {
                const [p1, p2, p3] = triangle;
                drawPixelatedTriangle(p1.x + refX, p1.y + refY, p2.x + refX, p2.y + refY, p3.x + refX, p3.y + refY, true);
            });
            break;
    }
}

function drawPixelatedLine(x0, y0, x1, y1) {
    let dx = abs(x1 - x0);
    let dy = abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        rect(x0 * pixelSize, y0 * pixelSize, pixelSize, pixelSize);
        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
}

function drawPixelatedRect(x, y, w, h, filled) {
    if (filled) {
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + h; j++) {
                rect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
            }
        }
    } else {
        for (let i = x; i < x + w; i++) {
            rect(i * pixelSize, y * pixelSize, pixelSize, pixelSize);
            rect(i * pixelSize, (y + h - 1) * pixelSize, pixelSize, pixelSize);
        }
        for (let j = y + 1; j < y + h - 1; j++) {
            rect(x * pixelSize, j * pixelSize, pixelSize, pixelSize);
            rect((x + w - 1) * pixelSize, j * pixelSize, pixelSize, pixelSize);
        }
    }
}

function drawPixelatedCircle(x0, y0, radius, filled) {
    let x = radius;
    let y = 0;
    let decisionOver2 = 1 - x;

    while (y <= x) {
        if (filled) {
            drawPixelatedLine(x0 - x, y0 + y, x0 + x, y0 + y);
            drawPixelatedLine(x0 - x, y0 - y, x0 + x, y0 - y);
            drawPixelatedLine(x0 - y, y0 + x, x0 + y, y0 + x);
            drawPixelatedLine(x0 - y, y0 - x, x0 + y, y0 - x);
        } else {
            rect((x0 + x) * pixelSize, (y0 + y) * pixelSize, pixelSize, pixelSize);
            rect((x0 - x) * pixelSize, (y0 + y) * pixelSize, pixelSize, pixelSize);
            rect((x0 + x) * pixelSize, (y0 - y) * pixelSize, pixelSize, pixelSize);
            rect((x0 - x) * pixelSize, (y0 - y) * pixelSize, pixelSize, pixelSize);
            rect((x0 + y) * pixelSize, (y0 + x) * pixelSize, pixelSize, pixelSize);
            rect((x0 - y) * pixelSize, (y0 + x) * pixelSize, pixelSize, pixelSize);
            rect((x0 + y) * pixelSize, (y0 - x) * pixelSize, pixelSize, pixelSize);
            rect((x0 - y) * pixelSize, (y0 - x) * pixelSize, pixelSize, pixelSize);
        }
        y++;
        if (decisionOver2 <= 0) {
            decisionOver2 += 2 * y + 1;
        } else {
            x--;
            decisionOver2 += 2 * (y - x) + 1;
        }
    }
}

function drawPixelatedTriangle(x1, y1, x2, y2, x3, y3, filled) {
    if (filled) {
        // Implement filled triangle algorithm (e.g., scanline or barycentric)
        // This is a simplified version and may not be perfect for all cases
        let minX = Math.min(x1, x2, x3);
        let maxX = Math.max(x1, x2, x3);
        let minY = Math.min(y1, y2, y3);
        let maxY = Math.max(y1, y2, y3);

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                if (pointInTriangle(x, y, x1, y1, x2, y2, x3, y3)) {
                    rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                }
            }
        }
    } else {
        drawPixelatedLine(x1, y1, x2, y2);
        drawPixelatedLine(x2, y2, x3, y3);
        drawPixelatedLine(x3, y3, x1, y1);
    }
}

function pointInTriangle(x, y, x1, y1, x2, y2, x3, y3) {
    let d1 = sign(x, y, x1, y1, x2, y2);
    let d2 = sign(x, y, x2, y2, x3, y3);
    let d3 = sign(x, y, x3, y3, x1, y1);

    let hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    let hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(hasNeg && hasPos);
}

function sign(x1, y1, x2, y2, x3, y3) {
    return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
}

function isEar(polygon, i, j, k) {
    const x1 = polygon[i].x, y1 = polygon[i].y;
    const x2 = polygon[j].x, y2 = polygon[j].y;
    const x3 = polygon[k].x, y3 = polygon[k].y;

    for (let m = 0; m < polygon.length; m++) {
        if (m !== i && m !== j && m !== k) {
            const x = polygon[m].x, y = polygon[m].y;
            if (pointInTriangle(x, y, x1, y1, x2, y2, x3, y3)) {
                return false;
            }
        }
    }
    return true;
}

function triangulate(polygon) {
    let n = polygon.length;
    if (n < 3) return [];

    let indices = Array.from(Array(n).keys());
    let triangles = [];

    while (n > 3) {
        for (let i = 0; i < n; i++) {
            const prev = (i - 1 + n) % n;
            const next = (i + 1) % n;
            if (isEar(polygon, indices[prev], indices[i], indices[next])) {
                triangles.push([
                    polygon[indices[prev]],
                    polygon[indices[i]],
                    polygon[indices[next]]
                ]);
                indices.splice(i, 1);
                n--;
                break;
            }
        }
    }

    if (n === 3) {
        triangles.push([
            polygon[indices[0]],
            polygon[indices[1]],
            polygon[indices[2]]
        ]);
    }

    return triangles;
}

function drawPixelatedText(textstr, x, y, size) {
    textSize(size * pixelSize);
    textAlign(LEFT, TOP);
    fill(currentColor === 'SSD1306_WHITE' ? 255 : 0);
    noStroke();
    // text(textstr, x * pixelSize, y * pixelSize);
    for (let i = 0; i < textstr.length; i++) {
        const char = textstr.charAt(i);
        const asciiValue = textstr.charCodeAt(i);
        drawGlyph(asciiValue, x + i * 6 * size, y, size);
    }
}

function mousePressed() {
    let x = floor(mouseX / pixelSize);
    let y = floor(mouseY / pixelSize);

    if (isInsideCanvas(x, y)) {
        isDrawing = true;

        switch (currentTool) {
            case 'pixel':
                pixelPoints.push({ x: x, y: y });
                break;
            case 'line':
            case 'rect':
            case 'fillRect':
            case 'circle':
            case 'fillCircle':
                tempShape = { type: currentTool, x: x, y: y, x2: x, y2: y, color: currentColor, id: currentTool + " " + shapeCounter++ };
                break;
            case 'triangle':
            case 'fillTriangle':
                if (!tempShape) {
                    tempShape = { type: currentTool, x1: x, y1: y, x2: x, y2: y, x3: x, y3: y, color: currentColor, id: currentTool + " " + shapeCounter++ };
                } else if (tempShape.x2 === tempShape.x3 && tempShape.y2 === tempShape.y3) {
                    tempShape.x2 = x;
                    tempShape.y2 = y;
                } else {
                    tempShape.x3 = x;
                    tempShape.y3 = y;
                    shapes.push(tempShape);
                    tempShape = null;
                }
                break;
            case 'text':
                let input = prompt('Enter text:');
                if (input) {
                    let size = parseInt(prompt('Enter text size (1-5):'));
                    shapes.push({ type: 'text', x: x, y: y, text: input, size: size, color: currentColor, id: currentTool + " " + shapeCounter++ });
                }
                break;
            case 'polygon':
            case 'fillPolygon':
                polygonPoints.push({ x: x, y: y });
                break;
        }
        updateSidebar();
    }
}

function mouseDragged() {
    let x = floor(mouseX / pixelSize);
    let y = floor(mouseY / pixelSize);

    if (isInsideCanvas(x, y) && isDrawing) {
        if (currentTool === 'pixel') {
            if (!pixelPoints.some(value => { return value.x == x && value.y == y })) {
                pixelPoints.push({ x: x, y: y })
            }
        } else if (tempShape) {
            tempShape.x2 = x;
            tempShape.y2 = y;
        }
        updateSidebar();
    }
}

function mouseReleased() {
    if (isDrawing) {
        let x = floor(mouseX / pixelSize);
        let y = floor(mouseY / pixelSize);

        if (isInsideCanvas(x, y)) {
            switch (currentTool) {
                case 'pixel':
                    shapes.push({ type: currentTool, points: [...pixelPoints], color: currentColor, id: currentTool + " " + shapeCounter++ });
                    pixelPoints = [];
                    break;
                case 'line':
                    tempShape.x2 = x;
                    tempShape.y2 = y;
                    shapes.push(tempShape);
                    tempShape = null;
                    break;
                case 'rect':
                case 'fillRect':
                    tempShape.w = abs(x - tempShape.x) + 1;
                    tempShape.h = abs(y - tempShape.y) + 1;
                    tempShape.x = min(tempShape.x, x);
                    tempShape.y = min(tempShape.y, y);
                    shapes.push(tempShape);
                    tempShape = null;
                    break;
                case 'circle':
                case 'fillCircle':
                    tempShape.r = floor(dist(tempShape.x, tempShape.y, x, y) / pixelSize);
                    shapes.push(tempShape);
                    tempShape = null;
                    break;
            }
        }
        updateSidebar();
    }
    isDrawing = false;
}

function isInsideCanvas(x, y) {
    return x >= 0 && x < 128 && y >= 0 && y < 64;
}

function keyPressed() {
    if (key === 'Enter' && (currentTool === 'polygon' || currentTool === 'fillPolygon') && polygonPoints.length > 2) {
        shapes.push({ type: currentTool, points: [...polygonPoints], color: currentColor, closed: true, id: currentTool + " " + shapeCounter++ });
        polygonPoints = [];
        updateSidebar();
    }
    if (key === 'Escape' && (currentTool === 'polygon') && polygonPoints.length > 2) {
        shapes.push({ type: currentTool, points: [...polygonPoints], color: currentColor, closed: false, id: currentTool + " " + shapeCounter++ });
        polygonPoints = [];
        updateSidebar();
    }
    if (key === 'ArrowLeft') {
        shiftShapes(shapes, -1, 0);
    }
    if (key === 'ArrowRight') {
        shiftShapes(shapes, 1, 0);
    }
    if (key === 'ArrowUp') {
        shiftShapes(shapes, 0, -1);
    }
    if (key === 'ArrowDown') {
        shiftShapes(shapes, 0, 1);
    }
}

function shiftShapes(itemList, xShift, yShift) {
    for (let i = 0; i < itemList.length; i++) {
        shape = itemList[i];
        if (shape.selected) {
            switch (shape.type) {
                case 'pixel':
                    for (let i = 0; i < shape.points.length; i++) {
                        shape.points[i].x += xShift;
                        shape.points[i].y += yShift;
                    }
                    break;
                case 'line':
                    shape.x += xShift;
                    shape.y += yShift;
                    shape.x2 += xShift;
                    shape.y2 += yShift;
                    break;
                case 'rect':
                    shape.x += xShift;
                    shape.y += yShift;
                    break;
                case 'fillRect':
                    shape.x += xShift;
                    shape.y += yShift;
                    break;
                case 'circle':
                    shape.x += xShift;
                    shape.y += yShift;
                    break;
                case 'fillCircle':
                    shape.x += xShift;
                    shape.y += yShift;
                    break;
                case 'group':
                    shape.x += xShift;
                    shape.y += yShift;
                    break;
                case 'triangle':
                    shape.x1 += xShift;
                    shape.y1 += yShift;
                    shape.x2 += xShift;
                    shape.y2 += yShift;
                    shape.x3 += xShift;
                    shape.y3 += yShift;
                    break;
                case 'fillTriangle':
                    shape.x1 += xShift;
                    shape.y1 += yShift;
                    shape.x2 += xShift;
                    shape.y2 += yShift;
                    shape.x3 += xShift;
                    shape.y3 += yShift;
                    break;
                case 'text':
                    shape.x += xShift;
                    shape.y += yShift;
                    break;
                case 'polygon':
                    for (let i = 0; i < shape.points.length; i++) {
                        shape.points[i].x += xShift;
                        shape.points[i].y += yShift;
                    }
                    break;
                case 'fillPolygon':
                    for (let i = 0; i < shape.points.length; i++) {
                        shape.points[i].x += xShift;
                        shape.points[i].y += yShift;
                    }
                    break;
            }
        }
    }
}

function setTool(tool) {
    currentTool = tool;
    tempShape = null;
    polygonPoints = [];
}

function setColor() {
    currentColor = document.getElementById('colorSelect').value;
    if(document.getElementById('colorSelect').value == 'SSD1306_WHITE'){
        document.getElementById('colorSelect').classList = 'white';
    }else if(document.getElementById('colorSelect').value == 'SSD1306_BLACK'){
        document.getElementById('colorSelect').classList = '';
    }
}

function clearCanvas() {
    shapes = [];
    tempShape = null;
    polygonPoints = [];
    updateSidebar();
}

function updateSidebar() {
    const sidebarList = document.getElementById('elements-list-c');
    sidebarList.innerHTML = '';

    for (let i = shapes.length - 1; i >= 0; i--) {
        let shape = shapes[i];

        const elementItem = document.createElement('div');
        elementItem.className = 'element-item';

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = shapes[i].selected;
        checkbox.id = `select_${i}`;
        elementItem.appendChild(checkbox);

        const label = document.createElement('label');
        label.htmlFor = `select_${i}`;
        label.textContent = shape.id;
        elementItem.appendChild(label);

        if (shapes[i].type === 'group') {
            const button_ungroup = document.createElement('button');
            button_ungroup.textContent = '⛶';
            button_ungroup.classList = 'arrow-btn';
            button_ungroup.id = `b_ungroup_${i}`;
            elementItem.appendChild(button_ungroup);
        }

        const button_up = document.createElement('button');
        button_up.textContent = '⬆';
        button_up.classList = 'arrow-btn';
        button_up.id = `b_up_${i}`;
        elementItem.appendChild(button_up);

        const button_down = document.createElement('button');
        button_down.textContent = '⬇';
        button_down.classList = 'arrow-btn';
        button_down.id = `b_down_${i}`;
        elementItem.appendChild(button_down);

        const button_c = document.createElement('button');
        button_c.innerHTML = '<img src="images/delete.svg" alt="Delete Layer">';
        button_c.id = `item_${i}`;
        elementItem.appendChild(button_c);

        sidebarList.appendChild(elementItem);

        document.getElementById(`item_${i}`).setAttribute("onclick", `event.preventDefault();deleteShape(${i})`);

        document.getElementById(`select_${i}`).setAttribute("onclick", `shapes[${i}].selected = document.getElementById('select_${i}').checked; 
  if(shapes[${i}].type === 'group'){
    shapes[${i}].groupItems.forEach(function(v) {
      v.selected = document.getElementById('select_${i}').checked;
    });
  }`);

        document.getElementById(`b_up_${i}`).setAttribute("onclick", `event.preventDefault();moveUpShape(${i})`);
        document.getElementById(`b_down_${i}`).setAttribute("onclick", `event.preventDefault();moveDownShape(${i})`);

        if (document.getElementById(`b_ungroup_${i}`)) {
            document.getElementById(`b_ungroup_${i}`).setAttribute("onclick", `event.preventDefault();ungroup(${i})`);
        }
    }
}

function newGroupSelected() {
    let minId = shapes.indexOf(shapes.find(x => x.selected));
    let groupX = 999;
    let groupY = 999;

    let groupItems = shapes.filter(shape => (shape.selected));
    groupItems.forEach(function (v) {
        groupX = v.x < groupX ? v.x : groupX;
        groupY = v.y < groupY ? v.y : groupY;
    })
    shiftShapes(groupItems, -1 * groupX, -1 * groupY);
    shapes = shapes.filter(shape => !(shape.selected));
    shapes.splice(minId, 0, { type: 'group', x: groupX, y: groupY, groupItems: [...groupItems], id: "group " + shapeCounter++, selected: true })
    updateSidebar();

}

function ungroup(index) {
    let groupItems = shapes[index].groupItems;
    shapes.forEach(function (v) {
        v.selected = false;
    })
    groupItems.forEach(function (v) {
        v.selected = true;
    })
    shiftShapes(groupItems, shapes[index].x, shapes[index].y);
    shapes.splice(index, 1);
    shapes.splice(index, 0, ...groupItems);
    updateSidebar();
}

function deleteShape(index) {
    shapes.splice(index, 1);
    updateSidebar();
}

function moveUpShape(index) {
    if (index === shapes.length - 1) { return; }
    let tempSwap = shapes[index];
    shapes[index] = shapes[index + 1];
    shapes[index + 1] = tempSwap;
    updateSidebar();
}

function moveDownShape(index) {
    if (index === 0) { return; }
    let tempSwap = shapes[index];
    shapes[index] = shapes[index - 1];
    shapes[index - 1] = tempSwap;
    updateSidebar();
}

function exportCode() {
    let code = appendCode(shapes);

    //code += appendCode(shapes);

    document.getElementById('output').value = code;
    document.getElementById('output').scrollIntoView({
        behavior: 'smooth'
    });
}

function appendCode(itemList, refName = '', refX = 0, refY = 0) {
    let codeString = '\n';
    let refNameX = refName === '' ? '' : ' + ' + refName + '_x';
    let refNameY = refName === '' ? '' : ' + ' + refName + '_y';
    if (refName != '') {
        codeString += `  uint8_t ${refName}_x = ${refX};\n`
        codeString += `  uint8_t ${refName}_y = ${refY};\n`
    }
    for (let shape of itemList) {
        codeString += `  //id: ${itemList.indexOf(shape)} ${shape.id} \n`
        switch (shape.type) {
            case 'group':
                let groupVarName = shape.id.replace(/\W/g, '');
                codeString += appendCode(shape.groupItems, groupVarName, shape.x, shape.y);
                codeString += '\n'
                break;
            case 'pixel':
                for (let i = 0; i < shape.points.length; i++) {
                    codeString += `  display.drawPixel(${shape.points[i].x}${refNameX}, ${shape.points[i].y}${refNameY}, ${shape.color});\n`;
                }
                break;
            case 'line':
                codeString += `  display.drawLine(${shape.x}${refNameX}, ${shape.y}${refNameY}, ${shape.x2}${refNameX}, ${shape.y2}${refNameY}, ${shape.color});\n`;
                break;
            case 'rect':
                codeString += `  display.drawRect(${shape.x}${refNameX}, ${shape.y}${refNameY}, ${shape.w}, ${shape.h}, ${shape.color});\n`;
                break;
            case 'fillRect':
                codeString += `  display.fillRect(${shape.x}${refNameX}, ${shape.y}${refNameY}, ${shape.w}, ${shape.h}, ${shape.color});\n`;
                break;
            case 'circle':
                codeString += `  display.drawCircle(${shape.x}${refNameX}, ${shape.y}${refNameY}, ${Math.round(shape.r)}, ${shape.color});\n`;
                break;
            case 'fillCircle':
                codeString += `  display.fillCircle(${shape.x}${refNameX}, ${shape.y}${refNameY}, ${Math.round(shape.r)}, ${shape.color});\n`;
                break;
            case 'triangle':
                codeString += `  display.drawTriangle(${shape.x1}${refNameX}, ${shape.y1}${refNameY}, ${shape.x2}${refNameX}, ${shape.y2}${refNameY}, ${shape.x3}${refNameX}, ${shape.y3}${refNameY}, ${shape.color});\n`;
                break;
            case 'fillTriangle':
                codeString += `  display.fillTriangle(${shape.x1}${refNameX}, ${shape.y1}${refNameY}, ${shape.x2}${refNameX}, ${shape.y2}${refNameY}, ${shape.x3}${refNameX}, ${shape.y3}${refNameY}, ${shape.color});\n`;
                break;
            case 'text':
                codeString += `  display.setTextSize(${shape.size});\n`;
                codeString += `  display.setTextColor(${shape.color});\n`;
                codeString += `  display.setCursor(${shape.x}${refNameX}, ${shape.y}${refNameY});\n`;
                codeString += `  display.print(F("${shape.text}"));\n`;
                break;
            case 'polygon':
                for (let i = 0; i < shape.points.length; i++) {
                    let point = shape.points[i];
                    if (shape.closed === false && i === shape.points.length - 1) {
                        break;
                    }
                    let nextPoint = shape.points[(i + 1) % shape.points.length];
                    codeString += `  display.drawLine(${point.x}${refNameX}, ${point.y}${refNameY}, ${nextPoint.x}${refNameX}, ${nextPoint.y}${refNameY}, ${shape.color});\n`;
                }
                break;
            case 'fillPolygon':
                const triangles = triangulate(shape.points);
                triangles.forEach(triangle => {
                    const [p1, p2, p3] = triangle;
                    codeString += `  display.fillTriangle(${p1.x}${refNameX}, ${p1.y}${refNameY}, ${p2.x}${refNameX}, ${p2.y}${refNameY}, ${p3.x}${refNameX}, ${p3.y}${refNameY}, ${shape.color});\n`;
                });
                break;
        }
    }
    return codeString;
}

