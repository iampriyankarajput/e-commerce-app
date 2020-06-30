import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../../models/user";
import { AuthService } from './../../services/auth.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:User;
editProfile : boolean = false; 

  constructor( public authService: AuthService,private actRoute: ActivatedRoute,private toastr: ToastrService) {
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe(res => {
    //   this.currentUser = res.msg;
    // })
    // this.authService.getUserProfile().subscribe((empdata:User)=>{
    //   this.user=empdata;
    // });

   }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params=>{
      let id=params['id'];
      this.authService.getUserProfile().subscribe((empdata:User)=>{
        this.user=empdata;
      });
    });
  }


  submitForm(){
   
    this.editProfile = true;
  }

  cancel(){
    this.editProfile = false;
  }

  edit(user:User){
    this.authService.editUserProfile(user).subscribe((empdata:User)=>{
      this.user=empdata;
    this.editProfile = false;
    this.toastr.success('Profile updated Successfully');

    });
  }
}