

const caja=document.querySelector('.conten-cards');
const botones=document.querySelectorAll('.btn');


const llamandoheroes=(iterador)=>{
  fetch("https://api.opendota.com/api/heroStats")
  .then((response) => response.json())
  .then((data) => rellenarCuadro(data,iterador));

}

for (let i = 0; i <35; i++) {
  llamandoheroes(i);
}


// for (let i = 0; i <20; i++) {
// fetch("https://api.opendota.com/api/heroStats")
// .then((response) => response.json())
// .then((data) => rellenarCuadro(data,i));
// }



const rellenarCuadro = (data,i) => {
const carta=document.createElement('div');
carta.classList.add('conten-cards-hero')
const name=data[i].localized_name;
const img=`https://api.opendota.com${data[i].img}`
const icon=`https://api.opendota.com${data[i].icon}`
const roles=data[i].roles;
const rol=roles.map(r=>{
  return `<p class='conten-cards-hero-text-hab'>${r}</p>`;
})
const unir=rol.join('');
const primaryAtri=data[i].primary_attr;
carta.classList.add(`${primaryAtri}`)
console.log(primaryAtri);
const atack=data[i].attack_type;
carta.innerHTML=`
<div class="conten-cards-hero-title">
    <p>${name}</p>
<img class="" src="${img}" alt="">
</div>
<div class="conten-cards-hero-icon">
    <img src="${icon}" alt="">
</div>               
<div class="conten-cards-hero-text">
    <p class="conten-cards-hero-text-tit">Roles</p>
     ${unir}
    <p class="conten-cards-hero-text-tit">Atack Type</p>
    <p class="conten-cards-hero-text-hab">${atack}</p>

</div>`

caja.appendChild(carta);

};

const filtro=(i,botonid)=>{
  fetch("https://api.opendota.com/api/heroStats")
      .then((response) => response.json())
      .then((data) =>{
        if (botonid=="todos") {
          rellenarCuadro(data,i);
   
        }
        else{
          const tipo=data[i].primary_attr;
          console.log(tipo);
  
          if (tipo==botonid) {

             rellenarCuadro(data,i);
             
          }
        }
      
    });
}

botones.forEach((bt)=>{
  bt.addEventListener("click",(event)=>{
  const botonid=event.currentTarget.id;
    console.log(event.currentTarget.id);
    caja.innerHTML="";
    for (let j= 0; j<35; j++) {
         filtro(j,botonid);
      }
  })
})






