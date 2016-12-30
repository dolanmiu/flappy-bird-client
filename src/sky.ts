namespace Flappy {
    export class Sky extends Phaser.TileSprite {

        constructor(game: Phaser.Game, height: number, key: string, offset: number) {
            super(game, 0, Global.Constants.gameHeight - offset, Global.Constants.gameWidth, height, key);

            this.fixedToCamera = true;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }

        public update(): void {
            this.width = Global.Constants.gameWidth;
            // this.tilePosition.x -= 0.1;
        }
    }
}
