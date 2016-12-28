namespace Flappy {
    export class ScoreBoard extends Phaser.Group {

        private gameOver: Phaser.Sprite;
        private scoreBoard: Phaser.Sprite;

        constructor(game: Game, gameOverKey: string, scoreBoardKey: string) {
            super(game);

            this.gameOver = new Phaser.Sprite(game, Constants.gameWidth / 2, Constants.gameHeight / 2 - 100, gameOverKey);
            this.gameOver.anchor.x = 0.5;
            this.gameOver.anchor.y = 0.5;
            this.gameOver.alpha = 0;
            this.add(this.gameOver);

            this.scoreBoard = new Phaser.Sprite(game, Constants.gameWidth / 2, Constants.gameHeight / 2, scoreBoardKey);
            this.scoreBoard.anchor.x = 0.5;
            this.scoreBoard.anchor.y = 0.5;
            this.scoreBoard.alpha = 0;
            this.add(this.scoreBoard);

            this.fixedToCamera = true;
        }

        public show(): void {
            this.gameOver.y = Constants.gameHeight / 2 - 80;
            this.game.add.tween(this.gameOver).to({ alpha: 1, y: Constants.gameHeight / 2 - 100 }, 700, Phaser.Easing.Exponential.Out, true, 200);

            this.scoreBoard.y = Constants.gameHeight / 2 + 20;
            this.game.add.tween(this.scoreBoard).to({ alpha: 1, y: Constants.gameHeight / 2 }, 700, Phaser.Easing.Exponential.Out, true, 500);
        }

        public update(): void {
            this.gameOver.x = Constants.gameWidth / 2;
            this.gameOver.y = Constants.gameHeight / 2 - 100;

            this.scoreBoard.x = Constants.gameWidth / 2;
            this.scoreBoard.y = Constants.gameHeight / 2;
        }
    }
}
