namespace Flappy {
    export class ScoreBoard extends Phaser.Group {

        private gameOver: Phaser.Sprite;
        private scoreBoard: Phaser.Sprite;

        constructor(game: Game, gameOverKey: string, scoreBoardKey: string) {
            super(game);

            this.gameOver = new Phaser.Sprite(game, Constants.gameWidth / 2, Constants.gameHeight / 2 - 100, gameOverKey);
            this.gameOver.anchor.x = 0.5;
            this.gameOver.anchor.y = 0.5;
            this.add(this.gameOver);

            this.scoreBoard = new Phaser.Sprite(game, Constants.gameWidth / 2, Constants.gameHeight / 2, scoreBoardKey);
            this.scoreBoard.anchor.x = 0.5;
            this.scoreBoard.anchor.y = 0.5;
            this.add(this.scoreBoard);

            this.fixedToCamera = true;
        }

        public show(): void {

        }

        public update(): void {
            this.gameOver.x = Constants.gameWidth / 2;
            this.gameOver.y = Constants.gameHeight / 2 - 100;

            this.scoreBoard.x = Constants.gameWidth / 2;
            this.scoreBoard.y = Constants.gameHeight / 2;
        }
    }
}
