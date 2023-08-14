const toggleButton = document.querySelector(".toggle-button");
const scrollContent = document.querySelector(".chanel");

toggleButton.addEventListener("click", () => {
  scrollContent.classList.toggle("show-all-images");
});
