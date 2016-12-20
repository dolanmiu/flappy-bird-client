namespace Flappy {
    export class PipePool extends Phaser.Group {
        constructor(game: Phaser.Game) {
            super(game);
            this.game = game;

            for (let i = 0; i < 1; i++) {
                this.add(new PipeSet(game, 1000, 400, Constants.gapSize, 'pipeBody', 'pipeDownCap', 'pipeUpCap')); // Add new sprite
            }
        }

        public create(x: number, y: number): PipeSet {
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
            return obj.spawn(x, y);
        }
    }
}
