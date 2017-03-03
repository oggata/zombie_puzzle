//
//  Marker.js
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Marker = cc.Node.extend(
{
    ctor : function (game) 
    {
        this._super();
        this.game = game;

        this.lv = 1;
        this.posX = 0;
        this.posY = 0;

        this.base = cc.Sprite.create("res/maker_000.png");
        this.base.setAnchorPoint(0.5, 0);
        this.addChild(this.base);
        //this.base.setVisible(false);

        this.lv1 = cc.Sprite.create("res/maker_001.png");
        this.lv1.setAnchorPoint(0.5, 0);
        this.addChild(this.lv1);

        this.lv2 = cc.Sprite.create("res/maker_002.png");
        this.lv2.setAnchorPoint(0.5, 0);
        this.addChild(this.lv2);

        this.lv3 = cc.Sprite.create("res/maker_003.png");
        this.lv3.setAnchorPoint(0.5, 0);
        this.addChild(this.lv3);
    },
    init : function () { },

    update : function () 
    {
        this.lv1.setVisible(false);
        this.lv2.setVisible(false);
        this.lv3.setVisible(false);

        if(this.lv == 1){
            this.lv1.setVisible(true);
        }else
        if(this.lv == 2){
            this.lv2.setVisible(true);
        }else
        if(this.lv == 3){
            this.lv3.setVisible(true);
        }

        if(this.posX == 0 || this.posX == 10 || this.posY == 0 || this.posY == 10){
            this.base.setVisible(false);
            this.lv1.setVisible(false);
            this.lv2.setVisible(false);
            this.lv3.setVisible(false);
        }

        return true;
    },
});