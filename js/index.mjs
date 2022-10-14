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
  let hours = today.getHours();
  let minutes = today.getMinutes();

  const addZeros = (number) => {
    if (number < 10) {
      number = `0${number}`;
    }
    return number;
  };

  hours = addZeros(hours);
  minutes = addZeros(minutes);

  clock.innerText = `${hours}:${minutes}`;

  setTimeout(() => {
    createClock();
  }, 4000);
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

const language = document.getElementById("language");
const systemLang = navigator.language;
language.innerText = systemLang;

// Open all windows if the "activities" button is pressed
const activitiesButton = document.getElementById("activities");

activitiesButton.addEventListener("click", () => {
  const windows = document.querySelectorAll("div.window");

  // Don't do anything if there are no windows
  if (windows.length === 0) {
    return;
  }

  windows.forEach((windowElement) => {
    if (windowElement.getBoundingClientRect().width < 200) {
      windowElement.style.width = "700px";
      windowElement.style.height = "400px";
    }
    document.body.classList.add("scale");
    windowElement.style.scale = "75%";

    windowElement.addEventListener("click", () => {
      windowElement.style.scale = "100%";
      document.body.classList.remove("scale");
    });
  });
});
