namespace Flappy {
    export class DownPipe extends Phaser.Group {

        constructor(game: Phaser.Game, x: number, y: number, pipeBodyKey: string, pipeCapKey: string) {
            super(game);
            let pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            pipeBody.anchor.y = 1;
            let pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);

            this.add(pipeBody);
            this.add(pipeCap);
            this.game.add.existing(this);
        }
    }
}
