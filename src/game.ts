namespace Flappy {
    export class Game extends Phaser.Game {
        constructor(elementName: string) {
            let element = document.getElementById(elementName);

            super(window.innerWidth, 800, Phaser.AUTO, element.id, Flappy.State.Play, true, true);
        }
    }
}
