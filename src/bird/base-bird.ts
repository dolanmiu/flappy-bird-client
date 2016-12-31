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

        public jump(): void {
            this.wingSound.play();
        }

        public deathSequence(): void {
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
