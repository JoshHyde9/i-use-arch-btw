const footer = document.getElementById("footer");

footer.addEventListener("mouseenter", () => {
  footer.classList.add("show");

  footer.addEventListener("mouseleave", () => {
    footer.classList.remove("show");
  });
});
