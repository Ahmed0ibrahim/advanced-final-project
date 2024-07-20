uisetup()

axios.get("https://tarmeezacademy.com/api/v1/posts?limit=50")
  .then((response => {
    

    let posts = response.data.data
    console.log(posts)
    let parent = ``
    for (post of posts) {
      let userstring = localStorage.getItem("user")
      if (userstring != null) {
        let userjson = JSON.parse(userstring)
        let userid = userjson.id

        if (post.author.id == userid) {


          parent = `<button id="edit-post-btn" style="margin-left:10px; visibility:visible;" class="btn btn-secondary" onclick="editpost(${post.id})">Edit</button>
                <button id="delete-post-btn" style="margin-left:10px; visibility:visible;" class="btn btn-danger" onclick="deletepost(${post.id})">Delete</button>
`  } else {
          parent = `<h5></h5>`
        }

      } else {
        // alert("login first")
      }

      if (`${post.title}` != null && `${post.title}` != "null") {
        title = post.title
      } else {
        title = ' hello worldayah'
      }

      let posts = document.getElementById('posts')
     
      posts.innerHTML +=

        `
  <div   class="col-12 d-flex  flex-column justify-content-start align-items-center" style="position:relative;">
  
  <div class="d-flex  mt-10px align-items-center  col-8" id="userlink" onclick="userprofile(${post.author.id})"  style=" cursor:pointer; position:absolute; z-index:99999; text-decoration:none; color:black; display:flex; align-items:center;">
                    <img id="prof-img" src="${post.author.profile_image} " alt=""  class="rounded-circle m-2" style="width: 30px; height: 30px;" >
                    <h5 id="name" style="font-size: 15px;">${post.author.name}</h5>
                </div>
    <div id="parent" style="position:absolute; z-index:99999; dispaly:flex; right:20%; top:10px; "  >   
        ${parent}
          </div> 
         
        <div style="color:black; cursor:pointer; " class="col-8" onclick="postclicked(${post.id})">

        <div id="post" class="post rounded   col-12  bg-light shadow  mb-5 " style="min-height: 350px; overflow: hidden;">
        
        
      <!-- start title -->

                

      <div class="title rounded-top  d-flex align-items-center p-2" style=" height:60px; background-color: rgb(226, 222, 235); " >
         
      </div>
      <!-- end title -->
      <!-- start img -->
      <div class="img p-3 pb-0" style="height: 350px">
        <img id="post-img" src="${post.image}" class="rounded" style="width:100%; height: 100%; ">
      </div>
      <!-- end img -->
      <!-- start caption -->
      <div class="ps-3 caption">
        <p id="created_at" style="margin-top: 0 ; margin-bottom: 0; color: rgb(150, 150, 150);">${post.created_at}</p>
        <p id="title" style="font-weight: 600; margin-bottom: 0;" > "${title}" </p>
        <p id="caption-body" style="margin-bottom: 0;">${post.body}</p>
      </div>
      <!-- end caption -->
      <hr class="m-3">
      <!-- start comment -->
      <div class="comment d-flex ps-3 mb-3">
        <i class="bi bi-pen " style="margin-right: 2px; font-size:medium;"></i>
        <span id="comment-count">(${post.comments_count}) comments</span>
        <span style="background-color: #acabb1; border-radius:20px; padding:3px 5px; color:white; margin-left:5px; font-size:small;">${post.id}</span>
      </div>
      <!-- end comment -->
    </div>
    </div>
</div>

`


    }

    const loader = document.getElementById('loader')
    loader.style.display = "none"
    

}  

  

  ))




function uisetup() {
  const token = localStorage.getItem("token")


  const loginbtn = document.getElementById('loginbtn')
  const registerbtn = document.getElementById('registerbtn')
  const logoutbtn = document.getElementById('logoutbtn')
  const showusername = document.getElementById('showusername')
  const showprofimg = document.getElementById('showprofimg')
  const newpost = document.getElementById('newpost')
  if (token == null) {

  } else {
    const Userid = localStorage.getItem("Userid")
    loginbtn.style.visibility = "hidden"
    registerbtn.style.visibility = "hidden"
    logoutbtn.style.display = "flex"

    let user = localStorage.getItem("user")
    const User = JSON.parse(user)


    showusername.innerHTML = `${User.username}`
    if (User.profile_image != null) {
      showprofimg.style.display = "flex"
      showprofimg.src = `${User.profile_image}`

    } else { }

    newpost.style.visibility = "visible"
  }
}

function registerpage() {
  location.href = "register.html"
}
function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  location.reload()
}


function createpost() {
  location.href = "newpost.html"
}


function postclicked(postId) {

  window.location.href = `postdetails.html?postId=${postId}`



}

let editpostbtn = document.getElementById('edit-post-btn')

function editpost(postId) {
  window.location.href = `editpost.html?postId=${postId}`

}


function deletepost(postid){
  const token = localStorage.getItem("token")
  const headers = {
    "authorization": `Bearer ${token}`
  }
  axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postid}`,{
    headers:headers
  })
  .then((response =>{

    location.reload()
    console.log(postid)
    
    if(true){
      alert("The post had been deleted successfully")
    }    

  }))
}




function userprofile(authorid){
  window.location.href = `userprofile.html?authorId=${authorid}`
  // console.log(authorid)
}

let userstring = localStorage.getItem("user")
if(userstring == null){
    const profiletag = document.getElementById('profiletag')
    profiletag.remove()
    // console.log("true")
}



