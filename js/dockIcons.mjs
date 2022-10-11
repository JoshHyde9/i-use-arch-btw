const desktop = document.querySelector(".desktop");

const firefoxIcon = document.querySelector(".icon--firefox");
const VSCodeIcon = document.querySelector(".icon--vs-code");
const terminalIcon = document.querySelector(".icon--terminal");

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

// Terminal
terminalIcon.addEventListener("click", () => {
  const data = { title: "Terminal" };
  const window = createWindow(data);

  const windowBody = window.querySelector(".window__body");
  windowBody.classList.add("rice-bg");

  const command = document.createElement("div");
  command.classList.add("command");
  windowBody.appendChild(command);

  command.innerText = "➜  ~ neofetch";

  const info = document.createElement("div");
  const asciiArt = document.createElement("pre");
  asciiArt.classList.add("ascii");
  info.appendChild(asciiArt);

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
  inputLine.classList.add("input-line");
  // Create a new command info line
  const newCommand = document.createElement("div");
  newCommand.classList.add("command");
  // Add the new command to the input
  inputLine.appendChild(newCommand);
  // Add the input line to the window
  windowBody.appendChild(inputLine);

  newCommand.innerText = "➜  ~";

  const input = document.createElement("input");
  input.classList.add("terminal-input");

  // Appendd the input to the input line
  inputLine.appendChild(input).focus();

  windowBody.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      const inputLine = document.createElement("div");
      inputLine.classList.add("input-line");

      const newCommand = document.createElement("div");
      newCommand.classList.add("command");

      inputLine.appendChild(newCommand);

      windowBody.appendChild(inputLine);

      newCommand.innerText = "➜  ~";

      const newInput = document.createElement("input");
      newInput.classList.add("terminal-input");
      inputLine.appendChild(newInput).focus();
    }
  });
});
