import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import User from "./user.model";
import Role from "./role.model";

@Table({
  tableName: "user_roles",
  timestamps: false,
})
export default class UserRole extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Role)
  @Column
  roleId!: number;
}