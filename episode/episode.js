"use strict";

function backPage() {
    location.href = "../page/page.html";
}

const animeEp = JSON.parse(localStorage.getItem("Episode-Details"));

console.log(animeEp);