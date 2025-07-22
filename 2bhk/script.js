const categories = [
  "bedroom",
  "bathroom",
  "kitchen",
  "dining",
  "pool",
  "outside",
  "others",
];
const slideIndices = {};

categories.forEach((cat) => {
  slideIndices[cat] = 0;
  showSlide(cat, 0);
});

function showSlide(category, index) {
  const slides = document.querySelectorAll(`.${category}-slide`);
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function changeSlide(category, direction) {
  const slides = document.querySelectorAll(`.${category}-slide`);
  slideIndices[category] += direction;

  if (slideIndices[category] >= slides.length) slideIndices[category] = 0;
  if (slideIndices[category] < 0) slideIndices[category] = slides.length - 1;

  showSlide(category, slideIndices[category]);
}

// Booking Form WhatsApp Integration
function redirectToWhatsApp() {
  // Only the message
  let message = "Hi, I would like to book an 2bhk villa , Price : ";
  // Encode the message for URL
  let encodedMessage = encodeURIComponent(message);

  // WhatsApp number with country code (no + or 0)
  let phoneNumber = "918805504373";

  // Construct the WhatsApp URL
  let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Redirect to WhatsApp
  window.open(whatsappURL, "_blank");
}
