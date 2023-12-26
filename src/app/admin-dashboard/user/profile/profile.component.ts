import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';

interface UserData {
  _id: string;
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  role: string;
  email: string;
  balance: number;
  updatedAt: string;
  wallet: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfileInfo: UserData;
  avatarInitial: string;
  empId: number;

  constructor(
    private http: CommonServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['empId']) {
        this.empId = +params['empId'];
      } else {
        const localStorageEmpId =
          localStorage.getItem('user') &&
          JSON.parse(localStorage.getItem('user')).data.empDetails.EmployeeId;
        this.empId = localStorageEmpId || 0;
      }
      this.getUserProfile();
    });
  }

  isUserProfileRoute(): boolean {
    return this.router.url === '/user-profile/';
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  getUserProfile(): void {
    console.log('kkkkkkkkkkkkkkkkk');
    console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;');

    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    // Get emp_id from query parameters or fallback to the one from localStorage
    const emp_id =
      this.getEmpIdFromQueryParam() ||
      (localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.empDetails.EmployeeId
        : '');

    try {
      if (token && emp_id) {
        console.log('sss');
        this.http.userProfile(token, emp_id).subscribe((response: any) => {
          if (response && response.data && response.data.length > 0) {
            this.userProfileInfo = response.data[0];
            this.setAvatarInitial();
            console.log(response.message);
            console.log(this.userProfileInfo, 'llllllllllll');
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get emp_id from query parameter
  private getEmpIdFromQueryParam(): number {
    const queryParams = new URLSearchParams(window.location.search);
    const empId = queryParams.get('empId');
    return empId ? +empId : null; // Convert empId to number or return null
  }

  setAvatarInitial(): void {
    if (this.userProfileInfo?.FirstName) {
      this.avatarInitial = this.userProfileInfo.FirstName.charAt(0);
    } else {
      this.avatarInitial = '';
    }
  }
}
