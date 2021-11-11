//Variables
const listForm = document.forms['listForm'];
const hwList = document.getElementById('hws');
const hwKey = 'hws';

EventListener();

function EventListener(){
    
    //Agregar tareas
    listForm.addEventListener('submit', addHw);

    //La página termine de cargar
    document.addEventListener('DOMContentLoaded', showHws);

    //Borrar tareas
    hwList.addEventListener('click', removeHw);

}

//Agregar un Tweets
function addHw(e){
    //Detener el envío del formulario
    e.preventDefault();

    //Obtener los valores del formulario
    const hw_title = listForm['title'].value;
    const hw_desc = listForm['description'].value;
    const hw_date = listForm['date'].value;

    let hw_arr = [];

    //Crear el nuevo elemento
    const newHw = document.createElement('div');

    newHw.className = 'col-11 col-md-5 hw-list border-top';
    newHw.innerHTML = 
    `
    <p class="hw-date" id="data1">${hw_date}</p>
    <h4 id="data2">${hw_title}</h4>
    <p id="data3">${hw_desc}</p>

    <div class="complete">
        <input type="checkbox" id="conditions">
        <label for="conditions">Completada</label>
    </div>
    
    <div class="col-1 btn-cont">
        <button class="btn danger-btn close-btn">Eliminar</button>
    </div>`;

    //Se añade a la lista de tareas en html
    hwList.appendChild(newHw);

    hw_arr.push(hw_date);
    hw_arr.push(hw_title);
    hw_arr.push(hw_desc);
    
    saveHw(hw_arr);
}

//Guardar tarea en LocalStorage
function saveHw(hw_arr){
    let hw = getHws();

    //Se añade a la lista de tareas
    hw.push(hw_arr);

    //Se guarda en localStorage
    localStorage.setItem(hwKey, JSON.stringify(hw));
}

//Obtiene las tareas de LocalStorage
function getHws(){
    //Obtenemos los datos de localStorage
    let hw = localStorage.getItem(hwKey);

    //Verificamos si ya existe al menos un tweet
    if(hw === null){
        hw = [];
    }
    else{
        hw = JSON.parse(hw);
    }

    return hw;
}

//Muestra las tareas guardadas en localStorage
function showHws(){
    let hw = getHws();

    hw.forEach(hws => {
        //Crear el nuevo elemento
        const newHw = document.createElement('div');

        //Añadir estilos y contenido
        newHw.className = 'col-11 col-md-5 hw-list border-top';
        newHw.innerHTML = 
        `<p class="hw-date" id="data1">${hws[0]}</p>
        <h4 id="data2">${hws[1]}</h4>
        <p id="data3">${hws[2]}</p>

        <div class="complete">
            <input type="checkbox" id="conditions">
            <label for="conditions">Completada</label>
        </div>
        
        <div class="col-1 btn-cont">
            <button class="btn danger-btn close-btn">Eliminar</button>
        </div>`;

        //Se añade a la lista de tweets
        hwList.appendChild(newHw);
    });
}

function removeHw(e){
    let hw_arr = [];

    //Comprobar que se está dando click en el botón
    if(e.target.className.includes('close-btn')){
        //Se obtiene el todo el div del tweet
        var item = e.target.parentElement.parentElement;
        
        //Se obtiene el texto del tweet que se va a borrar
        var hw_date_e = document.getElementById('data1');
        var hw_title_e = document.getElementById('data2');
        var hw_desc_e = document.getElementById('data3');

        var hw_date = hw_date_e.innerText.substring(0, hw_date_e.innerText.length);
        var hw_title = hw_title_e.innerText.substring(0, hw_title_e.innerText.length);
        var hw_desc = hw_desc_e.innerText.substring(0, hw_desc_e.innerText.length);

        //Se elimina del localStorage
        hw_arr.push(hw_date);
        hw_arr.push(hw_title);
        hw_arr.push(hw_desc);
        removeHwsLS(hw_arr);

        //Se elimina el tweet de la página
        item.remove();
    }
}

function removeHwsLS(hw_arr){
    let hw = getHws();

    //Se recorre el arreglo bidimensional de tareas
    for(var i = 0; i < hw.length; i++){
        for(var j = 0; j < hw.length; j++){
            //Si se encuentra la tarea específica se elimina
            if(hw[i][j] === hw_arr[j]){
                hw.splice(j-1, 1);
                break;
            }
        }
    }

    localStorage.setItem(hwKey, JSON.stringify(hw));
}
