namespace Flappy {
    const jumpTiltAngle = -60;

    export abstract class BaseBird extends Phaser.Sprite {

        protected currentSpeed: number;

        protected hitSound: Phaser.Sound;
        protected dieSound: Phaser.Sound;

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
        }

        public stop(): void {
            this.currentSpeed = 0;
        }

        public restart(): void {
            this.currentSpeed = Global.Constants.gameSpeed;
        }

        public get isStopped(): boolean {
            return this.currentSpeed === 0;
        }

        public abstract deathSequence(): void;

        private calculateAngle(speed: number): number {
            if (speed >= 90) {
                return 90;
            }
            return speed;
        }
    }
}
