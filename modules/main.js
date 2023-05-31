let results;
let cardContainer;

const clearCardContainer = () => {
  cardContainer = document.getElementById("card-container");

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
};

const renderMovieCards = (movies) => {
  movies.forEach((movie) => {
    const {
      poster_path: image,
      original_title: title,
      vote_average: star,
      overview: desc,
    } = movie;

    let temp = `<div class="movieCard">
                              <div class="imgBox"><img src = "https://image.tmdb.org/t/p/original/${image}"></div>
                                  <div class="movieInfo">
                                      <p>${title}</p>
                                      <p>⭐️${star}</p>
                                  </div>
                              <div class="movieDesc"><p>${desc}</p></div>
                              </div>`;
    cardContainer.insertAdjacentHTML("beforeend", temp);
  });
};

const fetchMovieData = () => {
  //영화 정보 가져오기
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjBhYmVmNzFiYTc1ZmVkYWE4MDY3ZTE3NzY5YmEwNyIsInN1YiI6IjY0NzU5ZjQyMWJmMjY2MDQ0MTQ2ZDlkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XBnsi-06xZEQfQ0ZF59opEWA1yW-Z9ksbLAc-3jnmIQ",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let movies = data["results"];
      cardContainer = document.getElementById("card-container");
      clearCardContainer();

      results = movies;
      renderMovieCards(movies);
    })
    .catch((err) => console.error(err));
};

//영화 제목 검색하기
const searchMovie = (keyword) => {
  const filteredMovie = results.filter((movie) => {
    const movieTitle = movie.original_title.toLowerCase();

    return movieTitle.includes(keyword);
  });

  clearCardContainer();
  renderMovieCards(filteredMovie);
};

//버튼 클릭시 함수 실행
const searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", () => {
  let searchItem = document.getElementById("search-text").value.toLowerCase();

  searchMovie(searchItem);

  // 1. 검색창에 있는 키워드 받아오기
  // 2. 그 키워드를 이용해서 filter하기
  // 3. filter한 영화 리스트들을 화면에 보여줘야대
});

fetchMovieData();
