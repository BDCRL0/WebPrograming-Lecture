let boxCounter = 0;

class Box {
  constructor(color) {
    this.color = color;
    this.id = `box-${boxCounter++}`;
    this.element = document.createElement("div");
    this.element.className = "color-box";
    this.element.style.backgroundColor = this.color;
    this.element.setAttribute("data-color", this.color);
    this.element.setAttribute("data-id", this.id);
    this.element.textContent = this.id;
    this.element.title = "Click to remove this box";
    this.element.addEventListener("click", () => this.remove());
  }

  render(parent) {
    parent.appendChild(this.element);
  }

  remove() {
    this.element.remove();
  }
}

class AnimatedBox extends Box {
  constructor(color) {
    super(color);
    this.element.style.transition = "transform 0.5s";
    this.element.addEventListener("mouseover", () => {
      this.element.style.transform = "scale(1.1) rotate(3deg)";
    });
    this.element.addEventListener("mouseout", () => {
      this.element.style.transform = "scale(1) rotate(0deg)";
    });
  }
}

function createBox() {
  const colors = ["#ff9d00", "#0077ff", "#00d1b2", "#ff4d6d", "#6a00ff"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const container = document.getElementById("boxContainer");
  const newBox = new AnimatedBox(randomColor);
  newBox.render(container);
}
