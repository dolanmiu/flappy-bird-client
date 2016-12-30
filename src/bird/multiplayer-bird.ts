namespace Flappy {
    export class MultiplayerBird extends BaseBird {

        private nameTag: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, private displayName: string, params: IBirdParams) {
            super(game, x, y, params);

            this.nameTag = new Phaser.Text(game, 0, 0, displayName);
            this.addChild(this.nameTag);

            this.game.add.existing(this);
        }
    }
}
