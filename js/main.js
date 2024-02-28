// api
const loaderApi = async (isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    const data = await res.json()
    const apiHubList = data.data.tools;
    LoopApi(apiHubList, isShowAll);
}

// in api array loop use for each
const LoopApi = (dataList, isShowAll) => {
    const showDetailsContainer = document.getElementById("show-details-container");
    const seeMoreBtn = document.getElementById("seeMoreBtn");
    if(dataList.length > 6 && isShowAll){
      seeMoreBtn.classList.add("hidden");
    }
    else{
      seeMoreBtn.classList.remove("hidden");
    }
    // i want show max 6 other when show click show more
    if(!isShowAll){
      dataList = dataList.slice(0, 6);
    }
    showDetailsContainer.innerHTML = '';
    dataList.forEach(data => {
        // console.log(data)
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                    <figure><img src="${data.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title font-bold">Features</h2>
                      <p>1. ${data.features[0]}</p>
                      <p>2. ${data.features[1]}</p>
                      <p>3. ${data.features[2]}</p>     
                      <hr>
                      <div class="card-actions justify-between items-center">
                      <div class="space-y-2">
                       <h1 class="font-bold text-2xl">${data.name}</h1>
                      <p>${data.published_in}</p> 
                      </div>
                        <button onclick="handleShowDetails('${data.id}') ; show_details_modal.showModal()" class=" text-red-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                      </button>
                      </div>
                    </div>
                  </div>
        `
        showDetailsContainer.appendChild(div);


    });

}
// 
const handleShowDetails = async(id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  const data = await res.json()
  const apiDetails = data.data
  hubShowApiDetails(apiDetails)
} 

// show output dynamic
const hubShowApiDetails = (content) =>{
    console.log(content);
    const showModalContainer = document.getElementById("show-Modal-container");



    show_details_modal.showModal();
}



// see more btn 
const handleSeeMoreBtn = (isShowAll) => {
    loaderApi(isShowAll)
}

loaderApi()