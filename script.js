let movieInp = document.getElementById("movieinput")
let movieBtn = document.getElementById("moviebtn")
const apikey = "fa9ba8ee"
let query = ""
let gallery = document.getElementById("gallery")
let alertDiv = document.getElementById("alertdiv")


const getMovies = async (q) => {
    try {
        let response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&t=${q}`)
        let data = await response.json()
        if (data.Response === "False") {
            showCardDisplay()
            return
        }
        displayMovies(data)
    } catch (error) {
        console.log("fetch API is wrong")
    }
}

movieBtn.addEventListener('click', () => {
    gallery.innerHTML = ""
   
    if (!query) {
        return alert("enter Movie Name")
    }
    getMovies(query)
    movieInp.value = ""
})

movieInp.addEventListener('input', () => {
    query = movieInp.value.trim()
})


function showCardDisplay() {
    alertDiv.innerHTML = `
        <div class="d-flex justify-content-center  m-5">
  <div class="card w-25 mb-3" id="myCard">
    <div class="card-body text-center">
      <h5 class="card-title">Movie Not Found!</h5>
      <a href="#" class="btn btn-primary errorbtn" onclick="removeCard()">Back to main page </a>
    </div>
  </div>
</div>`
}

function removeCard() {
    let card = document.getElementById("myCard");
    if (card)
        card.remove();

}

function displayMovies(data) {
  alertDiv.innerHTML = ""
    gallery.innerHTML = `
    <div class="container">
  <div class="card mb-3 shadow mx-auto my-4 w-100" style="max-width: 800px;">
    <div class="row g-0">
      <div class="col-12 col-md-4">
        <img src="${data.Poster}" class="img-fluid rounded-start w-100 h-100 object-fit-cover" alt="Poster">
      </div>
      <div class="col-12 col-md-8">
        <div class="card-body">
          <h6 class="card-title">Movie Name: ${data.Title}</h6>
          <h6 class="card-title">Director: ${data.Director}</h6>
          <h6 class="card-title">Actors: ${data.Actors}</h6>
          <h6 class="card-title">Type: ${data.Type}</h6>
          <h6 class="card-title">Released Date: ${data.Released}</h6>
          <h6 class="card-title">Language: ${data.Language}</h6>
          <p class="card-text">${data.Plot}</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
  

}


