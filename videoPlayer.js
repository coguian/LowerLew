
var obj,
  source;

api_key = "No api key for you! hehe"
videoUrl = new URLSearchParams(window.location.search);
if (videoUrl.has('api')) {
  api_key = videoUrl.get('api')
}
var videoClicked
async function getId(url) {
  try {
    holder = document.getElementById('playerHolder')
    const loading = document.createElement('img')
    loading.src = "images/Loading.gif"
    loading.width = 120
    holder.insertBefore(loading, holder.firstChild)
    let resp = await fetch(url)
    let videoClicked = await resp.json()
    console.log(videoClicked[0])
    
    sourceUrl = document.createTextNode("Source: ")
    sourceUrl2 = document.createElement("a")
    sourceUrl2.href = "https://rule34.xxx/index.php?page=post&s=view&id=" + videoClicked[0].id
    sourceUrl2.textContent = "Rule 34 "
    comments = document.createTextNode('Comments: ' + videoClicked[0].comment_count)

    tagsTitle = document.createElement('div')
    tagsTitle.textContent = ' Tags'

    tagsVideo = document.createElement('div')
    tagsVideo.textContent = videoClicked[0].tags
    tagsVideo.style.color = 'blue'
    tagsVideo.style.fontSize = '12px'
    
    holder.replaceChildren()
    holder.append(sourceUrl)
    holder.append(sourceUrl2)
    holder.append(comments)

    const tagsBox = document.createElement('div'); 
    tagsBox.classList.add = 'tags-box';
    holder.append(tagsBox)
    tagsBox.append(tagsTitle)
    tagsBox.append(tagsVideo)
    holder.append(tagsVideo)

    
    
    if (videoClicked[0].file_url.endsWith(".mp4")) {
      console.log("current: video player")
      obj = document.createElement('video'); 
      obj.setAttribute('id', 'video-player'); 
      obj.setAttribute('class', 'video-js vjs-default-skin'); 
      obj.setAttribute('width', window.innerWidth); 
      obj.setAttribute('data-height', '264'); 
      obj.setAttribute('controls', ' '); 
      obj.setAttribute('poster', videoClicked[0].preview_url); 
      obj.setAttribute('preload', 'auto'); 
      obj.setAttribute('fullscreen', true)
      obj.setAttribute('data-setup', '{}'); 


      source = document.createElement('source');
      source.setAttribute('type', 'video/mp4');
      source.setAttribute('src', videoClicked[0].file_url);


      holder.insertBefore(obj, holder.firstChild)
      obj.append(source)
    }
    else {
      console.log("current: image")
      holder = document.getElementById('playerHolder')
      var img = document.createElement("img");
      img.src = videoClicked[0].file_url
      img.style.maxWidth = window.innerWidth
      holder.insertBefore(img, holder.firstChild)
    }

  } catch (e) {
    holder = document.getElementById('playerHolder')
    let textErr = document.createTextNode("[Connection Error] Either api is down or you are having connection issues, Try again later")
    holder.replaceChildren(textErr)
    
    console.log("oh noes: " + e)
  }
}
  
  
  

const input = document.getElementById('search')
const btn = document.getElementById('searchB')
const randomBtn = document.getElementById('randomBtn')
const pages = document.getElementById("pages")

pages.style.width = window.innerWidth / 13.5
input.style.width = window.innerWidth / 1.9
pages.style.height = window.innerHeight / 36
input.style.height = window.innerHeight / 36
btn.style.height = window.innerHeight / 36
randomBtn.style.height = window.innerHeight / 36


pages.value = sessionStorage.getItem('pages')

randomBtn.addEventListener('click', randomState)
async function randomState() {
  if (sessionStorage.getItem('random')) {
    sessionStorage.removeItem('random')
    randomBtn.style.backgroundColor = "white"
  }
  
  else {
    sessionStorage.setItem('random', true)
    randomBtn.style.backgroundColor = "green"
  }
}

if (sessionStorage.getItem('random')) {
  randomBtn.style.backgroundColor = "green"
}


input.value = sessionStorage.getItem('current_search');

btn.addEventListener('click', searchBtn)
pages.addEventListener('keyup', function(e){
    e.preventDefault()
    var key = e.which || e.keyCode
    if (key == 13) {
      searchBtn()
    }
  })

  async function searchBtn() {
    sessionStorage.setItem('current_search', input.value);
    sessionStorage.setItem('pages', pages.value)
    window.location.href = "./?api=" + api_key
  }




if (videoUrl.has('id')) {
  let url = 'https://api.rule34.xxx/index.php?api_key=' + api_key + '&user_id=2995454&page=dapi&s=post&q=index&id=' + videoUrl.get('id') + '&json=1'
  getId(url)
}
else { 
  let url = 'https://api.rule34.xxx/index.php?api_key=' + api_key + '&user_id=2995454&page=dapi&s=post&q=index&id=8699761&json=1'
  getId(url)
}
