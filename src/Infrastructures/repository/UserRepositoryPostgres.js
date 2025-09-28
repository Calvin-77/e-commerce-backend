const InvariantError = require('../../Commons/exceptions/InvariantError');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../Domains/users/UserRepository');

class UserRepositoryPostgres extends UserRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async verifyAvailableUsername(username) {
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (result.rowCount) {
            throw new InvariantError('username tidak tersedia');
        }
    }

    async addUser(registerUser) {
        const { username, password, email } = registerUser;
        const id = `user-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, email',
            values: [id, username, password, email],
        };

        const result = await this._pool.query(query);

        return new RegisteredUser({ ...result.rows[0] });
    }

    async getPasswordByUsername(username) {
        const query = {
            text: 'SELECT password FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('username tidak ditemukan');
        }

        return result.rows[0].password;
    }

    async getIdByUsername(username) {
        const query = {
            text: 'SELECT id FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('user tidak ditemukan');
        }

        const { id } = result.rows[0];

        return id;
    }

    async isAdmin(id) {
        const query = {
            text: "SELECT role FROM users WHERE id = $1",
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('user tidak ditemukan');
        }

        return result.rows[0].role;
    }
}

module.exports = UserRepositoryPostgres;