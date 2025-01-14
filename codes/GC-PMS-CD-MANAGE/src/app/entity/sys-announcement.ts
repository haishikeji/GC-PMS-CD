import { Page } from './page';
import { SysAnnouncementSend } from './sys-announcement-send';

export class SysAnnouncement extends Page{
    id?:string;
    /**
     * 标题
     */
    titile?:string;
    /**
     * 内容
     */
    msgContent?:string;
    /**
     * 开始时间
     */
    startTime?:string;
    /**
     * 结束时间
     */
    endTime?:string;
    /**
     * 发布人
     */
    sender?:string;
    /**
     * 优先级（L低，M中，H高）
     */
    priority?:string;
    /**
     * 通告对象类型（USER:指定用户，ALL:全体用户）
     */
    msgType?:string;
    /**
     * 发布时间
     */
    sendTime?:string;
    /**
     * 指定用户
     **/
    userIds?:string;

    //接收人
    sysAnnouncementSendList?:SysAnnouncementSend[];
    pkOrg?:string;//组织id
}
