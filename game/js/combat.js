var flankFlag, enemyHealth, enemyAttack, enemySpeed, playerTurn, enemyTurn, enemyFlank, shipHealth = 100, AITimer;

// Initialise combat scenario
function initCombat(){
  flankFlag = false;
  enemyHealth = Math.floor((Math.random() * 10) + 5) * 10;
  enemyAttack = (Math.random() * 6) + sailsPB - 3;
  if (enemyAttack > 12)
  {
    enemyAttack = 12;
  }
  enemySpeed = (Math.random() * 6) + 3;
  playerTurn = true;
  enemyTurn = false;
  enemyFlank = false;
}

function createMessage(text)
{
  
}

function warButtonsVisible()
{
  if (inCombat && playerTurn)
  {
    return true;
  }
  else {
    return false;
  }
}

// Controller for combat scenarios
function combatManager(){
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

// Function to swap enemy and player turns
function swapTurns(){
  playerTurn = !playerTurn;
  enemyTurn = !enemyTurn;
  if (enemyTurn)
  {
    AITimer = (Math.floor(Math.random() * 5) + 2) * 60;
  }
}

// Functions to calculate combat stats

function calcDamage(){
  if (flankFlag == true)
  {
    return (cannonPB / 12.0) * 150;
  }
  else {
    return (cannonPB / 12.0) * 75;
  }
}

function calcFleeStat(){
  return (sailsPB / 20.0);
}

function calcFlankStat(){
  return (sailsPB / 12.0);
}

function calcDefence(){
  return (hullPB / 18.0);
}


// User action functions

function Fire(){
  if (warButtonsVisible())
  {
    enemyHealth -= calcDamage();
    swapTurns();
  }
}

function Flee(){
  if (warButtonsVisible())
  {
    swapTurns();
    var randVal = Math.random();
    if (randVal < calcFleeStat())
    {
      return true;
    }
    else {
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
      return true;
    }
    else {
      flankFlag = false;
      return false;
    }
  }
}


// AI Functions

function calcAIDamage()
{
  if (enemyFlank == true)
  {
    return (enemyAttack / 12.0) * 150;
  }
  else {
    return (enemyAttack / 12.0) * 75;
  }
}

function AIFire()
{
  TakeDamage(calcAIDamage());
}

function AIFlank()
{
  var randVal = Math.random();
  if (randVal < (enemySpeed / 12.0))
  {
    enemyFlank = true;
    return true;
  }
  else {
    enemyFlank = false;
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
