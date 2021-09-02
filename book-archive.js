
// searching book & fetching data

const searchBook = () =>
{
	const searchField = document.getElementById('search-field');
	const searchText = searchField.value ;
	searchField.value ='';
	document.getElementById('result').innerText = '';
	if(searchText === '')
	{
		document.getElementById('result').innerText = 'Please search something';
	}
	else
	{
		const url = `https://openlibrary.org/search.json?q=${searchText}`;
		fetch(url)
		.then(res => res.json())
		.then(data => displaySearchBooks(data));
	}
	

}

// display search result function

const displaySearchBooks = (data) => 
{	
	
	displayFoundResult(data);
	const bookNames = data.docs;
	const seeBooks = document.getElementById('display-books');
	seeBooks.textContent = ''; // clear searched result
	document.getElementById('no-result').innerText = ''; // clear error handling text
	if(data.numFound === 0)
	{
		document.getElementById('no-result').innerText = 'Found No Result For Your Search.';
	}
	else
	{
		bookNames.forEach(bookName => {
		const div = document.createElement('div');
		div.classList.add('col');
		div.innerHTML = `
			<div class="card h-100">
				<img src="https://covers.openlibrary.org/b/id/${bookName.cover_i}-M.jpg" class="card-img-top img-height" alt="..." >
				<div class="card-body">
					<h5 class="card-title">${bookName.title}</h5>
					<p class="card-text">Author : ${bookName.author_name}</p>
					<h6 class="card-text">pulisher : ${bookName.publisher[0]}</h6>
					<p class="card-text">First published in ${bookName.publish_date[0]}</p>
					<a href="https://covers.openlibrary.org/b/id/${bookName.cover_i}-L.jpg" class="btn btn-success">See Large Book Image</a>
				</div>
			</div> 	
		`;
		seeBooks.appendChild(div);
		});
	}
}


// search result number function

const displayFoundResult= (result) =>
{	
	console.log(result);
	const div = document.getElementById('search-result-number');
	div.innerHTML = ` <h3  class="text-center pb-4 text-white">${result.numFound} result found</h3> `;
}