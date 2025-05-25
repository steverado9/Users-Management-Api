import { Model,Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "user",
})
export default class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id!: number

    @Column({
        type: DataType.STRING(255),
        field: "name"
    })
    name?: string

    @Column({
        type: DataType.STRING(255),
        field: "username",
        allowNull: false
    })
    username!: string

    @Column({
        type: DataType.STRING(255),
        field: "email",
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.JSON,
        field: "address"
    })
    address?: Record<string, any> //this is a way of writing object in typescript

    @Column({
        type: DataType.STRING(255),
        field: "phone"
    })
    phone?: string;

    @Column({
        type: DataType.STRING(255),
        field: "website"
    })
    website?: string;

    @Column({
        type: DataType.JSON,
        field: "company"
    })
    company?: Record<string, any>;
}