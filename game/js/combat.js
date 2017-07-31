var flankFlag, enemyHealth, enemyAttack, enemySpeed, playerTurn, enemyTurn, enemyFlank, shipHealth = 100, AITimer, animationTimer, enemyEnter, enemySink, AIShip, animFlee;

// Initialise combat scenario
function initCombat(){
  inCombat = true;
  flankFlag = false;
  enemyHealth = Math.floor((Math.random() * 10) + 5) * 10;
  enemyAttack = Math.floor((Math.random() * 6) + sailsPB.value - 4);
  if (enemyAttack > 12)
  {
    enemyAttack = 12;
  }
  if (enemyAttack < 1)
  {
    enemyAttack = 1;
  }
  enemyEnter = true;
  enemySink = false;
  animFlee = false;
  animationTimer = Math.floor(60 * 3.9);
  enemySpeed = Math.floor((Math.random() * 6) + 3);
  playerTurn = true;
  enemyTurn = false;
  enemyFlank = false;
  AIShip.ShipContainer.x = -960;
  AIShip.ShipContainer.y = 50;
  createMessage("An enemy ship approaches!", "");
}

function createMessage(text, subtext)
{
  pause = true;
  EVENTWINDOW.showEvent(new emptyEvent(text, subtext));
}

function warButtonsVisible()
{
  if (inCombat && playerTurn && !pause && !enemyEnter && !enemySink && !animFlee)
  {
    return true;
  }
  else {
    return false;
  }
}

// Controller for combat scenarios
function combatManager(){
  if (!pause)
  {
    if (enemyEnter)
    {
      animationTimer -= 1;
      AIShip.ShipContainer.x += 6;
      if (animationTimer <= 0)
      {
        enemyEnter = false;
      }
    }
    else if (enemySink)
    {
      animationTimer -= 1;
      AIShip.ShipContainer.y += 2;
      if (animationTimer <= 0)
      {
        enemySink = false;
        inCombat = false;
        enemyHealth = 1;
      }
    }
    else if (animFlee)
    {
      animationTimer -= 1;
      AIShip.ShipContainer.x -= 6;
      if (animationTimer <= 0)
      {
        animFlee = false;
        inCombat = false;
      }
    }
    else {
      if (enemyTurn)
      {
        if (AITimer > 0)
        {
          AITimer -= 1;
        }
        else {
          if (Math.random() < 0.25 && enemyHealth > 30)
          {
            AIFlank();
          }
          else {
            AIFire();
          }
          swapTurns();
        }
      }
    }
    if (enemyHealth <= 0 && !enemySink)
    {
      moneyPlus = Math.floor(Math.random() * 60) + 10
      createMessage("You have sunk the enemy ship!", "You gain " + moneyPlus + " gold");
      Gold += moneyPlus;
      enemySink = true;
      animationTimer = 60 * 4;
    }
  }
}

// Function to swap enemy and player turns
function swapTurns(){
  playerTurn = !playerTurn;
  enemyTurn = !enemyTurn;
  if (enemyTurn)
  {
    AITimer = Math.floor(((Math.random() * 1.5) + 0.5) * 60);
  }
}

// Functions to calculate combat stats

function calcDamage(){
  if (flankFlag == true)
  {
    return Math.floor((cannonPB.value / 12.0) * 150);
  }
  else {
    return Math.floor((cannonPB.value / 12.0) * 75);
  }
}

function calcFleeStat(){
  return (sailsPB.value / 20.0);
}

function calcFlankStat(){
  return (sailsPB.value / 12.0);
}

function calcDefence(){
  return (hullPB.value / 18.0);
}


// User action functions

function Fire(){
  if (warButtonsVisible())
  {
    createMessage("Fire the cannons!", "You hit for " + calcDamage() + " damage");
    enemyHealth -= calcDamage();
    swapTurns();
    flankFlag = false;
  }
}

function Flee(){
  if (warButtonsVisible())
  {
    swapTurns();
    var randVal = Math.random();
    if (randVal < calcFleeStat())
    {
      createMessage("Run away!", "You flee succesfully");
      animFlee = true;
      animationTimer = 60 * 4;
      return true;
    }
    else {
      createMessage("There's no escape...", "You fail to flee");
      flankFlag = false;
      return false;
    }
  }
}

function Flank(){
  if (warButtonsVisible())
  {
    swapTurns();
    var randVal = Math.random();
    if (randVal < calcFlankStat())
    {
      flankFlag = true;
      createMessage("You flank your enemy succesfully", "");
      return true;
    }
    else {
      flankFlag = false;
      createMessage("You fail to flank your enemy", "");
      return false;
    }
  }
}


// AI Functions

function calcAIDamage()
{
  if (enemyFlank == true)
  {
    return Math.floor(((enemyAttack / 12.0) * 150) * (1.0 - calcDefence()));
  }
  else {
    return Math.floor(((enemyAttack / 12.0) * 75) * (1.0 - calcDefence()));
  }
}

function AIFire()
{
  createMessage("Your enemy fires their cannons", "You take " + calcAIDamage() + " points of damage");
  TakeDamage(calcAIDamage());
  enemyFlank = false;
}

function AIFlank()
{
  var randVal = Math.random();
  if (randVal < (enemySpeed / 12.0))
  {
    enemyFlank = true;
    createMessage("Your enemy flanks you", "");
    return true;
  }
  else {
    enemyFlank = false;
    createMessage("Your enemy tries to flank you...", "but fails");
    return false;
  }
}

function TakeDamage(val){
  debug.log("Damage Taken: " + val + ", HEALTH: BF - " + shipHealth + ", AF - " + (shipHealth - val));
  shipHealth -= val;
}

function HealShip(val){
  debug.log("Ship Healed: " + val + ", HEALTH: BF - " + shipHealth + ", AF - " + (shipHealth + val));
  shipHealth += val;
}
