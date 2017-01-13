namespace Flappy {
    const JUMP_TILT_ANGLE = -70;

    export class Bird extends BaseBird {
        protected currentSpeed: number;
        protected idleTween: Phaser.Tween;

        constructor(game: Phaser.Game, private floorHeight: number, tint: number, params: IBirdParams) {
            super(game, 100, 0, tint, params);

            this.currentSpeed = 0;
            this.restart();

            this.game.add.existing(this);
        }

        public update(): void {
            if (this.body.velocity.y >= Global.Constants.terminalVelocity) {
                this.body.velocity.y = Global.Constants.terminalVelocity;
            }

            if (this.y <= -100) {
                this.y = -100;
            }

            if (this.y >= Global.Constants.gameHeight - this.floorHeight) {
                this.y = Global.Constants.gameHeight - this.floorHeight;
            }

            this.angle = this.calculateAngle(this.body.velocity.y);

            this.x += this.game.time.elapsed * this.currentSpeed;
            Global.socket.emit('position', {
                angle: this.angle,
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
            this.game.input.onDown.remove(this.jumpLambda, this);
            Global.socket.emit('death');
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
            let x = this.getRandomStartingX();
            this.reset(x, y);
            this.body.allowGravity = false;
            this.idleTween = this.game.add.tween(this).to({ y: this.y - 10 }, 1000, Phaser.Easing.Linear.None, false, 0, -1, true);
            this.idleTween.start();
            this.game.input.onDown.add(this.jumpLambda, this);
        }

        private calculateAngle(speed: number): number {
            let angle = Global.Utility.map(speed, -Global.Constants.jumpSpeed, Global.Constants.terminalVelocity, JUMP_TILT_ANGLE, 90);
            return angle;
        }

        private jumpLambda(): void {
            if (this.body.allowGravity === false) {
                this.body.allowGravity = true;
                this.currentSpeed = Global.Constants.gameSpeed;
                this.idleTween.stop();
            }

            Global.socket.emit('jump');
            this.jump();
        }

        private getRandomStartingY(offset: number): number {
            let availableHeight = Global.Constants.gameHeight - offset;
            let adjustedLocation = Global.Utility.map(Math.random(), 0, 1, 0.2, 0.8);
            return adjustedLocation * availableHeight;
        }

        private getRandomStartingX(): number {
            let availableHeight = 200;
            let adjustedLocation = Global.Utility.map(Math.random(), 0, 1, 0.2, 0.8);
            return adjustedLocation * availableHeight;
        }
    }
}
