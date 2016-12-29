namespace Flappy {
    interface IScoreBoardParams {
        gameOverKey: string;
        scoreBoardKey: string;
        wooshSoundKey: string;
        replayButtonKey: string;
        bronzeMedalKey: string;
        silverMedalKey: string;
        goldMedalKey: string;
        platinumMedalKey: string;
    }

    export class ScoreBoard extends Phaser.Group {

        private gameOver: Phaser.Sprite;
        private wooshSound: Phaser.Sound;
        private scoreWindow: ScoreWindow;
        private replayButton: ReplayButton;
        private gameOverStatus: boolean;

        constructor(game: Game, params: IScoreBoardParams, restartGameLambda: Function) {
            super(game);

            this.gameOver = new Phaser.Sprite(game, Constants.gameWidth / 2, Constants.gameHeight / 2 - 100, params.gameOverKey);
            this.gameOver.anchor.set(0.5, 0.5);
            this.gameOver.alpha = 0;
            this.add(this.gameOver);

            this.scoreWindow = new ScoreWindow(game, Constants.gameWidth / 2, Constants.gameHeight / 2, {
                bronzeMedalKey: params.bronzeMedalKey,
                goldMedalKey: params.goldMedalKey,
                platinumMedalKey: params.platinumMedalKey,
                scoreWindowKey: params.scoreBoardKey,
                silverMedalKey: params.silverMedalKey,
            });
            this.scoreWindow.alpha = 0;
            this.add(this.scoreWindow);

            this.replayButton = new ReplayButton(game, Constants.gameWidth / 2, Constants.gameHeight / 2 + 70, params.replayButtonKey);
            this.replayButton.alpha = 0;
            this.replayButton.events.onInputDown.add(() => {
                restartGameLambda();
                this.gameOverStatus = false;
                this.gameOver.alpha = 0;
                this.scoreWindow.alpha = 0;
                this.replayButton.alpha = 0;
                this.replayButton.inputEnabled = false;
            });
            this.add(this.replayButton);

            this.wooshSound = game.add.audio(params.wooshSoundKey);

            this.fixedToCamera = true;
        }

        public show(score: number): void {
            this.gameOverStatus = true;
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

            this.replayButton.y = Constants.gameHeight / 2 + 90;
            let replayButtonTween = this.game.add.tween(this.replayButton).to({ alpha: 1, y: Constants.gameHeight / 2 + 70 }, 500, Phaser.Easing.Exponential.Out, true, 1500);
            replayButtonTween.onComplete.add(() => {
                this.replayButton.inputEnabled = true;
            });
        }

        public update(): void {
            this.gameOver.x = Constants.gameWidth / 2;
            this.gameOver.y = Constants.gameHeight / 2 - 100;

            this.scoreWindow.x = Constants.gameWidth / 2;
            this.scoreWindow.y = Constants.gameHeight / 2;

            this.replayButton.x = Constants.gameWidth / 2;
            this.replayButton.y = Constants.gameHeight / 2 + 70;
        }

        public get isGameOver(): boolean {
            return this.gameOverStatus;
        }
    }
}
