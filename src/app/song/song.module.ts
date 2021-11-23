import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { SongListComponent } from './song-list/song-list.component';
import { SongCreateComponent } from './song-create/song-create.component';
import { SongInfoComponent } from './song-info/song-info.component';
import { SongDeleteComponent } from './song-delete/song-delete.component';
import { SongEditComponent } from './song-edit/song-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SongListComponent, SongCreateComponent, SongInfoComponent, SongDeleteComponent, SongEditComponent],
  imports: [
    CommonModule,
    SongRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SongModule { }
