var Flappy;
(function (Flappy) {
    const jumpTiltAngle = -60;
    class BaseBird extends Phaser.Sprite {
        constructor(game, x, y, params) {
            super(game, x, y, params.key);
            this.currentSpeed = Flappy.Global.Constants.gameSpeed;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.game.add.existing(this);
            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);
            this.hitSound = this.game.add.audio(params.hitSoundKey);
            this.dieSound = this.game.add.audio(params.dieSoundKey);
            this.wingSound = this.game.add.audio(params.windSoundKey);
        }
        stop() {
            this.currentSpeed = 0;
        }
        restart() {
            this.currentSpeed = Flappy.Global.Constants.gameSpeed;
        }
        jump() {
            this.body.velocity.y = -Flappy.Global.Constants.jumpSpeed;
            this.wingSound.play();
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
        update() {
            if (this.body.velocity.y >= 700) {
                this.body.velocity.y = 700;
            }
            // this.angle = this.calculateAngle(this.body.velocity.y);
            this.x += this.game.time.elapsed * this.currentSpeed;
        }
        calculateAngle(speed) {
            if (speed >= 90) {
                return 90;
            }
            return speed;
        }
    }
    Flappy.BaseBird = BaseBird;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Bird extends Flappy.BaseBird {
        constructor(game, x, y, params) {
            super(game, x, y, params);
            game.input.mouse.onMouseDown = () => {
                Flappy.Global.socket.emit('jump');
                this.jump();
            };
        }
        update() {
            super.update();
            Flappy.Global.socket.emit('position', {
                x: this.x,
                y: this.y,
            });
        }
    }
    Flappy.Bird = Bird;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class MultiplayerBird extends Flappy.BaseBird {
    }
    Flappy.MultiplayerBird = MultiplayerBird;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Floor extends Phaser.TileSprite {
        constructor(game, height, key) {
            super(game, Flappy.Global.Constants.worldOffset, Flappy.Global.Constants.gameHeight, Flappy.Global.Constants.gameWidth, height, key);
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
            super(Flappy.Global.Constants.gameWidth, Flappy.Global.Constants.gameHeight, Phaser.AUTO, element.id, Flappy.State.Blank, false, false);
            this.state.add('play', Flappy.State.Play);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(Flappy.Global.Constants.gameWidth, Flappy.Global.Constants.gameHeight);
            });
        }
        connect(name, callback) {
            Flappy.Global.socket = io.connect(Flappy.Global.Constants.serverUrl, { query: `name=${name}` });
            Flappy.Global.socket.on('connect', () => {
                this.state.start('play');
                callback();
            });
        }
    }
    Flappy.Game = Game;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    var Global;
    (function (Global) {
        class Constants {
            static get gameWidth() {
                let ratio = this.gameHeight / window.innerHeight;
                return window.innerWidth * ratio;
            }
        }
        Constants.gameSpeed = 0.1;
        Constants.jumpSpeed = 500;
        Constants.gapSize = 200;
        Constants.gravity = 2000;
        Constants.serverUrl = 'http://localhost:9001';
        Constants.gameHeight = 665;
        Constants.worldOffset = -1000;
        Global.Constants = Constants;
    })(Global = Flappy.Global || (Flappy.Global = {}));
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    var Global;
    (function (Global) {
    })(Global = Flappy.Global || (Flappy.Global = {}));
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class DownPipe extends Phaser.Group {
        constructor(game, x, y, params) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, params.pipeBodyKey);
            this.pipeCap = new Phaser.Sprite(game, x, y, params.pipeCapKey);
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
                let availableHeight = Flappy.Global.Constants.gameHeight - this.floorHeight - Flappy.Global.Constants.gapSize;
                let adjustedLocation = this.map(pipe.location, 0, 1, 0.1, 0.9);
                this.create(pipe.index * Flappy.Global.Constants.gapSize, adjustedLocation * availableHeight);
            }
        }
        create(x, y) {
            // Find the first child that has a false exist property:
            let obj = this.getFirstExists(false);
            if (!obj) {
                // We failed to find an availble child, so we create one now and add it to the pool.
                obj = new Flappy.PipeSet(this.game, x, y, Flappy.Global.Constants.gapSize, {
                    pipeBodyKey: 'pipeBody',
                    pipeDownCapKey: 'pipeDownCap',
                    pipeUpCapKey: 'pipeUpCap',
                });
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
                let pipeSet = child;
                combinedArray = combinedArray.concat(pipeSet.sprites);
            }
            return combinedArray;
        }
        get holes() {
            let combinedArray = new Array();
            for (let child of this.children) {
                let pipeSet = child;
                combinedArray = combinedArray.concat(pipeSet.hole);
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
        constructor(game, x, y, gapSize, params) {
            super(game);
            this.upPipe = new Flappy.UpPipe(game, x, y + gapSize, {
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
            this.downPipe = new Flappy.DownPipe(game, x, y, {
                pipeBodyKey: params.pipeBodyKey,
                pipeCapKey: params.pipeDownCapKey,
            });
            this.add(this.downPipe);
        }
        get sprites() {
            return this.downPipe.sprites.concat(this.upPipe.sprites);
        }
        get hole() {
            return this.pipeHole;
        }
    }
    Flappy.PipeSet = PipeSet;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class UpPipe extends Phaser.Group {
        constructor(game, x, y, params) {
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
        get sprites() {
            return [this.pipeBody, this.pipeCap];
        }
    }
    Flappy.UpPipe = UpPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class ReplayButton extends Phaser.Sprite {
        constructor(game, x, y, key) {
            super(game, x, y, key);
            this.anchor.x = 0.5;
            this.originalY = y;
            this.inputEnabled = false;
            this.events.onInputOver.add(() => {
                this.tween = this.game.add.tween(this).to({ y: this.originalY - 5 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
                this.tint = 0xe8e8e8;
            });
            this.events.onInputOut.add(() => {
                this.tween.pause();
                this.game.add.tween(this).to({ y: this.originalY }, 500, Phaser.Easing.Exponential.Out, true);
                this.tint = 0xffffff;
            });
        }
    }
    Flappy.ReplayButton = ReplayButton;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class ScoreBoard extends Phaser.Group {
        constructor(game, params, restartGameLambda) {
            super(game);
            this.gameOver = new Phaser.Sprite(game, Flappy.Global.Constants.gameWidth / 2, Flappy.Global.Constants.gameHeight / 2 - 100, params.gameOverKey);
            this.gameOver.anchor.set(0.5, 0.5);
            this.gameOver.alpha = 0;
            this.add(this.gameOver);
            this.scoreWindow = new Flappy.ScoreWindow(game, Flappy.Global.Constants.gameWidth / 2, Flappy.Global.Constants.gameHeight / 2, {
                bronzeMedalKey: params.bronzeMedalKey,
                goldMedalKey: params.goldMedalKey,
                platinumMedalKey: params.platinumMedalKey,
                scoreWindowKey: params.scoreBoardKey,
                silverMedalKey: params.silverMedalKey,
            });
            this.scoreWindow.alpha = 0;
            this.add(this.scoreWindow);
            this.replayButton = new Flappy.ReplayButton(game, Flappy.Global.Constants.gameWidth / 2, Flappy.Global.Constants.gameHeight / 2 + 70, params.replayButtonKey);
            this.replayButton.alpha = 0;
            this.replayButton.events.onInputDown.add(() => {
                restartGameLambda();
                this.gameOverStatus = false;
                this.gameOver.alpha = 0;
                this.scoreWindow.alpha = 0;
                this.replayButton.alpha = 0;
                this.replayButton.inputEnabled = false;
            });
            this.add(this.replayButton);
            this.wooshSound = game.add.audio(params.wooshSoundKey);
            this.fixedToCamera = true;
        }
        show(score) {
            this.gameOverStatus = true;
            this.scoreWindow.score = score;
            this.gameOver.y = Flappy.Global.Constants.gameHeight / 2 - 80;
            let gameOverTween = this.game.add.tween(this.gameOver).to({ alpha: 1, y: Flappy.Global.Constants.gameHeight / 2 - 100 }, 500, Phaser.Easing.Exponential.Out, true, 500);
            gameOverTween.onStart.add(() => {
                this.wooshSound.play();
            });
            this.scoreWindow.y = Flappy.Global.Constants.gameHeight / 2 + 20;
            let scoreBoardTween = this.game.add.tween(this.scoreWindow).to({ alpha: 1, y: Flappy.Global.Constants.gameHeight / 2 }, 500, Phaser.Easing.Exponential.Out, true, 1500);
            scoreBoardTween.onStart.add(() => {
                this.wooshSound.play();
            });
            this.replayButton.y = Flappy.Global.Constants.gameHeight / 2 + 90;
            let replayButtonTween = this.game.add.tween(this.replayButton).to({ alpha: 1, y: Flappy.Global.Constants.gameHeight / 2 + 70 }, 500, Phaser.Easing.Exponential.Out, true, 1500);
            replayButtonTween.onComplete.add(() => {
                this.replayButton.inputEnabled = true;
            });
        }
        update() {
            this.gameOver.x = Flappy.Global.Constants.gameWidth / 2;
            this.gameOver.y = Flappy.Global.Constants.gameHeight / 2 - 100;
            this.scoreWindow.x = Flappy.Global.Constants.gameWidth / 2;
            this.scoreWindow.y = Flappy.Global.Constants.gameHeight / 2;
            this.replayButton.x = Flappy.Global.Constants.gameWidth / 2;
            this.replayButton.y = Flappy.Global.Constants.gameHeight / 2 + 70;
        }
        get isGameOver() {
            return this.gameOverStatus;
        }
    }
    Flappy.ScoreBoard = ScoreBoard;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class ScoreWindow extends Phaser.Sprite {
        constructor(game, x, y, params) {
            super(game, x, y, params.scoreWindowKey);
            this.anchor.set(0.5, 0.5);
            this.highestScore = 0;
            this.currentScore = new Phaser.Text(game, this.width / 2 - 25, -this.height / 2 + 37, '0', { font: '18px flappy', fill: 'white' });
            this.currentScore.stroke = 'black';
            this.currentScore.strokeThickness = 5;
            this.currentScore.anchor.x = 1;
            this.addChild(this.currentScore);
            this.bestScore = new Phaser.Text(game, this.width / 2 - 25, -this.height / 2 + 78, '0', { font: '18px flappy', fill: 'white' });
            this.bestScore.stroke = 'black';
            this.bestScore.strokeThickness = 5;
            this.bestScore.anchor.x = 1;
            this.addChild(this.bestScore);
            this.bronzeMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.bronzeMedalKey);
            this.bronzeMedal.visible = false;
            this.addChild(this.bronzeMedal);
            this.silverMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.silverMedalKey);
            this.silverMedal.visible = false;
            this.addChild(this.silverMedal);
            this.goldMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.goldMedalKey);
            this.goldMedal.visible = false;
            this.addChild(this.goldMedal);
            this.platinumMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.platinumMedalKey);
            this.platinumMedal.visible = false;
            this.addChild(this.platinumMedal);
        }
        set score(score) {
            this.currentScore.text = score.toString();
            if (score > this.highestScore) {
                this.highestScore = score;
            }
            this.resetMedalVisibility();
            if (10 <= score && score < 20) {
                this.bronzeMedal.visible = true;
            }
            else if (20 <= score && score < 30) {
                this.silverMedal.visible = true;
            }
            else if (30 <= score && score < 40) {
                this.goldMedal.visible = true;
            }
            else if (40 <= score) {
                this.platinumMedal.visible = true;
            }
            this.bestScore.text = this.highestScore.toString();
        }
        resetMedalVisibility() {
            this.bronzeMedal.visible = false;
            this.silverMedal.visible = false;
            this.goldMedal.visible = false;
            this.platinumMedal.visible = false;
        }
    }
    Flappy.ScoreWindow = ScoreWindow;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class ScoreCounter extends Phaser.Text {
        constructor(game) {
            super(game, Flappy.Global.Constants.gameWidth / 2, 30, '0', { font: '30px flappy', fill: 'white' });
            this.stroke = 'black';
            this.strokeThickness = 8;
            this.anchor.x = 0.5;
            this.fixedToCamera = true;
            this.checkPoints = new Map();
            this.pointSound = this.game.add.audio('point');
            this.game.add.existing(this);
        }
        increment(pipe) {
            if (this.checkPoints.has(pipe)) {
                return;
            }
            this.checkPoints.set(pipe, true);
            this.pointSound.play();
        }
        update() {
            this.x = Flappy.Global.Constants.gameWidth / 2;
            this.text = this.score.toString();
        }
        get score() {
            return this.checkPoints.size;
        }
        restart() {
            this.checkPoints = new Map();
        }
    }
    Flappy.ScoreCounter = ScoreCounter;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Sky extends Phaser.TileSprite {
        constructor(game, height, key, offset) {
            super(game, 0, Flappy.Global.Constants.gameHeight - offset, Flappy.Global.Constants.gameWidth, height, key);
            this.fixedToCamera = true;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }
        update() {
            this.width = Flappy.Global.Constants.gameWidth;
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
        class Blank extends Phaser.State {
            preload() {
                this.game.load.image('sky', 'assets/sky.png');
                this.game.load.image('floor', 'assets/land.png');
            }
            create() {
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.stage.backgroundColor = '#4ec0ca';
                this.game.stage.disableVisibilityChange = true;
                this.floor = new Flappy.Floor(this.game, floorHeight, 'floor');
                this.sky = new Flappy.Sky(this.game, 109, 'sky', floorHeight);
            }
            update() {
                this.game.world.width = Flappy.Global.Constants.gameWidth;
                this.floor.x = 0;
            }
        }
        State.Blank = Blank;
    })(State = Flappy.State || (Flappy.State = {}));
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
                this.game.load.image('replay', 'assets/replay.png');
                this.game.load.image('bronzeMedal', 'assets/medal-bronze.png');
                this.game.load.image('silverMedal', 'assets/medal-silver.png');
                this.game.load.image('goldMedal', 'assets/medal-gold.png');
                this.game.load.image('platMedal', 'assets/medal-platinum.png');
                this.game.load.audio('wing', 'assets/sounds/sfx_wing.ogg');
                this.game.load.audio('hit', 'assets/sounds/sfx_hit.ogg');
                this.game.load.audio('die', 'assets/sounds/sfx_die.ogg');
                this.game.load.audio('woosh', 'assets/sounds/sfx_swooshing.ogg');
                this.game.load.audio('point', 'assets/sounds/sfx_point.ogg');
            }
            create() {
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.stage.backgroundColor = '#4ec0ca';
                this.game.stage.disableVisibilityChange = true;
                this.game.world.setBounds(Flappy.Global.Constants.worldOffset, 0, 9000, Flappy.Global.Constants.gameHeight);
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.game.physics.arcade.gravity.y = Flappy.Global.Constants.gravity;
                this.sky = new Flappy.Sky(this.game, 109, 'sky', floorHeight);
                this.pipePool = new Flappy.PipePool(this.game, floorHeight);
                this.floor = new Flappy.Floor(this.game, floorHeight, 'floor');
                this.bird = new Flappy.Bird(this.game, 100, 100, {
                    dieSoundKey: 'die',
                    hitSoundKey: 'hit',
                    key: 'bird',
                    windSoundKey: 'wing',
                });
                this.game.camera.follow(this.bird, Phaser.Camera.FOLLOW_PLATFORMER);
                $.get(`${Flappy.Global.Constants.serverUrl}/stage?start=2&end=8`, (data) => {
                    this.pipePool.addPipes(data);
                });
                this.scoreBoard = new Flappy.ScoreBoard(this.game, {
                    bronzeMedalKey: 'bronzeMedal',
                    gameOverKey: 'gameOver',
                    goldMedalKey: 'goldMedal',
                    platinumMedalKey: 'platMedal',
                    replayButtonKey: 'replay',
                    scoreBoardKey: 'scoreBoard',
                    silverMedalKey: 'silverMedal',
                    wooshSoundKey: 'woosh',
                }, () => {
                    this.bird.reset(100, 100);
                    this.bird.restart();
                    this.scoreCounter.restart();
                });
                this.scoreCounter = new Flappy.ScoreCounter(this.game);
                /*socket.on('news', (data) =>  {
                    console.log(data);
                    socket.emit('my other event', { my: 'data' });
                });*/
            }
            update() {
                if (this.scoreBoard.isGameOver) {
                    return;
                }
                this.game.physics.arcade.collide(this.bird, this.floor, () => {
                    this.bird.deathSequence();
                    this.scoreBoard.show(this.scoreCounter.score);
                });
                this.game.physics.arcade.overlap(this.bird, this.pipePool.sprites, () => {
                    this.bird.deathSequence();
                    this.scoreBoard.show(this.scoreCounter.score);
                });
                this.game.physics.arcade.overlap(this.bird, this.pipePool.holes, (bird, pipe) => {
                    this.scoreCounter.increment(pipe);
                });
            }
        }
        State.Play = Play;
    })(State = Flappy.State || (Flappy.State = {}));
})(Flappy || (Flappy = {}));
