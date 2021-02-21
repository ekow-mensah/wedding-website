const appModule = (() => {

    let init = () => {
        registerEventCountDown();
    }

    let registerEventCountDown = () => {
        let dayBox = document.querySelector("#daybox");
        let hourBox = document.querySelector("#hourbox");
        let minBox = document.querySelector("#minbox");
        let secBox = document.querySelector("#secbox");
        let hourText = document.querySelector("#hour-text");
    
        setInterval(() => {
          let today = new Date();
          let eventDate = new Date(2022, 4, 09, 14, 0, 0);
    
          let seconds = Math.floor((eventDate - (today)) / 1000);
          let minutes = Math.floor(seconds / 60);
          let hours = Math.floor(minutes / 60);
          let days = Math.floor(hours / 24);
    
          hours = hours - (days * 24);
          minutes = minutes - (days * 24 * 60) - (hours * 60);
          seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
          
          if (hours ==1) {
              hourText.html = "HOUR";
          }
          
          dayBox.innerHTML = days;
          hourBox.innerHTML = hours;
          minbox.innerHTML = minutes;
          secBox.innerHTML = seconds;
        }, 1000);
    }

    return {
        init: init
    }

})();


appModule.init();