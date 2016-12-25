namespace Flappy {
    export class Floor extends Phaser.TileSprite {

        constructor(game: Phaser.Game, height: number, key: string) {
            super(game, 0, Flappy.Constants.gameHeight, window.innerWidth, height, key);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.body.allowGravity = false;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }

        public update(): void {
            // this.y = window.innerHeight / 3 * 2;
            this.width = this.game.world.width;
            this.body.width = this.game.world.width;
            // this.tilePosition.x -= this.game.time.elapsed * Constants.gameSpeed;
        }
    }
}
