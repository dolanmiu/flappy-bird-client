namespace Flappy {
    export class DownPipe extends Phaser.Group {
        private pipeBody: Phaser.TileSprite;

        constructor(game: Phaser.Game, x: number, y: number, pipeBodyKey: string, pipeCapKey: string) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            let pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            this.pipeBody.anchor.y = 1;

            this.add(this.pipeBody);
            this.add(pipeCap);

            this.game.physics.enable(this.pipeBody, Phaser.Physics.ARCADE);
            this.game.physics.enable(pipeCap, Phaser.Physics.ARCADE);
            this.pipeBody.body.allowGravity = false;
            pipeCap.body.allowGravity = false;

            this.game.add.existing(this);
        }
    }
}
