console.log("inicializando gerador...")

const { createCanvas, Image } = require('canvas')
const canvas = createCanvas(450, 600)
const ctx = canvas.getContext('2d')
const fs = require('fs');

const imgs_titulos = [
    "resources/imgs_titulo/1.jpg",
    "resources/imgs_titulo/2.jpg",
    "resources/imgs_titulo/3.jpg",
    ]
    
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

    const tamanhoPixel = {
        altura: 200,
        largura: 150,
        quebraLinha: 3,
        quantidade: 9,
    }
    
    var objsImagensfundo = preLoad(imgs_fundos);
    var objsImagensTitulo =  preLoad(imgs_titulos);
    
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L"];

    function gerarNovo(letra){
        var ii = 0;
        var random = 0;
    
        //desenhar o fundo
        for(var i =0; i< tamanhoPixel.quantidade; i++){
            
            random = Math.floor((Math.random() * imgs_fundos.length));
    
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

    
        //desenhar o titulo
        random = Math.floor((Math.random() * imgs_titulos.length));
        console.log(random);
        ctx.drawImage(objsImagensTitulo[random], 0, (tamanhoPixel.altura)*2.7, (tamanhoPixel.largura)*3, 65);
    
        //desenhar sombra letra
        ctx.font = "420px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(letra, (tamanhoPixel.largura-50), tamanhoPixel.altura*2.3);
        //desenha letra
        ctx.font = "420px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(letra, (tamanhoPixel.largura-40), tamanhoPixel.altura*2.2);
    }
    
    
    
    
    function preLoad(object){
        var img = new Array();
    
        for(var i=0; i < object.length; i++){
            img[i] = new Image();
            img[i].src = object[i];
        }
        return img;
    }

var index = 0;
function gerarLetras(letra){
    gerarNovo(letra);
const out = fs.createWriteStream(__dirname + '/test'+letra+'.jpg')
const stream = canvas.createJPEGStream()
stream.pipe(out)
out.on('finish', () => {
    console.log('Letras '+letras[index]+' gerada com sucesso!')
    index++;
    if(index<letras.length){
        gerarLetras(letras[index]);
    }
})
}

gerarLetras(letras[index])