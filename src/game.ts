namespace Flappy {
    export class Game extends Phaser.Game {
        constructor(elementName: string) {
            let element = document.getElementById(elementName);

            super(Flappy.Constants.gameWidth, Flappy.Constants.gameHeight, Phaser.AUTO, element.id, Flappy.State.Blank, false, false);

            this.state.add('play', Flappy.State.Play);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(Flappy.Constants.gameWidth, Flappy.Constants.gameHeight);
            });
        }

        public connect(name: string, callback: () => {}): void {
            Global.socket = io.connect(Constants.serverUrl, { query: `name=${name}` });
            Global.socket.on('connect', () => {
                this.state.start('play');
                callback();
            });
        }
    }
}
