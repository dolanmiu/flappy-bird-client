namespace Flappy {
    export class UpPipe extends Phaser.Group {
        private pipeBody: Phaser.TileSprite;
        private pipeCap: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, pipeBodyKey: string, pipeCapKey: string) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            this.pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            this.pipeCap.anchor.y = 1;

            this.add(this.pipeBody);
            this.add(this.pipeCap);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.pipeBody.body.allowGravity = false;
            this.pipeCap.body.allowGravity = false;

            this.game.add.existing(this);
        }

        public get sprites(): Array<Phaser.Sprite | Phaser.TileSprite> {
            return [this.pipeBody, this.pipeCap];
        }
    }
}
