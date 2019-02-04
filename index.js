// const numItemsToGenerate = 5; //how many gallery items you want on the screen
// const numImagesAvailable = 342; //how many total images are in the collection you are pulling from
// const imageWidth = 480; //your desired image width in pixels
// const imageHeight = 480; //desired image height in pixels
// const collectionID = 225; //the collection ID from the original url
// function renderGalleryItem(randomNumber){
//    fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
//   .then((response)=> {
//     let galleryItem = document.createElement('li');
//     let dotItem = document.createElement('button');
//     dotItem.classList.add('carousel__indicator');
//     galleryItem.classList.add('carousel__slide');
//     galleryItem.innerHTML = `
//       <img class="carousel__image" src="${response.url}" alt="gallery image"/>
//     `
//     document.querySelector('ul').appendChild(galleryItem);
//     document.querySelector('.carousel__nav').appendChild(dotItem);
//     const slides = Array.from(track.children);
//     console.log(slides);



//   })
// }
// for(let i=0;i<numItemsToGenerate;i++){
//   let randomImageIndex =  i;
//   renderGalleryItem(randomImageIndex);
// }

const track = document.querySelector('.carousel__track');

const slides = [... track.children];
console.log(slides);

const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

const dotsNav = document.querySelector('.carousel__nav');
const dots = [... dotsNav.children];

const slideWidth = slides[0].getBoundingClientRect().width;



// arrange the slides next to eachother instead of stacked on top of eachother

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

//making a arrow function for what we need to slide left or right.
const moveToSlide = (track, currentSlide, targetSlide) => {
  //move to the next slide .
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if(targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if(targetIndex === slides.length -1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

//when i click right, move slides to the right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const prevIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);

});

//when i click right, move slides to the right
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const nextIndex = slides.findIndex(slide => slide === prevSlide);
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);

});

//now when i click i need the dots to move

dotsNav.addEventListener('click', e => {
  //what indicator we clicked on ?
  const targetDot = e.target.closest('button');
  if(!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});



