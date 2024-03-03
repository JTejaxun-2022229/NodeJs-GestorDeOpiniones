'use strict';

import User from '../user/user.model.js';
import Publication from './publication.model.js';

export const postPublication = async (req, res) => {
    const data = req.body;

    const user = await User.findOne({ email: data.email });

    if (!user) return res.status(404).send({ message: 'User not found' });

    const publication = new Publication({
        ...data,
        user: user._id,
    });

    await publication.save();

    res.status(200).json({
        publication
    });
}

export const publicationGet = async (req, res) => {
    const { limit, from } = req.query;
    const query = { status: true };

    try {
        const publications = await Publication.find(query)
            .skip(Number(from))
            .limit(Number(limit));

        const userDoPublication = await Promise.all(publications.map(async (publication) => {
            const publisher = await User.findById(publication.user);
            return {
                ...publication.toObject(),
                user: publisher ? publisher.name : "Publisher not found",
            };
        }));

        const total = await Publication.countDocuments(query);

        res.status(200).json({
            total,
            publications: userDoPublication,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getPublicationById = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        const publisher = await User.findById(publication.user);

        res.status(200).json({
            publication: {
                ...publication.toObject(),
                user: publisher ? publisher.name : "Publisher not found",
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deletePublication = async (req, res) => {
    const { id } = req.params;

    await Publication.findByIdAndUpdate(id, { status: false });

    res.status(200).json({ msg: 'Publication deleted succesful' });
}