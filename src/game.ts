namespace Flappy {
    export class Game extends Phaser.Game {
        constructor(elementName: string) {
            let element = document.getElementById(elementName);

            super(Global.Constants.gameWidth, Global.Constants.gameHeight, Phaser.AUTO, element.id, Flappy.State.Blank, false, false);

            this.state.add('play', Flappy.State.Play);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(Global.Constants.gameWidth, Global.Constants.gameHeight);
            });
        }

        public connect(name: string, callback: (socket: SocketIOClient.Socket) => {}): void {
            Global.socket = io.connect(Global.Constants.serverUrl, { query: `name=${name}` });
            Global.socket.on('connect', () => {
                this.state.start('play');
                callback(Global.socket);
            });
        }
    }
}
