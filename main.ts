namespace SpriteKind {
    export const Pot = SpriteKind.create()
}

// Create the hero sprite
let hero = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . f f f f f f . . . . . .
    . . . . f f f f f f . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . f f f f f f . . . . . .
    . . . . f f f f f f . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)

// Set hero to a starting position
hero.setPosition(80, 80)

// Create the FOREST tilemap
tiles.setTilemap(tiles.getTilemap(`FOREST`))

// Create pots at different locations
let pots: Sprite[] = []
pots.push(sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . f f f f f f . . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . . f f f f f f . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Pot))

pots.push(sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . f f f f f f . . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . . f f f f f f . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Pot))

pots.push(sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . f f f f f f . . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . . f f f f f f . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Pot))

// Set pot positions
pots[0].setPosition(40, 40)
pots[1].setPosition(100, 70)
pots[2].setPosition(140, 50)

// Randomly choose which pot has the key
let potWithKey = randint(0, 2)
let keyFound = false
let potsCollected: boolean[] = [false, false, false]

// Controller for moving hero with arrow keys
controller.moveSprite(hero, 100, 100)

// Game loop to check collisions
game.onUpdate(function () {
    for (let i = 0; i < pots.length; i++) {
        if (sprite.overlapsWith(hero, pots[i]) && !potsCollected[i]) {
            // Pot broken
            potsCollected[i] = true
            
            if (i == potWithKey) {
                keyFound = true
                game.splash("Pot " + (i + 1) + " broken!", "You found the key!")
            } else {
                game.splash("Pot " + (i + 1) + " broken!", "No key here...")
            }
            
            // Remove the pot from the screen
            pots[i].destroy()
        }
    }
    
    // Check if all pots are collected
    if (potsCollected[0] && potsCollected[1] && potsCollected[2]) {
        if (keyFound) {
            game.showLongText("Congratulations! You found the key!", DialogLayout.Bottom)
            game.gameOver(WinCondition.Won)
        } else {
            game.showLongText("Game Over! You didn't find the key!", DialogLayout.Bottom)
            game.gameOver(WinCondition.Lost)
        }
    }
})
