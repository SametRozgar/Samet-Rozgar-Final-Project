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

                const SPECIAL_IMAGE_URL="https://api2.e-bebek.com/medias/orta-banner-D-KEY-2.jpg?context=bWFzdGVyfGltYWdlc3wzNzIwN3xpbWFnZS9qcGVnfGltYWdlcy9oNGUvaGZlLzEyNjczOTM3NzY4NDc4LmpwZ3wxZGFhMDk4NmIzMjliMzhjOTM5OGFiYjVkMjgwMmUzNGUyMGUwNGEzZDIyNDZlNDA0ZDY2OGE3ODlkOTk0NDQw"; // Carousel sol poster

                const getFavorites=()=>JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; //Local storage eğer STORAGE_KEY key değerine sahip ürün verisine sahip ise bu verileri çağır


                const saveToFavorites=(id)=>localStorage.setItem(STORAGE_KEY,JSON.stringify(id));//Favoriye eklenen ürün verisini id parametresi ile al ve local storage set et
                
                const getRandomStars=()=>"⭐".repeat(5);
                const getRandomNuber=()=>Math.floor(Math.random()*50+10)
                const createHTML =(products)=>
                {
                    //Html yapısını oluştur 
                    const container=$(`<div>`).addClass(CONTAINER).css("position", "relative");

                    const carousel=$(`<div>`).addClass(`product-carousel`);
                   
                    const carouselTitleDiv=$(`<div>`).addClass(`carousel-title-Div`);

                    const carouselTitle=$(`<h2>`).addClass(`carousel-title`).text("Sizin için Seçtiklerimiz");
                    carouselTitleDiv.append(carouselTitle);
                    
                    //ürün card yapısnın sol üst köşesinde bulunan çok satan,kargo bedava gibi sticker öğelerini random olarak ürünlere dağıt
                    const STICKERS = {
                        BEST_SELLER: "https://www.e-bebek.com/assets/images/cok-satan.png",
                        STARRED: "https://www.e-bebek.com/assets/images/yildiz-urun@2x.png",
                        FREE_SHIPPING: "https://www.e-bebek.com/assets/images/kargo-bedava@2x.png"
                      };

                      const getRandomSticker = () => {
                        const stickerValues = Object.values(STICKERS);
                        return stickerValues[Math.floor(Math.random() * stickerValues.length)];
                      };

                    //sol poster için özel div yapısı
                    const specialImageCard = $(`  
                        <div class="product-card special-cart">
                            <div class="special-image">
                                <img src="${SPECIAL_IMAGE_URL}" alt="Özel kampanya" style="border-radius: 35px 0 0 35px; height: 100%;">
                            </div>
                        </div>
                    `);
                    carousel.append(specialImageCard);
                    
                    
                    $.each(products,function(index,product){

                        

                        //indirim yüzdesi hesapla
                        const hasDiscount = product.price < product.original_price;
                        const hasIncreasedPrice=product.price>product.original_price;

                        const increasePercentage = hasIncreasedPrice 
                        ? Math.round((product.price / product.original_price * 100) - 100)
                        : 0;
                        
                        const discountPercentage = hasDiscount
                        ? Math.round(100 - (product.price / product.original_price * 100))
                        : 0;
                        
                         
                        //favori kontrolü ve random yıldız üret
                         const isFav=getFavorites().includes(product.id);
                         const starRating=getRandomStars();
                         const rating=getRandomNuber();


                    //Ürünlerin yerleşeceği card yapısı
                    const porductCard=$(`<div>`).attr(`data-url`,product.url).html(`


                        <div class="product-card" data-url="${product.url}">
                            <div class="product-image-div">
                                <img src="${product.img}" alt="${product.name}">
                                    <div class="product-sticker">
                                        <img src="${getRandomSticker()}" alt="Sticker">
                                    </div>
                                <div class="favorite-icon ${isFav ? 'active' : ''}" data-product-id="${product.id}">❤</div>
                            </div>
                            <div class="product-info">
                                <div class="description">
                                    <span class="product-brand">${product.brand} -</span>
                                    <span class="product-name">${product.name}</span>
                                </div>
                                <div class="star-rating">${starRating } <span class="rating-number">(${rating})</span> </div>
                                <div class="product-price-container">
                                ${hasDiscount
                                    ? `<span class="product-original-price">${product.original_price.toFixed(2)} TL  </span>
                                    <span class="discount"> &nbsp; %${discountPercentage} 💚</span>`
                                    : hasIncreasedPrice 
                                    ? `<span class="product-original-price no-discount hasIncrease">${product.original_price.toFixed(2)} TL  </span>
                                        <span class="price-increase">  &nbsp; %${increasePercentage} 🔺</span>`
                                    : `<span class="product-original-price no-discount">${product.original_price.toFixed(2)} TL</span>`}
                                </div>
                                ${hasDiscount
                                    ? `<span class="current-price discount-price">${product.price.toFixed(2)} TL</span>`
                                    : hasIncreasedPrice
                                      ? `<span class="current-price increased-price">${product.price.toFixed(2)} TL</span>`
                                      : ''}
                            </div>
                            <button class="add-to-cart-btn">Sepete Ekle</button>
                        </div>

                        
                        `);
                        carousel.append(porductCard); //ürün detaylarını içeren ürün kartını daha önce oluşturulmuş carousel divine append et
                    })

                    //navigasyon butonlarını oluştur 
                const navButtons = $(`  
                    <div class="carousel-nav">
                        <button class="carousel-prev">‹</button>
                        <button class="carousel-next">›</button>
                    </div>
                `);
                    
                    container.append(carouselTitleDiv,carousel,navButtons);
                    $(`.banner__titles`).before(container);//carousel başlığını ve carousel divini container divine append et

                }
                

            const generateCSS=()=>
            {
                const css = `
                    .${CONTAINER} {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        margin: 40px auto;
                        position: relative;
                    }
                    .carousel-title-Div {
                        width: 100%;
                        background-color: #fef6eb;
                        padding: 25px 67px;
                        border-top-left-radius: 35px;
                        border-top-right-radius: 35px;
                        font-family: Quicksand-Bold;
                    }
                    .carousel-title {
                        font-size: 3rem;
                        font-weight: 700;
                        color: #f28e00;
                        margin: 0;
                    }
                    .product-carousel {
                        display: flex;
                        flex-wrap: nowrap;
                        overflow-x: auto;
                        gap: 12px;
                        padding: 20px 0;
                        scroll-behavior: smooth;
                        width: 100%;
                    }
                    .product-carousel::-webkit-scrollbar {
                        display: none;
                    }
                    .product-card {
                        flex: 0 0 auto;
                        width: 247px;
                        height: 598px;
                        background: #fff;
                        border-radius: 10px;
                        border: 1px solid #ededed;
                        padding: 15px;
                        text-align: center;
                        gap: 4rem;
                        cursor: pointer;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                        .product-card:hover {
                        border: 4px solid #f28e00;
                        padding: 12px;
                    }
                    
                    .product-image-div {
                        position: relative;
                        height: 180px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .product-image-div img {
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        border-radius: 10px;
                    }
                    .favorite-icon {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        width: 50px;
                        height: 50px;
                        background: white;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 22px;
                        color: #ccc;
                        cursor: pointer;
                        box-shadow: 0 2px 4px 0 #00000024;
                        transition: color 0.3s ease;
                    }

                    .product-sticker {
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        z-index: 2;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: white;
                        border-radius: 50%;
                        box-shadow: 0 2px 4px 0 #00000024;
                    }
                        .product-sticker img {
                        max-width: 80%;
                        max-height: 80%;
                        object-fit: contain;
                    }

                    .special-cart .product-sticker {
                        display: none !important;
                    }
                    .favorite-icon:hover {
                        border: 2px solid #ff8800;
                    }
                    .favorite-icon.active {
                        color: #ff8800;
                    }
                    .product-info {
                        margin-top: 10px;
                        display: flex;
                        position: relative;
                        flex-direction: column;
                        justify-content: space-between;
                        flex-grow: 1;
                    }
                    .product-brand {
                        color: #7d7d7d;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .product-name {
                        font-size: 12px;
                        font-weight: bold;
                        color: #7d7d7d;
                        margin: 5px 0;
                    }
                        .description{
                        width:100%;
                        height: 70px;
                        }
                    .star-rating {
                        margin-left: 10px;
                        margin-top: 5px;
                        font-size: 15px;
                        color: gold;
                        text-align: left;
                    }
                    .rating-number{
                    color:#898585;
                    }
                    .product-price-container {
                    margin-left: 10px;
                        margin-bottom: 56px;
                        display: flex;
                        align-items: center;
                        flex-direction: row;
                    }
                    .product-original-price {
                        text-decoration: line-through;
                        color: #7d7d7d;
                        font-size: 1.5rem;
                        font-weight: 600;
                    }
                        .special-image{
                        height:600px;
                        }
                        .hasIncrease{
                           text-decoration: line-through !important;
                            color: #7d7d7d;
                            font-size: 1.5rem !important;
                        }
                    .discount {
                        color: green;
                        font-size: 21px;
                        font-weight: bold;
                    }
                    .no-discount {
                        text-decoration: none;
                        font-size: 2.4rem;
                    }
                    .current-price {
                        
                        color: #00a365;
                        position: absolute;
                        bottom: 15px;
                        font-weight: 600;
                        width: 59%;
                        padding: 5.5px 9px;
                        border-radius: 15px;
                        font-size: 2.4rem;
                    }
                        .price-increase {
                        color: #ff4444;
                        font-size: 21px;
                        font-weight: bold;
                        }
                        .current-price.increased-price {
                            color: #ff4444;
                            position: absolute;
                            bottom: 15px;
                            font-weight: 600;
                            width: 59%;
                            padding: 5.5px 9px;
                            border-radius: 15px;
                            font-size: 2.4rem;
                        }
                    .add-to-cart-btn {
                        width: 100%;
                        padding: 15px;
                        background: #fff7ec;
                        color: #f28e00;
                        border-radius: 37.5px;
                        border: none;
                        font-weight: 700;
                        font-size: 1.4rem;
                        margin-top: auto;
                    }
                    .add-to-cart-btn:hover {
                        background-color: #f28e00;
                        color: white;
                    }
                    .carousel-nav {
                        position: absolute;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 100%;
                        pointer-events: none;
                    }

                .carousel-prev:hover, 
                .carousel-next:hover {

                    background-color:rgb(252, 252, 252) !important;
                     color: #f28e00;
                    border: 1px solid #f28e00;
                    }

                    .carousel-prev, .carousel-next {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 50%;
                    padding-bottom: 13px;
                    transform: translateY(-50%);
                    pointer-events: all;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #fef6eb;
                    
                    color: #f28e00;
                    font-size: 50px;
                    cursor: pointer;
                    z-index: 99;
                    }
                    .carousel-prev { left: -60px; }
                    .carousel-next { right: -60px; }

                    .special-cart {
                        height: 600px;
                        padding-top: 0px;
                        border: none;
                        pointer-events: none;
                    }

                    .special-cart:hover {
                        border: none;
                        padding: 12px;
                        cursor: pointer;
                    }

                    @media(max-width:750px)
                    {
                        .special-cart {
                            display: none !important;
                        }

                        .carousel-prev,
                        .carousel-next {
                            display: none !important;
                        }
                    }
                        
                    @media(max-width:480px)
                    {
                       .carousel-title-Div{
                       background-color:#fff;
                      
                       }
                    }
                `;
                $(`<style>`).addClass(`carousel-style`).html(css).appendTo(`head`); //css yapısını head e append et
            }

            
           

            //Olay dinleyiciler (Events) - favoriye ekleme işlevini local storage üzerinden işle
            const setEvents = () => {
                const carousel = $(".product-carousel");
                const scrollAmount = 260;

                $(".carousel-prev").click(() => {
                    carousel.animate({ scrollLeft: `-=${scrollAmount}` }, 0);
                });
                $(".carousel-next").click(() => {
                    carousel.animate({ scrollLeft: `+=${scrollAmount}` },0);
                });

                $(document).on("click", ".favorite-icon", function (e) {
                    e.stopPropagation();
                    const $icon = $(this);
                    const id = parseInt($icon.data("product-id"));
                    let favorites = getFavorites();

                    if (favorites.includes(id)) {
                        favorites = favorites.filter(fav => fav !== id);
                        $icon.removeClass("active");
                    } else {
                        favorites.push(id);
                        $icon.addClass("active");
                    }
                    saveToFavorites(favorites);
                });

                $(document).on("click", ".product-card", function (e) {
                    if (!$(e.target).closest(".favorite-icon, .add-to-cart-btn").length) {
                        window.open($(this).data("url"), "_blank");
                    }
                });

                $(document).on("click", ".add-to-cart-btn", function (e) {
                    e.stopPropagation();
                    window.open($(this).closest(".product-card").data("url"), "_blank");
                });
            };

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