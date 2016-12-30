namespace Flappy {
    const jumpTiltAngle = -60;

    export abstract class BaseBird extends Phaser.Sprite {

        protected currentSpeed: number;

        private hitSound: Phaser.Sound;
        private dieSound: Phaser.Sound;
        private wingSound: Phaser.Sound;

        constructor(game: Phaser.Game, x: number, y: number, params: IBirdParams) {
            super(game, x, y, params.key);

            this.currentSpeed = Global.Constants.gameSpeed;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.game.add.existing(this);

            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);

            this.hitSound = this.game.add.audio(params.hitSoundKey);
            this.dieSound = this.game.add.audio(params.dieSoundKey);
            this.wingSound = this.game.add.audio(params.windSoundKey);
        }

        public stop(): void {
            this.currentSpeed = 0;
        }

        public restart(): void {
            this.currentSpeed = Global.Constants.gameSpeed;
        }

        public jump(): void {
            this.body.velocity.y = -Global.Constants.jumpSpeed;
            this.wingSound.play();
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

        public update(): void {
            if (this.body.velocity.y >= 700) {
                this.body.velocity.y = 700;
            }
            // this.angle = this.calculateAngle(this.body.velocity.y);
            this.x += this.game.time.elapsed * this.currentSpeed;
        }

        private calculateAngle(speed: number): number {
            if (speed >= 90) {
                return 90;
            }
            return speed;
        }
    }
}
