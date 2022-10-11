const desktop = document.querySelector(".desktop");

const firefoxIcon = document.querySelector(".icon--firefox");
const VSCodeIcon = document.querySelector(".icon--vs-code");

const createWindow = (data) => {
  // Create a new window
  const window = document.createElement("div");
  window.classList.add("window");
  desktop.appendChild(window);

  // Create the top bar that contains the title and window buttons
  const windowTopBar = document.createElement("div");
  window.appendChild(windowTopBar);
  windowTopBar.classList.add("window");
  windowTopBar.classList.add("window__title");
  const titleDiv = document.querySelector(".window__title");

  // Add the title to the top bar
  const titleHeading = document.createElement("h1");
  titleHeading.innerText = data.title;
  titleDiv.appendChild(titleHeading);

  // Add the buttons to the top bar
  const buttonInteractions = ["minimise", "maximise", "close"];
  const buttons = document.createElement("div");
  buttonInteractions.forEach((interaction) => {
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    button.value = interaction;
    button.setAttribute("id", interaction);

    // Button events
    button.addEventListener("click", (event) => {
      switch (event.target.value) {
        case "close":
          window.remove();
          break;
        default:
          break;
      }
    });
    buttonContainer.appendChild(button);
    buttons.appendChild(buttonContainer);
  });
  titleDiv.appendChild(buttons);

  // Add the rest of the window
  const body = document.createElement("div");
  window.appendChild(body);
  body.classList.add("window");
  body.classList.add("window__body");

  return window;
};

// Firefox
firefoxIcon.addEventListener("click", () => {
  const data = { title: "Firefox" };
  const window = createWindow(data);

  const windowBody = window.querySelector(".window__body");

  // Add Chungy to Firefox window
  const chungy = document.createElement("iframe");
  chungy.setAttribute(
    "src",
    "https://www.youtube.com/embed/dEvZ2PSqk3E?start=13&autoplay=1"
  );
  windowBody.appendChild(chungy);
});

// VS Code
VSCodeIcon.addEventListener("click", () => {
  const data = { title: "Visual Studio Code" };
  const window = createWindow(data);

  const editor = document.createElement("div");
  editor.setAttribute("id", "editor");
  const windowBody = window.querySelector(".window__body");
  windowBody.appendChild(editor);

  var epic = ace.edit("editor");
  epic.setTheme("ace/theme/one_dark");
  epic.session.setMode("ace/mode/javascript");
});
