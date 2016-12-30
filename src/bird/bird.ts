namespace Flappy {
    export class Bird extends BaseBird {

        constructor(game: Phaser.Game, x: number, y: number, params: IBirdParams) {
            super(game, x, y, params);

            game.input.mouse.onMouseDown = () => {
                Global.socket.emit('jump');
                this.jump();
            };
        }

        public update(): void {
            super.update();
            Global.socket.emit('position', {
                x: this.x,
                y: this.y,
            });
        }
    }
}
