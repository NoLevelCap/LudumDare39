
var ShipSpeed = .1, pause = false, CrewSwitchingEnabled = true, crew = 8, crewused = 0, karma = .2;

var Gold = 0;

function CheckPassedPOI(){
  if(miniProgressShip.eventPassed){
    eventLoc = miniProgressShip.lastYard / 100;

    if(LOADEDLEVEL.POI.includes(eventLoc-1)){
      EVENTWINDOW.showEvent(DrawEvent());
    }

    if(CrewSwitchingEnabled != true){
      SwitchCover(true);
    }

    pause = true;
    miniProgressShip.eventPassed = false;
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
  CrewSwitchingEnabled = crew;
  if(CrewSwitchingEnabled){
    cover.visible = false;
  } else {
    cover.visible = true;
  }
}

function IncreaseGold(val){
  debug.log("Gold! Always believe in you're soul. GOLD: " + Gold + ", NOW: " + (Gold+val));
  Gold += val;
}
