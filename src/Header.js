//
//  Marker.js
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Header = cc.Node.extend(
{
    ctor : function (game) 
    {
        this._super();
        this.game = game;

        this.back2 = cc.Sprite.create("res/back2.png");
        this.back2.setAnchorPoint(0, 0);
        this.back2.setPosition(0, this.game.viewSize.height - 168);
        this.addChild(this.back2);

        this.scoreLabel = new cc.LabelTTF("", "Arial", 50);
        this.scoreLabel.setFontFillColor(new cc.Color(255, 191, 0, 255));
        this.scoreLabel.setAnchorPoint(1, 0);
        this.addChild(this.scoreLabel);
        this.scoreLabel.setPosition(255, this.game.viewSize.height - 70 - 15 * 1);

        this.maxScoreLabel = new cc.LabelTTF("", "Arial", 28);
        this.maxScoreLabel.setFontFillColor(new cc.Color(255, 191, 0, 255));
        this.maxScoreLabel.setAnchorPoint(1, 0);
        this.addChild(this.maxScoreLabel);
        this.maxScoreLabel.setPosition(185, this.game.viewSize.height - 70 - 35 * 2 - 7);
    },
    init : function () { },

    update : function () 
    {
        return true;
    },
});