function SoundManager(){
  this.sounds = {
    shantyMusic : new Howl({ src: ['sound/shantyMusic.mp3'], autoplay: true, volume: .5, loop: true}),
    combatMusic : new Howl({ src: ['sound/combatMusic.mp3'], autoplay: true, volume: 0, loop: true}),
    pencil : new Howl({ src: ['sound/pencil.mp3'], volume: 3}),
    cannonBlast : new Howl({ src: ['sound/cannonBlast.mp3'], volume: 3}),
  }



  this.playSound = function(name){
    this.sounds[name].play();
  }

  this.shanty = true;

  this.toggleCombat = function(){
    if(this.shanty){
      this.sounds["shantyMusic"].fade(.5, 0, 1000);
      this.sounds["combatMusic"].fade(0, 1.5, 1000);
    } else {
      this.sounds["shantyMusic"].fade(0, 0.5, 1000);
      this.sounds["combatMusic"].fade(1.5, 0, 1000);
    }
    this.shanty = !this.shanty;
  }

}

/*function playAtVolume(m1, volume){
  m1.play();
}*/
