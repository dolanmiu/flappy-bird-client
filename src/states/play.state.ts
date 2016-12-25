namespace Flappy.State {

    const floorHeight: number = 112;

    export class Play extends Phaser.State {

        private bird: Bird;
        private sky: Sky;
        private floor: Floor;
        private pipePool: PipePool;

        private hitSound: Phaser.Sound;

        public preload(): void {
            this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('floor', 'assets/land.png');
            this.game.load.image('pipeBody', 'assets/pipe.png');
            this.game.load.image('pipeDownCap', 'assets/pipe-down.png');
            this.game.load.image('pipeUpCap', 'assets/pipe-up.png');
            this.game.load.audio('wing', 'assets/sounds/sfx_wing.ogg');
            this.game.load.audio('hit', 'assets/sounds/sfx_hit.ogg');
        }

        public create(): void {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.stage.backgroundColor = '#4ec0ca';
            this.game.stage.disableVisibilityChange = true;

            this.hitSound = this.game.add.audio('hit');
            this.game.world.setBounds(Flappy.Constants.worldOffset, 0, 9000, Flappy.Constants.gameHeight);

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 100;

            this.sky = new Sky(this.game, 109, 'sky', floorHeight);

            this.pipePool = new PipePool(this.game, floorHeight);
            this.floor = new Floor(this.game, floorHeight, 'floor');
            this.bird = new Bird(this.game, 100, 100, 'bird');
            this.game.camera.follow(this.bird, Phaser.Camera.FOLLOW_PLATFORMER);

            $.get(`${Flappy.Constants.serverUrl}/stage?start=2&end=8`, (data) => {
                this.pipePool.addPipes(data);
            });
        }

        public update(): void {
            this.game.physics.arcade.collide(this.bird, this.floor, () => {
                // this.hitSound.play();
            });

            this.game.physics.arcade.collide(this.bird, this.pipePool, () => {
                console.log('hit pipes');
                this.hitSound.play();
            });
        }
    }
}
