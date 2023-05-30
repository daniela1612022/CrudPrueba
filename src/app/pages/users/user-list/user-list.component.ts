import { Component , inject ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from 'src/app/services/players.service'
import { FormControl ,ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import { Player } from 'src/app/commons/interfaces/player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  _playerService = inject(PlayerService);
  players$! : Observable<Player[]>;
  searcher = new FormControl('');
  _router = inject(Router);

  ngOnInit(){
    //this._playerService.getPlayer().subscribe((res)=> console.log(res));
    this.players$ = this._playerService.getPlayer();
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe(search => {
      console.log(search);
      if(search){
        this.players$ = this._playerService.getPlayer(search);
      }else{
        this.players$ = this._playerService.getPlayer();
      }
    })
  }

  editPlayer(player : Player){
    this._router.navigateByUrl('users/edit' , {state:{player}});
  }

  deletePlayer(player : Player){
    if(confirm(`Seguro de borrar a ${player.name}`)){
      this._playerService.deletePlayer(player.id);
    }
  }
}
