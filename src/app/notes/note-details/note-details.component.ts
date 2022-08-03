import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NotesService } from 'src/app/core/_services/notes.service';
import { SelectedNoteService } from 'src/app/core/_services/selected-note.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note: any;
  selectedNoteSubscription: Subscription;

  id: number;
  title: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notesService: NotesService,
    private toastr: ToastrService,
    private selectedNoteService: SelectedNoteService
  ) {}

  ngOnInit(): void {
    this.selectedNoteSubscription =
      this.selectedNoteService.getSelectedNote.subscribe({
        next: (note) => {
          this.note = note;
          console.log(this.note);
        },
        error: (error) => {
          console.log(error);
        },
      });

    if (!this.note) {
      this.router.navigateByUrl('/user/notes');
    }
    // this.getNoteById();

    // this.route.params.subscribe((data) => {
    //   this.id = +data['note-title'].split('-')[0];
    //   this.title = data['note-title'].split('-').slice(1).join(' ');
    //   if (!isNaN(this.id)) {
    //     console.log(this.id, this.title, this.note.title);
    //     if (this.note.title !== this.title) {
    //       console.log('title is not equal');
    //     }
    //   }
    // });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log('sub deleted');
    this.selectedNoteSubscription.unsubscribe();
  }

  getNoteById() {
    this.route.params.subscribe((data) => {
      this.id = +data['note-title'].split('-')[0];
      this.title = data['note-title'].split('-').slice(1).join(' ');

      if (!isNaN(this.id)) {
        this.notesService.getNoteById(this.id).subscribe({
          next: (data) => {
            if (data.title !== this.title) {
              this.router.navigateByUrl('/user/notes');
            }
            this.note = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigateByUrl('/user/notes');
          },
        });
      } else {
        this.router.navigateByUrl('/user/notes');
      }
    });
    // console.log(this.router.url.split('/')[4].split('-')[0]);
    // this.id = +this.router.url.split('/')[4].split('-')[0];
    // console.log(this.id);
  }
}
