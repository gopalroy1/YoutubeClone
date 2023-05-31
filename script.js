
// AIzaSyCCiNOkMR4pBG711qtMKo9OrsLB1CxIYLY
// Capturing the end point tof the api 
const apiKey = "AIzaSyC80C-0QQPo4kDe-b6MBk66rCv8wm73vok"; //from the good site
// const apiKey = "AIzaSyCCiNOkMR4pBG711qtMKo9OrsLB1CxIYLY"; //from the good site
// const id = "_qp_aac-RbE"; // from any you tube video url
// const part = "snippet" 
// const endPoint =`https://www.googleapis.com/youtube/v3?key=${apiKey}&id=${id}&part=${part}`;
// const endPoint =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=nature&key=AIzaSyCCiNOkMR4pBG711qtMKo9OrsLB1CxIYLY`;
// with this end point we are sending api key video id and a parameter called part which we got from the google console website 

// Now calling and getting the data from the google url we created 
const searchBar = document.getElementById("search2");
console.log(searchBar.value,"8");
const searchButton = document.getElementById("search-button");


let mainContainer = document.getElementById("main-container");

async function mainFun(val){
    console.log(searchBar.value);
    console.log("1");
    
    let list = await getResponse(val);
    
    
    
    // After getting the results adding to the video cards of the website 
    
    console.log(list.length);
    console.log(list);
        for (let k of list) {
            // console.log(k.kind);
            //Creating elements of the video card
            let title = document.createElement("h4")
            let image = document.createElement("img")
            image.id="thumbnail"
            let channelName = document.createElement("p")
            let duration = document.createElement("p")
            let view = document.createElement("p")
    
            //Setting values of the vidoes 
            title.innerText="inner text hai";
            // image.src= "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";
            image.src= k.snippet.thumbnails.default.url;
            title.innerHTML=k.snippet.title;
            channelName.innerText = "new name";
            duration.innerText = 5;
            view.innerText = 6;
            //
            // Give proper class name and then append it l
    //1st
          
            let thumbnaildiv = document.createElement("div");
            thumbnaildiv.className="thumbnail-container";
            thumbnaildiv.appendChild(image);
    //2nd
            let videoDesDiv = document.createElement("div");
            videoDesDiv.className="video-description";
    
            let channelIconDiv = document.createElement("div");
            channelIconDiv.className="channel-icon";
            let iconSpan = document.createElement("span");
           iconSpan.className="material-symbols-outlined";
           iconSpan.innerText= "account_circle"
           channelIconDiv.appendChild(iconSpan);
    
           videoDesDiv.appendChild(channelIconDiv);
           videoDesDiv.appendChild(title);
    //3rd
           let channelNameDiv = document.createElement("div");
           channelNameDiv.appendChild(channelName);
    //4 th div set
    
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

             mainContainer.appendChild(videodiv);
    
            //  let videoCardContainer = document.createElement("div");
            // videoCardContainer.className="video-card-container";
            // videoCardContainer.appendChild(videodiv);
    
            // let contentContainer = document.createElement("div");
            // contentContainer.className="content-container";
            // contentContainer.appendChild(videoCardContainer);
    
            // let mainContainer = document.createElement("div");
            // mainContainer.className="maincontainer";
            // mainContainer.appendChild(contentContainer);
    
            
    
             
             
    
           
        }
}
// This function will get the response of search api and return it 
async function getResponse(searchValue){
    //Getting response
    const q = searchValue;
    const part = "snippet";

    const endPoint = `https://youtube.googleapis.com/youtube/v3/search?part=${part}&maxResults=25&q=${q}&key=${apiKey}`
    const response = await fetch(endPoint);
    //Converting response
    const data = await response.json();
    // console.log(data);
    
    return data.items;
    
    // return data;


};
// getResponse("nature");
searchButton.addEventListener("onclick",mainFun("khali"));



