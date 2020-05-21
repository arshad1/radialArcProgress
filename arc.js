(function ( $ ) {
 
    window.timer ={};
    function myArc(cx, cy, radius, max,elId, flag){       
        var circle = document.getElementById(elId);
         var e = circle.getAttribute("d");
         var d = " M "+ (cx + radius) + " " + cy;
         var angle=0;
         if(flag){
         window.timer[elId] = window.setInterval(function(){ 
            var radians= angle * (Math.PI / 180);  // convert degree to radians
            var x = cx + Math.cos(radians) * radius;  
            var y = cy + Math.sin(radians) * radius;
           
            d += " L "+x + " " + y;
            circle.setAttribute("d", d)
            if(angle==max){
                window.clearInterval(window.timer[elId]);
               }
            angle++;
         },5);
        }else{
             for(var i=0; i<=max; i++){
                var radians= i * (Math.PI / 180);  // convert degree to radians
                var x = cx + Math.cos(radians) * radius;  
                var y = cy + Math.sin(radians) * radius;
                d += " L "+x + " " + y;
                circle.setAttribute("d", d)
            }

        }
    }

    $.fn.arcRadial = function( options ) {
 
        if(this.hasClass('rendered')){
            console.log('Already rendered'); 
            return ;
        }
        this.addClass('rendered');
        var percentage = this.attr('data-percentage');
        var text = this.attr('data-sold');
        var text1 = this.attr('data-caption');
        var text2 = this.attr('data-sub-caption');
        if(isNaN(percentage))
        {
            alert('Please provide percentage value');
            return;
        }
        percentage_float = parseFloat(percentage);
        if(percentage_float > 1){
            alert('Please provide value between 1 and 0');
            return;
        }

        var uuid = Math.floor(Math.random() * 1000000000000);
           // This is the easiest way to have default options.
           var settings = $.extend({
            color: "#DDA40A",
            shadeOpacity: 0.3,
            shadeColor: '#818181',
            innerArcColor: '#E6E9ED',
            subCaptionColor: '#818181',
            innerArcOpacity: 0.7,
            outerArcGradient: ['#ffd43c','#dfa60a'],
            innerArcGradient: ['#797979','#dcdcdc']
        }, options );

        console.log(settings);

        var blankCircle='<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 250 250">\
        <linearGradient id="linearColors_'+uuid+'" x1="0.5" y1="0" x2="0" y2="0.5">\
            <stop offset="0%" stop-color="'+settings.outerArcGradient[0]+'"></stop>\
            <stop offset="100%" stop-color="'+settings.outerArcGradient[1]+'"></stop>\
        </linearGradient>\
        <linearGradient id="linearColors2_'+uuid+'" x1="0.5" y1="0" x2="0" y2="0.5">\
            <stop offset="0%" stop-color="'+settings.innerArcGradient[0]+'"></stop>\
            <stop offset="100%" stop-color="'+settings.innerArcGradient[1]+'"></stop>\
        </linearGradient>\
        <circle id="inner-circle" fill="#FFFFFF" cx="50%" cy="50%" r="68" style="transform: translate(4px, 5px);"/><path d="" id="arc1_'+uuid+'" fill="none" stroke="'+settings.innerArcColor+'" stroke-width="30" style="opacity:'+settings.innerArcOpacity+';transform: rotate(120deg) translate(-62px, -287px);"></path><path id="arc_'+uuid+'" d="" fill="none" stroke="url(#linearColors_'+uuid+')" stroke-width="30" style="transform: rotate(120deg) translate(-62px, -287px);" /><path d="" id="arc2_'+uuid+'" fill="none" stroke="url(#linearColors2_'+uuid+')" stroke-width="8" fill-opacity="10%" style="transform:rotate(120deg) translate(-62px, -287px);opacity:'+settings.shadeOpacity+';"></path><text x="52%" y="49%" text-anchor="middle" fill="'+settings.color+'" font-size="28px" font-family="Arial" font-weight="500" dy=".1em">'+text+'</text><text x="52%" y="48%" text-anchor="middle" fill="'+settings.color+'" font-size="24px" font-weight="500" font-family="Arial" dy="1.3em">'+text1+'</text><text x="51%" y="50%" text-anchor="middle" fill="'+settings.subCaptionColor+'" font-weight="500" font-size="24px" font-family="Arial" dy="4em">'+text2+'</text></svg>';

        this.append(blankCircle); 
        percentageVal = parseInt(300 * percentage_float);
        myArc(110, 110, 80, 300, 'arc1_'+uuid,0);
        myArc(110, 110, 70, 300, 'arc2_'+uuid,0);
        myArc(110, 110, 80, percentageVal, 'arc_'+uuid,1);
  

    };


}( jQuery ));
