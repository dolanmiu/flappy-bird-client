namespace Flappy {

    const jumpSpeed = 60;
    const jumpTiltAngle = -60;

    export class Bird extends Phaser.Sprite {

        private spaceKey: Phaser.Key;

        constructor(game: Phaser.Game, x: number, y: number, key: string) {
            super(game, x, y, key);
            this.game.add.existing(this);

            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

            this.spaceKey.onDown.add(() => {
                this.body.velocity.y = -jumpSpeed;
            });

        }

        public update(): void {
            console.log(this.body.velocity.y);
            this.angle = this.calculateAngle(this.body.velocity.y);
        }

        private calculateAngle(speed: number): number {
            if (speed >= 90) {
                return 90;
            }
            return speed;
        }
    }
}
