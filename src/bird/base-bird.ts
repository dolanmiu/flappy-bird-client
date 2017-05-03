namespace Flappy {
    export abstract class BaseBird extends Phaser.Sprite {

        private hitSound: Phaser.Sound;
        private dieSound: Phaser.Sound;
        private wingSound: Phaser.Sound;

        constructor(game: Phaser.Game, x: number, y: number, tint: number, params: IBirdParams) {
            super(game, x, y, params.key);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);

            this.hitSound = this.game.add.audio(params.hitSoundKey);
            this.dieSound = this.game.add.audio(params.dieSoundKey);
            this.wingSound = this.game.add.audio(params.windSoundKey);

            let colorSprite = new Phaser.Sprite(game, 0, 0, params.colorKey);
            colorSprite.anchor.set(0.5, 0.5);
            colorSprite.animations.add('fly');
            colorSprite.animations.play('fly', 3, true);
            colorSprite.blendMode = PIXI.blendModes.OVERLAY;
            colorSprite.alpha = 0.7;
            this.game.physics.enable(colorSprite, Phaser.Physics.ARCADE);
            colorSprite.body.allowGravity = false;
            colorSprite.tint = tint;

            this.addChild(colorSprite);
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
    }
}
