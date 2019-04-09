(function() {

    /**
     * Set cookie
     *
     * @param string name
     * @param string value
     * @param int days
     * @param string path
     * @see http://www.quirksmode.org/js/cookies.html
     */
    function createCookie(name,value,days,path) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path="+path;
    }

    /**
     * Read cookie
     * @param string name
     * @returns {*}
     * @see http://www.quirksmode.org/js/cookies.html
     */
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    /* El mensaje de bienvenida sólo aparece la primera vez que se carga
    la página index.html. A partir de ahí se carga una cookie que se 
    controla si existe para sacar el mensaje o no. La expiración de la
    cookie va asociada a la sesión (0 days)
    */
    var welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage == null) {
        return;
    }

    // Si no existe la cookie actualizamos el display del identificador
    // con 'block' para hacer visible el mensaje.
    var cookie = readCookie('seen-welcome-message');
    if (cookie != null && cookie == 'yes') {
        welcomeMessage.style.display = 'none';
    } else {
        welcomeMessage.style.display = 'block';
    }
    
    // Actualizamos/creamos cookie
    var cookieExpiry = welcomeMessage.getAttribute('data-cookie-expiry');
    if (cookieExpiry == null) {
        cookieExpiry = 0;
    }
    var cookiePath = welcomeMessage.getAttribute('data-cookie-path');
    if (cookiePath == null) {
        cookiePath = "/";
    }
    createCookie('seen-welcome-message','yes',cookieExpiry,cookiePath);

})();
