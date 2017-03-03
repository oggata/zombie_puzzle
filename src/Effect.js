//
//  Effect.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Effect = cc.Node.extend({
    ctor: function(game) {
        this._super();
        this.game = game;
        this.image = "res/pipo-mapeffect009.png";
        this.itemWidth = 120;
        this.itemHeight = 120;
        this.widthCount = 12;
        this.heightCount = 1;
        this.effectInterval = 0.035;
        //this.effectInterval = 0.1;
        this.initializeWalkAnimation();
        this.effectTime = 0;
    },

    init: function() {},

    update: function() {
        //var _tmpY = this.getPosition().y += 5;
        //this.setPosition(this.getPosition().x,_tmpY);

        this.effectTime++;
        if(this.effectTime >= 30 * 1)
        {
            //this.effectTime = 0;
            return false;
        }
        return true;
    },

    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 0; i < this.heightCount; i++) {
            for (var j = 0; j < this.widthCount; j++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.itemWidth * j, this.itemHeight * i,this.itemWidth, this.itemHeight));
                frameSeq.push(frame);
            }
        }
        this.wa = cc.Animation.create(frameSeq, this.effectInterval);
        this.ra = cc.Repeat.create(cc.Animate.create(this.wa),1);
        //this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.itemWidth, this.itemHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
        this.sprite.setScale(1.5,1.5);
    },
});