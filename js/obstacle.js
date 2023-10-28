class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 300 + 70);
    this.top = 0;
    this.width = 100;
    this.height = 150;
    this.element = document.createElement('img');

    this.addObstacle('./images/redCar.png');
  }

  addObstacle(imgSrc) {
    this.element.src = imgSrc;
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    // move the obstacle down by 3px
    this.top += 3;

    // updates the obstacle position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
}
