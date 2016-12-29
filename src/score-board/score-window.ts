namespace Flappy {
    interface IScoreWindowParams {
        scoreWindowKey: string;
    }

    export class ScoreWindow extends Phaser.Sprite {
        private currentScore: Phaser.Text;
        private bestScore: Phaser.Text;
        private highestScore: number;

        constructor(game: Phaser.Game, params: IScoreWindowParams) {
            super(game, 0, 0, params.scoreWindowKey);

            this.anchor.set(0.5, 0.5);
            this.highestScore = 0;

            this.currentScore = new Phaser.Text(game, this.width / 2 - 25, -this.height / 2 + 37, '0', { font: '18px flappy', fill: 'white' });
            this.currentScore.stroke = 'black';
            this.currentScore.strokeThickness = 5;
            this.currentScore.anchor.x = 1;
            this.addChild(this.currentScore);

            this.bestScore = new Phaser.Text(game, this.width / 2 - 25, -this.height / 2 + 78, '0', { font: '18px flappy', fill: 'white' });
            this.bestScore.stroke = 'black';
            this.bestScore.strokeThickness = 5;
            this.bestScore.anchor.x = 1;
            this.addChild(this.bestScore);
        }

        public set score(score: number) {
            this.currentScore.text = score.toString();

            if (score > this.highestScore) {
                this.highestScore = score;
            }

            this.bestScore.text = this.highestScore.toString();
        }
    }
}
