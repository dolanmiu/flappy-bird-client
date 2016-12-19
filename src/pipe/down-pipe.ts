namespace Flappy {
    export class DownPipe extends Phaser.Group {
        private pipeBody: Phaser.TileSprite;

        constructor(game: Phaser.Game, x: number, y: number, pipeBodyKey: string, pipeCapKey: string) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            this.pipeBody.anchor.y = 1;
            let pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);

            this.add(this.pipeBody);
            this.add(pipeCap);
            this.game.add.existing(this);
        }

        public update(): void {
            this.pipeBody.height = window.innerHeight;
        }
    }
}
