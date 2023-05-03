"use strict";
const episode_container = document.querySelector(".episode");

function backPage() {
  location.href = "../page/page.html";
}

const getAnimeEpisode = async () => {
  const animeEp = JSON.parse(localStorage.getItem("Episode-Details"));
  const animeEpAttri = animeEp.attributes;
  console.log(animeEpAttri);
  const animePage = `
  <img class = "w-50" src="${animeEpAttri.thumbnail.original}" alt="${animeEpAttri.thumbnail.original}">
  <div class="anime-info"> 
  <p><span class = "subheading">Title:</span>${animeEpAttri.canonicalTitle}</p>
  <p><span class = "subheading">Description:</span>
  <br><br>${animeEpAttri.description}</p>
  <p><span class = "subheading">Rating: </span> ${animeEpAttri.airdate}</p>
  <p><span class = "subheading">Season Number:</span>  ${animeEpAttri.seasonNumber}</p>
  </div>
  `;
  episode_container.innerHTML = animePage;
};

getAnimeEpisode();
