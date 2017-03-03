var item001Cnt = 0;
var isCancelAd = false;
var isFailedAd = false;
var GAME_TIME_BONUS = 0;
var CONNECTION_BONUS = 5;
var DELETE_BONUS = 50;
var COMBO_BONUS = 25;

var GameLayer = cc.Layer.extend({
    sprite: null,
    ctor: function(storage, zombies, score) {
        this._super();

        //画面サイズの取得
        this.viewSize = cc.director.getVisibleSize();
        this.storage = storage;

        playBGM(this.storage);

        //cc.log(this.storage);
        var size = cc.winSize;

        //初期値を入れる
        item001Cnt = 0;
        isCancelAd = false;
        isFailedAd = false;
        this.gameDirection = "stop";
        this.tmps = [];
        this.timeCnt = 0;
        this.MAX_TIME_CNT = 14;
        this.MARKER_SPEED = 7;
        this.maxTimeCnt = this.MAX_TIME_CNT;
        this.markerSpeed = this.getMarkerSpeed();
        this.targetBaseNodePosX = 0;
        this.maxScore = this.storage.maxGameScore;
        this.visibleScore = 0;
        this.gameTimeCnt = 0;
        this.gameTime = 0;
        this.gameSpeedLevel = 1;
        this.effects = [];
        this.footerAdCnt = 0;
        this.isAdAvailable = false;
        this.status = "gaming";
        this.score = score;
        this.waitZombies = [];
        //リトライは1回まで
        this.zombies = [];
        this.tmpZombies = zombies;
        if(this.tmpZombies.length == 0){
            this.retryCnt = 0;
        }else{
            this.retryCnt = 1;
        }

        this.baseNode = cc.Node.create();
        this.addChild(this.baseNode);
        this.baseScale = 1;
        this.baseNode.setScale(this.baseScale, this.baseScale);

        this.back = cc.Sprite.create("res/back.png");
        this.back.setAnchorPoint(0, 0);
        this.back.setPosition(0, -200);
        this.baseNode.addChild(this.back);

        this.mapNode = cc.Node.create();
        this.mapNode.setAnchorPoint(0, 0);
        this.baseNode.addChild(this.mapNode);

        this.baseNodePosX = -330;
        this.baseNodePosY = 150;
        this.baseNode.setPosition(this.baseNodePosX, this.baseNodePosY);

        //マップの生成
        this.base = new BaseData();
        this.baseData = this.base.getBasedata();

        //マーカーを配置する
        this.markers = [];
        for (var i = 0; i < this.baseData.length; i++) {
            this.marker = new Marker(this);
            this.marker.posX = this.baseData[i].x;
            this.marker.posY = this.baseData[i].y;
            this.marker.setPosition(this.baseData[i].posX, this.baseData[i].posY);
            this.marker.baseData = this.baseData[i];
            this.mapNode.addChild(this.marker);
            this.markers.push(this.marker);
        }

        //touch
        this.firstTouchX = 0;
        this.firstTouchY = 0;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                var location = touches[0].getLocation();
                event.getCurrentTarget().touchStart(touches[0].getLocation());
            },
            onTouchesMoved: function(touches, event) {
                var location = touches[0].getLocation();
                event.getCurrentTarget().touchMove(touches[0].getLocation());
            },
            onTouchesEnded: function(touches, event) {
                event.getCurrentTarget().touchFinish(touches[0].getLocation());
            }
        }), this);

        //リトライ時には、プレイヤーの後方にゾンビを追従させておく
        if (this.tmpZombies.length == 0) {
            this.addZombie(9, 9, "moveToRightUp", 0, true);
            this.gameSpeedMaxCnt = 6;
        } else {
            this.addZombie(9, 9, "moveToRightUp", 0, true);
            for (var t = 1; t < this.tmpZombies.length; t++) {
                this.addEnemyZombie(9, 10, "moveToRightUp", this.tmpZombies[t].colorId);
            }
            this.gameSpeedMaxCnt = 5;
        }

        //前列を変更するボタンを用意
        this.isChangeBoss = false;
        var changeButton = new cc.MenuItemImage("res/button_change.png", "res/button_change_on.png", function() {
            this.isChangeBoss = true;
        }, this);
        changeButton.setPosition(550, 180);
        var menu001 = new cc.Menu(changeButton);
        menu001.setPosition(0, 0);
        this.addChild(menu001, 99999999);

/*
        this.testLabel = new cc.LabelTTF("", "Arial", 50);
        this.testLabel.setFontFillColor(new cc.Color(255, 191, 0, 255));
        this.testLabel.setAnchorPoint(1, 0);
        this.addChild(this.testLabel);
        this.testLabel.setPosition(100,100);
*/
        this.prepareAdUI();

        this.header = new Header(this);
        this.addChild(this.header);

        this.tutorial = new Tutorial(this);
        this.addChild(this.tutorial);

        this.admobInit();
        this.scheduleUpdate();

        if(this.storage.maxGameScore == 0){
            this.tutorial.tutorialPage = 1;
        }


        this.sendScoreCnt = 0;
        this.sdkboxPlayInit();

        return true;
    },

    prepareAdUI:function(){
        //ゲーム開始時の誘導
        this.gameStartOpacity = 1;
        this.gamestart = cc.Sprite.create("res/gamestart.png");
        this.gamestart.setPosition(320, this.viewSize.height / 2);
        this.addChild(this.gamestart);
        this.gamestart.setOpacity(255 * this.gameStartOpacity);

        //1.ADを表示するかどうか質問する
        this.infoad = cc.Sprite.create("res/infoad.png");
        this.infoad.setPosition(320, this.viewSize.height / 2);
        this.addChild(this.infoad);
        this.infoad.setVisible(false);
        this.buttonYes = new cc.MenuItemImage("res/button_yes.png", "res/button_yes.png", function() {
            //gameover時に出力するadを表示
            if ('undefined' == typeof(sdkbox)) {
                cc.log('sdkbox is undefined');
                return;
            } else {
                if (sdkbox.PluginAdMob.isAvailable("gameover")) {
                    sdkbox.PluginAdMob.show("gameover");
                } else {
                    cc.log('adMob: admob interstitial ad is not ready');
                }
            }
        }, this);
        this.buttonYes.setPosition(120, 60);

        this.buttonNo = new cc.MenuItemImage("res/button_no.png", "res/button_no.png", function() {
            this.goToTopLayer();
            //gameover時に出力するadを表示
            if ('undefined' == typeof(sdkbox)) {
                cc.log('sdkbox is undefined');
                return;
            } else {
                if (sdkbox.PluginAdMob.isAvailable("gameover")) {
                    sdkbox.PluginAdMob.show("gameover");
                } else {
                    cc.log('adMob: admob interstitial ad is not ready');
                }
            }
        }, this);
        this.buttonNo.setPosition(370, 60);

        var menuInfoad = new cc.Menu(this.buttonYes, this.buttonNo);
        menuInfoad.setPosition(0, 0);
        this.infoad.addChild(menuInfoad);

        //2.広告をクリックした後、リトライできる
        this.infoad2 = cc.Sprite.create("res/infoad2.png");
        this.infoad2.setPosition(320, this.viewSize.height / 2);
        this.addChild(this.infoad2);
        this.infoad2.setVisible(false);

        this.buttonRetry = new cc.MenuItemImage("res/button_retry.png", "res/button_retry.png", function() {
            this.goToGameLayer();
            item001Cnt = 999;
        }, this);
        this.buttonRetry.setPosition(250, 50);
        var menuInfoad2= new cc.Menu(this.buttonRetry);
        menuInfoad2.setPosition(0, 0);
        this.infoad2.addChild(menuInfoad2);

        //3.ゲームオーバーになる
        this.gameover = cc.Sprite.create("res/gameover.png");
        this.gameover.setPosition(320, this.viewSize.height / 2);
        this.addChild(this.gameover);
        this.gameover.setVisible(false);

        this.buttonHome = new cc.MenuItemImage("res/button_home.png", "res/button_home.png", function() {
            this.goToTopLayer();
            //gameover時に出力するadを表示
            if ('undefined' == typeof(sdkbox)) {
                cc.log('sdkbox is undefined');
                return;
            } else {
                if (sdkbox.PluginAdMob.isAvailable("gameover")) {
                    sdkbox.PluginAdMob.show("gameover");
                } else {
                    cc.log('adMob: admob interstitial ad is not ready');
                }
            }
        }, this);
        this.buttonHome.setPosition(250, 50);
        var menuGameover = new cc.Menu(this.buttonHome);
        menuGameover.setPosition(0,0);
        this.gameover.addChild(menuGameover);
    },

    changeBoss: function() {
        this.isChangeBoss = false;
        if (this.zombies.length >= 2) {
            this.zombies.push(this.zombies[1]);
            this.zombies.splice(1, 1);
        }
    },

    addZombieToRand: function() {
        var posX = this.getRandNumberFromRange(1, 9);
        var posY = this.getRandNumberFromRange(1, 9);
        this.addZombie(posX, posY, "moveToRightUp", 1, false);
    },

    addZombie: function(posX, posY, direction, colorId, isMain) {
        this.zombie = new Zombie(this, posX, posY, direction, colorId, isMain);
        this.baseNode.addChild(this.zombie, 9999999);
        this.zombies.unshift(this.zombie);
    },

    addEnemyZombie: function(posX, posY, direction, colorId) {
        this.zombie = new Zombie(this, posX, posY, direction, colorId, false);
        this.baseNode.addChild(this.zombie, 9999999);
        this.zombies.push(this.zombie);
    },

    addWaitZombie: function() {
        //同一直線上にならないように + すでにpointされている場所を避ける
        var _isExist = false;
        var _posX = this.getRandNumberFromRange(2, 9);
        var _posY = this.getRandNumberFromRange(2, 9);

        if (this.zombies[0].posX == _posX) {
            _isExist = true;
        }
        if (this.zombies[0].posY == _posY) {
            _isExist = true;
        }
        for (var t = 0; t < this.waitZombies.length; t++) {
            if (this.waitZombies[t].posX == _posX && this.waitZombies[t].posY == _posY) {
                _isExist = true;
            }
        }

        for (var t = 0; t < this.zombies.length; t++) {
            if (this.zombies[t].posX == _posX && this.zombies[t].posY == _posY) {
                _isExist = true;
            }
        }

        if (_isExist == false) {
            var _rand = this.getRandNumberFromRange(1, 5);
            var _direction = "moveToRightUp";
            if(_rand == 2){
                _direction = "moveToLeftUp";
            }
            if(_rand == 3){
                _direction = "moveToRightDown";
            }
            if(_rand == 4){
                _direction = "moveToLeftDown";
            }
            this.zombie = new Zombie(this, _posX, _posY, _direction, 0);
            this.baseNode.addChild(this.zombie, 9999999);
            this.waitZombies.push(this.zombie);
        }
    },

    addEffect: function(posX, posY) {
        var _effect = new Effect(this);
        var pos = this.getBasePosition(posX, posY);
        _effect.setPosition(pos[0], pos[1] + 20);
        this.baseNode.addChild(_effect, 9999999);
        this.effects.push(_effect);
    },

    addEffectByPos: function(x, y) {
        var _effect = new Effect(this);
        _effect.setPosition(x, y);
        this.baseNode.addChild(_effect, 9999999);
        this.effects.push(_effect);
    },

    getMarkerSpeed: function() {
        if (this.MAX_TIME_CNT == 14) {
            return 7;
        }
        if (this.MAX_TIME_CNT == 13) {
            return 7;
        }
        if (this.MAX_TIME_CNT == 12) {
            return 8;
        }
        if (this.MAX_TIME_CNT == 11) {
            return 9;
        }
        if (this.MAX_TIME_CNT == 10) {
            return 10;
        }
        if (this.MAX_TIME_CNT == 9) {
            return 11;
        }
        if (this.MAX_TIME_CNT == 8) {
            return 12;
        }
        if (this.MAX_TIME_CNT == 7) {
            return 13;
        }
        if (this.MAX_TIME_CNT == 6) {
            return 15;
        }
        if (this.MAX_TIME_CNT == 5) {
            return 17;
        }
    },

    setGameSpeedStatus: function(level) {
        this.MAX_TIME_CNT = level + 4;
        this.MARKER_SPEED = this.getMarkerSpeed();
    },

    update: function(dt) {

        this.sendScoreCnt++;
        if(this.sendScoreCnt >= 30 * 30){
            this.sendScoreCnt = 0;
            this.sendScoreToGameCenter(this.storage.maxGameScore);
        }

        this.tutorial.update();

        //フッターのADに関する設定
        if ('undefined' != typeof(sdkbox)) {
            this.footerAdCnt++;
            if (this.footerAdCnt >= 30 * 5) {
                this.footerAdCnt = 30 * 5;
                if (sdkbox.PluginAdMob.isAvailable("footer")) {
                    sdkbox.PluginAdMob.show("footer");
                } else {
                    cc.log('adMob: admob interstitial footer ad is not ready');
                }
            }
        }

        //ゲーム時間の管理
        if (this.gameDirection != "stop") {
            this.gameTimeCnt += 1;
            if (this.gameTimeCnt >= 30) {
                this.gameTimeCnt = 0;
                this.gameTime += 1;
                this.score += GAME_TIME_BONUS;
            }
/*
            //速度を徐々に速くする
            this.gameSpeedLevelCnt++;
            if (this.gameSpeedLevelCnt >= 30 * this.gameSpeedMaxCnt) {
                this.gameSpeedLevelCnt = 0;
                if (this.gameSpeedLevel < 9) {
                    //this.gameSpeedLevel += 1;
                }
            }
            this.setGameSpeedStatus(this.gameSpeedLevel);
*/
        }

        //ゲームオーバ時のステータス管理
        if (this.retryCnt == 0) {
            if (this.zombies[0].hp == 0 && this.gameDirection != "stop") {
                this.gameDirection = "stop";
                if(this.storage.maxGameScore < this.score){
                    this.storage.maxGameScore = this.score;
                    this.storage.saveCurrentData();
                }
            }
        } else {
            if (this.zombies[0].hp == 0 && this.gameDirection != "stop") {
                this.gameDirection = "stop";
                if(this.storage.maxGameScore < this.score){
                    this.storage.maxGameScore = this.score;
                    this.storage.saveCurrentData();
                }
            }
        }

        if(this.zombies[0].hp == 0){
            if(isFailedAd == false && item001Cnt == 0){
                this.infoad.setVisible(true);
            }else{
                this.infoad.setVisible(false);
            }
            if(isFailedAd == false && item001Cnt >= 1){
                this.infoad2.setVisible(true);
            }else{
                this.infoad2.setVisible(false);
            }
            if(this.retryCnt >= 1){
                this.infoad.setVisible(false);
                this.infoad2.setVisible(false);
                this.gameover.setVisible(true);
            }
        }

        //ゲームスタートの案内
        if (this.gameTime != 0) {
            this.gameStartOpacity -= 0.1;
            if (this.gameStartOpacity <= 0) {
                this.gameStartOpacity = 0;
            }
            this.gamestart.setOpacity(255 * this.gameStartOpacity);
        }

        //スコアの表示
        if (this.score > this.visibleScore) {
            if (Math.abs(this.score - this.visibleScore) > 100) {
                this.visibleScore += 100;
            } else if (Math.abs(this.score - this.visibleScore) > 50) {
                this.visibleScore += 50;
            } else if (Math.abs(this.score - this.visibleScore) > 10) {
                this.visibleScore += 10;
            } else if (Math.abs(this.score - this.visibleScore) > 5) {
                this.visibleScore += 5;
            } else {
                this.visibleScore += 1;
            }
        }
        this.header.scoreLabel.setString("" + this.visibleScore);
        this.header.maxScoreLabel.setString("" + this.maxScore);

        //マーカーの制御
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].update();
            if (this.markers[i].posX == this.zombies[0].posX && this.markers[i].posY == this.zombies[0].posY) {
                this.markers[i].lv = 2;
            }
        }

        var _lv1Cnt = 0;
        var _lv2Cnt = 0;
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].lv == 1) {
                _lv1Cnt++;
            }
            if (this.markers[i].lv == 2) {
                _lv2Cnt++;
            }
        }

        var _rate = Math.ceil(_lv2Cnt/81*100);
        if(_rate > 90){
            this.gameSpeedLevel = 1;
        }else if(_rate > 80){
            this.gameSpeedLevel = 2;
        }else if(_rate > 70){
            this.gameSpeedLevel = 3;
        }else if(_rate > 60){
            this.gameSpeedLevel = 4;
        }else if(_rate > 50){
            this.gameSpeedLevel = 5;
        }else if(_rate > 40){
            this.gameSpeedLevel = 6;
        }else if(_rate > 30){
            this.gameSpeedLevel = 7;
        }else if(_rate > 20){
            this.gameSpeedLevel = 8;
        }else{
            this.gameSpeedLevel = 9;
        }
        this.setGameSpeedStatus(this.gameSpeedLevel);

        //エフェクト
        for (var e = 1; e < this.effects.length; e++) {
            if (this.effects[e].update() == false) {
                this.baseNode.removeChild(this.effects[e]);
                this.effects.splice(e, 1);
            }

        }

        //もし列の中にplayerが突っ込んだならhp = 0に成る
        for (var t = 1; t < this.zombies.length; t++) {
            if (this.zombies[t].posX == this.zombies[0].posX && this.zombies[t].posY == this.zombies[0].posY) {
                this.zombies[0].hp = 0;
            }
        }

        //隊列変更
        if (this.isChangeBoss == true) {
            this.changeBoss();
        }

        //待機列の制御
        for (var i = 0; i < this.waitZombies.length; i++) {
            this.waitZombies[i].update();
        }

        //Playerと座標が一致していたらゾンビを列に加える
        if (this.zombies[0].hp > 0) {
            for (var t = 0; t < this.waitZombies.length; t++) {
                if (this.waitZombies[t].posX == this.zombies[0].posX && this.waitZombies[t].posY == this.zombies[0].posY) {
                    if (this.zombies[0].direct == "moveToRightUp") {
                        this.waitZombies[t].moveToRightUp();
                    }
                    if (this.zombies[0].direct == "moveToRightDown") {
                        this.waitZombies[t].moveToRightDown();
                    }
                    if (this.zombies[0].direct == "moveToLeftUp") {
                        this.waitZombies[t].moveToLeftUp();
                    }
                    if (this.zombies[0].direct == "moveToLeftDown") {
                        this.waitZombies[t].moveToLeftDown();
                    }

                    var _top = this.zombies[0];
                    this.zombies.splice(0, 1);

                    this.zombies.unshift(this.waitZombies[t]);
                    this.waitZombies.splice(t, 1);

                    this.zombies.unshift(_top);

                    this.maxTimeCnt = this.MAX_TIME_CNT;
                    this.markerSpeed = this.MARKER_SPEED;

                    this.score += CONNECTION_BONUS;

                    playSE_Connect(this.storage);
                }
            }
        }

        if (this.waitZombies.length <= 4) {
            this.addWaitZombie();
        }

        //先頭から3つが同じ色だったら...
        if (this.zombies.length >= 4) {
            if ((this.zombies[1].colorId == this.zombies[2].colorId) 
                && (this.zombies[2].colorId == this.zombies[3].colorId)
                && (this.zombies[1].deadCnt == 0 && this.zombies[2].deadCnt == 0 && this.zombies[3].deadCnt == 0)
            ) {
                this.zombies[1].setDeadCnt(30 * 1);
                this.zombies[2].setDeadCnt(30 * 1);
                this.zombies[3].setDeadCnt(30 * 1);
                //2階層
                if (this.zombies[4] && this.zombies[5]) {
                    if (this.zombies[4].colorId == this.zombies[5].colorId) {
                        this.zombies[4].setDeadCnt(30 * 2);
                        this.zombies[5].setDeadCnt(30 * 2);
                        this.zombies[4].setBonusRate(2);
                        this.zombies[5].setBonusRate(2);
                        //3階層
                        if (this.zombies[6] && this.zombies[7]) {
                            if (this.zombies[6].colorId == this.zombies[7].colorId) {
                                this.zombies[6].setDeadCnt(30 * 3);
                                this.zombies[7].setDeadCnt(30 * 3);
                                this.zombies[6].setBonusRate(3);
                                this.zombies[7].setBonusRate(3);
                                //4階層
                                if (this.zombies[8] && this.zombies[9]) {
                                    if (this.zombies[8].colorId == this.zombies[9].colorId) {
                                        this.zombies[8].setDeadCnt(30 * 4);
                                        this.zombies[9].setDeadCnt(30 * 4);
                                        this.zombies[8].setBonusRate(4);
                                        this.zombies[9].setBonusRate(4);
                                        //5階層
                                        if (this.zombies[10] && this.zombies[11]) {
                                            if (this.zombies[10].colorId == this.zombies[11].colorId) {
                                                this.zombies[10].setDeadCnt(30 * 5);
                                                this.zombies[11].setDeadCnt(30 * 5);
                                                this.zombies[10].setBonusRate(5);
                                                this.zombies[11].setBonusRate(5);
                                            }
                                            //6階層
                                            if (this.zombies[12] && this.zombies[13]) {
                                                if (this.zombies[12].colorId == this.zombies[13].colorId) {
                                                    this.zombies[12].setDeadCnt(30 * 6);
                                                    this.zombies[13].setDeadCnt(30 * 6);
                                                    this.zombies[12].setBonusRate(6);
                                                    this.zombies[13].setBonusRate(6);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        //後ろ3つが同じ色だったら...
        if (this.zombies.length >= 5) {
            if ((this.zombies[this.zombies.length - 1].colorId == this.zombies[this.zombies.length - 2].colorId) 
                && (this.zombies[this.zombies.length - 2].colorId == this.zombies[this.zombies.length - 3].colorId)
                && (this.zombies[this.zombies.length - 1].deadCnt == 0 && this.zombies[this.zombies.length - 2].deadCnt == 0 && this.zombies[this.zombies.length - 3].deadCnt == 0)
            ) {
                this.zombies[this.zombies.length - 1].setDeadCnt(30 * 1);
                this.zombies[this.zombies.length - 2].setDeadCnt(30 * 1);
                this.zombies[this.zombies.length - 3].setDeadCnt(30 * 1);
                //2階層
                if (this.zombies[this.zombies.length - 4] && this.zombies[this.zombies.length - 5]) {
                    if (this.zombies[this.zombies.length - 4].colorId == this.zombies[this.zombies.length - 5].colorId) {
                        this.zombies[this.zombies.length - 4].setDeadCnt(30 * 2);
                        this.zombies[this.zombies.length - 5].setDeadCnt(30 * 2);
                        this.zombies[this.zombies.length - 4].setBonusRate(2);
                        this.zombies[this.zombies.length - 5].setBonusRate(2);
                        //3階層
                        if (this.zombies[this.zombies.length - 6] && this.zombies[this.zombies.length - 7]) {
                            if (this.zombies[this.zombies.length - 6].colorId == this.zombies[this.zombies.length - 7].colorId) {
                                this.zombies[this.zombies.length - 6].setDeadCnt(30 * 3);
                                this.zombies[this.zombies.length - 7].setDeadCnt(30 * 3);
                                this.zombies[this.zombies.length - 6].setBonusRate(3);
                                this.zombies[this.zombies.length - 7].setBonusRate(3);
                                //4階層
                                if (this.zombies[this.zombies.length - 8] && this.zombies[this.zombies.length - 9]) {
                                    if (this.zombies[this.zombies.length - 8].colorId == this.zombies[this.zombies.length - 9].colorId) {
                                        this.zombies[this.zombies.length - 8].setDeadCnt(30 * 4);
                                        this.zombies[this.zombies.length - 9].setDeadCnt(30 * 4);
                                        this.zombies[this.zombies.length - 8].setBonusRate(4);
                                        this.zombies[this.zombies.length - 9].setBonusRate(4);
                                        //5階層
                                        if (this.zombies[this.zombies.length - 10] && this.zombies[this.zombies.length - 11]) {
                                            if (this.zombies[this.zombies.length - 10].colorId == this.zombies[this.zombies.length - 11].colorId) {
                                                this.zombies[this.zombies.length - 10].setDeadCnt(30 * 5);
                                                this.zombies[this.zombies.length - 11].setDeadCnt(30 * 5);
                                                this.zombies[this.zombies.length - 10].setBonusRate(5);
                                                this.zombies[this.zombies.length - 11].setBonusRate(5);
                                            }
                                            //6階層
                                            if (this.zombies[this.zombies.length - 12] && this.zombies[this.zombies.length - 13]) {
                                                if (this.zombies[this.zombies.length - 12].colorId == this.zombies[this.zombies.length - 13].colorId) {
                                                    this.zombies[this.zombies.length - 12].setDeadCnt(30 * 6);
                                                    this.zombies[this.zombies.length - 13].setDeadCnt(30 * 6);
                                                    this.zombies[this.zombies.length - 12].setBonusRate(6);
                                                    this.zombies[this.zombies.length - 13].setBonusRate(6);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }

        for (var t = 0; t < this.zombies.length; t++) {
            this.zombies[t].zombieId = t;
            if (this.zombies[t].update() == false) {
                this.score += this.zombies[t].deleteBonus * this.zombies[t].comboBonusRate;
                this.addEffectByPos(
                    this.zombies[t].sprite.getPosition().x,
                    this.zombies[t].sprite.getPosition().y
                );
                this.baseNode.removeChild(this.zombies[t]);
                this.zombies.splice(t, 1);
                playSE_Delete(this.storage);
            }
        }

        //スクロール制御
        this.manageMapScroll();
    },

    manageMapScroll: function() {
        if (1 <= this.zombies[0].posX && this.zombies[0].posX <= 9 && 1 <= this.zombies[0].posY && this.zombies[0].posY <= 9) {} else {
            return;
        }
        this.margin = 0;
        if (!this.zombies[0]) return;
        if (this.zombies[0].direction == "moveToRightUp") {
            this.margin = 100;
        }
        if (this.zombies[0].direction == "moveToRightDown") {
            this.margin = 100;
        }
        if (this.zombies[0].direction == "moveToLeftUp") {
            this.margin = -100;
        }
        if (this.zombies[0].direction == "moveToLeftDown") {
            this.margin = -100;
        }
        this.mapPlayerPosX = this.zombies[0].sprite.getPosition().x + this.baseNodePosX;
        if (this.mapPlayerPosX + this.margin >= 640 - 150) {
            this.targetBaseNodePosX = -666;
        } else if (this.mapPlayerPosX + this.margin <= 150) {
            this.targetBaseNodePosX = 0;
        } else {
            this.targetBaseNodePosX = -333;
        }
        if (this.targetBaseNodePosX < this.baseNodePosX) {
            if (Math.abs(this.targetBaseNodePosX - this.baseNodePosX) < 5) {
                this.baseNodePosX = this.targetBaseNodePosX;
            } else {
                this.baseNodePosX -= 5;
            }
        }
        if (this.targetBaseNodePosX > this.baseNodePosX) {
            if (Math.abs(this.targetBaseNodePosX - this.baseNodePosX) < 5) {
                this.baseNodePosX = this.targetBaseNodePosX;
            } else {
                this.baseNodePosX += 5;
            }
        }
        this.baseNode.setPosition(this.baseNodePosX, this.baseNodePosY);
    },

    shuffle: function() {
        return Math.random() - .5;
    },

    getBasePosition: function(x, y) {
        for (var j = 0; j < this.baseData.length; j++) {
            if (this.baseData[j].x == x && this.baseData[j].y == y) {
                return [this.baseData[j].posX, this.baseData[j].posY];
            }
        }
        return [0, 0];
    },

    getMarkerFromPositions: function(posX, posY) {
        var _marker = null;
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].posX == posX && this.markers[i].posY == posY) {
                _marker = this.markers[i];
            }
        }
        return _marker;
    },

    touchStart: function(location) {
        if (this.tutorial.tutorialPage != 0) return;
        this.firstTouchX = location.x;
        this.firstTouchY = location.y;
    },

    touchMove: function(location) {
        if (this.tutorial.tutorialPage != 0) return;
        var roopCnt = 1;
        var dist = Math.sqrt((this.firstTouchX - location.x) * (this.firstTouchX - location.x) + (this.firstTouchY - location.y) * (this.firstTouchY - location.y));
        if (this.isMapMoving == false && dist >= 10) {

            if (this.firstTouchX < location.x && this.firstTouchY < location.y) {
                //右上
                cc.log("右上");
                this.gameDirection = "right_up";
                this.isMapMoving = true;
            } else
            if (this.firstTouchX < location.x && this.firstTouchY > location.y) {
                //右下
                cc.log("右下");
                this.gameDirection = "right_down";
                this.isMapMoving = true;
            } else
            if (this.firstTouchX > location.x && this.firstTouchY < location.y) {
                //左上
                cc.log("左上");
                this.gameDirection = "left_up";
                this.isMapMoving = true;
            } else
            if (this.firstTouchX > location.x && this.firstTouchY > location.y) {
                //左下
                cc.log("左下");
                this.gameDirection = "left_down";
                this.isMapMoving = true;
            } else {

            }
        }
    },
    touchFinish: function(location) {
        if (this.tutorial.tutorialPage != 0) return;
        playSE_Direction(this.storage);
        this.isMapMoving = false;
    },

    getRandNumberFromRange: function(min, max) {
        var rand = min + Math.floor(Math.random() * (max - min));
        return rand;
    },

    //シーンの切り替え----->
    goToTopLayer: function(pSender) {
        var scene = cc.Scene.create();
        //次のステージへいくためにstorageは必ず受けた渡す
        scene.addChild(TopLayer.create(this.storage));
        cc.director.runScene(cc.TransitionFade.create(1.5, scene));
    },

    //シーンの切り替え----->
    goToGameLayer: function(pSender) {
        var scene = cc.Scene.create();
        //次のステージへいくためにstorageは必ず受けた渡す
        scene.addChild(GameLayer.create(this.storage, this.zombies, this.score));
        cc.director.runScene(cc.TransitionFade.create(1.5, scene));
    },

    showInfo: function(text) {
        console.log(text);
        if (this.infoLabel) {
            var lines = this.infoLabel.string.split('\n');
            var t = '';
            if (lines.length > 0) {
                t = lines[lines.length - 1] + '\n';
            }
            t += text;
            this.infoLabel.string = t;
        }
    },

    admobInit: function() {
        if ('undefined' == typeof(sdkbox)) {
            isFailedAd = true;
            this.showInfo('sdkbox is undefined')
            return;
        }
        if ('undefined' == typeof(sdkbox.PluginAdMob)) {
            isFailedAd = true;
            this.showInfo('sdkbox.PluginAdMob is undefined')
            return;
        }

        var self = this
        sdkbox.PluginAdMob.setListener({
            adViewDidReceiveAd: function(name) {
                self.showInfo('adViewDidReceiveAd name=' + name);
            },
            adViewDidFailToReceiveAdWithError: function(name, msg) {
                self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
            },
            adViewWillPresentScreen: function(name) {
                self.showInfo('adViewWillPresentScreen name=' + name);
            },
            adViewDidDismissScreen: function(name) {
                isCancelAd = true;
                self.showInfo('adViewDidDismissScreen name=' + name);
            },
            adViewWillDismissScreen: function(name) {
                self.showInfo('adViewWillDismissScreen=' + name);
            },
            adViewWillLeaveApplication: function(name) {
                self.showInfo('adViewWillLeaveApplication=' + name);
                if (name == "gameover") {
                    //sdkbox.PluginAdMob.hide("gameover");
                    item001Cnt = 1;
                }
            }
        });
        sdkbox.PluginAdMob.init();

        // just for test
        var plugin = sdkbox.PluginAdMob
        if ("undefined" != typeof(plugin.deviceid) && plugin.deviceid.length > 0) {
            this.showInfo('deviceid=' + plugin.deviceid);
            // plugin.setTestDevices(plugin.deviceid);
        }
    },


    //GameCenter
    sdkboxPlayInit: function() {
        if ('undefined' == typeof(sdkbox)) {
            this.showInfo('sdkbox is undefined')
            return;
        }
        if ('undefined' == typeof(sdkbox.PluginSdkboxPlay)) {
            this.showInfo('sdkbox.PluginSdkboxPlay is undefined')
            return;
        }
        if ("undefined" != typeof(sdkbox.PluginSdkboxPlay)) {
            var plugin = sdkbox.PluginSdkboxPlay
            plugin.setListener({
                onScoreSubmitted: function(leaderboard_name, score, maxScoreAllTime, maxScoreWeek, maxScoreToday) {
                    cc.log("on score " + score + " submitted to leaderboard: " + leaderboard_name);
                    cc.log("all time hi " + maxScoreAllTime ? 1 : 0);
                    cc.log("weekly hi " + maxScoreWeek ? 1 : 0);
                    cc.log("daily hi " + maxScoreToday ? 1 : 0);
                },
                onIncrementalAchievementUnlocked: function(achievement_name) {
                    cc.log("incremental achievement " + achievement_name + " unlocked.");
                },
                onIncrementalAchievementStep: function(achievement_name, step) {
                    cc.log("incremental achievent " + achievement_name + " step: " + step);
                },
                onAchievementUnlocked: function(achievement_name, newlyUnlocked) {
                    cc.log("achievement " + achievement_name + " unlocked (new " + newlyUnlocked ? 1 : 0 + ")");
                },
                onConnectionStatusChanged: function(connection_status) {
                    cc.log("connection status change: " + connection_status + " connection_status");
                }
            });
            plugin.init();

        } else {
            printf("no plugin init")
        }
    },
    showGameCenterLeaderboard: function() {
        cc.log("call showGameCenterLeaderboard");
        if ('undefined' == typeof(sdkbox)) {
            this.showInfo('sdkbox is undefined')
            return;
        }
        if ('undefined' == typeof(sdkbox.PluginSdkboxPlay)) {
            this.showInfo('sdkbox.PluginSdkboxPlay is undefined')
            return;
        }
        sdkbox.PluginSdkboxPlay.signin();
        sdkbox.PluginSdkboxPlay.showLeaderboard("zombie_score_list");
        sdkbox.PluginSdkboxPlay.showAchievements();
    },

    sendScoreToGameCenter: function(score) {
        if ('undefined' == typeof(sdkbox)) {
            this.showInfo('sdkbox is undefined')
            return;
        }
        if ('undefined' == typeof(sdkbox.PluginSdkboxPlay)) {
            this.showInfo('sdkbox.PluginSdkboxPlay is undefined')
            return;
        }
        sdkbox.PluginSdkboxPlay.signin();
        sdkbox.PluginSdkboxPlay.submitScore("zombie_score_list", score);
    },
});

GameLayer.create = function(storage, zombies, score) {
    return new GameLayer(storage, zombies, score);
};

var GameLayerScene = cc.Scene.extend({
    onEnter: function(storage) {
        this._super();
        var layer = new GameLayer(storage);
        this.addChild(layer);
    }
});