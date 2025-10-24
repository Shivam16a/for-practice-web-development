const cardsData = [
  { number: '01', icon: 'fa-shield-alt', title: 'Risk Management Solution' },
  { number: '02', icon: 'fa-chart-line', title: 'Market Expansion Advisor' },
  { number: '03', icon: 'fa-lightbulb', title: 'Innovation & Digital Transformation' },
  { number: '04', icon: 'fa-user-friends', title: 'Talent Management Strategy' },
  { number: '05', icon: 'fa-chart-bar', title: 'Financial Strategy Development' }
];

const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const container = document.querySelector('.carousel-container');

// create card elements
cardsData.forEach(card => track.appendChild(createCard(card)));
// clone first 2 cards for smooth looping
for (let i = 0; i < 2; i++) {
  track.appendChild(createCard(cardsData[i]));
}

function createCard(card) {
  const wrapper = document.createElement('div');
  wrapper.className = 'card-wrapper';
  wrapper.innerHTML = `
      <div class="card p-3 hover-card">
        <div class="position-relative mt-3">
          <i class="fas ${card.icon} fs-1 border p-2 rounded-circle position-absolute d-flex ms-3"
             style="color: #ea7c00; border-color: #ea7c00 !important;"></i>
        </div>
        <div class="card-body mt-5">
          <h3 class="card-title">${card.title}</h3>
          <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eos quas molestias corporis mollitia quia!</p>
          <p class="cardnumber">${card.number}</p>
        </div>
      </div>`;
  return wrapper;
}

let index = 0;
let cardWidth = track.querySelector('.card-wrapper').offsetWidth;

// Responsive width update
function updateCardWidth() {
  cardWidth = track.querySelector('.card-wrapper').offsetWidth;
  updateContainerHeight();
  slideTo(index, false);
}

// Adjust carousel height dynamically
function updateContainerHeight() {
  let maxHeight = 0;
  track.querySelectorAll('.hover-card').forEach(card => {
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });
  container.style.height = maxHeight + 60 + 'px';
}

// Sliding logic
function slideTo(newIndex, withTransition = true) {
  const total = cardsData.length;
  index = newIndex;
  track.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
  track.style.transform = `translateX(-${index * cardWidth}px)`;

  // reset loop
  if (index >= total) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = 0;
      track.style.transform = `translateX(0px)`;
    }, 500);
  }
}

// Auto scroll setup
let autoSlide = setInterval(() => slideTo(index + 1), 3000);

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => slideTo(index + 1), 3000);
}

// Button Events
nextBtn.addEventListener('click', () => {
  slideTo(index + 1);
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  index = index <= 0 ? cardsData.length - 1 : index - 1;
  slideTo(index);
  resetAutoSlide();
});

// Resize listener
window.addEventListener('resize', updateCardWidth);

// Init on load
updateCardWidth();
updateContainerHeight();
