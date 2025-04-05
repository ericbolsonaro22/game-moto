class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
    des_obj(){
        des.fillStyle = this.a
        des.fillRect(this.x,this.y,this.w,this.h,this.a)
    }
}

class Carro extends Obj{
    dir = 0
    pts = 0
    vida = 5
    frame = 1
    tempo = 0
    desgastePneu = 0  // 0% (novo) até 100% (gasto)

    // ... (métodos já existentes)

    atualizaDesgaste(){
        this.desgastePneu += 0.05  // aumenta com o tempo (pode ajustar)
        if(this.desgastePneu > 100){
            this.desgastePneu = 100
        }
    }

    recuperarPneu(valor){
        this.desgastePneu -= valor
        if(this.desgastePneu < 0){
            this.desgastePneu = 0
        }
    }

    des_car_img(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    anim(nome){
        this.tempo +=1
        if(this.tempo > 12){
            this.tempo = 0
            this.frame +=1
        }
        if(this.frame>4){
            this.frame=1
        }
        this.a = "assets/"+nome+this.frame+".png"
    }

    mov_carro(){
        this.x += this.dir
        if(this.x <= 2){
            this.x = 2
        } else if(this.x >= (500 - this.w - 4)){
            this.x = 500 - this.w - 4
        }
    }

    point(objeto){
        if((objeto.y>=680)&&(objeto.y <= 684)){
            return true
        }else{
            false
        }
    }
    
    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
          (this.x + this.w > objeto.x)&&
          (this.y < objeto.y + objeto.h)&&
          (this.y + this.h > objeto.y)){
            return true
        }else{
            false
        }
    }
}

class PneuNaPista extends Obj {
    ativo = true

    mov_pneu(){
        this.y += 2
        if(this.y >= 780){
            this.reposicionar()
        }
    }

    des_pneu(){
        if(this.ativo){
            let img = new Image()
            img.src = '/img/pneu.png' // coloque um ícone de pneu aí
            des.drawImage(img, this.x, this.y, this.w, this.h)
        }
    }

    reposicionar(){
        this.y = -100
        this.x = Math.floor(Math.random() * (416 - 2 + 1) + 2)
        this.ativo = true
    }

    colid(objeto){
        return (
            this.ativo &&
            this.x < objeto.x + objeto.w &&
            this.x + this.w > objeto.x &&
            this.y < objeto.y + objeto.h &&
            this.y + this.h > objeto.y
        )
    }
}

class Carro2 extends Carro{
    mov_carro2(){
        this.y += 2
        if(this.y >= 780){
            this.recomeca()
        }
    }
    
    recomeca(){
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2)) // quando o carro sair da tela
    }
}

class Estrada extends Obj{
    des_estrada(){
        des.fillStyle = this.a
        des.fillRect(this.x,this.y,this.w,this.h)
    }

    mov_est(){
        this.y += 4
        if(this.y >= 780){
            this.y = -100
        }
    }
}

class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}