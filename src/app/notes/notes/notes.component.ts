import { Component, OnInit } from '@angular/core';
import {note} from '../../model/notes';
import { NotesService } from '../notes.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes:note[] = [];
  noteDataObj:any = {};
  selectedNote:any={};
  selectedNoteIndex:number ; 
  constructor(private notesService:NotesService, private tostrService:ToastrService, private spinner: NgxSpinnerService) { 

  }

  ngOnInit() {
    //Get All Notes 
    this.getNotes();
    
  }
  /**
   * Funcion to Gets notes
   */
  getNotes(){
    this.spinner.show();
    this.notesService.getAllNotes().subscribe((data)=>{
      this.notes = data;
      this.spinner.hide();
    },(err)=>{
      this.spinner.hide();
      this.notes = [];
      this.tostrService.error("some error occured","Error!")
    })
  }

  /**
   * Add edit note function on form submit
   * @param noteForm 
   */
  addEditNote(noteForm){
    this.spinner.show();
    if(this.selectedNote.id == undefined){
      //Add Note
      let tmpObj = {
        title:this.noteDataObj.title,
        description:this.noteDataObj.description
      }
      this.notesService.addNote(tmpObj).subscribe((data)=>{
        if(data != undefined && data.id != undefined){
          this.notes.push();
          noteForm.resetForm();
          this.spinner.hide();
        }

      },(err)=>{
        this.spinner.hide();
        this.tostrService.error("some error occured","Error!")
      })
      
    }else{
      //Edit Note
      let tmpObj = {
        title:this.noteDataObj.title,
        description:this.noteDataObj.description
      }
      this.notesService.EditNote(this.selectedNote.id,tmpObj).subscribe((data)=>{
        if(data != undefined && data.id != undefined){
          let index = _.findIndex(this.notes,{id:this.selectedNote.id});
          this.notes[index] = data;
          this.selectedNote = {};
          noteForm.resetForm();
          this.spinner.hide();
        }
      },(err)=>{
        this.tostrService.error("some error occured","Error!");
        this.spinner.hide();
      })
    }
    
  }

  /**
   * Delete notes 
   * @param noteId 
   */
  deleteNote(noteId){
    if(noteId > 0){this.spinner.show();
      this.spinner.show();
      this.notesService.deleteNoteByid(noteId).subscribe((data)=>{
        let index = _.findIndex(this.notes,{id:noteId});
        this.notes.splice(index,1);
        this.spinner.hide();
      },(err)=>{
        this.spinner.hide();
        this.tostrService.error("some error occured","Error!");
      })
    }
  }
  editNote(note){
    this.selectedNote = JSON.parse(JSON.stringify(note));
    this.noteDataObj = JSON.parse(JSON.stringify(note));
  }
}
