const encoding = require('./encoding.js');
// connection to the website
function connectToClient(io){

    //connect web server
    // ket noi vao web server
    io.on('connection', (socket) => {
         console.log(socket.id + " websocket connection website..."); 
        //user disconnect server
        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnect to server`);
        });
        //gui du lieu den client
        //send object to client
        socket.emit('encoding', encoding.convertStringToHex1);
        //mã hóa tên server trả về client
        //encode server name return to client
        socket.emit(encoding.convertStringToHex1,
            [1,2,3,4],
            [
                {
                    img:`<a href="/"><img src="./image/clearlove7.png" alt="banner"></a>`,
                    author : "Clearlove7",
                    address : "31 Nguyen Khuyen",
                    header: "Header"
                }
            ] 
        );
    });
}

module.exports = {
    connectToClient: connectToClient
};


















