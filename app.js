let isEditTodo = [];
async function ApiTemp() {

   const url = 'https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=cb8c1937ba2ab4009d5f9b08aab609b6';
   const response = await fetch(url);
   const datatemp = await response.json();
   return datatemp
}
async function renderTemp() {
   const datatemp = await ApiTemp();
   let b = `${(datatemp.main.temp - 273).toFixed(1)}°C`
   return b;
}
async function innertemp() {
   const data = await renderTemp()
   let divt = document.getElementById("temp")
   divt.innerHTML += data;
}
async function ApiKurs() {

   const url = ' https://api.nbrb.by/exrates/rates/431'
   const response = await fetch(url)
   const datatemp = await response.json();
   return datatemp
}
async function renderKurs() {
   const datatemp = await ApiKurs();
   let b = `${(datatemp.Cur_OfficialRate).toFixed(2)}BYN`
   return b;
}
async function innerKurs() {
   const data = await renderKurs()
   let divt = document.getElementById("kurs")
   divt.innerHTML += data;
}
function OpenCreateModal() {
   document.getElementById('createdo').showModal()
   document.getElementById('detailscreate').open=false;
}
function CloseCreateModal() {
   document.getElementById('createdo').close();
   
}
function OpenChangeModal() {
   document.getElementById('changeTodo').showModal(); 
   document.getElementById('detailschange').open=false
}
function CloseChangeModal() {
   document.getElementById('changeTodo').close();
  
}
function OpenCreateTagModal() {
   document.getElementById("DialogOFcreateTag").showModal();
}
function CloseTagModal() {
   document.getElementById("DialogOFcreateTag").close();
}
function createUniqueID() {
   return 'id_' + Math.random().toString(36).substr(2, 9);
}

function renderSortedAr(ar){
   ar.forEach(element => {
      renderToDo(element);
   });
}
function sortDateAt(){
   hideDropdown();
   clearToDoOnSite();
   let ItemForSort=createDublicateForSort();
   ItemForSort.sort((a, b) => {
      return new Date(a.createAt) - new Date(b.createAt);
  });
  renderSortedAr(ItemForSort);
}
function sortInProcces(){
   hideDropdown();
   clearToDoOnSite();
   let Item=createDublicateForSort();
   let arrforsort=[]
   for (const el of Item) {
      if (el.status==="InProcces") {
         arrforsort.push(el);
      }
   }
   renderSortedAr(arrforsort);
   localStorage.setItem(KeyForSortOfStorage, JSON.stringify(arrforsort));
  
}
function sortfinish(){
   hideDropdown();
   clearToDoOnSite();
   let Item=createDublicateForSort();
   let arrforsort=[]
   for (const el of Item) {
      if (el.status==="Finish") {
         arrforsort.push(el);
      }
   }
   renderSortedAr(arrforsort);
   localStorage.setItem(KeyForSortOfStorage, JSON.stringify(arrforsort));
}
function filtofstatus(filetrofwhat){
if (filetrofwhat===0) {
   sortInProcces();
}
else sortfinish();
}
function isDateInRangerendcreateat( startDate, endDate) {
   let  todos=JSON.parse(localStorage.getItem(KeyForSortOfStorage)) || []
   endDate= new Date(endDate).getTime();
   startDate=new Date(startDate).getTime();
   const startDate1 = Math.min(startDate, endDate);
    const endDate1 = Math.max(startDate, endDate);
     for (let i = 0; i < todos.length; i++) {
      if (todos[i].createAt >= startDate1 && todos[i].createAt <= endDate1)
      {
         renderToDo(todos[i])
      }
      
   }
}
function isDateInRangerenddeadline( startDate, endDate) {
   let  todos=JSON.parse(localStorage.getItem(KeyForSortOfStorage)) || []
   endDate= new Date(endDate).getTime();
   startDate=new Date(startDate).getTime();
   const startDate1 = Math.min(startDate, endDate);
    const endDate1 = Math.max(startDate, endDate);
     for (let i = 0; i < todos.length; i++) {
      if (todos[i].deadline >= startDate1 && todos[i].deadline <= endDate1)
      {
         renderToDo(todos[i])
      }
      
   }
}
function createDublicateForSort(){
   let a = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(a));
   return a;
}
function clearToDoOnSite(){
   document.getElementById('forToDo').innerHTML='';
}
function filterall(filterdate){
    let checkatcreate1= document.getElementById('firstdateforatcreate');
    let checkatcreate2=document.getElementById('seconddateforatcreate');
    let checkdeadline1=document.getElementById('firstdatefordeadline');
    let checkdeadline2=document.getElementById('seconddatefordeadline');
   resetsortstorage();
   if(filterdate!== undefined){filtofstatus(filterdate);}
   if (selectedTagForFilter().length!==0) {
      filetifselecttag();
   }
   if(checkatcreate1.value!==""||checkatcreate2.value!==""){isDateInRangerendcreateat(checkatcreate1.value,checkatcreate2.value);}
   if(checkdeadline1.value!==""||checkdeadline2.value!==""){isDateInRangerenddeadline(checkdeadline1.value,checkdeadline2.value);} 
}

function filetifselecttag(){
      clearToDoOnSite(); 
      let  selectedtags=selectedTagForFilter();
      let todo=JSON.parse(localStorage.getItem(KeyForSortOfStorage))||[];
      let filterallready=[];
        for (let i = 0; i < todo.length; i++)
         {  
         for (let j = 0;  j< selectedtags.length;j++) {
            for (let h = 0; h < todo[i].tags.length; h++) {
              if (todo[i].tags[h]===selectedtags[j])
               {
                 renderToDo(todo[i]);
                 filterallready.push(todo[i])
                 j=0;
                 break;
              }
            }
            
         }           
      }
      localStorage.setItem(KeyForSortOfStorage, JSON.stringify(filterallready));
}
function StartValidationChange(event) {
   event.preventDefault();
   if (ValidationThenOfChange(event)) {
      let objOfVal = isEditTodo.pop();
      changeTodo(event, objOfVal);
      CloseChangeModal();
      StartServer()
   }
}
function StartValidationCreate(event) {
   event.preventDefault();
   if (ValidationThenOfTodo(event)) {
      CreateToDo(event);
      CloseCreateModal();
      StartServer();
      document.getElementById('NameOfDo').value = '';
      document.getElementById('MasOfDescription').value = '';
      document.getElementById('MasOfDate').value = '';
      document.getElementById('MasOfTag').value = '';


   }
}
function StartValidationTag(event){
   event.preventDefault();
   if (ValidationThenOfTag(event)) {
      CreateTag(event);
       document.getElementById('InputNewTag').innerHTML=''
      CloseTagModal();
     
   }
}
function ValidationThenOfChange(event) {
   let ErMasOfName = document.getElementById('errorMassageOfNameChange')
   let ErMasOfDate = document.getElementById('errorMassageOfDateChange')
   let ErMasOfTag = document.getElementById('errorMassageOfTagChange')
   let MasOfName = document.getElementById('NameOfChange').value
   let MasOfDate = document.getElementById('MasOfDateChange').value
   let MasOfTag = document.getElementById('MasOfTagChange')
   const date1 = new Date(MasOfDate);
   const date2 = new Date();
   let Valid = true;
   ErMasOfName.innerHTML = '';
   ErMasOfDate.innerHTML = '';
   ErMasOfTag.innerHTML = '';
   if (MasOfName === '' || MasOfName.length < 3) {
      Valid = false;
      ErMasOfName.innerHTML = 'Поле "Название" должно быть заполенно ';
   }

   if (MasOfDate === '' || !checkTime(date1, date2)) {
      Valid = false;
      ErMasOfDate.innerHTML = 'Поле "Дедлайн" должно быть заполенно';
   }
   if (MasOfTag === '') {
      Valid = false;
      ErMasOfTag.innerHTML = 'Поле "Тег"  должно быть заполенно. ';
   }
   if (!Valid) {
      event.preventDefault();
   }
   return Valid
}
function ValidationThenOfTodo(event) {
   let ErMasOfName = document.getElementById('errorMassageOfName')
   let ErMasOfDate = document.getElementById('errorMassageOfDate')
   let ErMasOfTag = document.getElementById('errorMassageOfTag')
   let MasOfName = document.getElementById('NameOfDo').value
   let MasOfDate = document.getElementById('MasOfDate').value
   const date1 = new Date(MasOfDate);
   const date2 = new Date();
   let Valid = true;
   let MasOfTag=selectedTag().length;
   ErMasOfName.innerHTML = '';
   ErMasOfDate.innerHTML = '';
   ErMasOfTag.innerHTML = '';
   if (MasOfName === '' || MasOfName.length < 3) {
      Valid = false;
      ErMasOfName.innerHTML = 'Поле "Название" должно быть заполенно ';
   }

   if (MasOfDate === '' || !checkTime(date1, date2)) {
      Valid = false;
      ErMasOfDate.innerHTML = 'Поле "Дедлайн" должно быть заполенно';
   }
   if (MasOfTag===0) {
      Valid = false;
      ErMasOfTag.innerHTML = 'Поле "Тег"  должно быть заполенно. ';
   }
   if (!Valid) {
      event.preventDefault();
   }
   return Valid
}
function ValidationThenOfTag(event) {
   let Valid = true;
   let newTag = document.getElementById('InputNewTag').value.trim();  
   let TagInStorage = JSON.parse(localStorage.getItem(KeyForTagOfStorage)) || [];
   TagErrorMas.innerHTML = '';
   Valid=checkTagIsCorrect(event,TagInStorage,newTag);
   return Valid;
}
function checkTagIsCorrect(event,ArrayOfTag,newTag){ 
   let Valid=true;
   let TagErrorMas = document.getElementById('TagErrorMas');
   for (let i = 0; i <= ArrayOfTag.length; i++) {
      
      if (newTag==="") {
         Valid = false;
         TagErrorMas.innerHTML = "вы не ввели тэг!!!";
         break;
      }
      if (ArrayOfTag.length===0 ) {
         if (newTag==="") {
            Valid = false;
            TagErrorMas.innerHTML = "вы не ввели тэг!!!";
            break;
         }
         else return Valid
      }
      if (ArrayOfTag[i] === newTag) {
         Valid = false;
         TagErrorMas.innerHTML = "Такой тег уже есть!!!";
         break;
      }
      if (!Valid) {
         event.preventDefault();
      }
     
   }
   return Valid;
}
function checkValid() {
   const checkboxes = document.querySelectorAll('input[name="tag"]:checked');
   let selected = [];
   checkboxes.forEach((checkbox) => {
       selected.push(checkbox.value);
   });
 return selected.length ===null? false:true
}
function selectedTag(){
   const checkboxes = document.querySelectorAll('input[name="tag"]:checked');
   let selected = [];
   checkboxes.forEach((checkbox) => {
       selected.push(checkbox.value);
   });
 return selected;
}
function selectedTagForChange(){
   const checkboxes = document.querySelectorAll('input[name="tagchange"]:checked');
   let selected = [];
   checkboxes.forEach((checkbox) => {
       selected.push(checkbox.value);
   });
 return selected;
}
function selectedTagForFilter(){
   const checkboxes = document.querySelectorAll('input[name="tagfilt"]:checked');
   let selected = [];
   checkboxes.forEach((checkbox) => {
       selected.push(checkbox.value);
   });
 return selected;
}
function checkTime(d1, d2) {
   return d1.setHours(0, 0, 0, 0) >= d2.setHours(0, 0, 0, 0);
}
function FillingTagField(tag){
   const checkboxes = document.querySelectorAll('input[name="tagchange"]');   
   for (let i = 0; i < checkboxes.length; i++) {
     
       if (tag ===checkboxes[i].value) {
         checkboxes[i].checked = true;
          break;
      }
      else {checkboxes.checked=false;}
   }
     
}

function FillingITChangeFields(event, obj) {
   let MasOfName = document.getElementById('NameOfChange')
   let MasOfDate = document.getElementById('MasOfDateChange')
   let MasOfTag = document.getElementById('MasOfTagChange')
   let MasOfDescription = document.getElementById('MasOfDescriptionChange')
   let statusOfDo = document.getElementById('inProcces')
   MasOfName.value = obj.title;
   MasOfDate.value = obj.deadline;
   MasOfDescription.value = obj.dascription;
   for (let i = 0; i < obj.tags.length; i++) {
      FillingTagField(obj.tags[i]);
   }
   
   statusOfDo.value = obj.status;
   isEditTodo.push(obj);
   
}
function changeTodo(event, object) {
   let obj = FindObj(object.id)
   let MasOfName = document.getElementById('NameOfChange').value
   let MasOfDate = document.getElementById('MasOfDateChange').value
   let MasOfTag = document.getElementById('MasOfTagChange')
   let MasOfDescription = document.getElementById('MasOfDescriptionChange').value
   let statusOfDo = document.getElementById('mySelectchange').value
   let UpdatedHistory = {
      action: "Updated",
      timestamp: new Date()
   };
   obj.title = MasOfName;
   obj.dascription = MasOfDescription;
   obj.deadline = MasOfDate;
   obj.tags = selectedTagForChange();
   obj.status = statusOfDo;
   obj.updateAt = new Date();
   obj.history.push(UpdatedHistory);
   addTodoToStorage(obj)
}
function CreateToDo(event) {
   let MasOfName = document.getElementById('NameOfDo').value
   let MasOfDate = document.getElementById('MasOfDate').value
   let MasOfTag = JSON.parse(localStorage.getItem(KeyForTagOfStorage))||[];
   let MasOfDescription = document.getElementById('MasOfDescription').value
   let statusOfDo = document.getElementById('mySelect').value
   let UniqueId = createUniqueID();
   let ObjToDo = {
      id: UniqueId,
      title: MasOfName,
      dascription: MasOfDescription,
      deadline: MasOfDate,
      tags:selectedTag() ,
      status: statusOfDo,
      createAt: new Date(),
      updateAt: new Date(),
      history: [{
         action: "created",
         timestamp: new Date()
      }]
   };
   console.log(ObjToDo.tags)
   addTodoToStorage(ObjToDo)
   alert("успешно занесено в базу")
   renderToDo(ObjToDo)
}
function CreateTag(event) {
   let newTag = document.getElementById('InputNewTag');
   AddTagToStorage(newTag.value);
   alert("успешно занесено в базу");
   renderTag(newTag.value);
   renderTagForFilter(newTag.value);
}
function addTodoToStorage(obj) {
   let a = JSON.parse(localStorage.getItem(KeyOfLocalStorage))|| [];
   a.push(obj);
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(a));
}
function AddTagToStorage(obj) {
   let a = JSON.parse(localStorage.getItem(KeyForTagOfStorage)) || [];
   a.push(obj);
   localStorage.setItem(KeyForTagOfStorage, JSON.stringify(a));
}

function renderToDo(Todo) {
   const list = document.getElementById('forToDo')
   const template = document.getElementById('TemplateCard')
   const item = template.content.cloneNode(true)
   item.getElementById('h2NameOftDo').textContent = Todo.title;
   item.getElementById('DescriptionOfToDo').textContent = Todo.dascription;
   item.getElementById('DeadLineOfToDo').textContent = Todo.deadline;
   for (const i in Todo.tags) {
       item.querySelector('#TagOfToDo').textContent += Todo.tags[i]+",";
   }
   item.getElementById('StatusOfToDo').textContent = Todo.status;
   item.getElementById('HiddenIdInfo').textContent = Todo.id;
   const DeleteBtn = item.querySelector('.btnDeleteToDo');
   DeleteBtn.addEventListener('click', (event) => {
      const todoItem = event.target.closest('.todo-item');
      removeTaskFromLocalStorage(Todo.id);
      todoItem.remove();
   });
   const EditBtn = item.querySelector('.btnchangeToDo');
  
   EditBtn.addEventListener('click', (event) => {
      OpenChangeModal();
      FillingITChangeFields(event, Todo);
   })
   list.append(item);

}
function renderTag(tag){
   const listCreate = document.getElementById('forCreateBoard');
   const listChange = document.getElementById('forChangeBoard');
   const templateCreate = document.getElementById('templatetagForCreate');
   const templateChange = document.getElementById('templatetagForChange');
   const itemCreate = templateCreate.content.cloneNode(true) ;
   const itemChange = templateChange.content.cloneNode(true) ;
   itemCreate.querySelector('input[name="tag"]').value =tag;
   itemCreate.querySelector('#spanInTemplateCreate').innerHTML=tag;
   itemChange.querySelector('input[name="tagchange"]').value =tag;
   itemChange.querySelector('#spanInTemplateChange').innerHTML=tag;
   listCreate.append(itemCreate);
   listChange.append(itemChange);
}
function renderTagForFilter(tag){
const list=document.getElementById('forCreateBoardfilt');
const template=document.getElementById('Temptagfilter');
const item=template.content.cloneNode(true);
item.querySelector('input[name="tagfilt"]').value=tag;
item.querySelector('#spanInTemplatefilter').innerHTML=tag;
list.append(item)
}
function removeTaskFromLocalStorage(id) {
   let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   tasks = tasks.filter(task => task.id !== id);
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(tasks));
}
function clearall(){
document.getElementById('forToDo').innerHTML = '';
   document.getElementById('forCreateBoard').innerHTML=''; 
   document.getElementById('forChangeBoard').innerHTML=''; 
   document.getElementById('forCreateBoardfilt').innerHTML='';
   let arrfilt=selectedTagForFilter();
   for (let i = 0; i < arrfilt.length; i++) {
      array[i].checked=false;
   }
}
function StartServer() {
   
   clearall();
   let arrayOfDo = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   let ArrayOfTag = JSON.parse(localStorage.getItem(KeyForTagOfStorage)) || [];
   arrayOfDo.forEach(task => renderToDo(task));
   ArrayOfTag.forEach(tag=> renderTag(tag));
   ArrayOfTag.forEach(tag=> renderTagForFilter(tag));

}
function FindObj(id) {
   let a = JSON.parse(localStorage.getItem(KeyOfLocalStorage))
   let b = a.filter(task => task.id === id);
   let c = a.filter(task => task.id !== id)
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(c))
   return b.pop();
}
function showDropdownFilter() {
   const dropdownContent = document.getElementById('dropdownContent2');
   dropdownContent.style.display = 'block';
}

function hideDropdownFilter() {
   const dropdownContent = document.getElementById('dropdownContent2');
   dropdownContent.style.display = 'none';
}

function showDropdown() {
   const dropdownContent = document.getElementById('dropdownContent1');
   dropdownContent.style.display = 'block';
}

function hideDropdown() {
   const dropdownContent = document.getElementById('dropdownContent1');
   dropdownContent.style.display = 'none';
}

function toggleDropdownfilter(event) {
   event.stopPropagation();
   const dropdownContent = document.getElementById('dropdownContent2');
   if (dropdownContent.style.display === 'block') {
       hideDropdownFilter();
   } else {
       hideDropdown();
       showDropdownFilter();
   }
}

function toggleDropdown(event) {
   event.stopPropagation();
   const dropdownContent = document.getElementById('dropdownContent1');
   if (dropdownContent.style.display === 'block') {
       hideDropdown();
   } else {
       hideDropdownFilter();
       showDropdown();
   }
}
function showtagPopup(){
   const rect = filterTag.getBoundingClientRect();
   tagPopup.classList.remove('hidden');
   isHoveringtag = true;
}
function showdaedlinePopup(){
   const rect = filterdeadline.getBoundingClientRect();
   deadlinePopup.classList.remove('hidden');
   isHoveringdeadline = true;
}
function showPopup() {
   const rect = filterStatus.getBoundingClientRect();
   statusPopup.classList.remove('hidden');
   isHovering = true;
}
function showbydatePopup() {
   const rect = filterbydate.getBoundingClientRect();
   datePopup.classList.remove('hidden');
   isHoveringbydate = true;
}
function hidetagPopup()
{
   tagPopup.classList.add('hidden');
   isHoveringtag = false; 
}
function hidedeadlinePopup()
{
   deadlinePopup.classList.add('hidden');
   isHoveringdeadline = false; 
}
function hidebydatePopup()
{
   datePopup.classList.add('hidden');
   isHoveringbydate = false; 
}
function hidePopup() {
   statusPopup.classList.add('hidden');
   isHovering = false; 
}
function checkHoverForPuptag(){
   if (!isHoveringtag) {
      hidetagPopup(); 
   }
}
function checkHoverForPupdeadline(){
   if (!isHoveringdeadline) {
      hidedeadlinePopup(); 
   }
}

function checkHoverForPup(){
   if (!isHovering) {
      hidePopup(); 
   }
}
function checkHoverForPupbydate(){
   if (!isHoveringbydate) {
      hidebydatePopup(); 
   }
}
function cursorOnModuletag(){
   isHoveringtag = true;
}
function cursorOnModulebydate(){
   isHoveringbydate = true;
}
function cursorOnModule(){
   isHovering = true;
}
function cursorOnModuledeadline(){
   isHoveringdeadline = true;
}
function lastCheckForcursortag(){
   isHoveringtag = false;
   setTimeout(() => {
       if (!filterTag.matches(':hover') && !tagPopup.matches(':hover')) {
           hidetagPopup(); 
       }
   }, 100); 
}
function lastCheckForcursortdeadline(){
   isHoveringdeadline= false;
   setTimeout(() => {
       if (!filterdeadline.matches(':hover') && !deadlinePopup.matches(':hover')) {
           hidedeadlinePopup(); 
       }
   }, 100); 
}
function lastCheckForcursortbydate(){
   isHoveringbydate= false;
   setTimeout(() => {
       if (!filterbydate.matches(':hover') && !datePopup.matches(':hover')) {
           hidebydatePopup(); 
       }
   }, 100); 
}
function lastCheckForcursor(){
   isHovering = false;
   setTimeout(() => {
       if (!filterStatus.matches(':hover') && !statusPopup.matches(':hover')) {
           hidePopup(); 
       }
   }, 100); 
}
 function resetsortstorage(){
   let a=createDublicateForSort();
   localStorage.setItem(KeyForSortOfStorage, JSON.stringify(a));
 }
document.addEventListener('click', function(event) {
   const dropdownContent1 = document.getElementById('dropdownContent1');
   const dropdownContent2 = document.getElementById('dropdownContent2');
   if (!event.target.closest('.dropdown')) {
       hideDropdown();
       hideDropdownFilter();
   }
});
document.addEventListener('mouseover', (event) => {
   if (!filterStatus.contains(event.target) && !statusPopup.contains(event.target)) {
       hidePopup();
   }
});
document.addEventListener('mouseover', (event) => {
   if (!filterTag.contains(event.target) && !tagPopup.contains(event.target)) {
       hidetagPopup();
   }
});
document.addEventListener('mouseover', (event) => {
   if (!filterbydate.contains(event.target) && !datePopup.contains(event.target)) {
       hidebydatePopup();
   }
});
document.addEventListener('mouseover', (event) => {
   if (!filterdeadline.contains(event.target) && !deadlinePopup.contains(event.target)) {
       hidedeadlinePopup();
   }
});
const KeyOfLocalStorage = 'StorageOfToDo';
const KeyForTagOfStorage = 'StorageOfTag';
const KeyForSortOfStorage= 'StorageForSort';
const btnreg = document.getElementById('showPopup');
const btncreate = document.getElementById('btncreate');
const btnCancel = document.getElementById('CloseModal');
const btnChange = document.getElementById('BtnChange');
const btnCancelChange = document.getElementById('CloseModalChange');
const btnOpenTagModal = document.getElementById("CreateTag");
const BTNCreateTag = document.getElementById('createNewTag');
const btnSort=document.getElementById('dropbtn1');
const btnDateSort=document.getElementById('sortDateAt');
const btnsortAlphabetically=document.getElementById('sortAlphabetically');
const btnFilterDrop=document.getElementById('dropbtn2');
const filterStatus = document.getElementById('filterStatus');

const statusPopup = document.getElementById('statusPopup');
const btnsortInProcces=document.getElementById('statusInProcces');
const btnsortfinish=document.getElementById('statusFinish');

const filterTag =document.getElementById('filterTag');
const tagPopup= document.getElementById('tagPopup');
const btnfiltertag=document.getElementById('btnfiltertag');

const filterbydate =document.getElementById('filterDateAt');
const datePopup= document.getElementById('datePopup');
const btnfitlerdate=document.getElementById('btndilterbydate');

const filterdeadline=document.getElementById('filterDeadline');
const deadlinePopup=document.getElementById('deadlinePopup');
const btnfilterdeadline=document.getElementById('btndilterdeadline');

const refreshbtn=document.getElementById('refreshbtn');
let filterinproccesorfinish=null;
let isHovering = false;
let isHoveringtag=false;
let isHoveringbydate=false;
let isHoveringdeadline=false;

btnfitlerdate.addEventListener('click',()=> filterall());
btnfilterdeadline.addEventListener('click',()=> filterall());
btnfiltertag.addEventListener('click',()=> filterall());

refreshbtn.addEventListener('click',resetsortstorage);
refreshbtn.addEventListener('click',StartServer);

btnsortfinish.addEventListener('click',() =>{
   filterinproccesorfinish=1;
   filterall(filterinproccesorfinish);
});
btnsortInProcces.addEventListener('click',() => {
   filterinproccesorfinish=0;
   filterall(filterinproccesorfinish)});

filterTag.addEventListener('mouseenter',showtagPopup);
filterTag.addEventListener('mouseleave',checkHoverForPuptag);
tagPopup.addEventListener('mouseenter', cursorOnModuletag);
tagPopup.addEventListener('mouseleave', lastCheckForcursortag);

filterdeadline.addEventListener('mouseenter',showdaedlinePopup);
filterdeadline.addEventListener('mouseleave',checkHoverForPupdeadline);
deadlinePopup.addEventListener('mouseenter', cursorOnModuledeadline);
deadlinePopup.addEventListener('mouseleave', lastCheckForcursortdeadline);

filterbydate.addEventListener('mouseenter',showbydatePopup);
filterbydate.addEventListener('mouseleave',checkHoverForPupbydate);
datePopup.addEventListener('mouseenter', cursorOnModulebydate);
datePopup.addEventListener('mouseleave', lastCheckForcursortbydate);

filterStatus.addEventListener('mouseenter', showPopup);
filterStatus.addEventListener('mouseleave', checkHoverForPup);
statusPopup.addEventListener('mouseenter', cursorOnModule);
statusPopup.addEventListener('mouseleave', lastCheckForcursor);

btnFilterDrop.addEventListener('click',toggleDropdownfilter);
btnSort.addEventListener('click',toggleDropdown);
btnOpenTagModal.addEventListener('click', OpenCreateTagModal);

btnCancel.addEventListener('click', CloseCreateModal);
btnreg.addEventListener('click', OpenCreateModal);

btnDateSort.addEventListener('click',sortDateAt);
BTNCreateTag.addEventListener('click',StartValidationTag);

btncreate.addEventListener('click', StartValidationCreate);
btnCancelChange.addEventListener('click', CloseChangeModal);

const confirm = document.getElementById('BtnChange');
confirm.addEventListener('click', (event) => {
   StartValidationChange(event)
});
btnsortAlphabetically.addEventListener('click',()=> {
   hideDropdown();
   clearToDoOnSite();
   let ItemForSort=createDublicateForSort();
   ItemForSort.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
      }
      return 0;
  });
  renderSortedAr(ItemForSort);
});
innertemp();
innerKurs();
resetsortstorage();
StartServer()
sortDateAt()