namespace Flappy {
    interface ITutorialSplashParams {
        key: string;
    }

    export class TutorialSplash extends Phaser.Sprite {

        constructor(game: Phaser.Game, params: ITutorialSplashParams) {
            super(game, Global.Constants.gameWidth / 2, Global.Constants.gameHeight / 2, params.key);

            this.fixedToCamera = true;
            this.anchor.set(0.5, 0.5);

            this.game.add.existing(this);
        }

        public update(): void {
            this.cameraOffset.x = Global.Constants.gameWidth / 2;
            this.cameraOffset.y = Global.Constants.gameHeight / 2;
        }
    }
}
