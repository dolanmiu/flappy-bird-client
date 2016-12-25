namespace Flappy {
    interface IPipe {
        index: number;
        location: number;
    }

    export class PipePool extends Phaser.Group {
        constructor(game: Phaser.Game) {
            super(game);
            this.game = game;
        }

        public addPipes(pipes: Array<IPipe>): void {
            for (let pipe of pipes) {
                this.create(pipe.index * Flappy.Constants.gapSize, pipe.location);
            }
        }

        public create(x: number, y: number) {
            // Find the first child that has a false exist property:
            let obj = this.getFirstExists(false);
            if (!obj) {
                // We failed to find an availble child, so we create one now and add it to the pool.
                obj = new PipeSet(this.game, x, y, Constants.gapSize, 'pipeBody', 'pipeDownCap', 'pipeUpCap');
                this.add(obj, true);
            }
            //  We call the childs spawn method and return the object to whatever triggered this.
            //  The spawn method will handle stuff like position, resetting the health property
            //  and setting exists to true. The spawned object will live even if the returned
            //  reference is ignored
        }
    }
}
