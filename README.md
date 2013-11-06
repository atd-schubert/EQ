# Installation
1. Implement jQuery and the eq.js library to your website.
2. Make a container for the eq and scale it like you want.
3. Give the container a data-eq attribute with a value as id for it.
4. Add optional data-attributs like:
  - how many rows the eq sould have with data-rows
  - on how many bands it works with data-levels
  - witch bpm it sould emulate with data-bpm
  - whitch colors should be used as a comma seperated list of valid css-color from top to bottom (it will be filled automaticaly with the last color value) for:
    - on: data-colors
    - off: data-hide-colors
5. Control the EQ in JavaScript with its Object currentEQ = EQ.ids.{data-eq value} with
  - currentEQ.start();
  - currentEQ.stop();
  - currentEQ.pause();
  
Have fun...