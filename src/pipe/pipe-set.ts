namespace Flappy {
    export class PipeSet extends Phaser.Group {

        constructor(game: Phaser.Game, x: number, y: number, gapSize: number, pipeBodyKey: string, pipeDownCapKey: string, pipeUpCapKey: string) {
            super(game);
            let upPipe = new UpPipe(game, x, y + gapSize, pipeBodyKey, pipeUpCapKey);
            let downPipe = new DownPipe(game, x, y, pipeBodyKey, pipeDownCapKey);

            this.add(upPipe);
            this.add(downPipe);
        }

        public update(): void {
            this.x -= 1;
        }
    }
}
