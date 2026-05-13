# MakeCode Arcade Error Fixes Guide

This guide covers the 7 main errors you might encounter in MakeCode Arcade and how to fix them.

---

## Problem 1: `sprites.destroyAllSprites()` doesn't exist

**❌ Wrong:**
```typescript
sprites.destroyAllSprites()
```

**✅ Correct:**
```typescript
// Destroy all sprites of a specific kind
let allSprites = sprites.allOfKind(SpriteKind.Food)
for (let sprite of allSprites) {
    sprite.destroy()
}

// Or use forEach
sprites.allOfKind(SpriteKind.Food).forEach(function (sprite) {
    sprite.destroy()
})
```

---

## Problem 2: Assigning tilemaps to Image variables

**❌ Wrong:**
```typescript
let dungeonMap: Image = tilemap`FOREST`
```

**✅ Correct:**
```typescript
let dungeonMap: TileMap = tilemap`FOREST`
tiles.setTilemap(dungeonMap)
```

---

## Problem 3: `sprites.dungeonFloor` doesn't exist

**❌ Wrong:**
```typescript
let floor = sprites.dungeonFloor
```

**✅ Correct:**
```typescript
// Create your own sprite
let floor = sprites.create(assets.image`myFloor`, SpriteKind.Player)

// Or use tile references from your tilemap
let floorTile = img`
    . . . . . .
    . . . . . .
    . . . . . .
`
```

---

## Problem 4: Custom SpriteKinds don't exist by default

**❌ Wrong:**
```typescript
let item = sprites.create(img`...`, SpriteKind.Collectible)
```

**✅ Correct:**
```typescript
// Define custom SpriteKinds at the top of your file
enum SpriteKind {
    Player,
    Enemy,
    Food,
    Collectible,
    Projectile
}

// Then use it
let item = sprites.create(img`...`, SpriteKind.Collectible)
```

---

## Problem 5: `sprites.overlapArea()` and `sprite.getData()` don't exist

**❌ Wrong:**
```typescript
sprites.overlapArea(sprite1, sprite2, function (s1, s2) { })
let data = sprite.getData("key")
```

**✅ Correct:**
```typescript
// Use sprites.overlap() for collision detection
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    // Handle collision here
})

// Store extra data using variables or objects
let spriteData: { [key: string]: number } = {}
spriteData["health"] = 100
```

---

## Problem 6: `tiles.tileMapMoveByPixels()` doesn't exist

**❌ Wrong:**
```typescript
tiles.tileMapMoveByPixels(tilemap, 10, 0)
```

**✅ Correct:**
```typescript
// Move sprites instead of tilemaps
let mySprite = sprites.create(img`...`, SpriteKind.Player)
mySprite.vx = 50  // Horizontal velocity
mySprite.vy = 25  // Vertical velocity

// Or use setPosition
mySprite.setPosition(mySprite.x + 10, mySprite.y)
```

---

## Problem 7: Passing numbers to `sprites.destroy()` instead of particle effects

**❌ Wrong:**
```typescript
sprite.destroy(100)  // 100 is a number, not a particle effect
```

**✅ Correct:**
```typescript
// Basic destroy
sprite.destroy()

// Destroy with particle effect
sprite.destroy()
effects.spray(
    img`...`,
    sprite.x,
    sprite.y,
    -45,
    45
)
```

---

## Quick Reference Checklist

- ✅ Use `sprites.allOfKind()` to get all sprites of a kind, then loop to destroy
- ✅ Use `TileMap` type for tilemaps, not `Image`
- ✅ Create your own sprites instead of using non-existent built-in ones
- ✅ Define custom `SpriteKind` enums before using them
- ✅ Use `sprites.onOverlap()` for collision detection
- ✅ Store sprite data in variables or objects, not with `getData()`
- ✅ Use `sprite.vx`, `sprite.vy`, or `sprite.setPosition()` for movement
- ✅ Call `sprite.destroy()` without parameters

---

## Your Game - Already Fixed! ✨

Your **main.ts** uses all the correct patterns:
- ✅ `sprites.onOverlap()` correctly
- ✅ `SpriteKind.Player` and `SpriteKind.Food` correctly
- ✅ `sprite.destroy()` without parameters
- ✅ `sprite.setPosition()` for movement
- ✅ Pots managed in an array for cleaner code
