
const apiKey = "AIzaSyC80C-0QQPo4kDe-b6MBk66rCv8wm73vok";

//Getting elements here
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
let mainContainer = document.getElementById("main-container");
searchButton.addEventListener("click", function temp1() {
  let text1 = searchBar.value;
  searchVideoList(text1);
});

//For searching inside a button
let ele = document.querySelectorAll(".explore  span");

//Fuctions
//

                    //Fuctions which are immediately invoked when loaded

//Creating top Categories for quick search buttons
async function CreateCatagory() {
  let jdata = await getTopCatogories();
  for (const k of jdata) {
    let CatagoryName = k.snippet.title;
    let channelId = k.snippet.channelId;

    //Now create buttons and add in dom
    let btn = document.createElement("button");

    btn.innerText = CatagoryName;
    btn.className = "top-catagory";
    let searchDiv = document.getElementById("quick-search");
    searchDiv.appendChild(btn);
  }
}

  //Adding event listener to all explore section of side menu
(function applySeachToExplore() {
  ele.forEach((element) => {
    let txt = element.textContent;
    element.addEventListener("click", function temp() {
      searchVideoList(txt);
    });
  });
})();

//Adding event listener to all quick search
(async function applySeachToQuickSearchBtn() {
  await CreateCatagory();
  let quickSearchBtn = document.querySelectorAll(".quick-search button");
  quickSearchBtn.forEach((el) => {
    let txt3 = el.innerText;
    el.addEventListener("click", function temp3() {
      searchVideoList(txt3);
    });
  });
})();

//Function to search videos and add them
async function searchVideoList(val) {
    //Empty main Container for a new search
  mainContainer.innerHTML = "";
  let list = await getResponse(val);

  //looping in data extracting relevent data and creating videos
  for (let k of list) {
    //Getting values form the list which are requried
    let channelId = k.snippet.channelDetais;
    let videoId = k.id.videoId;
    let linkVideo = `https://www.youtube.com/watch?v=${videoId}`;
    let imageLink = k.snippet.thumbnails.high.url;
    let innerTextTitle = k.snippet.title;

    //Getting values from other API's
        //Channel detail api
    let channelDetails =  getChannelDetails(channelId);
    channelDetails.then(console.log(8));
    // console.log(typeof(channelDetails) );
    //get channel logo and title

        //Views detals api
    let viewC = await getVideoStats(videoId);
    viewC = convertViewsFormat(viewC);
    
    
//1st Div
    let image = document.createElement("img");
    image.id = "thumbnail";
    image.src = imageLink;
    let atag = document.createElement("a");
    atag.href = linkVideo;
    atag.target = "_blank";
    atag.appendChild(image);
    let thumbnaildiv = document.createElement("div");
    thumbnaildiv.className = "thumbnail-container";
    thumbnaildiv.appendChild(atag);
//2nd Div
    let title = document.createElement("h5");
    if (innerTextTitle.length >= 74) {
        innerTextTitle = innerTextTitle.slice(0, 71) + "...";
    }
    title.innerText = innerTextTitle;
    
    let anchorTitle = document.createElement("a");
    anchorTitle.className = "title-anchor";
    anchorTitle.href = linkVideo; //link same as thumbnail link
    anchorTitle.target = "_blank";

    let videoDesDiv = document.createElement("div");
    videoDesDiv.className = "video-description";
    let channelIconDiv = document.createElement("div");
    channelIconDiv.className = "channel-icon";
    //This image and icon is for the channel name and logo
    let iconDiv = document.createElement("div");
    let imgAcc = document.createElement("img");
    // imgAcc.src=channelLogoLink;
    iconDiv.appendChild(imgAcc);
    channelIconDiv.appendChild(iconDiv);
    videoDesDiv.appendChild(channelIconDiv);
    //Title
    anchorTitle.appendChild(title);
    videoDesDiv.appendChild(anchorTitle);
//3rd Div
    let channelName = document.createElement("p");
    channelName.innerText="api use hoga isme";
    let channelNameDiv = document.createElement("div");
    channelNameDiv.appendChild(channelName);
//4th div set

    let duration = document.createElement("p");
    duration.innerText = 5; 
    let view = document.createElement("p");
    view.innerText = viewC;
    
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
    videodiv.className = "video-card";
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
async function getResponse(searchValue) {
  // Getting response
  const q = searchValue;
  const part = "snippet";

  const endPoint = `https://youtube.googleapis.com/youtube/v3/search?part=${part}&maxResults=25&q=${q}&key=${apiKey}`;
  const response = await fetch(endPoint);

  const data = await response.json();
  return data.items;


  console.log(data);
  return data;
}

// Getting the list of top video categories and returning them
async function getTopCatogories() {
  let url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${apiKey}`;
  let data = await fetch(url);
  let jdata = await data.json();
  return jdata.items;

}

async function getVideoStats(id) {
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
  let view =  await jdata.items[0].statistics.viewCount;
  return view;
}

// Getting channel details like name and channel logo
async function getChannelDetails(id) {
  let url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${apiKey}`;
  let data = await fetch(url);
  let jdata = await data.json();
  return jdata.items;
}

//Utility functions
//For converting to you tube view format of millions and thousands
function convertViewsFormat(viewC) {
  viewC += "";
  if (viewC.length >= 4 && viewC.length <= 6) {
    viewC = parseInt(viewC) / 1000;
    viewC += "";
    if (viewC.length >= 3) {
      viewC = viewC.substring(0, 3);
    }
    viewC += "K";
  }
  if (viewC.length >= 7 && viewC.length <= 9) {
    viewC = parseInt(viewC) / 1000000;
    viewC += "";
    if (viewC.length >= 3) {
      viewC = viewC.substring(0, 3);
    }
    viewC += "M";
  }
  if (viewC.length >= 10 && viewC.length <= 12) {
    viewC = parseInt(viewC) / 1000000000;
    viewC += "";
    if (viewC.length >= 3) {
      viewC = viewC.substring(0, 3);
    }
    viewC += "B";
  } else {
    viewC = viewC;
  }
  return viewC;
}

