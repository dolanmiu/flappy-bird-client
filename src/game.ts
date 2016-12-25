namespace Flappy {
    export class Game extends Phaser.Game {
        constructor(elementName: string) {
            let element = document.getElementById(elementName);

            super(Flappy.Constants.gameWidth, Flappy.Constants.gameHeight, Phaser.AUTO, element.id, Flappy.State.Play, false, false);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(Flappy.Constants.gameWidth, Flappy.Constants.gameHeight);
            });
        }
    }
}
