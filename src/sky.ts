namespace Flappy {
    export class Sky extends Phaser.TileSprite {

        constructor(game: Phaser.Game, height: number, key: string, offset: number) {
            super(game, 0, Flappy.Constants.gameHeight - offset, Flappy.Constants.gameWidth, height, key);

            this.fixedToCamera = true;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }

        public update(): void {
            console.log('updating');
            this.width = Flappy.Constants.gameWidth;
            //this.tilePosition.x -= 0.1;
        }
    }
}
