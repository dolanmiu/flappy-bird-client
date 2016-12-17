namespace Flappy {
    export class Bird extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, key: string) {
            super(game, x, y, key);
            this.game.add.existing(this);

            this.animations.add('fly');
            this.animations.play('fly', 3, true);
        }
    }
}
