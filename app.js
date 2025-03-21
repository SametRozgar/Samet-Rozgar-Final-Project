(
    function()
    {
       if(!window.jQuery)
       {
        const script=document.createElement("script");//jQuery eğer yüklü değilse manuel olarak head elementine append et
        script.src="https://code.jquery.com/jquery-3.6.0.min.js";
        script.onload=generateCarousel;
        document.head.appendChild(script);
       }else{
        generateCarousel();
       }

      function generateCarousel()
      {
        (function ($){
            if(!window.location.href==="https://www.e-bebek.com/"){//Eğer konsol açılan sayfa Anasayfa değil ise hata mesajı yazdır(Konsola).
                console.log("Page is wrong please paste it console of homepage");
                return;
            }else{
                const CONTAINER="product-carousel-container";
                const STORAGE_KEY="favoriteProductsChosedFromCarousel"; //Kullanıcılarımızın favorileme işlemini en çok hangi bölümden yaptığını bilmek bize pazarlama açısından önemli stratejik veriler sunar 

                const API_URL="https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"//Ürün verilerinin çekileceği API 

                
                const getFavorites=()=>JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; //Local storage eğer STORAGE_KEY key değerine sahip ürün verisine sahip ise bu verileri çağır


                const saveToFavorites=(id)=>localStorage.setItem(STORAGE_KEY,JSON.stringify(id));//Favoriye eklenen ürün verisini id parametresi ile al ve local storage set et


                const createHTML =(products)=>
                {
                    //Html yapısını oluştur 
                    const container=$(`<div>`).addClass(CONTAINER);
                    const carousel=$(`<div>`).addClass(`product-carousel`);
                    const carouselTitleDiv=$(`<div>`).addClass(`carousel-title-Div`).html(carouselTitle);
                    const carouselTitle=$(`<h2>`).addClass(`carousel-title`).text("Sizin için Seçtiklerimiz");
                   
                    
                    $.each(products,function(index,product){
                        
                    const discountPercentage=Math.round(1-(product.price/product.original_price)*100); //indirim yüzdesini hesapla

                    const porductCard=$(`<div>`).addClass(`product-card`).html(`
                        
                        
                        `)
                    })


                }
            }
        })(jQuery);
      }


    }

 
)();