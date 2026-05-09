// Create hero sprite
let hero = sprites.create(img`
    . . . . . f f f f . . . . . . .
    . . . . f f f f f f . . . . . .
    . . . . f f f f f f . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . . f f f f . . . . . . .
    . . . . f f f f f f . . . . . .
    . . . . f f f f f f . . . . . .
    . . . . . f f f f . . . . . . .
`, SpriteKind.Player)
hero.setPosition(80, 80)

// Set tilemap
tiles.setTilemap(tilemap`FOREST`)

// Create 3 pots
let pot1 = sprites.create(img`
    . . . . f f f f f f . . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . . f f f f f f . . . . . .
`, SpriteKind.Food)
pot1.setPosition(40, 40)

let pot2 = sprites.create(img`
    . . . . f f f f f f . . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . . f f f f f f . . . . . .
`, SpriteKind.Food)
pot2.setPosition(100, 70)

let pot3 = sprites.create(img`
    . . . . f f f f f f . . . . . .
    . . . f f f f f f f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f . . . . f f . . . . .
    . . . f f f f f f f f . . . . .
    . . . . f f f f f f . . . . . .
`, SpriteKind.Food)
pot3.setPosition(140, 50)

// Game variables
let potWithKey = randint(1, 3)
let keyFound = false
let potsBroken = 0

// Move hero with arrow keys
controller.moveSprite(hero, 100, 100)

// Check collisions with pots
hero.onOverlapTile(SpriteKind.Food, function (sprite, location) {
    potsBroken += 1
    tiles.setTileAt(location, img`
        . . . . . . . . . . . . . . . .
    `)
    
    if (potsBroken == potWithKey) {
        keyFound = true
        game.splash("Pot " + potsBroken + " broken!", "You found the key!")
    } else {
        game.splash("Pot " + potsBroken + " broken!", "No key here...")
    }
    
    if (potsBroken == 3) {
        if (keyFound) {
            game.showLongText("Congratulations! You found the key!", DialogLayout.Bottom)
            game.gameOver(game.WinOutcome.Win)
        } else {
            game.showLongText("Game Over! You didn't find the key!", DialogLayout.Bottom)
            game.gameOver(game.WinOutcome.Lose)
        }
    }
})
