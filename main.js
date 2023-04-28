"use strict";

//declare constiables
const menu_btn = document.querySelector(".hamburger");
const mobile_btn = document.querySelector(".mobile-nav");
const card_layout = document.getElementById("card-layout__itemz");
//page
const pagination1 = document.querySelector(".page1");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const first = document.querySelector(".first");
const last = document.querySelector(".last");
let page = 0;
//pagination for search bar
const pagination2 = document.querySelector(".page2");
const next2 = document.querySelector(".next2");
const prev2 = document.querySelector(".prev2");
const first2 = document.querySelector(".first2");
const last2 = document.querySelector(".last2");
let page_2 = 0;

//global constiables for getAnime/fetchSearchAnime function
let animeList = "";
let animeSearchList = "";

// Menu bar toggle code
menu_btn.addEventListener("click", function () {
  if ("click" === "click") {
    menu_btn.classList.toggle("is-active");
    mobile_btn.classList.toggle("is-active");
  }
});

const getAnime = async () => {
  try {
    let url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${page}`;
    let data = await fetch(url);
    animeList = await data.json();
    const anime = animeList.data.map((animedata) => ({
      ...animedata,
    }));
    displayAnime(anime);
  } catch (e) {
    console.log("Error", e);
    pagination1.style.display = "none";
  }
};

const displayAnime = async (anime) => {
  const animeHTML = anime;
  animeHTML.forEach((info) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const image_upper = document.createElement("div");
    image_upper.classList.add("image_upper");
    const img_card = document.createElement("img");
    img_card.src = `${info.attributes.posterImage.large}`;
    img_card.alt = `${info.attributes.posterImage.large}`;
    img_card.classList.add("card__cover");
    const box_rating = document.createElement("div");
    box_rating.classList.add("box_rating");
    const value = `${info.attributes.averageRating}`;
    box_rating.innerText = Math.round(value) + " / 100";
    image_upper.append(img_card, box_rating);
    const info_container = document.createElement("div");
    info_container.classList.add("card__content");
    const anime_heading = document.createElement("h3");
    if (info.attributes.titles.en) {
      anime_heading.innerText = `${info.attributes.titles.en}`;
    } else {
      anime_heading.innerText = `${info.attributes.titles.en_jp}`;
    }
    info_container.append(anime_heading);
    card.append(image_upper, info_container);
    card.addEventListener("click", () => {
      getID(info);
    });
    card_layout.append(card);
  });
};

const getID = async (info) => {
  localStorage.setItem("animeInfo", JSON.stringify(info));
  localStorage.setItem("pageNum", page);
  location.href = "./page/page.html";
};

//pagination for global anime
    next.addEventListener("click", () => {
      card_layout.innerHTML = "";
      page += 20;
      getAnime();
    });
    prev.addEventListener("click", () => {
      card_layout.innerHTML = "";
      page -= 20;
      getAnime();
    });
    first.addEventListener("click", () => {
      card_layout.innerHTML = "";
      page = 0;
      getAnime();
    });
    last.addEventListener("click", () => {
      card_layout.innerHTML = "";
      const link_lastpage = animeList.links.last;
      const last_page = link_lastpage.split(
        "https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D="
      );
      page = Number(last_page[1]);
      getAnime();
    });

//Tooltip
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

//Return to page when redirected
// const page1 = localStorage.getItem("pageNum");
// const page2 = localStorage.getItem("page2");
// if (page1 == page2) {
//   page = Number(page2);
//   getAnime();
// }

getAnime();
const animeInput = document.getElementById("input");
animeInput.addEventListener("keydown", (e) => {
  try {
    const animeSearch = animeInput.value;
    if (e.key === "Enter") {
      if (/^\s/.test(animeSearch)) {
        animeSearch = "";
      }
      fetchSearchAnime(animeSearch);
      first2.addEventListener("click", () => {
        card_layout.innerHTML = "";
        page_2 = 0;
        console.log(page_2);
        fetchSearchAnime(animeSearch);
      });
      next2.addEventListener("click", () => {
        card_layout.innerHTML = "";
        page_2 += 20;
        console.log(page_2);
        fetchSearchAnime(animeSearch);
      });
      prev2.addEventListener("click", () => {
        card_layout.innerHTML = "";
        page_2 -= 20;
        console.log(page_2);
        fetchSearchAnime(animeSearch);
      });
      last2.addEventListener("click", () => {
        card_layout.innerHTML = "";
        const last_page = animeSearchList.links.last;
        const offsetPage = last_page.split(
          `https://kitsu.io/api/edge/anime?filter%5Btext%5D=${animeSearch}&page%5Blimit%5D=20&page%5Boffset%5D=`
        );
        page_2 = Number(offsetPage[1]);
        fetchSearchAnime(animeSearch);
      });
    }
  } catch (e) {
    console.log("Error", e);
  }
});

const fetchSearchAnime = async (animeSearch) => {
  let url = `https://kitsu.io/api/edge/anime?filter[text]=${animeSearch}&page[limit]=20&page[offset]=${page_2}`;
  const data = await fetch(url);
  animeSearchList = await data.json();
  pagination1.style.display = "none";
  pagination2.style.display = "flex";
  card_layout.innerHTML = "";
  displaySearchAnime(animeSearchList);
};

const displaySearchAnime = (animeInput) => {
  const anime = animeInput.data.map((animeDetails) => ({
    ...animeDetails,
  }));

  console.log(anime);
  // const animePages = Object.values(animeInput);
  // console.log("for link", animePages[2].last);

  anime.forEach((animeInfo) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const image_upper = document.createElement("div");
    image_upper.classList.add("image_upper");
    const img_card = document.createElement("img");
    img_card.src = `${animeInfo.attributes.posterImage.large}`;
    img_card.alt = `${animeInfo.attributes.posterImage.large}`;
    img_card.classList.add("card__cover");
    const box_rating = document.createElement("div");
    box_rating.classList.add("box_rating");
    const value = `${animeInfo.attributes.averageRating}`;
    box_rating.innerText = Math.round(value) + " / 100";
    image_upper.append(img_card, box_rating);
    const info_container = document.createElement("div");
    info_container.classList.add("card__content");
    const anime_heading = document.createElement("h3");
    if (animeInfo.attributes.titles.en) {
      anime_heading.innerText = `${animeInfo.attributes.titles.en}`;
    } else {
      anime_heading.innerText = `${animeInfo.attributes.titles.en_jp}`;
    }
    info_container.append(anime_heading);
    card.append(image_upper, info_container);
    card.addEventListener("click", () => {
      getID(animeInfo);
    });
    card_layout.append(card);
  });
};
