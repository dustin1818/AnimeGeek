//declare variables
let menu_btn = document.querySelector(".hamburger");
let mobile_btn = document.querySelector(".mobile-nav");
let card_layout = document.getElementById("card-layout__itemz");
//page
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let first = document.querySelector(".first");
let last = document.querySelector(".last");
let page = 0;

//variables for getAnime function
let animeList = "";

// Menu bar toggle code
menu_btn.addEventListener("click", function () {
  if ("click" === "click") {
    menu_btn.classList.toggle("is-active");
    mobile_btn.classList.toggle("is-active");
  }
});

//Pagination
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
  page = 18878;
  getAnime();
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
  location.href = "./page.html";
};

//Tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

//Return to page when redirected
const page1 = localStorage.getItem("pageNum");
const page2 = localStorage.getItem("page2");
if (page1 == page2) {
  page = Number(page2);
  getAnime();
}

getAnime();

const animeInput = document.getElementById("input");
animeInput.addEventListener("keydown", (e) => {
  try {
    const animeSearch = animeInput.value;
    let url = `https://kitsu.io/api/edge/anime?filter[text]=${animeSearch}&page[limit]=20`;
    if (e.key === "Enter") {
      if (/^\s/.test(animeSearch)) {
        animeSearch = "";
      }
      const fetchSearchAnime = async () => {
        const data = await fetch(url);
        const animeSearchList = await data.json();
        card_layout.innerHTML = '';
        displaySearchAnime(animeSearchList);
      };
      fetchSearchAnime();
    }
  } catch (e) {
    console.log("Error", e);
  }
});

const displaySearchAnime = (animeInput) => {
  const anime = animeInput.data.map((animeDetails) => ({
    ...animeDetails
  }));

  console.log(anime)

  const animePages = Object.values(animeInput)
  console.log('for link',animePages[2].first);

  anime.forEach((animeInfo) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const image_upper = document.createElement("div");
    image_upper.classList.add("image_upper");
    const img_card = document.createElement("img");
    img_card.src = `${animeInfo.attributes.posterImage.large}`;
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
  })
};


