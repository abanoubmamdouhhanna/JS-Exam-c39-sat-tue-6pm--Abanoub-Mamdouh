// all vars
let navWidth;
let myData;
let data=[];
let leftValue;
let box;
//=============== start navs============

navWidth=$(".nav2").outerWidth(true);


$(".nav1Icon").click(
    function()
    {
      
        leftValue = $(".nav2").css("left");
        if(leftValue == "0px")
        {
            $(".nav2").animate({left:`-${navWidth}`},700)
            $(".nav1").animate({left:`0px`},700)

        }
        else
        {
            $(".nav2").animate({left:`0px`},700)
            $(".nav1").animate({left:`${navWidth}`},700)
          
        }
        
    }
)
$(".nav1Icon").click(
    function()
    {
       document.querySelector(".nav1Icon").innerHTML=`<i class="fa-solid fa-xmark"></i>`
    }
)

$(".fa-xmark").click(
    function()
    {
        document.querySelector(".nav1Icon").innerHTML=` <i class="fa-solid fa-bars"></i>`

    }
)

//=============== end navs============

//===========================================start nav items=====================================
$(".navItems").click(
    function()
    {
        $(".nav2").animate({left:`-${navWidth}`},700)
        $(".nav1").animate({left:`0px`},700)
    }
)



//=============default function when refresh===========

async function refresh()
{
 let apires= await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
 let apiresult= await apires.json();
 data=apiresult.meals;
 display();

}
refresh();

//=============default function when refresh===========

function display()
{
 box=``;
 for (let i=0 ;i< data.length ; i++)
 {
     box +=
     `<div class="col-md-3  border border-3-solid g-3 shadow parent rounded">
     <div class="member position-relative hovermain">
        <img src="${data[i].strMealThumb}" class="img-fluid rounded">
         <div class="hoverLay d-flex align-items-center  ">
         <h2 >${data[i].strMeal}</h2>
       </div>

     </div>

 </div>`
 }
 
 let dataMeal=[]
 document.querySelector(".row").innerHTML=box;
 

 $(".parent .member").click(
    function(eInfo)
    {
        async function getMeal(meal)
        {
            let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
            let dataready = await res.json();
            dataMeal=dataready.meals;
            displayMeal();
            console.log(eInfo.target.innerText)
        }
        getMeal(eInfo.target.innerText)
        function displayMeal() 
        {
  
            let cartona = `<div class="col-md-4 py-5 text-black">
                    <img class="img-fluid rounded" src="${dataMeal[0].strMealThumb}">
                    <h3>${dataMeal[0].strMeal}</h3>
                </div>
                <div class="col-md-8 py-5 text-black text-start">
                    <h3>Instruction</h3>
                    <p>${dataMeal[0].strInstructions}</p>
                    <p><span class="fs-3">Area : </span>${dataMeal[0].strArea} </p>
                    <p><span class="fs-3">Category : </span> ${dataMeal[0].strCategory}</p>
      
                    <p><span class="d-block fs-3">Recipes : </span>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient1}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient2}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient3}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient4}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient5}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient6}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure1}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure2}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure3}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure4}</button>
                             <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure5}</button>
                           <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure6}</button>
                            
                            
                            
                            </p>
                            <p><span class="fs-3">Tags : </span><button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strTags}</button> </p>
      
                    
                    <button class="btn btn-success "><a class="text-decoration-none text-light" href="${dataMeal[0].strSource}">Source</a></button>
                    <button class="btn btn-danger"><a class="text-decoration-none text-light" href="${dataMeal[0].strYoutube}">Youtube</a></button>
                    
                </div>`
           
            document.querySelector(".row").innerHTML = cartona;
            
        }

    })
}


//=====================Search=====================
$(".item1").click(
    function()
    {
        let box=`
        <div class="col-md-6">
                <input type="text" id="input1" data="s" class=" text-black w-75 mx-auto bg-transparent form-control text-center searchby " placeholder="Search By Name">

            </div>
            <div class="col-md-6">
                <input type="text" id="input2" data="f" class=" text-black w-75 mx-auto bg-transparent form-control text-center searchby "placeholder="search By First Letter...">

        </div>
        `

        document.querySelector("#rowData").innerHTML=box;
        $(".row").empty();
        $("#input1 ,#input2").keyup
        (
            function()
            {
                let char=$(this).attr("data");
                let variabledata=$(this).val();
                console.log(variabledata);
                async function getMeal()
                {
                    let apires= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${char}=${variabledata}`);
                    let apiresult= await apires.json();
                    data=apiresult.meals;
                    display();
                   
                }
                getMeal()
                
            }
        )
    }
)


//=====================Categories=====================

$(".item2").click(
    function()
    {
       async function getCategory()
       {
        let apires= await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let apiresult= await apires.json();
        data=apiresult.categories;
        displayCat();
       
       }
       getCategory();

       function displayCat()
       {
        let box=``;
        for (let i=0 ;i< data.length ; i++)
        {
            box +=
            `<div class="col-md-3 border border-3-solid g-3 shadow rounded">
            <div class="member position-relative hovermain">
                <img src="${data[i].strCategoryThumb}" class="img-fluid rounded">
                <div class="hoverLay d-flex align-items-center  ">
                    <h2 >${data[i].strCategory}</h2>
                </div>
            </div>

        </div>`
        }
        
        document.querySelector(".row").innerHTML=box;
        $("#rowData").empty();
        $(".member").click(
            function(eInfo)
            {
                async function getMeal(meal)
                {
                    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
                    let dataready = await res.json();
                    dataMeal=dataready.meals;
                    displayMeal();
                    // console.log(eInfo.target.innerText)
                }
                getMeal(eInfo.target.innerText)
                function displayMeal() 
                {
          
                    let cartona=``;
                    for (let i=0 ;i< dataMeal.length ; i++)
                    {
                        cartona +=
                        `<div class="col-md-3 border border-3-solid g-3 shadow rounded">
                        <div class="member position-relative hovermain">
                        <img class="img-fluid rounded" src="${dataMeal[i].strMealThumb}">
                        <div class="hoverLay d-flex align-items-center  ">
                            <h2 >${dataMeal[i].strMeal}</h2>
                        </div>
                            
                        </div>
            
                    </div>`
                    }
                    document.querySelector(".row").innerHTML = cartona;
                    $(".member").click(
                        function(eInfo)
                        {
                            async function getMeal(meal)
                            {
                                let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
                                let dataready = await res.json();
                                dataMeal=dataready.meals;
                                displayMeal();
                                console.log(eInfo.target.innerText)
                            }
                            getMeal(eInfo.target.innerText)
                            function displayMeal() 
                            {
                      
                                let cartona = `<div class="col-md-4 py-5 text-black">
                                        <img class="img-fluid rounded" src="${dataMeal[0].strMealThumb}">
                                        <h3>${dataMeal[0].strMeal}</h3>
                                    </div>
                                    <div class="col-md-8 py-5 text-black text-start">
                                        <h3>Instruction</h3>
                                        <p>${dataMeal[0].strInstructions}</p>
                                        <p><span class="fs-3">Area : </span>${dataMeal[0].strArea} </p>
                                        <p><span class="fs-3">Category : </span> ${dataMeal[0].strCategory}</p>
                          
                                        <p><span class="d-block fs-3">Recipes : </span>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient1}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient2}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient3}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient4}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient5}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient6}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure1}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure2}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure3}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure4}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure5}</button>
                                               <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure6}</button>
                                                
                                                
                                                
                                                </p>
                                                <p><span class="fs-3">Tags : </span><button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strTags}</button> </p>
                          
                                        
                                        <button class="btn btn-success "><a class="text-decoration-none text-light" href="${dataMeal[0].strSource}">Source</a></button>
                                        <button class="btn btn-danger"><a class="text-decoration-none text-light" href="${dataMeal[0].strYoutube}">Youtube</a></button>
                                        
                                    </div>`
                               
                                document.querySelector(".row").innerHTML = cartona;
                            }
                    
                        })
                }
        
            })
       }

    }
    

)


//=====================Area=====================

$(".item3").click(
    function()
    {
        async function getArea()
        {
         let apires= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
         let apiresult= await apires.json();
         data=apiresult.meals;
         displayArea();
        
        }
        getArea();
 
        function displayArea()
        {
         let box=``;
         for (let i=0 ;i< data.length ; i++)
         {
             box +=
             `<div class="col-md-3 border border-3-solid g-3 shadow rounded">
             <div class="member position-relative hovermain">
             <i class="fa-solid fa-city fa-3x"></i>
                 <h1>${data[i].strArea}</h1>
 
             </div>
 
         </div>`
         }
         
         document.querySelector(".row").innerHTML=box;
         $("#rowData").empty();
         $(".shadow").click(
            function(eInfo)
            {
                async function getMeal(country)
                {
                    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
                    let dataready = await res.json();
                    dataMeal=dataready.meals;
                    displayMeal();
                    // console.log(eInfo.target.innerText)
                }
                getMeal(eInfo.target.innerText)
                function displayMeal() 
                {
          
                    let cartona=``;
                    for (let i=0 ;i< dataMeal.length ; i++)
                    {
                        cartona +=
                        `<div class="col-md-3 border border-3-solid g-3 shadow rounded">
                        <div class="member position-relative hovermain">
                        <img class="img-fluid rounded" src="${dataMeal[i].strMealThumb}">
                        <div class="hoverLay d-flex align-items-center  ">
                            <h2 >${dataMeal[i].strMeal}</h2>
                        </div>
                            
            
                        </div>
            
                    </div>`
                    }
                    document.querySelector(".row").innerHTML = cartona;
                    $(".member").click(
                        function(eInfo)
                        {
                            async function getMeal(meal)
                            {
                                let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
                                let dataready = await res.json();
                                dataMeal=dataready.meals;
                                displayMeal();
                                console.log(eInfo.target.innerText)
                            }
                            getMeal(eInfo.target.innerText)
                            function displayMeal() 
                            {
                      
                                let cartona = `<div class="col-md-4 py-5 text-black">
                                        <img class="img-fluid rounded" src="${dataMeal[0].strMealThumb}">
                                        <h3>${dataMeal[0].strMeal}</h3>
                                    </div>
                                    <div class="col-md-8 py-5 text-black text-start">
                                        <h3>Instruction</h3>
                                        <p>${dataMeal[0].strInstructions}</p>
                                        <p><span class="fs-3">Area : </span>${dataMeal[0].strArea} </p>
                                        <p><span class="fs-3">Category : </span> ${dataMeal[0].strCategory}</p>
                          
                                        <p><span class="d-block fs-3">Recipes : </span>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient1}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient2}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient3}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient4}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient5}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient6}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure1}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure2}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure3}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure4}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure5}</button>
                                               <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure6}</button>
                                                
                                                
                                                
                                                </p>
                                                <p><span class="fs-3">Tags : </span><button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strTags}</button> </p>
                          
                                        
                                        <button class="btn btn-success "><a class="text-decoration-none text-light" href="${dataMeal[0].strSource}">Source</a></button>
                                        <button class="btn btn-danger"><a class="text-decoration-none text-light" href="${dataMeal[0].strYoutube}">Youtube</a></button>
                                        
                                    </div>`
                               
                                document.querySelector(".row").innerHTML = cartona;
                            }
                    
                        })
                }
        
            })
        }
    }
)


//=====================Ingredients=====================

$(".item4").click(
    function()
    {
       async function getIngred()
       {
        let apires= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        let apiresult= await apires.json();
        data=apiresult.meals;
        displayIngred();
       
       }
       getIngred();

       function displayIngred()
       {
        let box=``;
        for (let i=0 ;i< data.length ; i++)
        {
            box +=
            `<div class="col-md-3 border border-3-solid g-3 shadow rounded">
            <div class="member position-relative">
            <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h3>${data[i].strIngredient}</h3>
                

            </div>

        </div>`
        }
        
        document.querySelector(".row").innerHTML=box;
        $("#rowData").empty();
        $(".member").click(
            function(eInfo)
            {
                async function getMeal(meal)
                {
                    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
                    let dataready = await res.json();
                    dataMeal=dataready.meals;
                    displayMeal();
                    // console.log(eInfo.target.innerText)
                }
                getMeal(eInfo.target.innerText)
                function displayMeal() 
                {
          
                    let cartona=``;
                    for (let i=0 ;i< dataMeal.length ; i++)
                    {
                        cartona +=
                        `<div class="col-md-3 border border-3-solid g-3 shadow rounded">
                        <div class="member position-relative hovermain">
                        <img class="img-fluid rounded" src="${dataMeal[i].strMealThumb}">
                        <div class="hoverLay d-flex align-items-center  ">
                        <h2 >${dataMeal[i].strMeal}</h2>
                         </div>  
            
                        </div>
            
                    </div>`
                    }
                    document.querySelector(".row").innerHTML = cartona;
                    $(".member").click(
                        function(eInfo)
                        {
                            async function getMeal(meal)
                            {
                                let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
                                let dataready = await res.json();
                                dataMeal=dataready.meals;
                                displayMeal();
                                console.log(eInfo.target.innerText)
                            }
                            getMeal(eInfo.target.innerText)
                            function displayMeal() 
                            {
                      
                                let cartona = `<div class="col-md-4 py-5 text-black">
                                        <img class="img-fluid rounded" src="${dataMeal[0].strMealThumb}">
                                        <h3>${dataMeal[0].strMeal}</h3>
                                    </div>
                                    <div class="col-md-8 py-5 text-black text-start">
                                        <h3>Instruction</h3>
                                        <p>${dataMeal[0].strInstructions}</p>
                                        <p><span class="fs-3">Area : </span>${dataMeal[0].strArea} </p>
                                        <p><span class="fs-3">Category : </span> ${dataMeal[0].strCategory}</p>
                          
                                        <p><span class="d-block fs-3">Recipes : </span>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient1}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient2}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient3}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient4}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient5}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient6}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure1}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure2}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure3}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure4}</button>
                                                 <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure5}</button>
                                               <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure6}</button>
                                                
                                                
                                                
                                                </p>
                                                <p><span class="fs-3">Tags : </span><button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strTags}</button> </p>
                          
                                        
                                        <button class="btn btn-success "><a class="text-decoration-none text-light" href="${dataMeal[0].strSource}">Source</a></button>
                                        <button class="btn btn-danger"><a class="text-decoration-none text-light" href="${dataMeal[0].strYoutube}">Youtube</a></button>
                                        
                                    </div>`
                               
                                document.querySelector(".row").innerHTML = cartona;
                            }
                    
                        })
                }
        
            })
       }
    }
)

//================contactUS================
$(".item5").click(function(){
    let container=` <section class="d-flex justify-content-center align-items-center">
  
        
         
    <div class="container">
      <div class="row g-0">
        <h2 class="text-center text-black mb-5">ContactUs...</h2>
          <div class="col-md-6 mb-4"><input class=" text-black w-75 mx-auto bg-transparent form-control text-center searchby inputA  " placeholder="Enter Your Name" type="text"></div>
          <div class="col-md-6 mb-4"> <input class=" text-black w-75 mx-auto bg-transparent form-control text-center searchby inputB"  placeholder="Enter Email" type="email"></div>
          <div class="col-md-6 mb-4"><input class=" text-black w-75 mx-auto bg-transparent form-control text-center searchby  inputC" placeholder="Enter Phone" type="tel"></div>
          <div class="col-md-6 mb-4"> <input class=" text-black w-75 mx-auto bg-transparent form-control text-center searchby inputD " placeholder="Enter Age" type="text"></div>
          <div class="col-md-6 mb-4"><input class=" text-black w-75 mx-auto bg-transparent form-control text-center searchby inputE  " placeholder="Enter Password" type="password"></div>
          <div class="col-md-6 mb-4"> <input class=" text-black w-75 mx-auto bg-transparent form-control text-center searchby  inputF" placeholder="Enter Repassword" type="password"></div>
          
      </div>
      <div class=" d-flex justify-content-center align-items-center mt-3"><button class="text-center btn btn-outline-danger sub mx-auto   py-1 px-2" type="submit">Submit</button></div>
     </div>
  
  
  
  </section>`
  
  document.querySelector(".row").innerHTML=container;
  })

//================================================= end nav items==========================================
