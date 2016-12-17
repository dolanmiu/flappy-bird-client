namespace Flappy.State {
    export class Play extends Phaser.State {

        public preload(): void {
            this.game.load.spritesheet('ms', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
        }
    }
}
