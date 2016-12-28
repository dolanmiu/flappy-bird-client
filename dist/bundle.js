var Flappy;
(function (Flappy) {
    const jumpSpeed = 60;
    const jumpTiltAngle = -60;
    class Bird extends Phaser.Sprite {
        constructor(game, x, y, key) {
            super(game, x, y, key);
            this.currentSpeed = Flappy.Constants.gameSpeed;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.game.add.existing(this);
            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.hitSound = this.game.add.audio('hit');
            this.dieSound = this.game.add.audio('die');
            let wingSound = this.game.add.audio('wing');
            this.spaceKey.onDown.add(() => {
                this.body.velocity.y = -jumpSpeed;
                wingSound.play();
            });
        }
        update() {
            // console.log(this.body.velocity.y);
            this.angle = this.calculateAngle(this.body.velocity.y);
            this.x += this.game.time.elapsed * this.currentSpeed;
        }
        stop() {
            this.currentSpeed = 0;
        }
        get isStopped() {
            return this.currentSpeed === 0;
        }
        deathSequence() {
            if (this.isStopped) {
                return;
            }
            this.stop();
            this.hitSound.play();
            setTimeout(() => {
                this.dieSound.play();
            }, 300);
        }
        calculateAngle(speed) {
            if (speed >= 90) {
                return 90;
            }
            return speed;
        }
    }
    Flappy.Bird = Bird;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Constants {
        static get gameWidth() {
            let ratio = this.gameHeight / window.innerHeight;
            return window.innerWidth * ratio;
        }
    }
    Constants.gameSpeed = 0.1;
    Constants.gapSize = 200;
    Constants.serverUrl = 'http://localhost:9001';
    Constants.gameHeight = 665;
    Constants.worldOffset = -1000;
    Flappy.Constants = Constants;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Floor extends Phaser.TileSprite {
        constructor(game, height, key) {
            super(game, Flappy.Constants.worldOffset, Flappy.Constants.gameHeight, Flappy.Constants.gameWidth, height, key);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.body.allowGravity = false;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }
        update() {
            this.width = this.game.world.width;
            this.body.width = this.game.world.width;
        }
    }
    Flappy.Floor = Floor;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Game extends Phaser.Game {
        constructor(elementName) {
            let element = document.getElementById(elementName);
            super(Flappy.Constants.gameWidth, Flappy.Constants.gameHeight, Phaser.AUTO, element.id, Flappy.State.Play, false, false);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(Flappy.Constants.gameWidth, Flappy.Constants.gameHeight);
            });
        }
    }
    Flappy.Game = Game;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class DownPipe extends Phaser.Group {
        constructor(game, x, y, pipeBodyKey, pipeCapKey) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            this.pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            this.pipeBody.anchor.y = 1;
            this.add(this.pipeBody);
            this.add(this.pipeCap);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.pipeBody.body.allowGravity = false;
            this.pipeCap.body.allowGravity = false;
        }
        get sprites() {
            return [this.pipeBody, this.pipeCap];
        }
    }
    Flappy.DownPipe = DownPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class PipePool extends Phaser.Group {
        constructor(game, floorHeight) {
            super(game);
            this.floorHeight = floorHeight;
            this.game = game;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
        }
        addPipes(pipes) {
            for (let pipe of pipes) {
                let availableHeight = Flappy.Constants.gameHeight - this.floorHeight - Flappy.Constants.gapSize;
                let adjustedLocation = this.map(pipe.location, 0, 1, 0.1, 0.9);
                this.create(pipe.index * Flappy.Constants.gapSize, pipe.location * availableHeight);
            }
        }
        create(x, y) {
            // Find the first child that has a false exist property:
            let obj = this.getFirstExists(false);
            if (!obj) {
                // We failed to find an availble child, so we create one now and add it to the pool.
                obj = new Flappy.PipeSet(this.game, x, y, Flappy.Constants.gapSize, 'pipeBody', 'pipeDownCap', 'pipeUpCap');
                this.add(obj, true);
            }
            //  We call the childs spawn method and return the object to whatever triggered this.
            //  The spawn method will handle stuff like position, resetting the health property
            //  and setting exists to true. The spawned object will live even if the returned
            //  reference is ignored
        }
        get sprites() {
            let combinedArray = new Array();
            for (let child of this.children) {
                let pipe = child;
                combinedArray = combinedArray.concat(pipe.sprites);
            }
            return combinedArray;
        }
        map(input, inputMin, inputMax, outputMin, outputMax) {
            return (input - inputMin) * (outputMax - outputMin) / (inputMax - inputMin) + outputMin;
        }
    }
    Flappy.PipePool = PipePool;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class PipeSet extends Phaser.Group {
        constructor(game, x, y, gapSize, pipeBodyKey, pipeDownCapKey, pipeUpCapKey) {
            super(game);
            this.upPipe = new Flappy.UpPipe(game, x, y + gapSize, pipeBodyKey, pipeUpCapKey);
            this.downPipe = new Flappy.DownPipe(game, x, y, pipeBodyKey, pipeDownCapKey);
            this.add(this.upPipe);
            this.add(this.downPipe);
        }
        get sprites() {
            return this.downPipe.sprites.concat(this.upPipe.sprites);
        }
    }
    Flappy.PipeSet = PipeSet;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class UpPipe extends Phaser.Group {
        constructor(game, x, y, pipeBodyKey, pipeCapKey) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            this.pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            this.pipeCap.anchor.y = 1;
            this.add(this.pipeBody);
            this.add(this.pipeCap);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.pipeBody.body.allowGravity = false;
            this.pipeCap.body.allowGravity = false;
        }
        get sprites() {
            return [this.pipeBody, this.pipeCap];
        }
    }
    Flappy.UpPipe = UpPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class ScoreBoard extends Phaser.Group {
        constructor(game, gameOverKey, scoreBoardKey) {
            super(game);
            this.gameOver = new Phaser.Sprite(game, Flappy.Constants.gameWidth / 2, Flappy.Constants.gameHeight / 2 - 100, gameOverKey);
            this.gameOver.anchor.x = 0.5;
            this.gameOver.anchor.y = 0.5;
            this.gameOver.alpha = 0;
            this.add(this.gameOver);
            this.scoreBoard = new Phaser.Sprite(game, Flappy.Constants.gameWidth / 2, Flappy.Constants.gameHeight / 2, scoreBoardKey);
            this.scoreBoard.anchor.x = 0.5;
            this.scoreBoard.anchor.y = 0.5;
            this.scoreBoard.alpha = 0;
            this.add(this.scoreBoard);
            this.fixedToCamera = true;
        }
        show() {
            this.gameOver.y = Flappy.Constants.gameHeight / 2 - 80;
            this.game.add.tween(this.gameOver).to({ alpha: 1, y: Flappy.Constants.gameHeight / 2 - 100 }, 700, Phaser.Easing.Exponential.Out, true, 200);
            this.scoreBoard.y = Flappy.Constants.gameHeight / 2 + 20;
            this.game.add.tween(this.scoreBoard).to({ alpha: 1, y: Flappy.Constants.gameHeight / 2 }, 700, Phaser.Easing.Exponential.Out, true, 500);
        }
        update() {
            this.gameOver.x = Flappy.Constants.gameWidth / 2;
            this.gameOver.y = Flappy.Constants.gameHeight / 2 - 100;
            this.scoreBoard.x = Flappy.Constants.gameWidth / 2;
            this.scoreBoard.y = Flappy.Constants.gameHeight / 2;
        }
    }
    Flappy.ScoreBoard = ScoreBoard;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Sky extends Phaser.TileSprite {
        constructor(game, height, key, offset) {
            super(game, 0, Flappy.Constants.gameHeight - offset, Flappy.Constants.gameWidth, height, key);
            this.fixedToCamera = true;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }
        update() {
            this.width = Flappy.Constants.gameWidth;
            // this.tilePosition.x -= 0.1;
        }
    }
    Flappy.Sky = Sky;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    var State;
    (function (State) {
        const floorHeight = 112;
        class Play extends Phaser.State {
            preload() {
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
            }
            create() {
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.stage.backgroundColor = '#4ec0ca';
                this.game.stage.disableVisibilityChange = true;
                this.game.world.setBounds(Flappy.Constants.worldOffset, 0, 9000, Flappy.Constants.gameHeight);
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.game.physics.arcade.gravity.y = 100;
                this.sky = new Flappy.Sky(this.game, 109, 'sky', floorHeight);
                this.pipePool = new Flappy.PipePool(this.game, floorHeight);
                this.floor = new Flappy.Floor(this.game, floorHeight, 'floor');
                this.bird = new Flappy.Bird(this.game, 100, 100, 'bird');
                this.game.camera.follow(this.bird, Phaser.Camera.FOLLOW_PLATFORMER);
                $.get(`${Flappy.Constants.serverUrl}/stage?start=2&end=8`, (data) => {
                    this.pipePool.addPipes(data);
                });
                this.scoreBoard = new Flappy.ScoreBoard(this.game, 'gameOver', 'scoreBoard');
                let socket = io.connect(Flappy.Constants.serverUrl);
                /*socket.on('news', (data) =>  {
                    console.log(data);
                    socket.emit('my other event', { my: 'data' });
                });*/
            }
            update() {
                if (this.gameOver) {
                    return;
                }
                this.game.physics.arcade.collide(this.bird, this.floor, () => {
                    // this.hitSound.play();
                });
                this.game.physics.arcade.overlap(this.bird, this.pipePool.sprites, () => {
                    this.gameOver = true;
                    this.bird.deathSequence();
                    this.scoreBoard.show();
                });
            }
        }
        State.Play = Play;
    })(State = Flappy.State || (Flappy.State = {}));
})(Flappy || (Flappy = {}));
