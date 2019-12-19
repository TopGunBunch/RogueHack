import * as ex from 'excalibur';

import * as styles from './styles.css';

import {MapRenderer} from "./ui/MapRenderer";

function makePaddle(game: ex.Engine): ex.Actor {
    // Create an actor with x position of 150px,
    // y position of 40px from the bottom of the screen,
    // width of 200px, height and a height of 20px
    const paddle = new ex.Actor(150, game.drawHeight - 40, 200, 20);

    // Let's give it some color with one of the predefined
    // color constants
    paddle.color = ex.Color.Chartreuse;

    // Make sure the paddle can partipate in collisions, by default excalibur actors do not collide
    paddle.collisionType = ex.CollisionType.Fixed;

    // Add a mouse move listener
    game.input.pointers.primary.on('move', (evt) => {
        paddle.pos.x = evt.target.lastWorldPos.x;
    });

    return paddle;
}

function makeBall(game: ex.Engine, bricks: ex.Actor[]): ex.Actor {
    // Create a ball
    const ball = new ex.Actor(100, 300, 20, 20);

    // Set the color
    ball.color = ex.Color.Red;

    // Set the velocity in pixels per second
    ball.vel.setTo(100, 100);

    // Set the collision Type to passive
    // This means "tell me when I collide with an emitted event, but don't let excalibur do anything automatically"
    ball.collisionType = ex.CollisionType.Passive;
    // Other possible collision types:
    // "ex.CollisionType.PreventCollision - this means do not participate in any collision notification at all"
    // "ex.CollisionType.Active - this means participate and let excalibur resolve
    //  the positions/velocities of actors after collision"
    // "ex.CollisionType.Fixed - this means participate, but this object is unmovable"

    // Wire up to the postupdate event
    ball.on('postupdate', function _postupdate(this: ex.Actor) {
        // If the ball collides with the left side
        // of the screen reverse the x velocity
        if (this.pos.x < this.width / 2) {
            this.vel.x *= -1;
        }

        // If the ball collides with the right side
        // of the screen reverse the x velocity
        if (this.pos.x + this.width / 2 > game.drawWidth) {
            this.vel.x *= -1;
        }

        // If the ball collides with the top
        // of the screen reverse the y velocity
        if (this.pos.y < this.height / 2) {
            this.vel.y *= -1;
        }
    });

    // Draw is passed a rendering context and a delta in milliseconds since the last frame
    ball.draw = function _ondraw(ctx) {
        // Optionally call original 'base' method
        // ex.Actor.prototype.draw.call(this, ctx, delta)

        // Custom draw code
        ctx.fillStyle = this.color.toString();
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };

    // On collision remove the brick, bounce the ball
    ball.on('precollision', (ev) => {
        if (bricks.indexOf(ev.other) > -1) {
            // kill removes an actor from the current scene
            // therefore it will no longer be drawn or updated
            ev.other.kill();
        }

        // reverse course after any collision
        // intersections are the direction body A has to move to not be clipping body B
        // `ev.intersection` is a vector `normalize()` will make the length of it 1
        // `negate()` flips the direction of the vector
        const intersection = ev.intersection.normalize();

        // The largest component of intersection is our axis to flip
        if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
            ball.vel.x *= -1;
        } else {
            ball.vel.y *= -1;
        }
    });

    ball.on('exitviewport', () => {
        // eslint-disable-next-line no-alert
        alert('You lose!');
    });

    return ball;
}

function makeBricks(game: ex.Engine): ex.Actor[] {
    // Build Bricks
    const bricks: ex.Actor[] = [];

    // Padding between bricks
    const padding = 20; // px
    const xoffset = 65; // x-offset
    const yoffset = 20; // y-offset
    const columns = 5;
    const rows = 3;

    const brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow];

    // Individual brick width with padding factored in
    const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
    const brickHeight = 30; // px
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < columns; i++) {
            const brick = new ex.Actor(
                xoffset + i * (brickWidth + padding) + padding,
                yoffset + j * (brickHeight + padding) + padding,
                brickWidth,
                brickHeight,
                brickColor[j % brickColor.length],
            );

            brick.collisionType = ex.CollisionType.Active;

            bricks.push(brick);
        }
    }

    return bricks;
}

function main(canvasId: string): void {
    // Create an instance of the engine.
    const game = new ex.Engine({
        width: MapRenderer.WIDTH * MapRenderer.SPRITE_SIZE,
        height: MapRenderer.HEIGHT * MapRenderer.SPRITE_SIZE,
        canvasElementId: canvasId,
    });

    const paddle = makePaddle(game);
    const bricks = makeBricks(game);
    const ball = makeBall(game, bricks);

    // `game.add` is the same as calling
    // `game.currentScene.add`
    game.add(paddle);
    game.add(ball);
    bricks.forEach((brick) => {
        game.add(brick);
    });

    // Start the engine to begin the game.
    game.start();
}

window.addEventListener('DOMContentLoaded', () => {
    // Create canvas element
    const container = document.createElement('div');
    container.classList.add(styles.container);
    document.body.appendChild(container);

    const canvas = document.createElement('canvas');
    canvas.id = 'rootCanvas';
    canvas.classList.add(styles.renderCanvas, styles.noSelect);
    container.appendChild(canvas);

    main(canvas.id);
});
