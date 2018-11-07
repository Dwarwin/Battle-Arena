import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../hero';

export class InMemoryDataService implements InMemoryDbService {

  // hero id + 1.

  createDb() {
    const heroes = [
      {id: 11, name: 'Lucky', strength: 12, dexterity: 12, constitution: 10, luck: 16},
      {id: 12, name: 'Speedy', strength: 11, dexterity: 16, constitution: 12, luck: 11},
      {id: 13, name: 'Bull', strength: 16, dexterity: 10, constitution: 12, luck: 12},
      {id: 14, name: 'Tower', strength: 13, dexterity: 10, constitution: 17, luck: 10}
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
