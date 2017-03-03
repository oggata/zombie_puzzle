//
//  Animal.js
//  Yagidan
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Zombie = cc.Node.extend({
    ctor: function(game, posX, posY, direction, colorId, isPlayer) {    
        this._super();
        this.game = game;
        this.zombieId = 999999;
        this.isPlayer = isPlayer;
        this.initTime = 0;
        this.posX = posX;
        this.posY = posY;
        this.direct = "";
        this.hp = 100;
        this.zombieScale = 0.5;
        this.marker = cc.Sprite.create("res/maker_000.png");
        this.marker.setAnchorPoint(0.5, 0);
        this.marker.setVisible(false);
        this.addChild(this.marker);
        var pos = this.game.getBasePosition(this.posX, this.posY);
        this.marker.setPosition(pos[0], pos[1]);

        if(this.isPlayer == true){
            this.spriteWidthCnt = 7;
            this.zombiScale = 0.56;
            this.colorId = 999;
            this.image = "res/human-001.png";
        }else{
            this.spriteWidthCnt = 3;
            this.zombiScale = 0.7;
            if (colorId == 0) {
                var _rand = this.game.getRandNumberFromRange(1, 4);
                this.colorId = _rand;
            } else {
                this.colorId = colorId;
            }
        }

        if(this.colorId == 1){
            var _rand2 = this.game.getRandNumberFromRange(1, 9);
            if(_rand2 == 1){
                this.image = "res/zombie-A-red.png";
            }
            if(_rand2 == 2){
                this.image = "res/zombie-B-red.png";
            }
            if(_rand2 == 3){
                this.image = "res/zombie-C-red.png";
            }
            if(_rand2 == 4){
                this.image = "res/zombie-D-red.png";
            }
            if(_rand2 == 5){
                this.image = "res/zombie-E-red.png";
            }
            if(_rand2 == 6){
                this.image = "res/zombie-F-red.png";
            }
            if(_rand2 == 7){
                this.image = "res/zombie-H-red.png";
            }
            if(_rand2 == 8){
                this.image = "res/zombie-J-red.png";
            }
        }
        if(this.colorId == 2){
            var _rand2 = this.game.getRandNumberFromRange(1, 9);
            if(_rand2 == 1){
                this.image = "res/zombie-A-green.png";
            }
            if(_rand2 == 2){
                this.image = "res/zombie-B-green.png";
            }
            if(_rand2 == 3){
                this.image = "res/zombie-C-green.png";
            }
            if(_rand2 == 4){
                this.image = "res/zombie-D-green.png";
            }
            if(_rand2 == 5){
                this.image = "res/zombie-E-green.png";
            }
            if(_rand2 == 6){
                this.image = "res/zombie-F-green.png";
            }
            if(_rand2 == 7){
                this.image = "res/zombie-H-green.png";
            }
            if(_rand2 == 8){
                this.image = "res/zombie-J-green.png";
            }
        }
        if(this.colorId == 3){
            var _rand2 = this.game.getRandNumberFromRange(1, 9);
            if(_rand2 == 1){
                this.image = "res/zombie-A-yellow.png";
            }
            if(_rand2 == 2){
                this.image = "res/zombie-B-yellow.png";
            }
            if(_rand2 == 3){
                this.image = "res/zombie-C-yellow.png";
            }
            if(_rand2 == 4){
                this.image = "res/zombie-D-yellow.png";
            }
            if(_rand2 == 5){
                this.image = "res/zombie-E-yellow.png";
            }
            if(_rand2 == 6){
                this.image = "res/zombie-F-yellow.png";
            }
            if(_rand2 == 7){
                this.image = "res/zombie-H-yellow.png";
            }
            if(_rand2 == 8){
                this.image = "res/zombie-J-yellow.png";
            }
        }

        this.imgWidth = 160;
        this.imgHeight = 160;
        this.initializeWalkAnimation();

        //init
        this.direction = "";
        this.tmps = [];
        this.flushCnt = 0;
        this.deadCnt = 0;
        //this.isFlush = false;
        this.flushOpacity = 0;
        this.maxDeadCnt = 30;
        this.deleteBonus = DELETE_BONUS;
        this.comboBonusRate = 1;
    },
    init: function() {},

    setBonusRate:function(rate){
        this.comboBonusRate = rate;
    },

    setDeadCnt:function(maxDeadCnt){
        if(this.deadCnt == 0){
            this.maxDeadCnt = maxDeadCnt;
            this.deadCnt = 1;
        }
    },

    saveTmp: function() {
        var tmp = {
            posX: this.posX,
            posY: this.posY,
            direction: this.direction
        };
        this.game.tmps.push(tmp);
    },

    resetPosition: function() {
        var pos = this.game.getBasePosition(this.posX, this.posY);
        this.marker.setPosition(pos[0], pos[1]);
        var markerX = this.marker.getPosition().x;
        var markerY = this.marker.getPosition().y + 40;
        this.sprite.setPosition(
            markerX, markerY
        );
    },

    update: function() {

        if(this.deadCnt >= 1){
            this.deadCnt++;
            if(this.deadCnt >= this.maxDeadCnt){
                this.hp = 0;
            }

            this.flushCnt++;
            if (this.flushCnt >= 3) {
                if (this.flushOpacity == 0.5) {
                    this.flushOpacity = 1;
                    this.flushCnt = 0;
                } else {
                    this.flushOpacity = 0.5;
                    this.flushCnt = 0;
                }
            }
        }else{
            this.flushOpacity = 1;
        }

        this.sprite.setOpacity(255 * this.flushOpacity);

        //mapに入った時に一瞬大きくなる
        this.initTime++;
        if (this.initTime < 6) {
            this.zombieScale += 0.155;
        } else if (6 <= this.initTime && this.initTime <= 10) {
            this.zombieScale -= 0.095;
        } else {
            this.zombieScale = 0.8;
        }
        if (this.zombieScale > 4) {
            this.zombieScale = 4;
        }
        if (this.zombieScale < 0.5) {
            this.zombieScale = 0.5;
        }
        this.sprite.setScale(this.zombieScale, this.zombieScale);

        //先頭以外のspriteは操作を受け付けず、先頭を追従する
        if (this.zombieId >= 1) {
            if(this.game.zombies[0].hp > 0){
                if (this.game.tmps[this.game.tmps.length - this.zombieId]) {
                    this.posX = this.game.tmps[this.game.tmps.length - this.zombieId].posX;
                    this.posY = this.game.tmps[this.game.tmps.length - this.zombieId].posY;
                    this.direct = this.game.tmps[this.game.tmps.length - this.zombieId].direction;
                }
            }else{
                this.posX = this.game.zombies[0].posX;
                this.posY = this.game.zombies[0].posY;
            }
        }

        //先頭のspriteは操作を受け付ける
        if (this.zombieId == 0 && this.hp > 0) {
            this.game.timeCnt++;
            if (this.game.timeCnt >= this.game.maxTimeCnt * 1) {
                this.game.timeCnt = 0;

                if (this.game.gameDirection == "right_up") {
                    if (this.posY > 0) {
                        this.saveTmp();
                        this.posY -= 1;
                        this.direct = "moveToRightUp";
                    }
                }
                if (this.game.gameDirection == "right_down") {
                    if (this.posX < 10) {
                        this.saveTmp();
                        this.posX += 1;
                        this.direct = "moveToRightDown";
                    }
                }
                if (this.game.gameDirection == "left_up") {
                    if (this.posX > 0) {
                        this.saveTmp();
                        this.posX -= 1;
                        this.direct = "moveToLeftUp";
                    }
                }
                if (this.game.gameDirection == "left_down") {
                    if (this.posY < 10) {
                        this.saveTmp();
                        this.posY += 1;
                        this.direct = "moveToLeftDown";
                    }
                }
            }
        }

        if(this.isPlayer == true){
            if(this.posX == 0 || this.posX == 10 || this.posY == 0 || this.posY == 10){
                this.hp = 0;
            }
        }

        if(this.isPlayer == true && this.hp == 0){
            this.changeToDead();
        }else{
            if (this.direct == "moveToRightUp") {
                this.moveToRightUp();
            }
            if (this.direct == "moveToRightDown") {
                this.moveToRightDown();
            }
            if (this.direct == "moveToLeftUp") {
                this.moveToLeftUp();
            }
            if (this.direct == "moveToLeftDown") {
                this.moveToLeftDown();
            }
        }

        var pos = this.game.getBasePosition(this.posX, this.posY);
        this.marker.setPosition(pos[0], pos[1]);
        var markerX = this.marker.getPosition().x;
        var markerY = this.marker.getPosition().y + 30;
        var bikeX = this.sprite.getPosition().x;
        var bikeY = this.sprite.getPosition().y;

        var _dist = Math.sqrt((markerX - bikeX) * (markerX - bikeX) + (markerY - bikeY) * (markerY - bikeY));
        if (_dist <= 7) {
            this.sprite.setPosition(
                markerX, markerY
            );
        } else {
            var dX = markerX - bikeX;
            var dY = markerY - bikeY;
            var rad = Math.atan2(dX, dY);
            var speedX = this.game.markerSpeed * Math.sin(rad);
            var speedY = this.game.markerSpeed * Math.cos(rad);
            this.sprite.setPosition(
                bikeX + speedX,
                bikeY + speedY
            );
        }

        if(this.isPlayer != true && this.hp == 0){
            return false;
        }

        return true;
    },

    remove: function() {
        this.removeChild(this.sprite);
    },

    getDirection: function() {
        return this.direction;
    },

    addEffect:function(){
        var _effect = new Effect(this);
        //var pos = this.getBasePosition(posX,posY);
        //_effect.setPosition(pos[0], pos[1] + 20);
        this.setPosition(0,0);
        this.sprite.addChild(_effect, 9999999);
        //this.effects.push(_effect);
    },

    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 0; i <= this.spriteWidthCnt; i++) {
            var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 3,
                this.imgWidth, this.imgHeight));
            frameSeq.push(frame);
        }
        this.wa = cc.Animation.create(frameSeq, 0.075);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.imgWidth, this.imgHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
        this.sprite.setAnchorPoint(0.5, 0);
        this.sprite.setPosition(
            this.marker.getPosition().x,
            this.marker.getPosition().y + 80
        );

        this.sprite.setScale(1.4,1.4);

    },
    moveToRightDown: function() {
        if (this.direction != "moveToRightDown") {
            this.direction = "moveToRightDown";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i <= this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 0,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.075);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    moveToLeftDown: function() {
        if (this.direction != "moveToLeftDown") {
            this.direction = "moveToLeftDown";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i <= this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 1,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.075);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    moveToLeftUp: function() {
        if (this.direction != "moveToLeftUp") {
            this.direction = "moveToLeftUp";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i <= this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 2,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.075);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    moveToRightUp: function() {
        if (this.direction != "moveToRightUp") {
            this.direction = "moveToRightUp";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i <= this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 3,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.075);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
    changeToDead: function() {
        if (this.direction != "changeToDead") {
            playSE_Dead(this.game.storage);
            this.direction = "changeToDead";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i <= this.spriteWidthCnt; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 4,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.075);
            //this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.ra = cc.Repeat.create(cc.Animate.create(this.wa), 1);
            this.sprite.runAction(this.ra);
        }
    },
});