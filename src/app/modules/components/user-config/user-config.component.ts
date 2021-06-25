import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserConfig } from 'src/app/models/user/user-config';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  user: User;
  userConfig: UserConfig;
  bidPrice = new FormControl();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser().user;
    this.getUserConfig();
  }

  getUserConfig() {
    this.userService.getUserConfig(this.user.id).then(response => {
      this.userConfig = response;
      this.bidPrice.setValue(response.maxBidPrice);
    });
  }

  onSaveConfig(): void {
    if (this.bidPrice.value > 0) {
      this.userConfig.maxBidPrice = this.bidPrice.value;
      this.userService.saveUserConfig(this.userConfig).then(response => {
        this.userConfig = response;
      });
    }
  }

}
