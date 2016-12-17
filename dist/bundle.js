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
            //this.pivot.x = 0.5;
            //this.pivot.y = 0.5;
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
    class Game extends Phaser.Game {
        constructor(elementName) {
            let element = document.getElementById(elementName);
            super(800, 800, Phaser.AUTO, element.id, Flappy.State.Play);
        }
    }
    Flappy.Game = Game;
})(Flappy || (Flappy = {}));
var Flappy;
(function (Flappy) {
    var State;
    (function (State) {
        class Play extends Phaser.State {
            preload() {
                this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
            }
            create() {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.game.physics.arcade.gravity.y = 100;
                this.bird = new Flappy.Bird(this.game, 100, 100, 'bird');
                this.game.physics.enable([this.bird], Phaser.Physics.ARCADE);
            }
        }
        State.Play = Play;
    })(State = Flappy.State || (Flappy.State = {}));
})(Flappy || (Flappy = {}));
