class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('orchard', `img/8bfd85ec-b209-4d21-8927-53ef7cf66a80.png`);
        this.load.image('apple', `img/6b3030f1-5637-4f6c-8c85-70056cce493c.png`);
        this.load.image('red', `img/9df43adc-2cc8-45cb-a3d2-59a662d9f559.png`);
        this.load.audio('background_music', `aud/05cdc243-9774-474c-845b-8bb7b449dd11.mp3`);
    }

    create() {
        this.appleCount = 0;
        this.isActivated = false;

        // Add the new orchard background
        const background = this.add.image(400, 300, 'orchard');

        // Scale the background to fit the game width while maintaining aspect ratio
        const scaleX = 800 / background.width;
        const scaleY = 600 / background.height;
        const scale = Math.max(scaleX, scaleY);

        // Make the background a little smaller by reducing the scale
        const smallerScale = scale * 1;
        background.setScale(smallerScale);

        // Center the background
        background.setPosition(400, 300);

        // Create emitter directly from scene instead of using ParticleEmitterManager
        this.emitter = this.add.particles({
            key: 'red',
            config: {
                speed: 100,
                scale: {
                    start: 1,
                    end: 0
                },
                blendMode: 'ADD',
                tint: 0x42e0f5 // Light blue color (#42e0f5)
            }
        });

        this.apple = this.physics.add.image(400, 100, 'apple');

        // Make the apple 20% smaller than its previous size
        this.apple.setScale(0.2 * 0.8);

        this.apple.setVelocity(100, 200);
        this.apple.setBounce(0.8, 0.8);
        this.apple.setCollideWorldBounds(true);

        // Create steam machine (using red sprite as placeholder)
        this.machine = this.add.image(600, 300, 'red');
        this.machine.setScale(2);
        this.machine.setTint(0x666666); // Gray tint for inactive state

        // Add apple counter text
        this.appleText = this.add.text(16, 16, 'Apples: 0/5', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Handle apple collection
        this.apple.setInteractive();
        this.apple.on('pointerdown', () => {
            this.appleCount++;
            this.appleText.setText('Apples: ' + this.appleCount + '/5');

            // Check if we have enough Apples to activate the machine
            if (this.appleCount >= 5 && !this.isActivated) {
                this.isActivated = true;
                this.machine.setTint(0xff0000); // Red tint for active state
                // Update particle emitter to follow machine
                this.emitter.setPosition(this.machine.x, this.machine.y);
                this.emitter.start();
            }

            // Respawn apple at random position
            this.apple.setPosition(
                Phaser.Math.Between(100, 700),
                Phaser.Math.Between(100, 500)
            );
        });

        // Add background music
        this.backgroundMusic = this.sound.add('background_music', {
            loop: true,
            volume: 0.1
        });
        this.backgroundMusic.play();

        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                // this.scene.start('new-scene');
                // this.switchScene();
            },
        });
    }
}

const container = document.getElementById('renderDiv');
const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            }
        }
    },
    scene: Example
};

window.phaserGame = new Phaser.Game(config);