//
//  Storage.js
//  Yagidan
//
//  Created by Fumitoshi Ogata on 10/10/15.
//  Copyright (c) 2015 http://oggata.github.io All rights reserved.
//

var BaseData = cc.Class.extend(
{
    ctor : function () 
    {
        this.baseData = [];
        this.baseWidth = 148;
        this.baseHeight = 149;
        this.baseTopHeight = 90;
        this.blockPosY = 650 + 160;
    },

    getBasedata: function() {
        //0行目を足す
        var baseObj = {
            x: 0,
            y: 1,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 1, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 1,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 0,
            y: 2,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 2, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 2,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 0,
            y: 3,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 3, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 3,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 0,
            y: 4,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 4, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 0,
            y: 5,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 5, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 0,
            y: 6,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 6, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 0,
            y: 7,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 7, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 0,
            y: 8,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 8, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 0,
            y: 9,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 9, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        //--------

        var baseObj = {
            x: 1,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 9, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 8, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 7, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 6, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 14,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 5, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 15,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 4, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 16,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 3, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 17,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 2, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 18,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 10,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 1, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 19,
        };
        this.baseData.push(baseObj);

        //--------
        var baseObj = {
            x: 10,
            y: 1,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -9, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);
        var baseObj = {
            x: 10,
            y: 2,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -8, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);
        var baseObj = {
            x: 10,
            y: 3,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -7, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
        };
        this.baseData.push(baseObj);
        var baseObj = {
            x: 10,
            y: 4,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -6, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 14,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 10,
            y: 5,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -5, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 15,
        };
        this.baseData.push(baseObj);
        var baseObj = {
            x: 10,
            y: 6,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -4, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 16,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 10,
            y: 7,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -3, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 17,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 10,
            y: 8,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -2, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 18,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 10,
            y: 9,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -1, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 19,
        };
        this.baseData.push(baseObj);

        //--------
        var baseObj = {
            x: 1,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -1, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 1,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -2, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 2,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -3, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 3,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -4, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -5, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -6, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -7, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -8, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 0,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * -9, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);





        //1
        var baseObj = {
            x: 1,
            y: 1,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 0, //592 + this.baseWidth / 2 -148 /2 = 246
            posY: this.blockPosY - this.baseTopHeight / 2 * 2,
        };
        this.baseData.push(baseObj);

        //2
        var baseObj = {
            x: 1,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 3,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 1,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 3,
        };
        this.baseData.push(baseObj);

        //3
        var baseObj = {
            x: 1,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 1,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 4,
        };
        this.baseData.push(baseObj);

        //4
        var baseObj = {
            x: 1,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 1,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 5,
        };
        this.baseData.push(baseObj);

        //5
        var baseObj = {
            x: 1,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 1,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 6,
        };
        this.baseData.push(baseObj);

        //6
        var baseObj = {
            x: 1,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 1,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 7,
        };
        this.baseData.push(baseObj);

        //7
        var baseObj = {
            x: 1,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 1,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 8,
        };
        this.baseData.push(baseObj);

        //9
        var baseObj = {
            x: 1,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -7,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 1,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 7,
            posY: this.blockPosY - this.baseTopHeight / 2 * 9,
        };
        this.baseData.push(baseObj);

        //10
        var baseObj = {
            x: 1,
            y: 9,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -8,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 2,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 1,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 8,
            posY: this.blockPosY - this.baseTopHeight / 2 * 10,
        };
        this.baseData.push(baseObj);

        //9
        var baseObj = {
            x: 2,
            y: 9,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -7,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 3,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 2,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 7,
            posY: this.blockPosY - this.baseTopHeight / 2 * 11,
        };
        this.baseData.push(baseObj);

        //7
        var baseObj = {
            x: 3,
            y: 9,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 4,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 3,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 6,
            posY: this.blockPosY - this.baseTopHeight / 2 * 12,
        };
        this.baseData.push(baseObj);

        //6
        var baseObj = {
            x: 4,
            y: 9,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 5,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 4,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 5,
            posY: this.blockPosY - this.baseTopHeight / 2 * 13,
        };
        this.baseData.push(baseObj);

        //5
        var baseObj = {
            x: 5,
            y: 9,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 14,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 6,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 14,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 14,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 14,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 5,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 4,
            posY: this.blockPosY - this.baseTopHeight / 2 * 14,
        };
        this.baseData.push(baseObj);


        //4
        var baseObj = {
            x: 6,
            y: 9,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 15,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 7,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 15,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 15,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 6,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 3,
            posY: this.blockPosY - this.baseTopHeight / 2 * 15,
        };
        this.baseData.push(baseObj);

        //3
        var baseObj = {
            x: 7,
            y: 9,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 16,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 8,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 16,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 7,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 2,
            posY: this.blockPosY - this.baseTopHeight / 2 * 16,
        };
        this.baseData.push(baseObj);

        //2
        var baseObj = {
            x: 8,
            y: 9,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * -1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 17,
        };
        this.baseData.push(baseObj);

        var baseObj = {
            x: 9,
            y: 8,
            posX: 592 + this.baseWidth / 2 + this.baseWidth / 2 * 1,
            posY: this.blockPosY - this.baseTopHeight / 2 * 17,
        };
        this.baseData.push(baseObj);

        //1
        var baseObj = {
            x: 9,
            y: 9,
            posX: 592 + this.baseWidth / 2 - this.baseWidth / 2 * 0,
            posY: this.blockPosY - this.baseTopHeight / 2 * 18, //650 - 90 /2 * 18
        };
        this.baseData.push(baseObj);

        return this.baseData;
    }
});