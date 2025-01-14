import { HttpClient } from '@angular/common/http';


// let aa={a:"rr",bb:"cc"};
//     let bb={a:"11",cc:"22"};

//     var ss=Object.getOwnPropertyNames(aa);
//     var ss2=Object.getOwnPropertyNames(bb);

export function i18nExprot(http: HttpClient) {
  let chan: any = {};
  http.get(`assets/tmp/i18n/zh-CN.json`).subscribe((langData) => {
    chan = langData;
    let eng = {};
    http.get(`assets/tmp/i18n/en-US.json`).subscribe((langData) => {
      eng = langData;
      var chanKey = Object.getOwnPropertyNames(chan);
      var engKey = Object.getOwnPropertyNames(eng);
      chanKey.forEach(element => {
        let chank = element;
        // engKey.forEach(engElement => {
        //   if (chank === engElement) {
            console.log("标识："+chank+"-中文："+chan[chank]+"-英文："+eng[chank])
        //   }
        // });
      });
    });
  })
}

