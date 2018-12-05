import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';

import { Hero } from '../hero';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  checkIfNameExist(name: string) {
    return this.http
      .get<Hero[]>(this.heroesUrl).pipe(
      delay(1000),
      map(res => res),
      map(heroes => heroes.filter(hero => hero.name === name)),
      map(heroes => !heroes.length)
  );
  }

  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

  addHero(hero: Hero): Observable<Hero> {
    if ( hero.name.match(/^[a-zA-Z0-9_.-]*$/) ) {
      return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
        catchError(this.handleError<Hero>('addHero'))
      );
    }
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
