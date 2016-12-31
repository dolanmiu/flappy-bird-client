namespace Flappy {
    export class ScoreCounter extends Phaser.Text {

        private checkPoints: Map<Phaser.Sprite, boolean>;
        private pointSound: Phaser.Sound;

        constructor(game: Phaser.Game) {
            super(game, Global.Constants.gameWidth / 2, 30, '0', { font: '40px flappy', fill: 'white' });

            this.stroke = 'black';
            this.strokeThickness = 8;
            this.anchor.x = 0.5;
            this.fixedToCamera = true;

            this.checkPoints = new Map<Phaser.Sprite, boolean>();
            this.pointSound = this.game.add.audio('point');

            this.game.add.existing(this);
        }

        public increment(pipe: Phaser.Sprite): void {
            if (this.checkPoints.has(pipe)) {
                return;
            }

            this.checkPoints.set(pipe, true);
            this.pointSound.play();
        }

        public update(): void {
            this.cameraOffset.x = Global.Constants.gameWidth / 2;
            this.text = this.score.toString();
        }

        public get score(): number {
            return this.checkPoints.size;
        }

        public restart(): void {
            this.checkPoints = new Map<Phaser.Sprite, boolean>();
        }
    }
}
