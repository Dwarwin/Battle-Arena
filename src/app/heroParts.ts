export const HeroParts: Parts[] = [
  { part: 'heroHead', checkStatus: false },
  { part: 'heroBody', checkStatus: false },
  { part: 'heroRightHand', checkStatus: false },
  { part: 'heroLeftHand', checkStatus: false },
  { part: 'heroRightLeg', checkStatus: false },
  { part: 'heroLeftLeg', checkStatus: false }
];

export class Parts {
  part: string;
  checkStatus: boolean;
}
