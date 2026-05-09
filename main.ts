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

// Camera follows hero
scene.cameraFollowSprite(hero)

// Set lives to 3
info.setLife(3)

// Create pot 1
let pot1 = sprites.create(assets.image`pot`, SpriteKind.Food)
pot1.setPosition(randint(20, 150), randint(20, 150))

// Create pot 2
let pot2 = sprites.create(assets.image`pot`, SpriteKind.Food)
pot2.setPosition(randint(20, 150), randint(20, 150))

// Create pot 3
let pot3 = sprites.create(assets.image`pot`, SpriteKind.Food)
pot3.setPosition(randint(20, 150), randint(20, 150))

// Random pot has key
let keyPot = randint(1, 3)
let keySpawned = false

// Create key (hidden)
let key = sprites.create(assets.image`Key`, SpriteKind.Player)
key.setPosition(-100, -100)

// Move hero
controller.moveSprite(hero, 100, 100)

// Pot touched
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()

    if (!keySpawned && ((keyPot == 1 && otherSprite == pot1) || (keyPot == 2 && otherSprite == pot2) || (keyPot == 3 && otherSprite == pot3))) {
        key.setPosition(otherSprite.x, otherSprite.y)
        keySpawned = true
        game.splash("You found the Key!", "Move to the next level")
    }
})

// Key touched - Win
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    if (otherSprite == key) {
        game.showLongText("Level Complete!", DialogLayout.Center)
        game.over(true)
    }
})
