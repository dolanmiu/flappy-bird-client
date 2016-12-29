namespace Flappy {
    interface IScoreBoardParams {
        gameOverKey: string;
        scoreBoardKey: string;
        wooshSoundKey: string;
    }

    export class ScoreBoard extends Phaser.Group {

        private gameOver: Phaser.Sprite;
        private wooshSound: Phaser.Sound;
        private scoreWindow: ScoreWindow;

        constructor(game: Game, params: IScoreBoardParams) {
            super(game);

            this.gameOver = new Phaser.Sprite(game, Constants.gameWidth / 2, Constants.gameHeight / 2 - 100, params.gameOverKey);
            this.gameOver.anchor.set(0.5, 0.5);
            this.gameOver.alpha = 0;
            this.add(this.gameOver);

            this.wooshSound = game.add.audio(params.wooshSoundKey);

            this.scoreWindow = new ScoreWindow(game, {
                scoreWindowKey: params.scoreBoardKey,
            });
            this.scoreWindow.alpha = 0;
            this.add(this.scoreWindow);

            this.fixedToCamera = true;
        }

        public show(score: number): void {
            this.scoreWindow.score = score;

            this.gameOver.y = Constants.gameHeight / 2 - 80;
            let gameOverTween = this.game.add.tween(this.gameOver).to({ alpha: 1, y: Constants.gameHeight / 2 - 100 }, 500, Phaser.Easing.Exponential.Out, true, 500);
            gameOverTween.onStart.add(() => {
                this.wooshSound.play();
            });

            this.scoreWindow.y = Constants.gameHeight / 2 + 20;
            let scoreBoardTween = this.game.add.tween(this.scoreWindow).to({ alpha: 1, y: Constants.gameHeight / 2 }, 500, Phaser.Easing.Exponential.Out, true, 1500);
            scoreBoardTween.onStart.add(() => {
                this.wooshSound.play();
            });
        }

        public update(): void {
            this.gameOver.x = Constants.gameWidth / 2;
            this.gameOver.y = Constants.gameHeight / 2 - 100;

            this.scoreWindow.x = Constants.gameWidth / 2;
            this.scoreWindow.y = Constants.gameHeight / 2;
        }
    }
}
