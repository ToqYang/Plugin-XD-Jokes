/**
* Define the posible URL
* @param {string} msg Text to put in the new node text
*/
module.exports = function defUrl() {
	const categories = document.querySelector("#categories").value;
	const blacklist = document.querySelector("#blacklist").value;
	const search = document.querySelector("#search").value;
	const type = document.querySelector("#type").value;
	const amount = Number(document.querySelector("#amount").value);

	console.log('Categories: ' + categories);
	console.log('blacklist: ' + blacklist);
	console.log('search: ' + search);
	console.log('type amount: ' + type);
	console.log('Type type: ' + (typeof type));
	console.log('Amount: ' + amount);
    console.log('type amount: ' + (typeof amount));


	const base = new URL('https://sv443.net/jokeapi/v2/joke/Any');
	console.log('Url: ', base.toString());
	let url = new URL(categories, base.toString());
	console.log('Url: ', url.toString());

	if (blacklist !== "-") {
		url.searchParams.set('blacklistFlags', blacklist);
		console.log('Url: ', url.toString());

	}
	url.searchParams.set('type', type);
	console.log('Url: ', url.toString());

	if ((typeof search === 'string')) {
		if (lookNumbers(search)) {
			url.searchParams.set('contains', search);
			console.log('Url: ', url.toString());

		}
	}

	if (lookAmount(amount)) {
		url.searchParams.set('amount', amount);
		console.log('Url: ', url.toString());
	}

	console.log('Url: ', url.toString());

	bringJoke((url.toString()), type);
}


/**
* Make a node of object type Text
* @param {URL} url Already built
* @param {string} type Type of Joke
*/
function bringJoke(url, type) {
    const req = new Request(url);
    
    let jokesfetched = new Promise((resolve, reject) => {
        fetch(req)
        .then(response => { 
            if (response.status === 200) {
                console.log(response.status);
                return response.json();
            }
        })
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });


    jokesfetched.then(
        function(data) {
            let joke = '';

            try {
                // Two or more jokes of single-two
                console.log(data);
                console.log(type);
                if (type === "twopart") {
                    for (let text of data) {
                        joke += text.jokes.setup + '\n';
                        joke += text.jokes.delivery + '\n\n';
                    }
                } else {
                    for (let text of data) {
                        joke += text.jokes.setup + '\n';
                        joke += text.jokes.delivery + '\n';
                    }
                }
                textJoke(joke);

            } catch(error) {
                // Only one joke two-singlepart
                joke = '';
                if (type === "twopart") {
                    joke += data.setup + '\n';
                    joke += data.delivery + '\n';
                } else {
                    joke += data.joke + '\n';
                }

                textJoke(joke);
            }
    })
    .catch(
        function(reason) {
            console.error('Error fetchApi: ' + reason + '\n');
    });

}



/**
* Handle of the text
*/
function textJoke(joke) {
	const { Text } = require("scenegraph");
	const app = require("application");
    
    app.editDocument(function (selection) {
        selection.items[0].fill = new Color("red");
        let selectedText = selection.items[0];
        
        if (!(selectedText instanceof Text)) {
            selectedText = makeText(joke);
            selection.insertionParent.addChild(selectedText);
            selectedText.moveInParentCoordinates(100, 100);
        
            if (selectedText === undefined) {
                (selection.items[0]).removeFromParent();
            }
        
        } else if (selectedText instanceof Text) {
            selectedText.text = joke;
        }
    });

}


/**
* Make a node of object type Text
* @param {string} msg Text to put in the new node text
*/
function makeText(msg="Hello") {
	const { Text, Color } = require("scenegraph");
	const meText = new Text();
	meText.text = msg
	meText.fontSize = 16;
	meText.fill = new Color("#000000");

	return meText
}


/**
* Shorthand for creating Elements.
* @param {selection} selection object to look current items in work-table 
*/
function lookNumbers(str='') {
	if ((str.length) <= 0) {
		return 0;
	}

	for (let char of str) {
		let posiblenum = char.charCodeAt(0);
		if (posiblenum >= 48 && posiblenum <= 57) {
			return 0;
		}
	}
	return 1;
}


/**
* Look if there a amount correct
*/
function lookAmount(quantity=1) {
	if (quantity >= 1 && quantity <= 10) {
		return 1;
	}

	return 0;
}