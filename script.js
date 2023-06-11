
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
  const q = val;
  const part = "snippet";

  const endPoint = `https://youtube.googleapis.com/youtube/v3/search?part=${part}&maxResults=25&q=${q}&key=${apiKey}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  let list = data.items;
  //looping in data extracting relevent data and creating videos
  for (let k of list) {
    //Getting values form the list which are requried
    let channelId = k.snippet.channelId;
    let videoId = k.id.videoId;
    let linkVideo = `https://www.youtube.com/watch?v=${videoId}`;
    let imageLink = k.snippet.thumbnails.medium.url;
    let innerTextTitle = k.snippet.title;

    //Creating date for showing in the video
    let objDate = k.snippet.publishedAt;
    const date = new Date(objDate);
    let videoDate = findVideoYear(date);

    //Getting values from other API's
        //Channel detail api
        let channelDetails ;
        try {
          let urlChannel = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;
        let dataChannel = await fetch(urlChannel);
        let jdataChannel = await dataChannel.json();
         channelDetails = jdataChannel.items;
        } catch (error) {
          console.log(error);
        }

        //Views detals api total view and video duration
        let part = "snippet,contentDetails,statistics";
        let urlView = `https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${videoId}&key=${apiKey}`;
        let viewC =0;
        let videoTime="";
        try {
          let dataView = await fetch(urlView);
        let jdataView = await dataView.json();
        viewC = await jdataView.items[0].statistics.viewCount;
         videoTime = jdataView.items[0].contentDetails.duration;
        } catch (error) {
          console.log(error);
          viewC = 11+"K";
        }
        
        
        
    // viewC = 11;
    viewC = convertViewsFormat(viewC);
    videoTime=convertToTimeProperly(videoTime);
    
    
//1st Div
    let image = document.createElement("img");
    image.id = "thumbnail";
    image.src = imageLink;
    let atag = document.createElement("a");
    atag.href = linkVideo;
    atag.target = "_blank";
    //Adding video time parameter
    let videoTimePara = document.createElement("span");
    videoTimePara.innerText=videoTime;
    videoTimePara.id="video-time";
    atag.appendChild(image);
    atag.appendChild(videoTimePara);
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
    imgAcc.src=channelDetails[0].snippet.thumbnails.high.url;
    iconDiv.appendChild(imgAcc);
    channelIconDiv.appendChild(iconDiv);
    videoDesDiv.appendChild(channelIconDiv);
    //Title
    anchorTitle.appendChild(title);
    videoDesDiv.appendChild(anchorTitle);
//3rd Div
    let channelName = document.createElement("p");
    channelName.innerText=channelDetails[0].snippet.title;
    let channelNameDiv = document.createElement("div");
    channelNameDiv.className="channel-name"
    channelNameDiv.appendChild(channelName);
//4th div set

    let time = document.createElement("p");
    time.innerText = videoDate; 
    let view = document.createElement("p");
    view.innerText = viewC;
    
    let durDiv = document.createElement("div");
    durDiv.className = "dur";

    let durDivTime = document.createElement("div");
    durDivTime.appendChild(time);

    let durDivView = document.createElement("div");
    durDivView.appendChild(view);

    durDiv.appendChild(durDivView);
    durDiv.appendChild(durDivTime);

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
//This will get the list of 25 videos from google api
async function getResponse(searchValue) {
  // Getting response
  const q = searchValue;
  const part = "snippet";

  const endPoint = `https://youtube.googleapis.com/youtube/v3/search?part=${part}&maxResults=25&q=${q}&key=${apiKey}`;
  const response = await fetch(endPoint);

  const data = await response.json();
  return data.items;
}

// Getting the list of top video categories and returning them
async function getTopCatogories() {
  let url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${apiKey}`;
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
function findVideoYear(date){
  let curr = Date.now();
  let past = date
  let val = curr -past;
  val = val/(1000*60*60*24*30*12);
  if(val>=1){
    val = Math.floor(val);
    return `${val}years ago`;
  }
  val = val*12
  if(val>=1){
    val = Math.floor(val);
    return `${val} month ago`;
  }
  val = val*30;
  if(val>=1){
    val = Math.floor(val);
    return `${val} days ago`;
  }
  val = val*24;
  if(val>= 1){
    val =Math.floor(val)
    return `${val} hours ago`
  }
  else{
    return `just now `;
  }
}
function convertToTimeProperly(time){
  let ans ="";
  let temp ="";
  for (let i = 2; i < time.length; i++) {
    
    if(time.charAt(i)=='H' || time.charAt(i)=='S' || time.charAt(i)=='M'){
      
      if(time.charAt(i)!= 'S'){
        ans+=temp+":";
      }
      else{
        if(temp.length<2){
          ans+="0"+temp;
        }
        else
        ans+=temp;
      }
      temp="";
    }
    else{
      temp+=time.charAt(i);
    }
    
    
  }
  
  if(time.length<=4){
    ans = ans+"00:00";
  }
  if(ans.length==0){
    ans = "Live";
  }
  return ans;
}

searchVideoList("Trailers HD");


