import { galleryItems } from "../app.js"

const ref = {
    gallary: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    btnClose: document.querySelector('.lightbox__button'),
    imgRef: document.querySelector('.lightbox__image'),
    overlay: document.querySelector('.lightbox__overlay'),
};

const filtredArray = galleryItems.flatMap(item => item.original)


function addImages (gallary) {
  for(const item of gallary){
    const createDiv = document.createElement('li');
    const prewie = item.preview;
    const original = item.original;
    const description = item.description;
      createDiv.innerHTML = `  
      <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${prewie}"
        data-source="${original}"
        alt="${description}"
      />
    </a>`;
    ref.gallary.appendChild(createDiv);
  }
};
   
function isOpen (){
  ref.lightbox.classList.add("is-open")
};

function isClosed(){
  ref.lightbox.classList.remove("is-open");
  ref.imgRef.src = "";
  window.removeEventListener('keyup', onPressArrow)
};

function onPressESC (event){
  if(event.code === 'Escape'){
   isClosed()
  }
}

function onPressArrow (event){
  const activeIndex = filtredArray.indexOf(ref.imgRef.src);
  if(event.code === 'ArrowLeft' ){  
    const indexArrowLeft = activeIndex - 1;
    if(indexArrowLeft >= 0){
      ref.imgRef.src = filtredArray[indexArrowLeft];
    } return;
}
  if(event.code === 'ArrowRight'){
    const indexArrowRight = activeIndex + 1;
    if(indexArrowRight < filtredArray.length){
      ref.imgRef.src = filtredArray[indexArrowRight];
    } return;
  }
}

function clickOnImage (event){
  event.preventDefault();
  if(event.target.nodeName !== 'IMG'){
      return;
} 
  isOpen();
  const dataSource = event.target.dataset.source;
  ref.imgRef.src = dataSource;

  window.addEventListener('keyup', onPressArrow)
}

ref.gallary.addEventListener('click', clickOnImage)

ref.btnClose.addEventListener('click', () =>{
  isClosed();
})

ref.overlay.addEventListener('click', event =>{
  if(event.target === event.currentTarget){
    isClosed();
  }
})

window.addEventListener('keydown', onPressESC);

addImages(galleryItems);


