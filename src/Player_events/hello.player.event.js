const hello = {
    'name': 'hello',
    'callback': (socket, data) => {
        console.log(socket, data);
    }
};

module.exports = hello;
