import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  deleteConfirmation: boolean;

  constructor(
    private userService: UserService,
    private dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteConfirmation = result;
    });
  }

  deleteUser(id: number) {
    this.openDialog();
    if (this.deleteConfirmation === true) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers();
      });
    } else {

    }
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

}
