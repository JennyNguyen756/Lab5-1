// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
const canvas = document.getElementById('user-image');
const ctx = canvas.getContext("2d");
const handleFileButton = document.getElementById('image-input');
const handleSubmitButton = document.querySelector('button[type="submit"]');
const handleClearButton = document.querySelector('button[type="reset"]');
const handleReadTextButton = document.querySelector('button[type="button"]');

//Toggles generate button off. Toggles clear and read text on
function generateOff() {
  handleClearButton.disabled = false;
  handleReadTextButton.disabled = false;
  handleSubmitButton.disabled = true;
}

//Toggles generate button on. Toggles clear and read text off
function generateOn() {
  handleClearButton.disabled = true;
  handleReadTextButton.disabled = true;
  handleSubmitButton.disabled = false;
}

//Clear Button Function
handleClearButton.addEventListener('click', (event) => {
  event.preventDefault();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateOn();
});

//Generate Button Function
handleSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const topText = document.getElementById('text-top').value;
  const bottomText = document.getElementById('text-bottom').value;
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(topText, canvas.width/2, canvas.height*.1);
  ctx.fillText(bottomText, canvas.width/2, canvas.height*.9);
  generateOff();

});

//Fires when user interacts with file button
handleFileButton.addEventListener('change', (event) => {
  const userImage = event.target.files[0];
  const objectURL = URL.createObjectURL(userImage);
  img.src = objectURL;
  img.setAttribute("alt", userImage.name);
});


// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const {width, height, startX, startY} = getDimmensions(canvas.width, canvas.height, img.width, img.height);
  ctx.drawImage(img, startX, startY, width, height );
  generateOn();


  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
