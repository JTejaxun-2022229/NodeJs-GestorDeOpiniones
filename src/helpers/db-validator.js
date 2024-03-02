import User from '../user/user.model.js';

export const existenteEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
        throw new Error(`Email ${email} is already registered`);
    }
}

export const existeUserById = async (id = '') => {
    const userExist = await User.findById(id);

    if (!userExist) {
        throw new Error(`ID: ${id} do not exist`);
    }
}