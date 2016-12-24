var Flappy;
(function (Flappy) {
    const jumpSpeed = 60;
    const jumpTiltAngle = -60;
    class Bird extends Phaser.Sprite {
        constructor(game, x, y, key) {
            super(game, x, y, key);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.game.add.existing(this);
            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            let wingSound = this.game.add.audio('wing');
            this.spaceKey.onDown.add(() => {
                this.body.velocity.y = -jumpSpeed;
                wingSound.play();
            });
        }
        update() {
            // console.log(this.body.velocity.y);
            this.angle = this.calculateAngle(this.body.velocity.y);
            this.x += this.game.time.elapsed * Flappy.Constants.gameSpeed;
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
    }
    Constants.gameSpeed = 0.1;
    Constants.gapSize = 200;
    Flappy.Constants = Constants;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Floor extends Phaser.TileSprite {
        constructor(game, height, key) {
            super(game, 0, window.innerHeight, window.innerWidth, height, key);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.body.allowGravity = false;
            this.game.add.existing(this);
        }
        update() {
            this.y = window.innerHeight / 3 * 2;
            this.width = this.game.world.width;
            this.body.width = this.game.world.width;
            // this.tilePosition.x -= this.game.time.elapsed * Constants.gameSpeed;
        }
    }
    Flappy.Floor = Floor;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Game extends Phaser.Game {
        constructor(elementName) {
            let element = document.getElementById(elementName);
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, element.id, Flappy.State.Play, true, false);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(window.innerWidth, window.innerHeight);
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
            this.pipeBody.anchor.y = 1;
            let pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            this.add(this.pipeBody);
            this.add(pipeCap);
            this.game.physics.enable(this.pipeBody, Phaser.Physics.ARCADE);
            this.pipeBody.body.allowGravity = false;
            this.game.physics.enable(pipeCap, Phaser.Physics.ARCADE);
            pipeCap.body.allowGravity = false;
            this.game.add.existing(this);
        }
        update() {
        }
    }
    Flappy.DownPipe = DownPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class PipePool extends Phaser.Group {
        constructor(game) {
            super(game);
            this.game = game;
            for (let i = 0; i < 1; i++) {
                this.add(new Flappy.PipeSet(game, 1000, 0.4, Flappy.Constants.gapSize, 'pipeBody', 'pipeDownCap', 'pipeUpCap')); // Add new sprite
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
            return obj.spawn(x, y);
        }
    }
    Flappy.PipePool = PipePool;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class PipeSet extends Phaser.Group {
        constructor(game, x, yRatio, gapSize, pipeBodyKey, pipeDownCapKey, pipeUpCapKey) {
            super(game);
            let y = (window.innerHeight / 3) + (window.innerHeight / 3) * yRatio;
            this.upPipe = new Flappy.UpPipe(game, x, y + gapSize, pipeBodyKey, pipeUpCapKey);
            this.downPipe = new Flappy.DownPipe(game, x, y, pipeBodyKey, pipeDownCapKey);
            this.add(this.upPipe);
            this.add(this.downPipe);
        }
        update() {
            this.x -= this.game.time.elapsed * Flappy.Constants.gameSpeed;
            this.upPipe.update();
        }
        spawn() {
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
            let pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            pipeCap.anchor.y = 1;
            this.add(this.pipeBody);
            this.add(pipeCap);
            this.game.add.existing(this);
        }
        update() {
            this.pipeBody.height = (window.innerHeight / 3 * 2) - this.pipeBody.y;
        }
    }
    Flappy.UpPipe = UpPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Sky extends Phaser.TileSprite {
        constructor(game, height, key) {
            super(game, 0, window.innerHeight / 3 * 2, window.innerWidth, height, key);
            this.fixedToCamera = true;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }
        update() {
            this.y = window.innerHeight / 3 * 2;
            this.width = window.innerWidth;
            //this.tilePosition.x -= 0.1;
        }
    }
    Flappy.Sky = Sky;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    var State;
    (function (State) {
        class Play extends Phaser.State {
            preload() {
                this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
                this.game.load.image('sky', 'assets/sky.png');
                this.game.load.image('floor', 'assets/land.png');
                this.game.load.image('pipeBody', 'assets/pipe.png');
                this.game.load.image('pipeDownCap', 'assets/pipe-down.png');
                this.game.load.image('pipeUpCap', 'assets/pipe-up.png');
                this.game.load.audio('wing', 'assets/sounds/sfx_wing.ogg');
                this.game.load.audio('hit', 'assets/sounds/sfx_hit.ogg');
                this.game.stage.disableVisibilityChange = true;
            }
            create() {
                this.hitSound = this.game.add.audio('hit');
                this.game.world.setBounds(0, 0, 3000, 1920);
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.game.physics.arcade.gravity.y = 100;
                this.sky = new Flappy.Sky(this.game, 109, 'sky');
                this.pipePool = new Flappy.PipePool(this.game);
                this.pipePool.create(100, 100);
                // this.pipeTest = new PipeSet(this.game, 700, 700, Constants.gapSize, 'pipeBody', 'pipeDownCap', 'pipeUpCap');
                this.floor = new Flappy.Floor(this.game, 112, 'floor');
                this.bird = new Flappy.Bird(this.game, 100, 100, 'bird');
                this.game.camera.focusOnXY(this.bird.x, 100);
                this.game.camera.follow(this.bird);
            }
            update() {
                this.game.physics.arcade.collide(this.bird, this.floor, () => {
                    this.hitSound.play();
                });
                /*this.game.physics.arcade.collide(this.bird, this.floor, () => {
                    this.hitSound.play();
                });*/
            }
        }
        State.Play = Play;
    })(State = Flappy.State || (Flappy.State = {}));
})(Flappy || (Flappy = {}));
