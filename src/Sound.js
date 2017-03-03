//
//  Sound.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var playBGM = function(storage){
    if(storage.bgmVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.setMusicVolume(0.4);
        audioEngine.stopMusic();
        audioEngine.playMusic(res.BGM_001_mp3,true); //BGM
    }
};

var stopBGM = function(storage){
    var audioEngine = cc.audioEngine;
    audioEngine.stopMusic();
};

var playSE_Button = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.setEffectsVolume(0.5);
        audioEngine.playEffect(res.SE_001_mp3,false);
    }
};

var playSE_Connect = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.setEffectsVolume(1);
        audioEngine.playEffect(res.SE_Connect_mp3,false);
    }
};

var playSE_Delete = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.setEffectsVolume(0.5);
        audioEngine.playEffect(res.SE_Delete_mp3,false);
    }
};

var playSE_Delete = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.setEffectsVolume(0.5);
        audioEngine.playEffect(res.SE_Delete_mp3,false);
    }
};

var playSE_Direction = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.setEffectsVolume(0.7);
        audioEngine.playEffect(res.SE_Direction_mp3,false);
    }
};
//se_maoudamashii_se_sound04
//SE_Direction_mp3
var playSE_Dead = function(storage){
    if(storage.seVolume != 0)
    {
        var audioEngine = cc.audioEngine;
        audioEngine.setEffectsVolume(0.5);
        audioEngine.playEffect(res.SE_Dead_mp3,false);
    }
};