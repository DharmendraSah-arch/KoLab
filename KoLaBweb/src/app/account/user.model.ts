
import { MvApplication, MvCulture, MvNavigation, MvRoleList } from "src/core/model/base.model";

export interface MvUser {
    UserId: number;
    FullName: string;
    Password: string;
    Email: string;
    IsGraduate:boolean;
    Description:string;
    PhoneNumber:string;
  
}

export interface MvUserFilter {
    StatusIdList: number[];
}

export interface MvNotification {
    NotificationId: number;
    Notification: string;
    Description: string;
    NotificationDate: string;
    Author: string;
}
