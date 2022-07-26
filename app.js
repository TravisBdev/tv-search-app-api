
// global selectors
const submitBtn = document.querySelector('.submit');
const imgHolder = document.querySelector('.image-holder');
const input = document.querySelector('.input');
const form = document.querySelector('form');
const clear = document.querySelector('.reset')


// Main event listener - gets data then passes it to makeImg() to append to container
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const movieChoice = input.value;
    input.value = "";
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${movieChoice}`)
    makeImg(response.data);
  } catch (e) {
    console.log('Uh oh.. Something Went Wrong.', e);
  }
})

// creates image and appends it to the page
const makeImg = (shows) => {
  shows.forEach(result => {
    if(result.show.image){
      const img = document.createElement('img');
      img.src = result.show.image.medium;
      img.setAttribute('class', 'imgs')
      imgHolder.append(img);
    }
  })
}

// resets the page when input is changed, or when clear button is clicked
const reset = () => {
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    img.remove();
  })
}

// helper handlers for resetting
input.addEventListener('input', reset);
clear.addEventListener('click', reset);




