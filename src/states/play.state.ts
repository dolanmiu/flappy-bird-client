namespace Flappy.State {
    export class Play extends Phaser.State {

        private bird: Bird;
        private sky: Sky;
        private floor: Floor;

        public preload(): void {
            this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('floor', 'assets/land.png');
            this.game.load.image('pipeBody', 'assets/pipe.png');
            this.game.load.image('pipeCap', 'assets/pipe-down.png');
        }

        public create(): void {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 100;

            this.sky = new Sky(this.game, 0, window.innerHeight - 112, window.innerWidth, 109, 'sky');
            this.floor = new Floor(this.game, 0, window.innerHeight, window.innerWidth, 112, 'floor');
            this.bird = new Bird(this.game, 100, 100, 'bird');
            let d = new DownPipe(this.game, 100, 700, 'pipeBody', 'pipeCap');
            this.game.physics.enable([this.bird], Phaser.Physics.ARCADE);
            this.game.camera.follow(this.bird);

        }

        public update(): void {
            this.sky.update();
        }
    }
}
