namespace Flappy.Global {
    export class Constants {
        public static gameSpeed: number = 0.1;
        public static jumpSpeed: number = 500;
        public static gapSize: number = 200;
        public static gravity: number = 2000;

        public static serverUrl: string = 'http://localhost:9001';

        public static gameHeight: number = 665;

        public static get gameWidth(): number {
            let ratio = this.gameHeight / window.innerHeight;
            return window.innerWidth * ratio;
        }

        public static worldOffset: number = -1000;
    }
}
