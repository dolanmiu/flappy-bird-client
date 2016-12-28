namespace Flappy.State {

    const floorHeight: number = 112;

    export class Play extends Phaser.State {

        private bird: Bird;
        private sky: Sky;
        private floor: Floor;
        private pipePool: PipePool;
        private scoreBoard: ScoreBoard;

        private gameOver: boolean;

        private pointSound: Phaser.Sound;

        public preload(): void {
            this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('floor', 'assets/land.png');
            this.game.load.image('pipeBody', 'assets/pipe.png');
            this.game.load.image('pipeDownCap', 'assets/pipe-down.png');
            this.game.load.image('pipeUpCap', 'assets/pipe-up.png');

            this.game.load.image('gameOver', 'assets/game-over.png');
            this.game.load.image('scoreBoard', 'assets/score-board.png');

            this.game.load.audio('wing', 'assets/sounds/sfx_wing.ogg');
            this.game.load.audio('hit', 'assets/sounds/sfx_hit.ogg');
            this.game.load.audio('die', 'assets/sounds/sfx_die.ogg');
            this.game.load.audio('woosh', 'assets/sounds/sfx_swooshing.ogg');
            this.game.load.audio('point', 'assets/sounds/sfx_point.ogg');
        }

        public create(): void {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.stage.backgroundColor = '#4ec0ca';
            this.game.stage.disableVisibilityChange = true;

            this.game.world.setBounds(Flappy.Constants.worldOffset, 0, 9000, Flappy.Constants.gameHeight);

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 100;

            this.sky = new Sky(this.game, 109, 'sky', floorHeight);

            this.pipePool = new PipePool(this.game, floorHeight);
            this.floor = new Floor(this.game, floorHeight, 'floor');
            this.bird = new Bird(this.game, 100, 100, {
                dieSoundKey: 'die',
                hitSoundKey: 'hit',
                key: 'bird',
                windSoundKey: 'wing',
            });

            this.game.camera.follow(this.bird, Phaser.Camera.FOLLOW_PLATFORMER);

            $.get(`${Flappy.Constants.serverUrl}/stage?start=2&end=8`, (data) => {
                this.pipePool.addPipes(data);
            });

            this.scoreBoard = new ScoreBoard(this.game, {
                gameOverKey: 'gameOver',
                scoreBoardKey: 'scoreBoard',
                wooshSoundKey: 'woosh',
            });

            this.pointSound = this.game.add.audio('point');

            let socket = io.connect(Constants.serverUrl);
            /*socket.on('news', (data) =>  {
                console.log(data);
                socket.emit('my other event', { my: 'data' });
            });*/
        }

        public update(): void {
            if (this.gameOver) {
                return;
            }

            this.game.physics.arcade.collide(this.bird, this.floor, () => {
                this.gameOver = true;
                this.bird.deathSequence();
                this.scoreBoard.show();
            });

            this.game.physics.arcade.overlap(this.bird, this.pipePool.sprites, () => {
                this.gameOver = true;
                this.bird.deathSequence();
                this.scoreBoard.show();
            });

            this.game.physics.arcade.overlap(this.bird, this.pipePool.holes, () => {
                this.pointSound.play();
            });
        }
    }
}
