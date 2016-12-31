namespace Flappy {
    export class Bird extends BaseBird {
        protected currentSpeed: number;

        constructor(game: Phaser.Game, private floorHeight: number, params: IBirdParams) {
            super(game, 100, 0, params);

            this.currentSpeed = 0;
            this.restart();
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
            super.deathSequence();
            this.game.input.onDown.remove(this.jumpy, this);

        }

        public jump(): void {
            super.jump();
            this.body.velocity.y = -Global.Constants.jumpSpeed;
        }

        public stop(): void {
            this.currentSpeed = 0;
        }

        public get isStopped(): boolean {
            return this.currentSpeed === 0;
        }

        public restart(): void {
            let y = this.getRandomStartingY(this.floorHeight);
            this.reset(100, y);
            this.body.allowGravity = false;
            this.game.input.onDown.add(this.jumpy, this);
        }

        private jumpy(): void {
            if (this.body.allowGravity === false) {
                this.body.allowGravity = true;
                this.currentSpeed = Global.Constants.gameSpeed;
            }

            Global.socket.emit('jump');
            this.jump();
        }

        private getRandomStartingY(offset: number): number {
            let availableHeight = Global.Constants.gameHeight - offset;
            let adjustedLocation = Global.Utility.map(Math.random(), 0, 1, 0.2, 0.8);
            return adjustedLocation * availableHeight;
        }
    }
}
