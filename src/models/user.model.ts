import { Model,Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "users",
})
export default class Users extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id?: number

    @Column({
        type: DataType.STRING(255),
        field: "username"
    })
    usename?: string

    @Column({
        type: DataType.STRING(255),
        field: "password"
    })
    password?: string;
}