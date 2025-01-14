import { environment } from '@env/environment';

/**
 * 处理文件格式
 * @param fileList 文件集合
 */
export function getFileListById(fileList) {
    //文件集合不为空则显示文件下载
    if (fileList != null && fileList.length > 0) {
      fileList.forEach((element, index) => {
        const fileName = setAppendix(element);
        (element.uid = '-1'),
          (element.uid = index + 1),
          (element.name = fileName),
          (element.status = 'done'),
          (element.url = environment.SERVER_URL + 'sys/common/downloadFile/' + element.fileUrl);
        element.response = { message: element.fileUrl };
      });
    }
  }


  //显示路径
  export function setAppendix(file: any) {
    const url = file.fileUrl;
    if (url != null && url !== '') {
      const idx = url.lastIndexOf('/');
      const fileUrl = url.slice(idx + 1);
      const index = fileUrl.lastIndexOf('_');
      const i = fileUrl.lastIndexOf('.');
      const fileName = fileUrl.substring(0, index);
      const fileSuffix = fileUrl.slice(i + 1);
      const f = fileName + '.' + fileSuffix;
      return f;
    }
    return '';
  }