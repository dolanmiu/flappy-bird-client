namespace Flappy {
    interface IPipeParams {
        pipeBodyKey: string;
        pipeCapKey: string;
    }

    export class UpPipe extends Phaser.Group {
        private pipeBody: Phaser.TileSprite;
        private pipeCap: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, params: IPipeParams) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, params.pipeBodyKey);
            this.pipeCap = new Phaser.Sprite(game, x, y, params.pipeCapKey);
            this.pipeCap.anchor.y = 1;

            this.add(this.pipeBody);
            this.add(this.pipeCap);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.pipeBody.body.allowGravity = false;
            this.pipeCap.body.allowGravity = false;
        }

        public get sprites(): Array<Phaser.Sprite | Phaser.TileSprite> {
            return [this.pipeBody, this.pipeCap];
        }
    }
}
