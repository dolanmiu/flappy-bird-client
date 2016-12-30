namespace Flappy.State {

    const floorHeight: number = 112;

    export class Blank extends Phaser.State {

        private sky: Sky;
        private floor: Floor;

        public preload(): void {
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('floor', 'assets/land.png');

        }

        public create(): void {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.stage.backgroundColor = '#4ec0ca';
            this.game.stage.disableVisibilityChange = true;

            this.floor = new Floor(this.game, floorHeight, 'floor');
            this.sky = new Sky(this.game, 109, 'sky', floorHeight);
        }

        public update(): void {
            this.game.world.width = Global.Constants.gameWidth;
            this.floor.x = 0;
        }
    }
}
