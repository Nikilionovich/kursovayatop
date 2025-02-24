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
}
function CloseCreateModal() {
   document.getElementById('createdo').close();
}
function OpenChangeModal() {
   document.getElementById('changeTodo').showModal();
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
   if (checkValid()) {
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
 return selected.length ===null? true:false
}
function selectedTag(){
   const checkboxes = document.querySelectorAll('input[name="tagchange"]:checked');
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
   let statusOfDo = document.getElementById('inProcces').value
   let UpdatedHistory = {
      action: "Updated",
      timestamp: new Date()
   };
   obj.title = MasOfName;
   obj.dascription = MasOfDescription;
   obj.deadline = MasOfDate;
   obj.tags = selectedTag();
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
   let statusOfDo = document.getElementById('inProccesChange').value
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
   addTodoToStorage(ObjToDo)
   alert("успешно занесено в базу")
   console.log(ObjToDo);
   renderToDo(ObjToDo)
}
function CreateTag(event) {
   let newTag = document.getElementById('InputNewTag');
   AddTagToStorage(newTag.value);
   alert("успешно занесено в базу");
   renderTag(newTag);
}
function addTodoToStorage(obj) {
   let a = JSON.parse(localStorage.getItem(KeyOfLocalStorage))|| [];
   a.push(obj);
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(a));
}
function AddTagToStorage(obj) {
   let a = JSON.parse(localStorage.getItem(KeyForTagOfStorage))||[];
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
   itemCreate.querySelector('#spanInTemplate').innerHTML=tag;
   itemChange.querySelector('input[name="tagchange"]').value =tag;
   itemChange.querySelector('#spanInTemplate').innerHTML=tag;
   listCreate.append(itemCreate);
   listChange.append(itemChange);
}
function removeTaskFromLocalStorage(id) {
   let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   tasks = tasks.filter(task => task.id !== id);
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(tasks));
}
function StartServer() {
   document.getElementById('forToDo').innerHTML = '';
   document.getElementById('forCreateBoard').innerHTML=''; 
   document.getElementById('forChangeBoard').innerHTML=''; 
   let arrayOfDo = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   let ArrayOfTag = JSON.parse(localStorage.getItem(KeyForTagOfStorage)) || [];
   arrayOfDo.forEach(task => renderToDo(task));
   ArrayOfTag.forEach(tag=> renderTag(tag));
}
function FindObj(id) {
   let a = JSON.parse(localStorage.getItem(KeyOfLocalStorage))
   let b = a.filter(task => task.id === id);
   let c = a.filter(task => task.id !== id)
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(c))
   return b.pop();



}

const KeyOfLocalStorage = 'StorageOfToDo';
const KeyForTagOfStorage = 'StorageOfTag';
const btnreg = document.getElementById('showPopup')
const btncreate = document.getElementById('btncreate')
const btnCancel = document.getElementById('CloseModal')
const btnChange = document.getElementById('BtnChange')
const btnCancelChange = document.getElementById('CloseModalChange')
const btnOpenTagModal = document.getElementById("CreateTag");
const BTNCreateTag = document.getElementById('createNewTag');
BTNCreateTag.addEventListener('click',StartValidationTag);
btnOpenTagModal.addEventListener('click', OpenCreateTagModal);
btnCancel.addEventListener('click', CloseCreateModal);
btnreg.addEventListener('click', OpenCreateModal);
btncreate.addEventListener('click', StartValidationCreate);
btnCancelChange.addEventListener('click', CloseChangeModal);
const confirm = document.getElementById('BtnChange');
confirm.addEventListener('click', (event) => {
   StartValidationChange(event)
})
innertemp()
innerKurs()
StartServer()