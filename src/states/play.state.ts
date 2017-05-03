namespace Flappy.State {

    const FLOOR_HEIGHT: number = 112;
    const SKY_HEIGHT: number = 109;
    const BIRD_PARAMS: IBirdParams = {
        colorKey: 'birdColor',
        dieSoundKey: 'die',
        hitSoundKey: 'hit',
        key: 'bird',
        windSoundKey: 'wing',
    };

    export class Play extends Phaser.State {

        private bird: Bird;
        private sky: Sky;
        private floor: Floor;
        private pipePool: PipePool;
        private scoreBoard: ScoreBoard;
        private scoreCounter: ScoreCounter;
        private tutorialSplash: TutorialSplash;
        private playerManager: PlayerManager;
        private levelRequester: LevelRequester;

        public preload(): void {
            this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
            this.game.load.spritesheet('birdColor', 'assets/bird-color-layer.png', 34, 24);
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('floor', 'assets/land.png');
            this.game.load.image('pipeBody', 'assets/pipe.png');
            this.game.load.image('pipeDownCap', 'assets/pipe-down.png');
            this.game.load.image('pipeUpCap', 'assets/pipe-up.png');

            this.game.load.image('splash', 'assets/splash.png');

            this.game.load.image('gameOver', 'assets/game-over.png');
            this.game.load.image('scoreBoard', 'assets/score-board.png');
            this.game.load.image('replay', 'assets/replay.png');
            this.game.load.image('bronzeMedal', 'assets/medal-bronze.png');
            this.game.load.image('silverMedal', 'assets/medal-silver.png');
            this.game.load.image('goldMedal', 'assets/medal-gold.png');
            this.game.load.image('platMedal', 'assets/medal-platinum.png');

            this.game.load.audio('wing', ['assets/sounds/sfx_wing.ogg', 'assets/sounds/sfx_wing.mp3']);
            this.game.load.audio('hit', ['assets/sounds/sfx_hit.ogg', 'assets/sounds/sfx_hit.mp3']);
            this.game.load.audio('die', ['assets/sounds/sfx_die.ogg', 'assets/sounds/sfx_die.mp3']);
            this.game.load.audio('woosh', ['assets/sounds/sfx_swooshing.ogg', 'assets/sounds/sfx_swooshing.mp3']);
            this.game.load.audio('point', ['assets/sounds/sfx_point.ogg', 'assets/sounds/sfx_point.mp3']);
        }

        public create(): void {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.stage.backgroundColor = '#4ec0ca';
            this.game.stage.disableVisibilityChange = true;

            this.game.world.setBounds(Global.Constants.worldOffset, 0, 9000, Global.Constants.gameHeight);

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = Global.Constants.gravity;

            this.game.input.onDown.add(() => {
                this.tutorialSplash.visible = false;
            });

            this.sky = new Sky(this.game, SKY_HEIGHT, 'sky', FLOOR_HEIGHT);

            this.pipePool = new PipePool(this.game, FLOOR_HEIGHT);
            this.floor = new Floor(this.game, FLOOR_HEIGHT, 'floor');
            this.bird = new Bird(this.game, FLOOR_HEIGHT, Global.connectionDetails.color, BIRD_PARAMS);

            this.game.camera.follow(this.bird, Phaser.Camera.FOLLOW_PLATFORMER);

            this.scoreCounter = new ScoreCounter(this.game);

            this.playerManager = new PlayerManager(this.game, BIRD_PARAMS);
            this.playerManager.createPlayersFromServer();
            this.playerManager.listen();

            this.scoreBoard = new ScoreBoard(this.game, {
                bronzeMedalKey: 'bronzeMedal',
                gameOverKey: 'gameOver',
                goldMedalKey: 'goldMedal',
                platinumMedalKey: 'platMedal',
                replayButtonKey: 'replay',
                scoreBoardKey: 'scoreBoard',
                silverMedalKey: 'silverMedal',
                wooshSoundKey: 'woosh',
            }, () => {
                this.bird.restart();
                this.scoreCounter.restart();
                this.tutorialSplash.visible = true;
            });

            this.levelRequester = new LevelRequester(this.scoreCounter, this.pipePool);

            this.tutorialSplash = new TutorialSplash(this.game, {
                key: 'splash',
            });

            window.addEventListener('resize', (myFunction) => {
                this.game.camera.follow(this.bird, Phaser.Camera.FOLLOW_PLATFORMER);
            });
        }

        public update(): void {
            this.levelRequester.update((data) => {
                this.pipePool.addPipes(data);
                this.game.world.bounds.width += Global.Constants.pipeSpacing * data.length;
            });

            if (this.scoreBoard.isGameOver) {
                return;
            }

            this.game.physics.arcade.collide(this.bird, this.floor, () => {
                this.bird.deathSequence();
                this.scoreBoard.show(this.scoreCounter.score);
                this.game.camera.shake(0.003, 300, true, Phaser.Camera.SHAKE_BOTH, false);
            });

            this.game.physics.arcade.overlap(this.bird, this.pipePool.sprites, () => {
                this.bird.deathSequence();
                this.scoreBoard.show(this.scoreCounter.score);
                this.game.camera.shake(0.003, 300, true, Phaser.Camera.SHAKE_BOTH, false);
            });

            this.game.physics.arcade.overlap(this.bird, this.pipePool.holes, (bird: Bird, pipe: Phaser.Sprite) => {
                this.scoreCounter.increment(pipe);
            });
        }
    }
}
