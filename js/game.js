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
    // console.log('inside the game loop');

    // interrupt the game loop if this variable has changed to true
    if (this.isGameOver) {
      return;
    }

    this.update();
    this.updateStats();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // console.log('inside the update');
    this.player.move();

    if (Math.random() > 0.98 && this.obstacules.length < 1) {
      this.obstacules.push(new Obstacle(this.gameScreen));
    }

    this.obstacules.forEach((obstacle, index) => {
      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        // remove the obstacle from the DOM
        obstacle.element.remove();

        // remove obstacle from obstacles array
        this.obstacules.splice(index, 1);

        // reduce the lives by 1
        this.lives--;
      } else if (obstacle.top > this.height) {
        // increase the score by 1
        this.score++;

        // remove the obstacle from the DOM
        obstacle.element.remove();

        // remove the obstacle from the array
        this.obstacules.splice(index, 1);
      }
    });

    if (this.lives === 0) {
      this.endGame();
    }
  }

  endGame() {
    // remove all elements from the screen
    this.player.element.remove();
    this.obstacules.forEach(obstacle => obstacle.element.remove());

    this.isGameOver = true;

    // hide the game and show the end screen
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
  }

  updateStats() {
    const score = document.getElementById('score');
    score.innerText = this.score;

    const lives = document.getElementById('lives');
    lives.innerText = this.lives;
  }
}
