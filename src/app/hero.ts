export class Hero {
  id: number;
  name: string;
  strength: number;
  dexterity: number;
  constitution: number;
  luck: number;
  freeStats: number;
  heroHP: number;
  evadeChance: number;
  criticalHitChance: number;
  heroDamage: number;

  constructor({id, name, strength, dexterity, constitution, luck}) {
    this.id = id;
    this.name = name;
    this.strength = strength || 10;
    this.dexterity = dexterity || 10;
    this.constitution = constitution || 10;
    this.luck = luck || 10;
    this.freeStats = 50 - this.strength - this.dexterity - this.constitution - this.luck;
    this.heroHP = this.constitution * 10;
    this.evadeChance = Math.round(10 + (this.dexterity - 10) * 7);
    this.criticalHitChance = Math.round(10 + (this.luck - 9) * 10);
    this.heroDamage = 10 + Math.round((this.strength - 10));
  }
}
