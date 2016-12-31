namespace Flappy {

    export interface IPlayer {
        id: string;
        name?: string;
    }

    export class PlayerManager {
        private players: Map<string, MultiplayerBird>;
        private group: Phaser.Group;

        constructor(private game: Phaser.Game, private birdParams: IBirdParams) {
            this.players = new Map<string, MultiplayerBird>();
            this.group = this.game.add.group();

            Global.socket.on('position', (data: { x: number, y: number, id: string }) => {
                let player = this.players.get(data.id);

                if (player === undefined) {
                    return;
                }

                player.x = data.x;
                player.y = data.y;
            });

            Global.socket.on('new-player', (data: IPlayer) => {
                this.createPlayer(data);
            });

            Global.socket.on('jump', (data: IPlayer) => {
                if (!this.players.has(data.id)) {
                    return;
                }
                let player = this.players.get(data.id);
                player.jump();
            });

            Global.socket.on('death', (data: IPlayer) => {
                if (!this.players.has(data.id)) {
                    return;
                }
                let player = this.players.get(data.id);
                player.deathSequence();
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
            // Off stage to hide
            let player = new MultiplayerBird(this.game, -1000, -1000, data.name, this.birdParams);
            this.group.add(player);
            this.players.set(data.id, player);
        }

    }
}
