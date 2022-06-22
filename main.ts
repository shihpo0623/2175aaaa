namespace SpriteKind {
    export const PlayerShot = SpriteKind.create()
    export const LifeBar = SpriteKind.create()
}
function moveSpriteInTime (sprite: Sprite, x: number, y: number, t: number) {
    globalX = x
    globalY = y
    dx = x - sprite.x
    dy = y - sprite.y
    sprite.setVelocity(dx / t, dy / t)
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerShot, function (sprite, otherSprite) {
    if (started) {
        info.changeScoreBy(20)
        辣椒生命 += -1
        music.playTone(208, music.beat(BeatFraction.Eighth))
        生命欄圖片.fillRect(辣椒生命 * 2, 0, 96 - 辣椒生命 * 2, 5, 15)
        生命欄.setImage(生命欄圖片)
        if (辣椒生命 <= 0) {
            game.over(true)
        } else if (辣椒生命 % 12 == 0) {
            preSetBossPosition(80, 30)
        }
    }
    otherSprite.destroy()
})
function spell1 () {
    enemyShootAimingPlayer(辣椒, 90, 5)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    shootBulletFromSprite(維維, 200, -90)
})
function moveSpriteRandom (sprite: Sprite, yLowerBound: number, outerBound: number, v: number) {
    moveSprite(sprite, randint(outerBound, scene.screenWidth() - outerBound), randint(outerBound, yLowerBound), v)
}
function nonSpell1 () {
    for (let index2 = 0; index2 <= MAX - 1; index2++) {
        shootBulletFromSprite(辣椒, 60, 360 / MAX * index2 + offset)
    }
    offset += 13
}
function spell2 () {
    for (let index = 0; index <= 4; index++) {
        shootBulletFromSprite(辣椒, 60, offset + index * 30)
    }
    offset += 23
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(3, 200)
    music.playTone(139, music.beat(BeatFraction.Eighth))
    otherSprite.destroy()
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    controller.moveSprite(維維)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(維維, 50, 50)
})
function preSetBossPosition (x: number, y: number) {
    started = false
    ready = false
    offset = 0
    moveSpriteInTime(辣椒, x, y, 1)
}
function moveSpriteRandomFixedTime (sprite: Sprite, yLowerBound: number, outerBound: number, t: number) {
    moveSpriteInTime(sprite, randint(outerBound, scene.screenWidth() - outerBound), randint(outerBound, yLowerBound), t)
}
function nonSpell2 () {
    for (let index3 = 0; index3 <= MAX - 1; index3++) {
        shootBulletFromSprite(辣椒, 60, 360 / MAX * index3 + offset)
        shootBulletFromSprite(辣椒, 100, 360 / MAX * (index3 + 0.5) + offset)
    }
}
function shootBulletFromSprite (sourceSprite: Sprite, speed: number, angle: number) {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, sourceSprite, speed * Math.cos(angle / 57.3), speed * Math.sin(angle / 57.3))
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
    if (sourceSprite.kind() == SpriteKind.Player) {
        projectile.setKind(SpriteKind.PlayerShot)
        projectile.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . 1 2 1 1 2 1 . . . . . 
            . . . . 1 1 2 1 1 2 1 1 . . . . 
            . . . . 1 1 2 1 1 2 1 1 . . . . 
            . . . . 1 1 2 1 1 2 1 1 . . . . 
            . . . . . 1 2 1 1 2 1 . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
        projectile.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 7 7 7 7 7 . . . . . 
            . . . . . . . . 7 . . . . . . . 
            . . . . . . 2 2 2 2 2 . . . . . 
            . . . . . . . 2 2 2 . . . . . . 
            . . . . . . . 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . 2 2 2 2 . . . . . . . 
            . . . . 2 2 2 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
function moveSprite (sprite: Sprite, x: number, y: number, v: number) {
    globalX = x
    globalY = y
    dx = x - sprite.x
    dy = y - sprite.y
    speed = Math.sqrt(dx * dx + dy * dy)
    if (speed != 0) {
        sprite.setVelocity(dx / speed * v, dy / speed * v)
    }
}
function enemyShootAimingPlayer (sprite: Sprite, speed: number, spread: number) {
    shootBulletFromSprite(sprite, speed, Math.atan2(維維.y - sprite.y, 維維.x - sprite.x) * 57.3 + randint(0 - spread, spread))
}
let lifeBarProgress = 0
let 辣椒Progress = 0
let speed = 0
let projectile: Sprite = null
let ready = false
let started = false
let dy = 0
let dx = 0
let globalY = 0
let globalX = 0
let MAX = 0
let offset = 0
let 生命欄: Sprite = null
let 生命欄圖片: Image = null
let 辣椒: Sprite = null
let 維維: Sprite = null
let 辣椒生命 = 0
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff11ffffffffffffffffffffffff11ff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffff1fffff1111ff1111fffffff1fff111111f1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fff111ff1111fffff1fffffff1fffffffff1fffffff1ffffffff1ff1ff1111fffffffff11111fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffff1ffffff1f11ffff11ffffff1111f1ffff1fffff1ff1ff1fffff1fffffffff1fffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffff1111fff11ff1f1f11111ffffff1fff1111111fff111111111fff1fffffffff1111fff111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff11ffff1fffff1f111f1ff1ff1ffffff1fff1ff11f1fffff1fff1ffff11fffffffff1ff1f1ff1fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffff1fffff1fffff1ff1ff1ffffff1fff1fff1f1fffff1fff1ffff1fff1ffffff1111f1ff1fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffff1fffff1f111111f1f11ffffff1ffffff11f1fffff1ff1fff1111111ffffff1ffff1ff1fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fff1111f11111fff1ffff1fff1fffffffff1fffff11ff1fffff1ff1ffffff1fffffffff1ffff1ff1fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff1fff1ffff1fffffffff1ffff111111fffff111fffffff1fffffffff1f11ffff1f111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffff111fffff1fffffffff1ffff1f1f1fffffff11111ffff1fffffffff1ff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff1ffff111f1fffffff1ff11f1ff1ffffffff11ff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffff11fff1fffffff1ffffff111ffffffff11111ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffff11111ffffffffffffff11ffffffffff1fffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22ffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f2fffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f2ffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2fffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f22ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ff2ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ff22ffffffffffffff7777777777777ffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2fff2fffffffffffffffffff77ffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2fff2fffffffffffffffffff77ffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2fff22ffff2fffffffffffff77ffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ffff2ffff2ffffffff2222222222222ffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22ffff22ff22ffffffff2222222222222ffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f4ffff2f2222fffffff2222222222222ffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ffffffff2444ffff2f22f2fffffff2222222222222ffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ffffffff2444ffff2f22f2fffffff2222222222222ffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22fffffff2f444ffff222ff2ffffff2222222222222fffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22ffffff22f444fffff22ff2ffffff2222222222122fffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2222fffff2fff4ffffff2fff2ffffff222222222212ffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ff22fff22fff4fffff22fff2fffff2222222222212ffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2fff22222ffff4ffffffffff2fffff2222222222212ffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ffffffffff4444fff4f4fff2fffff2222222222212ffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2fffffffff444f4fff4fffff2ffff22222222222222ffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ff44ffff44fff4fff44ffff2ffff22222222222122ffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22f444ff44f5ff44f4444fff2ffff22222222222122ffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22444444ff5ff4444f44fff2fff22222222222222fffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f4ffffff5fffffff4ffff2fff22222222222222fffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f44f555f5f5fffff4fff22ff222222222222222fffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f44f5ff5ff5ffff4fff22f222222222222222ffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2f44f522525ff444ff2222222222222222122ffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222445f2f5ff444ff2222222222222222222fffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22445ff5f444ff22f22222222222222222fffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff224444444f2222222222222222222222ffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22222222222f222222222222222222fffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222ffff22222222222222222222ffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2222222222222222222ffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222222222222222222222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222222222222222222222222ffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222222222222222222222ffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22222222222222fffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
辣椒生命 = 48
info.setLife(25)
info.setScore(0)
music.setVolume(20)
維維 = sprites.create(img`
    . . . . 6 6 6 6 6 6 6 6 . . . . 
    . . . 6 f f f f f f f f 6 . . . 
    . . 6 f f f f f f f f f f 6 . . 
    . 6 f f f f f f f f f f f f 6 . 
    . 6 f f f f f f f f f f f f 6 . 
    . 6 f f f f f f f f f f f f 6 . 
    . 6 f e e e e e e e e e e f 6 . 
    6 f f e f f f e e f f f e f f 6 
    6 f e e e f e e e e f e e e f 6 
    . 6 f e e e e e e e e e e f 6 . 
    . . 6 f e e e f f e e e f 6 . . 
    . 6 e e f 8 8 8 8 8 8 f e e 6 . 
    . 6 e e f 8 8 8 8 8 8 f e e 6 . 
    . 6 e e f 8 8 8 8 8 8 f e e 6 . 
    . . 6 6 6 f f f f f f 6 6 6 . . 
    . . . . 6 f f 6 6 f f 6 . . . . 
    `, SpriteKind.Player)
維維.setPosition(80, 105)
維維.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(維維)
辣椒 = sprites.create(img`
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . 1 f f f f f f 1 . . . . 
    . . . 1 f f f f f f f f 1 . . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f d d d d f f f 1 . . 
    . 1 f f f d f d d f d f f f 1 . 
    . 1 f f f d 2 d d 2 d f f f 1 . 
    . 1 f f f f d d d d f f f f 1 . 
    1 f f f f f f f f f f f f f f 1 
    . 1 f f d f 7 7 7 7 f d f f 1 . 
    . 1 f d d f f 2 2 f f d d f 1 . 
    . . 1 1 f f f 2 2 f f f 1 1 . . 
    . . . 1 f f 2 2 f f f f 1 . . . 
    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
    . . . . 1 f f 1 1 f f 1 . . . . 
    `, SpriteKind.Enemy)
辣椒.setPosition(-16, -16)
生命欄圖片 = image.create(96, 5)
生命欄 = sprites.create(生命欄圖片, SpriteKind.LifeBar)
生命欄.setPosition(80, 5)
生命欄.setFlag(SpriteFlag.Ghost, true)
offset = 0
MAX = 10
let 辣椒可以移動 = true
preSetBossPosition(80, 30)
game.onUpdate(function () {
    if (Math.abs(辣椒.x - globalX) + Math.abs(辣椒.y - globalY) <= 2) {
        辣椒.setVelocity(0, 0)
        if (!(ready)) {
            辣椒Progress += 1
            if (辣椒Progress == 2) {
                辣椒可以移動 = false
            } else {
                if (辣椒Progress == 2) {
                    MAX = 8
                }
                辣椒可以移動 = true
            }
        }
        ready = true
    }
})
game.onUpdateInterval(750, function () {
    if (started) {
        if (辣椒Progress == 3) {
            nonSpell2()
        }
    }
})
game.onUpdateInterval(2500, function () {
    if (started && 辣椒可以移動) {
        moveSpriteRandom(辣椒, 40, 8, 60)
    }
})
game.onUpdateInterval(150, function () {
    if (started) {
        if (辣椒Progress == 2) {
            spell1()
        } else {
            if (辣椒Progress == 4) {
                spell2()
            }
        }
    }
})
game.onUpdateInterval(500, function () {
    if (started) {
        if (辣椒Progress == 1) {
            nonSpell1()
        }
    }
})
game.onUpdateInterval(100, function () {
    if (ready && !(started)) {
        if (lifeBarProgress < 4) {
            生命欄圖片.fillRect(24 * lifeBarProgress, 0, 24, 5, 14 - lifeBarProgress % 2 * 6)
            生命欄圖片.fillRect(24 * lifeBarProgress, 1, 24, 3, lifeBarProgress % 2 * 5 + 4)
            生命欄.setImage(生命欄圖片)
            lifeBarProgress += 1
        } else {
            started = true
        }
    }
})
