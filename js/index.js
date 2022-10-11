const footer = document.getElementById("footer");

footer.addEventListener("mouseenter", () => {
  footer.classList.add("show");

  footer.addEventListener("mouseleave", () => {
    footer.classList.remove("show");
  });
});

const clock = document.getElementById("clock");
const date = document.getElementById("date");

const createClock = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  clock.innerText = `${hours}:${minutes}`;

  setTimeout(() => {
    createClock();
  }, 1000);
};

const monthNames = [
  "Jan",
  "Febr",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDate = () => {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  date.innerText = `${monthNames[month]} ${day}`;

  setTimeout(() => {
    getDate();
  }, 86400);
};

createClock();
getDate();
