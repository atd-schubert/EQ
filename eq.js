(function(){
  var EQ = function EQ(domRoot){
    id = domRoot.getAttribute("data-eq");

    if(!id) throw new Error("EQ element has to have a data-eq-id attribute!");
    
    var interval = 100;
    var mainLevel = 1;
    var status = "stoped";

    var rows = domRoot.getAttribute("data-rows") || 10;
    var levels = domRoot.getAttribute("data-levels") || 10;
    var colors = domRoot.hasAttribute("data-colors") ? domRoot.getAttribute("data-colors").split(",") : ["#00FF00"];
    var hideColors = domRoot.hasAttribute("data-hide-colors") ? domRoot.getAttribute("data-hide-colors").split(",") : ["#333333"];
    var bpm = domRoot.getAttribute("data-bpm") || 120;
    var levelRoots = [];
    
    var timeout;
    var bpmInterval;
    var bpmRel = 1;
    var bpmFactor = 0.85;
    
    var fullColors = [];
    var fullHideColors = [];
    
    var calcLevel = function(domArray, rel) {
      var n = rel*domArray.length;
      for(var i=0; i<domArray.length; i++) {
        if(i<n) {
          $(domArray[i]).css("background-color", fullColors[i]);
        } else {
          $(domArray[i]).css("background-color", fullHideColors[i]);
        }
      }
    }
    
    this.plug = function(){
      for (var i=0; i<levelRoots.length; i++) {
        calcLevel(levelRoots[i], 1);
      }
    };
    
    var loop = function(){
      bpmRel *= bpmFactor;
      for (var i=0; i<levelRoots.length; i++) {
        calcLevel(levelRoots[i], Math.random()*bpmRel);
      }
      timeout = setTimeout(loop, interval);
    };
    this.start = function(){
      if(status === "running") return;
      status = "running";
      bpmInterval = window.setInterval(function(){
        bpmRel = 2;
      }, (60/bpm)*1000);
      loop();
    };
    this.stop = function(){
      this.pause();
      for (var i=0; i<levelRoots.length; i++) {
        calcLevel(levelRoots[i], 0);
      }
    };
    this.pause = function(){
      clearTimeout(timeout);
      clearInterval(bpmInterval);
      status = "stoped";
    };
    this.initialize = function(){
      EQ.ids[id] = this;
      for (var i=0; i<levels; i++) {
        levelRoots.push([]);
      }
      mkCols = function(n){
        var rg = "";
        for(var i=0; i<n; i++) {
          rg += '<td></td>';
        }
        return rg;
      };
      mkRows = function(n, cols){
        var rg = "";
        for(var i=0; i<n;i++) {
          rg += '<tr>'+cols+'</tr>';
        }
        return rg;
      };
      var $domRoot = $(domRoot);
      $domRoot.append('<table><tbody>'+mkRows(rows, mkCols(levels))+'</tbody></table>');
      $domRoot.find("table").css("height", "100%").css("width", "100%");
      $domRoot.find("tr").each(function(n){
        var color;
        if(n<hideColors.length) {
          color = hideColors[n];
        } else {
          color = hideColors[hideColors.length-1];
        }
        var $td = $(this).find("td")
        $td.css("background-color", color);
        tds = $td.get();
        for (var i=0; i<tds.length; i++) {
          levelRoots[i].unshift(tds[i]);
        }
      });
      
      for (var i=0; i<rows; i++) {
        if(i<colors.length) {
          fullColors.unshift(colors[i]);
        } else {
          fullColors.unshift(colors[colors.length-1]);
        }

        if(i<hideColors.length) {
          fullHideColors.unshift(hideColors[i]);
        } else {
          fullHideColors.unshift(hideColors[hideColors.length-1]);
        }
      }
    };

    this.initialize();
  };
  EQ.ids = {};
  EQ.getById = function(id){
    return EQ.ids[id];
  };
  

  $(document).ready(
    function(){
      console.warn("Start");
      $("*[data-eq]").each(function(){
        return new EQ(this);
      });
    }
  );
  
  window.EQ = EQ;
  
})();