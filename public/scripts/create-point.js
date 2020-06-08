const itensToCollect = document.querySelectorAll(".items-grid li")
const collectedItens = document.querySelector("input[name=items]")
const submitButton = document.querySelector("button div")
let selectedItems = []


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

document
    .querySelector("[name=cep]")
    .addEventListener("blur", searchCep)



function populateUF() {
    const ufSelect = document.querySelector("[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states =>{
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}" id="${state.sigla}">${state.nome}</option>`
                
            }
        })
    
}
populateUF()

function getCities(event){
    
    const citysSelect = document.querySelector("[name=city]")

    const uf = event.target.value

    const stateInput = document.querySelector("[name=state]")
    const index = event.target.selectedIndex
    stateInput.value = event.target.options[index].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`


    citysSelect.innerHTML = "<option value>Selecione uma cidade</option>"
    citysSelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities =>{
            for(city of cities){
                citysSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citysSelect.disabled = false
        })

    
}
function searchCep(){
    const cep = document.querySelector("[name=cep]")
    const url = `http://viacep.com.br/ws/${cep.value}/json/`

    fetch(url)
        .then(res => res.json())
            .then(cep => {
                if (!(cep.erro)){
                    document.querySelector("input[name=cep]").value = cep.cep
                    document.querySelector("input[name=address]").value = cep.logradouro
                }else{
                    alert("Cep não encontrado")
                    document.querySelector("input[name=cep]").value = ""
                }
            })
}



// itens de coleta

for(let item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

function handleSelectedItem(event) {
    const itemLi = event.target
    const itemId = itemLi.dataset.id

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    // Verificar se existem itens selecionados
    // se sim pegar eles

    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    // Se ja estiver selecionado, tirar da seleção
    if(alreadySelected != -1){
        const filteredItems = selectedItems.filter(item => item != itemId)

        selectedItems = filteredItems
    }else{  // se nao, adicionar a seleção
        selectedItems.push(itemId)
    }
    

    // atualizar o input escondido
    collectedItens.value = selectedItems


    // confere se tem algum item selecionado
    if (selectedItems.length < 1) { 
        // se nao tiver ele bloqueia o envio do formulatio
        document.querySelector("button").disabled = true
        submitButton.innerHTML = "Selecione algum item"
        document.querySelector("button").style.backgroundColor = "#ff6060"
    } else {
        // se tiver ele libera 
        document.querySelector("button").disabled = false
        submitButton.innerHTML = "Cadastrar ponto de coleta"
        document.querySelector("button").style.backgroundColor = "var(--primary-color)"
    }
}
