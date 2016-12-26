namespace Flappy {
    export class Floor extends Phaser.TileSprite {

        constructor(game: Phaser.Game, height: number, key: string) {
            super(game, Flappy.Constants.worldOffset, Flappy.Constants.gameHeight, Flappy.Constants.gameWidth, height, key);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.body.allowGravity = false;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }

        public update(): void {
            this.width = this.game.world.width;
            this.body.width = this.game.world.width;
        }
    }
}
