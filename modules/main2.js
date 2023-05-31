let movies;
let cardContainer;
let filteredMovie;

const clearCardContainer = function () {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
};

const renderMovieCards = function (movies) {
  movies.forEach((movie) => {
    const {
      poster_path: image,
      original_title: title,
      vote_average: star,
      overview: desc,
      id = id,
    } = movie;

    let tempHtml = `<div class="movieCard" onclick='showId(${id})'>
                        <div class="imgBox"><img src="https://image.tmdb.org/t/p/original/${image}"></div>
                        <div class="movieInfo">
                            <p>${title}</p>
                            <p>⭐️  ${star}</p>
                        </div>
                        <div class="movieDesc"><p>${desc}</p></div>
                        </div>`;
    cardContainer.insertAdjacentHTML("beforeend", tempHtml);
  });
};

const showId = function (keyword) {
  alert("Movie ID: " + keyword);
};

//영화 정보 가져오기
let fetchMovieData = function () {
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
      movies = data["results"];
      cardContainer = document.querySelector("#card-container");

      clearCardContainer();
      renderMovieCards(movies);
    })
    .catch((err) => console.error(err));
};

fetchMovieData();

//2. 담아온 데이터와 영화 제목 비교
const searchMovie = function (keyword) {
  filteredMovie = movies.filter(function (movie) {
    const movieTitle = movie.original_title.toLowerCase();

    return movieTitle.includes(keyword);
  });
  //3. 비교된 데이터 리스트로 보여주기
  if (filteredMovie.length === 0) {
    alert("일치하는 영화 제목이 없습니다!");
    location.reload();
  } else {
    clearCardContainer();
    renderMovieCards(filteredMovie);
  }
};

//1. 버튼 클릭시 함수 실행 -> 인풋창 데이터 담아오기
const searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", function (event) {
  let searchItem = document.querySelector("#search-text").value.toLowerCase(); //인풋창 밸류 담아오기 ok
  if (searchItem.length === 0) {
    alert("영화 제목이 입력되지 않았습니다!");
    location.reload();
  } else {
    searchMovie(searchItem);
  }
});

//엔터키로 검색하기
document.getElementById("search-text").addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    document.getElementById("search-btn").click();
  }
});

//버튼 클릭시 카드 컨테이너로 이동
const goToScroll = function () {
  let searchItem = document.querySelector("#search-text").value.toLowerCase(); //인풋창 밸류 담아오기 ok
  console.log(filteredMovie);
  if (searchItem.length === 0) return;
  else if (filteredMovie?.length === 0) return;

  const location = document.querySelector("#card-container").offsetTop;
  window.scrollTo({ top: location, behavior: "smooth" });
};

const goToScrollTop = function () {
  const location = document.querySelector("#topImage").offsetTop;
  window.scrollTo({ top: location, behavior: "smooth" });
};
