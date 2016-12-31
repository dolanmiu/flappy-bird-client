namespace Flappy {

    export interface IPlayer {
        id: string;
        name: string;
    }

    export class PlayerManager {
        private players: Map<string, MultiplayerBird>;

        constructor(private game: Phaser.Game, private birdParams: IBirdParams) {
            this.players = new Map<string, MultiplayerBird>();

            Global.socket.on('position', (data: { x: number, y: number, id: string }) => {
                let player = this.players.get(data.id);

                if (player === undefined) {
                    return;
                }

                player.x = data.x;
                player.y = data.y;
            });

            Global.socket.on('new-player', (data: IPlayer) => {
                let player = new MultiplayerBird(game, 0, 0, data.name, birdParams);
                this.players.set(data.id, player);
            });
        }

        public createPlayers(data: Array<IPlayer>): void {
            for (let player of data) {
                if (player.id === Global.socket.id) {
                    return;
                }
                this.createPlayer(player);
            }
        }

        private createPlayer(data: IPlayer): void {
            if (this.players.has(data.id)) {
                return;
            }

            let player = new MultiplayerBird(this.game, 0, 0, data.name, this.birdParams);
            this.players.set(data.id, player);
        }

    }
}
