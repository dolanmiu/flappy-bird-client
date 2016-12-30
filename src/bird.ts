namespace Flappy {

    const jumpSpeed = 500;
    const jumpTiltAngle = -60;

    interface IBirdParams {
        key: string;
        hitSoundKey: string;
        dieSoundKey: string;
        windSoundKey: string;
    }

    export class Bird extends Phaser.Sprite {

        private spaceKey: Phaser.Key;
        private currentSpeed: number;

        private hitSound: Phaser.Sound;
        private dieSound: Phaser.Sound;

        constructor(game: Phaser.Game, x: number, y: number, params: IBirdParams) {
            super(game, x, y, params.key);

            this.currentSpeed = Constants.gameSpeed;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.game.add.existing(this);

            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

            this.hitSound = this.game.add.audio(params.hitSoundKey);
            this.dieSound = this.game.add.audio(params.dieSoundKey);
            let wingSound = this.game.add.audio(params.windSoundKey);

            this.spaceKey.onDown.add(() => {
                Global.socket.emit('jump');
                this.body.velocity.y = -jumpSpeed;
                wingSound.play();
            });
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

        public stop(): void {
            this.currentSpeed = 0;
        }

        public restart(): void {
            this.currentSpeed = Constants.gameSpeed;
        }

        public get isStopped(): boolean {
            return this.currentSpeed === 0;
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

        private calculateAngle(speed: number): number {
            if (speed >= 90) {
                return 90;
            }
            return speed;
        }

    }
}
