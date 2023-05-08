"use strict";
const character_container = document.querySelector(".character");

function backPage() {
  location.href = "../page/page.html";
}

const getAnimeCharacter = async () => {
  const animeCharacter = JSON.parse(localStorage.getItem("Character-Details"));
  const animeCharacAttri = animeCharacter.data.attributes;
  console.log(animeCharacAttri);
  const animePage = `
  <img class = "w-25" src="${animeCharacAttri.image.original}" alt="${animeCharacAttri.image.original}">
  <div class="anime-info"> 
  <h5><span class = "subheading">Title:</span>${animeCharacAttri.canonicalName}</h5>
  <p><span class = "subheading">Description:</span>
  <br><br>${animeCharacAttri.description}</p>
  </div>
  `;
  character_container.innerHTML = animePage;
};

getAnimeCharacter();
