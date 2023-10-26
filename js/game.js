class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameEndScreen = document.getElementById('game-end');
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      './images/car.png'
    );
    this.height = 600;
    this.width = 500;
    this.obstacules = [];
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
  }

  start() {
    // setting the game screen size
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // hiding the start screen
    this.startScreen.style.display = 'none';

    // showing the game screen
    this.gameScreen.style.display = 'block';

    this.gameLoop();
  }

  gameLoop() {
    console.log('inside the game loop');

    // interrupt the game loop if this variable has changed to true
    if (this.isGameOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    console.log('inside the update');
    this.player.move();
  }
}
