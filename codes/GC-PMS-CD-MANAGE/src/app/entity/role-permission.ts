export class RolePermission {
  id?:string;
  /**
     * 角色id
     */
  roleId?: string

  /**
   * 权限id
   */
  permissionId?: string

  /**
   * 数据权限
   */
  dataRuleIds?: string
  pkOrg?:string;//组织id
}
