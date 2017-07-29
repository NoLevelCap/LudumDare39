
function CheckPassedPOI(){
  if(miniProgressShip.eventPassed){
    eventLoc = miniProgressShip.lastYard % 100;

    if(LOADEDLEVEL.POI.includes(eventLoc)){
      console.log("event location");
    } else {
      console.log("change location");
    }
  }
}
