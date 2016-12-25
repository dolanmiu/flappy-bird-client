namespace Flappy {
    export class PipeSet extends Phaser.Group {
        private downPipe: DownPipe;
        private upPipe: UpPipe;

        constructor(game: Phaser.Game, x: number, y: number, gapSize: number, pipeBodyKey: string, pipeDownCapKey: string, pipeUpCapKey: string) {
            super(game);
            this.upPipe = new UpPipe(game, x, y + gapSize, pipeBodyKey, pipeUpCapKey);
            this.downPipe = new DownPipe(game, x, y, pipeBodyKey, pipeDownCapKey);

            this.add(this.upPipe);
            this.add(this.downPipe);
        }
    }
}
