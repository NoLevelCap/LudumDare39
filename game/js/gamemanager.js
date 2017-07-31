
var ShipSpeed = .1, pause = false, CrewSwitchingEnabled = true, crew = 8, crewused = 0, karma = .2;

var Gold = 0;

function CheckPassedPOI(){
  if(miniProgressShip.eventPassed){
    eventLoc = miniProgressShip.lastYard / 100;

    if(eventLoc >= 16){
      EndLevel();
      miniProgressShip.eventPassed = false;
      return;
    }

    console.log(LOADEDLEVEL);
    if(LOADEDLEVEL.POI.includes(eventLoc-1)){
      debug.log("Create event");
      EVENTWINDOW.showEvent(DrawEvent());
      pause = true;
    }
    else {
      if (Math.random() <= 0.25 && LOADEDLEVEL.type != getLevelType("peaceful"))
      {

       initCombat();
       pause = true;
      }
    }

//    if(CrewSwitchingEnabled != true){
//      SwitchCover(true);
//    }

//    pause = true;
    miniProgressShip.eventPassed = false;
  }
}

function repairShip()
{
  if (Gold >= 100 - shipHealth)
  {
    Gold -= 100 - shipHealth;
    shipHealth = 100;
  }
}

function buyCrew()
{
  if (Gold >= 40)
  {
    Gold -= 40;
    crew += 1;
    crewValue.text = crewused + "/" + crew;
  }
}

function Sail(){
  if(!pause){
    miniProgressShip.increaseYards(ShipSpeed);
    scrollingBackground.x = -miniProgressShip.yards * 2.1;
    CheckPassedPOI();
  }

  //console.log(miniProgressShip);
}

function SwitchCover(crew){
  debug.log("Show crew " + crew);
  CrewSwitchingEnabled = crew;
  if(CrewSwitchingEnabled){
    submit.Sprite.visible = true;
    canEditPower = true;
//    cover.visible = false;
  } else {
    submit.Sprite.visible = false;
    canEditPower = false;
//    cover.visible = true;
  }
}

function IncreaseGold(val){
  debug.log("Gold! Always believe in you're soul. GOLD: " + Gold + ", NOW: " + (Gold+val));
  Gold += val;
}
