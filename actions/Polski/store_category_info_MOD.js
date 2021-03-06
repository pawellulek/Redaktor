module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Pobierz info o kategorii",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Kanały",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const categories = ['You cheater!', 'Temp Variable', 'Server Variable', 'Global Variable'];
	const info = ['Category ID', 'Category Name', 'Category Server', 'Category Position', 'Category Is Manageable?', 'Category Is Deleteable?', 'Category Channel List', 'Category Channel Count', 'Category Text Channel List', 'Category Text Channel Count', 'Category Voice Channel List', 'Category Voice Channel Count'];
	return `${categories[parseInt(data.category)]} - ${info[parseInt(data.info)]}`;
},

//---------------------------------------------------------------------
// DBM Mods Manager Variables (Optional but nice to have!)
//
// These are variables that DBM Mods Manager uses to show information
// about the mods for people to see in the list.
//---------------------------------------------------------------------

// Who made the mod (If not set, defaults to "DBM Mods")
author: "NetLuis",

// The version of the mod (Defaults to 1.0.0)
version: "1.9.4", //Added in 1.9.4

// A short description to show on the mod line for this mod (Must be on a single line)
short_description: "Stores information about specific category.",

// If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods
depends_on_mods: [
	{name:'WrexMods', path:'aaa_wrexmods_dependencies_MOD.js'}
	],

//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	const info = parseInt(data.info);
	let dataType = 'Unknown Type';
	switch(info) {
		case 0:
			dataType = "Category";
			break;
		case 1:
			dataType = "Category ID";
			break;
		case 2:
			dataType = "Text";
			break;
		case 3:
			dataType = "Server";
			break;
		case 4:
			dataType = "Number";
			break;
		case 5:
		case 6:
			dataType = "Boolean";
			break;
		case 7:
			dataType = "Channel List"
			break;
		case 8:
			dataType = "Number";
			break;
		case 9:
			dataType = "Text Channel List";
			break;
		case 10:
			dataType = "Number";
			break;
		case 11:
			dataType = "Voice Channel List";
			break;
		case 12:
			dataType = "Number";
			break;
	}
	return ([data.varName2, dataType]);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["category", "varName", "info", "storage", "varName2"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions. 
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information, 
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use. 
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels, 
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
		<div class="embed">
        <embedleftline style="background-color: #2b9696;"></embedleftline>
        <div class="embedinfo">
	    <span class="embed-auth"><u>Mod Info:</u><br>Made by <b>${this.author}</b></span><br>
	    <span class="embed-desc">${this.short_description}<br>Version: ${this.version}</span>
        </div>
        </div><br>
<div>
	<div style="float: left; width: 35%;">
		Kategoria:<br>
		<select id="category" class="round" onchange="glob.refreshVariableList(this)">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
		Nazwa zmiennej:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div>
	<div style="padding-top: 8px; width: 70%;">
		Info:<br>
		<select id="info" class="round">
			<optgroup label="Main">
			<option value="0">ID Kategorii</option>
			<option value="1">Nazwa Kategorii</option>
			<option value="2">Serwer Kategorii</option>
			<option value="3">Pozycja Kategorii</option>
			<option value="4">Można zarządzać kategorią?</option>
			<option value="5">Można usunąć kategorie?</option>
			</optgroup>
			<optgroup label="Info o kanale">
			<option value="6">Lista kanałów kategorii</option>
			<option value="7">Liczba kanałów kategorii</option>
			<option value="8">Lista kanałów tekstowych kategorii</option>
			<option value="9">Liczba kanałów tekstowych kategorii</option>
			<option value="10">Lista kanałów głosowych kategorii</option>
			<option value="11">Liczba kanałów głosowych kategorii</option>
		</select>
	</div>
</div><br>
<div>
	<div style="float: left; width: 35%;">
		Zapisz w:<br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer2" style="float: right; width: 60%;">
		Nazwa zmiennej:<br>
		<input id="varName2" class="round" type="text"><br>
	</div>
</div>

	        <style>
        /* START OF EMBED CSS */
        div.embed { /* <div class="embed"></div> */
            position: relative;
        }
            embedleftline { /* <embedleftline></embedleftline> OR if you wan't to change the Color: <embedleftline style="background-color: #HEXCODE;"></embedleftline> */
                background-color: #eee;
                width: 4px;
                border-radius: 3px 0 0 3px;
                border: 0;
                height: 100%;
                margin-left: 4px;
                position: absolute;
            }
            div.embedinfo { /* <div class="embedinfo"></div> */
                background: rgba(46,48,54,.45) fixed;
                border: 1px solid hsla(0,0%,80%,.3);
                padding: 10px;
                margin:0 4px 0 7px;
                border-radius: 0 3px 3px 0;
            }
                span.embed-auth { /* <span class="embed-auth"></span> (Title thing) */
                    color: rgb(255, 255, 255);
                }
                span.embed-desc { /* <span class="embed-desc"></span> (Description thing) */
                    color: rgb(128, 128, 128);
                }
        
                span { /* Only making the text look, nice! */
                    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                }
                </style>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
	const {glob, document} = this;

	glob.refreshVariableList(document.getElementById('category'));
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
	var WrexMods = this.getWrexMods(); //Find aaa_wrexmods_dependencies_MOD.js
	const category = parseInt(data.category);
	const varName = this.evalMessage(data.varName, cache);
	const info = parseInt(data.info);
	const targetCategory = WrexMods.getReaction(category, varName, cache); //getReaction, getWebhook, getEmoji can get category, so i don't need to modify WrexMods
	if(!targetCategory) {
		this.callNextAction(cache);
		return;
	}
	let result;
	switch(info) {
		case 0:
			result = targetCategory.id; //Category ID
			break;
		case 1:
			result = targetCategory.name; //Category Name
			break;
		case 2:
			result = targetCategory.guild; //Category Server
			break;
		case 3:
			result = targetCategory.calculatedPosition; //Category Position
			break;
		case 4:
			result = targetCategory.manageable; //Category Is Manageable?
			break;
		case 5:
			result = targetCategory.deletable; //Category Is Deleteable?
			break;
		case 6:
			result = targetCategory.children.array(); //Category Channel List
			break;
		case 7:
			result = targetCategory.children.size; //Category Channel Count
			break;
		case 8:
			result = targetCategory.children.filter(c => c.type == "text").array(); //Category Text Channel List
			break;
		case 9:
			result = targetCategory.children.filter(c => c.type == "text").size; //Category Text Channel Count
			break;
		case 10:
			result = targetCategory.children.filter(c => c.type == "voice").array(); //Category Voice Channel List
			break;
		case 11:
			result = targetCategory.children.filter(c => c.type == "voice").size; //Category Voice Channel Count
			break;
		default:
			break;
	}
		if(result) {
			const storage = parseInt(data.storage);
			const varName2 = this.evalMessage(data.varName2, cache);
			this.storeValue(result, storage, varName2, cache);
			this.callNextAction(cache);
		} else {
			this.callNextAction(cache);
		}
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module