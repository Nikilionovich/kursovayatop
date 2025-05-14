let isEditTodo = [];
 async function ApiTemp() {
   try {
     // URL для запроса к API OpenWeatherMap (город: Минск, appid: ваш API-ключ)
     const url ="https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=cb8c1937ba2ab4009d5f9b08aab609b6 ";
     // Отправка GET-запроса
     const response = await fetch(url);
     // Проверяем успешность ответа
     if (!response.ok) {
       throw new Error("произошла ошибка при вызове api температуры");
     }
     // Преобразуем ответ в JSON
     const datatemp = await response.json();
     // Возвращаем полученные данные
     return datatemp;
   } catch (error) {
     // Ловим и выводим ошибку в консоль
     console.error("произошла ошибка при вызове api температуры", error.message);
   }
 }
 async function renderTemp() {
   // Получаем данные о погоде
   const datatemp = await ApiTemp();
   // Конвертируем температуру из Кельвинов в Цельсии и округляем до одного знака после запятой
   let b = `${(datatemp.main.temp - 273).toFixed(1)}°C`;
   // Возвращаем результат как строку
   return b;
 }
 async function innertemp() {
   // Получаем строку с температурой
   const data = await renderTemp();
   // Находим элемент на странице по id="temp"
   let divt = document.getElementById("temp");
   // Добавляем текстовое значение температуры в этот элемент
   divt.innerHTML += data;
 }
 async function ApiKurs() {
   try {
     // URL для запроса к API Национального банка (курс USD к BYN)
     const url = "https://api.nbrb.by/exrates/rates/431 ";
     // Отправляем GET-запрос
     const response = await fetch(url);
     // Проверяем успешность ответа
     if (!response.ok) {
       throw new Error("произошла ошибка при вызове api валюты");
     }
     // Преобразуем ответ в JSON
     const datatemp = await response.json();
     // Возвращаем данные о курсе валюты
     return datatemp;
   } catch (error) {
     // Логируем ошибку в консоль
     console.error("произошла ошибка при вызове api валюты", error.message);
   }
 }
 async function renderKurs() {
   // Получаем данные о курсе валюты
   const datatemp = await ApiKurs();
   // Форматируем значение: округляем до двух знаков после запятой и добавляем обозначение валюты ("BYN")
   let b = `${datatemp.Cur_OfficialRate.toFixed(2)}BYN`;
   // Возвращаем отформатированную строку
   return b;
 }
 async function innerKurs() {
   // Получаем строку с отформатированным курсом
   const data = await renderKurs();
   // Находим элемент на странице по id="kurs"
   let divt = document.getElementById("kurs");
   // Добавляем текстовое значение курса в этот элемент
   divt.innerHTML += data;
 }
 function OpenCreateModal() {
   // Открываем модальное окно с id="createdo"
   document.getElementById("createdo").showModal();
   // Закрываем элемент <details>, если он был открыт
   document.getElementById("detailscreate").open = false;
 }
 function CloseCreateModal() {
   // Закрываем модальное окно с id="createdo"
   document.getElementById("createdo").close();
 }
 function OpenChangeModal() {
   // Открываем модальное окно с id="changeTodo"
   document.getElementById("changeTodo").showModal();
   // Закрываем элемент <details>, если он был открыт
   document.getElementById("detailschange").open = false;
 }
 function CloseChangeModal() {
   // Находим элемент модального окна по id="changeTodo" и закрываем его
   document.getElementById("changeTodo").close();
 }
 function OpenCreateTagModal() {
   // Находим элемент модального окна по id="DialogOFcreateTag" и открываем его
   document.getElementById("DialogOFcreateTag").showModal();
 }
 function CloseTagModal() {
   // Находим элемент модального окна по id="DialogOFcreateTag" и закрываем его
   document.getElementById("DialogOFcreateTag").close();
 }
 function createUniqueID() {
   // Генерируем случайную строку на основе случайного числа в base36
   return "id_" + Math.random().toString(36).substr(2, 9);
 }

 function renderSortedAr(ar) {
   // Для каждого элемента в массиве вызываем функцию renderToDo()
   ar.forEach((element) => {
     renderToDo(element);
   });
 }
 function sortDateAt() {
   // Скрываем выпадающее меню сортировки
   hideDropdown();
   // Очищаем область отображения задач
   clearToDoOnSite();
   // Получаем копию данных из localStorage для сортировки
   let ItemForSort = createDublicateForSort(); 
   // Сортируем массив задач по полю createAt (дата создания)
   ItemForSort.sort((a, b) => {
     return new Date(a.createAt) - new Date(b.createAt); // по возрастанию
   });
   // Отображаем отсортированный список задач
   renderSortedAr(ItemForSort);
 }
 function sortInProcces() {
   // Скрываем выпадающее меню сортировки
   hideDropdown();
   // Очищаем область отображения задач
   clearToDoOnSite();
   // Получаем копию всех задач
   let Item = createDublicateForSort();
   // Создаем новый массив, в который добавляем только задачи со статусом "InProcces"
   let arrforsort = [];
   for (const el of Item) {
     if (el.status === "InProcces") {
       arrforsort.push(el);
     }
   }
   // Отображаем отфильтрованные задачи
   renderSortedAr(arrforsort);
   // Сохраняем результат фильтрации в localStorage для дальнейшей работы
   localStorage.setItem(KeyForSortOfStorage, JSON.stringify(arrforsort));
 }
 function sortfinish() {
   // Скрываем выпадающее меню сортировки
   hideDropdown();
   // Очищаем область отображения задач
   clearToDoOnSite();
   // Получаем копию всех задач из localStorage
   let Item = createDublicateForSort();
   // Создаём массив, в который добавляем только завершённые задачи
   let arrforsort = [];
   for (const el of Item) {
     if (el.status === "Finish") {
       arrforsort.push(el);
     }
   }
   // Отображаем отфильтрованные задачи на странице
   renderSortedAr(arrforsort);
   // Сохраняем результат фильтрации в localStorage для дальнейшей работы
   localStorage.setItem(KeyForSortOfStorage, JSON.stringify(arrforsort));
 }
 function filtofstatus(filetrofwhat) {
   if (filetrofwhat === 0) {
     // Если передано 0 — вызываем фильтр по "InProcces"
     sortInProcces();
   } else {
     // Иначе — вызываем фильтр по "Finish"
     sortfinish();
   }
 }
 function isDateInRangerendcreateat(startDate, endDate) {
   // Получаем текущие задачи из временного хранилища
   let todos = JSON.parse(localStorage.getItem(KeyForSortOfStorage)) || [];
   // Преобразуем даты в миллисекунды для сравнения
   endDate = new Date(endDate).getTime();
   startDate = new Date(startDate).getTime();
   // Определяем начало и конец диапазона
   const startDate1 = Math.min(startDate, endDate);
   const endDate1 = Math.max(startDate, endDate);
   // Проходимся по всем задачам и проверяем, попадает ли дата создания в диапазон
   for (let i = 0; i < todos.length; i++) {
     const taskDate = new Date(todos[i].createAt).getTime();
     if (taskDate >= startDate1 && taskDate <= endDate1) {
       renderToDo(todos[i]); // Отображаем подходящую задачу
     }
   }
 }
 function isDateInRangerenddeadline(startDate, endDate) {
   // Получаем текущие задачи из временного хранилища
   let todos = JSON.parse(localStorage.getItem(KeyForSortOfStorage)) || [];
   // Преобразуем даты в миллисекунды для сравнения
   endDate = new Date(endDate).getTime();
   startDate = new Date(startDate).getTime();
   // Определяем начало и конец диапазона
   const startDate1 = Math.min(startDate, endDate);
   const endDate1 = Math.max(startDate, endDate);
   // Проходимся по всем задачам и проверяем, попадает ли дата дедлайна в диапазон
   for (let i = 0; i < todos.length; i++) {
     const taskDate = new Date(todos[i].deadline).getTime();
     if (taskDate >= startDate1 && taskDate <= endDate1) {
       renderToDo(todos[i]); // Отображаем подходящую задачу
     }
   }
 }
 function createDublicateForSort() {
   // Получаем данные из localStorage
   let a = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   // Возвращаем копию массива
   return a;
 }
/**
 * Очищает область отображения задач на странице.
 */
 function clearToDoOnSite() {
   document.getElementById("forToDo").innerHTML = "";
 }
 
 /**
  * Применяет фильтры к списку задач: по статусу, тегам и датам (создание и дедлайн).
  */
 function filterall(filterdate) {
   let checkatcreate1 = document.getElementById("firstdateforatcreate");
   let checkatcreate2 = document.getElementById("seconddateforatcreate");
   let checkdeadline1 = document.getElementById("firstdatefordeadline");
   let checkdeadline2 = document.getElementById("seconddatefordeadline");
   resetsortstorage();
   if (filterdate !== undefined) {
     filtofstatus(filterdate);
   }
   if (selectedTagForFilter().length !== 0) {
     filetifselecttag();
   }
   if (checkatcreate1.value !== "" || checkatcreate2.value !== "") {
     isDateInRangerendcreateat(checkatcreate1.value, checkatcreate2.value);
   }
   if (checkdeadline1.value !== "" || checkdeadline2.value !== "") {
     isDateInRangerenddeadline(checkdeadline1.value, checkdeadline2.value);
   }
 }
 
 /**
  * Фильтрует задачи по выбранным тегам и отображает их.
  */
 function filetifselecttag() {
   clearToDoOnSite();
   let selectedtags = selectedTagForFilter();
   let todo = JSON.parse(localStorage.getItem(KeyForSortOfStorage)) || [];
   let filterallready = [];
   for (let i = 0; i < todo.length; i++) {
     for (let j = 0; j < selectedtags.length; j++) {
       for (let h = 0; h < todo[i].tags.length; h++) {
         if (todo[i].tags[h] === selectedtags[j]) {
           renderToDo(todo[i]);
           filterallready.push(todo[i]);
           j = 0;
           break;
         }
       }
     }
   }
   localStorage.setItem(KeyForSortOfStorage, JSON.stringify(filterallready));
 }
 
 /**
  * Валидирует форму изменения задачи. Если проходит — обновляет задачу.
  */
 function StartValidationChange(event) {
   event.preventDefault();
   if (ValidationThenOfChange(event)) {
     let objOfVal = isEditTodo.pop();
     changeTodo(event, objOfVal);
     CloseChangeModal();
     StartServer();
   }
 }
 
 /**
  * Валидирует форму создания задачи. Если проходит — создаёт новую задачу.
  */
 function StartValidationCreate(event) {
   event.preventDefault();
   if (ValidationThenOfTodo(event)) {
     CreateToDo(event);
     CloseCreateModal();
     StartServer();
     document.getElementById("NameOfDo").value = "";
     document.getElementById("MasOfDescription").value = "";
     document.getElementById("MasOfDate").value = "";
     document.getElementById("MasOfTag").value = "";
   }
 }
 
 /**
  * Валидирует форму создания тега. Если проходит — создаёт новый тег.
  */
 function StartValidationTag(event) {
   event.preventDefault();
   if (ValidationThenOfTag(event)) {
     CreateTag(event);
     document.getElementById("InputNewTag").innerHTML = "";
     CloseTagModal();
   }
 }
 
 /**
  * Проверяет корректность данных в форме редактирования задачи.
  */
 function ValidationThenOfChange(event) {
   let ErMasOfName = document.getElementById("errorMassageOfNameChange");
   let ErMasOfDate = document.getElementById("errorMassageOfDateChange");
   let ErMasOfTag = document.getElementById("errorMassageOfTagChange");
   let MasOfName = document.getElementById("NameOfChange").value;
   let MasOfDate = document.getElementById("MasOfDateChange").value;
   let MasOfTag = document.getElementById("MasOfTagChange");
   const date1 = new Date(MasOfDate);
   const date2 = new Date();
   let Valid = true;
   ErMasOfName.innerHTML = "";
   ErMasOfDate.innerHTML = "";
   ErMasOfTag.innerHTML = "";
   if (MasOfName === "" || MasOfName.length < 3) {
     Valid = false;
     ErMasOfName.innerHTML = 'Поле "Название" должно быть заполнено ';
   }
   if (MasOfDate === "" || !checkTime(date1, date2)) {
     Valid = false;
     ErMasOfDate.innerHTML = 'Поле "Дедлайн" должно быть заполнено';
   }
   if (MasOfTag === "") {
     Valid = false;
     ErMasOfTag.innerHTML = 'Поле "Тег" должно быть заполнено.';
   }
   if (!Valid) {
     event.preventDefault();
   }
   return Valid;
 }
 
 /**
  * Проверяет корректность данных в форме создания задачи.
  */
 function ValidationThenOfTodo(event) {
   let ErMasOfName = document.getElementById("errorMassageOfName");
   let ErMasOfDate = document.getElementById("errorMassageOfDate");
   let ErMasOfTag = document.getElementById("errorMassageOfTag");
   let MasOfName = document.getElementById("NameOfDo").value;
   let MasOfDate = document.getElementById("MasOfDate").value;
   const date1 = new Date(MasOfDate);
   const date2 = new Date();
   let Valid = true;
   let MasOfTag = selectedTag().length;
   ErMasOfName.innerHTML = "";
   ErMasOfDate.innerHTML = "";
   ErMasOfTag.innerHTML = "";
   if (MasOfName === "" || MasOfName.length < 3) {
     Valid = false;
     ErMasOfName.innerHTML = 'Поле "Название" должно быть заполнено ';
   }
   if (MasOfDate === "" || !checkTime(date1, date2)) {
     Valid = false;
     ErMasOfDate.innerHTML = 'Поле "Дедлайн" должно быть заполнено';
   }
   if (MasOfTag === 0) {
     Valid = false;
     ErMasOfTag.innerHTML = 'Поле "Тег" должно быть заполнено.';
   }
   if (!Valid) {
     event.preventDefault();
   }
   return Valid;
 }
 
 /**
  * Проверяет корректность ввода нового тега (не пустой, не дублируется).
  */
 function ValidationThenOfTag(event) {
   let Valid = true;
   let newTag = document.getElementById("InputNewTag").value.trim();
   let TagInStorage = JSON.parse(localStorage.getItem(KeyForTagOfStorage)) || [];
   TagErrorMas.innerHTML = "";
   Valid = checkTagIsCorrect(event, TagInStorage, newTag);
   return Valid;
 }
 
 /**
  * Проверяет, что новый тег:
  * - не пустой,
  * - не существует уже в массиве тегов.
  */
 function checkTagIsCorrect(event, ArrayOfTag, newTag) {
   let Valid = true;
   let TagErrorMas = document.getElementById("TagErrorMas");
   for (let i = 0; i <= ArrayOfTag.length; i++) {
     if (newTag === "") {
       Valid = false;
       TagErrorMas.innerHTML = "вы не ввели тэг!!!";
       break;
     }
     if (ArrayOfTag.length === 0) {
       if (newTag === "") {
         Valid = false;
         TagErrorMas.innerHTML = "вы не ввели тэг!!!";
         break;
       } else return Valid;
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
 
 /**
  * Проверяет, выбран ли хотя бы один тег.
  */
 function checkValid() {
   const checkboxes = document.querySelectorAll('input[name="tag"]:checked');
   let selected = [];
   checkboxes.forEach((checkbox) => {
     selected.push(checkbox.value);
   });
   return selected.length === null ? false : true;
 }
 
 /**
  * Возвращает массив выбранных тегов при создании задачи.
  */
 function selectedTag() {
   const checkboxes = document.querySelectorAll('input[name="tag"]:checked');
   let selected = [];
   checkboxes.forEach((checkbox) => {
     selected.push(checkbox.value);
   });
   return selected;
 }
 
 /**
  * Возвращает массив выбранных тегов при изменении задачи.
  */
 function selectedTagForChange() {
   const checkboxes = document.querySelectorAll('input[name="tagchange"]:checked');
   let selected = [];
   checkboxes.forEach((checkbox) => {
     selected.push(checkbox.value);
   });
   return selected;
 }
 
 /**
  * Возвращает массив выбранных тегов в фильтре задач.
  */
 function selectedTagForFilter() {
   const checkboxes = document.querySelectorAll('input[name="tagfilt"]:checked');
   let selected = [];
   checkboxes.forEach((checkbox) => {
     selected.push(checkbox.value);
   });
   return selected;
 }
 
 /**
  * Проверяет, что дата1 >= дата2 (без учёта времени).
  */
 function checkTime(d1, d2) {
   return d1.setHours(0, 0, 0, 0) >= d2.setHours(0, 0, 0, 0);
 }
 
 /**
  * Устанавливает чекбоксы для заданного тега при редактировании задачи.
  */
 function FillingTagField(tag) {
   const checkboxes = document.querySelectorAll('input[name="tagchange"]');
   for (let i = 0; i < checkboxes.length; i++) {
     if (tag === checkboxes[i].value) {
       checkboxes[i].checked = true;
       break;
     }
   }
 }
/**
 * Заполняет поля формы редактирования задачи данными из объекта задачи.
 * Также отмечает чекбоксы для тегов этой задачи.
 */
 function FillingITChangeFields(event, obj) {
   let MasOfName = document.getElementById("NameOfChange");
   let MasOfDate = document.getElementById("MasOfDateChange");
   let MasOfTag = document.getElementById("MasOfTagChange");
   let MasOfDescription = document.getElementById("MasOfDescriptionChange");
   let statusOfDo = document.getElementById("inProcces");
 
   // Заполняем поля формы значениями из объекта задачи
   MasOfName.value = obj.title;
   MasOfDate.value = obj.deadline;
   MasOfDescription.value = obj.dascription;
 
   // Отмечаем теги, связанные с задачей
   for (let i = 0; i < obj.tags.length; i++) {
     FillingTagField(obj.tags[i]);
   }
 
   // Устанавливаем статус задачи в форме
   statusOfDo.value = obj.status;
 
   // Добавляем задачу в массив временных данных для последующего изменения
   isEditTodo.push(obj);
 }
 
 /**
  * Обновляет данные задачи на основе введённых пользователем изменений.
  */
 function changeTodo(event, object) {
   let obj = FindObj(object.id);
 
   // Получаем новые значения из формы
   let MasOfName = document.getElementById("NameOfChange").value;
   let MasOfDate = document.getElementById("MasOfDateChange").value;
   let MasOfDescription = document.getElementById("MasOfDescriptionChange").value;
   let statusOfDo = document.getElementById("mySelectchange").value;
 
   // Создаём запись об обновлении задачи
   let UpdatedHistory = {
     action: "Updated",
     timestamp: new Date(),
   };
 
   // Обновляем свойства задачи
   obj.title = MasOfName;
   obj.dascription = MasOfDescription;
   obj.deadline = MasOfDate;
   obj.tags = selectedTagForChange(); // получаем выбранные теги
   obj.status = statusOfDo;
   obj.updateAt = new Date();
   obj.history.push(UpdatedHistory); // добавляем историю
 
   // Сохраняем обновлённую задачу в localStorage
   addTodoToStorage(obj);
 }
 
 /**
  * Создаёт новую задачу на основе данных из формы и сохраняет её в localStorage.
  */
 function CreateToDo(event) {
   // Получаем данные из формы
   let MasOfName = document.getElementById("NameOfDo").value;
   let MasOfDate = document.getElementById("MasOfDate").value;
   let MasOfDescription = document.getElementById("MasOfDescription").value;
   let statusOfDo = document.getElementById("mySelect").value;
 
   // Генерируем уникальный ID для задачи
   let UniqueId = createUniqueID();
 
   // Формируем объект задачи
   let ObjToDo = {
     id: UniqueId,
     title: MasOfName,
     dascription: MasOfDescription,
     deadline: MasOfDate,
     tags: selectedTag(), // получаем выбранные теги
     status: statusOfDo,
     createAt: new Date(),
     updateAt: new Date(),
     history: [
       {
         action: "created",
         timestamp: new Date(),
       },
     ],
   };
 
   console.log(ObjToDo.tags); // для отладки
 
   // Сохраняем задачу в localStorage
   addTodoToStorage(ObjToDo);
 
   // Выводим уведомление и отображаем задачу на странице
   alert("успешно занесено в базу");
   renderToDo(ObjToDo);
 }
 
 /**
  * Создаёт новый тег на основе введённого значения и сохраняет его в localStorage.
  */
 function CreateTag(event) {
   // Получаем значение нового тега
   let newTag = document.getElementById("InputNewTag");
 
   // Сохраняем тег в localStorage
   AddTagToStorage(newTag.value);
 
   // Выводим уведомление
   alert("успешно занесено в базу");
 
   // Рендерим тег в интерфейсе (для создания/редактирования)
   renderTag(newTag.value);
 
   // Рендерим тег в интерфейсе фильтрации
   renderTagForFilter(newTag.value);
 }
 
 /**
  * Добавляет задачу в localStorage.
  */
 function addTodoToStorage(obj) {
   // Получаем текущие данные или создаём пустой массив
   let a = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
 
   // Добавляем новую задачу
   a.push(obj);
 
   // Сохраняем обновлённые данные в localStorage
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(a));
 }
 
 /**
  * Добавляет тег в localStorage.
  */
 function AddTagToStorage(obj) {
   // Получаем текущие данные или создаём пустой массив
   let a = JSON.parse(localStorage.getItem(KeyForTagOfStorage)) || [];
 
   // Добавляем новый тег
   a.push(obj);
 
   // Сохраняем обновлённые данные в localStorage
   localStorage.setItem(KeyForTagOfStorage, JSON.stringify(a));
 }

/**
 * Отображает задачу на странице, используя шаблон.
 * Добавляет обработчики событий для кнопок "Удалить" и "Изменить".
 */
function renderToDo(Todo) {
   const list = document.getElementById("forToDo");
   const template = document.getElementById("TemplateCard");
   const item = template.content.cloneNode(true);
 
   // Заполняем поля задачи данными
   item.getElementById("h2NameOftDo").textContent = Todo.title;
   item.getElementById("DescriptionOfToDo").textContent = Todo.dascription;
   item.getElementById("DeadLineOfToDo").textContent = Todo.deadline;
 
   // Добавляем теги через запятую
   for (const i in Todo.tags) {
     item.querySelector("#TagOfToDo").textContent += Todo.tags[i] + ",";
   }
 
   item.getElementById("StatusOfToDo").textContent = Todo.status;
   item.getElementById("HiddenIdInfo").textContent = Todo.id;
 
   // Кнопка удаления
   const DeleteBtn = item.querySelector(".btnDeleteToDo");
   DeleteBtn.addEventListener("click", (event) => {
     const todoItem = event.target.closest(".todo-item");
     removeTaskFromLocalStorage(Todo.id);
     todoItem.remove();
   });
 
   // Кнопка редактирования
   const EditBtn = item.querySelector(".btnchangeToDo");
   EditBtn.addEventListener("click", (event) => {
     OpenChangeModal();
     FillingITChangeFields(event, Todo);
   });
 
   // Добавляем задачу на страницу
   list.append(item);
 }
 
 /**
  * Рендерит тег в интерфейсе при создании и изменении задач.
  */
 function renderTag(tag) {
   const listCreate = document.getElementById("forCreateBoard");
   const listChange = document.getElementById("forChangeBoard");
 
   const templateCreate = document.getElementById("templatetagForCreate");
   const templateChange = document.getElementById("templatetagForChange");
 
   const itemCreate = templateCreate.content.cloneNode(true);
   const itemChange = templateChange.content.cloneNode(true);
 
   // Настройка тега для формы создания
   itemCreate.querySelector('input[name="tag"]').value = tag;
   itemCreate.querySelector("#spanInTemplateCreate").innerHTML = tag;
 
   // Настройка тега для формы изменения
   itemChange.querySelector('input[name="tagchange"]').value = tag;
   itemChange.querySelector("#spanInTemplateChange").innerHTML = tag;
 
   // Добавляем элементы в интерфейс
   listCreate.append(itemCreate);
   listChange.append(itemChange);
 }
 
 /**
  * Рендерит тег в интерфейсе фильтрации по тегам.
  */
 function renderTagForFilter(tag) {
   const list = document.getElementById("forCreateBoardfilt");
   const template = document.getElementById("Temptagfilter");
   const item = template.content.cloneNode(true);
 
   // Настраиваем чекбокс и текст тега
   item.querySelector('input[name="tagfilt"]').value = tag;
   item.querySelector("#spanInTemplatefilter").innerHTML = tag;
 
   // Добавляем тег в интерфейс фильтрации
   list.append(item);
 }
 
 /**
  * Удаляет задачу из localStorage по её ID.
  */
 function removeTaskFromLocalStorage(id) {
   let tasks = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   tasks = tasks.filter((task) => task.id !== id);
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(tasks));
 }
 
 /**
  * Очищает отображение всех задач и тегов на странице.
  */
 function clearall() {
   document.getElementById("forToDo").innerHTML = "";
   document.getElementById("forCreateBoard").innerHTML = "";
   document.getElementById("forChangeBoard").innerHTML = "";
   document.getElementById("forCreateBoardfilt").innerHTML = "";
 
   // Сбрасывает выбранные чекбоксы фильтрации (исправлено: array не определён)
   // Исправлено на использование selectedTagForFilter()
   const arrfilt = selectedTagForFilter();
   const checkboxes = document.querySelectorAll('input[name="tagfilt"]:checked');
   checkboxes.forEach((checkbox) => {
     checkbox.checked = false;
   });
 }
 
 /**
  * Инициализирует приложение: очищает интерфейс, загружает данные из localStorage,
  * и отображает все задачи и теги.
  */
 function StartServer() {
   clearall();
 
   let arrayOfDo = JSON.parse(localStorage.getItem(KeyOfLocalStorage)) || [];
   let ArrayOfTag = JSON.parse(localStorage.getItem(KeyForTagOfStorage)) || [];
 
   arrayOfDo.forEach((task) => renderToDo(task));
   ArrayOfTag.forEach((tag) => renderTag(tag));
   ArrayOfTag.forEach((tag) => renderTagForFilter(tag));
 }
 
 /**
  * Находит объект задачи по ID в localStorage и удаляет его из основного списка.
  * Возвращает найденную задачу.
  */
 function FindObj(id) {
   let a = JSON.parse(localStorage.getItem(KeyOfLocalStorage));
   let b = a.filter((task) => task.id === id); // задача для изменения
   let c = a.filter((task) => task.id !== id); // остальные задачи
 
   localStorage.setItem(KeyOfLocalStorage, JSON.stringify(c)); // обновляем список
   return b.pop(); // возвращаем найденную задачу
 }
/**
 * Показывает выпадающее меню фильтров.
 */
 function showDropdownFilter() {
   const dropdownContent = document.getElementById("dropdownContent2");
   dropdownContent.style.display = "block";
 }
 
 /**
  * Скрывает выпадающее меню фильтров.
  */
 function hideDropdownFilter() {
   const dropdownContent = document.getElementById("dropdownContent2");
   dropdownContent.style.display = "none";
 }
 
 /**
  * Показывает выпадающее меню сортировки.
  */
 function showDropdown() {
   const dropdownContent = document.getElementById("dropdownContent1");
   dropdownContent.style.display = "block";
 }
 
 /**
  * Скрывает выпадающее меню сортировки.
  */
 function hideDropdown() {
   const dropdownContent = document.getElementById("dropdownContent1");
   dropdownContent.style.display = "none";
 }
 
 /**
  * Переключает видимость выпадающего меню фильтров.
  * Если открыто — закрывает, если закрыто — открывает.
  */
 function toggleDropdownfilter(event) {
   event.stopPropagation();
   const dropdownContent = document.getElementById("dropdownContent2");
   if (dropdownContent.style.display === "block") {
     hideDropdownFilter();
   } else {
     hideDropdown(); // закрываем другое меню, если оно открыто
     showDropdownFilter();
   }
 }
 
 /**
  * Переключает видимость выпадающего меню сортировки.
  * Если открыто — закрывает, если закрыто — открывает.
  */
 function toggleDropdown(event) {
   event.stopPropagation();
   const dropdownContent = document.getElementById("dropdownContent1");
   if (dropdownContent.style.display === "block") {
     hideDropdown();
   } else {
     hideDropdownFilter(); // закрываем другое меню, если оно открыто
     showDropdown();
   }
 }
 
 /**
  * Отображает всплывающее окно фильтра по тегам при наведении.
  */
 function showtagPopup() {
   const rect = filterTag.getBoundingClientRect();
   tagPopup.classList.remove("hidden");
   isHoveringtag = true;
 }
 
 /**
  * Отображает всплывающее окно фильтра по дедлайну при наведении.
  */
 function showdaedlinePopup() {
   const rect = filterdeadline.getBoundingClientRect();
   deadlinePopup.classList.remove("hidden");
   isHoveringdeadline = true;
 }
 
 /**
  * Отображает всплывающее окно фильтра по статусу при наведении.
  */
 function showPopup() {
   const rect = filterStatus.getBoundingClientRect();
   statusPopup.classList.remove("hidden");
   isHovering = true;
 }
/**
 * Отображает всплывающее окно фильтрации по дате создания задачи.
 */
 function showbydatePopup() {
   const rect = filterbydate.getBoundingClientRect();
   datePopup.classList.remove("hidden"); // показываем popup
   isHoveringbydate = true;
 }
 
 /**
  * Скрывает всплывающее окно фильтрации по тегам.
  */
 function hidetagPopup() {
   tagPopup.classList.add("hidden"); // скрываем popup
   isHoveringtag = false;
 }
 
 /**
  * Скрывает всплывающее окно фильтрации по дедлайну.
  */
 function hidedeadlinePopup() {
   deadlinePopup.classList.add("hidden"); // скрываем popup
   isHoveringdeadline = false;
 }
 
 /**
  * Скрывает всплывающее окно фильтрации по дате создания.
  */
 function hidebydatePopup() {
   datePopup.classList.add("hidden"); // скрываем popup
   isHoveringbydate = false;
 }
 
 /**
  * Скрывает всплывающее окно фильтрации по статусу задачи.
  */
 function hidePopup() {
   statusPopup.classList.add("hidden"); // скрываем popup
   isHovering = false;
 }
 
 /**
  * Проверяет, находится ли курсор вне popup'а с тегами.
  * Если пользователь увёл курсор — скрывает popup.
  */
 function checkHoverForPuptag() {
   if (!isHoveringtag) {
     hidetagPopup();
   }
 }
 
 /**
  * Проверяет, находится ли курсор вне popup'а с дедлайнами.
  * Если пользователь увёл курсор — скрывает popup.
  */
 function checkHoverForPupdeadline() {
   if (!isHoveringdeadline) {
     hidedeadlinePopup();
   }
 }
 
 /**
  * Проверяет, находится ли курсор вне popup'а со статусами.
  * Если пользователь увёл курсор — скрывает popup.
  */
 function checkHoverForPup() {
   if (!isHovering) {
     hidePopup();
   }
 }
 
 /**
  * Проверяет, находится ли курсор вне popup'а с датой создания.
  * Если пользователь увёл курсор — скрывает popup.
  */
 function checkHoverForPupbydate() {
   if (!isHoveringbydate) {
     hidebydatePopup();
   }
 }
 
 /**
  * Устанавливает флаг Hover для popup'а с тегами (курсор внутри).
  */
 function cursorOnModuletag() {
   isHoveringtag = true;
 }
 
 /**
  * Устанавливает флаг Hover для popup'а с датой создания (курсор внутри).
  */
 function cursorOnModulebydate() {
   isHoveringbydate = true;
 }
/**
 * Устанавливает флаг Hover для popup'а статуса задачи (курсор внутри).
 */
 function cursorOnModule() {
   isHovering = true;
 }
 
 /**
  * Устанавливает флаг Hover для popup'а дедлайна задачи (курсор внутри).
  */
 function cursorOnModuledeadline() {
   isHoveringdeadline = true;
 }
 
 /**
  * Проверяет, увёл ли пользователь курсор с popup'а тегов.
  * Если да — скрывает popup через 100 мс.
  */
 function lastCheckForcursortag() {
   isHoveringtag = false;
   setTimeout(() => {
     if (!filterTag.matches(":hover") && !tagPopup.matches(":hover")) {
       hidetagPopup();
     }
   }, 100);
 }
 
 /**
  * Проверяет, увёл ли пользователь курсор с popup'а дедлайнов.
  * Если да — скрывает popup через 100 мс.
  */
 function lastCheckForcursortdeadline() {
   isHoveringdeadline = false;
   setTimeout(() => {
     if (!filterdeadline.matches(":hover") && !deadlinePopup.matches(":hover")) {
       hidedeadlinePopup();
     }
   }, 100);
 }
 
 /**
  * Проверяет, увёл ли пользователь курсор с popup'а даты создания задачи.
  * Если да — скрывает popup через 100 мс.
  */
 function lastCheckForcursortbydate() {
   isHoveringbydate = false;
   setTimeout(() => {
     if (!filterbydate.matches(":hover") && !datePopup.matches(":hover")) {
       hidebydatePopup();
     }
   }, 100);
 }
 
 /**
  * Проверяет, увёл ли пользователь курсор с popup'а статуса задачи.
  * Если да — скрывает popup через 100 мс.
  */
 function lastCheckForcursor() {
   isHovering = false;
   setTimeout(() => {
     if (!filterStatus.matches(":hover") && !statusPopup.matches(":hover")) {
       hidePopup();
     }
   }, 100);
 }
 
 /**
  * Сбрасывает временное хранилище отфильтрованных задач,
  * возвращая копию оригинального списка из localStorage.
  */
 function resetsortstorage() {
   let a = createDublicateForSort();
   localStorage.setItem(KeyForSortOfStorage, JSON.stringify(a));
 }
 
 /**
  * Добавляет базовые теги в хранилище при запуске приложения.
  */
 function basictagaddtoserver() {
   AddTagToStorage("срочно");
   AddTagToStorage("на сегодня");
   AddTagToStorage("потом");
 }
 
 /**
  * Очищает интерфейсные блоки для тегов при перезапуске приложения.
  */
 function resettagwhenstart() {
   let filtmenu = document.getElementById("forCreateBoardfilt");
   let createmenu = document.getElementById("forCreateBoard");
   let changemenu = document.getElementById("forChangeBoard");
 
   filtmenu.innerHTML = "";
   createmenu.innerHTML = "";
   changemenu.innerHTML = "";
 }
/**
 * Закрывает все выпадающие меню при клике вне их области.
 */
 document.addEventListener("click", function (event) {
   const dropdownContent1 = document.getElementById("dropdownContent1");
   const dropdownContent2 = document.getElementById("dropdownContent2");
   if (!event.target.closest(".dropdown")) {
     hideDropdown(); // скрываем меню сортировки
     hideDropdownFilter(); // скрываем меню фильтрации
   }
 });
 
 /**
  * Скрывает popup статуса задачи, если курсор ушёл за его пределы.
  */
 document.addEventListener("mouseover", (event) => {
   if (
     !filterStatus.contains(event.target) &&
     !statusPopup.contains(event.target)
   ) {
     hidePopup();
   }
 });
 
 /**
  * Скрывает popup тегов задач, если курсор ушёл за его пределы.
  */
 document.addEventListener("mouseover", (event) => {
   if (!filterTag.contains(event.target) && !tagPopup.contains(event.target)) {
     hidetagPopup();
   }
 });
 
 /**
  * Скрывает popup даты создания задачи, если курсор ушёл за его пределы.
  */
 document.addEventListener("mouseover", (event) => {
   if (
     !filterbydate.contains(event.target) &&
     !datePopup.contains(event.target)
   ) {
     hidebydatePopup();
   }
 });
 
/**
  * Скрывает popup дедлайна задачи, если курсор ушёл за его пределы.
  */
 document.addEventListener("mouseover", (event) => {
   if (
     !filterdeadline.contains(event.target) &&
     !deadlinePopup.contains(event.target)
   ) {
     hidedeadlinePopup();
   }
 });
const KeyOfLocalStorage = "StorageOfToDo";
const KeyForTagOfStorage = "StorageOfTag";
const KeyForSortOfStorage = "StorageForSort";
const btnreg = document.getElementById("showPopup");
const btncreate = document.getElementById("btncreate");
const btnCancel = document.getElementById("CloseModal");
const btnChange = document.getElementById("BtnChange");
const btnCancelChange = document.getElementById("CloseModalChange");
const btnOpenTagModal = document.getElementById("CreateTag");
const BTNCreateTag = document.getElementById("createNewTag");
const btnSort = document.getElementById("dropbtn1");
const btnDateSort = document.getElementById("sortDateAt");
const btnsortAlphabetically = document.getElementById("sortAlphabetically");
const btnFilterDrop = document.getElementById("dropbtn2");
const filterStatus = document.getElementById("filterStatus");

const statusPopup = document.getElementById("statusPopup");
const btnsortInProcces = document.getElementById("statusInProcces");
const btnsortfinish = document.getElementById("statusFinish");

const filterTag = document.getElementById("filterTag");
const tagPopup = document.getElementById("tagPopup");
const btnfiltertag = document.getElementById("btnfiltertag");

const filterbydate = document.getElementById("filterDateAt");
const datePopup = document.getElementById("datePopup");
const btnfitlerdate = document.getElementById("btndilterbydate");

const filterdeadline = document.getElementById("filterDeadline");
const deadlinePopup = document.getElementById("deadlinePopup");
const btnfilterdeadline = document.getElementById("btndilterdeadline");

const refreshbtn = document.getElementById("refreshbtn");
let filterinproccesorfinish = null;
let isHovering = false;
let isHoveringtag = false;
let isHoveringbydate = false;
let isHoveringdeadline = false;

btnfitlerdate.addEventListener("click", () => filterall());
btnfilterdeadline.addEventListener("click", () => filterall());
btnfiltertag.addEventListener("click", () => filterall());

refreshbtn.addEventListener("click", resetsortstorage);
refreshbtn.addEventListener("click", StartServer);

btnsortfinish.addEventListener("click", () => {
  filterinproccesorfinish = 1;
  filterall(filterinproccesorfinish);
});
btnsortInProcces.addEventListener("click", () => {
  filterinproccesorfinish = 0;
  filterall(filterinproccesorfinish);
});

filterTag.addEventListener("mouseenter", showtagPopup);
filterTag.addEventListener("mouseleave", checkHoverForPuptag);
tagPopup.addEventListener("mouseenter", cursorOnModuletag);
tagPopup.addEventListener("mouseleave", lastCheckForcursortag);

filterdeadline.addEventListener("mouseenter", showdaedlinePopup);
filterdeadline.addEventListener("mouseleave", checkHoverForPupdeadline);
deadlinePopup.addEventListener("mouseenter", cursorOnModuledeadline);
deadlinePopup.addEventListener("mouseleave", lastCheckForcursortdeadline);

filterbydate.addEventListener("mouseenter", showbydatePopup);
filterbydate.addEventListener("mouseleave", checkHoverForPupbydate);
datePopup.addEventListener("mouseenter", cursorOnModulebydate);
datePopup.addEventListener("mouseleave", lastCheckForcursortbydate);

filterStatus.addEventListener("mouseenter", showPopup);
filterStatus.addEventListener("mouseleave", checkHoverForPup);
statusPopup.addEventListener("mouseenter", cursorOnModule);
statusPopup.addEventListener("mouseleave", lastCheckForcursor);

btnFilterDrop.addEventListener("click", toggleDropdownfilter);
btnSort.addEventListener("click", toggleDropdown);
btnOpenTagModal.addEventListener("click", OpenCreateTagModal);

btnCancel.addEventListener("click", CloseCreateModal);
btnreg.addEventListener("click", OpenCreateModal);

btnDateSort.addEventListener("click", sortDateAt);
BTNCreateTag.addEventListener("click", StartValidationTag);

btncreate.addEventListener("click", StartValidationCreate);
btnCancelChange.addEventListener("click", CloseChangeModal);

const confirm = document.getElementById("BtnChange");
confirm.addEventListener("click", (event) => {
  StartValidationChange(event);
});

btnsortAlphabetically.addEventListener("click", () => {
  hideDropdown();
  clearToDoOnSite();
  let ItemForSort = createDublicateForSort();
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
StartServer();
sortDateAt();
