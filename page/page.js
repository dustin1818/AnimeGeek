//declaring variables for page.js
const anime_name = document.getElementById("anime-name");
const container = document.querySelector(".anime");
const episode_container = document.querySelector(".episode");
const character_container = document.querySelector(".character");
const episode_text = document.querySelector(".episode-list");
const character_text = document.querySelector(".character-list");
const load_btn = document.getElementById("load");
const load_btn2 = document.getElementById("load2");
let animeInfo = JSON.parse(localStorage.getItem("animeInfo"));
let page = 0;
let page2 = 0;
let animeEpLink = "";
episode_container.innerHTML = "";
character_container.innerHTML = "";

const displayInfo = () => {
  anime_name.innerText = `${animeInfo.attributes.canonicalTitle}`;
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
    </div>
    <iframe id="vid-frame" width="560" height="315" src="https://www.youtube.com/embed/${animeInfo.attributes.youtubeVideoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;
  container.innerHTML = animePage;
};

displayInfo();
const vid = document.getElementById("vid-frame");
animeInfo.attributes.youtubeVideoId
  ? animeInfo.attributes.youtubeVideoId
  : (vid.style.display = "none");

function backPage() {
  const pageNum = localStorage.getItem("pageNum");
  localStorage.setItem("page2", pageNum);
  location.href = "../index.html";
}

const getAnimeEpisode = async () => {
  try {
    animeEpLink = `https://kitsu.io/api/edge/anime/${animeInfo.id}/episodes?page%5Blimit%5D=20&page%5Boffset%5D=${page}`;
    const data = await fetch(animeEpLink);
    const episode = await data.json();
    const episodeArr = episode.data;
    const animeEps = episodeArr
      .map(
        (episode) => `
      <div class="card">
        <img src= "${episode.attributes.thumbnail.original}" class="card-img-top" alt="${episode.attributes.thumbnail.original}">
          <div class="card-body">
            <h7 class="card-title">Season: ${episode.attributes.seasonNumber}</h7>
            <h5 class="card-title my-3">Ep:${episode.attributes.number} - ${episode.attributes.canonicalTitle}</h5>
            <p class="card-text">${episode.attributes.synopsis}</p>
            <p class="card-text">Duration: ${episode.attributes.length}mins</p>
          </div>
      </div>
        `
      )
      .join("");
    episode_container.innerHTML += animeEps;
    episode.links.next ? episode.links.next : (load_btn.style.display = "none");
  } catch (e) {
    console.log("Error", e);
    episode_text.style.display = "none";
    load_btn.style.display = "none";
    const no_video = document.createElement("h2");
    no_video.innerText = "No Episode";
    episode_container.append(no_video);
  }
};

const loadMoreEp = () => {
  page += 20;
  getAnimeEpisode();
};

getAnimeEpisode();

const getAnimeCharacter = async () => {
  try{
    const data = await fetch(`https://kitsu.io/api/edge/anime/${animeInfo.id}/anime-characters?page%5Blimit%5D=20&page%5Boffset%5D=${page2}`);
    const animeData = await data.json();
    console.log(animeData);
    animeData.data.forEach((element) => {
      const characters = element.relationships.character.links.related;
      getAnimeCharacterData(characters);
    });
  }catch(e){
    console.log('Error', e)
    character_text.style.display = "none";
    load_btn2.style.display = "none";
    const no_character = document.createElement("h2");
    no_character.innerText = "No Character Data";
    character_container.append(no_character);
  }

};

getAnimeCharacter();

const getAnimeCharacterData = async (characters) => {
  try {
    const data = await fetch(characters);
    const animeData = await data.json();
    const animeCharInfos = animeData.data.attributes;
    const html = `
      <div class="card">
      <img src= "${animeCharInfos.image.original}" class="card-img-top" alt="${animeCharInfos.image.original}">
        <div class="card-body">
          <h2 class="card-title my-3">${animeCharInfos.canonicalName}</h2>
          <p class="card-text">${animeCharInfos.description}</p>
        </div>
    </div>
      `;
    character_container.innerHTML += html;
  } catch (e) {
    console.log("Error", e);
  }
};

getAnimeCharacterData();

const loadMoreCharacter = () => {
  page2 += 20;
  getAnimeCharacter();
};
