//variables
let imagesContainerTag = document.querySelector("#ramen-menu");
let restaurantImageTag = document.querySelector(".detail-image");
let nameTag = document.querySelector(".name");
let restaurantNameTag = document.querySelector(".restaurant");
let ratingTag = document.querySelector("input[name=rating]");
let commentTag = document.querySelector("textarea[name=comment]");
let ratingForm = document.querySelector("#ramen-rating");
console.log(ratingForm);

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
  insertRestaurant(id);
});

//functions

const insertRestaurant = (id) => {
  fetch(`http://localhost:3000/ramens/${id}`)
    .then((r) => r.json())
    .then((r) => {
      ratingForm.dataset.id = id;
      restaurantImageTag.src = r.image;
      nameTag.innerText = r.name;
      restaurantNameTag.innerText = r.restaurant;
      ratingTag.value = r.rating;
      commentTag.textContent = r.comment;
    });
};

const changeRating = (e) => {
  e.preventDefault();
  let newRating = e.target.rating.value;
  let newComment = e.target.comment.value;
  let id = ratingForm.dataset.id;

  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating: newRating,
      comment: newComment,
    }),
  })
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
    });
};

//listeners
ratingForm.addEventListener("submit", changeRating);
