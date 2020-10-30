// HTML to build the plugin
const html = `
<style>
    .row {
        display: flex;
        flex-direction: row;
    }

    form {
        display: flex;
        flex-direction: column;
    }
</style>

<form method="dialog" id="main">
    <div class="row">
        <label class="row" for="categories">Categories: </label>
        <select id="categories" required>
            <option value="Programming" selected>Programming</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Dark">Dark</option>
            <option value="Pun">Pun</option>
        </select>
    </div>

    <div class="row">
        <label class="row" for="blacklist">Blacklist (Optional): </label>
        <select id="blacklist">
            <option value="-" selected>None</option>
            <option value="nsfw">Nsfw</option>
            <option value="religious">Religious</option>
            <option value="political">Political</option>
            <option value="racist">Racist</option>
            <option value="sexist">Sexist</option>
        </select>
    </div>

    <div class="row">
        <label class="row" for="search">
            Joke contain this string:
        </label>
        <input type="text" id="search" value="" placeholder="Optional" pattern="[a-zA-Z]+" />
    </div>
        
    <div class="row">
        <label class="row">Type Joke: </label>
        <select id="type">
            <option value="single" selected>Single</option>
            <option value="twopart">TwoPart</option>
        </select>
    </div>

    <div class="row">
        <label class="row" for="amount">Amount of jokes</label>
        <input type="number" id="amount" value="1" min="1" max="10" pattern="[1-10]"/>
    </div>

    <footer><button id="sub" type="submit">Apply</button></footer>
</form>

<p id="warning">This plugin requires you to select a text in the document. Please select a text.</p>
`;

module.exports.html = html;