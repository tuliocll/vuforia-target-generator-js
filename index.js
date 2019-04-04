console.log("inicializando gerador...");

const { createCanvas, Image } = require('canvas');
const canvas = createCanvas(450, 600);
const ctx = canvas.getContext('2d');
const fs = require('fs');

    var index = 0;
    //The name prefix on the file, like "target_A.jpg"
    var targetNamePrefix = "target_";
    //The name o folder or path to save all targets, dont forget the /
    var pathToSave = "/genereted/";

    const imgs_titulos = [
        "resources/imgs_titulo/1.jpg",
        "resources/imgs_titulo/2.jpg",
        "resources/imgs_titulo/3.jpg",
        ];
    
    const imgs_fundos = [
    "resources/imgs_fundo/1.jpg",
    "resources/imgs_fundo/2.jpg",
    "resources/imgs_fundo/3.jpg",
    "resources/imgs_fundo/4.jpg",
    "resources/imgs_fundo/5.jpg",
    "resources/imgs_fundo/6.jpg",
    "resources/imgs_fundo/7.jpg",
    "resources/imgs_fundo/8.jpg",
    "resources/imgs_fundo/9.jpg",
    "resources/imgs_fundo/10.jpg",
    "resources/imgs_fundo/11.jpg",
    "resources/imgs_fundo/12.jpg",
    "resources/imgs_fundo/13.jpg",
    "resources/imgs_fundo/14.jpg",
    "resources/imgs_fundo/15.jpg",
    "resources/imgs_fundo/16.jpg",
    "resources/imgs_fundo/17.jpg",
    "resources/imgs_fundo/18.jpg",
    "resources/imgs_fundo/19.jpg",
    "resources/imgs_fundo/20.jpg",
    ];

    //Configure the size of "pixels" that compose the background
    const tamanhoPixel = {
        altura: 200,
        largura: 150,
        quebraLinha: 3,
        quantidade: 9,
    }
    //Array with image elements
    var objsImagensfundo = preLoad(imgs_fundos);
    var objsImagensTitulo =  preLoad(imgs_titulos);
    //The text that will be show on the target,
    //Here i use only letter, but you can configure the function
    //drawTexte() to words.
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L"];

    function gerarNovo(letra){
        var ii = 0;
        var random = 0;
    
        //drawing the background
        for(var i =0; i< tamanhoPixel.quantidade; i++){
            //get a random index
            random = Math.floor((Math.random() * imgs_fundos.length));
            //mkaing the lines and columns
            if(i<tamanhoPixel.quebraLinha){
                ctx.drawImage(objsImagensfundo[random], (tamanhoPixel.largura*i), 0, tamanhoPixel.largura, tamanhoPixel.altura);
            }else{
                if(i<tamanhoPixel.quebraLinha*2){
                    ctx.drawImage(objsImagensfundo[random], (tamanhoPixel.largura*ii), tamanhoPixel.altura, tamanhoPixel.largura, tamanhoPixel.altura); 
                    ii++;   
                }else{
                    if(ii>=3){
                        ii = 0;
                    }
                    ctx.drawImage(objsImagensfundo[random], (tamanhoPixel.largura*ii), tamanhoPixel.altura*2, tamanhoPixel.largura, tamanhoPixel.altura); 
                    ii++;
                }
            }
        }
        //draw the title, geting a random index too
        random = Math.floor((Math.random() * imgs_titulos.length));
        console.log(random);
        ctx.drawImage(objsImagensTitulo[random], 0, (tamanhoPixel.altura)*2.7, (tamanhoPixel.largura)*3, 65);
        drawText(letra);
    }
    
    //Function to draw the text on the midle of target
    //Actuly configured to letter size a position
    function drawText(text){
        //Drawing the text shadow
        ctx.font = "420px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(text, (tamanhoPixel.largura-50), tamanhoPixel.altura*2.3);
        //Drawing the text
        ctx.font = "420px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(text, (tamanhoPixel.largura-40), tamanhoPixel.altura*2.2);
    }
    
    //Turning all the images path on 
    //Images object, its work like a "preload"
    function preLoad(object){
        var img = new Array();
        for(var i=0; i < object.length; i++){
            img[i] = new Image();
            img[i].src = object[i];
        }
        return img;
    }

    
    function gerarLetras(letra){
        gerarNovo(letra);
        const out = fs.createWriteStream(__dirname + pathToSave + targetNamePrefix + letra +'.jpg')
        const stream = canvas.createJPEGStream()
        stream.pipe(out)
        out.on('finish', () => {
            console.log('Target '+letras[index]+' generated!')
            index++;
            //if have more text in the array execute again
            if(index<letras.length){
                gerarLetras(letras[index]);
            }
        })
    }

//Initialize the program
gerarLetras(letras[index])