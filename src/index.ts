import server from './server';

const port = process.env.PORT || 4000;

//crear servidor
server.listen(port, () => {
    console.log('Server is running...', port);
});
