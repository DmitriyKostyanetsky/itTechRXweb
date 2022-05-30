import {Component, OnInit} from '@angular/core';
import {User} from "../user/user";
import {UserService} from "../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @ts-ignore
  public users: User[];
  // @ts-ignore
  public editUser: User;
  // @ts-ignore
  public deleteUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public setEditUser(user: User) {
    this.editUser = user;
  }

  public setDeleteUser(user: User) {
    this.deleteUser = user;
  }

  public searchUser(key: string): void {
    console.log(key)
    const results: User[] = [];
    for (const user of this.users) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }

  public onAddUser(addForm: NgForm) : void {
    // @ts-ignore
    document.getElementById('add-user-form').click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response)
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateUser(user: User) : void {
    // @ts-ignore
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response)
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteUser(userId: number) : void {
    // @ts-ignore
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response)
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
