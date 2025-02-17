   let isEdit = [];
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
   function createUniqueID() {
      return 'id_' + Math.random().toString(36).substr(2, 9);
   }
   function StartValidationChange(event) {
      event.preventDefault();
      if (ValidationThenOfChange(event)) {
         let objOfVal=isEdit.pop();
         changeTodo(event, objOfVal);
         CloseChangeModal();
         StartServer() 
      }
   }
   function StartValidationCreate(event) {
      event.preventDefault();
      if (ValidationThen(event)) {
         CreateToDo(event);
         CloseCreateModal();
         document.getElementById('NameOfDo').value = '';
         document.getElementById('MasOfDescription').value = '';
         document.getElementById('MasOfDate').value = '';
         document.getElementById('MasOfTag').value = '';


      }
   }
   function ValidationThenOfChange(event) {
      let ErMasOfName = document.getElementById('errorMassageOfNameChange')
      let ErMasOfDate = document.getElementById('errorMassageOfDateChange')
      let ErMasOfTag = document.getElementById('errorMassageOfTagChange')
      let MasOfName = document.getElementById('NameOfChange').value
      let MasOfDate = document.getElementById('MasOfDateChange').value
      let MasOfTag = document.getElementById('MasOfTagChange').value
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
   function FillingITChangeFields(event, obj) {
      let MasOfName = document.getElementById('NameOfChange')
      let MasOfDate = document.getElementById('MasOfDateChange')
      let MasOfTag = document.getElementById('MasOfTagChange')
      let MasOfDescription = document.getElementById('MasOfDescriptionChange')
      let statusOfDo = document.getElementById('inProcces')
      MasOfName.value = obj.title;
      MasOfDate.value = obj.deadline;
      MasOfDescription.value = obj.dascription;
      MasOfTag.value = obj.tags;
      statusOfDo.value = obj.status;
      isEdit.push(obj);
   }
   function changeTodo(event, object) {
   let obj=FindObj(object.id)
      let MasOfName = document.getElementById('NameOfChange').value
      let MasOfDate = document.getElementById('MasOfDateChange').value
      let MasOfTag = document.getElementById('MasOfTagChange').value
      let MasOfDescription = document.getElementById('MasOfDescriptionChange').value
      let statusOfDo = document.getElementById('inProcces').value
      let UpdatedHistory = {
         action: "Updated",
         timestamp: new Date()
      };
      obj.title = MasOfName;
      obj.dascription = MasOfDescription;
      obj.tags = MasOfTag;
      obj.status = statusOfDo;
      obj.updateAt = new Date();
      obj.history.push(UpdatedHistory);
      addToStorage(obj)
      console.log(obj.history)

   }
   function addToStorage(obj){
      let a=JSON.parse(localStorage.getItem(KeyOfLocalStorage));
      a.push(obj);
      localStorage.setItem(KeyOfLocalStorage, JSON.stringify(a));
   }
   function CreateToDo(event) {
      let MasOfName = document.getElementById('NameOfDo').value
      let MasOfDate = document.getElementById('MasOfDate').value
      let MasOfTag = document.getElementById('MasOfTag').value
      let MasOfDescription = document.getElementById('MasOfDescription').value
      let statusOfDo = document.getElementById('inProccesChange').value
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
         history: [{
            action: "created",
            timestamp: new Date()
         }]
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
      item.getElementById('h2NameOftDo').textContent = Todo.title;
      item.getElementById('DescriptionOfToDo').textContent = Todo.dascription
      item.getElementById('DeadLineOfToDo').textContent = Todo.deadline
      item.getElementById('TagOfToDo').textContent = Todo.tags
      item.getElementById('StatusOfToDo').textContent = Todo.status
      item.getElementById('HiddenIdInfo').textContent=Todo.id 
      const DeleteBtn = item.querySelector('.btnDeleteToDo');
      DeleteBtn.addEventListener('click', (event) => {
         const todoItem = event.target.closest('.todo-item');
         removeTaskFromLocalStorage(Todo.id);
         todoItem.remove();
      });
      const EditBtn = item.querySelector('.btnchangeToDo');
      EditBtn.addEventListener('click', (event) => {
         OpenChangeModal();
         FillingITChangeFields(event,Todo);
         })
   list.append(item);

   }
   function removeTaskFromLocalStorage(id) {
      let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
      tasks = tasks.filter(task => task.id !== id);
      localStorage.setItem(KeyOfLocalStorage, JSON.stringify(tasks));
   }
   function StartServer() {
      document.getElementById('forToDo').innerHTML='';
      let arrayOfDo = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
      arrayOfDo.forEach(task => renderToDo(task));
   }
   function getTaskOfToDo(obj) {
      let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
      tasks.push(obj);
      return tasks;
   }
   function FindObj(id){ 
      let a=JSON.parse(localStorage.getItem(KeyOfLocalStorage))
      let b= a.filter(task=> task.id===id);
      let c = a.filter(task=> task.id!==id)
      localStorage.setItem(KeyOfLocalStorage, JSON.stringify(c))
   return b.pop();
   


   }
   let KeyOfLocalStorage = 'StorageOfToDo'
   let btnreg = document.getElementById('showPopup')
   let btncreate = document.getElementById('btncreate')
   let btnCancel = document.getElementById('CloseModal')
   let btnChange = document.getElementById('BtnChange')
   let btnCancelChange = document.getElementById('CloseModalChange')
   btnCancel.addEventListener('click', CloseCreateModal)
   btnreg.addEventListener('click', OpenCreateModal)
   btncreate.addEventListener('click', StartValidationCreate)
   btnCancelChange.addEventListener('click',CloseChangeModal)
   const confirm= document.getElementById('BtnChange')      
   confirm.addEventListener('click',(event)=>{
         StartValidationChange(event) 
         })
   innertemp()
   innerKurs()
   StartServer()