
// =====================
// GLOBALS
// =====================
let hero: Sprite = null
let keyFound = false
let health = 3

// =====================
// TILEMAP
// =====================
tiles.setTilemap(tilemap`F1`)

// =====================
// PLAYER (CENTER SPAWN)
// =====================
hero = sprites.create(assets.image`hero`, SpriteKind.Player)

let allTiles = tiles.getTilesByType(assets.tile`transparency16`)
let centerIndex = Math.floor(allTiles.length / 2)
let heroTile = allTiles[centerIndex]

tiles.placeOnTile(hero, heroTile)

// camera follows hero
scene.cameraFollowSprite(hero)

controller.moveSprite(hero)
info.setScore(health)

// =====================
// SPAWN VASES (USING vpot)
// =====================
function spawnVases() {

    let locations = tiles.getTilesByType(assets.tile`transparency16`)
    let placed = 0
    let attempts = 0

    while (placed < 3 && attempts < 50) {

        let tile = locations[randint(0, locations.length - 1)]

        let dx = Math.abs(tile.col - heroTile.col)
        let dy = Math.abs(tile.row - heroTile.row)

        // at least 4 tiles away
        if ((dx + dy) >= 4) {

            // ✅ CORRECT asset name: vpot
            let vase = sprites.create(assets.image`vpot`, SpriteKind.Food)
            tiles.placeOnTile(vase, tile)

            placed++
        }

        attempts++
    }
}

// =====================
// BREAK VASE
// =====================
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player, vase) {

    let roll = randint(1, 100)

    if (roll <= 50) {
        health += 1
        game.showLongText("You gained health!", DialogLayout.Bottom)

    } else if (roll <= 95) {
        health -= 1
        game.showLongText("You lost health!", DialogLayout.Bottom)

    } else {
        keyFound = true
        game.showLongText("You found the key!", DialogLayout.Center)
        spawnChest()
    }

    info.setScore(health)

    if (health <= 0) {
        game.over(false)
    }

    vase.destroy()
})

// =====================
// CHEST
// =====================
function spawnChest() {
    let chest = sprites.create(assets.image`chest`, SpriteKind.Projectile)

    let locations = tiles.getTilesByType(assets.tile`transparency16`)
    let tile = locations[randint(0, locations.length - 1)]

    tiles.placeOnTile(chest, tile)
}

// =====================
// WIN CONDITION
// =====================
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (player, chest) {

    if (keyFound) {
        game.showLongText("Level Complete!", DialogLayout.Center)
        game.over(true)
    }
})

// =====================
// START
// =====================
spawnVases()
