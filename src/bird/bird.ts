namespace Flappy {
    export class Bird extends BaseBird {

        constructor(game: Phaser.Game, x: number, y: number, params: IBirdParams) {
            super(game, x, y, params);

            this.game.input.onDown.add(() => {
                Global.socket.emit('jump');
                this.jump();
            });
        }

        public update(): void {
            super.update();
            Global.socket.emit('position', {
                x: this.x,
                y: this.y,
            });
        }

        public deathSequence(): void {
            super.deathSequence();
            this.game.input.onDown.removeAll();
        }

        public restart(): void {
            super.restart();
            this.game.input.onDown.add(() => {
                Global.socket.emit('jump');
                this.jump();
            });
        }
    }
}
