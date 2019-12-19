import * as ex from 'excalibur';
import BaseMotionController from './BaseMotionController';

class RightKeyController extends BaseMotionController {

    public checkIfKeyWasPressed(engine): void {
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Right)) {
            this.notify();
        }
    }
}
