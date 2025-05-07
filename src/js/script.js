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

  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.initRender();
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;

      thisBooksList.data = dataSource;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.bookListContainer = document.querySelector(select.containerOf.bookList);
      thisBooksList.formContainer = document.querySelector(select.containerOf.filters);
      thisBooksList.bookImage = document.querySelector(select.box.bookImage);
    }

    initRender(){
      const thisBooksList = this;

      for(let item of thisBooksList.data.books){
        item.ratingBgc = thisBooksList.determinRatingBg(item.rating)[0];
        item.ratingWidth = thisBooksList.determinRatingBg(item.rating)[1];

        const generatedHTML = templates.book(item);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.bookListContainer.appendChild(generatedDOM);
      }
    }

    initActions(){
      const thisBooksList = this;
      
      const favoriteBooks = thisBooksList.favoriteBooks;
      thisBooksList.bookListContainer.addEventListener('dblclick', function(event){
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

      const filters = thisBooksList.filters;
      thisBooksList.formContainer.addEventListener('change', function(event){
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
        thisBooksList.filterBooks();
      });
    }

    determinRatingBg(rating){
      let ratingBgc = '';
      let ratingWidth = rating * 10;
      if(rating < 6){
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if(rating > 6 && rating <= 8){
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
      }
      if(rating > 8 && rating <= 9){
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if(rating > 9){
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
      }
      return [ratingBgc, ratingWidth];
    }

    filterBooks(){
      const thisBooksList = this;
      //console.log('filter');
      for(let book of thisBooksList.data.books){
        let shouldBeHidden = false;
        //console.log('filter');

        for(let filter of thisBooksList.filters){
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
    }
  }

  const app = new BooksList();
}