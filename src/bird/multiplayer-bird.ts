namespace Flappy {
    export class MultiplayerBird extends BaseBird {

        private nameTag: Phaser.Text;

        constructor(game: Phaser.Game, x: number, y: number, private displayName: string, params: IBirdParams) {
            super(game, x, y, params);

            this.nameTag = new Phaser.Text(game, 0, -35, displayName, { font: '12px flappy', fill: 'white' });
            this.nameTag.stroke = 'black';
            this.nameTag.strokeThickness = 2;
            this.nameTag.anchor.x = 0.5;

            this.addChild(this.nameTag);
        }

        public deathSequence(): void {
            let volume = this.calculateVolume();
            super.deathSequence(volume);
        }

        public jump(): void {
            let volume = this.calculateVolume();
            super.jump(volume);
        }

        public update(): void {
            this.nameTag.angle = -this.angle;
            this.nameTag.x = -35 * Math.sin(this.angle * (Math.PI / 180));
            this.nameTag.y = -35 * Math.cos(this.angle * (Math.PI / 180));
        }

        private calculateVolume(): number {
            let distance = Math.abs(this.game.camera.x - this.x);
            let clampedDistance = Math.min(Math.max(distance, 0), 1000);
            let mappedDistance = Global.Utility.map(clampedDistance, 0, 1000, 0, 1);
            let volume = 1 - mappedDistance;
            return volume;
        }
    }
}
