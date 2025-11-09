## Enemy info
H:S:A
1. L1 atk	40	50	60
1. L1 def	60	50	40
1. L2 atk	50	60	65	Use Charge
   if status != charge:
      charge
   else:
      attack
1. L2 def	95	40	40	Use HEAL
   if AP == max:
      deffend
   else:
      attack
1. L3 atk	50	80	70	Use Poison
   if player != poison:
      poison
   else:
      attack
1. L3 def	70	50	80	Use Vulnerable
   if player != vulnerable:
      vulnerable
   else:
      attack
1. L4 atk	55	70	100	Use Stun
   if hp < 30:
      defend
   elif:
      Stun every three turn
   else:
      attack
1. L4 def	125	50	50	Use HEAL adn DEFEND
   if hp > 80:
      deffend
   elif hp < 30:
      heal
   else:
      attack
1. L5 atk	70	80	100
   if player != diffend:
      charge
      attack
   else:
      stun
1. L5 def	110	70	70
   if player have any stutus:
      vulnerable
   elif hp < 60
      deffend
1. BOSS atk 200 80 120
   if (player == defend or player == counter) and status != charge:
      charge
   elif player == vulnerable or player == poison or player ==  stun:
      attack
   else:
      random(stun, poison, vulnerable, attack)
1. BOSS atk 250 80 70
   if hp > 150:
      random(stun, poison, vulnerable)
   elif hp > 100:
      attack
   elif hp < 100:
      heal

STUN　On the next turn, the player will be unable to execute any of their three action slots.(able to counter)
POISON Lasts for 3 turns. At the start of each turn, you take **5% of your maximum HP** in damage.
VULNERBLE Lasts for 2 turns. All damage taken is doubled.

## action

ATTACK    2 AP   Deal damage (Attack value)

CHARGE    1 AP    For 3 turns, grants a buff that increases the next ATTACK damage by 20%.

HEAL    4 AP        Restores 100 HP to yourself.

DEFEND    2 AP        Reduces enemy damage taken by 80%.

COUNTER    3 AP    Success: Reflects 1.5 times the damage received. Failure: Takes 20% of maximum HP as damage.

CLEANSE　4 AP   Instantly removes all status ailments. Does not restore HP.

ITEMS: 
- speed potion (make your speed faster by 30%) (rare)
- cleans potion (cleanse all debuff) (common)
- mini health potion (heals 50) (common)
- mega health potion (heals 150) (rare)
- AP potion (Replenish 1) (common)
- spider web (reduces enemy speed by 40% for one turn) (rare)
- spikes reduces enemy speed by 25% for 3 turns (rare)
common items have 60% chance dropping after stage. rare items have 40% chance dropping after stage



You can get 4 ap every single turn 
Start from 8 AP
