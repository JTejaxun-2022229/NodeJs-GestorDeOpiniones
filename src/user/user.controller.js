import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userPost = async (req, res) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}

export const userGet = async (req = request, res = response) => {
    const query = { estado: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
    ]);

    res.status(200).json({
        total,
        users
    });
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    res.status(200).json({
        user
    });
}

export const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await User.findByIdAndUpdate(id, resto);

    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: 'User was update',
        user
    });
}
