import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {SongInfoComponent} from './song-info/song-info.component';
import {SongEditComponent} from './song-edit/song-edit.component';
import {SongDeleteComponent} from './song-delete/song-delete.component';
import {SongCreateComponent} from './song-create/song-create.component';


const routes: Routes = [
  {path: 'list', component: SongListComponent},
  {path: 'info/:id', component: SongInfoComponent},
  {path: 'edit/:id', component: SongEditComponent},
  {path: 'delete/:id', component: SongDeleteComponent},
  {path: 'create', component: SongCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
