//
//  Marker.js
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var Tutorial = cc.Node.extend(
{
    ctor : function (game) 
    {
        this._super();
        this.game = game;

        this.tutorialPage = 0;

        var howToButton = new cc.MenuItemImage("res/button_howto.png", "res/button_howto.png", function() {
            if (this.tutorialPage == 1) {
                this.tutorialPage = 0;
            } else {
                this.tutorialPage = 1;
            }
        }, this);
        howToButton.setPosition(580, this.game.viewSize.height - 60);

        this.tutorial001 = new cc.MenuItemImage("res/tutorial_001.png", "res/tutorial_001.png", function() {
            this.tutorialPage = 2;
        }, this);
        this.tutorial001.setVisible(false);
        this.tutorial001.setPosition(320, this.game.viewSize.height / 2);

        this.tutorial002 = new cc.MenuItemImage("res/tutorial_002.png", "res/tutorial_002.png", function() {
            this.tutorialPage = 3;
        }, this);
        this.tutorial002.setVisible(false);
        this.tutorial002.setPosition(320, this.game.viewSize.height / 2);

        this.tutorial003 = new cc.MenuItemImage("res/tutorial_003.png", "res/tutorial_003.png", function() {
            this.tutorialPage = 0;
        }, this);
        this.tutorial003.setVisible(false);
        this.tutorial003.setPosition(320, this.game.viewSize.height / 2);

        var menu001 = new cc.Menu(howToButton, this.tutorial001, this.tutorial002, this.tutorial003);
        menu001.setPosition(0, 0);
        this.addChild(menu001, 99999999);
    },
    init : function () { },

    update : function () 
    {

        this.tutorial001.setVisible(false);
        this.tutorial002.setVisible(false);
        this.tutorial003.setVisible(false);

        if (this.tutorialPage == 1) {
            this.tutorial001.setVisible(true);
        }
        if (this.tutorialPage == 2) {
            this.tutorial002.setVisible(true);
        }
        if (this.tutorialPage == 3) {
            this.tutorial003.setVisible(true);
        }

        return true;
    },
});