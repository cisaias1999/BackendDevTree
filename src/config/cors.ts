import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {

    // origin: '*',
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['Authorization'],
    // credentials: true,
    // maxAge: 86400

    origin: function (origin, callback) {
        if ( origin === 'http://localhost:5173') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }

}