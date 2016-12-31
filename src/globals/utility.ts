namespace Flappy.Global {
    export class Utility {
        public static map(input: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number): number {
            return (input - inputMin) * (outputMax - outputMin) / (inputMax - inputMin) + outputMin;
        }
    }
}
