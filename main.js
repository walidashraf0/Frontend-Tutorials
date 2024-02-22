// Scroll Tutorials
let el = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  el.style.width = `${(scrollTop / height) * 100}%`;
});

// API Tutorials (Currency Converter)
fetch(
  "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=0624c6c204234b1985582361355a21af"
)
  .then((result) => {
    let myData = result.json();
    return myData;
  })
  .then((currency) => {
    let amount = document.querySelector(".amount");
    let egpPrice = document.querySelector(".egp span");
    let sarPrice = document.querySelector(".sar span");
    egpPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["EGP"]);
    sarPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["SAR"]);
  });

// --------------------------------------------------------

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let theData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput.value == "") {
    theData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch("https://api.github.com/users/walidashraf0/repos")
      .then((response) => response.json())
      .then((repos) => {
        theData.innerHTML = "";
        repos.forEach((repo) => {
          let theDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          theDiv.appendChild(repoName);
          let theUrl = document.createElement("a");
          let theUrlText = document.createTextNode("Visit");
          theUrl.appendChild(theUrlText);
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          theUrl.setAttribute("target", "_blank");
          theDiv.appendChild(theUrl);
          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          starsSpan.appendChild(starsText);
          theDiv.appendChild(starsSpan);
          theDiv.className = "repo-box";
          theData.appendChild(theDiv);
        });
      });
  }
}
