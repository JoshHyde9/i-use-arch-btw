import { dragMoveListener } from "./windowFunctions.mjs";

const desktop = document.querySelector(".desktop");

const firefoxIcon = document.querySelector(".icon--firefox");
const VSCodeIcon = document.querySelector(".icon--vs-code");
const terminalIcon = document.querySelector(".icon--terminal");
const applicationIcon = document.querySelector(".icon--applications");

const randomId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const createWindow = (data) => {
  // Close the menu on app open
  const menu = document.querySelector("section.desktop__menu");

  if (menu) {
    menu.remove();
  }

  // Create a random id
  const id = randomId();

  // Create a new window
  const newWindow = document.createElement("div");
  newWindow.classList.add("window");
  newWindow.classList.add(`window--${id}`);

  newWindow.style.width = data.width;
  newWindow.style.height = data.height;

  desktop.appendChild(newWindow);

  // Create the top bar that contains the title and window buttons
  const windowTopBar = document.createElement("header");
  newWindow.appendChild(windowTopBar);
  windowTopBar.classList.add("window");
  windowTopBar.classList.add("window__title");
  windowTopBar.classList.add(`window__title--${id}`);
  const titleDiv = document.querySelector(`.window__title--${id}`);

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
          newWindow.remove();
          break;
        case "maximise":
          // If the window size is already at the max size, make it smaller
          if (newWindow.style.width === `${window.innerWidth}px`) {
            newWindow.style.width = "50%";
            newWindow.style.height = "50%";
            break;
          }

          newWindow.style.top = 0;
          newWindow.style.left = 0;
          newWindow.style.width = `${window.innerWidth}px`;
          newWindow.style.height = `calc(${window.innerHeight}px - 20px)`;
          break;
        case "minimise":
          newWindow.style.bottom = 0;
          newWindow.style.height = 0;
          newWindow.style.width = 0;
        default:
          break;
      }
    });
    buttonContainer.appendChild(button);
    buttons.appendChild(buttonContainer);
  });
  titleDiv.appendChild(buttons);

  // Add the rest of the window
  const body = document.createElement("section");
  newWindow.appendChild(body);
  body.classList.add("window");
  body.classList.add("window__body");
  body.classList.add(`window__body--${id}`);

  const currentWindow = document.querySelector(`.window--${id}`);

  // Inc z index when the window is clicked on
  currentWindow.addEventListener("click", () => {
    let currentIndex = currentWindow.style.zIndex;

    currentIndex = Number(currentIndex) + 1;
    currentWindow.style.zIndex = currentIndex;
  });

  // Resort to using a library because I could not get it to work
  interact(currentWindow)
    .draggable({
      onmove: dragMoveListener,
    })
    .resizable({
      preserveAspectRatio: false,
      edges: { left: true, right: true, bottom: true, top: true },
    })
    .on("resizemove", function (event) {
      var target = event.target,
        x = parseFloat(target.getAttribute("data-x")) || 0,
        y = parseFloat(target.getAttribute("data-y")) || 0;

      // update the element's style
      target.style.width = event.rect.width + "px";
      target.style.height = event.rect.height + "px";

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px," + y + "px)";

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    });

  return { window: newWindow, id };
};

// Firefox
firefoxIcon.addEventListener("click", () => {
  const data = { title: "Firefox", width: "50%", height: "100vh" };
  const { window, id } = createWindow(data);

  const windowBody = window.querySelector(`.window__body--${id}`);

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
  const data = { title: "Visual Studio Code", width: "100%", height: "100vh" };
  const { window, id } = createWindow(data);

  const editorContainer = document.createElement("div");
  editorContainer.setAttribute("id", "editor");
  const windowBody = window.querySelector(`.window__body--${id}`);
  windowBody.appendChild(editorContainer);

  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/one_dark");
  editor.session.setMode("ace/mode/javascript");
});

// Terminal
terminalIcon.addEventListener("click", () => {
  const data = { title: "Terminal", width: "45%", height: "35%" };
  const { window, id } = createWindow(data);

  const windowBody = window.querySelector(`.window__body--${id}`);
  windowBody.classList.add("rice-bg");
  windowBody.classList.add(`rice-bg--${id}`);

  const command = document.createElement("div");
  command.classList.add("system-data__input-line--command");
  windowBody.appendChild(command);

  command.innerText = "???  ~ neofetch";

  const info = document.createElement("div");
  const asciiArt = document.createElement("pre");

  asciiArt.classList.add("system-data");
  asciiArt.classList.add("system-data--ascii");

  info.appendChild(asciiArt);

  info.classList.add("system-data");

  const systemInfoDiv = document.createElement("div");
  info.appendChild(systemInfoDiv);

  systemInfoDiv.classList.add("system-data");
  systemInfoDiv.classList.add("system-data__info");

  const { platform, userAgent, language, onLine, hardwareConcurrency } =
    navigator;

  const SYSTEM_INFO = {
    OS: platform,
    Agent: userAgent,
    Language: language,
    Online: onLine,
    CPUThreads: hardwareConcurrency,
  };

  // Iterate over the object
  Object.keys(SYSTEM_INFO).map((key) => {
    const container = document.createElement("div");
    systemInfoDiv.appendChild(container);
    container.classList.add("system-data");
    container.classList.add("system-data__info");
    container.classList.add("system-data__info--item");

    const systemInfoTitle = document.createElement("span");
    const systemInfoP = document.createElement("p");

    systemInfoTitle.classList.add("info-title");

    container.appendChild(systemInfoTitle);
    container.appendChild(systemInfoP);

    systemInfoTitle.innerText = key;
    systemInfoP.innerText = `: ${SYSTEM_INFO[key]}`;
  });

  asciiArt.innerText = `  
                  ##
                 ####
                ######
               ########
              ##########
             ############
            ##############
           ################
          ##################
         ####################
        ######################
       #########      #########
      ##########      ##########
     ###########      ###########
    ##########          ##########
   #######                  #######
  ####                          ####
 ###                              ###`;

  windowBody.appendChild(info);

  // Create a new input line
  const inputLine = document.createElement("div");
  inputLine.classList.add("system-data");
  inputLine.classList.add("system-data__input-line");
  // Create a new command info line
  const newCommand = document.createElement("div");
  newCommand.classList.add("system-data__input-line--command");
  // Add the new command to the input
  inputLine.appendChild(newCommand);
  // Add the input line to the window
  windowBody.appendChild(inputLine);

  newCommand.innerText = "???  ~";

  const input = document.createElement("input");
  input.classList.add("system-data");
  input.classList.add("system-data__input-line");
  input.classList.add("system-data__input-line--terminal-input");

  // Appendd the input to the input line
  inputLine.appendChild(input).focus();

  windowBody.addEventListener("keyup", (event) => {
    // Create a new line if the enter key is pressed
    if (event.key === "Enter") {
      const inputLine = document.createElement("div");
      inputLine.classList.add("system-data");
      inputLine.classList.add("system-data__input-line");

      const newCommand = document.createElement("div");
      newCommand.classList.add("system-data__input-line--command");

      inputLine.appendChild(newCommand);

      windowBody.appendChild(inputLine);

      newCommand.innerText = "???  ~";

      const newInput = document.createElement("input");
      newInput.classList.add("system-data__input-line--terminal-input");
      inputLine.appendChild(newInput).focus();
    }
  });
});

// Applications
applicationIcon.addEventListener("click", () => {
  const doesMenuExist = document.querySelector("section.desktop__menu");

  if (doesMenuExist) {
    doesMenuExist.remove();
    return;
  }

  const menu = document.createElement("section");

  menu.classList.add("desktop__menu");

  const menuIcons = document.createElement("div");
  menuIcons.classList.add("desktop__menu-grid");

  document.body.addEventListener("keyup", (event) => {
    if (event.key === "Escape") menu.remove();
  });

  // Get all of the icons on the dock and put into the menu
  const icons = document.querySelectorAll(".icon");

  const cleanedIcons = [];
  icons.forEach((icon) => {
    if (icon.classList.contains("icon--applications")) return; // Don't add the application icon

    cleanedIcons.push(icon);
  });

  cleanedIcons.forEach((icon) => {
    const copyOfIcon = icon.cloneNode(true); // Copy the element

    const gridItem = document.createElement("div");
    gridItem.classList.add("desktop__menu-grid");
    gridItem.classList.add("desktop__menu-grid--item");

    gridItem.appendChild(copyOfIcon);
    menuIcons.appendChild(gridItem);
  });

  menu.appendChild(menuIcons);
  desktop.appendChild(menu);
});
