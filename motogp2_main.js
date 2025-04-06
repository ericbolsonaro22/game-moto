let des = document.getElementById('des').getContext('2d')

let c1 = new Carro(225,450,50,80,'darkblue')
let carro = new Carro(225,550,45,100,'/img/moto01.png')
let c2 = new Carro2(400,-40,45,100,'/img/moto02.png')
let c3 = new Carro2(200,-280,45,100,'/img/moto03.png')
let c4 = new Carro2(200,-280,45,100,'/img/moto04.png')
let pneuPickup = new PneuNaPista(100, -200, 50, 50, '/img/pneu.png')
let ee = new Estrada(2,2,10,696,'red')
let ed = new Estrada(488,2,10,696,'red')
let ec1 = new Estrada(246,10,10,80,'white')
let ec2 = new Estrada(246,150,10,80,'white')
let ec3 = new Estrada(246,290,10,80,'white')
let ec4 = new Estrada(246,430,10,80,'white')
let ec5 = new Estrada(246,570,10,80,'white')
let ec6 = new Estrada(246,690,10,80,'white')
let ec7 = new Estrada(246,810,10,80,'white')

let t1 = new Text()
let t2 = new Text()
let t3 = new Text()
let t4 = new Text()
let t5 = new Text()
let t6 = new Text()
let t7 = new Text()

let motor = new Audio('/sounds/motor.wav')
let batida = new Audio('/sounds/batida.mp3')
let msc_final = new Audio('/sounds/msc_final.mp3')
motor.volume = 0.8
motor.loop = true
batida.volume = 0.3
msc_final.volume = 0.3

let jogar = true


document.addEventListener('keydown',(e)=>{
    if(e.key === 'a'){
        carro.dir = -12
    }else if(e.key === 'd'){
        carro.dir = 12
    }
})
document.addEventListener('keyup', (e)=>{
    if(e.key === 'a'){
        carro.dir = 0
    }else if(e.key === 'd'){
        carro.dir = 0
    }
})

function game_over(){
    if(carro.vida <= 0 || carro.desgastePneu >= 100){
        jogar = false
        motor.pause()
        msc_final.play()

        let div = document.createElement('div')
        div.id = 'game-over-menu'
        div.style.position = 'absolute'
        div.style.top = '50%'
        div.style.left = '50%'
        div.style.transform = 'translate(-50%, -50%)'
        div.style.display = 'flex'
        div.style.flexDirection = 'column'
        div.style.alignItems = 'center'
        div.style.gap = '10px'
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        div.style.padding = '20px'
        div.style.borderRadius = '10px'

        let gif = document.createElement('img')
        gif.src = '/img/gameover.gif'
        gif.style.width = '450px'
        gif.style.height = 'auto'
        gif.style.paddingBottom = '20px'
        div.appendChild(gif)

        let btnRetry = document.createElement('button')
        btnRetry.textContent = 'Recomeçar Fase'
        btnRetry.onclick = () => window.location.reload()
        div.appendChild(btnRetry)

        let btnHome = document.createElement('button')
        btnHome.textContent = 'Voltar ao Início'
        btnHome.onclick = () => window.location.href = 'index.html'
        div.appendChild(btnHome)

        for (let btn of [btnRetry, btnHome]) {
            btn.style.padding = '10px 20px'
            btn.style.fontSize = '18px'
            btn.style.cursor = 'pointer'
            btn.style.borderRadius = '10px'
            btn.style.border = 'none'
            btn.style.backgroundColor = 'darkred'
            btn.style.color = 'white'
        }

        btnRetry.style.marginBottom = '8px'

        document.body.appendChild(div)
    }
}

function pontos(){
    if(carro.point(c2)){
        carro.pts +=1
    }else if(carro.point(c3)){
        carro.pts += 1
    }else if(carro.point(c4)){
        carro.pts += 1
    }
}

function colisao(){
    if(carro.colid(c2)){
        carro.vida -= 1
        c2.recomeca()
        batida.play()
    }else if(carro.colid(c3)){
        carro.vida -= 1
        c3.recomeca()
        batida.play()
    } else if(carro.colid(c4)){
        carro.vida -= 1
        c4.recomeca()
        batida.play()
    }
}

function desenha() {
    t1.des_text('Pontos: ', 360, 24, 'yellow', '26px Times')
    t2.des_text(carro.pts, 442, 24, 'yellow', '26px Times')
    t3.des_text('Vida: ', 40, 24, 'yellow', '26px Times')
    t4.des_text(carro.vida, 100, 24, 'yellow', '26px Times')
    t5.des_text('Desgaste do pneu:', 40, 50, 'yellow', '20px Times')
    
    let desgasteTexto = Math.floor(carro.desgastePneu) + "%"
    t5.des_text(desgasteTexto, 210, 50, 'yellow', '20px Times')

    if (jogar) {
        ee.des_estrada()
        ed.des_estrada()
        ec1.des_estrada()
        ec2.des_estrada()
        ec3.des_estrada()
        ec4.des_estrada()
        ec5.des_estrada()
        ec6.des_estrada()
        ec7.des_estrada()
        c2.des_car_img()
        c3.des_car_img()
        c4.des_car_img()
        carro.des_car_img()
        pneuPickup.des_pneu()
    }
}

function atualiza(){
    if(jogar){
        motor.play()
        ec1.mov_est()
        ec2.mov_est()
        ec3.mov_est()
        ec4.mov_est()
        ec5.mov_est()
        ec6.mov_est()
        ec7.mov_est()
        c2.mov_carro2()
        c3.mov_carro2()
        c4.mov_carro2()
        carro.mov_carro()
        pneuPickup.mov_pneu()
        carro.atualizaDesgaste()

        if(pneuPickup.colid(carro)){
            carro.recuperarPneu(25)
            pneuPickup.ativo = false
        }

        pontos()
        colisao()
        game_over()
    }
    

}
function main(){
    des.clearRect(0,0,500,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()
