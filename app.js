(
    function()
    {
       if(!window.jQuery)
       {
        const script=document.createElement("script");
        script.src="https://code.jquery.com/jquery-3.6.0.min.js";
        script.onload=generateCarousel;
        document.head.appendChild(script);
       }else{
        generateCarouse();
       }
    }
)