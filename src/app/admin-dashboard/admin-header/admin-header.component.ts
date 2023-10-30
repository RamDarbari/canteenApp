import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/services/encryption-service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {}

  get userProfileDetails() {
    const userDetails = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.empDetails
      : '';
    return userDetails;
  }

  get hasToken(): boolean {
    const userJSON = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    return !!userJSON;
  }

  logout() {
    localStorage.clear();
    this.toastr.success('Log-out Successful');
    this.router.navigate(['/home']); // Navigate to the home page
  }
}
