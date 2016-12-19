namespace Flappy.State {
    const pipeGapSize = 100;

    export class Play extends Phaser.State {

        private bird: Bird;
        private sky: Sky;
        private floor: Floor;
        private pipeTest: PipeSet;

        public preload(): void {
            this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('floor', 'assets/land.png');
            this.game.load.image('pipeBody', 'assets/pipe.png');
            this.game.load.image('pipeDownCap', 'assets/pipe-down.png');
            this.game.load.image('pipeUpCap', 'assets/pipe-up.png');
        }

        public create(): void {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 100;

            this.sky = new Sky(this.game, window.innerWidth, 109, 'sky');
            this.floor = new Floor(this.game, window.innerWidth, 112, 'floor');
            this.bird = new Bird(this.game, 100, 100, 'bird');
            this.pipeTest = new PipeSet(this.game, 700, 700, pipeGapSize, 'pipeBody', 'pipeDownCap', 'pipeUpCap');
            this.game.physics.enable([this.bird], Phaser.Physics.ARCADE);
            this.game.camera.follow(this.bird);

        }

        public update(): void {
        }
    }
}
