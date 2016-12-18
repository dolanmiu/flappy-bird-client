namespace Flappy {
    export class UpPipe extends Phaser.Group {

        constructor(game: Phaser.Game, x: number, y: number, pipeBodyKey: string, pipeCapKey: string) {
            super(game);
            let pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            let pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            pipeCap.anchor.y = 1;

            this.add(pipeBody);
            this.add(pipeCap);
            this.game.add.existing(this);
        }
    }
}
