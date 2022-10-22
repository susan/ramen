//variables
let imagesContainerTag = document.querySelector("#ramen-menu");
let restaurantImageTag = document.querySelector(".detail-image");
let nameTag = document.querySelector(".name");
let restaurantNameTag = document.querySelector(".restaurant");
let ratingTag = document.querySelector("input[name=rating]");
let commentTag = document.querySelector("textarea[name=comment]");

//fetch
fetch("http://localhost:3000/ramens")
  .then((r) => r.json())
  .then((r) =>
    r.forEach((ramen) => {
      let imageTag = document.createElement("img");
      imageTag.src = ramen.image;
      imageTag.dataset.id = ramen.id;
      imagesContainerTag.append(imageTag);
    })
  );

imagesContainerTag.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  fetch(`http://localhost:3000/ramens/${id}`)
    .then((r) => r.json())
    .then((r) => {
      restaurantImageTag.src = r.image;
      nameTag.innerText = r.name;
      restaurantNameTag.innerText = r.restaurant;
      ratingTag.value = r.rating;
      commentTag.textContent = r.comment;
    });
});
