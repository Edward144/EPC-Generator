# EPC-Generator

This is a very simple jQuery based function to generate either an EPC or EIR graph.

Simply include both the css and js file and then add a div to contain your graph.

    generateEpc(element, current, potential, type);
    
Element will be the div you want to target. The current and potential values can each be an integer between 0 and 100. The type can be either "epc" or "eir".

For example:

    generateEpc($(".epcGraph"), 37, 64, "epc");
    generateEpc($(".eirGraph"), 28, 47, "eir");
    
Feel free to modify the css yourself to change the look or colours of each graph. 