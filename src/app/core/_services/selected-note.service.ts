import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedNoteService {
  private selectedNote = new BehaviorSubject<any>('');

  constructor() {}

  public selectNote(note) {
    this.selectedNote.next(note);
  }

  public get getSelectedNote() {
    return this.selectedNote.asObservable();
  }
}
