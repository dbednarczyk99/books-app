{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: { 
      bookList: '.books-list',
    },
    box: {
      bookImage: '.book__image',
    },
  };

  const classNames = {
    bookFavorite: 'favorite',
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const app = {
    initData: function(){
      const thisApp = this;
      thisApp.data = dataSource;
      thisApp.favoriteBooks = [];
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
    },

    initRender: function(){
      const thisApp = this;

      for(let item of dataSource.books){
        const generatedHTML = templates.book(item);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisApp.bookListContainer.appendChild(generatedDOM);
      }
    },

    initActions: function(){
      const thisApp = this;
      const favoriteBooks = thisApp.favoriteBooks;
      //const bookContainer = document.querySelectorAll(select.box.bookImage);

      thisApp.bookListContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
        if(event.target.offsetParent.classList.contains('book__image') === true){
          
          event.target.offsetParent.classList.toggle(classNames.bookFavorite);
          //console.log(event);

          const bookId = event.target.offsetParent.getAttribute('data-id');
          if(favoriteBooks.includes(bookId)){
            favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          }
          else if(!favoriteBooks.includes(bookId)){
            favoriteBooks.push(bookId);
          }
        }
        console.log('favoriteBooks: ', thisApp.favoriteBooks);
      });
    }
  };

  app.init();
}