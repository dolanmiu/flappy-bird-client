namespace Flappy {
    export class Floor extends Phaser.TileSprite {

        constructor(game: Phaser.Game, width: number, height: number, key: string) {
            super(game, 0, window.innerHeight, width, height, key);

            this.game.add.existing(this);
        }

        public update(): void {
            this.y = window.innerHeight / 3 * 2;
            this.tilePosition.x -= 0.2;
        }
    }
}
