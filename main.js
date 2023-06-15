console.log("main.js loaded");

function l(what){return document.getElementById(what);}

Dialogues=[
    "You were in this world looking for your dog that ran away in the forest.<br>You fell in a hole. When you fell in a hole you woke up in a completely different place.",
    "You're lost in a forest, you need to kill the dragon to<br>get the diamond. With the diamond you can return home and get your dog back.",
    "I have a crystal in my head and if it breaks I will die.",
    // START:
    "Where did my dog go? I have to find him.",
    "<b>You fell in a hole.</b>",
    "Where am I? Where did I go? Where is Bobby?",
    "Hold on there, I’m Aingeal, I can help you whenever<br>you need, for you to escape and find your dog you must overcome<br>all the obstacles.",
    "The forest is larger but it's less dangerous.<br>The river is shorter but it's dangerous.<br>Which path are you taking?",
    "Hello there, my name is Brucututa, what are you doing here?",
    "Hi, I'm Mike, I need to go through this forest to find my dog.",
    "For you to continue in my territory you must give me one of your lives.",
    "What do you mean by giving one of my lives? I only have one.",
    "You should give her one of your lives to continue, you have six lives to spare<br>but be careful with your choises, you might need them in the end.",
    "Thank you for your life, now you may continue and don't forget to always go straight.",
    "",
    "You walked for a long time but you reach a rock.",
    ""
]

DialogueIndex=0;
AudioFile="introduction";

CurrentMusic = new Audio();

RebuildSound=0;
RebuildHealth=0;

Health=6;
Weapon="Wooden Sword";

Save=function() {
    localStorage.setItem("index",DialogueIndex);
    console.log("Saved at index : "+DialogueIndex+"!");
}

Import=function() {
    DialogueIndex = localStorage.getItem("index");
    console.log("Loaded at index : "+DialogueIndex+"!");
}

Reset=function() {
    DialogueIndex=0;
    console.log("Removed at index : "+DialogueIndex+"!");
    Save();
}

function Load() {
    console.log("Started : " + DialogueIndex);
    RebuildSound=1;RebuildHealth=1;
    ShowContinue();
    Main();
}

function Die(dialogue,path,name) {
    Dialogues=[dialogue];
    DialogueIndex=0;
    Damage(Health);

    ChangeUser(path,name);

    l('continue').addEventListener('click',function() {
        document.location.reload();
    });
}

function UpdateSound() {
    if(DialogueIndex==1) {
        // TODO: PlaySound("introduction");
    }
}

function PlaySound(what) {
    CurrentMusic.src="snd/"+what+".wav";
    CurrentMusic.loop = true;
    CurrentMusic.play();
}

function IncreaseDialogue() {
    DialogueIndex++;
}

function SetDialogue(dialogueIndex) {
    DialogueIndex=dialogueIndex;
    RebuildSound=1;
}

function CheckDialogue() {
    if(DialogueIndex==0 || DialogueIndex==2) {
        ShowContinue();
    }
    if(DialogueIndex==3) {
        ChangeUser("mike.png","Mike (you)");
        SetButtons('Go Left','Go Right','','',false);
        l('button1').addEventListener('click',function() {
            SetDialogue(4);
        });
        l('button2').addEventListener('click',function() {
            SetDialogue(4);
        });
    }
    if(DialogueIndex==4 || DialogueIndex==5) {
        ChangeBackground("woods_hole");
        ShowContinue();
    }
    if(DialogueIndex==6) {
        ChangeUser("aingeal.png","Aingeal");
        l('button1').addEventListener('click',function() {
            SetDialogue(7);
        });
        l('button2').addEventListener('click',function() {
            SetDialogue(7);
        });
    }
    if(DialogueIndex==7) {
        SetButtons('Forest','River','','',false);
        l('button1').addEventListener('click',function() {
            SetDialogue(8);
        });
        l('button2').addEventListener('click',function() {
            ChangeBackground("crocodile_death");
            Die("Crocodiles ate you to pieces.<br>Rest in piece.","crocodile.png","Crocodiles");
        });
    }
    if(DialogueIndex==8) {
        ChangeUser("brucututa.png","Brucututa");
        ShowContinue();
    }
    if(DialogueIndex==9) { ChangeUser("mike.png","Mike (you)"); }
    if(DialogueIndex==10) { ChangeUser("brucututa.png","Brucututa"); }
    if(DialogueIndex==11) { ChangeUser("mike.png","Mike (you)"); }
    if(DialogueIndex==12) {
        ChangeUser("aingeal.png","Aingeal");
        SetButtons('Give one life.','','','',false);
        l("button1").addEventListener("click",function(){
            SetHealth(5);
            SetDialogue(13);
            l("button1").removeEventListener("click",arguments.callee);
        });
    }
    if(DialogueIndex==13) {
        ChangeUser("brucututa.png","Brucututa");
        SetButtons("Continue straight","Turn right","","",false);
    }
}

function ChangeUser(path,name) {
    l('dialogueImage').src="img/"+path;
    $('#name').html(name);
}

function ChangeBackground(type) {
    document.body.classList.add(type);
}

function SetButtons(button1, button2, button3, button4, continueBtn) {
    var buttons = [button1, button2, button3, button4];
  
    for (var i = 0; i < buttons.length; i++) {
      var button = l('button' + (i + 1));
      var buttonText = buttons[i];
  
      if (buttonText) {
        button.innerHTML = buttonText;
        button.classList.remove('d-none');
      } else {
        button.classList.add('d-none');
      }
    }
  
    if (continueBtn === false) {
      l('continue').classList.add('d-none');
    } else {
      l('continue').classList.remove('d-none');
    }
  }
  

function ShowContinue() {
    SetButtons('','','','',true);
}

function UpdateHealth() {
    l('health').innerHTML = ""; // Clear existing heart icons
  
    for (var i = 0; i < Health; i++) {
      l('health').innerHTML += "<i class='fas fa-heart text-danger'></i> ";
    }
  }
  

  
function Main() {
    if(RebuildSound) {
        UpdateSound();
        RebuildSound=0;
    }

    if(RebuildHealth) {
        UpdateHealth();
        RebuildHealth=0;
    }
    CheckDialogue();

    l('dialogue').innerHTML=Dialogues[DialogueIndex];

    console.log(DialogueIndex);

    l('weapon').innerHTML=Weapon;

    setTimeout(Main,1000/30);
}

function Damage(value) {
    Health -= value;
    RebuildHealth = 1;
    UpdateHealth();
}

function SetHealth(value) {
    Health = value;
    RebuildHealth = 1;
    UpdateHealth();
}
  
/*document.addEventListener('contextmenu',function(e){
    e.preventDefault();
});

l("musicOn").addEventListener("change",function(){
    if(this.checked) {
        CurrentMusic.play();
    } else {
        setInterval(()=>{
            CurrentMusic.pause();
        },1);
    }
});*/

l('continue').addEventListener("click",function(){
    IncreaseDialogue();
});

Load();