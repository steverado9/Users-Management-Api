import User from "../models/user.model";
import { Op } from "sequelize";
import { WhereOptions } from "sequelize";

type SearchCondition = WhereOptions<User>;

interface IUserRepository {
    save(user: User): Promise<User>;
    retrieveAll(searchParams: { username?: string }): Promise<User[]>;
    retrieveById(userId: number): Promise<User | null>;
    update(user: User): Promise<number>;
    delete(userId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
    async save(user: User): Promise<User> {
        try {
            return await User.create({
                name: user.name,
                username: user.username,
                email: user.email,
                address: user.address,
                phone: user.phone,
                website: user.website,
                company: user.company
            });
        } catch (err) {
            console.log("new error", err);
            throw new Error("failed to create user")
        }
    }

    async retrieveAll(searchParams: { username?: string }): Promise<User[]> {
        try {
            let condition: SearchCondition = {};

            if (searchParams?.username)
                condition.username = { [Op.like]: `%${searchParams.username}%` };
                console.log("condition.username", condition.username);
                

            return await User.findAll({ where: condition });
        } catch (error) {
            throw new Error("Failed to retrieve all users!");
        }
    }

    async retrieveById(userId: number): Promise<User | null> {
        try {
            return await User.findByPk(userId);
        } catch (error) {
            throw new Error(`Failed to retrieve user! with id: ${userId}`)
        }
    }

    async update(user: User): Promise<number> {
        const { id, name, username, email, address, phone, website, company } = user;

        if (!user.id) throw new Error("User ID is required for update.");

        try {
            const affectedRows = await User.update(
                { name, username, email, address, phone, website, company },
                { where: { id: id } }
            );

            return affectedRows[0];
        } catch (error) {
            throw new Error("Failed to update User!");
        }
    }

    async delete(userId: number): Promise<number> {
        try {
            const affectedRows = await User.destroy({ where: { id: userId } });

            return affectedRows;
        } catch (error) {
            throw new Error(`Failed to delete User! with id: ${userId}`);
        }
    }

    async deleteAll(): Promise<number> {
        try {
            return User.destroy({
                where: {},
                truncate: true
            });
        } catch (error) {
            throw new Error("Failed to delete Users!")
        }
    }
}

export default new UserRepository();