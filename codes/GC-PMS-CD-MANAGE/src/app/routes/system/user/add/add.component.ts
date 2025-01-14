import { I18NService } from '@core';
import { RoleService } from './../../../../services/role.service';
import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, UploadFile, NzNotificationService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { UserService } from 'app/services/user.service';
import { User } from 'app/entity/user';
import { Role } from 'app/entity/role';
import { Page } from 'app/entity/page';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-system-user-add',
  templateUrl: './add.component.html',
  styles: [
    `.footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-top: 1px solid rgb(232, 232, 232);
      padding: 10px 16px;
      text-align: right;
      left: 0px;
      background: #fff;
    }
    .avatar {
      width: 128px;
      height: 128px;
    }
    .upload-icon {
      font-size: 32px;
      color: #999;
    }
    .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }`
  ]
})
export class SystemUserAddComponent implements OnInit {
  constructor(
    private userService: UserService,
    private msg: NzMessageService,
    private notification: NzNotificationService,
    private roleService: RoleService,
    private i18NService: I18NService
  ) { }

  listOfOption: Array<{ label: string; value: string }> = [];
  size = 'default';
  multipleValue = [];
  user: User;
  drawerWidth = 600;
  visible = false;
  isVisible = false;
  roles: Role[];
  selectedroles: string[];

  loading = false;
  avatarUrl: string;
  md5 = require('js-md5');
  tripledes = require("crypto-js/tripledes");
  cryptoJS = require("crypto-js");

  ngOnInit() {
    this.initUsers();
  }
  @Output() afterSave = new EventEmitter<{}>();
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    if (width > 600) {
      this.drawerWidth = 600;
    } else {
      this.drawerWidth = width;
    }
  }

  add() {
    this.visible = true;
    this.getInitData();
  }

  close() {
    this.visible = false;
    this.initUsers();
  }


  save() {
    const email = this.user.email;
    var roleString = "";
    this.selectedroles.forEach(element => {
      if (element != null && element != "") {
        roleString += element + ","
      }
    });
    this.user.selectedroles = roleString.substring(0, roleString.length - 1);
    if (this.user.email) {
      // this.user.email = this.tripledes.encrypt(this.user.email, 'email').toString();
    }
    this.userService.add(this.user).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("new.user.success"), "");
        this.afterSave.emit();
        this.close();
      } else {
        // this.user.email = this.tripledes.decrypt(this.user.email, 'email').toString(this.cryptoJS.enc.Utf8);
        this.notification.error(this.i18NService.fanyi("new.user.failed"),messageShared(this.i18NService,response.message));
      }
    })
  }

  getInitData() {
    var page = new Page();
    page.pageSize = 500;
    this.roleService.getRoles(page).then((response) => {
      this.roles = response.result.records;
    })
  }

  initUsers() {
    this.user = {
      id: "",
      username: "",
      realname: "",
      // password: "",
      salt: "",
      avatar: "",
      birthday: "",
      sex: "",
      email: "",
      phone: "",
      selectedroles: "",
    }
    this.selectedroles = [];
  }

  //--------------------以下是上传头像处理方法----------------------------
  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    console.log(info);
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        this.user.avatar = info.file.response.message;
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}
