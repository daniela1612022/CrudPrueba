import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/players.service';
import { Router } from '@angular/router';
import { Player } from 'src/app/commons/interfaces/player.interface';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {

  _playerService = inject(PlayerService);
  _router = inject(Router);

  form = new FormGroup({
    name : new FormControl('',Validators.required),
    decks : new FormArray([])
  });

  get decks(){
    return (this.form.get('decks') as FormArray).controls;
  }

  createDeck(){
    return (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name : new FormControl('',Validators.required),
        cards : new FormControl(null,Validators.required)
      })
    );
  }

  addPlayer(){
    this._playerService.addPlayer({
      id : new Date().getTime().toString(),
      ...this.form.getRawValue(),
    }as Player);
    this._router.navigate(['users']);
  }
}
