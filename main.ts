// Create hero
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

// Create pot 1 at random spot
let pot1 = sprites.create(assets.image`pot`, SpriteKind.Food)
pot1.setPosition(randint(20, 150), randint(20, 150))

// Create pot 2 at random spot
let pot2 = sprites.create(assets.image`pot`, SpriteKind.Food)
pot2.setPosition(randint(20, 150), randint(20, 150))

// Create pot 3 at random spot
let pot3 = sprites.create(assets.image`pot`, SpriteKind.Food)
pot3.setPosition(randint(20, 150), randint(20, 150))

// Choose which pot has the key
let keyPot = randint(1, 3)

// Create key
let key = sprites.create(assets.image`Key`, SpriteKind.Player)

// Place key in random pot
if (keyPot == 1) {
    key.setPosition(pot1.x, pot1.y)
} else if (keyPot == 2) {
    key.setPosition(pot2.x, pot2.y)
} else {
    key.setPosition(pot3.x, pot3.y)
}

// Move hero with arrow keys
controller.moveSprite(hero, 100, 100)

// When hero touches key, win game
hero.onOverlapSprite(key, function (sprite, otherSprite) {
    game.showLongText("You found the Key! Game Complete!", DialogLayout.Center)
    game.gameOver(game.WinOutcome.Win)
})

// When hero touches pot, destroy it
hero.onOverlapSprite(SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
})
