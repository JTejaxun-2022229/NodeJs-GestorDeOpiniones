import User from '../user/user.model.js';
import Publication from '../publication/publication.model.js'
import Comment from '../comment/comment.model.js'

export const existEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
        throw new Error(`Email ${email} is already registered`);
    }
}

export const existUserById = async (id = '') => {
    const userExist = await User.findById(id);

    if (!userExist) { throw new Error(`User with id: ${id} does not exist`); }
}

export const existPublicationById = async (id = '') => {
    const publicationExist = await Publication.findById(id);

    if (!publicationExist) { throw new Error(`Publicatioin with id: ${id} does not exist`) }
}

export const existCommentById = async (id = '') => {
    const commentExist = await Comment.findById(id);

    if (!commentExist) { throw new Error(`Comment with id: ${id} does not exist`); }
}