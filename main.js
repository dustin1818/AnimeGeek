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

// menu bar toggle code
menu_btn.addEventListener("click", function () {
  if ("click" === "click") {
    menu_btn.classList.toggle("is-active");
    mobile_btn.classList.toggle("is-active");
  }
});

//get Anime
next.addEventListener("click", () => {
  card_layout.innerHTML = '';
  console.log("nxt is clicked");
  page += 20;
  localStorage.setItem("page", page);
  getAnime();
});
prev.addEventListener("click", () => {
  card_layout.innerHTML = '';
  console.log("nxt is clicked");
  page -= 20;
  localStorage.setItem("page", page);
  getAnime();
});
first.addEventListener("click", () => {
  card_layout.innerHTML = '';
  console.log("nxt is clicked");
  page = 0;
  localStorage.setItem("page", page);
  getAnime();
});
last.addEventListener("click", () => {
  card_layout.innerHTML = '';
  console.log("nxt is clicked");
  page = 18878;
  localStorage.setItem("page", page);
  getAnime();
});



const getAnime = async () => {
    localStorage.getItem('page')
    console.log(page);
    let url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${page}`;
    let data = await fetch(url);
    animeList = await data.json();
    console.log(animeList);
    const anime = animeList.data.map((animedata) => ({
      ...animedata,
    }));
    displayAnime(anime);
  }


const displayAnime = async (anime) => {
  const animeHTML = anime;
  animeHTML.forEach((info) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const img_card = document.createElement("img");
    img_card.src = `${info.attributes.posterImage.large}`;
    img_card.classList.add("card__cover");
    const info_container = document.createElement("div");
    info_container.classList.add("card__content");
    const anime_heading = document.createElement("h3");
    if (info.attributes.titles.en) {
      anime_heading.innerText = `${info.attributes.titles.en}`;
    } else {
      anime_heading.innerText = `${info.attributes.titles.en_jp}`;
    }
    info_container.append(anime_heading);
    card.append(img_card, info_container);
    card.addEventListener("click", () => {
      getID(info);
    });
    card_layout.append(card);
  });
};

const getID = async (info) => {
  console.log(info);
  localStorage.setItem("animeInfo", JSON.stringify(info));
  location.href = "./page.html";
};

if (performance.getEntriesByType("navigation")[0].type === 'reload') {
  page = page;
  localStorage.setItem("page", page);
}


//tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

getAnime();
