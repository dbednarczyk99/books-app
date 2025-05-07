{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: { 
      bookList: '.books-list',
      filters: '.filters'
    },
    box: {
      bookImage: 'book__image',
      inputFilterName: 'filter',
    },
  };

  const attributes = {
    dataId: 'data-id',
    checkbox: 'checkbox',
    input: 'INPUT',
    filter: 'filter'
  };

  const classNames = {
    bookFavorite: 'favorite',
    bookHidden: 'hidden',
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const app = {
    initData: function(){
      const thisApp = this;
      thisApp.data = dataSource;
      thisApp.favoriteBooks = [];
      thisApp.filters = [];
    },

    init: function(){
      const thisApp = this;
      
      thisApp.initData();
      thisApp.getElements();
      thisApp.initRender();
      thisApp.initActions();
    },

    getElements: function(){
      const thisApp = this;

      thisApp.bookListContainer = document.querySelector(select.containerOf.bookList);
      thisApp.formContainer = document.querySelector(select.containerOf.filters);
      thisApp.bookImage = document.querySelector(select.box.bookImage);
    },

    initRender: function(){
      const thisApp = this;

      for(let item of thisApp.data.books){
        const generatedHTML = templates.book(item);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisApp.bookListContainer.appendChild(generatedDOM);
      }
    },

    filterBooks: function(){
      const thisApp = this;
      //console.log('filter');
      for(let book of thisApp.data.books){
        let shouldBeHidden = false;
        //console.log('filter');

        for(let filter of thisApp.filters){
          //console.log(filter);
          //console.log(book.details[filter]);
          if(book.details[filter]){
            //console.log(book.id);
            shouldBeHidden = true;
            break;
          }
        }
        const findBookById = document.querySelector('.book__image[data-id="' + book.id + '"]');       
        if(shouldBeHidden === true ) findBookById.classList.add(classNames.bookHidden);
        else if (shouldBeHidden === false) findBookById.classList.remove(classNames.bookHidden);
  
      }
    },

    initActions: function(){
      const thisApp = this;
      
      const favoriteBooks = thisApp.favoriteBooks;
      thisApp.bookListContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
        if(event.target.offsetParent.classList.contains(select.box.bookImage) === true){
          
          event.target.offsetParent.classList.toggle(classNames.bookFavorite);
          //console.log(event);

          const bookId = event.target.offsetParent.getAttribute(attributes.dataId);
          if(favoriteBooks.includes(bookId)){
            favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          }
          else if(!favoriteBooks.includes(bookId)){
            favoriteBooks.push(bookId);
          }
        }
        //console.log('favoriteBooks: ', thisApp.favoriteBooks);
      });

      const filters = thisApp.filters;
      thisApp.formContainer.addEventListener('change', function(event){
        const eTarget = event.target;
        //console.log(event);
        if(eTarget.tagName === attributes.input && eTarget.type === attributes.checkbox && eTarget.name === attributes.filter){
          //console.log(event.target.value);
          if(eTarget.checked){
            filters.push(event.target.value);
          }
          else if(!eTarget.checked){
            filters.splice(filters.indexOf(eTarget.value), 1);
          }
        }
        //console.log(thisApp);
        thisApp.filterBooks();
      });


    }
  };

  app.init();
}