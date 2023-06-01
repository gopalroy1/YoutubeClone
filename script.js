
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
            image.src= k.snippet.thumbnails.high.url;
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
    // const q = searchValue;
    // const part = "snippet";

    // const endPoint = `https://youtube.googleapis.com/youtube/v3/search?part=${part}&maxResults=25&q=${q}&key=${apiKey}`
    // const response = await fetch(endPoint);
    //Converting response
    // const data = await response.json();
    // console.log(data.items);
    const data = [
        {
            "kind": "youtube#searchResult",
            "etag": "EDQYeNGqwbU2OKckmkmT44_AlZY",
            "id": {
                "kind": "youtube#video",
                "videoId": "Yx31cP1Euys"
            },
            "snippet": {
                "publishedAt": "2023-05-31T08:00:13Z",
                "channelId": "UCEiS8m8OLFI0REntmsTvzjA",
                "title": "FLYING OVER SIBERIA (4K UHD) - Relaxing Music Along With Beautiful Nature Videos - 4K Video HD",
                "description": "PIANO RELAX, MUSIC FOR YOUR SOUL --------------------------------------------- Follow Page Everywhere ➤Facebook ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/Yx31cP1Euys/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/Yx31cP1Euys/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/Yx31cP1Euys/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Piano Relaxing",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-31T08:00:13Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "xTnmzwtbi7mOJn6huccHUK9P3-A",
            "id": {
                "kind": "youtube#video",
                "videoId": "GO6BRb3gTiQ"
            },
            "snippet": {
                "publishedAt": "2023-05-22T04:36:01Z",
                "channelId": "UC9Gjog4enoDWRWTaYuamx1g",
                "title": "Nature (Official Video) Yaar Batale Aale | Love Chananke | Captain | Sukh D | New Punjabi Songs 2023",
                "description": "nature #YaarBataleAale #jassrecords #2023 Nature (Official Video) Yaar Batale Aale | Love Chananke | Captain | New Punjabi ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/GO6BRb3gTiQ/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/GO6BRb3gTiQ/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/GO6BRb3gTiQ/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Jass Records",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-22T04:36:01Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "mup2Ncqhz7uSbyg-LLsXkmBPBWQ",
            "id": {
                "kind": "youtube#video",
                "videoId": "53FPq0fh_EE"
            },
            "snippet": {
                "publishedAt": "2023-05-28T17:25:29Z",
                "channelId": "UCdi8yQBdBfn1ECu3ayH_TnA",
                "title": "Relaxing Music, Peaceful Piano Music, &quot;Epic Nature&quot; By Tim Janis",
                "description": "Relaxing Music, Peaceful Piano Music, \"Epic Nature\" By Tim Janis. My instrumental music can help you find deep relaxation, ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/53FPq0fh_EE/default_live.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/53FPq0fh_EE/mqdefault_live.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/53FPq0fh_EE/hqdefault_live.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Tim Janis",
                "liveBroadcastContent": "live",
                "publishTime": "2023-05-28T17:25:29Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "wWaNa5vC8UH3CD6UWztslyHIvXU",
            "id": {
                "kind": "youtube#video",
                "videoId": "ZETfvb4hrnw"
            },
            "snippet": {
                "publishedAt": "2021-08-23T05:30:13Z",
                "channelId": "UC5JyZGxZ-eNH-7Ao4Q6D7-A",
                "title": "Nature | Video | Kabira Ft. Nj Nindaniya  Haryanavi Song Nu Te Chocolatey Colour hai yaar tere ka",
                "description": "nature #kabira #chocolateycolourhaiyaartereka Kabira Studios Proudly Presents \"Nature Official Video\" Nature Official Video ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/ZETfvb4hrnw/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/ZETfvb4hrnw/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/ZETfvb4hrnw/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Kabira",
                "liveBroadcastContent": "none",
                "publishTime": "2021-08-23T05:30:13Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "AewRqZzvNJYVDxghi4s26UyCxEA",
            "id": {
                "kind": "youtube#video",
                "videoId": "o01_JnGtj8A"
            },
            "snippet": {
                "publishedAt": "2023-06-01T12:59:08Z",
                "channelId": "UCSpnyV4h2tmp7G_mwyjrUMg",
                "title": "hue_man nature - Saba &amp; No ID",
                "description": "From the private collection of Saba & No ID Directed and Edited by Ian Lipton Executive Producer: Krista Worby Producer: ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/o01_JnGtj8A/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/o01_JnGtj8A/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/o01_JnGtj8A/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Saba Pivot",
                "liveBroadcastContent": "none",
                "publishTime": "2023-06-01T12:59:08Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "d40pJ-RcCqNu1igssDqnU8Gk2YA",
            "id": {
                "kind": "youtube#video",
                "videoId": "JkAFJE61f9A"
            },
            "snippet": {
                "publishedAt": "2023-05-30T16:37:44Z",
                "channelId": "UCBnxEdpoZwstJqC1yZpOjRA",
                "title": "Ethirneechal - Promo | 31 May 2023 | Sun TV Serial | Tamil Serial",
                "description": "Watch the Latest Promo of popular Tamil Serial #Ethirneechal that airs on Sun TV. Watch all Sun TV serials immediately after the ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/JkAFJE61f9A/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/JkAFJE61f9A/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/JkAFJE61f9A/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Sun TV",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-30T16:37:44Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "4uP4XBv0ocYYXzI3xOqPalt37Zg",
            "id": {
                "kind": "youtube#video",
                "videoId": "zXAjcZ-ncZg"
            },
            "snippet": {
                "publishedAt": "2021-05-08T13:22:31Z",
                "channelId": "UC5JyZGxZ-eNH-7Ao4Q6D7-A",
                "title": "Nu Te Chocolatey Colour Hai Yaar Tere Ka @Kabiraofficial @NJ_Nindaniya Nature Family Version",
                "description": "Nu Te Chocolatey Colour Hai Yaar Tere Ka KABIRA NJ NINDANIYA Nature Family Version Songs2021 Nature (Family Version) ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/zXAjcZ-ncZg/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/zXAjcZ-ncZg/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/zXAjcZ-ncZg/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Kabira",
                "liveBroadcastContent": "none",
                "publishTime": "2021-05-08T13:22:31Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "A0qCJzWwMu2Ade1AwVzn5ArQ258",
            "id": {
                "kind": "youtube#video",
                "videoId": "0Db6rUAc4OA"
            },
            "snippet": {
                "publishedAt": "2023-05-31T22:00:01Z",
                "channelId": "UC1cDQMkljsH2M3XesAPvAxw",
                "title": "Container Gardening &amp; Nature Growing Ginger &amp; Turmeric Making Free Soil with Plant Fertilize Compost",
                "description": "Planting Ginger and Turmeric out in Container Gardening. This method can be used for most any type of plant, same way to grow ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/0Db6rUAc4OA/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/0Db6rUAc4OA/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/0Db6rUAc4OA/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Robbie and Gary Gardening Easy",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-31T22:00:01Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "fijk0f9j4tsQjneabtHEyQzfd64",
            "id": {
                "kind": "youtube#video",
                "videoId": "oc_o5DZM3qc"
            },
            "snippet": {
                "publishedAt": "2022-09-03T18:40:36Z",
                "channelId": "UCPotnGNahFjLWjfsq4KYvuQ",
                "title": "INDIA 4K - Nature Relaxation Film - Peaceful Relaxing Music - 4k Video UltraHD",
                "description": "India is a large country with many beautiful landscapes. My favorite place is Nubra Valley in Ladakh, there are no words to ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/oc_o5DZM3qc/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/oc_o5DZM3qc/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/oc_o5DZM3qc/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Relaxation Film",
                "liveBroadcastContent": "none",
                "publishTime": "2022-09-03T18:40:36Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "yWk9prentRzocTFkDdv_Duy6oto",
            "id": {
                "kind": "youtube#video",
                "videoId": "jLiFdVz6oGQ"
            },
            "snippet": {
                "publishedAt": "2023-05-30T07:15:52Z",
                "channelId": "UCEiS8m8OLFI0REntmsTvzjA",
                "title": "FLYING OVER PARADISE (4K UHD) - Relaxing Music Along With Beautiful Nature Videos - 4K Video HD",
                "description": "PIANO RELAX, MUSIC FOR YOUR SOUL --------------------------------------------- Follow Page Everywhere ➤Facebook ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/jLiFdVz6oGQ/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/jLiFdVz6oGQ/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/jLiFdVz6oGQ/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Piano Relaxing",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-30T07:15:52Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "qgxDfLvAMvTxWzLIqTFNjgw3T_E",
            "id": {
                "kind": "youtube#video",
                "videoId": "usZvYCHmMD4"
            },
            "snippet": {
                "publishedAt": "2021-09-10T07:30:06Z",
                "channelId": "UCszuS_Rnu6qrynAx8RapcmA",
                "title": "നെയ്ച്ചോറ് | Ghee Rice Recipe | Neychoru - Easy Malayalam Recipe | Malabar Style",
                "description": "Ghee rice also called 'Neychoru' is a main course dish to accompany any gravy type curry. It can be served on any occasion ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/usZvYCHmMD4/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/usZvYCHmMD4/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/usZvYCHmMD4/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Shaan Geo",
                "liveBroadcastContent": "none",
                "publishTime": "2021-09-10T07:30:06Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "It3doSeVh3StuvMsA4RkfHvy330",
            "id": {
                "kind": "youtube#video",
                "videoId": "_Ds5NUe9UJY"
            },
            "snippet": {
                "publishedAt": "2023-05-31T12:32:37Z",
                "channelId": "UCeE3lj6pLX_gCd0Yvns517Q",
                "title": "Nature Being Lit - Ozzy Man Quickies!",
                "description": "",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/_Ds5NUe9UJY/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/_Ds5NUe9UJY/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/_Ds5NUe9UJY/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Ozzy Man Reviews",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-31T12:32:37Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "1i4re_XMTXFJq8ZSonG1ikR0iY0",
            "id": {
                "kind": "youtube#video",
                "videoId": "T4ZsBwwnxx8"
            },
            "snippet": {
                "publishedAt": "2019-01-15T09:17:29Z",
                "channelId": "UC_pwIXKXNm5KGhdEVzmY60A",
                "title": "NATURE (네이처) - 꿈꿨어 (Dream About U) MV",
                "description": "Available on iTunes, Apple Music : https://apple.co/2KtNzcM Listen on Spotify : https://spoti.fi/2FtzD2I NATURE THE 2ND SINGLE ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/T4ZsBwwnxx8/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/T4ZsBwwnxx8/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/T4ZsBwwnxx8/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Stone Music Entertainment",
                "liveBroadcastContent": "none",
                "publishTime": "2019-01-15T09:17:29Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "BayzVXX-fvOZXZxWTeH3ej4z1ds",
            "id": {
                "kind": "youtube#video",
                "videoId": "luaxiH9IOzU"
            },
            "snippet": {
                "publishedAt": "2023-06-01T15:59:58Z",
                "channelId": "UC9MAhZQQd9egwWCxrwSIsJQ",
                "title": "Alone: Nature Is Brutal Promo | Season 10 Premieres Thu. June 8 at 9/8c | History",
                "description": "The 10th season of The HISTORY Channel's popular survival series “Alone,” will push a new group of brave participants to the ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/luaxiH9IOzU/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/luaxiH9IOzU/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/luaxiH9IOzU/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "HISTORY",
                "liveBroadcastContent": "none",
                "publishTime": "2023-06-01T15:59:58Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "A2E4AlC6-XArfQqMOCOYjtO1t4E",
            "id": {
                "kind": "youtube#video",
                "videoId": "OpH2VpBKr_c"
            },
            "snippet": {
                "publishedAt": "2023-05-30T20:00:10Z",
                "channelId": "UC3Wn3dABlgESm8Bzn8Vamgg",
                "title": "Strange Mysteries Found in Nature",
                "description": "Thanks to Brilliant for sponsoring this video! Go to https://brilliant.org/sideprojects/ to get a 30-day free trial + the first 200 people ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/OpH2VpBKr_c/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/OpH2VpBKr_c/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/OpH2VpBKr_c/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Sideprojects",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-30T20:00:10Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "Dx_4hhQunG7iSX1Efb7VZtxAMHA",
            "id": {
                "kind": "youtube#video",
                "videoId": "KJwYBJMSbPI"
            },
            "snippet": {
                "publishedAt": "2022-06-21T13:00:11Z",
                "channelId": "UCPotnGNahFjLWjfsq4KYvuQ",
                "title": "EARTH 4K - Relaxation Film - Peaceful Relaxing Music - Nature 4k Video UltraHD -  OUR PLANET",
                "description": "From the highest mountains to the deepest rivers, this blockbuster series takes you on an unforgettable journey through the daily ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/KJwYBJMSbPI/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/KJwYBJMSbPI/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/KJwYBJMSbPI/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Relaxation Film",
                "liveBroadcastContent": "none",
                "publishTime": "2022-06-21T13:00:11Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "Bk9K8pWzz0OLn5-NALKdshAxYCY",
            "id": {
                "kind": "youtube#video",
                "videoId": "hXAq8A2jnB4"
            },
            "snippet": {
                "publishedAt": "2023-05-29T13:59:46Z",
                "channelId": "UCtVDQNGBmS8DTP5fPzM_GmQ",
                "title": "Kingdom of edible roses🌹with spongy layer cake! Millions of  petals say &#39;Hi&#39; to millions of hearts",
                "description": "I am lucky enough to have beautiful memories ever since I was a kid. I was so close to nature and I was free to pet dogs and cats.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/hXAq8A2jnB4/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/hXAq8A2jnB4/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/hXAq8A2jnB4/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Poorna - The nature girl",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-29T13:59:46Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "SIzSLb1TCl6gNjVW1QCaOzQShA8",
            "id": {
                "kind": "youtube#video",
                "videoId": "_bFNPnTnYj0"
            },
            "snippet": {
                "publishedAt": "2023-05-28T19:30:02Z",
                "channelId": "UCBUQrhWxiYIbDta0-3hL8Cw",
                "title": "One in a Billion Moments in Nature!",
                "description": "Today the @Regulars @BiffleWiffle @sigils @Nicovald are back in action reacting to the most incredible moments in nature!",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/_bFNPnTnYj0/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/_bFNPnTnYj0/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/_bFNPnTnYj0/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Regulars",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-28T19:30:02Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "Yr60usPtCJ8rAna5fRMepUcoVvw",
            "id": {
                "kind": "youtube#channel",
                "channelId": "UC7c8mE90qCtu11z47U0KErg"
            },
            "snippet": {
                "publishedAt": "2008-11-07T12:07:29Z",
                "channelId": "UC7c8mE90qCtu11z47U0KErg",
                "title": "nature video",
                "description": "Videos from Nature and other leading science journals in the Nature Research portfolio. See experiments up close, meet our ...",
                "thumbnails": {
                    "default": {
                        "url": "https://yt3.ggpht.com/ytc/AGIKgqPxjdBChgu9C2sladlA3a-CaXCKlBLEOxEe78bWVQ=s88-c-k-c0xffffffff-no-rj-mo"
                    },
                    "medium": {
                        "url": "https://yt3.ggpht.com/ytc/AGIKgqPxjdBChgu9C2sladlA3a-CaXCKlBLEOxEe78bWVQ=s240-c-k-c0xffffffff-no-rj-mo"
                    },
                    "high": {
                        "url": "https://yt3.ggpht.com/ytc/AGIKgqPxjdBChgu9C2sladlA3a-CaXCKlBLEOxEe78bWVQ=s800-c-k-c0xffffffff-no-rj-mo"
                    }
                },
                "channelTitle": "nature video",
                "liveBroadcastContent": "upcoming",
                "publishTime": "2008-11-07T12:07:29Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "Yqxx3DMDbrzdap9d9nUkZ_PIpCA",
            "id": {
                "kind": "youtube#video",
                "videoId": "bDJKs6r___g"
            },
            "snippet": {
                "publishedAt": "2023-02-12T14:00:09Z",
                "channelId": "UCsrF0XQeFyr6v24oYCKhUAA",
                "title": "Colorful Birds in 4K - Planet Earth 4K | Beautiful Bird Sounds Nature Relaxation 4K UHD 60 FPS",
                "description": "Colorful Birds in 4K - Planet Earth 4K | Beautiful Bird Sounds Nature Relaxation 4K UHD 60 FPS Birds are a group of ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/bDJKs6r___g/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/bDJKs6r___g/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/bDJKs6r___g/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Planet Earth 4K",
                "liveBroadcastContent": "none",
                "publishTime": "2023-02-12T14:00:09Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "vhg_LQrh6TOWKHvLJs5iRAs1-YE",
            "id": {
                "kind": "youtube#channel",
                "channelId": "UCJLIwYrmwgwbTzgmB5yVc7Q"
            },
            "snippet": {
                "publishedAt": "2015-07-22T01:24:59Z",
                "channelId": "UCJLIwYrmwgwbTzgmB5yVc7Q",
                "title": "Handsome Nature",
                "description": "A sincere welcome to Handsome Nature. We release daily videos for pets and people to watch, listen and enjoy. If you feel ...",
                "thumbnails": {
                    "default": {
                        "url": "https://yt3.ggpht.com/ytc/AGIKgqNgt5r0P2fxpUzDAYb0T7nlJmUHKAjjQIgP6X0YMQ=s88-c-k-c0xffffffff-no-rj-mo"
                    },
                    "medium": {
                        "url": "https://yt3.ggpht.com/ytc/AGIKgqNgt5r0P2fxpUzDAYb0T7nlJmUHKAjjQIgP6X0YMQ=s240-c-k-c0xffffffff-no-rj-mo"
                    },
                    "high": {
                        "url": "https://yt3.ggpht.com/ytc/AGIKgqNgt5r0P2fxpUzDAYb0T7nlJmUHKAjjQIgP6X0YMQ=s800-c-k-c0xffffffff-no-rj-mo"
                    }
                },
                "channelTitle": "Handsome Nature",
                "liveBroadcastContent": "none",
                "publishTime": "2015-07-22T01:24:59Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "s8nIvLzlHhxBXFLUEKyX8-qFgHI",
            "id": {
                "kind": "youtube#video",
                "videoId": "RzVvThhjAKw"
            },
            "snippet": {
                "publishedAt": "2021-12-11T13:00:19Z",
                "channelId": "UCPotnGNahFjLWjfsq4KYvuQ",
                "title": "Forest 4K • Nature Relaxation Film • Peaceful Relaxing Music • 4k Video UltraHD",
                "description": "Have you ever gone deep into the forests? My scenes are very realistic, especially this time I brought a recording device, the ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/RzVvThhjAKw/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/RzVvThhjAKw/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/RzVvThhjAKw/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Relaxation Film",
                "liveBroadcastContent": "none",
                "publishTime": "2021-12-11T13:00:19Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "xz6A5Lvu1Nl_WMCt2iLstfQnUjc",
            "id": {
                "kind": "youtube#video",
                "videoId": "3Wdyvebnlds"
            },
            "snippet": {
                "publishedAt": "2023-05-26T23:01:36Z",
                "channelId": "UCkmLpbIFpQS0MOJr0FOY_nw",
                "title": "Most beautiful places in Philippines #adventure #travel #explore #nature",
                "description": "",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/3Wdyvebnlds/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/3Wdyvebnlds/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/3Wdyvebnlds/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Our Awesome World",
                "liveBroadcastContent": "none",
                "publishTime": "2023-05-26T23:01:36Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "aMIubulIS36s0hJw6mtFgcHWXZo",
            "id": {
                "kind": "youtube#video",
                "videoId": "JkaxUblCGz0"
            },
            "snippet": {
                "publishedAt": "2020-04-17T13:00:04Z",
                "channelId": "UCWOA1ZGywLbqmigxE4Qlvuw",
                "title": "Our Planet | Forests | FULL EPISODE | Netflix",
                "description": "Experience our planet's natural beauty and examine how climate change impacts all living creatures in this ambitious ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/JkaxUblCGz0/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/JkaxUblCGz0/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/JkaxUblCGz0/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Netflix",
                "liveBroadcastContent": "none",
                "publishTime": "2020-04-17T13:00:04Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "gu5KeXZB3-1Ox4Tu1JXalgijhZU",
            "id": {
                "kind": "youtube#video",
                "videoId": "eNUpTV9BGac"
            },
            "snippet": {
                "publishedAt": "2022-03-26T12:00:31Z",
                "channelId": "UCue2DK0ccHtBrP9V__gYl6A",
                "title": "Forest In 4K - The Healing Power Of Nature Sounds | Forest Sounds | Scenic Relaxation Film",
                "description": "Nature's sounds have been proven being the healing power of the human body and restore its natural balanced state. In this 4k ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/eNUpTV9BGac/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/eNUpTV9BGac/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/eNUpTV9BGac/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Scenic Scenes",
                "liveBroadcastContent": "none",
                "publishTime": "2022-03-26T12:00:31Z"
            }
        }
    ]
    return data;
    // return data.items;
    
    // return data;


};
// getResponse("nature");
searchButton.addEventListener("onclick",mainFun("nature"));



