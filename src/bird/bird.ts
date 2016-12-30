namespace Flappy {
    export class Bird extends BaseBird {

        constructor(game: Phaser.Game, x: number, y: number, params: IBirdParams) {
            super(game, x, y, params);

            game.input.mouse.onMouseDown = () => {
                Global.socket.emit('jump');
                this.body.velocity.y = -Global.Constants.jumpSpeed;
                wingSound.play();
            };

            let wingSound = this.game.add.audio(params.windSoundKey);
        }

        public update(): void {
            if (this.body.velocity.y >= 700) {
                this.body.velocity.y = 700;
            }
            // this.angle = this.calculateAngle(this.body.velocity.y);
            this.x += this.game.time.elapsed * this.currentSpeed;
            Global.socket.emit('position', {
                x: this.x,
                y: this.y,
            });
        }

        public deathSequence(): void {
            if (this.isStopped) {
                return;
            }
            this.stop();
            this.hitSound.play();
            setTimeout(() => {
                this.dieSound.play();
            }, 300);
        }
    }
}
