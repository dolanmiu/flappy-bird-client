namespace Flappy {
    export class Game extends Phaser.Game {
        constructor(elementName: string) {
            let element = document.getElementById(elementName);

            super(window.innerWidth, 800, Phaser.AUTO, element.id, Flappy.State.Play, true, false);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(window.innerWidth, window.innerHeight);
            });
        }
    }
}
