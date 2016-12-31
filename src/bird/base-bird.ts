namespace Flappy {
    const jumpTiltAngle = -60;

    export abstract class BaseBird extends Phaser.Sprite {

        private hitSound: Phaser.Sound;
        private dieSound: Phaser.Sound;
        private wingSound: Phaser.Sound;

        constructor(game: Phaser.Game, x: number, y: number, params: IBirdParams) {
            super(game, x, y, params.key);

            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);

            this.hitSound = this.game.add.audio(params.hitSoundKey);
            this.dieSound = this.game.add.audio(params.dieSoundKey);
            this.wingSound = this.game.add.audio(params.windSoundKey);
        }

        public jump(volume?: number): void {
            this.wingSound.play('', 0, volume);
        }

        public deathSequence(volume?: number): void {
            this.hitSound.play('', 0, volume);
            setTimeout(() => {
                this.dieSound.play('', 0, volume);
            }, 300);
        }

        protected calculateAngle(speed: number): number {
            let angle = Global.Utility.map(speed, -Global.Constants.jumpSpeed, Global.Constants.terminalVelocity, jumpTiltAngle, 90);
            return angle;
        }
    }
}
