import {
    existsSync,
    promises
} from "fs";
import {
    createHash
} from "crypto";

class UserManager {

    constructor(path) {
        this.path = path;
        this.users = [];
    }

    async getUsers(queryObj) {
        const limit = queryObj ? queryObj.limit : undefined;

        try {
            if (existsSync(this.path)) {
                const usersFile = await promises.readFile(this.path, 'utf-8');
                const usersData = JSON.parse(usersFile);
                return limit ? usersData.slice(0, +limit) : usersData;
            } else {
                return [];
            }

        } catch (error) {
            throw error
        }
    }

    async addUser(user) {

        const {
            nombres,
            correo,
            telefono,
            code,
            password,
            age
        } = user;

        // validaciones
        if (!nombres || !correo || !telefono || !password || !code || !age) {
            throw new Error('Some data is missing');
        };

        try {

            const users = await this.getUsers();

            if (users.length > 0) {
                const isCodeRepeat = users.some((p) => p.code === code);

                if (isCodeRepeat) {
                    throw new Error('Code already used');
                }
            }

            let id = users.length === 0 ? 1 : users[users.length - 1].id + 1;


            const hashPassword = user.password ? createHash('sha256').update(user.password).digest('hex') : undefined

            const newUser = {
                id,
                ...user,
                password: hashPassword
            };

            users.push(newUser);

            await promises.writeFile(this.path, JSON.stringify(users));

            return newUser;

        } catch (error) {
            throw error
        }
    }

    async getUserById(idUser) {
        try {
            const users = await this.getUsers();

            const user = users.find(p => p.id === idUser)

            if (!user) {
                return null;
            } else {
                return user
            }

        } catch (error) {
            throw error
        }

    }

    async deleteUser(idUser) {

        try {

            const users = await this.getUsers();

            const user = users.find(p => p.id === idUser);

            if (user) {

                const newArrayUsers = users.filter(p => p.id !== idUser);

                await promises.writeFile(this.path, JSON.stringify(newArrayUsers))
            }


            return user

        } catch (error) {
            throw error
        }
    }

    async updateUser(id, obj) {
        try {
            const users = await this.getUsers({})
            const index = users.findIndex(u => u.id === id);

            if (index === -1) {
                return null
            }

            const updateUser = {
                ...users[index],
                ...obj
            };

            users.splice(index, 1, updateUser)

            await promises.writeFile(this.path, JSON.stringify(users))

            return updateUser;

        } catch (error) {
            return error
        }
    }
}

//path del archivo productos
const path = 'users.json';

//instancia de clase importada
const userManager = new UserManager(path);

export default userManager
