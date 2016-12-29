namespace Flappy {
    export class ReplayButton extends Phaser.Sprite {
        private originalY: number;
        private tween: Phaser.Tween;

        constructor(game: Phaser.Game, x: number, y: number, key: string) {
            super(game, x, y, key);
            this.anchor.x = 0.5;
            this.originalY = y;
            this.inputEnabled = false;

            this.events.onInputOver.add(() => {
                this.tween = this.game.add.tween(this).to({ y: this.originalY - 5 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
                this.tint = 0xe8e8e8;
            });

            this.events.onInputOut.add(() => {
                this.tween.pause();
                this.game.add.tween(this).to({ y: this.originalY }, 500, Phaser.Easing.Exponential.Out, true);
                this.tint = 0xffffff;
            });
        }
    }
}
