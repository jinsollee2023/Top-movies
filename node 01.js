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
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
