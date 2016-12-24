namespace Flappy {
    export class Sky extends Phaser.TileSprite {

        constructor(game: Phaser.Game, height: number, key: string) {
            super(game, 0, window.innerHeight / 3 * 2, window.innerWidth, height, key);
            
            this.fixedToCamera = true;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }

        public update(): void {
            this.y = window.innerHeight / 3 * 2;
            this.width = window.innerWidth;
            //this.tilePosition.x -= 0.1;
        }
    }
}
