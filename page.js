const anime_name = document.getElementById('anime-name');
const container = document.querySelector(".container");

const displayInfo = () => {
  const animeInfo = JSON.parse(localStorage.getItem("animeInfo"));
  console.log(animeInfo);
  anime_name.innerText = `${animeInfo.attributes.titles.en_jp}`;
  const html = `
    <img src="${animeInfo.attributes.posterImage.large}" alt="">
    <div class="anime-info"> 
    <p>Description:
    <br><br>${animeInfo.attributes.synopsis}</p>
    <p>Rating: ${animeInfo.attributes.averageRating}</p>
    <p>Age Rating Guide: ${animeInfo.attributes.ageRatingGuide}</p>
    <p>Start Date: ${animeInfo.attributes.startDate}</p>
    <p>End Date: ${animeInfo.attributes.endDate}</p>
    <p>Episodes: ${animeInfo.attributes.episodeCount}</p>
    <p>Youtube ID: ${animeInfo.attributes.youtubeVideoId}</p>
    </div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${animeInfo.attributes.youtubeVideoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;

  container.innerHTML = html;
};

displayInfo();

function backPage() {
  const pageNum = localStorage.getItem("pageNum");
  console.log(pageNum);
  localStorage.setItem("page2", pageNum);
  location.href = "./index.html";
}
