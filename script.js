// Imlementing Lazy Load images

const targetImgs = document.querySelectorAll('img[data-src]');
console.log(targetImgs);

const imgLazyLoad = function(entries, observer) {
    const [entry] = entries;
    console.log(entry);
  
    if(!entry.isIntersecting) return;
  
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function(){
      entry.target.classList.remove('blur');
    });
  
    observer.unobserve(entry.target);
  }
  
  const imgObserver = new IntersectionObserver(imgLazyLoad, {
    root: null,
    threshold: 0,
    rootMargin: '-200px' // we used this margin here cause we want the images to be loaded early
  })
  
  targetImgs.forEach(img => imgObserver.observe(img));

  ///////////////////////////////  implementing Slider  /////////////////////////////////////////

const slides = document.querySelectorAll('.slide');
const backBtn = document.querySelector('.previous_slide');
const nextBtn = document.querySelector('.next_slide');

let curSlide = 0;

nextBtn.addEventListener('click', function(){
    curSlide += 600; // Move to the next slide
    if (curSlide > 1800) {
        curSlide = 0; // If at the end, loop back to the beginning
    }
    updateSlidePositions();
});

backBtn.addEventListener('click', function(){
    curSlide -= 600; // Move to the previous slide
    if (curSlide < 0) {
        curSlide = 1800; // If at the beginning, loop back to the end
    }
    updateSlidePositions();
});

function updateSlidePositions() {
    slides.forEach(slide => {
        slide.style.right = `${curSlide}px`; // Update the slide positions
    });
}

/////////////////////////// Implementing Login page feature //////////////////////////////

const loginButton = document.querySelector('.user');
loginButton.addEventListener('click', function(){
  console.log('Login');
})
