siteNameInput=document.getElementById('siteName');
siteLinkInput=document.getElementById('siteLink');
var searchInput=document.getElementById('searchInput');
inputs=document.getElementsByClassName('form-control');
var currentIndex=0;
var bookmarks=[];
var submitBtn=document.getElementById('submitBtn');
if(JSON.parse(localStorage.getItem("bookmarkList"))!=null){
  bookmarks=JSON.parse(localStorage.getItem("bookmarkList"));
  displaySites();
}
submitBtn.onclick=function()
{
  if(submitBtn.innerHTML=='Submit'){
    addSite();
  }
  else{
    updateSite();
  }
  displaySites();
  clearInput();
}
function addSite(){
  var bookmark={
    name:siteNameInput.value,
    link:siteLinkInput.value
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarkList",JSON.stringify(bookmarks));

}
function displaySites(){
  var data='';
  for(var i=0;i<bookmarks.length;i++){
    data+=`
    <section class="main-background  p-5 w-100 my-5">
    <div >
    <div class="row">
    <div class="col-5">
    <div >
    <h4> ${bookmarks[i].name}</h4>
    </div>
    </div>
    <div class="col-7">
     <div class="row">
      <div class="col-md-4 col-sm-12">
    <div class="">
    <button onclick="visitSite(${i})"class=" btn btn-primary p-2 text-white  m-2" > Visit</button>
    </div>
    </div>
    <div class="col-md-4 col-sm-12">
    <div class="">
    <button onclick="getSiteData(${i})" class="btn btn-warning p-2 text-white  m-2"> Update</button>
    </div>
    </div>
    <div class="col-md-4 col-sm-12">
    <div class="">
    <button onclick="deleteSite(${i})" class="btn btn-danger p-2 text-white m-2"> Delete</button>
    </div>
    </div>
    
    </div>
    
    </div>
    
    </div>
    
    </div>
    
    </section>
    `

  }

  
  document.getElementById('output').innerHTML=data;
}
function deleteSite(index){
  bookmarks.splice(index,1);
  localStorage.setItem("bookmarkList",JSON.stringify(bookmarks));
  displaySites();
}
function clearInput(){
  for(var i=0;i<inputs.length;i++){
    inputs[i].value='';
  }
}
searchInput.onkeyup=function(){
  var data='';
  for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
      data+=`
    <section class="main-background  p-5 w-100 my-5">
    <div >
    <div class="row">
    <div class="col-5">
    <div >
    <h4> ${bookmarks[i].name}</h4>
    </div>
    </div>
    <div class="col-7">
     <div class="row">
      <div class="col-md-4 col-sm-12">
    <div class="">
    <button onclick="visitSite(${i})"class=" btn btn-primary p-2 text-white  m-2" > Visit</button>
    </div>
    </div>
    <div class="col-md-4 col-sm-12">
    <div class="">
    <button onclick="getSiteData(${i})" class="btn btn-warning p-2 text-white  m-2"> Update</button>
    </div>
    </div>
    <div class="col-md-4 col-sm-12">
    <div class="">
    <button onclick="deleteSite(${i})" class="btn btn-danger p-2 text-white m-2"> Delete</button>
    </div>
    </div>
    
    </div>
    
    </div>
    
    </div>
    
    </div>
    
    </section>
    `

  
    }
  }
  document.getElementById('output').innerHTML=data;

}
function visitSite(index){
  window.open(bookmarks[index].link,'_blank');
}
function getSiteData(index){
  currentIndex=index;
  var currentSite=bookmarks[index];
  siteNameInput.value=currentSite.name;
  siteLinkInput.value=currentSite.link;
  submitBtn.innerHTML='Update Site';
}
function updateSite(){
  var bookmark={
    name:siteNameInput.value,
    link:siteLinkInput.value
  };
  bookmarks[currentIndex]=bookmark;
  localStorage.setItem("bookmarkList",JSON.stringify(bookmarks));
  submitBtn.innerHTML='Submit';
}
var errorMsg=document.getElementById('errorName-msg');
var errorURLMsg=document.getElementById('errorURL-msg');
var errorSearchMsg=document.getElementById('errorSearch-msg');
siteLinkInput.onkeyup=function(){
  var siteLinkRejex=/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if(siteLinkRejex.test(siteLinkInput.value)){
    submitBtn.removeAttribute('disabled');
    siteLinkInput.classList.add('is-valid');
    siteLinkInput.classList.remove('is-invalid');
    errorURLMsg.classList.add('d-none'); 
  }
  else{
    submitBtn.disabled='true'
    siteLinkInput.classList.add('is-invalid');
    siteLinkInput.classList.remove('is-valid');
    errorURLMsg.classList.remove('d-none');

  }
}
siteNameInput.onkeyup=function(){
  var siteNameRejex=/^[a-zA-z]{3,10}$/;
  if(siteNameRejex.test(siteNameInput.value)){
    submitBtn.removeAttribute('disabled');
    siteNameInput.classList.add('is-valid');
    siteNameInput.classList.remove('is-invalid');
    errorMsg.classList.add('d-none'); 
  }
  else{
    submitBtn.disabled='true'
    siteNameInput.classList.add('is-invalid');
    siteNameInput.classList.remove('is-valid');
    errorMsg.classList.remove('d-none');
  }

}
searchInput.onkeyup=function(){
  var siteSearchRejex=/^[a-zA-z]{3,10}$/;
  if(siteSearchRejex.test(searchInput.value)){
 
    searchInput.classList.add('is-valid');
    searchInput.classList.remove('is-invalid');
    errorSearchMsg.classList.add('d-none'); 
  }
  else{
 
    searchInput.classList.add('is-invalid');
    searchInput.classList.remove('is-valid');
    errorSearchMsg.classList.remove('d-none');
  }

}