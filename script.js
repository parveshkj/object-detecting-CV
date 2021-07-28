const webCam = function(){
    navigator.mediaDevices.getUserMedia(
        {video:true,audio:false,})
    .then(s =>{
        video.srcObject = s;
    })
}
let video = document.querySelector("#video")
let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d");
let mod;

const obj_det = function(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.drawImage(video,0,0,600,600)
    cocoSsd.load()
    .then(model =>{
        model.detect(video)
        .then(prediction=>{
            prediction.forEach((p)=>{
                ctx.beginPath();
                ctx.strokeStyle = "blue";
                ctx.font = "28px Arial";
                ctx.rect(
                    p.bbox[0],
                    p.bbox[1],
                    p.bbox[2],
                    p.bbox[3],
                )
                ctx.stroke();
                ctx.fillStyle = "#fff"
                ctx.fillText(p.class, (p.bbox[0]),p.bbox[1]);
            })
        })
    })
    
}
webCam()

video.addEventListener("loadeddata",async ()=>{
    mod = await cocoSsd.load();
    setInterval(obj_det,100);
})
