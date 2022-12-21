
const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

const typeColor = {
    bug: "#26de81",
    dragon:"#ffeaa7",
    electric:"#fed330",
    fairy:"#ff0069",
    fighting:"#30336b",
    fire:"#f0932b",
    flying:"#81ecec",
    grass:"#00b894",
    ground:"#efb549",
    ghost:"#a55eea",
    ice:"#78b9ff",
    normal:"#95afc0",
    poison:"#6c5ce7",
    psychic:"#a29bfe",
    rock:"#2d3436",
    water:"#0190FF",
};

let getPockData = () =>{
    //取亂數1~150個之間
    let id = Math.floor(Math.random() * 150) + 1;
    //console.log(id)//輸出數字
    const finalUrl = url +id;
    //console.log(finalUrl)//url+數字
    //fetch
    fetch(finalUrl).then((res)=>res.json())
    .then((data)=>{
        generateCard(data)
        //console.log(data)//看到JSON資料格式
    });
};

//generateCard

let generateCard = (data) =>{
    //找出對應資料
    console.log(data)
    const hp = data.stats[0].base_stat;
    //console.log(hp);//印出血量
    //以下找出各個資訊
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);//取大寫第一個字
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

//換種類時背景顏色更換
const themeColor = typeColor[data.types[0].type.name];
//console.log(themeColor)


card.innerHTML=`
    <p class="hp">
    <span>HP</span>
    ${hp}
    </p>
    <img src=${imgSrc}>
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types"></div>
    <div class="stats">
        <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
        </div>
        <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
        </div>
    </div>
`;
//新增span
appendTypes(data.types);
//讀到type.name對應的更改背景顏色
styleCard(themeColor);
};

let appendTypes = (types) =>{
    //console.log(types);
    types.forEach((item)=>{
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        //console.log(span)
        document.querySelector(".types").appendChild(span);
    });
};

let styleCard = (color) =>{
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36% )`;
    card.querySelectorAll(".types span").forEach((typeColor)=>{
        typeColor.style.backgroundColor = color;
    })
}



btn.addEventListener("click",getPockData);
window.addEventListener("load",getPockData);