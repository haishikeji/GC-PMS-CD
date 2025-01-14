import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { getFileListById } from '@shared/utils/file-show';
import { environment } from '@env/environment';

@Component({
  selector: 'app-routes-upload-download',
  templateUrl: './upload-download.component.html',
})
export class RoutesUploadDownloadComponent implements OnInit {
  
  constructor(
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
    //整理文件格式
    getFileListById(this.fileList);
  }

  fileList = [];
  isDownload=true;
/**
 * 文件选择事件
 */
  handleChange(info: any): void {
    this.fileList = info.fileList;
    this.fileList.forEach(element => {
      if(!element.url&&element.response){
        element.url = environment.SERVER_URL + "sys/common/downloadFile/" + element.response.message
      }
    });
  }

  uploadUrlList=[];//保存的文件对象
  save(){
    return new Promise((resolve)=>{
      this.getFileList();//格式化保存的文件地址
      this.close()
      resolve()
    })
  }

  /**
   * 获取文件集合
   */
  getFileList() {
    if (this.fileList != null && this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.uploadUrlList = [
          ...this.uploadUrlList,
          {
            fileUrl: element.response.message, //文件地址
          },
        ];
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
