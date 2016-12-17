namespace Flappy.State {
    export class Play extends Phaser.State {

        private bird: Bird;

        public preload(): void {
            this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
        }

        public create(): void {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 100;

            this.bird = new Bird(this.game, 100, 100, 'bird');
            this.game.physics.enable([this.bird], Phaser.Physics.ARCADE);
            this.game.camera.follow(this.bird);

        }
    }
}
