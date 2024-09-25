import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.scss'
})
export class MessageFormComponent {
  name = new FormControl('');

  updateName() {
    this.displayStyle = "block"; 
  }

  displayStyle = "none"; 
  
  closePopup() { 
    this.displayStyle = "none"; 
  } 
}
