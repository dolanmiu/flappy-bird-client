namespace Flappy {

    const jumpSpeed = 60;
    const jumpTiltAngle = -60;

    export class Bird extends Phaser.Sprite {

        private spaceKey: Phaser.Key;
        private currentSpeed: number;

        private hitSound: Phaser.Sound;
        private dieSound: Phaser.Sound;

        constructor(game: Phaser.Game, x: number, y: number, key: string) {
            super(game, x, y, key);

            this.currentSpeed = Constants.gameSpeed;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.game.add.existing(this);

            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

            this.hitSound = this.game.add.audio('hit');
            this.dieSound = this.game.add.audio('die');
            let wingSound = this.game.add.audio('wing');

            this.spaceKey.onDown.add(() => {
                this.body.velocity.y = -jumpSpeed;
                wingSound.play();
            });
        }

        public update(): void {
            // console.log(this.body.velocity.y);
            this.angle = this.calculateAngle(this.body.velocity.y);
            this.x += this.game.time.elapsed * this.currentSpeed;
        }

        public stop(): void {
            this.currentSpeed = 0;
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
