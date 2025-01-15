async function ApiTemp()
{
   
   const url='https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=cb8c1937ba2ab4009d5f9b08aab609b6'
   const response= await fetch(url)
   const datatemp= await response.json();
   return datatemp
} 
async function renderTemp()
{
      const datatemp= await ApiTemp();
      let b = `${(datatemp.main.temp - 273).toFixed(1)}°C`    
      return b;
}
 async function innertemp(){
   const data= await renderTemp()
   let divt=document.getElementById("temp")
   divt.innerHTML+=data;
}
async function ApiKurs()
{
   
   const url=' https://api.nbrb.by/exrates/rates/431'
   const response= await fetch(url)
   const datatemp= await response.json();
   return datatemp
} 
async function renderKurs()
{
      const datatemp= await ApiKurs();
      let b = `${(datatemp.Cur_OfficialRate).toFixed(2)}BYN`    
      return b;
}
 async function innerKurs(){
   const data= await renderKurs()
   let divt=document.getElementById("kurs")
   divt.innerHTML+=data;
}
 let wiw=document.getElementById('createdo')
 let btnreg=document.getElementById('showPopup')
btnreg.addEventListener('click',OpenModal)
function OpenModal(){ 
  
   wiw.showModal()
}

      
innertemp()
innerKurs()
