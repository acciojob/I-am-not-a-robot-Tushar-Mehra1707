//your code here
const imageContainer = document.getElementById('imageContainer');
const hText = document.getElementById('h');
const para = document.getElementById('para');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');

const imagePaths = [
  "https://via.placeholder.com/100?text=1",
  "https://via.placeholder.com/100?text=2",
  "https://via.placeholder.com/100?text=3",
  "https://via.placeholder.com/100?text=4",
  "https://via.placeholder.com/100?text=5"
];

let selected = [];
let imageElements = [];

function shuffleAndDisplayImages() {
  // Clone and add one duplicate randomly
  const images = [...imagePaths];
  const duplicateIndex = Math.floor(Math.random() * images.length);
  images.push(images[duplicateIndex]);

  // Shuffle array
  images.sort(() => 0.5 - Math.random());

  // Display images
  imageContainer.innerHTML = '';
  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('tile');
    img.dataset.index = index;
    img.dataset.src = src;
    img.addEventListener('click', () => handleImageClick(img));
    imageContainer.appendChild(img);
    imageElements[index] = img;
  });
}

function handleImageClick(img) {
  if (selected.length === 2 || img.classList.contains('selected')) return;

  img.classList.add('selected');
  selected.push(img);

  resetBtn.style.display = 'inline-block';

  if (selected.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

function resetState() {
  selected.forEach(img => img.classList.remove('selected'));
  selected = [];
  para.textContent = '';
  verifyBtn.style.display = 'none';
  resetBtn.style.display = 'none';
  hText.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
}

function verifyImages() {
  if (selected.length !== 2) return;

  const [img1, img2] = selected;
  const isMatch = img1.dataset.src === img2.dataset.src;

  if (isMatch) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = 'none';
}

resetBtn.addEventListener('click', () => {
  resetState();
  shuffleAndDisplayImages();
});

verifyBtn.addEventListener('click', verifyImages);

// Initialize
shuffleAndDisplayImages();

