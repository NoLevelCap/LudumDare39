function TutorialManager(){
  this.messages = {
    start : new tutorialEvent("Welcome Captain!\nTo " + shipName, "On this screen you choose your\ndestination and manage crew"),
    crewChangeHull : new tutorialEvent("Manning the Hull", "This improves your defence in combat."),
    crewChangeCannons : new tutorialEvent("Manning the Cannons", "This improves your attack in combat."),
    crewChangeSails : new tutorialEvent("Manning the Sails", "This improves your speed and maneuver in combat."),
    crewChangeCooks : new tutorialEvent("Manning the Kitchen", "This improves your happiness in crew.\nThis improves the chance for better events"),
    mapChange : new tutorialEvent("Land Ho!", "You can travel through three routes\nDangerous, Peaceful and Normal."),
    peacefulStart : new tutorialEvent("A peaceful journey", "There are no pirates on these seas\nbut fewer events too."),
    difficultStart : new tutorialEvent("Watch Out!", "Dangerous Seas have more events\nbut more pirates."),
    combatStart : new tutorialEvent("Combat!", "Fire - Launch cannons!\nFlee - Try to run\nFlank - Try to get a better firing position!"),
  }

  this.tutorial = true;

  this.loadMessage = function(messageName){
    if(this.tutorial && !this.messages[messageName].used && !EVENTWINDOW.visible){
      EVENTWINDOW.showEvent(this.messages[messageName]);
      this.messages[messageName].used = true;
    }
  }
}
