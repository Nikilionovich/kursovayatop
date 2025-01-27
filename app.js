async function ApiTemp() {

   const url = 'https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=cb8c1937ba2ab4009d5f9b08aab609b6'
   const response = await fetch(url)
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
function CloseModal(){
document.getElementById('createdo').close();
}
function createUniqueID() {
   return 'id_' + Math.random().toString(36).substr(2, 9);
}
function StartValidation(event) {
   const form = document.getElementById('FormOfCreate')
   event.preventDefault();
   if(ValidationThen())
   {
    CloseModal()
   }
}
function ValidationThen(event) {
   let ErMasOfName = document.getElementById('errorMassageOfName')
   let ErMasOfDate = document.getElementById('errorMassageOfDate')
   let ErMasOfTag = document.getElementById('errorMassageOfTag')
   let MasOfName=document.getElementById('NameOfDo').value
   let MasOfDate=document.getElementById('MasOfDate').value
   let MasOfTag=document.getElementById('MasOfTag').value
   const date1 = new Date(MasOfDate);
   const date2 = new Date();
   let Valid = true;
   ErMasOfName.innerHTML = '';
   ErMasOfDate.innerHTML = '';
   ErMasOfTag.innerHTML = '';
   if (MasOfName === ''|| MasOfName.length<3) 
   { 
      Valid = false;
       ErMasOfName.innerHTML = 'Поле "Название" не должно быть пустым.';
  }
   
   if (MasOfDate === '' ||!checkTime(date1,date2)) 
   {
      Valid = false;
      ErMasOfDate.innerHTML = 'Поле "Дедлайн" не должно быть введен.';
   }
   if(MasOfTag==='')
   {
      Valid = false;
      ErMasOfTag.innerHTML = 'Поле "Тег" не заполнено. ';
   }
   if (!Valid) 
   { 
      event.preventDefault();
    }
    return Valid
}
function checkTime(d1, d2){
   return d1.setHours(0, 0, 0, 0) >= d2.setHours(0, 0, 0, 0);
}
function CreateToDo(event){
   debugger
   if(ValidationThen())
   {
           let MasOfName=document.getElementById('NameOfDo').value
   let MasOfDate=document.getElementById('MasOfDate').value
   let MasOfTag=document.getElementById('MasOfTag').value
   let MasOfDescription=document.getElementById('MasOfDescription').value
   let statusOfDo=document.getElementById('inProcces').value
   let ObjToDo ={
 id:createUniqueID(),
 title: MasOfName,
 dascription:MasOfDescription,
 deadline:MasOfDate,
 tags:MasOfTag,
 status:statusOfDo,
 createAt:new Date(),
 updateAt:new Date(),
 history:{
   action: checkTime (createAt,updateAt)? "created":"updated", 
   timestamp:new Date()
 }
   };
   Task.insertDo(MasOfName);
   alert("успешно занесено в базу")
   console.log(Task.getTask())
}

}
let Task = new Todo()
let btnreg = document.getElementById('showPopup')
let btncreate = document.getElementById('btncreate')
btnreg.addEventListener('click', OpenModal)
btncreate.addEventListener('click',StartValidation)
innertemp()
innerKurs()

