namespace Flappy {
    interface IScoreBoardParams {
        gameOverKey: string;
        scoreBoardKey: string;
        wooshSoundKey: string;
    }

    export class ScoreBoard extends Phaser.Group {

        private gameOver: Phaser.Sprite;
        private scoreBoard: Phaser.Sprite;
        private wooshSound: Phaser.Sound;

        constructor(game: Game, params: IScoreBoardParams) {
            super(game);

            this.gameOver = new Phaser.Sprite(game, Constants.gameWidth / 2, Constants.gameHeight / 2 - 100, params.gameOverKey);
            this.gameOver.anchor.x = 0.5;
            this.gameOver.anchor.y = 0.5;
            this.gameOver.alpha = 0;
            this.add(this.gameOver);

            this.scoreBoard = new Phaser.Sprite(game, Constants.gameWidth / 2, Constants.gameHeight / 2, params.scoreBoardKey);
            this.scoreBoard.anchor.x = 0.5;
            this.scoreBoard.anchor.y = 0.5;
            this.scoreBoard.alpha = 0;
            this.add(this.scoreBoard);

            this.wooshSound = game.add.audio(params.wooshSoundKey);

            this.fixedToCamera = true;
        }

        public show(): void {
            this.gameOver.y = Constants.gameHeight / 2 - 80;
            let gameOverTween = this.game.add.tween(this.gameOver).to({ alpha: 1, y: Constants.gameHeight / 2 - 100 }, 500, Phaser.Easing.Exponential.Out, true, 500);
            gameOverTween.onStart.add(() => {
                this.wooshSound.play();
            });

            this.scoreBoard.y = Constants.gameHeight / 2 + 20;
            let scoreBoardTween = this.game.add.tween(this.scoreBoard).to({ alpha: 1, y: Constants.gameHeight / 2 }, 500, Phaser.Easing.Exponential.Out, true, 1500);
            scoreBoardTween.onStart.add(() => {
                this.wooshSound.play();
            });
        }

        public update(): void {
            this.gameOver.x = Constants.gameWidth / 2;
            this.gameOver.y = Constants.gameHeight / 2 - 100;

            this.scoreBoard.x = Constants.gameWidth / 2;
            this.scoreBoard.y = Constants.gameHeight / 2;
        }
    }
}
