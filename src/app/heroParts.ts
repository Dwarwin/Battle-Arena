export const HeroParts: Parts[] = [
  { part: 'heroHead', checkStatus: false },
  { part: 'heroBody', checkStatus: false },
  { part: 'heroRightHand', checkStatus: false },
  { part: 'heroLeftHand', checkStatus: false },
  { part: 'heroRightLeg', checkStatus: false },
  { part: 'heroLeftLeg', checkStatus: false }
];

export const EnemyHeroParts: Parts[] = [
  { part: 'enemyHeroHead', checkStatus: false },
  { part: 'enemyHeroBody', checkStatus: false },
  { part: 'enemyHeroRightHand', checkStatus: false },
  { part: 'enemyHeroLeftHand', checkStatus: false },
  { part: 'enemyHeroRightLeg', checkStatus: false },
  { part: 'enemyHeroLeftLeg', checkStatus: false }
];

export class Parts {
  part: string;
  checkStatus: boolean;
}
