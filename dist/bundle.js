var Flappy;
(function (Flappy) {
    class Bird extends Phaser.Sprite {
        constructor(game, x, y, key) {
            super(game, x, y, key);
            this.game.add.existing(this);
            this.animations.add('fly');
            this.animations.play('fly', 3, true);
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
                this.bird = new Flappy.Bird(this.game, 100, 100, 'bird');
            }
        }
        State.Play = Play;
    })(State = Flappy.State || (Flappy.State = {}));
})(Flappy || (Flappy = {}));
