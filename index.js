const numItemsToGenerate = 5; //how many gallery items you want on the screen
const numImagesAvailable = 342; //how many total images are in the collection you are pulling from
const imageWidth = 480; //your desired image width in pixels
const imageHeight = 480; //desired image height in pixels
const collectionID = 225; //the collection ID from the original url
function renderGalleryItem(randomNumber){
   fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
  .then((response)=> {
    let galleryItem = document.createElement('li');
    galleryItem.classList.add('carousel__slide');
    galleryItem.innerHTML = `
      <img class="carousel__slide" src="${response.url}" alt="gallery image"/>
    `
    document.querySelector('ul').appendChild(galleryItem);
  })
}
for(let i=0;i<numItemsToGenerate;i++){
  let randomImageIndex =  i;
  renderGalleryItem(randomImageIndex);
}