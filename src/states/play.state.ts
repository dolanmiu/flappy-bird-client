namespace Flappy.State {
    export class Play extends Phaser.State {

        private bird: Bird;

        public preload(): void {
            this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
        }

        public create(): void {
            this.bird = new Bird(this.game, 100, 100, 'bird');
        }
    }
}
