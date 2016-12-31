namespace Flappy {
    export class MultiplayerBird extends BaseBird {

        private nameTag: Phaser.Text;

        constructor(game: Phaser.Game, x: number, y: number, private displayName: string, params: IBirdParams) {
            super(game, x, y, params);

            this.nameTag = new Phaser.Text(game, 0, -35, displayName, { font: '12px flappy', fill: 'white' });
            this.nameTag.stroke = 'black';
            this.nameTag.strokeThickness = 2;
            this.nameTag.anchor.x = 0.5;
            this.addChild(this.nameTag);

            this.game.add.existing(this);
        }
    }
}
