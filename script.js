let toolsData = [];

const toolsContainer =
document.getElementById("tools");


async function loadTools(){

try{

const response =
await fetch("tools.json");


toolsData =
await response.json();


displayTools(toolsData);


}
catch(error){

console.log(
"Unable to load tools",
error
);

}

}



function displayTools(tools){


toolsContainer.innerHTML="";


tools.forEach((tool,index)=>{


const card=document.createElement("div");


card.className="tool-card";


card.dataset.category =
tool.category;


card.innerHTML = `

<span class="favorite">
⭐
</span>

<h2>
${tool.icon}
${tool.name}
</h2>

<p>
${tool.description}
</p>


<small>
${tool.category}
</small>


<br><br>


<a href="${tool.url}"
target="_blank"
rel="noopener">

Visit Tool

</a>

`;


toolsContainer.appendChild(card);



});


}



loadTools();
/* ===================================
   AI Tools Directory
   script.js
=================================== */

// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("sw.js")
            .then(() => console.log("Service Worker Registered"))
            .catch(err => console.log(err));
    });
}

/* -----------------------------
   Live Search
------------------------------ */

const search = document.getElementById("search");
const cards = document.querySelectorAll(".tool-card");

search.addEventListener("input",()=>{


const value =
search.value.toLowerCase();


const filtered =
toolsData.filter(tool=>


tool.name.toLowerCase()
.includes(value)

||

tool.description
.toLowerCase()
.includes(value)


);



displayTools(filtered);


});

/* -----------------------------
   Category Filter
------------------------------ */

const filters = document.querySelectorAll(".filter");

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

/* -----------------------------
   Fade-in Animation
------------------------------ */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

cards.forEach(card => {

    card.classList.add("hidden");

    observer.observe(card);

});

/* -----------------------------
   Dark / Light Mode
------------------------------ */

const darkButton = document.createElement("button");

darkButton.innerHTML = "🌙";

darkButton.id = "themeToggle";

document.body.appendChild(darkButton);

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    darkButton.innerHTML = "☀️";

}

darkButton.onclick = () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        darkButton.innerHTML = "☀️";

    } else {

        localStorage.setItem("theme", "dark");

        darkButton.innerHTML = "🌙";

    }

};

/* -----------------------------
   Favorites
------------------------------ */

cards.forEach(card => {

    const fav = document.createElement("span");

    fav.innerHTML = "⭐";

    fav.className = "favorite";

    fav.style.cursor = "pointer";

    fav.style.float = "right";

    fav.title = "Favorite";

    card.prepend(fav);

    fav.onclick = () => {

        fav.classList.toggle("saved");

        if (fav.classList.contains("saved")) {

            fav.style.color = "gold";

        } else {

            fav.style.color = "";

        }

    };

});

/* -----------------------------
   Scroll To Top
------------------------------ */

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

/* -----------------------------
   Current Year
------------------------------ */

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} AI Tools Directory`;

}

/* -----------------------------
   Tool Counter
------------------------------ */

const total = document.createElement("p");

total.style.textAlign = "center";

total.style.marginBottom = "25px";

total.innerHTML =
`<strong>Total AI Tools:</strong> ${cards.length}`;

const tools = document.getElementById("tools");

tools.parentNode.insertBefore(total, tools);

/* -----------------------------
   Console
------------------------------ */

console.log("AI Tools Directory Ready 🚀");
