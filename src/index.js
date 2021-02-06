console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const container = document.querySelector('#dog-image-container')
const breedContainer = document.querySelector('#dog-breeds')
const dropDown = document.querySelector('#breed-dropdown')

const fetchAllDogs = _ => {

  return fetch(imgUrl)
    .then(response => response.json() ) 
    .then(dogs => {
      dogs.message.forEach((dog, index) => setInterval(createDog(dog, index),0))
    } )
}

const createDog = (dog, index) => {
  let img = document.createElement("img")
  img.src = dog
  img.alt = `Dog ${index + 1}`
  container.append(img)
}

const fetchAllBreeds = _ => {
  fetch(breedUrl) 
    .then( response => response.json() )
    .then( breeds => createBreeds(breeds)) 
}

const createBreeds = breeds => {
  Array.from(breedContainer.children).forEach(child => child.remove())
  for (breed in breeds.message) {
    if (breed.charAt(0) !== dropDown.value) continue
    let li = document.createElement("li")
    li.className = "breed"
    li.textContent = breed
    breedContainer.append(li)
  }
}

const changeColor = e => {
  if (e.target.className === "breed") {
    let r = Math.floor(Math.random() * 255) +1
    let g = Math.floor(Math.random() * 255) +1
    let b = Math.floor(Math.random() * 255) +1
    e.target.style.color = `rgb(${r},${g},${b})`
  }
}

document.addEventListener('DOMContentLoaded', fetchAllDogs)
document.addEventListener('DOMContentLoaded', fetchAllBreeds)
breedContainer.addEventListener('click', changeColor)
dropDown.addEventListener('change', fetchAllBreeds )