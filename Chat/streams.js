const fs = require("fs")
const server = require("http").createServer()

function readFile(){
    // readable stream
    const file = fs.createReadStream("./intro.mp4") // Cuando ya existe un archivo y queremos leerlo

    file.pipe(process.stdout) // Consumir stream: Hacer que fluyan los datos
}

function writeFile(){
    // Writable stream
    const file = fs.createWriteStream("./file.txt")

    for(let i = 0; i<600000;i++){
        file.write(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet porta magna. In vel elementum eros. Phasellus pulvinar, odio iaculis pretium interdum, diam nulla ornare nulla, eget sagittis ipsum lorem non nibh. Nullam non egestas enim. Aenean varius ut nisl non tincidunt. Phasellus faucibus ante ligula, et viverra ex posuere in. Mauris aliquam placerat elit, id fringilla odio dictum consequat. Maecenas metus ex, vehicula id metus et, porta viverra leo. Nulla sed commodo risus, ac suscipit magna.

        Maecenas mattis ante ac neque egestas maximus. Sed porttitor rhoncus est, vel pulvinar felis feugiat vitae. Donec justo ligula, porttitor ac condimentum maximus, auctor vel nibh. Donec vel pellentesque velit. Suspendisse tincidunt pretium ex dapibus consequat. Nulla dapibus nisi ultricies tempor commodo. Ut pharetra ligula nulla, et cursus quam condimentum porttitor. Fusce a lacus eu velit consequat fringilla id id neque. Aenean elementum pharetra eleifend. Nunc semper sed ante ut semper. Curabitur ut sodales est. Curabitur at velit justo. Aliquam vitae enim quis dui commodo pellentesque pharetra sit amet mauris.
        
        Praesent viverra fermentum enim, nec pellentesque nisl dapibus eget. Duis non lectus dictum, pharetra felis eu, interdum elit. Sed vel tincidunt nisl, volutpat efficitur elit. Sed finibus nulla augue, lobortis consequat elit condimentum sit amet. Sed tempor ante lectus, eu consectetur magna semper et. Cras aliquet, sapien eget tempor luctus, eros lacus semper leo, ac mattis leo orci id justo. Curabitur euismod nec ligula vel porttitor. Cras mauris arcu, pellentesque eu nisl vitae, gravida accumsan lacus. In nec odio interdum, aliquet sem vitae, volutpat metus. Sed porttitor mauris sed metus rutrum pulvinar.
        
        Sed cursus consectetur risus, in fermentum est elementum at. Integer nisi sapien, blandit at volutpat in, dignissim quis orci. Proin sed lobortis diam. Aliquam vel pellentesque metus. Pellentesque consectetur, massa at molestie scelerisque, justo nisi laoreet massa, at vulputate lorem turpis id ipsum. Suspendisse elementum consectetur leo, in elementum nulla accumsan non. Curabitur nec enim ac turpis ornare dapibus.
        
        Maecenas sem risus, euismod nec quam in, convallis dignissim lorem. Integer sodales cursus vehicula. Cras facilisis congue sagittis. Sed vel vehicula tellus, vitae convallis mi. Mauris sollicitudin lacus ipsum. Sed faucibus dictum eleifend. Vestibulum dignissim nisl eu porttitor tincidunt. Phasellus tempus, nisi vitae semper venenatis, elit velit lacinia diam, placerat facilisis sapien urna sed erat.`)
    }

    file.end()
}

// readFile()

// writeFile()

server.on('request',(req,res)=>{
    // req: Readable stream
    // res: Writable stream

    // fs.readFile('./file.txt',(err,data)=>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         res.end(data)
    //     }
    // })
    const file = fs.createReadStream('./intro.mp4')

    file.pipe(res)
})

server.listen(4000)