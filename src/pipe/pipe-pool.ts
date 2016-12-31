namespace Flappy {

    const LEVEL_OFFSET: number = 500;

    export interface IPipe {
        index: number;
        location: number;
    }

    export class PipePool extends Phaser.Group {
        constructor(game: Phaser.Game, private floorHeight: number) {
            super(game);
            this.game = game;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);

        }

        public addPipes(pipes: Array<IPipe>): void {
            for (let pipe of pipes) {
                let availableHeight = Global.Constants.gameHeight - this.floorHeight - Global.Constants.gapSize;
                let adjustedLocation = Global.Utility.map(pipe.location, 0, 1, 0.1, 0.9);
                this.create(LEVEL_OFFSET + pipe.index * Global.Constants.pipeSpacing, adjustedLocation * availableHeight);
            }
        }

        public create(x: number, y: number): void {
            // Find the first child that has a false exist property:
            let obj = this.getFirstExists(false);
            if (!obj) {
                // We failed to find an availble child, so we create one now and add it to the pool.
                obj = new PipeSet(this.game, x, y, Global.Constants.gapSize, {
                    pipeBodyKey: 'pipeBody',
                    pipeDownCapKey: 'pipeDownCap',
                    pipeUpCapKey: 'pipeUpCap',
                });
                this.add(obj, true);
            }
            //  We call the childs spawn method and return the object to whatever triggered this.
            //  The spawn method will handle stuff like position, resetting the health property
            //  and setting exists to true. The spawned object will live even if the returned
            //  reference is ignored
        }

        public get sprites(): Array<Phaser.Sprite | Phaser.TileSprite> {
            let combinedArray = new Array<Phaser.Sprite | Phaser.TileSprite>();
            for (let child of this.children) {
                let pipeSet = <PipeSet> child;
                combinedArray = combinedArray.concat(pipeSet.sprites);
            }
            return combinedArray;
        }

        public get holes(): Array<Phaser.Sprite> {
            let combinedArray = new Array<Phaser.Sprite>();
            for (let child of this.children) {
                let pipeSet = <PipeSet> child;
                combinedArray = combinedArray.concat(pipeSet.hole);
            }
            return combinedArray;
        }
    }
}
