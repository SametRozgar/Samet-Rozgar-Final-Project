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
            if(window.location.href !=="https://www.e-bebek.com/"){//Eğer konsol açılan sayfa Anasayfa değil ise hata mesajı yazdır(Konsola).
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
                   
                    const carouselTitleDiv=$(`<div>`).addClass(`carousel-title-Div`);

                    const carouselTitle=$(`<h2>`).addClass(`carousel-title`).text("Sizin için Seçtiklerimiz");
                   
                   const navButtons=$(
                    `
                    <div class="carousel-nav">
                        <button class="carousel-prev">‹</button>
                        <button class="carousel-next">›</button>
                    </div>
                    
                    `
                   )

                  


                    carouselTitleDiv.append(carouselTitle);
                    
                    $.each(products,function(index,product){

                    const discountPercentage=Math.round(1-(product.price/product.original_price)*100); //indirim yüzdesini hesapla

                    //Ürünlerin yerleşeceği card yapısı
                    const porductCard=$(`<div>`).addClass(`product-card`).attr(`data-url`,product.url).html(`


                        <div class="product-image-div">
                            <img src="${product.img}" alt="${product.name} görseli"></img>
                            <div class="favorite-icon" ${getFavorites().includes(product.id)? "active":"deactive"} data-product-id="${product.id}">
                            ❤
                            </div>
                        </div>
 

                        <div class="product-info">
                            <div class="description">
                               <span class="product-brand"> ${product.brand} -</span><span class="product-name">
                                ${product.name}</span>
                          
                            </div>

                            
                           
                            <div class="product-price-container">
                            ${product.price !==product.original_price?
                                `<span class="product-original-price"> ${product.original_price} ₺ </span> <span class="discount"> % ${discountPercentage}</span>`:``  
                            }
                            <span class="current-price" ${product.price !== product.original_price ? `Sepette : ` : ``}>
                            Sepette 
                            ${product.price} TL
                            </span>
                            <div/>
                        <div/>

                        <button class="add-to-cart-btn">Sepete Ekle</button>

                        
                        `);
                        carousel.append(porductCard); //ürün detaylarını içeren ürün kartını daha önce oluşturulmuş carousel divine append et
                    })
                    
                    container.append(carouselTitleDiv,carousel,navButtons);
                    $(`.banner__titles`).before(container);//carousel başlığını ve carousel divini container divine append et

                }
                

            const generateCSS=()=>
            {
                const css=`
                 .product-carousel-container{
                 display:flex;
                 flex-direction:column;
                     justify-content: space-between;

                 width:100%;
                 
                 margin:20px auto;

                 }
                 .carousel-title-Div{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #fef6eb;
                    padding: 25px 67px;
                    border-top-left-radius: 35px;
                    border-top-right-radius: 35px;
                    font-family: Quicksand-Bold;
                    font-weight: 500;


                 }

                 .carousel-title{
                   font-family: Quicksand-Bold;
                    font-size: 3rem;
                    font-weight: 700;
                    line-height: 1.11;
                    color: #f28e00;
                    margin: 0;

                 }

                .product-carousel{
                display:flex;
                flex-wrap:nowrap;
                overflow-x:auto;
                gap:15px;
                justify-content:center;
                scroll-behavior:smooth;
                }

                .product-carousel::-webkit-scrollbar {
                display: none;
                }
                
                
                .product-card {
                   display:flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    flex: 0 0 auto;
                    width: 245px;
                    height:501px;
                    background: #fff;
                    border-radius: 10px;
                    border: 1px solid #ededed;
                    margin: 0 0 20px 3px;
                    padding: 15px;
                    text-align: center;
                    cursor: pointer;
                    
                }

                .product-card:hover {
                    
                    border:4px solid #f28e00;
                    padding: 12px;
                }

                .product-image-div {
                    position: relative;
                    width: 100%;
                    height: 180px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .product-image-div img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border-radius: 10px;
                }

                .favorite-icon {
                
                    position: absolute;
                    display: flex;
                    top: 10px;
                    right: 10px;
                    font-size: 22px;
                    cursor: pointer;
                    color: #ccc;
                    transition: color 0.3s ease;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px 0 #00000024;
                    width: 50px;
                    align-items: center;
                    justify-content: center;
                    height: 50px;
                }
                
                .favorite-icon:hover{
                border:2px solid #FF6F61;
                }

                .favorite-icon.active {
                    color: #FF6F61;
                }

                .product-info {
                flex-grow:1;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                    margin-top: 10px;
                }

                .product-brand {
                color:#7d7d7d;
                    font-size:14px;
                    font-weight: bolder;
                   
                    
                }

                .product-name {
                    font-size: 12px;
                   Arial, sans-serif;
                    color: #7d7d7d;
                    font-weight:bold;
                    margin: 5px 0;
                }

                .product-price-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 10px;
                }

                .product-original-price {
                    text-decoration: line-through;
                    color: #7d7d7d;
                    font-size: 14px;
                }

                .discount {
                    color: #008000;
                    font-size: 14px;
                    font-weight: bold;
                }

                .current-price {
                background-color:#eaf8f3;
                        font-size: 1.08rem;
                    font-weight: 600;
                        padding: 5.5px 9px 4.5px;
                    color:#4bb788;
                        border-radius: 15px;
                }

                .add-to-cart-btn {
                    width: 200px;
                    padding: 15px 20px;
                    border-radius: 37.5px;
                    background-color: #fff7ec;
                    color: #f28e00;
                    font-family: Poppins, "cursive";
                    font-size: 1.4rem;
                    font-weight: 700;

                }

                .add-to-cart-btn:hover {
                color:#fff;
                    background: #f28e00;
                }

                .carousel-nav button {
                     position: absolute;
                     top: 50%;
                     transform: translateY(-50%);
                     width: 50px;
                     height: 50px;
                     border-radius: 50%;
                     background: #fef6eb;
                     border: none;
                     color: #f28e00;
                     font-size: 24px;
                     cursor: pointer;
                     transition: all 0.3s;
                     z-index: 2;
                    }

                    .carousel-prev { left: -25px; }
                    .carousel-next { right: -25px; }
                    
                    .carousel-nav button:hover {
                        background: white !important;
                        border: 1px solid #f28e00;
                    }

                
                `
                $(`<style>`).addClass(`carousel-style`).html(css).appendTo(`head`); //css yapısını head e append et
            }

            
           

            //Olay dinleyiciler (Events) - favoriye ekleme işlevini local storage üzerinden işle
            const setEvents =()=>
            {
                $(document).on(`click`,`.favorite-icon`,function(event){
                    event.stopPropagation();
                    const $icon=$(this);
                    const productId=parseInt($icon.data(`product-id`));
                    const favorites=getFavorites();

                    if(favorites.includes(productId))
                    {
                        $icon.removeClass(`active`);
                        saveToFavorites(favorites.filter(id=>id !==productId));

                    }else{
                        $icon.addClass(`active`);
                        saveToFavorites([...favorites,productId]);
                    }

                    $(document).on(`click`,`.product-card`,function(){
                     const productUrl=$(this).data(`url`);
                     window.open(productUrl,`_blank`)
                    })

                })
            }

            //verileri çek (Neden önce iskelet oluşturulup , veriler sonra çekilir? çünkü kullanıcya daha hılzı geri dönüş sağlanmış olur . API çağrısı ve render işlemlerinin paralel yapıda olması performansı optimize eder )
            const loadProducts=()=>
            {
                return $.ajax({
                    url:API_URL,
                    method:`GET`,
                    dataType:`Json`,

                }).fail((jqXHR,textStatus)=>{
                    console.error(`Veriler çekilirken bir hata ile karşılaşıldı`,textStatus)
                    return[];
                })
            }


            //kodu başlat

            const init = () => {
                let products =
                  JSON.parse(localStorage.getItem(`chacedProducts`)) || null;
        
                if (!products) {
                  loadProducts().done((data) => {
                    if (data.length) {
                      localStorage.setItem(`chacedProducts`, JSON.stringify(data));
                      createHTML(data);
                      generateCSS();
                      setEvents();
                    }
                  });
                } else {
                  createHTML(products);
                  generateCSS();
                  setEvents();
                }
              };
            $(document).ready(init);
            
        }
       
        })(jQuery);
      }


    }

 
)();