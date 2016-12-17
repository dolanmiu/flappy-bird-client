class Game extends Phaser.Game {
    constructor(elementName: string) {
        let element = document.getElementById(elementName);

        super(800, 800, Phaser.AUTO, element.id, PlayState);
    }
}
