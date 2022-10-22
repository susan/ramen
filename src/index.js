//variables
let imagesContainerTag = document.querySelector("#ramen-menu");
let restaurantImageTag = document.querySelector(".detail-image");
let nameTag = document.querySelector(".name");
let restaurantNameTag = document.querySelector(".restaurant");
let ratingTag = document.querySelector("input[name=rating]");
let commentTag = document.querySelector("textarea[name=comment]");
let ratingForm = document.querySelector("#ramen-rating");
let createForm = document.querySelector("#new-ramen");

//initial fetch
restaurantList();
insertRestaurant("1");

//functions

const showRestaurant = (restaurantObj) => {
  ratingForm.dataset.id = restaurantObj.id;
  restaurantImageTag.src = restaurantObj.image;
  nameTag.innerText = restaurantObj.name;
  restaurantNameTag.innerText = restaurantObj.restaurant;
  ratingTag.value = restaurantObj.rating;
  commentTag.textContent = restaurantObj.comment;
  createForm.reset();
};

function restaurantList() {
  fetch("http://localhost:3000/ramens")
    .then((r) => r.json())
    .then((r) => {
      r.forEach((ramen) => {
        let imageTag = document.createElement("img");
        imageTag.src = ramen.image;
        imageTag.dataset.id = ramen.id;
        imagesContainerTag.append(imageTag);
      });
    });
}

function insertRestaurant(id) {
  fetch(`http://localhost:3000/ramens/${id}`)
    .then((r) => r.json())
    .then((r) => {
      showRestaurant(r);
    });
}

const patchRating = (id, newRating, newComment) => {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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

const createRestaurant = (
  newName,
  newRestaurant,
  newImage,
  newRating,
  newComment
) => {
  fetch("http://localhost:3000/ramens", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment,
    }),
  })
    .then((r) => r.json())
    .then((r) => {
      restaurantList();
      showRestaurant(r);
    });
};

const changeRating = (e) => {
  e.preventDefault();
  let changedRating = e.target.rating.value;
  let changedComment = e.target.comment.value;
  let id = ratingForm.dataset.id;
  patchRating(id, changedRating, changedComment);
};

const addRamen = (e) => {
  e.preventDefault();
  console.log(e.target);
  let newName = e.target["new-name"].value;
  let newRestaurant = e.target["new-restaurant"].value;
  let newImage = e.target["new-image"].value;
  let newRating = e.target["new-rating"].value;
  let newComment = e.target["new-comment"].value;
  createRestaurant(newName, newRestaurant, newImage, newRating, newComment);
};

//listeners

imagesContainerTag.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  insertRestaurant(id);
});

ratingForm.addEventListener("submit", changeRating);
createForm.addEventListener("submit", addRamen);
