document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("grid-container");
  const resetButton = document.getElementById("resetButton");
  const blackColorButton = document.getElementById("blackColor");
  const multiColorButton = document.getElementById("multiColor");
  let isBlackColorMode = true;
  let isMultiColorMode = false;

  resetButton.addEventListener("click", function () {
    resetGrid();
  });

  // Initial grid creation
  createGrid(16);

  function eraseColor(gridItem) {
    ["contextmenu", "dblclick"].forEach((element) => {
      gridItem.addEventListener(element, function () {
        gridItem.style.backgroundColor = "#ddd";
        event.preventDefault();
      });
    });
  }

  blackColorButton.addEventListener("click", function () {
    isBlackColorMode = !isBlackColorMode;
    isMultiColorMode = false; // Turn off multicolor mode when switching to black color mode
  });

  multiColorButton.addEventListener("click", function () {
    isMultiColorMode = !isMultiColorMode;
    isBlackColorMode = false; // Turn off black color mode when switching to multicolor mode
  });

  function paintWhenClicked(gridItem) {
    gridItem.addEventListener("click", function () {
      if (isBlackColorMode) {
        gridItem.style.backgroundColor = "black";
      } else if (isMultiColorMode) {
        gridItem.style.backgroundColor = getRandomColor();
      }
    });
  }

  function resetGrid() {
    // Prompt the user for the number of squares per side
    let newSize = prompt(
      "Enter the number of squares per side (max 100):\nIngresa el numero de cuadrados por lado (máx 100):"
    );

    // Validations...
    newSize = parseInt(newSize);

    if (isNaN(newSize) || newSize <= 0) {
      alert(
        "Please enter a valid number greater than 0!\nPor favor, ingrese un número válido más grande que 0."
      );
      return;
    }

    newSize = Math.min(newSize, 100);

    // Remove existing grid
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }

    // Create a new grid based on the entered size
    createGrid(newSize);
  }

  function createGrid(size) {
    for (let i = 0; i < size * size; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      let itemSize = `calc(100% / ${size} - 1px)`;
      gridItem.style.width = itemSize;
      gridItem.style.height = itemSize;
      eraseColor(gridItem);
      paintWhenClicked(gridItem);
      gridContainer.appendChild(gridItem);
    }
  }

  function getRandomColor() {
    const characters_hex = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += characters_hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
