
// AIzaSyCCiNOkMR4pBG711qtMKo9OrsLB1CxIYLY
const apiKey = "AIzaSyC80C-0QQPo4kDe-b6MBk66rCv8wm73vok"; 

//Getting elements here
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
let mainContainer = document.getElementById("main-container");
searchButton.addEventListener('click',function temp1(){
    let text1 = searchBar.value;
        searchVideoList(text1);
    });

//For searching inside a button 
let ele = document.querySelectorAll(".explore  span");


                //Fuctions 
//



//Fuctions which are immediately invoked when loaded

      //Creating top Categories for quick search buttons
async function CreateCatagory(){
    let jdata = await getTopCatogories();
    for (const k of jdata) {
        let CatagoryName = k.snippet.title;
        let channelId = k.snippet.channelId

        //Now create buttons and add in dom
        let btn = document.createElement("button");
       
        btn.innerText=CatagoryName;
        btn.className = "top-catagory"
        let searchDiv = document.getElementById("quick-search");
        searchDiv.appendChild(btn);
    }
}

//Adding event listener to all explore section of side menu
(function applySeachToExplore(){
   ele.forEach(element => {
    let txt = element.textContent;
    element.addEventListener('click',function temp(){
        searchVideoList(txt);
    });
   });
})();

//Adding event listener to all quick search
(async function applySeachToQuickSearchBtn(){
    await CreateCatagory();
    let quickSearchBtn = document.querySelectorAll(".quick-search button");
   quickSearchBtn.forEach(el => {
    let txt3 = el.innerText;
    el.addEventListener('click',function temp3(){
        searchVideoList(txt3);
    });
   });
})();

//Function to search videos and add them
async function searchVideoList(val){
    mainContainer.innerHTML="";
    let list = await getResponse(val);
    // After getting the results adding to the video cards of the website 
        for (let k of list) {
            //Getting values form the list which are requried
            let channelId= k.snippet.channelDetais;

            //Getting values from other API's
            let channelDetails = await getChannelDetails(channelId);
            console.log(channelDetails);
            //Creating elements of the video card
            let title = document.createElement("h5");
            let image = document.createElement("img")
            image.id="thumbnail"
            let channelName = document.createElement("p")
            let duration = document.createElement("p")
            let view = document.createElement("p")
    
            //Setting values of the vidoes 
            
           
            //Anchor tag of video link
            let atag = document.createElement("a");
            let id = k.id.videoId;
            let link = `https://www.youtube.com/watch?v=${id}`;
            atag.href= link;
            atag.target= "_blank";
            atag.appendChild(image);

            //Getting likes and views of a video by id and setting  it
            let viewC = await getVideoStats(id);
            viewC= convertViewsFormat(viewC);
            //Logic to convert view to you tube view format in k and M
            view.innerText =  viewC;

             //Creating anchor tag of the title which will point to video
             let anchorTitle = document.createElement("a");
             anchorTitle.className="title-anchor";
             anchorTitle.href=link; //link same as thumbnail link
             anchorTitle.target="_blank";
            //Image for thumbnail
            image.src= k.snippet.thumbnails.high.url;
            let s = k.snippet.title;
            if(s.length>=74){
                s= s.slice(0,71)+"...";
            }
            title.innerText=s;

            //Creating channel name and logo
            
            // channelName.innerText = channelDetails[0];
            // channelLogoLink = channelDetais[1];
            //
            duration.innerText = 5;
            // Giving proper class name and then append it 
    //1st Div
          
            let thumbnaildiv = document.createElement("div");
            thumbnaildiv.className="thumbnail-container";
            thumbnaildiv.appendChild(atag);
    //2nd Div
            let videoDesDiv = document.createElement("div");
            videoDesDiv.className="video-description";
    
            let channelIconDiv = document.createElement("div");
            channelIconDiv.className="channel-icon";
            //This image and icon is for the channel name and logo
            let iconDiv = document.createElement("div");
            let imgAcc = document.createElement("img")
            imgAcc.src=channelLogoLink;
            iconDiv.appendChild(imgAcc);
           channelIconDiv.appendChild(iconDiv);
           videoDesDiv.appendChild(channelIconDiv);
           //Title
           anchorTitle.appendChild(title);
           videoDesDiv.appendChild(anchorTitle);
    //3rd Div
           let channelNameDiv = document.createElement("div");
           channelNameDiv.appendChild(channelName);
    //4th div set
    
           let durDiv = document.createElement("div");
           durDiv.className = "dur";
           
           let durDivPara = document.createElement("div");
           durDivPara.appendChild(duration);
    
           let durDivView = document.createElement("div");
           durDivView.appendChild(view);
    
           durDiv.appendChild(durDivPara);
           durDiv.appendChild(durDivView);
    
           //Apeending all 
             //Main div
             let videodiv = document.createElement("div");
             videodiv.className="video-card";
             videodiv.appendChild(thumbnaildiv);
             videodiv.appendChild(videoDesDiv);
             videodiv.appendChild(channelNameDiv);
             videodiv.appendChild(durDiv);
             //Adding to the main container which is global variable
             mainContainer.appendChild(videodiv);
        }
}
// These function will get the response of  api and return it 
        //This will get the list of videos from google api
async function getResponse(searchValue){
    // Getting response
    const q = searchValue;
    const part = "snippet";

    const endPoint = `https://youtube.googleapis.com/youtube/v3/search?part=${part}&maxResults=25&q=${q}&key=${apiKey}`
    const response = await fetch(endPoint);
    
    const data = await response.json(); 
    return data.items;


    // const data = [
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "EDQYeNGqwbU2OKckmkmT44_AlZY",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "Yx31cP1Euys"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-31T08:00:13Z",
    //             "channelId": "UCEiS8m8OLFI0REntmsTvzjA",
    //             "title": "FLYING OVER SIBERIA (4K UHD) - Relaxing Music Along With Beautiful Nature Videos - 4K Video HD",
    //             "description": "PIANO RELAX, MUSIC FOR YOUR SOUL --------------------------------------------- Follow Page Everywhere ➤Facebook ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/Yx31cP1Euys/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/Yx31cP1Euys/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/Yx31cP1Euys/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Piano Relaxing",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-31T08:00:13Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "xTnmzwtbi7mOJn6huccHUK9P3-A",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "GO6BRb3gTiQ"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-22T04:36:01Z",
    //             "channelId": "UC9Gjog4enoDWRWTaYuamx1g",
    //             "title": "Nature (Official Video) Yaar Batale Aale | Love Chananke | Captain | Sukh D | New Punjabi Songs 2023",
    //             "description": "nature #YaarBataleAale #jassrecords #2023 Nature (Official Video) Yaar Batale Aale | Love Chananke | Captain | New Punjabi ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/GO6BRb3gTiQ/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/GO6BRb3gTiQ/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/GO6BRb3gTiQ/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Jass Records",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-22T04:36:01Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "mup2Ncqhz7uSbyg-LLsXkmBPBWQ",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "53FPq0fh_EE"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-28T17:25:29Z",
    //             "channelId": "UCdi8yQBdBfn1ECu3ayH_TnA",
    //             "title": "Relaxing Music, Peaceful Piano Music, &quot;Epic Nature&quot; By Tim Janis",
    //             "description": "Relaxing Music, Peaceful Piano Music, \"Epic Nature\" By Tim Janis. My instrumental music can help you find deep relaxation, ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/53FPq0fh_EE/default_live.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/53FPq0fh_EE/mqdefault_live.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/53FPq0fh_EE/hqdefault_live.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Tim Janis",
    //             "liveBroadcastContent": "live",
    //             "publishTime": "2023-05-28T17:25:29Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "wWaNa5vC8UH3CD6UWztslyHIvXU",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "ZETfvb4hrnw"
    //         },
    //         "snippet": {
    //             "publishedAt": "2021-08-23T05:30:13Z",
    //             "channelId": "UC5JyZGxZ-eNH-7Ao4Q6D7-A",
    //             "title": "Nature | Video | Kabira Ft. Nj Nindaniya  Haryanavi Song Nu Te Chocolatey Colour hai yaar tere ka",
    //             "description": "nature #kabira #chocolateycolourhaiyaartereka Kabira Studios Proudly Presents \"Nature Official Video\" Nature Official Video ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/ZETfvb4hrnw/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/ZETfvb4hrnw/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/ZETfvb4hrnw/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Kabira",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2021-08-23T05:30:13Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "AewRqZzvNJYVDxghi4s26UyCxEA",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "o01_JnGtj8A"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-06-01T12:59:08Z",
    //             "channelId": "UCSpnyV4h2tmp7G_mwyjrUMg",
    //             "title": "hue_man nature - Saba &amp; No ID",
    //             "description": "From the private collection of Saba & No ID Directed and Edited by Ian Lipton Executive Producer: Krista Worby Producer: ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/o01_JnGtj8A/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/o01_JnGtj8A/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/o01_JnGtj8A/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Saba Pivot",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-06-01T12:59:08Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "d40pJ-RcCqNu1igssDqnU8Gk2YA",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "JkAFJE61f9A"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-30T16:37:44Z",
    //             "channelId": "UCBnxEdpoZwstJqC1yZpOjRA",
    //             "title": "Ethirneechal - Promo | 31 May 2023 | Sun TV Serial | Tamil Serial",
    //             "description": "Watch the Latest Promo of popular Tamil Serial #Ethirneechal that airs on Sun TV. Watch all Sun TV serials immediately after the ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/JkAFJE61f9A/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/JkAFJE61f9A/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/JkAFJE61f9A/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Sun TV",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-30T16:37:44Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "4uP4XBv0ocYYXzI3xOqPalt37Zg",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "zXAjcZ-ncZg"
    //         },
    //         "snippet": {
    //             "publishedAt": "2021-05-08T13:22:31Z",
    //             "channelId": "UC5JyZGxZ-eNH-7Ao4Q6D7-A",
    //             "title": "Nu Te Chocolatey Colour Hai Yaar Tere Ka @Kabiraofficial @NJ_Nindaniya Nature Family Version",
    //             "description": "Nu Te Chocolatey Colour Hai Yaar Tere Ka KABIRA NJ NINDANIYA Nature Family Version Songs2021 Nature (Family Version) ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/zXAjcZ-ncZg/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/zXAjcZ-ncZg/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/zXAjcZ-ncZg/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Kabira",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2021-05-08T13:22:31Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "A0qCJzWwMu2Ade1AwVzn5ArQ258",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "0Db6rUAc4OA"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-31T22:00:01Z",
    //             "channelId": "UC1cDQMkljsH2M3XesAPvAxw",
    //             "title": "Container Gardening &amp; Nature Growing Ginger &amp; Turmeric Making Free Soil with Plant Fertilize Compost",
    //             "description": "Planting Ginger and Turmeric out in Container Gardening. This method can be used for most any type of plant, same way to grow ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/0Db6rUAc4OA/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/0Db6rUAc4OA/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/0Db6rUAc4OA/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Robbie and Gary Gardening Easy",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-31T22:00:01Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "fijk0f9j4tsQjneabtHEyQzfd64",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "oc_o5DZM3qc"
    //         },
    //         "snippet": {
    //             "publishedAt": "2022-09-03T18:40:36Z",
    //             "channelId": "UCPotnGNahFjLWjfsq4KYvuQ",
    //             "title": "INDIA 4K - Nature Relaxation Film - Peaceful Relaxing Music - 4k Video UltraHD",
    //             "description": "India is a large country with many beautiful landscapes. My favorite place is Nubra Valley in Ladakh, there are no words to ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/oc_o5DZM3qc/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/oc_o5DZM3qc/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/oc_o5DZM3qc/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Relaxation Film",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2022-09-03T18:40:36Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "yWk9prentRzocTFkDdv_Duy6oto",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "jLiFdVz6oGQ"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-30T07:15:52Z",
    //             "channelId": "UCEiS8m8OLFI0REntmsTvzjA",
    //             "title": "FLYING OVER PARADISE (4K UHD) - Relaxing Music Along With Beautiful Nature Videos - 4K Video HD",
    //             "description": "PIANO RELAX, MUSIC FOR YOUR SOUL --------------------------------------------- Follow Page Everywhere ➤Facebook ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/jLiFdVz6oGQ/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/jLiFdVz6oGQ/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/jLiFdVz6oGQ/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Piano Relaxing",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-30T07:15:52Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "qgxDfLvAMvTxWzLIqTFNjgw3T_E",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "usZvYCHmMD4"
    //         },
    //         "snippet": {
    //             "publishedAt": "2021-09-10T07:30:06Z",
    //             "channelId": "UCszuS_Rnu6qrynAx8RapcmA",
    //             "title": "നെയ്ച്ചോറ് | Ghee Rice Recipe | Neychoru - Easy Malayalam Recipe | Malabar Style",
    //             "description": "Ghee rice also called 'Neychoru' is a main course dish to accompany any gravy type curry. It can be served on any occasion ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/usZvYCHmMD4/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/usZvYCHmMD4/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/usZvYCHmMD4/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Shaan Geo",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2021-09-10T07:30:06Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "It3doSeVh3StuvMsA4RkfHvy330",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "_Ds5NUe9UJY"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-31T12:32:37Z",
    //             "channelId": "UCeE3lj6pLX_gCd0Yvns517Q",
    //             "title": "Nature Being Lit - Ozzy Man Quickies!",
    //             "description": "",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/_Ds5NUe9UJY/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/_Ds5NUe9UJY/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/_Ds5NUe9UJY/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Ozzy Man Reviews",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-31T12:32:37Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "1i4re_XMTXFJq8ZSonG1ikR0iY0",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "T4ZsBwwnxx8"
    //         },
    //         "snippet": {
    //             "publishedAt": "2019-01-15T09:17:29Z",
    //             "channelId": "UC_pwIXKXNm5KGhdEVzmY60A",
    //             "title": "NATURE (네이처) - 꿈꿨어 (Dream About U) MV",
    //             "description": "Available on iTunes, Apple Music : https://apple.co/2KtNzcM Listen on Spotify : https://spoti.fi/2FtzD2I NATURE THE 2ND SINGLE ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/T4ZsBwwnxx8/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/T4ZsBwwnxx8/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/T4ZsBwwnxx8/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Stone Music Entertainment",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2019-01-15T09:17:29Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "BayzVXX-fvOZXZxWTeH3ej4z1ds",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "luaxiH9IOzU"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-06-01T15:59:58Z",
    //             "channelId": "UC9MAhZQQd9egwWCxrwSIsJQ",
    //             "title": "Alone: Nature Is Brutal Promo | Season 10 Premieres Thu. June 8 at 9/8c | History",
    //             "description": "The 10th season of The HISTORY Channel's popular survival series “Alone,” will push a new group of brave participants to the ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/luaxiH9IOzU/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/luaxiH9IOzU/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/luaxiH9IOzU/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "HISTORY",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-06-01T15:59:58Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "A2E4AlC6-XArfQqMOCOYjtO1t4E",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "OpH2VpBKr_c"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-30T20:00:10Z",
    //             "channelId": "UC3Wn3dABlgESm8Bzn8Vamgg",
    //             "title": "Strange Mysteries Found in Nature",
    //             "description": "Thanks to Brilliant for sponsoring this video! Go to https://brilliant.org/sideprojects/ to get a 30-day free trial + the first 200 people ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/OpH2VpBKr_c/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/OpH2VpBKr_c/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/OpH2VpBKr_c/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Sideprojects",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-30T20:00:10Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "Dx_4hhQunG7iSX1Efb7VZtxAMHA",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "KJwYBJMSbPI"
    //         },
    //         "snippet": {
    //             "publishedAt": "2022-06-21T13:00:11Z",
    //             "channelId": "UCPotnGNahFjLWjfsq4KYvuQ",
    //             "title": "EARTH 4K - Relaxation Film - Peaceful Relaxing Music - Nature 4k Video UltraHD -  OUR PLANET",
    //             "description": "From the highest mountains to the deepest rivers, this blockbuster series takes you on an unforgettable journey through the daily ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/KJwYBJMSbPI/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/KJwYBJMSbPI/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/KJwYBJMSbPI/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Relaxation Film",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2022-06-21T13:00:11Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "Bk9K8pWzz0OLn5-NALKdshAxYCY",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "hXAq8A2jnB4"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-29T13:59:46Z",
    //             "channelId": "UCtVDQNGBmS8DTP5fPzM_GmQ",
    //             "title": "Kingdom of edible roses🌹with spongy layer cake! Millions of  petals say &#39;Hi&#39; to millions of hearts",
    //             "description": "I am lucky enough to have beautiful memories ever since I was a kid. I was so close to nature and I was free to pet dogs and cats.",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/hXAq8A2jnB4/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/hXAq8A2jnB4/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/hXAq8A2jnB4/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Poorna - The nature girl",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-29T13:59:46Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "SIzSLb1TCl6gNjVW1QCaOzQShA8",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "_bFNPnTnYj0"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-28T19:30:02Z",
    //             "channelId": "UCBUQrhWxiYIbDta0-3hL8Cw",
    //             "title": "One in a Billion Moments in Nature!",
    //             "description": "Today the @Regulars @BiffleWiffle @sigils @Nicovald are back in action reacting to the most incredible moments in nature!",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/_bFNPnTnYj0/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/_bFNPnTnYj0/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/_bFNPnTnYj0/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Regulars",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-28T19:30:02Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "Yr60usPtCJ8rAna5fRMepUcoVvw",
    //         "id": {
    //             "kind": "youtube#channel",
    //             "channelId": "UC7c8mE90qCtu11z47U0KErg"
    //         },
    //         "snippet": {
    //             "publishedAt": "2008-11-07T12:07:29Z",
    //             "channelId": "UC7c8mE90qCtu11z47U0KErg",
    //             "title": "nature video",
    //             "description": "Videos from Nature and other leading science journals in the Nature Research portfolio. See experiments up close, meet our ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://yt3.ggpht.com/ytc/AGIKgqPxjdBChgu9C2sladlA3a-CaXCKlBLEOxEe78bWVQ=s88-c-k-c0xffffffff-no-rj-mo"
    //                 },
    //                 "medium": {
    //                     "url": "https://yt3.ggpht.com/ytc/AGIKgqPxjdBChgu9C2sladlA3a-CaXCKlBLEOxEe78bWVQ=s240-c-k-c0xffffffff-no-rj-mo"
    //                 },
    //                 "high": {
    //                     "url": "https://yt3.ggpht.com/ytc/AGIKgqPxjdBChgu9C2sladlA3a-CaXCKlBLEOxEe78bWVQ=s800-c-k-c0xffffffff-no-rj-mo"
    //                 }
    //             },
    //             "channelTitle": "nature video",
    //             "liveBroadcastContent": "upcoming",
    //             "publishTime": "2008-11-07T12:07:29Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "Yqxx3DMDbrzdap9d9nUkZ_PIpCA",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "bDJKs6r___g"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-02-12T14:00:09Z",
    //             "channelId": "UCsrF0XQeFyr6v24oYCKhUAA",
    //             "title": "Colorful Birds in 4K - Planet Earth 4K | Beautiful Bird Sounds Nature Relaxation 4K UHD 60 FPS",
    //             "description": "Colorful Birds in 4K - Planet Earth 4K | Beautiful Bird Sounds Nature Relaxation 4K UHD 60 FPS Birds are a group of ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/bDJKs6r___g/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/bDJKs6r___g/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/bDJKs6r___g/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Planet Earth 4K",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-02-12T14:00:09Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "vhg_LQrh6TOWKHvLJs5iRAs1-YE",
    //         "id": {
    //             "kind": "youtube#channel",
    //             "channelId": "UCJLIwYrmwgwbTzgmB5yVc7Q"
    //         },
    //         "snippet": {
    //             "publishedAt": "2015-07-22T01:24:59Z",
    //             "channelId": "UCJLIwYrmwgwbTzgmB5yVc7Q",
    //             "title": "Handsome Nature",
    //             "description": "A sincere welcome to Handsome Nature. We release daily videos for pets and people to watch, listen and enjoy. If you feel ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://yt3.ggpht.com/ytc/AGIKgqNgt5r0P2fxpUzDAYb0T7nlJmUHKAjjQIgP6X0YMQ=s88-c-k-c0xffffffff-no-rj-mo"
    //                 },
    //                 "medium": {
    //                     "url": "https://yt3.ggpht.com/ytc/AGIKgqNgt5r0P2fxpUzDAYb0T7nlJmUHKAjjQIgP6X0YMQ=s240-c-k-c0xffffffff-no-rj-mo"
    //                 },
    //                 "high": {
    //                     "url": "https://yt3.ggpht.com/ytc/AGIKgqNgt5r0P2fxpUzDAYb0T7nlJmUHKAjjQIgP6X0YMQ=s800-c-k-c0xffffffff-no-rj-mo"
    //                 }
    //             },
    //             "channelTitle": "Handsome Nature",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2015-07-22T01:24:59Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "s8nIvLzlHhxBXFLUEKyX8-qFgHI",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "RzVvThhjAKw"
    //         },
    //         "snippet": {
    //             "publishedAt": "2021-12-11T13:00:19Z",
    //             "channelId": "UCPotnGNahFjLWjfsq4KYvuQ",
    //             "title": "Forest 4K • Nature Relaxation Film • Peaceful Relaxing Music • 4k Video UltraHD",
    //             "description": "Have you ever gone deep into the forests? My scenes are very realistic, especially this time I brought a recording device, the ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/RzVvThhjAKw/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/RzVvThhjAKw/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/RzVvThhjAKw/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Relaxation Film",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2021-12-11T13:00:19Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "xz6A5Lvu1Nl_WMCt2iLstfQnUjc",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "3Wdyvebnlds"
    //         },
    //         "snippet": {
    //             "publishedAt": "2023-05-26T23:01:36Z",
    //             "channelId": "UCkmLpbIFpQS0MOJr0FOY_nw",
    //             "title": "Most beautiful places in Philippines #adventure #travel #explore #nature",
    //             "description": "",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/3Wdyvebnlds/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/3Wdyvebnlds/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/3Wdyvebnlds/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Our Awesome World",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2023-05-26T23:01:36Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "aMIubulIS36s0hJw6mtFgcHWXZo",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "JkaxUblCGz0"
    //         },
    //         "snippet": {
    //             "publishedAt": "2020-04-17T13:00:04Z",
    //             "channelId": "UCWOA1ZGywLbqmigxE4Qlvuw",
    //             "title": "Our Planet | Forests | FULL EPISODE | Netflix",
    //             "description": "Experience our planet's natural beauty and examine how climate change impacts all living creatures in this ambitious ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/JkaxUblCGz0/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/JkaxUblCGz0/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/JkaxUblCGz0/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Netflix",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2020-04-17T13:00:04Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "gu5KeXZB3-1Ox4Tu1JXalgijhZU",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "eNUpTV9BGac"
    //         },
    //         "snippet": {
    //             "publishedAt": "2022-03-26T12:00:31Z",
    //             "channelId": "UCue2DK0ccHtBrP9V__gYl6A",
    //             "title": "Forest In 4K - The Healing Power Of Nature Sounds | Forest Sounds | Scenic Relaxation Film",
    //             "description": "Nature's sounds have been proven being the healing power of the human body and restore its natural balanced state. In this 4k ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/eNUpTV9BGac/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/eNUpTV9BGac/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/eNUpTV9BGac/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Scenic Scenes",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2022-03-26T12:00:31Z"
    //         }
    //     }
    // ]
    console.log(data);
    return data;

};

// Getting the list of top video categories and returning them 
async function getTopCatogories(){
    // part=snippet&regionCode=IN&key=[YOUR_API_KEY]
    let url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${apiKey}`
    let data = await fetch(url);
    let jdata = await data.json();
    return jdata.items;

    // let temp = [
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "grPOPYEUUZN3ltuDUGEWlrTR90U",
    //         "id": "1",
    //         "snippet": {
    //             "title": "Film & Animation",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "Q0xgUf8BFM8rW3W0R9wNq809xyA",
    //         "id": "2",
    //         "snippet": {
    //             "title": "Autos & Vehicles",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "qnpwjh5QlWM5hrnZCvHisquztC4",
    //         "id": "10",
    //         "snippet": {
    //             "title": "Music",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "HyFIixS5BZaoBdkQdLzPdoXWipg",
    //         "id": "15",
    //         "snippet": {
    //             "title": "Pets & Animals",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "PNU8SwXhjsF90fmkilVohofOi4I",
    //         "id": "17",
    //         "snippet": {
    //             "title": "Sports",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "5kFljz9YJ4lEgSfVwHWi5kTAwAs",
    //         "id": "18",
    //         "snippet": {
    //             "title": "Short Movies",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "ANnLQyzEA_9m3bMyJXMhKTCOiyg",
    //         "id": "19",
    //         "snippet": {
    //             "title": "Travel & Events",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "0Hh6gbZ9zWjnV3sfdZjKB5LQr6E",
    //         "id": "20",
    //         "snippet": {
    //             "title": "Gaming",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "q8Cp4pUfCD8Fuh8VJ_yl5cBCVNw",
    //         "id": "21",
    //         "snippet": {
    //             "title": "Videoblogging",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "cHDaaqPDZsJT1FPr1-MwtyIhR28",
    //         "id": "22",
    //         "snippet": {
    //             "title": "People & Blogs",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "3Uz364xBbKY50a2s0XQlv-gXJds",
    //         "id": "23",
    //         "snippet": {
    //             "title": "Comedy",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "0srcLUqQzO7-NGLF7QnhdVzJQmY",
    //         "id": "24",
    //         "snippet": {
    //             "title": "Entertainment",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "bQlQMjmYX7DyFkX4w3kT0osJyIc",
    //         "id": "25",
    //         "snippet": {
    //             "title": "News & Politics",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "Y06N41HP_WlZmeREZvkGF0HW5pg",
    //         "id": "26",
    //         "snippet": {
    //             "title": "Howto & Style",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "yBaNkLx4sX9NcDmFgAmxQcV4Y30",
    //         "id": "27",
    //         "snippet": {
    //             "title": "Education",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "Mxy3A-SkmnR7MhJDZRS4DuAIbQA",
    //         "id": "28",
    //         "snippet": {
    //             "title": "Science & Technology",
    //             "assignable": true,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "4pIHL_AdN2kO7btAGAP1TvPucNk",
    //         "id": "30",
    //         "snippet": {
    //             "title": "Movies",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "Iqol1myDwh2AuOnxjtn2AfYwJTU",
    //         "id": "31",
    //         "snippet": {
    //             "title": "Anime/Animation",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "tzhBKCBcYWZLPai5INY4id91ss8",
    //         "id": "32",
    //         "snippet": {
    //             "title": "Action/Adventure",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "ii8nBGYpKyl6FyzP3cmBCevdrbs",
    //         "id": "33",
    //         "snippet": {
    //             "title": "Classics",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "Y0u9UAQCCGp60G11Arac5Mp46z4",
    //         "id": "34",
    //         "snippet": {
    //             "title": "Comedy",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "_YDnyT205AMuX8etu8loOiQjbD4",
    //         "id": "35",
    //         "snippet": {
    //             "title": "Documentary",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "eAl2b-uqIGRDgnlMa0EsGZjXmWg",
    //         "id": "36",
    //         "snippet": {
    //             "title": "Drama",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "HDAW2HFOt3SqeDI00X-eL7OELfY",
    //         "id": "37",
    //         "snippet": {
    //             "title": "Family",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "QHiWh3niw5hjDrim85M8IGF45eE",
    //         "id": "38",
    //         "snippet": {
    //             "title": "Foreign",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "ztKcSS7GpH9uEyZk9nQCdNujvGg",
    //         "id": "39",
    //         "snippet": {
    //             "title": "Horror",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "Ids1sm8QFeSo_cDlpcUNrnEBYWA",
    //         "id": "40",
    //         "snippet": {
    //             "title": "Sci-Fi/Fantasy",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "qhfgS7MzzZHIy_UZ1dlawl1GbnY",
    //         "id": "41",
    //         "snippet": {
    //             "title": "Thriller",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "TxVSfGoUyT7CJ7h7ebjg4vhIt6g",
    //         "id": "42",
    //         "snippet": {
    //             "title": "Shorts",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "o9w6eNqzjHPnNbKDujnQd8pklXM",
    //         "id": "43",
    //         "snippet": {
    //             "title": "Shows",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     },
    //     {
    //         "kind": "youtube#videoCategory",
    //         "etag": "mLdyKd0VgXKDI6GevTLBAcvRlIU",
    //         "id": "44",
    //         "snippet": {
    //             "title": "Trailers",
    //             "assignable": false,
    //             "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
    //         }
    //     }
    // ];
    // return temp;
}

async function getVideoStats(id){
    // 'https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=xi9OwKXO6-s&key=[YOUR_API_KEY]
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${apiKey}`;

    let data = await fetch(url);

    // {
    //     "kind": "youtube#videoListResponse",
    //     "etag": "_9mAwJz_iRziS59C38GLUqYl_vU",
    //     "items": [
    //         {
    //             "kind": "youtube#video",
    //             "etag": "o0xEuMBwOSoDGacov_ufQa4_-28",
    //             "id": "o1ZowO3C0To",
    //             "statistics": {
    //                 "viewCount": "27824",
    //                 "likeCount": "3978",
    //                 "favoriteCount": "0",
    //                 "commentCount": "0"
    //             }
    //         }
    //     ],
    //     "pageInfo": {
    //         "totalResults": 1,
    //         "resultsPerPage": 1
    //     }
    // };
    let jdata = await data.json();
    let view = await jdata.items[0].statistics.viewCount;
    return view ;
}

// Getting channel details like name and channel logo 
async function getChannelDetails(id){
   
    let url =  `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${apiKey}`;
    let data = await fetch(url);
    let jdata = await data.json();

    //Sample data from the API Call
    // let title =  jdata.items[0].snippet.title;
    // let titleUrl =  jdata.items[0].snippet.thumbnails.high.url;
    // console.log(title, titleUrl);
    console.log(jdata);
    return jdata;
   
}


//Utility functions 
//For converting to you tube view format of millions and thousands
function convertViewsFormat(viewC){
    viewC += "";
    if(viewC.length>=4 && viewC.length<=6){
        viewC = parseInt(viewC)/1000;
        viewC += "";
        if(viewC.length>=3){
            viewC=viewC.substring(0,3);
        }
        viewC+="K";
    }
    if(viewC.length>=7 && viewC.length<=9){
        viewC = parseInt(viewC)/1000000;
        viewC += "";
        if(viewC.length>=3){
            viewC=viewC.substring(0,3);
        }
        viewC+="M"
    }
    if(viewC.length>=10 && viewC.length<=12)
    {
        viewC = parseInt(viewC)/1000000000;
        viewC += "";
        if(viewC.length>=3){
            viewC=viewC.substring(0,3);
        }
        viewC+="B";
    }
    else{
        viewC = viewC;
    }
    return viewC;
}

// console.log(getChannelDetails("UC_x5XG1OV2P6uZZ5FSM9Ttw"));







