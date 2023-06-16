

var loadBtn = document.getElementById("loadBtn");
var movieListElement = document.getElementById("movies");
var searchInput = document.getElementById("searchInput"); 
var searchTxt = document.getElementById("searchTxt");
var homePage = document.getElementById("homeBtn");

// creating an empty variable so it can be acccess and changed later on
let searchTerm = ""
let page = 1
let arr = []

//creating a display function so it candisplay the movie title, poster image, and votes  for each movie
const displayMovie = (movie) => {
    //creating the variables for the movie displayed features
    const movieTitle = movie.title;
    const posterPath = movie.poster_path;
    const votes = movie.vote_average;
  
    //creating a container/ movie card
    const movieContain = document.createElement("div");
    movieContain.classList.add("movie-container");
  
    //creating a variable to hold the movie title
    const listItem = document.createElement("h2");
    listItem.textContent = movieTitle;
    listItem.classList.add("movie-title");
    movieContain.appendChild(listItem);
  
// checking if the movie poster exist
    if (posterPath) {
        const postEle = document.createElement("img");
        postEle.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
        postEle.classList.add("movie-poster");
        movieContain.appendChild(postEle);
    }
    
// checking if the movie votes exist
    if(votes){
        const voteEle = document.createElement("p");
        voteEle.textContent = `Votes: ${votes}`;
        voteEle.classList.add("movie-votes");
        movieContain.appendChild(voteEle);
    }
    
    // movieContain.addEventListener("click", () => {
    //     playVideo(videoId);
    //   });

  // adding the continer/ card to the main screen
    movieListElement.appendChild(movieContain);
  };

// Function to play video using embedded YouTube
/* const playVideo = (videoId) => {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  
    // Create a modal or open a new window to display the video
    // Example modal code:
    const modal = document.createElement("div");
    modal.classList.add("modal");
    
    const iframe = document.createElement("iframe");
    iframe.src = videoUrl;
    iframe.allowFullscreen = true;
  
    modal.appendChild(iframe);
    document.body.appendChild(modal);
  
    // Close modal when clicked outside
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        document.body.removeChild(modal);
      }
    });
}; */

const search = async () => {
    const API_KEY = "6557e9119008b99d3e63f679fd06be41"
    let url = ""
    // url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
    
    if(searchTerm === ""){
            url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
    }
    else{
        url=`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${page}`;
    }
    try{
        const response = await fetch(url);
        const data = await response.json();
    
    
        console.log(data)
        movieListElement.innerHTML = "";
        
        arr.forEach(movie => {
            displayMovie(movie);
        });

    // Loop through the movie results and create list items to display each movie title
        data.results.forEach(movie => {
        displayMovie(movie);
            arr.push(movie);

        });


    page += 1
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// call search
search()

// creating the load button action
loadBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission (optional)
    
    search()
});

// creating the search buttton action
searchInput.addEventListener("click", async (event) => {
    event.preventDefault();
    searchTerm = searchTxt.value;
   
    arr=[];
    movieListElement.innerHTML = "";
    
    page = 1
    search()
    searchTxt.value = "";
    
    console.log("Performing search");
})

// creating the homepage button action
homePage.addEventListener("click", (event) =>{
    event.preventDefault();
    searchTerm = ""
    arr = []
    movieListElement.innerHTML = ""
    page = 1;
    search();
})


