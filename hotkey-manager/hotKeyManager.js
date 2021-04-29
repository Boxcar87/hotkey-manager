'using strict';
class HotKeyManager{
    constructor(_fieldId='', _buttonId='', _onConfirm){
        this._field = document.getElementById(_fieldId);
        this._button = document.getElementById(_buttonId);
        this._onConfirm = _onConfirm;
        this._keys = [];

        this.__buildHotKey__ = this.__buildHotKey__.bind(this);
        this.__clearHotKey__ = this.__clearHotKey__.bind(this);

        this.__subscribe__();
    }

    __subscribe__() {
        console.log(this._field);
        this._field.addEventListener('keydown', this.__buildHotKey__);
        this._field.addEventListener('click', this.__clearHotKey__);
        this._button.addEventListener('click', this.__clearHotKey__);
    }

    __buildHotKey__(_key){
        var i = 0; 

        // console.log('receiving key: ' + _key);
        if(this._keys.length == 0){
            // console.log('no keys detected, adding key: ' + _key);
            this._keys.push(_key);
            this._hotkeyDisplay = _key.key.toString();
        }        
        
        else{            
            this._keys.forEach(_k => {    
                if(_key.key == _k.key){
                    // console.log('same key detected.');
                    i++;
                }
            });

            if(i == 0){
                // console.log('adding unique key: '+ _key);
                this._keys.push(_key);
                this._hotkeyDisplay += (' + ' + _key.key);
            }
            var i = 0;
        }
        this._field.value = this._hotkeyDisplay.toUpperCase();
        if(_key.keyCode != '160' && _key.keyCode != '162' && _key.keyCode != '164'){
            this._field.blur();
            localStorage.setItem(this._field.id, this._hotkeyDisplay.toUpperCase());
            this._onConfirm(this._keys, this._field.id);            
        }
    }

    __clearHotKey__(){
        this._keys = [];
        this._field.value = 'Input Hotkey ...';
        localStorage.setItem(this._field.id, 'Input Hotkey ...');
        this._field.focus();        
    }

    dispose() {
        this._field.removeEventListener('keydown', this.___buildHotKey__);
        this._button.removeEventListener('click', this.__clearHotKey__);
    }
}

module.exports = HotKeyManager;