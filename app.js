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

   wiw.showModal()
}
function StartValidation() {
   const form = document.getElementById('FormOfCreate')

   form.addEventListener('submit', ValidationThen)
}
function ValidationThen(event) {
   let ErMasOfName = document.getElementById('errorMassageOfName')
   let ErMasOfDescription = document.getElementById('errorMassageOfDescription')
   let ErMasOfDate = document.getElementById('errorMassageOfDate')
   let ErMasOfTag = document.getElementById('errorMassageOfTag')
   let Valid = true;
   ErMasOfName.innerHTML = '';
   ErMasOfDate.innerHTML = '';
   ErMasOfDescription.innerHTML = '';
   ErMasOfTag.innerHTML = '';
   if (ErMasOfName === '') 
   { 
      isValid = false;
       ErMasOfName.innerHTML += 'Поле "Название" не должно быть пустым.';
  }
   if (ErMasOfDescription === '') 
   {
      isValid = false;
      ErMasOfDescription.innerHTML += 'Поле "Описание" не должно быть пустым.';
   }
   if (ErMasOfDate === '') 
   {
      isValid = false;
      ErMasOfDate.innerHTML += 'Поле "Дедлайн" не должно быть пустым.';
   }
   if (!Valid) 
   { 
      event.preventDefault();
    }
}
let wiw = document.getElementById('createdo')
let btnreg = document.getElementById('showPopup')
let btncreate = document.getElementById('btncreate')
btnreg.addEventListener('click', OpenModal)



innertemp()
innerKurs()
StartValidation()
