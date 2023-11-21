import { MutableRefObject } from "react";

// Define a mapping from characters to shapes
const charToShape: Record<string, string> = {
	'a': 'circle',
	'b': 'square',
	'c': 'diamond',
	'd': 'square',
	'e': 'circle',
	'f': 'diamond',
	'g': 'circle',
	'h': 'square',
	'i': 'diamond',
	'j': 'square',
	'k': 'circle',
	'l': 'diamond',
	'm': 'circle',
	'n': 'square',
	'o': 'diamond',
	'p': 'square',
	'q': 'circle',
	'r': 'diamond',
	's': 'circle',
	't': 'square',
	'u': 'diamond',
	'v': 'square',
	'w': 'circle',
	'x': 'diamond',
	'y': 'circle',
	'z': 'square',
};

// Function to draw a circle
const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, 40, 0, Math.PI * 2);
	ctx.fill();
}

// Function to draw a square
const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x - 20, y - 20, 40, 40);
	ctx.fill();
}

// Function to draw a square
const drawDiamond = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(x, y - 40); // Top point
	ctx.lineTo(x + 40, y); // Right point
	ctx.lineTo(x, y + 40); // Bottom point
	ctx.lineTo(x - 40, y); // Left point
	ctx.closePath();
	ctx.fill();
}

function getColorForLetter(letter: string): string {
	const hue = (letter.toLowerCase().charCodeAt(0) - 97) * (360 / 26);
	return `hsl(${hue}, 100%, 50%)`; // Full saturation and 50% lightness
}

// Function to generate and draw shapes based on domain name
export const drawFromDomainName = (canvasRef: MutableRefObject<HTMLCanvasElement | null>, domainName: string) => {
	// If the canvas reference is not yet initialized, escape early
	if (!canvasRef.current) return;

	// Assuming the canvas is good, create a 2d context
	const canvas = canvasRef.current;
	const ctx = canvas.getContext('2d');

	// If the context failed to initialize, the canvas may be bad, abort
	if (!ctx) return;

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const pairs = [];

	// For odd-length domains, copy the middle-most character and add it to the end as an even-bit
	if (domainName.length % 2 !== 0) {
		const middleIndex = Math.floor(domainName.length / 2);
		domainName = domainName + domainName[middleIndex];
	}

	// Split the domain name into pairs
	for (let i = 0; i < domainName.length; i += 2) {
		pairs.push(domainName.substring(i, i + 2));
	}

	pairs.forEach(pair => {
		const shapeChar = pair[0];
		const colorChar = pair[1];
		const shape = charToShape[shapeChar];
		const color = getColorForLetter(colorChar);

		const x = (shapeChar.toLowerCase().charCodeAt(0) - 97) * (canvas.width / 26);
		const y = (colorChar.toLowerCase().charCodeAt(0) - 97) * (canvas.height / 26);

		// Draw shape based on the character
		switch (shape) {
			case 'circle':
				drawCircle(ctx, x, y, color);
				break;
			case 'square':
				drawSquare(ctx, x, y, color);
				break;
			case 'diamond':
				drawDiamond(ctx, x, y, color);
				break;
			default:
				drawSquare(ctx, x, y, color);
				break;
		}
	});
}

