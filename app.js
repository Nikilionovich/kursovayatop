let isEdit=[];
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
function OpenModal() {

   document.getElementById('createdo').showModal()
}
function CloseModal() {
   document.getElementById('createdo').close();
}
function createUniqueID() {
   return 'id_' + Math.random().toString(36).substr(2, 9);
}
function StartValidation(event) {
   const form = document.getElementById('FormOfCreate')
   let Edit=isEdit.pop();
   event.preventDefault();
   if (ValidationThen(event)) {
      CreateToDo(event);
      CloseModal();
      document.getElementById('NameOfDo').value = '';
      document.getElementById('MasOfDescription').value = '';
      document.getElementById('MasOfDate').value = '';
      document.getElementById('MasOfTag').value = '';
      
      if(Edit!=null||Edit!=undefined)
      {
         let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
         tasks = tasks.filter(task => task.id !== Edit.id);
         localStorage.setItem(KeyOfLocalStorage, JSON.stringify(tasks));
         document.getElementById('forToDo').innerHTML = '';
         StartServer()
         console.log(Edit)
      }
   }
}
function ValidationThen(event) {
   let ErMasOfName = document.getElementById('errorMassageOfName')
   let ErMasOfDate = document.getElementById('errorMassageOfDate')
   let ErMasOfTag = document.getElementById('errorMassageOfTag')
   let MasOfName = document.getElementById('NameOfDo').value
   let MasOfDate = document.getElementById('MasOfDate').value
   let MasOfTag = document.getElementById('MasOfTag').value
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
function checkTime(d1, d2) {
   return d1.setHours(0, 0, 0, 0) >= d2.setHours(0, 0, 0, 0);
}
function CreateToDo(event) {

   let MasOfName = document.getElementById('NameOfDo').value
   let MasOfDate = document.getElementById('MasOfDate').value
   let MasOfTag = document.getElementById('MasOfTag').value
   let MasOfDescription = document.getElementById('MasOfDescription').value
   let statusOfDo = document.getElementById('inProcces').value
   let UniqueId = createUniqueID();
   let ObjToDo = {
      id: UniqueId,
      title: MasOfName,
      dascription: MasOfDescription,
      deadline: MasOfDate,
      tags: MasOfTag,
      status: statusOfDo,
      createAt: new Date(),
      updateAt: new Date(),
      history: {
         action: "created",
         timestamp: new Date()
      }
   };
   let Task = getTaskOfToDo(ObjToDo);
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(Task))
   alert("успешно занесено в базу")
   renderToDo(ObjToDo)
}
function renderToDo(Todo) {
   const list = document.getElementById('forToDo')
   const template = document.getElementById('TemplateCard')
   const item = template.content.cloneNode(true)
   item.getElementById('h2NameOftDo').textContent= Todo.title;
   item.getElementById('DescriptionOfToDo').textContent= Todo.dascription
   item.getElementById('DeadLineOfToDo').textContent= Todo.deadline
   item.getElementById('TagOfToDo').textContent= Todo.tags
   item.getElementById('StatusOfToDo').textContent= Todo.status
   const DeleteBtn=item.querySelector('.btnDeleteToDo');
   DeleteBtn.addEventListener('click',(event)=>{
      const todoItem = event.target.closest('.todo-item');
      removeTaskFromLocalStorage(Todo.id);
      todoItem.remove();
    });
   const EditBtn=item.querySelector('.btnchangeToDo');
   EditBtn.addEventListener('click',(event)=>{
      const todoEdit = event.target.closest('.todo-item');
       let thingOfEdit = findToDo(Todo);
       OpenModal() 
       EditToDo(Todo,event)

   })
    list.append(item);
  }
  function EditToDo(obj,event){
   let MasOfName = document.getElementById('NameOfDo')
   let MasOfDate = document.getElementById('MasOfDate')
   let MasOfTag = document.getElementById('MasOfTag')
   let MasOfDescription = document.getElementById('MasOfDescription')
   let statusOfDo = document.getElementById('inProcces')
   MasOfName.value=obj.title;
   MasOfDate.value=obj.deadline;
   MasOfDescription.value=obj.dascription;
   MasOfTag.value=obj.tags;
   statusOfDo.value=obj.status;
   obj.updateAt=new Date();
   obj.history.action="Updated";
   obj.history.timestamp=new Date();
   isEdit.push(obj);
  }
  function findToDo(id){
   let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].id===id.id){
         localStorage.setItem(KeyOfLocalStorage, JSON.stringify(tasks));
         return tasks[i];
      }
   }
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(tasks));
  }
  function removeTaskFromLocalStorage(id) {
   let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   tasks = tasks.filter(task => task.id !== id);
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(tasks));
 }
  function StartServer() {
    let arrayOfDo = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
    arrayOfDo.forEach(task => renderToDo(task));
  }
function getTaskOfToDo(obj) {
   let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   tasks.push(obj);
   return tasks;
 }
let KeyOfLocalStorage = 'StorageOfToDo'
let btnreg = document.getElementById('showPopup')
let btncreate = document.getElementById('btncreate')
let btnCancel = document.getElementById('CloseModal')
btnCancel.addEventListener('click', CloseModal)
btnreg.addEventListener('click', OpenModal)
btncreate.addEventListener('click', StartValidation)
innertemp()
innerKurs()
StartServer()