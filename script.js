document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("grid-container");
  const resetButton = document.getElementById("resetButton");

  resetButton.addEventListener("click", function () {
    resetGrid();
  });

  // Initial grid creation
  createGrid(16);

  // Paint black when clicking
  function paintBlackWhenClicking(gridItem) {
    let isClicked = false;
    isClicked = gridItem.addEventListener("click", function () {
      gridItem.style.backgroundColor = "black";
    });
  }

  // // Create a multicolor effect when hovering over the grids.
  // function multiColorHoverEffect(gridItem) {
  //   if (isClicked) {
  //     // Add event listeners for hover effect
  //     gridItem.addEventListener("mouseenter", function () {
  //       gridItem.style.backgroundColor = getRandomColor();
  //     });

  //     gridItem.addEventListener("mouseleave", function () {
  //       gridItem.style.backgroundColor = "";
  //     });
  //   }
  // }

  function resetGrid() {
    // Prompt the user for the number of squares per side
    let newSize = prompt("Enter the number of squares per side (max 100):");

    // Validations:
    // Parse to int
    newSize = parseInt(newSize);

    // Validate the user input
    if (isNaN(newSize) || newSize <= 0) {
      alert("Please enter a valid number greater than 0!");
      return;
    }

    // Limit the size to a maximum of 100;
    newSize = Math.min(newSize, 100);

    // Remove existing grid
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }

    // Create a new grid based on the entered size
    createGrid(newSize);
  }

  // Create a 16x16 grid
  function createGrid(size) {
    // Set up grid styles
    // gridContainer.style.width = "960px";
    // gridContainer.style.height = "960px";

    // Create a size x size grid (default value is 16x16)
    for (let i = 0; i < size * size; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      let itemSize = `calc(100% / ${size} - 1px)`;
      gridItem.style.width = itemSize;
      gridItem.style.height = itemSize;

      paintBlackWhenClicking(gridItem);

      gridContainer.appendChild(gridItem);
    }
  }

  // Helper function to get a random color
  function getRandomColor() {
    const characters_hex = "0123456789ABCDEF"; //16 characters
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += characters_hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
