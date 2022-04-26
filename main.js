alarm = "alert.mp3";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.position(400, 150);
    Video = createCapture(VIDEO);
    Video.hide();
    Video.size(380, 380);
    CocoSSD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects...";

}

status = "";
objects = [];

function modelLoaded(){
    console.log("Model Is Loaded!");
    status = true;
}

function draw(){
    image(Video, 0, 0, 380, 380);
    if (status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        CocoSSD.detect(Video, gotResults);
        for (let i = 0; i < objects.length; i++) {
            
            fill(r,g,b);
            Percentage = floor(objects[i].confidence * 100);
            text(objects[i].label+ " "+ Percentage+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("baby_status").innerHTML = "Baby Found ";
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                alarm.play();
        } 
}
    }

function gotResults(error, results){
    if (error) {
        console.error(error);
    }else 
    console.log(results);
    objects = results;
}
}
