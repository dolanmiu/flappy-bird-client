namespace Flappy {
    interface IPipeSetParams {
        pipeBodyKey: string;
        pipeDownCapKey: string;
        pipeUpCapKey: string;
    }

    export class PipeSet extends Phaser.Group {
        private downPipe: DownPipe;
        private upPipe: UpPipe;
        private pipeHole: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, gapSize: number, params: IPipeSetParams) {
            super(game);

            this.upPipe = new UpPipe(game, x, y + gapSize, {
                pipeBodyKey: params.pipeBodyKey,
                pipeCapKey: params.pipeUpCapKey,
            });
            this.add(this.upPipe);

            this.pipeHole = new Phaser.Sprite(game, x + this.upPipe.width, y);
            this.pipeHole.width = 1;
            this.pipeHole.anchor.x = 1;
            this.pipeHole.height = gapSize;
            this.game.physics.enable(this.pipeHole, Phaser.Physics.ARCADE);
            this.pipeHole.body.allowGravity = false;
            this.add(this.pipeHole);

            this.downPipe = new DownPipe(game, x, y, {
                pipeBodyKey: params.pipeBodyKey,
                pipeCapKey: params.pipeDownCapKey,
            });
            this.add(this.downPipe);
        }

        public get sprites(): Array<Phaser.Sprite | Phaser.TileSprite> {
            return this.downPipe.sprites.concat(this.upPipe.sprites);
        }

        public get hole(): Phaser.Sprite {
            return this.pipeHole;
        }
    }
}
