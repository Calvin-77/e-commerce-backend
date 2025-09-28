class UserRepository {
    async addUser(registerUser) {
        throw new Error("ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    }

    async verifyAvailableUsername(username) {
        throw new Error("ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    }

    async getPasswordByUsername(username) {
        throw new Error("ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    }

    async getIdByUsername(username) {
        throw new Error("ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    }

    async isAdmin(id) {
        throw new Error("ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    }
}

module.exports = UserRepository;