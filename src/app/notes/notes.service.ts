import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError,tap ,map,first} from 'rxjs/operators';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NotesService {

  apiUrl = environment.APIEndpoint;  // URL to web api

  constructor(private http: HttpClient) { 
      
  }

  /**
   * Gets all notes api call
   * @returns all notes 
   */
  getAllNotes():Observable<any>{
    return this.http.get<any>(this.apiUrl+'notes');
  }
  /**
   * Gets note byid api call
   * @param id 
   * @returns note byid 
   */
  getNoteByid(id):Observable<any>{
    return this.http.get<any>(this.apiUrl+'notes/'+id);
  }
  /**
   * Adds note api call
   * @param noteObj 
   * @returns note 
   */
  addNote(noteObj):Observable<any>{
    return this.http.post<any>(this.apiUrl+'notes',noteObj);
  }
  /**
   * Edits note api call
   * @param id 
   * @param noteObj 
   * @returns note 
   */
  EditNote(id, noteObj):Observable<any>{
    return this.http.put<any>(this.apiUrl+'notes/'+id,noteObj);
  }
  /**
   * Deletes note byid api call
   * @param id 
   * @returns note byid 
   */
  deleteNoteByid(id):Observable<any>{
    return this.http.delete<any>(this.apiUrl+'notes/'+id);
  }

}
