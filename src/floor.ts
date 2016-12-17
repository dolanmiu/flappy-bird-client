namespace Flappy {
    export class Floor extends Phaser.TileSprite {

        constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, key: string) {
            super(game, x, y, width, height, key);

            this.anchor.y = 1;
            this.game.add.existing(this);
        }

        public update(): void {
            this.tilePosition.x -= 0.2;
        }
    }
}
