import User from "../models/Users";
import { Request, Response } from "express";
import { hashPassword, checkPassword } from "../utils/auth";
import slug from "slug";
export const createAccount = async (req: Request, res: Response) => {

    //manejo de errores

    const { email, password } = req.body;

    const userExists = await User.findOne({ email })

    if (userExists) {
        const error = new Error('Correo ya existe');
        res.status(409).json({ message: error.message });
        return;
    }

    const handle = slug(req.body.handle, '');

    const handleExists = await User.findOne({ handle });

    if (handleExists) {
        const error = new Error('Nombre de usuario ya existe');
        res.status(409).json({ message: error.message });
        return;
    }

    console.log(slug(handle));

    // const hash = await hashPassword(password);
    // User.password = hash;
    // await User.create(req.body);

    // const newUser = new User(req.body);
    // newUser.password = await hashPassword(password);
    // await newUser.save();

    //use user.create

    // await User.create({
    //     ...req.body,
    //     handle:  slug(handle),
    //     password: await hashPassword(password)
    // });

    await User.create({
        ...req.body,
        handle: slug(handle),
        password: await hashPassword(password)
    });

    //res.send('User created');
    res.status(201).json({ message: 'Usuario creado con exito' });

}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    //buscar usuario
    const user = await User.findOne({ email });

    //si no existe
    if (!user) {
        const error = new Error('Usuario no encontrado');
        res.status(404).json({ message: error.message });
        return;
    }

    //comprobar contraseña

    const isValid = await checkPassword(password, user.password);

    if (!isValid) {
        const error = new Error('Contraseña incorrecta');
        res.status(401).json({ message: error.message });
        return;
    }else{
        res.status(200).json({ message: 'Login success' });
    }

}