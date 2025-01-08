import { Router } from "express";
import User from '../src/models/Users';
import { createAccount, login } from "./handlers";
import { body } from 'express-validator'
import { handleInputErrors } from "./middleware/validation";
const router = Router();

//routing
router.get('/', (req, res) => {
    res.send('Hello World en Express');
});

router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido'),
    body('name')
        .notEmpty()
        .withMessage('El nombre es requerido'),
    body('email')
        .isEmail()
        .withMessage('El correo es requerido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    handleInputErrors,

    createAccount);


router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El correo es requerido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    handleInputErrors,

    login);


export default router; //exportar router