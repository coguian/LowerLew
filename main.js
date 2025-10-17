console.log('hey! v1.6')

api_key = "No api key for you! hehe"
videoUrl = new URLSearchParams(window.location.search);
if (videoUrl.has('api')) {
  api_key = videoUrl.get('api')
}
sizeButton = window.innerWidth / 3.26
sizeImage = window.innerWidth / 3.47

async function search(web, tag, quantity) {
  console.clear()
  tags = tag.replaceAll(" ","+")
  if (sessionStorage.getItem('random')) {
    tags = tags + "+sort:random+score:>25"
  }
  else {
     tags = tags + "+sort:score:desc"
  }
  let url = "https://api.rule34.xxx/index.php?api_key=" + api_key + "&user_id=2995454&page=dapi&s=post&q=index&limit="+ quantity +"&tags="+ tags +"&json=1"
  const container = document.getElementById('images');
  const loading = document.createElement('img')
  loading.src = "images/Loading.gif"
  loading.width = sizeImage
  container.insertBefore(loading, container.firstChild)
  try {
    let resp = await fetch(url)
    let json = await resp.json()
    container.replaceChildren();
    json.forEach((i, inde) => {
      console.log("==== [" + (inde + 1) +"] ====" )
      console.log(i)
      var btn = document.createElement("button")
      btn.style.visibility = 'hidden'
      btn.style.height = sizeButton
      btn.style.width = sizeButton
      btn.addEventListener('click', clickB)
      async function clickB() {
        sessionStorage.setItem('current_search', tag);
        console.log("hey noob: " + i.file_url)
        window.location.href = "player.html?api=" + api_key + "&id=" + i.id
        
        
      }
      var img = document.createElement("img");
      img.style.maxHeight = sizeImage
      img.style.maxWidth = sizeImage
      img.src = i.preview_url;
      var body = document.getElementById("images");
      btn.appendChild(img)
      if (i.file_url.endsWith(".mp4")) {
        var imgPlay = document.createElement("img")
        imgPlay.src = 'images/isVideoPreview.png'
        imgPlay.style.height = 20
        imgPlay.style.width = 20
        btn.appendChild(imgPlay)
        imgPlay.style.visibility = 'visible'
      }
      body.appendChild(btn);
      img.style.visibility = 'visible'
    })
  }
  catch (e){
    const erro = document.createTextNode("Error: invalid tags or api unreachable.")
    container.replaceChildren(erro)
    throw e
  
  }
}

const input = document.getElementById('my-input')
const btn = document.getElementById('my-button')
const randomBtn = document.getElementById('randomBtn')
const content = document.getElementById('my-content')
const pages = document.getElementById("pages")


pages.style.width = window.innerWidth / 13.5
input.style.width = window.innerWidth / 1.9
pages.style.height = window.innerHeight / 36
input.style.height = window.innerHeight / 36
btn.style.height = window.innerHeight / 36
randomBtn.style.height = window.innerHeight / 36


if (sessionStorage.getItem('pages')) {
  let current_search = sessionStorage.getItem('current_search');
  let current_pages = sessionStorage.getItem('pages')
  input.value = current_search
  pages.value = current_pages
  if (pages.value < 18) {
      pages.value = 18
    }
  setTimeout(function() {
    search("r34", input.value, pages.value)
  },500)
}

if (btn) {  
  btn.addEventListener('click', searchBar)
  async function searchBar() {
    if (pages.value < 18) {
      pages.value = 18
    }
    sessionStorage.setItem('pages',pages.value)
    console.log("input: " + input.value)
    search("r34",input.value,pages.value)
  }
  input.addEventListener('keyup', function(e){
    e.preventDefault()
    var key = e.which || e.keyCode
    if (key == 13) {
      btn.click()
    }
  })
}
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


