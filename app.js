let list = document.getElementById('book-list');
document.querySelector('#btn-update').style.display = "none";

list.addEventListener('click', removeFromList); // delete book
list.addEventListener('click', selectToEdit); // select book
document.querySelector('#btn-add').addEventListener('click', addToList); // add book
document.querySelector('#btn-update').addEventListener('click', editToList); // update book


// add book
function addToList() {

  // get value from input
  const titleValue = document.getElementById('txtTitle').value;
  const authorValue = document.getElementById('txtAuthor').value;
  const isbnValue = document.getElementById('txtIsbn').value;

  //create elements 
  const li = document.createElement('li');
  const title = document.createElement('span');
  const author = document.createElement('span');
  const isbn = document.createElement('span');
  const editBtn = document.createElement('span');
  const deleteBtn = document.createElement('span');

  //add content
  title.textContent = titleValue;
  author.textContent = authorValue;
  isbn.textContent = isbnValue;
  editBtn.textContent = 'Edit';
  deleteBtn.textContent = 'Delete';

  //add classes to element
  title.classList.add('title');
  author.classList.add('author');
  isbn.classList.add('isbn');
  editBtn.classList.add('btn-edit');
  deleteBtn.classList.add('btn-delete');

  //append to document
  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(isbn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  //append to list
  list.appendChild(li);

  //clear form fields
  document.forms[1].reset();
}


// select book 
function selectToEdit(event) {

  if (event.target.className === 'btn-edit') {
    // hide add button  
    document.querySelector('#btn-add').style.display = "none";

    //show edit button
    document.querySelector('#btn-update').style.display = "block";

    // get selected index
    const li = event.target.parentElement;
    const nodes = Array.from(list.children); // making html collections as array
    let index = nodes.indexOf(li);

    // get value from document 
    document.getElementById('txtTitle').value = list.children[index].children[0].textContent;
    document.getElementById('txtAuthor').value = list.children[index].children[1].textContent;
    document.getElementById('txtIsbn').value = list.children[index].children[2].textContent;

    // set selected index in local storage
    localStorage.setItem("selectedListIndex", index);
  }

}


// update book
function editToList() {

  // get selected index from local storage
  index = localStorage.getItem("selectedListIndex");

  // edit selected list item and display
  list.children[index].children[0].textContent = document.getElementById('txtTitle').value;
  list.children[index].children[1].textContent = document.getElementById('txtAuthor').value;
  list.children[index].children[2].textContent = document.getElementById('txtIsbn').value;
  console.log('updated!');

  // clear form fields after update
  document.forms[1].reset();
  document.querySelector('#btn-add').style.display = "block";
  document.querySelector('#btn-update').style.display = "none";
}


// delete book
function removeFromList(event) {
  if (event.target.className === 'btn-delete') {
    const li = event.target.parentElement;
    list.removeChild(li);
  }
  document.querySelector('#btn-add').style.display = "block";
  document.querySelector('#btn-update').style.display = "none";
  document.forms[1].reset();
}
