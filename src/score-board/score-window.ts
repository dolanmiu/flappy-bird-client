namespace Flappy {
    interface IScoreWindowParams {
        scoreWindowKey: string;
        bronzeMedalKey: string;
        silverMedalKey: string;
        goldMedalKey: string;
        platinumMedalKey: string;
    }

    export class ScoreWindow extends Phaser.Sprite {
        private currentScore: Phaser.Text;
        private bestScore: Phaser.Text;
        private highestScore: number;
        private bronzeMedal: Phaser.Sprite;
        private silverMedal: Phaser.Sprite;
        private goldMedal: Phaser.Sprite;
        private platinumMedal: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, params: IScoreWindowParams) {
            super(game, x, y, params.scoreWindowKey);

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

            this.bronzeMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.bronzeMedalKey);
            this.bronzeMedal.visible = false;
            this.addChild(this.bronzeMedal);

            this.silverMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.silverMedalKey);
            this.silverMedal.visible = false;
            this.addChild(this.silverMedal);

            this.goldMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.goldMedalKey);
            this.goldMedal.visible = false;
            this.addChild(this.goldMedal);

            this.platinumMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.platinumMedalKey);
            this.platinumMedal.visible = false;
            this.addChild(this.platinumMedal);
        }

        public set score(score: number) {
            this.currentScore.text = score.toString();

            if (score > this.highestScore) {
                this.highestScore = score;
            }

            this.resetMedalVisibility();

            if (10 <= score && score < 20) {
                this.bronzeMedal.visible = true;
            } else if (20 <= score && score < 30) {
                this.silverMedal.visible = true;
            } else if (30 <= score && score < 40) {
                this.goldMedal.visible = true;
            } else if (40 <= score) {
                this.platinumMedal.visible = true;
            }

            this.bestScore.text = this.highestScore.toString();
        }

        private resetMedalVisibility(): void {
            this.bronzeMedal.visible = false;
            this.silverMedal.visible = false;
            this.goldMedal.visible = false;
            this.platinumMedal.visible = false;
        }
    }
}
