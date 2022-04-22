document.addEventListener("DOMContentLoaded", () => {


  //Ajouter une note en cliquant en haut a droite de la page
  const ajouterBtn = document.getElementById('ajouter')
  ajouterBtn.addEventListener('click', () => ajouterNouvelleNote())

  //Fichier JSON
  const notes = JSON.parse(localStorage.getItem('notes'))


let ajouterNouvelleNote = (text = '') => {
    const note = document.createElement('section')
    note.classList.add('note')

    const supprimerToutesLesNotesBtn = document.getElementById('supprimerToutesLesNotes')

    //Creation de la note
    note.innerHTML = `
    <section class="outils">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="supprimer"><i class="fas fa-trash-alt"></i></button>
    </section>
    <section class="main ${text ? "" : "hidden"}"></section>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const supprimerBtn = note.querySelector('.supprimer')
    const main = note.querySelector('.main')
    const zoneTexte = note.querySelector('textarea')

    zoneTexte.value = text
    main.innerHTML = marked(text)


    //Supprimer la note
    supprimerBtn.addEventListener('click', () => {
        note.remove()
        updateLS()
    })

    // Supprimer toutes les notes en cliquant en haut a droite de la page
    supprimerToutesLesNotesBtn.addEventListener('click', () => {
      note.remove()
      updateLS()
  })


    //Editer la note
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        zoneTexte.classList.toggle('hidden')
    })

    zoneTexte.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)
}

if(notes) {
  notes.forEach(note => ajouterNouvelleNote(note))
}


//Mise a jour du localStorage avec l'ajout de la note
let updateLS = () => {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

  });
  