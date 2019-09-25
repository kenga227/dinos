"use strict";

const link = "https://mokomes-d460.restdb.io/rest/dinosaurs";
const key = "5d88e6e5fd86cb75861e266b";

function get() {
  fetch(link, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => display(data));
}

function display(dinos) {
  console.log(dinos);
  dinos.forEach(dino => {
    const templ = document.querySelector("template").content;
    const clopy = templ.cloneNode(true);
    const parent = document.querySelector(".parent");
    clopy.querySelector("h1").textContent = dino.name;
    clopy.querySelector("h2").textContent = dino.age;
    clopy.querySelector("p").textContent = dino.character;
    clopy.querySelector("button").addEventListener("click", () => {
      deleted(dino._id);
    });
    clopy.querySelector("article").dataset.dinoid = dino._id;
    parent.appendChild(clopy);
  });
}

get();

function post() {
  const newDino = {
    name: "Spino",
    age: "56789",
    character: "rawr\nxd\nlol"
  };
  const jsonDino = JSON.stringify(newDino);
  fetch(link, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    },
    body: jsonDino
  })
    .then(res => res.json())
    .then(data => console.log(data));
  const templ = document.querySelector("template").content;
  const clopy = templ.cloneNode(true);
  const parent = document.querySelector(".parent");
  clopy.querySelector("h1").textContent = newDino.name;
  clopy.querySelector("h2").textContent = newDino.age;
  clopy.querySelector("p").textContent = newDino.character;
  parent.prepend(clopy);
}

document.querySelector("#neleido").addEventListener("click", post);

function deleted(id) {
  console.log(id);
  fetch(link + "/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => {
      document.querySelector(`.dinaster[data-dinoid="${id}"]`).remove();
    });
}
