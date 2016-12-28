namespace Flappy {
    interface IPipeSetParams {
        pipeBodyKey: string;
        pipeDownCapKey: string;
        pipeUpCapKey: string;
    }

    export class PipeSet extends Phaser.Group {
        private downPipe: DownPipe;
        private upPipe: UpPipe;

        constructor(game: Phaser.Game, x: number, y: number, gapSize: number, params: IPipeSetParams) {
            super(game);

            this.upPipe = new UpPipe(game, x, y + gapSize, {
                pipeBodyKey: params.pipeBodyKey,
                pipeCapKey: params.pipeUpCapKey,
            });
            this.add(this.upPipe);

            this.downPipe = new DownPipe(game, x, y, {
                pipeBodyKey: params.pipeBodyKey,
                pipeCapKey: params.pipeDownCapKey,
            });
            this.add(this.downPipe);
        }

        public get sprites(): Array<Phaser.Sprite | Phaser.TileSprite> {
            return this.downPipe.sprites.concat(this.upPipe.sprites);
        }
    }
}
