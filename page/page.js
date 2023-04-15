const anime_name = document.getElementById("anime-name");
const container = document.querySelector(".anime");
const container2 = document.querySelector(".episode");
let animeInfo = JSON.parse(localStorage.getItem("animeInfo"));


container2.innerHTML = '';

const displayInfo = () => {
  console.log(animeInfo);
  anime_name.innerText = `${animeInfo.attributes.titles.en}`;
  const checkRating = animeInfo.attributes.averageRating
    ? `${animeInfo.attributes.averageRating}`
    : "N/A";
  const checkAgeRating = animeInfo.attributes.ageRatingGuide
    ? `${animeInfo.attributes.ageRatingGuide}`
    : "N/A";
  const checkStartDate = animeInfo.attributes.startDate
    ? `${animeInfo.attributes.startDate}`
    : "N/A";
  const checkEndDate = animeInfo.attributes.endDate
    ? `${animeInfo.attributes.endDate}`
    : "N/A";
  const checkEpisode = animeInfo.attributes.episodeCount
    ? `${animeInfo.attributes.episodeCount}`
    : "N/A";
  const animePage = `
    <img src="${animeInfo.attributes.posterImage.large}" alt="${animeInfo.attributes.posterImage.large}">
    <div class="anime-info"> 
    <p><span class = "subheading">Description:</span>
    <br><br>${animeInfo.attributes.synopsis}</p>
    <p><span class = "subheading">Rating: </span> ${checkRating}</p>
    <p><span class = "subheading">Age Rating Guide:</span>  ${checkAgeRating}</p>
    <p><span class = "subheading">Start Date:</span>  ${checkStartDate}</p>
    <p><span class = "subheading">End Date:</span>  ${checkEndDate}</p>
    <p><span class = "subheading">Episodes:</span>  ${checkEpisode}</p>
    <p><span class = "subheading">Youtube ID:</span>  ${animeInfo.attributes.youtubeVideoId}</p>
    </div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${animeInfo.attributes.youtubeVideoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;

  container.innerHTML = animePage;
};

displayInfo();

function backPage() {
  const pageNum = localStorage.getItem("pageNum");
  console.log(pageNum);
  localStorage.setItem("page2", pageNum);
  location.href = "../index.html";
}

const getAnimeEpisode = async () => {
  console.log(animeInfo.relationships.episodes.links.related);
  const animeEpLink = animeInfo.relationships.episodes.links.related;
  try {
    const data = await fetch(animeEpLink);
    const episode = await data.json();
    console.log(episode)
    const episodeArr = episode.data;
    const animeEps = episodeArr.map((episode) => `
    <div class="card">
      <img src= "${episode.attributes.thumbnail.original}" class="card-img-top" alt="${episode.attributes.thumbnail.original}">
        <div class="card-body">
          <h7 class="card-title">Season: ${episode.attributes.seasonNumber}</h7>
          <h5 class="card-title my-3">Ep:${episode.attributes.number} - ${episode.attributes.canonicalTitle}</h5>
          <p class="card-text">${episode.attributes.synopsis}</p>
          <p class="card-text">Duration: ${episode.attributes.length}mins</p>
        </div>
    </div>
      `).join("");
    
    container2.innerHTML = animeEps;
  } catch (e) {
    console.log("Error", e);
  }
};

getAnimeEpisode();

// const goToEpisode = () => {
//   console.log()
// }
