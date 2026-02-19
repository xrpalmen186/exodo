const container = document.querySelector(".container");
const modoEntrevista = document.querySelector(".controls > input[name='interviewMode']");
const profileCard = document.querySelector(".profile-card");
// const profileCard = document.querySelectorAll(".profile-card");
// const profileBio = document.querySelector(".profile-card > img[data-bio]").dataset.bio

// for (let i = 0; i < profileCard.length; i++) {
//     const profileBio = document.createElement("div");
//     profileBio.className = "bio-info"
//     profileBio.textContent = profileCard[i].querySelector("img[data-bio]").dataset.bio;
//     profileCard[i].appendChild(profileBio);
// }

const profileBio = document.createElement("div");
profileBio.className = "bio-info";
profileBio.textContent = profileCard.querySelector("img[data-bio]").dataset.bio;
profileCard.appendChild(profileBio);


profileCard.addEventListener("mouseover", function(){
    if (modoEntrevista.checked) {
        profileBio.style.display = "flex";
    }
});

profileCard.addEventListener("mouseout",  function(){
    profileBio.style.display = "none";
});

//Solo logré que funcione con la primera card, no con todas (no entiendo por qué no me funciona)