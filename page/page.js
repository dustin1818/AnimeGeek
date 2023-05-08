"use strict";
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
let characterData = "";
episode_container.innerHTML = "";
character_container.innerHTML = "";

console.log(animeInfo)

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
  let checkStatus = 
    animeInfo.attributes.status
    //code for capitalize
    ? `${animeInfo.attributes.status}`.charAt(0).toUpperCase() + `${animeInfo.attributes.status}`.slice(1)
    : "N/A"
   if(checkStatus === "Current"){
    checkStatus = "Ongoing"
   }
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
    <p><span class = "subheading">Status:</span>  ${checkStatus}</p>
    </div>
    <iframe id="vid-frame" width="560" height="315" src="https://www.youtube.com/embed/${animeInfo.attributes.youtubeVideoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;
  container.innerHTML = animePage;
};

displayInfo();

const fetchStreamLink = async () => {
  try {
    const url = await fetch(`https://kitsu.io/api/edge/anime/${animeInfo.id}/streaming-links`);
    const data = await url.json();
    console.log(data.data);
    let anime_links = "";
    let list_ep = document.createElement("ul");
    let subheading = document.createElement("p");
    subheading.classList.add("subheading");
    subheading.classList.add("w-100");
    subheading.innerText = "Subheading Links:";
    let list_container = document.createElement("div");
    list_container.append(subheading);
    data.data.forEach((anime) => {
      anime_links = anime.attributes.url;
      let list = document.createElement("li");
      let list_link = document.createElement("a");
      list_link.innerText = anime_links;
      list_link.target = "_blank";
      list_link.href = ` ${anime_links}`;
      list.append(list_link);
      list_ep.append(list);
      list_container.append(list);
      const anime_info = document.querySelector(".anime-info");
      anime_info.append(list_container);
      console.log(anime_links);
    })
  } catch (error) {
    console.log('Error', error)
  }
}

fetchStreamLink();

const vid = document.getElementById("vid-frame");
animeInfo.attributes.youtubeVideoId ? animeInfo.attributes.youtubeVideoId: (vid.style.display = "none");
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
    episodeArr
      .forEach((episode) =>{
        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = episode.attributes.thumbnail.original;
        img.setAttribute("alt", `${episode.attributes.thumbnail.original}`);
        const card_body = document.createElement("div");
        card_body.classList.add("card-body");
        const card_title = document.createElement("h7");
        card_title.classList.add("card-title");
        card_title.innerText = `Season: ${episode.attributes.seasonNumber}`;
        const card_ep = document.createElement("h5");
        card_ep.classList.add("card-title");
        card_ep.classList.add("my-3");
        card_ep.innerText = `Ep: ${episode.attributes.number} - ${episode.attributes.canonicalTitle}`;
        const card_time = document.createElement("p");
        card_time.innerText = `Duration: ${episode.attributes.length}mins`;
        card_body.append(card_title,card_ep,card_time);
        card.append(img,card_body);
        card.addEventListener("click", () => {
          animeEpisodePage(episode);
        })
        episode_container.append(card)
      })
    episode.links.next ? episode. links.next : (load_btn.style.display = "none");
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

const animeEpisodePage = (ep) => {
  localStorage.setItem("Episode-Details", JSON.stringify(ep));
  location.href = "../episode/episode.html";  
}

const getAnimeCharacter = async () => {
  try{
    characterData = (`https://kitsu.io/api/edge/anime/${animeInfo.id}/anime-characters?page%5Blimit%5D=20&page%5Boffset%5D=${page2}`);
    const data = await fetch(characterData);
    const animeData = await data.json();
    if(animeData.data.length === 0){
      character_text.style.display = "none";
      load_btn2.style.display = "none";
      const no_character = document.createElement("h3");
      no_character.innerText = "No Character Data";
      character_container.append(no_character);
    }
    animeData.data.forEach((anime) => {
      const characters = anime.relationships.character.links.related;
      getAnimeCharacterData(characters);
    });
  }catch(e){
    console.log("Error", e)
    character_text.style.display = "none";
    load_btn2.style.display = "none";
    const no_character = document.createElement("h3");
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
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = animeCharInfos.image.original;
    img.setAttribute("alt", `${animeCharInfos.image.original}`);
    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    const card_title = document.createElement("h2");
    card_title.classList.add("card-title");
    card_title.classList.add("my-3");
    card_title.innerText =`${animeCharInfos.canonicalName}`;
    card_body.append(card_title);
    card.append(img,card_body)
    card.addEventListener("click", () => {
      redirectToAnimeCharac(animeData);
    })
    character_container.append(card);
  } catch (e) {
    console.log("Error", e);
  }
};

getAnimeCharacterData();
const loadMoreCharacter = () => {
  page2 += 20;
  getAnimeCharacter();
};

const redirectToAnimeCharac = (charac) => {
localStorage.setItem("Character-Details", JSON.stringify(charac));
console.log(charac)
location.href = "../character/character.html";  
}
