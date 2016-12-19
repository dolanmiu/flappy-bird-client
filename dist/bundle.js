var Flappy;
(function (Flappy) {
    const jumpSpeed = 60;
    const jumpTiltAngle = -60;
    class Bird extends Phaser.Sprite {
        constructor(game, x, y, key) {
            super(game, x, y, key);
            this.game.add.existing(this);
            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.spaceKey.onDown.add(() => {
                this.body.velocity.y = -jumpSpeed;
            });
        }
        update() {
            console.log(this.body.velocity.y);
            this.angle = this.calculateAngle(this.body.velocity.y);
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
    class Floor extends Phaser.TileSprite {
        constructor(game, x, y, width, height, key) {
            super(game, x, y, width, height, key);
            this.anchor.y = 1;
            this.game.add.existing(this);
        }
        update() {
            this.tilePosition.x -= 0.2;
        }
    }
    Flappy.Floor = Floor;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Game extends Phaser.Game {
        constructor(elementName) {
            let element = document.getElementById(elementName);
            super(window.innerWidth, 800, Phaser.AUTO, element.id, Flappy.State.Play, true, true);
        }
    }
    Flappy.Game = Game;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class DownPipe extends Phaser.Group {
        constructor(game, x, y, pipeBodyKey, pipeCapKey) {
            super(game);
            let pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            pipeBody.anchor.y = 1;
            let pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            this.add(pipeBody);
            this.add(pipeCap);
            this.game.add.existing(this);
        }
    }
    Flappy.DownPipe = DownPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class PipeSet extends Phaser.Group {
        constructor(game, x, y, gapSize, pipeBodyKey, pipeDownCapKey, pipeUpCapKey) {
            super(game);
            let upPipe = new Flappy.UpPipe(game, x, y + gapSize, pipeBodyKey, pipeUpCapKey);
            let downPipe = new Flappy.DownPipe(game, x, y, pipeBodyKey, pipeDownCapKey);
            this.add(upPipe);
            this.add(downPipe);
            //this.game.add.existing(this);
        }
        update() {
            this.x -= 1;
        }
    }
    Flappy.PipeSet = PipeSet;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class UpPipe extends Phaser.Group {
        constructor(game, x, y, pipeBodyKey, pipeCapKey) {
            super(game);
            let pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, pipeBodyKey);
            let pipeCap = new Phaser.Sprite(game, x, y, pipeCapKey);
            pipeCap.anchor.y = 1;
            this.add(pipeBody);
            this.add(pipeCap);
            this.game.add.existing(this);
        }
    }
    Flappy.UpPipe = UpPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    class Sky extends Phaser.TileSprite {
        constructor(game, x, y, width, height, key) {
            super(game, x, y, width, height, key);
            this.anchor.y = 1;
            this.game.add.existing(this);
        }
        update() {
            this.tilePosition.x -= 0.1;
        }
    }
    Flappy.Sky = Sky;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    var State;
    (function (State) {
        const pipeGapSize = 100;
        class Play extends Phaser.State {
            preload() {
                this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
                this.game.load.image('sky', 'assets/sky.png');
                this.game.load.image('floor', 'assets/land.png');
                this.game.load.image('pipeBody', 'assets/pipe.png');
                this.game.load.image('pipeDownCap', 'assets/pipe-down.png');
                this.game.load.image('pipeUpCap', 'assets/pipe-up.png');
            }
            create() {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.game.physics.arcade.gravity.y = 100;
                this.sky = new Flappy.Sky(this.game, 0, window.innerHeight - 112, window.innerWidth, 109, 'sky');
                this.floor = new Flappy.Floor(this.game, 0, window.innerHeight, window.innerWidth, 112, 'floor');
                this.bird = new Flappy.Bird(this.game, 100, 100, 'bird');
                this.pipeTest = new Flappy.PipeSet(this.game, 700, 700, pipeGapSize, 'pipeBody', 'pipeDownCap', 'pipeUpCap');
                this.game.physics.enable([this.bird], Phaser.Physics.ARCADE);
                this.game.camera.follow(this.bird);
            }
            update() {
                this.sky.update();
                this.pipeTest.update();
            }
        }
        State.Play = Play;
    })(State = Flappy.State || (Flappy.State = {}));
})(Flappy || (Flappy = {}));
