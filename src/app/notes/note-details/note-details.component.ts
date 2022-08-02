import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/core/_services/notes.service';
import { Note } from 'src/app/_models/note';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note: any;

  id: number;
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private notesService: NotesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNoteById();
  }

  getNoteById() {
    this.route.params.subscribe((data) => {
      this.id = +data['note-title'].split('-')[0];
      this.notesService.getNoteById(this.id).subscribe((data) => {
        this.note = data;
      });
    });
    // console.log(this.router.url.split('/')[4].split('-')[0]);
    // this.id = +this.router.url.split('/')[4].split('-')[0];
    // console.log(this.id);
  }
}
