namespace Flappy {
    export class Floor extends Phaser.TileSprite {

        constructor(game: Phaser.Game, height: number, key: string) {
            super(game, 0, window.innerHeight, window.innerWidth, height, key);

            this.game.add.existing(this);
        }

        public update(): void {
            this.y = window.innerHeight / 3 * 2;
            this.width = window.innerWidth;
            this.tilePosition.x -= this.game.time.elapsed * Constants.gameSpeed;
        }
    }
}
