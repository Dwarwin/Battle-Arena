export const HeroParts: Parts[] = [
  { part: 'heroHead', checkStatus: false },
  { part: 'heroBody', checkStatus: false },
  { part: 'heroRightHand', checkStatus: false },
  { part: 'heroLeftHand', checkStatus: false },
  { part: 'heroRightLeg', checkStatus: false },
  { part: 'heroLeftLeg', checkStatus: false }
];

export const EnemyHeroParts: Parts[] = [
  { part: 'enemyheroHead', checkStatus: false },
  { part: 'enemyheroBody', checkStatus: false },
  { part: 'enemyheroRightHand', checkStatus: false },
  { part: 'enemyheroLeftHand', checkStatus: false },
  { part: 'enemyheroRightLeg', checkStatus: false },
  { part: 'enemyheroLeftLeg', checkStatus: false }
];

export class Parts {
  part: string;
  checkStatus: boolean;
}
