function epcCalculate(element) {
    var colours = [];
    var current = element.find(".current .chartPointer");
    var potential = element.find(".potential .chartPointer");
    var i = 0;
    
    element.find(".overall .epcBar").each(function() {
        colours[i] = $(this).css("background-color");
        i++;
    });

    var currentVal = parseInt(current.text());
    var currentValBottom = 0;
    var potentialVal = parseInt(potential.text());
    var potentialValBottom = 0;
    var currentHighest = 0;
    var potentialHighest = 0;

    /* To calculate the margin to add to the bottom of each pointer,
     * we are taking the highest value for each bar and then adding 
     * on a percentage increase to reach the top of that bar, each bar is 29px high.
     *
     * So for bar G 20 is the highest value, and to get to 29px for the top of the bar
     * we do 9 / 20 to get the percentage difference, add 1 to get a value greater than 100%
     * then multiply that value by the pointer number (1 - 20).
     * 
     * The pointer value | Multiplied by | 29px - highest value | Divided by | highest value | Plus one 
     * currentVal          *               ((9                    /            20)             + 1)
     */ 
    
    if(currentVal >= 92) {
        current.css("background", colours[0]);
        currentHighest = 100;
    }
    else if(currentVal >= 81) {
        current.css("background", colours[1]);
        currentHighest = 91;
    }
    else if(currentVal >= 69) {
        current.css("background", colours[2]);
        currentHighest = 80;
    }
    else if(currentVal >= 55) {
        current.css("background", colours[3]);
        currentHighest = 68;
    }
    else if(currentVal >= 39) {
        current.css("background", colours[4]);
        currentHighest = 54;
    }
    else if(currentVal >= 21) {
        current.css("background", colours[5]);
        currentHighest = 38;
    }
    else {
        current.css("background", colours[6]);
        currentHighest = 20;
    }

    if(potentialVal >= 92) {
        potential.css("background", colours[0]);
        potentialHighest = 100;
    }
    else if(potentialVal >= 81) {
        potential.css("background", colours[1]);
        potentialHighest = 91;
    }
    else if(potentialVal >= 69) {
        potential.css("background", colours[2]);
        potentialHighest = 80;
    }
    else if(potentialVal >= 55) {
        potential.css("background", colours[3]);
        potentialHighest = 68;
    }
    else if(potentialVal >= 39) {
        potential.css("background", colours[4]);
        potentialHighest = 54;
    }
    else if(potentialVal >= 21) {
        potential.css("background", colours[5]);
        potentialHighest = 38;
    }
    else {
        potential.css("background", colours[6]);
        potentialHighest = 20;
    }
    
    var currentPos = $.inArray(current.css("background-color"), colours);
    var potentialPos = $.inArray(potential.css("background-color"), colours);
    
    currentValBottom = currentVal * (((((colours.length - currentPos) * 29) - currentVal) / currentHighest) + 1);
    potentialValBottom = potentialVal * (((((colours.length - potentialPos) * 29) - potentialVal) / potentialHighest) + 1);
    
    current.css({
        "margin-bottom": currentValBottom
    });

    potential.css({
        "margin-bottom": potentialValBottom
    });
}

function epcGenerate(element, current = 0, potential = 0, type = "epc") {
    type = (type == "eir" ? "eir" : "epc");
    
    if(current < 0) {
        current = 0;
    }
    else if(current > 100) {
        current = 100;
    }
    
    if(potential < 0) {
        potential = 0;
    }
    else if(potential > 100) {
        potential = 100;
    }
    
    element.addClass("epcGraph " + type);
    
    element.html(
        `<div class="overall">
            <span>Very energy efficient - ` + (type == "epc" ? `lower running costs` : `lower CO<sub>2</sub> emissions`) + `</span>

            <div class="epcBar epcA"></div>

            <div class="epcBar epcB"></div>

            <div class="epcBar epcC"></div>

            <div class="epcBar epcD"></div>

            <div class="epcBar epcE"></div>

            <div class="epcBar epcF"></div>

            <div class="epcBar epcG"></div>

            <span>Not energy efficient - ` + (type == "epc" ? `higher running costs` : `higher CO<sub>2</sub> emissions`) + `</span>
        </div>

        <div class="current">
            <div class="header">
              Current
            </div>

            <div class="chart">
              <div class="chartPointer">` + current + `</div>
            </div>
        </div>

        <div class="potential">
            <div class="header">
              Potential
            </div>

            <div class="chart">
              <div class="chartPointer">` + potential + `</div>
            </div>
        </div>`
    );
    
    epcCalculate(element);
}