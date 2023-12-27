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
        this.empId = localStorageEmpId;
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
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    // Get emp_id from query parameters
    const emp_id = this.getEmpIdFromQueryParam();

    try {
      if (token) {
        // If empId is available in the query parameters, use it in the API call
        if (emp_id) {
          this.http.userProfile(token, emp_id).subscribe((response: any) => {
            this.handleUserProfileResponse(response);
          });
        } else {
          // If empId is not available, call the API without empId in the URL
          this.http
            .userProfileWithoutEmpId(token)
            .subscribe((response: any) => {
              this.handleUserProfileResponse(response);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  private handleUserProfileResponse(response: any): void {
    if (response && response.statusCode === 200 && response.data) {
      this.userProfileInfo = {
        _id: response.data._id,
        EmployeeId: response.data.EmployeeId,
        FirstName: response.data.FirstName,
        LastName: response.data.LastName,
        role: response.data.role,
        email: response.data.email,
        balance: response.data.balance,
        updatedAt: response.data.updatedAt,
        wallet: response.data.wallet,
      };
      this.setAvatarInitial();
      console.log(response.message);
      console.log(this.userProfileInfo, 'llllllllllll');
    }
  }

  // Function to get emp_id from query parameter
  private getEmpIdFromQueryParam(): number {
    const queryParams = new URLSearchParams(window.location.search);
    const empId = queryParams.get('empId');
    return empId ? +empId : null;
  }

  setAvatarInitial(): void {
    if (this.userProfileInfo?.FirstName) {
      this.avatarInitial = this.userProfileInfo.FirstName.charAt(0);
    } else {
      this.avatarInitial = '';
    }
  }
}
